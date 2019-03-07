"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var aliasesMap = require('./webpack.oldlibs.aliasesMap');

module.exports = function webpackVendors() {
    return _toConsumableArray(new Set([
        'react',
        'react-dom',
        'create-react-class',
        'classnames',
        'lodash',
        'vc-cake',
        'pako',
        'base-64',
        '@babel/runtime/helpers/objectSpread.js',
        '@babel/runtime/helpers/defineProperty.js'
    ].concat(Object.values(aliasesMap)))).map(function (i) {
        return i.replace('./node_modules/', '');
    });
};
