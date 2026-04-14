# Chapter 6: Structured Config and Hot Reloading

Status: implemented

Related guide: [LEARNING_PATH](../../LEARNING_PATH.md)

Related prompt: [WB 06 Dev Workflow](../../.github/prompts/wb-ch06-dev-workflow.prompt.md)

## Goal

Build a small live notes playground that demonstrates a maintainable webpack setup split across common, development, and production configs. The application stays intentionally small so the focus remains on config structure, source-map strategy, and Hot Module Replacement.

## What You Build

This chapter renders a simple notes playground where you can add notes while the development server is running. The important behavior is not the note content itself; it is the workflow around the page:

- shared config lives in `webpack.common.js`
- development-only settings live in `webpack.dev.js`
- production-only settings live in `webpack.prod.js`
- the app accepts hot updates for the render module and copy module
- development and production expose different source-map strategies

## Topics Covered

- webpack configuration structuring
- `webpack-merge`
- `webpack-dev-server`
- Hot Module Replacement
- development versus production source maps
- configuration validation with `webpack configtest`

## Project Structure

- `package.json`: `dev`, `build`, `config:test`, and `typecheck` scripts
- `webpack.common.js`: shared entry, output path, Babel rule, HTML plugin, and logging
- `webpack.dev.js`: dev server, HMR, and fast source maps
- `webpack.prod.js`: hashed output and production source maps
- `src/template.html`: shared HTML template
- `src/playgroundCopy.ts`: UI copy and seed note data
- `src/renderNotesPlayground.ts`: rendering logic
- `src/index.ts`: bootstraps the app and accepts hot updates
- `src/types/build.d.ts`: compile-time and HMR-related TypeScript declarations

## Install

Run these commands from this folder:

```bash
npm install
npm run build
npm run config:test
npm run typecheck
```

For the development server:

```bash
npm run dev
```

## Why Split The Config

The config split is deliberately conservative:

- `webpack.common.js` holds anything that is true in every environment
- `webpack.dev.js` adds only the pieces needed for fast iteration
- `webpack.prod.js` adds only the pieces needed for final output

This avoids a single config file filled with branches and mode-specific conditionals.

## Source Map Strategy

Development uses `eval-cheap-module-source-map` because rebuild speed matters more than perfect output artifacts.

Production uses `source-map` because it produces standard standalone source maps suitable for post-build debugging without dragging dev-server behavior into the release config.

## How HMR Works Here

The app entry in `src/index.ts` keeps note state in memory and re-renders the page through `renderNotesPlayground`.

When the dev server pushes an update for:

- `src/renderNotesPlayground.ts`, or
- `src/playgroundCopy.ts`

the HMR accept block re-runs `mount()` without forcing a full page reload. That means notes you added locally can survive module edits during development.

## Config Validation

The `config:test` script validates both `webpack.dev.js` and `webpack.prod.js`. That keeps the layered setup honest and helps catch structural mistakes before you start debugging runtime behavior.

## Expected Output

After `npm run build`, `dist/` should contain:

- `index.html`
- `js/main.<contenthash>.js`
- `js/main.<contenthash>.js.map`

When `npm run dev` is running, the dev server should report that HMR is enabled and serve the app on `http://127.0.0.1:8096`.

## Verification Checklist

- `npm run build` succeeds
- `npm run config:test` succeeds
- `npm run typecheck` succeeds
- the dev server starts successfully with HMR enabled
- editing the render or copy module can trigger a hot update without a full reload

## Key Takeaways

- shared config should stay boring and stable
- development and production differences deserve their own files
- HMR is a workflow feature, not just a checkbox in the config
- source-map strategy should be chosen per environment, not once for the whole project
