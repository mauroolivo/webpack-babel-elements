---
description: "Implement Chapter 5: multiple entries, dynamic naming, split chunks, dynamic imports, and magic comments"
name: "WB 05 Code Splitting"
argument-hint: "Optional target folder, package manager, or constraints"
agent: "agent"
model: "GPT-5 (copilot)"
---

Implement Chapter 5 from [LEARNING_PATH.md](../../LEARNING_PATH.md).

Default target folder: `chapters/ch05-code-splitting`

Requirements:

- Build a standalone chapter project with more than one entry point.
- Use dynamic output naming with `[name]` and `[contenthash]`.
- Configure `optimization.splitChunks` for shared or vendor code.
- Add at least one lazy module via `import()`.
- Use webpack magic comments for chunk naming and prefetching or preloading.
- Keep the application logic simple so the emitted chunk structure is the main thing to study.

Deliverables:

- webpack config with object entry points and chunk naming strategy
- source code showing both synchronous and asynchronous imports
- `README.md` that explains entry bundles versus async chunks

Verification:

- install dependencies
- run `npm run build`
- confirm that the output contains multiple named bundles and lazy chunks