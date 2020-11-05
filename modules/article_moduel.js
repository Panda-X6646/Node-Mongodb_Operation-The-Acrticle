var Mongoose = require('mongoose');

// 定义文章的字段和字段的数据类型
var articleSchema = new Mongoose.Schema({
    title: String,
    source: String,
    author: String,
    content: String,
    createTime: String
});

// 在article集合创建model对象来操作文章
var article = Mongoose.model('article', articleSchema);


module.exports = article;

















