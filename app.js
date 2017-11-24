'use strict';
// 1-创建服务器对象
const express = require('express');
// 2-创建服务器对象
const app = express();
// 3-开启服务器端口
app.listen(9898, () => {
  console.log('我自己的音乐服务启动了');
});


// 引入处理post请求体对象
const bodyParser = require('body-parser');
//引入session
const session = require('express-session');

// 配置模版引擎
app.engine('html', require('express-art-template'));


// 引入router中间件文件
const api_router = require('./web_router');
const user_router = require('./user_router');





// 4:处理请求


// 中间件配置行为列表

// no.1:在路由使用session之前，先生产session
app.use(session({
  secret: 'iceyMusic', //唯一标识，必填
  //true强制保存,不管有没有改动session中的数据，依然重新覆盖一次
  resave: false,
  //一访问服务器就分配session
  //如果为false,当你用代码显式操作session的时候才分配
  saveUninitialized: true,
  // 仅仅在https下使用 
  // cookie: {secure: true} 
}));


// no.2:处理post请求数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());

// no.3:路由中间件
app.use('/api', api_router);
app.use('/user', user_router);
// app.use('/music',musice_router);

// no.4:错误处理中间件
app.use((err, req, res, next) => {
  console.log(err);
  res.send(`
        <div style="background-color:yellowgreen;">
            您要访问的页面，暂时去医院了..请稍后再试..
            <a href="/">去首页</a>
        </div>
    `)
});