import type { ConsoleCard } from './cards';

type RenderConsolePageOptions = {
  pageName: string;
  title: string;
  summary: string;
  cards: ConsoleCard[];
  buttonLabel: string;
  lazyPlaceholder: string;
};

export function renderConsolePage(
  root: HTMLElement,
  { pageName, title, summary, cards, buttonLabel, lazyPlaceholder }: RenderConsolePageOptions,
): { lazyPanelRoot: HTMLElement; lazyButton: HTMLButtonElement } {
  root.innerHTML = '';

  const shell = document.createElement('section');
  shell.style.width = 'min(1100px, calc(100vw - 2rem))';
  shell.style.margin = '0 auto';
  shell.style.padding = '2.5rem 0 4rem';

  const nav = document.createElement('nav');
  nav.style.display = 'flex';
  nav.style.gap = '0.75rem';
  nav.style.marginBottom = '1.4rem';
  nav.style.flexWrap = 'wrap';

  for (const [label, href] of [
    ['Home entry', './home.html'],
    ['Admin entry', './admin.html'],
  ]) {
    const link = document.createElement('a');
    link.textContent = label;
    link.href = href;
    link.style.padding = '0.45rem 0.8rem';
    link.style.borderRadius = '999px';
    link.style.textDecoration = 'none';
    link.style.color = label.toLowerCase().startsWith(pageName) ? '#102f2b' : '#554839';
    link.style.background = label.toLowerCase().startsWith(pageName)
      ? 'rgba(141, 192, 180, 0.35)'
      : 'rgba(255, 250, 244, 0.78)';
    link.style.border = '1px solid rgba(72, 62, 51, 0.12)';
    nav.append(link);
  }

  const hero = document.createElement('header');
  hero.style.marginBottom = '1.5rem';

  const kicker = document.createElement('p');
  kicker.textContent = `Chapter 5 · ${pageName} entry`;
  kicker.style.margin = '0 0 0.75rem';
  kicker.style.textTransform = 'uppercase';
  kicker.style.letterSpacing = '0.16em';
  kicker.style.fontSize = '0.8rem';
  kicker.style.color = '#5f5346';

  const heading = document.createElement('h1');
  heading.textContent = title;
  heading.style.margin = '0 0 0.8rem';
  heading.style.fontSize = 'clamp(2.7rem, 6vw, 5rem)';
  heading.style.lineHeight = '0.94';
  heading.style.maxWidth = '9ch';

  const intro = document.createElement('p');
  intro.textContent = summary;
  intro.style.margin = '0';
  intro.style.maxWidth = '65ch';
  intro.style.lineHeight = '1.7';
  intro.style.color = '#4c4339';

  hero.append(kicker, heading, intro);

  const grid = document.createElement('section');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'minmax(0, 1.1fr) minmax(0, 0.9fr)';
  grid.style.gap = '1rem';

  const cardsPanel = document.createElement('article');
  cardsPanel.style.padding = '1.15rem';
  cardsPanel.style.borderRadius = '1.2rem';
  cardsPanel.style.border = '1px solid rgba(74, 63, 50, 0.12)';
  cardsPanel.style.background = 'rgba(255, 251, 245, 0.84)';

  const cardsTitle = document.createElement('h2');
  cardsTitle.textContent = 'Chunk map overview';
  cardsTitle.style.marginTop = '0';

  const cardsList = document.createElement('ul');
  cardsList.style.listStyle = 'none';
  cardsList.style.padding = '0';
  cardsList.style.margin = '0';
  cardsList.style.display = 'grid';
  cardsList.style.gap = '0.8rem';

  for (const card of cards) {
    const item = document.createElement('li');
    item.style.padding = '0.9rem';
    item.style.borderRadius = '1rem';
    item.style.border = '1px solid rgba(74, 63, 50, 0.12)';
    item.style.background = '#fffdf8';

    const label = document.createElement('strong');
    label.textContent = card.label;
    label.style.display = 'block';
    label.style.marginBottom = '0.4rem';

    const value = document.createElement('div');
    value.textContent = card.value;
    value.style.marginBottom = '0.4rem';
    value.style.color = '#153833';

    const detail = document.createElement('p');
    detail.textContent = card.detail;
    detail.style.margin = '0';
    detail.style.lineHeight = '1.6';
    detail.style.color = '#584d41';

    item.append(label, value, detail);
    cardsList.append(item);
  }

  cardsPanel.append(cardsTitle, cardsList);

  const asyncPanel = document.createElement('article');
  asyncPanel.style.padding = '1.15rem';
  asyncPanel.style.borderRadius = '1.2rem';
  asyncPanel.style.border = '1px solid rgba(74, 63, 50, 0.12)';
  asyncPanel.style.background = 'rgba(255, 251, 245, 0.84)';

  const asyncTitle = document.createElement('h2');
  asyncTitle.textContent = 'Async feature loader';
  asyncTitle.style.marginTop = '0';

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = buttonLabel;
  button.style.padding = '0.75rem 1rem';
  button.style.borderRadius = '999px';
  button.style.border = '1px solid rgba(74, 63, 50, 0.16)';
  button.style.background = '#dceee7';
  button.style.color = '#14312d';
  button.style.cursor = 'pointer';
  button.style.font = 'inherit';
  button.style.marginBottom = '1rem';

  const lazyPanelRoot = document.createElement('div');
  lazyPanelRoot.textContent = lazyPlaceholder;
  lazyPanelRoot.style.padding = '1rem';
  lazyPanelRoot.style.borderRadius = '1rem';
  lazyPanelRoot.style.border = '1px dashed rgba(74, 63, 50, 0.22)';
  lazyPanelRoot.style.background = '#fffdf8';
  lazyPanelRoot.style.lineHeight = '1.6';
  lazyPanelRoot.style.color = '#574b40';

  asyncPanel.append(asyncTitle, button, lazyPanelRoot);
  grid.append(cardsPanel, asyncPanel);
  shell.append(nav, hero, grid);
  root.append(shell);

  if (window.innerWidth < 760) {
    grid.style.gridTemplateColumns = '1fr';
  }

  return {
    lazyPanelRoot,
    lazyButton: button,
  };
}