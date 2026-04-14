# Chapter 5: Split Chunks and Lazy Loading

Status: implemented

Related guide: [LEARNING_PATH](../../LEARNING_PATH.md)

Related prompt: [WB 05 Code Splitting](../../.github/prompts/wb-ch05-code-splitting.prompt.md)

## Goal

Build a small two-page analytics console that makes webpack's chunk graph visible. This chapter demonstrates how multiple entry points, shared chunks, vendor chunks, and async chunks all coexist in one build.

## What You Build

This chapter emits two HTML pages and two entry bundles:

- `home.html` with a `home` entry
- `admin.html` with an `admin` entry

Each entry shares local modules with the other page, both entries share a small third-party dependency from `node_modules`, and each page loads a different lazy feature through `import()`.

## Topics Covered

- multiple entry points
- dynamic output naming with `[name]` and `[contenthash]`
- `splitChunks`
- runtime chunk extraction
- vendor chunk extraction
- local shared chunk extraction
- dynamic imports
- webpack magic comments for chunk naming and resource hints

## Project Structure

- `webpack.config.js`: multi-entry setup, hashed output naming, splitChunks, and HTML generation
- `src/template.html`: shared HTML template for both pages
- `src/home.ts`: home entry with a prefetched async chunk
- `src/admin.ts`: admin entry with a preloaded async chunk
- `src/shared/consoleModel.ts`: shared context creation using `nanoid`
- `src/shared/cards.ts`: shared card data for both entries
- `src/shared/renderConsolePage.ts`: shared UI shell
- `src/features/homeInsights.ts`: lazy chunk named `home-insights`
- `src/features/adminAudit.ts`: lazy chunk named `admin-audit`

## Install

Run these commands from this folder:

```bash
npm install
npm run build
npm run build:prod
npm run typecheck
```

## Why HtmlWebpackPlugin Reappears Here

Chapter 5 uses hashed bundle filenames like `js/home.[contenthash].js`. That makes a manual HTML file awkward because the script names change every build. `HtmlWebpackPlugin` solves that by generating `home.html` and `admin.html` with the correct current chunk filenames.

## Chunk Strategy

This build intentionally creates five chunk categories:

- `home` entry chunk
- `admin` entry chunk
- `runtime` chunk shared by both pages
- `vendors` chunk extracted from `node_modules`
- `shared` chunk extracted from local modules used by both entries

On top of that, webpack emits async chunks when the user clicks a page-specific action:

- `home-insights`
- `admin-audit`

## How The Dynamic Imports Work

`home.ts` loads its async feature with:

- `webpackChunkName: "home-insights"`
- `webpackPrefetch: true`

`admin.ts` loads its async feature with:

- `webpackChunkName: "admin-audit"`
- `webpackPreload: true`

That gives the async chunks stable human-readable names while also demonstrating the difference between preload and prefetch hints.

## Expected Output Pattern

After a build, `dist/` should contain files similar to:

- `home.html`
- `admin.html`
- `js/runtime.<hash>.js`
- `js/vendors.<hash>.js`
- `js/shared.<hash>.js`
- `js/home.<hash>.js`
- `js/admin.<hash>.js`
- `js/home-insights.<hash>.js`
- `js/admin-audit.<hash>.js`

The exact hashes change from build to build. The stable part is the chunk naming strategy.

## Verification Checklist

- `npm run build` succeeds
- `npm run build:prod` succeeds
- `npm run typecheck` succeeds
- both HTML pages are generated
- entry, runtime, vendor, and shared chunks are emitted
- the async chunk names follow the magic comments
- clicking the lazy-load buttons fetches and renders the async features

## Key Takeaways

- webpack can emit multiple independent entry bundles from one config
- `splitChunks` is how shared code stops being duplicated across entry bundles
- code splitting and split chunks are related but not identical concepts
- magic comments make async chunks easier to inspect and reason about
