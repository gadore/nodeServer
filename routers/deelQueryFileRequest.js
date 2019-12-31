const fs = require('fs') //引入node 文件读写fs模块
function deelQueryPictureRequest(res, req, getFileList) {
    var data = {}
    try {
        subPath = ''
        pathName = req.url
        if (pathName.split('?')[1] != undefined && pathName.split('?')[1] != null) {
            temp = pathName.split('?')[1]
            if (temp.split('=')[0] == 'place') {
                subPath = decodeURI(temp.split('=')[1])
                if (subPath == 'home') {
                    subPath = ''
                }
            }
        }
        data = {
            "pic": getFileList('./static/files/' + subPath),
            "subPath": subPath
        }
        res.writeHead(200)
    }catch(e){
        res.writeHead(500)
        console.log(e)
    }

    // 将HTTP响应的HTML内容写入response:
    res.write(JSON.stringify(data))
    res.end()
}

module.exports = deelQueryPictureRequest