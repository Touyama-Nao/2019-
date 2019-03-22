//Getlist routing
var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../models/UsersInfo.js');
var session = require('express-session'); //使用session中间件

router.post("/", function (req, res, next) {
    User.find( function (err, user) {
        if (err) {
            console.log(err);
        }
        res.json({
            result: "success",
            message: user
        });
        return;
    })
    res.json({
        result: "error",
        message: "查询失败!"
    });
});
module.exports = router;