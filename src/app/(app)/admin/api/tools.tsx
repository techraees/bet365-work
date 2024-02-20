import * as env from "@/app/env";

let API_URL = process.env.NEXT_PUBLIC_API_URL!;
export const getUserInfo = async (
  token: string,
  role: string,
  user_id: number
) => {
  let role_url;
  if (role === "SuperAgent") role_url = "superagent";
  else if (role === "Type7Admin") role_url = 7;
  else if (role === "Type5Admin") role_url = 5;
  else if (role === "Type3Admin") role_url = 3;

  const API_ENDPOINT = `https://${API_URL}/admin/${role_url}/users/info?user_id=${user_id}`;

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

export const getSlotTransactions = async (
  token: string,
  role: string,
  name: string,
  from_date: string,
  to_date: string,
  bet_sign: string,
  bet_cost: number,
  win_sign: string,
  win_cost: number
) => {
  let role_url;
  if (role === "SuperAgent") role_url = "superagent";
  else if (role === "Type7Admin") role_url = 7;
  else if (role === "Type5Admin") role_url = 5;
  else if (role === "Type3Admin") role_url = 3;

  let API_ENDPOINT = `https://${API_URL}/admin/${role_url}/search/slot_transactions?from_date=${from_date}&to_date=${to_date}&bet_cost=${bet_cost}&win_cost=${win_cost}`;

  if (name !== "") API_ENDPOINT += `&username=${name}`;
  if (bet_sign !== "All") API_ENDPOINT += `&bet_sign=${bet_sign}`;
  if (win_sign !== "All") API_ENDPOINT += `&win_sign=${win_sign}`;

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


export const getSlots = async (
  token: string,
  role: string,
) => {
  let role_url;
  if (role === "SuperAgent") role_url = "superagent";
  else if (role === "Type7Admin") role_url = 7;
  else if (role === "Type5Admin") role_url = 5;
  else if (role === "Type3Admin") role_url = 3;
  let API_ENDPOINT = `https://${API_URL}/admin/${role_url}/slots`;

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

export const limitSlot = async (
  token: string,
  role: string,
  slotID:string,
  activeStatus: boolean,
) => {
  let role_url;
  if (role === "SuperAgent") role_url = "superagent";
  else if (role === "Type7Admin") role_url = 7;
  else if (role === "Type5Admin") role_url = 5;
  else if (role === "Type3Admin") role_url = 3;
  let API_ENDPOINT = `https://${API_URL}/admin/${role_url}/slots/limit`;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-ACCESS-TOKEN", token);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
        api_id: slotID,
        status: activeStatus
    })
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




export const getLiveCasinoTransactions = async (
  token: string,
  role: string,
  name: string,
  from_date: string,
  to_date: string,
  bet_sign: string,
  bet_cost: number,
  win_sign: string,
  win_cost: number
) => {
  let role_url;
  if (role === "SuperAgent") role_url = "superagent";
  else if (role === "Type7Admin") role_url = 7;
  else if (role === "Type5Admin") role_url = 5;
  else if (role === "Type3Admin") role_url = 3;

  let API_ENDPOINT = `https://${API_URL}/admin/${role_url}/search/live_casino_transactions?from_date=${from_date}&to_date=${to_date}&bet_cost=${bet_cost}&win_cost=${win_cost}`;

  if (name !== "") API_ENDPOINT += `&username=${name}`;
  if (bet_sign !== "All") API_ENDPOINT += `&bet_sign=${bet_sign}`;
  if (win_sign !== "All") API_ENDPOINT += `&win_sign=${win_sign}`;

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


export const searchCoupon = async (
  token: string,
  role: string,
  game_id: string,
  league: string,
  sport: string
) => {
  let role_url;
  if (role === "SuperAgent") role_url = "superagent";
  else if (role === "Type7Admin") role_url = 7;
  else if (role === "Type5Admin") role_url = 5;
  else if (role === "Type3Admin") role_url = 3;

  let API_ENDPOINT = `https://${API_URL}/admin/${role_url}/search/event_coupons`;

  if (game_id !== "") API_ENDPOINT += `&game_id=${game_id}`;
  if (league !== "All League") API_ENDPOINT += `&league=${league}`;
  if (sport !== "Select Sport") API_ENDPOINT += `&sport=${sport}`;

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

export const getCoupon = async (
  token: string,
  role: string,
  event_name: string
) => {
  let role_url;
  if (role === "SuperAgent") role_url = "superagent";
  else if (role === "Type7Admin") role_url = 7;
  else if (role === "Type5Admin") role_url = 5;
  else if (role === "Type3Admin") role_url = 3;

  const API_ENDPOINT = `https://${API_URL}/admin/${role_url}/search/coupons?event_name=${event_name}`;

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

export const getCountries = async (token: string, role: string) => {
  let role_url;
  if (role === "SuperAgent") role_url = "superagent";
  else if (role === "Type7Admin") role_url = 7;
  else if (role === "Type5Admin") role_url = 5;
  else if (role === "Type3Admin") role_url = 3;

  const API_ENDPOINT = `https://${API_URL}/admin/${role_url}/get_countries`;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-ACCESS-TOKEN", token);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(API_ENDPOINT, requestOptions);
    console.log(API_ENDPOINT);
    const data = await response.json();
    console.log(data);
    return {
      status: response.status,
      data: data,
    };
  } catch (err) {
    console.log(err);
  }
};

export const getLeagues = async (token: string, role: string) => {
  let role_url;
  if (role === "SuperAgent") role_url = "superagent";
  else if (role === "Type7Admin") role_url = 7;
  else if (role === "Type5Admin") role_url = 5;
  else if (role === "Type3Admin") role_url = 3;

  const API_ENDPOINT = `https://${API_URL}/admin/${role_url}/get_leagues`;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-ACCESS-TOKEN", token);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(API_ENDPOINT, requestOptions);
    console.log(API_ENDPOINT);
    const data = await response.json();
    console.log(data);
    return {
      status: response.status,
      data: data,
    };
  } catch (err) {
    console.log(err);
  }
};


export const updateSlot = async (
  token: string,
  role: string,
  slotID:string,
  name: string, 
  order: string,
  image: string,
) => {
  let role_url;
  if (role === "SuperAgent") role_url = "superagent";
  else if (role === "Type7Admin") role_url = 7;
  else if (role === "Type5Admin") role_url = 5;
  else if (role === "Type3Admin") role_url = 3;
  let API_ENDPOINT = `https://${API_URL}/admin/${role_url}/slots/update`;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-ACCESS-TOKEN", token);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
        api_id: slotID,
        order: order,
        image: image,
        name: name


    })
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
