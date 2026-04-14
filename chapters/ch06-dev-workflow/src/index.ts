import { playgroundCopy, seedNotes, type NoteItem } from './playgroundCopy';
import { renderNotesPlayground } from './renderNotesPlayground';

const root = document.querySelector<HTMLElement>('#app');

if (!root) {
  throw new Error('Expected an element with the id "app".');
}

const appRoot = root;

const notes: NoteItem[] = [...seedNotes];
let nextId = notes.length + 1;

function addPracticeNote(): void {
  const timestamp = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date());

  notes.unshift({
    id: nextId,
    title: `HMR note ${nextId}`,
    detail: `Added at ${timestamp}. If hot updates are working, this note should still exist after editing a dependency module.`,
    lane: __HMR_ENABLED__ ? 'dev server' : 'production snapshot',
  });

  nextId += 1;
  mount();
}

function mount(): void {
  renderNotesPlayground(appRoot, {
    copy: playgroundCopy,
    notes,
    buildMode: __BUILD_MODE__,
    sourceMapStrategy: __SOURCE_MAP_STRATEGY__,
    hmrEnabled: __HMR_ENABLED__,
    onAddNote: addPracticeNote,
  });
}

mount();

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(['./renderNotesPlayground', './playgroundCopy'], () => {
    mount();
  });
}