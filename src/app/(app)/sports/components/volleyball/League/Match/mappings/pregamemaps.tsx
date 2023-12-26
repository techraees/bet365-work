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
  const match = data?.odds?.main?.sp["game_lines"]?.odds;
  const odd_id = data?.odds?.main?.sp["game_lines"]?.id;
  const odd_name = data?.odds?.main?.sp["game_lines"]?.name;
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
export const correctSetScore = (data: any) => {
  const match = data?.odds?.main?.sp["correct_set_score"]?.odds;
  const odd_id = data?.odds?.main?.sp["correct_set_score"]?.id;
  const odd_name = data?.odds?.main?.sp["correct_set_score"]?.name;
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


export const matchTotalOddEven = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "match_total_odd_even");
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

export const firstSetLine = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "1st_set_lines");
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

export const firstSetToGoToExtraPoints = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "1st_set_to_go_to_extra_points");
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


export const firstSetTotalOddEven = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "1st_set_total_odd_even");
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
