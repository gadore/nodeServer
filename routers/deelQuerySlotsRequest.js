const Logger = require('../handler/logger')

function deelQuerySlotsQequest(res,req){
    req.on('data',function(data){
        Logger.getInstance().logInfo('deelQuerySlotsRqquest',data.toString())
    })
    res.writeHead(200)
     var tempdata = {
        "code":0,
        "message":"OK",
        "data":{
            "is_unusual":false,
            "remark":"none",
            "target_port_list":[1,2,3]
        }
    }
    // 将HTTP响应的HTML内容写入response:
    res.write(JSON.stringify(tempdata))
    res.end()
    
}

module.exports = deelQuerySlotsQequest
