const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const dotEnv = require('dotenv');
dotEnv.config();

const { PORT, HOST } = process.env;

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
    publicPath: `http://localhost:${PORT}/`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    compress: true,
    inline: true,
    host: HOST,
    port: PORT,
    contentBase: '/client/public',
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    },
    proxy: {
      '/api/v1': {
        target: 'http://localhost:5432',
        secure: false,
        changeOrigin: true
      }
    }
  },
  devtool: 'source-map'
})