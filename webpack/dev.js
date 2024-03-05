const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const src = path.resolve(__dirname, "..", "src");

const config = {
  context: src,
  entry: "./index.tsx",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "..", "dist"),
    publicPath: "/",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "..", "./src"),
      "@app": path.resolve(__dirname, "..", "./src/app"),
      "@generated": path.resolve(__dirname, "..", "./src/generated"),
      "@services": path.resolve(__dirname, "..", "./src/shared/services"),
      "@static": path.resolve(__dirname, "..", "./src/static"),
      "@images": path.resolve(__dirname, "..", "./src/static/images"),
      "@stores": path.resolve(__dirname, "..", "./src/stores"),
      "@component": path.resolve(__dirname, "..", "./src/app/component"),
      "@styled": path.resolve(__dirname, "..", "./src/app/styled-components"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devServer: {
    port: Number(process.env.PORT ?? 3000) ,
    historyApiFallback: true,
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "static",
          to: path.resolve(__dirname, "..", "dist", "static"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ["file-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-class-properties"],
          },
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
            plugins: ["@babel/plugin-transform-class-properties"],
          },
        },
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
};

module.exports = config;