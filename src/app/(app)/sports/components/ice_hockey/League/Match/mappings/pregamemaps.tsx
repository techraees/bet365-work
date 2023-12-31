"use client";

const find_in_array_by_sp_name = (arr: any, target_string: any) => {
  if (!arr) {
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



export const gameLines = (data: any) => {
  var match = data?.odds?.main?.sp?.game_lines?.odds;
  const odd_id = data?.odds?.main?.sp?.game_lines?.id;
  const odd_name = data?.odds?.main?.sp?.game_lines?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  const row = [] as any;
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
          participant_header: obj.header ?? "",
        });
      }
      tosend.push(row);
    }
  }
  return tosend;
};
export const threeWay = (data: any) => {
  var match = data?.odds?.main?.sp['3_way']?.odds;
  const odd_id = data?.odds?.main?.sp['3_way']?.id;
  const odd_name = data?.odds?.main?.sp['3_way']?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  const row = [] as any;
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
          participant_header: obj.header ?? "",
        });
      }
      tosend.push(row);
    }
  }
  return tosend;
};

export const alternativePuckLine2Way = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_puck_line_2_way"
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


export const alternativeTotal2Way = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_total_2_way"
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

export const alternativePuckLine3Way = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_puck_line_3_way"
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
    const middle = [] as any;
    const groupedByHeader = get_objects_grouped_by_header(match);
    var home = groupedByHeader["1"];
    var away = groupedByHeader["2"];
    var tie = groupedByHeader["Tie"];
    for (var home_obj of home) {
      var obj = {
        id: home_obj.id,
        title: home_obj.handicap,
        value: home_obj.odds,
        suspend: home_obj.SU,

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
    for (var tie_obj of tie) {
      var obj = {
        id: tie_obj.id,
        title: tie_obj.handicap,
        value: tie_obj.odds,
        suspend: home_obj.SU,

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: tie_obj.id,
        participant_name: tie_obj.name ?? "",
        participant_handicap: tie_obj.handicap ?? "",
        participant_header: tie_obj.header ?? "",
      };
      middle.push(obj);
    }

    for (var away_obj of away) {
      var obj = {
        id: away_obj.id,
        title: away_obj.handicap,
        value: away_obj.odds,
        suspend: home_obj.SU,

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
    if (middle.length > maxlength) {
      maxlength = middle.length;
    }

    for (let i = 0; i < maxlength; i++) {
      let l = left[i] ? left[i] : { title: " ", value: " ", suspend: "0" };
      let r = right[i] ? right[i] : { title: " ", value: " ", suspend: "0" };
      let m = middle[i] ? middle[i] : { title: " ", value: " ", suspend: "0" };
      result.push([l,m, r]);
    }
    tosend = result;
  }
  return tosend;
};


export const alternativeTotal3Way = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_total_3_way"
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
          suspend: mm.SU,

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