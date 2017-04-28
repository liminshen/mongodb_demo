var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoCtrl = require('./mongo/index.js');
var middleWare = require('./source/middleware');



// 创建一个应用
var app = express();
app.use(logger('dev'));//在终端上打印日志
app.use(cookieParser());
app.use(middleWare.cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set(multer()); // for parsing multipart/form-data

//路由
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var newsRouter = require('./routes/news');
// app.get('/', indexRouter);
app.get('/api/user/login',function (req,res) {
    res.cookie("account", {account: 'aoisdasidhasodihios', hash: {h:1}, last: new Date()}, {maxAge: 60000});
    res.end();
});
app.get('/api/user/add', function (req,res) {
    var req_data = req.query;
    mongoCtrl.add({
        name:req_data.name,
        age:req_data.age,
        email:req_data.email,
        sex:req_data.sex
    },function (n) {
        res.json(result(0,{name:n},'添加成功'));
    });
});
app.get('/api/user/getList', function (req,res) {
    // var req_data = req.query;
    console.log(req.cookies);
    mongoCtrl.getList(function (data) {
        res.json(result(0,data,'获取用户列表成功'));
    });
});

function result(code,data,msg) {
    return {
        code : code,
        data : data,
        message : msg
    }
}
app.listen(8099);

module.exports = app;
