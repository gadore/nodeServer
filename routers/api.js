const Logger = require('../handler/logger')

function api(res, req) {
    req.on('data', function (data) {
        Logger.getInstance().logInfo('api', data.toString())
        res.writeHead(200)
        var tempdata = {
            message: "from server"
        }
        // 将HTTP响应的HTML内容写入response:
        res.write(JSON.stringify(tempdata))
        res.end()
    })
}

module.exports = api