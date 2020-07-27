"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _webpack = _interopRequireDefault(require("webpack"));

var _index = _interopRequireDefault(require("./index"));

var _webpackVendorReplace = _interopRequireDefault(require("./webpack.vendorReplace.plugin"));

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

var manifest = JSON.parse(_fs.default.readFileSync(_path.default.join(process.cwd(), 'manifest.json')));
var type = Object.keys(manifest)[0];
var tag = Object.keys(manifest[type])[0];

var _default = Object.assign({}, {
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
    fs: 'empty'
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
  plugins: [new _miniCssExtractPlugin.default({
    filename: '[name].bundle.css'
  }), new _webpack.default.NamedModulesPlugin(), new _webpackVendorReplace.default(tag + '/index.js', type)],
  module: {
    rules: [{
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
      test: /\.css|\.less$/,
      exclude: [/styles\.css/, /editor\.css/],
      use: [{
        loader: _miniCssExtractPlugin.default.loader
      }, 'css-loader', {
        loader: 'postcss-loader',
        options: {
          plugins: function plugins() {
            return [require('autoprefixer')()];
          }
        }
      }, 'less-loader']
    }, {
      test: /\.svg/,
      use: {
        loader: 'svg-url-loader',
        options: {}
      }
    }, {
      test: /\.(png|jpe?g|gif)$/,
      use: 'url-loader?limit=10000&name=/images/[name].[ext]?[hash]'
    }, // inline base64 URLs for <=8k images, direct URLs for the rest.
    {
      test: /\.woff(2)?(\?.+)?$/,
      use: 'url-loader?limit=10000&mimetype=application/font-woff&name=/fonts/[name].[ext]?[hash]'
    }, {
      test: /\.(ttf|eot)(\?.+)?$/,
      use: 'file-loader?name=/fonts/[name].[ext]?[hash]'
    }, {
      test: /\.raw(\?v=\d+\.\d+\.\d+)?$/,
      use: 'raw-loader' // { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery&$=jquery' }

    }]
  }
});

exports.default = _default;

