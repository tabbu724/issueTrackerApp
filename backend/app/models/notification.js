const mongoose=require('mongoose')
,schema=mongoose.Schema
,timeLib=require('../libraries/dateTimeLib')

let notificationSchema=new schema({
    userId:{
        type:String
    },
    issueId:{
        type:String
    },
    msg:{
        type:String
    },
    creationDate:{
        type:Date,
        default:timeLib.now()
    }
})

module.exports= mongoose.model('notificationModel',notificationSchema,'notifications')