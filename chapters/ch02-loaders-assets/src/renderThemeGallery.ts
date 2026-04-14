import type { ThemeCard } from './themeGallery';

type RenderThemeGalleryOptions = {
  title: string;
  summary: string;
  cards: ThemeCard[];
  textureUrl: string;
  inlineIconUrl: string;
  notes: string;
};

export function renderThemeGallery(
  root: HTMLElement,
  { title, summary, cards, textureUrl, inlineIconUrl, notes }: RenderThemeGalleryOptions,
): void {
  root.innerHTML = '';

  const shell = document.createElement('section');
  shell.className = 'gallery-shell';

  const header = document.createElement('header');
  header.className = 'gallery-header';

  const kicker = document.createElement('p');
  kicker.className = 'gallery-kicker';
  kicker.textContent = 'Chapter 2';

  const heading = document.createElement('h1');
  heading.className = 'gallery-title';
  heading.textContent = title;

  const intro = document.createElement('p');
  intro.className = 'gallery-summary';
  intro.textContent = summary;

  header.append(kicker, heading, intro);

  const grid = document.createElement('div');
  grid.className = 'gallery-grid';

  for (const card of cards) {
    const article = document.createElement('article');
    article.className = 'theme-card';

    const texture = document.createElement('img');
    texture.className = 'theme-card__texture';
    texture.src = textureUrl;
    texture.alt = `${card.name} texture sample`;

    const body = document.createElement('div');
    body.className = 'theme-card__body';

    const row = document.createElement('div');
    row.className = 'theme-card__row';

    const name = document.createElement('h2');
    name.className = 'theme-card__name';
    name.textContent = card.name;

    const swatches = document.createElement('div');
    swatches.className = 'theme-card__swatches';

    for (const color of card.palette) {
      const swatch = document.createElement('span');
      swatch.className = 'theme-card__swatch';
      swatch.style.backgroundColor = color;
      swatch.title = color;
      swatches.append(swatch);
    }

    row.append(name, swatches);

    const copy = document.createElement('p');
    copy.className = 'theme-card__copy';
    copy.textContent = card.summary;

    const meta = document.createElement('div');
    meta.className = 'theme-card__meta';

    const icon = document.createElement('img');
    icon.className = 'theme-card__inline-icon';
    icon.src = inlineIconUrl;
    icon.alt = '';
    icon.setAttribute('aria-hidden', 'true');

    const season = document.createElement('span');
    season.textContent = card.season;

    meta.append(icon, season);
    body.append(row, copy, meta);
    article.append(texture, body);
    grid.append(article);
  }

  const footer = document.createElement('section');
  footer.className = 'loader-notes';

  const loaderPanel = document.createElement('article');
  loaderPanel.className = 'loader-panel';
  loaderPanel.innerHTML = [
    '<h2>Loader chain to inspect</h2>',
    '<ul>',
    '<li><strong>babel-loader</strong> transpiles TypeScript modules before webpack bundles them.</li>',
    '<li><strong>css-loader</strong> interprets CSS imports and turns them into JavaScript modules.</li>',
    '<li><strong>style-loader</strong> injects the final CSS into the document at runtime.</li>',
    '<li><strong>asset/resource</strong> emits a file to dist and returns its URL.</li>',
    '<li><strong>asset/inline</strong> embeds the file as a data URI in the bundle.</li>',
    '<li><strong>asset/source</strong> gives you raw file contents as a string.</li>',
    '</ul>',
  ].join('');

  const notesPanel = document.createElement('article');
  notesPanel.className = 'notes-panel';

  const notesTitle = document.createElement('h2');
  notesTitle.textContent = 'Imported from palette-notes.txt';

  const notesBlock = document.createElement('pre');
  notesBlock.textContent = notes;

  notesPanel.append(notesTitle, notesBlock);
  footer.append(loaderPanel, notesPanel);

  shell.append(header, grid, footer);
  root.append(shell);
}