const router = require('koa-router')()
const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
  const {username, password} = ctx.request.body
  const result = await login(username, password)
  if (result.username) {
    // 设置session
    ctx.session.username = result.username
    ctx.session.realname = result.realname
    ctx.body = new SuccessModel(result, '登录成功')
    return
  }
  ctx.body = new ErrorModel('登录失败')
})

module.exports = router