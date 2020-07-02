const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  mode: 'none',
  entry: path.join(__dirname, 'src/index.js'),
  // output: {
  //   filename: '[name].js',
  //   path: path.join(__dirname, './dist'),
  // },
  resolve: {
    extensions: ['.js', '.vue', '.less', '.css'],
    alias: {
      '@': path.resolve('src'),
      vue$: 'vue/dist/vue.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {},
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        // include: [path.join(__dirname, '..', 'src')],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 5000,
              name: 'imgs/[hash].[ext]',
            },
          },
          // 图片压缩
          {
            loader: 'image-webpack-loader',
            options: {
              //   bypassOnDebug: true,
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
      },
      {
        test: /\.ejs$/,
        use: ['ejs-webpack-loader'],
      },
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'vue demo',
      template: './public/index.html',
      filename: 'index.html',
      inject: true,
      url: './public',
    }),
    // new webpack.HotModuleReplacementPlugin(),
    // 解决vender后面的hash每次都改变
    new webpack.HashedModuleIdsPlugin(),
    new VueLoaderPlugin(),
    new StyleLintPlugin({
      files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
    }),
  ],
}
