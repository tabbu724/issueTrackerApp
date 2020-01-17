const authModel = require('../models/auth')
    , checkLib = require('../libraries/checkLib')
    , responseLib = require('../libraries/responseFormatter')
    ,tokenLib=require('../libraries/tokenLib')

let generateAuthToken = (userDetails) => {
    return new Promise((resolve, reject) => {
        tokenLib.generateToken(userDetails, (err, tokenDetails) => {
            if (err) {
                let response = responseLib.formatResponse(true, 'Error occurred in token generation.', 500, null)
                reject(response)
            }
            else {
                tokenDetails.userDetails = userDetails
                resolve(tokenDetails)
            }
        })
    })
}

let createAndSaveAuthModel = (tokenDetails) => {
    return new Promise((resolve, reject) => {
        authModel.findOne({ userId: tokenDetails.userDetails.userId }, (err, authDetails) => {
            if (err) {
                let response = responseLib.formatResponse(true, 'Error occurred in fetching authorisation details.', 500, null)
                reject(response)
            }
            else if (checkLib.isEmpty(authDetails)) {
                let authDoc = new authModel({
                    userId: tokenDetails.userDetails.userId,
                    token: tokenDetails.token,
                    secretKey: tokenDetails.secretKey
                })
                authDoc.save((err, newAuthData) => {
                    if (err) {
                        let response = responseLib.formatResponse(true, 'Error occurred in saving authorisation details.', 500, null)
                        reject(response)
                    }
                    else {
                        let responseBody = {
                            authToken: newAuthData.token,
                            userDetails: tokenDetails.userDetails
                        }
                        resolve(responseBody)
                    }
                })
            }
            else {
                authDetails.token = tokenDetails.token
                authDetails.secretKey = tokenDetails.secretKey
                authDetails.save((err, updatedAuthData) => {
                    if (err) {
                        let response = responseLib.formatResponse(true, 'Error occurred in saving authorisation details.', 500, null)
                        reject(response)
                    }
                    else {
                        let responseBody = {
                            authToken: updatedAuthData.token,
                            userDetails: tokenDetails.userDetails
                        }
                        resolve(responseBody)
                    }
                })
            }
        })
    })
}

module.exports = {
    generateAuthToken: generateAuthToken,
    createAndSaveAuthModel: createAndSaveAuthModel
}