const webpack = require("webpack");
const withOptimizedImages = require("next-optimized-images");

module.exports = withOptimizedImages({
  webpack: (config) => {
    return config;
  }
}
);
