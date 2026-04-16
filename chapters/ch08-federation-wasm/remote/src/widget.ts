export function createRemoteWidget(message: string): HTMLElement {
  const card = document.createElement('section');
  card.className = 'remote-card';
  card.innerHTML = `
    <strong>Remote Status Widget</strong>
    <span>${message}</span>
    <small>Exposed from the remote app through Module Federation.</small>
  `;

  return card;
}