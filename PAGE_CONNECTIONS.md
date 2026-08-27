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

## Internal review probes

| Page | Inbound | Outbound | Status |
|------|---------|----------|--------|
| `/tariff-compare-lab/` | `nav-lab` Header → Mobile → Tariffs → Compare tariffs on desktop, mobile, and Floating Tariffs | `?billing=prepaid`, `?billing=postpaid`, Header `AZ`/`EN`/`RU` version control, contained comparison controls, and colleague-provided official Azercell tariff URLs | CONNECTED inside the review probe; not integrated into stable site chrome |

**Tariff comparison lab state:** Header `EN` maps to Compact through `lang=en&variant=v1`; Header `AZ` maps to Detailed through `lang=az&variant=v2`; Header `RU` retains the current navigation variant and loads separate RU Version 3 through `lang=ru`. EN/AZ use shareable `/tariff-compare-lab/?billing=prepaid` and `/tariff-compare-lab/?billing=postpaid` state. The retired page-level `?view=` tabs are removed. RU family/card selection is local state, not a complete shareable URL.

---

## Built pages — inbound (how users get there)

| Page | Connected from | Status |
|------|----------------|--------|
| `/` | Logo, branch switcher, `/business/` switcher | CONNECTED |
| `/business/` | Logo (B2B), branch switcher, B2C homepage company links | CONNECTED |
| `/tariffs/mobile/` | Header → Mobile → All mobile tariffs; Prepaid (`?type=prepaid`); Postpaid (`?type=postpaid`); Footer → Tariffs; Homepage → Change plan quick action; Support chat → See all mobile tariffs; Compare page → Browse all tariffs | CONNECTED |
| `/tariffs/compare/` | Homepage → Compare all plans, Compare all tariffs; `/tariffs/mobile/` → Compare plans; Plan cards → Compare (via `?add=` handoff) | CONNECTED |
| `/tariffs/mobile/prepaid/digimax/` | Homepage + hub Plan details; header Popular plans; compare | CONNECTED |
| `/tariffs/mobile/prepaid/premium-plus/` | Homepage + hub Plan details; header Popular plans; compare | CONNECTED |
| `/tariffs/mobile/prepaid/data-plus/` | Homepage + hub Plan details; header Popular plans; compare | CONNECTED |
| `/tariffs/mobile/prepaid/data/` | Homepage + hub Plan details; header Popular plans; compare | CONNECTED |
| `/tariffs/mobile/prepaid/veteran/` | Homepage + hub Plan details; header Popular plans; compare | CONNECTED |
| `/tariffs/mobile/postpaid/alfa/` | Homepage + hub Plan details; header Popular plans; compare | CONNECTED |
| `/tariffs/internet/` | Header → Internet → All internet packs; footer → Internet packs; `/tariffs/mobile/` upsell | CONNECTED |
| `/tariffs/internet/monthly/` | Header → Internet → High-volume / Monthly; `/tariffs/mobile/` upsell; tariff detail addon grids | CONNECTED |
| `/tariffs/internet/weekly/` | Header → Internet → Weekly; `/tariffs/mobile/` upsell | CONNECTED |
| `/tariffs/internet/daily/` | Header → Internet → Daily; `/tariffs/mobile/` upsell | CONNECTED |
| `/tariffs/internet/unlimited/` | Header → Internet → Unlimited; `/tariffs/mobile/` upsell | CONNECTED |
| `/tariffs/roaming/` | Header → Internet → Roaming overview; homepage hero → Roaming rates; `/tariffs/mobile/` related; support chat | CONNECTED |
| `/tariffs/roaming/internet-packs/` | Header → Internet → Roaming internet packs; footer → Roaming packs; `/tariffs/mobile/` quick action; hub cross-sell | CONNECTED |
| `/tariffs/roaming/travel-packs/` | Header → Internet → Travel packs; homepage hero → See travel packs | CONNECTED |
| `/tariffs/roaming/countries-and-prices/` | Header → Internet → Countries and prices; support chat → Countries and prices | CONNECTED |

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
| Quick action → Change plan | `/tariffs/mobile/` | CONNECTED |
| Quick action → Switch to eSIM | `/tariffs/esim/` | PLANNED |
| Tariffs section → Compare all plans | `/tariffs/compare/` | CONNECTED |
| Plan cards → Compare | `/tariffs/compare/?add=…` | CONNECTED |
| Plan cards → Plan details | All 6 mobile tariff detail pages — CONNECTED |
| Plan cards → Activate in Kabinetim | kabinetim.azercell.com | CONNECTED (external) |
| Devices section | `/devices/` | PLANNED |
| Services link cards | Roaming CONNECTED; eSIM, 5G, Aicell routes | PLANNED (non-roaming) |
| Kinon split banner | `/apps/cinema-and-tv/kinon/` | PLANNED |
| Footer columns | Mixed built/planned via `href()` | PLANNED (most) |
| Header nav (all items) | See `site-registry.js` → `SITE_CHROME.nav` | Mixed |

**Not connected yet (homepage):** No direct header item labelled "Tariffs" — users reach tariffs via Mobile mega menu only.

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

**Inbound:** Header → Internet → All internet packs; footer → Internet packs; `/tariffs/mobile/` → See all internet packs.

---

## `/tariffs/internet/monthly/` — High-volume / Monthly

**Filter URLs:** `?volume=30-50`, `?sort=price-asc`, `?sort=price-desc`.

| Section / link | Target | Status |
|----------------|--------|--------|
| Pack cards → Kabinetim | kabinetim.azercell.com | CONNECTED (external) |
| Category nav | Hub + sibling categories | CONNECTED |
| Cross-sell → Compare, DigiMax 25GB | `/tariffs/compare/`, `/tariffs/mobile/prepaid/digimax/` | CONNECTED |

**Inbound:** Header → Internet → High-volume / Monthly; `/tariffs/mobile/` upsell; all 6 tariff detail addon grids.

---

## `/tariffs/internet/weekly/` — Weekly

**Filter URLs:** `?sort=price-asc`, `?sort=price-desc`.

| Section / link | Target | Status |
|----------------|--------|--------|
| Pack card → Kabinetim | kabinetim.azercell.com | CONNECTED (external) |
| Cross-sell → DigiMax | `/tariffs/mobile/prepaid/digimax/` | CONNECTED |

**Inbound:** Header → Internet → Weekly; `/tariffs/mobile/` upsell.

---

## `/tariffs/internet/daily/` — Daily

**Filter URLs:** `?volume=60-500`, `?sort=price-asc`, `?sort=price-desc`.

| Section / link | Target | Status |
|----------------|--------|--------|
| Pack cards → Kabinetim | kabinetim.azercell.com | CONNECTED (external) |
| Cross-sell → DigiMax packs | `/tariffs/mobile/prepaid/digimax/` | CONNECTED |

**Inbound:** Header → Internet → Daily; `/tariffs/mobile/` upsell.

---

## `/tariffs/internet/unlimited/` — Unlimited

**Filter URLs:** `?sort=price-asc`, `?sort=price-desc`.

| Section / link | Target | Status |
|----------------|--------|--------|
| Pack cards → Kabinetim | kabinetim.azercell.com | CONNECTED (external) |
| Cross-sell → Weekly packs, DigiMax Weekly | `/tariffs/internet/weekly/`, DigiMax detail | CONNECTED |

**Inbound:** Header → Internet → Unlimited; `/tariffs/mobile/` upsell.

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

**Inbound:** Header → Internet → Roaming overview; homepage hero; `/tariffs/mobile/` related; support chat topics.

---

## `/tariffs/roaming/internet-packs/` — Roaming internet packs

| Section / link | Target | Status |
|----------------|--------|--------|
| Pack cards → Kabinetim | kabinetim.azercell.com | CONNECTED (external) |
| Supported countries table | In-page sample data | CONNECTED |
| Cross-sell → Premium+, compare | Built routes | CONNECTED |
| Catalog nav | Hub + siblings | CONNECTED |

**Inbound:** Header → Internet → Roaming internet packs; footer → Roaming packs; `/tariffs/mobile/` quick action; hub cross-sell.

---

## `/tariffs/roaming/travel-packs/` — Travel packs (tourist)

| Section / link | Target | Status |
|----------------|--------|--------|
| Pack cards → azercellim.com | azercellim.com | CONNECTED (external) |
| Cross-sell → internet-packs | Built route | CONNECTED |
| Catalog nav | Hub + siblings | CONNECTED |

**Inbound:** Header → Internet → Travel packs; homepage hero → See travel packs.

---

## `/tariffs/roaming/countries-and-prices/` — Countries and prices

**Country lookup URLs:** `?country={id}` — same pattern as hub.

| Section / link | Target | Status |
|----------------|--------|--------|
| Country search + prepaid/postpaid toggle | In-page | CONNECTED |
| Cross-sell → internet-packs, hub | Built routes | CONNECTED |
| Catalog nav | Hub + siblings | CONNECTED |

**Inbound:** Header → Internet → Countries and prices; support chat → Countries and prices.

---

## `/business/` — Business homepage

|----------------|--------|--------|
| Tariff carousel → Plan details | `/business/mobile/tariffs/` | PLANNED |
| Internet packs, solutions, IoT sections | Various `/business/…` routes | PLANNED |
| Lead form handoff | Contact / *6050 | CONNECTED |
| Header nav | B2B `SITE_CHROME.businessNav` | Mixed (mostly PLANNED) |
| Footer | B2B footer columns | Mixed |

---

## Header navigation (`SITE_CHROME.nav` — B2C)

| Nav link | Target | Status |
|----------|--------|--------|
| Mobile → All mobile tariffs | `/tariffs/mobile/` | CONNECTED |
| Mobile → Prepaid | `/tariffs/mobile/?type=prepaid` | CONNECTED |
| Mobile → Postpaid | `/tariffs/mobile/?type=postpaid` | CONNECTED |
| Mobile → Tariffs archive | `/tariffs/mobile/prepaid/archive/` | CONNECTED |
| Mobile → Popular plans (all 6 current tariffs) | All CONNECTED |
| Mobile → Services column | `/tariffs/services/…` | PLANNED |
| Internet → All packs / roaming / network | Internet + roaming CONNECTED; network support PLANNED |
| Devices, Deals, Help columns | Mostly planned routes | PLANNED |

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

**Inbound:** Header → Mobile → Prepaid tariffs archive; `/tariffs/mobile/` callout banner + legal link.

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
| 2026-08-27 | Added the required integration handoff and agent entrypoint for moving `vlad` navigation/comparator work into other branches; corrected the registry to describe RU as separate Version 3. |
| 2026-08-26 | Connected the accepted tariff comparison from desktop/mobile `nav-lab` Header in the exact order Prepaid, Postpaid, Compare tariffs, Tariffs archive; current language/variant carries into the destination. |
| 2026-08-26 | Replaced the tariff lab's page-level Compact/Detailed tabs with the existing Header version convention: `EN` = Compact, `AZ` = Detailed, and `RU` preserves the current version. |
| 2026-08-26 | Removed the page-level Compact/Detailed control and `?view=` query from the hidden tariff-comparison lab; Header `EN`/`AZ` controls Compact/Detailed while `?billing=` remains shareable. |
| 2026-08-26 | Added hidden internal `/tariff-compare-lab/` connection record. Public inbound wiring is intentionally excluded while the isolated comparison probe is under Vlad review. |
| 2026-08-04 | Built B2C roaming section — hub, internet-packs, travel-packs, countries-and-prices. Country search with ?country= URL sync, ~35 sample destinations, header/footer/homepage/mobile/chat links CONNECTED. |
| 2026-08-04 | Built B2C mobile internet packs — hub + monthly/weekly/daily/unlimited. 10 packs, filters, cross-sell banner, header/footer/tariff upsell links CONNECTED. |
| 2026-08-03 | Built `/tariffs/mobile/prepaid/archive/` — 20 legacy plans, working search + pagination (8/page), promo section for current plans. |
| 2026-08-03 | Full connection pass — header Popular plans (Data+, Data), archive promos CONNECTED, component `usedOn` for all 6 detail pages. |
| 2026-08-03 | Built all 6 mobile tariff detail pages — pack carousel layout shared across DigiMax, Premium+, Data+, Data, Veteran, Alfa. |
| 2026-08-03 | Tab URLs rule added (skills + `.cursor/rules/tab-urls.mdc`). Site-wide tab URL registry section. |
| 2026-08-03 | Tab URLs synced (?type=). Archive callout banner on tariffs page. tariffFilterHref helper. |
| 2026-08-03 | Initial registry. Fixed header tariff links → `/tariffs/mobile/`. |
