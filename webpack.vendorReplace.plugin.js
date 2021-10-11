'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')
var JavascriptModulesPlugin = require('webpack/lib/javascript/JavascriptModulesPlugin')
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck')
)

var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass')
)

var _webpackSources = require('webpack-sources')

var VendorReplacePlugin =
  /*#__PURE__*/
  (function () {
    function VendorReplacePlugin (entry, type = 'elements') {
      ;(0, _classCallCheck2.default)(this, VendorReplacePlugin)
      this.entry = entry
      this.type = type
    }

    ;(0, _createClass2.default)(VendorReplacePlugin, [
      {
        key: 'apply',
        value: function apply (compiler) {
          var _this = this
          compiler.hooks.afterPlugins.tap(
            'VendorReplacePlugin',
            function (comp) {
              comp.hooks.compilation.tap(
                'VendorReplacePlugin',
                function (compilation) {
                  var handler = function handler (modules) {
                    compilation.chunks.forEach((chunk) => {
                      compilation.chunkGraph
                        .getChunkModules(chunk)
                        .forEach((module) => {
                          // module is available here
                          var id = compilation.chunkGraph.getModuleId(module)

                          if (typeof id === 'string') {
                            // Replace ../../node_modules
                            id = id.replace(/(\.\.\/)+(node_modules)/, './$2')
                            if (
                              _this.type === 'addons' &&
                              id &&
                              id.indexOf(_this.entry) !== -1
                            ) {
                              id = './addon/' + _this.entry
                            }
                            compilation.chunkGraph.setModuleId(module, id)
                          }
                        })
                    })
                  }

                  compilation.hooks.moduleIds.tap(
                    'VendorReplacePlugin',
                    handler
                  ) // Intercept default chunk template plugin

                  JavascriptModulesPlugin.getCompilationHooks(
                    compilation
                  ).renderChunk.intercept({
                    register: function register (options) {
                      if (
                        options.name === 'ArrayPushCallbackChunkFormatPlugin'
                      ) {
                        options.fn = (modules, renderContext) => {
                          const { chunk, runtimeTemplate } = renderContext
                          var source = new _webpackSources.ConcatSource()
                          const chunkLoadingGlobal =
                            runtimeTemplate.outputOptions.chunkLoadingGlobal
                          const globalObject =
                            runtimeTemplate.outputOptions.globalObject
                          source.add(
                            `(${globalObject}[${JSON.stringify(
                              chunkLoadingGlobal
                            )}] = ${globalObject}[${JSON.stringify(
                              chunkLoadingGlobal
                            )}] || []).push([`
                          )
                          source.add(`${JSON.stringify(chunk.ids)},`)
                          source.add(modules)
                          if (_this.type === 'addons') {
                            source.add(
                              ",[['./addon/".concat(_this.entry, "']]])")
                            )
                          } else {
                            source.add(",[['./".concat(_this.entry, "']]])"))
                          }
                          return source
                        }
                      }

                      return options
                    },
                  })
                }
              )
            }
          )
        },
      },
    ])
    return VendorReplacePlugin
  })()

exports.default = VendorReplacePlugin
