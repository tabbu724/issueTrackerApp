const issueModel = require('../models/issueDetails')
    , responseLib = require('../libraries/responseFormatter')
    , checkLib = require('../libraries/checkLib')
    , shortid = require('shortid')
    , userModel = require('../models/user')
    , timeLib = require('../libraries/dateTimeLib')
    , redisLib = require('../libraries/redisLib')
    , socketLib = require('../libraries/socketLib')
,serverInstance=require('../../index')
,event=require('events')
,eventEmitter=new event.EventEmitter()


let editIssueDetails = (req, res) => {

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

            if (req.attachments.length!= 0) {
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
                    let updatedWithFlags=updatedDetails.toObject()
                    // console.log(updatedWithFlags);
                    
                    updatedWithFlags.flags=flags
                    let response = responseLib.formatResponse(false, 'Issue details updated successfully.', 200, updatedWithFlags)

                    
                   
                   
                    res.send(response)
                }
            })

        }
    })
}

let assignIssueToOthers = (req, res) => {
    userModel.findOne({ userName: req.params.username }, (err, userData) => {
        if (err) {
            console.log(err);
        }
        else if (checkLib.isEmpty(userData)) {
            let response = responseLib.formatResponse(true, 'No such user exists', 404, null)
            res.send(response)
        }
        else {
            let newAssigneeInfo = {
                assigneeId: userData.userId
            }
            issueModel.updateOne({ issueId: req.params.issueId }, newAssigneeInfo, (err, updatedDetails) => {
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

let commentOnIssue = (req, res) => {
    // check if issueid and userid exist
    let commentId = shortid.generate()
    let commentDetails = {
        comment: req.body.comment,
        userId: req.body.userId,
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

                    let response = responseLib.formatResponse(false, 'comment created successfully.', 200, JSON.parse(commentData[commentId]))
                    res.send(response)
                }
            })

        }
    })
}

let addWatcher = (req, res) => {

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
            let response = responseLib.formatResponse(false, 'You are added as a watcher successfully.', 200, additionStatus)
            res.send(response)
        }
    })
}

let listAllWatcher = (req, res) => {

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

module.exports = {
    editIssueDetails: editIssueDetails,
    assignIssueToOthers: assignIssueToOthers,
    commentOnIssue: commentOnIssue,
    addWatcher: addWatcher,
    listAllWatcher: listAllWatcher
}