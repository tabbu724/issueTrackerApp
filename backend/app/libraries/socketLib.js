const socketio = require('socket.io')
    , tokenLib = require('../libraries/tokenLib')
    , redisLib = require('../libraries/redisLib')
    , checkLib = require('../libraries/checkLib')
    , issueModel = require('../models/issueDetails')
    , userModel = require('../models/user')
    , loggerLib = require('../libraries/loggerLib')


let sendNotification = (server) => {
    let io = socketio.listen(server)
    let myIo = io.of('')


    myIo.on('connection', (socket) => {
        console.log('Connection made with client.');
        socket.emit('verifyUser', '')



        socket.on('set-user', (authToken) => {
            tokenLib.verifyClaimWithoutSecret(authToken, (err, userData) => {
                if (err) {
                    socket.emit('auth-err', { status: 404, error: 'Please provide correct auth token' })
                }
                else {

                    let currentUser = userData.data.userId
                    console.log(userData.data.userName, ' is verified');
                    socket.userId = currentUser
                    socket.emit('online-status', `${userData['data']['userName']} is online.`)
                    socket.on('issueUpdated', (info) => {
                        console.log('update event listened');
                        //    get reporter id for this issue
                        issueModel.findOne({ issueId: info.issueId }, (err, issueDetails) => {
                            if (err) {
                                loggerLib.captureError(err.message, 10, 'socketLib/sendNotification')
                            }
                            else if (checkLib.isEmpty(issueDetails)) {
                                loggerLib.captureError('no such issue exists', 5, 'notifyController/sendNotification')
                            }
                            else {
                                loggerLib.captureInfo('issue details to be notified are found', 0, 'notifyController/sendNotification')
                                userModel.findOne({ userName: issueDetails.reporterName }, (err, userDetails) => {
                                    if (err) {
                                        loggerLib.captureError(err.message, 10, 'socketLib/sendNotification')
                                    }
                                    else if (checkLib.isEmpty(userDetails)) {
                                        loggerLib.captureError('no such reporter exists', 5, 'notifyController/sendNotification')
                                    }
                                    else {
                                        loggerLib.captureInfo('reporter to be notified is found', 0, 'notifyController/sendNotification')
                                        let reporterId = userDetails.userId


                                        socket.emit(reporterId, info)


                                    }
                                })
                            }
                        })


                        redisLib.showHash(info.issueId + '{Watcher-list}', (err, data) => {
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
                                    socket.emit(watcher, info)

                                });
                            }
                        })

                    })




                }
            })
        })


        socket.on('disconnect', () => {
            console.log('user is disconnected');
            console.log(socket.userId);
        })


    })

}

module.exports = {
    sendNotification: sendNotification
}