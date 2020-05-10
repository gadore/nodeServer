const mysql = require('mysql')
const Logger = require('../handler/logger')

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    connectionLimit: 20,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    database: 'simba-item-data'
})

let sumNum = 0

function updateSendBankPrice(id, newPrice, i) {
    var finalSql = 'update tt_send set `领用单价-不含税` =' + newPrice + ' where id = ' + id
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err)
            connection.release()
        }
        connection.query(finalSql, (error, result, ) => {
            if (error) {
                Logger.getInstance().logError('DbManager', 'mysqlManager error: ' + error)
            } else {
                Logger.getInstance().logInfo('updateSendBankPrice', '更新id：' + id + '价格为：' + newPrice)
            }
            connection.release()
        })
    })
}

function updateReceiveBank(id, newDate, newPrice, newNum, i) {
    var finalSql = 'update tt_receive set `入库时间` = \'' + newDate + '\' , `原始数量` =' + newNum + ' , `不含税单价` =' + newPrice + ' where id = ' + id
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err)
            connection.release()
        }
        connection.query(finalSql, (error, result, ) => {
            if (error) {
                Logger.getInstance().logError('DbManager', 'mysqlManager error: ' + error)
            } else {
                Logger.getInstance().logInfo('updateReceiveBank', '更新id：' + id + '时间为：' + newDate + ' 数量为：' + newNum + ' 价格为：' + newPrice)
            }
            if (i == sumNum - 1) {
                console.log('Done!!!!!')
            } else {
                console.log('===>>>进行到ID：' + i + '(' + (parseFloat(i / sumNum) * 100).toString().substring(0, 5) + '%)')
            }
            connection.release()
        })
    })
}

let receiveBank
let sendBank

pool.getConnection(function (err, connection1) {
    if (err) {
        console.log(err)
        connection1.release()
    }
    connection1.query('SELECT * from tt_send', function (error, results, fields) {
        if (error) {
            Logger.getInstance().logError('DbManager', 'mysqlManager error: ' + error)
        } else {
            sendBank = results
            Logger.getInstance().logInfo('DbManager', 'sendBank init success')
            connection1.query('SELECT * from tt_receive ORDER BY `入库时间`', function (error, results, fields) {
                if (error) {
                    Logger.getInstance().logError('DbManager', 'mysqlManager error: ' + error)
                } else {
                    receiveBank = results
                    Logger.getInstance().logInfo('DbManager', 'receiveBank init success')
                    start()
                }
            })
        }
        connection1.release()
    })
})

function calcBankPrice() {
    try {
        connection.connect()
        connection.query('SELECT * from tt_send', function (error, results, fields) {
            if (error) {
                Logger.getInstance().logError('DbManager', 'mysqlManager error: ' + error)
            } else {
                sendBank = results
                Logger.getInstance().logInfo('DbManager', 'sendBank init success')
                connection.query('SELECT * from tt_receive', function (error, results, fields) {
                    if (error) {
                        Logger.getInstance().logError('DbManager', 'mysqlManager error: ' + error)
                    } else {
                        receiveBank = results
                        Logger.getInstance().logInfo('DbManager', 'receiveBank init success')
                        start()
                    }
                })
            }
        })

    } catch (e) {
        Logger.getInstance().logError('DbManager', e)
    }
}

function itemCompare(a, b) {
    return a['入库时间'] > b['入库时间']
}

function start() {
    sumNum = sendBank.length
    for (i = 0; i < sendBank.length; i++) {
        var erpId = sendBank[i]['识别码']
        try {
            var needNum = sendBank[i]['领用数量']
            var needTime = sendBank[i]['修改出库时间0421']
            var sortItems = []

            //通过erpID找到需要调整的物料
            for (var j = 0; j < receiveBank.length; j++) {
                var recId = receiveBank[j]['识别码']
                if (recId == erpId) {
                    sortItems.push(receiveBank[j])
                }
            }
            if (sortItems.length <= 0) {
                Logger.getInstance().logError('DbManager', '找不到ERPID为: ' + erpId + ' 的领料')
                console.log('找不到ERPID为: ' + erpId + ' 的领料')
                continue
            }
            //通过时间进行升序排序
            // sortItems.sort(itemCompare)
            //用于计算加权平均值
            var retPrive = 0
            var retCount = 0
            //在找到的物料中按照时间顺序领用，领用完毕为止
            var stillNeedCount = needNum

            for (var k = 0; k < sortItems.length; k++) {
                var item = sortItems[k]

                if (parseFloat(item['原始数量']) <= 0) {
                    continue
                }

                if (needNum > 0) {
                    var leftNum = stillNeedCount < item['原始数量'] ? (item['原始数量'] - stillNeedCount) : 0
                    stillNeedCount = stillNeedCount - item['原始数量']
                    retPrive += parseFloat(parseFloat(item['原始数量']) * parseFloat(item['不含税单价']))
                    retCount += parseFloat(item['原始数量'])

                    item.used = true

                    item['原始数量'] = parseFloat(leftNum)
                    //如果记录时间比领用时间晚，就调整到领用五天前
                    if (needTime < item['入库时间']) {
                        needTime.setDate(needTime.getDate() - 5)
                        item['入库时间'] = needTime
                    }
                    if (stillNeedCount <= 0) {
                        break
                    }
                } else {
                    item['原始数量'] -= needNum
                    retPrive += parseFloat(parseFloat(item['原始数量']) * parseFloat(item['不含税单价']))
                    retCount = item['原始数量']
                    stillNeedCount = 0
                    break
                }
            }
            //未领用完毕的做提示
            if (stillNeedCount > 0 || retCount <= 0) {
                Logger.getInstance().logError('DbManager', 'ERPID: ' + erpId + ' 仍有 ' + stillNeedCount + ' 未分配')
                console.log('ERPID: ' + erpId + ' 仍有 ' + stillNeedCount + ' 未分配')
                continue
            }

            if (retCount <= 0) {
                console.log('count error')
            }

            //（更新加权平均价）
            retPrive = parseFloat(retPrive / retCount)
            if (isNaN(retCount) || isNaN(retPrive)) {
                console.log('price or count error')
                retPrive = item['不含税单价']
            } else {
                item['不含税单价'] = retPrive
            }

            if (erpId == 'XB000038') {
                console.log('ss')
            }
            for (var c = 0; c < sortItems.length; c++) {
                var item = sortItems[c]
                if (item.used != undefined && item.used == true) {
                    updateReceiveBank(item['id'], getTimeString(item['入库时间']), retPrive, parseInt(item['原始数量']), i)
                    updateSendBankPrice(sendBank[i]['id'], retPrive)
                }
            }
            Logger.getInstance().logInfo('DbManager', 'ERPID: ' + erpId + ' 分配成功 ')
        } catch (e) {
            Logger.getInstance().logError('DbManager', '分配' + erpId + '出错' + e)
            console.log('分配' + erpId + '出错' + e)
        }
    }
}

function getTimeString(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    return year + '-' + month + '-' + day + ' 00:00:00'
}


module.exports = this