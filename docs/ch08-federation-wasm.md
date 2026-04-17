# Chapter 8: Federation and WebAssembly

This chapter is the most advanced one in the series. It combines a host app, a remote app, module federation, and a tiny WebAssembly fixture.

## What The Chapter Teaches

The main concepts are:

- Module Federation host and remote wiring
- runtime remote module loading
- asynchronous WebAssembly loading
- TypeScript transpilation through Babel in both apps

## How The Code Is Organized

- `package.json` defines separate dev servers and builds for host and remote.
- `host/webpack.config.js` consumes the remote and loads the WASM asset.
- `remote/webpack.config.js` exposes a widget through `remoteEntry.js`.
- `host/src/` contains the dashboard shell, remote loader, and WASM loader.
- `remote/src/` contains the widget implementation and its standalone preview page.

## Walkthrough

The remote app is the provider. Its webpack config uses `ModuleFederationPlugin` to expose `./Widget` and publish `remoteEntry.js`. The widget itself is very small: it creates one DOM node and returns it.

The host app is the consumer. Its webpack config declares a remote mapping that points to the remote server on port 8081. That mapping tells webpack where to find the remote container at runtime.

The host entry file coordinates the demo. It builds the page shell, then it loads two things asynchronously:

- the federated widget through a dynamic import of `remoteApp/Widget`
- the WebAssembly helper by fetching a prebuilt `.wasm` file and instantiating it

The WASM fixture exports one function, `add`, which keeps the example small while still proving that a binary module can be loaded and executed at runtime.

## Main Files To Read

- `chapters/ch08-federation-wasm/package.json`
- `chapters/ch08-federation-wasm/host/webpack.config.js`
- `chapters/ch08-federation-wasm/remote/webpack.config.js`
- `chapters/ch08-federation-wasm/host/src/index.ts`
- `chapters/ch08-federation-wasm/host/src/loadRemoteWidget.ts`
- `chapters/ch08-federation-wasm/host/src/loadWasmMath.ts`
- `chapters/ch08-federation-wasm/remote/src/widget.ts`

## What To Notice In Practice

- The host does not bundle the remote widget ahead of time.
- The remote must be running when the host loads it.
- The WASM file is loaded separately from the JavaScript bundle.

## Chapter Takeaway

Chapter 8 shows two runtime loading models side by side. Federation changes how JavaScript modules are resolved, and WebAssembly adds a binary asset that the app loads explicitly at runtime.
