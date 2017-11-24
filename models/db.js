// 用户数据链接 查询
// 引入公共配置文件
const config = require('../config');

// 引入数据库对象
const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: config.db_connectionLimit,
  host: config.web_port,
  user: config.db_user,
  password: config.db_password,
  database: config.db_database
});


// 一个用于查询的函数
let q = function (sql,pps,callback) {
  // 获取链接
  pool.getConnection((err,connection)=>{
    if (err) return callback(err, null);
    // 常见查询
    connection.query(sql,pps,(error,results)=>{
      // 释放
      connection.release();
      //不管有没有error,让外部判断
      callback(error, results);

    })
  })
};

// 将q向外暴露
 module.exports={
   q:q
 }