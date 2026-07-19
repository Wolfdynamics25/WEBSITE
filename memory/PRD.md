# Wolfdynamic Systems — EAGS Public Site

## Original Problem Statement
"Create a website for this without revealing confidential details" — user uploaded EAGS_brief_v8.pptx (investor deck for Wolfdynamic Systems Pvt. Ltd. building EAGS — India's first Wing-in-Ground effect autonomous cargo vehicle).

## User Choices (Latest)
- Hide: all financials, roadmap capital, stage costs, competitor cost tables, LOI partner names (MEHAIR, Wow Ferries etc), team compensation & bios
- Show: teaser + "launching soon"; India's first Wing-in-Ground effect vehicle for cargo; autonomy + electric
- Design vibe: **Defence-tech / tactical** (dark charcoal, amber-warning + OD-green accents, Saira Condensed + Barlow + JetBrains Mono)
- No contact form — just email (info@wolfdynamics.in)
- Removed: co-founder cards (Team section), Why Now section, footer status
- Use product renders + operations photos from the PPTX

## Architecture
- Frontend: React 19 + CRACO + Tailwind + shadcn/ui — dark defence-grade theme
- Backend: FastAPI + MongoDB with contact endpoints (currently unused since form removed but retained for future re-enable)
- Assets extracted from EAGS_brief_v8.pptx: /app/frontend/public/assets/{hero-render.jpg, ops-3.jpg, ops-4.jpg}

## Implemented (latest iteration)
- Sections: Nav, Hero (with product render + tactical HUD overlays), Narrative, Capabilities (6 tactical cards), Applications (6 cards + FRP Pontoon Port ops photo), Impact (SDGs + outcomes + remote coastal deployment photo), Contact (email only), Footer
- Removed: Team, Why Now, contact form, footer status
- All confidential info excluded; no partner logos on site
- Typography: Saira Condensed (display), Barlow (body), JetBrains Mono (labels)
- Palette: tac-900 charcoal base, amber-warn (#E87722) primary accent, OD-green secondary

## Backlog / Future
- P1: Email delivery of any future inquiries via Resend/SendGrid — currently no form
- P2: Press/media kit, careers page
- P2: Loading animation, favicon/OG image
- P2: Localisation (Hindi/Kannada)
