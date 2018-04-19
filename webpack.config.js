const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");

const postcssOpts = {
  ident: "postcss", // https://webpack.js.org/guides/migrating/#complex-options
  plugins: () => [
    autoprefixer({
      browsers: [
        "last 2 versions",
        "Firefox ESR",
        "> 1%",
        "ie >= 8",
        "iOS >= 8",
        "Android >= 4"
      ]
    }),
    pxtorem({ rootValue: 100, propWhiteList: [] })
  ]
};

module.exports = {
  devtool: "source-map", // or 'inline-source-map'
  devServer: {
    disableHostCheck: true
  },

  entry: {
    index: path.resolve(__dirname, "src/index")
  },

  output: {
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
    path: path.join(__dirname, "/dist"),
    publicPath: "/dist/"
  },

  resolve: {
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.join(__dirname, "src")
    ],
    extensions: [".web.js", ".jsx", ".js", ".json"]
  },

  module: {
    noParse: [/moment.js/],
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          plugins: [
            "transform-decorators-legacy",
            "external-helpers", // why not work?
            ["transform-runtime", { polyfill: false }],
            ["import", [{ style: "css", libraryName: "antd-mobile" }]]
          ],
          presets: ["es2015", "stage-0", "react"]
          // presets: [['es2015', { modules: false }], 'stage-0', 'react'] // tree-shaking
        }
      },
      { test: /\.(jpg|png)$/, loader: "url-loader?limit=8192" },
      {
        test: /\.(svg)$/i,
        loader: "svg-sprite-loader",
        include: [
          require.resolve("antd-mobile").replace(/warn\.js$/, ""), // 1. 属于 antd-mobile 内置 svg 文件
          path.resolve(__dirname, "src/icons") // 自己私人的 svg 存放目录
        ]
      },
      // 注意：如下不使用 ExtractTextPlugin 的写法，不能单独 build 出 css 文件
      // { test: /\.less$/i, loaders: ['style-loader', 'css-loader', 'less-loader'] },
      // { test: /\.css$/i, loaders: ['style-loader', 'css-loader'] },
      {
        test: /\.less$/i,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            { loader: "postcss-loader", options: postcssOpts },
            "less-loader"
          ]
        })
      },
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            { loader: "postcss-loader", options: postcssOpts }
          ]
        })
      }
    ]
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  devServer: {
    port: 8000,
    historyApiFallback: true
  },
  plugins: [
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.optimize.CommonsChunkPlugin({
      // minChunks: 2,
      name: "shared",
      filename: "shared.js"
    }),
    new ExtractTextPlugin({ filename: "[name].css", allChunks: true }),
    new webpack.DefinePlugin({
      __DEV__: true
    })
  ]
};
