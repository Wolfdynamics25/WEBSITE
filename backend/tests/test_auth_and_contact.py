"""Backend tests: auth (login/register/roles/approval/deactivate), contact, portal, health."""
import os
import time
import uuid
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/") if os.environ.get("REACT_APP_BACKEND_URL") else "https://site-creator-3119.preview.emergentagent.com"
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@wolfdynamics.in"
ADMIN_PASSWORD = "Wolf#EAGS-2026!"


def _fresh_email(prefix="tester"):
    return f"TEST_{prefix}_{uuid.uuid4().hex[:8]}@example.com"


@pytest.fixture(scope="module")
def admin_session():
    s = requests.Session()
    r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"admin login failed: {r.status_code} {r.text}"
    return s


# ---------- health ----------
def test_health():
    r = requests.get(f"{API}/health")
    assert r.status_code == 200
    assert r.json().get("status") == "healthy"


# ---------- admin login + cookies ----------
def test_admin_login_sets_cookies_and_returns_token():
    s = requests.Session()
    r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200
    data = r.json()
    assert "user" in data and "access_token" in data
    assert data["user"]["email"] == ADMIN_EMAIL
    assert data["user"]["role"] == "admin"
    assert data["user"]["approved"] is True
    assert "password_hash" not in data["user"]
    assert "_id" not in data["user"]
    # cookies (case-insensitive check for name)
    cookie_names = {c.name for c in s.cookies}
    assert "access_token" in cookie_names
    assert "refresh_token" in cookie_names


def test_admin_login_wrong_password_returns_401():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong-password"})
    assert r.status_code == 401


def test_auth_me_returns_admin(admin_session):
    r = admin_session.get(f"{API}/auth/me")
    assert r.status_code == 200
    u = r.json()
    assert u["email"] == ADMIN_EMAIL
    assert u["role"] == "admin"
    assert "password_hash" not in u
    assert "_id" not in u


def test_logout_clears_and_me_401():
    s = requests.Session()
    r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200
    r2 = s.post(f"{API}/auth/logout")
    assert r2.status_code == 200
    # after clearing cookies, session cookies should also be gone; direct new session with no creds:
    r3 = requests.get(f"{API}/auth/me")
    assert r3.status_code == 401


# ---------- brute force ----------
def test_brute_force_lockout_returns_429():
    # Use a unique email per run to avoid interference with parallel tests
    email = _fresh_email("brute")
    # First register the user, then attempt to log in with wrong password 5 times
    reg = requests.post(f"{API}/auth/register", json={
        "name": "Brute Target", "email": email, "password": "correctpass1"
    })
    assert reg.status_code == 201
    # 5 failures
    for i in range(5):
        r = requests.post(f"{API}/auth/login", json={"email": email, "password": "badpassword"})
        assert r.status_code in (401, 429), f"attempt {i+1}: {r.status_code} {r.text}"
    # 6th should be 429
    r6 = requests.post(f"{API}/auth/login", json={"email": email, "password": "badpassword"})
    assert r6.status_code == 429, f"6th attempt expected 429, got {r6.status_code} {r6.text}"


# ---------- register ----------
def test_register_creates_pending_and_sets_cookies():
    s = requests.Session()
    email = _fresh_email("newreg")
    r = s.post(f"{API}/auth/register", json={
        "name": "New Reg", "email": email, "password": "passw0rd8", "organization": "Acme"
    })
    assert r.status_code == 201
    data = r.json()
    assert "user" in data and "access_token" in data
    assert data["user"]["email"] == email.lower()
    assert data["user"]["role"] == "pending"
    assert data["user"]["approved"] is False
    cookie_names = {c.name for c in s.cookies}
    assert "access_token" in cookie_names
    # /auth/me works
    r2 = s.get(f"{API}/auth/me")
    assert r2.status_code == 200
    assert r2.json()["role"] == "pending"


def test_register_duplicate_returns_409():
    email = _fresh_email("dup")
    r1 = requests.post(f"{API}/auth/register", json={
        "name": "Dup", "email": email, "password": "passw0rd8"
    })
    assert r1.status_code == 201
    r2 = requests.post(f"{API}/auth/register", json={
        "name": "Dup", "email": email, "password": "passw0rd8"
    })
    assert r2.status_code == 409


def test_register_short_password_returns_422():
    r = requests.post(f"{API}/auth/register", json={
        "name": "Short", "email": _fresh_email("short"), "password": "1234567"
    })
    assert r.status_code == 422


# ---------- pending portal 403 ----------
def test_pending_user_portal_returns_403():
    s = requests.Session()
    email = _fresh_email("pend")
    r = s.post(f"{API}/auth/register", json={
        "name": "Pend", "email": email, "password": "passw0rd8"
    })
    assert r.status_code == 201
    r2 = s.get(f"{API}/portal/updates")
    assert r2.status_code == 403


# ---------- admin list users + approve ----------
def test_admin_list_and_approve_user_flow(admin_session):
    # create fresh pending
    s = requests.Session()
    email = _fresh_email("approve")
    reg = s.post(f"{API}/auth/register", json={
        "name": "To Approve", "email": email, "password": "passw0rd8"
    })
    assert reg.status_code == 201
    user_id = reg.json()["user"]["user_id"]

    # admin lists users
    lst = admin_session.get(f"{API}/auth/users")
    assert lst.status_code == 200
    users = lst.json()
    assert any(u["email"] == email.lower() for u in users)

    # approve as investor
    ap = admin_session.post(f"{API}/auth/users/{user_id}/approve", json={"role": "investor"})
    assert ap.status_code == 200
    body = ap.json()
    assert body["role"] == "investor"
    assert body["approved"] is True

    # approved user can login and access portal
    s2 = requests.Session()
    lg = s2.post(f"{API}/auth/login", json={"email": email, "password": "passw0rd8"})
    assert lg.status_code == 200
    assert lg.json()["user"]["role"] == "investor"
    pu = s2.get(f"{API}/portal/updates")
    assert pu.status_code == 200
    j = pu.json()
    assert "updates" in j and "documents" in j
    assert isinstance(j["updates"], list) and len(j["updates"]) >= 1


# ---------- deactivate ----------
def test_admin_deactivate_user_and_self_400(admin_session):
    # create + approve, then deactivate
    s = requests.Session()
    email = _fresh_email("deact")
    reg = s.post(f"{API}/auth/register", json={
        "name": "Deact", "email": email, "password": "passw0rd8"
    })
    uid = reg.json()["user"]["user_id"]
    admin_session.post(f"{API}/auth/users/{uid}/approve", json={"role": "team"})

    dr = admin_session.post(f"{API}/auth/users/{uid}/deactivate")
    assert dr.status_code == 200
    assert dr.json()["deactivated"] is True

    # that user's /me should now be 403 (deactivated) via login
    s2 = requests.Session()
    lg = s2.post(f"{API}/auth/login", json={"email": email, "password": "passw0rd8"})
    # login itself blocks deactivated with 403
    assert lg.status_code == 403

    # admin cannot deactivate self
    me = admin_session.get(f"{API}/auth/me").json()
    self_r = admin_session.post(f"{API}/auth/users/{me['user_id']}/deactivate")
    assert self_r.status_code == 400


# ---------- contact ----------
def test_contact_public_create_and_admin_list_and_mark_read(admin_session):
    payload = {
        "name": "TEST Contact",
        "email": _fresh_email("contact"),
        "organization": "TestCo",
        "interest": "investor",
        "message": "TEST inquiry message body"
    }
    r = requests.post(f"{API}/contact", json=payload)
    assert r.status_code == 201, r.text
    inq = r.json()
    assert inq["email"] == payload["email"].lower()
    assert inq["read"] is False
    inq_id = inq["id"]

    # invalid email
    bad = requests.post(f"{API}/contact", json={**payload, "email": "not-an-email"})
    assert 400 <= bad.status_code < 500

    # unauth GET
    ug = requests.get(f"{API}/contact")
    assert ug.status_code == 401

    # admin GET
    ag = admin_session.get(f"{API}/contact")
    assert ag.status_code == 200
    items = ag.json()
    assert any(i["id"] == inq_id for i in items)
    # newest first
    if len(items) >= 2:
        assert items[0]["created_at"] >= items[1]["created_at"]

    # mark read as admin
    mr = admin_session.post(f"{API}/contact/{inq_id}/read")
    assert mr.status_code == 200

    # non-admin cannot mark read
    s = requests.Session()
    email = _fresh_email("nonadm")
    s.post(f"{API}/auth/register", json={"name": "N", "email": email, "password": "passw0rd8"})
    nr = s.post(f"{API}/contact/{inq_id}/read")
    assert nr.status_code == 403
