const Logger = require('./logger')
const router = require('./router')
const http = require('http') //引入node http模块
const url = require('url') //引入  url  模块

const server = http.createServer((req, res) => {
    let pathName = url.parse(req.url).pathname
    try {

        if (req.method === 'OPTIONS') {
            console.log('!OPTIONS');
            var headers = {};
            // IE8 does not allow domains to be specified, just the *
            // headers["Access-Control-Allow-Origin"] = req.headers.origin;
            headers["Access-Control-Allow-Origin"] = "*";
            headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
            headers["Access-Control-Allow-Credentials"] = false;
            headers["Access-Control-Max-Age"] = '86400'; // 24 hours
            headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
            res.writeHead(200, headers);
            res.end();
        } else {
            console.log('else')
            res.setHeader('Access-Control-Allow-Origin', '*');
            // res.setHeader('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Engaged-Auth-Token");
            // res.setHeader('content-type', 'application/json;charset=utf-8');
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

server.listen('2333')
Logger.getInstance().logInfo('App.js', 'Server openned on port 2333')

module.exports = this