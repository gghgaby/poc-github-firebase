const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");


module.exports = (env) =>  {
  return {
    devtool: env === "development" ?  "eval" : "source-map",
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          styles: {
              name: "styles",
              test: /\.css$/,
              chunks: "all",
              enforce: true
          }
        },
      },
    },
    performance: {
      maxAssetSize: 1000000,
      maxEntrypointSize: 1000000
    },
    entry:{
      app: "./src/App.js",
      login: "./src/Login.js"
    },
    output: {
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
      filename: "[name].[fullhash].bundle.js",
      chunkFilename: (pathData) => {
        return pathData.chunk.name === "main" ? "[name].[fullhash].js" : "[name]/[name].[fullhash].js";
      },
      clean: true,
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    module:{
        rules:[{
          use: "babel-loader",
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
        },
        {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
              {
                loader: "file-loader",
                options: {
                    outputPath: "assets/images/"
                  },
              },
            ],
        },
        {
          test: /\.(scss)$/,
          use: [MiniCssExtractPlugin.loader,"css-loader", "sass-loader"]
       },
       {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
       {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename:  "[name].[fullhash].css",
        chunkFilename: "[name]/[name].[fullhash].css"
      }),
      new webpack.DefinePlugin({
        env: {
          NODE_ENV: JSON.stringify(env),
        },
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "public/index.html",
        inject: true,
        chunks: ["login"]
      }),
      new HtmlWebpackPlugin({
        filename: "app.html",
        template: "public/index.html",
        inject: true,
        chunks: ["app"]
      }),
      new Dotenv({
        path: `./config.${env.config}.env`,
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, "build"),
      port: 8999,
      historyApiFallback: true
    }
  }
};