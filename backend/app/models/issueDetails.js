const mongoose = require('mongoose')
    , schema = mongoose.Schema
    ,timeLib=require('../libraries/dateTimeLib')

let issueDetailsSchema = new schema({
    issueId: {
        type: String,
        unique: true
    },
    status: {
        type: String
    },
    title: {
        type: String
    },
    reporterId: {
        type: String
    },
    assigneeId: {
        type: String
    },
    createdOn: {
        type: Date,
        default:timeLib.now()
    },
    attachmentUrls: []//array of s3 urls
})

module.exports = mongoose.model('issueModel', issueDetailsSchema, 'issueCollection')