const key='my$ecretkEy'
const cryptr=require('cryptr')
,Cryptr=new cryptr(key)

let encodeData=(credentials)=>{
    return Cryptr.encrypt(credentials)
}

let decodeData=(encodedValue)=>{
    return Cryptr.decrypt(encodedValue)
}

module.exports={
    encodeData:encodeData,
    decodeData:decodeData,
    key:key
}