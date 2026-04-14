const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (_, argv = {}) => {
  const mode = argv.mode ?? 'development';
  const isProduction = mode === 'production';

  return {
    mode,
    entry: './src/index.ts',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    devtool: isProduction ? false : 'source-map',
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '@catalog': path.resolve(__dirname, 'src/catalog'),
        '@analytics': path.resolve(__dirname, 'src/analytics'),
        '@ui': path.resolve(__dirname, 'src/ui'),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        __BUILD_MODE__: JSON.stringify(mode),
        __MINIFIED__: JSON.stringify(isProduction),
        __COMPRESSION_ENABLED__: JSON.stringify(isProduction),
      }),
      ...(isProduction
        ? [
            new CompressionPlugin({
              test: /\.js$/i,
              algorithm: 'gzip',
              filename: '[path][base].gz',
              threshold: 0,
              minRatio: 1,
            }),
          ]
        : []),
    ],
    optimization: {
      sideEffects: true,
      usedExports: true,
      minimize: isProduction,
      minimizer: isProduction
        ? [
            new TerserPlugin({
              extractComments: false,
              terserOptions: {
                compress: {
                  passes: 2,
                },
                format: {
                  comments: false,
                },
              },
            }),
          ]
        : [],
    },
    infrastructureLogging: {
      level: 'warn',
    },
    stats: {
      preset: 'normal',
      assets: true,
      modules: false,
      entrypoints: false,
      chunkGroups: false,
    },
  };
};