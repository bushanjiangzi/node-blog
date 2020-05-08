const {
  getList,
  newBlog,
  getDetail,
  updateBlog,
  deleteBlog
} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method // GET POST
  const id = req.query.id

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    // 通过cookie判断用户是否登录
    // if (!req.cookie.username) {
    //   return Promise.resolve(
    //     new ErrorModel('未登录！')
    //   )
    // }
    // 通过session判断用户是否登录,
    if (!req.session.username) {
      return Promise.resolve(
        new ErrorModel('未登录！')
      )
    }
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // const listData = getList(author, keyword)
    // return new SuccessModel(listData, '获取博客列表成功')
    return getList(author, keyword).then(listData => {
      return new SuccessModel(listData, '获取博客列表成功')
    })
  }

  // 查询博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    // const data = getDetail(id)
    // return new SuccessModel(data)
    const res = getDetail(id)
    return res.then(data => {
      return new SuccessModel(data)
    })
  }

  // 新增博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    // const data = newBlog(req.body)
    // return new SuccessModel(data)
    req.body.author = '赵六'
    const res = newBlog(req.body)
    return res.then(data => {
      return new SuccessModel(data)
    })
  }

  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    // const data = updateBlog(id, req.body)
    // if (data) {
    //   return new SuccessModel(data)
    // } else {
    //   return new ErrorModel('更新博客失败！')
    // }
    const res = updateBlog(id, req.body)
    return res.then(data => {
      if (data) {
        return new SuccessModel('更新博客成功！')
      } else {
        return new ErrorModel('更新博客失败！')
      }
    })
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/delete') {
    req.body.author = '赵六'
    const res = deleteBlog(id, req.body.author)
    return res.then(data => {
      if (data) {
        return new SuccessModel('删除博客成功！')
      } else {
        return new ErrorModel('删除博客失败！')
      }
    })

  }
}
 module.exports = handleBlogRouter