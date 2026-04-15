# Chapter 7: Testing, Analysis, and Asset Optimization

Status: implemented

Related guide: [LEARNING_PATH](../../LEARNING_PATH.md)

Related prompt: [WB 07 Quality And Analysis](../../.github/prompts/wb-ch07-quality-analysis.prompt.md)

## Goal

Build a small media catalog inspector that keeps the app code modest while adding three quality-focused layers around the normal webpack + Babel pipeline:

- Jest for unit-testing a shared utility
- webpack bundle analysis for post-build inspection
- production-only image optimization for shipped assets

## What You Build

This chapter renders a searchable media catalog with four entries and four imported SVG poster assets. Search uses `fuse.js`, which gives the bundle analyzer a real third-party dependency to surface in the vendor chunk.

The app is deliberately small. The point is not the catalog itself; it is the workflow around it:

- `src/catalogMetrics.ts` contains pure utility logic worth testing
- `tests/catalogMetrics.test.ts` verifies the quality summary and attention ordering
- `webpack.config.js` adds analyzer and SVG optimization behavior without changing the authoring model
- the build output stays readable through a constrained stats configuration

## Topics Covered

- Jest integration with `babel-jest`
- webpack bundle analysis with `webpack-bundle-analyzer`
- SVG optimization with `image-minimizer-webpack-plugin` and SVGO
- readable webpack logging and stats output
- separating runtime, application, and vendor chunks for easier inspection

## Project Structure

- `package.json`: local scripts for testing, type checking, build, and analysis
- `webpack.config.js`: single config with production-only optimization and optional analyzer mode
- `babel.config.json`: Babel presets for modern JavaScript and TypeScript
- `jest.config.cjs`: test runner setup using `babel-jest`
- `src/catalogMetrics.ts`: shared utility logic used by the UI and by tests
- `src/renderCatalogInspector.ts`: search and render logic for the app
- `src/catalogData.ts`: sample media entries with imported poster assets
- `src/assets/*.svg`: intentionally verbose source posters to make optimization measurable
- `tests/catalogMetrics.test.ts`: unit tests for the shared utility layer

## Install And Verify

Run these commands from this folder:

```bash
npm install
npm test
npm run typecheck
npm run config:test
npm run build:dev
npm run build
npm run analyze
```

## Scripts

- `npm test`: runs the Jest suite for the shared catalog utility
- `npm run typecheck`: validates the TypeScript source and tests without emitting files
- `npm run config:test`: validates the webpack configuration structure
- `npm run build:dev`: emits a readable development build with unoptimized SVG assets
- `npm run build`: emits the production build with minified JavaScript and optimized SVG assets
- `npm run analyze`: emits the production build and writes a static bundle report to `dist/reports/`

## Why The Testing Setup Stays Narrow

The tests focus on `src/catalogMetrics.ts` instead of trying to test the whole DOM-rendering flow. That keeps Jest useful without letting it take over the chapter.

The tested behaviors are the ones most likely to regress if the catalog rules change:

- summary counts and average score calculation
- empty-state safety
- prioritizing missing previews ahead of low-score entries
- runtime label formatting

## Bundle Analysis Findings

Running `npm run analyze` generated:

- `dist/reports/bundle-report.html`
- `dist/reports/bundle-stats.json`

For the verified production build, webpack emitted three JavaScript chunks:

- vendor chunk: `27.1 KiB` minimized
- main application chunk: `24.1 KiB` minimized
- runtime chunk: `1.77 KiB` minimized

The analyzer stats show that the vendor chunk is mainly justified by `./node_modules/fuse.js/dist/fuse.mjs`, which enters through `src/renderCatalogInspector.ts`. That makes the report useful: you can clearly see the cost of adding client-side fuzzy search instead of treating bundle size as an abstraction.

## SVG Optimization Findings

The source poster SVG files total `9,373` bytes.

The production-emitted optimized SVG files total `6,831` bytes.

That is a reduction of about `27%` with no changes to how the application imports or renders the assets.

This chapter optimizes SVGs with SVGO because it keeps the install story straightforward. If you later expand the setup to optimize JPEG or PNG assets, common implementations such as `sharp` or imagemin-based plugins can introduce native or prebuilt-binary caveats in CI and across developer machines.

## Logging And Diagnostics Choices

This project keeps diagnostics intentionally restrained:

- `infrastructureLogging.level` is set to `warn`
- `stats.preset` is `errors-warnings`
- asset lists, build time, and build timestamp are still shown
- modules and chunk-group noise stay hidden during normal builds
- the analyzer only runs when explicitly requested through `--env analyze=true`

That gives enough feedback to inspect the build without turning every run into a wall of webpack internals.

## Verification Results

These commands were run successfully during implementation:

- `npm test`
- `npm run typecheck`
- `npm run config:test`
- `npm run build:dev`
- `npm run build`
- `npm run analyze`

The Jest suite currently contains four passing tests.

## Key Takeaways

- test pure shared logic before reaching for full application tests
- use the analyzer when a dependency or loader choice changes your bundle shape
- keep expensive asset optimization in production unless you need it during local iteration
- good diagnostics are selective; more output is not automatically more useful
