const webpack = require("webpack");
const withGraphQL = require("next-plugin-graphql");
const withOptimizedImages = require("next-optimized-images");

module.exports = withOptimizedImages(
  withGraphQL({
    webpack: (config) => {
      config.plugins.push(
        new webpack.ContextReplacementPlugin(
          /graphql-language-service-interface[\\/]dist$/,
          new RegExp(`^\\./.*\\.js$`)
        )
      );
      return config;
    },
  })
);
