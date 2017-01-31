const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('../package.json');

const bundleName = `${pkg.name}-${pkg.version}.js`;
const indexHtmlPath = path.resolve(__dirname, '../static/index.html');
const port = process.env.PORT || 3000;

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/main.js'
  ],
  output: {
    path: path.resolve(__dirname, '../static'),
    publicPath: '/',
    filename: bundleName
  },
  module: {
    rules: [{
      test: /\.jsx$|\.js$/,
      include: path.resolve(__dirname, '../src'),
      use: [{
        loader: 'babel-loader',
        options: {
          plugins: [
            'transform-class-properties',
            ['transform-object-rest-spread', { useBuiltInts: true }],
            'transform-react-jsx',
            ['module-resolver', {
              root: ['./'],
              alias: {}
            }]
          ]
        }
      }]
    }, {
      test: /\.(ttf|eot|svg|png|jpeg|jpg)$/,
      include: path.resolve(__dirname, '../assets'),
      use: [{ loader: 'file-loader' }]
    }, {
      test: /\.styl$/,
      include: path.resolve(__dirname, '../styles'),
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'autoprefixer-loader' },
        { loader: 'stylus-loader' }
      ]
    }, {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' }
      ]
    }]
  },
  devServer: {
    port,
    hot: true,
    contentBase: path.resolve(__dirname, '../static'),
    publicPath: '/',
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: indexHtmlPath
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
