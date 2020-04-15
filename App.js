const webSocket = require('./handler/webSocket')
const tcpSocket = require('./handler/tcpSocket')
const httpServer = require('./handler/httpServer')
// const DbManager = require('./database/DbManager')
global.wss = webSocket
global.tcp = tcpSocket

tcpSocket.init(2000)
webSocket.init('test')
