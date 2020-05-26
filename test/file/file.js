const fs = require('fs')
const path = require('path')

// 声明路径
const fileName = path.resolve(__dirname, 'file.txt')

// 读取文件内容
// fs.readFile(fileName, (err, data) => {
//   if (err) {
//     console.log(err)
//   } else {
//     // data为二进制类型需要转化为string类型
//     console.log(data.toString())
//   }
// })

// 写入文件
// const writeOption = {
//   flag: 'a' // a：追加，w：覆盖
// }
// const content = '青青子衿，悠悠我心'
// fs.writeFile(fileName, content, writeOption, err => {
//   if (err) {
//     console.log(err)
//   }
// })

// 判断文件是否存在
fs.exists(fileName, res => {
  console.log(res)
})
