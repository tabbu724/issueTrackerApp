const jwt = require('jsonwebtoken')
const shortid=require('shortid')
const secretKey='somerandomkey'

let generateToken=(data,cb)=>{
try{
let claim={
    jti:shortid.generate(),
    iat:Date.now(),
    exp:Math.floor(Date.now()/1000)+(24*60*60),
    sub:'authToken',
    iss:'Tabbu Sehgal',
    data:data
}
let tokenDetails={
    token:jwt.sign(claim,secretKey),
    secretKey:secretKey
}
cb(null,tokenDetails)
}
catch(err){
    console.log(err);
    cb(err,null)
}
}


let verifyClaim=(token,secret,cb)=>{
jwt.verify(token,secret,(err,decoded)=>{
    if(err){
        console.log('Error in verifying the token');
        cb(err,null)
    }
    else{
        console.log('user verified');
        console.log(decoded);
        cb(null,decoded)
    }
})
}

let verifyClaimWithoutSecret = (token,cb)=>{
    jwt.verify(token,secretKey,(err,decoded)=>{
        if(err){
            console.log('error in token verification');
            cb(err,null)
        }
        else{
            console.log('token verified');
            cb(null,decoded)
        }
    })
}

module.exports={
    generateToken:generateToken,
    verifyClaim:verifyClaim,
    verifyClaimWithoutSecret:verifyClaimWithoutSecret
}