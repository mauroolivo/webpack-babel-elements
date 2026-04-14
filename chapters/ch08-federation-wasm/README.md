# Chapter 8: Federation and WebAssembly

Status: planned

Related guide: [LEARNING_PATH](../../LEARNING_PATH.md)

Related prompt: [WB 08 Federation And WASM](../../.github/prompts/wb-ch08-federation-wasm.prompt.md)

## Mini Project

Build a composable dashboard where a host application consumes one remote widget and also loads a tiny WebAssembly helper asynchronously.

## Focus Topics

- Module Federation
- advanced plugin usage
- remote module loading
- WebAssembly
- async loading
- TypeScript transpilation through Babel

## Learning Goal

Understand two advanced webpack capabilities that both change the runtime loading model: remote modules through federation and binary modules through WebAssembly.

## Planned Deliverables

- host app folder
- remote app folder
- host and remote webpack configs
- Babel config for each app or a shared one
- `tsconfig.json` setup
- tiny WASM example or prebuilt fixture
- run instructions with ports and order

## Implementation Checklist

1. Initialize the chapter structure in this folder.
2. Create host and remote apps with minimal UI.
3. Configure `ModuleFederationPlugin` to expose and consume a small remote module.
4. Add a tiny WebAssembly module or fixture and load it from TypeScript.
5. Keep Babel responsible for TypeScript transpilation in each app.
6. Add startup and build scripts that make the workflow understandable.
7. Verify remote loading and WASM execution.
8. Expand this README with final run commands, ports, and limitations.

## Verification Targets

- host consumes the remote successfully
- WASM helper loads and runs
- documentation is explicit about startup order and constraints

## Notes

This is the only chapter where multiple apps are expected. Keep the example small enough that the webpack behavior remains readable.
