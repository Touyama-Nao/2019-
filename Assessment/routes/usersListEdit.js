/* 修改用户列表操作 */
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('contactList', ['contactList']);
var bodyParser = require("body-parser");

/* Edit users listing. */
router.put('/contactlist', function (req, res) {
    res.set('Content-Type','text/plain');
    var id = req.params.id;
    console.log(req.body.acount);
    db.contactList.findAndModify({
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
