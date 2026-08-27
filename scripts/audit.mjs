#!/usr/bin/env node
/**
 * Checks the prototype against the wireframe UI and registry rules.
 * Usage: node scripts/audit.mjs
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const SKIP_DIRS = new Set(['node_modules', '.git', '.cursor', 'scripts']);

const problems = [];

function fail(file, line, message) {
  problems.push({ file, line, message });
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const files = walk(ROOT);
const htmlFiles = files.filter((f) => extname(f) === '.html');
const cssFiles = files.filter((f) => extname(f) === '.css');
const jsFiles = files.filter((f) => extname(f) === '.js');

/* ---------------------------------------------------------------- Colour */

// Negative lookbehind skips HTML numeric entities such as &#8594;
const HEX = /(?<!&)#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
const COLOUR_FN = /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\s*\(/g;

function isGrey(hex) {
  const body = hex.slice(1);
  const full = body.length <= 4
    ? body.split('').map((c) => c + c).join('')
    : body;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
  return r === g && g === b;
}

for (const file of [...cssFiles, ...htmlFiles, ...jsFiles]) {
  const text = readFileSync(file, 'utf8');
  text.split('\n').forEach((line, i) => {
    for (const hex of line.match(HEX) || []) {
      if (!isGrey(hex)) fail(file, i + 1, `Non-grey colour ${hex}`);
    }
    for (const fn of line.match(COLOUR_FN) || []) {
      // rect(0 0 0 0) style clip values are not colours; only flag colour functions
      fail(file, i + 1, `Colour function ${fn.trim()} — use a greyscale token instead`);
    }
  });
}

/* -------------------------------------------------- Square corners, shadow */

for (const file of [...cssFiles, ...htmlFiles]) {
  const text = readFileSync(file, 'utf8');
  text.split('\n').forEach((line, i) => {
    const radius = line.match(/border-radius\s*:\s*([^;]+)/);
    if (radius && !/^0\b/.test(radius[1].trim())) {
      fail(file, i + 1, `Non-zero border-radius: ${radius[1].trim()}`);
    }
    if (/box-shadow\s*:\s*(?!none)/.test(line)) {
      fail(file, i + 1, 'box-shadow — use a 1px border instead');
    }
  });
}

/* ------------------------------------------------------------- Type scale */

const cssText = cssFiles.map((f) => readFileSync(f, 'utf8')).join('\n');
const typeScaleBlock = cssText.slice(
  cssText.indexOf('3. Type scale'),
  cssText.indexOf('4. Layout primitives')
);
const scaleSizes = new Set((typeScaleBlock.match(/font-size:\s*(\d+)px/g) || [])
  .map((m) => m.match(/(\d+)px/)[1]));

for (const file of cssFiles) {
  const text = readFileSync(file, 'utf8');
  const start = text.indexOf('4. Layout primitives');
  if (start < 0) continue;
  text.slice(start).split('\n').forEach((line, i) => {
    const size = line.match(/font-size:\s*(\d+)px/);
    if (size && !scaleSizes.has(size[1])) {
      fail(file, i + 1, `font-size ${size[1]}px is outside the shared type scale`);
    }
  });
}

for (const file of htmlFiles) {
  const text = readFileSync(file, 'utf8');
  text.split('\n').forEach((line, i) => {
    if (/style="[^"]*font-size/.test(line)) {
      fail(file, i + 1, 'Inline font-size — use a type scale class');
    }
  });
}

/* ------------------------------------------------------------- Registries */

const registryText = readFileSync(join(ROOT, 'assets/js/site-registry.js'), 'utf8');
const componentsText = readFileSync(join(ROOT, 'assets/js/components.js'), 'utf8');

const defined = [...componentsText.matchAll(/^\s{2}C\.(\w+)\s*=\s*function/gm)].map((m) => m[1]);
const registered = [...registryText.matchAll(/^\s{6}id:\s*'(\w+)'/gm)].map((m) => m[1]);
const HELPERS = new Set(['render', 'mount']);

for (const name of defined) {
  if (!HELPERS.has(name) && !registered.includes(name)) {
    fail('assets/js/site-registry.js', 0, `Component "${name}" is not in COMPONENT_REGISTRY`);
  }
}
for (const name of registered) {
  if (!defined.includes(name)) {
    fail('assets/js/components.js', 0, `Registry entry "${name}" has no component function`);
  }
}

/* Every built HTML page must be registered with status 'built' */
const builtPaths = [...registryText.matchAll(/path:\s*'([^']+)'[^}]*?status:\s*'built'/g)].map((m) => m[1]);

for (const file of htmlFiles) {
  const rel = relative(ROOT, file);
  const path = rel === 'index.html' ? '/' : '/' + rel.replace(/index\.html$/, '');
  if (!builtPaths.includes(path)) {
    fail(rel, 0, `Page "${path}" is not registered as built in PAGE_REGISTRY`);
  }
}

/* Hidden routes must not appear in shared navigation data */
const chromeBlock = registryText.slice(
  registryText.indexOf('var SITE_CHROME'),
  registryText.indexOf('Component registry')
);
for (const hidden of ['/sitemap/', '/components/']) {
  if (chromeBlock.includes(hidden)) {
    fail('assets/js/site-registry.js', 0, `Hidden route ${hidden} is linked from public navigation`);
  }
}

/* ------------------------------------------------- Branch handoff freshness */

/* Each entry is skipped when the branch has not adopted that note yet. */
const HANDOFF_CHECKS = [
  { note: 'BRANCH_STATUS.md', script: 'scripts/sync-branch-status.mjs' },
  { note: 'INTEGRATION_HANDOFF.md', script: 'scripts/sync-integration-handoff-history.mjs' }
];

for (const { note, script } of HANDOFF_CHECKS) {
  if (!existsSync(join(ROOT, note)) || !existsSync(join(ROOT, script))) continue;
  try {
    execFileSync(process.execPath, [join(ROOT, script), '--check'], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
  } catch (error) {
    const detail = String(error.stderr || error.stdout || error.message || 'freshness check failed')
      .trim()
      .replace(/\s+/g, ' ');
    fail(note, 0, detail);
  }
}

/* ---------------------------------------------------------------- Report */

if (problems.length === 0) {
  console.log('Audit passed. No issues found.');
  process.exit(0);
}

console.log(`Audit found ${problems.length} issue(s):\n`);
for (const p of problems) {
  const where = typeof p.file === 'string' && p.file.startsWith('/') ? relative(ROOT, p.file) : p.file;
  console.log(`  ${where}${p.line ? ':' + p.line : ''} — ${p.message}`);
}
process.exit(1);
