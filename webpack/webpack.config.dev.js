const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('../package.json');

const appName = packageJson.name;

module.exports = {
  entry: {
    [appName]: './src/client/main.js'
  },
  devtool: 'sourcemap',
  output: { filename: '[name].[hash].js' },
  module: {
    rules: [{
      test: /\.jsx$|\.js$/,
      include: [
        path.resolve(__dirname, '../src/client'),
        path.resolve(__dirname, '../src/server')
      ],
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.css$/,
      include: path.resolve(__dirname, '../src/styles'),
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' }
      ]
    }, {
      test: /\.(sass|scss)$/,
      include: path.resolve(__dirname, '../src/styles'),
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader' }
      ]
    }, {
      test: /\.(ttf|eot|svg|png|jpg|jpeg)$/,
      include: path.resolve(__dirname, '../src/assets'),
      use: {
        loader: 'file-loader'
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.RUNTIME_ENV': JSON.stringify('client')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'static/index.html'
    }),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, '../dist/client'),
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        secure: false
      }
    }
  }
};
