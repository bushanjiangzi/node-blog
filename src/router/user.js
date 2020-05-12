const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')
const {redisSet} = require('../db/redis')

// 设置cookie的过期时间,
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 1000 * 3600 * 24)
  console.log('d.toUTCString():', d, d.toUTCString())
  return d.toUTCString()
}

const handleUserRouter = (req, res) => {
  const method = req.method // GET POST

  if (method === 'POST' && req.path === '/api/user/login') {
    const {username, password} = req.body
    // const {username, password} = req.query
    const result = login(username, password)
    return result.then(data => {
      if (data.username) {
        // 操作cookie
        // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
        
        // 设置session(使用内存)
        // req.session.username = data.username
        // req.session.realname = data.realname

        // 设置session(使用redis同步)
        redisSet(req.sessionId, {username: data.username, realname: data.realname})
        return new SuccessModel('登录成功')
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }
}
module.exports = handleUserRouter