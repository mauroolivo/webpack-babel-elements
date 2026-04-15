import signalAtlasPoster from './assets/signal-atlas.svg';
import driftSignalsPoster from './assets/drift-signals.svg';
import archiveGlossaryPoster from './assets/archive-glossary.svg';
import fieldMixPoster from './assets/field-mix.svg';
import type { MediaItem } from './catalogMetrics';

export const mediaCatalog: MediaItem[] = [
  {
    id: 'signal-atlas',
    title: 'Signal Atlas',
    format: 'video',
    durationMinutes: 48,
    qualityScore: 92,
    previewReady: true,
    tags: ['waveform', 'sync', 'baseline'],
    notes: 'Reference session with clean preview frames and complete metadata.',
    posterSrc: signalAtlasPoster,
  },
  {
    id: 'drift-signals',
    title: 'Drift Signals',
    format: 'podcast',
    durationMinutes: 67,
    qualityScore: 74,
    previewReady: true,
    tags: ['interview', 'stereo', 'cleanup'],
    notes: 'Passes ingestion, but the loudness normalization still needs another pass.',
    posterSrc: driftSignalsPoster,
  },
  {
    id: 'archive-glossary',
    title: 'Archive Glossary',
    format: 'guide',
    durationMinutes: 21,
    qualityScore: 88,
    previewReady: true,
    tags: ['taxonomy', 'naming', 'docs'],
    notes: 'Short written guide used by the review team during asset labeling.',
    posterSrc: archiveGlossaryPoster,
  },
  {
    id: 'field-mix',
    title: 'Field Mix',
    format: 'video',
    durationMinutes: 81,
    qualityScore: 69,
    previewReady: false,
    tags: ['outdoor', 'capture', 'color'],
    notes: 'Missing poster preview and still carrying unresolved color-balance notes.',
    posterSrc: fieldMixPoster,
  },
];