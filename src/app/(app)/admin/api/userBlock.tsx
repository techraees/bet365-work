import * as env from "@/app/env";

let API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const getBlockStatus = async (
  id: number,
  token: string,
  role: string
) => {
  let role_url;
  if (role === "SuperAgent") role_url = "superagent";
  else if (role === "Type7Admin") role_url = 7;
  else if (role === "Type5Admin") role_url = 5;
  else if (role === "Type3Admin") role_url = 3;

  const API_ENDPOINT = `https://${API_URL}/admin/${role_url}/users/${id}/limits`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-ACCESS-TOKEN", token);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(API_ENDPOINT, requestOptions);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const setLimit = async (
  id: number,
  token: string,
  role: string,
  block: string
) => {
  let role_url;
  if (role === "SuperAgent") role_url = "superagent";
  else if (role === "Type7Admin") role_url = 7;
  else if (role === "Type5Admin") role_url = 5;
  else if (role === "Type3Admin") role_url = 3;

  const API_ENDPOINT = `https://${API_URL}/admin/${role_url}/users/${id}/limit/${block}`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-ACCESS-TOKEN", token);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(API_ENDPOINT, requestOptions);
    const data = await response.json();
    return {
      status: response.status,
      data: data,
    };
  } catch (err) {
    console.log(err);
  }
};

export const setUnLimit = async (
  id: number,
  token: string,
  role: string,
  block: string
) => {
  let role_url;
  if (role === "SuperAgent") role_url = "superagent";
  else if (role === "Type7Admin") role_url = 7;
  else if (role === "Type5Admin") role_url = 5;
  else if (role === "Type3Admin") role_url = 3;

  const API_ENDPOINT = `https://${API_URL}/admin/${role_url}/users/${id}/unlimit/${block}`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-ACCESS-TOKEN", token);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(API_ENDPOINT, requestOptions);
    const data = await response.json();
    return {
      status: response.status,
      data: data,
    };
  } catch (err) {
    console.log(err);
  }
};
