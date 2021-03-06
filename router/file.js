const express = require('express');
const multer = require('multer');
const { UPLOAD_PATH } = require('../utils/constant')
const Result = require('../models/Result')

const router = express.Router();

router.post(
    '/upload',
    multer({ dest: `${UPLOAD_PATH}/upload/files`}).single('file'),
    function (req,res,next) {
        console.log(req.file)
    if (!req.file || req.file.length === 0 ){
        new Result('上传失败').fail(res)
    } else {
        new Result('上传成功').success(res)
    }
})

module.exports = router
