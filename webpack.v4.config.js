"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _extractTextWebpackPlugin = _interopRequireDefault(require("extract-text-webpack-plugin"));

var _index = _interopRequireDefault(require("./index"));

var _webpackVendorReplace = _interopRequireDefault(require("./webpack.vendorReplace.plugin"));

var split = process.cwd().split(_path.default.sep);

var tag = split.pop();

var type = split.pop().toLowerCase().indexOf('addon') !== -1 ? 'addon' : 'element';

module.exports = Object.assign({}, {
  devtool: 'eval',
  mode: 'development',
  entry: {
    element: process.cwd() + '/' + tag + '/index.js',
    vendor: (0, _index.default)()
  },
  output: {
    path: _path.default.resolve(process.cwd(), 'public/dist/'),
    // Assets dist path
    publicPath: '.',
    // Used to generate URL's
    filename: '[name].bundle.js',
    // Main bundle file
    chunkFilename: '[name].bundle.js',
    jsonpFunction: 'vcvWebpackJsonp4x'
  },
  node: {
    'fs': 'empty'
  },
  optimization: {
    minimize: false,
    runtimeChunk: 'single',
    namedModules: true,
    splitChunks: {
      cacheGroups: {
        default: false,
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        },
        element: {
          chunks: 'initial',
          name: 'element',
          test: 'element',
          enforce: true
        }
      }
    }
  },
  plugins: [ new _extractTextWebpackPlugin.default('[name].bundle.css'), new _webpack.default.NamedModulesPlugin(), new _webpackVendorReplace.default(tag + '/index.js', type) ],
  module: {
    rules: [ {
      parser: {
        amd: false
      }
    }, {
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    }, {
      test: /\.js$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: _extractTextWebpackPlugin.default.extract({
        fallback: 'style-loader',
        use: [ 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: function plugins () {
              return [ require('autoprefixer')() ];
            }
          }
        }, 'less-loader' ]
      }),
      exclude: [ /styles\.css/, /editor\.css/ ]
    }, {
      test: /\.less$/,
      use: _extractTextWebpackPlugin.default.extract({
        fallback: 'style-loader',
        use: [ 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: function plugins () {
              return [ require('autoprefixer')() ];
            }
          }
        }, 'less-loader' ]
      })
    }, // use ! to chain loaders./
      {
        test: /\.(png|jpe?g|gif)$/,
        use: 'url-loader?limit=10000&name=/images/[name].[ext]?[hash]'
      }, // inline base64 URLs for <=8k images, direct URLs for the rest.
      {
        test: /\.woff(2)?(\?.+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff&name=/fonts/[name].[ext]?[hash]'
      }, {
        test: /\.(ttf|eot|svg)(\?.+)?$/,
        use: 'file-loader?name=/fonts/[name].[ext]?[hash]'
      }, {
        test: /\.raw(\?v=\d+\.\d+\.\d+)?$/,
        use: 'raw-loader' // { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery&$=jquery' }

      } ]
  },
  resolve: {
    alias: {
      'public': _path.default.resolve(__dirname, 'public')
    }
  }
});
