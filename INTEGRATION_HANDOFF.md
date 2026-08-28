# Integration Handoff for AI Agents

Read this document before merging, cherry-picking, copying, or reimplementing
work from `vlad` into `main`, `Vadym`, or any other branch.

This handoff is self-contained because the project control plane used during
development is outside this Git repository and may not exist in another
checkout.

## 1. Status and authority boundary

Verified feature snapshot: `d598d97c2054b7873d2d94f9681cf1223cb17c18`
on `vlad`. The stable `main` snapshot at the time of verification was
`42a7855e77705974c11c2fba2e4cfae1854dcf03`.

| Area | Current status | Do not infer |
| --- | --- | --- |
| Navigation probe | Implemented in `nav-lab/` for review; current behavior snapshot is `d598d97` | Current code is not approved final IA, stable shared chrome, or business truth; no deployment is recorded for this snapshot |
| Tariff comparator | Current version and exact Header placement accepted by Vlad | No Semen/team, business/client, design, CMS, legal, or stable-route acceptance |
| Stable `/tariffs/compare/` | Unchanged | The lab must not silently replace it |
| `main` integration | Not performed | A working probe or passing checks do not authorize a merge |
| Data | Populated working prototype content | Prices, names, badges, codes, statuses, and URLs are not canonical CMS truth |

The only accepted concrete navigation-to-comparator placement is:

`Mobile → Tariffs → Prepaid → Postpaid → Compare tariffs → Tariffs archive`

`Compare tariffs` is after `Postpaid` and before `Tariffs archive` on desktop,
mobile, and the Tariffs Floating popover.

## 2. Required integration workflow

1. Confirm the exact source commit and target branch. Inspect the target branch
   and working tree before applying anything.
2. Decide the requested scope explicitly: navigation probe, transfer-number
   scenario, tariff comparator, or a specifically accepted subset.
3. Diff that scope against the target implementation. Do not merge the entire
   branch merely because one element is needed.
4. Preserve unrelated target-branch work. Resolve shared-file conflicts by
   behavior and contracts, not by choosing one whole file automatically.
5. Preserve the language/version contract in section 5 and the comparator
   invariants in section 6.
6. Run the checks in section 9. Record failures as failures.
7. Keep the result on the target branch as a probe unless an explicit human
   decision authorizes stable integration, publication, or merge.

## 3. Commit and security map

The feature history after stable `main` is:

| Commit | Purpose | Integration warning |
| --- | --- | --- |
| `b1d2408` | Initial navigation review probe | Also deletes `middleware.js`. Never carry that authentication change into a target branch automatically. Preserve the target branch's approved access policy. |
| `632d183` | Transfer-number navigation scenario | Depends on the initial `nav-lab` runtime and shared registry entry |
| `4aecf06` | Mobile navigation behavior | Modifies both the main nav probe and transfer scenario |
| `6847eaf` | Connected EN/AZ tariff comparator and language dropdown | Changes shared nav, registry, connection docs, and adds the comparator |
| `d5aff9c` | RU Version 3 and mobile snap geometry | Depends on the complete comparator from `6847eaf` |
| `d598d97` | RU V3 navigation and Floating actions | Local `nav-lab` probe only: Chat and E-commerce are preview-only; preserve EN/AZ and do not infer acceptance or deployment |

Do not blindly cherry-pick `b1d2408`: its authentication deletion is separate
from the navigation feature. Do not restore or expose any historical embedded
credentials. Authentication changes require an explicit security decision.

### How this chronology stays current

The marker-bounded block below is generated from committed Git history by
`scripts/sync-integration-handoff-history.mjs`. It lists each tracked behavior
version, exact file deltas, affected areas, and optional `Integration-Note:` /
`Integration-Risk:` commit annotations. It deliberately ignores working-tree
changes so an unpublished local experiment cannot appear as branch truth.

Agents changing the tracked behavior must run the sync after the behavior
commit, update the manual contract sections when behavior changed, and commit
the resulting documentation before push. `scripts/audit.mjs` checks freshness,
and the versioned pre-push hook attempts the sync automatically.

<!-- INTEGRATION_HISTORY:START -->
### Generated Git chronology

Tracked behavior snapshot: `d598d97c2054b7873d2d94f9681cf1223cb17c18`. Documentation-only commits are excluded so regenerating this block cannot create a self-referential commit loop.
Baseline: `42a7855e77705974c11c2fba2e4cfae1854dcf03`. Only committed changes in the tracked behavior allowlist are included; working-tree changes and handoff/docs files are excluded.

Latest behavior version: `d598d97` — feat(nav-lab): refine RU navigation and floating actions.
Previous behavior version: `8f8fb7e` — feat: unify tariff comparison controls and sticky headers.

### Versions and file deltas

| Version | Date | Git message | Integration notes and risks | Areas | What changed | Files |
| --- | --- | --- | --- | --- | --- | --- |
| `b1d2408` | 2026-08-25 | feat: publish navigation review probe | — (see exact Git message) | Shared runtime, Security / access, Navigation probe | 1 changed, 1 removed, 3 added | Changed: `assets/js/site-registry.js`<br>Removed: `middleware.js`<br>Added: `nav-lab/index.html`, `nav-lab/navigation.css`, `nav-lab/navigation.js` |
| `632d183` | 2026-08-25 | feat: add transfer number navigation probe | — (see exact Git message) | Shared runtime, Navigation probe | 4 changed, 3 added | Changed: `assets/js/site-registry.js`, `nav-lab/index.html`, `nav-lab/navigation.css`, `nav-lab/navigation.js`<br>Added: `nav-lab/transfer-number/index.html`, `nav-lab/transfer-number/transfer-number.css`, `nav-lab/transfer-number/transfer-number.js` |
| `4aecf06` | 2026-08-26 | feat: add mobile navigation prototype | — (see exact Git message) | Navigation probe | 6 changed | Changed: `nav-lab/index.html`, `nav-lab/navigation.css`, `nav-lab/navigation.js`, `nav-lab/transfer-number/index.html`, `nav-lab/transfer-number/transfer-number.css`, `nav-lab/transfer-number/transfer-number.js` |
| `6847eaf` | 2026-08-26 | feat: add connected tariff comparison prototype | — (see exact Git message) | Shared runtime, Navigation probe, Tariff comparator | 5 changed, 4 added | Changed: `assets/js/site-registry.js`, `nav-lab/index.html`, `nav-lab/navigation.css`, `nav-lab/navigation.js`, `nav-lab/transfer-number/index.html`<br>Added: `tariff-compare-lab/app.js`, `tariff-compare-lab/data.js`, `tariff-compare-lab/index.html`, `tariff-compare-lab/styles.css` |
| `d5aff9c` | 2026-08-27 | feat: add RU tariff comparison and mobile snap scrolling | — (see exact Git message) | Tariff comparator | 3 changed | Changed: `tariff-compare-lab/app.js`, `tariff-compare-lab/data.js`, `tariff-compare-lab/styles.css` |
| `8f8fb7e` | 2026-08-27 | feat: unify tariff comparison controls and sticky headers | — (see exact Git message) | Tariff comparator | 2 changed | Changed: `tariff-compare-lab/app.js`, `tariff-compare-lab/styles.css` |
| `d598d97` | 2026-08-28 | feat(nav-lab): refine RU navigation and floating actions | Note: Commit the reviewed RU/V3 navigation and floating action behavior for integration review.<br>Risk: Chat and E-commerce are preview-only placeholders; no client acceptance or production integration is implied. | Navigation probe | 6 changed | Changed: `nav-lab/index.html`, `nav-lab/navigation.css`, `nav-lab/navigation.js`, `nav-lab/transfer-number/index.html`, `nav-lab/transfer-number/transfer-number.css`, `nav-lab/transfer-number/transfer-number.js` |

**Security attention:** `b1d2408` removes `middleware.js`. This is a historical Git fact, not permission to remove or weaken authentication in another branch; require an explicit security decision.

<!-- INTEGRATION_HISTORY:END -->

## 4. File and runtime map

### Navigation probe

- `nav-lab/index.html` — page composition and Floating Bar markup.
- `nav-lab/navigation.js` — Header, desktop menus, mobile drawer, language
  dropdown, Footer, Floating popovers, URL propagation, and docking.
- `nav-lab/navigation.css` — probe geometry, responsive behavior, dropdown,
  drawer, Footer, Floating Bar, and stacking.
- `nav-lab/transfer-number/` — connected product-page scenario.
- `assets/js/site-registry.js` — internal route registration.

`navigation.js` expects `#navigation-probe` and `#footer-probe` mounts and the
shared `assets/js/site-registry.js`, `assets/js/components.js`, and
`assets/js/app.js` scripts. The Header and Footer are rendered by JavaScript;
copying only the HTML will not reproduce them.

### Tariff comparator

- `tariff-compare-lab/index.html` — required stylesheet/script order and mounts.
- `tariff-compare-lab/app.js` — renderers, state, URL behavior, and interactions.
- `tariff-compare-lab/data.js` — replaceable prototype data.
- `tariff-compare-lab/styles.css` — comparison geometry, mobile snapping, and RU
  sticky rail.
- Shared dependencies: `nav-lab/navigation.js`, `nav-lab/navigation.css`,
  `assets/js/site-registry.js`, `assets/js/components.js`, and
  `assets/js/app.js`.

The route is `/tariff-compare-lab/`. It is an internal review route linked from
`nav-lab`; it is not the stable `/tariffs/compare/` implementation.

### Shared-file caution

`assets/js/site-registry.js`, `PAGE_CONNECTIONS.md`, and the nav runtime may
also contain independent target-branch work. Integrate the exact records and
behaviors required by the adopted scope; do not overwrite the whole target
file without review.

## 5. Language selector and version contract

The Header language control is a dropdown on desktop and in the mobile drawer.
It contains `AZ`, `EN`, and `RU` in that order and exposes menu semantics and a
selected state. It is not a two-state button.

The current probe deliberately uses language selection as review-version
control:

| Selection | URL state | Navigation mode | Comparator mode |
| --- | --- | --- | --- |
| `EN` | `lang=en&variant=v1` | Navigation/Footer Apps V1 | Compact EN/AZ renderer |
| `AZ` | `lang=az&variant=v2` | Navigation/Footer Apps V2 | Detailed EN/AZ renderer |
| `RU` | `lang=ru&variant=v3` | Navigation V3 | Separate RU Version 3 renderer |

This is prototype version control, not completed content localization. The
visible copy is largely English, and the document language is not dynamically
localized. Do not describe the current behavior as production-ready locale
switching.

Selecting a language must update all of these together:

- desktop and mobile selector labels and selected/expanded semantics;
- the `lang` and `variant` query parameters;
- variant-dependent Apps navigation and Footer content;
- the Transfer Your Number link (`variant` and `lang`);
- every Compare tariffs link (`billing=prepaid`, `lang`, and `variant`);
- the active comparator renderer.

For `EN`, force `variant=v1`. For `AZ`, force `variant=v2`. For `RU`, force
`variant=v3` and enter RU Version 3 in both navigation and the comparator. The
dropdown closes on selection, outside click, or Escape.

RU/V3 is a review variant, not localization completion. Its utility label is
`Service Centers` (EN/AZ retain `Locations`); it adds an `E-commerce` entry
after `Devices` in Header and Footer with only the preview placeholder `Details
to be confirmed later.` Apps is a full flat list with a stable promo area: two
columns on desktop/tablet and one on mobile. These labels, order and
placeholders are not accepted product IA or destinations. This changes the
utility label only: the current Support inventory still includes `Locations`.

Do not reintroduce a page-level Compact/Detailed switch or the retired `view`
query parameter. `billing=prepaid|postpaid` remains the shareable EN/AZ state.

## 6. Comparator invariants

### EN and AZ

- `EN` renders Compact; `AZ` renders Detailed.
- Prepaid and Postpaid use separate catalogues.
- Billing changes reset to two tariffs below `1024px` and three on desktop.
- The comparison supports 2–5 tariffs and prevents duplicate selections.
- Add, remove, and tariff replacement preserve contained horizontal position
  where applicable and clamp it after removal.
- The URL carries billing plus Header language/version, not the full selected
  tariff list.

### RU Version 3

- Starts with DigiMax 10GB and Premium+ 60GB.
- New cards start as DigiMax 10GB.
- Uses a family dropdown grouped by Prepaid/Postpaid and a second variant
  dropdown when a family has multiple variants.
- Mixed billing and exact duplicate tariffs are intentionally allowed in this
  version; final product policy is unresolved.
- Supports 2–5 cards. Remove is disabled at two; Add is disabled at five.
- Uses one right-aligned Add tariff action row above the grid. Do not add inline,
  right-edge, or floating Add controls.
- Sticky compact summaries stay aligned with the horizontally scrolling cards
  and below the site Header.

### Mobile geometry for all versions

Below `1024px`, initialize/reset with two selected tariffs and show exactly two
full columns with no next-card peek. One horizontal snap advances from columns
1+2 to 2+3. Scrolling must remain inside the comparison shell; the page itself
must not gain horizontal overflow. Preserve scroll position across change,
add, and remove, then clamp it if content shrinks.

## 7. Navigation behavior that is easy to lose

- The current menu inventory is a review implementation, not approved IA.
  Do not promote its labels, hierarchy, destinations, or interaction pattern to
  product truth merely because they exist in code.
- Most probe labels are intentionally non-navigating buttons. `Compare tariffs`
  is the specifically wired navigation item; do not invent destinations for
  the others.
- The desktop Header menus and mobile drawer have distinct mechanics. Mobile
  groups, nested tariff groups, Apps categories, and Footer accordions close
  competing sections rather than leaving every section open.
- EN/AZ Floating Bar has Internet, Tariffs, Roaming, and Kinon plus a separate
  inert Search control. RU/V3 hides Kinon and uses Internet, Tariffs, Roaming |
  preview-only inactive Chat / inert Search. Chat does not open a popover or
  start a support conversation; one product popover opens at a time, and
  outside click and Escape close it.
- On the RU Transfer scenario, default Floating utilities are preview-only
  inactive Chat / inert Search. When the hero CTA leaves view, the action is
  `Start transfer` | Chat / Search; when hidden, the CTA group collapses fully
  so no empty divider or padding remains. EN/AZ Transfer behavior is unchanged.
- The Floating Bar docks `16px` before the Footer and returns to fixed position
  on reverse scroll. Preserve its attached popover during docking.
- The Header's owning stacking context must stay above the product Floating
  Bar. Raising only a child z-index does not solve the overlap.
- If a shared nav asset cache key is changed, update every consumer together:
  `nav-lab`, `nav-lab/transfer-number`, and `tariff-compare-lab`.

## 8. Open decisions and prohibited assumptions

These remain unresolved unless a newer explicit decision is supplied:

- final navigation IA, labels, hierarchy, destinations, parent-link semantics,
  responsive disclosure model, Search placement, B2C/B2B switching, and exact
  Footer/Floating content;
- stable-site Header/Footer integration and replacement of
  `/tariffs/compare/`;
- canonical CMS catalogue, freshness, archive/closed state rules, legal copy,
  Alfa/Alpha naming, and full comparison URL state;
- final mixed-billing and duplicate policy outside RU V3;
- real localization and locale-specific destinations;
- business/client acceptance and design sign-off.

Do not reproduce the colleague-source `setManageOpen` runtime defect. Do not
simulate activation, purchase, authentication, or backend success. Activation
codes are informational; real actions must use an approved external handoff.

## 9. Required verification after integration

Run the repository audit and syntax checks for every adopted JavaScript file:

```bash
node scripts/audit.mjs
node --check nav-lab/navigation.js
node --check nav-lab/transfer-number/transfer-number.js
node --check tariff-compare-lab/app.js
node --check tariff-compare-lab/data.js
git diff --check
```

Then verify the adopted scenarios in a real browser at approximately `375px`,
`834px`, and `1440px`:

- language dropdown open/select/outside/Escape behavior on desktop and mobile;
- `EN/v1`, `AZ/v2`, and `RU` URL propagation across Header, transfer route, and
  Compare tariffs links;
- exact Compare tariffs placement on desktop, mobile, and Floating Tariffs;
- EN Compact, AZ Detailed, and RU V3 renderer selection;
- direct billing URLs and browser back/forward for EN/AZ;
- 2–5 limits, EN/AZ duplicate prevention, RU duplicate allowance, RU Add/remove
  states, and family/variant replacement;
- two full mobile columns, one-column snap, contained scrolling, preservation
  and clamping after edits, and no page-level horizontal overflow;
- RU sticky alignment below the Header;
- Floating open/close/docking, Header overlap, Footer gap, and reverse-scroll
  recovery;
- RU/V3 floating replacement of Kinon by preview-only Chat, including
  hidden/visible ARIA and tab order; RU Transfer default Chat/Search symmetry
  and CTA-visible `Start transfer | Chat | Search` restoration;
- zero browser console errors or unhandled rejections.

Passing these checks proves the bounded implementation behavior only. It does
not prove product correctness, CMS freshness, business acceptance, or design
approval.
