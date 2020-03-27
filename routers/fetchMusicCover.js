var request = require('request');
const Logger = require('../handler/logger')
const fs = require('fs')
var cheerio = require('cheerio')

function fetMusicCover(res,req) {
    var musicId = req.url.split('=')[1];
    var musicUrl = 'https://music.163.com/song?id=' + musicId;
    Logger.getInstance().logInfo('fetchCover',musicId)
        request(musicUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(body)
                // <meta property="og:image" content="http://p2.music.126.net/LGSZ3rGT8Ux1pYxcwxnR-g==/2225411534621328.jpg" />
                var tags = $('meta[property="og:image"]')
                var imgUrl = tags.attr('content')
                res.writeHead(200)
                var result = {
                    message:'success',
                    data:imgUrl
                }
                res.write(JSON.stringify(result))
                res.end()
            }else{
                res.writeHead(200)
                var result = {
                    message:'fetch error',
                    data:[]
                }
                res.write(JSON.stringify(result))
                res.end()
            }
        })
}

module.exports = fetMusicCover