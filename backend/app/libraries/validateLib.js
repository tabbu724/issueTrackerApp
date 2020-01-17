let validateEmail = (email) => {
    let emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm
    if (email.match(emailregex)) {
        return email
    }
    else {
        return false
    }
}

let validatePassword = (password) => {
    let pwdregex = /^[A-Za-z]\w{7,}$/
    if (password.match(pwdregex)) {
        return password
    }
    else {
        return false
    }
}

let validateUserName=(name)=>{
    let nameRegex=/^[A-Z][a-z]{3,}[@$%_]\d{3}$/
    if(name.match(nameRegex)){
        return true
    }
    else{
        return false
    }
}

module.exports = {
    validateEmail: validateEmail,
    validatePassword: validatePassword,
    validateUserName:validateUserName
}