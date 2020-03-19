var request = require('request');
const Logger = require('../handler/logger')
var cheerio = require('cheerio')

function fetMusicList(res,req) {
    req.on('data',function(data){
        Logger.getInstance().logInfo('fetchMusic',data.toString())
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
                    message:'success',
                    data:songs
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
    })
}

module.exports = fetMusicList