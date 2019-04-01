//获取与某个好友的历史消息 routing
var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../models/Users.js');
var session = require('express-session'); //使用session中间件
var mongojs = require('mongojs');
var db = mongojs('mytestdb', ['Mess', "users", 'usersInfo']);
var bodyParser = require("body-parser");


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
	secret: 'secret', // 对session id 相关的cookie 进行签名
	resave: true,
	saveUninitialized: false, // 是否保存未初始化的会话
	cookie: {
		maxAge: 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
	},
}));
router.post('/', function (req, res) {
	res.set('Content-Type', 'text/plain');
	if (req.session.sign == true) { //已经登陆!
		var record = []; //填充记录用的实际数组
		db.Mess.find({ //多层查找怎么写
			id: req.body.id //查找接受用户id 
		}, {

		}, function (err, docs) {
			if (err) {
				res.json({
					result: "error",
					message: "参数错误!"
				});
				return;
			} else {
				docs.HistoricalMess.forEach(function (each) {
					if (each.receiver == req.body.id || each.sender == req.body.id) { //如果记录跟这个人有关的话
						record.push(each); //将这条记录放进去
					}
				})
				res.json({
					result: "success",
					message: record
				});
				return;
			}
		});
		db.Mess.find({
			id: req.session.userid
		}, {

		}, function (err, docs) {
			if (err) {
				res.json({
					result: "error",
					message: "参数错误!"
				});
				return;
			} else {
				var unread = [];
				docs.UnreadMess.forEach(function (each) { //更新未读消息
					if (each.sender != req.body.id) {
						unread.push(each); //准备更新未读数组
					}
				})
				db.Mess.findAndModify({
					query: {
						id: req.session.id
					},
					update: {
						$set: {
							UnreadMess: record
						}
					},
					function (err, doc) {
						console.log(doc);
						return;
					}
					//更新数组

				})
			}
		})
	} else if (req.session.sign != true) { //还没登陆!
		res.json({
			result: "error",
			message: "查询失败!用户未登录!"
		});
		return;
	}
});

module.exports = router;