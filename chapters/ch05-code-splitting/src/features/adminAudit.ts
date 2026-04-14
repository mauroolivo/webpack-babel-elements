import type { ConsoleContext } from '../shared/consoleModel';

export function renderAdminAudit(root: HTMLElement, context: ConsoleContext): void {
  root.innerHTML = '';

  const title = document.createElement('h3');
  title.textContent = 'Admin audit chunk loaded';
  title.style.marginTop = '0';

  const summary = document.createElement('p');
  summary.textContent = `This async chunk was preloaded and then executed for session ${context.sessionId}.`;
  summary.style.lineHeight = '1.6';

  const list = document.createElement('ul');
  list.style.margin = '0';
  list.style.paddingLeft = '1.1rem';
  list.style.lineHeight = '1.7';

  for (const itemText of [
    'Magic comment name: admin-audit',
    'Magic comment hint: webpackPreload: true',
    'Loaded only after the admin action button requests it',
  ]) {
    const item = document.createElement('li');
    item.textContent = itemText;
    list.append(item);
  }

  root.append(title, summary, list);
}