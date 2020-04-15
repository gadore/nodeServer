const Logger = require('../handler/logger')

function api(res, req) {

    Logger.getInstance().logInfo('api','api')
        res.writeHead(200)
        var tempdata = {
            status: "1",
            msg: "OK",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJXYXJlaG91c2UiOiI2IiwiZXhwIjoxNTg2OTcxNzc5LCJpc3MiOiJzbGMuY29tIiwiYXVkIjoic2xjLmNvbSJ9.G2O_BOpwkjHKzwWUn2XmEnLGPhuQUtlliNw6-xKqGGU",
            Warehouse: "6",
            Storer: [
                {
                    Storerkey: "BB"
                },
                {
                    Storerkey: "GEMS"
                },
                {
                    Storerkey: "OCD"
                },
                {
                    Storerkey: "SIEMENS-HEALTHI"
                },
                {
                    Storerkey: "VYAIRE"
                }
            ]
        }
        // 将HTTP响应的HTML内容写入response:
        res.write(JSON.stringify(tempdata))
        res.end()
    // req.on('data', function (data) {
    //     Logger.getInstance().logInfo('api', data.toString())
    //     res.writeHead(200)
    //     var tempdata = {
    //         status: "1",
    //         msg: "OK",
    //         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJXYXJlaG91c2UiOiI2IiwiZXhwIjoxNTg2OTcxNzc5LCJpc3MiOiJzbGMuY29tIiwiYXVkIjoic2xjLmNvbSJ9.G2O_BOpwkjHKzwWUn2XmEnLGPhuQUtlliNw6-xKqGGU",
    //         Warehouse: "6",
    //         Storer: [
    //             {
    //                 Storerkey: "BB"
    //             },
    //             {
    //                 Storerkey: "GEMS"
    //             },
    //             {
    //                 Storerkey: "OCD"
    //             },
    //             {
    //                 Storerkey: "SIEMENS-HEALTHI"
    //             },
    //             {
    //                 Storerkey: "VYAIRE"
    //             }
    //         ]
    //     }
    //     // 将HTTP响应的HTML内容写入response:
    //     res.write(JSON.stringify(tempdata))
    //     res.end()
    // })

}

module.exports = api