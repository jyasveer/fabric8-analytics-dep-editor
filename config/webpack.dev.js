var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var DashboardPlugin = require('webpack-dashboard/plugin');

const ENV = process.env.ENV || process.env.NODE_ENV || 'development';
// if env is 'inmemory', the inmemory debug resource is used
const API_URL = process.env.API_URL || (ENV === 'inmemory' ? 'app/' : 'http://localhost:8080/api/');
const FORGE_URL = process.env.FORGE_URL || 'http://localhost:8080/forge';
const FABRIC8_WIT_API_URL = process.env.FABRIC8_WIT_API_URL || 'http://localhost:8080/api/';
const FABRIC8_RECOMMENDER_API_URL = process.env.FABRIC8_RECOMMENDER_API_URL;
const FABRIC8_FORGE_URL = process.env.FABRIC8_FORGE_URL;
const FABRIC8_REALM = process.env.FABRIC8_REALM || 'fabric8';
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';
const STACK_API_TOKEN = process.env.STACK_API_TOKEN;
const extractCSS = new ExtractTextPlugin('stylesheets/[name].css');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const METADATA = webpackMerge(commonConfig.metadata, {
  API_URL: API_URL,
  ENV: ENV,
  FABRIC8_REALM: FABRIC8_REALM,
  FORGE_URL: FORGE_URL,
  FABRIC8_WIT_API_URL: FABRIC8_WIT_API_URL,
  FABRIC8_RECOMMENDER_API_URL: FABRIC8_RECOMMENDER_API_URL,
  FABRIC8_FORGE_URL: FABRIC8_FORGE_URL,
  STACK_API_TOKEN: STACK_API_TOKEN,
  PUBLIC_PATH: PUBLIC_PATH
});

module.exports = function (options) {
  return webpackMerge(commonConfig, {
    devtool: 'source-map',

    entry: {
      'polyfills': './src/polyfills.ts',
      'vendor': './src/vendor.ts',
      'app': './src/main.ts'
    },

    output: {
      path: helpers.root('dist'),
      publicPath: METADATA.PUBLIC_PATH,
      filename: '[name].js',
      chunkFilename: '[id].chunk.js',
      sourceMapFilename: '[name].map'
    },

    plugins: [
      new DashboardPlugin(),
      extractCSS,
      /*
       * StyleLintPlugin
       */
      new StyleLintPlugin({
        configFile: '.stylelintrc',
        syntax: 'less',
        context: 'src',
        files: '**/*.less',
        failOnError: true,
        quiet: false,
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills']
      }),

      /**
       * Plugin: DefinePlugin
       * Description: Define free variables.
       * Useful for having development builds with debug logging or adding global constants.
       *
       * Environment helpers
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       */
      // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
      new webpack.DefinePlugin({
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'API_URL': JSON.stringify(METADATA.API_URL),
          'FORGE_URL': JSON.stringify(METADATA.FORGE_URL),
          'PUBLIC_PATH': JSON.stringify(METADATA.PUBLIC_PATH),
          'FABRIC8_REALM': JSON.stringify(METADATA.FABRIC8_REALM),
          'STACK_API_TOKEN': JSON.stringify(METADATA.STACK_API_TOKEN),
          'FABRIC8_RECOMMENDER_API': JSON.stringify(METADATA.FABRIC8_RECOMMENDER_API_URL)
        }
      })
    ],

    devServer: {
      historyApiFallback: true,
      stats: 'minimal',
      inline: true
    }
  });
}
