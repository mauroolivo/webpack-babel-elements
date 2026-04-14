const shelfTheme = {
  name: 'oak-ledger',
  accent: '#8b6544',
  paper: '#fff8ef',
};

document.documentElement.dataset.shelfTheme = shelfTheme.name;
document.documentElement.style.setProperty('--shelf-accent', shelfTheme.accent);
document.documentElement.style.setProperty('--shelf-paper', shelfTheme.paper);

console.info(`[chapter-4] registered shelf theme: ${shelfTheme.name}`);

export function readShelfThemeName(): string {
  return shelfTheme.name;
}

export const unusedSideEffectExport = 'SIDE_EFFECT_EXPORT_IS_NOT_USED';