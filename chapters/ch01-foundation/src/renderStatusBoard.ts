import { formatCaption, formatHeading, formatMetricValue } from './formatters';
import type { StatusMetric } from './metrics';

type RenderStatusBoardOptions = {
  title: string;
  intro: string;
  metrics: StatusMetric[];
};

export function renderStatusBoard(
  root: HTMLElement,
  { title, intro, metrics }: RenderStatusBoardOptions,
): void {
  root.innerHTML = '';

  const card = document.createElement('section');
  card.style.maxWidth = '52rem';
  card.style.margin = '3rem auto';
  card.style.padding = '2rem';
  card.style.border = '1px solid #d4d4d4';
  card.style.borderRadius = '1rem';
  card.style.background = '#f7f4ec';
  card.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.08)';
  card.style.fontFamily = 'Georgia, "Times New Roman", serif';
  card.style.color = '#1f1a14';

  const heading = document.createElement('h1');
  heading.textContent = formatHeading(title);
  heading.style.marginBottom = '0.5rem';

  const summary = document.createElement('p');
  summary.textContent = formatCaption(intro);
  summary.style.lineHeight = '1.6';
  summary.style.marginBottom = '1.5rem';

  const list = document.createElement('ul');
  list.style.display = 'grid';
  list.style.gridTemplateColumns = 'repeat(auto-fit, minmax(220px, 1fr))';
  list.style.gap = '1rem';
  list.style.padding = '0';
  list.style.margin = '0';
  list.style.listStyle = 'none';

  for (const metric of metrics) {
    const item = document.createElement('li');
    item.style.padding = '1rem';
    item.style.borderRadius = '0.85rem';
    item.style.background = '#fffdf8';
    item.style.border = '1px solid #e6dcc9';

    const label = document.createElement('strong');
    label.textContent = metric.label;
    label.style.display = 'block';
    label.style.marginBottom = '0.5rem';
    label.style.fontSize = '0.95rem';
    label.style.letterSpacing = '0.03em';
    label.style.textTransform = 'uppercase';

    const value = document.createElement('div');
    value.textContent = formatMetricValue(metric.value);
    value.style.fontSize = '1.1rem';
    value.style.marginBottom = '0.5rem';

    const detail = document.createElement('p');
    detail.textContent = metric.detail;
    detail.style.margin = '0';
    detail.style.lineHeight = '1.5';

    item.append(label, value, detail);
    list.append(item);
  }

  card.append(heading, summary, list);
  root.append(card);
}