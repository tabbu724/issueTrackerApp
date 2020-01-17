const mongoose = require('mongoose')
    , schema = mongoose.Schema
    ,timelib=require('../libraries/dateTimeLib')

let userSchema = new schema({
    userId: {
        type: String,
        unique: true
    },
    userName: {
        type: String,
        unique: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    createdOn: {
        type: Date,
        default:timelib.now()
    },
    modifiedOn: {
        type: Date,
        default:timelib.now()
    }
})
module.exports = mongoose.model('userModel', userSchema, 'userCollection')