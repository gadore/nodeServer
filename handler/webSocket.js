// 导入WebSocket模块:
const WebSocket = require('ws')
const uuid = require('uuid')

// 引用Server类:
const WebSocketServer = WebSocket.Server

let Clients = new Map()

// 实例化:
const wss = new WebSocketServer({
    port: 9989
})

wss.on('connection', function (ws) {
    ws.uuid = uuid()
    ws.to = 'server'
    console.log(ws)
    Clients.set(ws.uuid,ws)
    console.log(`[SERVER] connection() clientId:${ws.uuid}`);
    ws.send(`CONNECT: clientId: + ${ws.uuid}`, (err) => {
        if (err) {
            console.log(`[SERVER] error: ${err}`)
        }
    })
    ws.on('message', function (message) {
        Clients.set(ws.uuid,ws)
        console.log(`[SERVER] Received: ${message}`)
        ws.send(`ECHO: ${message}`, (err) => {
            if (err) {
                console.log(`[SERVER] error: ${err}`)
            }
        })
    })
})

console.log('webSocket started on port 9989')

module.exports = {
    wss:wss,
    clients:Clients
}