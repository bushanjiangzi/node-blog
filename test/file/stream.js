// 标准输入输出，pipe相当于管道联通输入和输出
// process.stdin.pipe(process.stdout)

// http请求中的pipe()
// const http = require('http')
// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     req.pipe(res)
//   }
// })
// server.listen(3030)

// 通过stream拷贝文件
// const fs = require('fs')
// const path = require('path')

// const fileNameRead = path.resolve(__dirname, 'data.txt')
// const fileNameWrite = path.resolve(__dirname, 'data-back.txt')

// const readStream = fs.createReadStream(fileNameRead)
// const writeStream = fs.createWriteStream(fileNameWrite)

// readStream.pipe(writeStream)

// readStream.on('data', chunck => {
//   console.log(chunck.toString())
// })
// readStream.on('end', () => {
//   console.log('copy done')
// })

// http请求中，通过stream返回文件内容
// const fs = require('fs')
// const path = require('path')
// const http = require('http')

// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     const fileNameRead = path.resolve(__dirname, 'data.txt')
//     const readStream = fs.createReadStream(fileNameRead)
//     readStream.pipe(res)
//   }
// })
// server.listen(3030)
