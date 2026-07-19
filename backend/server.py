from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
InterestType = Literal["investor", "partner", "customer", "media", "career", "other"]


class ContactInquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    organization: Optional[str] = Field(default=None, max_length=200)
    interest: InterestType = "other"
    message: str = Field(min_length=1, max_length=4000)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


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
    created_at: datetime


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"service": "Wolfdynamic Systems API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}


@api_router.post("/contact", response_model=ContactInquiryOut, status_code=201)
async def create_contact_inquiry(payload: ContactInquiryCreate):
    inquiry = ContactInquiry(**payload.model_dump())
    doc = inquiry.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['email'] = str(doc['email'])
    try:
        await db.contact_inquiries.insert_one(doc)
    except Exception as e:
        logger.exception("Failed to store contact inquiry")
        raise HTTPException(status_code=500, detail="Unable to submit inquiry. Please try again.") from e
    return ContactInquiryOut(**{**doc, 'created_at': inquiry.created_at})


@api_router.get("/contact", response_model=List[ContactInquiryOut])
async def list_contact_inquiries(limit: int = 100):
    limit = max(1, min(limit, 500))
    inquiries = await db.contact_inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for inq in inquiries:
        if isinstance(inq.get('created_at'), str):
            inq['created_at'] = datetime.fromisoformat(inq['created_at'])
    return inquiries


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
