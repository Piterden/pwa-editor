const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const mode = process.env.NODE_ENV || "development"
const WorkboxPlugin = require("workbox-webpack-plugin")

module.exports = {
  mode,
  entry: {
    // sw: ["babel-polyfill", __dirname + "/src/sw.js"],
    main: [__dirname + "/src/main.tsx"]
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].js"
  },
  resolve: {
    alias: {
      fs: __dirname + "/src/lib/fs.js"
    },
    extensions: [".ts", ".tsx", ".js"]
  },
  stats: {
    colors: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader/url" }, { loader: "file-loader" }]
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      {
        from: __dirname + "/src/index.html",
        to: __dirname + "/public/index.html"
      },
      { from: __dirname + "/assets/*", to: __dirname + "/public" }
    ]),
    new MonacoWebpackPlugin(),
    new WorkboxPlugin.GenerateSW({
      swDest: "sw.js",
      clientsClaim: true,
      skipWaiting: true
    })
  ]
}
