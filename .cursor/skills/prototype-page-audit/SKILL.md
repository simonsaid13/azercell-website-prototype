---
name: prototype-page-audit
description: Verifies an Azercell prototype page against the wireframe UI, responsive, component, and no-simulated-functionality rules before it is called done. Use after building or editing any prototype page, section, or component.
---

# Prototype Page Audit

Run every check. Fix what fails, then re-run. Do not report the page as done until all pass.

## Automated check

```bash
node scripts/audit.mjs
```

Flags colour values, non-zero `border-radius`, box shadows, raw `font-size` outside the type
scale, unregistered components, and unregistered pages. Fix every reported item.

## Browser check

Serve the prototype and open each affected route:

```bash
python3 -m http.server 4173
```

Check at three widths — 375px, 834px, 1440px:

- [ ] No horizontal page scroll at any width
- [ ] Every section reflows; nothing overlaps, clips, or disappears
- [ ] Card rows and tables scroll inside their own container, with a visible affordance
- [ ] Text stays inside its container; no single-word lines from over-tight columns

## Visual check

- [ ] Greyscale only — no colour anywhere, images filtered greyscale
- [ ] Every corner square; no drop shadows
- [ ] Only the shared type classes are used

## Behaviour check

- [ ] Menus, tabs, carousels, accordions, and filters work with mouse and keyboard
- [ ] Visible focus outline on every interactive element
- [ ] No fake backend results — buy/activate/login actions link out or show a real USSD code
- [ ] No dead links; unbuilt destinations point at a registered planned page or are not linked

## Tab URL check

Read the `tab-urls` rule. Run this when the page has tabs that change content.

- [ ] Each tab has a shareable URL (query param or path — query param is default for filters)
- [ ] Clicking a tab updates the address bar without a full reload
- [ ] Opening the URL directly (or from header/footer) selects the correct tab
- [ ] Browser back/forward switches tabs correctly
- [ ] Tab URLs are documented in `PAGE_CONNECTIONS.md` and the page inline comment

## Registry check

- [ ] Page appears on `/sitemap` with the right parent, branch, and `built` status
- [ ] Every component used appears on `/components` and renders there
- [ ] `/sitemap` and `/components` are not linked from public navigation

## Connection check

**Run the connection audit first** — launch a separate Task using the `page-connections` skill
before this audit. Do not mark the page done if the connection audit has not run.

Read `PAGE_CONNECTIONS.md` and the page's inline `PAGE CONNECTIONS` comment block.

- [ ] At least one public inbound link exists (header, footer, or another built page)
- [ ] Header/footer/nav entries point to the built route — not an older planned parent path
- [ ] `PAGE_CONNECTIONS.md` lists inbound and outbound links with CONNECTED / PLANNED / MISSING
- [ ] Inline connection comment block is present and matches the markdown registry
- [ ] `COMPONENT_REGISTRY` `usedOn` lists every page that uses each component on this route
- [ ] Any MISSING items were either wired or explicitly left for the user to decide
