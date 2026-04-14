import type { ConsoleContext } from './consoleModel';

export type ConsoleCard = {
  label: string;
  value: string;
  detail: string;
};

export function createConsoleCards(
  context: ConsoleContext,
  entryName: string,
  asyncChunkName: string,
  lazyHint: string,
): ConsoleCard[] {
  return [
    {
      label: 'Entry bundle',
      value: entryName,
      detail: 'A dedicated initial bundle emitted because webpack starts from an object entry configuration.',
    },
    {
      label: 'Shared chunk',
      value: 'shared',
      detail: 'Local modules imported by both entries are extracted by splitChunks into a reusable shared chunk.',
    },
    {
      label: 'Vendor chunk',
      value: 'vendors',
      detail: 'The nanoid dependency comes from node_modules, so webpack moves it into a vendor chunk.',
    },
    {
      label: 'Lazy chunk',
      value: asyncChunkName,
      detail: lazyHint,
    },
    {
      label: 'Session id',
      value: context.sessionId,
      detail: 'Generated from shared code so both pages import the same vendor-backed helper module.',
    },
    {
      label: 'Generated at',
      value: context.generatedAt,
      detail: context.chunkStrategy,
    },
  ];
}