"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _webpackSources = require("webpack-sources");

var VendorReplacePlugin =
/*#__PURE__*/
function () {
  function VendorReplacePlugin(entry) {
    (0, _classCallCheck2.default)(this, VendorReplacePlugin);
    this.entry = entry;
  }

  (0, _createClass2.default)(VendorReplacePlugin, [{
    key: "apply",
    value: function apply(compiler) {
      var _this = this;

      compiler.hooks.compilation.tap('VendorReplacePlugin', function (compilation) {
        var handler = function handler(modules) {
          modules.map(function (module) {
            if (module.id) {
              // Replace ../../node_modules
              module.id = module.id.replace(/(\.\.\/)+(node_modules)/, './$2');
            }

            return module;
          });
        };

        compilation.hooks.moduleIds.tap('VendorReplacePlugin', handler); // Intercept default chunk template plugin

        compilation.chunkTemplate.hooks.render.intercept({
          'register': function register(options) {
            if (options.name === 'JsonpChunkTemplatePlugin') {
              options.fn = function (modules, chunk) {
                var jsonpFunction = compilation.chunkTemplate.outputOptions.jsonpFunction;
                var globalObject = compilation.chunkTemplate.outputOptions.globalObject;
                var source = new _webpackSources.ConcatSource();
                source.add("(".concat(globalObject, "[").concat(JSON.stringify(jsonpFunction), "] = ").concat(globalObject, "[").concat(JSON.stringify(jsonpFunction), "] || []).push([").concat(JSON.stringify(chunk.ids), ","));
                source.add(modules);
                var entries = [chunk.entryModule].filter(Boolean).map(function (m) {
                  return [m.id].concat(Array.from(chunk.groupsIterable)[0].chunks.filter(function (c) {
                    return c !== chunk;
                  }).map(function (c) {
                    return c.id;
                  }));
                });

                if (entries.length > 0) {
                  source.add(",".concat(JSON.stringify(entries)));
                } // Add manual element entry point


                source.add(",[['./".concat(_this.entry, "']]])"));
                return source;
              };
            }

            return options;
          }
        });
      });
    }
  }]);
  return VendorReplacePlugin;
}();

exports.default = VendorReplacePlugin;

