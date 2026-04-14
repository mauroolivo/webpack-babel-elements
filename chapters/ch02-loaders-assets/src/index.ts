import './styles/base.css';
import './styles/gallery.css';
import textureUrl from './assets/linen-texture.svg';
import sparkInlineUrl from './assets/spark.inline.svg';
import paletteNotes from './assets/palette-notes.txt';
import { renderThemeGallery } from './renderThemeGallery';
import { gallerySummary, galleryTitle, themeCards } from './themeGallery';

const root = document.querySelector<HTMLElement>('#app');

if (!root) {
  throw new Error('Expected an element with the id "app".');
}

renderThemeGallery(root, {
  title: galleryTitle,
  summary: gallerySummary,
  cards: themeCards,
  textureUrl,
  inlineIconUrl: sparkInlineUrl,
  notes: paletteNotes,
});

console.table(
  [
    ['resource svg', textureUrl],
    ['inline svg', sparkInlineUrl.slice(0, 48) + '...'],
    ['source text chars', String(paletteNotes.length)],
  ].map(([assetType, value]) => ({ assetType, value })),
);