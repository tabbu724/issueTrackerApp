const userModel = require('../models/user')
    , authLib = require('../libraries/authLib')
    , checkLib = require('../libraries/checkLib')
    , loggerLib = require('../libraries/loggerLib')
    , responseLib = require('../libraries/responseFormatter')
    , shortId = require('shortid')
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session

let persistentLogin = (passport) => {

    passport.serializeUser((user, cb) => {


        cb(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser((serialisedUser, cb) => {



        userModel.findOne({ userId: serialisedUser.id }, (err, userDetails) => {
            if (err) {
                let errorLog = loggerLib.captureError('Error occurred fetching user details.', 4, '/loginController/loginViaFacebook')

                let response = responseLib.formatResponse(true, 'Error occurred fetching user details.', 500, null)
                cb(response, null)
            }
            else if (checkLib.isEmpty(userDetails)) {
                let fbUser = new userModel({
                    userId: serialisedUser.id,
                    userName: serialisedUser.displayName.split(' ')[0] + '@' + shortId.generate().substring(0, 3),
                    password: null,
                    email: serialisedUser.emails[0].value || null
                })


                fbUser.save((err, newFbUser) => {
                    if (err) {
                        let errorLog = loggerLib.captureError('Error in creating new user.', 4, '/loginController/loginViaFacebook')

                        let response = responseLib.formatResponse(true, 'Error in creating new user.', 500, null)
                        cb(response, null)
                    }
                    else {

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

                                cb(null, resolve)
                            })
                            .catch((err) => {
                                cb(err, null)

                            })

                    }
                })
            }
            else {

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

                        cb(null, resolve)
                    })
                    .catch((err) => {
                        cb(err, null);

                    })
            }
        })
    });

}

module.exports = {
    persistentLogin: persistentLogin
}