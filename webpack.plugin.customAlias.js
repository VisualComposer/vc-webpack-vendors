'use strict'

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

var JavascriptModulesPlugin = require('webpack/lib/javascript/JavascriptModulesPlugin')
var defaultAliasesMap = require('./webpack.oldlibs.aliasesMap')

/**
 * This plugin is used to create backward compatibility aliases for un-updated old elements or any other packages
 * That contains references to old libraries like, babel-runtime (not the @babel/runtime) and etc
 */
var VcWebpackCustomAliasPlugin =
  /*#__PURE__*/
  (function () {
    function VcWebpackCustomAliasPlugin(aliasesMap, isDev = false) {
      _classCallCheck(this, VcWebpackCustomAliasPlugin)

      this.aliasesMap = aliasesMap ? aliasesMap : defaultAliasesMap
      this.isDev = isDev
    }

    _createClass(VcWebpackCustomAliasPlugin, [
      {
        key: 'apply',
        value: function apply(compiler) {
          var _this = this

          compiler.hooks.compilation.tap(
            'VcWebpackCustomAliasPlugin',
            function (compilation) {
              JavascriptModulesPlugin.getCompilationHooks(
                compilation
              ).renderMain.tap('vcwb', function (finalSource, renderContext) {
                let source = finalSource
                  .source()
                  .replace(
                    '__webpack_require__.d = function(exports, definition) {',
                    "__webpack_require__.d = function(exports, definition, def) {if(typeof def !== 'undefined') {Object.defineProperty(exports, definition, { enumerable: true, get: def });return;}"
                  )
                source = source.replace(
                  'var runtime = data[2];',
                  "var runtime = data[2];if(chunkIds[0] === 'element' || chunkIds[0] === 0) {chunkIds[0] = runtime[0][0];}"
                )
                source = source.replace(
                  'if(runtime) var result = runtime(__webpack_require__);',
                  "if(typeof runtime === 'function') { var result = runtime(__webpack_require__); } else {var cb = function(__webpack_require__) { var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }; var __webpack_exports__ = (__webpack_exec__(runtime[0][0])); }; var result = cb(__webpack_require__);}"
                )

                // fix default export in prod
                source = source.replace(
                  'module && module.__esModule',
                  'module && (module.__esModule || module.default)'
                )

                let fakeNamespace =
                  "__webpack_require__.t = function(value, mode) {if(mode & 1){ value = __webpack_require__(value);}if(mode & 8) {return value;}if((mode & 4) && typeof value === 'object' && value && value.__esModule){ return value;}var ns = Object.create(null);__webpack_require__.r(ns);Object.defineProperty(ns, 'default', { enumerable: true, value: value });	if(mode & 2 && typeof value != 'string') {for(var key in value) {_webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key))}};	return ns;};"

                source = source.replace(
                  '__webpack_require__.r = function(exports)',
                  fakeNamespace + '__webpack_require__.r = function(exports)'
                )

                return source
              })

              JavascriptModulesPlugin.getCompilationHooks(
                compilation
              ).renderRequire.tap(
                'VcWebpackCustomAliasPluginMainTemplate',
                function (source, chunk, hash) {
                  source =
                    '\n  var aliases = function (moduleId) {\n  var aliasesMap = ' +
                    JSON.stringify(_this.aliasesMap) +
                    ";\n  if (moduleId && typeof aliasesMap[ moduleId ] !== 'undefined') {\n    moduleId = aliasesMap[ moduleId ];\n  } else if (moduleId && moduleId.indexOf && moduleId.indexOf('babel-runtime/helpers/') !== -1) {\n    moduleId = moduleId.replace('babel-runtime/helpers/', '@babel/runtime/helpers/');\n  } else if (moduleId && moduleId.indexOf && moduleId.indexOf('babel-runtime/core-js/object/') !== -1) {\n    moduleId = moduleId.replace('babel-runtime/core-js/object/', 'core-js/fn/object/');\n  }\n\n  return moduleId;\n};\nmoduleId = aliases(moduleId);\n\n" +
                    (_this.isDev
                      ? "\nif(typeof __webpack_modules__[moduleId] === 'undefined') {\n  console.warn('calling module', moduleId, __webpack_modules__[moduleId], __webpack_modules__);\n  console.trace();\n}\n"
                      : '') +
                    source

                  return source
                }
              )
            }
          )
        },
      },
    ])

    return VcWebpackCustomAliasPlugin
  })()

module.exports = VcWebpackCustomAliasPlugin
