import * as env from "@/app/env";

let API_URL = process.env.NEXT_PUBLIC_API_URL!;
export const getEvents = async (token: string, role: string) => {
  let role_url;
  if (role === "SuperAgent") role_url = "superagent";
  else if (role === "Type7Admin") role_url = 7;
  else if (role === "Type5Admin") role_url = 5;
  else if (role === "Type3Admin") role_url = 3;

  const API_ENDPOINT = `https://${API_URL}/admin/${role_url}/events`;
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


export const getEventStatistics = async (token: string,  role: string, event_id:string) => {
  let role_url;
  if (role === "SuperAgent") role_url = "superagent";
  else if (role === "Type7Admin") role_url = 7;
  else if (role === "Type5Admin") role_url = 5;
  else if (role === "Type3Admin") role_url = 3;

  const API_ENDPOINT = `https://${API_URL}/admin/${role_url}/events/${event_id}/statistics`;
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
