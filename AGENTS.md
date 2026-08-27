# Repository Agent Instructions

These instructions apply to the whole repository.

## Cross-branch work

Before merging, rebasing, cherry-picking, copying, or reimplementing work from another branch, read
[`BRANCH_STATUS.md`](BRANCH_STATUS.md) in full, then read that branch's own handoff note:

```bash
node scripts/sync-branch-status.mjs --fetch
git show origin/<branch>:INTEGRATION_HANDOFF.md
```

The `branch-integration` skill in `.cursor/skills/` runs the full sequence. Treat both notes as
binding contracts, not background reading.

In particular:

- a branch marked `Probe`, `Blocked`, or `Dormant` is not authorised to merge — a working feature
  and a passing audit are not authorisation;
- adopt one named scope at a time; never merge a whole branch because one part of it is wanted;
- work through the conflict watchlist before planning a merge order, and resolve shared files by
  behaviour rather than taking one whole file;
- never carry an authentication, access, or stable-route change across branches without an explicit
  decision;
- if a branch has no handoff note, or its note is flagged stale, stop and ask the owner.

After an integration, record what was adopted, what stayed a probe, and which acceptance signals are
still pending.

## Keeping the notes current

On a new checkout, run `node scripts/install-integration-hooks.mjs` once. It enables the versioned
pre-push hook without replacing an existing custom hook configuration.

Two notes, both split into a generated block and manual sections:

| Note | Lives on | Generator |
|---|---|---|
| `BRANCH_STATUS.md` | the integration target | `scripts/sync-branch-status.mjs` |
| `INTEGRATION_HANDOFF.md` | each feature branch | `scripts/sync-integration-handoff-history.mjs` |

Never hand-edit a generated block. Never let generated file deltas stand in for a behavioural
explanation — write the manual sections whenever behaviour or an integration boundary changes.

`scripts/audit.mjs` fails when either note is stale. The pre-push hook attempts both syncs and stops
the push if a note still needs a commit. It never stages, commits, amends, or pushes by itself.
Uncommitted local experiments are deliberately excluded from published notes.

A branch adopting this approach copies `INTEGRATION_HANDOFF.template.md` and follows the steps at
the top of it.
