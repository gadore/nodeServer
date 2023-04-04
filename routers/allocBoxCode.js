var request = require('request');
const Logger = require('../handler/logger')
const fs = require('fs')
var cheerio = require('cheerio')

function allocBoxCode(res,req) {
    try{
        req.on('data',function(data){
            const messageStr = data.toString()
            const message = JSON.parse(messageStr)
            Logger.getInstance().logInfo('allocBoxCode', messageStr)
            res.writeHead(200)
            const responseMsg = {
                Code: 200,
                Message: 'test',
                ChuteCode: message.ChuteCode,
                desc: 'test',
                BoxCode: '123456789098765432-1',
                BoxCodeList: [
                    {
                        ChuteCode: message.ChuteCode,
                        BoxCode: message.ChuteCode + '456789098765432-1',
                        desc: 'test'
                    }
                ]
            }
            res.write(JSON.stringify(responseMsg))
            res.end()
        })
    }catch(e){
        res.writeHead(500)
        var result = {
            message: 'fetch error:' +e,
            data: []
        }
        res.write(JSON.stringify(result))
        res.end()
        Logger.getInstance().logError('allocBoxCode',e)
    }
}

module.exports = allocBoxCode