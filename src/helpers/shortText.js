export function shortText(text, num = 90) {
    if(!text || typeof text !== 'string') return '';
    return text.length > num ? `${text.slice(0, num)}...` : text;
}
