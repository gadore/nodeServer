const Logger = require('./logger')
const router = require('./router')
const http = require('http') //引入node http模块
const url = require('url') //引入  url  模块

const server = http.createServer((req, res) => {
    let pathName = url.parse(req.url).pathname
    try{
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('content-type', 'application/json;charset=utf-8');
        res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS, PUT, DELETE")
        res.setHeader("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
        router.handler(pathName,req,res)
    }catch(err){
        Logger.getInstance().logError('App.js','Server handle router :' + pathName + ' error' + err)
        res.writeHead(404)
        res.write('404')
        res.end()
    }
})

server.listen('2333')
Logger.getInstance().logInfo('App.js','Server openned on port 2333')

module.exports = this