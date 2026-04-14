export type StatusMetric = {
  label: string;
  value: string;
  detail: string;
};

export const chapterTitle = 'Webpack + Babel foundation';

export const chapterIntro =
  'This mini project keeps the app tiny so you can inspect how webpack bundles modules while Babel transpiles TypeScript.';

export const statusMetrics: StatusMetric[] = [
  {
    label: 'Bundler',
    value: 'webpack',
    detail: 'Builds the dependency graph from the entry file and emits a browser bundle.',
  },
  {
    label: 'Transpiler',
    value: 'babel',
    detail: 'Compiles TypeScript syntax and modern JavaScript features before the code is bundled.',
  },
  {
    label: 'Entry',
    value: 'src/index.ts',
    detail: 'Acts as the starting point for the first bundle in this chapter.',
  },
  {
    label: 'Output',
    value: 'dist/main.js',
    detail: 'Shows the single bundle emitted by the Chapter 1 webpack configuration.',
  },
];