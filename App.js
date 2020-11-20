const webSocket = require('./handler/webSocket')
// const tcpSocket = require('./handler/tcpSocket')
const httpServer = require('./handler/httpServer')
// const db = require('./database/yaqian')
// const awtirxServer = require('./handler/AwtrixServer')
global.wss = webSocket
// global.tcp = tcpSocket

webSocket.init('test')