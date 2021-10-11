var vendors = require('../index')

vendors().forEach((item) => {
  if (item.indexOf('runtime/helper') > -1) {
    item = item.replace('.js', '') // fix for 7.15.4
    var library = require(item)
    console.log({ name: item, library: library })
  } else {
    var library = require(item)
    console.log({ name: item, library: library })
  }
})

// some bc tests

// var library = require('babel-runtime/helpers/extends.js');
// console.log({name:'babel-runtime/helpers/extends.js', library:library})

// var library = require('@babel/runtime/helpers/extends.js');
// console.log({name:'@babel/runtime/helpers/extends.js', library:library})

var library = require('@babel/runtime/helpers/extends')
console.log({ name: '@babel/runtime/helpers/extends', library: library })
