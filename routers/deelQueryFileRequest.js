const fs = require('fs') //引入node 文件读写fs模块
function deelQueryPictureRequest(res,getFileList) {
    data = {
        "pic": getFileList('./static/files')
    }
    res.writeHead(200)
    // 将HTTP响应的HTML内容写入response:
    res.write(JSON.stringify(data))
    res.end()
}

module.exports = deelQueryPictureRequest