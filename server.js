var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');



// 创建一个应用
var app = express();
app.use(logger('dev'));//在终端上打印日志
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set(multer()); // for parsing multipart/form-data

//设置托管静态资源
app.use(express.static('static',{lastModified:true}));
//设置渲染引擎
app.set('views', path.join(__dirname, 'views'));//文件路径
app.set('view engine', 'jade');//模板引擎
app.engine('jade', require('jade').__express);

//路由
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var newsRouter = require('./routes/news');
app.get('/', indexRouter);






console.log(app.locals);
module.exports = app;
