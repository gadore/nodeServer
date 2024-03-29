var request = require('request');
const Logger = require('../handler/logger')

const pageStr = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous"><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script><title>Luolicon</title></head><body class="container"><div class="row">'

const pageEndFix = '</div></body></html>'

function fetchLuolicon(res,req) {
    try{
	let hour = new Date().getHours()
	let isNight = false
	if (hour >= 18 || hour <= 6) { isNight = true }
    	var musicUrl = 'https://api.lolicon.app/setu/v2?r18=2&num=12'
        request(musicUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let imgStr = ''
                const imgDatas = JSON.parse(response.body).data
                imgDatas.forEach(item => {
                    imgStr += `<div class="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12" style="position:relative;margin-top: 10px;"><img src="${item.urls.original}" class="img-fluid" alt="" style="padding: 10px;width: 100%;background-color: ${isNight ? 'gray' : '#f1f3f4'};"><span style="position: absolute;
                    left: 10px;
                    bottom: 0;
		    color: ${isNight ? 'white' : 'black'};
		    background: ${isNight ? 'gray' : '#f1f3f4'};
                    opacity: 0.6;
		    word-wrap: break-word;
		    white-space: nowrap;
		    overflow: hidden;
		    text-overflow: ellipsis;
                    width: calc(100% - 20px);
                    overflow: hidden;">${item.tags.toString()}</span></div>`
                })
		let styleStr =`<style>body{ background-color: ${isNight? 'black':'white'} }</style>`
                // res.setHeader('Content-Type','text/plain;charset=utf-8');
                res.writeHead(200)
                res.write(pageStr + imgStr + styleStr + pageEndFix)
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
    }catch(e){
        res.writeHead(200)
                    var result = {
                        message: 'fetch error:' +e,
                        data: []
                    }
                    res.write(JSON.stringify(result))
                    res.end()
        Logger.getInstance().logError('fetchLuolicon',e)
    }
}

module.exports = fetchLuolicon
