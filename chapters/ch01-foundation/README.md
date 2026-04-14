# Chapter 1: Zero to First Bundle

Status: implemented

Related guide: [LEARNING_PATH](../../LEARNING_PATH.md)

Related prompt: [WB 01 Foundation Build](../../.github/prompts/wb-ch01-foundation.prompt.md)

## Goal

Build the smallest useful TypeScript project in this course with webpack handling bundling and Babel handling transpilation. The browser app stays small on purpose so the build pipeline is easy to inspect.

## What You Build

This chapter renders a compact status board into the browser. The code is split across several TypeScript modules so webpack has a dependency graph to bundle.

## Topics Covered

- webpack install
- Babel install
- Babel integration
- webpack configuration file
- entry points
- outputs
- TypeScript
- ES modules
- source maps

## Project Structure

- `package.json`: scripts for build, watch, and type checking
- `webpack.config.js`: single entry, single output, Babel loader, source maps
- `babel.config.json`: Babel presets for modern JavaScript and TypeScript
- `tsconfig.json`: TypeScript settings used for editor support and type checking
- `index.html`: minimal shell that loads the generated bundle
- `src/index.ts`: browser entry point
- `src/metrics.ts`: small data module
- `src/formatters.ts`: formatting helpers
- `src/renderStatusBoard.ts`: DOM rendering module

## Install

Run these commands from this folder:

```bash
npm install
npm run build
```

If you want continuous rebuilds while editing:

```bash
npm run watch
```

If you want TypeScript checking without emitting files:

```bash
npm run typecheck
```

## Why Each File Exists

`webpack.config.js`

- Sets the single entry to `src/index.ts`.
- Emits one bundle at `dist/main.js`.
- Uses `babel-loader` for `.ts` files.
- Turns on `source-map` so the browser can map compiled code back to the original TypeScript.

`babel.config.json`

- Uses `@babel/preset-env` for modern JavaScript syntax.
- Uses `@babel/preset-typescript` so Babel can strip TypeScript syntax.
- Leaves ES modules intact with `modules: false`, which is a good default for webpack-based builds.

`tsconfig.json`

- Keeps TypeScript focused on type checking and editor support.
- Uses `module: "ESNext"` so the source stays aligned with bundler-friendly modules.
- Uses `noEmit: true` because Babel, not TypeScript, produces runnable JavaScript in this chapter.

`index.html`

- Is intentionally manual.
- Loads `dist/main.js` directly so Chapter 1 stays focused on bundling and transpiling.
- Leaves HTML generation for Chapter 3, where plugins become the main topic.

## Hands-On Walkthrough

1. Start with `package.json` and add build scripts that call webpack.
2. Add Babel so `.ts` files can be transpiled through `babel-loader`.
3. Create a small module graph with one entry file and a few imported helpers.
4. Point webpack at `src/index.ts` and tell it to emit `dist/main.js`.
5. Turn on source maps with `devtool: "source-map"`.
6. Build the project and inspect both `dist/main.js` and `dist/main.js.map`.
7. Open `index.html` through a local static server and verify the status board renders.

## Webpack vs Babel In This Chapter

Webpack is responsible for:

- starting from the entry file
- following imports across modules
- creating the final bundle
- writing output files into `dist/`
- generating source maps as part of the bundle process

Babel is responsible for:

- understanding TypeScript syntax
- transpiling modern JavaScript syntax according to the chosen preset
- transforming each source module before webpack packs it into the bundle

## Expected Output

After a successful build, you should have:

- `dist/main.js`
- `dist/main.js.map`

The bundle is then loaded by `index.html`.

## Verification Checklist

- `npm run build` completes successfully
- `npm run typecheck` completes successfully
- `dist/main.js` exists
- `dist/main.js.map` exists
- the browser renders the status board from bundled TypeScript modules

## Key Takeaways

- webpack and Babel solve different parts of the toolchain.
- You do not need `tsc` to emit JavaScript when Babel is handling transpilation.
- A small module graph is enough to make entry, output, and source maps concrete.
- Keeping the HTML shell manual here makes the later plugin chapter easier to understand.
