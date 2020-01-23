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
  app.all(baseUrl+'/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

  app.post(baseUrl + '/register', controller.signup)
  app.post(baseUrl + '/login', controller.login)
  app.get(baseUrl + "/auth/facebook", passport.authenticate("facebook"))
  app.get(baseUrl + "/auth/facebook/callback", passport.authenticate("facebook", {
    successRedirect: baseUrl + '/socialLogin'
  }))
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { successRedirect: baseUrl + '/socialLogin' }));
  app.get(baseUrl + '/socialLogin', controller.socialLogin)
  app.post(baseUrl + '/logOut', authMiddleware.authorisation, controller.logout)

  // dashboard routes
  app.get(baseUrl + '/viewDashboard', authMiddleware.authorisation, dashboardController.dashboardInfo)
  app.get(baseUrl + '/filterByStatus/:status', authMiddleware.authorisation, dashboardController.filterRowsByStatus)
  app.get(baseUrl + '/filterByDate/:creationDate', authMiddleware.authorisation, dashboardController.filterRowsByDate)
  app.get(baseUrl + '/filterByReporter/:reporterName', authMiddleware.authorisation, dashboardController.filterRowsByReporter)
  app.get(baseUrl + '/filterByTitle/:title', authMiddleware.authorisation, dashboardController.filterRowsByTitle)
  app.post(baseUrl + '/sortByColumns', authMiddleware.authorisation, dashboardController.sortCols)
  app.post(baseUrl + '/createIssue', authMiddleware.authorisation, upload.any(), uploadMiddleware.fileUploader, dashboardController.createIssue)


  // issue description routes
  app.put(baseUrl + '/editIssue', authMiddleware.authorisation, upload.any(), uploadMiddleware.fileUploader, issueController.editIssueDetails)
  app.post(baseUrl + '/comment', authMiddleware.authorisation, issueController.commentOnIssue)
  app.post(baseUrl + '/addAsWatcher', authMiddleware.authorisation, issueController.addWatcher)
  app.get(baseUrl + '/listWatchers/:issueId', authMiddleware.authorisation, issueController.listAllWatcher)
  app.post(baseUrl + '/assignIssue', authMiddleware.authorisation, issueController.assignIssueToOthers)
  app.get(baseUrl + '/singleIssueDetails/:issueId', authMiddleware.authorisation, issueController.issueDescriptionViewInfo)
  // search routes

  app.get(baseUrl + '/search/:text', authMiddleware.authorisation, searchController.searchIssue)
}

let passportFbStrategy = (passport) => {

  passport.use(new fbStrategy({
    clientID: encryptLib.decodeData(config.configuration.FACEBOOK_APP_ID),
    clientSecret: encryptLib.decodeData(config.configuration.FACEBOOK_APP_SECRET),
    callbackURL: "http://localhost:3000/api/v1/app/auth/facebook/callback",
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
    callbackURL: "http://localhost:3000/auth/google/callback"
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