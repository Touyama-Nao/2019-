//Logout routing
var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../models/Users.js');
var session = require('express-session');   //使用session中间件
router.all('*', function(req, res, next) {  //补充头部防止莫名跨域
    res.header("Access-Control-Allow-Origin", null);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
router.use(session({    // 使用 session 中间件
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
router.get('/', function (req, res) {
    res.set('Content-Type','text/plain');
    req.session.sign = false;
    req.session.userName = null; // 删除session
    res.json({result:"登出成功!",message:null});
    return; //不然会报错304
});

module.exports = router;