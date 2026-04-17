# Chapter 3: Plugins, HTML Shells, and Environment Modes

This chapter moves from loaders to plugins and environment-specific build behavior. It keeps the app small while showing where webpack plugins fit into the build lifecycle.

## What The Chapter Teaches

The main tools here are plugins and environment configuration:

- `HtmlWebpackPlugin` generates the HTML shell.
- `CopyWebpackPlugin` copies static assets.
- `DefinePlugin` or `EnvironmentPlugin` injects environment values.
- Babel plugins extend the Babel step without replacing webpack concerns.

## How The Code Is Organized

- `package.json` adds plugin dependencies and validation scripts.
- `webpack.config.js` wires the plugins together.
- `.env` files provide environment values for different modes.
- `src/` contains the dashboard UI and the code that reads those values.

## Walkthrough

The important change in this chapter is that webpack is now responsible for more build-time behavior than just bundling code. `HtmlWebpackPlugin` creates the page shell instead of requiring a hand-maintained output HTML file. That keeps the HTML aligned with the emitted bundles.

`CopyWebpackPlugin` is the opposite kind of behavior: it takes static files that should not be processed like source code and moves them into the output directory unchanged.

Environment injection is the other major lesson. Values from `.env` files are not read directly by browser code. Instead, webpack replaces references at build time so the app can expose environment-specific behavior without shipping the `.env` file itself.

This chapter also introduces the idea of a Babel plugin. Babel is still focused on source transformation, but the plugin system lets you add targeted code transforms without moving that logic into webpack.

## Main Files To Read

- `chapters/ch03-plugins-env/package.json`
- `chapters/ch03-plugins-env/webpack.config.js`
- `chapters/ch03-plugins-env/src/index.ts`

## What To Notice In Practice

- The HTML shell is generated, not hand-copied.
- Static assets are copied into `dist/` as part of the build.
- Environment values affect the runtime app without exposing the raw `.env` file.

## Chapter Takeaway

Chapter 3 shows where plugins belong: they extend webpack’s build lifecycle, while Babel plugins extend Babel’s syntax transformation step.
