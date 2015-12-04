'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: [

      // './sayHelloEntry.js',
      './entry.js',
      
      'webpack-dev-server/client?http://localhost:3000', // `http://localhost:3000` specify the socket for browser
      'webpack/hot/dev-server', // enable browser hot reload (bundle this only won't enable hot reload)
    ],
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/assets/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      include: [path.join(__dirname)],
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015'],
      },
    },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
