const http = require('http');
const path = require('path');
const express = require("express");
const router = express.Router();
//是nodejs中处理multipart/form-data数据格式(主要用在上传功能中)的中间件
//文档：https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
const multer = require('multer');

//配置diskStorage来控制文件存储的位置以及文件名字等
let storage = multer.diskStorage({
    //确定图片存储的位置
    destination: function (req, file, cb){
        cb(null, './public/uploadImgs')
    },
    //确定图片存储时的名字,注意，如果使用原名，可能会造成再次上传同一张图片的时候的冲突
    filename: function (req, file, cb){
        cb(null, Date.now()+file.originalname)
    }
});


//生成的专门处理上传的一个工具，可以传入storage、limits等配置
let upload = multer({storage: storage});



//接收上传图片请求的接口
router.post('/upload', upload.single('file'), function (req, res, next) {
    console.log(111);
    //图片已经被放入到服务器里,且req也已经被upload中间件给处理好了（加上了file等信息）
    //线上的也就是服务器中的图片的绝对地址
    let url = '/uploadImgs/' + req.file.filename;
    res.json({
        code : 200,
        data : url
    })
});



 module.exports = router;