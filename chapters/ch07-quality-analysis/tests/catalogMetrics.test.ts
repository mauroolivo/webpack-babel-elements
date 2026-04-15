import {
  findAttentionItems,
  formatRuntime,
  summarizeCatalog,
  type MediaItem,
} from '../src/catalogMetrics';

const fixtures: MediaItem[] = [
  {
    id: 'atlas',
    title: 'Signal Atlas',
    format: 'video',
    durationMinutes: 45,
    qualityScore: 91,
    previewReady: true,
    tags: ['waveform'],
    notes: 'Healthy entry.',
    posterSrc: '/atlas.svg',
  },
  {
    id: 'field',
    title: 'Field Mix',
    format: 'video',
    durationMinutes: 81,
    qualityScore: 69,
    previewReady: false,
    tags: ['capture'],
    notes: 'Missing preview image.',
    posterSrc: '/field.svg',
  },
  {
    id: 'drift',
    title: 'Drift Signals',
    format: 'podcast',
    durationMinutes: 67,
    qualityScore: 74,
    previewReady: true,
    tags: ['audio'],
    notes: 'Needs normalization cleanup.',
    posterSrc: '/drift.svg',
  },
];

describe('summarizeCatalog', () => {
  it('aggregates the key quality indicators for the UI summary cards', () => {
    expect(summarizeCatalog(fixtures)).toEqual({
      totalItems: 3,
      previewReadyCount: 2,
      attentionCount: 2,
      averageQualityScore: 78,
      longestRuntimeLabel: 'Field Mix (1h 21m)',
      formatBreakdown: {
        video: 2,
        podcast: 1,
        guide: 0,
      },
    });
  });

  it('returns a safe empty summary when there are no entries', () => {
    expect(summarizeCatalog([])).toEqual({
      totalItems: 0,
      previewReadyCount: 0,
      attentionCount: 0,
      averageQualityScore: 0,
      longestRuntimeLabel: '0m',
      formatBreakdown: {
        video: 0,
        podcast: 0,
        guide: 0,
      },
    });
  });
});

describe('findAttentionItems', () => {
  it('puts missing previews ahead of entries that only miss the quality threshold', () => {
    expect(findAttentionItems(fixtures)).toEqual([
      {
        id: 'field',
        title: 'Field Mix',
        reason: 'missing-preview',
        qualityScore: 69,
      },
      {
        id: 'drift',
        title: 'Drift Signals',
        reason: 'low-score',
        qualityScore: 74,
      },
    ]);
  });
});

describe('formatRuntime', () => {
  it('formats mixed hours and minutes for the UI', () => {
    expect(formatRuntime(125)).toBe('2h 5m');
    expect(formatRuntime(45)).toBe('45m');
    expect(formatRuntime(120)).toBe('2h');
  });
});