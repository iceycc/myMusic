'use strict';
// 这里专门处理音乐页面的业务逻辑

// 引入数据库操作对象 db
const db = require('../models/db');
// 解析文件上传
const formidable = require('formidable');
// 引入path核心对象
const path = require('path');



let musicC = {};


/**
 * 添加音乐
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
musicC.addMusic = (req, res, next) => {
  // 判断是否存在session上的user
  if (!req.session.user) {
    res.send(`
                 请去首页登录
                 <a href="/user/login">点击</a>
            `);
    return;
  }
  // 登陆成功
  // 声明一个formidable对象 固定格式
  var form = new formidable.IncomingForm();
  // 设置默认的文件上传地址
  // form.uploadDir = path.join(__dirname,'public/files');
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
  if (!req.session.user) {
    res.send(`
                 请去首页登录
                 <a href="/user/login">点击</a>
            `);
    return;
  }
  // 登陆成功
  // 声明一个formidable对象 固定格式
  var form = new formidable.IncomingForm();
  // 设置默认的文件上传地址
  // form.uploadDir = path.join(__dirname,'public/files');
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




}




module.exports = musicC;