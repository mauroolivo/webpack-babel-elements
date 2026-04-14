---
description: "Implement Chapter 7: Jest, bundle analysis, image optimization, and build diagnostics around webpack+Babel"
name: "WB 07 Quality And Analysis"
argument-hint: "Optional target folder, package manager, or constraints"
agent: "agent"
model: "GPT-5 (copilot)"
---

Implement Chapter 7 from [LEARNING_PATH.md](../../LEARNING_PATH.md).

Default target folder: `chapters/ch07-quality-analysis`

Requirements:

- Build a standalone TypeScript project using webpack and Babel.
- Add Jest with `babel-jest`.
- Write a small set of unit tests for a utility used by the app.
- Add bundle inspection with `webpack-bundle-analyzer`.
- Add image optimization for production builds.
- Keep webpack logging or stats readable and intentional.

Deliverables:

- test configuration and sample tests
- analyze script or equivalent report generation
- webpack config with image optimization and diagnostics choices
- `README.md` explaining how testing and analysis complement the main bundle workflow

Verification:

- install dependencies
- run the test command
- run the build or analyze command most relevant to the implementation