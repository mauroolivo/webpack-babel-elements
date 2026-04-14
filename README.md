# Webpack + Babel Mini Projects

This repository is a collection of standalone chapter projects about webpack and Babel. Each chapter under `chapters/` is intentionally installable on its own so you can study one topic at a time without inheriting a shared root toolchain.

The full course outline and chapter goals live in [LEARNING_PATH.md](./LEARNING_PATH.md).

## Repository Layout

- `chapters/ch01-foundation` through `chapters/ch08-federation-wasm`: standalone tutorial projects
- `.github/prompts/`: workspace prompt files for implementing or extending chapters one by one
- `LEARNING_PATH.md`: chapter sequence and topic coverage map

## Install A Single Chapter

From the repository root, install dependencies for one chapter with `npm ci --prefix` when that chapter already has a lockfile.

Examples:

```bash
npm ci --prefix chapters/ch01-foundation
npm ci --prefix chapters/ch06-dev-workflow
```

Then run that chapter from the same root context if you want:

```bash
npm run --prefix chapters/ch01-foundation build
npm run --prefix chapters/ch06-dev-workflow dev
```

If a chapter does not yet have a lockfile, run `npm install` once inside that chapter folder and commit the generated lockfile before relying on `npm ci`.

## Why `node_modules` Is Ignored

Each chapter has its own `package.json`, so installed dependencies belong to the chapter folder, not to the repository root. The root [.gitignore](./.gitignore) ignores nested `node_modules/` and `dist/` folders so checked-out source stays clean while every chapter remains reproducible from its own manifest and lockfile.

## Recommended Workflow

1. Pick a chapter folder.
2. Install only that chapter's dependencies.
3. Run its local scripts.
4. Read the chapter-specific README for the tutorial context.

This keeps the repository closer to a set of focused mini projects than to a single monorepo application.
