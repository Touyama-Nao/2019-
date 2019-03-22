//Login routing
var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/',function(req,res){   //get请求用来呈现登陆界面
    res.render('login');    //指向login.ejs 文件
})
router.post('/',function(req,res){  //post请求用来提交表单
    console.log(req.body);
})


module.exports = router;