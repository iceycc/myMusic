'user strict';
// 此页面值是存储router中间件

// 引入express对象
const express = require('express');


// 引入userC   
const userC = require('./controllers/usersC');


// 配置路由 开始  /user
let router = express.Router();
router
  // 登陆页 ok
  .get('/login', userC.showLogin)
  // 注册页 ok
  .get('/register', userC.showRegister)

  // TODO:测试完毕 OK
  






// 暴露
module.exports = router;