# Wolfdynamic Systems — Auth Testing Playbook

## Environment
- Backend: FastAPI on port 8001; MongoDB at MONGO_URL, DB DB_NAME
- JWT via httpOnly cookies (`access_token`, `refresh_token`) with `SameSite=None; Secure; Path=/`
- Frontend: React, `withCredentials: true` on all API calls, uses REACT_APP_BACKEND_URL
- All API routes prefixed with `/api`

## Seeded Admin
- Email: `admin@wolfdynamics.in`
- Password: `Wolf#EAGS-2026!`
- Role: `admin`, `approved: true`

## Roles & Access
| Route     | admin | investor / partner / team | pending | anon |
|-----------|:-----:|:------------------------:|:-------:|:----:|
| /         | ✅   | ✅                        | ✅      | ✅  |
| /login    | ✅   | ✅                        | ✅      | ✅  |
| /register | ✅   | ✅                        | ✅      | ✅  |
| /pending  |   —  | —                        | ✅      | →/login |
| /admin    | ✅   | →/                       | →/pending | →/login |
| /portal   | ✅   | ✅                        | →/pending | →/login |

## Test Flows

### 1. Admin Login & Dashboard
1. `POST /api/auth/login` with admin creds → 200 with `user` + sets cookies
2. `GET /api/auth/me` → returns admin
3. `GET /api/contact` → returns list (admin only)
4. `GET /api/auth/users` → returns list of all users
5. Frontend: visit `/login`, submit admin creds, verify redirect to `/admin`, tabs work

### 2. Self-Register → Pending
1. `POST /api/auth/register` with new email → 201, user created as `role=pending, approved=false`, cookies set
2. `GET /api/auth/me` returns pending user
3. `GET /api/portal/updates` returns 403 "Account pending approval" for pending role
4. Frontend: `/register` → after submit lands on `/pending`

### 3. Admin Approves Pending User
1. As admin, `POST /api/auth/users/{user_id}/approve` with `{"role":"investor"}` → user's role updated to `investor`, `approved=true`
2. Approved user can then `GET /api/portal/updates` successfully

### 4. Contact Form (public)
1. Anonymous `POST /api/contact` with valid payload → 201, inquiry stored
2. Admin `GET /api/contact` includes the new inquiry, newest first
3. Admin `POST /api/contact/{id}/read` sets `read: true`

### 5. Brute Force
1. 5 wrong-password `/api/auth/login` attempts for same email/IP → 6th returns 429 with lock-until timestamp

### 6. Logout
1. `POST /api/auth/logout` while authenticated → clears cookies
2. Subsequent `GET /api/auth/me` returns 401
