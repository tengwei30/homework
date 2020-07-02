const commonConfig = require('./webpack.common')
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')

module.exports = merge(commonConfig, {
  devtool: 'inline-source-map',
  devServer: {
    port: '8080',
    host: '0.0.0.0',
    hotOnly: true,
    hot: true,
    contentBase: './dist',
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  output: {
    // 输出
    filename: 'js/[name].[hash].js', // 每次保存 hash 都变化
    path: path.resolve(__dirname, '../dist'),
  },
  module: {},
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
})
