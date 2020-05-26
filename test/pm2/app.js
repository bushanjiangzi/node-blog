const http = require('http')

const server = http.createServer((req, res) => {
  res.setHeader('Content-type', 'application/json')
  console.log('请求了、、、')
  console.error('模拟出错.....')
  if (req.url === '/err') {
    throw new Error("访问'err'路由出错了。。。。")
  }

  res.end(JSON.stringify({
    code: 0,
    msg: 'pm2 test server 5'
  }))
})

server.listen(3000)
console.log('node server is listening on port 3000....')