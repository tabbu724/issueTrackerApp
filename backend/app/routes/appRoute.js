const config = require('../../config/appConfig')
  , controller = require('../controller/loginController')
  ,dashboardController=require('../controller/dashboradController')
  ,issueController=require('../controller/issueController')
  , passport = require('passport')
  ,multer=require('multer')
  ,storage=multer.memoryStorage()
,upload=multer({storage:storage})
,uploadMiddleware=require('../middlewares/fileUpload')

let setRouter = (app) => {
  let baseUrl = `${config.configuration.version}/app`
  app.post(baseUrl + '/register', controller.signup)
  app.post(baseUrl + '/login', controller.login)
  app.get(baseUrl + '/loginViaGoogle', controller.loginViaGoogle)
  app.get(baseUrl + '/loginViaFacebook', controller.loginViaFacebook)
  app.post(baseUrl + '/logOut/:userId', controller.logout)
  app.get(baseUrl + '/dashboard', controller.dashboardInfo)
  app.get("/auth/facebook", passport.authenticate("facebook"
    , { successRedirect: baseUrl + '/loginViaFacebook' }))
  app.get("/auth/facebook/callback", passport.authenticate("facebook", {
    successRedirect: baseUrl + '/dashboard'
  }))
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
      , successRedirect: baseUrl + '/loginViaGoogle'
    }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { successRedirect: baseUrl + '/dashboard' }));
// dashboard routes
app.get(baseUrl+'/dashboard/:userId',dashboardController.dashboardInfo)
app.get(baseUrl+'/filterByStatus/:status',dashboardController.filterRowsByStatus)
app.get(baseUrl+'/filterByDate/:creationDate',dashboardController.filterRowsByDate)
app.get(baseUrl+'/filterByReporterId/:reporterId',dashboardController.filterRowsByReporterId)
app.get(baseUrl+'/filterByTitle/:title',dashboardController.filterRowsByTitle)
  app.post(baseUrl+'/multi',dashboardController.sortCols)
  app.post(baseUrl+'/createIssue',upload.any(),uploadMiddleware.fileUploader,dashboardController.createIssue)
// issue description routes
app.post(baseUrl+'/editIssue',upload.any(),uploadMiddleware.fileUploader,issueController.editIssueDetails)
app.post(baseUrl+'/comment',issueController.commentOnIssue)
app.post(baseUrl+'/addAsWatcher',issueController.addWatcher)
app.get(baseUrl+'/listWatchers/:issueId',issueController.listAllWatcher)
}

module.exports = {
  setRouter: setRouter
}