const response = require('../libraries/responseFormatter')
const logger = require('../libraries/loggerLib')
const authModel=require('../models/auth')
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
    console.log('req.body.authToken',req.body.authToken);
  console.log(
      "req.header('authToken')",req.header('authToken'));
  
    if (req.params.authToken || req.query.authToken || req.header('authToken')||req.body.authToken) {
        authModel.findOne({$or:[{token:req.params.authToken},{token:req.query.authToken},{token:req.header('authToken')},{token:req.body.authToken}] },(err,tokenDetails)=>{
            if(err){
                logger.captureError('Invalid Auth token', 5, 'Authentication middleware')
                res.send(response.formatResponse(true, 'Invalid Auth token', 500, null))
            }
            else if(check.isEmpty(tokenDetails)){
                logger.captureError('Auth token not present', 5, 'Authentication middleware')
                res.send(response.formatResponse(true, 'Invalid/expired Auth token', 500, null))
            }
            else {
                token.verifyClaim(tokenDetails.token,tokenDetails.secretKey,(err,decoded)=>{
                    if(err){
                        logger.captureError(err.message, 5, 'Authentication middleware')
                        res.send(response.formatResponse(true, 'You are not authorised for this action.', 500, null))
                    }
                    else{
                        req.authorisedUser={userId:decoded.data.userId,
                            userName:decoded.data.userName}
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