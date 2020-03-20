var request = require('request');
const Logger = require('../handler/logger')
const fs = require('fs')
var cheerio = require('cheerio')

<<<<<<< HEAD
function fetMusicCover(res, req) {
    req.on('data', function (data) {
        try {
            Logger.getInstance().logInfo('fetchCover', data.toString())
            var url = JSON.parse(data).url
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(body)
                    var tags = $('ul.f-hide')
                    var songs = []
                    tags[0].childNodes.forEach(tag => {
                        var music = new Object()
                        music.name = tag.childNodes[0].childNodes[0].data
                        music.id = tag.childNodes[0].attribs.href
                        songs.push(music)
                    });
                    res.writeHead(200)
                    var result = {
                        message: 'success',
                        data: songs
                    }
                    res.write(JSON.stringify(result))
                    res.end()
                } else {
                    res.writeHead(200)
                    var result = {
                        message: 'fetch error',
                        data: []
                    }
                    res.write(JSON.stringify(result))
                    res.end()
=======
function fetMusicCover(res,req) {
    req.on('data',function(data){
        Logger.getInstance().logInfo('fetchCover',data.toString())
        var url = JSON.parse(data).url
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                fs.writeFileSync('result.html',body,function(e){
                    if(e){
                        console.log(e)
                    }
                    console.log('save success !')
                })
                var $ = cheerio.load(body)
                // <meta property="og:image" content="http://p2.music.126.net/LGSZ3rGT8Ux1pYxcwxnR-g==/2225411534621328.jpg" />
                var tags = $('meta[property="og:image"]')
                var imgUrl = tags.attr('content')
                res.writeHead(200)
                var result = {
                    message:'success',
                    data:imgUrl
>>>>>>> ad041da9e25429e10b552fcb1a9a2a51ed4c697a
                }
            })
        } catch (e) {
            Logger.getInstance().logError('fetchMusicCover', e)
        }
    })
}

module.exports = fetMusicCover