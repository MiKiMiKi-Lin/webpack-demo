/**
 * @file Custom Loader for markdown file（为了方便将文件放在项目根目录下）
 * Loader 都需要导出一个函数
 */
const marked = require('marked')

/**
 *
 * @param {*} source 资源文件内容
 * @returns 加工后的结果(必须是JS代码字符串)
 */
module.exports = source => {
  console.log('\n*** start to handle markdown ***\n')
  // 转换成html
  const html = marked(source)
  // 返回JS代码（导出转换后的html）
  const code = `export default ${JSON.stringify(html)}`
  return code
}
