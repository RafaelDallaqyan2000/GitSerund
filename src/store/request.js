export default async function request(
  url,
  method = "GET",
  body = null,
  formdata = false,
  headers = {}
) {
  if (formdata) {
    const response = await fetch(url, {
      method,
      body,
    });

    const data = await response.json();

    return data;
  } else {
    if (body) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, {
      method,
      body,
      headers,
    });

    const data = await response.json();


    return data;
  }
}
