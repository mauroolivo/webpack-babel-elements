declare module '*.wasm' {
  const assetUrl: string;
  export default assetUrl;
}

declare module 'remoteApp/Widget' {
  export function createRemoteWidget(message: string): HTMLElement;
}