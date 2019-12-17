"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _terserWebpackPlugin = _interopRequireDefault(require("terser-webpack-plugin"));

var _extractTextWebpackPlugin = _interopRequireDefault(require("extract-text-webpack-plugin"));

var _webpackVendorReplace = _interopRequireDefault(require("./webpack.vendorReplace.plugin"));

var _webpackV4Config = _interopRequireDefault(require("./webpack.v4.config.js"));

var split = process.cwd().split(_path.default.sep);

var tag = split.pop();

var type = split.pop().toLowerCase().indexOf('addon') !== -1 ? 'addon' : 'element';

delete _webpackV4Config.default.devtool;
module.exports = Object.assign({}, _webpackV4Config.default, {
  mode: 'production',
  optimization: Object.assign({}, _webpackV4Config.default.optimization, {
    minimize: true,
    minimizer: [new _terserWebpackPlugin.default({
      terserOptions: {
        safari10: true
      }
    })]
  }),
  plugins: [new _extractTextWebpackPlugin.default('[name].bundle.css'), new _webpack.default.NamedModulesPlugin(), new _webpack.default.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }), new _webpackVendorReplace.default(tag + '/index.js', type)]
});
