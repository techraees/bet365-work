import * as env from "@/app/env";

let API_URL = process.env.NEXT_PUBLIC_API_URL!;
export const getUserById = async (id: number, token: string, role: string) => {
  let role_url;
  if (role === "SuperAgent") role_url = "superagent";
  else if (role === "Type7Admin") role_url = 7;
  else if (role === "Type5Admin") role_url = 5;
  else if (role === "Type3Admin") role_url = 3;

  const API_ENDPOINT = `https://${API_URL}/admin/${role_url}/users/${id}`;
  const myHeaders = new Headers();
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

export const getUsersCreatedBy = async (
  id: number,
  token: string,
  role: string
) => {
  let role_url;
  if (role === "SuperAgent") role_url = "superagent";
  else if (role === "Type7Admin") role_url = 7;
  else if (role === "Type5Admin") role_url = 5;
  else if (role === "Type3Admin") role_url = 3;

  const API_ENDPOINT = `https://${API_URL}/admin/${role_url}/users/createdBy/${id}`;
  const myHeaders = new Headers();
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

export const transferBalance = async (
  token: string,
  role: string,
  id: number,
  transfer_type: string,
  balance_type: string,
  balance: number
) => {
  let role_url;
  if (role === "SuperAgent") role_url = "superagent";
  else if (role === "Type7Admin") role_url = 7;
  else if (role === "Type5Admin") role_url = 5;
  else if (role === "Type3Admin") role_url = 3;

  const API_ENDPOINT = `https://${API_URL}/admin/${role_url}/users/${id}/balance/${transfer_type}/${balance_type}`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-ACCESS-TOKEN", token);

  let raw;

  if (balance_type === "casino")
    raw = JSON.stringify({
      casino: balance,
    });
  else if (balance_type === "sports_betting")
    raw = JSON.stringify({
      sports_betting: balance,
    });
  else
    raw = JSON.stringify({
      agent: balance,
    });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
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

export const newUser = async (
  token: string,
  role: string,
  username: string,
  user_type: string,
  password: string
) => {
  let role_url;
  if (role === "SuperAgent") role_url = "superagent";
  else if (role === "Type7Admin") role_url = 7;
  else if (role === "Type5Admin") role_url = 5;
  else if (role === "Type3Admin") role_url = 3;

  const API_ENDPOINT = `https://${API_URL}/admin/${role_url}/users`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-ACCESS-TOKEN", token);

  let raw;

  raw = JSON.stringify({
    username: username,
    role: user_type,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
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

export const getUsersByQuery = async (query: string, token: string) => {
  const API_ENDPOINT = `https://${API_URL}/regex/users/descendants`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-ACCESS-TOKEN", token);

  let raw = JSON.stringify({
    query: query,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(API_ENDPOINT, requestOptions);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
