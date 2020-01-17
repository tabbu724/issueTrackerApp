const moment = require('moment')
    , momentTz = require('moment-timezone')
    , timezone = 'Asia/Kolkata'

let now = () => {
    return moment.utc().format()
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
    convertToLocalTime: convertToLocalTime
}