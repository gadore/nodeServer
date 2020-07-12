const axios = require('axios')

axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error === undefined || error.code === 'ECONNABORTED') {
            utils.notify('服务请求超时','','error')
            return Promise.reject(error)
        }

        const { response } = error

        return response
    }
)

HttpCLient = {
    get: (url) =>{
        return axios({
            method: 'get',
            url: url,
            baseURL: config.apiServerHost,
            headers: {'Content-Type':'text/plain'},
            timeout: config.requestTimeOut
        })
    },
    post: (url,data) =>{
        return axios({
            method: 'post',
            baseURL:  config.apiServerHost,
            data: JSON.stringify(data),
            url: url,
            headers: {'Content-Type':'application/json'},
            timeout: config.requestTimeOut
        })
    }
}


module.exports = this