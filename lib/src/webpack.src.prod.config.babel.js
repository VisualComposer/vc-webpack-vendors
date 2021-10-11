import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import TerserWebpackPlugin from 'terser-webpack-plugin'
import VendorReplacePlugin from './lib/webpack.vendorReplace.plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import webpackDevConfig from './webpack.config.js'

const manifest = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'manifest.json'))
)
const type = Object.keys(manifest)[0]
const tag = Object.keys(manifest[type])[0]

delete webpackDevConfig.devtool

module.exports = Object.assign({}, webpackDevConfig, {
  mode: 'production',
  optimization: Object.assign({}, webpackDevConfig.optimization, {
    minimize: true,
    mangleExports: false,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          safari10: true,
        },
      }),
      new CssMinimizerPlugin(),
    ],
  }),
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        DEBUG: JSON.stringify('false'),
        platform: JSON.stringify('unix'),
        NODE_DEBUG: JSON.stringify('false'),
      },
      'process.platform': JSON.stringify('unix'),
      'fs.promises.readFile': JSON.stringify(false),
    }),
    new VendorReplacePlugin(tag + '/index.js', type),
  ],
})
