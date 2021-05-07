const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/', router)

const server = app.listen(5000, function () {
    const { address, port } = server.address()
    console.log('服务开启，端口', port, '地址', address)
})
