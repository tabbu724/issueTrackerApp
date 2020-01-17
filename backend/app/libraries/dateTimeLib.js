const moment = require('moment')
    , momentTz = require('moment-timezone')
    , timezone = 'Asia/Kolkata'

let now = () => {
    // console.log(moment.utc().format('DD-MM-YYYY'),typeof(moment.utc().format('DD-MM-YYYY')));
    
    return moment.utc().format()
}

let formatCurrentDate=()=>{
    return moment().format('YYYY-MM-DD')
}

let parseToMyFormat=(dateString)=>{
return moment(dateString).format('YYYY-MM-DD')
}

let getLocalTime = () => {
    return moment().tz(timezone).format()
}

let convertToLocalTime = (time) => {
    return momentTz.tz(time, timezone).format('LLLL')
}


module.exports = {
    now: now,
    getLocalTime: getLocalTime,
    convertToLocalTime: convertToLocalTime,
    parseToMyFormat:parseToMyFormat,
    formatCurrentDate:formatCurrentDate
}