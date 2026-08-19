# Azercell B2C Website Revamp — Functionality To-Do List

Source: B2C Workshop Transcript, Tue Jul 28, 2026 (The Gradient + Azercell core/loyalty teams).

**Legend**
- Unmarked = discussed as in-scope for the revamp (verify priority against the requirements backlog)
- 🔮 = explicitly deprioritized to a future phase during the workshop (not MVP)
- ⚠️ = open question / decision still pending, needs follow-up

---

## 1. Core Site Model (cross-cutting)
- [ ] Confirm/design the entire site as informational + redirect-only — no self-service transactions (no tariff change, no pack purchase, no login) will be built into the website itself
- [ ] For every "buy / change / activate" action, design a consistent redirect/instruction pattern: USSD code, deep link to the Kabinetim app, or link to web Kabinetim
- [ ] Add QR-code generation/display for tariffs and internet packs so users can scan-to-activate via the mobile app (confirmed requirement — ref. requirements doc section 3.6, "URL management, QR codes and pop-up system")
- ⚠️ Clarify legal requirements around tariff/pack duration wording to avoid customer disputes (e.g. a "1 day" validity actually meaning a defined time window, not a full 24 hours)

## 2. Tariffs (Prepaid / Postpaid)
- [ ] Build tariff discovery flow (browse + filter)
- [ ] Build tariff comparison functionality (compare multiple tariffs side by side)
- [ ] Redesign tariff pages as informational hubs only — CTA leads to USSD/app instructions, not a self-service subscribe/change action
- [ ] Rebuild tariff card layout to be CMS-flexible (not fixed cards) — allow product owners to add images/extra blocks while keeping design consistency
- [ ] Add manageable "announcement" boxes above tariff cards for time-sensitive updates, toggleable visible/hidden via CMS
- [ ] Fix tariff card carousel on mobile — scroll arrows/dots are currently broken/invisible, needs a clear scroll affordance
- [ ] Rebuild the subplan comparison table as a CMS-manageable, paste-in-friendly component (today it's custom-built outside the CMS, entered cell by cell manually)
- [ ] De-emphasize (visually, while staying compliant) the "all prices VAT inclusive" legal disclaimer block — currently oversized relative to its importance
- [ ] Clearly differentiate archived/legacy tariffs from active ones (visible badge/label)
- [ ] Add a pop-up/banner notice when a user lands on an archived tariff page from external search (Google), so it isn't mistaken for an active offer
- [ ] Keep archive tariff pages publicly accessible — legally required, since existing subscribers on legacy plans still need to reference pricing/terms
- [ ] Fix site search so relevant/active tariffs surface before archived ones (archive pages currently rank first)
- [ ] Fix general site search relevance (e.g. searching "tariff" currently returns roughly 250 loosely related results)
- 🔮 Bundling tariffs with 3rd-party digital services — floated as a future direction, no near-term plan

## 3. Internet Packs
- [ ] Build a discovery/browse flow for internet packs, same informational + redirect-only model as tariffs
- [ ] Keep pack categorization restructurable — current groupings (High-volume/Monthly, Weekly, Daily, Unlimited) mix duration and volume logic and are expected to change (e.g. a future "15-day" pack); avoid hardcoding today's taxonomy into a rigid layout
- [ ] Add CMS-manageable custom sort order for packs (product owners want manual/custom sequencing, not just price or alphabetical)
- [ ] Support QR-code purchase (see Core Site Model)

## 4. Roaming
- [ ] Build roaming discovery: search/select a country → see supported operators + rates
- [ ] Fix the broken "activate roaming" info link found during the site walkthrough (currently leads nowhere)
- [ ] Redesign roaming price tables for proper mobile responsiveness — current horizontal scroll has no clear affordance/indicator
- [ ] Design a CMS-manageable roaming rate table system to replace the current Excel-to-table manual conversion workaround (~190 countries, plus a near-duplicate table for the B2B section)
- [ ] Redesign the "how to activate roaming" tutorial video block — currently 5 videos in a flat carousel with low discoverability; explore a more contextual/story-driven format (problem → matching video) — flagged as a nice-to-have improvement, not a blocker
- [ ] Support "activate/deactivate roaming" as a documented user job fulfilled via the mobile app/USSD — no self-service on the website itself

## 5. Number Acquisition & eSIM
- [ ] Design "buy new number," "switch operator (port-in)," and "buy eSIM" as promotional/informational flows only — actual purchase happens on azercellim.com (or its eventual replacement) or via the mobile app
- [ ] Add clear redirect/entry points from relevant B2C pages to azercellim.com for number/eSIM purchase
- [ ] Keep the eSIM page focused on tutorial/informational content (how to activate) — the transactional flow lives on azercellim.com
- ⚠️ azercellim.com remains an independent portal until a future unified e-commerce solution replaces it — no fixed timeline given

## 6. Devices
- [ ] Expand device categories shown — currently only smartphones (not displaying correctly) and Wi-Fi modems; must also include MiFi devices, kids' smartwatches, and other device types
- [ ] Design device pages as informational + promotional only (specs, images, pricing) — no in-site checkout
- [ ] Add a CTA on each device page redirecting to the future e-commerce platform — not yet built (planning stage, 1–2 year horizon); redirect target/behavior until then is TBD
- [ ] Build a flexible, CMS-manageable "pre-order" form component as an interim purchase-intent mechanism (name, phone, email, preferred contact) — the previous version was removed because captured data wasn't easily exportable/shareable with product owners; the new one must support easy export
- [ ] Support device promotional/campaign pages (e.g. an "iPhone campaign" page) that can host their own forms/CTAs distinct from the general device catalogue
- [ ] Ensure device pricing, images, and promotional banners/countdowns are all CMS-manageable
- ⚠️ Once the e-commerce platform exists, decide whether device data (price, stock) syncs automatically from it or continues to be entered manually in the website CMS (assumed manual/separate at launch)
- ⚠️ Design redirect links to support deep-linking to a specific product/variant once e-commerce exists (e.g. product ID/color as a URL parameter), so users aren't dropped on a generic homepage

## 7. AI Assistant / Chatbot
- [ ] Build a simple, informational-only chat bubble/widget for MVP — no account actions, no transactions
- [ ] Keep the website side to interface-only — all AI logic, models, and orchestration run on Azercell's side (in-house chatbot, first tested on "TGMAX Cloud")
- [ ] Ensure website content is scrapeable/indexable into Azercell's vector database, the chatbot's source of truth — plan for structured, crawler-friendly content
- [ ] Add the ability for the chatbot to hand off to a human customer-service agent
- 🔮 Context-aware/proactive assistant (e.g. a prompt appears on the Roaming page offering roaming-specific help) — discussed as a possible direction, not committed for MVP
- 🔮 Action-based assistant (e.g. user turns on roaming directly via chat) — explicitly deferred to a future phase; MVP is informational-only

## 8. FAQ & Support
- [ ] Keep the FAQ page/section, organized by category as today
- [ ] Manage all FAQ content through a centralized CMS shared across Azercell's web properties
- [ ] Solve the current FAQ duplication problem — the same Q&A often exists both on a product page and on the standalone FAQ page, edited manually and inconsistently; needs a single-source, auto-synced content model
- ⚠️ Full FAQ/CMS content architecture to be finalized in the dedicated CMS workshop (flagged as out of scope for this session)

## 9. Digital / Third-Party Apps (Yandex Plus, Busuu, Litres, Kinon, etc.)
- [ ] Add a pinned/sticky "Subscribe" button on every app page (currently scrolls out of view)
- [ ] Add 3–5 high-level USP icons per app/service (e.g. "offline access" for Kinon)
- [ ] Add a one-tap activation button per service, deep-linking to USSD/SMS/the Kabinetim app to minimize friction
- [ ] Audit the section against the full live app catalogue and add any missing services (at least one service — referenced in the transcript as "Bink Seer," likely a mis-transcription — was reported missing; confirm the actual name)
- [ ] Add a contact/support option per app page (call centre, email, or chat), since support channels differ by app
- [ ] Add a lightweight issue-report form per app (what happened, when, contact info) so users can report app-specific problems directly from the page
- [ ] Establish and enforce brand-mixing guidelines for 3rd-party service pages — background/block colors may adapt to partner branding, but buttons, fonts, and core UI components stay on Azercell's design system
- [ ] Preserve this section's current CMS flexibility (custom blocks/images) as the model — called out by the Azercell team as the most flexible, best-working layout system today

## 10. Campaigns
- [ ] Rebuild the campaign page template to support more than plain article text — add data tables, custom buttons, and countdown timers
- [ ] Separate "device campaigns" as a distinguishable sub-type within the Campaigns section
- [ ] Support flagship/large campaigns (e.g. lottery) with the ability to be highlighted differently from regular campaigns
- [ ] Support seasonal campaigns with maximum layout flexibility (structure should be easy to rearrange per campaign)
- [ ] Make campaign end-dates optional per campaign — some have a known end date, others don't (stating a false end date is a legal risk); when known, support a countdown/badge (e.g. "2 days left")
- [ ] Review and likely resolve the "Hot Offers" vs. "Current Offers" duplication on the campaigns overview page (the same campaigns currently appear in both)
- [ ] Decouple campaign card copy (title/subtitle on the listing page) from hero banner copy — currently auto-mirrored 1:1, forcing all-or-nothing detail; allow a short title-only card even when the hero banner has a full headline + description
- [ ] Design the campaigns list/grid to scale to roughly 20–25 concurrent active campaigns across all sub-sections without feeling cluttered
- [ ] Support configurable pop-ups tied to specific offers (e.g. a promotional pop-up for akart) — CMS-managed, no-dev-required toggle
- [ ] Cap and make manageable the number of homepage/menu promotional slots (e.g. up to ~5 hero banner slides plus a limited, configurable set of offer pop-ups)
- [ ] Redesign the countdown-timer component used on campaign/hero sections — current version is a bare, plain-styled line; confirm it continues to work correctly on both desktop and mobile

## 11. akart Entry Point
- [ ] Keep the akart link/entry point live on the B2C site
- [ ] Support akart-specific promotional pop-ups (see Campaigns — configurable offer pop-ups)

## 12. Homepage
- [ ] Finalize homepage structure with the Azercell team based on the concept/prototype already shared for review — current homepage is considered too short relative to the breadth of B2C offerings
- [ ] Design the homepage as a fuller "index" to the B2C catalogue: more prominent tariff access, quick actions, a devices preview, and stronger promotion of 3rd-party/digital services
- ⚠️ Pending Azercell stakeholder review/feedback on the shared prototype before finalizing direction

## 13. Personalization (explicitly out of MVP scope)
- 🔮 No login/account layer on the website in MVP — it remains a stand-alone, non-authenticated experience
- 🔮 No personalized content, recommendations, or "recently viewed" (e.g. recently viewed devices) in MVP
- 🔮 No segmented/targeted campaign display based on identified users in MVP
- 🔮 Cookie-based lightweight personalization was floated as an idea but flagged as needing legal review — not decided

## 14. Content Migration (cross-cutting — affects every section above)
- [ ] Define a proper content migration plan and timeline aligned with the new CMS and revamped layouts (the prior revamp's manual migration was explicitly called out as painful)
- ⚠️ Full migration approach to be finalized in the dedicated CMS workshop
