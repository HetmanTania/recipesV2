import {MAIN_URL, API_KEY} from './constants.js';



export function getImageFormats(name) {
    const imgRegex = /\.(.*)/;
    return name.match(imgRegex)[0];
}




export function generateUrl(path, query) {
    if(query) query = query.toLowerCase();

    if (query) {
        return `${MAIN_URL}${path}?${query}&apiKey=${API_KEY}`;
    }
    return `${MAIN_URL}${path}?apiKey=${API_KEY}`;
}

export function ellipsisText(str, length = 24) {
    if(str?.length > length) {
        return str.slice(0, length) + '...';
    }
    return str;
}

export function toLowerCase(str) {
    if(str && str.length) {
        return str.toLowerCase();
    }
    return '';
}
