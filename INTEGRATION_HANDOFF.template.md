# Integration Handoff — template

Copy this file to `INTEGRATION_HANDOFF.md` on your branch and fill it in. Delete this heading block
and every `<!-- fill in -->` hint as you go. Do not delete the `INTEGRATION_HISTORY` markers.

**Adopting the approach on a branch, in full:**

1. Merge `main` so you have `scripts/sync-integration-handoff-history.mjs`, `.githooks/pre-push`,
   and `scripts/install-integration-hooks.mjs`.
2. `cp INTEGRATION_HANDOFF.template.md INTEGRATION_HANDOFF.md` and fill in the sections below.
3. `node scripts/install-integration-hooks.mjs` — once per checkout.
4. `node scripts/sync-integration-handoff-history.mjs` — fills the generated block.
5. Commit both. The pre-push hook refreshes the note and stops the push if it still needs a commit.

Nothing below is generated except the marker-bounded block. The generated block lists *what*
changed; only you can write *what it means*.

---

# Integration Handoff for AI Agents

Read this document before merging, cherry-picking, copying, or reimplementing work from this branch
into `main` or any other branch. It is self-contained: the target checkout may not have any of this
branch's context.

## 1. Status and authority boundary

<!-- fill in: the commit you actually verified, and the target snapshot you verified against -->

Verified snapshot: `<sha>`. Integration target at the time of verification: `<sha>`.

| Area | Current status | Do not infer |
|---|---|---|
| <!-- feature --> | <!-- implemented / partial / probe --> | <!-- what a working demo does NOT prove --> |
| `main` integration | Not performed | A working feature and a passing audit do not authorise a merge |
| Data | Prototype content | Prices, names, codes, and URLs are not canonical CMS truth |

State approvals precisely. "Accepted by me" is not "accepted by the team, the client, design, legal,
or the CMS". If nobody has approved it, write that.

## 2. Required integration workflow

1. Confirm the exact source commit and target branch. Inspect the target working tree first.
2. Decide the requested scope explicitly. Do not merge the whole branch because one part is wanted.
3. Diff that scope against the target implementation.
4. Preserve unrelated target-branch work. Resolve shared-file conflicts by behaviour, not by taking
   one whole file.
5. Preserve the invariants in section 5.
6. Run the checks in section 7. Record failures as failures.
7. Keep the result as a probe unless an explicit human decision authorises stable integration.

## 3. Commit and security map

<!-- fill in: one row per commit that a reader could misread, and why -->

| Commit | Purpose | Integration warning |
|---|---|---|
| `<sha>` | <!-- what it does --> | <!-- what must not be carried over blindly --> |

Call out anything that touches access control, routing, or a stable route. Those need their own
decision, separate from the feature.

### How this chronology stays current

The marker-bounded block below is generated from committed Git history by
`scripts/sync-integration-handoff-history.mjs`. It lists each tracked behaviour version, exact file
deltas, affected areas, and any `Integration-Note:` / `Integration-Risk:` lines from commit bodies.
It ignores working-tree changes, so an unpublished local experiment cannot appear as branch truth.

After a behaviour commit: run the sync, update the manual sections if behaviour changed, then commit
the documentation. `scripts/audit.mjs` checks freshness and the pre-push hook attempts the sync.

<!-- INTEGRATION_HISTORY:START -->
<!-- INTEGRATION_HISTORY:END -->

## 4. File and runtime map

<!-- fill in: what each file does, and what breaks if it is copied alone -->

| File | Role |
|---|---|
| `<path>` | <!-- role --> |

Name the runtime expectations: required mount points, script load order, and shared dependencies.
If copying the HTML alone will not reproduce the result, say so here.

### Shared-file caution

<!-- fill in: which shared files also carry independent work on other branches -->

`assets/js/site-registry.js` and `PAGE_CONNECTIONS.md` accumulate entries on several branches at
once. Integrate the exact records required; never overwrite the whole file.

## 5. Behaviour invariants

<!-- fill in: the rules a reimplementation must preserve, in behaviour terms, not code terms -->

Write what must remain true, at all three breakpoints, including anything easy to lose in a merge:
state that must persist, URL parameters, focus and keyboard behaviour, stacking order, and limits.

## 6. Open decisions and prohibited assumptions

<!-- fill in: everything still unresolved -->

List every open question. An agent reading this must not resolve any of them on its own initiative.

Do not simulate activation, purchase, authentication, or backend success. Real actions use an
approved external handoff.

## 7. Required verification after integration

```bash
node scripts/audit.mjs
node --check <every adopted .js file>
git diff --check
```

Then verify the adopted scenarios in a browser at roughly 375px, 834px, and 1440px:

<!-- fill in: the exact scenarios, one per line -->

- <!-- scenario -->
- zero browser console errors or unhandled rejections

Passing these proves the bounded implementation behaviour only. It does not prove product
correctness, CMS freshness, business acceptance, or design approval.
