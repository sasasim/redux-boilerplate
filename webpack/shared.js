const path = require('path');

module.exports = {
  entry: './src/main.js',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx$|\.js$/,
      loaders: ['babel'],
      include: path.resolve(__dirname, '../src')
    }, {
      id: 'style',
      test: /\.styl$/,
      loader: 'style!css!autoprefixer!stylus',
      include: path.resolve(__dirname, '../src')
    }]
  }
};
