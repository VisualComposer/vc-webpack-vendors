require("@babel/register")({
  ignore: [
    'node_modules/@babel',
    function(filepath) {
      return filepath.indexOf('@babel') === -1;
    },
  ],
});

module.exports = function (api) {
  api.cache(true);

  const presets = [
    "@babel/preset-env",
    "@babel/preset-react"
  ];
  const plugins = [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-class-properties"
  ];

  return {
    presets,
    plugins
  }
}
