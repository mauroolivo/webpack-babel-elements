# Chapter 2: Loaders, Styles, and Asset Modules

This chapter extends the basic bundle with loader chains and asset handling. It shows that webpack can process more than JavaScript while still keeping Babel as the TypeScript transpiler.

## What The Chapter Teaches

The focus here is on loaders and asset modules:

- `style-loader` injects CSS into the page.
- `css-loader` resolves CSS imports.
- webpack asset modules emit or inline non-code assets.

## How The Code Is Organized

- `package.json` adds the style-related loader dependencies.
- `webpack.config.js` defines rules for `.ts`, `.css`, `.svg`, and `.txt` files.
- `src/index.ts` assembles the small theme gallery UI.
- `src/` includes imported styles and sample assets so the output is visible.

## Walkthrough

The TypeScript entry still uses Babel for transpilation, but now the app imports CSS and asset files too. That is the main shift in the chapter: webpack is no longer just building JavaScript, it is also transforming non-code resources.

The loader chain for CSS is important. `css-loader` reads the CSS file and turns it into a JavaScript module. `style-loader` takes that module output and injects the stylesheet into the page at runtime. The order matters because loaders run from right to left.

The asset module rules are equally important:

- `asset/resource` emits a file to `dist/`.
- `asset/inline` embeds a file as a data URL.
- `asset/source` imports the raw file contents as text.

That gives the chapter a practical way to show how webpack treats different asset types depending on the rule.

## Main Files To Read

- `chapters/ch02-loaders-assets/package.json`
- `chapters/ch02-loaders-assets/webpack.config.js`
- `chapters/ch02-loaders-assets/src/index.ts`

## What To Notice In Practice

- CSS is bundled through the loader chain rather than copied as a separate file.
- SVG and text assets appear in the output in different forms depending on the rule.
- Babel still only handles the TypeScript source files.

## Chapter Takeaway

Chapter 2 shows that webpack is a general asset pipeline, not just a JavaScript bundler. Babel remains focused on syntax transformation, while loaders handle everything else.
