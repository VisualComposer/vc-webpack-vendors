"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _webpack = _interopRequireDefault(require("webpack"));

var _terserWebpackPlugin = _interopRequireDefault(require("terser-webpack-plugin"));

var _webpackVendorReplace = _interopRequireDefault(require("./lib/webpack.vendorReplace.plugin"));

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

var _cssMinimizerWebpackPlugin = _interopRequireDefault(require("css-minimizer-webpack-plugin"));

var _webpackConfig = _interopRequireDefault(require("./webpack.config.js"));

var manifest = JSON.parse(_fs.default.readFileSync(_path.default.join(process.cwd(), 'manifest.json')));
var type = Object.keys(manifest)[0];
var tag = Object.keys(manifest[type])[0];
delete _webpackConfig.default.devtool;
module.exports = Object.assign({}, _webpackConfig.default, {
  mode: 'production',
  optimization: Object.assign({}, _webpackConfig.default.optimization, {
    minimize: true,
    mangleExports: false,
    minimizer: [new _terserWebpackPlugin.default({
      terserOptions: {
        safari10: true
      }
    }), new _cssMinimizerWebpackPlugin.default()]
  }),
  plugins: [new _miniCssExtractPlugin.default({
    filename: '[name].bundle.css'
  }), new _webpack.default.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      DEBUG: JSON.stringify('false'),
      platform: JSON.stringify('unix'),
      NODE_DEBUG: JSON.stringify('false')
    },
    'process.platform': JSON.stringify('unix'),
    'fs.promises.readFile': JSON.stringify(false)
  }), new _webpackVendorReplace.default(tag + '/index.js', type)]
});

