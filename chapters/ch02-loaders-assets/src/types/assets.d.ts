declare module '*.css';

declare module '*.svg' {
  const assetUrl: string;
  export default assetUrl;
}

declare module '*.inline.svg' {
  const assetUrl: string;
  export default assetUrl;
}

declare module '*.txt' {
  const fileContents: string;
  export default fileContents;
}