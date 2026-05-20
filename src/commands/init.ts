/**
 * `dev init` — Scaffold a new project from template.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import ora from 'ora';
import chalk from 'chalk';
import { templates, listTemplates } from '../templates.js';

export interface InitOptions {
  template?: string;
  name?: string;
  dir?: string;
  list?: boolean;
}

export async function initCommand(options: InitOptions): Promise<void> {
  // List templates
  if (options.list) {
    console.log(chalk.bold('\nAvailable templates:\n'));
    for (const t of listTemplates()) {
      console.log(`  ${chalk.cyan(t.name.padEnd(14))} ${t.label}`);
      console.log(`  ${' '.repeat(14)} ${chalk.gray(t.description)}\n`);
    }
    return;
  }

  const templateName = options.template || 'node-ts';
  const projectName = options.name || 'my-project';
  const targetDir = join(process.cwd(), options.dir || projectName);

  const template = templates[templateName];
  if (!template) {
    console.error(chalk.red(`Unknown template: "${templateName}"`));
    console.log(chalk.gray('Run `dev init --list` to see available templates.'));
    process.exit(1);
  }

  if (existsSync(targetDir)) {
    console.error(chalk.red(`Directory already exists: ${targetDir}`));
    process.exit(1);
  }

  const spinner = ora(`Scaffolding ${chalk.cyan(projectName)} from ${chalk.cyan(templateName)} template...`).start();

  try {
    for (const [filePath, content] of Object.entries(template.files)) {
      const fullPath = join(targetDir, filePath);
      mkdirSync(join(fullPath, '..'), { recursive: true });
      writeFileSync(fullPath, content.replace(/\{\{name\}\}/g, projectName));
    }

    spinner.succeed(chalk.green(`Project "${projectName}" created!`));
    console.log(`\n  cd ${projectName}`);
    console.log('  npm install');
    console.log('  npm run dev\n');
  } catch (err: any) {
    spinner.fail(chalk.red(`Failed: ${err.message}`));
    process.exit(1);
  }
}
