const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              configFile: "./babel.config.js",
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.jpe?g|png|svg|mp3$/,
        use: {
          loader:  'url-loader',
        },
      },
    ]
  },
  mode: 'development',
  devtool: "source-map"
}