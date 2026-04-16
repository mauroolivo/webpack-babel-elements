export function renderAppShell(root: HTMLElement): HTMLElement {
  const shell = document.createElement('main');
  shell.className = 'dashboard';
  shell.innerHTML = `
    <section class="hero-card">
      <p class="eyebrow">Chapter 8</p>
      <h1>Composable Dashboard</h1>
      <p class="lead">
        The host loads a remote widget through Module Federation and a tiny WebAssembly helper as separate async steps.
      </p>
    </section>

    <section class="grid">
      <article class="panel">
        <p class="panel-label">Remote widget</p>
        <div id="remote-slot" class="remote-slot">Loading remote module...</div>
      </article>

      <article class="panel">
        <p class="panel-label">WASM helper</p>
        <div id="wasm-slot" class="wasm-slot">Loading WebAssembly helper...</div>
      </article>
    </section>
  `;

  root.replaceChildren(shell);
  return shell;
}