export const readingModes = [
  'Featured editions',
  'Annotated copies',
  'Weekend carry stack',
];

export function formatModeLabel(mode: string): string {
  return mode.toUpperCase();
}

export const unusedReadingTelemetry = 'UNUSED_READING_TELEMETRY_DO_NOT_SHIP';