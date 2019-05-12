import { resolve } from "./helper";

const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge')
import baseWebpackConfig from './_common.client';
import * as  webpack from 'webpack';
import consts from './consts';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let app = process.env.APP;
if (!app) {
    app = 'homepage'
}
var t = new Date().valueOf();


export default merge(baseWebpackConfig, {
    name: 'client',
    entry: [
        `./client/src/index.tsx`
    ],
    output: {
        path: resolve('dist/client'),
        filename: 'build.js',
        publicPath: '/'
    },
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: `!!handlebars-loader!client/src/index.html`,
            templateParameters: consts.weback_template_variables
        }),
        new webpack.EnvironmentPlugin({
            IS_BROWSER: "true"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin(consts.weback_define_variables),
    ],
    devServer: {
        // host: '192.168.2.9',
        host: '0.0.0.0',
        port: 8081,
        historyApiFallback: true,
    },
    node: { fs: 'empty' }
});