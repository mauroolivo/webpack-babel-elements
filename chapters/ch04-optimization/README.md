# Chapter 4: Production Optimization and Dead Code Removal

Status: implemented

Related guide: [LEARNING_PATH](../../LEARNING_PATH.md)

Related prompt: [WB 04 Production Optimization](../../.github/prompts/wb-ch04-optimization.prompt.md)

## Goal

Build a small library shelf UI that makes production optimization easy to inspect. The application code stays tiny, while the source modules intentionally contain used exports, unused exports, alias-based imports, and one side-effectful module.

## What You Build

This chapter renders a compact shelf of books into the browser while the build pipeline demonstrates four optimization ideas clearly:

- Babel preserves ES modules so webpack can tree-shake unused exports.
- `package.json` marks only one file as side-effectful.
- webpack aliases replace long relative import paths.
- production builds are minified and also emit a gzip-compressed copy of the bundle.

## Topics Covered

- tree shaking
- side effects
- `sideEffects` in `package.json`
- aliasing with `resolve.alias`
- minification with `TerserPlugin`
- compression with `compression-webpack-plugin`
- ES module preservation in Babel

## Project Structure

- `package.json`: scripts and `sideEffects` declaration
- `webpack.config.js`: aliases, DefinePlugin flags, minification, and compression
- `babel.config.json`: Babel presets with `modules: false`
- `tsconfig.json`: type-checking setup plus path aliases for editor support
- `src/catalog/bookData.ts`: used exports and intentionally unused exports
- `src/catalog/readingModes.ts`: alias-imported module with more dead-code candidates
- `src/analytics/registerShelfTheme.ts`: deliberate side-effect module
- `src/ui/renderShelf.ts`: DOM rendering using aliased imports
- `src/index.ts`: entry point that pulls the optimized graph together

## Install

Run these commands from this folder:

```bash
npm install
npm run build
npm run build:prod
npm run typecheck
```

## Why Tree Shaking Works Here

The most important Babel decision is `modules: false` in `babel.config.json`.

That keeps `import` and `export` statements intact so webpack can analyze which exports are actually used. If Babel converted the modules before webpack saw them, dead-code removal would be weaker and less predictable.

This chapter intentionally leaves unused exports in `src/catalog/bookData.ts` and `src/catalog/readingModes.ts`. In development mode they still appear in the unminified bundle. In production mode, webpack and Terser can remove them because the modules remain statically analyzable.

## Why `sideEffects` Matters

The root `package.json` marks only `src/analytics/registerShelfTheme.ts` as side-effectful.

That file mutates the document root by setting dataset values and CSS custom properties. Webpack must preserve that module even if none of its exports are imported directly. Other modules are treated as side-effect free, which makes it safer for webpack to drop unused exports and unused modules during optimization.

## Why Aliases Matter

The webpack config maps:

- `@catalog` -> `src/catalog`
- `@analytics` -> `src/analytics`
- `@ui` -> `src/ui`

This makes imports shorter and easier to scan, especially as the project grows. TypeScript path aliases mirror the same mapping so editor tooling and `tsc --noEmit` stay aligned with webpack.

## Production Output

Production builds do two extra things:

- `TerserPlugin` minifies the JavaScript bundle
- `compression-webpack-plugin` emits `main.js.gz`

That gives you both a smaller primary bundle and a compressed artifact suitable for servers that can serve precompressed assets.

## Verification Checklist

- `npm run build` succeeds
- `npm run build:prod` succeeds
- `npm run typecheck` succeeds
- development bundle contains unused marker strings before optimization
- production bundle removes those unused marker strings
- `dist/main.js.gz` exists after the production build

## Key Takeaways

- tree shaking depends on preserved ES module structure
- side-effect declarations are part of optimization, not just correctness
- aliases improve readability without changing runtime behavior
- minification and compression are separate production concerns that work well together
