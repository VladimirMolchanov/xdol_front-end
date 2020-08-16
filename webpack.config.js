var path = require('path');
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
        filename: './js/[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/'
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
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src/js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src/scss'),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
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
                loader: 'pug-loader'
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "./css/[name].css",
            chunkFilename: "./css/[id].css"
        }),
        new CopyWebpackPlugin({
            patterns: [
            {
                from: './src/fonts',
                to: './fonts',
                noErrorOnMissing: true
            },
            {
                from: './src/favicon',
                to: './favicon',
                noErrorOnMissing: true
            },
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
    ].concat(htmlPlugins)
};