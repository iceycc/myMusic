// 此页面值是存储router中间件

// 引入express对象
const express = require('express');


// 引入userC 
const userC = require('./controllers/usersC');






// 配置路由 开始
let router = express.Router();
router
  // 1-测试路由
  .get('/test', userC.doTest)
  // 2-检测用户名是否存在
  .post('/user-check', userC.userCheck)
// 3-注册新用户
  .post('/user-register', userC.doRegister)
// 4-添加音乐
// 5-跟新音乐








// 暴露
module.exports = router;