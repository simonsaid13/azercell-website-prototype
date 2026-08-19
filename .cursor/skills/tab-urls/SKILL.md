---
name: tab-urls
description: Wire shareable page URLs for tabs — filter tabs, nav deep links, PAGE_CONNECTIONS docs, and audit checks. Use when adding or editing tabs, filter groups, tab navigation, or when the user asks for tab links, deep links, or URL sync on tab switch.
---

# Tab URLs

Read `.cursor/rules/tab-urls.mdc` first. This skill is the step-by-step workflow.

## When to use

- Page has tabs that change visible content
- User wants links to specific tabs
- Header/footer should open a particular tab
- Auditing whether tabs update the address bar

## Build checklist

```
- [ ] 1. Pick urlParam name and tab values (e.g. type=prepaid)
- [ ] 2. filterTabs: syncUrl + urlBase + urlParam
- [ ] 3. Nav helper in site-registry.js (same param/values)
- [ ] 4. Document in PAGE_CONNECTIONS.md + page inline comment
- [ ] 5. Test click, direct URL, back button, nav deep link
```

## 1. Page — filterTabs

Inside `[data-filter-scope]`:

```js
render('filterTabs', {
  urlBase: href('/your/page/'),
  groups: [{
    key: 'category',
    label: '…',
    syncUrl: true,
    urlParam: 'type',
    options: [
      { value: 'all', label: 'All' },
      { value: 'prepaid', label: 'Prepaid' }
    ]
  }]
})
```

Filter targets need `data-filter-tags` matching option values.

## 2. Navigation — deep link helper

In `site-registry.js`, mirror the same URLs:

```js
function yourPageTabHref(value) {
  var base = href('/your/page/');
  if (!value || value === 'all') return base;
  return base + '?type=' + encodeURIComponent(value);
}
```

Wire header/footer/chat links to this helper — not the bare page path when a specific tab is intended.

## 3. Documentation

**PAGE_CONNECTIONS.md** — tab table under the page:

| Tab | URL |
|-----|-----|
| All | `/your/page/` |
| Prepaid | `/your/page/?type=prepaid` |

**Page inline comment:**

```js
/* filter tabs — URL ?type=all|prepaid|postpaid — CONNECTED (synced) */
```

Add changelog row.

## 4. Test (required)

1. Click each tab — address bar updates
2. Open copied URL in new tab — correct tab active, content filtered
3. Header/footer deep link — lands on correct tab
4. Back button — previous tab restores

## Runtime (already in app.js)

Do not re-implement unless extending:

- Tabs render as `<a href="…">` when `syncUrl: true`
- Click: `preventDefault` + filter + `pushState`
- Load: `applyFilterFromUrl` reads query param
- `popstate`: re-applies tab from URL

## Local-only exception

Homepage device filters (`/` without `syncUrl`) are OK until nav needs tab deep links. Any tab referenced from the sitemap or menus **must** use tab URLs.
