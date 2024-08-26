export function print(url, data) {
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.responseType = "blob";
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send(data);

    req.onload = function (event) {
        var blob = req.response;
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "receipt_" + new Date() + ".pdf";
        link.click();
    };
}