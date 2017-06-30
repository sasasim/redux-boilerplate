const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('../package.json');

const appName = packageJson.name;

module.exports = {
  entry: {
    [appName]: './src/client/main.js'
  },
  devtool: 'sourcemap',
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [{
      test: /\.jsx$|\.js$/,
      include: [
        path.resolve(__dirname, '../src/client'),
        path.resolve(__dirname, '../src/server')
      ],
      use: { loader: 'babel-loader' }
    }, {
      test: /\.css$/,
      include: path.resolve(__dirname, '../src/styles'),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }, {
      test: /\.(sass|scss)$/,
      include: path.resolve(__dirname, '../src/styles'),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!sass-loader'
      })
    }, {
      test: /\.(ttf|eot|svg|png|jpg|jpeg)$/,
      include: path.resolve(__dirname, '../src/assets'),
      use: {
        loader: 'file-loader'
      }
    }]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.RUNTIME_ENV': JSON.stringify('client')
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false,
      sourceMap: true
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new HtmlWebpackPlugin({
      template: 'static/index.html'
    })
  ]
};
