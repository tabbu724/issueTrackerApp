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
    description:{
        type:String
    },
    reporterName: {
        type: String
    },
    assigneeName: {
        type: String
    },
    creationDate: {
        type: Date,
        default:timeLib.now()
    },
    creationDateString: {
        type: String,
        default:timeLib.formatCurrentDate()//display only
    },
    attachmentUrls: [
        {
            fileName:{
                type:String
            },
            fileUrl:String
        }
    ]
    //array of s3 urls
})

issueDetailsSchema.index({"$**": "text"})

module.exports = mongoose.model('issueModel', issueDetailsSchema, 'issueCollection')