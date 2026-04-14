---
description: "Implement Chapter 8: Module Federation and WebAssembly in a focused webpack+Babel TypeScript example"
name: "WB 08 Federation And WASM"
argument-hint: "Optional target folder, package manager, or constraints"
agent: "agent"
model: "GPT-5 (copilot)"
---

Implement Chapter 8 from [LEARNING_PATH.md](../../LEARNING_PATH.md).

Default target folder: `chapters/ch08-federation-wasm`

Requirements:

- Build a focused advanced example, even if the chapter contains more than one app.
- Use webpack and Babel for TypeScript handling in every app involved.
- Create a host app and one remote app using `ModuleFederationPlugin`.
- Add a tiny WebAssembly module or prebuilt artifact and load it asynchronously from TypeScript.
- Keep the runtime examples small so the webpack behavior stays understandable.
- Document ports, run order, and known limitations clearly.

Deliverables:

- chapter folder structure that is easy to navigate
- host and remote webpack configs
- a tiny WASM example integrated into the host or remote
- `README.md` explaining federation wiring and async WASM loading

Verification:

- install dependencies
- run the most practical build or startup commands
- confirm that the host consumes the remote and that the WASM helper loads successfully, or explain any limitation explicitly