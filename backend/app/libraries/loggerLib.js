const timeLib =require('../libraries/dateTimeLib')
const logger = require('pino')()

let captureError=(errMessage,errLevel,errOrigin)=>{
let errorResponse={
    timestamp:timeLib.now(),
    errMessage:errMessage,
    errLevel:errLevel,
    errOrigin:errOrigin
}
logger.error(errorResponse)
return errorResponse
}

let captureInfo=(message,level,origin)=>{
    let infoResponse={
        timestamp:timeLib.now(),
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