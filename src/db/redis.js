const redis = require('redis')
const REDIS_CONF = require('../config/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.log('error:', err)
})

// 存储
function redisSet(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}

function redisGet(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val === null) {
        resolve(null)
      }
      try{
        resolve(JSON.parse(val))
      } catch{
        resolve(val)
      }
    })
  })
}
module.exports = {
  redisSet,
  redisGet
}