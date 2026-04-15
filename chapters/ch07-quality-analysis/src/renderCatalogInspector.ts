import Fuse from 'fuse.js';
import {
  QUALITY_THRESHOLD,
  findAttentionItems,
  formatRuntime,
  summarizeCatalog,
  type MediaItem,
  type MediaFormat,
} from './catalogMetrics';

const formatLabels: Record<MediaFormat, string> = {
  video: 'Video',
  podcast: 'Podcast',
  guide: 'Guide',
};

function escapeMarkup(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function qualityTone(score: number): string {
  if (score >= 90) {
    return 'excellent';
  }

  if (score >= QUALITY_THRESHOLD) {
    return 'stable';
  }

  return 'attention';
}

function renderSummaryCards(items: MediaItem[]): string {
  const summary = summarizeCatalog(items);

  return [
    {
      label: 'Catalog Items',
      value: String(summary.totalItems),
      detail: `${summary.previewReadyCount} preview-ready`,
    },
    {
      label: 'Average Quality',
      value: `${summary.averageQualityScore}/100`,
      detail: `${summary.attentionCount} item(s) need attention`,
    },
    {
      label: 'Longest Runtime',
      value: summary.longestRuntimeLabel,
      detail: `${summary.formatBreakdown.video} videos, ${summary.formatBreakdown.podcast} podcasts, ${summary.formatBreakdown.guide} guides`,
    },
  ]
    .map(
      (card) => `
        <article class="metric-card">
          <p class="metric-label">${escapeMarkup(card.label)}</p>
          <h3 class="metric-value">${escapeMarkup(card.value)}</h3>
          <p class="metric-detail">${escapeMarkup(card.detail)}</p>
        </article>
      `,
    )
    .join('');
}

function renderAttentionItems(items: MediaItem[]): string {
  const attentionItems = findAttentionItems(items).slice(0, 3);

  if (attentionItems.length === 0) {
    return '<p class="panel-empty">Nothing is currently below the quality threshold.</p>';
  }

  return attentionItems
    .map(
      (item) => `
        <li>
          <strong>${escapeMarkup(item.title)}</strong>
          <span>${item.reason === 'missing-preview' ? 'Missing preview asset' : 'Quality score below threshold'}</span>
          <em>${item.qualityScore}/100</em>
        </li>
      `,
    )
    .join('');
}

function renderCatalogGrid(items: MediaItem[]): string {
  if (items.length === 0) {
    return '<p class="grid-empty">No media entries match the current filter.</p>';
  }

  return items
    .map(
      (item) => `
        <article class="catalog-card">
          <img class="catalog-poster" src="${escapeMarkup(item.posterSrc)}" alt="${escapeMarkup(item.title)} poster" />
          <div class="catalog-card__body">
            <div class="catalog-card__eyebrow">
              <span>${escapeMarkup(formatLabels[item.format])}</span>
              <span>${escapeMarkup(formatRuntime(item.durationMinutes))}</span>
            </div>
            <h3>${escapeMarkup(item.title)}</h3>
            <p>${escapeMarkup(item.notes)}</p>
            <ul class="tag-list">
              ${item.tags.map((tag) => `<li>${escapeMarkup(tag)}</li>`).join('')}
            </ul>
          </div>
          <div class="quality-pill quality-pill--${qualityTone(item.qualityScore)}">
            <span>Quality</span>
            <strong>${item.qualityScore}</strong>
          </div>
        </article>
      `,
    )
    .join('');
}

export function renderCatalogInspector(root: HTMLElement, items: MediaItem[]): void {
  const shell = document.createElement('main');
  const fuse = new Fuse(items, {
    includeScore: true,
    threshold: 0.32,
    ignoreLocation: true,
    keys: ['title', 'format', 'tags', 'notes'],
  });

  const state = {
    query: '',
  };

  function getVisibleItems(): MediaItem[] {
    if (!state.query) {
      return items;
    }

    return fuse.search(state.query).map((result) => result.item);
  }

  function render(): void {
    const visibleItems = getVisibleItems();

    shell.className = 'catalog-shell';
    shell.innerHTML = `
      <section class="hero-panel">
        <div>
          <p class="eyebrow">Chapter 7</p>
          <h1>Media Catalog Inspector</h1>
          <p class="hero-copy">
            Search a small catalog, inspect quality signals, and compare the bundle report against the runtime pieces that actually ship.
          </p>
        </div>
        <aside class="hero-note">
          <p>Analyzer-friendly choices</p>
          <strong>Fuse.js search + optimized SVG posters</strong>
          <span>The production build turns verbose source posters into smaller emitted assets and keeps the CLI output readable.</span>
        </aside>
      </section>

      <section class="toolbar-panel">
        <label class="search-field">
          <span>Search titles, tags, or notes</span>
          <input
            data-search
            type="search"
            value="${escapeMarkup(state.query)}"
            placeholder="Try drift, docs, outdoor..."
          />
        </label>
        <p class="toolbar-meta">Showing ${visibleItems.length} of ${items.length} entries.</p>
      </section>

      <section class="metrics-grid">
        ${renderSummaryCards(visibleItems)}
      </section>

      <section class="content-grid">
        <section class="catalog-panel">
          <div class="panel-heading">
            <p class="eyebrow">Catalog View</p>
            <h2>Preview-ready assets and notes</h2>
          </div>
          <div class="catalog-grid">
            ${renderCatalogGrid(visibleItems)}
          </div>
        </section>

        <aside class="attention-panel">
          <div class="panel-heading">
            <p class="eyebrow">Diagnostics</p>
            <h2>Items needing a closer look</h2>
          </div>
          <ol class="attention-list">
            ${renderAttentionItems(visibleItems)}
          </ol>
        </aside>
      </section>
    `;

    const searchField = shell.querySelector('[data-search]');
    if (searchField instanceof HTMLInputElement) {
      searchField.addEventListener('input', (event) => {
        state.query = event.target instanceof HTMLInputElement ? event.target.value.trim() : '';
        render();
      });
    }
  }

  render();
  root.replaceChildren(shell);
}