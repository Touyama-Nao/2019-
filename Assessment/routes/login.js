//Login routing
var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('./models/User.js');
var session = require('express-session');   //使用session中间件

router.use(session({    // 使用 session 中间件
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
}));

router.get('/',function(req,res){   //get请求用来呈现登陆界面
    res.render('login');    //指向login.ejs 文件
})
router.post('/',function(req,res){  //post请求用来提交表单
    res.writeHead(200,{"Content-Type":"text/plain;charset=UTF-8"});//纯文本
    var LoginDate = req.body;
    User.find(function(err,user){   //查找用户列表
        if(err)
        {
            console.log(err);
        }
        //console.log(user);
        for(let i = 0;i<user.length;i++){
            if(user[i].account == LoginDate.account && req.session.sign!=true){
                if(user[i].password == LoginDate.password){
                    req.session.sign = true;
                    req.session.userName = req.body.username;   //用session保存登录状态
                    res.json({result : "success", message : '登陆成功!'});
                    return;
                }
            }else if(user[i].account == LoginDate.account && req.session.sign == true){
                if(user[i].password == LoginDate.password){
                    req.session.userName = req.body.username;   //用session保存登录状态
                    res.json({result : "success", message : 'Nice to see you again!'});
                    return;
                }
            }
        }
        res.json({result : "error", message : '登陆失败!账号或密码错误'});
        return;
    })
})


module.exports = router;