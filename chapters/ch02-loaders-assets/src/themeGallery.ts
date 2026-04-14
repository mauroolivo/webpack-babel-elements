export type ThemeCard = {
  name: string;
  summary: string;
  palette: [string, string, string];
  season: string;
};

export const galleryTitle = 'Theme gallery for loader experiments';

export const gallerySummary =
  'This page exists mainly to import CSS and three different asset module types, so the build output tells a clear story.';

export const themeCards: ThemeCard[] = [
  {
    name: 'Linen Morning',
    summary: 'Warm neutrals paired with a low-contrast accent for editorial cards and notes.',
    palette: ['#f7f1e5', '#d8ccb8', '#7d9c91'],
    season: 'Early spring',
  },
  {
    name: 'Quiet Clay',
    summary: 'Earthy terracotta tones balanced by soft paper shades for reading-oriented layouts.',
    palette: ['#f2e3d2', '#cb8d63', '#6e5947'],
    season: 'Late summer',
  },
  {
    name: 'Night Ledger',
    summary: 'A darker accent set that still sits on a gentle background without turning the whole UI dark.',
    palette: ['#ebe5da', '#54626d', '#2c3840'],
    season: 'Autumn archive',
  },
];