const userModel = require('../models/user')
    , authModel = require('../models/auth')
    , validate = require('../libraries/validateLib')
    , responseLib = require('../libraries/responseFormatter')
    , checkLib = require('../libraries/checkLib')
    , shortId = require('shortid')
    , passwordLib = require('../libraries/passwordLib')
    , tokenLib = require('../libraries/tokenLib')
    , authLib = require('../libraries/authLib')
    , fbStrategy = require('passport-facebook').Strategy
    , appConfig = require('../../config/appConfig')
    , passportSession = require('../libraries/socialLoginLib')
    , googleStrategy = require('passport-google-oauth20').Strategy
    , loggerLib = require('../libraries/loggerLib')

let signup = (req, res) => {
    let validateInputs = () => {
        return new Promise((resolve, reject) => {
            if (validate.validateEmail(req.body.email)) {
                if (validate.validatePassword(req.body.password)) {
                    if (validate.validateUserName(req.body.username)) {
                        let infoLog = loggerLib.captureInfo('All credentials validated successfully', 10, '/loginController/signup/validateInputs')
                        console.log(infoLog);
                        resolve(req)
                    }
                    else {
                        let errorLog = loggerLib.captureError('User name is not as per the norms.', 2, '/loginController/signup/validateInputs')
                        console.log(errorLog);
                        let response = responseLib.formatResponse(true, 'User name is not as per the norms.', 500, null)
                        reject(response)
                    }
                }
                else {
                    let errorLog = loggerLib.captureError('Password should be alphanumeric and have at least 8 characters.', 2, '/loginController/signup/validateInputs')
                    console.log(errorLog);
                    let response = responseLib.formatResponse(true, 'Password should be alphanumeric and have at least 8 characters.', 500, null)
                    reject(response)
                }
            }
            else {
                let errorLog = loggerLib.captureError('Please enter a valid email id.', 2, '/loginController/signup/validateInputs')
                console.log(errorLog);
                let response = responseLib.formatResponse(true, 'Please enter a valid email id.', 500, null)
                reject(response)
            }
        })
    }

    let createUser = () => {
        return new Promise((resolve, reject) => {
            userModel.findOne({ email: req.body.email }, (err, userData) => {
                if (err) {
                    let errorLog = loggerLib.captureError('User could not be created due to some error.', 4, '/loginController/signup/createUser')
                    console.log(errorLog);
                    let response = responseLib.formatResponse(true, 'User could not be created due to some error.', 403, null)
                    reject(response)
                }
                else if (checkLib.isEmpty(userData)) {
                    let userDoc = new userModel({
                        userId: shortId.generate(),
                        userName: req.body.username,
                        email: req.body.email,
                        password: passwordLib.generateHash(req.body.password),
                        // mobileNum: req.body.mobileNumber
                    })
                    userDoc.save((err, newUser) => {
                        if (err) {
                            let errorLog = loggerLib.captureError('Failed to create the user.', 4, '/loginController/signup/createUser')
                            console.log(errorLog);
                            let response = responseLib.formatResponse(true, 'Failed to create the user.', 500, null)
                            reject(response)
                        }
                        else {
                            newUserObject = newUser.toObject()
                            delete newUserObject.password
                            delete newUserObject._id
                            delete newUserObject.__v
                            let infoLog = loggerLib.captureInfo('New User created successfully', 10, '/loginController/signup/createUser')
                            console.log(infoLog);
                            resolve(newUserObject)
                        }
                    })
                }
                else {
                    let errorLog = loggerLib.captureError('A user with this email id already exists.', 4, '/loginController/signup/createUser')
                    console.log(errorLog);
                    let response = responseLib.formatResponse(true, 'A user with this email id already exists.')
                    reject(response)
                }
            })
        })
    }

    validateInputs(req, res)
        .then(createUser)
        .then((resolve) => {
            let user = {
                userId: resolve.userId
            }
            req.user = user
            dashboardInfo(req, res)
        })
        .catch((err) => {
            res.send(err)
        })

}

let dashboardInfo = (req, res) => {
    let response = responseLib.formatResponse(false, 'User details found.', 200,
        req.user.userId )
    res.send(response)
}

let login = (req, res) => {
    let findUser = () => {
        return new Promise((resolve, reject) => {
            userModel.findOne({ $or:[ {userName: req.body.usernameEmail},{email: req.body.usernameEmail} ]}, (err, userDetails) => {
                if (err) {
                    let errorLog = loggerLib.captureError('Some error occurred in getting user data.', 4, 'loginController/login/findUser')
                    console.log(errorLog);
                    let response = responseLib.formatResponse(true, 'Some error occurred in getting user data.', 500, null)
                    reject(response)
                }
                else if (checkLib.isEmpty(userDetails)) {
                    let errorLog = loggerLib.captureError('This username does not exists.Login Failed.', 4, '/loginController/login/findUser')
                    console.log(errorLog);
                    let response = responseLib.formatResponse(true, 'This username does not exists.Login Failed.', 500, null)
                    reject(response)
                }
                else {
                    let infoLog = loggerLib.captureInfo('User found successfully.', 10, '/loginController/login/findUser')
                    console.log(infoLog);
                    resolve(userDetails.toObject())
                }
            })
        })
    }

    let verifyPassword = (userData) => {
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, userData.password, (err, isMatch) => {
                if (err) {
                    let errorLog = loggerLib.captureError('Some error occurred in comparing password.', 4, '/loginController/login/verifyPassword')
                    console.log(errorLog);
                    let response = responseLib.formatResponse(true, 'Some error occurred in comparing password.', 500, null)
                    reject(response)
                }
                else if (isMatch) {
                    delete userData.__v
                    delete userData._id
                    delete userData.password
                    delete userData.createdOn
                    delete userData.modifiedOn
                    let infoLog = loggerLib.captureInfo('Password matched.', 10, '/loginController/login/verifyPassword')
                    console.log(infoLog);
                    resolve(userData)
                }
                else {
                    let errorLog = loggerLib.captureError('The password is incorrect.Login Failed', 4, '/loginController/login/verifyPassword')
                    console.log(errorLog);
                    let response = responseLib.formatResponse(true, 'The password is incorrect.Login Failed', 500, null)
                    reject(response)
                }
            })
        })
    }

    let generateAuthToken = (userDetails) => {
        return new Promise((resolve, reject) => {
            tokenLib.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    let errorLog = loggerLib.captureError('Error occurred in token generation.', 4, '/loginController/login/generateAuthToken')
                    console.log(errorLog);
                    let response = responseLib.formatResponse(true, 'Error occurred in token generation.', 500, null)
                    reject(response)
                }
                else {
                    tokenDetails.userDetails = userDetails
                    let infoLog = loggerLib.captureInfo('Auth token generated .', 10, '/loginController/login/generateAuthToken')
                    console.log(infoLog);
                    resolve(tokenDetails)
                }
            })
        })
    }

    let createAndSaveAuthModel = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            authModel.findOne({ userId: tokenDetails.userDetails.userId }, (err, authDetails) => {
                if (err) {
                    let errorLog = loggerLib.captureError('Error occurred in token generation.', 4, '/loginController/login/createAndSaveAuthModel')
                    console.log(errorLog);
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
                            let errorLog = loggerLib.captureError('Error occurred in saving authorisation details.', 4, '/loginController/login/createAndSaveAuthModel')
                            console.log(errorLog);
                            let response = responseLib.formatResponse(true, 'Error occurred in saving authorisation details.', 500, null)
                            reject(response)
                        }
                        else {
                            let responseBody = {
                                authToken: newAuthData.token,
                                userDetails: tokenDetails.userDetails
                            }
                            let infoLog = loggerLib.captureInfo('Auth model created .', 10, '/loginController/login/createAndSaveAuthModel')
                            console.log(infoLog);
                            resolve(responseBody)
                        }
                    })
                }
                else {
                    authDetails.token = tokenDetails.token
                    authDetails.secretKey = tokenDetails.secretKey
                    authDetails.save((err, updatedAuthData) => {
                        if (err) {
                            let errorLog = loggerLib.captureError('Error occurred in updating authorisation details.', 4, '/loginController/login/createAndSaveAuthModel')
                            console.log(errorLog);
                            let response = responseLib.formatResponse(true, 'Error occurred in updating authorisation details.', 500, null)
                            reject(response)
                        }
                        else {
                            let responseBody = {
                                authToken: updatedAuthData.token,
                                userDetails: tokenDetails.userDetails
                            }
                            let infoLog = loggerLib.captureInfo('Auth model updated .', 10, '/loginController/login/createAndSaveAuthModel')
                            console.log(infoLog);
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }

    findUser(req, res)
        .then(verifyPassword)
        .then(generateAuthToken)
        .then(createAndSaveAuthModel)
        .then((resolve) => {
            let user = {
                userId: resolve.userDetails.userId
            }
            req.user = user
            dashboardInfo(req, res)
        })
        .catch((err) => {
            res.send(err)
        })

}


let loginViaFacebook = (passport) => {

    passportSession.persistentLogin(passport)
    passport.use(new fbStrategy({
        clientID: appConfig.configuration.FACEBOOK_APP_ID,
        clientSecret: appConfig.configuration.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'email']
    }, function (accessToken, refreshToken, profile, cb) {

        userModel.findOne({ userId: profile.id }, (err, userDetails) => {
            if (err) {
                let errorLog = loggerLib.captureError('Error occurred fetching user details.', 4, '/loginController/loginViaFacebook')
                console.log(errorLog);
                let response = responseLib.formatResponse(true, 'Error occurred fetching user details.', 500, null)
                cb(response, null)
            }
            else if (checkLib.isEmpty(userDetails)) {
                let fbUser = new userModel({
                    userId: profile.id,
                    userName: profile.displayName.split(' ')[0] + '@' + shortId.generate().substring(0, 3),
                    password: null,
                    email: profile.emails[0].value || null
                })


                fbUser.save((err, newFbUser) => {
                    if (err) {
                        let errorLog = loggerLib.captureError('Error in creating new user.', 4, '/loginController/loginViaFacebook')
                        console.log(errorLog);
                        let response = responseLib.formatResponse(true, 'Error in creating new user.', 500, null)
                        cb(response, null)
                    }
                    else {
                        // let response = responseLib.formatResponse(false, 'New user created successfully.', 200, newFbUser)
                        fbUserDetails = newFbUser.toObject()
                        delete fbUserDetails.__v
                        delete fbUserDetails._id
                        delete fbUserDetails.password
                        delete fbUserDetails.createdOn
                        delete fbUserDetails.modifiedOn
                        authLib.generateAuthToken(fbUserDetails)
                            .then(authLib.createAndSaveAuthModel)
                            .then((resolve) => {
                                let infoLog = loggerLib.captureInfo('New user created.', 10, '/loginController/login/loginViaFacebook')
                                console.log(infoLog);
                                console.log(resolve);

                            })
                            .catch((err) => {
                                console.log(err);

                            })
                        cb(null, profile)
                    }
                })
            }
            else {
                // let response = responseLib.formatResponse(false, 'User details found.', 200, userDetails)
                existingFbUserDetails = userDetails.toObject()
                delete existingFbUserDetails.__v
                delete existingFbUserDetails._id
                delete existingFbUserDetails.password
                delete existingFbUserDetails.createdOn
                delete existingFbUserDetails.modifiedOn
                authLib.generateAuthToken(existingFbUserDetails)
                    .then(authLib.createAndSaveAuthModel)
                    .then((resolve) => {
                        let infoLog = loggerLib.captureInfo('Existing user updated.', 10, '/loginController/login/loginViaFacebook')
                        console.log(infoLog);
                        console.log(resolve);

                    })
                    .catch((err) => {
                        console.log(err);

                    })
                cb(null, profile)
            }
        })

    }))
}

let fblogin = (req, res) => {

    let userDetails = req.user
    console.log('req.user=>', req.user);

    let response = responseLib.formatResponse(false, 'User details found.', 200, userDetails)
    res.send(response)
}

let loginViaGoogle = (passport) => {
    passport.use(new googleStrategy({
        clientID: appConfig.configuration.GOOGLE_CLIENT_ID,
        clientSecret: appConfig.configuration.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
        function (accessToken, refreshToken, profile, cb) {
            console.log('profile', profile);

            userModel.findOne({ userId: profile.id }, (err, userDetails) => {
                if (err) {
                    let errorLog = loggerLib.captureError('Error occurred fetching user details.', 4, '/loginController/loginViaGoogle')
                    console.log(errorLog);
                    let response = responseLib.formatResponse(true, 'Error occurred fetching user details.', 500, null)
                    cb(response, null)
                }
                else if (checkLib.isEmpty(userDetails)) {
                    let fbUser = new userModel({
                        userId: profile.id,
                        userName: profile.displayName.split(' ')[0] + '@' + shortId.generate().substring(0, 3),
                        password: null,
                        email: profile.emails[0].value || null
                    })


                    fbUser.save((err, newFbUser) => {
                        if (err) {
                            let errorLog = loggerLib.captureError('Error in creating new user.', 4, '/loginController/loginViaGoogle')
                            console.log(errorLog);
                            let response = responseLib.formatResponse(true, 'Error in creating new user.', 500, null)
                            cb(response, null)
                        }
                        else {
                            // let response = responseLib.formatResponse(false, 'New user created successfully.', 200, newFbUser)
                            fbUserDetails = newFbUser.toObject()
                            delete fbUserDetails.__v
                            delete fbUserDetails._id
                            delete fbUserDetails.password
                            delete fbUserDetails.createdOn
                            delete fbUserDetails.modifiedOn
                            authLib.generateAuthToken(fbUserDetails)
                                .then(authLib.createAndSaveAuthModel)
                                .then((resolve) => {
                                    let infoLog = loggerLib.captureInfo('New user created.', 10, '/loginController/login/loginViaGoogle')
                                    console.log(infoLog);
                                    console.log(resolve);

                                })
                                .catch((err) => {
                                    console.log(err);

                                })
                            cb(null, profile)
                        }
                    })
                }
                else {
                    // let response = responseLib.formatResponse(false, 'User details found.', 200, userDetails)
                    existingFbUserDetails = userDetails.toObject()
                    delete existingFbUserDetails.__v
                    delete existingFbUserDetails._id
                    delete existingFbUserDetails.password
                    delete existingFbUserDetails.createdOn
                    delete existingFbUserDetails.modifiedOn
                    authLib.generateAuthToken(existingFbUserDetails)
                        .then(authLib.createAndSaveAuthModel)
                        .then((resolve) => {
                            let infoLog = loggerLib.captureInfo('Existing user updated.', 10, '/loginController/login/loginViaGoogle')
                            console.log(infoLog);
                            console.log(resolve);

                        })
                        .catch((err) => {
                            console.log(err);

                        })
                    cb(null, profile)
                }
            })
        }
    ));
}

let logout = (req, res) => {
    authModel.deleteOne({ userId: req.params.userId }, (err, result) => {

        if (err) {
            let errorLog = loggerLib.captureError('error occurred' + err.message, 4, '/loginController/logout')
            console.log(errorLog);
            let response = responseLib.formatResponse(true, 'error occurred' + err.message, 500, null)
            res.send(response)
        }
        else if (checkLib.isEmpty(result)) {
            let errorLog = loggerLib.captureError('Already logged out/Invalid userId.', 4, '/loginController/logout')
            console.log(errorLog);
            let response = responseLib.formatResponse(true, 'Already logged out/Invalid userId', 404, null)
            res.send(response)
        }
        else {
            let infoLog = loggerLib.captureInfo('Successfully logged out', 10, '/loginController/login/logout')
            console.log(infoLog);
            let response = responseLib.formatResponse(false, 'Successfully logged out', 200, result)
            res.send(response)
        }
    })
}

module.exports = {
    signup: signup,
    login: login,
    dashboardInfo: dashboardInfo,
    loginViaFacebook: loginViaFacebook,
    loginViaGoogle: loginViaGoogle,
    logout: logout,
    fblogin: fblogin
}