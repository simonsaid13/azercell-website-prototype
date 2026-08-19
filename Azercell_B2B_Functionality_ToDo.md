# Azercell B2B Website Revamp — Functionality To-Do List

Source: B2B Workshop Transcript (The Gradient + Azercell B2B core/solutions team). Note: transcript is a cleaned Otter.ai consolidation with some speaker labels and a few product names marked [unclear] in the source — flagged below where relevant.

**Legend**
- Unmarked = discussed as in-scope for the revamp (verify priority against the requirements backlog)
- 🔮 = explicitly deprioritized / future-facing, not committed for MVP
- ⚠️ = open question / decision still pending, needs follow-up with the B2B team

---

## 1. Core Site Model (cross-cutting)
- [ ] Confirm the website stays informational-only for core telco products — B2B customers can view tariff/service info but cannot make changes directly on the site today (same "no self-service transaction" model as B2C)
- [ ] Add the ability for **all** B2B users (not only the designated contact person) to submit requests through the website — currently only the contact person operates via the Azercell Business app, and the wider team has no equivalent path
- [ ] Support flexible, configurable offers that can be shared as links from the Azercell Business app and opened/actioned on the website
- ⚠️ Define what "submit a request" means precisely — a form submission vs. an actual self-service action — and how far self-service can go before requiring backend integration

## 2. Core vs. Solutions Portfolio Structure
- [ ] Structure the site around two clear top-level directions: **Core** (telco: mobile, fixed, ICT) and **Solutions** (non-telco: IoT, RPA, cybersecurity, AI, M2M) — keep them on separate pages/sections, not mixed
- [ ] Build fully flexible, CMS-configurable product/portfolio pages — team reports ~12–15 products in the portfolio today that cannot all be published due to current CMS limitations
- [ ] Add CMS-level reordering of products/packs (e.g. swapping the display order of recurring vs. non-recurring data packs) — not possible today
- [ ] Ensure the Solutions side can be expanded post-redesign to include IoT, NB-IoT, M2M, cybersecurity, and AI offerings — several are still in progress and will be added after launch, so the page/section structure must accommodate future additions without a rebuild

## 3. Core Products & Data Packs
- [ ] Prioritize visibility for top revenue generators: My Business bundle portfolio and core data packs
- [ ] Improve visibility/promotion for underperforming-but-important items: secondary data packs (e.g. social-network packs), My Business Wi-Fi campaigns, and Wi-Fi device campaigns (currently likely to be re-homed under the non-telco/Solutions side)
- [ ] Clarify and fix the "Wi-Fi/WTX" device naming on the current site ([unclear] in source — confirm actual product name with the B2B team before shipping copy)

## 4. Non-Telco Solutions (IoT, RPA, M2M, Cybersecurity, AI)
- [ ] Build dedicated, discoverable pages for each solution (IoT, NB-IoT, M2M, cybersecurity, AI, RPA, irrigation control, etc.) — several exist today but are hard to find or missing from the current site entirely
- [ ] Add short explanatory/FAQ-style content blocks under each solution page — these are reported as complex and hard for customers to understand without guidance
- 🔮 API-level integrations between the website and solution back-ends (e.g. surfacing live IoT data) — flagged as a future need, included in requirements, but not confirmed for this phase; informational pages are the near-term target
- ⚠️ Clarify which solutions the customer accesses through a separate system entirely (vs. purely informational website content) so the design can plan for either an "info only" page or an "info + integration" page per solution

## 5. Devices & E-Commerce
- [ ] Plan for B2B device sales (routers, modems, mobile devices, accessories) aligned with the B2C e-commerce initiative — B2B wants equivalent functionality, not just mobile devices
- [ ] Support device + tariff bundle campaigns (e.g. a smartphone bundled with a business plan under a commitment period) with clearer explanatory content — current plain-text explanation of installment/commitment terms is hard to understand
- [ ] Add richer content options for these bundle/device campaign pages: visuals, video, and flexible layout blocks (mirrors the same request raised in the B2C workshop)
- ⚠️ B2B e-commerce timeline is tied to the same platform B2C is waiting on — launch has already been delayed once; treat as dependency risk, not a fixed date

## 6. Roaming
- [ ] Keep Roaming as its own top-level nav item, separate from Mobile Services, Fixed Services, and ICT Solutions (agreed in workshop — it spans both telco and non-telco and needs to stay easy to find, same treatment as 5G)
- [ ] Preserve/verify cross-language country search — confirmed working today (e.g. searching "Germany" in Azerbaijani or English both resolve correctly); regression-test this in the rebuild
- [ ] Redesign the roaming internet-packs table/section (the "Internet packages in roaming" block) — flagged as needing an interface improvement, exact spec still to be confirmed with the B2B team
- [ ] Replace the current PDF-based "list of supported countries" linked from welcome SMS messages with a direct, always-current link into the live roaming country list on the website
- [ ] Support at least two distinct content views for roaming links: (a) pay-as-you-go rate info only, and (b) full list of countries where roaming internet packs are available — both need direct linkable URLs, not a pop-up window
- [ ] Consider a dedicated, standalone roaming landing page (separate from the main roaming page) for out-of-site campaigns — e.g. a QR code on a billboard or airport ad lands the user on a focused page first, with an optional path into the main site
- ⚠️ Confirm final structure/scope for the dedicated roaming landing page with the B2B team once a draft is available — described as easier to align on with something concrete to react to

## 7. FAQ & Help Content
- [ ] Build one unified FAQ database in the CMS, tagged by topic, so the same question/answer can be selectively surfaced on any relevant page (same requirement raised independently in the B2C workshop)
- [ ] In addition to product FAQs, add a general "how to use this website/app" explanatory section — e.g. what can be done here, how it works, who can log in — modeled on the existing info block on the Azercell Business app landing page
- [ ] Extend short explanatory/FAQ blocks to complex Solutions pages first (highest need), and to Core pages as well if useful
- [ ] Anticipate and pre-answer common customer questions directly on relevant pages, to reduce inbound calls to support

## 8. Search
- [ ] Fix inconsistent search matching — e.g. "data packs" currently fails to surface results while "internet packs" and "data" work; align indexing/synonyms so expected terms all resolve
- [ ] Add predictive/autocomplete search suggestions after the user types 1–2 characters, since customers often don't remember exact product names

## 9. UI Bugs & Cross-Language Stability
- [ ] Fix or remove the non-functional left/right carousel arrows found on at least one page during the walkthrough (same class of bug reported independently on the B2C side)
- [ ] Fix multilingual layout instability — text and table sizing currently shift/break when switching between AZ/EN/RU; layouts need to be robust across all three languages, not tuned to one

## 10. Campaigns & Promotions
- [ ] Design the campaigns section to scale — B2B currently runs very few campaigns (roughly one to two: My Business Wi-Fi, a device/smartphone campaign) versus many more on the B2C side, and more are expected over time
- [ ] Support flexible campaign-page content blocks: countdown timer, limited-edition badge, introductory video, and other presentation options (exact final list still open — see Open Items below)
- [ ] Plan to source/produce campaign videos incrementally — Marketing doesn't have a video for every product yet; reuse existing assets (e.g. the two videos already on the Azercell Business app page) and expand coverage over time

## 11. Homepage
- [ ] Structure the homepage around clear top-level categories: Mobile Services, Fixed Services, ICT Solutions, and a Help/FAQ section
- [ ] Surface customer segment/portfolio types and IoT solution highlights on the homepage — not present today
- [ ] Fix the rigid "5 featured products" homepage block (previously 4) — it is not responsive today; adding/removing/reprioritizing items currently shifts the entire page layout. Needs to flex automatically since this section is updated often as products/priorities change

## 12. Contact, Lead & Support Requests
- [ ] Keep the existing contact form flow: phone and email as primary channels, requests routed into a shared pool and picked up by an available sales agent
- [ ] Keep the Tax ID field on the contact/lead form — added specifically to filter for genuine business inquiries (its absence previously let non-business submissions through)
- [ ] Add a Jira-routed path for service/support requests (already used inside the Azercell Business app) as an additional channel alongside phone/email
- ⚠️ Loop in the relevant support-process stakeholder (referenced in the transcript as needed but not present in this session) before finalizing the service-request flow

## 13. Newsletter & Early-Access Program
- [ ] Verify with the Marketing team how the existing newsletter subscription field (page footer) is currently used, and keep it functioning in the rebuild
- 🔮 New idea, not yet confirmed with the B2B team: an "early access" opt-in section where existing B2B customers can apply to test new products/features before general release, positioned as a stronger alternative to easy-to-ignore newsletter emails
- ⚠️ B2B team to confirm internally (Product + Marketing) whether there's appetite for an early-access program before this is scoped further

## 14. Navigation, Footer & App Links
- [ ] Fix incorrect app-store links in the footer — currently point to the B2C consumer app instead of the Azercell Business app
- [ ] Split the footer so each stream (B2C/B2B) shows its own correct app links — footer is currently shared/identical across streams
- [ ] Add clear promotion and working links for the Azercell Business app, covering both the mobile app and the web app

## 15. Open Items / Follow-ups Requiring B2B Team Input
- ⚠️ Final list of campaign-page functionality (countdown timer, badges, video, etc.) — question was left unanswered in this session pending a specific B2B stakeholder (Mirhalik/Tayira, per transcript) and will be sent as a written follow-up question
- ⚠️ B2B team to share reference competitor/business websites they like (and dislike, with reasoning) to help align on visual/structural direction — action item on the Azercell side, not yet delivered as of this session
