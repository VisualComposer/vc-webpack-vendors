import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import vendors from './index'
import VendorReplacePlugin from './webpack.vendorReplace.plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json')))
const type = Object.keys(manifest)[0]
const tag = Object.keys(manifest[type])[0]

export default Object.assign({}, {
  devtool: 'eval',
  mode: 'development',
  entry: {
    element: process.cwd() + '/' + tag + '/index.js',
    vendor: vendors()
  },
  output: {
    path: path.resolve(process.cwd(), 'public/dist/'),
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
    }),
    new webpack.NamedModulesPlugin(),
    new VendorReplacePlugin(tag + '/index.js', type)
  ],
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
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: function plugins () {
              return [require('autoprefixer')()];
            }
          }
        },
        'less-loader'
      ],
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
      }]
  }
})
