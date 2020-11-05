var express = require('express');

// 
var articleServices = require('../services/article_services');

var router = express.Router();
/* GET users listing. */

// 响应保存文章的请求
router.post('/articles', function(req, res, next) {
  var {title, author, source, content} = req.body;    //express.urlencoded()中间件
  var art = {title, author, source, content, createTime : new Date().toLocaleDateString()};

  // 保存文章数据到数据库
  articleServices.save(art)
    .then(function () {
      res.json({msg: '文章发送成功'});
    })
    .catch(function (err) {
      res.json({
        msg: '文章发送失败'
      });
    });
});



// 响应获取文章列表的请求
router.get('/articles', function(req, res, next) {

  // 查询数据库的所有文章
  articleServices.selectAll()
    .then(function (data) {
      res.render('articles/list', {articles: data});
    })
    .catch(function (err) {
      throw err;
    });
})


// 响应删除文章的请求
router.delete('/articles/:id', function(req, res, next) {

  // 根据id删除数据库的文章
  articleServices.deleteById(req.params.id)
    .then(function () {
      res.json({msg: '文章删除成功'});
    })
    .catch(function (err) {
      res.json({msg: '文章删除失败'});
      
    });
})


// 通过id从数据库中查询文章信息，并响应回客户端
router.get('/articles/:id', function(req, res, next) {

  // 根据id查询数据库的文章
  articleServices.selectById(req.params.id)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      throw err;
    });
})





// 修改文章
router.put('/articles/:id', function(req, res, next) {
  var id = req.params.id;
  let {title, author, source, content} = req.body;
  var upDatas = {title, author, source, content};
  // console.log(id, upDatas);

  // 根据id修改数据库的文章
  articleServices.upDataById(id, upDatas)
    .then(function () {
      res.json({msg: '文章修改成功'});
    })
    .catch(function (err) {
      res.json({msg: '文章修改失败'});
      
    });
})



module.exports = router;
