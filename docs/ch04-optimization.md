# Chapter 4: Production Optimization and Dead Code Removal

This chapter focuses on production output quality. It shows how webpack and Babel work together when the goal is to remove unused code and produce a smaller bundle.

## What The Chapter Teaches

The main concepts are:

- tree shaking
- side effects metadata
- aliasing imports
- minification and compression
- ES module preservation in Babel

## How The Code Is Organized

- `package.json` adds production optimization tooling.
- `babel.config.json` keeps ES modules intact so webpack can perform tree shaking.
- `webpack.config.js` configures aliasing, optimization, and compression.
- `src/` contains the small module graph that demonstrates used and unused exports.

## Walkthrough

This chapter is about what happens when the bundle is optimized for shipping rather than learning. The source code intentionally includes exports that are not all used. Webpack can only remove those unused exports if Babel does not convert ES modules into another module format too early.

That is why the Babel config matters. Preserving ES modules gives webpack the static structure it needs to understand what can be removed safely.

The webpack config then builds on that foundation:

- `resolve.alias` shortens import paths.
- production mode enables minification.
- compression plugins generate compressed assets for deployment.
- side effects metadata helps webpack decide what can be discarded.

The result is a visible difference between the development build and the production build, which is exactly what the chapter is trying to demonstrate.

## Main Files To Read

- `chapters/ch04-optimization/package.json`
- `chapters/ch04-optimization/babel.config.json`
- `chapters/ch04-optimization/webpack.config.js`
- `chapters/ch04-optimization/src/`

## What To Notice In Practice

- Production output is smaller than development output.
- Unused exports disappear when the module graph is preserved correctly.
- The Babel configuration directly affects webpack’s optimization ability.

## Chapter Takeaway

Chapter 4 makes the relationship between Babel and webpack concrete: Babel must preserve the module structure long enough for webpack to optimize it.
