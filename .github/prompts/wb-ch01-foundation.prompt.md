---
description: "Implement Chapter 1: a first TypeScript project with webpack, Babel, entry/output wiring, ES modules, and source maps"
name: "WB 01 Foundation Build"
argument-hint: "Optional target folder, package manager, or constraints"
agent: "agent"
model: "GPT-5 (copilot)"
---

Implement Chapter 1 from [LEARNING_PATH.md](../../LEARNING_PATH.md).

Default target folder: `chapters/ch01-foundation`

Requirements:

- Build a standalone npm project.
- Use webpack as bundler and Babel as the TypeScript transpiler.
- Cover webpack install, Babel install, webpack config, entry, output, ES modules, and source maps.
- Keep the sample app tiny, for example a status board or metric card rendered to the DOM.
- Use at least 2 TypeScript modules so the bundle graph is visible.

Deliverables:

- `package.json` with `build` and `watch`
- `webpack.config.js`
- Babel config
- `tsconfig.json`
- `src/` files and a minimal HTML shell
- `README.md` that explains what webpack does and what Babel does

Verification:

- install dependencies
- run `npm run build`
- confirm that the output bundle and source map are generated