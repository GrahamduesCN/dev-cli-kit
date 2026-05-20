/**
 * Built-in project templates for `dev init`.
 */
import type { ProjectTemplate } from './types.js';

export const templates: Record<string, ProjectTemplate> = {
  'node-ts': {
    name: 'node-ts',
    label: 'Node.js + TypeScript',
    description: 'Node.js library with TypeScript, Vitest, and tsx',
    files: {
      'package.json': JSON.stringify(
        {
          name: '{{name}}',
          version: '0.1.0',
          type: 'module',
          scripts: {
            dev: 'tsx src/index.ts',
            build: 'tsc',
            test: 'vitest run',
          },
        },
        null,
        2
      ),
      'tsconfig.json': JSON.stringify(
        {
          compilerOptions: {
            target: 'ES2022',
            module: 'ESNext',
            moduleResolution: 'bundler',
            outDir: './dist',
            rootDir: './src',
            strict: true,
            esModuleInterop: true,
            skipLibCheck: true,
          },
          include: ['src/**/*'],
          exclude: ['node_modules', 'dist'],
        },
        null,
        2
      ),
      'src/index.ts': `export function hello(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(hello('world'));
`,
      '.gitignore': `node_modules/
dist/
.env
*.log
`,
      'README.md': `# {{name}}

A TypeScript project.

## Usage

\`\`\`bash
npm install
npm run dev
npm test
\`\`\`
`,
    },
  },

  'react-vite': {
    name: 'react-vite',
    label: 'React + Vite + TypeScript',
    description: 'React SPA with Vite, TypeScript, and Vitest',
    files: {
      'package.json': JSON.stringify(
        {
          name: '{{name}}',
          version: '0.1.0',
          type: 'module',
          scripts: {
            dev: 'vite',
            build: 'tsc && vite build',
            preview: 'vite preview',
            test: 'vitest run',
          },
          dependencies: {
            react: '^18.0.0',
            'react-dom': '^18.0.0',
          },
          devDependencies: {
            '@vitejs/plugin-react': '^4.0.0',
            typescript: '^5.4.0',
            vite: '^5.0.0',
            vitest: '^1.0.0',
            '@types/react': '^18.0.0',
            '@types/react-dom': '^18.0.0',
          },
        },
        null,
        2
      ),
      'tsconfig.json': JSON.stringify(
        {
          compilerOptions: {
            target: 'ES2022',
            lib: ['ES2022', 'DOM', 'DOM.Iterable'],
            module: 'ESNext',
            moduleResolution: 'bundler',
            jsx: 'react-jsx',
            strict: true,
            esModuleInterop: true,
            skipLibCheck: true,
            noEmit: true,
          },
          include: ['src'],
        },
        null,
        2
      ),
      'vite.config.ts': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`,
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{name}}</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
`,
      'src/main.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,
      'src/App.tsx': `export default function App() {
  return <h1>{{name}}</h1>;
}
`,
      '.gitignore': `node_modules/
dist/
.env
*.log
`,
      'README.md': `# {{name}}

React + Vite + TypeScript project.

\`\`\`bash
npm install
npm run dev
\`\`\`
`,
    },
  },

  'cli-tool': {
    name: 'cli-tool',
    label: 'CLI Tool',
    description: 'Node.js CLI tool with Commander, Chalk, and Ora',
    files: {
      'package.json': JSON.stringify(
        {
          name: '{{name}}',
          version: '0.1.0',
          type: 'module',
          bin: {
            '{{name}}': './dist/index.js',
          },
          scripts: {
            dev: 'tsx src/index.ts',
            build: 'tsc',
            test: 'vitest run',
          },
          dependencies: {
            commander: '^12.0.0',
            chalk: '^5.3.0',
          },
          devDependencies: {
            typescript: '^5.4.0',
            tsx: '^4.0.0',
            vitest: '^1.0.0',
            '@types/node': '^20.0.0',
          },
        },
        null,
        2
      ),
      'tsconfig.json': JSON.stringify(
        {
          compilerOptions: {
            target: 'ES2022',
            module: 'ESNext',
            moduleResolution: 'bundler',
            outDir: './dist',
            rootDir: './src',
            strict: true,
            esModuleInterop: true,
            skipLibCheck: true,
          },
          include: ['src/**/*'],
          exclude: ['node_modules', 'dist'],
        },
        null,
        2
      ),
      'src/index.ts': `#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command()
  .name('{{name}}')
  .description('A CLI tool')
  .version('0.1.0');

program
  .command('hello')
  .description('Say hello')
  .argument('[name]', 'Name to greet', 'world')
  .action((name: string) => {
    console.log(chalk.green(\`Hello, \${name}!\`));
  });

program.parse();
`,
      '.gitignore': `node_modules/
dist/
*.log
`,
      'README.md': `# {{name}}

A CLI tool.

\`\`\`bash
npm install
npm run build
npm link
{{name}} hello
\`\`\`
`,
    },
  },
};

export function listTemplates(): { name: string; label: string; description: string }[] {
  return Object.values(templates).map((t) => ({
    name: t.name,
    label: t.label,
    description: t.description,
  }));
}
