# Branch Status

The single note on `main` that says what every branch contains, how ready it is, and which files
two branches are about to fight over. Read it before merging, cherry-picking, or copying work
between branches.

It has two halves, and they are not interchangeable:

- **Generated facts** — the marker-bounded block below. Produced from committed Git history by
  `scripts/sync-branch-status.mjs`. Never edit it by hand.
- **Manual status** — human judgement that Git cannot know: is the work approved, what is blocked,
  what must never be merged. Only a person or an agent acting on a person's decision writes it.

A branch's own detail lives in its `INTEGRATION_HANDOFF.md`, on that branch. This file is the index;
the handoff is the contract.

## How to use it

1. `node scripts/sync-branch-status.mjs --fetch` — refresh the facts from `origin`.
2. Read the conflict watchlist below before planning a merge order.
3. Read the source branch's own handoff note: `git show origin/<branch>:INTEGRATION_HANDOFF.md`.
4. Merge one agreed scope at a time. Never merge a whole branch because one part of it is wanted.
5. Update the manual status and add an update-log row in the same change.

The `branch-integration` skill in `.cursor/skills/` runs this whole sequence.

## Manual status

Statuses are decisions, not code facts:

- **Ready** — an explicit human decision authorises merging an agreed scope.
- **Probe** — real, reviewable work with no approval to enter `main`.
- **Blocked** — something must be resolved before any merge is planned.
- **Dormant** — no work beyond the fork point.

| Branch | Owner | What it is | Status | Blocking question |
|---|---|---|---|---|
| `main` | Simon | Integration target and the stable prototype | — | — |
| `vlad` | Vlad | Navigation and tariff-compare labs are on `main` as hidden review routes (`nav-lab/`, `/compare/`) | Probe | Must not replace the live header or `/tariffs/compare/`. No business, design, or CMS acceptance. |
| `vadym` | Vadym | Business homepage chrome (menu, solutions block, floating bar, footer) — that scope is now on `main`. Rest of the branch (campaign rewrite, Vercel public, heading tests) is not adopted | Probe | Remaining branch work is not authorised. Still no `INTEGRATION_HANDOFF.md`. |

### Standing constraints

- `vlad` commit `b1d2408` deletes `middleware.js`. That is an authentication change, not part of the
  navigation feature. Never carry it into another branch automatically. It needs its own explicit
  security decision.
- `nav-lab/` and `/compare/` (Vlad’s compare lab) are review probes. They must not silently replace the stable
  `/tariffs/compare/` route or the shared site header and footer.
- `assets/js/site-registry.js` and `PAGE_CONNECTIONS.md` accumulate independent work on several
  branches. Merge the exact records needed, never the whole file.
- The handoff tooling itself now exists in two versions. `vlad` carries the original,
  branch-specific one; `main` carries a branch-agnostic rewrite that any branch can run unchanged.
  When `vlad` merges `main`, take **main's** version of `.githooks/pre-push`, `AGENTS.md`,
  `scripts/audit.mjs`, and `scripts/sync-integration-handoff-history.mjs`, then re-run the sync.
  `scripts/install-integration-hooks.mjs` is byte-identical on both and will not conflict.
  Vlad's `README.md` handoff section is superseded by the one on `main`.

## Generated facts

<!-- BRANCH_FACTS:START -->
### Generated branch facts

Integration target: `main` at `407157cea41920b36c937060064c4716538fd569`.
Generated from local Git refs under `refs/remotes/origin`. Run `node scripts/sync-branch-status.mjs --fetch` to pull the latest remote state first. Working-tree changes are never included.

### Branches

| Branch | Last commit | Date | Author | Ahead of `main` | Behind `main` | In `main` | Handoff note | Areas touched |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `vadym` | `f3ac0ec` | 2026-08-27 | pajasu | 13 | 1 | No | None | `.cursor/`, `.gitignore`, `PAGE_CONNECTIONS.md`, `assets/`, `business/`, `index.html`, `join-azercell/`, `planned/`, `tariffs/` |
| `vlad` | `a3b763e` | 2026-08-27 | vladssssssss | 9 | 1 | No | `a3b763e` (2026-08-27) | `.githooks/`, `AGENTS.md`, `INTEGRATION_HANDOFF.md`, `PAGE_CONNECTIONS.md`, `README.md`, `assets/`, `middleware.js`, `nav-lab/`, `scripts/`, `tariff-compare-lab/` |

### File deltas since each fork point

| Branch | Last subject | Fork point | What changed | Files |
| --- | --- | --- | --- | --- |
| `vadym` | Polish business navigation and solution cards | `42a7855` | 2 added, 27 changed | Added: `.cursor/skills/plan-handoff/SKILL.md`, `join-azercell/transfer-number/index.html`<br>Changed: `.gitignore`, `PAGE_CONNECTIONS.md`, `assets/css/styles.css`, `assets/js/app.js`, `assets/js/components.js`, `assets/js/site-registry.js`, `business/index.html`, `index.html`, `planned/index.html`, `tariffs/compare/index.html`, `tariffs/internet/daily/index.html`, `tariffs/internet/index.html`, `tariffs/internet/monthly/index.html`, `tariffs/internet/unlimited/index.html`, `tariffs/internet/weekly/index.html`, `tariffs/mobile/index.html`, `tariffs/mobile/postpaid/alfa/index.html`, `tariffs/mobile/prepaid/archive/index.html`, `tariffs/mobile/prepaid/data-plus/index.html`, `tariffs/mobile/prepaid/data/index.html`, `tariffs/mobile/prepaid/digimax/index.html`, `tariffs/mobile/prepaid/premium-plus/index.html`, `tariffs/mobile/prepaid/veteran/index.html`, `tariffs/roaming/countries-and-prices/index.html`, `tariffs/roaming/index.html`, `tariffs/roaming/internet-packs/index.html`, `tariffs/roaming/travel-packs/index.html` |
| `vlad` | docs: update integration handoff chronology | `42a7855` | 15 added, 4 changed, 1 removed | Added: `.githooks/pre-push`, `AGENTS.md`, `INTEGRATION_HANDOFF.md`, `nav-lab/index.html`, `nav-lab/navigation.css`, `nav-lab/navigation.js`, `nav-lab/transfer-number/index.html`, `nav-lab/transfer-number/transfer-number.css`, `nav-lab/transfer-number/transfer-number.js`, `scripts/install-integration-hooks.mjs`, `scripts/sync-integration-handoff-history.mjs`, `tariff-compare-lab/app.js`, `tariff-compare-lab/data.js`, `tariff-compare-lab/index.html`, `tariff-compare-lab/styles.css`<br>Changed: `PAGE_CONNECTIONS.md`, `README.md`, `assets/js/site-registry.js`, `scripts/audit.mjs`<br>Removed: `middleware.js` |

### Conflict watchlist

Files below are touched by more than one unmerged branch, or were also changed on the integration target after that branch forked. Merge these by behaviour, never by taking one whole file.

| File | Unmerged branches touching it | Also changed on `main` since the fork |
| --- | --- | --- |
| `assets/js/site-registry.js` | `vadym`, `vlad` | Yes |
| `PAGE_CONNECTIONS.md` | `vadym`, `vlad` | Yes |
| `.cursor/skills/plan-handoff/SKILL.md` | `vadym` | Yes |
| `.gitignore` | `vadym` | Yes |
| `assets/css/styles.css` | `vadym` | Yes |
| `assets/js/app.js` | `vadym` | Yes |
| `assets/js/components.js` | `vadym` | Yes |
| `business/index.html` | `vadym` | Yes |
| `index.html` | `vadym` | Yes |
| `join-azercell/transfer-number/index.html` | `vadym` | Yes |
| `planned/index.html` | `vadym` | Yes |
| `tariffs/compare/index.html` | `vadym` | Yes |
| `tariffs/internet/daily/index.html` | `vadym` | Yes |
| `tariffs/internet/index.html` | `vadym` | Yes |
| `tariffs/internet/monthly/index.html` | `vadym` | Yes |
| `tariffs/internet/unlimited/index.html` | `vadym` | Yes |
| `tariffs/internet/weekly/index.html` | `vadym` | Yes |
| `tariffs/mobile/index.html` | `vadym` | Yes |
| `tariffs/mobile/postpaid/alfa/index.html` | `vadym` | Yes |
| `tariffs/mobile/prepaid/archive/index.html` | `vadym` | Yes |
| `tariffs/mobile/prepaid/data-plus/index.html` | `vadym` | Yes |
| `tariffs/mobile/prepaid/data/index.html` | `vadym` | Yes |
| `tariffs/mobile/prepaid/digimax/index.html` | `vadym` | Yes |
| `tariffs/mobile/prepaid/premium-plus/index.html` | `vadym` | Yes |
| `tariffs/mobile/prepaid/veteran/index.html` | `vadym` | Yes |
| `tariffs/roaming/countries-and-prices/index.html` | `vadym` | Yes |
| `tariffs/roaming/index.html` | `vadym` | Yes |
| `tariffs/roaming/internet-packs/index.html` | `vadym` | Yes |
| `tariffs/roaming/travel-packs/index.html` | `vadym` | Yes |

**Missing handoff notes:** `vadym` has no `INTEGRATION_HANDOFF.md`. Ask the branch owner to add one from `INTEGRATION_HANDOFF.template.md` before integrating that work.

<!-- BRANCH_FACTS:END -->

## Update log

Newest first. One row per decision or integration — not per commit.

| Date | Branch | What happened | Decided by |
|---|---|---|---|
| 2026-08-27 | `vlad` | Personal prepaid/postpaid Compare buttons on `main` now open `/compare/`. Live `/tariffs/compare/` unchanged. | Simon |
| 2026-08-27 | `vlad` | Compare lab route on `main` is `/compare/` (was `/tariff-compare-lab/`). Live `/tariffs/compare/` unchanged. | Simon |
| 2026-08-27 | `vlad` | Adopted `tariff-compare-lab/` onto `main` as a hidden review route. Did not replace live `/tariffs/compare/`, did not delete `middleware.js`. | Simon |
| 2026-08-27 | `vadym` | Adopted Business navigation structure only onto `main`: menu, solutions block, floating bar, footer. Did not take campaigns rewrite, heading tests, or Vercel public. | Simon |
| 2026-08-27 | `vlad` | Adopted `nav-lab/` (header/menu + transfer-number scenario) onto `main` as a hidden review route. Did not take `tariff-compare-lab/`, did not delete `middleware.js`, did not replace the live header/footer. | Simon |
| 2026-08-27 | `main` | Adopted the branch-handoff approach from `vlad`. Added this note, the generator, the pre-push check, and the `branch-integration` skill. | Simon |
