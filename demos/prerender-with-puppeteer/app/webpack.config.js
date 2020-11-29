const path = require('path');

module.exports = {
  target: 'web',
  mode: 'development',
  entry: ['babel-polyfill', './src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },   
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { 
        test: /\.css?$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
        ]
      },
    ]
  },
  resolve: { extensions: ['.ts', '.tsx', '.js'] },
  devServer: {
    contentBase: './',
    port: 5000
  }
};