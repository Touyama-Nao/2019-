/* 获取用户列表操作 */
var User = require('../models/Users.js'); //导入数据库用户列表
var UserInfo = require('../models/UsersInfo.js'); //导入数据库用户信息
var express = require('express');
var router = express.Router();
/* var mongojs = require('mongojs');
var db = mongojs('contactList', ['contactList']); */
var bodyParser = require("body-parser");

/* GET users listing. */
router.get('/', function (req, res, next) {
	console.log("I received a get request");
	User.find({
		userid: LoginDate.id
	}, function (err, user) {
		UserInfo.find({
			nickname: user.account
		}, function (err, user) {
			if (err) {
				console.log(err);
			}
			res.json({
				result: "success",
				message: user
			});
			return;
		})
	})
	res.json({
		result: "error",
		message: "查询失败!用户ID错误"
	});

	/* 	db.contactList.find(function (err, docs) {
			console.log(docs);
			res.json(docs);
		}) */
});

module.exports = router;