const WebSocket = require('ws')
const uuid = require('uuid')
const Logger = require('./logger')

//  state.websock.readyState =>
//  ###########################
//  #   0:connecting,         #
//  #   1:connected,          #
//  #   2:closing,            #
//  #   3:closed/openFailed   #
//  ###########################

// 引用Server类:
const WebSocketServer = WebSocket.Server

// Mark all clients by their uuid, put them into hashMap
let Clients = new Map()

// 实例化:
const wss = new WebSocketServer({
    port: 9989
})

function randomStatus(num){
    var res = ''
    for(var i=0;i<num;i++){
        var tempNum = Math.random()*8
        tempNum = Math.round(tempNum)
        res = res.length == 0 ? res + tempNum : res + ',' + tempNum
    }
    return res
}

function test(){
    setInterval(function(){
        Clients.forEach(client => {
            client.send(
                `{"serviceName":"MonitorMain","data": "${randomStatus(200)}" }`
                ,(err) => {
                    if(err)Logger.getInstance().logError('websocket',`[webSocket.sendMessageToClient] error: ${err}`)
                }
            )
        })
    },1*5*1000)
}

function init(args){
    wss.on('connection', function (ws) {
        ws.uuid = uuid()
        ws.to = 'server'
        Clients.set(ws.uuid,ws)
        Logger.getInstance().logInfo('websocket',`[SERVER] connection() clientId:${ws.uuid}`);
        ws.send(`CONNECT: clientId: + ${ws.uuid}`, (err) => {
            if (err) {
                Logger.getInstance().logError('websocket',`[SERVER] error: ${err}`)
            }
        })
        ws.on('message', function (message) {
            Clients.set(ws.uuid,ws)
            Logger.getInstance().logInfo('websocket',`[SERVER] Received: ${message}`)
            ws.send(`ECHO: ${message}`, (err) => {
                if (err) {
                    Logger.getInstance().logError('websocket',`[SERVER] error: ${err}`)
                }
            })
        })
        ws.onclose = function(ws){
            if(ws.target.uuid != undefined){
                Clients.delete(ws.target.uuid)
                Logger.getInstance().logInfo('websocket',`[SERVER] client disconnected ,client id : ${ws.target.uuid}`)
            }
        }
    })
    Logger.getInstance().logInfo('websocket','webSocket started on port 9989')
    if(args == 'test')
        test()
}

module.exports = {
    wss: wss,
    clients: Clients,
    init: (args) => {init(args)}
}