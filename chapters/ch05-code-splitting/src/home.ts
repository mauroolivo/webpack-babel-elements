import { createConsoleCards } from './shared/cards';
import { createConsoleContext } from './shared/consoleModel';
import { renderConsolePage } from './shared/renderConsolePage';

const root = document.querySelector<HTMLElement>('#app');

if (!root) {
  throw new Error('Expected an element with the id "app".');
}

const context = createConsoleContext('home');

const { lazyPanelRoot, lazyButton } = renderConsolePage(root, {
  pageName: 'home',
  title: 'Multi-page analytics home',
  summary:
    'This entry demonstrates hashed entry filenames, a shared chunk, a vendor chunk, and a prefetched async feature loaded through import().',
  cards: createConsoleCards(
    context,
    'home',
    'home-insights',
    'The home page lazy feature uses a webpackPrefetch magic comment so the browser can fetch it opportunistically.',
  ),
  buttonLabel: 'Load home insights panel',
  lazyPlaceholder: 'The home insights chunk has not been requested yet.',
});

let hasLoadedInsights = false;

lazyButton.addEventListener('click', async () => {
  if (hasLoadedInsights) {
    return;
  }

  hasLoadedInsights = true;
  lazyButton.disabled = true;
  lazyButton.textContent = 'Loading home chunk...';

  const { renderHomeInsights } = await import(
    /* webpackChunkName: "home-insights", webpackPrefetch: true */ './features/homeInsights'
  );

  renderHomeInsights(lazyPanelRoot, context);
  lazyButton.textContent = 'Home insights loaded';
});