const fs = require('fs') //引入node 文件读写fs模块
const path = require('path') //引入 node path模块
const resMime = require('./utils/resMime.js') //引入自定义模块，模块主要处理响应头

var notfound = function (res) {
    fs.readFile(path.join(__dirname, `views/404.html`), (err, data) => {
        res.writeHead(404, {
            "Content-Type": "text/html;chartset='utf8'"
        })
        res.write(data)
        res.end()
    })
}

function deelQueryRequest(res, pathName) {
    var queryName = pathName.split('AAAA')[1]
    var data = 'query for nothing on :' + queryName
    switch (queryName) {
        case 'test':
            data = {
                "name": "yy",
                "value": "girl"
            }
            break
        case 'picture':
            data = {
                "pic": getPictureList()
            }
            break
        default:
            break
    }
    res.writeHead(200)
    // 将HTTP响应的HTML内容写入response:

    res.write(JSON.stringify(data))
    res.end()
}

function getPictureList() {
    var Folder = './static/img'
    let pictureList = fs.readdirSync(Folder);
    console.log(pictureList)
    return pictureList
}

var router = {
    notFoundRes: notfound,
    handler: function (pathName, req, res) {
        if (pathName == '/') {
            pathName = '/index.html'
        }

        if (pathName == '/favicon.ico') {
            res.end()
        }

        if (pathName.search('query') == 1) {
            deelQueryRequest(res, pathName)
            return
        }

        if (pathName != '/favicon.ico') {
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

module.exports = router