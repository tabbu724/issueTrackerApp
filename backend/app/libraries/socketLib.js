const socketio = require('socket.io')
    , tokenLib = require('../libraries/tokenLib')
,redisLib=require('../libraries/redisLib')
,checkLib=require('../libraries/checkLib')


let sendNotification = (server) => {
    let io = socketio.listen(server)
    let myIo = io.of('')


    myIo.on('connection', (socket) => {
        console.log('Connection made with client.');
        socket.emit('verifyUser', '')

        // verify the user and make him online
// ---------------------------------------remove and add auth token version
// socket.on('set-user', (userId)=>{
//     console.log('user is verified');
//     let currentUser=userId
//     // socket.userId=currentUser
//     socket.emit('online-status',`${currentUser} is online.`)
//     socket.on('issueUpdated', (info) => {
//         console.log('update event listened');
        
//             socket.emit(info.reporterId, info.msg)
        
        
//             socket.emit(info.assigneeId, info.msg)
//         redisLib.showHash(info.issueId + '{Watcher-list}', (err, data) => {
//             if (err) {
//                 console.log(err);
//                 return -1
//             }
//             else if (checkLib.isEmpty(data)) {
//                 console.log('no watchers found');
                
//             }
//             else {
//                 let watcherList = []
//                 for (key in data) {
//                     watcherList.push(key)
//                 }
//                 watcherList.forEach(watcher => {
//                     socket.emit(watcher, info.msg)
//                     // if(currentUser!=watcher){
//                     //     socket.emit(watcher, info.msg)
//                     // }
                    
//                 });
//             }
//         })
        
// })
// })
//     })
// }

        // ---------------------

        socket.on('set-user', (authToken) => {
            tokenLib.verifyClaimWithoutSecret(authToken, (err, userData) => {
                if (err) {
                    socket.emit('auth-err', { status: 404, error: 'Please provide correct auth token' })
                }
                else {
                    console.log('user is verified');
                    let currentUser=userData.userId
                    socket.emit('online-status',`${currentUser} is online.`)
                    socket.on('issueUpdated', (info) => {
                        console.log('update event listened');
                        if(currentUser!=info.reporterId){
                            socket.emit(info.reporterId, info.msg)
                        }
                        if(currentUser!=info.assigneeId){
                            socket.emit(info.assigneeId, info.msg)
                        }
                        
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
                                    socket.emit(watcher, info.msg)
                                    
                                });
                            }
                        })
                       
                       
                    })




                }
            })
        })



    })

}

module.exports = {
    sendNotification: sendNotification
}