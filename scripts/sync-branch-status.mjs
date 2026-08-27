#!/usr/bin/env node
/**
 * Synchronises the Git-derived branch facts inside BRANCH_STATUS.md.
 *
 * Usage:
 *   node scripts/sync-branch-status.mjs [--fetch]
 *   node scripts/sync-branch-status.mjs --check
 *
 * Only the marker-bounded generated block is ever changed. Facts come from
 * local refs so the result is deterministic and works offline; --fetch refreshes
 * remote knowledge first. Working-tree changes are never included, so an
 * unpublished local experiment cannot appear as branch truth.
 */

import { chmodSync, readFileSync, renameSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const STATUS_PATH = join(ROOT, 'BRANCH_STATUS.md');
const START = '<!-- BRANCH_FACTS:START -->';
const END = '<!-- BRANCH_FACTS:END -->';
const REMOTE = 'origin';
const TARGET = 'main';
const MAX_FILES_LISTED = 40;

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
  const result = { check: false, fetch: false };
  for (const arg of argv) {
    if (arg === '--check' && !result.check) { result.check = true; continue; }
    if (arg === '--fetch' && !result.fetch) { result.fetch = true; continue; }
    die(`unknown or duplicate argument ${arg}`);
  }
  if (result.check && result.fetch) die('--check cannot be combined with --fetch');
  return result;
}

function resolveCommit(ref) {
  return git(['rev-parse', '--verify', '--quiet', `${ref}^{commit}`], true);
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

function area(path) {
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
    const path = paths[paths.length - 1];
    const displayPath = (kind === 'R' || kind === 'C') && paths.length === 2
      ? `${paths[0]} → ${paths[1]}`
      : path;
    return { kind, path, displayPath };
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
    ? 'No file delta'
    : [...counts.entries()].map(([label, count]) => `${count} ${label}`).join(', ');
}

function fileList(changes) {
  const shown = changes.slice(0, MAX_FILES_LISTED);
  const groups = new Map();
  for (const change of shown) {
    const label = changeLabel(change.kind);
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(change.displayPath);
  }
  const rendered = [...groups.entries()]
    .map(([label, paths]) => `${label}: ${paths.map(inlineCode).join(', ')}`)
    .join('<br>');
  const hidden = changes.length - shown.length;
  return (rendered || '—') + (hidden > 0 ? `<br>…and ${hidden} more file(s)` : '');
}

/* --------------------------------------------------------- Branch collection */

function remoteBranches() {
  const refs = git(['for-each-ref', '--format=%(refname:short)', `refs/remotes/${REMOTE}`]);
  if (!refs) return [];
  return refs.split('\n')
    .filter(Boolean)
    .filter((ref) => ref !== REMOTE && ref !== `${REMOTE}/HEAD` && ref !== `${REMOTE}/${TARGET}`)
    .sort();
}

function handoffState(ref, tip) {
  const exists = git(['cat-file', '-e', `${ref}:INTEGRATION_HANDOFF.md`], true) !== null;
  if (!exists) return { exists: false, text: 'None' };
  const record = git(['log', '-1', '--format=%h%x1f%as', ref, '--', 'INTEGRATION_HANDOFF.md']);
  const [shortSha, date] = record.split('\x1f');
  const behind = git(['rev-list', '--count', `${shortSha}..${tip}`, '--', '.', ':(exclude)*.md']);
  const stale = Number(behind) > 0;
  return {
    exists: true,
    text: `${inlineCode(shortSha)} (${date})${stale ? ` — **stale by ${behind} code commit(s)**` : ''}`
  };
}

function collect(targetCommit) {
  return remoteBranches().map((ref) => {
    const name = ref.slice(REMOTE.length + 1);
    const tip = resolveCommit(ref);
    const record = git(['log', '-1', '--format=%h%x1f%as%x1f%an%x1f%s', tip]);
    const [shortSha, date, author, subject] = record.split('\x1f');
    const base = git(['merge-base', TARGET, tip]);
    const counts = git(['rev-list', '--left-right', '--count', `${targetCommit}...${tip}`]).split('\t');
    const changes = parseNameStatus(git(['diff', '--name-status', '-M', `${base}..${tip}`]));
    const targetChanged = new Set(
      (git(['diff', '--name-only', `${base}..${targetCommit}`]) || '').split('\n').filter(Boolean)
    );
    return {
      ref,
      name,
      tip,
      shortSha,
      date,
      author,
      subject,
      base,
      behind: Number(counts[0]),
      ahead: Number(counts[1]),
      merged: git(['merge-base', '--is-ancestor', tip, targetCommit], true) !== null,
      changes,
      movedOnTarget: changes.filter((change) => targetChanged.has(change.path)).map((change) => change.path),
      handoff: handoffState(ref, tip)
    };
  });
}

/* ------------------------------------------------------------ Block rendering */

function branchTable(branches) {
  const lines = [
    `| Branch | Last commit | Date | Author | Ahead of \`${TARGET}\` | Behind \`${TARGET}\` | In \`${TARGET}\` | Handoff note | Areas touched |`,
    '| --- | --- | --- | --- | --- | --- | --- | --- | --- |'
  ];
  if (branches.length === 0) {
    lines.push(`| — | — | — | — | — | — | — | — | No branches on \`${REMOTE}\` besides \`${TARGET}\` |`);
    return lines;
  }
  for (const branch of branches) {
    const areas = [...new Set(branch.changes.map((change) => area(change.path)))].sort();
    lines.push([
      `| ${inlineCode(branch.name)}`,
      inlineCode(branch.shortSha),
      branch.date,
      markdown(branch.author),
      String(branch.ahead),
      String(branch.behind),
      branch.merged ? 'Yes' : 'No',
      branch.handoff.text,
      areas.length ? areas.map(inlineCode).join(', ') : '—'
    ].join(' | ') + ' |');
  }
  return lines;
}

function deltaTable(branches) {
  const lines = [
    '| Branch | Last subject | Fork point | What changed | Files |',
    '| --- | --- | --- | --- | --- |'
  ];
  if (branches.length === 0) {
    lines.push('| — | — | — | — | — |');
    return lines;
  }
  for (const branch of branches) {
    lines.push([
      `| ${inlineCode(branch.name)}`,
      markdown(branch.subject),
      inlineCode(branch.base.slice(0, 7)),
      markdown(summary(branch.changes)),
      fileList(branch.changes)
    ].join(' | ') + ' |');
  }
  return lines;
}

function conflictTable(branches) {
  const owners = new Map();
  for (const branch of branches.filter((item) => !item.merged)) {
    for (const change of branch.changes) {
      if (!owners.has(change.path)) owners.set(change.path, { branches: [], movedOnTarget: false });
      const entry = owners.get(change.path);
      entry.branches.push(branch.name);
      if (branch.movedOnTarget.includes(change.path)) entry.movedOnTarget = true;
    }
  }
  const watchlist = [...owners.entries()]
    .filter(([, entry]) => entry.branches.length > 1 || entry.movedOnTarget)
    .sort((a, b) => b[1].branches.length - a[1].branches.length || a[0].localeCompare(b[0]));

  const lines = [
    '| File | Unmerged branches touching it | Also changed on `main` since the fork |',
    '| --- | --- | --- |'
  ];
  if (watchlist.length === 0) {
    lines.push('| — | No file is contested between unmerged branches | — |');
    return lines;
  }
  for (const [path, entry] of watchlist) {
    lines.push(`| ${inlineCode(path)} | ${entry.branches.map(inlineCode).join(', ')} | ${entry.movedOnTarget ? 'Yes' : 'No'} |`);
  }
  return lines;
}

function generatedBlock(branches, targetCommit) {
  const missingHandoff = branches.filter((branch) => !branch.merged && !branch.handoff.exists);
  const lines = [
    START,
    '### Generated branch facts',
    '',
    `Integration target: \`${TARGET}\` at ${inlineCode(targetCommit)}.`,
    `Generated from local Git refs under \`refs/remotes/${REMOTE}\`. Run \`node scripts/sync-branch-status.mjs --fetch\` to pull the latest remote state first. Working-tree changes are never included.`,
    '',
    '### Branches',
    '',
    ...branchTable(branches),
    '',
    '### File deltas since each fork point',
    '',
    ...deltaTable(branches),
    '',
    '### Conflict watchlist',
    '',
    'Files below are touched by more than one unmerged branch, or were also changed on the integration target after that branch forked. Merge these by behaviour, never by taking one whole file.',
    '',
    ...conflictTable(branches)
  ];

  if (missingHandoff.length > 0) {
    lines.push(
      '',
      `**Missing handoff notes:** ${missingHandoff.map((branch) => inlineCode(branch.name)).join(', ')} ${missingHandoff.length === 1 ? 'has' : 'have'} no \`INTEGRATION_HANDOFF.md\`. Ask the branch owner to add one from \`INTEGRATION_HANDOFF.template.md\` before integrating that work.`
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
  if (endIndex < startIndex) die('branch-facts markers are out of order');
  return document.slice(0, startIndex) + block + document.slice(endIndex + END.length);
}

/* ----------------------------------------------------------------- Execution */

const options = parseArgs(process.argv.slice(2));

if (options.fetch) {
  console.log(`Fetching ${REMOTE}…`);
  if (git(['fetch', '--prune', REMOTE], true) === null) {
    console.error(`warning: could not fetch ${REMOTE}; using the refs already in this checkout.`);
  }
}

const targetCommit = resolveCommit(`${REMOTE}/${TARGET}`) || resolveCommit(TARGET);
if (!targetCommit) die(`could not resolve ${TARGET} or ${REMOTE}/${TARGET}`);

let document;
try {
  document = readFileSync(STATUS_PATH, 'utf8');
} catch {
  die('BRANCH_STATUS.md is missing');
}

const expected = replaceBlock(document, generatedBlock(collect(targetCommit), targetCommit)) +
  (document.endsWith('\n') ? '' : '\n');

if (options.check) {
  if (document === expected) {
    console.log('Branch status facts are current.');
    process.exit(0);
  }
  console.error('Branch status facts are stale.');
  console.error('Run: node scripts/sync-branch-status.mjs');
  process.exit(1);
}

if (document === expected) {
  console.log('Branch status facts already current.');
  process.exit(0);
}

const mode = statSync(STATUS_PATH).mode;
const tempPath = join(ROOT, `.BRANCH_STATUS.md.${process.pid}.tmp`);
writeFileSync(tempPath, expected, 'utf8');
chmodSync(tempPath, mode);
renameSync(tempPath, STATUS_PATH);
console.log('Updated generated branch facts.');
