var headers = new Headers();
headers.append("X-ACCESS-TOKEN", process.env.API_TOKEN || "");

var requestOptions: any = {
  method: "GET",
  headers,
  cache: "no-store",
};

var API_URL = process.env.API_URL!;
export const getSportsOdds = (sport: string) =>
  fetch(`http://${API_URL}/odds/${sport}/live`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getOddsGroupedByLeauge = (sport: string) =>
  fetch(
    `http://${API_URL}/odds/${sport}/live/groupBy/league`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getPregameNames = () =>
  fetch(`http://${API_URL}/odds/sports/pregame/names`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));


export const getPregameLeagues = (sport: string) =>
  fetch(`http://${API_URL}/odds/${sport}/pregame/leagues`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getPregameSoccerEngland = () =>
  fetch(`http://${API_URL}/odds/soccer/pregame/events/England: Fa Community Shield`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getPregameSoccer = (leagues: string) =>
  fetch(`http://${API_URL}/odds/soccer/pregame/events/${leagues}`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));

export const getPregame = (sport: string, leagues: string) =>
  fetch(`http://${API_URL}/odds/${sport}/pregame/events/${leagues}`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));
export const getPregamesLeaguesGroupedByCountry = () =>
  fetch(`http://${API_URL}/odds/soccer/pregame/leagues/groupedBy/country`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.log("error", error));
