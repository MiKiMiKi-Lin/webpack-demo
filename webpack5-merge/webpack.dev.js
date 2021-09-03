/** @type {import('webpack').Configuration} */

const { merge } = require('webpack-merge') // 使用该插件合并
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 8899,
    compress: true,
    // 开启 HMR 特性, 设为only方式热替换失败不会自动刷新
    hot: 'only',
  },
})
