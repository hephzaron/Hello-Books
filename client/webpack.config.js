const dotEnv = require('dotenv');
const webpackProd = require('./client/config/webpack.prod');
const webpackDev = require('./client/config/webpack.dev');

dotEnv.config();

const { NODE_ENV } = process.env;

let config;

switch (NODE_ENV) {
  case 'development':
    config = webpackDev;
    break;

  case 'production':
    config = webpackProd;
    break;

  default:
    config = {};
}

module.exports = config;