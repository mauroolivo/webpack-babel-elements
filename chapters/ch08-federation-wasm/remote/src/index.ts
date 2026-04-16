import './styles.css';
import { createRemoteWidget } from './widget';

const root = document.querySelector<HTMLElement>('#app');

if (!root) {
  throw new Error('Remote app root not found.');
}

const shell = document.createElement('main');
shell.className = 'remote-page';
shell.innerHTML = `
  <section class="remote-hero">
    <p class="eyebrow">Remote app</p>
    <h1>Federated Widget Host</h1>
    <p class="lead">
      This standalone page shows the same widget the host consumes from <code>remoteApp/Widget</code>.
    </p>
  </section>
`;

const preview = document.createElement('div');
preview.className = 'remote-preview';
preview.appendChild(createRemoteWidget('Running standalone on port 8081.'));

shell.appendChild(preview);
root.replaceChildren(shell);