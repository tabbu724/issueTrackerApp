const response = require('../libraries/responseFormatter')
const logger = require('../libraries/loggerLib')
const authModel=require('../models/Auth')
const check=require('../libraries/checkLib')
const token=require('../libraries/tokenLib')

// let authorisation = (req, res, next) => {
//     let authToken = 'admin'
//     if (req.params.authToken || req.query.authToken || req.header('authToken')) {
//         if (req.params.authToken == authToken || req.query.authToken == authToken || req.header('authToken') == authToken) {
//             req.user={'name':'Admin','userId':'A@123'}
//             next()
//         }
//         else {
//             logger.captureError('Invalid Auth token', 5, 'Authentication middleware')
//             res.send(response.formatResponse(true, 'Invalid Auth token', 403, null))
//         }
//     }
//     else {
//         logger.captureError('Auth token missing', 5, 'Authentication middleware')
//         res.send(response.formatResponse(true, 'Auth token missing in the request', 403, null))
//     }

// }

let authorisation = (req, res, next) => {
    // let authToken = 'admin'
    if (req.params.authToken || req.query.authToken || req.header('authToken')||req.body.authToken) {
        authModel.findOne({authToken:req.params.authToken || req.query.authToken || req.header('authToken')||req.body.authToken},(err,tokenDetails)=>{
            if(err){
                logger.captureError('Invalid Auth token', 5, 'Authentication middleware')
                res.send(response.formatResponse(true, 'Invalid Auth token', 500, null))
            }
            else if(check.isEmpty(tokenDetails)){
                logger.captureError('Auth token not present', 5, 'Authentication middleware')
                res.send(response.formatResponse(true, 'Invalid/expired Auth token', 500, null))
            }
            else {
                token.verifyClaim(tokenDetails.authToken,tokenDetails.tokenSecret,(err,decoded)=>{
                    if(err){
                        logger.captureError(err.message, 5, 'Authentication middleware')
                        res.send(response.formatResponse(true, 'Authorisation failed', 500, null))
                    }
                    else{
                        req.user={userId:decoded.data.userId}
                        next()
                    }
                })
            }
        })
    }
    else{
        logger.captureError('Auth token missing', 5, 'Authentication middleware')
        res.send(response.formatResponse(true, 'Auth token missing in the request', 400, null))
    }
    

}

module.exports = {
    authorisation: authorisation
}