/* 获取用户列表操作 */
var User = require('../models/Users.js'); //导入数据库用户列表
var UserInfo = require('../models/UsersInfo.js'); //导入数据库用户信息
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mytestdb', ['Mess',"users",'usersInfo']);
var bodyParser = require("body-parser");

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.set('Content-Type','text/plain');
	db.uers.find({
		userid: LoginDate.id
	},{"_id":0,"logindate":0,"account":0,'password':0,'id':0}, function (err, user) {
		UserInfo.find({
			nickname: user.account
		}, function (err, user) {
			if (err) {
				console.log(err);
			}
			if(req.session.sign == true){
				if(user){
					res.json({
						result: "success",
						message: user
					});
					return;
				}else{
					res.json({
						result: "error",
						message: "查询失败!用户ID错误"
					});
					return ;
				}
			}else{
				res.json({
					result: "error",
					message: "请先登录!"
				});
				return;
			}

		})
	})

	/* 	db.contactList.find(function (err, docs) {
			console.log(docs);
			res.json(docs);
		}) */
});

module.exports = router;