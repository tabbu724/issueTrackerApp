let isEmpty = (value) => {
    console.log('value', value);
    console.log('[]', [].length);

    if (value == '' || value == null || value == undefined ||
        value.length == 0 || value.nModified == 0 || value.deletedCount == 0) {


        return true
    }
    else {

        return false
    }

}

let removeSpaces = (value) => {
    let strValue = String(value)
    let strWoSpaces = strValue.trim()
    return strWoSpaces
}

module.exports = {
    isEmpty: isEmpty,
    removeSpaces: removeSpaces
}