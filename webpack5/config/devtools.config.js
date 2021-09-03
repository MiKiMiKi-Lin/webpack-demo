/**
 * @file 为比较各个sourceMap打包多个出口文件使用的webpack config
 */
/** @type {import('webpack').Configuration} */

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const devtoolModes = require('./devtoolModes') // devtool中可配置的sourceMap模式数组

// 为每一个模式单独创建一个打包配置
module.exports = devtoolModes.map(item => ({
  devtool: item,
  mode: 'none', // none 确保 Webpack 内部不做额外处理
  entry: './src/main.js',
  // 根据不同的sourceMap模式输出文件
  output: {
    filename: `js/${item}.js`,
    path: path.join(process.cwd(), 'output'),
  },
  plugins: [
    // new CleanWebpackPlugin(), // 自动清除输出目录
    // 为每个打包任务生成一个 HTML 文件
    new HtmlWebpackPlugin({
      filename: `${item}.html`,
      title: 'Webpack Demo App',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // 匹配css文件路径
        //style-loader 将 css-loader 中所加载到的所有样式模块，通过创建 style 标签的方式添加到页面上（链式的从右向左，注意顺序！！！）
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.md$/,
        // 这里直接使用相对路径(注意路径)
        use: './tools/markdown-loader',
      },
    ],
  },
}))
