// 此页面值是存储router中间件

// 引入express对象
const express = require('express');


// 引入userC 
const userC = require('./controllers/usersC');
// 引入musicC
const musicC = require('./controllers/musicC')






// 配置路由 开始
let router = express.Router();
router
  // 1-测试路由
  .get('/test', userC.doTest)
  // 2-检测用户名是否存在
  .post('/user-check', userC.userCheck)
  // 3-注册新用户
  .post('/user-register', userC.doRegister)
  // 4-登陆
  .post('/user-login', userC.doLogin)

  // 5-添加音乐
  .post('/music-add', musicC.addMusic)
  // 6-跟新音乐
  .post('/music-update', musicC.updateMusic)
  // 7-删除音乐
  .get('/music-del',musicC.delMusic)
  // 8-退出账号
  .get('/user-logout', userC.userLogout)




// 暴露
module.exports = router;