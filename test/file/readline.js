const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.join(__dirname, '../', '../', 'logs/', 'access.log')

// 创建stream
const readStream = fs.createReadStream(fileName)

// 创建readline对象
const rl = readline.createInterface(readStream)

let ChromeNum = 0
let sum = 0
// 逐行读取
rl.on('line', lineData => {
  if (!lineData) {
    return
  }
  sum ++
  let arr = lineData.split('---')
  if (arr[2] && arr[2].indexOf('Chrome') > 0) {
    ChromeNum ++
  }
})
// 监听读完
rl.on('close', () => {
  console.log(ChromeNum, sum, ChromeNum/sum)
})