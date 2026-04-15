import './styles.css';
import { mediaCatalog } from './catalogData';
import { renderCatalogInspector } from './renderCatalogInspector';

const appRoot = document.querySelector<HTMLElement>('#app');

if (!appRoot) {
  throw new Error('The media catalog root element was not found.');
}

renderCatalogInspector(appRoot, mediaCatalog);