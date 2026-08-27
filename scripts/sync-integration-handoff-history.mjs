#!/usr/bin/env node
/**
 * Synchronises the Git-derived chronology inside INTEGRATION_HANDOFF.md.
 *
 * Usage:
 *   node scripts/sync-integration-handoff-history.mjs [--ref <ref>]
 *   node scripts/sync-integration-handoff-history.mjs --check [--ref <ref>]
 *
 * Branch-agnostic: the baseline is the merge base with the integration target,
 * so any branch can adopt this without editing the script. Only the
 * marker-bounded generated block is ever changed. The chronology is derived from
 * committed Git history; working-tree changes are excluded so a local experiment
 * cannot be presented as published behaviour. Documentation-only commits are
 * excluded so regenerating cannot create a self-referential loop.
 */

import { chmodSync, readFileSync, renameSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const HANDOFF_PATH = join(ROOT, 'INTEGRATION_HANDOFF.md');
const START = '<!-- INTEGRATION_HISTORY:START -->';
const END = '<!-- INTEGRATION_HISTORY:END -->';
const TARGET_CANDIDATES = ['origin/main', 'main'];
/* Notes and docs are excluded so a documentation commit is never tracked behaviour. */
const PATHS = ['.', ':(exclude)*.md', ':(exclude).githooks/', ':(exclude)scripts/'];

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

function resolveBaseline(refCommit) {
  for (const candidate of TARGET_CANDIDATES) {
    const target = resolveCommit(candidate);
    if (!target) continue;
    const base = git(['merge-base', target, refCommit], true);
    if (base) return base;
  }
  return git(['rev-list', '--max-parents=0', refCommit]).split('\n')[0];
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
  const top = path.split('/')[0];
  return path.includes('/') ? `${top}/` : top;
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
  return [...groups.entries()]
    .map(([label, paths]) => `${label}: ${paths.map(inlineCode).join(', ')}`)
    .join('<br>');
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

function commitsFor(baseline, refCommit) {
  const records = git([
    'log', '--reverse', '--format=%H%x1f%h%x1f%as%x1f%s',
    `${baseline}..${refCommit}`, '--', ...PATHS
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

function generatedBlock(commits, baseline) {
  const latest = commits.at(-1);
  const previous = commits.at(-2);
  const lines = [
    START,
    '### Generated Git chronology',
    '',
    `Tracked behaviour snapshot: ${latest ? inlineCode(latest.sha) : 'none after baseline'}. Documentation-only commits are excluded so regenerating this block cannot create a self-referential commit loop.`,
    `Baseline: ${inlineCode(baseline)} — the merge base with the integration target. Only committed code changes are included; working-tree changes and notes are excluded.`,
    '',
    `Latest behaviour version: ${latest ? `${inlineCode(latest.shortSha)} — ${markdown(latest.subject)}` : 'none after baseline'}.`,
    `Previous behaviour version: ${previous ? `${inlineCode(previous.shortSha)} — ${markdown(previous.subject)}` : 'none'}.`,
    '',
    '### Versions and file deltas',
    '',
    '| Version | Date | Git message | Integration notes and risks | Areas | What changed | Files |',
    '| --- | --- | --- | --- | --- | --- | --- |'
  ];

  if (commits.length === 0) {
    lines.push('| — | — | No tracked behaviour commits after baseline | — | — | — | — |');
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

  const deletions = commits.flatMap((commit) => commit.changes
    .filter((change) => change.kind === 'D')
    .map((change) => ({ shortSha: commit.shortSha, path: change.paths[change.paths.length - 1] })));

  if (deletions.length > 0) {
    lines.push(
      '',
      `**Deletion attention:** ${deletions.map((item) => `${inlineCode(item.shortSha)} removes ${inlineCode(item.path)}`).join('; ')}. These are historical Git facts, not permission to remove the same files in another branch. A deletion that touches access control, routing, or a stable route requires an explicit decision before it is carried over.`
    );
  }

  lines.push('', END);
  return lines.join('\n');
}

function replaceBlock(document, block) {
  const starts = document.split(START).length - 1;
  const ends = document.split(END).length - 1;
  if (starts !== 1 || ends !== 1) die(`expected exactly one ${START} and one ${END} marker`);
  const startIndex = document.indexOf(START);
  const endIndex = document.indexOf(END, startIndex);
  if (endIndex < startIndex) die('integration-history markers are out of order');
  return document.slice(0, startIndex) + block + document.slice(endIndex + END.length);
}

/* ----------------------------------------------------------------- Execution */

const options = parseArgs(process.argv.slice(2));
const refName = options.ref || 'HEAD';
const refCommit = resolveCommit(refName);
if (!refCommit) die(`could not resolve Git revision ${refName}`);

const baseline = resolveBaseline(refCommit);

let document;
try {
  document = readFileSync(HANDOFF_PATH, 'utf8');
} catch {
  die('INTEGRATION_HANDOFF.md is missing');
}

const expected = replaceBlock(document, generatedBlock(commitsFor(baseline, refCommit), baseline)) +
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
