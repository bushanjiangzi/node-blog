var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs')
const session = require('express-session')
const redisStore = require('connect-redis')(session)
const redisClient = require('./db/redis')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// 处理日志cookie等
const ENV = process.env.NODE_ENV
if (ENV === 'production') {
  const fileNmae = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(fileNmae, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
} else {
  app.use(logger('dev', {
    stream: process.stdout
  }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session和redis关联
const sessionStore = new redisStore({
  client: redisClient
})
// sesssion
app.use(session({
  secret: '@Jiangzi_2020',
  cookie: {
    path: '/', // 默认配置
    httpOnly: true, // 默认配置
    maxAge: 1000 * 60 * 1  // 有效时间
  },
  store: sessionStore // 将session存储到redis中
}))

// 挂载路由
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
