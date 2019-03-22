var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('contactList', ['contactList']);
var bodyParser = require("body-parser");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
