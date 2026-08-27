---
name: branch-integration
description: Reads BRANCH_STATUS.md and each branch's INTEGRATION_HANDOFF.md before any cross-branch work. Use when merging, cherry-picking, copying, or reimplementing work between branches, when asked what a branch contains or whether it is ready to merge, when planning a merge order, or when asked about branch status, conflicts, or updates on another branch.
---

# Branch Integration

## When to use

**Mandatory** before merging, rebasing, cherry-picking, copying, or reimplementing any work from
another branch. Also use when the user asks:

- what is on `vlad` / `vadym` / any branch, or what changed there
- whether a branch is ready to merge, or in what order branches should land
- which files will conflict between branches
- for a branch status report or an update summary

Never answer any of these from memory or from a bare `git log`. The notes exist because Git history
alone does not say what is approved, what is a probe, or what must never be carried over.

## The two notes

| Note | Lives on | Holds |
|---|---|---|
| `BRANCH_STATUS.md` | `main` | Index of every branch: facts, human status, conflict watchlist, update log |
| `INTEGRATION_HANDOFF.md` | each feature branch | That branch's contract: what is approved, invariants, risks, verification |

Both split the same way: a marker-bounded **generated block** built from committed Git history, and
**manual sections** holding human judgement. Never hand-edit a generated block. Never let a
generated file delta replace a behavioural explanation.

## Steps

### 1. Refresh the facts

```bash
node scripts/sync-branch-status.mjs --fetch
```

Facts come from committed history only. Uncommitted local experiments are deliberately excluded, so
a half-finished working tree can never be reported as branch truth.

### 2. Read the index

Read `BRANCH_STATUS.md` in full. Take from it:

- the branch's **manual status** — `Ready`, `Probe`, `Blocked`, or `Dormant`
- the **standing constraints** — things that must never be merged automatically
- the **conflict watchlist** — files contested between branches, or moved on `main` since the fork

`Probe`, `Blocked`, and `Dormant` mean there is no authorisation to merge. A working feature and a
passing audit are not authorisation.

### 3. Read the source branch's own handoff

No checkout needed:

```bash
git show origin/<branch>:INTEGRATION_HANDOFF.md
git show origin/<branch>:AGENTS.md
```

If the branch has no handoff note, stop. Ask the owner to add one from
`INTEGRATION_HANDOFF.template.md` before integrating. Do not reconstruct the contract by reading
their code.

If the note is flagged **stale by N code commits**, the last commits are undocumented. Treat the
gap as unknown and ask, rather than inferring intent from the diff.

### 4. Decide the scope explicitly

Name exactly what is being adopted — one feature, one folder, one accepted subset. Never merge a
whole branch because one part of it is wanted. Confirm the source commit and the target working
tree before changing files.

### 5. Work through the conflict watchlist

For every contested file:

- resolve by **behaviour and contracts**, not by taking one whole file
- preserve unrelated work already on the target branch
- registry and connection files (`assets/js/site-registry.js`, `PAGE_CONNECTIONS.md`) accumulate
  independent entries on several branches — merge the exact records needed

### 6. Verify

```bash
node scripts/audit.mjs
node --check <every adopted .js file>
git diff --check
```

Then run the scenario checks listed in the source branch's handoff, in a browser at roughly 375px,
834px, and 1440px. Record failures as failures.

### 7. Write the result back

In the same change:

- update the **manual status** row in `BRANCH_STATUS.md`
- add an **update-log** row: date, branch, what happened, who decided
- update the source branch's handoff if its contract changed
- run `node scripts/sync-branch-status.mjs` and commit the regenerated block

The pre-push hook refreshes both notes and blocks the push if either still needs a commit. It never
stages, commits, amends, or pushes by itself.

## Stop and ask

Ask the user before:

- merging anything a note marks `Probe`, `Blocked`, or not authorised
- carrying an authentication or access change across branches
- replacing a stable route or the shared header and footer with a probe
- adopting work from a branch whose handoff is missing or stale
- changing a manual status from `Probe` to `Ready` — that is a human decision, not an agent's

Never push. Commit when asked and stop there.

## Reporting

Answer with the branch, its manual status, what it contains, what blocks it, and the contested
files. State plainly what is a documented fact and what is still an open decision. Passing checks
prove implementation behaviour only — never business, design, or CMS acceptance.
