const baseURL = process.env.REACT_APP_API_URL;

export const fetchWithoutToken = (endPoint, data, method = "GET") => {
  const url = `${baseURL}/api/${endPoint}`;

  return method === "GET"
    ? fetch(url)
    : fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
};

export const fetchWithToken = (endPoint, data, method = "GET") => {
  const url = `${baseURL}/api/${endPoint}`;
  const token = localStorage.getItem("token") || "";

  return method === "GET"
    ? fetch(url, {
        method,
        headers: {
          "x-token": token,
        },
      })
    : fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
          "x-token": token,
        },
        body: JSON.stringify(data),
      });
};
