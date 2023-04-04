var request = require('request');
const Logger = require('../handler/logger')
var cheerio = require('cheerio')

function SlotStatus(res, req) {
    req.on('data', function (data) {
        try {
            const messageStr = data.toString()
            Logger.getInstance().logInfo('SlotStatus', messageStr)
            res.writeHead(200)
            const responseMsg = { Code: 200, Message: 'test' }
            res.write(JSON.stringify(responseMsg))
            res.end()
        } catch (e) {
            res.writeHead(500)
            var result = { message: 'fetch error:' + e, data: [] }
            res.write(JSON.stringify(result))
            res.end()
            Logger.getInstance().logError('SlotStatus', e)
        }
    })
}

module.exports = SlotStatus
