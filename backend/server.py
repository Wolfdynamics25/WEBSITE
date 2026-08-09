from dotenv import load_dotenv
from pathlib import Path
load_dotenv(Path(__file__).parent / ".env")

import os
import uuid
import logging
from datetime import datetime, timezone
from typing import List, Optional, Literal

from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Response
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, ConfigDict

from auth import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token,
    sanitize_user,
    set_auth_cookies,
    clear_auth_cookies,
    check_lockout,
    record_failed_login,
    clear_failed_logins,
    get_current_user,
    require_admin,
    require_portal,
    seed_admin,
    ensure_indexes,
)
import jwt as pyjwt

# ---------- DB ----------
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="Wolfdynamic Systems API")
app.state.db = db

api = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")


# ---------- Models ----------
RoleType = Literal["admin", "investor", "partner", "team", "pending"]
InterestType = Literal["investor", "partner", "customer", "media", "career", "other"]


class RegisterRequest(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=200)
    organization: Optional[str] = Field(default=None, max_length=200)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ApproveUserRequest(BaseModel):
    role: Literal["investor", "partner", "team"] = "investor"


class UserOut(BaseModel):
    model_config = ConfigDict(extra="ignore")
    user_id: str
    email: EmailStr
    name: str
    organization: Optional[str] = None
    role: RoleType
    approved: bool
    deactivated: bool = False
    created_at: Optional[str] = None
    approved_at: Optional[str] = None


class ContactInquiryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    organization: Optional[str] = Field(default=None, max_length=200)
    interest: InterestType = "other"
    message: str = Field(min_length=1, max_length=4000)


class ContactInquiryOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    organization: Optional[str] = None
    interest: InterestType
    message: str
    created_at: str
    read: bool = False


# ---------- Helpers ----------
def _client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


# ---------- Public routes ----------
@api.get("/")
async def root():
    return {"service": "Wolfdynamic Systems API", "status": "ok"}


@api.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}


# ---------- Auth routes ----------
@api.post("/auth/register", status_code=201)
async def register(payload: RegisterRequest, response: Response):
    email = payload.email.lower()
    existing = await db.users.find_one({"email": email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=409, detail="An account with this email already exists")
    user_doc = {
        "user_id": f"user_{uuid.uuid4().hex[:12]}",
        "email": email,
        "password_hash": hash_password(payload.password),
        "name": payload.name.strip(),
        "organization": (payload.organization or "").strip() or None,
        "role": "pending",         # awaits admin approval
        "approved": False,
        "deactivated": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "approved_at": None,
    }
    await db.users.insert_one(user_doc)
    # Issue tokens even for pending — /auth/me returns their pending state; portal is gated by role.
    access = create_access_token(user_doc["user_id"], email, "pending")
    refresh = create_refresh_token(user_doc["user_id"])
    set_auth_cookies(response, access, refresh)
    return {"user": sanitize_user(user_doc), "access_token": access}


@api.post("/auth/login")
async def login(payload: LoginRequest, request: Request, response: Response):
    email = payload.email.lower()
    identifier = f"{_client_ip(request)}:{email}"
    await check_lockout(db, identifier)
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        await record_failed_login(db, identifier)
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if user.get("deactivated"):
        raise HTTPException(status_code=403, detail="Account deactivated")
    await clear_failed_logins(db, identifier)
    access = create_access_token(user["user_id"], user["email"], user.get("role", "pending"))
    refresh = create_refresh_token(user["user_id"])
    set_auth_cookies(response, access, refresh)
    return {"user": sanitize_user(user), "access_token": access}


@api.post("/auth/logout")
async def logout(response: Response, user: dict = Depends(get_current_user)):
    clear_auth_cookies(response)
    return {"status": "logged_out"}


@api.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return sanitize_user(user)


@api.post("/auth/refresh")
async def refresh(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="No refresh token")
    try:
        payload = decode_token(token)
    except pyjwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Refresh token expired")
    except pyjwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    if payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid token type")
    user = await db.users.find_one({"user_id": payload["sub"]}, {"_id": 0})
    if not user or user.get("deactivated"):
        raise HTTPException(status_code=401, detail="User not found")
    access = create_access_token(user["user_id"], user["email"], user.get("role", "pending"))
    new_refresh = create_refresh_token(user["user_id"])
    set_auth_cookies(response, access, new_refresh)
    return {"status": "refreshed"}


# ---------- Admin: users ----------
@api.get("/auth/users", response_model=List[UserOut])
async def list_users(admin: dict = Depends(require_admin)):
    users = await db.users.find({}, {"_id": 0, "password_hash": 0}).sort("created_at", -1).to_list(500)
    return users


@api.post("/auth/users/{user_id}/approve", response_model=UserOut)
async def approve_user(user_id: str, payload: ApproveUserRequest, admin: dict = Depends(require_admin)):
    now = datetime.now(timezone.utc).isoformat()
    res = await db.users.update_one(
        {"user_id": user_id},
        {"$set": {"role": payload.role, "approved": True, "approved_at": now, "deactivated": False}},
    )
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    user = await db.users.find_one({"user_id": user_id}, {"_id": 0, "password_hash": 0})
    return user


@api.post("/auth/users/{user_id}/deactivate", response_model=UserOut)
async def deactivate_user(user_id: str, admin: dict = Depends(require_admin)):
    if admin["user_id"] == user_id:
        raise HTTPException(status_code=400, detail="Cannot deactivate your own account")
    res = await db.users.update_one({"user_id": user_id}, {"$set": {"deactivated": True}})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    user = await db.users.find_one({"user_id": user_id}, {"_id": 0, "password_hash": 0})
    return user


# ---------- Contact ----------
@api.post("/contact", response_model=ContactInquiryOut, status_code=201)
async def create_contact(payload: ContactInquiryCreate):
    inquiry = {
        "id": f"inq_{uuid.uuid4().hex[:12]}",
        "name": payload.name.strip(),
        "email": payload.email.lower(),
        "organization": (payload.organization or "").strip() or None,
        "interest": payload.interest,
        "message": payload.message.strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "read": False,
    }
    await db.contact_inquiries.insert_one(inquiry)
    return {k: v for k, v in inquiry.items() if k != "_id"}


@api.get("/contact", response_model=List[ContactInquiryOut])
async def list_contact(admin: dict = Depends(require_admin), limit: int = 200):
    limit = max(1, min(limit, 500))
    items = await db.contact_inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return items


@api.post("/contact/{inq_id}/read")
async def mark_read(inq_id: str, admin: dict = Depends(require_admin)):
    res = await db.contact_inquiries.update_one({"id": inq_id}, {"$set": {"read": True}})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"status": "ok"}


# ---------- Portal ----------
@api.get("/portal/updates")
async def portal_updates(user: dict = Depends(require_portal)):
    # Curated public-safe updates. No confidential specs.
    return {
        "user": sanitize_user(user),
        "updates": [
            {
                "id": "upd-01",
                "date": "2026-01-15",
                "title": "PROGRAMME · TRL-3 → TRL-4 TRANSITION",
                "summary": "Sub-scale prototype design phase initiated. Ground-effect lift enhancement experimentally validated in prior lab work.",
            },
            {
                "id": "upd-02",
                "date": "2025-12-02",
                "title": "REGULATORY · ENGAGEMENT INITIATED",
                "summary": "Preliminary engagement with civil aviation and maritime authorities on WIG certification pathway.",
            },
            {
                "id": "upd-03",
                "date": "2025-10-11",
                "title": "MISSION · DUAL-USE ARCHITECTURE",
                "summary": "Reference mission profile finalised for civilian coastal cargo and naval logistics variants.",
            },
        ],
        "documents": [
            {
                "id": "doc-brief-01",
                "title": "EAGS Capability Brief · Public Summary",
                "type": "PDF",
                "size": "—",
                "available": False,
                "note": "Available on request via secure channel.",
            }
        ],
    }


# ---------- Wire up ----------
app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.on_event("startup")
async def _startup():
    await ensure_indexes(db)
    await seed_admin(db)
    logger.info("Startup complete — indexes ensured, admin seeded")


@app.on_event("shutdown")
async def _shutdown():
    client.close()
