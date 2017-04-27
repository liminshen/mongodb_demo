## <a id="top"></a>目录
*   [安装](#install)
*   [启动](#start)
*   [操作步骤](#how_use)
	*    [mongoose](#mongoose)
		*    [连接/connect](#connect)
		*    [数据类型限定/schema](#schema)
		*    [数据模型/model](#model)
		*    [常用数据库操作--增删查改/options](#options)
			*    [增](#add)
			*    [删](#delete)
			*    [改](#)
			*    [查](#find)
		*    [其他操作](#other)

## <a id="install"></a>安装
$ brew install mongodb

## <a id="start"></a>启动本地数据库[🚀](#top)

mongod --dbpath="pwd"

## <a id="how_use"></a>操作步骤

### <a id="mongoose"></a>mongoose(node环境下操作)

* 	<a id="connect"></a>连接数据库 [🚀](#top)

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
##	<a id="options"></a>常用数据库操作--增删查改[🚀](#top)
### <a id="add"></a>save[🚀](#top)
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

### <a id="update"></a>update

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

### <a id="find&update"></a>findByIdAndUpdate

*  常用方法还有findByIdAndUpdate，这种比较有指定性，就是根据_id
*  Model.findByIdAndUpdate(id, [update], [options], [callback])//id 更新数据
*  其它更新方法
 	* Model.findOneAndUpdate([conditions], [update], [options], [callback])　　　　　　//找到一条记录并更新

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

### <a id="delete"></a>删除[🚀](#top)

* Model.remove(conditions, [callback]) 
* 其它常用方法还有： 
	* Model.findByIdAndRemove(id, [options], [callback])　　　　　　
	*	Model.findOneAndRemove(conditions, [options], [callback])
	
```
var UserModel = require("./user.js");

function del(){
    var wherestr = {'username' : 'Tracy McGrady'};
    
    UserModel.remove(wherestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

del();
```	

### <a id="find"></a>条件查询  已先插入一些测试数据 。。[🚀](#top)

* Model.find(conditions, [fields], [options], [callback])

```
var UserModel = require("./user.js");

function getByConditions(){
    var wherestr = {'username' : 'Tracy McGrady'};//搜索条件
    var opt = {"username": 1 ,"_id": 0};//输出条件 1是显示，0是不显示
    
    UserModel.find(wherestr, opt ,function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

getByConditions();
```	
比如我要查询年龄范围条件应该怎么写呢？

　　User.find({userage: {$gte: 21, $lte: 65}}, callback);    //这表示查询年龄大于等21而且小于等于65岁

 
```	
其实类似的还有：　

$or　　　　或关系

$nor　　　 或关系取反

$gt　　　　大于

$gte　　　 大于等于

$lt　　　　 小于

$lte　　　  小于等于

$ne            不等于

$in             在多个值范围内

$nin           不在多个值范围内

$all            匹配数组中多个值

$regex　　正则，用于模糊查询

$size　　　匹配数组大小

$maxDistance　　范围查询，距离（基于LBS）

$mod　　   取模运算

$near　　　邻域查询，查询附近的位置（基于LBS）

$exists　　  字段是否存在

$elemMatch　　匹配内数组内的元素

$within　　范围查询（基于LBS）

$box　　　 范围查询，矩形范围（基于LBS）

$center       范围醒询，圆形范围（基于LBS）

$centerSphere　　范围查询，球形范围（基于LBS）

$slice　　　　查询字段集合中的元素（比如从第几个之后，第N到第M个元素）

　　

可能还有一些，没什么印象，大家自行看看api ^_^!　　
```	

### <a id="count"></a>数量查询

* Model.count(conditions, [callback])

```
var UserModel = require("./user.js");

function getCountByConditions(){
    var wherestr = {};
    
    UserModel.count(wherestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}
getCountByConditions();
```	

### <a id="findById"></a>根据_id查询

* Model.findById(id, [fields], [options], [callback])

```
var UserModel = require("./user.js");

function getById(){
    var id = '56f261fb448779caa359cb73';
    
    UserModel.findById(id, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

getById();
```	
### <a id="findInRegex"></a> 模糊查询(正则匹配查询)

* 示例中查询出所有用户名中有'm'的名字，且不区分大小写，模糊查询比较常用，正则形式匹配，正则方式就是javascript正则，用到的比较多！

```
var UserModel = require("./user.js");

function getByRegex(){
    var whereStr = {'username':{$regex:/m/i}};//根据正则匹配查询
    
    UserModel.find(whereStr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

getByRegex();
```	

### <a id="getpage"></a> 分页查询[🚀](#top)

* 分页是用得比较多的查询，分页原理用过其它数据库的都知道，分页用到的函数和mysql的比较类似
* 上面我用到sort(),这个是排序规则，就不单讲了！

```
var UserModel = require("./user.js");

function getByPager(){
    
    var pageSize = 5;                   //一页多少条
    var currentPage = 1;                //当前第几页
    var sort = {'logindate':-1};        //排序（按登录时间倒序）
    var condition = {};                 //条件
    var skipnum = (currentPage - 1) * pageSize;   //跳过数
    
    UserModel.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

getByPager();
```	

## <a id="other"></a>其它操作[🚀](#top)

### 索引和默认值
* ndex ：建索引
* default：默认值

--user.js

```
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({          
    username : { type: String , index: true},       //**用户账号**
    userpwd: {type: String},                        //密码
    userage: {type: Number},                        //年龄
    logindate : { type: Date, default:Date.now}     //**最近登录时间**
});

module.exports = mongoose.model('User',UserSchema);
```	

### LBS地址位置[🚀](#top)
lbs : { type: Array, index: '2d', sparse: true }   //地理位置
　　上面有介绍过很多基于LBS的条件查询，Schema中定义时如上

　　LBS查询对于一些基于LBS应用会用得比较多。
　　
### 其它常用方法[🚀](#top)
*	Model.distinct(field, [conditions], [callback])　　　　　　　　　　　　　　　　　　//去重

*	Model.findOne(conditions, [fields], [options], [callback])　　　　　　　　　　　　 //查找一条记录

*	Model.findOneAndRemove(conditions, [options], [callback])　　　　　　　　　　 //查找一条记录并删除

*	Model.findOneAndUpdate([conditions], [update], [options], [callback])　　　　　 //查找一条记录并更新

## 参考资料[🚀](#top)
[mongo学习笔记十四](http://www.cnblogs.com/zhongweiv/p/mongoose.html#mg_count)