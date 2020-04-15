const deelQuerySlotsRequest = require('../routers/deelQuerySlotsRequest')
const deelPacketOffRequest = require('../routers/deelPacketOffRequest')
const fetchMusic = require('../routers/fetchMusicList')
const api = require('../routers/api')
const fetchCover = require('../routers/fetchMusicCover')

var router = {
    handler: function (pathName, req, res) {
        switch(pathName){
            case '/api/v1/equipment/order/check' : deelQuerySlotsRequest(res,req)
                return
            case '/api/v1/equipment/port/response' : deelPacketOffRequest(res,req)
                return
            case '/Api/authority/User/getLogin':
            case '/api' : api(res,req)
                return
            case '/music' : fetchMusic(res,req)
                return
            case '/cover' : fetchCover(res,req)
                return
            default:
                notfound(res)
                return
        }
    }
}

var notfound = function (res) {
    res.writeHead(404)
    res.write('404')
    res.end()
}

module.exports = router