# Chapter 1: Zero to First Bundle

This chapter introduces the smallest possible webpack + Babel + TypeScript pipeline. The code stays simple on purpose so the build steps are easy to see.

## What The Chapter Teaches

The main idea is that Babel transpiles syntax and webpack bundles modules. TypeScript is used for type checking and source authoring, but the actual browser bundle comes from webpack.

## How The Code Is Organized

- `package.json` installs webpack, webpack-cli, Babel, and TypeScript.
- `babel.config.json` tells Babel to handle modern JavaScript and TypeScript syntax while leaving module bundling to webpack.
- `webpack.config.js` defines one entry, one output bundle, and source maps.
- `src/` contains a tiny browser app split across a few ES modules.

## Walkthrough

The entry file bootstraps the page and imports small helper modules. That is the first place to notice webpack’s job: it follows the import graph and turns several source files into one browser bundle.

Babel sits in the middle of the pipeline. The TypeScript files are not compiled by `tsc` into JavaScript for the browser; instead, Babel strips the TypeScript syntax and modern syntax features that need transpilation. Webpack then takes that output and resolves the module graph into the final asset.

The webpack config is deliberately short:

- `entry` points to the browser bootstrap file.
- `output.filename` writes one bundle into `dist/`.
- `output.clean` removes stale build output.
- `devtool: 'source-map'` keeps source mapping visible for the tutorial.

That setup is enough to show the basic handoff between Babel and webpack. Babel transforms code, webpack packages it.

## Main Files To Read

- `chapters/ch01-foundation/package.json`
- `chapters/ch01-foundation/babel.config.json`
- `chapters/ch01-foundation/webpack.config.js`
- `chapters/ch01-foundation/src/index.ts`

## What To Notice In Practice

- The bundle is small because there is only one entry.
- Source maps point back to the TypeScript source files.
- The app can run from a minimal HTML shell because webpack produces the browser-ready script.

## Chapter Takeaway

Chapter 1 is the foundation for everything that follows: Babel handles syntax transformation, webpack handles bundling, and TypeScript adds authoring discipline without changing the bundling model.
