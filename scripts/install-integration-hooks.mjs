import { execFileSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

let root;
try {
  root = git(['rev-parse', '--show-toplevel']);
} catch (error) {
  console.error('Cannot install integration hooks: this command must run inside a Git repository.');
  process.exit(1);
}

const hookPath = resolve(root, '.githooks');
const hookFile = resolve(hookPath, 'pre-push');
if (!existsSync(hookPath) || !statSync(hookPath).isDirectory() || !existsSync(hookFile)) {
  console.error('Cannot install integration hooks: the versioned .githooks/pre-push is missing.');
  process.exit(1);
}

let configuredPath = '';
try {
  configuredPath = git(['config', '--local', '--get', 'core.hooksPath']);
} catch (error) {
  configuredPath = '';
}

if (configuredPath) {
  const configuredAbsolute = resolve(root, configuredPath);
  if (configuredPath !== '.githooks' && configuredAbsolute !== hookPath) {
    console.error(`Refusing to overwrite existing core.hooksPath: ${configuredPath}`);
    console.error('Unset or change it manually only after reviewing the existing hook setup.');
    process.exit(1);
  }

  console.log('Integration hooks already use .githooks.');
  process.exit(0);
}

try {
  execFileSync('git', ['config', '--local', 'core.hooksPath', '.githooks'], { stdio: 'inherit' });
} catch (error) {
  console.error('Could not configure core.hooksPath as .githooks.');
  process.exit(1);
}

console.log('Configured core.hooksPath=.githooks.');
