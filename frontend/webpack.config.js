const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: ["./src"],
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
    publicPath: "http://localhost:8080/static/frontend/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  optimization: {
    // minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
      }),
    ],
  },
  devServer: {
    disableHostCheck: true, // does not check for host when using ngrok
    contentBase: "./static/frontend/",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: true,
    inline: true,
    proxy: {
      "!/static/frontend/**": {
        target: "http://localhost:8000", // points to django dev server
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
