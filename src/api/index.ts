var headers = new Headers();
headers.append("X-ACCESS-TOKEN", process.env.API_TOKEN || "");

var requestOptions: any = {
  method: "GET",
  headers,
  cache: "no-store",
};

var API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const getSportsOdds = (sport: string) =>
  fetch(`https://${API_URL}/odds/${sport}/live`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));
  
export const getOddsGroupedByLeauge = (sport: string) =>
  fetch(
    `https://${API_URL}/odds/${sport}/live/groupBy/league`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getPregameNames = () =>
  fetch(`https://${API_URL}/odds/sports/pregame/names`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));


export const getPregameLeagues = (sport: string) =>
  fetch(`https://${API_URL}/odds/${sport}/pregame/leagues`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getPregameSoccerEngland = () =>
  fetch(`https://${API_URL}/odds/soccer/pregame/events/England: Fa Community Shield`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getPregameSoccer = (leagues: string) =>
  fetch(`https://${API_URL}/odds/soccer/pregame/events/${leagues}`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getPregame = (sport: string, leagues: string) =>
  fetch(`https://${API_URL}/odds/${sport}/pregame/events/${leagues}`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));
export const getPregamesLeaguesGroupedByCountry = () =>
  fetch(`https://${API_URL}/odds/soccer/pregame/leagues/groupedBy/country`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getCoupons = (token: any) =>{
  var myHeaders = new Headers();
  myHeaders.append("X-ACCESS-TOKEN", token);

  var requestOptions1 = {
    method: 'GET',
    headers: myHeaders,
  };
  

  return fetch(`https://${API_URL}/users/getCoupons`, requestOptions1)
}



export const getSlots = (token: any) =>{
  var myHeaders = new Headers();
  myHeaders.append("X-ACCESS-TOKEN", token);

  var requestOptions1 = {
    method: 'GET',
    headers: myHeaders,
  };
  

  return fetch(`https://${API_URL}/casino/get-game-list`, requestOptions1)
}

export const getGameIFrame = (token:any, game_id:any) =>{
  let _payload = {
    "game_id": game_id
  }
  var payload = JSON.stringify(_payload)
  var headers = {
    "X-ACCESS-TOKEN": token,
    'Content-Type': 'application/json'
  }
  var requestOptions1 = {
    method: 'POST',
    headers: headers,
    body :payload 
  };
  
  return fetch(`https://${API_URL}/casino/get-game-frame`, requestOptions1)
}

