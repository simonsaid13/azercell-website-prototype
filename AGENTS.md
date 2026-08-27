# Repository Agent Instructions

These instructions apply to the whole repository.

## Integration entrypoint

Before merging, cherry-picking, copying, or reimplementing any work from the
`vlad` branch, read [`INTEGRATION_HANDOFF.md`](INTEGRATION_HANDOFF.md) in full.
Treat it as the required contract for the navigation and tariff-comparison
work.

In particular:

- verify the source commit, target branch, target authentication policy, and
  working tree before changing files;
- treat `nav-lab/` and `tariff-compare-lab/` as review probes, not approved
  stable-site replacements;
- preserve the shared language/version contract across the Header, navigation,
  transfer route, and tariff comparator;
- do not change authentication, replace stable routes, merge to `main`, deploy,
  or claim business/client/design acceptance without explicit authorization;
- stage only the adopted scope and preserve unrelated local work.

After an integration, run the repository audit and the scenario checks listed
in the handoff. Record what was adopted, what remained a probe, and which
acceptance signals are still pending.

## Keep the handoff current

On a new checkout, run `node scripts/install-integration-hooks.mjs` once. It
enables the versioned pre-push hook without replacing an existing custom hook
configuration.

When a commit changes `nav-lab/`, `tariff-compare-lab/`, the shared runtime, or
the historical access boundary:

1. Make the behavior commit with a specific subject. When useful, add exact
   `Integration-Note:` and `Integration-Risk:` lines to its commit body.
2. Run `node scripts/sync-integration-handoff-history.mjs`. This reads committed
   Git history only and updates the generated chronology block.
3. If behavior or an integration boundary changed, update the relevant manual
   contract section in `INTEGRATION_HANDOFF.md` as part of the follow-up docs
   commit. Do not let generated file deltas replace behavioral explanation.
4. Run `node scripts/audit.mjs` and commit the resulting handoff update before
   pushing.

The pre-push hook attempts the history sync automatically. If the handoff
changes, it stops the push so the agent can review and commit the generated
update. It never stages, commits, amends, or pushes by itself. Uncommitted local
experiments are deliberately excluded from published chronology.
