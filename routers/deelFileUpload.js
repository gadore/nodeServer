const fs = require('fs') //引入node 文件读写fs模块
const path = require('path') //引入 node path模块
const formidable = require('formidable')

function deelFileUpload(res, req) {
    if (req.url == '/deelFileUpload' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.uploadDir = 'static/files'

        form.parse(req, function (err, fields, files) {
            if(fields == {}){
                console.log('null field')
            }
            for (let key in files) {
                let file = files[key]
                // 过滤空文件
                if (file.size == 0 && file.name == '') continue

                var now = new Date()
                var area = now.getFullYear().toString() + (now.getMonth() + 1) + now.getDate().toString()

                if(!fs.existsSync('static/files/' + area)){
                    fs.mkdirSync('static/files/' + area)
                }

                var fileInfo = file.name.split('.')
                var fileType = ''
                var fileName = file.name
                if(fileInfo.length > 1){
                    fileType = fileInfo[fileInfo.length-1]
                    fileName = fileInfo[0]
                    for(var i = 1 ; i < fileInfo.length - 1 ; i++){
                        fileName += '.' + fileInfo[i]
                    }
                }
                var oldPath = file.path
                fileName = encodeURI(fileName)
                var newPath = 'static/files/' + area + '/' + fileName + '.' + fileType
                fs.rename(oldPath, newPath, (error) => {
                    if (error){
                        console.log(error)
                        throw error
                    }
                    console.info('done')
                })
            }
        });

        res.writeHead(200)
        var tempdata = {
            "code": 0,
            "message": "OK"
        }
        // 将HTTP响应的HTML内容写入response:
        res.write(JSON.stringify(tempdata))

        res.end()
    }
}

module.exports = deelFileUpload