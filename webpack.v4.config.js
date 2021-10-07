"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

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
    publicPath: 'auto',
    // Used to generate URL's
    filename: '[name].bundle.js',
    // Main bundle file
    chunkFilename: '[name].bundle.js',
    chunkLoadingGlobal: 'vcvWebpackJsonp4x',
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  optimization: {
    minimize: false,
    runtimeChunk: 'single',
    chunkIds: 'named',
    moduleIds: 'named',
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
  }), new _webpackVendorReplace.default(tag + '/index.js', type)],
  module: {
    rules: [{
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
          postcssOptions: {
            plugins: function plugins() {
              return [require('autoprefixer')()];
            }
          }
        }
      }, 'less-loader']
    }, {
      test: /\.(png|jpe?g|gif|svg|ttf|woff)$/,
      type: 'asset/resource'
    }, {
      test: /\.raw(\?v=\d+\.\d+\.\d+)?$/,
      use: 'raw-loader'
    }]
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      util: require.resolve('util/'),
      buffer: require.resolve('buffer/'),
      fs: false,
      http: false,
      https: false,
      stream: false
    }
  }
});

exports.default = _default;

