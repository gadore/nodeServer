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

function randomStatus(total, scope) {
    var res = ''
    for (var i = 0; i < total; i++) {
        var tempNum = Math.random() * scope
        tempNum = Math.round(tempNum)
        res = res.length == 0 ? res + tempNum : res + ',' + tempNum
    }
    return res
}

function handleJsonMessage(msg, clientId) {
    var jsonMessage = JSON.parse(msg)
    var serviceName = jsonMessage.ServiceName
    switch (serviceName) {
        case 'UserLogin':
            handleLogin(jsonMessage, clientId)
            break
    }
}

function handleLogin(jsonMessage, clientId) {
    var username = jsonMessage.username
    var password = jsonMessage.password
    var ret = {
        "serviceName": "UserLogin"
    }
    if (username == 'admin' && password == 'Simba') {
        Clients.get(clientId).login = true
        ret.Result = "Success"
        ret.Permissions = "1,2,3,4,5,6,7,8,9,10"
    }else if (username == '10001' && password == '111111') {
        Clients.get(clientId).login = true
        ret.Result = "Success"
        ret.Permissions = "1,2,3,4"
    }else{
        Clients.get(clientId).login = false
        ret.Result = "Faild"
        ret.Permissions = ""
    }

    var client = Clients.get(clientId)
    if(client){
        client.send(
            JSON.stringify(ret), (err) => {
                if (err) Logger.getInstance().logError('websocket.handleLogin', `[webSocket.sendMessageToClient] error: ${err}`)
            }
        )
    }
}

function test() {
    setInterval(function () {
        Clients.forEach(client => {
            if (client.login) {
                client.send(
                    `{"serviceName":"Car","data": "${randomStatus(242,8)}" }`, (err) => {
                        if (err) Logger.getInstance().logError('websocket', `[webSocket.sendMessageToClient] error: ${err}`)
                    }
                )
                client.send(
                    `{"serviceName":"Chute","data": "${randomStatus(200,4)}" }`, (err) => {
                        if (err) Logger.getInstance().logError('websocket', `[webSocket.sendMessageToClient] error: ${err}`)
                    }
                )
                client.send(
                    `{"serviceName":"Plat","data": "${randomStatus(12,3)}" }`, (err) => {
                        if (err) Logger.getInstance().logError('websocket', `[webSocket.sendMessageToClient] error: ${err}`)
                    }
                )
                client.send(
                    `{"serviceName":"Motor","data": "${randomStatus(8,3)}" }`, (err) => {
                        if (err) Logger.getInstance().logError('websocket', `[webSocket.sendMessageToClient] error: ${err}`)
                    }
                )
                client.send(
                    `{"serviceName":"ElectricBox","data": "${randomStatus(3,3)}" }`, (err) => {
                        if (err) Logger.getInstance().logError('websocket', `[webSocket.sendMessageToClient] error: ${err}`)
                    }
                )
                client.send(
                    `{"serviceName":"GrayScanner","data": "${randomStatus(8,3)}" }`, (err) => {
                        if (err) Logger.getInstance().logError('websocket', `[webSocket.sendMessageToClient] error: ${err}`)
                    }
                )
                client.send(
                    `{"serviceName":"OBRScanner","data": "${randomStatus(2,3)}" }`, (err) => {
                        if (err) Logger.getInstance().logError('websocket', `[webSocket.sendMessageToClient] error: ${err}`)
                    }
                )
            }
        })
    }, 1 * 3 * 1000)
}

function init(args) {
    wss.on('connection', function (ws) {
        ws.uuid = uuid()
        ws.to = 'server'
        ws.login = false
        Clients.set(ws.uuid, ws)
        Logger.getInstance().logInfo('websocket', `[SERVER] connection() clientId:${ws.uuid}`);
        ws.send(`CONNECT: clientId: + ${ws.uuid}`, (err) => {
            if (err) {
                Logger.getInstance().logError('websocket', `[SERVER] error: ${err}`)
            }
        })
        ws.on('message', function (message) {
            Clients.set(ws.uuid, ws)
            handleJsonMessage(message, ws.uuid)
            Logger.getInstance().logInfo('websocket', `[SERVER] Received: ${message}`)
            ws.send(`ECHO: ${message}`, (err) => {
                if (err) {
                    Logger.getInstance().logError('websocket', `[SERVER] error: ${err}`)
                }
            })
        })
        ws.onclose = function (ws) {
            if (ws.target.uuid != undefined) {
                Clients.delete(ws.target.uuid)
                Logger.getInstance().logInfo('websocket', `[SERVER] client disconnected ,client id : ${ws.target.uuid}`)
            }
        }
    })
    Logger.getInstance().logInfo('websocket', 'webSocket started on port 9989')
    if (args == 'test')
        test()
}

module.exports = {
    wss: wss,
    clients: Clients,
    init: (args) => {
        init(args)
    }
}