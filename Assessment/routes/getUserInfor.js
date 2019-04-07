/* 获取用户列表操作 */
var User = require('../models/Users.js'); //导入数据库用户列表
var UserInfo = require('../models/UsersInfo.js'); //导入数据库用户信息
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('Backstage', ['Mess', "users", 'usersInfo']);
var bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false}))

router.all('*', function (req, res, next) { //设置请求头部防止莫名跨域
	res.header("Access-Control-Allow-Origin", null); //防止因为设置域名为localhost而导致浏览器拒绝生成cookie,这是什么智障问题
	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

/* GET users listing. */
router.get('/', function (req, res, next) {
/* 	res.set('Content-Type', 'text/plain'); */
	console.log(req.query);	//get请求参数获取
	db.users.find({
		id: parseInt(req.query.id)
	}, {
		"_id": 0,
		"logindate": 0,
		"account": 0,
		'password': 0,
		'id': 0
	}, function (err, doc) {
		if (err) {
			console.log(err);
			return;
		}
		if (req.session.sign == true) {
			console.log(doc);
			if (JSON.stringify(doc) != '[]') {
				res.json({
					result: "success",
					message: doc
				});
				return;
			} else {
				res.json({
					result: "error",
					message: "查询失败!用户ID错误"
				});
				return;
			}
		} else {
			res.json({
				result: "error",
				message: "请先登录!"
			});
			return;
		}
	})

	/* 	db.contactList.find(function (err, docs) {
			console.log(docs);
			res.json(docs);
		}) */
});

module.exports = router;