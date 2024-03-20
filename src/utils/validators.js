export function isNumber(value) {
    return typeof value === 'number';
}

export function isNull(value) {
    return value === null;
}

export function isNaN(value) {
    return Number.isNaN(value);
}

export function isBool(value) {
    return typeof value === 'boolean';
}

export function isString(value) {
   return typeof value === 'string'
}
export function isNotEmptyString(value) {
    return isString(value) && value.length > 0;
}

export function isIndefiniteOrNull(value) {
    return value === null || isUndefined(value);
}

export function isNumberOrNull(value) {  
    return isNumber(value) || isUndefined(value);
}

export function isUndefined(value) {
    return value === undefined;
}

// -------------------------------------------------------------

export function checkUserName(name) {
    const nameRegex = /^[A-Za-z\s]{3,10}$/;
    if(nameRegex.test(name)) {
        return true;
    }
    return false;
}

export function checkPassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passwordRegex.test(password)) {
        return true
    } 
    return false;
}

export function checkEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; ///^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(emailRegex.test(email)) {
        return true;
    }
    return false;
}

// -------------------------------------------------------------

export function isFirebaseError(error) {
    return isNotEmptyString(error) && error === 'FirebaseError' ? true : false;
}

export function checkErrorText(text) {
    return isNotEmptyString(text) ? text : 'The data is incorrect';
 }