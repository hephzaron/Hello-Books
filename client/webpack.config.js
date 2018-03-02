const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
require('dotenv').config()

const {
    APP_ENV,
    HOST,
    PORT,
    ROOT_URL,
    API_KEY
} = process.env
const isDevelopment = APP_ENV === 'development';
const isProduction = APP_ENV === 'production';

const setDevTool = () => {
    if (isDevelopment) {
        return 'eval'
    } else if (isProduction) {
        return 'source-map'
    } else {
        return 'inline-source-map'
    }
}
const setPublicPath = () => {
    let publicPath
    if (isDevelopment) {
        publicPath = `http://localhost:${PORT}/`
    } else if (isProduction) {
        publicPath = `${ROOT_URL}`
    }
    return publicPath;
}

module.exports = {
    entry: [
        __dirname + "/client/src/index.jsx",
    ],
    output: {
        path: __dirname + "/client/dist",
        filename: 'bundle.js',
        publicPath: setPublicPath()
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
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                }),
            },
            {
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
        new HtmlWebpackPlugin({
            template: __dirname + "/client/public/index.html",
            inject: 'body'
        }),
        new ExtractTextPlugin('style.css'),
        new webpack.DefinePlugin({
            API_KEY: JSON.stringify(API_KEY)
        }),
        new webpack.HotModuleReplacementPlugin()

    ],
    resolve: {
        extensions: [' ', '.js', '.jsx'],
        alias: {
            Assets: path.resolve(__dirname, './client/src/assets'),
            Utils: path.resolve(__dirname, './client/src/utils'),
            Actions: path.resolve(__dirname, './client/src/actions'),
            Routes: path.resolve(__dirname, './client/src/Routes'),
            Public: path.resolve(__dirname, './client/public'),
            Components: path.resolve(__dirname, './client/src/components'),
            HomePage: path.resolve(__dirname, './client/src/components/homepage'),
            Forms: path.resolve(__dirname, './client/src/components/forms'),
            General: path.resolve(__dirname, './client/src/components/general'),
            Modal: path.resolve(__dirname, './client/src/components/Modal')
        }
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        compress: true,
        inline: true,
        host: HOST,
        contentBase: '/client/public',
        port: PORT
    },
    devtool: setDevTool()
}