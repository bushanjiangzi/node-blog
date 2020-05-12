const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const {redisSet, redisGet} = require('./src/db/redis')

// session 数据,
const SESSION_DATA = {}

// 设置cookie的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 1000 * 3600 * 24)
  // console.log('d.toUTCString():', d, d.toUTCString())
  return d.toUTCString()
}

// 处理post data
const getPostData = function(req) {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
}

const serverHandle = (req, res) => {
  //设置返回JSON格式
  res.setHeader('Content-type', 'application/json')
  const url = req.url
  req.path = url.split('?')[0]
  //解析query
  req.query = querystring.parse(url.split('?')[1])
  // 处理cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(element => {
    if (!element) {
      return
    }
    let arr = element.split('=')
    let key = arr[0].trim()
    let value = arr[1].trim()
    req.cookie[key] = value
  });
  console.log('req.cookie', req.cookie)

  // 解析session (开辟独立内存)
  // let needSetCookie = false
  // let userId = req.cookie.userId
  // if (userId) {
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {}
  //   }
  // } else {
  //   needSetCookie = true
  //   userId = Date.now() + '_' + parseInt(Math.random() * 1000000)
  //   SESSION_DATA[userId] = {}
  // }
  // req.session = SESSION_DATA[userId]

  // 解析session (使用redis存储)
  let needSetCookie = false
  let userId = req.cookie.userId
  if (!userId) {
    needSetCookie = true
    userId = Date.now() + '_' + parseInt(Math.random() * 1000000)
    redisSet(userId, {})
  }
  req.sessionId = userId
  redisGet(req.sessionId).then(sessionData => {
    if (sessionData === null) {
      redisSet(req.sessionId, {})
      req.session = {}
    } else {
      req.session = sessionData
    }
    console.log('req.session:', req.session)

    // 处理post data
    return getPostData(req)
  })
  .then(postData => {
    req.body = postData

    // 处理blog路由
    const blogRes = handleBlogRouter(req, res)
    if (blogRes) {
      blogRes.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }

    // 处理user路由
    const userRes = handleUserRouter(req, res)
    if (userRes) {
      return userRes.then(userData => {
        if (userData) {
          if (needSetCookie) {
            res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
          }
          res.end(
            JSON.stringify(userData)
          )
          return
        }
      })
    }
    
    // 未找到路由
    res.writeHead(404, {'Content-type': 'text/plain'})
    res.write('404 Not Found!\n')
    res.end()
  })
}

module.exports = serverHandle