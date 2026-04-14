const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name].[contenthash][ext][query]',
    clean: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            test: /\.inline\.svg$/,
            type: 'asset/inline',
          },
          {
            type: 'asset/resource',
          },
        ],
      },
      {
        test: /\.txt$/,
        type: 'asset/source',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
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