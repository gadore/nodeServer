const tcpSocket = require('./tcpSocket')

// var awtrixServer = tcpSocket.init(6666)

setInterval(function(){
    sendJsonToESP(getTimeStr())
},1000)

function sendJsonToESP(text){
    var msg = new Object()
    msg['type'] = 'clear'
    tcpSocket.sendMsgToClient(6666,JSON.stringify(msg))

    msg['type'] = 'drawText'
    msg['x'] = 2
    msg['y'] = 1
    msg['color'] = [0,0,255]
    msg['text'] = text

    tcpSocket.sendMsgToClient(6666,JSON.stringify(msg))

    msg['type'] = 'show'
    tcpSocket.sendMsgToClient(6666,JSON.stringify(msg))
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