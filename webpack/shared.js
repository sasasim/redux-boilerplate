const path = require('path');

module.exports = {
  entry: './src/index.js',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx$|\.js$/,
      loaders: ['babel'],
      include: path.resolve(__dirname, '../src')
    }]
  }
};
