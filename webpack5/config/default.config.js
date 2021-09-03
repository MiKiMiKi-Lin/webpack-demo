// 方便编写时有智能提示
// import { Configuration } from 'webpack' // 一定记得运行 Webpack 前先注释掉这里
// 在类型注释中使用 import 动态导入类型可以解决node环境无法正常import的问题（TypeScript 中提供的特性，而不是ES Module）
/** @type {import('webpack').Configuration} */

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const RemoveWebpackPlugin = require('../tools/remove-comments-plugin.js') // 引入自定义插件(注意路径)

module.exports = {
  // 默认 src/index
  entry: './src/main.js',
  // 默认 dist/main.js
  output: {
    filename: 'bundle.js',
    // 对应一个绝对路径
    path: path.join(process.cwd(), 'output'), // 注意与直接使用 __dirname__ 的区别
  },
  // Source Map
  // devtool: 'eval-cheap-module-source-map',

  // 为 Webpack Dev Server提供配置的属性
  devServer: {
    // 开启 HMR 特性，如果资源不支持 HMR 会 fallback 到 live reloading
    // 设置为 true 时热替换失败就会自动回退使用自动刷新，设置为only并不会
    // hot 方式热替换失败就会自动回退使用自动刷新，而 hotOnly 并不会自动刷新
    hot: 'only',
    // 指定额外的静态资源路径
    static: ['public', 'static'],
    compress: true,
    port: 8888,
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: {
          '^/api': '', // 替换掉代理地址中的 /api
        },
        changeOrigin: true, // 确保请求 GitHub 的主机名就是：api.github.com
      },
    },
  },
  // 优化
  optimization: {
    // 只导出被使用的成员（标记树上哪些是枯枝败叶）
    usedExports: true,
    // 压缩打包结果（把枯枝败叶摇下来）
    // minimize: true,
    // 尽可能合并每一个模块到一个函数中
    // concatenateModules: true,
    // 开启 sideEffects 特性(配合 package.json 的 sideEffects)
    sideEffects: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            // 预设插件, modules 属性默认是 auto, 可设置"commonjs"把代码中的 ES Modules 转换为 CommonJS
            presets: [['@babel/preset-env', { modules: 'auto' }]],
          },
        },
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
  plugins: [
    new CleanWebpackPlugin(), // 自动清除输出目录
    // 简单的自定义可自行添加参数，可以通过template根据模板生成
    new HtmlWebpackPlugin({
      title: 'Webpack Demo App',
      meta: {
        viewport: 'width=device-width',
      },
      template: './index.html', // 指定所使用的模板
    }), // 自动生成 HTML 输出到 dist 目录, HTML 中的 script 标签是自动引入的，可以确保资源文件的路径是正常的
    // 可创建多个页面，创建一个subPage.html
    new HtmlWebpackPlugin({
      filename: 'subPage.html',
    }),
    // 一般用于生产环境，因为成本比较高
    // new CopyWebpackPlugin({
    //   patterns: ['static'], // 需要拷贝的目录或者路径通配符
    // }),
    new RemoveWebpackPlugin(), // 自定义插件，移除打包的js文件的注释
  ],
}
