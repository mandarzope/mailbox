const MiniCssExtractPlugin = require("mini-css-extract-plugin");
import { resolve } from "./helper";

export default {
    resolve: {
        alias: {
            '@': resolve('src')
        },
        extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'client/tsconfig.webpack.client.json',
                    happyPackMode: true,
                    transpileOnly: true
                },
                exclude: [/node_modules/],
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader?name=[name].[hash].[ext]'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    'sass-loader',
                ]
            }
        ]
    },
    optimization: {
        minimize: false
    },
    plugins: [

    ]
};