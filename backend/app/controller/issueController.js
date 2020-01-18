const issueModel=require('../models/issueDetails')
, responseLib = require('../libraries/responseFormatter')
    , checkLib = require('../libraries/checkLib')
    , shortid = require('shortid')
    ,userModel = require('../models/user')
    ,timeLib=require('../libraries/dateTimeLib')
,redisLib=require('../libraries/redisLib')


let editIssueDetails=(req,res)=>{
    issueModel.findOne({issueId:req.body.issueId},(err,issueDetails)=>{
        if (err) {
            let response = responseLib.formatResponse(true, err.message, 500, null)
            res.send(response)
        }
        else if (checkLib.isEmpty(issueDetails)) {
            let response = responseLib.formatResponse(true, 'no such details found', 404, null)
            res.send(response)
        }
        else {
           
// console.log(req.body,req.body.status);
// console.log(req.attachments!=null||req.body.title!=undefined||req.body.description!=undefined||req.body.status!=undefined);
if(req.attachments!=null){
    req.attachments.forEach(fileObject => {
        issueDetails.attachmentUrls.push(fileObject)
    });
}
if(req.body.title!=undefined){
    issueDetails.title=req.body.title
}
if(req.body.description!=undefined){
    issueDetails.description=req.body.description
}
if(req.body.status!=undefined){
    issueDetails.status=req.body.status
}
            
            issueDetails.save((err,updatedDetails)=>{
                if (err) {
                    let response = responseLib.formatResponse(true, err.message, 500, null)
                    res.send(response)
                }
                else{
                    let response = responseLib.formatResponse(false, 'Issue details updated successfully.', 200, updatedDetails)
                    res.send(response)
                }
            })
            
        }
    })
}

let assignIssueToOthers=(req,res)=>{
    userModel.findOne({ userName: req.params.username }, (err, userData) => {
        if (err) {
            console.log(err);
        }
        else if(checkLib.isEmpty(userData)){
            let response = responseLib.formatResponse(true, 'No such user exists', 404, null)
            res.send(response)
        }
        else {  
            let newAssigneeInfo={
                assigneeId:userData.userId
            }
            issueModel.updateOne({issueId:req.params.issueId},newAssigneeInfo,(err,updatedDetails)=>{
                if (err) {
                    let response = responseLib.formatResponse(true, err.message, 500, null)
                    res.send(response);
                }
                else if (checkLib.isEmpty(updatedDetails)) {
                    let response = responseLib.formatResponse(true, 'No updated details available.', 404, null)
                    res.send(response);
                }
                else {
                    let response = responseLib.formatResponse(false, 'Assignee updated successfully.', 200, updatedDetails)
                    res.send(response)
                }
            })
        }
})
}

let commentOnIssue=(req,res)=>{
    // check if issueid and userid exist
    let commentId=shortid.generate()
    let commentDetails={
        comment:req.body.comment,
        userId:req.body.userId,
        commentDate:timeLib.now()
    }
    redisLib.createComments(req.body.issueId,commentId,JSON.stringify(commentDetails),(err,commentCreationStatus)=>{
        if (err) {
            let response = responseLib.formatResponse(true, err.message, 500, null)
            res.send(response);
        }
        else if (checkLib.isEmpty(commentCreationStatus)) {
            let response = responseLib.formatResponse(true, 'No comment details available.', 404, null)
            res.send(response);
        }
        else {
            redisLib.showComments(req.body.issueId,(err,commentData)=>{
                if (err) {
                    let response = responseLib.formatResponse(true, err.message, 500, null)
                    res.send(response);
                }
                else if (checkLib.isEmpty(commentData)) {
                    let response = responseLib.formatResponse(true, 'No comment details available.', 404, null)
                    res.send(response);
                }
                else{
                    
                    // console.log('created commentInfo-> ',JSON.parse(commentData[commentId]));
                    
                    let response = responseLib.formatResponse(false, 'comment created successfully.', 200, JSON.parse(commentData[commentId]))
                    res.send(response)
                }
            })
            
        }
    })
}

module.exports={
    editIssueDetails:editIssueDetails,
    assignIssueToOthers:assignIssueToOthers,
    commentOnIssue:commentOnIssue
}