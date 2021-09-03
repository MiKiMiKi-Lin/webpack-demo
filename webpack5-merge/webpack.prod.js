/** @type {import('webpack').Configuration} */

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin') // 压缩css

const { merge } = require('webpack-merge') // 使用该插件合并
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`）
      `...`,
      new CSSMinimizerPlugin(), // 压缩样式文件(比起写在Plugin里，更推荐写这里, 开启minimizer时才开启)
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // 自动清除输出目录
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: 'public' }],
    }), // 复制目录
    // new CSSMinimizerPlugin(), // 压缩样式文件（写这里时无论何时都开启）
  ],
})
