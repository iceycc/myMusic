'user strict';
// 此页面值是存储router中间件

// 引入express对象
const express = require('express');


// 引入userC 
const userC = require('./controllers/usersC');


// 配置路由 开始
let router = express.Router();
router
  // 登陆页
  .get('login', userC.showLogin)
  // 注册页
  .get('register', userC.showRegister)






// 暴露
module.exports = router;