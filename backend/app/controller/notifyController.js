const notificationModel = require('../models/notification')
    , checkLib = require('../libraries/checkLib')
    , responseLib = require('../libraries/responseFormatter')
    , loggerLib = require('../libraries/loggerLib')
    , redisLib = require('../libraries/redisLib')
    , issueModel = require('../models/issueDetails')
    , userModel = require('../models/user')


let showNotifications = (req, res) => {
    notificationModel.find({ userId: req.params.userId }, (err, notifications) => {
        if (err) {
            let response = responseLib.formatResponse(true, err.message, 500, null)
            res.send(response);
        }
        else if (checkLib.isEmpty(notifications)) {
            let response = responseLib.formatResponse(true, 'Empty notification history .', 404, null)
            res.send(response)
        }
        else {
            let response = responseLib.formatResponse(false, 'Notification history found.', 200, notifications)
            res.send(response);
        }
    }).select('-__v -_id')
}

let generateNotificationHistoryForReporter = (req, res) => {
    console.log(req.body.issueId, 'issueId');

    issueModel.findOne({ issueId: req.body.issueId }, (err, issueDetails) => {
        console.log(issueDetails, 'issueDetails');

        if (err) {
            let response = responseLib.formatResponse(true, err.message, 500, null)
            res.send(response);
        }
        else if (checkLib.isEmpty(issueDetails)) {
            let response = responseLib.formatResponse(true, 'No such issue exists', 404, null)
            res.send(response)
        }
        else {
            loggerLib.captureInfo('issue details to be notified are found', 0, 'notifyController/generateNotificationHistoryForReporter')
            userModel.findOne({ userName: issueDetails.reporterName }, (err, userDetails) => {
                if (err) {
                    let response = responseLib.formatResponse(true, err.message, 500, null)
                    res.send(response);
                }
                else if (checkLib.isEmpty(userDetails)) {
                    let response = responseLib.formatResponse(true, 'No such reporter exists.', 404, null)
                    res.send(response)
                }
                else {
                    loggerLib.captureInfo('reporter to be notified is found', 0, 'notifyController/generateNotificationHistoryForReporter')
                    let reporterId = userDetails.userId

                    let notifyDoc = new notificationModel({
                        userId: reporterId,
                        issueId: req.body.issueId,
                        msg: req.body.msg
                    })
                    notifyDoc.save((err, savedInfo) => {
                        if (err) {

                            loggerLib.captureError(err.message, 10, 'notifyController/saveNotifications')

                        }
                        else {
                            loggerLib.captureInfo(savedInfo, 0, 'notifyController/saveNotifications')
                            let notification = savedInfo.toObject()
                            delete notification.__v
                            delete notification._id
                            let response = responseLib.formatResponse(false, 'Notification history created for reporter.', 200, notification)
                            res.send(response);
                        }
                    })


                }
            })
        }
    })
}

let generateNotificationHistoryForWatcher = (req, res) => {
    redisLib.showHash(req.body.issueId + '{Watcher-list}', (err, data) => {
        if (err) {
            console.log(err);
        }
        else if (checkLib.isEmpty(data)) {
            console.log('no watchers found');
        }
        else {
            let watcherList = []
            for (key in data) {
                watcherList.push(key)
            }
            watcherList.forEach(watcher => {
                let notifyDoc = new notificationModel({
                    userId: watcher,
                    issueId: req.body.issueId,
                    msg: req.body.msg
                })
                notifyDoc.save((err, savedInfo) => {
                    if (err) {

                        loggerLib.captureError(err.message, 10, 'notifyController/saveNotifications')

                    }
                    else {
                        loggerLib.captureInfo(savedInfo, 0, 'notifyController/saveNotifications')
                        let notification = savedInfo.toObject()
                        delete notification.__v
                        delete notification._id
                        let response = responseLib.formatResponse(false, 'Notification history created for watchers.', 200, notification)
                        res.send(response);
                    }
                })
            });

        }
    })
}

module.exports = {
    showNotifications: showNotifications,
    generateNotificationHistoryForReporter: generateNotificationHistoryForReporter,
    generateNotificationHistoryForWatcher: generateNotificationHistoryForWatcher
}