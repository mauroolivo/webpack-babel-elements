# Chapter 5: Split Chunks and Lazy Loading

This chapter introduces multiple entry points and asynchronous loading. It is the point where the bundle graph becomes more than a single file plus a few loaders.

## What The Chapter Teaches

The core topics are:

- multiple entry points
- dynamic output naming
- split chunks
- dynamic imports
- magic comments

## How The Code Is Organized

- `package.json` keeps the webpack tooling small.
- `webpack.config.js` defines multiple entries and chunk naming rules.
- `src/home.ts` and `src/admin.ts` act as separate entry points.
- `src/features/` holds code that is loaded lazily.

## Walkthrough

This chapter expands the build from one entry to several. Instead of a single app entry, webpack now produces more than one initial bundle. That lets the repo demonstrate how separate runtime entry points shape the final output.

`output.filename` and `output.chunkFilename` use names and content hashes so the emitted files stay understandable. The names tell you whether a file is an entry bundle or an async chunk.

`optimization.splitChunks` takes shared code and vendors out of the entry bundles. That makes the shared runtime pieces explicit instead of duplicating them across entries.

Dynamic imports are the other key behavior. A lazy `import()` call creates an async chunk. Magic comments then make the resulting chunk names easier to read and the loading strategy easier to follow.

## Main Files To Read

- `chapters/ch05-code-splitting/package.json`
- `chapters/ch05-code-splitting/webpack.config.js`
- `chapters/ch05-code-splitting/src/home.ts`
- `chapters/ch05-code-splitting/src/admin.ts`

## What To Notice In Practice

- The build emits multiple entry bundles.
- Shared code moves into split chunks.
- Lazy-loaded modules become separate async files.

## Chapter Takeaway

Chapter 5 shows how webpack models runtime boundaries. Entry points, shared chunks, and async imports all become visible in the build output.
