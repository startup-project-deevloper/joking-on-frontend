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
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"',
        JOKING_ON_MAGIC_PUBLIC_KEY: JSON.stringify(
          process.env.MAGIC_PUBLIC_KEY
        ),
        JOKING_ON_STRAPI_URL: JSON.stringify(process.env.STRAPI_URL),
        JOKING_ON_LOCALHOST_DAI_ADDRESS: JSON.stringify(process.env.STRAPI_URL),
        JOKING_ON_LOCALHOST_MKR_ADDRESS: JSON.stringify(process.env.STRAPI_URL),
      },
    }),
  ],
};
