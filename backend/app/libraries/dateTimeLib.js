const moment = require('moment')
    , momentTz = require('moment-timezone')
    , timezone = 'Asia/Kolkata'

let now = () => {

    return moment.utc().format()
}



let parseToMyFormat = () => {

    return moment().format('YYYY-MM-DD')

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
    parseToMyFormat: parseToMyFormat
}