"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var aliasesMap = require('./webpack.oldlibs.aliasesMap');

module.exports = function webpackVendors() {
    return _toConsumableArray(new Set([
        'react',
        'react-dom',
        'react-dom/server',
        'create-react-class',
        'classnames',
        'striptags',
        'lodash',
        'vc-cake',
        'vc-helpers',
        'pako',
        'base-64',
        '@babel/runtime/helpers/objectSpread',
        '@babel/runtime/helpers/defineProperty',
        'postcss',
        // 'clean-css',
        'immutable',
        'bn.js',
        // some packages requires react/jsx-runtime
        'react/jsx-runtime',
    ].concat(Object.values(aliasesMap)).map(function (i) {
        var key = i.replace('./node_modules/', '');

        // @babel/runtime have strictly specified exports
        if (key.indexOf('@babel/runtime') !== -1) {
            key = key.replace('/index.js', '');
            key = key.replace('.js', ''); // fix for 7.15.4
        }
        if (key.indexOf('react/index.js') !== -1) {
          key = ''
        }
      return key;
    }).filter((key) => {
      return key
    })));
};
