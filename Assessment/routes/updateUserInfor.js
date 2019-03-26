/* 修改用户列表操作 */
var User = require('../models/Users.js'); //导入数据库用户列表
var UserInfo = require('../models/UsersInfo.js'); //导入数据库用户信息
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mytestdb', ['Mess', "users", 'usersInfo']);
var bodyParser = require("body-parser");

/* Edit users listing. */

router.all('*', function (req, res, next) {
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
router.put('/', function (req, res) {
    if (req.session) {
        res.json({
            result: "error",
            message: "请先登陆!"
        });
        return;
    }
    res.set('Content-Type', 'text/plain');

    var id = req.query.id;
    if (req.session.sign == true) {
        db.users.findAndModify({
            query: {
                //account: mongojs.ObjectId(id)
                account: req.session.userName
            },
            updata: {
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