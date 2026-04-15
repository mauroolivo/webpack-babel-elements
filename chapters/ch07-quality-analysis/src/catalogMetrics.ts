export type MediaFormat = 'video' | 'podcast' | 'guide';

export interface MediaItem {
  id: string;
  title: string;
  format: MediaFormat;
  durationMinutes: number;
  qualityScore: number;
  previewReady: boolean;
  tags: string[];
  notes: string;
  posterSrc: string;
}

export interface CatalogSummary {
  totalItems: number;
  previewReadyCount: number;
  attentionCount: number;
  averageQualityScore: number;
  longestRuntimeLabel: string;
  formatBreakdown: Record<MediaFormat, number>;
}

export interface CatalogAttentionItem {
  id: string;
  title: string;
  reason: 'missing-preview' | 'low-score';
  qualityScore: number;
}

const EMPTY_BREAKDOWN: Record<MediaFormat, number> = {
  video: 0,
  podcast: 0,
  guide: 0,
};

export const QUALITY_THRESHOLD = 75;

export function formatRuntime(durationMinutes: number): string {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
}

export function summarizeCatalog(items: MediaItem[]): CatalogSummary {
  if (items.length === 0) {
    return {
      totalItems: 0,
      previewReadyCount: 0,
      attentionCount: 0,
      averageQualityScore: 0,
      longestRuntimeLabel: '0m',
      formatBreakdown: { ...EMPTY_BREAKDOWN },
    };
  }

  const formatBreakdown = items.reduce<Record<MediaFormat, number>>((summary, item) => {
    summary[item.format] += 1;
    return summary;
  }, { ...EMPTY_BREAKDOWN });

  const previewReadyCount = items.filter((item) => item.previewReady).length;
  const attentionCount = items.filter(
    (item) => !item.previewReady || item.qualityScore < QUALITY_THRESHOLD,
  ).length;
  const totalScore = items.reduce((sum, item) => sum + item.qualityScore, 0);
  const longestItem = items.reduce((currentLongest, item) => {
    return item.durationMinutes > currentLongest.durationMinutes ? item : currentLongest;
  }, items[0]);

  return {
    totalItems: items.length,
    previewReadyCount,
    attentionCount,
    averageQualityScore: Math.round((totalScore / items.length) * 10) / 10,
    longestRuntimeLabel: `${longestItem.title} (${formatRuntime(longestItem.durationMinutes)})`,
    formatBreakdown,
  };
}

export function findAttentionItems(items: MediaItem[]): CatalogAttentionItem[] {
  return items
    .filter((item) => !item.previewReady || item.qualityScore < QUALITY_THRESHOLD)
    .sort((left, right) => {
      if (left.previewReady !== right.previewReady) {
        return left.previewReady ? 1 : -1;
      }

      return left.qualityScore - right.qualityScore;
    })
    .map((item) => ({
      id: item.id,
      title: item.title,
      reason: item.previewReady ? 'low-score' : 'missing-preview',
      qualityScore: item.qualityScore,
    }));
}