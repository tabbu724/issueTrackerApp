const config = require('../../config/appConfig')
  , controller = require('../controller/loginController')
  ,dashboardController=require('../controller/dashboradController')
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

  app.get(baseUrl+'/multi',dashboardController.sortCols)
  app.post(baseUrl+'/upload',upload.any(),uploadMiddleware.fileUploader,dashboardController.createIssue)
}

module.exports = {
  setRouter: setRouter
}