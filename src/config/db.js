const env = process.env.NODE_ENV // 环境参数

console.log('env', env)
// 配置
let MYSQL_CONF
if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'blog'
  }
} else{
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'blog'
  }
}
module.exports = {
  MYSQL_CONF
}