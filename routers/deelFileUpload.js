const fs = require('fs') //引入node 文件读写fs模块
const path = require('path') //引入 node path模块
const formidable = require('formidable')

function deelFileUpload(res, req) {
    if (req.url == '/deelFileUpload' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.uploadDir = 'static/files/yunda'

        form.parse(req, function (err, fields, files) {
            console.log(fields)
            for (let key in files) {
                let file = files[key]
                // 过滤空文件
                if (file.size == 0 && file.name == '') continue

                var area = fields.area
                var mark = fields.mark

                if(!fs.existsSync('static/files/yunda/' + area)){
                    fs.mkdirSync('static/files/yunda/' + area)
                }

                let fileType = file.name.split('.')[1],
                    oldPath = file.path,
                    fileName = file.name.split('.')[0]
                fileName = encodeURI(fileName)
                var newPath = 'static/files/yunda/' + area + '/' + mark + '_' + fileName + '.' + fileType
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