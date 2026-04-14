declare const __BUILD_MODE__: string;
declare const __SOURCE_MAP_STRATEGY__: string;
declare const __HMR_ENABLED__: boolean;

interface ImportMetaWebpackHot {
  accept(dependencies: string | string[], callback?: (updatedDependencies?: string[]) => void): void;
}

interface ImportMeta {
  webpackHot?: ImportMetaWebpackHot;
}