'use strict';
// 这里专门处理音乐页面的业务逻辑

// 引入数据库操作对象 db
const db = require('../models/db');
// 解析文件上传
const formidable = require('formidable');
// 引入path核心对象
const path = require('path');
// 引入公共配置对象
const config = require('../config');



let musicC = {};


/**
 * 添加音乐
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
musicC.addMusic = (req, res, next) => {
  // 判断是否存在session上的user
  // if (!req.session.user) {
  //   res.send(`
  //                请去首页登录
  //                <a href="/user/login">点击</a>
  //           `);
  //   return;
  // }
  // 登陆成功
  // 声明一个formidable对象 固定格式
  var form = new formidable.IncomingForm();
  // 设置默认的文件上传地址
  form.uploadDir = path.join(config.rootPath,'public/files');
  form.parse(req, (err, fields, files) => {
    if (err) return next(err);
    // console.log(fields, files);

    let title = fields.title;
    let singer = fields.singer !='' ? fields.singer : '未知歌手';
    let time = fields.time != '' ? fields.time : '1000s';
    // 判断title是否填写 否则返回提示
    if (!title) {
      return res.json({
        code: '001',
        msg: '请填写歌名'
      })
    }
    // 判断是否上传歌曲 否则返回提示
    if (files.file) {
      //获取文件名
      let filename = path.parse(files.file.path).base;
      var filepath = `/public/files/${filename}`;
    } else {
      return res.json({
        code: '001',
        msg: '请上传歌曲'
      })
    }
    // 判断是否上传歌词  否则返回提示
    if (files.filelrc) {
      // 获取文件名
      let lrcname = path.parse(files.filelrc.path).base;
      var lrcpath = `/public/files/${lrcname}`;
    } else {
      return res.json({
        code: '001',
        msg: '请上传歌曲歌词'
      })
    }
    // 用户名的id
    let uid = req.session.user.id;
    // 插入音乐数据
    db.q('insert into musics (title,singer,time,file,filelrc,uid) values (?,?,?,?,?,?)', [title, singer, time, filepath, lrcpath, uid], (err, data) => {
      if (err) return next(err)
      res.json({
        code: '001',
        msg: '添加音乐成功'
      })
    })
  })
}

/**
 * 更新音乐
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
musicC.updateMusic = (req,res,next) => {
  // 判断session上的user
  // if (!req.session.user) {
  //   res.send(`
  //                请去首页登录
  //                <a href="/user/login">点击</a>
  //           `);
  //   return;
  // }
  // 登陆成功
  // 声明一个formidable对象 固定格式
  var form = new formidable.IncomingForm();
  // 设置默认的文件上传地址
  form.uploadDir = path.join(config.rootPath,'public/files');
  form.parse(req, (err, fields, files) => {
    if (err) return next(err);
    // console.log(fields, files);

    let title = fields.title;
    let singer = fields.singer != '' ? fields.singer : '未知歌手';
    let time = fields.time != '' ? fields.time : '1000s';
    // 判断title是否填写 否则返回提示
    if (!title) {
      return res.json({
        code: '001',
        msg: '请填写歌名'
      })
    }
    // 判断是否上传歌曲 否则返回提示
    if (files.file) {
      //获取文件名
      let filename = path.parse(files.file.path).base;
      var filepath = `/public/files/${filename}`;
    } else {
      return res.json({
        code: '001',
        msg: '请上传歌曲'
      })
    }
    // 判断是否上传歌词  否则返回提示
    if (files.filelrc) {
      // 获取文件名
      let lrcname = path.parse(files.filelrc.path).base;
      var lrcpath = `/public/files/${lrcname}`;
    } else {
      return res.json({
        code: '001',
        msg: '请上传歌曲歌词'
      })
    }
    // 用户名的id
    let id = fields.id;
    // 插入音乐数据
    db.q('update musics set title=?,singer=?,time=?,file=?,filelrc=? where id=?', [title, singer, time, filepath, lrcpath, id], (err, data) => {
      if (err) return next(err)
      res.json({
        code: '001',
        msg: '更新音乐成功'
      })
    })
  })




};


/**
 * 删除音乐
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
musicC.delMusic = (req,res,next) => {
  // 判断session上的user
  // if (!req.session.user) {
  //   res.send(`
  //                请去首页登录
  //                <a href="/user/login">点击</a>
  //           `);
  //   return;
  // }
  // 1接受参数  get url 传参
  // 2将参数作为删除条件 进行del
  // 3根据操作做出反应
  let id = req.query.id;
  let uid = req.session.user.id;
  // console.log(id, uid)
  // delete from "tablename" where "columnname" 
  db.q('delete from musics where id = ? and uid = ?',[id,uid],(err,data)=>{
    if(err) return next(err);
    // console.log(data);
    if (data.affectedRows != 0){
      res.json({
        code: '001',
        msg: '删除音乐音乐成功'
      })
    }else{
      res.json({
        code: '002',
        msg: '删除音乐的音乐不存在'
      })  
    }

  })

}



/**
 * 显示添加音乐
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
musicC.showAddMusic = (req,res,next) => {
  
  res.render('add.html');
};

/**
 * 显示音乐列表
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
musicC.showListMusic = (req,res,next) => {
  let userId = req.session.user.id;
  //以用户id作为查询条件查询音乐表
  db.q('select * from musics where uid = ?', [userId], (err, musics) => {
    res.render('index.html', {
      //循环，给每个元素加一个索引，利用模板引擎的index属性+1
      musics, //musics:musics ES6简写
      // user:req.session.user
    })
  })
  
}

/**
 * 显示编辑
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
musicC.showEdit = (req,res,next) => {
  // console.log(req.session.user)
  // 1 url上的path方式参数接受
  let id = req.params.id;
  // 2 根据id 查询数据库
  db.q('select * from musics where id = ?',[id],(err,data)=>{
    console.log(data)
    if(err) return next(err);
    if(data.length==0){
      return res.json({
        code:'001',
        msg:'没有找到数据'
      })
    }
    // 找到数据将数据渲染到编辑页面
    res.render('edit.html',{
      music:data[0]
    })
  })
}

module.exports = musicC;