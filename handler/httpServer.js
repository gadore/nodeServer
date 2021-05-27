const Logger = require('./logger')
const router = require('./router')
const http = require('http') //引入node http模块
const url = require('url') //引入  url  模块

const server = http.createServer((req, res) => {
    let pathName = url.parse(req.url).pathname
    try {

        if (req.method === 'OPTIONS') {
            var headers = {};
            headers["Access-Control-Allow-Origin"] = "*";
            headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
            headers["Access-Control-Allow-Credentials"] = false;
            headers["Access-Control-Max-Age"] = '86400'; // 24 hours
            headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
            res.writeHead(200, headers);
            res.end();
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Engaged-Auth-Token");
            router.handler(pathName, req, res)
        }
    } catch (err) {
        console.log(err)
        Logger.getInstance().logError('App.js', 'Server handle router :' + pathName + ' error' + err)
        res.writeHead(404)
        res.write('404')
        res.end()
    }
})

server.listen(80)
Logger.getInstance().logInfo('App.js', 'Server openned on port 80')

module.exports = this