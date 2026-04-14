import type { NoteItem, PlaygroundCopy } from './playgroundCopy';

type RenderNotesPlaygroundOptions = {
  copy: PlaygroundCopy;
  notes: NoteItem[];
  buildMode: string;
  sourceMapStrategy: string;
  hmrEnabled: boolean;
  onAddNote: () => void;
};

export function renderNotesPlayground(
  root: HTMLElement,
  { copy, notes, buildMode, sourceMapStrategy, hmrEnabled, onAddNote }: RenderNotesPlaygroundOptions,
): void {
  root.innerHTML = '';

  const shell = document.createElement('section');
  shell.style.width = 'min(1100px, calc(100vw - 2rem))';
  shell.style.margin = '0 auto';
  shell.style.padding = '2.5rem 0 4rem';

  const hero = document.createElement('header');
  hero.style.marginBottom = '1.5rem';

  const eyebrow = document.createElement('p');
  eyebrow.textContent = `Chapter 6 · ${buildMode}`;
  eyebrow.style.margin = '0 0 0.75rem';
  eyebrow.style.fontSize = '0.8rem';
  eyebrow.style.textTransform = 'uppercase';
  eyebrow.style.letterSpacing = '0.16em';
  eyebrow.style.color = '#5f5448';

  const title = document.createElement('h1');
  title.textContent = copy.title;
  title.style.margin = '0 0 0.8rem';
  title.style.fontSize = 'clamp(2.8rem, 6vw, 5.1rem)';
  title.style.lineHeight = '0.94';
  title.style.maxWidth = '9ch';

  const summary = document.createElement('p');
  summary.textContent = copy.summary;
  summary.style.margin = '0';
  summary.style.maxWidth = '68ch';
  summary.style.lineHeight = '1.7';
  summary.style.color = '#4f453a';

  hero.append(eyebrow, title, summary);

  const statusStrip = document.createElement('section');
  statusStrip.style.display = 'grid';
  statusStrip.style.gridTemplateColumns = 'repeat(auto-fit, minmax(180px, 1fr))';
  statusStrip.style.gap = '0.9rem';
  statusStrip.style.marginBottom = '1.2rem';

  for (const [label, value] of [
    ['Build mode', buildMode],
    ['Source maps', sourceMapStrategy],
    ['HMR', hmrEnabled ? 'enabled' : 'disabled'],
    ['Notes in state', String(notes.length)],
  ]) {
    const card = document.createElement('article');
    card.style.padding = '1rem';
    card.style.borderRadius = '1rem';
    card.style.border = '1px solid rgba(73, 62, 48, 0.12)';
    card.style.background = 'rgba(255, 251, 245, 0.84)';
    card.style.boxShadow = '0 14px 34px rgba(31, 24, 18, 0.07)';

    const labelNode = document.createElement('strong');
    labelNode.textContent = label;
    labelNode.style.display = 'block';
    labelNode.style.marginBottom = '0.35rem';
    labelNode.style.fontSize = '0.84rem';
    labelNode.style.textTransform = 'uppercase';
    labelNode.style.letterSpacing = '0.04em';

    const valueNode = document.createElement('div');
    valueNode.textContent = value;

    card.append(labelNode, valueNode);
    statusStrip.append(card);
  }

  const content = document.createElement('section');
  content.style.display = 'grid';
  content.style.gridTemplateColumns = 'minmax(0, 1.1fr) minmax(0, 0.9fr)';
  content.style.gap = '1rem';

  const notesPanel = document.createElement('article');
  notesPanel.style.padding = '1.15rem';
  notesPanel.style.borderRadius = '1.2rem';
  notesPanel.style.border = '1px solid rgba(73, 62, 48, 0.12)';
  notesPanel.style.background = 'rgba(255, 251, 245, 0.84)';

  const notesTitle = document.createElement('h2');
  notesTitle.textContent = 'Stateful notes';
  notesTitle.style.marginTop = '0';

  const addButton = document.createElement('button');
  addButton.type = 'button';
  addButton.textContent = 'Add practice note';
  addButton.style.padding = '0.75rem 1rem';
  addButton.style.borderRadius = '999px';
  addButton.style.border = '1px solid rgba(73, 62, 48, 0.16)';
  addButton.style.background = '#dbeee4';
  addButton.style.color = '#17322d';
  addButton.style.cursor = 'pointer';
  addButton.style.font = 'inherit';
  addButton.style.marginBottom = '1rem';
  addButton.addEventListener('click', onAddNote);

  const notesList = document.createElement('ul');
  notesList.style.listStyle = 'none';
  notesList.style.padding = '0';
  notesList.style.margin = '0';
  notesList.style.display = 'grid';
  notesList.style.gap = '0.8rem';

  for (const note of notes) {
    const item = document.createElement('li');
    item.style.padding = '0.95rem';
    item.style.borderRadius = '0.95rem';
    item.style.border = '1px solid rgba(73, 62, 48, 0.12)';
    item.style.background = '#fffdf8';

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.gap = '1rem';
    header.style.alignItems = 'baseline';
    header.style.marginBottom = '0.45rem';

    const heading = document.createElement('strong');
    heading.textContent = note.title;

    const lane = document.createElement('span');
    lane.textContent = note.lane;
    lane.style.fontSize = '0.84rem';
    lane.style.color = '#6f5b49';

    const detail = document.createElement('p');
    detail.textContent = note.detail;
    detail.style.margin = '0';
    detail.style.lineHeight = '1.6';
    detail.style.color = '#53473c';

    header.append(heading, lane);
    item.append(header, detail);
    notesList.append(item);
  }

  notesPanel.append(notesTitle, addButton, notesList);

  const guidePanel = document.createElement('article');
  guidePanel.style.padding = '1.15rem';
  guidePanel.style.borderRadius = '1.2rem';
  guidePanel.style.border = '1px solid rgba(73, 62, 48, 0.12)';
  guidePanel.style.background = 'rgba(255, 251, 245, 0.84)';

  const cardsTitle = document.createElement('h2');
  cardsTitle.textContent = 'Config layers';
  cardsTitle.style.marginTop = '0';

  const cardList = document.createElement('ul');
  cardList.style.listStyle = 'none';
  cardList.style.padding = '0';
  cardList.style.margin = '0 0 1rem';
  cardList.style.display = 'grid';
  cardList.style.gap = '0.75rem';

  for (const card of copy.cards) {
    const item = document.createElement('li');
    item.style.padding = '0.9rem';
    item.style.borderRadius = '0.95rem';
    item.style.border = '1px solid rgba(73, 62, 48, 0.12)';
    item.style.background = '#fffdf8';

    const label = document.createElement('strong');
    label.textContent = card.label;
    label.style.display = 'block';
    label.style.marginBottom = '0.35rem';

    const value = document.createElement('div');
    value.textContent = card.value;
    value.style.marginBottom = '0.35rem';
    value.style.color = '#18342f';

    const detail = document.createElement('p');
    detail.textContent = card.detail;
    detail.style.margin = '0';
    detail.style.lineHeight = '1.6';
    detail.style.color = '#564a3f';

    item.append(label, value, detail);
    cardList.append(item);
  }

  const tipsTitle = document.createElement('h3');
  tipsTitle.textContent = 'HMR practice loop';
  tipsTitle.style.marginBottom = '0.55rem';

  const tipsList = document.createElement('ul');
  tipsList.style.margin = '0';
  tipsList.style.paddingLeft = '1.1rem';
  tipsList.style.lineHeight = '1.7';

  for (const tip of copy.tips) {
    const item = document.createElement('li');
    item.textContent = tip;
    tipsList.append(item);
  }

  guidePanel.append(cardsTitle, cardList, tipsTitle, tipsList);
  content.append(notesPanel, guidePanel);
  shell.append(hero, statusStrip, content);
  root.append(shell);

  if (window.innerWidth < 760) {
    content.style.gridTemplateColumns = '1fr';
  }
}