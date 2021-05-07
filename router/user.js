const express = require('express');
const boom = require('boom');
const router = express.Router()
const Result = require('../models/Result')
const {login, findUser, register} = require('../services/user')
const {md5, decoded} = require('../utils')
const { PWD_SALT,PRIVATE_KEY,JWT_EXPIRES  } = require('../utils/constant')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

router.post(
    '/login',
    [
        body('username').isString().withMessage('用户名必须为字符'),
        body('password').isString().withMessage('密码必须为数字'),
    ],
    function (req, res, next) {
        // console.log(JSON.stringify(req))
        const err = validationResult(req)
        if (!err.isEmpty()) {
            const [{ msg }] = err.errors
            next(boom.badRequest(msg))
        } else {
            let {username, password} = req.body
            password = md5(`${password}${PWD_SALT}`)
            login(username, password).then((user) => {
                if (!user || user.length === 0) {
                    new Result('登录失败').fail(res)
                } else {
                    const [_user] = user
                    const token = jwt.sign(
                        { username },
                        PRIVATE_KEY,
                        { expiresIn: JWT_EXPIRES },
                    )
                    new Result({ token }, '登录成功').success(res)
                }
            })
        }
        console.log(err)
    })

router.get('/info', function (req, res) {
    const decode = decoded(req)
    if (decode && decode.username) {
        findUser(decode.username).then(user => {
            if(user) {
                user.roles = [user.role]
                new Result(user, '用户信息查询成功').success(res)
            } else {
                new Result('用户信息查询失败').fail(res)
            }

        })
    } else {
        new Result('用户信息查询失败').fail(res)
    }
})

router.post('/register', function (req, res) {
    console.log(req.body)
    const {username, password} = req.body
    register(username, password).then((res) => {
        console.log(res)
    })
})

module.exports = router

