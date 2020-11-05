// 定义对文章操作（增删改查）

// 引入操作数据库的model的模块对象
var Article = require('../modules/article_moduel');

// 定义保存文章的方法
var save = function (art) {
    return new Article(art).save();
}

// 定义查看文章列表的方法
var selectAll = function () {
    return Article.find({});
}

// 定义删除文章列表的方法
var deleteById = function (id) {
    return Article.findByIdAndRemove(id);
}

// 定义查看文章详情的方法
var selectById = function (id) {
    return Article.findById(id);
}

// 定义修改文章的方法
var upDataById = function (id, data) {
    return Article.findByIdAndUpdate(id, data);
}

module.exports = {
    save,
    selectAll,
    deleteById,
    selectById,
    upDataById
}