# vc-webpack-vendors
[![VC Webpack Vendors](https://circleci.com/gh/VisualComposer/vc-webpack-vendors.svg?style=shield)](https://www.npmjs.com/package/vc-webpack-vendors)

This package contains Visual Composer dependent packages for building tools.

## Use This package in Elements
- Add it into package.json `vc-webpack-vendors` (https://www.npmjs.com/package/vc-webpack-vendors)
- `yarn add vc-webpack-vendors`
- Update package.json with:
```
  "scripts": {
    "build": "./node_modules/.bin/webpack --config=../node_modules/vc-webpack-vendors/webpack.v4.config.js --progress --color",
    "build-production": "./node_modules/.bin/webpack --config=./node_modules/vc-webpack-vendors/webpack.v4.config.production.js --progress -p",
    "watch": "./node_modules/.bin/webpack --config=../node_modules/vc-webpack-vendors/webpack.v4.config.js --progress --color --watch"
  },
```
- To build development version of element just run `yarn build`
- For watch for changes `yarn watch`
- To build production ready JS files `yarn build-production`


### Elements package.json example:
```
{
  "name": "vcwb",
  "version": "dev",
  "license": "SEE LICENSE IN <https://visualcomposer.com/terms-of-use/>",
  "description": "Visual Composer Website Builder element",
  "main": "index.php",
  "repository": {
    "type": "git",
    "url": "git@github.com:Visualcomposer/builder.git"
  },
  "scripts": {
    "standard": "standard --version && standard",
    "build": "../node_modules/.bin/webpack --config=./node_modules/vc-webpack-vendors/webpack.v4.config.js --progress --colors",
    "build-production": "./node_modules/.bin/webpack --config=./node_modules/vc-webpack-vendors/webpack.v4.config.production.js --progress -p",
    "watch": "./node_modules/.bin/webpack --config=./node_modules/vc-webpack-vendors/webpack.v4.config.js --progress --colors --watch"
  },
  "devDependencies": {
    "vc-webpack-vendors": "2.9.2"
  },
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
  "browserslist": [
    ">1%",
    "ios_saf 8",
    "ie 10",
    "ie 11"
  ]
}
```
- Make sure to keep up to day "resolutions", "browserslist" and other versions.


### See more on element Boilerplate
- https://github.com/VisualComposer/elementBoilerplate