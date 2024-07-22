const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "index.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: 'body'
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        fallback: {
            stream: require.resolve('stream-browserify'),
            assert: require.resolve('assert/'),
            buffer: require.resolve('buffer/'),
            process: require.resolve('process/browser'),
            crypto: require.resolve('crypto-browserify'),
            vm: require.resolve('vm-browserify'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: "defaults",
                                useBuiltIns: "entry",
                                corejs: 3  // 确保使用了 core-js 3
                            }]
                        ]
                    }
                }
            }
        ]
    }
}
