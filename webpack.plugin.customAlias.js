"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * This plugin is used to create backward compatibility aliases for un-updated old elements or any other packages
 * That contains references to old libraries like, babel-runtime (not the @babel/runtime) and etc
 */
var VcWebpackCustomAliasPlugin =
/*#__PURE__*/
function () {
  function VcWebpackCustomAliasPlugin(aliasesMap, isDev) {
    _classCallCheck(this, VcWebpackCustomAliasPlugin);

    this.aliasesMap = aliasesMap;
    this.isDev = isDev;
  }

  _createClass(VcWebpackCustomAliasPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      var _this = this;

      compiler.hooks.compilation.tap('VcWebpackCustomAliasPlugin', function (compilation) {
        compilation.mainTemplate.hooks.require.tap("VcWebpackCustomAliasPluginMainTemplate", function (source, chunk, hash) {
          return "\n  var aliases = function (moduleId) {\n  var aliasesMap = " + JSON.stringify(_this.aliasesMap) + ";\n  if (moduleId && typeof aliasesMap[ moduleId ] !== 'undefined') {\n    moduleId = aliasesMap[ moduleId ];\n  } else if (moduleId && moduleId.indexOf && moduleId.indexOf('babel-runtime/helpers/') !== -1) {\n    moduleId = moduleId.replace('babel-runtime/helpers/', '@babel/runtime/helpers/');\n  } else if (moduleId && moduleId.indexOf && moduleId.indexOf('babel-runtime/core-js/object/') !== -1) {\n    moduleId = moduleId.replace('babel-runtime/core-js/object/', 'core-js/fn/object/');\n  }\n\n  return moduleId;\n};\nmoduleId = aliases(moduleId);\n\n" + (_this.isDev ? "\nif(typeof modules[moduleId] === 'undefined') {\n  console.warn('calling module', moduleId, modules[moduleId], modules);\n  console.trace();\n}\n" : '') + source;
        });
      });
    }
  }]);

  return VcWebpackCustomAliasPlugin;
}();

module.exports = VcWebpackCustomAliasPlugin;
