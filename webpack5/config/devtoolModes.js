/**
 * @file devtool中可配置的sourceMap模式
 */
module.exports = [
  'eval', // 定位文件，不可以定位具体的行列
  'eval-source-map', // 除了定位文件，还可以定位具体的行列
  'eval-cheap-source-map', //  只能定位到行，而定位不到列
  'eval-cheap-module-source-map',
  'cheap-source-map',
  'cheap-module-source-map',
  'inline-cheap-source-map',
  'inline-cheap-module-source-map',
  'source-map',
  'inline-source-map',
  'hidden-source-map',
  'nosources-source-map',
]
// 各个模式的名字：
// eval: 每个模块中的代码包裹到了一个 eval 函数中，而且每段模块代码的最后都会通过 sourceURL 的方式声明这个模块对应的源文件路径。定位文件，不可以定位具体的行列
// -cheap: 只能定位到行，而定位不到列
// -module: 解析出来的源代码是没有经过 Loader 加工的，(不带 module 的，解析出来的源代码是经过 Loader 加工后的结果)
