# dev-cli-kit

Developer CLI toolkit — project scaffolding, code generation, and git workflow helpers.

## What this actually does

- **Scaffold projects** from 3 built-in templates (Node/TS, React/Vite, CLI tool)
- **Generate boilerplate** — components, hooks, utilities, API routes
- **Git helpers** — stats overview and merged branch cleanup

## Install

```bash
npm install -g dev-cli-kit
```

## Usage

### Scaffold a project

```bash
# List templates
dev-cli-kit init --list

# Create a Node.js + TypeScript project
dev-cli-kit init --template node-ts --name my-lib

# Create a React + Vite app
dev-cli-kit init --template react-vite --name my-app

# Create a CLI tool
dev-cli-kit init --template cli-tool --name my-cli
```

### Generate code

```bash
# React component
dev-cli-kit generate component UserProfile

# React hook
dev-cli-kit generate hook useAuth

# Utility file
dev-cli-kit generate util formatDate

# Next.js API route
dev-cli-kit generate api users
```

### Git helpers

```bash
# Repository stats (branch, changed files, recent commits)
dev-cli-kit git stats

# List merged branches ready for cleanup
dev-cli-kit git clean
```

## Built-in Templates

| Template | Description |
|----------|-------------|
| `node-ts` | Node.js library with TypeScript, Vitest, tsx |
| `react-vite` | React SPA with Vite, TypeScript |
| `cli-tool` | CLI tool with Commander, Chalk |

## Requirements

- Node.js >= 18
- Git (for `git` commands)

## License

MIT

---

Built with [Commander](https://github.com/tj/commander.js), [Chalk](https://github.com/chalk/chalk), and [Ora](https://github.com/sindresorhus/ora).
