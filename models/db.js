// 用户数据链接 查询
// 引入数据库对象
const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: 'wby123',
  database: 'node_music'
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