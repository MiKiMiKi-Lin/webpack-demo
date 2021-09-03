/** @type {import('webpack').Configuration} */

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge') // 使用该插件合并
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(), // 自动清除输出目录
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: 'public' }],
    }), // 复制目录
  ],
})
