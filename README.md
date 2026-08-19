# Azercell Website Prototype

A wireframe-level HTML prototype of the Azercell website revamp. It stands in for wireframes:
plain HTML, CSS and JavaScript, no build step, no framework, no dependencies.

## Run it

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173/

A local server is required — the pages use absolute paths such as `/assets/css/styles.css`.

## Routes

| Route | What it is |
|---|---|
| `/` | B2C homepage |
| `/components/` | Every component in the library, rendered live. Internal, not linked from the site |
| `/sitemap/` | Full page tree, built vs planned, and the links between pages. Internal, not linked from the site |
| `/planned/?path=…` | Placeholder shown when a link points at a page that is not built yet |

## How it is put together

```
assets/css/styles.css      Design tokens, type scale, layout, all component styles
assets/js/components.js    The component library — one function per block
assets/js/site-registry.js Page registry, component registry, shared header/footer content
assets/js/app.js           Shared interactions (menus, tabs, carousels, filters)
scripts/audit.mjs          Rule checker
```

Pages contain almost no markup. They import the three scripts, describe their content as data,
and mount components.

## The rules this follows

- **No colour.** Black, white and greys only. Images render greyscale. The client should be
  looking at structure and content, not visual design.
- **Everything square.** No rounded corners, no drop shadows. Separation comes from 1px borders.
- **Small type scale.** Nine text styles, defined once in `styles.css`.
- **Three resolutions, always.** Mobile below 768px, tablet 768–1023px, desktop from 1024px.
  Every section is built for all three.
- **Component first.** A block is built as a component and registered before a page uses it.
- **No simulated functionality.** Real interface behaviour only. Anything needing a backend —
  buying, activating, signing in — links out to the real destination or shows the real USSD code.

The full versions live in `.cursor/rules/`. Two skills in `.cursor/skills/` cover building a new
page and auditing it.

## Check your work

```bash
node scripts/audit.mjs
```

Flags colour, rounded corners, shadows, off-scale font sizes, unregistered components and
unregistered pages. Then check the page in a browser at roughly 375px, 834px and 1440px.

## Source documents

The markdown files in the project root are the sitemap, content database and functionality
backlog. Nothing from them gets built without asking first.
