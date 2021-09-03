/** @type {import('webpack').Configuration} */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const MiniCSSExtractPlugin = require('mini-css-extract-plugin') // 抽取css

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    // 对应一个绝对路径
    path: path.join(process.cwd(), 'dist'), // 注意与直接使用 __dirname__ 的区别
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader', // 样式通过style标签注入
          MiniCSSExtractPlugin.loader, // 可将css抽取出独立的css文件，直接通过 link 标签引入（未压缩）
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
      template: './src/index.html',
    }),
    new MiniCSSExtractPlugin(),
  ],
}
