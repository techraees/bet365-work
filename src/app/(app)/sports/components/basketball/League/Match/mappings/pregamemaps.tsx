"use client";

const find_in_array_by_sp_name = (arr: any, target_string: any) => {
  console.log({ arr: arr });
  if (!arr) {
    return undefined;
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

export const gameLines = (data: any) => {
  var match = data?.odds?.main?.sp?.game_lines?.odds;
  const odd_id = data?.odds?.main?.sp?.game_lines?.id;
  const odd_name = data?.odds?.main?.sp?.game_lines?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;

  const grouped_by_name = get_objects_grouped_by_name(match);
  if (match && match.length > 0) {
    const arr = [] as any;
    const grouped_spread = grouped_by_name["Spread"];
    var _title_obj = {
      title: "Spread",
      value: "",
      suspend: "1",
    };
    arr.push(_title_obj);
    grouped_spread.forEach((obj: any) => {
      var _obj = {
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name,
        participant_handicap: obj.handicap,
        participant_header: obj.header,
      };
      arr.push(_obj);
    });
    tosend.push(arr);

    // tosend.push(arr);
  }

  if (match && match.length > 0) {
    const arr = [] as any;
    const grouped_spread = grouped_by_name["Total"];
    var _title_obj = {
      title: "Total",
      value: "",
      suspend: "1",
    };
    arr.push(_title_obj);
    grouped_spread.forEach((obj: any) => {
      var _obj = {
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name,
        participant_handicap: obj.handicap,
        participant_header: obj.header,
      };
      arr.push(_obj);
    });
    tosend.push(arr);
  }

  if (match && match.length > 0) {
    const arr = [] as any;
    const grouped_spread = grouped_by_name["Money Line"];
    var _title_obj = {
      title: "Money Line",
      value: "",
      suspend: "1",
    };
    arr.push(_title_obj);
    grouped_spread.forEach((obj: any) => {
      var _obj = {
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name,
        participant_handicap: obj.handicap,
        participant_header: obj.header,
      };
      arr.push(_obj);
    });
    tosend.push(arr);
  }

  return tosend;
};

export const firsthalf = (data: any) => {
  var match = data?.odds?.main?.sp["1st_half"]?.odds;
  const odd_id = data?.odds?.main?.sp["1st_half"]?.id;
  const odd_name = data?.odds?.main?.sp["1st_half"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;

  const grouped_by_name = get_objects_grouped_by_name(match);
  if (match && match.length > 0) {
    const arr = [] as any;
    const grouped_spread = grouped_by_name["Spread"];
    var _title_obj = {
      title: "Spread",
      value: "",
      suspend: "1",
    };
    arr.push(_title_obj);
    grouped_spread.forEach((obj: any) => {
      var _obj = {
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name,
        participant_handicap: obj.handicap,
        participant_header: obj.header,
      };
      arr.push(_obj);
    });
    tosend.push(arr);

    // tosend.push(arr);
  }

  if (match && match.length > 0) {
    const arr = [] as any;
    const grouped_spread = grouped_by_name["Total"];
    var _title_obj = {
      title: "Total",
      value: "",
      suspend: "1",
    };
    arr.push(_title_obj);
    grouped_spread.forEach((obj: any) => {
      var _obj = {
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name,
        participant_handicap: obj.handicap,
        participant_header: obj.header,
      };
      arr.push(_obj);
    });
    tosend.push(arr);
  }

  if (match && match.length > 0) {
    const arr = [] as any;
    const grouped_spread = grouped_by_name["Money Line"];
    var _title_obj = {
      title: "Money Line",
      value: "",
      suspend: "1",
    };
    arr.push(_title_obj);
    grouped_spread.forEach((obj: any) => {
      var _obj = {
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name,
        participant_handicap: obj.handicap,
        participant_header: obj.header,
      };
      arr.push(_obj);
    });
    tosend.push(arr);
  }

  return tosend;
};

export const firstQ = (data: any) => {
  var match = data?.odds?.main?.sp["1st_quarter"]?.odds;
  const odd_id = data?.odds?.main?.sp["1st_quarter"]?.id;
  const odd_name = data?.odds?.main?.sp["1st_quarter"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;

  const grouped_by_name = get_objects_grouped_by_name(match);
  if (match && match.length > 0) {
    const arr = [] as any;
    const grouped_spread = grouped_by_name["Spread"];
    var _title_obj = {
      title: "Spread",
      value: "",
      suspend: "1",
    };
    arr.push(_title_obj);
    grouped_spread.forEach((obj: any) => {
      var _obj = {
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name,
        participant_handicap: obj.handicap,
        participant_header: obj.header,
      };
      arr.push(_obj);
    });
    tosend.push(arr);

    // tosend.push(arr);
  }

  if (match && match.length > 0) {
    const arr = [] as any;
    const grouped_spread = grouped_by_name["Total"];
    var _title_obj = {
      title: "Total",
      value: "",
      suspend: "1",
    };
    arr.push(_title_obj);
    grouped_spread.forEach((obj: any) => {
      var _obj = {
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name,
        participant_handicap: obj.handicap,
        participant_header: obj.header,
      };
      arr.push(_obj);
    });
    tosend.push(arr);
  }

  if (match && match.length > 0) {
    const arr = [] as any;
    const grouped_spread = grouped_by_name["Money Line"];
    var _title_obj = {
      title: "Money Line",
      value: "",
      suspend: "1",
    };
    arr.push(_title_obj);
    grouped_spread.forEach((obj: any) => {
      var _obj = {
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name,
        participant_handicap: obj.handicap,
        participant_header: obj.header,
      };
      arr.push(_obj);
    });
    tosend.push(arr);
  }

  return tosend;
};

export const secondQ = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "2nd_quarter");
  if (!match) {
    return [];
  }

  const odd_id = match.id;
  const odd_name = match.name;
  match = match.odds;
  const tosend = [] as any;

  const grouped_by_name = get_objects_grouped_by_name(match);
  if (match && match.length > 0) {
    const arr = [] as any;
    const grouped_spread = grouped_by_name["Spread"];
    var _title_obj = {
      title: "Spread",
      value: "",
      suspend: "1",
    };
    arr.push(_title_obj);
    grouped_spread.forEach((obj: any) => {
      var _obj = {
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name,
        participant_handicap: obj.handicap,
        participant_header: obj.header,
      };
      arr.push(_obj);
    });
    tosend.push(arr);

    // tosend.push(arr);
  }

  if (match && match.length > 0) {
    const arr = [] as any;
    const grouped_spread = grouped_by_name["Total"];
    var _title_obj = {
      title: "Total",
      value: "",
      suspend: "1",
    };
    arr.push(_title_obj);
    grouped_spread.forEach((obj: any) => {
      var _obj = {
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name,
        participant_handicap: obj.handicap,
        participant_header: obj.header,
      };
      arr.push(_obj);
    });
    tosend.push(arr);
  }

  if (match && match.length > 0) {
    const arr = [] as any;
    const grouped_spread = grouped_by_name["Money Line"];
    var _title_obj = {
      title: "Money Line",
      value: "",
      suspend: "1",
    };
    arr.push(_title_obj);
    grouped_spread.forEach((obj: any) => {
      var _obj = {
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name,
        participant_handicap: obj.handicap,
        participant_header: obj.header,
      };
      arr.push(_obj);
    });
    tosend.push(arr);
  }

  return tosend;
};

export const thirdQ = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "3rd_quarter");
  if (!match) {
    return [];
  }

  const odd_id = match.id;
  const odd_name = match.name;
  const tosend = [] as any;

  match = match.odds;
  const grouped_by_name = get_objects_grouped_by_name(match);
  if (match && match.length > 0) {
    const arr = [] as any;
    const grouped_spread = grouped_by_name["Spread"];
    var _title_obj = {
      title: "Spread",
      value: "",
      suspend: "1",
    };
    arr.push(_title_obj);
    grouped_spread.forEach((obj: any) => {
      var _obj = {
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name,
        participant_handicap: obj.handicap,
        participant_header: obj.header,
      };
      arr.push(_obj);
    });
    tosend.push(arr);

    // tosend.push(arr);
  }

  if (match && match.length > 0) {
    const arr = [] as any;
    const grouped_spread = grouped_by_name["Total"];
    var _title_obj = {
      title: "Total",
      value: "",
      suspend: "1",
    };
    arr.push(_title_obj);
    grouped_spread.forEach((obj: any) => {
      var _obj = {
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name,
        participant_handicap: obj.handicap,
      };
      arr.push(_obj);
    });
    tosend.push(arr);
  }

  if (match && match.length > 0) {
    const arr = [] as any;
    const grouped_spread = grouped_by_name["Money Line"];
    var _title_obj = {
      title: "Money Line",
      value: "",
      suspend: "1",
    };
    arr.push(_title_obj);
    grouped_spread.forEach((obj: any) => {
      var _obj = {
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name,
        participant_handicap: obj.handicap,
      };
      arr.push(_obj);
    });
    tosend.push(arr);
  }

  return tosend;
};

export const fourthQ = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "4th_quarter");
  if (!match) {
    return [];
  }

  const odd_id = match.id;
  const odd_name = match.name;
  const tosend = [] as any;

  match = match.odds;
  const grouped_by_name = get_objects_grouped_by_name(match);
  if (match && match.length > 0) {
    const arr = [] as any;
    const grouped_spread = grouped_by_name["Spread"];
    var _title_obj = {
      title: "Spread",
      value: "",
      suspend: "1",
    };
    arr.push(_title_obj);
    grouped_spread.forEach((obj: any) => {
      var _obj = {
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name,
        participant_handicap: obj.handicap,
        participant_header: obj.header,
      };
      arr.push(_obj);
    });
    tosend.push(arr);

    // tosend.push(arr);
  }

  if (match && match.length > 0) {
    const arr = [] as any;
    const grouped_spread = grouped_by_name["Total"];
    var _title_obj = {
      title: "Total",
      value: "",
      suspend: "1",
    };
    arr.push(_title_obj);
    grouped_spread.forEach((obj: any) => {
      var _obj = {
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name,
        participant_handicap: obj.handicap,
        participant_header: obj.header,
      };
      arr.push(_obj);
    });
    tosend.push(arr);
  }

  if (match && match.length > 0) {
    const arr = [] as any;
    const grouped_spread = grouped_by_name["Money Line"];
    var _title_obj = {
      title: "Money Line",
      value: "",
      suspend: "1",
    };
    arr.push(_title_obj);
    grouped_spread.forEach((obj: any) => {
      var _obj = {
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name,
        participant_handicap: obj.handicap,
        participant_header: obj.header,
      };
      arr.push(_obj);
    });
    tosend.push(arr);
  }

  return tosend;
};

export const gameLines3Way = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "game_lines_3_way");
  if (!match) {
    return [];
  }

  const odd_id = match.id;
  const odd_name = match.name;
  var tosend = [] as any;

  match = match.odds;
  if (match && match.length > 0) {
    const arr = [] as any;
    var _title_obj = {
      title: "Spread",
      value: "",
      suspend: "1",
    };
    arr.push(_title_obj);
    var home_obj = findObjectByHeader(match, "1");
    var tie_obj = findObjectByHeader(match, "Tie");
    var away_obj = findObjectByHeader(match, "2");

    var _home = {
      id: home_obj.id,
      title: home_obj.handicap,
      value: home_obj.odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: home_obj.id,
      participant_name: home_obj.name,
      participant_handicap: home_obj.handicap,
      participant_header: home_obj.header,
    };

    var _tie = {
      id: tie_obj.id,
      title: tie_obj.handicap,
      value: tie_obj.odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: tie_obj.id,
      participant_name: tie_obj.name,
      participant_handicap: tie_obj.handicap,
      participant_header: tie_obj.header,
    };

    var _away = {
      id: away_obj.id,
      title: away_obj.handicap,
      value: away_obj.odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: away_obj.id,
      participant_name: away_obj.name,
      participant_handicap: away_obj.handicap,
      participant_header: away_obj.header,
    };
    arr.push(_home);
    arr.push(_tie);
    arr.push(_away);
    tosend.push(arr);
  }

  return tosend;
};
export const teamWithHighestScoringQuarter = (data: any) => {
  const match =
    data?.odds?.team_props?.sp?.team_with_highest_scoring_quarter?.odds;
  const odd_id =
    data?.odds?.team_props?.sp?.team_with_highest_scoring_quarter?.id;
  const odd_name =
    data?.odds?.team_props?.sp?.team_with_highest_scoring_quarter?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const arr = [] as any;
    if (match[0].name === "1") {
      let title = data?.localteam?.name;
      let value = match[0].odds;
      let suspend = "0";
      arr.push({
        title: title,
        value: value,
        suspend: suspend,

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: match[0].id,
        participant_name: title,
        participant_handicap: match[0].handicap ?? "",
        participant_header: match[0].header ?? "",
      });
    }
    if (match[1].name === "2") {
      let title = data?.visitorteam?.name;
      let value = match[1].odds;
      let suspend = "0";
      arr.push({
        title: title,
        value: value,
        suspend: suspend,

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: match[2].id,
        participant_name: title,
        participant_handicap: match[1].handicap ?? "",
        participant_header: match[1].header ?? "",
      });
    }
    if (match[2].name === "Tie") {
      let title = "Tie";
      let value = match[2].odds;
      let suspend = "0";

      arr.push({
        title: title,
        value: value,
        suspend: suspend,

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: match[1].id,
        participant_name: title,
        participant_handicap: match[2].handicap ?? "",
        participant_header: match[2].header ?? "",
      });
    }

    tosend.push(arr);
  }
  return tosend;
};

export const teamTotals = (data: any) => {
  const match = data?.odds?.team_props?.sp?.team_totals?.odds;
  const odd_id = data?.odds?.team_props?.sp?.team_totals?.id;
  const odd_name = data?.odds?.team_props?.sp?.team_totals?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const arr = [] as any;
    for (let obj of match) {
      arr.push({
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name ?? "",
        participant_handicap: obj.handicap ?? "",
        participant_header: obj.header ?? "",
      });
    }
    tosend.push(arr);
  }
  return tosend;
};

export const alternativeTeamTotals = (data: any, teamname: any) => {
  const match = data?.odds?.team_props?.sp?.alternative_team_totals?.odds;
  const odd_id = data?.odds?.team_props?.sp?.alternative_team_totals?.id;
  const odd_name = data?.odds?.team_props?.sp?.alternative_team_totals?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      var obj = grouped_by_name[line];
      var over_obj = obj.find(
        (item: any) => item.header === "Over" && item.team === teamname
      );
      var under_obj = obj.find(
        (item: any) => item.header === "Under" && item.team === teamname
      );
      if (over_obj == undefined || under_obj == undefined) {
        continue;
      }
      var _title = {
        id: 0,
        title: line,
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
        participant_header: over_obj.header ?? "",
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
        participant_header: under_obj.header ?? "",
      };

      tosend.push([_title, _over, _under]);
    }
  }
  return tosend;
};
export const alternativeTeamTotals2 = (data: any, teamname: any) => {
  const match =
    data?.odds?.team_props?.sp?.alternative_1st_quarter_team_totals?.odds;
  const odd_id =
    data?.odds?.team_props?.sp?.alternative_1st_quarter_team_totals?.id;
  const odd_name =
    data?.odds?.team_props?.sp?.alternative_1st_quarter_team_totals?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      var obj = grouped_by_name[line];
      var over_obj = obj.find(
        (item: any) => item.header === "Over" && item.team === teamname
      );
      var under_obj = obj.find(
        (item: any) => item.header === "Under" && item.team === teamname
      );
      if (over_obj == undefined || under_obj == undefined) {
        continue;
      }
      var _title = {
        id: 0,
        title: line,
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
        participant_header: over_obj.header ?? "",
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
        participant_header: under_obj.header ?? "",
      };

      tosend.push([_title, _over, _under]);
    }
  }
  return tosend;
};
export const firstQuarterTeamTotals = (data: any) => {
  const match = data?.odds?.team_props?.sp["1st_quarter_team_totals"]?.odds;
  const odd_id = data?.odds?.team_props?.sp["1st_quarter_team_totals"]?.id;
  const odd_name = data?.odds?.team_props?.sp["1st_quarter_team_totals"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const arr = [] as any;
    for (let obj of match) {
      arr.push({
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name ?? "",
        participant_handicap: obj.handicap ?? "",
        participant_header: obj.header ?? "",
      });
    }
    tosend.push(arr);
  }
  return tosend;
};
export const alternativeFirstQuarterTeamTotals = (data: any, teamname: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_team_totals_2"
  );
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
      var obj = grouped_by_name[line];
      var over_obj = obj.find(
        (item: any) => item.header === "Over" && item.team === teamname
      );
      var under_obj = obj.find(
        (item: any) => item.header === "Under" && item.team === teamname
      );
      if (over_obj == undefined || under_obj == undefined) {
        continue;
      }
      var _title = {
        id: 0,
        title: line,
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
        participant_header: over_obj.header ?? "",
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
        participant_header: under_obj.header ?? "",
      };

      tosend.push([_title, _over, _under]);
    }
  }
  return tosend;
};
export const firstHalfTeamTotals = (data: any) => {
  const match = data?.odds?.team_props?.sp["1st_half_team_totals"]?.odds;
  const odd_id = data?.odds?.team_props?.sp["1st_half_team_totals"]?.id;
  const odd_name = data?.odds?.team_props?.sp["1st_half_team_totals"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const arr = [] as any;
    for (let obj of match) {
      arr.push({
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name ?? "",
        participant_handicap: obj.handicap ?? "",
        participant_header: obj.header ?? "",
      });
    }
    tosend.push(arr);
  }
  return tosend;
};
export const alternativeFirstHalfTeamTotals = (data: any, teamname: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_1st_half_team_totals"
  );
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
      var obj = grouped_by_name[line];
      var over_obj = obj.find(
        (item: any) => item.header === "Over" && item.team === teamname
      );
      var under_obj = obj.find(
        (item: any) => item.header === "Under" && item.team === teamname
      );
      if (over_obj == undefined || under_obj == undefined) {
        continue;
      }
      var _title = {
        id: 0,
        title: line,
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
        participant_header: over_obj.header ?? "",
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
        participant_header: under_obj.header ?? "",
      };

      tosend.push([_title, _over, _under]);
    }
  }
  return tosend;
};
export const firstQuarterTeamToScoreXPoint = (data: any, teamname: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "1st_quarter_team_to_score_x_points"
  );
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
      var obj = grouped_by_name[line];
      var over_obj = obj.find(
        (item: any) => item.header === "Yes" && item.team === teamname
      );
      var under_obj = obj.find(
        (item: any) => item.header === "No" && item.team === teamname
      );
      if (over_obj == undefined || under_obj == undefined) {
        continue;
      }
      var _title = {
        id: 0,
        title: line,
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
        participant_header: over_obj.header ?? "",
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
        participant_header: under_obj.header ?? "",
      };

      tosend.push([_title, _over, _under]);
    }
  }
  return tosend;
};
export const teamTotalOddEven = (data: any) => {
  const match = data?.odds?.team_props?.sp?.team_total_odd_even?.odds;
  const odd_id = data?.odds?.team_props?.sp?.team_total_odd_even?.id;
  const odd_name = data?.odds?.team_props?.sp?.team_total_odd_even?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const arr = [] as any;
    for (let obj of match) {
      arr.push({
        title: obj.handicap,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name ?? "",
        participant_handicap: obj.handicap ?? "",
        participant_header: obj.header ?? "",
      });
    }
    tosend.push(arr);
  }
  return tosend;
};
export const firstHalfTeamToScoreXPoint = (data: any, teamname: any) => {
  const match =
    data?.odds?.team_props?.sp["1st_half_team_to_score_x_points"]?.odds;
  const odd_id =
    data?.odds?.team_props?.sp["1st_half_team_to_score_x_points"]?.id;
  const odd_name =
    data?.odds?.team_props?.sp["1st_half_team_to_score_x_points"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      var obj = grouped_by_name[line];
      var over_obj = obj.find(
        (item: any) => item.header === "Yes" && item.team === teamname
      );
      var under_obj = obj.find(
        (item: any) => item.header === "No" && item.team === teamname
      );
      if (over_obj == undefined || under_obj == undefined) {
        continue;
      }
      var _title = {
        id: 0,
        title: line,
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
        participant_header: over_obj.header ?? "",
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
        participant_header: under_obj.header ?? "",
      };

      tosend.push([_title, _over, _under]);
    }
  }
  return tosend;
};

export const alternativeFirstQuarterTotals = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_1st_quarter_totals"
  );
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
      var obj = grouped_by_name[line];
      var over_obj = findObjectByHeader(obj, "Over");
      var under_obj = findObjectByHeader(obj, "Under");
      var _title = {
        id: 0,
        title: line,
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
        participant_header: over_obj.header ?? "",
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
        participant_header: under_obj.header ?? "",
      };
      row.push(_title, _over, _under);
      tosend.push(row);
    }
  }
  return tosend;
};
export const firstQuarterBothTeamsToScoreXPoints = (data: any) => {
  const match =
    data?.odds?.quarter_props?.sp["1st_quarter_both_teams_to_score_x_points"]
      ?.odds;
  const odd_id =
    data?.odds?.quarter_props?.sp["1st_quarter_both_teams_to_score_x_points"]
      ?.id;
  const odd_name =
    data?.odds?.quarter_props?.sp["1st_quarter_both_teams_to_score_x_points"]
      ?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      let row = [] as any;
      var obj = grouped_by_name[line];
      var over_obj = findObjectByHeader(obj, "Yes");
      var under_obj = findObjectByHeader(obj, "No");
      var _title = {
        id: 0,
        title: line,
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
        participant_header: over_obj.header ?? "",
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
        participant_header: under_obj.header ?? "",
      };
      row.push(_title, _over, _under);
      tosend.push(row);
    }
  }
  return tosend;
};

export const firstQuarterDoubleChance = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "1st_quarter_double_chance"
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;

  const tosend = [] as any;
  if (match && match.length > 0) {
    if (match.length > 0) {
      const arr = [] as any;
      match.forEach((odd: any) => {
        const title = odd.name;
        const value = odd.odds;
        const suspend = "0";

        var obj = {
          title: title,
          value: value,
          suspend: suspend,

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: odd_id,
          odd_name: odd_name,
          participant_id: odd.id,
          participant_name: odd.name,
          participant_handicap: odd.handicap ?? "",
          participant_header: odd.header ?? "",
        };
        arr.push(obj);
      });
      tosend.push(arr);
    }
  }
  return tosend;
};
export const firstQuarterHandicapAndTotal = (data: any) => {
  const match =
    data?.odds?.quarter_props?.sp["1st_quarter_handicap_and_total"]?.odds;
  const odd_id =
    data?.odds?.quarter_props?.sp["1st_quarter_handicap_and_total"]?.id;
  const odd_name =
    data?.odds?.quarter_props?.sp["1st_quarter_handicap_and_total"]?.name;
  if (!match) {
    return [];
  }
  let tosend = [] as any;

  let constructed_data = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      constructed_data.push({
        id: mm.id,
        title: mm.name,
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

export const firstQuarterMarginofVictory = (data: any) => {
  const match =
    data?.odds?.quarter_props?.sp["1st_quarter_margin_of_victory"]?.odds;
  const odd_id =
    data?.odds?.quarter_props?.sp["1st_quarter_margin_of_victory"]?.id;
  const odd_name =
    data?.odds?.quarter_props?.sp["1st_quarter_margin_of_victory"]?.name;
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
          participant_header: obj.header ?? "",
        });
      }
      tosend.push(row);
    }
  }
  return tosend;
};

export const firstQuarter3WayLines = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "1st_quarter_3_way_lines"
  );
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
      var obj = grouped_by_name[line];
      var home_obj = findObjectByHeader(obj, "1");
      var tie_obj = findObjectByHeader(obj, "Tie");
      var away_obj = findObjectByHeader(obj, "2");
      var _title = {
        id: 0,
        title: line,
        suspend: "0",
        value: "",
      };
      var _home = {
        id: home_obj.id,
        title: "",
        value: home_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: home_obj.id,
        participant_name: home_obj.name,
        participant_handicap: home_obj.handicap ?? "",
        participant_header: home_obj.header ?? "",
      };
      var _tie = {
        id: tie_obj.id,
        title: "",
        value: tie_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: tie_obj.id,
        participant_name: tie_obj.name,
        participant_handicap: tie_obj.handicap ?? "",
        participant_header: tie_obj.header ?? "",
      };
      var _away = {
        id: away_obj.id,
        title: "",
        value: away_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: away_obj.id,
        participant_name: away_obj.name,
        participant_handicap: away_obj.handicap ?? "",
        participant_header: away_obj.header ?? "",
      };
      row.push(_title, _home, _tie, _away);
      tosend.push(row);
    }
  }
  return tosend;
};
export const firstQuarterRaceToPoints = (data: any) => {
  const match =
    data?.odds?.quarter_props?.sp["1st_quarter_race_to_(points)"]?.odds;
  const odd_id =
    data?.odds?.quarter_props?.sp["1st_quarter_race_to_(points)"]?.id;
  const odd_name =
    data?.odds?.quarter_props?.sp["1st_quarter_race_to_(points)"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      let row = [] as any;
      var obj = grouped_by_name[line];
      var home_obj = findObjectByHeader(obj, "1");
      var neither_obj = findObjectByHeader(obj, "Neither");
      var away_obj = findObjectByHeader(obj, "2");
      var _title = {
        id: 0,
        title: line,
        suspend: "0",
        value: "",
      };
      var _home = {
        id: home_obj.id,
        title: "",
        value: home_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: home_obj.id,
        participant_name: home_obj.name,
        participant_handicap: home_obj.handicap ?? "",
        participant_header: home_obj.header ?? "",
      };
      var _neither = {
        id: neither_obj.id,
        title: "",
        value: neither_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: neither_obj.id,
        participant_name: neither_obj.name,
        participant_handicap: neither_obj.handicap ?? "",
        participant_header: neither_obj.header ?? "",
      };
      var _away = {
        id: away_obj.id,
        title: "",
        value: away_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: away_obj.id,
        participant_name: away_obj.name,
        participant_handicap: away_obj.handicap ?? "",
        participant_header: away_obj.header ?? "",
      };
      row.push(_title, _home, _away, _neither);
      tosend.push(row);
    }
  }
  return tosend;
};
export const firstQuarterResultAndTotal = (data: any) => {
  const match =
    data?.odds?.quarter_props?.sp["1st_quarter_result_and_total"]?.odds;
  const odd_id =
    data?.odds?.quarter_props?.sp["1st_quarter_result_and_total"]?.id;
  const odd_name =
    data?.odds?.quarter_props?.sp["1st_quarter_result_and_total"]?.name;
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
        title:
          line == "1"
            ? data?.localteam.name
            : line == "2"
            ? data?.visitorteam.name
            : line,
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
        participant_header: over_obj.header ?? "",
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
        participant_header: under_obj.header ?? "",
      };
      row.push(_title, _over, _under);
      tosend.push(row);
    }
  }
  return tosend;
};
export const firstQuarterTotalOddEven = (data: any) => {
  const match =
    data?.odds?.quarter_props?.sp["1st_quarter_total_odd_even"]?.odds;
  const odd_id =
    data?.odds?.quarter_props?.sp["1st_quarter_total_odd_even"]?.id;
  const odd_name =
    data?.odds?.quarter_props?.sp["1st_quarter_total_odd_even"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  const row = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      row.push({
        id: mm.id,
        title: mm.name,
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
};

export const firstQuarterWinningMargin = (data: any) => {
  const match =
    data?.odds?.quarter_props?.sp["1st_quarter_winning_margin"]?.odds;
  const odd_id =
    data?.odds?.quarter_props?.sp["1st_quarter_winning_margin"]?.id;
  const odd_name =
    data?.odds?.quarter_props?.sp["1st_quarter_winning_margin"]?.name;
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
          participant_header: obj.header ?? "",
        });
      }
      tosend.push(row);
    }
  }
  return tosend;
};

export const alternativeFirstQuarterPointSpread = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_1st_quarter_point_spread"
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match.odds;
  let tosend = [] as any;
  if (match && match.length > 0) {
    const result = [] as any;
    const left = [] as any;
    const right = [] as any;
    const groupedByHeader = get_objects_grouped_by_header(match);
    var home = groupedByHeader["1"];
    var away = groupedByHeader["2"];
    for (var home_obj of home) {
      var obj = {
        id: home_obj.id,
        title: home_obj.handicap,
        value: home_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: home_obj.id,
        participant_name: home_obj.name ?? "",
        participant_handicap: home_obj.handicap ?? "",
        participant_header: home_obj.header ?? "",
      };
      left.push(obj);
    }

    for (var away_obj of away) {
      var obj = {
        id: away_obj.id,
        title: away_obj.handicap,
        value: away_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: away_obj.id,
        participant_name: away_obj.name ?? "",
        participant_handicap: away_obj.handicap ?? "",
        participant_header: away_obj.header ?? "",
      };
      right.push(obj);
    }

    let maxlength = left.length;

    if (right.length > maxlength) {
      maxlength = right.length;
    }

    for (let i = 0; i < maxlength; i++) {
      let l = left[i] ? left[i] : { title: " ", value: " ", suspend: "0" };
      let r = right[i] ? right[i] : { title: " ", value: " ", suspend: "0" };
      result.push([l, r]);
    }
    tosend = result;
  }
  return tosend;
};

export const alternativeFirstHalfPointSpread = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_1st_half_point_spread"
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match.odds;
  let tosend = [] as any;
  if (match && match.length > 0) {
    const result = [] as any;
    const left = [] as any;
    const right = [] as any;
    const groupedByHeader = get_objects_grouped_by_header(match);
    var home = groupedByHeader["1"];
    var away = groupedByHeader["2"];
    for (var home_obj of home) {
      var obj = {
        id: home_obj.id,
        title: home_obj.handicap,
        value: home_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: home_obj.id,
        participant_name: home_obj.name ?? "",
        participant_handicap: home_obj.handicap ?? "",
        participant_header: home_obj.header ?? "",
      };
      left.push(obj);
    }

    for (var away_obj of away) {
      var obj = {
        id: away_obj.id,
        title: away_obj.handicap,
        value: away_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: away_obj.id,
        participant_name: away_obj.name ?? "",
        participant_handicap: away_obj.handicap ?? "",
        participant_header: away_obj.header ?? "",
      };
      right.push(obj);
    }

    let maxlength = left.length;

    if (right.length > maxlength) {
      maxlength = right.length;
    }

    for (let i = 0; i < maxlength; i++) {
      let l = left[i] ? left[i] : { title: " ", value: " ", suspend: "0" };
      let r = right[i] ? right[i] : { title: " ", value: " ", suspend: "0" };
      result.push([l, r]);
    }
    tosend = result;
  }
  return tosend;
};

export const alternativeFirstHalfTotals = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_1st_half_totals"
  );
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
      var obj = grouped_by_name[line];
      var over_obj = findObjectByHeader(obj, "Over");
      var under_obj = findObjectByHeader(obj, "Under");
      var _title = {
        id: 0,
        title: line,
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
        participant_header: over_obj.header ?? "",
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
        participant_header: under_obj.header ?? "",
      };
      row.push(_title, _over, _under);
      tosend.push(row);
    }
  }
  return tosend;
};

export const firstHalfWinningMargin = (data: any) => {
  const match = data?.odds?.half_props?.sp["1st_half_winning_margin"]?.odds;
  const odd_id = data?.odds?.half_props?.sp["1st_half_winning_margin"]?.id;
  const odd_name = data?.odds?.half_props?.sp["1st_half_winning_margin"]?.name;
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
          participant_header: obj.header ?? "",
        });
      }
      tosend.push(row);
    }
  }
  return tosend;
};

export const firstHalfResultAndTotal = (data: any) => {
  const match = data?.odds?.half_props?.sp["1st_half_result_and_total"]?.odds;
  const odd_id = data?.odds?.half_props?.sp["1st_half_result_and_total"]?.id;
  const odd_name =
    data?.odds?.half_props?.sp["1st_half_result_and_total"]?.name;
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
        title:
          line == "1"
            ? data?.localteam.name
            : line == "2"
            ? data?.visitorteam.name
            : line,
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
        participant_header: over_obj.header ?? "",
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
        participant_header: under_obj.header ?? "",
      };
      row.push(_title, _over, _under);
      tosend.push(row);
    }
  }
  return tosend;
};

export const firstHalfHandicapAndTotal = (data: any) => {
  const match = data?.odds?.half_props?.sp["1st_half_handicap_and_total"]?.odds;
  const odd_id = data?.odds?.half_props?.sp["1st_half_handicap_and_total"]?.id;
  const odd_name =
    data?.odds?.half_props?.sp["1st_half_handicap_and_total"]?.name;
  if (!match) {
    return [];
  }
  let tosend = [] as any;

  let constructed_data = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      constructed_data.push({
        id: mm.id,
        title: mm.name,
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

export const firstHalfRaceToPoints = (data: any) => {
  const match = data?.odds?.half_props?.sp["1st_half_race_to_(points)"]?.odds;
  const odd_id = data?.odds?.half_props?.sp["1st_half_race_to_(points)"]?.id;
  const odd_name =
    data?.odds?.half_props?.sp["1st_half_race_to_(points)"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      let row = [] as any;
      var obj = grouped_by_name[line];
      var home_obj = findObjectByHeader(obj, "1");
      var neither_obj = findObjectByHeader(obj, "Neither");
      var away_obj = findObjectByHeader(obj, "2");
      var _title = {
        id: 0,
        title: line,
        suspend: "0",
        value: "",
      };
      var _home = {
        id: home_obj.id,
        title: "",
        value: home_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: home_obj.id,
        participant_name: home_obj.name,
        participant_handicap: home_obj.handicap ?? "",
        participant_header: home_obj.header ?? "",
      };
      var _neither = {
        id: neither_obj.id,
        title: "",
        value: neither_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: neither_obj.id,
        participant_name: neither_obj.name,
        participant_handicap: neither_obj.handicap ?? "",
        participant_header: neither_obj.header ?? "",
      };
      var _away = {
        id: away_obj.id,
        title: "",
        value: away_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: away_obj.id,
        participant_name: away_obj.name,
        participant_handicap: away_obj.handicap ?? "",
        participant_header: away_obj.header ?? "",
      };
      row.push(_title, _home, _away, _neither);
      tosend.push(row);
    }
  }
  return tosend;
};

export const firstHalfBothTeamsToScoreXPoints = (data: any) => {
  const match =
    data?.odds?.half_props?.sp["1st_half_both_teams_to_score_x_points"]?.odds;
  const odd_id =
    data?.odds?.half_props?.sp["1st_half_both_teams_to_score_x_points"]?.id;
  const odd_name =
    data?.odds?.half_props?.sp["1st_half_both_teams_to_score_x_points"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      let row = [] as any;
      var obj = grouped_by_name[line];
      var over_obj = findObjectByHeader(obj, "Yes");
      var under_obj = findObjectByHeader(obj, "No");
      var _title = {
        id: 0,
        title: line,
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
        participant_header: over_obj.header ?? "",
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
        participant_header: under_obj.header ?? "",
      };
      row.push(_title, _over, _under);
      tosend.push(row);
    }
  }
  return tosend;
};

export const firstHalfSpread3Way = (data: any) => {
  const match = data?.odds?.half_props?.sp["1st_half_spread_3_way"]?.odds;
  const odd_id = data?.odds?.half_props?.sp["1st_half_spread_3_way"]?.id;
  const odd_name = data?.odds?.half_props?.sp["1st_half_spread_3_way"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  const row = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      row.push({
        id: mm.id,
        title: mm.handicap,
        value: mm.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: mm.id,
        participant_name: mm.name ?? "",
        participant_handicap: mm.handicap ?? "",
        participant_header: mm.header ?? "",
      });
    }
    tosend.push(row);
  }
  return tosend;
};
export const firstHalfTotals3Way = (data: any) => {
  const match = data?.odds?.half_props?.sp["1st_half_totals_3_way"]?.odds;
  const odd_id = data?.odds?.half_props?.sp["1st_half_totals_3_way"]?.id;
  const odd_name = data?.odds?.half_props?.sp["1st_half_totals_3_way"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      const row = [] as any;
      row.push({
        id: 0,
        title: line,
        suspend: "0",
        value: "",
      });
      var obj = grouped_by_name[line];
      for (var mm of obj) {
        row.push({
          id: mm.id,
          title: mm.handicap,
          value: mm.odds,
          suspend: "0",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: odd_id,
          odd_name: odd_name,
          participant_id: mm.id,
          participant_name: mm.name ?? "",
          participant_handicap: mm.handicap ?? "",
          participant_header: mm.header ?? "",
        });
      }
      tosend.push(row);
    }
  }
  return tosend;
};

export const firstHalfMoneyLine3Way = (data: any) => {
  const match = data?.odds?.half_props?.sp["1st_half_money_line_3_way"]?.odds;
  const odd_id = data?.odds?.half_props?.sp["1st_half_money_line_3_way"]?.id;
  const odd_name =
    data?.odds?.half_props?.sp["1st_half_money_line_3_way"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  const row = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      row.push({
        id: mm.id,
        title:
          mm.name == "1"
            ? data?.localteam.name
            : mm.name == "2"
            ? data?.visitorteam.name
            : mm.name,
        value: mm.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: mm.id,
        participant_name: mm.name ?? "",
        participant_handicap: mm.handicap ?? "",
        participant_header: mm.header ?? "",
      });
    }
    tosend.push(row);
  }
  return tosend;
};

export const firstHalfDoubleChance = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "1st_half_double_chance"
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;

  const tosend = [] as any;
  if (match && match.length > 0) {
    if (match.length > 0) {
      const arr = [] as any;
      match.forEach((odd: any) => {
        const title = odd.name;
        const value = odd.odds;
        const suspend = "0";

        var obj = {
          title: title,
          value: value,
          suspend: suspend,

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: odd_id,
          odd_name: odd_name,
          participant_id: odd.id,
          participant_name: odd.name,
          participant_handicap: odd.handicap ?? "",
          participant_header: odd.header ?? "",
        };
        arr.push(obj);
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const firstHalfTotalOddEven = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "1st_half_total_odd_even"
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match.odds;
  const tosend = [] as any;
  const row = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      row.push({
        id: mm.id,
        title: mm.name,
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
};

export const alternativePointSpread = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_point_spread"
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match.odds;
  let tosend = [] as any;
  if (match && match.length > 0) {
    const result = [] as any;
    const left = [] as any;
    const right = [] as any;
    const groupedByHeader = get_objects_grouped_by_header(match);
    var home = groupedByHeader["1"];
    var away = groupedByHeader["2"];
    for (var home_obj of home) {
      var obj = {
        id: home_obj.id,
        title: home_obj.handicap,
        value: home_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: home_obj.id,
        participant_name: home_obj.name ?? "",
        participant_handicap: home_obj.handicap ?? "",
        participant_header: home_obj.header ?? "",
      };
      left.push(obj);
    }

    for (var away_obj of away) {
      var obj = {
        id: away_obj.id,
        title: away_obj.handicap,
        value: away_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: away_obj.id,
        participant_name: away_obj.name ?? "",
        participant_handicap: away_obj.handicap ?? "",
        participant_header: away_obj.header ?? "",
      };
      right.push(obj);
    }

    let maxlength = left.length;

    if (right.length > maxlength) {
      maxlength = right.length;
    }

    for (let i = 0; i < maxlength; i++) {
      let l = left[i] ? left[i] : { title: " ", value: " ", suspend: "0" };
      let r = right[i] ? right[i] : { title: " ", value: " ", suspend: "0" };
      result.push([l, r]);
    }
    tosend = result;
  }
  return tosend;
};

export const alternativeGameTotal = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_game_total"
  );
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
      var obj = grouped_by_name[line];
      var over_obj = findObjectByHeader(obj, "Over");
      var under_obj = findObjectByHeader(obj, "Under");
      var _title = {
        id: 0,
        title: line,
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
        participant_header: over_obj.header ?? "",
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
        participant_header: under_obj.header ?? "",
      };
      row.push(_title, _over, _under);
      tosend.push(row);
    }
  }
  return tosend;
};
export const alternativePointSpread2 = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_point_spread_2"
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match.odds;
  let tosend = [] as any;
  if (match && match.length > 0) {
    const result = [] as any;
    const left = [] as any;
    const right = [] as any;
    const groupedByHeader = get_objects_grouped_by_header(match);
    var home = groupedByHeader["1"];
    var away = groupedByHeader["2"];
    for (var home_obj of home) {
      var obj = {
        id: home_obj.id,
        title: home_obj.handicap,
        value: home_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: home_obj.id,
        participant_name: home_obj.name ?? "",
        participant_handicap: home_obj.handicap ?? "",
        participant_header: home_obj.header ?? "",
      };
      left.push(obj);
    }

    for (var away_obj of away) {
      var obj = {
        id: away_obj.id,
        title: away_obj.handicap,
        value: away_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: away_obj.id,
        participant_name: away_obj.name ?? "",
        participant_handicap: away_obj.handicap ?? "",
        participant_header: away_obj.header ?? "",
      };
      right.push(obj);
    }

    let maxlength = left.length;

    if (right.length > maxlength) {
      maxlength = right.length;
    }

    for (let i = 0; i < maxlength; i++) {
      let l = left[i] ? left[i] : { title: " ", value: " ", suspend: "0" };
      let r = right[i] ? right[i] : { title: " ", value: " ", suspend: "0" };
      result.push([l, r]);
    }
    tosend = result;
  }
  return tosend;
};

export const alternativeGameTotal2 = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_game_total_2"
  );
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
      var obj = grouped_by_name[line];
      var over_obj = findObjectByHeader(obj, "Over");
      var under_obj = findObjectByHeader(obj, "Under");
      var _title = {
        id: 0,
        title: line,
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
        participant_header: over_obj.header ?? "",
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
        participant_header: under_obj.header ?? "",
      };
      row.push(_title, _over, _under);
      tosend.push(row);
    }
  }
  return tosend;
};

export const resultAndBothTeamsToScoreXPoints = (data: any) => {
  var match =
    data?.odds?.main_props?.sp["result_and_both_teams_to_score_'x'_points"]
      ?.odds;
  const odd_id =
    data?.odds?.main_props?.sp["result_and_both_teams_to_score_'x'_points"]?.id;
  const odd_name =
    data?.odds?.main_props?.sp["result_and_both_teams_to_score_'x'_points"]
      ?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;

  const grouped_by_name = get_objects_grouped_by_name(match);
  if (match && match.length > 0) {
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
          participant_header: obj.header ?? "",
        });
      }
      tosend.push(row);
    }

    // tosend.push(arr);
  }

  return tosend;
};

export const doubleResult = (data: any) => {
  const match = data?.odds?.main_props?.sp["double_result"]?.odds;
  const odd_id = data?.odds?.main_props?.sp["double_result"]?.id;
  const odd_name = data?.odds?.main_props?.sp["double_result"]?.name;
  if (!match) {
    return [];
  }
  let tosend = [] as any;

  let constructed_data = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      constructed_data.push({
        id: mm.id,
        title: mm.name,
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
    const splitted_array = splitArrayIntoChunks(constructed_data, 3);

    for (let i = 0; i < splitted_array.length; i++) {
      tosend.push(splitted_array[i]);
    }
  }

  return tosend;
};
export const matchResultAndTotal = (data: any) => {
  const match = data?.odds?.main_props?.sp["match_result_and_total"]?.odds;
  const odd_id = data?.odds?.main_props?.sp["match_result_and_total"]?.id;
  const odd_name = data?.odds?.main_props?.sp["match_result_and_total"]?.name;
  if (!match) {
    return [];
  }
  let tosend = [] as any;

  let constructed_data = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      constructed_data.push({
        id: mm.id,
        title: mm.handicap,
        value: mm.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: mm.id,
        participant_name: mm.name ?? "",
        participant_handicap: mm.handicap ?? "",
        participant_header: mm.header ?? "",
      });
    }
    const splitted_array = splitArrayIntoChunks(constructed_data, 4);

    for (let i = 0; i < splitted_array.length; i++) {
      tosend.push(splitted_array[i]);
    }
  }

  return tosend;
};
export const matchHandicapAndTotal = (data: any) => {
  const match = data?.odds?.main_props?.sp["match_handicap_and_total"]?.odds;
  const odd_id = data?.odds?.main_props?.sp["match_handicap_and_total"]?.id;
  const odd_name = data?.odds?.main_props?.sp["match_handicap_and_total"]?.name;
  if (!match) {
    return [];
  }
  let tosend = [] as any;

  let constructed_data = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      constructed_data.push({
        id: mm.id,
        title: mm.name,
        value: mm.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: mm.id,
        participant_name: mm.name ?? "",
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

export const winningMargin = (data: any) => {
  const match = data?.odds?.main_props?.sp["winning_margin"]?.odds;
  const odd_id = data?.odds?.main_props?.sp["winning_margin"]?.id;
  const odd_name = data?.odds?.main_props?.sp["winning_margin"]?.name;
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
          participant_header: obj.header ?? "",
        });
      }
      tosend.push(row);
    }
  }
  return tosend;
};
export const winningMargin3Way = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "winning_margin_3_way"
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match.odds;
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
          participant_header: obj.header ?? "",
        });
      }
      tosend.push(row);
    }
  }
  return tosend;
};

export const winningMargin7Way = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "winning_margin_7_way"
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match.odds;
  let tosend = [] as any;

  let constructed_data = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      constructed_data.push({
        id: mm.id,
        title: mm.name,
        value: mm.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: mm.id,
        participant_name: mm.name ?? "",
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
};

export const winningMargin12Way = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "winning_margin_12_way"
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match.odds;
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
          participant_header: obj.header ?? "",
        });
      }
      tosend.push(row);
    }
  }
  return tosend;
};
export const raceTo20Points = (data: any) => {
  const match = data?.odds?.main_props?.sp["race_to_20_points"]?.odds;
  const odd_id = data?.odds?.main_props?.sp["race_to_20_points"]?.id;
  const odd_name = data?.odds?.main_props?.sp["race_to_20_points"]?.name;
  if (!match) {
    return [];
  }
  let tosend = [] as any;

  let constructed_data = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      constructed_data.push({
        id: mm.id,
        title:
          mm.name == "1"
            ? data?.localteam.name
            : mm.name == "2"
            ? data?.visitorteam.name
            : mm.name,
        value: mm.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: mm.id,
        participant_name: mm.name ?? "",
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

export const tiedAtEndOfRegulations = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "tied_at_end_of_regulation?"
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match.odds;
  let tosend = [] as any;

  let constructed_data = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      constructed_data.push({
        id: mm.id,
        title: mm.name,
        value: mm.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: mm.id,
        participant_name: mm.name ?? "",
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

export const quarterCorrectScore = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "quarter_correct_score"
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match.odds;
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
          participant_header: obj.header ?? "",
        });
      }
      tosend.push(row);
    }
  }
  return tosend;
};

export const highestScoringHalf = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "highest_scoring_half"
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match.odds;
  let tosend = [] as any;

  let constructed_data = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      constructed_data.push({
        id: mm.id,
        title:
          mm.name == "1"
            ? data?.localteam.name
            : mm.name == "2"
            ? data?.visitorteam.name
            : mm.name,
        value: mm.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: mm.id,
        participant_name: mm.name ?? "",
        participant_handicap: mm.handicap ?? "",
        participant_header: mm.header ?? "",
      });
    }
    const splitted_array = splitArrayIntoChunks(constructed_data, 3);

    for (let i = 0; i < splitted_array.length; i++) {
      tosend.push(splitted_array[i]);
    }
  }

  return tosend;
};
export const highestScoringQuarter = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "highest_scoring_quarter"
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match.odds;
  let tosend = [] as any;

  let constructed_data = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      constructed_data.push({
        id: mm.id,
        title:
          mm.name == "1"
            ? data?.localteam.name
            : mm.name == "2"
            ? data?.visitorteam.name
            : mm.name,
        value: mm.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: mm.id,
        participant_name: mm.name ?? "",
        participant_handicap: mm.handicap ?? "",
        participant_header: mm.header ?? "",
      });
    }
    constructed_data.push({});
    const splitted_array = splitArrayIntoChunks(constructed_data, 3);

    for (let i = 0; i < splitted_array.length; i++) {
      tosend.push(splitted_array[i]);
    }
  }

  return tosend;
};
export const gameTotalBands8Way = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "game_total_(bands)_8_way"
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match.odds;
  let tosend = [] as any;

  let constructed_data = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      constructed_data.push({
        id: mm.id,
        title:
          mm.name == "1"
            ? data?.localteam.name
            : mm.name == "2"
            ? data?.visitorteam.name
            : mm.name,
        value: mm.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: mm.id,
        participant_name: mm.name ?? "",
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
};
export const gameTotalBands3Way = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "game_total_(bands)_3_way"
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match.odds;
  let tosend = [] as any;

  let constructed_data = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      constructed_data.push({
        id: mm.id,
        title:
          mm.name == "1"
            ? data?.localteam.name
            : mm.name == "2"
            ? data?.visitorteam.name
            : mm.name,
        value: mm.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: mm.id,
        participant_name: mm.name ?? "",
        participant_handicap: mm.handicap ?? "",
        participant_header: mm.header ?? "",
      });
    }
    const splitted_array = splitArrayIntoChunks(constructed_data, 3);

    for (let i = 0; i < splitted_array.length; i++) {
      tosend.push(splitted_array[i]);
    }
  }

  return tosend;
};

export const gameTotalOddEven = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "game_total_odd_even"
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;
  const tosend = [] as any;
  if (match && match.length > 0) {
    const arr = [] as any;
    for (let obj of match) {
      arr.push({
        title: obj.name,
        value: obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: obj.id,
        participant_name: obj.name ?? "",
        participant_handicap: obj.handicap ?? "",
        participant_header: obj.header ?? "",
      });
    }
    tosend.push(arr);
  }
  return tosend;
};
