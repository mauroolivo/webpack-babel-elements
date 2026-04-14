import type { BuildNote } from './loadBuildNotes';
import type { DashboardContext, FeatureFlag } from './featureFlags';

type RenderFeatureDashboardOptions = {
  context: DashboardContext;
  flags: FeatureFlag[];
  notes: BuildNote[];
};

export function renderFeatureDashboard(
  root: HTMLElement,
  { context, flags, notes }: RenderFeatureDashboardOptions,
): void {
  root.innerHTML = '';

  const shell = document.createElement('section');
  shell.style.width = 'min(1080px, calc(100vw - 2rem))';
  shell.style.margin = '0 auto';
  shell.style.padding = '2.5rem 0 4rem';

  const hero = document.createElement('header');
  hero.style.marginBottom = '2rem';

  const eyebrow = document.createElement('p');
  eyebrow.textContent = `Chapter 3 · ${context.environment}`;
  eyebrow.style.margin = '0 0 0.8rem';
  eyebrow.style.letterSpacing = '0.16em';
  eyebrow.style.textTransform = 'uppercase';
  eyebrow.style.fontSize = '0.8rem';
  eyebrow.style.color = '#635646';

  const title = document.createElement('h1');
  title.textContent = context.title;
  title.style.margin = '0 0 0.9rem';
  title.style.fontSize = 'clamp(2.6rem, 6vw, 4.9rem)';
  title.style.lineHeight = '0.94';
  title.style.maxWidth = '9ch';

  const summary = document.createElement('p');
  summary.textContent =
    'This dashboard is mostly a vehicle for webpack plugins: HTML generation, static asset copying, environment injection, and configuration validation.';
  summary.style.maxWidth = '65ch';
  summary.style.margin = '0';
  summary.style.lineHeight = '1.7';
  summary.style.color = '#4f453a';

  hero.append(eyebrow, title, summary);

  const metaStrip = document.createElement('section');
  metaStrip.style.display = 'grid';
  metaStrip.style.gridTemplateColumns = 'repeat(auto-fit, minmax(180px, 1fr))';
  metaStrip.style.gap = '0.9rem';
  metaStrip.style.marginBottom = '1.25rem';

  const metaItems = [
    ['Release channel', context.releaseChannel],
    ['API base URL', context.apiBaseUrl],
    ['Generated HTML', 'dist/index.html'],
  ];

  for (const [label, value] of metaItems) {
    const card = document.createElement('article');
    card.style.padding = '1rem';
    card.style.border = '1px solid rgba(75, 63, 49, 0.12)';
    card.style.borderRadius = '1rem';
    card.style.background = 'rgba(255, 251, 243, 0.86)';
    card.style.boxShadow = '0 14px 34px rgba(33, 27, 20, 0.08)';

    const labelNode = document.createElement('strong');
    labelNode.textContent = label;
    labelNode.style.display = 'block';
    labelNode.style.marginBottom = '0.35rem';
    labelNode.style.fontSize = '0.86rem';
    labelNode.style.textTransform = 'uppercase';
    labelNode.style.letterSpacing = '0.04em';

    const valueNode = document.createElement('div');
    valueNode.textContent = value;
    valueNode.style.fontSize = '1rem';

    card.append(labelNode, valueNode);
    metaStrip.append(card);
  }

  const content = document.createElement('section');
  content.style.display = 'grid';
  content.style.gridTemplateColumns = 'minmax(0, 1.15fr) minmax(0, 0.85fr)';
  content.style.gap = '1rem';

  const flagsPanel = document.createElement('article');
  flagsPanel.style.padding = '1.15rem';
  flagsPanel.style.border = '1px solid rgba(75, 63, 49, 0.12)';
  flagsPanel.style.borderRadius = '1.15rem';
  flagsPanel.style.background = 'rgba(255, 251, 243, 0.82)';

  const flagsTitle = document.createElement('h2');
  flagsTitle.textContent = 'Compile-time feature flags';
  flagsTitle.style.marginTop = '0';

  const list = document.createElement('ul');
  list.style.listStyle = 'none';
  list.style.padding = '0';
  list.style.margin = '0';
  list.style.display = 'grid';
  list.style.gap = '0.85rem';

  for (const flag of flags) {
    const item = document.createElement('li');
    item.style.padding = '0.95rem';
    item.style.borderRadius = '0.95rem';
    item.style.border = '1px solid rgba(75, 63, 49, 0.12)';
    item.style.background = flag.enabled ? '#fff8e8' : '#f3eee6';

    const heading = document.createElement('div');
    heading.style.display = 'flex';
    heading.style.justifyContent = 'space-between';
    heading.style.gap = '1rem';
    heading.style.alignItems = 'center';
    heading.style.marginBottom = '0.5rem';

    const name = document.createElement('strong');
    name.textContent = flag.name;

    const badge = document.createElement('span');
    badge.textContent = flag.enabled ? 'enabled' : 'disabled';
    badge.style.padding = '0.25rem 0.55rem';
    badge.style.borderRadius = '999px';
    badge.style.fontSize = '0.8rem';
    badge.style.textTransform = 'uppercase';
    badge.style.letterSpacing = '0.04em';
    badge.style.background = flag.enabled ? '#dce9cc' : '#e7ddd2';

    const description = document.createElement('p');
    description.textContent = flag.description;
    description.style.margin = '0';
    description.style.lineHeight = '1.6';
    description.style.color = '#574b3d';

    heading.append(name, badge);
    item.append(heading, description);
    list.append(item);
  }

  flagsPanel.append(flagsTitle, list);

  const notesPanel = document.createElement('article');
  notesPanel.style.padding = '1.15rem';
  notesPanel.style.border = '1px solid rgba(75, 63, 49, 0.12)';
  notesPanel.style.borderRadius = '1.15rem';
  notesPanel.style.background = 'rgba(255, 251, 243, 0.82)';

  const notesTitle = document.createElement('h2');
  notesTitle.textContent = 'Plugin responsibilities';
  notesTitle.style.marginTop = '0';

  const notesList = document.createElement('ul');
  notesList.style.margin = '0';
  notesList.style.paddingLeft = '1.1rem';
  notesList.style.lineHeight = '1.7';

  for (const note of notes) {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${note.label}:</strong> ${note.value}`;
    notesList.append(item);
  }

  notesPanel.append(notesTitle, notesList);
  content.append(flagsPanel, notesPanel);
  shell.append(hero, metaStrip, content);
  root.append(shell);

  if (window.innerWidth < 760) {
    content.style.gridTemplateColumns = '1fr';
  }
}