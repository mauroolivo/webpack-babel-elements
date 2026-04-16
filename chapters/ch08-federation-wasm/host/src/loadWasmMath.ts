import wasmUrl from './assets/math.wasm';

export async function loadWasmMath(): Promise<{ add(left: number, right: number): number }> {
  const response = await fetch(wasmUrl);
  const bytes = await response.arrayBuffer();
  const { instance } = await WebAssembly.instantiate(bytes, {});

  return instance.exports as { add(left: number, right: number): number };
}