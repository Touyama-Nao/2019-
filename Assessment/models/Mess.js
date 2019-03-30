/* 历史消息数据类型模型 */
var mongoose = require('mongoose'); //mongoose是一个nodejs模块，通过require方法引入mongoose
var Schema = mongoose.Schema;
var NewsSchema = new Schema(    //这是我们创建的Schema实例
    {
        id:{ type:Number},
        HistoricalMess: { type:Array},
        UnreadMess:{type:Array}
    }
)
module.exports = mongoose.model('Mess',MessSchema,'Mess'); //抛出模块