var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/entry.js',
  output: { path: path.join(__dirname, 'dist/'), filename: 'app.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};