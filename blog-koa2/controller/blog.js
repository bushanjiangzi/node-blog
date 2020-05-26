const {exec, escape} = require('../db/mysql')
const xss = require('xss')

// 获取博客列表(包含搜索)
const getList = async (author, keyword) => {
  // where 1=1 占位符
  let sql = `select * from blogs where 1=1 `
  if (author) {
    author = escape(author)
    sql += `and author=${author} `
  }
  if (keyword) {
    // keyword = escape(keyword)
    sql += `and title like '%${keyword}%'`
  }
  sql += `order by createtime desc`
  console.log(sql)
  return await exec(sql)
}

// 获取博客详情
const getDetail = async (id) => {
  let sql = `select * from blogs where id='${id}'`
  const rows = await exec(sql)
  return  rows[0]
}

// 新建博客,
const newBlog = async (blogData = {}) => {
  const title = xss(escape(blogData.title))
  const content = xss(escape(blogData.content))
  const author = escape(blogData.author)
  const createtime = Date.now()
  
  let sql = `insert into blogs (title, content, author, createtime)
    values (${title}, ${content}, ${author}, '${createtime}')
  `
  const insertData = await exec(sql)
  return  {
      id: insertData.insertId
    }
}

// 更新博客
const updateBlog = async (blogData = {}) => {
  const title = xss(escape(blogData.title))
  const content = xss(escape(blogData.content))
  const id = blogData.id
  let sql = `update blogs set title=${title}, content=${content} where id='${id}'`
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
} 

// 删除博客
const deleteBlog = async (bodyData) => {
  const author = escape(bodyData.author)
  const id = bodyData.id
  const sql = `delete from blogs where id='${id}' and author=${author}` 
  const delData = await exec(sql)
  if (delData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}