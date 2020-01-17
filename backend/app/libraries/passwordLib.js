const bcrypt = require('bcryptjs')
const logger = require('./loggerLib')
const saltRounds = 10

let generateHash = (password) => {
    let salt = bcrypt.genSaltSync(saltRounds)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

let comparePassword = (originalPwd, hashPwd, cb) => {
    bcrypt.compare(originalPwd, hashPwd, (err, result) => {
        if (err) {
            logger.captureError('password did not match', 8, 'passwordlib/comparePassword')
            cb(err, null)
        }
        else {
            logger.captureInfo('password matched', 1, 'passwordlib/comparePassword')
            cb(null, result)
        }
    })
}

module.exports = {
    generateHash: generateHash,
    comparePassword: comparePassword
}