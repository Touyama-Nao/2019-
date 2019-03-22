//Login routing
var express = require('express');
var router = express.Router();
var request = require('request');


//dummy db 数据库操作与定义
var dummyDb = [
    {username: 'name1',password:'123456'},
    {username: 'name2',password:'111111'},
    {username: 'name1',password:'222222'}
];


router.get('/',function(req,res){   //get请求用来呈现登陆界面
    res.render('register');    //指向login.ejs 文件
})
router.post('/',function(req,res){  //post请求用来提交表单
    console.log(req.body);
    var username = req.body.username;
    //看一下用户名是不是真的存在
    for(var i = 0;i < dummyDb.length;i++){
        if(dummyDb[i].username === username){
            res.render('register',{error:'该用户已存在!'})
            return;
        }
    }
    res.render('login',{success:'注册成功!'})
})
module.exports = router;
