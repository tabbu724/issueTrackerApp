// importing the module
const express = require('express')
    , appConfig = require('./config/appConfig')
    , fs = require('fs')
    , mongoose = require('./node_modules/mongoose')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , errAndNotFound = require('./app/middlewares/errorAndNotFound')
    , routeLogger = require('./app/middlewares/routeLogger')
    , helmet = require('helmet')
    , http = require('http')
    , logger = require('./app/libraries/loggerLib')
    , passport = require('passport')
    , expressSession = require('express-session')
    , loginController = require('./app/controller/loginController')



// creating object of the module class

const app = express()

// using middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())


// required to configure passport for social logins

app.use(expressSession({
    secret: 'connectSocially',
    resave: true,
    saveUninitialized: true,
}))


loginController.loginViaFacebook(passport)
loginController.loginViaGoogle(passport)
app.use(passport.initialize())
app.use(passport.session())




app.use(errAndNotFound.errorHandler)
app.use(routeLogger.routeIpLogger)
app.use(helmet())

// searching the each file of directory to import routes
const dirPath = './app/routes'

fs.readdirSync(dirPath).forEach((file) => {
    if (~file.indexOf('.js')) {
        let route = require(`${dirPath}/${file}`)
        route.setRouter(app)
    }
})
// searching the each file of directory to import models
const modelPath = './app/models'
fs.readdirSync(modelPath).forEach((file) => {
    if (~file.indexOf('.js')) {
        let model = require(`${modelPath}/${file}`)
    }
})

// using custom middlewares

app.use(errAndNotFound.notFoundHandler)

// creating http server
const server = http.createServer(app)
server.listen(appConfig.configuration.port, onListening)
server.on('error', onError)

function onError(error) {
    if (error.syscall != 'listen') {
        logger.captureError(error.code, 10, 'serverOnErrorHandler')
        throw error
    }
    switch (error.code) {
        case 'EACCES':
            logger.captureError(`${error.code}: elevated priviledges required`, 10, 'serverOnErrorHandler')
            process.exit(1)
            break;
        case 'EADDRINUSE':
            logger.captureError(`${error.code}:port is already in use`, 10, 'serverOnErrorHandler')
            process.exit(1)
        default:
            logger.captureError(`${error.code}:some unknown error occurred`, 10, 'serverOnErrorHandler')
            throw error;
    }
}

function onListening() {
    let addr = server.address()
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    console.log('listening on ' + bind);

    logger.captureInfo('server listening on port ' + addr.port, 1, 'serverOnListeningHandler')
    let db = mongoose.connect(appConfig.configuration.dbUrl.uri, { useNewUrlParser: true, useUnifiedTopology: true })

}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled rejection at: Promise ', p, ' reason: ', reason);

})



mongoose.connection.on('open', (err) => {
    if (err) {
        console.log('--db error occurred--', err);
    }
    else {
        console.log('Db Connection successfull');
    }
})

mongoose.connection.on('error', (err) => {
    console.log('--some error in db connection--', err);
})