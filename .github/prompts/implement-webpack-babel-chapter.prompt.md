---
description: "Implement one chapter from the Webpack+Babel TypeScript learning path as a standalone mini project"
name: "Implement Webpack+Babel Chapter"
argument-hint: "Chapter number or name, plus optional target folder or package manager"
agent: "agent"
model: "GPT-5 (copilot)"
---

Implement exactly one chapter from [LEARNING_PATH.md](../../LEARNING_PATH.md).

Execution rules:

- If the user did not specify a chapter, ask which chapter to build.
- Default to the chapter folder defined in the learning path, unless the user overrides it.
- Create a standalone TypeScript mini project that uses webpack for bundling and Babel for transpilation.
- Keep the example application intentionally small. The build pipeline is the main subject.
- Use Babel for TypeScript transpilation unless the chapter explicitly calls for a comparison.
- Do not modify other chapter folders unless the user explicitly asks.

Required deliverables:

- project folder with source files
- `package.json` with relevant scripts
- webpack configuration
- Babel configuration
- `tsconfig.json`
- chapter-specific assets or fixtures
- local `README.md` that teaches the chapter hands-on

Before finishing:

- install dependencies when needed
- run the most relevant verification command for the chapter
- summarize what was implemented
- point to the next logical chapter

If the requested chapter includes advanced or platform-sensitive tooling, choose the most practical implementation that still demonstrates the webpack concept clearly.