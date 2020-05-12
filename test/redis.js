const redis = require('redis')

// 创建客户端
const redisClient = redis.createClient(6379,'127.0.0.1')
redisClient.on('error', err => {
  console.log('error:', err)
})

// 测试
redisClient.set('username', 'lisi', redisClient.print)
redisClient.get('username', (err, val) => {
  if (err) {
    console.log('err:', err)
    return
  }
  console.log('val:', val)

  // 退出
  redisClient.quit()
})