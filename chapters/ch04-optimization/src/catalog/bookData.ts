export type ShelfBook = {
  title: string;
  author: string;
  shelf: string;
  note: string;
};

export const curatorNote =
  'Webpack can only shake out unused code when the source stays statically analyzable and the package tells webpack which files are side-effect free.';

export const featuredBooks: ShelfBook[] = [
  {
    title: 'Pragmatic Bundling',
    author: 'Ada Mercer',
    shelf: 'Build systems',
    note: 'Used in the rendered shelf and should survive both development and production builds.',
  },
  {
    title: 'Transpilers in Practice',
    author: 'Jonas Vale',
    shelf: 'Compiler craft',
    note: 'Shows how Babel and webpack can cooperate without overlapping responsibilities.',
  },
  {
    title: 'Alias Maps',
    author: 'Leena Ross',
    shelf: 'Project structure',
    note: 'Imported through resolve.alias so the source code avoids long relative paths.',
  },
];

export const archivedBooks: ShelfBook[] = [
  {
    title: 'Shelved Forever',
    author: 'Mira Holt',
    shelf: 'Archive',
    note: 'This data is intentionally unused and should disappear from the optimized bundle.',
  },
];

export const unusedCollectorToken = 'UNUSED_COLLECTOR_TOKEN_DO_NOT_SHIP';

export function buildSecretAcquisitionPlan(): string {
  return `Secret acquisition plan: ${unusedCollectorToken}`;
}