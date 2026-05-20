/**
 * `dev git` — Git workflow helpers.
 */
import { execSync } from 'node:child_process';
import chalk from 'chalk';
import ora from 'ora';

export interface GitOptions {
  action: string;
  branch?: string;
}

export async function gitCommand(options: GitOptions): Promise<void> {
  switch (options.action) {
    case 'stats':
      return gitStats();
    case 'clean':
      return gitClean(options.branch);
    default:
      console.error(chalk.red(`Unknown git action: "${options.action}"`));
      console.log(chalk.gray('Available: stats, clean'));
      process.exit(1);
  }
}

function gitStats(): void {
  try {
    const branch = execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
    const status = execSync('git status --short', { encoding: 'utf-8' });
    const log = execSync('git log --oneline -5', { encoding: 'utf-8' });

    console.log(chalk.bold(`\nGit Stats — ${chalk.cyan(branch)}\n`));

    const changed = status.split('\n').filter(Boolean).length;
    console.log(`  ${chalk.yellow('Changed files:')} ${changed}`);

    console.log(chalk.bold('\n  Recent commits:\n'));
    for (const line of log.trim().split('\n')) {
      console.log(`  ${chalk.gray(line.slice(0, 7))} ${line.slice(8)}`);
    }

    // Count all branches
    const branches = execSync('git branch', { encoding: 'utf-8' })
      .split('\n')
      .filter(Boolean).length;
    console.log(`\n  ${chalk.blue('Branches:')} ${branches}\n`);
  } catch (err: any) {
    console.error(chalk.red('Not a git repository, or git is not available.'));
  }
}

function gitClean(baseBranch?: string): void {
  const main = baseBranch || 'main';

  try {
    // Get merged branches
    const merged = execSync(`git branch --merged ${main}`, { encoding: 'utf-8' })
      .split('\n')
      .map((b) => b.replace('*', '').trim())
      .filter((b) => b && b !== main);

    if (merged.length === 0) {
      console.log(chalk.gray('No merged branches to clean.'));
      return;
    }

    console.log(chalk.bold('\nMerged branches:\n'));
    for (const b of merged) {
      console.log(`  ${chalk.yellow(b)}`);
    }

    console.log(chalk.gray(`\nRun \`git branch -d ${merged.join(' ')}\` to delete them.\n`));
  } catch (err: any) {
    console.error(chalk.red(`Error: ${err.message}`));
  }
}
