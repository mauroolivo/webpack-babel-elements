import type { ConsoleContext } from '../shared/consoleModel';

export function renderHomeInsights(root: HTMLElement, context: ConsoleContext): void {
  root.innerHTML = '';

  const title = document.createElement('h3');
  title.textContent = 'Home insights chunk loaded';
  title.style.marginTop = '0';

  const summary = document.createElement('p');
  summary.textContent = `This async chunk was prefetched and loaded on demand for session ${context.sessionId}.`;
  summary.style.lineHeight = '1.6';

  const list = document.createElement('ul');
  list.style.margin = '0';
  list.style.paddingLeft = '1.1rem';
  list.style.lineHeight = '1.7';

  for (const itemText of [
    'Magic comment name: home-insights',
    'Magic comment hint: webpackPrefetch: true',
    'Loaded only after clicking the home action button',
  ]) {
    const item = document.createElement('li');
    item.textContent = itemText;
    list.append(item);
  }

  root.append(title, summary, list);
}