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
| `/business/campaigns/` | Business header and footer → Campaigns; Business homepage → All campaigns | CONNECTED |
| `/business/campaigns/why-azercell-business/` | Campaigns hub; Business header and footer | CONNECTED |
| `/business/campaigns/my-business-wifi/` | Campaigns hub; Business header item and promo; Business footer; Business homepage campaign card | CONNECTED |
| `/business/campaigns/acquisition-campaigns/` | Campaigns hub; Business header | CONNECTED |
| `/business/campaigns/acquisition-campaigns/mnp-60gb/` | Acquisition campaigns hub | CONNECTED |
| `/business/campaigns/acquisition-campaigns/mnp-80gb/` | Acquisition campaigns hub | CONNECTED |
| `/business/campaigns/devices-and-financing/` | Campaigns hub; Business header; Business homepage campaign card | CONNECTED |
| `/business/campaigns/devices-and-financing/iphone-16-for-b2b/` | Devices & financing hub; iPhone 17 campaign page | CONNECTED |
| `/business/campaigns/devices-and-financing/iphone-17-for-b2b/` | Devices & financing hub; iPhone 16 campaign page | CONNECTED |
| `/business/campaigns/devices-and-financing/smartphone-leasing/` | Devices & financing hub; both iPhone campaign pages | CONNECTED |
| `/business/campaigns/my-business-tariff-discounts/` | Campaigns hub; Business header | CONNECTED |
| `/business/campaigns/my-business-club/` | Campaigns hub; Business header and footer | CONNECTED |
| `/business/campaigns/my-business-club/virtual-wallet/` | Campaigns hub; My Business Club | CONNECTED |
| `/business/campaigns/archive/` | Campaigns hub; Business header and footer | CONNECTED |

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
| Solution block below hero | Four Digital solutions category landings | PLANNED via working placeholders |
| Campaigns section → All campaigns | `/business/campaigns/` | CONNECTED |
| Campaign cards → My Business Wi-Fi; Devices & financing | Built Campaigns routes | CONNECTED |
| Floating bar | `SITE_CHROME.businessFloatingBar` | Mixed (see Floating bar section) |
| Footer | `SITE_CHROME.businessFooter` | Mixed: external/legal connected; B2B destinations planned |

### Business header (`SITE_CHROME.businessNav`)

Desktop category labels navigate to their landing pages. Hover/focus or the restored adjacent arrow opens the mega menu. Business category links use the same type, height and padding as Personal. Mobile uses a category link plus a separate expand control.

Business reuses the Personal menu presentation patterns and type scale: Mobile and Digital solutions use the Personal Mobile rail/detail layout; Mobile retains an accented Azercell Biznes entry. Their rail labels remain landing-page links and expose submenus on hover/focus without repeating the selected label in the detail pane. Standard categories use the Personal Company list layout. Campaigns lists Why Azercell Business first, the active My Business Wi-Fi campaign, My Business Club and the archive beside a My Business Wi-Fi promo card.

| Category | Landing / children | Status |
|----------|--------------------|--------|
| Company | `/about/…` | PLANNED; Careers and Azercell Life external |
| Mobile | `/business/mobile/…` | Mixed: Roaming section CONNECTED; other destinations PLANNED |
| Connectivity | `/business/connectivity/…` | PLANNED; Fixed service relationship on hold |
| Digital solutions | `/business/digital-solutions/` → IoT & M2M, Fleet & field operations, Automation & management, Customer engagement | PLANNED; separate Fleet package page on hold |
| Campaigns | Hub, Why Azercell Business?, My Business Wi-Fi, Acquisition campaigns, Devices & financing, tariff discounts, My Business Club, archive | CONNECTED |
| Support | `/business/support/…` | PLANNED |
| Header → Log in | `/business/login/` | PLANNED; final destination pending |
| Header → Contact manager | biznes.azercell.com | CONNECTED (external) |

### Business footer (`SITE_CHROME.businessFooter`)

Uses the responsive Personal footer shell with the confirmed B2B groups, `*6050`, Campaigns links and the Azercell Biznes app banner. The footer is rendered in the inverse dark theme on every built Business page; the former My Business Club feature banner is removed. The Mobile group contains tariff plans, internet packs and roaming; Azercell Biznes appears only in its banner. Deeper tariff, internet-pack and roaming links remain in the mega menu. Unknown store destinations are intentionally non-clickable.

Every built Business page also renders its opening hero in the inverse dark theme with light typography, controls and divider lines.

The Business footer connects Campaigns hub, Why Azercell Business?, My Business Wi-Fi, My Business Club and Campaigns archive. Acquisition campaigns, Devices & financing and tariff discounts remain discoverable from the header and Campaigns hub instead of the footer.

---

## `/business/mobile/roaming/` — Business roaming overview

| Section / link | Target | Status |
|----------------|--------|--------|
| Step 1 country search → Turkiye, Georgia, Germany | Country detail routes | CONNECTED |
| “Check in which countries internet packs can be used” | `/business/mobile/roaming/countries-and-prices/` | CONNECTED |
| More information about internet packs | `/business/mobile/roaming/internet-packs/` | CONNECTED |
| Each internet pack → Subscribe | Two-tab phone / SMS-USSD subscription modal | CONNECTED (prototype interaction) |
| Planning and online-support actions | Current Azercell Business roaming page | CONNECTED (external) |
| Balance actions | Kabinetim and Azercell online payment | CONNECTED (external) |
| Questions and Answers → Support | support.azercell.com | CONNECTED (external) |

**Inbound:** Business header → Mobile → Roaming; Business footer → Mobile → Roaming; Business floating bar → Roaming.

---

## `/business/mobile/roaming/countries-and-prices/` — Business countries and prices

| Section / link | Target | Status |
|----------------|--------|--------|
| Country tags | Filter the inline table to Turkiye, Georgia or Germany | CONNECTED |
| Searchable pack-coverage table | Inline Turkiye, Georgia and Germany operator catalogue | CONNECTED |

**Inbound:** Business roaming overview; header Mobile → Roaming detail; floating bar Roaming detail; all three country pages.

---

## Business roaming country pages — Turkiye, Georgia, Germany

Routes:

- `/business/mobile/roaming/countries-and-prices/turkiye/`
- `/business/mobile/roaming/countries-and-prices/georgia/`
- `/business/mobile/roaming/countries-and-prices/germany/`

| Section / link | Target | Status |
|----------------|--------|--------|
| Internet-pack summary → More details | `/business/mobile/roaming/internet-packs/` | CONNECTED |
| Each internet pack → Subscribe | Two-tab phone / SMS-USSD subscription modal with pack-specific codes | CONNECTED (prototype interaction) |

Turkiye uses operator tabs to switch the visible rate table. Georgia and Germany retain their operator summaries followed by the shared rate table.

**Inbound:** Business header and floating bar Roaming details; countries directory and overview search.

---

## `/business/mobile/roaming/internet-packs/` — Business roaming internet packs

| Section / link | Target | Status |
|----------------|--------|--------|
| Each pack → Subscribe | Two-tab phone / SMS-USSD subscription modal with pack-specific codes | CONNECTED (prototype interaction) |
| Activate abroad → How to activate Internet Packs | Website, USSD/SMS and Kabinetim methods from the current corporate source | CONNECTED |
| Activation → Kabinetim | kabinetim.azercell.com | CONNECTED (external) |
| Searchable pack-coverage table | Inline Turkiye, Georgia and Germany operator catalogue | CONNECTED |
| Questions and Answers | Six source-based FAQ items in an accordion | CONNECTED |

**Inbound:** Business header and floating bar Roaming detail; overview, countries directory and every country page.

---

## B2B Campaigns — shared connections

All 14 Campaigns routes render the shared Business announcement bar, header, inverse footer and floating bar. Route-specific Campaigns destinations are all built, so `href()` and `registryHref()` resolve them directly. The planned links that remain in the shared Business chrome belong to other unbuilt B2B sections; they continue through `/planned/?path=…` and are not Campaigns gaps.

| Shared inbound source | Campaigns destinations | Status |
|-----------------------|------------------------|--------|
| Business header category and menu | Hub; Why Azercell Business?; My Business Wi-Fi; Acquisition campaigns; Devices & financing; tariff discounts; My Business Club; archive | CONNECTED |
| Business header promo | My Business Wi-Fi | CONNECTED |
| Business footer Campaigns column | Hub; Why Azercell Business?; My Business Wi-Fi; My Business Club; archive | CONNECTED |
| Business homepage Campaigns section | Hub; My Business Wi-Fi; Devices & financing | CONNECTED |
| Campaigns hub | Why; Wi-Fi; Club; Acquisition; Devices; tariff discounts; Virtual Wallet; archive | CONNECTED |
| Shared Business chrome → non-Campaigns destinations | Existing built/external links and intentional `/planned/` placeholders | CONNECTED / PLANNED |

---

## `/business/campaigns/` — Campaigns hub

| Section / link | Target | Status |
|----------------|--------|--------|
| Primary cards | Why Azercell Business?; My Business Wi-Fi; My Business Club | CONNECTED |
| Campaign catalogue | Acquisition campaigns; Devices & financing; tariff discounts; Virtual Wallet; archive | CONNECTED |

**Inbound:** Business header and footer; Business homepage Campaigns section.

---

## `/business/campaigns/why-azercell-business/` — Why Azercell Business?

| Section / link | Target | Status |
|----------------|--------|--------|
| Hero back link | `/business/campaigns/` | CONNECTED |
| Hero → Contact us | `mailto:business@azercell.com` | CONNECTED (external protocol) |

**Inbound:** Campaigns hub; Business header and footer.

---

## `/business/campaigns/my-business-wifi/` — My Business Wi-Fi

| Section / link | Target | Status |
|----------------|--------|--------|
| Hero back link | `/business/campaigns/` | CONNECTED |
| Hero and package note → Contact us | `mailto:business@azercell.com` | CONNECTED (external protocol) |

**Inbound:** Campaigns hub; Business header item and promo; Business footer; Business homepage campaign card.

---

## `/business/campaigns/acquisition-campaigns/` — Acquisition campaigns

| Section / link | Target | Status |
|----------------|--------|--------|
| Hero back link | `/business/campaigns/` | CONNECTED |
| Hero → Check eligibility | `mailto:business@azercell.com` | CONNECTED (external protocol) |
| Bundle cards | MNP 60GB; MNP 80GB | CONNECTED |

**Inbound:** Campaigns hub; Business header.

---

## B2B MNP campaign details — 60GB and 80GB

Routes:

- `/business/campaigns/acquisition-campaigns/mnp-60gb/`
- `/business/campaigns/acquisition-campaigns/mnp-80gb/`

| Section / link | Target | Status |
|----------------|--------|--------|
| Hero back link | `/business/campaigns/acquisition-campaigns/` | CONNECTED |
| Availability CTA → Email Azercell Business | `mailto:business@azercell.com` | CONNECTED (external protocol) |

**Inbound:** Acquisition campaigns hub.

---

## `/business/campaigns/devices-and-financing/` — Devices & financing

| Section / link | Target | Status |
|----------------|--------|--------|
| Hero back link | `/business/campaigns/` | CONNECTED |
| Campaign cards | iPhone 16; iPhone 17; Smartphone Leasing | CONNECTED |

**Inbound:** Campaigns hub; Business header; Business homepage campaign card.

---

## B2B iPhone campaign details — iPhone 16 and iPhone 17

Routes:

- `/business/campaigns/devices-and-financing/iphone-16-for-b2b/`
- `/business/campaigns/devices-and-financing/iphone-17-for-b2b/`

| Section / link | Target | Status |
|----------------|--------|--------|
| Hero back link | `/business/campaigns/devices-and-financing/` | CONNECTED |
| Campaign details → Contact Azercell Business | `mailto:business@azercell.com` | CONNECTED (external protocol) |
| Related campaign | The other iPhone generation | CONNECTED |
| Related financing | Smartphone Leasing | CONNECTED |

**Inbound:** Devices & financing hub; the other iPhone campaign page.

---

## `/business/campaigns/devices-and-financing/smartphone-leasing/` — Smartphone Leasing

| Section / link | Target | Status |
|----------------|--------|--------|
| Hero back link | `/business/campaigns/devices-and-financing/` | CONNECTED |

**Inbound:** Devices & financing hub; both iPhone campaign pages.

---

## `/business/campaigns/my-business-tariff-discounts/` — tariff discounts

| Section / link | Target | Status |
|----------------|--------|--------|
| Hero back link | `/business/campaigns/` | CONNECTED |
| Eligibility CTA → Contact Azercell Business | `mailto:business@azercell.com` | CONNECTED (external protocol) |

**Inbound:** Campaigns hub; Business header.

---

## `/business/campaigns/my-business-club/` — My Business Club

| Section / link | Target | Status |
|----------------|--------|--------|
| Hero back link | `/business/campaigns/` | CONNECTED |
| Hero → Contact us | `mailto:business@azercell.com` | CONNECTED (external protocol) |
| Virtual Wallet card | `/business/campaigns/my-business-club/virtual-wallet/` | CONNECTED |

**Inbound:** Campaigns hub; Business header and footer.

---

## `/business/campaigns/my-business-club/virtual-wallet/` — Virtual Wallet

| Section / link | Target | Status |
|----------------|--------|--------|
| Hero back link | `/business/campaigns/my-business-club/` | CONNECTED |
| Service CTA → Contact Azercell Business | `mailto:business@azercell.com` | CONNECTED (external protocol) |

**Inbound:** Campaigns hub; My Business Club.

---

## `/business/campaigns/archive/` — Campaigns archive

**Archive URLs:** no query for the default six items; `?perPage=12` or `?perPage=24` for page size; `?page={n}` for later pages; both parameters combine when needed.

| Section / link | Target | Status |
|----------------|--------|--------|
| Hero back link | `/business/campaigns/` | CONNECTED |
| Seven archive cards | Seven original Azercell ended-campaign detail URLs | CONNECTED (external) |
| Materials per page | Self-submit with `?perPage=6`, `?perPage=12` or `?perPage=24` | CONNECTED |
| Pagination | Self-links using `?page={n}` plus non-default `perPage` | CONNECTED |

**Inbound:** Campaigns hub; Business header and footer.

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

## Floating bars (`SITE_CHROME.floatingBar` / `SITE_CHROME.businessFloatingBar`)

Personal keeps Internet, Tariffs, Roaming and Kinon. Business and B2B planned placeholders use Internet, Tariffs, Roaming and Azercell Biznes with B2B destinations. Business popovers omit repeated headings; Roaming adds Turkiye, Georgia and Germany. The Azercell Biznes popover starts with an accented Log in to Azercell Biznes action. Both bars retain Search. On `/join-azercell/transfer-number/` the bar switches to a Start transfer CTA after the hero button scrolls away.

| Item | Target | Status |
|------|--------|--------|
| Search | `/search/` | PLANNED |
| Internet (+ High volume, Weekly, Daily, Unlimited) | `/tariffs/internet/…` | CONNECTED |
| Tariffs (+ Prepaid, Postpaid, archive) | `/tariffs/mobile/…` | CONNECTED |
| Roaming (+ internet packs, countries, travel packs) | `/tariffs/roaming/…` | CONNECTED |
| Kinon | `/apps/cinema-and-tv/kinon/` | PLANNED |
| Business Internet | `/business/mobile/internet/…` | PLANNED |
| Business Tariffs | `/business/mobile/tariffs/…` | PLANNED |
| Business Roaming | `/business/mobile/roaming/…` | CONNECTED |
| Business Azercell Biznes → Top-up | `/business/mobile/azercell-biznes/top-up/` | PLANNED |
| Business Azercell Biznes → Online Itemized Bill | `/business/support/itemized-bill/` | PLANNED |
| Business Azercell Biznes → accented Log in to Azercell Biznes | biznes.azercell.com | CONNECTED (external) |

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

## `/business2/` — Business homepage concept 2

This route is an unlinked review concept based on `Azercell_Business_Homepage_Content_(temporary).docx`. It reuses the shared Business header, footer and floating bar without modifying their content or behavior.

| Section / link | Target | Status |
|----------------|--------|--------|
| Hero → Explore business solutions | `/business/digital-solutions/` | PLANNED |
| Hero → Talk to sales | `#contact-sales` | CONNECTED (in-page) |
| Digital Solutions cards | Four B2B solution category routes | PLANNED |
| Tariffs, internet and connectivity gateways | Registered B2B routes | PLANNED |
| Roaming gateways | Built B2B roaming routes | CONNECTED |
| Active campaigns | Built B2B Campaigns routes | CONNECTED |
| Azercell Biznes | biznes.azercell.com | CONNECTED (external) |
| Online Itemized Bill | Current Azercell corporate page | CONNECTED (external) |
| Support shortcuts | `tel:*6050`, FAQ/location routes, itemized bill | Mixed |
| Lead form | Local validation plus support/contact handoff | CONNECTED (prototype handoff) |

**Inbound:** Direct review URL only. It is intentionally absent from shared navigation.

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
| 2026-09-01 | Added the unlinked `/business2/` homepage concept from the temporary content document, preserving shared chrome and applying `#f0f` / `#8000FF80` source markers. |
| 2026-08-31 | Completed the separate B2B Campaigns connection audit for all 14 routes: documented every public inbound and route-specific outbound, synchronized page comments, corrected Campaigns `PAGE_REGISTRY.links`, and made campaign component `usedOn` lists match actual rendering. No Campaigns connection gaps remain. |
| 2026-08-31 | Added a per-card Subscribe action and responsive two-tab subscription modal to every B2B roaming pack surface; connected pack-specific USSD/SMS codes; expanded Activate abroad with the three official activation methods; reordered the overview sections; inverted all built Business heroes and footers; removed the My Business Club footer feature banner. |
| 2026-08-30 | Renamed B2B roaming FAQ sections to Questions and Answers; simplified Countries and prices to one tagged coverage search; moved Planning a trip below Useful tips; removed package-rule headings; added operator tabs on Turkiye and removed its redundant rate/pack summary headings. |
| 2026-08-30 | Added complete source-based Additional Information blocks to Business Roaming overview and internet packs; moved the country search into Step 1; moved pack coverage inline under Top countries; removed B2B roaming quick actions and local category navigation; rounded destination chips. |
| 2026-08-29 | Reworked the complete B2B Roaming prototype from the full content handoff, using the established B2C roaming composition: overview, searchable country directory, exact Turkiye/Georgia/Germany rates and operators, internet packs, activation rules, travel guidance and support information. |
| 2026-08-29 | Built the complete B2B Roaming prototype slice: overview, countries directory, Turkiye, Georgia, Germany and roaming internet packs. Connected Business header, footer and floating bar entries; documented all internal and confirmed external links. |
| 2026-08-27 | Matched Business category-link styling to Personal and restored dropdown arrows; removed the Mobile Azercell Biznes footer link; removed Business floating-popover headings, promoted Log in to Azercell Biznes and added three roaming countries; enlarged and separated Solution cards. |
| 2026-08-27 | Restored arrowless Business hover dropdowns, increased visible label spacing to 16px, consolidated four categories under a Personal-Mobile-style Digital solutions menu, replaced Acquisition with a four-card Solution block and CTA subtitles, reordered Log in / Contact manager, and added a B2B floating bar. |
| 2026-08-27 | Removed Business desktop dropdown arrows, left-aligned category links and set equal visual spacing between labels. Renamed the Business acquisition labels to Acquisition action 1–5 while preserving destinations and Personal labels. |
| 2026-08-27 | Added the unchanged Personal acquisition block directly below the Business hero, reusing the shared component, content and destinations. |
| 2026-08-27 | Restored My Business Club to the Business Campaigns mega-menu while retaining the My Business Wi-Fi promo banner. |
| 2026-08-27 | Updated Business Campaigns to show Why Azercell Business first, the active My Business Wi-Fi campaign and archive, with a matching Wi-Fi promo. Business Mobile rail links now expose submenus on hover/focus without duplicated detail headings; Personal behavior remains unchanged. |
| 2026-08-27 | Aligned Business mega-menu presentation with Personal: Mobile now uses the rail/detail pattern with an Azercell Biznes accent; standard categories use the Company list; Campaigns adds a My Business Club promo. Removed third-level Mobile links from the Business footer. |
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
