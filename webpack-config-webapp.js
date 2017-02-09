var path = require('path');

module.exports = {
  entry: './src/notes/main.ts',
  output: {
    filename: 'notes.js',
    path: '/build/'
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
};