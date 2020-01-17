const userModel = require('../models/user')

// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session

let persistentLogin = (passport) => {

    passport.serializeUser((user, cb) => {
        console.log('serialise user', user);

        cb(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser((id, cb) => {
        console.log('deserialise id', id);

        userModel.findOne({ userId: id }, function (err, user) {
            cb(null, user);
        });
    });

}

module.exports = {
    persistentLogin: persistentLogin
}