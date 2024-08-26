export function objectToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
        if (obj[key] !== null && obj[key] !== undefined) {
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
    }
    return keyValuePairs.join('&');
}