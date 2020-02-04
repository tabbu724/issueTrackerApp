const issueModel = require('../models/issueDetails')
    , responseLib = require('../libraries/responseFormatter')
    , checkLib = require('../libraries/checkLib')
    , shortid = require('shortid')
    ,userModel = require('../models/user')
    ,validateLib=require('../libraries/validateLib')
    ,timeLib=require('../libraries/dateTimeLib')

let dashboardInfo = (req, res) => {
    issueModel.find({ assigneeName: req.authorisedUser.userName }, (err, issueDetails) => {
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
    issueModel.find({ status: req.params.status ,assigneeName: req.authorisedUser.userName}, (err, statusBasedIssueDetails) => {
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
    issueModel.find({ title: req.params.title ,assigneeName: req.authorisedUser.userName}, (err, titleBasedIssueDetails) => {
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

let filterRowsByReporter = (req, res) => {
    issueModel.find({ reporterName: req.params.reporterName ,assigneeName: req.authorisedUser.userName}, (err, reporterBasedIssueDetails) => {
        if (err) {
            let response = responseLib.formatResponse(true, 'Error in finding issues with this reporter name.', 500, null)
            res.send(response)
        }
        else if (checkLib.isEmpty(reporterBasedIssueDetails)) {
            let response = responseLib.formatResponse(true, 'No issues exist with this reporter name.', 404, null)
            res.send(response)
        }
        else {
            let response = responseLib.formatResponse(false, 'Reporter name based issues are found.', 200, reporterBasedIssueDetails)
            res.send(response)
        }
    })
   
}

let filterRowsByDate = (req, res) => {
    
    
    
    let dateToSearch=req.params.creationDate
   
    
    if(validateLib.validateDateFormat(dateToSearch)){
        issueModel.find({creationDateString:dateToSearch,assigneeName: req.authorisedUser.userName}
            , (err, dateBasedIssueDetails) => {
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
    else{
        let response = responseLib.formatResponse(true, 'Date should be in YYYY-MM-DD format', 500, null)
        res.send(response)
    }
    
   
}

let sortCols = (req, res) => {
    // console.log('req.body.title',req.body.title);
    
    let status = req.body.status==='true'?'status':null
        , creationDate = req.body.creationDate==='true'?'createdOn':null
        , reporterName = req.body.reporterName==='true'?'reporterId':null
        , title = req.body.title==='true'?'title':null
        
    issueModel.find({assigneeName: req.authorisedUser.userName}, (err, sortResult) => {
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
    })
    .sort(`${status} ${creationDate} ${reporterName} ${title}`)
}

let createIssue = (req, res) => {
    if(req.uploadErr!=undefined){
        let response = responseLib.formatResponse(true, `Upload Error: ${req.uploadErr.message}`, 500, null)
                    res.send(response);
    }
    else{
        // console.log('reporter',req.authorisedUser.userName);
        if(req.body.status==undefined||req.body.title==undefined||req.body.description==undefined||req.body.assigneeName==undefined){
            console.log(req.body.status,req.body.title,req.body.description,req.body.assigneeName);
            
            let response = responseLib.formatResponse(true, 'Some required parameters are missing.', 500, null)
                res.send(response);
        }
        else{
            userModel.findOne({ userName: req.body.assigneeName }, (err, userData) => {
                               
                if (err) {
                    console.log(err);
                }
                else if (checkLib.isEmpty(userData)) {
                    let response = responseLib.formatResponse(true, 'Issue cannot be assigned to this assignee as no such user exists', 404, null)
                    res.send(response)
                }
                else {
                    let newIssue = new issueModel({
                        issueId: shortid.generate(),
                        status: req.body.status,
                        title: req.body.title,
                        reporterName: req.authorisedUser.userName,
                        assigneeName: req.body.assigneeName,
                        attachmentUrls: req.attachments,
                        description:req.body.description
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
                            let response = responseLib.formatResponse(false, 'New issue has been created.', 200, newIssueDataObject)
                            res.send(response);
                        }
                    })
                }
            }) 
        }
        
    }
    
  
}



module.exports = {
    dashboardInfo: dashboardInfo,
    filterRowsByStatus: filterRowsByStatus,
    filterRowsByTitle: filterRowsByTitle,
    filterRowsByReporter: filterRowsByReporter,
    filterRowsByDate: filterRowsByDate,
    sortCols: sortCols,
    createIssue: createIssue
}