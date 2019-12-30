const mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'gadore'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error){
        console.log('mysqlManager error: '+ error)
        throw error
    }
    console.log('The solution is: ', results[0].solution)
})

module.exports = this