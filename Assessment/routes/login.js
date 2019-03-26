//Login routing
var express = require('express');
var app = express();
var router = express.Router();
var request = require('request');
var cors = require('cors')
//router.use(cors({credentials: true, origin: 'http://127.0.0.1:3000'}));
//var User = require('../models/Users.js');
var mongojs = require('mongojs');
var db = mongojs('mytestdb', ['Mess',"users",'usersInfo']);
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var session = require('express-session'); //使用session中间件
router.all('*', function(req, res, next) {  //设置请求头部防止莫名跨域
    res.header("Access-Control-Allow-Origin", "*"); //防止因为设置域名为localhost而导致浏览器拒绝生成cookie
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
router.use(session({ // 使用 session 中间件
    name: "", // 设置 cookie 中保存 session id 的字段名称
    secret: "secret", // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    secret: 'test secret',
    cokkie: { maxAge: 60 * 1000 * 300 } //过期时间 ms
}))



router.get('/', function (req, res) { //get请求用来呈现登陆界面
    res.render('error'); //指向login.ejs 文件
})
router.post('/', function (req, res) { //post请求用来提交表单
    console.log(req.body);
   // console.log(req.sessionStore.MemoryStore );
    var LoginDate = req.body;
    db.users.findOne({
        'account': req.body.account,
        'password': parseInt(req.body.password)    //这里要注意parseInt!
    }, {"_id":0,"logindate":0,"account":0,'password':0,'address':0,'mailbox':0,'introduction':0,'nickname':0,'age':0},function (err, doc) { //查找用户列表
        if (err) {
            console.log(err);
            return;
        }
        if (req.session.sign != true) {
            if(doc){
                req.session.sign = true;
                req.session.userName = req.body.account; //用session保存登录状态
/*                 res.json({
                    result: "success",
                    message: '登陆成功!',
                    userid:doc
                }); */
                var back = JSON.stringify({
                    result: "success",
                    message: '登陆成功!',
                });
                res.end(back);
                return;
            }else{
                res.json({
                    result: "error",
                    message: '登陆失败!账号或密码错误'
                });
                return;
            }
        } else if (req.session.sign == true) {
                req.session.userName = req.body.account; //用session保存登录状态
                res.json({
                    result: "success",
                    message: 'Nice to see you again!',
                    userid:doc
                });
                return;
            }
        res.json({
            result: "error",
            message: '登陆失败!账号或密码错误'
        });
        return;
    })
})


module.exports = router;