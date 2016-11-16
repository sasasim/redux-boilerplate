const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('../package.json');

const bundleName = `${pkg.name}-${pkg.version}.js`;
const indexHtmlPath = path.resolve(__dirname, '../static/index.html');

module.exports = {
  debug: true,
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  output: {
    path: path.resolve(__dirname, '../'),
    filename: `/${bundleName}`
  },
  module: {
    loaders: [{
      test: /\.jsx$|\.js$/,
      loaders: ['babel'],
      include: path.resolve(__dirname, '../src')
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    port: 3000 || process.env.PORT,
    inline: true,
    contentBase: path.resolve(__dirname, '../static'),
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: indexHtmlPath
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
