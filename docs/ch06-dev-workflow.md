# Chapter 6: Structured Config and Hot Reloading

This chapter is about keeping a webpack setup maintainable as it grows. It splits the config into layers and adds a fast development loop.

## What The Chapter Teaches

The main ideas are:

- config splitting with shared, dev, and prod layers
- Hot Module Replacement
- source map choices for different environments
- config validation

## How The Code Is Organized

- `package.json` defines `dev`, `build`, `config:test`, and `typecheck` scripts.
- `webpack.common.js` holds the shared setup.
- `webpack.dev.js` adds dev-server and HMR behavior.
- `webpack.prod.js` handles production output details.
- `src/` contains the live notes playground modules.

## Walkthrough

The central lesson is that not every webpack setting belongs in one file. Shared behavior goes in the common config, development-only behavior stays in the development config, and production-only behavior stays in the production config.

That separation matters because it keeps each file focused. It also makes it easier to reason about what changes affect the local dev loop versus what changes affect the shipped build.

The dev server adds Hot Module Replacement so small code edits can update without a full reload. The source map strategy is also environment-specific: development prefers speed, while production prefers a safer output map.

Config validation is part of the lesson too. Running webpack’s config test helps catch mistakes before they show up in the browser.

## Main Files To Read

- `chapters/ch06-dev-workflow/package.json`
- `chapters/ch06-dev-workflow/webpack.common.js`
- `chapters/ch06-dev-workflow/webpack.dev.js`
- `chapters/ch06-dev-workflow/webpack.prod.js`

## What To Notice In Practice

- The config split reduces branching inside a single file.
- HMR improves iteration speed.
- Source map choices are tuned to the environment.

## Chapter Takeaway

Chapter 6 shows that build configuration is code architecture too. Separating concerns in webpack config makes the project easier to extend and easier to debug.
