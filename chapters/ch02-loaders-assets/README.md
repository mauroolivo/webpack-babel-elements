# Chapter 2: Loaders, Styles, and Asset Modules

Status: implemented

Related guide: [LEARNING_PATH](../../LEARNING_PATH.md)

Related prompt: [WB 02 Loaders And Assets](../../.github/prompts/wb-ch02-loaders-assets.prompt.md)

## Goal

Build a small browser project that makes webpack loader behavior easy to see. The page imports CSS, an emitted SVG file, an inlined SVG asset, and a raw text file so each rule leaves a visible trace in either the bundle or the output folder.

## What You Build

This chapter renders a simple theme gallery. The UI is just a vehicle for the build pipeline:

- CSS is imported from TypeScript and injected into the page.
- one SVG is emitted into `dist/assets` through `asset/resource`
- one SVG is embedded into the JavaScript bundle through `asset/inline`
- one text file is imported as raw string content through `asset/source`

## Topics Covered

- Babel-based TypeScript transpilation
- webpack loaders
- `style-loader`
- `css-loader`
- asset modules
- emitted versus inlined assets
- source-text imports
- readable build logging

## Project Structure

- `package.json`: build, watch, and type-check scripts
- `webpack.config.js`: Babel loader, CSS loader chain, and asset module rules
- `babel.config.json`: Babel presets for modern JavaScript and TypeScript
- `tsconfig.json`: type-checking configuration
- `index.html`: manual shell that loads the generated bundle
- `src/index.ts`: browser entry point
- `src/renderThemeGallery.ts`: DOM rendering logic
- `src/themeGallery.ts`: gallery data
- `src/styles/*.css`: imported stylesheets
- `src/assets/*`: emitted asset, inline asset, and raw text example
- `src/types/assets.d.ts`: import declarations for CSS and asset files

## Install

Run these commands from this folder:

```bash
npm install
npm run build
```

Optional commands:

```bash
npm run watch
npm run typecheck
```

## Webpack Rule Breakdown

The core of this chapter is the `module.rules` section in `webpack.config.js`.

`babel-loader`

- matches `.ts` files
- runs Babel on TypeScript source files
- returns JavaScript back to webpack for bundling

`style-loader` + `css-loader`

- `css-loader` reads CSS imports and converts them into JavaScript modules
- `style-loader` injects the resulting styles into the page at runtime
- execution is right-to-left, so `css-loader` runs before `style-loader`

`asset/inline`

- used for `*.inline.svg`
- turns the SVG into a data URI string inside the JavaScript bundle
- nothing is emitted as a separate file for that asset

`asset/resource`

- used for other `.svg` files in this chapter
- emits a real file into `dist/assets/`
- returns the public URL string of that emitted file

`asset/source`

- used for `.txt`
- imports the raw file contents as a plain string
- useful for markdown, snippets, or explanatory text assets

## Why The Output Looks Different Per Asset Type

After a build, the same import syntax in TypeScript can produce different results depending on the rule:

- importing `linen-texture.svg` returns a URL to an emitted file
- importing `spark.inline.svg` returns a data URI string
- importing `palette-notes.txt` returns the text content itself

This is the main lesson of the chapter: webpack asset modules change the meaning of an import without changing the TypeScript import shape.

## Logging And Stats

This chapter keeps webpack output readable by reducing module noise and keeping asset information visible. The config uses a restrained `stats` object plus `infrastructureLogging.level = "warn"` so the terminal stays useful while you inspect emitted files.

## Expected Output

After a successful build, you should see:

- `dist/main.js`
- `dist/main.js.map`
- `dist/assets/<hashed-svg-file>.svg`

You should also be able to open `index.html` through a local static server and see the styled gallery.

## Verification Checklist

- `npm run build` succeeds
- `npm run typecheck` succeeds
- styles are visible in the rendered page
- one SVG is emitted into `dist/assets/`
- one SVG is bundled as a data URI
- the text asset appears in the UI as imported source content

## Loader Order To Remember

When multiple loaders are listed in `use`, webpack applies them from right to left.

For this chapter:

1. `css-loader` reads the CSS file and turns it into a JavaScript module.
2. `style-loader` takes that JavaScript representation and injects styles into the document.

That is why the array is written as `['style-loader', 'css-loader']` even though `css-loader` conceptually runs first.

## Key Takeaways

- Babel still handles TypeScript transpilation, just like Chapter 1.
- webpack loaders extend the pipeline beyond JavaScript and TypeScript.
- asset modules replace many older file-loader and raw-loader use cases.
- the same `import` syntax can result in a URL, a data URI, or raw source text depending on the configured rule.
