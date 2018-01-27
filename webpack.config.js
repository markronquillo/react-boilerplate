const path = require("path");
const webpack = require("webpack");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CompressionPlugin = require("compression-webpack-plugin");

const paths = {
  DIST: path.resolve(__dirname, "./build/"),
  DIST_JS: path.resolve(__dirname, "./build/js/"),
  SRC: path.resolve(__dirname, "./src"),
  PUBLIC: path.resolve(__dirname, "./public")
};

module.exports = {
  // webpack will run on the root directory
  context: __dirname,
  devtool: "cheap-eval-source-map",
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    path.resolve(paths.SRC, "index.jsx")
  ],
  output: {
    path: paths.DIST_JS,
    filename: "[name].js",
    publicPath: "/js"
  },
  devServer: {
    hot: true,
    contentBase: "./build/",
    historyApiFallback: true
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader"]
        })
      },
      {
        enforce: "pre",
        test: /\.jsx$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: ["babel-loader"]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),

    new HtmlWebpackPlugin({
      hash: true,
      template: path.resolve(paths.PUBLIC, "index.html"),
      filename: path.resolve(paths.DIST, "index.html")
    })
  ]
};
