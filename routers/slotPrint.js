var request = require('request');
const Logger = require('../handler/logger')
const fs = require('fs')
var cheerio = require('cheerio')

function slotPrint(res,req) {
    try{
        req.on('data',function(data){
            const messageStr = data.toString()
            const message = JSON.parse(messageStr)
            Logger.getInstance().logInfo('slotPrint', messageStr)
            res.writeHead(200)
            const responseMsg = {
                Code: 200,
                Message: 'test',
                Label: {
                    zpl_content: 'zpl content',
                    label_file_type: 1010
                }
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
        Logger.getInstance().logError('slotPrint',e)
    }
}

module.exports = slotPrint