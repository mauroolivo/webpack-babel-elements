---
description: "Implement Chapter 6: structured webpack configs, dev server, Hot Module Replacement, and source map strategy"
name: "WB 06 Dev Workflow"
argument-hint: "Optional target folder, package manager, or constraints"
agent: "agent"
model: "GPT-5 (copilot)"
---

Implement Chapter 6 from [LEARNING_PATH.md](../../LEARNING_PATH.md).

Default target folder: `chapters/ch06-dev-workflow`

Requirements:

- Build a standalone TypeScript project with webpack and Babel.
- Split configuration into common, development, and production files.
- Use `webpack-merge` for composition.
- Add `webpack-dev-server` with Hot Module Replacement.
- Use different source map strategies for development and production.
- Include a config validation script.

Deliverables:

- `webpack.common.js`, `webpack.dev.js`, and `webpack.prod.js`
- dev server configuration with HMR
- scripts such as `dev`, `build`, and `config:test`
- `README.md` explaining how the config is structured and why

Verification:

- install dependencies
- run the build command
- run the dev server if practical, otherwise document why it was not run