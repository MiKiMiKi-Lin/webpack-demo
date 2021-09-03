// 组件

export const Button = () => {
  return document.createElement('button')

  console.log('dead-code')
}

export const Input = () => {
  return document.createElement('input')
}

export const Heading = level => {
  return document.createElement('h' + level)
}
