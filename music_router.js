'user strict';
// 此页面值是存储router中间件

// 引入express对象
const express = require('express');


// 引入userC 
const userC = require('./controllers/musicC');


// 配置路由 开始  /music
let router = express.Router();
router
  // 添加音乐
  .get('/add-music', userC.showAddMusic)
  // 显示页面列表
  .get('/list-music', userC.showListMusic)

// TODO:postman 验证完毕 然后就是做前端验证
// 暴露
module.exports = router;               