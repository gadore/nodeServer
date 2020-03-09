const deelQuerySlotsRequest = require('./routers/deelQuerySlotsRequest')
const deelPacketOffRequest = require('./routers/deelPacketOffRequest')

var router = {
    handler: function (pathName, req, res) {
        switch(pathName){
            case '/api/v1/equipment/order/check' : deelQuerySlotsRequest(res,req)
                return
            case '/api/v1/equipment/port/response' : deelPacketOffRequest(res,req)
                return
            default:
                notfound()
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