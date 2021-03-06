var path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin= require('copy-webpack-plugin');
const fs = require('fs')

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            inject: true,
        })
    })
}


const htmlPlugins = generateHtmlPlugins('./src/html/views')

module.exports = {
    entry: {
        app: './src/js/index.js',
        style: './src/scss/index.sass'
    },
    output: {
        filename: './js/[name]-[hash].js',
        path: path.resolve(__dirname, 'dist/'),
        publicPath: ""
    },
    devServer: {
        port: 8081,
        overlay: {
            warning: true,
            errors: true
        }
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: "babel-loader"
                }
            },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     include: path.resolve(__dirname, 'src/js'),
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['env']
            //         }
            //     }
            // },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    "style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: 'postcss.config.js' } }
                    },
                ]
            },
            {
                test: /\.(sass|scss)$/,
                exclude: /(node_modules|bower_components)/,
                // include: path.resolve(__dirname, 'src/scss'),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            sourceMap: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: 'postcss.config.js' } }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.pug$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'pug-loader'
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /(node_modules|bower_components)/,
                include: path.resolve(__dirname, 'src/fonts'),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "./css/[name]-[hash].css",
            chunkFilename: "./css/[id]-[hash].css"
        }),
        new CopyWebpackPlugin({
            patterns: [
            // {
            //     from: './src/favicon',
            //     to: './favicon',
            //     noErrorOnMissing: true
            // },
            {
                from: './src/img',
                to: './img',
                noErrorOnMissing: true
            },
            {
                from: './src/uploads',
                to: './uploads',
                noErrorOnMissing: true
            }
        ]}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ].concat(htmlPlugins)
};