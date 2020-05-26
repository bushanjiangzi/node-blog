const express = require('express');
const router = express.Router();
const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')

router.post('/login', (req, res, next) => {
  const {username, password} = req.body
  const result = login(username, password)
  return result.then(data => {
    if (data.username) {
      // 设置session
      req.session.username = data.username
      req.session.realname = data.realname
      res.json(new SuccessModel(data, '登录成功'))
      return
    } else {
      res.json(new ErrorModel('登录失败'))
    }
  })
});

module.exports = router;