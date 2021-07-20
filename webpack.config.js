const webpack = require("webpack");

module.exports = {
  entry: "./joking-on-frontend/pages/index.js",
  module: {
    rules: [
      //...
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  //...
};
