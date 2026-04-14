# Webpack + Babel Learning Path

This workspace is an 8-chapter series of standalone TypeScript mini projects. Each chapter is designed to teach one slice of the webpack + Babel toolchain through a small, build-focused example. The application code should stay intentionally small; the real subject is bundling, transpiling, output structure, and diagnostics.

## Operating Rules

- Create each chapter under `chapters/chNN-name`.
- Default package manager: `npm`.
- Use webpack for bundling and Babel for transpilation.
- Prefer `babel-loader` with `@babel/preset-typescript` over `ts-loader` so Babel stays central to the course.
- If a chapter needs type checking, keep it separate from transpilation with `tsc --noEmit` or a dedicated plugin.
- Keep every chapter independently runnable and include a local `README.md` explaining what the configuration is teaching.
- Keep the UI plain and small. The tutorial should spend more time on the build pipeline than on app features.

## Coverage Matrix

| Topic                             | Chapter |
| --------------------------------- | ------- |
| webpack install                   | 1       |
| webpack configuration file        | 1       |
| entry points                      | 1, 5    |
| outputs                           | 1, 5    |
| dynamic naming                    | 5       |
| loaders                           | 1, 2    |
| plugins                           | 3, 7, 8 |
| tree shaking                      | 4       |
| aliasing                          | 4       |
| minification and compression      | 4       |
| split chunks                      | 5       |
| environment variables             | 3       |
| code splitting                    | 5       |
| dynamic imports                   | 5       |
| magic comments                    | 5       |
| assets management                 | 2       |
| typescript                        | 1       |
| babel install                     | 1       |
| babel integration                 | 1       |
| babel plugins                     | 3       |
| ES modules                        | 1, 4    |
| side effects                      | 4       |
| jest integration                  | 7       |
| source maps                       | 1, 6    |
| logging                           | 2, 7    |
| webpack bundle analyzer           | 7       |
| webpack configuration structuring | 6       |
| validate configuration            | 3, 6    |
| image optimization                | 7       |
| static assets                     | 3       |
| module federation                 | 8       |
| WebAssembly (WASM)                | 8       |
| Hot Module Replacement            | 6       |

## Prompt Pack

The workspace includes a reusable prompt pack under `.github/prompts`.

- `implement-webpack-babel-chapter.prompt.md`: generic entry point for any chapter
- `wb-ch01-foundation.prompt.md` through `wb-ch08-federation-wasm.prompt.md`: focused chapter prompts

Use these prompts when you want the agent to implement one chapter at a time instead of generating the whole course in one pass.

## Chapter 1: Zero to First Bundle

- Default folder: `chapters/ch01-foundation`
- Mini project: status board
- Core topics: webpack install, Babel install, configuration file, entry, output, TypeScript, ES modules, source maps
- Suggested packages: `webpack`, `webpack-cli`, `babel-loader`, `@babel/core`, `@babel/preset-env`, `@babel/preset-typescript`, `typescript`

Tutorial flow:

1. Initialize a plain npm project and install webpack, Babel, and TypeScript dependencies.
2. Create a tiny TypeScript app with 2-3 ES module files and one browser entry point.
3. Add a Babel config that transpiles modern JavaScript and TypeScript syntax while leaving module bundling to webpack.
4. Add a webpack config with one entry, one output bundle, a clean `dist` folder, and `devtool: "source-map"`.
5. Add `build` and `watch` scripts, run the build, and inspect the generated bundle and source map.
6. Write a README that clearly separates what Babel does from what webpack does.

Definition of done:

- `npm run build` emits a working bundle.
- The browser app runs from a minimal HTML shell.
- Source maps point back to the TypeScript source.

## Chapter 2: Loaders, Styles, and Asset Modules

- Default folder: `chapters/ch02-loaders-assets`
- Mini project: theme gallery
- Core topics: main loaders, CSS handling, asset modules, assets management, basic logging
- Suggested packages: `style-loader`, `css-loader`

Tutorial flow:

1. Start from a fresh standalone chapter, not from Chapter 1 in place.
2. Add stylesheet support with `style-loader` and `css-loader`.
3. Add asset rules for images, SVGs, and raw text so the project demonstrates `asset/resource`, `asset/inline`, and `asset/source`.
4. Create a tiny UI that imports styles and a couple of assets so the generated output is easy to inspect.
5. Configure webpack logging and stats at a readable level, then explain how loader chains are applied.
6. Write a README that shows which files are transformed by Babel and which are transformed by non-Babel loaders.

Definition of done:

- The chapter bundles CSS and assets correctly.
- The emitted `dist` folder makes asset handling visible.
- The README explains loader order and asset module behavior.

## Chapter 3: Plugins, HTML Shells, and Environment Modes

- Default folder: `chapters/ch03-plugins-env`
- Mini project: feature flag dashboard
- Core topics: main plugins, environment variables, static assets, Babel plugins, config validation
- Suggested packages: `html-webpack-plugin`, `copy-webpack-plugin`, `dotenv`, `@babel/plugin-transform-runtime`, `@babel/runtime`

Tutorial flow:

1. Generate the HTML shell with `HtmlWebpackPlugin` instead of managing the final HTML by hand.
2. Copy one static asset such as `robots.txt` or `manifest.webmanifest` into `dist`.
3. Inject environment values into the bundle with `DefinePlugin` or `EnvironmentPlugin`, backed by `.env` files.
4. Add one Babel plugin so the chapter covers Babel plugins without shifting focus away from webpack.
5. Add a `config:test` script using `webpack configtest` and document how configuration validation helps catch mistakes early.
6. Write a README explaining where plugin work happens in the build lifecycle.

Definition of done:

- The final HTML is generated automatically.
- Environment-specific values show up in the running app.
- Static files are copied into the output folder.
- Config validation runs successfully.

## Chapter 4: Production Optimization and Dead Code Removal

- Default folder: `chapters/ch04-optimization`
- Mini project: library shelf
- Core topics: tree shaking, side effects, aliasing, minification, compression, ES module preservation
- Suggested packages: `compression-webpack-plugin`, `terser-webpack-plugin`

Tutorial flow:

1. Create a small module graph with clearly used and unused exports.
2. Preserve ES modules in Babel so webpack can perform tree shaking.
3. Mark package side effects deliberately and show how that changes optimization behavior.
4. Add `resolve.alias` to simplify import paths.
5. Configure production output with minification and gzip or brotli compression.
6. Compare the development build and the optimized production build in the README.

Definition of done:

- The production build is visibly smaller than the development build.
- Unused exports do not survive in the optimized bundle.
- The README explains why Babel configuration affects tree shaking.

## Chapter 5: Split Chunks and Lazy Loading

- Default folder: `chapters/ch05-code-splitting`
- Mini project: multi-page analytics console
- Core topics: multiple entry points, dynamic naming, split chunks, code splitting, dynamic imports, magic comments
- Suggested packages: no major new packages beyond core webpack tooling

Tutorial flow:

1. Create an app with multiple entry points, such as `home` and `admin`.
2. Use `output.filename` and `output.chunkFilename` patterns that include `[name]` and `[contenthash]`.
3. Configure `optimization.splitChunks` to extract shared code and vendors.
4. Add one lazy module loaded via `import()`.
5. Use webpack magic comments for chunk naming and prefetching so the output is easier to reason about.
6. Write a README that explains the difference between entry bundles, shared chunks, and async chunks.

Definition of done:

- The build emits multiple entry bundles plus shared chunks.
- Lazy loading works at runtime.
- Chunk names are readable and tied to the chosen naming strategy.

## Chapter 6: Structured Config and Hot Reloading

- Default folder: `chapters/ch06-dev-workflow`
- Mini project: live notes playground
- Core topics: webpack configuration structuring, HMR, development ergonomics, source map strategy, config validation
- Suggested packages: `webpack-dev-server`, `webpack-merge`

Tutorial flow:

1. Split configuration into `webpack.common.js`, `webpack.dev.js`, and `webpack.prod.js`.
2. Move shared rules and plugins into the common file.
3. Add `webpack-dev-server` with Hot Module Replacement.
4. Use a fast source map setting for development and a safer one for production.
5. Add scripts for `dev`, `build`, and `config:test`.
6. Write a README that teaches how to decide what belongs in each config layer.

Definition of done:

- Running the dev server updates the page without a full reload when possible.
- The config structure is clean enough to extend later.
- The README explains why config splitting improves maintainability.

## Chapter 7: Testing, Analysis, and Asset Optimization

- Default folder: `chapters/ch07-quality-analysis`
- Mini project: media catalog inspector
- Core topics: Jest integration, bundle analyzer, image optimization, build diagnostics, logging
- Suggested packages: `jest`, `babel-jest`, `webpack-bundle-analyzer`, `image-minimizer-webpack-plugin`

Tutorial flow:

1. Add Jest and `babel-jest` so a small shared utility can be tested without changing the main build story.
2. Write a couple of unit tests for a utility used by the app.
3. Add bundle inspection with `webpack-bundle-analyzer` and an `analyze` script.
4. Optimize image assets in production and document any native dependency caveats.
5. Tune webpack logging or stats output so build feedback stays readable.
6. Write a README describing how testing and bundle analysis fit around the main bundling pipeline.

Definition of done:

- Tests pass.
- An analyzer report can be generated.
- Production image handling is measurably better than the unoptimized version.

## Chapter 8: Federation and WebAssembly

- Default folder: `chapters/ch08-federation-wasm`
- Mini project: composable dashboard
- Core topics: Module Federation, WebAssembly, advanced plugin usage, async loading
- Suggested packages: no required third-party plugin for federation because `ModuleFederationPlugin` ships with webpack

Tutorial flow:

1. Create a chapter root that contains a host app and one remote app while sharing dev tooling where practical.
2. Use `ModuleFederationPlugin` to expose a tiny remote widget and consume it from the host.
3. Add a tiny WebAssembly helper and load it asynchronously from TypeScript.
4. Keep Babel responsible for TypeScript transpilation in both host and remote builds.
5. Document how remote loading and async WebAssembly change the bundle graph.
6. Write a README that clearly states the run order, ports, and limitations of the example.

Definition of done:

- The host consumes a remote module successfully.
- A tiny WASM helper loads and runs from the TypeScript app.
- The README explains what changed in webpack to make federation and WASM possible.

## Suggested Execution Order

1. Build Chapters 1 through 3 first so the core webpack and Babel handshake becomes routine.
2. Use Chapters 4 through 6 to understand optimization and developer workflow.
3. Leave Chapters 7 and 8 for when the basics already feel mechanical.

## Practical Constraint

Do not force every chapter to inherit from the previous one. Treat them as parallel mini projects that share a teaching arc, not as one ever-growing codebase. That keeps the build decisions visible and makes it easier to revisit a topic in isolation.
