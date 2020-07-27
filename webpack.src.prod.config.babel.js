import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import TerserWebpackPlugin from 'terser-webpack-plugin'
import VendorReplacePlugin from './webpack.vendorReplace.plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import webpackDevConfig from './webpack.v4.config.js'

const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json')))
const type = Object.keys(manifest)[0]
const tag = Object.keys(manifest[type])[0]

delete webpackDevConfig.devtool

module.exports = Object.assign({}, webpackDevConfig, {
  mode: 'production',
  optimization: Object.assign({}, webpackDevConfig.optimization, {
    minimize: true,
    minimizer: [new TerserWebpackPlugin({
      terserOptions: {
        safari10: true
      }
    }), new OptimizeCSSAssetsPlugin()]
  }),
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }), new VendorReplacePlugin(tag + '/index.js', type)]
})
