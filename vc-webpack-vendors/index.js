import React from 'react'
// import '../builder/public/sources/less/states/common.less'
// import '../builder/public/sources/less/wpbackend-switcher/init.less'
// import '../builder/public/components/deactivationFeedbackPopup/deactivationFeedbackPopup.js'
export default class TestVcWebpack extends React.Component {
  render () {
    // testing @babel/preset-env
    let map = new Map()
    let promise = new Promise()
    let json = require('./test.json')
    let rawAuto = require('./test-raw.raw')
    let rawManual = require('raw-loader!./test-raw.txt')
    let css = require('./test-css.css')
    let withSvg = require('./test-svg-in-less.css')
    let justSvg = require('./bold.svg')
    let less = require('./test-less.less')
    let ignoreStyleCss = require('raw-loader!./styles.css')
    let ignoreEditorCss = require('raw-loader!./editor.css')
    return <div>
      <span>Hello</span>
    </div>
  }
}
