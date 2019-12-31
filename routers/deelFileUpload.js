const fs = require('fs') //引入node 文件读写fs模块
const path = require('path') //引入 node path模块
const formidable = require('formidable')

function deelFileUpload(res, req) {
    if (req.url == '/deelFileUpload' && req.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm();
        form.maxFieldsSize = 2 * 1024 * 1024 * 1024 //2GB
        form.uploadDir = 'static/files'

        form.on('file', function (filed, file) {
            if (file.size == 0 && file.name == '') 
                return
            var now = new Date()
            var area = now.getFullYear().toString() + (now.getMonth() + 1) + now.getDate().toString()
            if (!fs.existsSync('static/files/' + area)) 
                fs.mkdirSync('static/files/' + area)
            var fileInfo = file.name.split('.'), fileType = '', fileName = file.name
            if (fileInfo.length > 1) {
                fileType = fileInfo[fileInfo.length - 1]
                fileName = fileInfo[0]
                for (var i = 1; i < fileInfo.length - 1; i++)
                    fileName += '.' + fileInfo[i]
            }
            fileName = encodeURI(fileName)//用以解决中文保存后无法下载
            var newPath = 'static/files/' + area + '/' + fileName + '.' + fileType
            fs.rename(file.path, newPath, (error) => {
                if (error)
                    console.log(error)
                console.info('done')
            })
        });
        res.writeHead(200)
        var tempdata = {
            "code": 0,
            "message": "OK"
        }
        res.write(JSON.stringify(tempdata))
        res.end()
    }
}

module.exports = deelFileUpload