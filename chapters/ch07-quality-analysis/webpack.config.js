const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env = {}, argv = {}) => {
  const mode = argv.mode || 'development';
  const isProduction = mode === 'production';
  const shouldAnalyze = env.analyze === true || env.analyze === 'true';

  return {
    mode,
    entry: './src/index.ts',
    output: {
      filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: 'media/[name].[contenthash][ext][query]',
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
          test: /\.svg$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/template.html',
        minify: isProduction
          ? {
              collapseWhitespace: true,
              removeComments: true,
              useShortDoctype: true,
            }
          : false,
      }),
      ...(shouldAnalyze
        ? [
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              openAnalyzer: false,
              reportFilename: path.resolve(__dirname, 'dist/reports/bundle-report.html'),
              generateStatsFile: true,
              statsFilename: path.resolve(__dirname, 'dist/reports/bundle-stats.json'),
            }),
          ]
        : []),
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
      },
      minimizer: [
        '...',
        ...(isProduction
          ? [
              new ImageMinimizerPlugin({
                test: /\.svg$/i,
                minimizer: {
                  implementation: ImageMinimizerPlugin.svgoMinify,
                  options: {
                    encodeOptions: {
                      multipass: true,
                      plugins: [
                        {
                          name: 'preset-default',
                        },
                        'sortAttrs',
                      ],
                    },
                  },
                },
              }),
            ]
          : []),
      ],
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
      children: false,
      chunkGroups: false,
    },
    performance: {
      hints: isProduction ? 'warning' : false,
    },
  };
};