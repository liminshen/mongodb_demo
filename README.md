## 目录
*   [安装](#install)
*   [启动](#start)
*   [操作步骤](#how_use)
	*    [mongoose](#mongoose)
		*    [连接/connect](#connect)
		*    [数据类型限定/schema](#schema)
		*    [数据模型/model](#model)
		*    [增删查改/options](#options)

## <a id="install"></a>安装
$ brew install mongodb

## <a id="start"></a>启动本地数据库

mongod --dbpath="pwd"

## <a id="how_use"></a>操作步骤

### <a id="mongoose"></a>mongoose(node环境下操作)

* 	<a id="connect"></a>连接数据库 

--db.js

```
var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/mongoosesample';//mongo地址

/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});    

```

* 	<a id="schema"></a>schema 
	* 是mongoose里会用到的一种数据模式，可以理解为表结构的定义；每个schema会映射到mongodb中的一个collection，它不具备操作数据库的能力,我们先改造一下db.js，导出mongoose对象

--db.js

```
/**
 * ⤴️
 */
module.exports = mongoose;
```
--user.js //下面我们定义一个user的Schema，命名为user.js

```
/**
 * 用户信息
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({          
    username : { type: String },                    //用户账号
    userpwd: {type: String},                        //密码
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
```

* 	<a id="model"></a>model
	*   model是由schema生成的模型，可以对数据库的操作 我们对上面的定义的user的schema生成一个User的model并导出，修改后代码如下
	*   
--user.js

```
/**
 * ⤴️
 */
module.exports = mongoose.model('User',UserSchema);
```
####	<a id="options"></a>增删查改
* save
	*	Model.save([fn])

```
var UserModel = require("./user.js");

/**
 * 插入
 */
function insert() {
 
    var userModel = new UserModel({
        username : 'Tracy McGrady',                 //用户账号
        userpwd: 'abcd',                            //密码
        userage: 37,                                //年龄
        logindate : new Date()                      //最近登录时间
    });

    userModel.save(function (err, res) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });
}

insert();
```

* update
	*  Model.update(conditions, update, [options], [callback])//查询条件，替换数据

```
var UserModel = require("./user.js");

function update(){
    var wherestr = {'username' : 'Tracy McGrady'};
    var updatestr = {'userpwd': 'zzzz'};
    
    UserModel.update(wherestr, updatestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

update();
```

* findByIdAndUpdate
	*  常用方法还有findByIdAndUpdate，这种比较有指定性，就是根据_id
	*  Model.findByIdAndUpdate(id, [update], [options], [callback])//id 更新数据

```
var UserModel = require("./user.js");

function findByIdAndUpdate(){
    var id = '56f2558b2dd74855a345edb2';
    var updatestr = {'userpwd': 'abcd'};
    
    UserModel.findByIdAndUpdate(id, updatestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

findByIdAndUpdate();
```