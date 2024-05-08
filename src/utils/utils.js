import {MAIN_URL, API_KEY, INGREDIENTS_URL} from './constants.js';

export function getImageFormats(name) {
    const imgRegex = /\.(.*)/;
    return name.match(imgRegex)[0];
}

export function getImgProduct (imgName) {
    return `${INGREDIENTS_URL}_250x250/${imgName}`;
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

export function toFirstLetterUppercase(str) {
    if(str && str.length) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    return str;
}
export function convertObjectToArray(obj) {
    if(!obj) {
        return [];
    }
    return Object.values(obj).map(el => {
       return el;
    });
}

export function isCountableOrUncountable(metric) {
    const countableMetrics = ['small', 'medium', 'large', 'stalks', 'container'];
    const uncountableMetrics = ['handfuls', 'pinches', 'servings', 'inch', 'tsps', 'Tbsps', 'tsp', 'g', 'ml'];

    if(countableMetrics.some(el => el === metric)) {
        return 'countable';
    }
    else if(uncountableMetrics.some(el => el === metric)) {
        return 'uncountable';
    }
    else {
        return 'unknown';
    }
}