var express = require('express');
var router = express.Router();
const {
  getList,
  newBlog,
  getDetail,
  updateBlog,
  deleteBlog
} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

/* GET users listing. */
router.get('/list', (req, res, next) => {
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''
  return getList(author, keyword).then(listData => {
    res.json( new SuccessModel(listData, '获取博客列表成功' + req.session.username))
  })
});

router.get('/detail', (req, res, next) => {
  let id = req.query.id
  let result = getDetail(id)
  return result.then(data => {
    res.json(new SuccessModel(data))
  })
});

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.realname
  const result = newBlog(req.body)
  return result.then(data => {
    res.json(new SuccessModel(data))
  })
});

router.post('/update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.body)
  return result.then(data => {
    if (data) {
      res.json(new SuccessModel('更新博客成功！'))
    } else {
      res.json(new ErrorModel('更新博客失败！'))
    }
  })
});

router.post('/delete', loginCheck, (req, res, next) => {
  req.body.author = req.session.realname
  const result = deleteBlog(req.body)
  return result.then(data => {
    if (data) {
      res.json(new SuccessModel('删除博客成功！'))
    } else {
      res.json(new ErrorModel('删除博客失败！'))
    }
  })
});
module.exports = router;