import { describe, it, expect } from 'vitest';
import { templates, listTemplates } from '../src/templates.js';

describe('templates', () => {
  it('has 3 built-in templates', () => {
    const keys = Object.keys(templates);
    expect(keys).toHaveLength(3);
    expect(keys).toContain('node-ts');
    expect(keys).toContain('react-vite');
    expect(keys).toContain('cli-tool');
  });

  it('each template has files', () => {
    for (const [name, tmpl] of Object.entries(templates)) {
      expect(tmpl.files).toBeDefined();
      expect(Object.keys(tmpl.files).length).toBeGreaterThan(0);
    }
  });

  it('node-ts template includes package.json', () => {
    expect(templates['node-ts'].files['package.json']).toBeDefined();
  });

  it('react-vite template includes vite config', () => {
    expect(templates['react-vite'].files['vite.config.ts']).toBeDefined();
  });

  it('cli-tool template includes bin field', () => {
    const pkg = templates['cli-tool'].files['package.json'];
    expect(pkg).toContain('"bin"');
  });
});

describe('listTemplates', () => {
  it('returns 3 templates', () => {
    expect(listTemplates()).toHaveLength(3);
  });

  it('each has name, label, description', () => {
    for (const t of listTemplates()) {
      expect(t.name).toBeTruthy();
      expect(t.label).toBeTruthy();
      expect(t.description).toBeTruthy();
    }
  });
});

describe('generators', () => {
  // Dynamic import not needed — test via integration
  it('generate types exist', async () => {
    const mod = await import('../src/commands/generate.js');
    // module loaded successfully
    expect(mod).toBeDefined();
  });
});
