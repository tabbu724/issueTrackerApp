const moment =require('moment')
const logger = require('pino')()

let captureError=(errMessage,errLevel,errOrigin)=>{
let errorResponse={
    timestamp:moment(),
    errMessage:errMessage,
    errLevel:errLevel,
    errOrigin:errOrigin
}
logger.error(errorResponse)
return errorResponse
}

let captureInfo=(message,level,origin)=>{
    let infoResponse={
        timestamp:moment(),
        message:message,
        level:level,
        origin:origin
    }
    logger.info(infoResponse);
    return infoResponse
}

module.exports={
    captureError:captureError,
    captureInfo:captureInfo
}