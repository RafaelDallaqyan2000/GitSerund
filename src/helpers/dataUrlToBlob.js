export function dataURLtoBlob(dataurl) {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = Buffer.from(arr[1], "base64"),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr[n];
  }
  return new Blob([u8arr], { type: mime });
}
