import { chapterIntro, chapterTitle, statusMetrics } from './metrics';
import { renderStatusBoard } from './renderStatusBoard';

const root = document.querySelector<HTMLElement>('#app');

if (!root) {
  throw new Error('Expected an element with the id "app".');
}

renderStatusBoard(root, {
  title: chapterTitle,
  intro: chapterIntro,
  metrics: statusMetrics,
});

console.table(
  statusMetrics.map(({ label, value }) => ({
    label,
    value,
  })),
);