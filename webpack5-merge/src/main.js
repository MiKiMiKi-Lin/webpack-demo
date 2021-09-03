import createHeading from './js/heading.js'
import './css/main.css'

const heading = createHeading()
document.body.append(heading)

// HMR -----------------------------------
// module.hot 是 HMR 插件提供的成员，没有开启这个插件，就没有这个对象
// 热替换 heading
if (module.hot) {
  let lastHeading = heading // 记录上一次热替换创建的元素（若没有保存则替换了一次就不能用了）
  module.hot.accept('./js/heading.js', () => {
    document.body.removeChild(lastHeading) // 移除之前创建的元素
    lastHeading = createHeading()
    //   undefined.slice(0) // 故意出错的代码，测试hot设置为true和only的区别
    document.body.append(lastHeading)
  })
}
