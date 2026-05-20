/**
 * Shared types for dev-cli-kit.
 */

export interface ProjectTemplate {
  name: string;
  label: string;
  description: string;
  files: Record<string, string>;
}

export interface GenerateOptions {
  type: string;
  name: string;
  dir?: string;
  props?: Record<string, string>;
}
