const webSocket = require('./handler/webSocket')
// const tcpSocket = require('./handler/tcpSocket')
const httpServer = require('./handler/httpServer')
// const DbManager = require('./database/DbManager')
const awtirxServer = require('./handler/AwtrixServer')
global.wss = webSocket
// global.tcp = tcpSocket

webSocket.init('test')
// DbManager.calcBankPrice()