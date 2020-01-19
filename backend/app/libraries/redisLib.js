const redis=require('redis')
,redisClient=redis.createClient()
,checkLib=require('../libraries/checkLib')

redisClient.on('connect',()=>{
    console.log('Redis connection successfull.');
})

let createHash=(hashname,key,value,cb)=>{
    // console.log(hashname,key,value);
    
    redisClient.hmset(hashname,key,value,(err,result)=>{
        if (err) {
            console.log('Error in creating comments.');
            cb(err, null)
        }
        else if (checkLib.isEmpty(result)) {
            console.log('No comment created.');
            console.log(result);
            cb(null, {})
        }
        else {
            console.log('Comment created.', result);
            cb(null, result)
        }
    })
}

let showHash=(hashname,cb)=>{
    redisClient.hgetall(hashname, (err, result) => {
        if (err) {
            console.log('error in getting all comments');
            cb(err, null)
        }
        else if (checkLib.isEmpty(result)) {
            console.log('No comments found');
            console.log(result);
            cb(null, {})
        }
        else {
            console.log('All comments found', result);
            cb(null, result)
        }
    })
}




module.exports={
    createHash:createHash,
    showHash:showHash
}