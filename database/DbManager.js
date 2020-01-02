const mysql = require('mysql')
const Logger = require('../handler/logger')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'gadore'
})
try {
    connection.connect()

    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) {
            Logger.getInstance().logError('DbManager', 'mysqlManager error: ' + error)
        }else{
            Logger.getInstance().logInfo('DbManager', 'Database connection is success')
        }
        // Logger.getInstance().logInfo('DbManager','The solution is: ', results[0].solution)
    })
} catch (e) {
    Logger.getInstance().logError('DbManager', e)
}


module.exports = this