import { createConsoleCards } from './shared/cards';
import { createConsoleContext } from './shared/consoleModel';
import { renderConsolePage } from './shared/renderConsolePage';

const root = document.querySelector<HTMLElement>('#app');

if (!root) {
  throw new Error('Expected an element with the id "app".');
}

const context = createConsoleContext('admin');

const { lazyPanelRoot, lazyButton } = renderConsolePage(root, {
  pageName: 'admin',
  title: 'Multi-page analytics admin',
  summary:
    'This entry shares initial code with the home page, but requests a different async feature chunk that uses a preload magic comment.',
  cards: createConsoleCards(
    context,
    'admin',
    'admin-audit',
    'The admin page lazy feature uses a webpackPreload magic comment so the browser treats it as more urgent than prefetch.',
  ),
  buttonLabel: 'Load admin audit panel',
  lazyPlaceholder: 'The admin audit chunk has not been requested yet.',
});

let hasLoadedAudit = false;

lazyButton.addEventListener('click', async () => {
  if (hasLoadedAudit) {
    return;
  }

  hasLoadedAudit = true;
  lazyButton.disabled = true;
  lazyButton.textContent = 'Loading admin chunk...';

  const { renderAdminAudit } = await import(
    /* webpackChunkName: "admin-audit", webpackPreload: true */ './features/adminAudit'
  );

  renderAdminAudit(lazyPanelRoot, context);
  lazyButton.textContent = 'Admin audit loaded';
});