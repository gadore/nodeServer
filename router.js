const fs = require('fs') //引入node 文件读写fs模块
const path = require('path') //引入 node path模块
const resMime = require('./utils/resMime.js') //引入自定义模块，模块主要处理响应头
const deelQueryFileRequest = require('./routers/deelQueryFileRequest')
const deelQuerySlotsRequest = require('./routers/deelQuerySlotsRequest')
const deelPacketOffRequest = require('./routers/deelPacketOffRequest')

var router = {
    notFoundRes: notfound,
    handler: function (pathName, req, res) {
        switch(pathName){
            case '/' : pathName = '/index.html'
                break
            case '/favicon.ico': res.end()
                break
            case '/api/v1/equipment/order/check' : deelQuerySlotsRequest(res,req)
                return
            case '/api/v1/equipment/port/response' : deelPacketOffRequest(res,req)
                return
            case '/queryFile' : deelQueryFileRequest(res,getFileList)
                return
            default : 
                break
        }
        if(pathName != '/favicon.ico'){
            let extName = path.extname(pathName) //拿到扩展名（比如说：'index.html' => '.html'）
            fs.readFile(path.join(__dirname, pathName), function (err, data) { //绝对路径，path.join(__dirname,pathName)
                if (err) {
                    notfound(res)
                } else {
                    var mime = resMime.getMime(fs, extName) //调用外部模块resMime,请求的文件后缀名转换成mime标准的响应头Content-Type类型（比如说：'.css'=>'text/css','.js'=>'text/javascript'）
                    res.writeHead(200, {
                        "Content-Type": `${mime};chartset='utf8'`
                    })
                    res.write(data)
                    res.end()
                }
            })
        }
    }
}

var notfound = function (res) {
    fs.readFile(path.join(__dirname, `views/404.html`), (err, data) => {
        res.writeHead(404, {
            "Content-Type": "text/html;chartset='utf8'"
        })
        res.write(data)
        res.end()
    })
}

function getFileList(FolderName) {
    let fileList = fs.readdirSync(FolderName);
    return fileList
}

module.exports = router