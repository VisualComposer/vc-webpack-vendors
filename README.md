# vc-webpack-vendors
[![VC Webpack Vendors](https://circleci.com/gh/VisualComposer/vc-webpack-vendors.svg?style=shield)](https://circleci.com/gh/circleci/circleci-docs)

This package contains Visual Composer vendors for backward compatibility and element.bundle.js vendors extracting.

- Update this package in package.json always when you updating an element

- Package.json example:
```
{
  "name": "test-vc-webpack-vendors",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "standard": "standard --version && standard",
    "build": "webpack --version && webpack --config=./node_modules/vc-webpack-vendors/webpack.v4.config.js --progress --colors",
    "build-production": "webpack --version && webpack --config=./node_modules/vc-webpack-vendors/webpack.v4.config.production.js -p",
    "watch": "webpack --version && webpack --config=./node_modules/vc-webpack-vendors/webpack.v4.config.js --progress --colors --watch"
  },
  "devDependencies": {
    "vc-webpack-vendors": "https://github.com/AngeIII/vc-webpack-vendors.git#test-wepback-update"
  },
  "resolutions": {
    "core-js": "3.2.1",
    "postcss": "7.0.18",
    "css-loader": "3.2.0",
    "color-name": "1.1.4",
    "eslint": "5.15.1",
    "less": "3.10.3"
  },
  "browserslist": [
    "ie >= 11",
    "last 2 version"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/VisualComposer/vc-webpack-vendors.git"
  },
  "keywords": [
    "webpack",
    "vendor"
  ],
  "babel": {
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ],
    "plugins": [
      "@babel/plugin-transform-runtime",
      "@babel/plugin-proposal-class-properties"
    ]
  },
  "standard": {
    "parser": "babel-eslint",
    "ignore": [
      "public/dist/",
      "tests/",
      "**/public/js"
    ],
    "rules": {
      "jsx-quotes": [
        2,
        "prefer-single"
      ],
      "import/no-webpack-loader-syntax": "off"
    }
  },
  "resolutions": {
    "core-js": "3.2.1",
    "postcss": "7.0.18",
    "css-loader": "3.2.0",
    "color-name": "1.1.4",
    "eslint": "5.15.1",
    "less": "3.10.3"
  },
  "author": "",
  "license": "ISC"
}

```
