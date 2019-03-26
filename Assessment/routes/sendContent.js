//发送消息 routing
var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../models/Users.js');
var session = require('express-session');   //使用session中间件
var mongojs = require('mongojs');
var db = mongojs('mytestdb', ['Mess',"users",'usersInfo']);
var bodyParser = require("body-parser");


router.all('*', function(req, res, next) {  //补充头部防止莫名跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
router.use(session({    // 使用 session 中间件
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
}));
router.post('/', function (req, res) {
    res.set('Content-Type','text/plain');
    if(req.session.sign == true){   //已经登陆!

    }else if(req.session.sign != true){ //还没登陆!

    }
});

module.exports = router;