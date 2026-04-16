# Chapter 8: Federation and WebAssembly

Status: planned

Related guide: [LEARNING_PATH](../../LEARNING_PATH.md)

Related prompt: [WB 08 Federation And WASM](../../.github/prompts/wb-ch08-federation-wasm.prompt.md)

- Module Federation
- advanced plugin usage
  Understand two advanced webpack capabilities that both change the runtime loading model: remote modules through federation and binary modules through WebAssembly.
- `remote/webpack.config.js`: remote app config and Module Federation exposure setup
- `host/src/`: host UI, remote loader, and WebAssembly loader
- `remote/src/`: remote widget implementation and standalone preview page

## Planned Deliverables

- host app folder
- remote app folder
- host and remote webpack configs
- Babel config for each app or a shared one

## Implementation Checklist

# Chapter 8: Federation and WebAssembly

Status: implemented
Related guide: [LEARNING_PATH](../../LEARNING_PATH.md)
Related prompt: [WB 08 Federation And WASM](../../.github/prompts/wb-ch08-federation-wasm.prompt.md)

## Goal

Build a composable dashboard where a host application consumes one remote widget and also loads a tiny WebAssembly helper asynchronously.
This chapter focuses on two webpack features that change the runtime loading model:

- remote modules loaded through Module Federation
- binary code loaded as a prebuilt WebAssembly asset

## What You Build

The repository contains two separate apps inside one chapter:

- `host/` is the dashboard that loads a federated widget and a `.wasm` file at runtime
- `remote/` is the widget provider that exposes `./Widget` through `ModuleFederationPlugin`
  Both apps use webpack plus Babel for TypeScript transpilation, and both keep the UI intentionally small so the loading behavior stays visible.

## Topics Covered

- Module Federation
- advanced plugin usage
- remote module loading
- WebAssembly
- async loading
- TypeScript transpilation through Babel

## Project Structure

- `package.json`: scripts for host and remote dev servers, builds, type checking, and config validation
- `babel.config.json`: shared Babel presets for both apps
- `tsconfig.json`: shared typecheck configuration for host and remote source trees
- `host/webpack.config.js`: host app config and Module Federation consumer setup
- `remote/webpack.config.js`: remote app config and Module Federation exposure setup
- `host/src/`: host UI, remote loader, and WebAssembly loader
- `remote/src/`: remote widget implementation and standalone preview page
- `host/src/assets/math.wasm`: tiny prebuilt WebAssembly artifact that exports `add`

## Install And Verify

Run these commands from this folder:

```bash
npm install
npm run config:test
npm run typecheck
npm run build:remote
npm run build:host
```

## Run Order And Ports

The development workflow uses two terminals:

1. Start the remote app first:

```bash
npm run dev:remote
```

2. Start the host app second:

```bash
npm run dev:host
```

Port usage:

- remote app: `http://localhost:8081`
- host app: `http://localhost:8080`
  The host expects `remoteEntry.js` to be available from the remote app on port `8081`.

## How Federation Works Here

The remote webpack config uses `ModuleFederationPlugin` to expose `./Widget` from [remote/src/widget.ts](remote/src/widget.ts).
The host webpack config consumes that remote through this mapping:

```js
remotes: {
	remoteApp: 'remoteApp@http://localhost:8081/remoteEntry.js',
}
```

In the host code, [host/src/loadRemoteWidget.ts](host/src/loadRemoteWidget.ts) dynamically imports `remoteApp/Widget`, which means the widget code is fetched only when the host needs it. That keeps the host bundle smaller and makes the remote dependency explicit.

## How The WebAssembly Helper Works

The host imports [host/src/assets/math.wasm](host/src/assets/math.wasm) as a resource URL, fetches the bytes at runtime, and instantiates the module with `WebAssembly.instantiate`.
The prebuilt module exports one function:

- `add(left, right)`
  The host uses that function in [host/src/index.ts](host/src/index.ts) to prove that the module loaded successfully and executed correctly.

## Runtime Limitations

- The host does not bundle the remote widget at build time; it requires the remote dev server or remote production files to be running and reachable.
- The remote URL is intentionally hardcoded for clarity in the chapter example.
- The WebAssembly artifact is prebuilt and checked in as a binary fixture instead of being compiled from WAT during the build.
- This keeps the example readable, but it also means the chapter teaches loading behavior rather than WASM toolchain compilation.

## Verification Results

These commands were run successfully during implementation:

- `npm run config:test`
- `npm run typecheck`
- `npm run build:remote`
- `npm run build:host`
  The WASM artifact was also instantiated directly in Node and returned `12` for `7 + 5`.

## Key Takeaways

- federation changes how you think about application boundaries
- remote modules are runtime dependencies, not just source imports
- WebAssembly can be loaded as a small isolated artifact without changing the rest of the app
- keeping the example plain makes the webpack behavior easier to observe

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

This is the only chapter where multiple apps are expected. Keep the example small enough that the webpack behavior remains readable.# Chapter 8: Federation and WebAssembly

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
