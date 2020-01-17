const mongoose = require('mongoose')
    , time = require('../libraries/dateTimeLib')
    , schema = mongoose.Schema

let authSchema = new schema({
    userId: {
        type: String
    },
    token: {
        type: String
    },
    secretKey: {
        type: String
    },
    tokenGenTime: {
        type: Date,
        default:time.now()
    }
})

module.exports = mongoose.model('authModel', authSchema, 'authCollection')