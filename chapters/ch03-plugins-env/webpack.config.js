const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function loadEnvironment(mode) {
  const envFilePath = path.resolve(__dirname, `.env.${mode}`);
  const envResult = dotenv.config({ path: envFilePath });

  if (envResult.error) {
    throw new Error(`Unable to load environment file: ${envFilePath}`);
  }

  return envResult.parsed ?? {};
}

function readBoolean(value, fallback) {
  if (value == null) {
    return fallback;
  }

  return value === 'true';
}

module.exports = (_, argv = {}) => {
  const mode = argv.mode ?? 'development';
  const env = loadEnvironment(mode);
  const appEnv = env.APP_ENV_LABEL ?? mode;
  const dashboardTitle = env.DASHBOARD_TITLE ?? 'Feature Flag Dashboard';
  const releaseChannel = env.RELEASE_CHANNEL ?? 'local';
  const apiBaseUrl = env.API_BASE_URL ?? '/api';
  const featureInsights = readBoolean(env.FEATURE_INSIGHTS, false);
  const featureGuidedSetup = readBoolean(env.FEATURE_GUIDED_SETUP, true);

  return {
    mode,
    entry: './src/index.ts',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    devtool: mode === 'development' ? 'source-map' : false,
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
          pageTitle: dashboardTitle,
          appEnv,
          releaseChannel,
          featureInsights,
          featureGuidedSetup,
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public',
            to: '.',
          },
        ],
      }),
      new webpack.DefinePlugin({
        __APP_ENV__: JSON.stringify(appEnv),
        __DASHBOARD_TITLE__: JSON.stringify(dashboardTitle),
        __RELEASE_CHANNEL__: JSON.stringify(releaseChannel),
        __API_BASE_URL__: JSON.stringify(apiBaseUrl),
        __FEATURE_INSIGHTS__: JSON.stringify(featureInsights),
        __FEATURE_GUIDED_SETUP__: JSON.stringify(featureGuidedSetup),
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
};