const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('../package.json');
const shared = require('./shared.js');

const bundleName = `${pkg.name}-${pkg.version}.js`;
const indexHtmlPath = path.resolve(__dirname, '../static/index.html');

module.exports = {
  debug: true,
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    shared.entry
  ],
  output: {
    path: path.resolve(__dirname, '../'),
    filename: `/${bundleName}`
  },
  module: shared.module,
  resolve: shared.resolve,
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
