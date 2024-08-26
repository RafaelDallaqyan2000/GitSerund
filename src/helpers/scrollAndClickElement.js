export function scrollAndClickElement(selector){
    const viewElement = document.querySelector(selector);
    if(!viewElement) return;

    viewElement.scrollIntoView({ behavior: "smooth", block: 'center' });
    viewElement.click();
}
