"use strict";

var path = require('path');

var webpack = require('webpack');

var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var HtmlWebpackPlugin = require('html-webpack-plugin');

var CopyWebpackPlugin = require('copy-webpack-plugin');

var fs = require('fs');

function generateHtmlPlugins(templateDir) {
  var templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(function (item) {
    var parts = item.split('.');
    var name = parts[0];
    var extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: "".concat(name, ".html"),
      template: path.resolve(__dirname, "".concat(templateDir, "/").concat(name, ".").concat(extension)),
      inject: true
    });
  });
}

var htmlPlugins = generateHtmlPlugins('./src/html/views');
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
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader"
      }
    }, // {
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
      use: ["style-loader", {
        loader: "css-loader",
        options: {
          modules: true
        }
      }]
    }, {
      test: /\.(sass|scss)$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, 'src/scss'),
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          sourceMap: true
        }
      }, {
        loader: "css-loader",
        options: {
          sourceMap: true
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: 'postcss.config.js'
          }
        }
      }, {
        loader: "sass-loader",
        options: {
          sourceMap: true
        }
      }]
    }, {
      test: /\.pug$/,
      loader: 'pug-loader'
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      include: path.resolve(__dirname, 'src/fonts'),
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      }]
    }, {
      test: /\.(jpg|png|svg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img/'
        }
      }]
    }]
  },
  plugins: [new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "./css/[name].css",
    chunkFilename: "./css/[id].css"
  }), new CopyWebpackPlugin({
    patterns: [{
      from: './src/favicon',
      to: './favicon',
      noErrorOnMissing: true
    }, {
      from: './src/img',
      to: './img',
      noErrorOnMissing: true
    }, {
      from: './src/uploads',
      to: './uploads',
      noErrorOnMissing: true
    }]
  }), new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  })].concat(htmlPlugins)
};