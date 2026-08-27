# Page Connections Registry

Tracks how built pages link to each other. Update this file whenever a page is built or navigation changes.

**Legend**

| Status | Meaning |
|--------|---------|
| CONNECTED | Links to a built page or a real external URL |
| PLANNED | Links via `href()` to `/planned/?path=…` — page exists in sitemap but not built yet |
| MISSING | No link yet — needs a decision (ask the user) |
| N/A | Section has no navigation role |

When asked "what is not connected for X?", read this file plus the `PAGE CONNECTIONS` comment block in that page's HTML.

---

## Tab URLs (site-wide rule)

**Every tab that changes page content must have its own link.** Users must be able to bookmark, share, and arrive from header/footer on the correct tab.

| Requirement | How |
|-------------|-----|
| In-page tabs | `filterTabs` with `syncUrl: true`, `urlBase`, `urlParam` |
| Tab markup | Real `<a href="…">` links (not buttons only) |
| Address bar | Updates on tab click; back/forward works |
| Navigation | Header/footer use the same query params (e.g. `tariffFilterHref('prepaid')`) |
| Docs | List tab URLs under each built page below + inline page comment |

Default pattern: query param on the page path — `/path/?type=value`. "All" = no param.

---

## Built pages — inbound (how users get there)

| Page | Connected from | Status |
|------|----------------|--------|
| `/` | Logo, branch switcher, `/business/` switcher | CONNECTED |
| `/business/` | Logo (B2B), branch switcher, B2C homepage company links | CONNECTED |
| `/tariffs/mobile/` | Header → Mobile → Tariffs; Prepaid (`?type=prepaid`); Postpaid (`?type=postpaid`); Footer → Mobile → Tariffs; Homepage acquisition → Choose a tariff; Compare page → Browse all tariffs | CONNECTED |
| `/tariffs/compare/` | Homepage → Compare all plans, Compare all tariffs; `/tariffs/mobile/` → Compare plans; Plan cards → Compare (via `?add=` handoff) | CONNECTED |
| `/tariffs/mobile/prepaid/digimax/` | Homepage + hub Plan details; header Popular plans; compare | CONNECTED |
| `/tariffs/mobile/prepaid/premium-plus/` | Homepage + hub Plan details; header Popular plans; compare | CONNECTED |
| `/tariffs/mobile/prepaid/data-plus/` | Homepage + hub Plan details; header Popular plans; compare | CONNECTED |
| `/tariffs/mobile/prepaid/data/` | Homepage + hub Plan details; header Popular plans; compare | CONNECTED |
| `/tariffs/mobile/prepaid/veteran/` | Homepage + hub Plan details; header Popular plans; compare | CONNECTED |
| `/tariffs/mobile/postpaid/alfa/` | Homepage + hub Plan details; header Popular plans; compare | CONNECTED |
| `/tariffs/internet/` | Header → Mobile → Internet; footer → Mobile → Internet; `/tariffs/mobile/` upsell; floating bar → Internet | CONNECTED |
| `/tariffs/internet/monthly/` | Header → Mobile → Internet → High volume; `/tariffs/mobile/` upsell; floating bar → Internet → High volume; tariff detail addon grids | CONNECTED |
| `/tariffs/internet/weekly/` | Header → Mobile → Internet → Weekly; `/tariffs/mobile/` upsell; floating bar → Internet → Weekly | CONNECTED |
| `/tariffs/internet/daily/` | Header → Mobile → Internet → Daily; `/tariffs/mobile/` upsell; floating bar → Internet → Daily | CONNECTED |
| `/tariffs/internet/unlimited/` | Header → Mobile → Internet → Unlimited; `/tariffs/mobile/` upsell; floating bar → Internet → Unlimited | CONNECTED |
| `/tariffs/roaming/` | Header → Mobile → Roaming; homepage hero → Roaming rates; `/tariffs/mobile/` related; floating bar → Roaming | CONNECTED |
| `/tariffs/roaming/internet-packs/` | Header → Mobile → Roaming → Roaming internet packs; footer → Mobile → Roaming; `/tariffs/mobile/` quick action; hub cross-sell; floating bar → Roaming | CONNECTED |
| `/tariffs/roaming/travel-packs/` | Header → Mobile → Roaming → Travel packs; homepage hero → See travel packs | CONNECTED |
| `/tariffs/roaming/countries-and-prices/` | Header → Mobile → Roaming → Countries & prices | CONNECTED |
| `/join-azercell/transfer-number/` | Homepage acquisition → Transfer your number; header Mobile → e-Sim → Move number to e-SIM | CONNECTED |

**Tab URLs on `/tariffs/mobile/`:** `?type=prepaid`, `?type=postpaid`, `?type=data-only`, or no param for All. Tabs update the URL when clicked.

**Country lookup URLs:** `/tariffs/roaming/?country={id}` and `/tariffs/roaming/countries-and-prices/?country={id}` — shareable destination lookup. Catalog nav on all roaming pages appends `#roaming-catalog`.

---

## `/` — B2C Homepage

| Section / link | Target | Status |
|----------------|--------|--------|
| Hero → See DigiMax packs | `/tariffs/mobile/prepaid/digimax/` | CONNECTED |
| Hero → Compare all tariffs | `/tariffs/compare/` | CONNECTED |
| Hero → Roaming rates | `/tariffs/roaming/` | CONNECTED |
| Hero → See travel packs | `/tariffs/roaming/travel-packs/` | CONNECTED |
| Acquisition → Get a number | azercellim.com | CONNECTED (external) |
| Acquisition → Transfer your number | `/join-azercell/transfer-number/` | CONNECTED |
| Acquisition → Choose a tariff | `/tariffs/mobile/` | CONNECTED |
| Acquisition → Switch to e-SIM | `/tariffs/esim/` | PLANNED |
| Acquisition → Get an Internet | `/tariffs/internet/` | CONNECTED |
| Tariffs section → Compare all plans | `/tariffs/compare/` | CONNECTED |
| Plan cards → Compare | `/tariffs/compare/?add=…` | CONNECTED |
| Plan cards → Plan details | All 6 mobile tariff detail pages — CONNECTED |
| Plan cards → Activate in Kabinetim | kabinetim.azercell.com | CONNECTED (external) |
| Devices section | `/devices/` | PLANNED |
| Services link cards | Roaming CONNECTED; eSIM, 5G, Aicell routes | PLANNED (non-roaming) |
| Kinon split banner | `/apps/cinema-and-tv/kinon/` | PLANNED |
| Footer columns | Mixed built/planned via `href()` — see Footer section | Mixed |
| Header nav (all items) | See `site-registry.js` → `SITE_CHROME.nav` | Mixed |
| Floating bar | See Floating bar section | Mixed |

**Note:** The old 4-item quick actions row was replaced by the acquisition block (5 cards). Support chat was removed site-wide.

---

## `/tariffs/mobile/` — Mobile tariffs hub

| Section / link | Target | Status |
|----------------|--------|--------|
| Quick action → Activate in Kabinetim | kabinetim.azercell.com | CONNECTED (external) |
| Quick action → Join Azercell | `/join-azercell/` | PLANNED |
| Quick action → Switch to eSIM | `/tariffs/esim/` | PLANNED |
| Quick action → Roaming packs | `/tariffs/roaming/internet-packs/` | CONNECTED |
| Section head → Compare plans | `/tariffs/compare/` | CONNECTED |
| Plan cards → Compare | `/tariffs/compare/?add=…` | CONNECTED |
| Plan cards → Plan details | All 6 mobile tariff detail pages — CONNECTED |
| Plan cards → Activate / Find store | Kabinetim or `/stores/` | CONNECTED |
| Archive callout → Prepaid tariffs archive | `/tariffs/mobile/prepaid/archive/` | CONNECTED |
| Help → Change plan in Kabinetim | kabinetim.azercell.com | CONNECTED (external) |
| Help → Change plan in store | `/stores/` | PLANNED |
| Internet upsell → pack sub-pages | `/tariffs/internet/monthly/` etc. | CONNECTED |
| Internet upsell → See all internet packs | `/tariffs/internet/` | CONNECTED |
| Related services | Roaming CONNECTED; eSIM, 5G, Aicell | PLANNED (non-roaming) |
| Legal → Prepaid archive | `/tariffs/mobile/prepaid/archive/` | CONNECTED |

**Inbound:** See table above. **Filter deep links:** `?type=prepaid` and `?type=postpaid` from header — CONNECTED.

---

## `/tariffs/compare/` — Tariff comparison tool

| Section / link | Target | Status |
|----------------|--------|--------|
| Step 1 → pick tariffs | In-page (2–4 plans) | CONNECTED |
| Step 2 → switch price tiers | In-page per column | CONNECTED |
| Step 2 → change plan in column | In-page dropdown | CONNECTED |
| Plan details CTA | All 6 mobile tariff detail pages — CONNECTED |
| Activate / Find store CTA | Kabinetim or `/stores/` | CONNECTED |
| Browse all tariffs | `/tariffs/mobile/` | CONNECTED |
| Callout → All mobile tariffs | `/tariffs/mobile/` | CONNECTED |

**Handoff from plan cards:** `?add={tariff-id}&tier={index}` — consumed on load, not a shareable full comparison state.

---

## `/tariffs/mobile/prepaid/digimax/` — DigiMax detail

**Pack deep links:** `?tier=d1`, `?tier=d7`, `?tier=d3`, `?tier=d5`, `?tier=d10`, `?tier=d25` — scrolls carousel to pack card.

| Section / link | Target | Status |
|----------------|--------|--------|
| Pack carousel → Activate / Compare | Kabinetim, `/tariffs/compare/?add=digimax` | CONNECTED |
| Internet add-ons | `/tariffs/internet/monthly/` | CONNECTED |
| FAQ accordion | In-page | CONNECTED |
| Cross-links → Compare, All mobile tariffs | `/tariffs/compare/`, `/tariffs/mobile/` | CONNECTED |

**Inbound:** See built pages table above.

---

## Other mobile tariff detail pages

Same layout pattern as DigiMax (pack carousel + FAQ + cross-links). Each has `?tier=` deep links to individual packs.

| Page | Compare handoff | Inbound |
|------|-----------------|---------|
| `/tariffs/mobile/prepaid/premium-plus/` | `?add=premium-plus` | Homepage, hub, header, compare, archive promo |
| `/tariffs/mobile/prepaid/data-plus/` | `?add=data-plus` | Homepage, hub, header, compare |
| `/tariffs/mobile/prepaid/data/` | `?add=data` | Homepage, hub, header, compare |
| `/tariffs/mobile/prepaid/veteran/` | `?add=veteran` | Homepage, hub, header, compare |
| `/tariffs/mobile/postpaid/alfa/` | `?add=alfa` | Homepage, hub, header, compare, archive promo |

**Shared outbound:** Kabinetim (external), `/tariffs/compare/`, `/tariffs/mobile/`, internet add-ons where shown — CONNECTED.

---

## `/tariffs/internet/` — Internet packs hub

| Section / link | Target | Status |
|----------------|--------|--------|
| Category nav → sub-pages | `/tariffs/internet/monthly/` etc. | CONNECTED |
| Featured pack cards → category pages | Sub-page CTAs on each card | CONNECTED |
| Cross-sell → Compare, prepaid tariffs | `/tariffs/compare/`, `/tariffs/mobile/?type=prepaid` | CONNECTED |
| Related → mobile tariffs, roaming | `/tariffs/mobile/`, `/tariffs/roaming/` | CONNECTED |
| Quick action → Kabinetim | kabinetim.azercell.com | CONNECTED (external) |

**Inbound:** Header → Mobile → Internet; footer → Mobile → Internet; `/tariffs/mobile/` → See all internet packs; floating bar → Internet.

---

## `/tariffs/internet/monthly/` — High-volume / Monthly

**Filter URLs:** `?volume=30-50`, `?sort=price-asc`, `?sort=price-desc`.

| Section / link | Target | Status |
|----------------|--------|--------|
| Pack cards → Kabinetim | kabinetim.azercell.com | CONNECTED (external) |
| Category nav | Hub + sibling categories | CONNECTED |
| Cross-sell → Compare, DigiMax 25GB | `/tariffs/compare/`, `/tariffs/mobile/prepaid/digimax/` | CONNECTED |

**Inbound:** Header → Mobile → Internet → High volume; `/tariffs/mobile/` upsell; floating bar → Internet → High volume; all 6 tariff detail addon grids.

---

## `/tariffs/internet/weekly/` — Weekly

**Filter URLs:** `?sort=price-asc`, `?sort=price-desc`.

| Section / link | Target | Status |
|----------------|--------|--------|
| Pack card → Kabinetim | kabinetim.azercell.com | CONNECTED (external) |
| Cross-sell → DigiMax | `/tariffs/mobile/prepaid/digimax/` | CONNECTED |

**Inbound:** Header → Mobile → Internet → Weekly; `/tariffs/mobile/` upsell; floating bar → Internet → Weekly.

---

## `/tariffs/internet/daily/` — Daily

**Filter URLs:** `?volume=60-500`, `?sort=price-asc`, `?sort=price-desc`.

| Section / link | Target | Status |
|----------------|--------|--------|
| Pack cards → Kabinetim | kabinetim.azercell.com | CONNECTED (external) |
| Cross-sell → DigiMax packs | `/tariffs/mobile/prepaid/digimax/` | CONNECTED |

**Inbound:** Header → Mobile → Internet → Daily; `/tariffs/mobile/` upsell; floating bar → Internet → Daily.

---

## `/tariffs/internet/unlimited/` — Unlimited

**Filter URLs:** `?sort=price-asc`, `?sort=price-desc`.

| Section / link | Target | Status |
|----------------|--------|--------|
| Pack cards → Kabinetim | kabinetim.azercell.com | CONNECTED (external) |
| Cross-sell → Weekly packs, DigiMax Weekly | `/tariffs/internet/weekly/`, DigiMax detail | CONNECTED |

**Inbound:** Header → Mobile → Internet → Unlimited; `/tariffs/mobile/` upsell; floating bar → Internet → Unlimited.

---

## `/tariffs/roaming/` — Roaming hub

**Country lookup URLs:** `?country=turkiye`, `?country=georgia`, `?country=germany`, etc.

| Section / link | Target | Status |
|----------------|--------|--------|
| Catalog nav → sibling pages | internet-packs, countries, travel-packs | CONNECTED |
| Country search → results | In-page + `?country=` URL sync | CONNECTED |
| Featured pack → all packs | `/tariffs/roaming/internet-packs/#roaming-catalog` | CONNECTED |
| Pack card → Kabinetim | kabinetim.azercell.com | CONNECTED (external) |
| Cross-sell → internet-packs, compare | Built routes | CONNECTED |
| Related → internet, mobile, sibling roaming | Built routes | CONNECTED |

**Inbound:** Header → Mobile → Roaming; homepage hero; `/tariffs/mobile/` related; floating bar → Roaming.

---

## `/tariffs/roaming/internet-packs/` — Roaming internet packs

| Section / link | Target | Status |
|----------------|--------|--------|
| Pack cards → Kabinetim | kabinetim.azercell.com | CONNECTED (external) |
| Supported countries table | In-page sample data | CONNECTED |
| Cross-sell → Premium+, compare | Built routes | CONNECTED |
| Catalog nav | Hub + siblings | CONNECTED |

**Inbound:** Header → Mobile → Roaming → Roaming internet packs; footer → Mobile → Roaming; `/tariffs/mobile/` quick action; hub cross-sell; floating bar → Roaming.

---

## `/tariffs/roaming/travel-packs/` — Travel packs (tourist)

| Section / link | Target | Status |
|----------------|--------|--------|
| Pack cards → azercellim.com | azercellim.com | CONNECTED (external) |
| Cross-sell → internet-packs | Built route | CONNECTED |
| Catalog nav | Hub + siblings | CONNECTED |

**Inbound:** Header → Mobile → Roaming → Travel packs; homepage hero → See travel packs.

---

## `/tariffs/roaming/countries-and-prices/` — Countries and prices

**Country lookup URLs:** `?country={id}` — same pattern as hub.

| Section / link | Target | Status |
|----------------|--------|--------|
| Country search + prepaid/postpaid toggle | In-page | CONNECTED |
| Cross-sell → internet-packs, hub | Built routes | CONNECTED |
| Catalog nav | Hub + siblings | CONNECTED |

**Inbound:** Header → Mobile → Roaming → Countries & prices.

---

## `/business/` — Business homepage

| Connection | Target | Status |
|----------------|--------|--------|
| Tariff carousel → Plan details | `/business/mobile/tariffs/` | PLANNED |
| Internet packs, solutions, IoT sections | New canonical `/business/…` IA routes | PLANNED |
| Lead form handoff | Contact / *6050 | CONNECTED |
| Announcement bar | Personal `SITE_CHROME.announcements` | CONNECTED |
| Header nav | `SITE_CHROME.businessNav`; Business audience tab active | PLANNED destinations via working placeholders |
| Floating bar | Personal `SITE_CHROME.floatingBar` | Mixed (see Floating bar section) |
| Footer | `SITE_CHROME.businessFooter` | Mixed: external/legal connected; B2B destinations planned |

### Business header (`SITE_CHROME.businessNav`)

Desktop category labels navigate to their landing pages. Hover/focus or the adjacent chevron opens the mega menu. Mobile uses a category link plus a separate expand control.

| Category | Landing / children | Status |
|----------|--------------------|--------|
| Company | `/about/…` | PLANNED; Careers and Azercell Life external |
| Mobile | `/business/mobile/…` | PLANNED |
| Connectivity | `/business/connectivity/…` | PLANNED; Fixed service relationship on hold |
| IoT & M2M | `/business/iot/…` | PLANNED |
| Fleet & field operations | `/business/fleet-field-operations/…` | PLANNED; separate Fleet package page on hold |
| Automation & management | `/business/automation-management/…` | PLANNED |
| Customer engagement | `/business/customer-engagement/…` | PLANNED |
| Campaigns | `/business/campaigns/…` | PLANNED |
| Support | `/business/support/…` | PLANNED |
| Header → Azercell Biznes | biznes.azercell.com | CONNECTED (external) |
| Header → Log in | `/business/login/` | PLANNED; final destination pending |

### Business footer (`SITE_CHROME.businessFooter`)

Uses the responsive Personal footer shell with the confirmed B2B groups, `*6050`, Campaigns links, a My Business Club banner, and an Azercell Biznes app banner. Unknown store destinations are intentionally non-clickable.

---

## Header navigation (`SITE_CHROME.nav` — B2C Personal)

Personal chrome: Company, Mobile, TV, Apps, Devices, Campaigns, Support. Business uses the same responsive shell with its own data and interaction rules.

| Nav item | Target | Status |
|----------|--------|--------|
| Company → About us, Media, CSR, Sustainability, Careers, Academy, Contact, Awards | `/about/…` routes | PLANNED |
| Company → Azercell Life | azercellliler.azercell.com | CONNECTED (external) |
| Mobile → Tariffs | `/tariffs/mobile/` | CONNECTED |
| Mobile → Tariffs → Prepaid | `/tariffs/mobile/?type=prepaid` | CONNECTED |
| Mobile → Tariffs → Postpaid | `/tariffs/mobile/?type=postpaid` | CONNECTED |
| Mobile → Tariffs → Tariffs archive | `/tariffs/mobile/prepaid/archive/` | CONNECTED |
| Mobile → Internet (+ High volume, Weekly, Daily, Unlimited) | `/tariffs/internet/…` | CONNECTED |
| Mobile → Roaming (+ internet packs, countries, travel packs) | `/tariffs/roaming/…` | CONNECTED |
| Mobile → Services column | `/tariffs/services/…` | PLANNED |
| Mobile → e-Sim → About e-Sim | `/tariffs/esim/` | PLANNED |
| Mobile → e-Sim → Buy e-Sim | azercellim.com | CONNECTED (external) |
| Mobile → e-Sim → Move number to e-SIM | `/join-azercell/transfer-number/` | CONNECTED |
| Mobile → Network (5G, VoLTE, Network support) | `/tariffs/5g/`, `/tariffs/volte/`, `/support/internet/` | PLANNED |
| TV → Kinon | `/apps/cinema-and-tv/kinon/` | PLANNED |
| Apps (all items) | `/apps/…` routes | PLANNED (aKart external CONNECTED) |
| Devices (Catalog, shop, info links) | `/devices/` | PLANNED |
| Campaigns (all items) | `/campaigns/…` | PLANNED |
| Support (Help, Talk to Support, FAQs, Locations) | `/help/`, `/support/`, `/stores/` | PLANNED |
| Header → Join Azercell | `/join-azercell/` | PLANNED |
| Header → Log in | kabinetim.azercell.com | CONNECTED (external) |

---

## Footer (`SITE_CHROME.footer` — B2C Personal)

The Business footer preserves this shell, subscription, legal, social, language and copyright behavior but supplies separate B2B navigation and banners.

| Footer group / link | Target | Status |
|---------------------|--------|--------|
| About Azercell column | `/about/…` routes | PLANNED (Azercell Life external CONNECTED) |
| Mobile → Tariffs, Internet, Roaming | Built tariff routes | CONNECTED |
| Mobile → Services, e-Sim, Network | Planned routes | PLANNED |
| Devices column | `/devices/` | PLANNED |
| Campaigns column | `/campaigns/…` | PLANNED |
| Support column | `/help/`, `/support/`, `/about/contact/`, `/stores/` | PLANNED (`tel:1111` CONNECTED) |
| App download card | `/apps/kabinetim/` | PLANNED |
| Legal → Sitemap | `/sitemap/` via `tool: 'sitemap'` | CONNECTED (internal tool — user-requested) |
| Legal → Privacy, Cookie, Terms, Accessibility | Planned routes | PLANNED |
| Social links | Facebook, X, YouTube, Instagram | CONNECTED (external) |

---

## Floating bar (`SITE_CHROME.floatingBar` — Personal routes and Business pages)

Shown on `/business/` and B2B planned placeholders with the same Internet, Tariffs, Roaming, Kinon popovers and Search link as Personal. On `/join-azercell/transfer-number/` the bar switches to a Start transfer CTA after the hero button scrolls away.

| Item | Target | Status |
|------|--------|--------|
| Search | `/search/` | PLANNED |
| Internet (+ High volume, Weekly, Daily, Unlimited) | `/tariffs/internet/…` | CONNECTED |
| Tariffs (+ Prepaid, Postpaid, archive) | `/tariffs/mobile/…` | CONNECTED |
| Roaming (+ internet packs, countries, travel packs) | `/tariffs/roaming/…` | CONNECTED |
| Kinon | `/apps/cinema-and-tv/kinon/` | PLANNED |

---

## `/join-azercell/transfer-number/` — Transfer your number

| Section / link | Target | Status |
|----------------|--------|--------|
| transferHero → Start transfer | azercellim.com | CONNECTED (external) |
| floatingBar → Start transfer (after scroll) | azercellim.com | CONNECTED (external) |
| floatingBar → Search | `/search/` | PLANNED |
| header/footer | `SITE_CHROME.nav` + `SITE_CHROME.footer` | Mixed (see sections above) |

**Inbound:** Homepage acquisition → Transfer your number; header Mobile → e-Sim → Move number to e-SIM.

---

## `/tariffs/mobile/prepaid/archive/` — Prepaid tariffs archive

| Section / link | Target | Status |
|----------------|--------|--------|
| Section head → Current mobile tariffs | `/tariffs/mobile/` | CONNECTED |
| Archive cards → Legacy plan detail | `/tariffs/mobile/prepaid/archive/{slug}/` | PLANNED |
| Search + pagination | In-page (`?q=`, `?page=`) | CONNECTED |
| Promo callout → DigiMax | `/tariffs/mobile/prepaid/digimax/` | CONNECTED |
| Promo callout → All mobile tariffs | `/tariffs/mobile/` | CONNECTED |
| Promo cards → DigiMax, Premium+, Alfa | Individual detail routes | CONNECTED |

**Inbound:** Header → Mobile → Tariffs → Tariffs archive; `/tariffs/mobile/` callout banner + legal link.

---

## Gaps worth deciding (ask user before wiring)

| Gap | Question |
|-----|----------|
| `/tariffs/` parent hub | Build hub page, or keep redirecting nav to `/tariffs/mobile/`? |
| Top-level header "Tariffs" item | Add a direct nav item, or keep under Mobile menu only? |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-08-27 | Rebuilt the Business mega menu, footer and page registry around the confirmed B2B IA. Category labels now navigate while hover/focus and chevrons expose menus; mobile separates link and expand controls. All unbuilt destinations use the existing `/planned/?path=…` flow. |
| 2026-08-27 | Business homepage now reuses the complete Personal announcement bar, responsive header/navigation, floating shortcut bar with popovers, and Personal footer. Business content remains unchanged. |
| 2026-08-26 | Personal chrome swap — Vlad header/footer/floating bar on B2C pages. Homepage acquisition block replaces quick actions. Support chat removed. Built `/join-azercell/transfer-number/` with inbound from acquisition + header e-SIM. Footer Sitemap → `/sitemap/` (user-requested). Business keeps classic chrome, no chat, no floating bar. |
| 2026-08-04 | Built B2C roaming section — hub, internet-packs, travel-packs, countries-and-prices. Country search with ?country= URL sync, ~35 sample destinations, header/footer/homepage/mobile links CONNECTED. |
| 2026-08-04 | Built B2C mobile internet packs — hub + monthly/weekly/daily/unlimited. 10 packs, filters, cross-sell banner, header/footer/tariff upsell links CONNECTED. |
| 2026-08-03 | Built `/tariffs/mobile/prepaid/archive/` — 20 legacy plans, working search + pagination (8/page), promo section for current plans. |
| 2026-08-03 | Full connection pass — header Popular plans (Data+, Data), archive promos CONNECTED, component `usedOn` for all 6 detail pages. |
| 2026-08-03 | Built all 6 mobile tariff detail pages — pack carousel layout shared across DigiMax, Premium+, Data+, Data, Veteran, Alfa. |
| 2026-08-03 | Tab URLs rule added (skills + `.cursor/rules/tab-urls.mdc`). Site-wide tab URL registry section. |
| 2026-08-03 | Tab URLs synced (?type=). Archive callout banner on tariffs page. tariffFilterHref helper. |
| 2026-08-03 | Initial registry. Fixed header tariff links → `/tariffs/mobile/`. |
