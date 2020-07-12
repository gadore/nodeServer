const mysql = require('mysql')
const Logger = require('../handler/logger')

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    connectionLimit : 20,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    database: 'simba-item-data'
})

function updateSendBankPrice(id, newPrice) {
    var finalSql = 'update tt_send set `领用单价-不含税` =' + newPrice + ' where id = ' + id + ';'
    Logger.getInstance().sql(finalSql)
    // pool.getConnection(function(err,connection){
    //     if(err){
    //         console.log(err)
    //         connection.release()
    //     }
    //     connection.query(finalSql, (error,result,)=>{
    //         if(error){
    //             // Logger.getInstance().logError('DbManager', 'mysqlManager error: ' + error)
    //         }else{
    //             // Logger.getInstance().logInfo('updateSendBankPrice', '更新id：' + id + '价格为：' + newPrice)
    //         }
    //         connection.release()
    //     })
    // })
}

function updateReceiveBank(id,newDate,newPrice,newNum){
    var finalSql = 'update tt_receive set `入库时间` = \'' + newDate + '\' , `原始数量` =' + newNum + ' , `不含税单价` =' + newPrice + ' where id = ' + id +';'
    Logger.getInstance().sql(finalSql)
    // pool.getConnection(function(err,connection){
    //     if(err){
    //         console.log(err)
    //         connection.release()
    //     }
    //     connection.query(finalSql, (error,result,)=>{
    //         if(error){
    //             // Logger.getInstance().logError('DbManager', 'mysqlManager error: ' + error)
    //         }else{
    //             // Logger.getInstance().logInfo('updateReceiveBank', '更新id：' + id + '时间为：' + newDate + ' 数量为：' + newNum + ' 价格为：' + newPrice)
    //         }
    //     })
    // })
}

let receiveBank
let sendBank
let saveBank = {}
let monthIndexBank = []
let erpIdIndexBank = []
try {
    pool.getConnection(function(err,connection){
        if(err){
            console.log(err)
            connection.release()
        }
        connection.query('SELECT * from tt_send order by `修改出库时间0421`', function (error, results, fields) {
            if (error) {
                // Logger.getInstance().logError('DbManager', 'mysqlManager error: ' + error)
                connection.release()
            } else {
                //获取出库信息
                sendBank = results
                // Logger.getInstance().logInfo('DbManager', 'sendBank init success')
                connection.query('SELECT * from tt_receive ORDER BY `入库时间`', function (error, results, fields) {
                    if (error) {
                        // Logger.getInstance().logError('DbManager', 'mysqlManager error: ' + error)
                    } else {
                        //获取入库信息
                        receiveBank = results
                        connection.release()
                        // Logger.getInstance().logInfo('DbManager', 'receiveBank init success')
                        start()
                        handleSaveTable()
                    }
                })
            }
        })
    })

} catch (e) {
    Logger.getInstance().logError('DbManager', e)
}

function handleSaveTable(){
    console.log(JSON.stringify(monthIndexBank))
    console.log(JSON.stringify(erpIdIndexBank))
    try{
        for(let m = 0; m < monthIndexBank.length; m++){
            let monthData = saveBank[monthIndexBank[m]]
            if(monthData != undefined){
                for(let e = 0; e < erpIdIndexBank.length;e++){
                    let erpData = monthData[erpIdIndexBank[e]]
                    if(erpData != undefined){console.log('月份:'+ monthIndexBank[m] + '识别码:' + erpIdIndexBank[e] + ' 入库数量:'+ erpData['receive_sum'] + ' 入库总额:' + erpData['receive_total_price'] + ' 出库数量:' + erpData['send_sum'])}
                    // Logger.getInstance().sql('月份:'+ monthIndexBank[m] + '识别码:' + erpIdIndexBank[e] + ' 入库数量:'+ erpData['receive_sum'] + ' 入库总额:' + erpData['receive_total_price'] + ' 出库数量:' + erpData['send_sum'])
                }
            }else{
                console.log('月数据为空')
            }
        }
    }catch(e){
        console.log(e.message)
    }
}

function currentMonthPrice(month){

    // Logger.getInstance().logInfo('currentMonthPrice', '开始更新: ' + month + ' 的领料')
    console.log('开始更新：' + month)

    let commonPriceBank = {}
    try{
        for(let r = 0;r < receiveBank.length;r++){
            let recData = receiveBank[r]
            let recTime = recData['入库时间']
            let repId = recData['识别码']
            let recCount = recData['原始数量']
            let recPrice = recData['不含税单价']

            //拦截非当月数据
            if(getSameMonthString(recTime) != month){
                continue
            }

            if(saveBank[month] == undefined){
                saveBank[month] = []
            }

            if(saveBank[month][repId] == undefined){
                saveBank[month][repId] = {
                    receive_total_price:0,
                    receive_sum:0,
                    send_sum:0,
                    send_total_price:0,
                    send_price:0,
                    save_sum:0,
                    save_total_price:0,
                    save_price:0
                }
            }

            saveBank[month][repId].receive_total_price += recPrice * recCount
            saveBank[month][repId].receive_sum += recCount
        }

        for(let s = 0;s < sendBank.length;s++){
            let sendData = sendBank[s]
            let sendTime = sendData['修改出库时间0421']
            let repId = sendData['识别码']
            let sendCount = sendData['领用数量']

            if(getSameMonthString(sendTime) != month || saveBank[month] == undefined || saveBank[month][repId] == undefined){
                continue
            }

            saveBank[month][repId].send_sum += sendCount
        }
    }catch(e){
        console.log(e.message)
    }

    commonPriceBank = {}
}

function start() {
    let sameMonthString = getSameMonthString(sendBank[0]['修改出库时间0421'])
    // Logger.getInstance().logInfo('Finacial', '开始计算: ' + sameMonthString + ' 的领料')

    for (let i = 0; i < sendBank.length; i++) {

        let currentMonthString = getSameMonthString(sendBank[i]['修改出库时间0421'])

        if(monthIndexBank.indexOf(currentMonthString) < 0){
            monthIndexBank.push(currentMonthString)
            Logger.getInstance().logInfo(currentMonthString)
        }

        if(erpIdIndexBank.indexOf(erpId) < 0){
            erpIdIndexBank.push(erpId)
        }

        //月份变动表明月份更替，更替时更新上月数据
        if(currentMonthString != sameMonthString){

            currentMonthPrice(sameMonthString)

            sameMonthString = currentMonthString
        }

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

            // if(sendBank['id'] == '13375'){
            //     console.log('here')
            // }

            if (sortItems.length <= 0) {
                // Logger.getInstance().logError('DbManager', '找不到ERPID为: ' + erpId + ' 的领料')
                console.log('找不到ERPID为: ' + erpId + ' 的领料')
                continue
            }

            //用于计算加权平均值
            // var retPrive = 0
            // var retCount = 0

            //在找到的物料中按照时间顺序领用，领用完毕为止
            var stillNeedCount = needNum
            
            for (var k = 0; k < sortItems.length; k++) {
                var item = sortItems[k]

                if(parseFloat(item['原始数量']) <= 0){
                    continue
                }

                if(needNum > 0){
                    var leftNum = stillNeedCount < item['原始数量'] ? (item['原始数量'] - stillNeedCount) : 0
                    stillNeedCount = stillNeedCount - item['原始数量']

                    item.used = true

                    item['原始数量'] = parseFloat(leftNum)
                    //如果记录时间比领用时间晚，就调整到领用五天前
                    if(needTime <= item['入库时间']){
                        needTime.setDate(needTime.getDate() - 0)
                        item['入库时间'] = needTime
                    }
                    if (stillNeedCount <= 0) {
                        break
                    }
                }else{
                    item['原始数量'] -= needNum
                    stillNeedCount = 0
                    item.used = true
                    break
                }
            }

            //最后一月的数据更新
            if((i+1) == sendBank.length){
                currentMonthPrice(sameMonthString)
                // Logger.getInstance().logInfo('start', '更新' + sameMonthString + ' 数据 完毕')
                console.log('更新' + sameMonthString + ' 数据 完毕')
                // console.log(saveBank)
            }

            //未领用完毕的做提示
            if (stillNeedCount > 0) {
                // Logger.getInstance().logError('DbManager', 'ERPID: ' + erpId + ' 仍有 ' + stillNeedCount + ' 未分配')
                console.log('ERPID: ' + erpId + ' 仍有 ' + stillNeedCount + ' 未分配')
                continue
            }

            // Logger.getInstance().logInfo('DbManager', 'ERPID: ' + erpId + ' 分配成功 ')

        } catch (e) {
            // Logger.getInstance().logError('DbManager', '分配'+erpId+'出错' + e)
            console.log('分配'+erpId+'出错' + e)
        }
    }
}

function getTimeString(date){
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    return year + '-' + month + '-' + day + ' 00:00:00'
}

function getSameMonthString(date){
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    return year + '-' + month
}

module.exports = this