//发送消息 routing
var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../models/Users.js');
var session = require('express-session'); //使用session中间件
var mongojs = require('mongojs');
var db = mongojs("back:As333666@127.0.0.1/Backstage", ['Mess', "users", 'usersInfo']);
var bodyParser = require('body-parser');
router.use(bodyParser.json());


router.all('*', function(req, res, next) {  //设置请求头部防止莫名跨域
    res.header("Access-Control-Allow-Origin", null); //防止因为设置域名为localhost而导致浏览器拒绝生成cookie,这是什么智障问题
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept, X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials","true");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
router.use(session({ // 使用 session 中间件
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
router.post('/', function (req, res) {
	/* res.set('Content-Type', 'text/plain'); */
	if (req.session.sign == true) { //已经登陆!
		if(req.body.receiver == req.session.userid){
			res.json({
				result:"failed",
				message:"不能发消息给自己！"
			});
			return;
		}
		db.Mess.find({
			id:	parseInt(req.body.receiver)//查找接受用户id 
		}, function (err, doc) {
			if(err){
				res.json({
					result: "failed",
					message: "参数错误!"
				})
			}
			console.log(JSON.stringify(doc[0]));
			if(doc[0] != undefined){
				var unread = req.body;	//设置未读消息
				unread.date = new Date();	//将发送时间设置成当前接受到请求的时间
				unread.sender = req.session.userid;	//将发送者的id赋成当前用户id
				var result = doc[0].UnreadMess;	//查询返回未读消息数组
				var result2 = doc[0].HistoricalMess //查询返回已读消息数组
				result.push(unread);
				result2.push(unread);
				db.Mess.update({'id':parseInt(req.body.receiver)},{$set:{'UnreadMess':result}})
				db.Mess.update({'id':parseInt(req.body.receiver)},{$set:{'HistoricalMess':result2}})
				db.Mess.find({
					id:	parseInt(req.session.userid)//查找发送用户id 
				}, function (err, doc) {
					if(err){
						res.json({
							result: "failed",
							message: "参数错误!"
						})
					}
					if(doc[0] != undefined){
						var result3 = doc[0].HistoricalMess//存入发送者的历史记录
						result3.push(req.body);
						db.Mess.update({'id':parseInt(req.session.userid)},{$set:{'HistoricalMess':result3}})
					}else{
						res.json({
							result: "failed",
							message: "参数错误!"
						})
					}
				})
				res.json({
					result: "success",
					message: "发送成功!"
				});
				return;
			}else{
				res.json({
					result: "failed",
					message: "参数错误!"
				});
				return;
			}

		})
	} else if (req.session.sign != true) { //还没登陆!
		res.json({
			result: "failed",
			message: "请先登录!"
		});
		return;
	}
});

module.exports = router;