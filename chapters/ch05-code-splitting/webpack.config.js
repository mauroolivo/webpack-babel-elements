const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (_, argv = {}) => {
  const mode = argv.mode ?? 'development';
  const isProduction = mode === 'production';

  return {
    mode,
    entry: {
      home: './src/home.ts',
      admin: './src/admin.ts',
    },
    output: {
      filename: 'js/[name].[contenthash:8].js',
      chunkFilename: 'js/[name].[contenthash:8].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: 'auto',
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
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'home.html',
        template: './src/template.html',
        inject: 'body',
        scriptLoading: 'defer',
        chunks: ['runtime', 'vendors', 'shared', 'home'],
        chunksSortMode: 'manual',
        templateParameters: {
          pageTitle: 'Home Analytics Console',
          pageDescription: 'Chapter 5 home entry showing shared chunks, vendors, and prefetched lazy modules.',
          entryName: 'home',
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'admin.html',
        template: './src/template.html',
        inject: 'body',
        scriptLoading: 'defer',
        chunks: ['runtime', 'vendors', 'shared', 'admin'],
        chunksSortMode: 'manual',
        templateParameters: {
          pageTitle: 'Admin Analytics Console',
          pageDescription: 'Chapter 5 admin entry showing shared chunks, vendors, and preloaded lazy modules.',
          entryName: 'admin',
        },
      }),
    ],
    optimization: {
      runtimeChunk: {
        name: 'runtime',
      },
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 20,
            enforce: true,
          },
          shared: {
            minChunks: 2,
            name: 'shared',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
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