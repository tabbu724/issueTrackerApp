const appConfig = require('../../config/appConfig')

let routeIpLogger = (req, res, next) => {
    let remoteIp = req.connection.remoteAddress + '://' + req.connection.remotePort
    let realIp = req.headers['X-REAL-IP']
    console.log(req.method + ' request made from ' + remoteIp + ' for route ' + req.originalUrl);

    if (req.method == 'OPTIONS') {
        console.log('--OPTIONS--');
        let headers = {}
        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Methods'] = 'POST,GET,PUT,DELETE,OPTIONS'
        headers['Access-Control-Allow-Credentials'] = false
        headers['Access-Control-Allow-Max-Age'] = '86400'//in secs(=24hrs)
        headers['Access-Control-Allow-Headers'] = 'X-Requested-With,X-Http-Method-Override,Content-Type,Accept'
        res.writeHead(200, headers)
        res.end()
    }
    else {
        res.header('Access-Control-Allow-Origin', appConfig.allowedCorsOrigin)
        res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,OPTIONS')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,X-Http-Method-Override,Content-Type,Accept')
        next()
    }
}

module.exports={
    routeIpLogger:routeIpLogger
}