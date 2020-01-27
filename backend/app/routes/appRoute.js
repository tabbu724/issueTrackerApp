const config = require('../../config/appConfig')
  , controller = require('../controller/loginController')
  , dashboardController = require('../controller/dashboradController')
  , issueController = require('../controller/issueController')
  , passport = require('passport')
  , multer = require('multer')
  , storage = multer.memoryStorage()
  , upload = multer({ storage: storage })
  , uploadMiddleware = require('../middlewares/fileUpload')
  , searchController = require('../controller/searchController')
  , cors = require('cors')
  , fbStrategy = require('passport-facebook').Strategy
  , passportSession = require('../libraries/socialLoginLib')
  , authMiddleware = require('../middlewares/auth')
  , encryptLib = require('../libraries/encryptLib')
  , googleStrategy = require('passport-google-oauth20').Strategy


let setRouter = (app) => {
  let baseUrl = `${config.configuration.version}/app`

  app.use(cors())
//   app.all(baseUrl+'/*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
// });

  app.post(baseUrl + '/register', controller.signup)
/**@api {post} /api/v1/app/register User Sign Up
     * @apiVersion 1.0.0
     * @apiGroup Create
     * @apiParam {string} username Pass the username as body parameter
     * @apiParam {string} email Pass the email as body parameter
     * @apiParam {string} password Pass the password as body parameter
     * @apiSuccessExample {json} Success-Response:
     * {
    "err": false,
    "message": "A new user has been created successfully",
    "status": 200,
    "data": {
        "createdOn": "String",
        "modifiedOn": "String",
        "userId": "String",
        "userName": "String",
        "email": "String"
    }
}
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "A user with this email id already exists."
}

{
    "err": true,
    "message": "User name is not as per the norms.",
    "status": 500,
    "data": null
}

{
    "err": true,
    "message": "Password should be alphanumeric and have at least 8 characters.",
    "status": 500,
    "data": null
}
     */

  app.post(baseUrl + '/login', controller.login)
/**@api {post} /api/v1/app/login User Log In
     * @apiVersion 1.0.0
     * @apiGroup Create
     * @apiParam {string} usernameEmail Pass the username or email as body parameter
     * @apiParam {string} password Pass the password as body parameter
     * @apiSuccessExample {json} Success-Response:
     * {
    "err": false,
    "message": "Login successfull.",
    "status": 200,
    "data": {
        "authToken": "String",
        "userDetails": {
            "userId": "String",
            "userName: "String" ,
            "email": "String"
        }
    }
}
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "This username does not exists.Login Failed.",
    "status": 500,
    "data": null
}

{
    "err": true,
    "message": "The password is incorrect.Login Failed",
    "status": 500,
    "data": null
}

     */

  app.get(baseUrl + "/auth/facebook", passport.authenticate("facebook"))
  /**@api {get} /api/v1/app/auth/facebook             To login through facebook
     * @apiVersion 1.0.0
     * @apiGroup Read
     * @apiSuccessExample {json} Success-Response:
     * {
  A facebook login page
}
     * @apiErrorExample {json} Error-Response:
     * {}
     */
  
  app.get(baseUrl + "/auth/facebook/callback", passport.authenticate("facebook", {
    successRedirect: baseUrl + '/socialLogin'
  }))
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));
 /**@api {get} /api/v1/app/auth/google             To login through google
     * @apiVersion 1.0.0
     * @apiGroup Read
     * @apiSuccessExample {json} Success-Response:
     * {
  A google login page
}
     * @apiErrorExample {json} Error-Response:
     * {}
     */
  app.get('/auth/google/callback',
    passport.authenticate('google', { successRedirect: baseUrl + '/socialLogin' }));
  app.get(baseUrl + '/socialLogin', controller.socialLogin)


  
  app.post(baseUrl + '/logOut', authMiddleware.authorisation, controller.logout)
/**@api {post} /api/v1/app/login User Log In
     * @apiVersion 1.0.0
     * @apiGroup Create
     * @apiParam {string} authToken Pass the authToken as body parameter or header
     * @apiSuccessExample {json} Success-Response:
     * {
    "err": false,
    "message": "Successfully logged out",
    "status": 200,
    "data": {
        "n": 1,
        "ok": 1,
        "deletedCount": 1
    }
}
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Invalid/expired Auth token",
    "status": 500,
    "data": null
}

     */


  // dashboard routes
  app.get(baseUrl + '/viewDashboard', authMiddleware.authorisation, dashboardController.dashboardInfo)
  /**@api {get} /api/v1/app/viewDashboard             View the user dashboard
     * @apiVersion 1.0.0
     * @apiGroup Read
     * @apiParam {string} authToken Pass the authToken as a query parameter
     * @apiSuccessExample {json} Success-Response:
     * {
    "err": true,
    "message": "No issues are assigned to you.",
    "status": 404,
    "data": null
}

{
    "err": false,
    "message": "Issues assigned to you are found.",
    "status": 200,
    "data": [
        {
            "creationDate": "String",
            "creationDateString": "String",
            "_id": "String",
            "issueId": "String",
            "status": "String",
            "title": "String",
            "assigneeName": "String",
            "attachmentUrls": [
                {
                    "_id": "String",
                    "fileName": "String",
                    "fileUrl": "String"
                }
            ],
            "description": "String",
            "__v": number
        },
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Invalid/expired Auth token",
    "status": 500,
    "data": null
}
     */
  app.get(baseUrl + '/filterByStatus/:status', authMiddleware.authorisation, dashboardController.filterRowsByStatus)
/**@api {get} /api/v1/app/filterByStatus/:status      Filter the assigned issues by status                                                                                                                                                                                      
 * @apiVersion 1.0.0
     * @apiGroup Read
     * @apiParam {string} authToken Pass the authToken as a query parameter
     * @apiParam {string} status pass status(in-progress,backlog,in-test,done) as route parameter
     * @apiSuccessExample {json} Success-Response:
     *{
    "err": false,
    "message": "Status based issues are found.",
    "status": 200,
    "data": [
        {
            "createdOn": "2020-01-17T12:00:15.000Z",
            "attachmentUrls": [],
            "_id": "5e21a45f7e1b353d6d34e4d4",
            "issueId": "41D9S9Vx",
            "status": "done",
            "title": "a production issue",
            "reporterId": "DHvRE6KW",
            "assigneeId": "106618984403917733636",
            "__v": 0
        }
    ]
}
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Auth token missing in the request",
    "status": 400,
    "data": null
}

{
    "err": true,
    "message": "No issues exist with this status.",
    "status": 404,
    "data": null
}
     */


  app.get(baseUrl + '/filterByDate/:creationDate', authMiddleware.authorisation, dashboardController.filterRowsByDate)
  /**@api {get} /api/v1/app/filterByDate/:creationDate      Filter the assigned issues by creation date
  * @apiVersion 1.0.0
     * @apiGroup Read
     * @apiParam {string} authToken Pass the authToken as a query parameter
     * @apiParam {string} creationDate pass creation date(in-YYYY-MM-DD format) as route parameter
     * @apiSuccessExample {json} Success-Response:
     *{
    "err": false,
    "message": "Date based issues are found.",
    "status": 200,
    "data": [
        {
            "creationDate": "String",
            "creationDateString": "String",
            "attachmentUrls": [
                "String"
            ],
            "_id": "String",
            "issueId": "String",
            "status": "String",
            "title": "String",
            "reporterId": "String",
            "assigneeId": "String",
            "__v": number
        }
    ]
}
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Auth token missing in the request",
    "status": 400,
    "data": null
}

{
    "err": true,
    "message": "No issues exist with this date.",
    "status": 404,
    "data": null
}
     */
  
  
  app.get(baseUrl + '/filterByReporter/:reporterName', authMiddleware.authorisation, dashboardController.filterRowsByReporter)
  /**@api {get} /api/v1/app/filterByReporter/:reporterName     Filter the assigned issues by resporter name
  * @apiVersion 1.0.0
     * @apiGroup Read
     * @apiParam {string} authToken Pass the authToken as a query parameter
     * @apiParam {string} reporterName pass name of the reporter as route parameter
     * @apiSuccessExample {json} Success-Response:
     {
    "err": false,
    "message": "Reporter name based issues are found.",
    "status": 200,
    "data": [
        {
            "creationDate": "String",
            "creationDateString": "String",
            "_id": "String",
            "issueId": "String",
            "status": "String",
            "title": "String",
            "reporterName": "String",
            "assigneeName": "String",
            "attachmentUrls": [
                {
                    "_id": "String",
                    "fileName": "String",
                    "fileUrl": "String"
                }
            ],
            "description": "String",
            "__v": number
        }
      ]
    }
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Auth token missing in the request",
    "status": 400,
    "data": null
}

{
    "err": true,
    "message": "No issues exist with this reporter name.",
    "status": 404,
    "data": null
}
     */
  
  
  app.get(baseUrl + '/filterByTitle/:title', authMiddleware.authorisation, dashboardController.filterRowsByTitle)
  /**@api {get} /api/v1/app/filterByTitle/:title     Filter the assigned issues by title
  * @apiVersion 1.0.0
     * @apiGroup Read
     * @apiParam {string} authToken Pass the authToken as a query parameter
     * @apiParam {string} title Pass title of the issue as route parameter
     * @apiSuccessExample {json} Success-Response:
     {
    "err": false,
    "message": "Reporter name based issues are found.",
    "status": 200,
    "data": [
        {
            "creationDate": "String",
            "creationDateString": "String",
            "_id": "String",
            "issueId": "String",
            "status": "String",
            "title": "String",
            "assigneeName": "String",
            "attachmentUrls": [
                {
                    "_id": "String",
                    "fileName": "String",
                    "fileUrl": "String"
                }
            ],
            "description": "String",
            "__v": number
        }
      ]
    }
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Auth token missing in the request",
    "status": 400,
    "data": null
}

{
    "err": true,
    "message": "No issues exist with this title.",
    "status": 404,
    "data": null
}
     */
  
  app.post(baseUrl + '/sortByColumns', authMiddleware.authorisation, dashboardController.sortCols)
  /**@api {post} /api/v1/app/sortByColumns    Sort issues by various columns(title,status,date,reporter).Pass any one.
     * @apiVersion 1.0.0
     * @apiGroup Create
     * @apiParam {string} status Pass true as body parameter 
     * * @apiParam {string} creationDate Pass true as body parameter 
     * * @apiParam {string} reporterName Pass true as body parameter 
     * * @apiParam {string} title Pass true as body parameter 
     * @apiParam {string} authToken Pass the authToken as body parameter or header
     * @apiSuccessExample {json} Success-Response:
     * {
    "err": false,
    "message": "Sorting done on basis of given cols.",
    "status": 200,
    "data": [
{
            "creationDate": "String",
            "creationDateString": "String",
            "_id": "String",
            "issueId": "String",
            "status": "String",
            "title": "String",
            "assigneeName": "String",
            "attachmentUrls": [
                {
                    "_id": "String",
                    "fileName": "String",
                    "fileUrl": "String"
                }
            ],
            "description": "String",
            "__v": number
        }
    ]
}
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Invalid/expired Auth token",
    "status": 500,
    "data": null
}

     */
  
  
  app.post(baseUrl + '/createIssue', authMiddleware.authorisation, upload.any(), uploadMiddleware.fileUploader, dashboardController.createIssue)
/**@api {post} /api/v1/app/createIssue      To report a bug
     * @apiVersion 1.0.0
     * @apiGroup Create
     * @apiParam {string} status Pass the authToken as body parameter 
     *@apiParam {string} assigneeName Pass the name of assignee as body parameter 
     *@apiParam {string} title Pass the title as body parameter  
     *@apiParam {string} description Pass the description as body parameter 
     *@apiParam {string} attachments Pass the attachments file as body parameter 
     * @apiParam {string} authToken Pass the authToken as body parameter or header
     * @apiSuccessExample {json} Success-Response:
     * {
    "err": false,
    "message": "New issue has been created.",
    "status": 200,
    "data": [
{
            "creationDate": "String",
            "creationDateString": "String",
            "_id": "String",
            "issueId": "String",
            "status": "String",
            "title": "String",
            "reporterName": "String",
            "assigneeName": "String",
            "attachmentUrls": [
                {
                    "_id": "String",
                    "fileName": "String",
                    "fileUrl": "String"
                }
            ],
            "description": "String"
        }
    ]
}
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Invalid/expired Auth token",
    "status": 500,
    "data": null
}

{
    "err": true,
    "message": "Some required parameters are missing.",
    "status": 500,
    "data": null
}

     */

  // issue description routes
  app.put(baseUrl + '/editIssue', authMiddleware.authorisation, upload.any(), uploadMiddleware.fileUploader, issueController.editIssueDetails)
  /**@api {put} /api/v1/app/editIssue    To edit the details of an issue
     * @apiVersion 1.0.0
     * @apiGroup Update
     * @apiParam {string} issueId Pass the issue id as body parameter
     *  @apiParam {string} status Pass the status as body parameter 
     *@apiParam {string} title Pass the title as body parameter  
     *@apiParam {string} description Pass the description as body parameter 
     *@apiParam {string} attachments Pass the attachments file as body parameter 
     * @apiParam {string} authToken Pass the authToken as body parameter or header
     * @apiSuccessExample {json} Success-Response:
     * {
    "err": false,
    "message": "Issue details updated successfully.",
    "status": 200,
    "data": [
{
            "creationDate": "String",
            "creationDateString": "String",
            "_id": "String",
            "issueId": "String",
            "status": "String",
            "title": "String",
            "reporterName": "String",
            "assigneeName": "String",
            "attachmentUrls": [
                {
                    "_id": "String",
                    "fileName": "String",
                    "fileUrl": "String"
                }
            ],
            "description": "String"
        }
    ]
}
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Invalid/expired Auth token",
    "status": 500,
    "data": null
}



     */
  
  app.post(baseUrl + '/comment', authMiddleware.authorisation, issueController.commentOnIssue)
 /**@api {post} /api/v1/app/comment    To comment on an issue
     * @apiVersion 1.0.0
     * @apiGroup Create
     * @apiParam {string} issueId Pass the issue id as body parameter
     *  @apiParam {string} username Pass the username as body parameter 
     *@apiParam {string} comment Pass the comment as body parameter  
     * @apiParam {string} authToken Pass the authToken as body parameter or header
     * @apiSuccessExample {json} Success-Response:
     * {
    "err": false,
    "message": "comment created successfully.",
    "status": 200,
    "data": {
        "comment": "String",
        "userName": "String",
        "commentDate": "String",
        "notifyMsg": "String"
    }
}
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Invalid/expired Auth token",
    "status": 500,
    "data": null
}
{
    "err": true,
    "message": "Some required parameters are missing.",
    "status": 500,
    "data": null
}


     */

  app.post(baseUrl + '/addAsWatcher', authMiddleware.authorisation, issueController.addWatcher)
/**@api {post} /api/v1/app/addAsWatcher    To be added as watcher on an issue
     * @apiVersion 1.0.0
     * @apiGroup Create
     * @apiParam {string} issueId Pass the issue id as body parameter
     *  @apiParam {string} username Pass the username as body parameter 
     *@apiParam {string} userId Pass the userId as body parameter  
     * @apiParam {string} authToken Pass the authToken as body parameter or header
     * @apiSuccessExample {json} Success-Response:
     * {
    "err": false,
    "message": "You are added as a watcher successfully.",
    "status": 200,
    "data": {
        "additionStatus": "OK",
        "notifyMsg": "String"
    }
}
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Invalid/expired Auth token",
    "status": 500,
    "data": null
}
{
    "err": true,
    "message": "Some required parameters are missing.",
    "status": 500,
    "data": null
}


     */


  app.get(baseUrl + '/listWatchers/:issueId', authMiddleware.authorisation, issueController.listAllWatcher)
  /**@api {get} /api/v1/app/listWatchers/:issueId    To be list all watchers of an issue
     * @apiVersion 1.0.0
     * @apiGroup Read
     * @apiParam {string} issueId Pass the issue id as route parameter
     * @apiParam {string} authToken Pass the authToken as body parameter or header
     * @apiSuccessExample {json} Success-Response:
     * {
    "err": false,
    "message": "All watchers are available .",
    "status": 200,
    "data": {
        "DHvRE6KW": "String",
        "106618984403917733636": "String",
        "2687787044649693": "String"
    }
}
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Invalid/expired Auth token",
    "status": 500,
    "data": null
}
{
    "err": true,
    "message": "Some required parameters are missing.",
    "status": 500,
    "data": null
}


     */
  
  app.post(baseUrl + '/assignIssue', authMiddleware.authorisation, issueController.assignIssueToOthers)
  /**@api {post} /api/v1/app/assignIssue   To be assign issue to other user
   * @apiVersion 1.0.0
     * @apiGroup Create
     * @apiParam {string} issueId Pass the issue id as body parameter
     * @apiParam {string} username Pass the username as body parameter
     * @apiParam {string} authToken Pass the authToken as body parameter or header
     * @apiSuccessExample {json} Success-Response:
     * {
    "err": false,
    "message": "Assignee updated successfully.",
    "status": 200,
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1,
        "notifyMsg": "String"
    }
}
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Invalid/expired Auth token",
    "status": 500,
    "data": null
}
{
    "err": true,
    "message": "Some required parameters are missing.",
    "status": 500,
    "data": null
}


     */
  
  app.get(baseUrl + '/singleIssueDetails/:issueId', authMiddleware.authorisation, issueController.issueDescriptionViewInfo)
  /**@api {get} /api/v1/app/singleIssueDetails/:issueId   To get details of a particular issue 
   * @apiVersion 1.0.0
     * @apiGroup Read
     * @apiParam {string} issueId Pass the issue id as body parameter
     * @apiParam {string} authToken Pass the authToken as body parameter or header
     * @apiSuccessExample {json} Success-Response:
     * {
    "err": false,
    "message": "Requested issue details have been found.",
    "status": 200,
    "data": {
 "creationDate": "String",
            "creationDateString": "String",
            "_id": "String",
            "issueId": "String",
            "status": "String",
            "title": "String",
            "reporterName": "String",
            "assigneeName": "String",
            "attachmentUrls": [
                {
                    "_id": "String",
                    "fileName": "String",
                    "fileUrl": "String"
                }
            ],
            "description": "String"
    }

  }
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Invalid/expired Auth token",
    "status": 500,
    "data": null
}


     */
  
  // search routes

  app.get(baseUrl + '/search/:text', authMiddleware.authorisation, searchController.searchIssue)
  /**@api {get} /api/v1/app/search/:text   To search issues by any text
   * @apiVersion 1.0.0
     * @apiGroup Read
     * @apiParam {string} text Pass the text to search as route parameter
     * @apiParam {string} authToken Pass the authToken as body parameter or header
     * @apiSuccessExample {json} Success-Response:
     * {
    "err": false,
    "message": "Requested issue details have been found.",
    "status": 200,
    "data": {
 "creationDate": "String",
            "creationDateString": "String",
            "_id": "String",
            "issueId": "String",
            "status": "String",
            "title": "String",
            "reporterName": "String",
            "assigneeName": "String",
            "attachmentUrls": [
                {
                    "_id": "String",
                    "fileName": "String",
                    "fileUrl": "String"
                }
            ],
            "description": "String"
    }

  }
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Invalid/expired Auth token",
    "status": 500,
    "data": null
}


     */
  
  app.post(baseUrl + '/sortSearch', authMiddleware.authorisation, searchController.sortColsForSearchText)
   /**@api {post} /api/v1/app/sortSearch   To get details of a particular issue 
   * @apiVersion 1.0.0
     * @apiGroup Create
     * @apiParam {string} text Pass the text to search as body parameter
     * @apiParam {string} authToken Pass the authToken as body parameter or header
     * @apiSuccessExample {json} Success-Response:
     * {
    "err": false,
    "message": "Search successfull.",
    "status": 200,
    "data": [
        
{
            "creationDate": "String",
            "creationDateString": "String",
            "_id": "String",
            "issueId": "String",
            "status": "String",
            "title": "String",
            "assigneeName": "String",
            "attachmentUrls": [
                {
                    "_id": "String",
                    "fileName": "String",
                    "fileUrl": "String"
                }
            ],
            "description": "String",
            "__v": number
        }
    ]
}
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Invalid/expired Auth token",
    "status": 500,
    "data": null
}
{
    "err": true,
    "message": "Error in sorting rows.",
    "status": 500,
    "data": null
}

     */
  
  app.get(baseUrl + '/filterByStatus/:status/:text', authMiddleware.authorisation, searchController.filterRowsByStatus)
  /**@api {get} /api/v1/app/filterByStatus/:status/:text   To filter the searchedd content by status 
   * @apiVersion 1.0.0
     * @apiGroup Read
     * @apiParam {string} text Pass the text as route parameter
      * @apiParam {string} status Pass the status as route parameter
     * @apiParam {string} authToken Pass the authToken as body parameter or header
     * @apiSuccessExample {json} Success-Response:
     * {
    "err": false,
    "message": "Status based issues are found.",
    "status": 200,
    "data": {
 "creationDate": "String",
            "creationDateString": "String",
            "_id": "String",
            "issueId": "String",
            "status": "String",
            "title": "String",
            "reporterName": "String",
            "assigneeName": "String",
            "attachmentUrls": [
                {
                    "_id": "String",
                    "fileName": "String",
                    "fileUrl": "String"
                }
            ],
            "description": "String"
    }

  }
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Invalid/expired Auth token",
    "status": 500,
    "data": null
}

{
    "err": true,
    "message": "No issues exist with this status.",
    "status": 404,
    "data": null
}

     */
  
  app.get(baseUrl + '/filterByDate/:creationDate/:text', authMiddleware.authorisation, searchController.filterRowsByDate)
  /**@api {get} /api/v1/app/filterByDate/:creationDate/:text   To filter the searched content by creation date 
   * @apiVersion 1.0.0
     * @apiGroup Read
     * @apiParam {string} text Pass the text as route parameter
      * @apiParam {string} creationDate Pass the creation date as route parameter
     * @apiParam {string} authToken Pass the authToken as body parameter or header
     * @apiSuccessExample {json} Success-Response:
     * {
    "err": false,
    "message": "Date based issues are found.",
    "status": 200,
    "data": {
 "creationDate": "String",
            "creationDateString": "String",
            "_id": "String",
            "issueId": "String",
            "status": "String",
            "title": "String",
            "reporterName": "String",
            "assigneeName": "String",
            "attachmentUrls": [
                {
                    "_id": "String",
                    "fileName": "String",
                    "fileUrl": "String"
                }
            ],
            "description": "String"
    }

  }
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Invalid/expired Auth token",
    "status": 500,
    "data": null
}

{
    "err": true,
    "message": "No issues exist with this date.",
    "status": 404,
    "data": null
}
     */
  
  app.get(baseUrl + '/filterByReporter/:reporterName/:text', authMiddleware.authorisation, searchController.filterRowsByReporter)
  /**@api {get} /api/v1/app/filterByReporter/:reporterName/:text   To filter the searched content by reporter name 
   * @apiVersion 1.0.0
     * @apiGroup Read
     * @apiParam {string} text Pass the text as route parameter
      * @apiParam {string} reporterName Pass the reporter name as route parameter
     * @apiParam {string} authToken Pass the authToken as body parameter or header
     * @apiSuccessExample {json} Success-Response:
     * {
    "err": false,
    "message": "Reporter name based issues are found.",
    "status": 200,
    "data": {
 "creationDate": "String",
            "creationDateString": "String",
            "_id": "String",
            "issueId": "String",
            "status": "String",
            "title": "String",
            "reporterName": "String",
            "assigneeName": "String",
            "attachmentUrls": [
                {
                    "_id": "String",
                    "fileName": "String",
                    "fileUrl": "String"
                }
            ],
            "description": "String"
    }

  }
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Invalid/expired Auth token",
    "status": 500,
    "data": null
}

{
    "err": true,
    "message": "No issues exist with this reporter name.",
    "status": 404,
    "data": null
}

     */
  
  app.get(baseUrl + '/filterByTitle/:title/:text', authMiddleware.authorisation, searchController.filterRowsByTitle)
/**@api {get} /api/v1/app/filterByTitle/:title/:text   To filter the searched content title
   * @apiVersion 1.0.0
     * @apiGroup Read
     * @apiParam {string} text Pass the text as route parameter
      * @apiParam {string} title Pass the title of issue as route parameter
     * @apiParam {string} authToken Pass the authToken as body parameter or header
     * @apiSuccessExample {json} Success-Response:
     * {
    "err": false,
    "message": "Title based issues are found.",
    "status": 200,
    "data": {
 "creationDate": "String",
            "creationDateString": "String",
            "_id": "String",
            "issueId": "String",
            "status": "String",
            "title": "String",
            "reporterName": "String",
            "assigneeName": "String",
            "attachmentUrls": [
                {
                    "_id": "String",
                    "fileName": "String",
                    "fileUrl": "String"
                }
            ],
            "description": "String"
    }

  }
     * @apiErrorExample {json} Error-Response:
     * {
    "err": true,
    "message": "Invalid/expired Auth token",
    "status": 500,
    "data": null
}

{
    "err": true,
    "message": "No issues exist with this title.",
    "status": 404,
    "data": null
}

     */

}

let passportFbStrategy = (passport) => {

  passport.use(new fbStrategy({
    clientID: encryptLib.decodeData(config.configuration.FACEBOOK_APP_ID),
    clientSecret: encryptLib.decodeData(config.configuration.FACEBOOK_APP_SECRET),
    callbackURL: "http://localhost:3004/api/v1/app/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
  }, function (accessToken, refreshToken, profile, cb) {
    console.log('profile', profile);

    return cb(null, profile)
  })
  )
  passportSession.persistentLogin(passport)
}

let passportGoogleStrategy = (passport) => {
  passport.use(new googleStrategy({
    clientID: encryptLib.decodeData(config.configuration.GOOGLE_CLIENT_ID),
    clientSecret: encryptLib.decodeData(config.configuration.GOOGLE_CLIENT_SECRET),
    callbackURL: "http://localhost:3004/auth/google/callback"
  },
    function (accessToken, refreshToken, profile, cb) {
      console.log('profile', profile);
      return cb(null, profile)
    })
  )
  passportSession.persistentLogin(passport)
}

module.exports = {
  setRouter: setRouter,
  passportFbStrategy: passportFbStrategy,
  passportGoogleStrategy: passportGoogleStrategy
}