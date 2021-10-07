import path from 'path'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import VirtualModulesPlugin from 'webpack-virtual-modules'
import VcWebpackCustomAliasPlugin from '../webpack.plugin.customAlias'
import webpackVendors from '../index'
import Collector from '../builder/tools/webpack-collector-5x'

const virtualModules = new VirtualModulesPlugin({
  'node_modules/jquery/dist/jquery.js': 'module.exports = window.jQuery;',
})

export default {
  devtool: 'eval',
  mode: 'development',
  entry: {
    wp: './builder/public/editor',
    pe: './builder/public/pageEditable',
    front: './builder/public/frontView',
    wpbackendswitch: './builder/public/backendSwitch.js',
    wpbase: './builder/public/base',
    wpUpdate: './builder/public/activation',
    wpVcSettings: './builder/public/wordpressSettings',
    hub: './builder/public/hub',
    vendor: webpackVendors(),
  },
  output: {
    path: path.resolve(__dirname, '../builder/public/dist/'), // Assets dist path
    publicPath: 'auto', // Used to generate URL's
    assetModuleFilename: 'assets/[hash][ext][query]',
    filename: '[name].bundle.js', // Main bundle file
    chunkFilename: '[name].bundle.js',
    chunkLoadingGlobal: 'vcvWebpackJsonp4x',
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
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new Collector({
      wp: {
        modules: [
          'updateContent',
          'layout',
          'wordpressWorkspace',
          'insights',
          'elementLimit',
        ],
        services: [
          'dataManager',
          'utils',
          'roleManager',
          'document',
          'wordpress-post-data',
          'dataProcessor',
          'cook',
          'sharedAssetsLibrary',
          'elementAssetsLibrary',
          'actionsManager',
          'rulesManager',
          'modernAssetsStorage',
          'stylesManager',
          'wpMyTemplates',
          'hubElements',
          'elementAccessPoint',
          'hubAddons',
          'renderProcessor',
          'api',
        ],
      },
      hub: {
        services: [
          'dataManager',
          'utils',
          'roleManager',
          'document',
          'wordpress-post-data',
          'dataProcessor',
          'cook',
          'sharedAssetsLibrary',
          'elementAssetsLibrary',
          'actionsManager',
          'rulesManager',
          'modernAssetsStorage',
          'stylesManager',
          'wpMyTemplates',
          'hubElements',
          'elementAccessPoint',
          'hubAddons',
          'renderProcessor',
          'api',
        ],
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        DEBUG: JSON.stringify('true'),
        NODE_DEBUG: JSON.stringify('true'),
      },
      'process.platform': JSON.stringify('unix'),
      'fs.promises.readFile': JSON.stringify(false),
    }),
    virtualModules,
    new VcWebpackCustomAliasPlugin(false, true),
  ],
  amd: false,
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css|\.less$/,
        exclude: [/styles\.css/, /editor\.css/],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: function plugins() {
                  return [require('autoprefixer')()]
                },
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                math: 'always',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ttf|woff)$/,
        type: 'asset/resource',
      },
      // {
      //   test: /\.(png|jpe?g|gif|ttf|eof|woff)$/,
      //   use: 'url-loader?limit=20000&name=/images/[name].[ext]?[hash]',
      // }, // inline base64 URLs for <=8k images, direct URLs for the rest.
      // {
      //   test: /\.woff(2)?(\?.+)?$/,
      //   use: 'url-loader?limit=10000&mimetype=application/font-woff&name=/fonts/[name].[ext]?[hash]',
      // },
      // {
      //   test: /\.svg/,
      //   use: {
      //     loader: 'svg-url-loader',
      //     options: {},
      //   },
      // },
      // {
      //   test: /\.(ttf|eot)(\?.+)?$/,
      //   use: 'file-loader?name=/fonts/[name].[ext]?[hash]',
      // },
      {
        test: /\.raw(\?v=\d+\.\d+\.\d+)?$/,
        use: 'raw-loader', // { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery&$=jquery' }
      },
    ],
  },
  resolve: {
    alias: { public: path.resolve(__dirname, '../builder/public/') },
    fallback: {
      amd: false,
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      util: require.resolve('util/'),
      buffer: require.resolve('buffer/'),
      fs: require.resolve('./slim-fs.js'),
      http: false,
      https: false,
      stream: require.resolve('stream-browserify'),
    },
  },
}
