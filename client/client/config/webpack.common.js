const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotEnv = require('dotenv');

dotEnv.config();

/**
 * Sorts chunk in alphabetical order
 */
const chunksSortMode = (prev, next) => (
  prev.names[0].localeCompare(next.names[0])
)
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../public/index.html'),
  filename: 'index.html',
  inject: 'body',
  chunksSortMode
});

const ProvidePlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery'
});

const DefinePlugin = new webpack.DefinePlugin({
  "process.env": {
    PORT: JSON.stringify(process.env.PORT),
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    CLOUDINARY_CLOUD_NAME: JSON.stringify(process.env.CLOUDINARY_CLOUD_NAME),
    CLOUDINARY_API_KEY: JSON.stringify(process.env.CLOUDINARY_API_KEY),
    CLOUDINARY_API_SECRET: JSON.stringify(process.env.CLOUDINARY_API_SECRET),
    ROOT_URL: JSON.stringify(process.env.ROOT_URL),
    SOCKET_URL: JSON.stringify(process.env.SOCKET_URL),
    API_VERSION: JSON.stringify(process.env.API_VERSION)
  }
});

module.exports = {
  entry: {
    csocket: path.resolve(__dirname, '../src/assets/js/socket/index.js'),
    bloader: path.resolve(__dirname, '../src/assets/js/loader/js/loader.js'),
    dmain: path.resolve(__dirname, '../src/index.jsx')
  },
  resolve: {
    extensions: [' ', '.js', '.jsx'],
    alias: {
      Assets: path.resolve(__dirname, '../src/assets'),
      Utils: path.resolve(__dirname, '../src/utils'),
      Actions: path.resolve(__dirname, '../src/actions'),
      Routes: path.resolve(__dirname, '../src/Routes'),
      Public: path.resolve(__dirname, '../public'),
      Components: path.resolve(__dirname, '../src/components'),
      HomePage: path.resolve(__dirname, '../src/components/homepage'),
      Forms: path.resolve(__dirname, '../src/components/forms'),
      General: path.resolve(__dirname, '../src/components/general'),
      Modal: path.resolve(__dirname, '../src/components/Modal')
    }
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|jpeg|gif|png)?$/,
        loader: 'url-loader',
        exclude: /node_modules/,
        options: {
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(eot|ttf|otf|svg)(\?.*$|$)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        exclude: /node_modules/
      }, {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      }, {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    ProvidePlugin,
    DefinePlugin
  ],
  optimization: {
    splitChunks: {
      name: 'acommon',
      filename: 'js/acommon.js',
      minChunks: 2,
      chunks: 'all'
    }
  },
  stats: {
    colors: true
  },
  node: {
    fs: 'empty'
  }
};