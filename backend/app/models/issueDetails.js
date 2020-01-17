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
    creationDate: {
        type: Date,
        default:timeLib.now()
    },
    creationDateString: {
        type: String,
        default:timeLib.formatCurrentDate()
    },
    attachmentUrls: []//array of s3 urls
})

module.exports = mongoose.model('issueModel', issueDetailsSchema, 'issueCollection')