---
description: "Implement Chapter 4: tree shaking, side effects, aliasing, minification, and compression in a webpack+Babel project"
name: "WB 04 Production Optimization"
argument-hint: "Optional target folder, package manager, or constraints"
agent: "agent"
model: "GPT-5 (copilot)"
---

Implement Chapter 4 from [LEARNING_PATH.md](../../LEARNING_PATH.md).

Default target folder: `chapters/ch04-optimization`

Requirements:

- Build a standalone TypeScript mini project.
- Preserve ES modules in Babel so webpack can tree-shake.
- Demonstrate used versus unused exports with a small module graph.
- Configure side effects deliberately and explain the result.
- Add at least one webpack alias to simplify imports.
- Add production minification and compressed output.

Deliverables:

- webpack config with optimization and compression settings
- Babel config that keeps module output compatible with tree shaking
- source files that make tree shaking visible
- `README.md` comparing development and production behavior

Verification:

- install dependencies
- run `npm run build`
- show that the production bundle is optimized and compressed