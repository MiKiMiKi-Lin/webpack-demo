/**
 * @file the custom plugin to remove comments in the bundle file
 */
class RemoveCommentsPlugin {
  /**
   * Webpack 启动时被调用
   * @param {object} compiler webpack工作的compiler对象
   */
  apply(compiler) {
    console.log('*** RemoveCommentsPlugin started! ***')
    // 通过 compiler 对象的 hooks 属性访问到 emit 钩子
    // 再通过 tap 方法注册一个钩子函数
    // 接收两个参数：插件名和挂载到这个钩子的函数。
    compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
      // 该函数接收compilation上下文对象
      //
      for (const filename in compilation.assets) {
        console.log(filename)
        // 处理js文件
        if (filename.endsWith('.js')) {
          // 获取文件内容
          const content = compilation.assets[filename].source()
          // 去除注释
          const contentResult = content.replace(/\/\*\*+\*\//g, '')
          // Webpack 内部要求的格式
          compilation.assets[filename] = {
            source: () => contentResult,
            size: () => contentResult.length,
          }
        }
      }
    })
  }
}

module.exports = RemoveCommentsPlugin
