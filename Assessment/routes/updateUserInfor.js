/* 修改用户列表操作 */
var User = require('../models/Users.js'); //导入数据库用户列表
var UserInfo = require('../models/UsersInfo.js'); //导入数据库用户信息
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mytestdb', ['Mess', "users", 'usersInfo']);
var bodyParser = require("body-parser");
router.use(bodyParser.json());

/* Edit users listing. */

router.all('*', function(req, res, next) {  //设置请求头部防止莫名跨域
    res.header("Access-Control-Allow-Origin", null); //防止因为设置域名为localhost而导致浏览器拒绝生成cookie,这是什么智障问题
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept, X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials","true");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
router.post('/', function (req, res) {
    console.log(req.session);
    if (req.session.sign == true) {
        db.users.findAndModify({
            query: {
                //account: mongojs.ObjectId(id)
                id: parseInt(req.session.userid)
            },
            update: {
                $set: { //参数修改
                    account: req.query.account,
                    mailbox: req.query.mailbox,
                    address: req.query.address,
                    introduction: req.query.introduction,
                    age: req.query.age
                },
            },
            new: true
        }, function (err, doc) {
            if (err) {
                console.log(err);
                res.json({
                    result: "error",
                    message: "参数错误!"
                });
                return;
            }
            res.json({
                result: "success",
                message: null
            });
            return;
        })
    } else {
        res.json({
            result: "error",
            message: "请先登陆!"
        });
        return;
    }
})

module.exports = router;