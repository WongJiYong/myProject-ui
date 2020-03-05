const resolve = require('path').resolve;
const url = require('url');
const webpack = require('webpack');
const common = require('./webpack.config.js');
const merge = require('webpack-merge');

module.exports = merge(common, {
    output: {
        publicPath: 'https://localhost:8080/',
    },
    devServer: {
        // contentBase: './dist',
        hot: true,
        https: true,
        hotOnly: true,
        proxy: {
            '/api': {
                target: 'https://127.0.0.1',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        // plugins: [
            // new webpack.NamedModulesPlugin(),
            // new webpack.HotModuleReplacementPlugin()
        // ],
        historyApiFallback: {
            index: url.parse('/assets/').pathname
        }
    },
    devtool: 'inline-source-map',
});
