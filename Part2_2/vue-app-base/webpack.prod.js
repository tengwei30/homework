const commonConfig = require('./webpack.common')
const merge = require('webpack-merge')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash].js', //contenthash 若文件内容无变化，则contenthash 名称不变
    path: path.resolve(__dirname, './dist'),
  },
  optimization: {
    // 分离chunks
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial',
        },
      },
    },
  },
  optimization: {
    minimizer: [
      // 压缩JS
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true, // 去除debugger
            drop_console: true, // 去除console.log
          },
          warnings: false,
        },
        cache: true, // 开启缓存
        parallel: true, // 平行压缩
        sourceMap: true, // set to true if you want JS source maps
      }),
      // 压缩css
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
  ],
})
