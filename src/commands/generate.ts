/**
 * `dev generate` — Generate boilerplate code.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import ora from 'ora';
import chalk from 'chalk';

export interface GenerateOptions {
  type: string;
  name: string;
  dir?: string;
  props?: string;
}

const generators: Record<string, (name: string, props: Record<string, string>) => string> = {
  component: (name) => {
    const pascalName = toPascalCase(name);
    return `import React from 'react';

interface ${pascalName}Props {
  className?: string;
}

export function ${pascalName}({ className }: ${pascalName}Props) {
  return (
    <div className={className}>
      <h2>${pascalName}</h2>
    </div>
  );
}

export default ${pascalName};
`;
  },

  hook: (name) => {
    const camelName = toCamelCase(name);
    const pascalName = toPascalCase(name);
    return `import { useState, useCallback } from 'react';

interface Use${pascalName}Options {
  // Add options here
}

interface Use${pascalName}Return {
  // Add return values here
}

export function use${pascalName}(options: Use${pascalName}Options = {}): Use${pascalName}Return {
  const [state, setState] = useState<unknown>(null);

  const action = useCallback(() => {
    // Implement
  }, []);

  return { action };
}
`;
  },

  util: (name) => {
    const camelName = toCamelCase(name);
    return `/**
 * ${camelName} utility functions.
 */

export function ${camelName}(input: string): string {
  return input;
}

export default ${camelName};
`;
  },

  api: (name) => {
    return `import type { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  res.status(200).json({ message: 'Hello from ${name}!' });
}
`;
  },
};

export async function generateCommand(options: GenerateOptions): Promise<void> {
  const { type, name, dir, props: propsStr } = options;
  const outputDir = dir || 'src';

  const generator = generators[type];
  if (!generator) {
    console.error(chalk.red(`Unknown generator type: "${type}"`));
    console.log(chalk.gray(`Available: ${Object.keys(generators).join(', ')}`));
    process.exit(1);
  }

  const props: Record<string, string> = {};
  if (propsStr) {
    for (const pair of propsStr.split(',')) {
      const [k, v] = pair.split('=');
      if (k && v) props[k.trim()] = v.trim();
    }
  }

  const spinner = ora(`Generating ${chalk.cyan(type)}: ${chalk.cyan(name)}...`).start();

  try {
    const code = generator(name, props);
    const ext = type === 'api' ? '.ts' : type === 'hook' ? '.ts' : '.tsx';
    const fileName = type === 'hook' ? `use${toPascalCase(name)}${ext}` : `${toKebabCase(name)}${ext}`;
    const filePath = join(outputDir, fileName);

    mkdirSync(outputDir, { recursive: true });

    if (existsSync(filePath)) {
      spinner.warn(chalk.yellow(`File already exists: ${filePath}`));
      console.log(chalk.gray('Skipped. Delete the file first or use a different name.'));
      return;
    }

    writeFileSync(filePath, code);
    spinner.succeed(chalk.green(`Created ${filePath}`));
  } catch (err: any) {
    spinner.fail(chalk.red(`Failed: ${err.message}`));
    process.exit(1);
  }
}

// Helpers
function toPascalCase(s: string): string {
  return s
    .split(/[-_\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}

function toCamelCase(s: string): string {
  const pascal = toPascalCase(s);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function toKebabCase(s: string): string {
  return s
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}
