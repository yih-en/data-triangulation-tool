var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  resolveLoader: {
    root: path.join(__dirname, "node_modules"),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: ['babel'],
        exclude: /node_modules/,
        include: [__dirname],
        query: {
          "presets": ["es2015-loose", "stage-0", "react"],
          "plugins": ["react-hot-loader/babel"]
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
};
