import {MAIN_URL, API_KEY} from './constants.js';


export function cheackPassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passwordRegex.test(password)) {
        return true
    } 
    return false;
}

export function cheackEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; ///^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(emailRegex.test(email)) {
        return true;
    }
    return false;
}

export function getImageFormats(name) {
    const imgRegex = /\.(.*)/;
    return name.match(imgRegex)[0];
}

export function cheackName(name) { 
    const nameRegex = /^[A-Za-z\s]{3,10}$/;
    if(nameRegex.test(name)) {
        return true;
    }
    return false;
}


export function generateUrl(path, query) {
    if(query) query = query.toLowerCase();

    if (query) {
        return `${MAIN_URL}${path}?${query}&apiKey=${API_KEY}`;
    }
    return `${MAIN_URL}${path}?apiKey=${API_KEY}`;
}

export function ellipsisText(str, length = 24) {
    if(str.length > length) {
        return str.slice(0, length) + '...';
    }
    return str;
}