const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//require("@babel/polyfill");

module.exports ={
  context: __dirname,
  entry:{
    //babelPolif: "@babel/polyfill",
   // index : './index.js',
    main : './main.js'//,
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.[name].js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/transform-runtime',
              '@babel/plugin-proposal-class-properties'
          ]
          }
        }
      }
    ]
  },
  devServer:{
    contentBase: path.join(__dirname + 'dist'),
    host: 'localhost',
    port: 8081,
    https: false,
    disableHostCheck: true,
    publicPath: '/',
    historyApiFallback: true
  },  
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join('dist', 'main.html'),
      hash: true,
      //filename: '',
      chunks: ['']
    })
  ]
}