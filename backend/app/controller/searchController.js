const issueModel = require('../models/issueDetails')
,responseLib=require('../libraries/responseFormatter')
,checkLib=require('../libraries/checkLib')

let searchIssue = (req, res) => {
    let searchString=req.params.text
    console.log(searchString);
    
//     let searchCriteria = [
// {
//         $match: {

//             $or: [

//                 {
//                     status: {$regex: searchString
//                     ,$options: 'i' }},

//                 {
//                     title: {$regex: searchString
//                     ,$options: 'i'}},

//                 {
//                     description: {$regex: searchString
//                         ,$options: 'i'}},
//                         {
//                             creationDateString: {$regex: searchString
//                             ,$options: 'i'}},
//                             {
//                                 attachmentUrls: {$regex: searchString
//                                 ,$options: 'i'}},
//                                 {
//                                     issueId: {$regex: searchString
//                                     ,$options: 'i'}},
        
//             ]
//         }
//     }
//     ]

let searchCriteria={$text: {$search: searchString}}

    issueModel.find(searchCriteria,(err,data)=>{
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
module.exports={
    searchIssue:searchIssue
}