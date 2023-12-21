"use client";

const find_in_array_by_sp_name = (arr: any, target_string: any) => {
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
export const gameLines = (data: any) => {
  console.log({ bagdat: data });
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
      };
      arr.push(_obj);
    });
    tosend.push(arr);
    console.log({ kardash: grouped_by_name });

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
    console.log({ kardash: grouped_by_name });
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
    console.log({ kardash: grouped_by_name });
  }

  return tosend;
};

export const firsthalf = (data: any) => {
  console.log({ bagdat: data });
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
      };
      arr.push(_obj);
    });
    tosend.push(arr);
    console.log({ kardash: grouped_by_name });

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
    console.log({ kardash: grouped_by_name });
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
    console.log({ kardash: grouped_by_name });
  }

  return tosend;
};

export const firstQ = (data: any) => {
  console.log({ bagdat: data });
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
      };
      arr.push(_obj);
    });
    tosend.push(arr);
    console.log({ kardash: grouped_by_name });

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
    console.log({ kardash: grouped_by_name });
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
    console.log({ kardash: grouped_by_name });
  }

  return tosend;
};

export const secondQ = (data: any) => {
  console.log({ bagdat: data });
  var match = find_in_array_by_sp_name(data?.odds?.others, "2nd_quarter");
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
      };
      arr.push(_obj);
    });
    tosend.push(arr);
    console.log({ kardash: grouped_by_name });

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
    console.log({ kardash: grouped_by_name });
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
    console.log({ kardash: grouped_by_name });
  }

  return tosend;
};

export const thirdQ = (data: any) => {
  console.log({ bagdat: data });
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
      };
      arr.push(_obj);
    });
    tosend.push(arr);
    console.log({ kardash: grouped_by_name });

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
    console.log({ kardash: grouped_by_name });
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
    console.log({ kardash: grouped_by_name });
  }

  return tosend;
};

export const fourthQ = (data: any) => {
  console.log({ bagdat: data });
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
      };
      arr.push(_obj);
    });
    tosend.push(arr);
    console.log({ kardash: grouped_by_name });

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
    console.log({ kardash: grouped_by_name });
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
    console.log({ kardash: grouped_by_name });
  }

  return tosend;
};

export const gameLines3Way = (data: any) => {
  console.log({ bagdat: data });
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

    console.log({ home: home_obj, tie: tie_obj, away: away_obj });
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
    };
    arr.push(_home);
    arr.push(_tie);
    arr.push(_away);
    tosend.push(arr);

    // tosend = [_title_obj, _home, _tie, _away];
    // tosend.push(_title_obj);
    // tosend.push(_home);
    // tosend.push(_tie);
    // tosend.push(_away);
    // tosend.push(arr);
  }

  return tosend;
};
