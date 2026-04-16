import './styles.css';
import { renderAppShell } from './app';
import { loadRemoteWidget } from './loadRemoteWidget';
import { loadWasmMath } from './loadWasmMath';

const root = document.querySelector<HTMLElement>('#app');

if (!root) {
  throw new Error('Host app root not found.');
}

const shell = renderAppShell(root);
const remoteSlot = shell.querySelector('#remote-slot');
const wasmSlot = shell.querySelector('#wasm-slot');

async function bootstrap(): Promise<void> {
  if (remoteSlot instanceof HTMLElement) {
    try {
      const widget = await loadRemoteWidget('Remote widget loaded from http://localhost:8081');
      remoteSlot.replaceChildren(widget);
    } catch (error) {
      remoteSlot.textContent = `Remote load failed: ${error instanceof Error ? error.message : String(error)}`;
    }
  }

  if (wasmSlot instanceof HTMLElement) {
    try {
      const math = await loadWasmMath();
      const result = math.add(7, 5);
      const details = document.createElement('p');
      details.innerHTML = `The WASM module exported <strong>add</strong> and returned <strong>${result}</strong> for 7 + 5.`;
      wasmSlot.replaceChildren(details);
    } catch (error) {
      wasmSlot.textContent = `WASM load failed: ${error instanceof Error ? error.message : String(error)}`;
    }
  }
}

void bootstrap();