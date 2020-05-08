const http = require('http')
const querystring = require('querystring')

// const server = http.createServer((req, res) => {
//   console.log('method:', req.method) // GET
//   const url = req.url
//   console.log('url:', url)
//   req.query = querystring.parse(url.split('?')[1])
//   console.log('query:', req.query)
//   res.end(
//     JSON.stringify(req.query)
//   )
// })

// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     // req数据格式
//     console.log('req content-type:', req.headers['content-type'])
//     let postData = ''
//     req.on('data', chunk => {
//       postData += chunk.toString()
//     })
//     req.on('end', () => {
//       console.log('postData:', postData)
//       console.log('path:', req.url.split('?')[0])
//       res.end('hello world!')
//     })
//   }
// })

const server = http.createServer((req, res) => {
  const method = req.method
  const url = req.url
  req.query = querystring.parse(url.split('?')[1])
  const query = req.query
  const path = url.split('?')[0]
  let resData = {
    method,
    url,
    query,
    path
  }
  if (req.method === 'GET') {
    res.end(
      JSON.stringify(resData)
    )
  }
  if (req.method === 'POST') {
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      resData.postData = postData
      res.end(
        JSON.stringify(resData)
      )
    })
  }
})

server.listen(3000)
console.log('3000端口启动了。。。')