//导入数据库文件用mongoose连接方式
var mongoose = require('mongoose');
DB_URL = 'mongodb://localhost:27017/mytestdb';
mongoose.connect(DB_URL);   //链接数据库

mongoose.connection.on('connected',function(){
    console.log('Mongoose connection open to ' + DB_URL);
    require('./test.js')
})

mongoose.connection.on('error',function(err){
    console.log('Mongoose connection error ' + err);
});

mongoose.connection.on('disconnected',function(){
    console.log('Mongoose connection disconnected ');
});
module.exports = mongoose;