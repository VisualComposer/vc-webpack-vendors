import path from 'path'
import webpack from 'webpack'
import TerserPlugin from 'terser-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import WebpackVendorReplacePlugin from './webpack.vendorReplace.plugin.babel'

import config from './webpack.config.4x.babel'

const tag = __dirname.split(path.sep).pop()

delete config.devtool

module.exports = Object.assign({}, config, {
  mode: 'production',
  optimization: Object.assign({}, config.optimization, {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          safari10: true
        }
      })
    ]
  }),
  plugins: [
    new ExtractTextPlugin('[name].bundle.css'),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new WebpackVendorReplacePlugin(tag + '/index.js')
  ]
})
