var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var getUserInfor = require('./routes/getUserInfor');
var getList = require('./routes/getList');
var updateUserInfor = require('./routes/updateUserInfor');
var login = require('./routes/login');
var logout = require('./routes/logout');
var register = require('./routes/register');
var getChatRecord = require('./routes/getChatRecord');
var getUnreadChatRecord = require('./routes/getUnreadChatRecord');
var sendContent = require('./routes/sendContent');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var session = require('express-session'); //使用session中间件
app.use(session({    // 使用 session 中间件
  sign:false,
  userName:"默认名字",
  userid:0,
  name: "", // 设置 cookie 中保存 session id 的字段名称
  secret: "secret", // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  secret: 'test secret',
  cokkie: { maxAge: 60 * 1000 * 300 } //过期时间 ms
}));

app.use('/', indexRouter);
app.use('/getUserInfor', getUserInfor);
app.use('/updateUserInfor', updateUserInfor);
app.use('/getList', getList);
app.use('/register',register);
app.use('/login',login);
app.use('/logout',logout);
app.use('/getUnreadChatRecord',getUnreadChatRecord);
app.use('/getChatRecord',getChatRecord);
app.use('/sendContent',sendContent);

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
