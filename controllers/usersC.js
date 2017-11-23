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
  // 1 接受数据
  let userData = req.body;
  let username = userData.username;
  let password = userData.password;
  let v_code = userData.v_code;
  let email = userData.email;
  // 2处理数据 验证
  // 2-1 验证码验证 暂留 TODO:
  // 2-2 验证邮箱 
  let regex = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
  if (!regex.test(email)) {
    // 不满足邮箱格式
    res.json({
      code: '004', msg: '邮箱不合法'
    });
    return;
  }
  // 2-3 验证用户名或者邮箱是否存在
  db.q('select * from users where username = ? or email = ?',
  [username,email],(err,data)=>{
    if(err) return next(err);
    if(data.length != 0 ){
      let user = data[0];
      if(user.email == email){
        return res.json({
          code:'002',msg:'邮箱已经注册'
        });
      } else if(user.username == username) {
        return res.json({
          code:'002',msg:'用户名已经注册'
        })
      }
    }else{
      // 用户名和邮箱都不存在 可以注册
      db.q('insert into users (username,password,email) values (?,?,?)',
    [username,password,email],(err,data)=>{
      if(err) return next(err);
      res.json({
        code: '002', msg: '用户名已经注册成功'
      })
    })
    }

  })
 
}




module.exports = userC;