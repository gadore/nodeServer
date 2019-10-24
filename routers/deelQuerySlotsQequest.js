function deelQuerySlotsQequest(res,req){
    req.on('data',function(data){
        console.log(data.toString())
    })
    res.writeHead(200)
     var tempdata = {
        "Code":200,
        "Message":"OK",
        "Barcode":["48919116121"],
        "ChuteCodes":["1","2","3"]
    }
    // 将HTTP响应的HTML内容写入response:
    res.write(JSON.stringify(tempdata))
    res.end()
    
}

module.exports = deelQuerySlotsQequest
