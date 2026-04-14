import '@analytics/registerShelfTheme';
import { curatorNote, featuredBooks } from '@catalog/bookData';
import { readingModes } from '@catalog/readingModes';
import { renderShelf } from '@ui/renderShelf';

const root = document.querySelector<HTMLElement>('#app');

if (!root) {
  throw new Error('Expected an element with the id "app".');
}

renderShelf(root, {
  books: featuredBooks,
  readingModes,
  curatorNote,
  buildMode: __BUILD_MODE__,
  minified: __MINIFIED__,
  compressed: __COMPRESSION_ENABLED__,
});

console.table(
  featuredBooks.map((book) => ({
    title: book.title,
    buildMode: __BUILD_MODE__,
    minified: __MINIFIED__,
  })),
);