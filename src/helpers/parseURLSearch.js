export function parseURLSearch(search) {
    let params = new URLSearchParams(search);
    let searchObject = {};

    for (let [key, value] of params.entries()) {
        searchObject[key] = value;
    }

    return searchObject;
}
