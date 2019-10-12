const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin"); // 优化js
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  mode: NODE_ENV,
  entry: NODE_ENV == "development" ? "./src/main.js" : "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: NODE_ENV == "development" ? "build.js" : "ohyeah-scroll.js",
    library: "ohyeah",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true, // 多线程并行构建
        terserOptions: {
          // https://github.com/terser/terser#minify-options
          compress: {
            warnings: false, // 删除无用代码时是否给出警告
            drop_console: true, // 删除所有的console.*
            drop_debugger: true, // 删除所有的debugger
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["vue-style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            less: ["vue-style-loader", "css-loader", "less-loader"],
          },
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "assets/[name].[hash:4].[ext]",
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
  },
  performance: {
    hints: false,
  },
  devtool: "#eval-source-map",
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"',
      },
    }),
  ]);
}
