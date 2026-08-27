#!/usr/bin/env node
/**
 * Synchronises the Git-derived chronology inside INTEGRATION_HANDOFF.md.
 *
 * Usage:
 *   node scripts/sync-integration-handoff-history.mjs [--ref <ref>]
 *   node scripts/sync-integration-handoff-history.mjs --check [--ref <ref>]
 *
 * Only the marker-bounded generated block is ever changed. The chronology is
 * deliberately derived from committed Git history; working-tree changes are
 * excluded so a local experiment cannot be presented as a published version.
 */

import {
  chmodSync,
  readFileSync,
  renameSync,
  statSync,
  writeFileSync
} from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const HANDOFF_PATH = join(ROOT, 'INTEGRATION_HANDOFF.md');
const START = '<!-- INTEGRATION_HISTORY:START -->';
const END = '<!-- INTEGRATION_HISTORY:END -->';
const BASELINE = '42a7855e77705974c11c2fba2e4cfae1854dcf03';
const PATHS = [
  'nav-lab/',
  'tariff-compare-lab/',
  'assets/js/site-registry.js',
  'assets/js/components.js',
  'assets/js/app.js',
  'middleware.js'
];

function die(message) {
  console.error(`error: ${message}`);
  process.exit(2);
}

function git(args, optional = false) {
  try {
    return execFileSync('git', args, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    }).trimEnd();
  } catch (error) {
    if (optional) return null;
    const detail = error.stderr ? String(error.stderr).trim() : '';
    die(`git ${args.join(' ')} failed${detail ? `: ${detail}` : ''}`);
  }
}

function parseArgs(argv) {
  const result = { check: false, ref: null };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--check') {
      if (result.check) die('duplicate --check flag');
      result.check = true;
      continue;
    }
    if (arg === '--ref') {
      if (result.ref !== null) die('duplicate --ref flag');
      const value = argv[index + 1];
      if (!value || value.startsWith('-')) die('--ref requires a Git revision');
      result.ref = value;
      index += 1;
      continue;
    }
    die(`unknown argument ${arg}`);
  }
  return result;
}

function resolveCommit(ref) {
  if (!ref || ref.startsWith('-')) return null;
  return git(['rev-parse', '--verify', '--quiet', `${ref}^{commit}`], true);
}

function defaultRef() {
  const branch = git(['symbolic-ref', '--quiet', '--short', 'HEAD'], true);
  if (branch === 'vlad') return 'HEAD';
  for (const candidate of ['origin/vlad', 'vlad', 'HEAD']) {
    if (resolveCommit(candidate)) return candidate;
  }
  die('could not resolve origin/vlad, vlad, or HEAD');
}

function markdown(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\|/g, '\\|')
    .replace(/[\r\n]+/g, ' ');
}

function inlineCode(value) {
  return `\`${markdown(value)}\``;
}

function areaFor(path) {
  if (path === 'middleware.js') return 'Security / access';
  if (path.startsWith('nav-lab/')) return 'Navigation probe';
  if (path.startsWith('tariff-compare-lab/')) return 'Tariff comparator';
  return 'Shared runtime';
}

function parseNameStatus(output) {
  if (!output) return [];
  return output.split('\n').filter(Boolean).map((line) => {
    const fields = line.split('\t');
    const code = fields.shift();
    const kind = code.charAt(0);
    const paths = fields;
    const displayPath = (kind === 'R' || kind === 'C') && paths.length === 2
      ? `${paths[0]} → ${paths[1]}`
      : paths[paths.length - 1];
    return { code, kind, paths, displayPath };
  });
}

function changeLabel(kind) {
  return ({ A: 'Added', M: 'Changed', T: 'Changed', D: 'Removed', R: 'Renamed', C: 'Copied' })[kind] || 'Other';
}

function summary(changes) {
  const counts = new Map();
  for (const change of changes) {
    const label = changeLabel(change.kind).toLowerCase();
    counts.set(label, (counts.get(label) || 0) + 1);
  }
  return counts.size === 0
    ? 'No matching file delta'
    : [...counts.entries()].map(([label, count]) => `${count} ${label}`).join(', ');
}

function fileList(changes) {
  const groups = new Map();
  for (const change of changes) {
    const label = changeLabel(change.kind);
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(change.displayPath);
  }
  return [...groups.entries()].map(([label, paths]) =>
    `${label}: ${paths.map(inlineCode).join(', ')}`
  ).join('<br>');
}

function areas(changes) {
  return [...new Set(changes.map((change) => areaFor(change.paths[change.paths.length - 1])))].join(', ') || '—';
}

function integrationAnnotations(sha) {
  const body = git(['show', '-s', '--format=%B', sha]);
  const annotations = { notes: [], risks: [] };
  for (const line of body.split('\n')) {
    const match = line.match(/^Integration-(Note|Risk):\s*(.+?)\s*$/);
    if (!match) continue;
    if (match[1] === 'Note') annotations.notes.push(match[2]);
    if (match[1] === 'Risk') annotations.risks.push(match[2]);
  }
  return annotations;
}

function annotationText(annotations) {
  const entries = [
    ...annotations.notes.map((note) => `Note: ${markdown(note)}`),
    ...annotations.risks.map((risk) => `Risk: ${markdown(risk)}`)
  ];
  return entries.length ? entries.join('<br>') : '— (see exact Git message)';
}

function commitsFor(refCommit) {
  const records = git([
    'log', '--reverse', '--format=%H%x1f%h%x1f%as%x1f%s',
    `${BASELINE}..${refCommit}`, '--', ...PATHS
  ]);
  if (!records) return [];
  return records.split('\n').filter(Boolean).map((record) => {
    const [sha, shortSha, date, subject] = record.split('\x1f');
    const names = git([
      'diff-tree', '--no-commit-id', '--name-status', '-r', '--root', sha,
      '--', ...PATHS
    ]);
    return {
      sha,
      shortSha,
      date,
      subject,
      changes: parseNameStatus(names),
      annotations: integrationAnnotations(sha)
    };
  });
}

function generatedBlock(commits) {
  const latest = commits.at(-1);
  const previous = commits.at(-2);
  const lines = [
    START,
    '### Generated Git chronology',
    '',
    `Tracked behavior snapshot: ${latest ? inlineCode(latest.sha) : 'none after baseline'}. Documentation-only commits are excluded so regenerating this block cannot create a self-referential commit loop.`,
    `Baseline: ${inlineCode(BASELINE)}. Only committed changes in the tracked behavior allowlist are included; working-tree changes and handoff/docs files are excluded.`,
    '',
    `Latest behavior version: ${latest ? `${inlineCode(latest.shortSha)} — ${markdown(latest.subject)}` : 'none after baseline'}.`,
    `Previous behavior version: ${previous ? `${inlineCode(previous.shortSha)} — ${markdown(previous.subject)}` : 'none'}.`,
    '',
    '### Versions and file deltas',
    '',
    '| Version | Date | Git message | Integration notes and risks | Areas | What changed | Files |',
    '| --- | --- | --- | --- | --- | --- | --- |'
  ];

  if (commits.length === 0) {
    lines.push('| — | — | No tracked behavior commits after baseline | — | — | — | — |');
  } else {
    for (const commit of commits) {
      lines.push([
        `| ${inlineCode(commit.shortSha)}`,
        commit.date,
        markdown(commit.subject),
        annotationText(commit.annotations),
        markdown(areas(commit.changes)),
        markdown(summary(commit.changes)),
        fileList(commit.changes)
      ].join(' | ') + ' |');
    }
  }

  const middlewareDeletion = commits.find((commit) => commit.changes.some((change) =>
    change.kind === 'D' && change.paths.includes('middleware.js')
  ));
  if (middlewareDeletion) {
    lines.push(
      '',
      `**Security attention:** ${inlineCode(middlewareDeletion.shortSha)} removes ${inlineCode('middleware.js')}. This is a historical Git fact, not permission to remove or weaken authentication in another branch; require an explicit security decision.`
    );
  }

  lines.push('', END);
  return lines.join('\n');
}

function replaceBlock(document, block) {
  const starts = document.split(START).length - 1;
  const ends = document.split(END).length - 1;
  if (starts !== 1 || ends !== 1) {
    die(`expected exactly one ${START} and one ${END} marker`);
  }
  const startIndex = document.indexOf(START);
  const endIndex = document.indexOf(END, startIndex);
  if (endIndex < startIndex) die('integration-history markers are out of order');
  return document.slice(0, startIndex) + block + document.slice(endIndex + END.length);
}

const options = parseArgs(process.argv.slice(2));
const refName = options.ref || defaultRef();
const refCommit = resolveCommit(refName);
if (!refCommit) die(`could not resolve Git revision ${refName}`);
if (!resolveCommit(BASELINE)) die(`baseline ${BASELINE} is not available in this checkout`);

const ancestor = git(['merge-base', '--is-ancestor', BASELINE, refCommit], true);
if (ancestor === null) die(`baseline ${BASELINE} is not an ancestor of ${refName}`);

let document;
try {
  document = readFileSync(HANDOFF_PATH, 'utf8');
} catch {
  die('INTEGRATION_HANDOFF.md is missing');
}

const expected = replaceBlock(document, generatedBlock(commitsFor(refCommit))) +
  (document.endsWith('\n') ? '' : '\n');

if (options.check) {
  if (document === expected) {
    console.log(`Integration handoff chronology is current for ${refName} (${refCommit}).`);
    process.exit(0);
  }
  console.error(`Integration handoff chronology is stale for ${refName} (${refCommit}).`);
  console.error(`Run: node scripts/sync-integration-handoff-history.mjs --ref ${refName}`);
  process.exit(1);
}

if (document === expected) {
  console.log(`Integration handoff chronology already current for ${refName} (${refCommit}).`);
  process.exit(0);
}

const mode = statSync(HANDOFF_PATH).mode;
const tempPath = join(ROOT, `.INTEGRATION_HANDOFF.md.${process.pid}.tmp`);
writeFileSync(tempPath, expected, 'utf8');
chmodSync(tempPath, mode);
renameSync(tempPath, HANDOFF_PATH);
console.log(`Updated generated chronology for ${refName} (${refCommit}).`);
