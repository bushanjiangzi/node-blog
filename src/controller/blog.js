const {exec} = require('../db/mysql')

// 获取博客列表
const getList = (author, keyword) => {
  // where 1=1 占位符
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc`
  return exec(sql).then(res => {
    return res
  })
}

// 获取博客详情
const getDetail = (id) => {
  let sql = `select * from blogs where id='${id}'`
  return exec(sql).then(res => {
    return res[0]
  })
}

// 新建博客,
const newBlog = (blogData = {}) => {
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createtime = Date.now()
  
  let sql = `insert into blogs (title, content, author, createtime)
    values ('${title}', '${content}', '${author}', '${createtime}')
  `
  return exec(sql).then(res => {
    return {
      id: res.insertId
    }
  })
}

// 更新博客
const updateBlog = (id, blogData = {}) => {
  const title = blogData.title
  const content = blogData.content
  let sql = `update blogs set title='${title}', content='${content}' where id='${id}'`
  return exec(sql).then(res => {
    if (res.affectedRows > 0) {
      return true
    }
    return false
  })
} 

// 删除博客
const deleteBlog = (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}'` 
  return exec(sql).then(res => {
    if (res.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}