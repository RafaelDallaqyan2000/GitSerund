export function getFileForPrint(fileUrl, onChangeLoading, signal) {
  return () => {
    onChangeLoading(true);
    fetch(`/api/files/getFileForPrint`, {
      signal: signal,
      method: "POST",
      body: JSON.stringify({ fileUrl : fileUrl.replace('../../', '/') }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (data) => {
        let blobURL = URL.createObjectURL(await data.blob());
        let iframe = document.createElement("iframe"); //load content in an iframe to print later
        document.body.appendChild(iframe);
        iframe.style.display = "none";
        iframe.src = blobURL;
        iframe.onload = function () {
          setTimeout(function () {
            iframe.focus();
            iframe.contentWindow.print();
          }, 1);
        };
        onChangeLoading(false);
      })
      .catch((e) => {
          onChangeLoading(false);
          return e;
      });
  };
}
