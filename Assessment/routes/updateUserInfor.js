/* 修改用户列表操作 */
var User = require('../models/Users.js'); //导入数据库用户列表
var UserInfo = require('../models/UsersInfo.js'); //导入数据库用户信息
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mytestdb', ['Mess',"users",'usersInfo']);
var bodyParser = require("body-parser");

/* Edit users listing. */
router.put('/contactlist', function (req, res) {
    res.set('Content-Type','text/plain');
    var id = req.params.id;
    console.log(req.body.acount);
    db.usersInfo.findAndModify({
        query: {
            id: mongojs.ObjectId(id)
        },
        updata: {
            $set: { //参数修改
                account: req.body.account,
                mailbox: req.body.mailbox,
                address: req.body.address,
                introduction: req.body.introduction,
                age: req.body.age
            },
        },
        new: true
    }, function (err, doc) {
        res.json(doc)
    })
})

module.exports = router;
