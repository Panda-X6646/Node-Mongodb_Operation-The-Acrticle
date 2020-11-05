var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 引入操作数据库的模块 
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');

// 引入路由
var apiRouter = require('./routes/apis');

// 输入权限用户和密码，连接数据库参数为   数据库协议地址数据库名称、权限用户名和密码，然后并绑定成功和失败的回调函数   
mongoose.connect('mongodb://localhost/xzq', {user:"root", pass:"123456", authSource:"admin"});
mongoose.connection.on('connected', function () {
  console.log('数据库已连接');
})
mongoose.connection.on('error', function (err) {
  console.log(err);
})







var app = express();

// 引入ejs模板
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 设置静态文件的根目录
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// 应用路由
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;      






// 开启页面监听
app.listen(1234, function (err)  {
  if (!err) {
    console.log('1234端口号服务器已开启....')

  }else{
    console.log(err);
  }
})







// 技术栈node mongodb mongoose

// 实现的功能：文章的发布、修改、删除和查询

// 业务逻辑：客户端发送请求，服务器查询或修改数据库中的数据，然后将得到的数据响应给客户端渲染

// 1.文章发布
// -客户发送获取文章发布的静态页面请求，
// -服务器响应文章发布的静态页面   

// -文章编辑完毕，点击发送按钮发送异步请求，
// -服务器调用saveAPI将数据保存到数据库中，如果响应成功，服务器向客户端发送文章发布成功的JSON格式的数据，弹出发布成功并跳转到文章的列表页，否则响应发布失败
  // --跳转到文章列表页面
  // ·发送请求获取文章列表的请求，
  // ·服务器调用findAPI将保存在数据库中的这个集合下的所有数据响应到客户，客户端拿到数据通过BOM操作跳转并刷新/api/articles的页面

// 2.删除文章
  // -客户端通过AJAX发送DELETE请求，如果响应成功，服务器向客户端发送文章删除成功的JSON格式的数据，并且调用findByIdAndRemoveAPI通过id将数据库的文章删除

// 3.查询文章的内容详情
  // -通过a标签跳转到view.html的空白数据页面，服务器通过客户端请求地址上的id值从数据库查询文章的内容，然后将数据响应给客户端渲染,

// 4.修改文章
  // -通过a标签跳转到edit.html的空白数据页面，服务器通过客户端请求地址上的id值从数据库查询文章的内容，然后将数据响应给客户端渲染,
  // -文章修改完成点击发布时，通过AJAX发送PUT请求，服务器通过findByIdAndUpdate的API将数据库的这篇文章进行修改，然后通过BOM操作跳转并刷新/api/articles的页面



















