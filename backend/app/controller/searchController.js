const issueModel = require('../models/issueDetails')
    , responseLib = require('../libraries/responseFormatter')
    , checkLib = require('../libraries/checkLib')
    ,validateLib=require('../libraries/validateLib')

let searchIssue = (req, res) => {
    let searchString = req.params.text

    let searchCriteria = { $text: { $search: searchString } }

    issueModel.find(searchCriteria, (err, data) => {
        if (err) {
            let response = responseLib.formatResponse(true, err.message, 500, null)
            res.send(response);
        }
        else if (checkLib.isEmpty(data)) {
            let response = responseLib.formatResponse(true, 'No such details for any issue exist.', 404, null)
            res.send(response);
        }
        else {

            let response = responseLib.formatResponse(false, 'Search successfull.', 200, data)
            res.send(response)
        }
    })
}

let sortColsForSearchText = (req, res) => {
    // console.log('req.body.title',req.body.title);
    
    let status = req.body.status==='true'?'status':null
        , creationDate = req.body.creationDate==='true'?'createdOn':null
        , reporterName = req.body.reporterName==='true'?'reporterId':null
        , title = req.body.title==='true'?'title':null
        ,searchString = req.body.text

        ,searchCriteria = { $text: { $search: searchString } }
    issueModel.find(searchCriteria, (err, sortResult) => {
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

let filterRowsByStatus = (req, res) => {
    let searchString = req.params.text

    , searchCriteria = { status: req.params.status , $text: { $search: searchString } }
    issueModel.find(searchCriteria, (err, statusBasedIssueDetails) => {
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
    let searchString = req.params.text

    , searchCriteria = { title: req.params.title  , $text: { $search: searchString } }
    issueModel.find(searchCriteria, (err, titleBasedIssueDetails) => {
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
    let searchString = req.params.text

    , searchCriteria = { reporterName: req.params.reporterName  , $text: { $search: searchString } }
    issueModel.find(searchCriteria, (err, reporterBasedIssueDetails) => {
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
    , searchString = req.params.text

    , searchCriteria = { creationDateString:dateToSearch , $text: { $search: searchString } }
    
    if(validateLib.validateDateFormat(dateToSearch)){
        issueModel.find(searchCriteria
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


module.exports = {
    searchIssue: searchIssue,
    sortColsForSearchText:sortColsForSearchText,
    filterRowsByDate:filterRowsByDate,
    filterRowsByReporter:filterRowsByReporter,
    filterRowsByStatus:filterRowsByStatus,
    filterRowsByTitle:filterRowsByTitle
}