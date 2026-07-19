# Wolfdynamic Systems — Public Teaser Site (EAGS)

## Original Problem Statement
"create a website for this without revealing confidential details" — user uploaded EAGS_brief_v8.pptx, an investor pitch deck for Wolfdynamic Systems Pvt. Ltd. The product is EAGS (Electric Autonomous Ground-effect Shuttle) — India's first Wing-in-Ground (WIG) autonomous cargo vehicle.

## User Choices (Confirmed)
- Hide: financials (₹ amounts), roadmap capital breakdowns, stage costs, competitor cost tables, LOI partner names, team compensation
- Show: teaser + a bit more; positioned as "launching soon"; mention "India's first Wing-in-Ground effect vehicle for cargo"; autonomy + electric propulsion
- Design vibe: fusion of Aerospace/Defence-Tech + Maritime/Blue-Economy
- Assets: no logo/renders — use tasteful abstract SVGs
- Contact: submissions go to info@wolfdynamics.in (stored in DB; email displayed prominently)

## Architecture
- Frontend: React 19 + CRACO + Tailwind + shadcn/ui + Sonner (dark, aerospace-maritime theme; Instrument Serif + Outfit + JetBrains Mono)
- Backend: FastAPI + Motor (MongoDB) — `/api` router, contact inquiries stored in `contact_inquiries` collection
- Env: uses REACT_APP_BACKEND_URL (frontend) and MONGO_URL / DB_NAME (backend)

## User Personas
- Investors (primary CTA)
- Strategic partners / defence & aerospace
- Coastal logistics operators
- Media / press
- Prospective hires

## Core Requirements
- Public, single-page scrolling teaser
- No confidential deck content leaked
- Working contact form persisted in MongoDB
- Distinctive aerospace + maritime aesthetic

## Implemented (2026-01)
- Backend endpoints: `GET /api/`, `GET /api/health`, `POST /api/contact`, `GET /api/contact`
- Sections: Nav, Hero (with SVG WIG craft + telemetry strip), Narrative, Capabilities (6-card technical grid), Applications (6 dual-use missions), Why Now, Impact (SDGs + outcomes), Team (4 members, roles only), Contact (form + inquiry storage), Footer
- Motion: scroll-reveal, radar sweep, silhouette glide, blinking status
- Data-testids on all interactive elements
- All confidential financial/roadmap/LOI/salary data excluded (verified by testing)

## Backlog / Future
- P1: Email delivery of contact inquiries to info@wolfdynamics.in (Resend/SendGrid) — currently DB-only
- P1: Simple admin route to view stored inquiries
- P2: Press/media kit page, careers page
- P2: Newsletter capture ("get updates when we launch")
- P2: Localized (Hindi/Kannada) toggle
- P2: Animated technical schematic in Capabilities section (interactive)

## Next Tasks
- Confirm with user if they want email delivery integration
- Add Open Graph image + favicon (currently default)
