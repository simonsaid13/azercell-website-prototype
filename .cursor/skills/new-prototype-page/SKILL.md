---
name: new-prototype-page
description: Builds a new page in the Azercell HTML prototype component-first, responsive at mobile/tablet/desktop, registers it on /sitemap and /components, and wires it into existing navigation. Use when creating, adding, or recreating any page or section of the prototype.
---

# New Prototype Page

## Checklist

```
- [ ] 1. Confirm scope with the user
- [ ] 2. Split the page into sections
- [ ] 3. Reuse or build components
- [ ] 4. Register components
- [ ] 5. Assemble the page
- [ ] 6. Register the page
- [ ] 7. Wire obvious outbound links on the page (href() only)
- [ ] 8. Wire tab URLs (if the page has tabs)
- [ ] 9. Run connection audit (separate Task — mandatory)
- [ ] 10. Audit (use the prototype-page-audit skill)
```

## 1. Confirm scope

If the page comes from `Azercell_Sitemap.md` or a functionality to-do file, ask the user before
building. Name the document and item. Confirm the route and which sections are in scope.

## 2. Split into sections

List every block top to bottom before writing code, e.g. announcement bar, header, hero, quick
actions, plan cards, footer. Show the list to the user in the progress update.

## 3. Reuse or build components

Check `COMPONENT_REGISTRY` in `assets/js/site-registry.js` first — reuse beats new. New
components go in `assets/js/components.js` as functions returning HTML strings:

```js
Components.planCard = ({ name, price, features = [] }) => `
  <article class="cmp-card">
    <h3 class="t-h3">${esc(name)}</h3>
    <p class="t-display">${esc(price)}</p>
    <ul class="cmp-card__list">${features.map(f => `<li class="t-body">${esc(f)}</li>`).join('')}</ul>
  </article>
`;
```

Component CSS goes in `assets/css/styles.css` under the components section, mobile-first, using
only the greyscale tokens, the shared type classes, `border-radius: 0`, and the two shared
breakpoints (768px, 1024px).

## 4. Register components

Add each new component to `COMPONENT_REGISTRY` with `id`, `name`, `group`, `usedOn`, and sample
props so it renders on `/components`.

## 5. Assemble the page

Copy an existing page as the starting point. The page body should be component calls plus data,
not hand-written block markup. Content comes from the `Azercell_Database_*.md` files.

Purchase, activation, and account actions link to the real external destination or show the real
USSD code. Never fake a backend response.

Add a stub `PAGE CONNECTIONS` comment block at the top of the page script — fill it in during
step 9.

## 6. Register the page

Add an entry to `PAGE_REGISTRY` in `assets/js/site-registry.js`:

```js
{ path: '/tariffs/', title: 'Tariffs and services', parent: '/', branch: 'b2c',
  status: 'built', links: ['/tariffs/prepaid/'] }
```

Use `status: 'planned'` for pages that exist in the sitemap but are not built yet. Never link
`/sitemap` or `/components` from public navigation.

Do **not** mark `status: 'built'` until step 9 (connection audit) is complete.

## 7. Wire obvious outbound links

On the new page, use `href(path)` for every internal link. Only wire links you know from the page
design (CTAs, cross-links, related items).

Do **not** guess inbound navigation here — that is step 9.

## 8. Wire tab URLs

If the page has tabs, read the `tab-urls` rule. Tabs without a page URL are incomplete.

**Checklist:**
- [ ] `filterTabs` (or future tab component) uses `syncUrl: true`, `urlBase`, and `urlParam`
- [ ] Each tab value maps to a query param; "All" clears the param
- [ ] Nav helpers in `site-registry.js` use the same URLs (e.g. `tariffFilterHref`)
- [ ] Tab URLs will be documented in step 9

Test: click tab → URL changes; paste URL in new tab → correct tab loads; header deep link matches.

## 9. Run connection audit (mandatory separate step)

**After the page is built, launch a separate Task** before calling the page done. Do not fold
this into the build step.

Use the Task tool with `subagent_type: explore` (or `generalPurpose`) and prompt it to run the
`page-connections` skill audit for the new route. The subagent must:

1. Search the codebase for every place that should link **to** the new page (header, footer,
   homepage, hub pages, sibling pages, compare tool, archive promos, support chat).
2. Search for every **outbound** link on the new page and confirm targets are CONNECTED or
   PLANNED.
3. Update `PAGE_CONNECTIONS.md`, the page inline comment, `SITE_CHROME` nav/footer if needed,
   sibling page CTAs, and `COMPONENT_REGISTRY` `usedOn` arrays.
4. Return a gap list — anything still MISSING must be wired or explicitly flagged for the user.

If connection targets are unclear, the subagent stops and asks the user (see `page-connections`
rule). Do not guess nav labels or hub promotions.

Only after this step passes may you set `status: 'built'` and run the visual audit.

## 10. Audit

Run the `prototype-page-audit` skill before reporting the page as done.
