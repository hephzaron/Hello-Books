const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.common');

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash].css',
  allChunks: true
});

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.(css|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: {
          loader: 'css-loader',
          options: {
            minimize: true
          }
        }
      })
    }]
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  plugins: [
    extractSass,
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    }),
  ],
  optimization: {
    minimize: true
  }
});