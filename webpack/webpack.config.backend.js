const path = require('path');
const fs = require('fs');

const nodeModules = fs
  .readdirSync('node_modules')
  .filter(module => ['.bin'].indexOf(module) === -1)
  .reduce((memo, module) => Object.assign({}, memo, {
    [module]: `commonjs ${module}`
  }), {});

module.exports = {
  entry: './src/server/server.js',
  target: 'node',
  externals: nodeModules,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'server.js'
  },
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
      test: /\.(sass|scss|css)$/,
      include: path.resolve(__dirname, '../src/styles'),
      use: [
        { loader: 'css-loader/locals?modules&localIdentName=[path][name]---[local]---[hash:base64:5]' },
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
  plugins: []
};
