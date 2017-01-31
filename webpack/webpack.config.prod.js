const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package.json');

const appName = `${pkg.name}-${pkg.version}`;
const jsBundleName = `${appName}.min.js`;
const cssBundleName = `${appName}.min.css`;
const indexHtmlPath = path.resolve(__dirname, '../static/index.html');

const extractCss = new ExtractTextPlugin(cssBundleName);

module.exports = {
  devtool: 'source-map',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `/${jsBundleName}`
  },
  module: {
    rules: [{
      test: /\.jsx$|\.js$/,
      include: path.resolve(__dirname, '../src'),
      use: [{ loader: 'babel-loader' }]
    }, {
      test: /\.(ttf|eot|svg|png|jpeg|jpg)$/,
      include: path.resolve(__dirname, '../assets'),
      use: [{ loader: 'file-loader' }]
    }, {
      test: /\.styl$/,
      include: path.resolve(__dirname, '../styles'),
      use: extractCss.extract(['css-loader', 'autoprefixer-loader', 'stylus-loader'])
    }, {
      test: /\.css$/,
      use: extractCss.extract(['css-loader'])
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: indexHtmlPath,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      },
      sourceMap: true
    }),
    extractCss
  ]
};
