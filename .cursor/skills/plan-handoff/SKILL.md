---
name: plan-handoff
description: Writes a per-feature PLAN.md that another session can execute, without touching production code. Invoke when the user says "plan, no code", "no code just plan", "create a plan", "write PLAN.md", "new feature", "plan this feature", or asks to collect context for a feature before building.
---

# Plan Handoff — write the plan, touch nothing else

Goal: produce a `.claude/prompts/<feature>/PLAN.md` that a fresh agent (with no
memory of this conversation) can execute end to end. The plan is the entire
deliverable. One feature = one folder = one PLAN.md. All context for that
feature lives in that file, not in chat.

Plan files are gitignored. They stay on this machine only.

## Step 0 — The write-gate (hard rule)

While this skill is active the **only** writable path is
`.claude/prompts/<feature>/` — `PLAN.md` plus any assets the plan needs
(screenshots, extracted design dumps, spec files). Every other file in the repo
is read-only: no components, no pages, no CSS, no "tiny obvious fix along the
way". If something in the codebase clearly needs to change, that change is a
**step in the plan**, not an edit.

Research is unrestricted — Read, Grep, Glob, any MCP, the whole repo. Only
writing is gated.

## Step 0a — Feature folder

Slug = kebab-case from the feature name (`Mobile tariffs hub` → `mobile-tariffs-hub`).
Ask if the name is unclear. Reuse the folder if it already exists — never
create a second plan for the same feature.

```
.claude/prompts/<feature>/PLAN.md
```

## Step 0b — Promised inputs: confirm scope and wait

If the user's request promises future inputs ("I will send the designs", "I'll
provide the spec/screenshots"), confirm the scope in one line and **wait**. No
subagent fan-out, no design probes, no research burn until the inputs arrive or
the user explicitly says to start without them.

## Step 1 — Research before drafting

Read the code the plan will touch, and this repo's rules and skills:

- `.cursor/rules/` — prototype UI, three breakpoints, component-first, page
  connections, tab URLs, no simulated functionality, source documents
- Skills the executor will run later: `new-prototype-page`, `page-connections`,
  `tab-urls`, `prototype-page-audit`

A plan that contradicts those rules is worse than no plan.

Do **not** build pages, sections, or features found in `Azercell_Sitemap.md` or
the functionality to-do files unless the user already asked for that item. Cite
the document and item in Context. Pull real names, prices (AZN), and copy from
`Azercell_Database_*.md` into the plan — do not invent them.

For design-driven work, extract in **one deep pass** (Figma Console MCP /
`figma-mcp-workflow` skill), not incremental per-node fetches. Verify
completeness before drafting — every visible label and every small element.

This prototype is greyscale, square, type-scale only. Map design to existing
tokens and type classes (`--c-surface`, `--c-line`, `.t-h1`, `.t-body`, …).
Never plan new colours, rounded corners, drop shadows, or new type sizes.

## Step 2 — PLAN.md structure

In this order:

1. **Context** — one paragraph: what is being built, where it lives, why now.
   Include source-doc citations and inbound/outbound link questions still open.
2. **Locked decisions** — everything already settled with the user, stated
   flatly so the executor does not re-litigate it.
3. **Design → token mapping table** — mandatory whenever a design source is
   involved: each design colour / type / spacing → existing greyscale token or
   type class. A design-driven plan without this table is incomplete.
4. **Open questions** — numbered, each with the options and a recommendation.
   Nav labels, hub CTAs, and tab URL params go here if unknown — do not guess.
5. **Steps** — a checkbox list, each step one bounded action with its own
   **verify** line (`→ verify: page renders at 375 / 834 / 1440`, `→ verify:
   connection audit Task completed`). Include an executor contract at the top:
   tick each box as it passes, resume from the first unticked box after a
   compaction, surgical edits only, re-Read files before editing, never push.
   After the page is built, a step must launch a **separate** connection-audit
   Task (`page-connections` skill) before `status: 'built'`.
6. **Touched files** — the full list the executor is expected to create or edit.

When the user's ask included a grouping/format example, the plan mirrors that
format, and every table shown in chat that the plan depends on goes into PLAN.md
unprompted.

Write it with the Write tool. Never paste a full plan into chat instead of the
file — chat is lost, the file is the handoff.

## Step 3 — The iron rule

**Answers to the open questions update the plan. They never start the
implementation.**

The user replying "option B, and keep the header sticky" means: edit PLAN.md,
then report what changed. It is not permission to code — no matter how many
rounds of questions have gone by, how obvious the work looks, or whether the
model or the session changed in between. Plan-only holds until the user says
"implement" / "go" / "you can code now". On that release, restate the scope in
one line and wait for the nod before the first edit. Then follow
`new-prototype-page` (and the other skills named in the plan).

## Step 4 — Close

Print exactly three things:

- the `PLAN.md` path,
- a one-line handoff summary (what the executing agent will build, and the first
  step it starts from),
- the fresh-session recommendation, last, verbatim: "PLAN.md complete — open a
  new session and say implement; this one is heavily consumed."

No recap of the plan's contents — the file holds them.
