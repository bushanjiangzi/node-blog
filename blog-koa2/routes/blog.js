const router = require('koa-router')()

const {
  getList,
  newBlog,
  getDetail,
  updateBlog,
  deleteBlog
} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  const author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''
  console.log('author, keyword', author, keyword)
  const listData = await getList(author, keyword)
  ctx.body = new SuccessModel(listData, '获取博客列表成功')
});

router.get('/detail', async (ctx, next) => {
  let id = ctx.query.id
  let result = await getDetail(id)
  ctx.body = new SuccessModel(result, '获取详情成功')
});

router.post('/new', loginCheck, async (ctx, next) => {
  ctx.request.body.author = ctx.session.realname
  const result = await newBlog(ctx.request.body)
  ctx.body = new SuccessModel(result, '新建博客成功')
});

router.post('/update', loginCheck, async (ctx, next) => {
  const result = await updateBlog(ctx.request.body)
  if (result) {
   ctx.body = new SuccessModel('更新博客成功！')
  } else {
    ctx.body = new ErrorModel('更新博客失败！')
  }
});

router.post('/delete', loginCheck, async (ctx, next) => {
  ctx.request.body.author = ctx.session.realname
  const result = await deleteBlog(ctx.request.body)
  if (result) {
    ctx.body = new SuccessModel('删除博客成功！')
  } else {
    ctx.body = new ErrorModel('删除博客失败！')
  }
});

module.exports = router