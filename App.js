const http = require('http') //引入node http模块
const url = require('url') //引入  url  模块
const router = require('./router')
const DbManager = require('./database/DbManager')

const server = http.createServer((req, res) => { //http.createServer()创建服务器

    let pathName = url.parse(req.url).pathname //获取req.url,并且转换请求的路径
    try{
        router.handler(pathName,req,res)
    }catch(err){
        console.log(err)
        router.notFoundRes(res)
    }
})

server.listen('9988')