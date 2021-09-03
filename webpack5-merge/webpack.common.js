/** @type {import('webpack').Configuration} */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Demo',
      template: './src/index.html',
    }),
  ],
}
