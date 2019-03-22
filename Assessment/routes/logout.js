//Logout routing
var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../models/Users.js');
var session = require('express-session');   //使用session中间件

router.use(session({    // 使用 session 中间件
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
}));
router.get('/', function (req, res) {
    req.session.sign = false;
    req.session.userName = null; // 删除session
    res.json({result:"登出成功!",message:null});
});

module.exports = router;