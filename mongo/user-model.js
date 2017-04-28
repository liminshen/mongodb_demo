/**
 * 用户信息
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username : { type: String },                    //用户账号
    useremail: {type: String},                        //密码
    usersex: {type: String},                        //密码
    userage: {type: Number},                        //年龄
    logindate : { type: Date}                       //最近登录时间
});
/*
定义一个Schema就这么简单，指定字段名和类型

　　Schema Types内置类型如下：

　　String  字符串

　　Number 数字

　　Boolean | Bool   布尔值

　　Array 数组

　　Buffer buffer字符串

　　Date 日期

　　ObjectId | Oid 唯一凭证

　　Mixed 混合
*/
module.exports = mongoose.model('User',UserSchema);
