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
