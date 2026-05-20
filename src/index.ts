#!/usr/bin/env node

/**
 * dev-cli-kit — Developer CLI toolkit
 *
 * Usage:
 *   dev init [--template node-ts|react-vite|cli-tool] [--name my-project]
 *   dev generate <type> <name>
 *   dev git stats|clean
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init.js';
import { generateCommand } from './commands/generate.js';
import { gitCommand } from './commands/git.js';

const program = new Command();

program
  .name('dev-cli-kit')
  .description('Developer CLI toolkit — project scaffolding, code generation, and git helpers')
  .version('0.2.0');

// ---- init ----
program
  .command('init')
  .description('Scaffold a new project from a template')
  .option('-t, --template <name>', 'Template: node-ts, react-vite, cli-tool', 'node-ts')
  .option('-n, --name <name>', 'Project name', 'my-project')
  .option('-d, --dir <path>', 'Target directory')
  .option('-l, --list', 'List available templates')
  .action(async (options) => {
    await initCommand(options);
  });

// ---- generate ----
program
  .command('generate <type> <name>')
  .description('Generate boilerplate code')
  .option('-d, --dir <path>', 'Output directory', 'src')
  .option('-p, --props <k=v,...>', 'Custom properties')
  .action(async (type, name, options) => {
    await generateCommand({ type, name, ...options });
  });

// ---- git ----
const gitProgram = program
  .command('git <action>')
  .description('Git workflow helpers');

gitProgram
  .command('stats')
  .description('Show git repository statistics')
  .action(async () => {
    await gitCommand({ action: 'stats' });
  });

gitProgram
  .command('clean')
  .description('List merged branches ready for deletion')
  .option('-b, --branch <name>', 'Base branch', 'main')
  .action(async (options) => {
    await gitCommand({ action: 'clean', branch: options.branch });
  });

// ---- help if no args ----
if (process.argv.length <= 2) {
  program.outputHelp();
  process.exit(0);
}

program.parse();
