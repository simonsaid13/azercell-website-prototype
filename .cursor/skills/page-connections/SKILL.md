---
name: page-connections
description: Reports which links are connected, planned, or missing for a prototype page or section. Use when the user asks what is not connected, which pages link to a route, navigation gaps, or inbound/outbound wiring status. Also run as a mandatory separate audit after every new page is built.
---

# Page Connections Lookup

## When to use

- User asks "what is not connected for X?"
- User asks which sections link to a page
- **Mandatory:** after building any new page — run as a **separate Task** before marking done
- User mentions navigation gaps or dead-end pages

## Mandatory connection audit (after every new page)

Run this as its own step — not bundled with page build. When invoked for a new route:

### 1. Scan inbound (who should link here?)

Search the codebase for:

- `PAGE_CONNECTIONS.md` — existing entries and gaps
- `SITE_CHROME.nav`, `SITE_CHROME.businessNav`, footer columns in `site-registry.js`
- Homepage, hub, and sibling page HTML/JS — plan cards, promos, callouts, quick actions
- Compare tool, archive promos, support chat topics
- `PAGE_REGISTRY` `links` arrays on parent/sibling pages
- Grep for the route path, tariff id, or PLANNED placeholder that should become this route

### 2. Scan outbound (where does this page link?)

Read the new page HTML/JS. List every `href()` call and CTA. Mark each CONNECTED, PLANNED, or
MISSING.

### 3. Update registries

In the same change:

- `PAGE_CONNECTIONS.md` — inbound table + per-page outbound tables + changelog row
- Page inline `PAGE CONNECTIONS` comment block
- `SITE_CHROME` nav/footer if the page belongs in public navigation
- `COMPONENT_REGISTRY` `usedOn` for every component on the page
- `PAGE_REGISTRY` `links` on parent hubs (e.g. `/tariffs/mobile/`)

### 4. Report gaps

Return a short summary:

| Direction | Connected | Planned | Missing |
|-----------|-----------|---------|---------|

For MISSING items: name the source, the options, and ask the user before wiring if unclear.

Do not mark `status: 'built'` until at least one public inbound link is CONNECTED and documented.

## Lookup steps (when user asks about an existing page)

1. Read `PAGE_CONNECTIONS.md` — master registry with CONNECTED / PLANNED / MISSING tables.
2. Read the target page's inline `PAGE CONNECTIONS` comment block (top of `<script>` in its HTML).
3. If the question is about header/footer, also read `SITE_CHROME.nav`, `SITE_CHROME.businessNav`, and footer columns in `assets/js/site-registry.js`.

## How to answer

Reply with a short table or list:

- **Connected** — works today (built page or external URL)
- **Planned** — goes to `/planned/` placeholder until that page is built
- **Missing** — no link yet; say what decision is needed and ask the user if they want it wired

For a **component or section**, scope the answer to that block's outbound links and who links to the page containing it.

## Tab URLs

Pages with tabs must document every tab link in `PAGE_CONNECTIONS.md`, not only nav inbound links.

Example for `/tariffs/mobile/`:

| Tab | URL |
|-----|-----|
| All | `/tariffs/mobile/` |
| Prepaid | `/tariffs/mobile/?type=prepaid` |
| Postpaid | `/tariffs/mobile/?type=postpaid` |

Header/footer deep links must use the same URLs as in-page tabs. See the `tab-urls` rule.

When reporting gaps, flag tabs that filter content but do not update the URL.

## After fixing connections

Update both `PAGE_CONNECTIONS.md` and the page's inline comment block in the same change. Add a changelog row.

Do not mark a page `built` in `PAGE_REGISTRY` without at least one public inbound link documented as CONNECTED.
