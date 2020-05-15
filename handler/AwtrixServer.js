// const tcpSocket = require('./tcpSocket')
const Logger = require('./logger')
const net = require('net')
let tcpServer = []
let tcpClient = []
let hexType = true
let headerSize = 2
let defaultColor =[0,0,255]
let brightness = 50
let clientBank = new Array()

let autoSendFlag = true

let awtrixServer = createAwtrixServer(6666)

setInterval(function(){
    if(autoSendFlag == false){return}
    sendTextToESP(getTimeStr(),2,1,[0,0,255])
},1000)

function handleTcpMessage(msg){
    var type = msg['type']
    if(autoSendFlag == true && type != 'autoTime' && type != 'setBrightness'){
        autoSendFlag = false
        setTimeout(function(){autoSendFlag = true},5000)
    }
    switch(type){
        case 'autoTime':
            autoSendFlag = !autoSendFlag
            break
        case 'setColor':
            defaultColor = msg['color']
            break
        case 'setBrightness':
            brightness = msg.brightness
            sendMsgToAwtrixClients(6666,JSON.stringify(msg))
            break
        case 'notify':
            sendTextToESP(msg.text,msg.x,msg.y,msg.color)
            break
        case 'fill':
            sendMsgToAwtrixClients(6666,JSON.stringify({type:'fill',color:msg.color}))
            sendMsgToAwtrixClients(6666,JSON.stringify({type:'show'}))
            break
        case 'drawBMP':
            sendMsgToAwtrixClients(6666,JSON.stringify(msg))
            sendMsgToAwtrixClients(6666,JSON.stringify({type:'show'}))
            break
        default: 
            sendMsgToAwtrixClients(6666,JSON.stringify({"type":"fill","color":[255,0,0]}))
            sendMsgToAwtrixClients(6666,JSON.stringify({"type":"show"}))
            break
    }
}

function createAwtrixServer(Port,tcpSocket) {
    try {
        const hostname = '0.0.0.0'
        let port = Port
        let clients = {}
        let clientName = 0

        const socket = new net.createServer()

        socket.on('connection', (client) => {
            client.name = ++clientName // 给每一个client起个名
            clients[client.name] = client // 将client保存在clients

            clientBank[port][parseInt(client.name)] = client

            client.on('data', function (msg) { //接收client发来的信息
                try{
                    var jsonMsg = JSON.parse(msg)
                    handleTcpMessage(jsonMsg)
                }catch(e){
                    Logger.logError('client.on(data)',e)
                }
            })

            client.on('error', function (e) { //监听客户端异常
                Logger.getInstance().logInfo('tcpSocket', 'client error:' + e)
                client.end()
            })

            client.on('close', function () {
                delete clients[client.name]
                delete clientBank[port][client.name]
                Logger.getInstance().logInfo('tcpSocket', `${client.remoteAddress}下线了`)
            })
        })

        socket.on('error', (e) => {
            if (e.code === 'EADDRINUSE') {
                Logger.getInstance().logInfo('tcpSocket', 'Port in use,change another one !')
            } else {
                Logger.getInstance().logInfo('tcpSocket', e)
            }
            socket.unref()
            socket.close()
            return undefined
        })

        socket.listen(port, hostname, function () {
            Logger.getInstance().logInfo('tcpSocket', `服务器运行在：http://${hostname}:${port}`)
            clientBank[port] = new Array()
        })
        return socket
    } catch (err) {
        Logger.getInstance().logInfo('tcpSocket', err)
    }
}

function sendMsgToAwtrixClients(port, msg) {
    for (client in clientBank[port]) {
        clientBank[port][client].write(msg, function () {
        })
    }
}

function sendTextToESP(text,x,y,color){
    var msg = new Object()
    msg['type'] = 'clear'
    sendMsgToAwtrixClients(6666,JSON.stringify(msg))

    msg['type'] = 'drawText'
    msg['x'] = x
    msg['y'] = y
    msg['color'] = color
    msg['text'] = text

    sendMsgToAwtrixClients(6666,JSON.stringify(msg))

    msg['type'] = 'show'
    sendMsgToAwtrixClients(6666,JSON.stringify(msg))
}

function getTimeStr(){
    var now = new Date()
    var hour = now.getHours()
    var minute = now.getMinutes()
    var seconds = now.getSeconds()
    var hourStr = hour > 9 ? hour : '0' + hour
    var minuteStr = minute > 9 ? minute : '0' + minute
    var secondsStr = seconds > 9 ? seconds : '0' + seconds
    return hourStr + ':' + minuteStr + ':' + secondsStr
}

module.exports = this