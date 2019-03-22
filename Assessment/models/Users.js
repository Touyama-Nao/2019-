var mongoose = require('mongoose'); //mongoose是一个nodejs模块，通过require方法引入mongoose
var Schema = mongoose.Schema;
var UserSchema = new Schema(    //这是我们创建的Schema实例
    {
        account : { type:String},
        password:{type:Number},
        logindate:{type:Date},
        id:{ type:Number},
        address : { type:String},
        mailbox:{type:String},
        introduction:{type:String},
        nickname:{ type:String},
        age:{ type:Number}
    }
)
module.exports = mongoose.model('users',UserSchema,'users'); //抛出模块