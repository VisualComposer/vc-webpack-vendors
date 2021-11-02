import path from 'path'
import vendors from '../index'
import VirtualModulesPlugin from 'webpack-virtual-modules'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import Collector from '../builder/tools/webpack-collector-5x'
import VcWebpackCustomAliasPlugin from '../webpack.plugin.customAlias'

const virtualModules = new VirtualModulesPlugin({
  'node_modules/jquery/dist/jquery.js': 'module.exports = window.jQuery;',
})

export default Object.assign(
  {},
  {
    devtool: 'eval',
    mode: 'development',
    entry: {
      hub: './builder/public/hub',
      vendor: vendors(),
    },
    output: {
      path: path.resolve(process.cwd(), 'public/dist/'),
      // Assets dist path
      publicPath: '.',
      // Used to generate URL's
      filename: '[name].bundle.js',
      // Main bundle file
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
      virtualModules,
      new VcWebpackCustomAliasPlugin(false, true),
    ],
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
            'css-loader',
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
          test: /\.svg/,
          use: {
            loader: 'svg-url-loader',
            options: {},
          },
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: 'url-loader?limit=10000&name=/images/[name].[ext]?[hash]',
        }, // inline base64 URLs for <=8k images, direct URLs for the rest.
        {
          test: /\.woff(2)?(\?.+)?$/,
          use: 'url-loader?limit=10000&mimetype=application/font-woff&name=/fonts/[name].[ext]?[hash]',
        },
        {
          test: /\.(ttf|eot)(\?.+)?$/,
          use: 'file-loader?name=/fonts/[name].[ext]?[hash]',
        },
        {
          test: /\.raw(\?v=\d+\.\d+\.\d+)?$/,
          use: 'raw-loader', // { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery&$=jquery' }
        },
      ],
    },
    resolve: {
      alias: { public: path.resolve(__dirname, '../builder/public/') },
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        util: require.resolve('util/'),
        buffer: require.resolve('buffer/'),
        fs: false,
        http: false,
        https: false,
        stream: false,
      },
    },
  }
)
