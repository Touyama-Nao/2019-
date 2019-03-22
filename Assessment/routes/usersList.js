/* 获取用户列表操作 */
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('contactList', ['contactList']);
var bodyParser = require("body-parser");

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("I received a get request");
	db.contactList.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	})
});

module.exports = router;
