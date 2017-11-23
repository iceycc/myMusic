'use strict';
// 引入数据库操作对象 db
const db = require('../models/db');
let userC = {

};

/**
 * 测试
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
userC.doTest = (req, res, next) => {
  db.q('select * from users', [], (err, data) => {
    if (err) return next(err);
    res.render('test.html', {
      text: data[0].username
    });
  })
};

/**
 * 用户名校验是否存在
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
userC.userCheck = (req, res, next) => {
  // 获取请求体中的数据 req.body
  let username = req.body.username;
  // 查询用户名是否存在在数据库中
  db.q('select * from users where username = ?', [username], (err, data) => {
    if (err) return next(err);
    // 
    if (data.length == 0) {
      // 可以注册
      res.json({
        code: '001',
        msg: '可以注册'
      })
    } else {
      res.json({
        code: '002',
        msg: '用户名已存在'
      })
    }

  });
};

/**
 * 注册
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
userC.doRegister = (req,res,next)=>{
  
}

module.exports = userC;