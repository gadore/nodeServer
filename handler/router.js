const deelQuerySlotsRequest = require('../routers/deelQuerySlotsRequest')
const deelPacketOffRequest = require('../routers/deelPacketOffRequest')
const SlotStatus = require('../routers/SlotStatus')
const api = require('../routers/api')
const allocBoxCode = require('../routers/allocBoxCode')
const slotPrint = require('../routers/slotPrint')
const fetchLuolicon = require('../routers/fetchLuolicon')
const Logger = require('./logger')

var router = {
    handler: function (pathName, req, res) {
        switch(pathName){
            case '/AutoSort/Sort' : deelQuerySlotsRequest(res,req)
                return
            case '/luolicon' : fetchLuolicon(res,req)
                return
            case '/AutoSort/DropChute' : deelPacketOffRequest(res,req)
                return
            case '/Api/authority/User/getLogin':
            case '/Api/authority/Role/getThreeMenuList':
            case '/api' : api(res,req)
                return
            case '/music' : fetchMusic(res,req)
                return
            case '/AutoSort/CreateBatch' : allocBoxCode(res,req)
                return
            case '/AutoSort/LockChute': SlotStatus(res, req)
                return
            case '/AutoSort/ChutePrint': slotPrint(res, req)
                return
            default:
                notfound(pathName, res)
                return
        }
    }
}

var notfound = function (pathName, res) {
    res.writeHead(404)
    res.write('404')
    res.end()
    Logger.getInstance().logError('router.js', '【404】No handler for: ' + pathName)
}

module.exports = router