const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = (env = {}, argv = {}) => {
  const mode = argv.mode || 'development';
  const isProduction = mode === 'production';

  return {
    context: __dirname,
    mode,
    entry: './src/index.ts',
    output: {
      filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
      chunkFilename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: 'auto',
      clean: true,
    },
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
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
          test: /\.wasm$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'hostApp',
        remotes: {
          remoteApp: 'remoteApp@http://localhost:8081/remoteEntry.js',
        },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/template.html'),
        minify: isProduction,
      }),
    ],
    devServer: {
      port: 8080,
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      historyApiFallback: true,
      hot: false,
      liveReload: true,
      client: {
        overlay: true,
      },
    },
    infrastructureLogging: {
      level: 'warn',
    },
    stats: {
      preset: 'errors-warnings',
      assets: true,
      builtAt: true,
      timings: true,
      modules: false,
      entrypoints: false,
      chunkGroups: false,
      children: false,
    },
  };
};