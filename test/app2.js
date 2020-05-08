const serverHandle = (req, res) => {
  //设置返回JSON格式
  res.setHeader('Content-type', 'application/json')

  const resData = {
    name: 'jiang',
    age: 16,
    env: process.env.NODE_ENV
  }

  res.end(JSON.stringify(resData))
}

module.exports = serverHandle