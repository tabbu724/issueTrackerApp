const issueModel = require('../models/issueDetails')
    , responseLib = require('../libraries/responseFormatter')
    , checkLib = require('../libraries/checkLib')
    , shortid = require('shortid')
userModel = require('../models/user')

let dashboardInfo = (req, res) => {
    issueModel.find({ assigneeId: req.user.userId }, (err, issueDetails) => {
        if (err) {
            let response = responseLib.formatResponse(true, 'Error in finding issues assigned to you.', 500, null)
            res.send(response)
        }
        else if (checkLib.isEmpty(issueDetails)) {
            let response = responseLib.formatResponse(true, 'No issues are assigned to you.', 404, null)
            res.send(response)
        }
        else {
            let response = responseLib.formatResponse(false, 'Issues assigned to you are found.', 200, issueDetails)
            res.send(response)
        }
    })
}

let filterRowsByStatus = (req, res) => {
    issueModel.find({ status: req.params.status }, (err, statusBasedIssueDetails) => {
        if (err) {
            let response = responseLib.formatResponse(true, 'Error in finding issues with this status.', 500, null)
            res.send(response)
        }
        else if (checkLib.isEmpty(statusBasedIssueDetails)) {
            let response = responseLib.formatResponse(true, 'No issues exist with this status.', 404, null)
            res.send(response)
        }
        else {
            let response = responseLib.formatResponse(false, 'Status based issues are found.', 200, statusBasedIssueDetails)
            res.send(response)
        }
    })
}

let filterRowsByTitle = (req, res) => {
    issueModel.find({ title: req.params.title }, (err, titleBasedIssueDetails) => {
        if (err) {
            let response = responseLib.formatResponse(true, 'Error in finding issues with this title.', 500, null)
            res.send(response)
        }
        else if (checkLib.isEmpty(titleBasedIssueDetails)) {
            let response = responseLib.formatResponse(true, 'No issues exist with this title.', 404, null)
            res.send(response)
        }
        else {
            let response = responseLib.formatResponse(false, 'Title based issues are found.', 200, titleBasedIssueDetails)
            res.send(response)
        }
    })
}

let filterRowsByReporterId = (req, res) => {
    issueModel.find({ reporterId: req.params.reporterId }, (err, reporterIdBasedIssueDetails) => {
        if (err) {
            let response = responseLib.formatResponse(true, 'Error in finding issues with this reporter id.', 500, null)
            res.send(response)
        }
        else if (checkLib.isEmpty(reporterIdBasedIssueDetails)) {
            let response = responseLib.formatResponse(true, 'No issues exist with this reporter id.', 404, null)
            res.send(response)
        }
        else {
            let response = responseLib.formatResponse(false, 'Reporter id based issues are found.', 200, reporterIdBasedIssueDetails)
            res.send(response)
        }
    })
}

let filterRowsByDate = (req, res) => {
    issueModel.find({ createdOn: req.params.createdOn }, (err, dateBasedIssueDetails) => {
        if (err) {
            let response = responseLib.formatResponse(true, 'Error in finding issues with this date.', 500, null)
            res.send(response)
        }
        else if (checkLib.isEmpty(dateBasedIssueDetails)) {
            let response = responseLib.formatResponse(true, 'No issues exist with this date.', 404, null)
            res.send(response)
        }
        else {
            let response = responseLib.formatResponse(false, 'Date based issues are found.', 200, dateBasedIssueDetails)
            res.send(response)
        }
    })
}

let sortCols = (req, res) => {
    let status = req.params.status || null
        , createdOn = req.params.createdOn || null
        , reporterId = req.params.reporterId || null
        , title = req.params.title || null
    issueModel.find({}, (err, sortResult) => {
        if (err) {
            let response = responseLib.formatResponse(true, 'Error in sorting rows.', 500, null)
            res.send(response);
        }
        else if (checkLib.isEmpty(sortResult)) {
            let response = responseLib.formatResponse(true, 'Rows not available for sorting.', 404, null)
            res.send(response);
        }
        else {
            let response = responseLib.formatResponse(false, 'Sorting done on basis of given cols.', 200, sortResult)
            res.send(response)
        }
    }).sort(`${status} ${createdOn} ${reporterId} ${title}`)
}

let createIssue = (req, res) => {
    let assigneeId
    userModel.find({ userName: req.body.username }, (err, userData) => {
        if (err) {
            console.log(err);
        }
        else {
            assigneeId = userData.userId
        }
    })
    let newIssue = new issueModel({
        issueId: shortid.generate(),
        status: req.body.status,
        title: req.body.title,
        reporterId: req.user.userId,
        assigneeId: assigneeId,
        attachmentUrls: req.attachments
    })
    newIssue.save((err, newIssueData) => {
        if (err) {
            let response = responseLib.formatResponse(true, 'Error in creating new issue.', 500, null)
            res.send(response);

        }
        else {
            let newIssueDataObject = newIssueData.toObject()
            delete newIssueDataObject._id
            delete newIssueDataObject.__v
            let response = responseLib.formatResponse(true, 'New issue has been created.', 200, newIssueData)
            res.send(response);
        }
    })
}

module.exports = {
    dashboardInfo: dashboardInfo,
    filterRowsByStatus: filterRowsByStatus,
    filterRowsByTitle: filterRowsByTitle,
    filterRowsByReporterId: filterRowsByReporterId,
    filterRowsByDate: filterRowsByDate,
    sortCols: sortCols,
    createIssue: createIssue
}