var headers = new Headers();
headers.append(
  "X-ACCESS-TOKEN",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInVzZXJuYW1lIjoiYWRtaW43Iiwicm9sZSI6IlR5cGU3QWRtaW4iLCJpYXQiOjE3MDA4NTY3MTcsImV4cCI6MTczMjM5MjcxN30.OcP8_HEsm8_LhNgS9T04smZgJHPIdDCuI4rvXhvTTbQ"
);

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
  fetch(`https://${API_URL}/odds/${sport}/live/groupBy/league`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getPregameNames = () =>
  fetch(`https://${API_URL}/odds/sports/pregame/betsapi/names`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getSoccerFeaturedMatches = () =>
  fetch(
    `https://${API_URL}/odds/soccer/betsapi/featured_matches`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getEventFromLeague = (league_name: string, event_id: string) =>
  fetch(
    `https://${API_URL}/odds/soccer/pregame/betsapi/events/${league_name}/${event_id}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getEventNamesForLeague = (sport: string, league_name: string) =>
  fetch(
    `https://${API_URL}/odds/${sport}/pregame/betsapi/event_names/${league_name}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getPregameLeagues = (sport: string) =>
  fetch(
    `https://${API_URL}/odds/${sport}/pregame/betsapi/leagues`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getPregameSoccerEngland = () =>
  fetch(
    `https://${API_URL}/odds/soccer/pregame/betsapi/events/England: Fa Community Shield`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getPregameSoccer = (leagues: string) =>
  fetch(
    `https://${API_URL}/odds/soccer/pregame/betsapi/events/${leagues}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getPregame = (sport: string, leagues: string) =>
  fetch(
    `https://${API_URL}/odds/${sport}/pregame/betsapi/events/${leagues}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getPregameEvent = (
  sport: string,
  league: string,
  event_id: string
) =>
  fetch(
    `https://${API_URL}/odds/${sport}/pregame/betsapi/events/${league}/${event_id}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));
export const getPregamesSoccerLeaguesGroupedByCountry = () =>
  fetch(
    `https://${API_URL}/odds/soccer/pregame/betsapi/leagues/groupedBy/country`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getPregamesLeaguesGroupedByCountry = (sport: string) =>
  fetch(
    `https://${API_URL}/odds/${sport}/pregame/betsapi/leagues/groupedBy/country`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getCoupons = (token: any) => {
  var myHeaders = new Headers();
  myHeaders.append("X-ACCESS-TOKEN", token);

  var requestOptions1 = {
    method: "GET",
    headers: myHeaders,
  };

  return fetch(`https://${API_URL}/users/getCoupons`, requestOptions1);
};

export const getLiveOddsEvents = (eventIds : string[], token: any) =>
{
  var myHeaders = new Headers();
  myHeaders.append("X-ACCESS-TOKEN", token);

  var requestOptions1 = {
    method: "GET",
    headers: myHeaders,
  };

  let eventIdStr: string = eventIds.join(',');

  return fetch(`https://${API_URL}/odds/live/events/coupons?event_ids=${eventIdStr}`, requestOptions1);
}

export const getSlots = (token: any) => {
  var myHeaders = new Headers();
  myHeaders.append("X-ACCESS-TOKEN", token);

  var requestOptions1 = {
    method: "GET",
    headers: myHeaders,
  };

  return fetch(`https://${API_URL}/casino/get-game-list`, requestOptions1);
};

export const getCasinoGames = (token: any) => {
  var myHeaders = new Headers();
  myHeaders.append("X-ACCESS-TOKEN", token);

  var requestOptions1 = {
    method: "GET",
    headers: myHeaders,
  };

  return fetch(`https://${API_URL}/casino/get-live-casino-game-list`, requestOptions1);
};


export const getGameIFrame = (token: any, game_id: any) => {
  let _payload = {
    game_id: game_id,
  };
  var payload = JSON.stringify(_payload);
  var headers = {
    "X-ACCESS-TOKEN": token,
    "Content-Type": "application/json",
  };
  var requestOptions1 = {
    method: "POST",
    headers: headers,
    body: payload,
  };

  return fetch(`https://${API_URL}/casino/get-game-frame`, requestOptions1);
};

export const placeCoupon = (token: any, payload: any) => {
  var _payload = JSON.stringify(payload);
  var headers = {
    "X-ACCESS-TOKEN": token,
    "Content-Type": "application/json",
  };
  var requestOptions1 = {
    method: "POST",
    headers: headers,
    body: _payload,
  };

  return fetch(`https://${API_URL}/users/placeCoupon`, requestOptions1)
    .then((response) => {
      return response;
    })
};
