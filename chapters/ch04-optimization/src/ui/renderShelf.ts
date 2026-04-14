import type { ShelfBook } from '@catalog/bookData';
import { formatModeLabel } from '@catalog/readingModes';

type RenderShelfOptions = {
  books: ShelfBook[];
  readingModes: string[];
  curatorNote: string;
  buildMode: string;
  minified: boolean;
  compressed: boolean;
};

export function renderShelf(
  root: HTMLElement,
  { books, readingModes, curatorNote, buildMode, minified, compressed }: RenderShelfOptions,
): void {
  root.innerHTML = '';

  const shell = document.createElement('section');
  shell.style.width = 'min(1080px, calc(100vw - 2rem))';
  shell.style.margin = '0 auto';
  shell.style.padding = '2.5rem 0 4rem';

  const header = document.createElement('header');
  header.style.marginBottom = '2rem';

  const eyebrow = document.createElement('p');
  eyebrow.textContent = `Chapter 4 · ${buildMode}`;
  eyebrow.style.margin = '0 0 0.8rem';
  eyebrow.style.fontSize = '0.8rem';
  eyebrow.style.textTransform = 'uppercase';
  eyebrow.style.letterSpacing = '0.16em';
  eyebrow.style.color = '#6d5946';

  const title = document.createElement('h1');
  title.textContent = 'Library shelf for optimization checks';
  title.style.margin = '0 0 0.85rem';
  title.style.fontSize = 'clamp(2.6rem, 6vw, 5rem)';
  title.style.lineHeight = '0.94';
  title.style.maxWidth = '10ch';

  const summary = document.createElement('p');
  summary.textContent = curatorNote;
  summary.style.margin = '0';
  summary.style.maxWidth = '62ch';
  summary.style.lineHeight = '1.7';
  summary.style.color = '#4d4135';

  header.append(eyebrow, title, summary);

  const statusStrip = document.createElement('section');
  statusStrip.style.display = 'grid';
  statusStrip.style.gridTemplateColumns = 'repeat(auto-fit, minmax(180px, 1fr))';
  statusStrip.style.gap = '0.9rem';
  statusStrip.style.marginBottom = '1.2rem';

  const statusCards = [
    ['Alias imports', '@catalog/* and @ui/*'],
    ['Minification', minified ? 'enabled' : 'disabled'],
    ['Compression', compressed ? 'main.js.gz emitted' : 'disabled'],
    ['Side effect module', document.documentElement.dataset.shelfTheme ?? 'not set'],
  ];

  for (const [label, value] of statusCards) {
    const card = document.createElement('article');
    card.style.padding = '1rem';
    card.style.borderRadius = '1rem';
    card.style.border = '1px solid rgba(73, 57, 42, 0.12)';
    card.style.background = 'rgba(255, 251, 245, 0.84)';
    card.style.boxShadow = '0 14px 34px rgba(31, 24, 18, 0.07)';

    const labelNode = document.createElement('strong');
    labelNode.textContent = label;
    labelNode.style.display = 'block';
    labelNode.style.marginBottom = '0.35rem';
    labelNode.style.fontSize = '0.84rem';
    labelNode.style.letterSpacing = '0.04em';
    labelNode.style.textTransform = 'uppercase';

    const valueNode = document.createElement('div');
    valueNode.textContent = value;

    card.append(labelNode, valueNode);
    statusStrip.append(card);
  }

  const content = document.createElement('section');
  content.style.display = 'grid';
  content.style.gridTemplateColumns = 'minmax(0, 1.2fr) minmax(0, 0.8fr)';
  content.style.gap = '1rem';

  const shelfPanel = document.createElement('article');
  shelfPanel.style.padding = '1.15rem';
  shelfPanel.style.borderRadius = '1.2rem';
  shelfPanel.style.border = '1px solid rgba(73, 57, 42, 0.12)';
  shelfPanel.style.background = 'rgba(255, 251, 245, 0.84)';

  const shelfTitle = document.createElement('h2');
  shelfTitle.textContent = 'Featured shelf';
  shelfTitle.style.marginTop = '0';

  const bookList = document.createElement('ul');
  bookList.style.listStyle = 'none';
  bookList.style.padding = '0';
  bookList.style.margin = '0';
  bookList.style.display = 'grid';
  bookList.style.gap = '0.8rem';

  for (const book of books) {
    const item = document.createElement('li');
    item.style.padding = '0.95rem';
    item.style.borderRadius = '0.95rem';
    item.style.border = '1px solid rgba(73, 57, 42, 0.12)';
    item.style.background = 'var(--shelf-paper, #fff8ef)';

    const heading = document.createElement('div');
    heading.style.display = 'flex';
    heading.style.justifyContent = 'space-between';
    heading.style.gap = '1rem';
    heading.style.marginBottom = '0.45rem';
    heading.style.alignItems = 'baseline';

    const titleNode = document.createElement('strong');
    titleNode.textContent = book.title;

    const shelfNode = document.createElement('span');
    shelfNode.textContent = book.shelf;
    shelfNode.style.fontSize = '0.88rem';
    shelfNode.style.color = '#695545';

    const author = document.createElement('div');
    author.textContent = book.author;
    author.style.marginBottom = '0.45rem';
    author.style.color = '#6d5a48';

    const note = document.createElement('p');
    note.textContent = book.note;
    note.style.margin = '0';
    note.style.lineHeight = '1.6';
    note.style.color = '#4b4035';

    heading.append(titleNode, shelfNode);
    item.append(heading, author, note);
    bookList.append(item);
  }

  shelfPanel.append(shelfTitle, bookList);

  const notesPanel = document.createElement('article');
  notesPanel.style.padding = '1.15rem';
  notesPanel.style.borderRadius = '1.2rem';
  notesPanel.style.border = '1px solid rgba(73, 57, 42, 0.12)';
  notesPanel.style.background = 'rgba(255, 251, 245, 0.84)';

  const notesTitle = document.createElement('h2');
  notesTitle.textContent = 'Optimization notes';
  notesTitle.style.marginTop = '0';

  const notesList = document.createElement('ul');
  notesList.style.margin = '0';
  notesList.style.paddingLeft = '1.1rem';
  notesList.style.lineHeight = '1.7';

  const notes = [
    'Babel keeps ES modules intact with modules: false so webpack can tree-shake unused exports.',
    'package.json marks only src/analytics/registerShelfTheme.ts as side-effectful.',
    'resolve.alias shortens imports and keeps the module graph readable.',
    'Production builds run Terser and emit a gzip copy of the final bundle.',
  ];

  for (const note of notes) {
    const item = document.createElement('li');
    item.textContent = note;
    notesList.append(item);
  }

  const modesTitle = document.createElement('h3');
  modesTitle.textContent = 'Reading modes';
  modesTitle.style.marginBottom = '0.55rem';
  modesTitle.style.marginTop = '1rem';

  const modesList = document.createElement('ul');
  modesList.style.listStyle = 'none';
  modesList.style.padding = '0';
  modesList.style.margin = '0';
  modesList.style.display = 'grid';
  modesList.style.gap = '0.45rem';

  for (const mode of readingModes) {
    const item = document.createElement('li');
    item.textContent = formatModeLabel(mode);
    item.style.padding = '0.55rem 0.75rem';
    item.style.borderRadius = '999px';
    item.style.background = 'rgba(139, 101, 68, 0.12)';
    item.style.width = 'fit-content';
    modesList.append(item);
  }

  notesPanel.append(notesTitle, notesList, modesTitle, modesList);
  content.append(shelfPanel, notesPanel);
  shell.append(header, statusStrip, content);
  root.append(shell);

  if (window.innerWidth < 760) {
    content.style.gridTemplateColumns = '1fr';
  }
}