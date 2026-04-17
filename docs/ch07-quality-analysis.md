# Chapter 7: Testing, Analysis, and Asset Optimization

This chapter adds quality tooling around the normal bundling pipeline. The app stays small while the surrounding build steps become more informative.

## What The Chapter Teaches

The focus is on three pieces:

- Jest and `babel-jest` for testing shared utility logic
- webpack bundle analysis for inspecting the output graph
- production SVG optimization for emitted assets

## How The Code Is Organized

- `package.json` defines separate scripts for testing, type checking, building, and analysis.
- `src/catalogMetrics.ts` contains pure utility functions.
- `tests/catalogMetrics.test.ts` validates those utilities.
- `webpack.config.js` wires the analyzer and image optimization into the build.
- `src/renderCatalogInspector.ts` uses `fuse.js` so the bundle report has a meaningful third-party dependency to show.

## Walkthrough

The tests target the pure logic in `catalogMetrics.ts` instead of the DOM rendering layer. That keeps the tests stable and focused on behavior that would matter if the catalog rules change.

The webpack config handles the build diagnostics side. `BundleAnalyzerPlugin` runs only when requested so the normal build stays light. When enabled, it writes a static HTML report and a stats JSON file into `dist/reports/`.

Image optimization is production-only. The chapter uses verbose SVG poster files as source assets so the production build has something measurable to shrink. That makes the asset optimization step visible in the output size without changing how the app imports the images.

The logging and stats settings keep the terminal output readable. You get enough build information to understand what happened, but not so much noise that the output becomes hard to read.

## Main Files To Read

- `chapters/ch07-quality-analysis/package.json`
- `chapters/ch07-quality-analysis/webpack.config.js`
- `chapters/ch07-quality-analysis/src/catalogMetrics.ts`
- `chapters/ch07-quality-analysis/tests/catalogMetrics.test.ts`

## What To Notice In Practice

- Tests verify the shared logic without needing browser rendering.
- The analyzer shows the size cost of `fuse.js`.
- Production SVGs are smaller than the verbose source assets.

## Chapter Takeaway

Chapter 7 shows how testing and analysis fit around the build pipeline. They do not replace webpack; they make webpack output easier to trust and inspect.
