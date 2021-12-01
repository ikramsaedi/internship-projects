const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Where files should be sent once they are bundled
  entry: __dirname + "/src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "index.bundle.js",
  },
  // webpack 5 comes with devServer which loads in development mode
  devServer: {
    port: 3000,
  },
  // Rules of how webpack will take our files, compile & bundle them for the browser
  module: {
    rules: [
      //rules for diff types of files
      {
        test: /\.(js|jsx)$/, //test takes a regex -> tells it what type of files to match
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpeg)/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
};
