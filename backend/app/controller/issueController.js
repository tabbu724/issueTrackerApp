const issueModel = require('../models/issueDetails')
    , responseLib = require('../libraries/responseFormatter')
    , checkLib = require('../libraries/checkLib')
    , shortid = require('shortid')
    , userModel = require('../models/user')
    , timeLib = require('../libraries/dateTimeLib')
    , redisLib = require('../libraries/redisLib')
    , socketLib = require('../libraries/socketLib')
    , serverInstance = require('../../index')
    , event = require('events')
    , eventEmitter = new event.EventEmitter()

let issueDescriptionViewInfo = (req, res) => {
    issueModel.findOne({ issueId: req.params.issueId }, (err, issueInfo) => {
        if (err) {
            let response = responseLib.formatResponse(true, 'Error in finding requested issue details.', 500, null)
            res.send(response);
        }
        else if (checkLib.isEmpty(issueInfo)) {
            let response = responseLib.formatResponse(true, 'No such issue exists .', 404, null)
            res.send(response)
        }
        else {
            let response = responseLib.formatResponse(false, 'Requested issue details have been found.', 200, issueInfo)
            res.send(response);
        }
    })
}


let editIssueDetails = (req, res) => {
    if(req.body.title==undefined||req.body.issueId==undefined||req.body.description||req.body.status){
        let response = responseLib.formatResponse(true, 'Some required parameters are missing.', 500, null)
            res.send(response);
    }
    else{
        issueModel.findOne({ issueId: req.body.issueId }, (err, issueDetails) => {

            if (err) {
                let response = responseLib.formatResponse(true, err.message, 500, null)
                res.send(response)
            }
            else if (checkLib.isEmpty(issueDetails)) {
                let response = responseLib.formatResponse(true, 'no such details found', 404, null)
                res.send(response)
            }
            else {
    
                let flags = {
                    attachment: 0,
                    title: 0,
                    description: 0,
                    status: 0
                }
                // console.log(req.attachments);
    
                if (req.attachments.length != 0) {
                    req.attachments.forEach(fileObject => {
                        issueDetails.attachmentUrls.push(fileObject)
                    });
                    flags.attachment = 1
                }
                if (req.body.title != undefined) {
                    issueDetails.title = req.body.title
                    flags.title = 1
                }
                if (req.body.description != undefined) {
                    issueDetails.description = req.body.description
                    flags.description = 1
                }
                if (req.body.status != undefined) {
                    issueDetails.status = req.body.status
                    flags.status = 1
                }
    
                issueDetails.save((err, updatedDetails) => {
                    if (err) {
                        let response = responseLib.formatResponse(true, err.message, 500, null)
                        res.send(response)
                    }
                    else {
                        let updatedWithFlags = updatedDetails.toObject()
                        // console.log(updatedWithFlags);
    
                        updatedWithFlags.flags = flags
                        let response = responseLib.formatResponse(false, 'Issue details updated successfully.', 200, updatedWithFlags)
    
    
    
    
                        res.send(response)
                    }
                })
    
            }
        })
    }
   
}

let assignIssueToOthers = (req, res) => {
    if(req.body.assigneeUsername==undefined||req.body.issueId==undefined){
        let response = responseLib.formatResponse(true, 'Some required parameters are missing.', 500, null)
            res.send(response);
    }
    else{
        userModel.findOne({ userName: req.body.assigneeUsername }, (err, userData) => {
            if (err) {
                console.log(err);
            }
            else if (checkLib.isEmpty(userData)) {
                let response = responseLib.formatResponse(true, 'Issue cannot be assigned to this assignee as no such user exists', 404, null)
                res.send(response)
            }
            else {
                let newAssigneeInfo = {
                    assigneeId: userData.userId
                }
                issueModel.updateOne({ issueId: req.body.issueId }, newAssigneeInfo, (err, updatedDetails) => {
                    if (err) {
                        let response = responseLib.formatResponse(true, err.message, 500, null)
                        res.send(response);
                    }
                    else if (checkLib.isEmpty(updatedDetails)) {
                        let response = responseLib.formatResponse(true, 'This issue is already assigned to this user.', 404, null)
                        res.send(response);
                    }
                    else {
                        updatedDetails.notifyMsg = `Issue with id : ${req.body.issueId} has been assigned to ${req.body.username}.`
                        let response = responseLib.formatResponse(false, 'Assignee updated successfully.', 200, updatedDetails)
                        res.send(response)
                    }
                })
            }
        })
    }
    
}

let commentOnIssue = (req, res) => {
    // check if issueid and userid exist
    let commentId = shortid.generate()
    if(req.body.comment==undefined||req.body.username==undefined||req.body.issueId==undefined){
        let response = responseLib.formatResponse(true, 'Some required parameters are missing.', 500, null)
            res.send(response);
    }
    else{
        let commentDetails = {
            comment: req.body.comment,
            userName: req.body.username,
            commentDate: timeLib.now()
            }
        redisLib.createHash(req.body.issueId + '{Comment-list}', commentId, JSON.stringify(commentDetails), (err, commentCreationStatus) => {
            if (err) {
                let response = responseLib.formatResponse(true, err.message, 500, null)
                res.send(response);
            }
            else if (checkLib.isEmpty(commentCreationStatus)) {
                let response = responseLib.formatResponse(true, 'No comment details available.', 404, null)
                res.send(response);
            }
            else {
                redisLib.showHash(req.body.issueId + '{Comment-list}', (err, commentData) => {
                    if (err) {
                        let response = responseLib.formatResponse(true, err.message, 500, null)
                        res.send(response);
                    }
                    else if (checkLib.isEmpty(commentData)) {
                        let response = responseLib.formatResponse(true, 'No comment details available.', 404, null)
                        res.send(response);
                    }
                    else {
    
                        // console.log('created commentInfo-> ',JSON.parse(commentData[commentId]));
    
                        let commentObject = JSON.parse(commentData)
    
                        commentObject['notifyMsg'] = `${req.body.username} commented on issue with id : ${req.body.issueId} .`
                        let response = responseLib.formatResponse(false, 'comment created successfully.', 200, commentObject)
                        res.send(response)
                    }
                })
    
            }
        })
    }
   
}

let addWatcher = (req, res) => {
if(req.body.issueId==undefined||  req.body.userId==undefined||  req.body.userName==undefined){
    let response = responseLib.formatResponse(true, 'Some required parameters are missing', 500, null)
            res.send(response);
}
    else{
        redisLib.createHash(req.body.issueId + '{Watcher-list}', req.body.userId, req.body.userName, (err, additionStatus) => {
            if (err) {
                let response = responseLib.formatResponse(true, err.message, 500, null)
                res.send(response);
            }
            else if (checkLib.isEmpty(additionStatus)) {
                let response = responseLib.formatResponse(true, 'Watcher creation staus not available.', 404, null)
                res.send(response);
            }
            else {
                console.log(typeof additionStatus);
                let details = {
                    additionStatus: additionStatus,
                    notifyMsg: `${req.body.userName} is a watcher to issue with issue id :${req.body.issueId}. `
                }
                let response = responseLib.formatResponse(false, 'You are added as a watcher successfully.', 200, details)
                res.send(response)
            }
        })
    }
}

let listAllWatcher = (req, res) => {
    if(req.body.issueId==undefined){
        let response = responseLib.formatResponse(true, 'Some required parameters are missing', 500, null)
                res.send(response);
    }
    else{
        redisLib.showHash(req.params.issueId + '{Watcher-list}', (err, watcherInfo) => {
            if (err) {
                let response = responseLib.formatResponse(true, err.message, 500, null)
                res.send(response);
            }
            else if (checkLib.isEmpty(watcherInfo)) {
                let response = responseLib.formatResponse(true, 'No watcher details available.', 404, null)
                res.send(response);
            }
            else {
                let response = responseLib.formatResponse(false, 'All watchers are available .', 200, watcherInfo)
                res.send(response)
            }
        })
    }
    
}

module.exports = {
    issueDescriptionViewInfo: issueDescriptionViewInfo,
    editIssueDetails: editIssueDetails,
    assignIssueToOthers: assignIssueToOthers,
    commentOnIssue: commentOnIssue,
    addWatcher: addWatcher,
    listAllWatcher: listAllWatcher
}