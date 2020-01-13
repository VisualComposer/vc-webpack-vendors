"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _webpack = _interopRequireDefault(require("webpack"));

var _terserWebpackPlugin = _interopRequireDefault(require("terser-webpack-plugin"));

var _extractTextWebpackPlugin = _interopRequireDefault(require("extract-text-webpack-plugin"));

var _webpackVendorReplace = _interopRequireDefault(require("./webpack.vendorReplace.plugin"));

var _webpackV4Config = _interopRequireDefault(require("./webpack.v4.config.js"));

var manifest = JSON.parse(_fs.default.readFileSync(_path.default.join(process.cwd(), 'manifest.json')));

var type = Object.keys(manifest)[0];

var tag = Object.keys(manifest[type])[0];

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
