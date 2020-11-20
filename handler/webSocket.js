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
let brightness = 30
let color = [0, 255, 0]
let x = 2
let y = 1

// 实例化:
const wss = new WebSocketServer({
    port: 10663
})

function randomStatus(total, scope, constNum) {
    var res = ''
    for (var i = 0; i < total; i++) {
        var tempNum = Math.random() * scope
        tempNum = Math.round(tempNum)
        tempNum = constNum == undefined ? tempNum : constNum
        res = res.length == 0 ? res + tempNum : res + ',' + tempNum
    }
    return res
}

function getTimeStr() {
    var now = new Date()
    var hour = now.getHours()
    var minute = now.getMinutes()
    var seconds = now.getSeconds()
    var hourStr = hour > 9 ? hour : '0' + hour
    var minuteStr = minute > 9 ? minute : '0' + minute
    var secondsStr = seconds > 9 ? seconds : '0' + seconds
    return hourStr + ':' + minuteStr + ':' + secondsStr
}

function handleJsonMessage(msg, clientId) {
    try {
        var jsonMessage = JSON.parse(msg)
        var serviceName = jsonMessage.ServiceName
        switch (serviceName) {
            case 'UserLogin':
                handleLogin(jsonMessage, clientId)
                break
            case 'position':
                x = jsonMessage.x
                y = jsonMessage.y
                break
            case 'color':
                color = jsonMessage.color
                break
            case 'setBrightness':
                brightness = jsonMessage.brightness
                break

        }
    } catch (e) {
        Logger.logError('websocket.handleJsonMessage',JSON.stringify(e))
    }
}

function handleLogin(jsonMessage, clientId) {
    var username = jsonMessage.Username
    var password = jsonMessage.Password
    var ret = {
        "ServiceName": "UserLogin"
    }
    if (username == 'admin' && password == 'admin') {
        Clients.get(clientId).login = true
        ret.Result = "Success"
        ret.Permissions = "1,2,3,4,5,6,7,8,9,10"
    } else if (username == '10001' && password == '111111') {
        Clients.get(clientId).login = true
        ret.Result = "Success"
        ret.Permissions = "1,2,3,4,5,6,7"
    } else {
        Clients.get(clientId).login = false
        ret.Result = "Faild"
        ret.Permissions = ""
    }

    var client = Clients.get(clientId)
    if (client) {
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
            client.send(
                JSON.stringify({ "ServiceName": "clear" }), (err) => {
                    if (err) Logger.getInstance().logError(`[webSocket.sendMessageToClient] error: ${err}`)
                }
            )
            client.send(
                JSON.stringify({ "ServiceName": "setBrightness", "brightness": brightness }), (err) => {
                    if (err) Logger.getInstance().logError(`[webSocket.sendMessageToClient] error: ${err}`)
                }
            )
            client.send(
                JSON.stringify({ "ServiceName": "drawText", "text": getTimeStr(), "color": color, "x": x, "y": y }), (err) => {
                    if (err) Logger.getInstance().logError(`[webSocket.sendMessageToClient] error: ${err}`)
                }
            )
            client.send(
                JSON.stringify({ "ServiceName": "show" }), (err) => {
                    if (err) Logger.getInstance().logError(`[webSocket.sendMessageToClient] error: ${err}`)
                }
            )
        })
    }, 1 * 1000)
}

function init(args) {
    wss.on('connection', function (ws) {
        ws.uuid = uuid()
        ws.to = 'server'
        ws.login = false
        Clients.set(ws.uuid, ws)
        Logger.getInstance().logInfo('websocket', `connection() clientId:${ws.uuid}`);
        ws.send(`CONNECT: clientId: + ${ws.uuid}`, (err) => {
            if (err) {
                Logger.getInstance().logError('websocket', `error: ${err}`)
            }
        })
        ws.on('message', function (message) {
            Clients.set(ws.uuid, ws)
            handleJsonMessage(message, ws.uuid)
            Logger.getInstance().logInfo('websocket', `Received: ${message}`)
            // ws.send(`ECHO: ${message}`, (err) => {
            //     if (err) {
            //         Logger.getInstance().logError('websocket', `error: ${err}`)
            //     }
            // })
        })
        ws.onclose = function (ws) {
            if (ws.target.uuid != undefined) {
                Clients.delete(ws.target.uuid)
                Logger.getInstance().logInfo('websocket', `client disconnected ,client id : ${ws.target.uuid}`)
            }
        }
    })
    Logger.getInstance().logInfo('websocket', 'webSocket started on port 10663')
    if (args == 'test') {
        test()
        Logger.getInstance().logInfo('websocket', 'start test function success')
    }
}

module.exports = {
    wss: wss,
    clients: Clients,
    init: (args) => {
        init(args)
    }
}