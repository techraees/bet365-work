"use client";

const find_in_array_by_sp_name = (arr: any, target_string: any) => {
  if(!arr){
    return null;
  }
  for (var obj of arr) {
    if (obj.sp[target_string] !== undefined) {
      return obj.sp[target_string];
    }
  }
};
export const get_objects_grouped_by_header = (odds_array: any) => {
  const groupedData = odds_array.reduce((acc: any, item: any) => {
    const key = item.header;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);

    return acc;
  }, {});
  return groupedData;
};

export const get_objects_grouped_by_name = (odds_array: any) => {
  const groupedData = odds_array.reduce((acc: any, item: any) => {
    const key = item.name;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);

    return acc;
  }, {});
  return groupedData;
};

const get_objects_grouped_by_team = (odds_array: any) => {
  const groupedData = odds_array.reduce((acc: any, item: any) => {
    const key = item.team;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);

    return acc;
  }, {});
  return groupedData;
};

export const find_participants_by_name_in_odds = (
  odds: any,
  participant_name: string
) => {
  var participant_match = odds.filter(
    (participant: any) => participant.name === participant_name
  );
  if (participant_match && participant_match.length > 0) {
    return participant_match[0];
  } else {
    return null;
  }
};

function findObjectByHeader(data: any, headerToFind: any) {
  return data.find((item: any) => item.header === headerToFind);
}

function findObjectByName(data: any, nameToFind: any) {
  return data.find((item: any) => item.name === nameToFind);
}

function getOddsByName(event: any, name: any) {
  for (var odd_id in event.odds) {
    var odd_obj = event.odds[odd_id];
    if (odd_obj.value === name) {
      return odd_obj;
    }
  }
  return null;
}

function splitArrayIntoChunks(array: any, chunkSize: any) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export const toWinMatch = (data: any) => {
  const match = data?.odds?.main?.sp["to_win_match"]?.odds;
  const odd_id = data?.odds?.main?.sp["to_win_match"]?.id;
  const odd_name = data?.odds?.main?.sp["to_win_match"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  const row = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      row.push({
        id: mm.id,
        title: mm.name == "1" ? data?.localteam.name : mm.name == "2" ? data?.visitorteam.name : mm.name,
        value: mm.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: mm.id,
        participant_name: mm.name,
        participant_handicap: mm.handicap ?? "",
        participant_header: mm.header ?? "",
      });
    }
    tosend.push(row);
  }
  return tosend;
}
export const matchHandicapGames = (data: any) => {
  const match = data?.odds?.main?.sp["match_handicap_(games)"]?.odds;
  const odd_id = data?.odds?.main?.sp["match_handicap_(games)"]?.id;
  const odd_name = data?.odds?.main?.sp["match_handicap_(games)"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  const row = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      row.push({
        id: mm.id,
        title: mm.name == "1" ? data?.localteam.name : mm.name == "2" ? data?.visitorteam.name : mm.name,
        value: mm.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: mm.id,
        participant_name: mm.name,
        participant_handicap: mm.handicap ?? "",
        participant_header: mm.header ?? "",
      });
    }
    tosend.push(row);
  }
  return tosend;
}

export const totalGames2Way = (data: any) => {
  const match = data?.odds?.main?.sp["total_games_2_way"]?.odds;
  const odd_id = data?.odds?.main?.sp["total_games_2_way"]?.id;
  const odd_name = data?.odds?.main?.sp["total_games_2_way"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      let row = [] as any;
      var obj = grouped_by_name[line];
      var over_obj = findObjectByHeader(obj, "Over");
      var under_obj = findObjectByHeader(obj, "Under");
      var _title = {
        id: 0,
        title: line == "1" ? data?.localteam.name : line == "2" ? data?.visitorteam.name : line,
        suspend: "0",
        value: "",
      };
      var _over = {
        id: over_obj.id,
        title: "",
        value: over_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: over_obj.id,
        participant_name: over_obj.name,
        participant_handicap: over_obj.handicap ?? "",
        participant_header: over_obj.header ?? ""
      };
      var _under = {
        id: under_obj.id,
        title: "",
        value: under_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: under_obj.id,
        participant_name: under_obj.name,
        participant_handicap: under_obj.handicap ?? "",
        participant_header: under_obj.header ?? ""
      };
      row.push(_title, _over, _under);
      tosend.push(row);

    }
  }
  return tosend;
}

export const setBetting = (data: any) => {
  const match = data?.odds?.main?.sp["set_betting"]?.odds;
  const odd_id = data?.odds?.main?.sp["set_betting"]?.id;
  const odd_name = data?.odds?.main?.sp["set_betting"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      let row = [] as any;
      var objs = grouped_by_name[line];
      var _title = {
        id: 0,
        title: line,
        suspend: "0",
        value: "",
      };
      row.push(_title);
      for (let obj of objs) {
        row.push({
          id: obj.id,
          title: "",
          value: obj.odds,
          suspend: "0",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: odd_id,
          odd_name: odd_name,
          participant_id: obj.id,
          participant_name: obj.name,
          participant_handicap: obj.handicap ?? "",
          participant_header: obj.header ?? ""
        });
      }
      tosend.push(row);

    }
  }
  return tosend;
}

export const firstSetWinner = (data: any) => {
  const match = data?.odds?.main?.sp["first_set_winner"]?.odds;
  const odd_id = data?.odds?.main?.sp["first_set_winner"]?.id;
  const odd_name = data?.odds?.main?.sp["first_set_winner"]?.name;
  if (!match) {
    return [];
  }
  let tosend = [] as any;

  let constructed_data = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      constructed_data.push({
        id: mm.id,
        title: mm.name == "1" ? data?.localteam.name : mm.name == "2" ? data?.visitorteam.name : mm.name,
        value: mm.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: mm.id,
        participant_name: mm.name,
        participant_handicap: mm.handicap ?? "",
        participant_header: mm.header ?? "",
      });
    }
    const splitted_array = splitArrayIntoChunks(constructed_data, 2);

    for (let i = 0; i < splitted_array.length; i++) {
      tosend.push(splitted_array[i]);
    }
  }

  return tosend;
};


export const firstSetTotalGames = (data: any) => {
  const match = data?.odds?.main?.sp["1st_set_total_games"]?.odds;
  const odd_id = data?.odds?.main?.sp["1st_set_total_games"]?.id;
  const odd_name = data?.odds?.main?.sp["1st_set_total_games"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      let row = [] as any;
      var objs = grouped_by_name[line];
      var _title = {
        id: 0,
        title: line,
        suspend: "0",
        value: "",
      };
      row.push(_title);
      for (let obj of objs) {
        row.push({
          id: obj.id,
          title: "",
          value: obj.odds,
          suspend: "0",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: odd_id,
          odd_name: odd_name,
          participant_id: obj.id,
          participant_name: obj.name,
          participant_handicap: obj.handicap ?? "",
          participant_header: obj.header ?? ""
        });
      }
      tosend.push(row);

    }
  }
  return tosend;
}
export const firstSetScore = (data: any) => {
  const match = data?.odds?.main?.sp["first_set_score"]?.odds;
  const odd_id = data?.odds?.main?.sp["first_set_score"]?.id;
  const odd_name = data?.odds?.main?.sp["first_set_score"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      let row = [] as any;
      var objs = grouped_by_name[line];
      var _title = {
        id: 0,
        title: line,
        suspend: "0",
        value: "",
      };
      row.push(_title);
      for (let obj of objs) {
        row.push({
          id: obj.id,
          title: "",
          value: obj.odds,
          suspend: "0",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: odd_id,
          odd_name: odd_name,
          participant_id: obj.id,
          participant_name: obj.name,
          participant_handicap: obj.handicap ?? "",
          participant_header: obj.header ?? ""
        });
      }
      tosend.push(row);

    }
  }
  return tosend;
}
export const matchResultAndTotalGames = (data: any) => {
  const match = data?.odds?.main?.sp["match_result_and_total_games"]?.odds;
  const odd_id = data?.odds?.main?.sp["match_result_and_total_games"]?.id;
  const odd_name = data?.odds?.main?.sp["match_result_and_total_games"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      let row = [] as any;
      var objs = grouped_by_name[line];
      var _title = {
        id: 0,
        title: line == "1" ? data?.localteam.name : line == "2" ? data?.visitorteam.name : line,
        suspend: "0",
        value: "",
      };
      row.push(_title);
      for (let obj of objs) {
        row.push({
          id: obj.id,
          title: obj.handicap,
          value: obj.odds,
          suspend: "0",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: odd_id,
          odd_name: odd_name,
          participant_id: obj.id,
          participant_name: obj.name,
          participant_handicap: obj.handicap ?? "",
          participant_header: obj.header ?? ""
        });
      }
      tosend.push(row);

    }
  }
  return tosend;
}
export const homeAwayTo = (data: any, main: any, team: any) => {
  if (!data || !data?.odds?.main?.sp || !main) {
    return {
      marketname: team === "home" ? "Home To" : "Away To",
      suspend: "0",
      header: ["", "Yes", "No"],
      rows: []
    };
  }
  var odds: any;
  let marketname;
  if (team === "home") {
    marketname = main?.marketname?.replace(
      "undefined",
      data?.localteam.name
    );
    marketname = main?.marketname?.replace("Home", data?.localteam.name);
    odds = Object.values(data?.odds?.main?.sp)?.find((item: any) => item.id === "130251");
  } else if (team === "away") {
    marketname = main.marketname?.replace(
      "undefined",
      data?.visitorteam.name
    );
    marketname = main.marketname?.replace("Away", data?.visitorteam.name);

    odds = Object.values(data?.odds?.main?.sp)?.find((item: any) => item.id === "130255");
  }
  const odd_id = odds?.id;
  const odd_name = odds?.name;
  const match = odds?.odds;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      let row = [] as any;
      var objs = grouped_by_name[line];
      var _title = {
        id: 0,
        title: line == "1" ? data?.localteam.name : line == "2" ? data?.visitorteam.name : line,
        suspend: "0",
        value: "",
      };
      row.push(_title);
      for (let obj of objs) {
        row.push({
          id: obj.id,
          title: obj.handicap,
          value: obj.odds,
          suspend: "0",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: odd_id,
          odd_name: odd_name,
          participant_id: obj.id,
          participant_name: obj.name,
          participant_handicap: obj.handicap ?? "",
          participant_header: obj.header ?? ""
        });
      }
      tosend.push(row);

    }
  }
  main.rows = tosend;
  main.marketname = marketname;
  return main;
};
export const firstHomeAwayServiceGameWinners = (data: any, main: any, team: any) => {
  if (!data || !data?.odds?.main?.sp || !main) {
    return {
      marketname: team === "home" ? "First Home Service Game - Winners" : "First Away Service Game - Winners",
      suspend: "0",
      header: ["", "Home", "Away"],
      rows: []
    };
  }
  var odds: any;
  let marketname;
  if (team === "home") {
    marketname = main?.marketname?.replace(
      "undefined",
      data?.localteam.name
    );
    marketname = main?.marketname?.replace("Home", data?.localteam.name);
    odds = Object.values(data?.odds?.main?.sp)?.find((item: any) => item.id === "130286");
  } else if (team === "away") {
    marketname = main.marketname?.replace(
      "undefined",
      data?.visitorteam.name
    );
    marketname = main.marketname?.replace("Away", data?.visitorteam.name);

    odds = Object.values(data?.odds?.main?.sp)?.find((item: any) => item.id === "130297");
  }
  const odd_id = odds?.id;
  const odd_name = odds?.name;
  const match = odds?.odds;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      let row = [] as any;
      var objs = grouped_by_name[line];
      var _title = {
        id: 0,
        title: line == "1" ? data?.localteam.name : line == "2" ? data?.visitorteam.name : line,
        suspend: "0",
        value: "",
      };
      row.push(_title);
      for (let obj of objs) {
        row.push({
          id: obj.id,
          title: obj.handicap,
          value: obj.odds,
          suspend: "0",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: odd_id,
          odd_name: odd_name,
          participant_id: obj.id,
          participant_name: obj.name,
          participant_handicap: obj.handicap ?? "",
          participant_header: obj.header ?? ""
        });
      }
      tosend.push(row);

    }
  }
  main.rows = tosend;
  main.marketname = marketname;
  return main;
};
export const firstHomeAwayServiceGameScore = (data: any, main: any, team: any) => {
  if (!data || !data?.odds?.main?.sp || !main) {
    return {
      marketname: team === "home" ? "First Home Service Game - Score" : "First Away Service Game - Score",
      suspend: "0",
      header: ["", "Home", "Away"],
      rows: []
    };
  }
  var odds: any;
  let marketname;
  if (team === "home") {
    marketname = main?.marketname?.replace(
      "undefined",
      data?.localteam.name
    );
    marketname = main?.marketname?.replace("Home", data?.localteam.name);
    odds = Object.values(data?.odds?.main?.sp)?.find((item: any) => item.id === "130284");
  } else if (team === "away") {
    marketname = main.marketname?.replace(
      "undefined",
      data?.visitorteam.name
    );
    marketname = main.marketname?.replace("Away", data?.visitorteam.name);

    odds = Object.values(data?.odds?.main?.sp)?.find((item: any) => item.id === "130295");
  }
  const odd_id = odds?.id;
  const odd_name = odds?.name;
  const match = odds?.odds;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      let row = [] as any;
      var objs = grouped_by_name[line];
      var _title = {
        id: 0,
        title: line == "1" ? data?.localteam.name : line == "2" ? data?.visitorteam.name : line,
        suspend: "0",
        value: "",
      };
      row.push(_title);
      for (let obj of objs) {
        row.push({
          id: obj.id,
          title: obj.handicap,
          value: obj.odds,
          suspend: "0",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: odd_id,
          odd_name: odd_name,
          participant_id: obj.id,
          participant_name: obj.name,
          participant_handicap: obj.handicap ?? "",
          participant_header: obj.header ?? ""
        });
      }
      tosend.push(row);

    }
  }
  main.rows = tosend;
  main.marketname = marketname;
  return main;
};
export const firstHomeAwayServiceGameToWinTo = (data: any, main: any, team: any) => {
  if (!data || !data?.odds?.main?.sp || !main) {
    return {
      marketname: team === "home" ? "First Home Service Game - To Win To" : "First Away Service Game - To Win To",
      suspend: "0",
      header: ["", "Yes", "No"],
      rows: []
    };
  }
  var odds: any;
  let marketname;
  if (team === "home") {
    marketname = main?.marketname?.replace(
      "undefined",
      data?.localteam.name
    );
    marketname = main?.marketname?.replace("Home", data?.localteam.name);
    odds = Object.values(data?.odds?.main?.sp)?.find((item: any) => item.id === "130280");
  } else if (team === "away") {
    marketname = main.marketname?.replace(
      "undefined",
      data?.visitorteam.name
    );
    marketname = main.marketname?.replace("Away", data?.visitorteam.name);

    odds = Object.values(data?.odds?.main?.sp)?.find((item: any) => item.id === "130291");
  }
  const odd_id = odds?.id;
  const odd_name = odds?.name;
  const match = odds?.odds;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      let row = [] as any;
      var objs = grouped_by_name[line];
      var _title = {
        id: 0,
        title: line == "1" ? data?.localteam.name : line == "2" ? data?.visitorteam.name : line,
        suspend: "0",
        value: "",
      };
      row.push(_title);
      for (let obj of objs) {
        row.push({
          id: obj.id,
          title: obj.handicap,
          value: obj.odds,
          suspend: "0",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: odd_id,
          odd_name: odd_name,
          participant_id: obj.id,
          participant_name: obj.name,
          participant_handicap: obj.handicap ?? "",
          participant_header: obj.header ?? ""
        });
      }
      tosend.push(row);

    }
  }
  main.rows = tosend;
  main.marketname = marketname;
  return main;
};
export const firstHomeAwayServiceGameYesNo = (data: any, main: any, team: any) => {
  if (!data || !data?.odds?.player?.sp || !main) {
    return {
      marketname: team === "home" ? "First Home Service Game - Yes/No" : "First Away Service Game - Yes/No",
      suspend: "0",
      header: ["", "Yes", "No"],
      rows: []
    };
  }
  var odds: any;
  let marketname;
  if (team === "home") {
    marketname = main?.marketname?.replace(
      "undefined",
      data?.localteam.name
    );
    marketname = main?.marketname?.replace("Home", data?.localteam.name);
    odds = Object.values(data?.odds?.player?.sp)?.find((item: any) => item.id === "130333");
  } else if (team === "away") {
    marketname = main.marketname?.replace(
      "undefined",
      data?.visitorteam.name
    );
    marketname = main.marketname?.replace("Away", data?.visitorteam.name);

    odds = Object.values(data?.odds?.player?.sp)?.find((item: any) => item.id === "130304");
  }
  const odd_id = odds?.id;
  const odd_name = odds?.name;
  const match = odds?.odds;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      let row = [] as any;
      var objs = grouped_by_name[line];
      var _title = {
        id: 0,
        title: line == "1" ? data?.localteam.name : line == "2" ? data?.visitorteam.name : line,
        suspend: "0",
        value: "",
      };
      row.push(_title);
      for (let obj of objs) {
        row.push({
          id: obj.id,
          title: obj.handicap,
          value: obj.odds,
          suspend: "0",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: odd_id,
          odd_name: odd_name,
          participant_id: obj.id,
          participant_name: obj.name,
          participant_handicap: obj.handicap ?? "",
          participant_header: obj.header ?? ""
        });
      }
      tosend.push(row);

    }
  }
  main.rows = tosend;
  main.marketname = marketname;
  return main;
};
export const firstHomeAwayServiceGameTotalPoints = (data: any, main: any, team: any) => {
  if (!data || !data?.odds?.player?.sp || !main) {
    return {
      marketname: team === "home" ? "First Home Service Game - Total Points" : "First Away Service Game - Total Points",
      suspend: "0",
      header: [],
      rows: []
    };
  }
  var key: any;
  let marketname;
  if (team === "home") {
    marketname = main?.marketname?.replace(
      "undefined",
      data?.localteam.name
    );
    marketname = main?.marketname?.replace("Home", data?.localteam.name);
    key = Object.keys(data?.odds?.player?.sp)?.find((item: any) => data?.odds?.player?.sp[item].id === "130283");
    console.log(Object.keys(data?.odds?.player?.sp));
  } else if (team === "away") {
    marketname = main.marketname?.replace(
      "undefined",
      data?.visitorteam.name
    );
    marketname = main.marketname?.replace("Away", data?.visitorteam.name);

    key = Object.keys(data?.odds?.player?.sp)?.find((item: any) => data?.odds?.player?.sp[item].id === "130294");
  }
  var match = find_in_array_by_sp_name(data?.odds?.others, key);
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;
  const tosend = [] as any;
  let constructed_data = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      constructed_data.push({
        id: mm.id,
        title: mm.name == "1" ? data?.localteam.name : mm.name == "2" ? data?.visitorteam.name : mm.name,
        value: mm.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: mm.id,
        participant_name: mm.name,
        participant_handicap: mm.handicap ?? "",
        participant_header: mm.header ?? "",
      });
    }
    const splitted_array = splitArrayIntoChunks(constructed_data, 2);

    for (let i = 0; i < splitted_array.length; i++) {
      tosend.push(splitted_array[i]);
    }
  }
  main.rows = tosend;
  main.marketname = marketname;
  return main;
};

export const goTheDistance = (data: any) => {

  var match = find_in_array_by_sp_name(data?.odds?.others, "go_the_distance?");
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;
  let tosend = [] as any;

  let constructed_data = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      constructed_data.push({
        id: mm.id,
        title: mm.name == "1" ? data?.localteam.name : mm.name == "2" ? data?.visitorteam.name : mm.name,
        value: mm.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: mm.id,
        participant_name: mm.name,
        participant_handicap: mm.handicap ?? "",
        participant_header: mm.header ?? "",
      });
    }
    const splitted_array = splitArrayIntoChunks(constructed_data, 2);

    for (let i = 0; i < splitted_array.length; i++) {
      tosend.push(splitted_array[i]);
    }
  }

  return tosend;
};


export const firstSethandicap = (data: any) => {
  const match = data?.odds?.set?.sp["first_set_handicap"]?.odds;
  const odd_id = data?.odds?.set?.sp["first_set_handicap"]?.id;
  const odd_name = data?.odds?.set?.sp["first_set_handicap"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  const row = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      row.push({
        id: mm.id,
        title: mm.name == "1" ? data?.localteam.name : mm.name == "2" ? data?.visitorteam.name : mm.name,
        value: mm.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: mm.id,
        participant_name: mm.name,
        participant_handicap: mm.handicap ?? "",
        participant_header: mm.header ?? "",
      });
    }
    tosend.push(row);
  }
  return tosend;
}

export const firstSetCorrectScoreGroup = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "first_set_correct_score_group");
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      let row = [] as any;
      var objs = grouped_by_name[line];
      var _title = {
        id: 0,
        title: line,
        suspend: "0",
        value: "",
      };
      row.push(_title);
      for (let obj of objs) {
        row.push({
          id: obj.id,
          title: "",
          value: obj.odds,
          suspend: "0",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: odd_id,
          odd_name: odd_name,
          participant_id: obj.id,
          participant_name: obj.name,
          participant_handicap: obj.handicap ?? "",
          participant_header: obj.header ?? ""
        });
      }
      tosend.push(row);

    }
  }
  return tosend;
}

export const firstSetScoreAnyPlayer = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "first_set_score_any_player");
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;
  const tosend = [] as any;
  let constructed_data = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      constructed_data.push({
        id: mm.id,
        title: mm.name == "1" ? data?.localteam.name : mm.name == "2" ? data?.visitorteam.name : mm.name,
        value: mm.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: mm.id,
        participant_name: mm.name,
        participant_handicap: mm.handicap ?? "",
        participant_header: mm.header ?? "",
      });
    }
    constructed_data.push({});
    const splitted_array = splitArrayIntoChunks(constructed_data, 2);

    for (let i = 0; i < splitted_array.length; i++) {
      tosend.push(splitted_array[i]);
    }
  }
  return tosend;
}

export const firstSetPlayerToBreakServe = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "first_set_player_to_break_serve");
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      let row = [] as any;
      var objs = grouped_by_name[line];
      var _title = {
        id: 0,
        title: line == "1" ? data?.localteam.name : line == "2" ? data?.visitorteam.name : line,
        suspend: "0",
        value: "",
      };
      row.push(_title);
      for (let obj of objs) {
        row.push({
          id: obj.id,
          title: "",
          value: obj.odds,
          suspend: "0",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: odd_id,
          odd_name: odd_name,
          participant_id: obj.id,
          participant_name: obj.name,
          participant_handicap: obj.handicap ?? "",
          participant_header: obj.header ?? ""
        });
      }
      tosend.push(row);

    }
  }
  return tosend;
}

export const firstBreakOfServe = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "first_break_of_serve");
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;
  let tosend = [] as any;

  let constructed_data = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      constructed_data.push({
        id: mm.id,
        title: mm.name == "1" ? data?.localteam.name : mm.name == "2" ? data?.visitorteam.name : mm.name,
        value: mm.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: mm.id,
        participant_name: mm.name,
        participant_handicap: mm.handicap ?? "",
        participant_header: mm.header ?? "",
      });
    }
    const splitted_array = splitArrayIntoChunks(constructed_data, 2);

    for (let i = 0; i < splitted_array.length; i++) {
      tosend.push(splitted_array[i]);
    }
  }

  return tosend;
};

export const totalGamesInSet = (data: any, oddData: any) => {
  if (!data && !data.odds) {
    return oddData;
  }
  let tosend = [] as any;

  return tosend;
};firstSetScoreAnyPlayer
firstSetScoreAnyPlayer