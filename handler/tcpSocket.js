const net = require('net')
const Logger = require('./logger')

let tcpServer = []
let tcpClient = []
let hexType = true
let headerSize = 2
let clientBank = new Array()
let webSocketServer


function createSocketClient(hostname, port, id) {
    const socket = new net.Socket()

    socket.readyStatus = false

    socket.setEncoding = 'UTF-8'

    Logger.getInstance().logInfo('tcpSocket', 'Client connecting...')

    socket.connect(port, hostname, function () {
        socket.readyStatus = true
        Logger.getInstance().logInfo('tcpSocket', '[client#' + id + ']' + 'connect to ' + hostname + ':' + port + ' success!')
    })

    socket.on('data', function (msg) {
        if (headerSize != 0 && hexType) {
            msg = msg.slice(headerSize, parseInt(msg[headerSize]))
        }
        Logger.getInstance().logInfo('tcpSocket', 'message receive:' + msg)
    })

    socket.on('error', function (error) {
        Logger.getInstance().logInfo('tcpSocket', '[client error]:' + error)
        socket.readyStatus = false
        return
    })

    socket.on('close', function () {
        Logger.getInstance().logInfo('tcpSocket', '[client ' + socket.localPort + ' disconnected]')
        socket.readyStatus = false
    })

    socket.on('ready', function () {
        socket.readyStatus = true
    })

    return socket
}

function createSocketServer(Port) {
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

            Logger.getInstance().logInfo('tcpSocket', '[client connected!] >> ' + `${client.remoteAddress}` + ':' + `${client.remotePort}`)

            client.on('data', function (msg) { //接收client发来的信息
                if (headerSize != 0 && hexType) {
                    msg = getMsgWithHeaderSize(msg, headerSize)
                }
                // sendMsgToClients(msg)
                sendMsgToWebSocket(msg)
                Logger.getInstance().logInfo('tcpSocket', '[Server receive]:' + `${client.remoteAddress}:${client.remotePort}:${msg}`)
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

function deelClientMessage(size, hex, content) {
    try {
        if (size != 0) {
            if (hex) {
                var headerArr = new Array(headerSize)
                headerArr[headerSize - 2] = content.length / 256
                headerArr[headerSize - 1] = content.length % 256
                var headerBuffer = Buffer.from(headerArr)
                content = Buffer.from(content)
                var content = Buffer.concat([headerBuffer, content])
            } else {
                content = content.length + content
            }
        }
        return content
    } catch (e) {
        Logger.getInstance().logInfo('tcpSocket', e)
    }
}

function recycleSocketServer(port) {
    // destroy all clients (this will emit the 'close' event above)
    for (var i in clientBank[port]) {
        clientBank[port][i].destroy();
        //delete clientBank[port][i]
    }
    if ($isNull(sockets[port]))
        return
    sockets[port].close(function () {
        delete sockets[port]
    });
}

function sendMsgToClients(port, msg) {
    for (client in clientBank[port]) {
        client.write(msg, function () {
            logger.getInstance().logInfo('sendMsgToClients', msg)
        })
    }
}

function sendMsgToWebSocket(msg){
    var slot = msg[2]
    global.wss.clients.forEach(client => {
        client.send(
            `{"ServiceName":"ConveryDropSlot","Slot": "${slot}","TimeStamp":${currentTime()} }`, (err) => {
                if (err) Logger.getInstance().logError(`[webSocket.sendMessageToClient] error: ${err}`)
            }
        )
    });
}

function getMsgWithHeaderSize(msg, size) {
    switch (size) {
        case 2:
            return msg.slice(headerSize, parseInt(msg[headerSize]) + parseInt(msg[headerSize - 1]) * 256)
            break
        case 4:
            return msg.slice(headerSize, parseInt(
                msg[headerSize]) + parseInt(msg[headerSize - 1]) * 256 + parseInt(msg[headerSize - 2]) * 256 * 256)
            break
    }
}

function $isNull(sth) {
    if (sth == '' || sth == null || sth == undefined || sth.length == 0) {
        return true
    } else {
        return false
    }
}
module.exports = {
    init:function(args){
        this.webSocketServer = args
        createSocketServer(5000)
    } 
}

function currentTime(){
    var now = Date.now()
    return now
}