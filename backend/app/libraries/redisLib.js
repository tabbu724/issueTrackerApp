const redis = require('redis')
    , redisClient = redis.createClient()
    , checkLib = require('../libraries/checkLib')

redisClient.on('connect', () => {
    console.log('Redis connection successfull.');
})

let createHash = (hashname, key, value, cb) => {

    redisClient.hmset(hashname, key, value, (err, result) => {
        if (err) {

            cb(err, null)
        }
        else if (checkLib.isEmpty(result)) {

            cb(null, [])
        }
        else {

            cb(null, result)
        }
    })
}

let showHash = (hashname, cb) => {
    redisClient.hgetall(hashname, (err, result) => {
        if (err) {

            cb(err, null)
        }
        else if (checkLib.isEmpty(result)) {

            cb(null, [])
        }
        else {

            cb(null, result)
        }
    })
}




module.exports = {
    createHash: createHash,
    showHash: showHash
}