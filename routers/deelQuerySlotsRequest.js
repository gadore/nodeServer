const Logger = require('../handler/logger')

function deelQuerySlotsQequest(res, req) {
    req.on('data', function (data) {
        const messageStr = data.toString()
        Logger.getInstance().logInfo('deelQuerySlotsRequest', messageStr)
        const message = JSON.parse(messageStr)
        res.writeHead(200)
        var tempdata = {
            Code: 200,
            Message: 'OK',
            Barcode: message.Barcode,
            ChuteCode: ['12', '34']
        }
        // 将HTTP响应的HTML内容写入response:
        res.write(JSON.stringify(tempdata))
        res.end()
    })
}

module.exports = deelQuerySlotsQequest
