const {exec, escape} = require('../db/mysql')
const genPassword = require('../utils/cryp')

// escape用于防止sql注入
const login = async (username, password) => {
  password = genPassword(password)
  username = escape(username)
  password = escape(password)
  const sql = `select username, realname from users where username=${username} and password=${password}`
  const loginData = await exec(sql)
  return loginData[0] || {}
}

module.exports = {
  login
}