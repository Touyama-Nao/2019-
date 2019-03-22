var mongoose = require('./mongoose'); //mongoose是一个nodejs模块，通过require方法引入mongoose
var Schema = mongoose.Schema;
var UserSchema = new Schema(    //这是我们创建的Schema实例
    {
        account : { type:String},
        password:{type:String},
        logindate:{type:Date}
    }
)
module.exports = mongoose.model('User',UserSchema); //抛出模块