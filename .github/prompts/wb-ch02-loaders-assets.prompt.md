---
description: "Implement Chapter 2: loaders, CSS, asset modules, and asset handling in a webpack+Babel TypeScript project"
name: "WB 02 Loaders And Assets"
argument-hint: "Optional target folder, package manager, or constraints"
agent: "agent"
model: "GPT-5 (copilot)"
---

Implement Chapter 2 from [LEARNING_PATH.md](../../LEARNING_PATH.md).

Default target folder: `chapters/ch02-loaders-assets`

Requirements:

- Build a fresh standalone chapter project.
- Keep Babel responsible for TypeScript transpilation.
- Add the main non-Babel loaders needed to demonstrate webpack loader chaining.
- Cover `style-loader`, `css-loader`, and webpack asset modules.
- Demonstrate at least one emitted file asset and one inlined or source asset.
- Include a small logging helper or readable webpack stats so asset processing is easy to inspect.

Deliverables:

- standalone project files and config
- one or more CSS files imported from TypeScript
- image, SVG, text, or similar assets wired through webpack rules
- `README.md` that explains loader order and asset module behavior

Verification:

- install dependencies
- run `npm run build`
- confirm that CSS and assets are bundled or emitted as expected