//Getlist routing
var express = require('express');
var router = express.Router();
var request = require('request');
//var User = require('../models/UsersInfo.js');
var session = require('express-session'); //使用session中间件
var mongojs = require('mongojs');
var db = mongojs('mytestdb', ['Mess', "users", 'usersInfo']);
var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post("/", function (req, res, next) { //一定要及时返回值不然会报错,请求头设置错误
    db.users.find({},{"_id":0,"logindate":0,"account":0,'password':0,'address':0,'mailbox':0,'introduction':0,'age':0},function (err, user) { //不要反悔某些字段
        if (err) {
            console.log(err);
        }
        if(req.session){
            if (user) {
                res.json({
                    result: "success",
                    message: user
                });
                return;
            } else {
                res.json({
                    result: "error",
                    message: "查询失败!"
                });
                return;
            }
        }else{
            res.json({
                result: "error",
                message: "请先登录"
            });
            return;
        }


    })

});
module.exports = router;