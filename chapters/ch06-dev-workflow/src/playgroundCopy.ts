export type WorkflowCard = {
  label: string;
  value: string;
  detail: string;
};

export type NoteItem = {
  id: number;
  title: string;
  detail: string;
  lane: string;
};

export type PlaygroundCopy = {
  title: string;
  summary: string;
  tips: string[];
  cards: WorkflowCard[];
};

export const playgroundCopy: PlaygroundCopy = {
  title: 'Live notes playground',
  summary:
    'This chapter keeps the app small while focusing on the development loop: shared webpack config, environment-specific overrides, fast source maps, and Hot Module Replacement.',
  tips: [
    'Run npm run dev and keep the browser open while editing src/renderNotesPlayground.ts or src/playgroundCopy.ts.',
    'Add a few notes before editing a module so you can see that application state survives a hot update.',
    'Use webpack configtest before debugging strange build behavior in layered config files.',
  ],
  cards: [
    {
      label: 'Common config',
      value: 'entry, loaders, HTML plugin, output path',
      detail: 'Everything shared between environments lives in webpack.common.js so the dev and prod files stay short.',
    },
    {
      label: 'Development config',
      value: 'dev server, HMR, fast source maps',
      detail: 'webpack.dev.js adds only the settings that make local iteration fast.',
    },
    {
      label: 'Production config',
      value: 'content hash, safer source maps',
      detail: 'webpack.prod.js overrides output naming and source maps without carrying dev-only behavior.',
    },
  ],
};

export const seedNotes: NoteItem[] = [
  {
    id: 1,
    title: 'Common layer stays boring',
    detail: 'Keep the shared config stable so the environment-specific files only describe differences.',
    lane: 'config structure',
  },
  {
    id: 2,
    title: 'Fast devtool for local work',
    detail: 'Development uses eval-cheap-module-source-map because rebuild speed matters more than pristine production output.',
    lane: 'source maps',
  },
  {
    id: 3,
    title: 'HMR should preserve note state',
    detail: 'If you add notes and then edit the render module, the notes array should still exist after the hot update.',
    lane: 'hot updates',
  },
];