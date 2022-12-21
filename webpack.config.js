"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _webpackVendorReplace = _interopRequireDefault(require("./webpack.vendorReplace.plugin"));

var _index = _interopRequireDefault(require("./index"));

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

var manifest = JSON.parse(_fs.default.readFileSync(_path.default.join(process.cwd(), 'manifest.json')));
var type = Object.keys(manifest)[0];
var tag = Object.keys(manifest[type])[0];
var vendors = (0, _index.default)();

var _default = Object.assign({}, {
  devtool: 'eval',
  mode: 'development',
  entry: {
    element: process.cwd() + '/' + tag + '/index.js'
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
    assetModuleFilename: 'assets/[hash][ext][query]'
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
          // test: /[\\/]node_modules[\\/]/,
          test: function test(module) {
            var found = false;

            if (module.resource && module.resource.indexOf('node_modules') !== -1) {
              vendors.forEach(function (vendor) {
                if (module.resource && module.resource.indexOf(vendor) !== -1) {
                  if (vendor === 'react') {
                    // check for only react not the other packages
                    if (module.resource.indexOf('node_modules/react/') !== -1) {
                      found = true;
                    }
                  } else {
                    found = true;
                  }
                }
              });
            }

            return found;
          },
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
      }, {
        loader: 'less-loader',
        options: {
          lessOptions: {
            math: 'always'
          }
        }
      }]
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
      fs: require.resolve('./lib/slim-fs.js'),
      http: false,
      https: false,
      stream: false
    }
  }
});

exports.default = _default;

