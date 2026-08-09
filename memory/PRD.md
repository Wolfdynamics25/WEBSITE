# Wolfdynamic Systems — EAGS Site (with Auth)

## Original Problem Statement
"Create a website for this without revealing confidential details" — later expanded to include Email & Password authentication with a role-based portal.

## Confirmed User Choices
- Public teaser site + gated portal/admin (no confidential deck content on public pages)
- **Design**: defence-tech (dark tactical charcoal + amber-warn + OD-green; Saira Condensed + Barlow + JetBrains Mono)
- **Auth**: JWT email/password; roles `admin | investor | partner | team | pending`; invite-only + admin approval for self-signup
- **Emergent Google Auth**: not yet wired (deferred to next iteration)
- Contact form re-enabled; submissions land in admin dashboard
- Real Wolfdynamics logo integrated

## Architecture
- **Backend**: FastAPI + Motor(Mongo). `/app/backend/server.py` + `/app/backend/auth.py`
  - JWT (HS256), bcrypt, httpOnly cookies (SameSite=None; Secure; Path=/)
  - Brute-force protection (5 attempts → 15-min lockout)
  - Startup: `ensure_indexes` + `seed_admin` (idempotent)
- **Frontend**: React 19 + CRACO + Tailwind
  - AuthContext + ProtectedRoute (three-state user: null|obj|false, role-gated)
  - Pages: `/`, `/login`, `/register`, `/pending`, `/admin`, `/portal`
- **DB collections**: `users`, `contact_inquiries`, `login_attempts`

## Implemented (Jan 2026)
- Public site: Nav (with Sign In / Portal button), Hero (with real product render), Narrative, Capabilities, Applications, Impact (outcomes only, no SDGs), Contact (form + email), Footer (with real logo)
- Auth flows: register → pending, admin approve → role-based access, login/logout/refresh, brute-force lockout
- Admin dashboard: stats, Inquiries tab (mark-read), Users tab (approve/deactivate)
- Portal: programme updates + documents card (role: admin/investor/partner/team)
- Assets: real Wolfdynamics logo integrated (light-inverted for dark theme); product renders + ops photos from PPTX (no confidential specs)
- Testing: 100% pass on backend + frontend (see `/app/test_reports/iteration_2.json`); pytest suite at `/app/backend/tests/test_auth_and_contact.py`

## Test Credentials (see `/app/memory/test_credentials.md`)
- Admin: `admin@wolfdynamics.in` / `Wolf#EAGS-2026!`

## Backlog
- P1: **Emergent Google Auth** as second sign-in option (playbook already fetched)
- P1: Email notifications on new inquiries + on user approval (SendGrid / Resend — needs API key)
- P2: Password reset flow (forgot-password + reset-password)
- P2: Real Capability Brief PDF upload + download for portal users
- P2: OG image + favicon
- P2: Tighten CORS_ORIGINS to explicit frontend URL for production
