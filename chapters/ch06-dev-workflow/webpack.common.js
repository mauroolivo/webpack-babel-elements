const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
    clean: true,
  },
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
      inject: 'body',
      scriptLoading: 'defer',
      templateParameters: {
        pageTitle: 'Live Notes Playground',
      },
    }),
  ],
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