"use client";
import React from "react";

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

const get_objects_grouped_by_name = (odds_array: any) => {
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

const get_objects_grouped_by_header = (odds_array: any) => {
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

const get_objects_grouped_by_handicap = (odds_array: any) => {
  const groupedData = odds_array.reduce((acc: any, item: any) => {
    const key = item.handicap;

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

function findObjectByHeader(data: any, headerToFind: any) {
  return data.find((item: any) => item.header === headerToFind);
}

function findObjectByName(data: any, nameToFind: any) {
  return data.find((item: any) => item.name === nameToFind);
}

export const fulltimeResult = (data: any) => {
  const match = data?.odds?.main?.sp?.full_time_result?.odds;
  const odd_id = data?.odds?.main?.sp?.full_time_result?.id;
  const odd_name = data?.odds?.main?.sp?.full_time_result?.name;
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
        game: "soccer",
        bet_type: "Pregame",
      });
    }

    if (match[1].name === "Draw") {
      let title = "Draw";
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
        participant_id: match[1].id,
        participant_name: title,
        participant_handicap: match[1].handicap ?? "",
        participant_header: match[1].header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      });
    }

    if (match[2].name === "2") {
      let title = data?.visitorteam?.name;
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
        participant_id: match[2].id,
        participant_name: title,
        participant_handicap: match[2].handicap ?? "",
        participant_header: match[2].header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      });
    }
    tosend.push(arr);
  }
  return tosend;
};

export const doubleChance = (data: any) => {
  const match = data?.odds?.main?.sp?.double_chance?.odds;
  const odd_id = data?.odds?.main?.sp?.double_chance?.id;
  const odd_name = data?.odds?.main?.sp?.double_chance?.name;
  if (!match) {
    return [];
  }

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
          game: "soccer",
          bet_type: "Pregame",
        };
        arr.push(obj);
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const goalsOverUnderOV = (data: any) => {
  const match = data?.odds?.main?.sp?.goals_over_under?.odds;
  const odd_id = data?.odds?.main?.sp?.goals_over_under?.id;
  const odd_name = data?.odds?.main?.sp?.goals_over_under?.name;
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  if (match) {
    var groupedData = get_objects_grouped_by_name(match);
    for (var handicap in groupedData) {
      var arr = [] as any;
      var objects_array = groupedData[handicap];
      var over_obj = findObjectByHeader(objects_array, "Over");
      var under_obj = findObjectByHeader(objects_array, "Under");

      var _title = {
        title: handicap,
        value: "",
        suspend: "1",
      };
      var _over = {
        title: "",
        value: over_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: over_obj.id,
        participant_name: over_obj.name,
        participant_handicap: handicap,
        participant_header: over_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };

      var _under = {
        title: "",
        value: under_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: over_obj.id,
        participant_name: over_obj.name,
        participant_handicap: over_obj.handicap,
        participant_header: over_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };
      arr.push(_title, _over, _under);
      tosend.push(arr);
    }
  }
  return tosend;
};

export const resultBothTeamsToScore = (data: any) => {
  const match = data?.odds?.main?.sp?.result_both_teams_to_score?.odds;
  const odd_id = data?.odds?.main?.sp?.result_both_teams_to_score?.id;
  const odd_name = data?.odds?.main?.sp?.result_both_teams_to_score?.name;
  if (!match) {
    return [];
  }

  let tosend = [] as any;

  if (match) {
    const grouped = get_objects_grouped_by_name(match);
    var arr_home = [] as any;
    var arr_away = [] as any;
    var arr_draw = [] as any;

    var title_home_obj = {
      title: data?.localteam?.name,
      value: "",
      suspend: "1",
    };
    var home_obj_yes = {
      title: "",
      value: grouped["1"][0].odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: grouped["1"][0].id,
      participant_name: grouped["1"][0].name,
      participant_handicap: grouped["1"][0].handicap ?? "",
      participant_header: grouped["1"][0].header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };

    var home_obj_no = {
      title: "",
      value: grouped["1"][1].odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: grouped["1"][1].id,
      participant_name: grouped["1"][1].name,
      participant_handicap: grouped["1"][1].handicap ?? "",
      participant_header: grouped["1"][1].header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };

    var title_away_obj = {
      title: data?.visitorteam?.name,
      value: "",
      suspend: "1",
    };
    var away_obj_yes = {
      title: "",
      value: grouped["2"][0].odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: grouped["2"][0].id,
      participant_name: grouped["2"][0].name,
      participant_handicap: grouped["1"][1].handicap ?? "",
      participant_header: grouped["1"][1].header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };

    var away_obj_no = {
      title: "",
      value: grouped["2"][1].odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: grouped["2"][1].id,
      participant_name: grouped["2"][1].name,
      participant_handicap: grouped["2"][1].handicap ?? "",
      participant_header: grouped["2"][1].header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };

    var title_draw_obj = {
      title: "Draw",
      value: "",
      suspend: "1",
    };
    var draw_obj_yes = {
      title: "",
      value: grouped["Draw"][0].odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: grouped["Draw"][0].id,
      participant_name: grouped["Draw"][0].name ?? "",
      participant_handicap: grouped["Draw"][0].handicap ?? "",
      participant_header: grouped["Draw"][0].header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };

    var draw_obj_no = {
      title: "",
      value: grouped["2"][1].odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: grouped["Draw"][1].id,
      participant_name: grouped["Draw"][1].name ?? "",
      participant_handicap: grouped["Draw"][1].handicap ?? "",
      participant_header: grouped["Draw"][1].header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };
    arr_home.push(title_home_obj, home_obj_yes, home_obj_no);
    arr_away.push(title_away_obj, away_obj_yes, away_obj_no);
    arr_draw.push(title_draw_obj, draw_obj_yes, draw_obj_no);
    tosend.push(arr_home, arr_away, arr_draw);
  }

  return tosend;
};

export const bothTeamsToScore = (data: any) => {
  const match = data?.odds?.main?.sp?.both_teams_to_score?.odds;
  const odd_id = data?.odds?.main?.sp?.both_teams_to_score?.id;
  const odd_name = data?.odds?.main?.sp?.both_teams_to_score?.name;
  if (!match) {
    return [];
  }

  let tosend = [] as any;
  if (match && match.length > 0) {
    var arr = [] as any;
    var yes_obj = findObjectByName(match, "Yes");
    var no_obj = findObjectByName(match, "No");

    var _yes = {
      title: yes_obj.name,
      value: yes_obj.odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: yes_obj.id,
      participant_name: yes_obj.name,
      participant_handicap: yes_obj.handicap ?? "",
      participant_header: yes_obj.header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };

    var _no = {
      title: no_obj.name,
      value: no_obj.odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: no_obj.id,
      participant_name: no_obj.name,
      participant_handicap: no_obj.handicap ?? "",
      participant_header: no_obj.header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };
    arr.push(_yes);
    arr.push(_no);
    tosend.push(arr);
  }
  return tosend;
};

export const teamsToScore = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "teams_to_score");
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
        game: "soccer",
        bet_type: "Pregame",
      });
    }
    const splitted_array = splitArrayIntoChunks(constructed_data, 2);

    for (let i = 0; i < splitted_array.length; i++) {
      tosend.push(splitted_array[i]);
    }
  }

  return tosend;
};

export const correctScore = (data: any) => {
  const match = data?.odds?.main?.sp?.correct_score?.odds;
  const odd_id = data?.odds?.main?.sp?.correct_score?.id;
  const odd_name = data?.odds?.main?.sp?.correct_score?.name;
  if (!match) {
    return [];
  }

  let tosend = [] as any;
  if (match && match.length > 0) {
    const result = [] as any;
    const left = [] as any;
    const middle = [] as any;
    const right = [] as any;
    const groupedByHeader = get_objects_grouped_by_header(match);
    var home_scores = groupedByHeader["1"];
    var draw_scores = groupedByHeader["Draw"];
    var away_scores = groupedByHeader["2"];
    for (var home_score_obj of home_scores) {
      var obj = {
        id: home_score_obj.id,
        title: home_score_obj.name,
        value: home_score_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: home_score_obj.id,
        participant_name: home_score_obj.name,
        participant_handicap: home_score_obj.handicap ?? "",
        participant_header: home_score_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };
      left.push(obj);
    }

    for (var away_score_obj of away_scores) {
      var obj = {
        id: away_score_obj.id,
        title: away_score_obj.name,
        value: away_score_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: away_score_obj.id,
        participant_name: away_score_obj.name,
        participant_handicap: away_score_obj.handicap ?? "",
        participant_header: away_score_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };
      right.push(obj);
    }

    for (var draw_score_obj of draw_scores) {
      var obj = {
        id: draw_score_obj.id,
        title: draw_score_obj.name,
        value: draw_score_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: draw_score_obj.id,
        participant_name: draw_score_obj.name,
        participant_handicap: draw_score_obj.handicap ?? "",
        participant_header: draw_score_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };
      middle.push(obj);
    }
    let maxlength = left.length;
    if (middle.length > maxlength) {
      maxlength = middle.length;
    }
    if (right.length > maxlength) {
      maxlength = right.length;
    }

    for (let i = 0; i < maxlength; i++) {
      let l = left[i] ? left[i] : { title: " ", value: " ", suspend: "0" };
      let m = middle[i] ? middle[i] : { title: " ", value: " ", suspend: "0" };
      let r = right[i] ? right[i] : { title: " ", value: " ", suspend: "0" };
      result.push([l, m, r]);
    }
    tosend = result;
  }
  return tosend;
};

function splitArrayIntoChunks(array: any, chunkSize: any) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export const halfTimeFullTime = (data: any) => {
  const match = data?.odds?.main?.sp?.half_time_full_time?.odds;
  const odd_id = data?.odds?.main?.sp?.half_time_full_time?.id;
  const odd_name = data?.odds?.main?.sp?.half_time_full_time?.name;
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
        game: "soccer",
        bet_type: "Pregame",
      });
    }
    const splitted_array = splitArrayIntoChunks(constructed_data, 3);

    for (let i = 0; i < splitted_array.length; i++) {
      tosend.push(splitted_array[i]);
    }
  }

  return tosend;
};

export const halftimeFulltimeCorrectScore = (data: any) => {
  const match = data?.odds?.main?.sp?.half_time_full_time_correct_score?.odds;
  const odd_id = data?.odds?.main?.sp?.half_time_full_time_correct_score?.id;
  const odd_name =
    data?.odds?.main?.sp?.half_time_full_time_correct_score?.name;
  if (!match) {
    return [];
  }

  let tosend = [] as any;
  if (match && match.length > 0) {
    const result = [] as any;
    const left = [] as any;
    const middle = [] as any;
    const right = [] as any;
    const groupedByHeader = get_objects_grouped_by_header(match);
    var home_scores = groupedByHeader["1"];
    var draw_scores = groupedByHeader["Draw"];
    var away_scores = groupedByHeader["2"];
    for (var home_score_obj of home_scores) {
      var obj = {
        id: home_score_obj.id,
        title: home_score_obj.name,
        value: home_score_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: home_score_obj.id,
        participant_name: home_score_obj.name,
        participant_handicap: home_score_obj.handicap ?? "",
        participant_header: home_score_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };
      left.push(obj);
    }

    for (var away_score_obj of away_scores) {
      var obj = {
        id: away_score_obj.id,
        title: away_score_obj.name,
        value: away_score_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: away_score_obj.id,
        participant_name: away_score_obj.name,
        participant_handicap: away_score_obj.handicap ?? "",
        participant_header: away_score_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };
      right.push(obj);
    }

    for (var draw_score_obj of draw_scores) {
      var obj = {
        id: draw_score_obj.id,
        title: draw_score_obj.name,
        value: draw_score_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: draw_score_obj.id,
        participant_name: draw_score_obj.name,
        participant_handicap: draw_score_obj.handicap ?? "",
        participant_header: draw_score_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };
      middle.push(obj);
    }
    let maxlength = left.length;
    if (middle.length > maxlength) {
      maxlength = middle.length;
    }
    if (right.length > maxlength) {
      maxlength = right.length;
    }

    for (let i = 0; i < maxlength; i++) {
      let l = left[i] ? left[i] : { title: " ", value: " ", suspend: "0" };
      let m = middle[i] ? middle[i] : { title: " ", value: " ", suspend: "0" };
      let r = right[i] ? right[i] : { title: " ", value: " ", suspend: "0" };
      result.push([l, m, r]);
    }
    tosend = result;
  }
  return tosend;
};

export const asianHandicap = (data: any) => {
  const match = data?.odds?.main?.sp?.asian_handicap?.odds;
  const odd_id = data?.odds?.main?.sp?.asian_handicap?.id;
  const odd_name = data?.odds?.main?.sp?.asian_handicap?.name;
  if (!match) {
    return [];
  }

  let tosend = [] as any;

  if (match && match.length > 0) {
    var home_obj = findObjectByHeader(match, "1");
    var away_obj = findObjectByHeader(match, "2");
    var _home = {
      id: home_obj.id,
      title: home_obj.handicap,
      suspend: "0",
      value: home_obj.odds,

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: home_obj.id,
      participant_name: home_obj.handicap,
      participant_handicap: home_obj.handicap ?? "",
      participant_header: home_obj.header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };

    var _away = {
      id: away_obj.id,
      title: away_obj.handicap,
      suspend: "0",
      value: away_obj.odds,

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: away_obj.id,
      participant_name: away_obj.handicap,
      participant_handicap: away_obj.handicap ?? "",
      participant_header: away_obj.header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };
    tosend.push([_home, _away]);
  }

  // tosend.sort((a: any, b: any) => parseInt(a[0].title) - parseInt(b[0].title));
  return tosend;
};

export const goalLine = (data: any) => {
  const match = data?.odds?.main?.sp?.goal_line?.odds;
  const odd_id = data?.odds?.main?.sp?.goal_line?.id;
  const odd_name = data?.odds?.main?.sp?.goal_line?.name;
  if (!match) {
    return [];
  }

  const tosend = [] as any;
  if (match && match.length > 0) {
    var grouped_by_name = get_objects_grouped_by_name(match);
    for (var group in grouped_by_name) {
      var group_obj = grouped_by_name[group];
      var over_obj = findObjectByHeader(group_obj, "Over");
      var under_obj = findObjectByHeader(group_obj, "Under");

      var _title = {
        title: group,
        suspend: "1",
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
        game: "soccer",
        bet_type: "Pregame",
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
        participant_name: under_obj.group,
        participant_handicap: under_obj.handicap ?? "",
        participant_header: under_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };
      tosend.push([_title, _over, _under]);
    }
  }
  return tosend;
};

export const drawNoBet = (data: any) => {
  const match = data?.odds?.main?.sp?.draw_no_bet?.odds;
  const odd_id = data?.odds?.main?.sp?.draw_no_bet?.id;
  const odd_name = data?.odds?.main?.sp?.draw_no_bet?.name;
  if (!match) {
    return [];
  }

  const tosend = [] as any;
  if (match && match.length > 0) {
    var home_obj = findObjectByName(match, "1");
    var away_obj = findObjectByName(match, "2");
    var _home = {
      id: home_obj.id,
      title: data?.localteam?.name,
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
      game: "soccer",
      bet_type: "Pregame",
    };

    var _away = {
      id: away_obj.id,
      title: data?.visitorteam?.name,
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
      game: "soccer",
      bet_type: "Pregame",
    };

    tosend.push([_home, _away]);
  }
  return tosend;
};

export const handicapResult = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "handicap_result");
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;

  const tosend = [] as any;
  if (match && match.length > 0) {
    var home_obj = findObjectByHeader(match, "1");
    var away_obj = findObjectByHeader(match, "2");
    var tie_obj = findObjectByHeader(match, "Tie");
    var _home = {
      id: home_obj.id,
      title: data?.localteam?.name,
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
      game: "soccer",
      bet_type: "Pregame",
    };

    var _away = {
      id: away_obj.id,
      title: data?.visitorteam?.name,
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
      game: "soccer",
      bet_type: "Pregame",
    };

    var _tie = {
      id: tie_obj.id,
      title: data?.visitorteam?.name,
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
      game: "soccer",
      bet_type: "Pregame",
    };

    tosend.push([_home, _tie, _away]);
  }
  return tosend;
};

export const totalCorners3Way = (data: any) => {
  const match = data?.odds?.main?.sp?.corners?.odds;
  const odd_id = data?.odds?.main?.sp?.corners?.id;
  const odd_name = data?.odds?.main?.sp?.corners?.name;
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;

  if (match && match.length > 0) {
    var grouped_by_name = get_objects_grouped_by_name(match);
    for (var corner_line in grouped_by_name) {
      var obj = grouped_by_name[corner_line];
      const over = findObjectByHeader(obj, "Over");
      const exactly = findObjectByHeader(obj, "Exactly");
      const under = findObjectByHeader(obj, "Under");
      var title_obj = {
        id: "",
        title: corner_line,
        value: "",
        suspend: "1",
      };

      var over_obj = {
        id: over.id,
        title: "",
        value: over.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: over.id,
        participant_name: over.name,
        participant_handicap: over.handicap ?? "",
        participant_header: over.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };

      var under_obj = {
        id: under.id,
        title: "",
        value: under.odds,
        suspend: "0",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: under.id,
        participant_name: under.name,
        participant_handicap: under.handicap ?? "",
        participant_header: under.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };

      var exactly_obj = {
        id: exactly.id,
        title: "",
        value: exactly.odds,
        suspend: "0",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: exactly.id,
        participant_name: exactly.name,
        participant_handicap: exactly.handicap ?? "",
        participant_header: exactly.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };
      tosend.push([title_obj, over_obj, exactly_obj, under_obj]);
    }
  }
  return tosend;
};

export const alternativeAsianHandicap = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_asian_handicap",
  );
  const odd_id = match?.id;
  const odd_name = match?.name;
  if (!match) {
    return [];
  }

  match = match.odds;
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_header = get_objects_grouped_by_header(match);
    var home_array = grouped_by_header["1"];
    var away_array = grouped_by_header["2"];

    for (let i = 0; i < home_array.length; i++) {
      var home_obj = home_array[i];
      var away_obj = away_array[i];
      var _home = {
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
        game: "soccer",
        bet_type: "Pregame",
      };

      var _away = {
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
        game: "soccer",
        bet_type: "Pregame",
      };
      var arr = [_home, _away];
      tosend.push(arr);
    }
  }
  return tosend;
};

export const alternativeHandicapResult = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_handicap_result",
  );
  const odd_id = match?.id;
  const odd_name = match?.name;
  if (!match) {
    return [];
  }

  match = match.odds;
  const tosend = [] as any;
  if (match && match.length > 0) {
    var grouped_by_handicap = get_objects_grouped_by_header(match);
    for (let i = 0; i < grouped_by_handicap["1"].length; i++) {
      var home_array = grouped_by_handicap["1"];
      var tie_array = grouped_by_handicap["Tie"];
      var away_array = grouped_by_handicap["2"];
      var home_obj = home_array[i];
      var tie_obj = tie_array[i];
      var away_obj = away_array[i];
      var _home = {
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
        game: "soccer",
        bet_type: "Pregame",
      };

      var _away = {
        id: away_obj.id,
        title: away_obj.handicap,
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
        game: "soccer",
        bet_type: "Pregame",
      };

      var _tie = {
        id: tie_obj.id,
        title: tie_obj.handicap,
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
        game: "soccer",
        bet_type: "Pregame",
      };

      tosend.push([_home, _tie, _away]);
    }
  }
  return tosend;
};

export const alternativeGoalLine = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_goal_line",
  );
  const odd_id = match?.id;
  const odd_name = match?.name;
  if (!match) {
    return [];
  }

  match = match.odds;
  const tosend = [] as any;
  if (match && match.length > 0) {
    var grouped_by_name = get_objects_grouped_by_name(match);
    for (var line in grouped_by_name) {
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
        game: "soccer",
        bet_type: "Pregame",
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
        game: "soccer",
        bet_type: "Pregame",
      };

      tosend.push([_title, _over, _under]);
      // tosend.push([_home, _tie, _away]);
    }
  }
  return tosend;
};

export const minuteResult = (data: any) => {
  const match = data?.odds?.minutes?.sp["10_minute_result"]?.odds;
  const odd_id = data?.odds?.minutes?.sp["10_minute_result"]?.id;
  const odd_name = data?.odds?.minutes?.sp["10_minute_result"]?.name;
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
        participant_name: match[0].name ?? "",
        participant_handicap: match[0].handicap ?? "",
        participant_header: match[0].header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      });
    }

    if (match[1].name === "Draw") {
      let title = "Draw";
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
        participant_id: match[1].id,
        participant_name: match[1].name ?? "",
        participant_handicap: match[1].handicap ?? "",
        participant_header: match[1].header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      });
    }

    if (match[2].name === "2") {
      let title = data?.visitorteam?.name;
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
        participant_id: match[2].id,
        participant_name: match[2].name ?? "",
        participant_handicap: match[2].handicap ?? "",
        participant_header: match[2].header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      });
    }
    tosend.push(arr);
  }
  return tosend;
};

export const toScoreaPenalty = (data: any) => {
  const match = data?.odds?.specials?.sp?.to_score_a_penalty?.odds;
  const odd_id = data?.odds?.specials?.sp?.to_score_a_penalty?.id;
  const odd_name = data?.odds?.specials?.sp?.to_score_a_penalty?.name;
  if (!match) {
    return [];
  }

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
          game: "soccer",
          bet_type: "Pregame",
        };
        arr.push(obj);
      });
      tosend.push(arr);
    }
  }
  return tosend;
};
export const toMissaPenalty = (data: any) => {
  const match = data?.odds?.specials?.sp?.to_miss_a_penalty?.odds;
  const odd_id = data?.odds?.specials?.sp?.to_miss_a_penalty?.id;
  const odd_name = data?.odds?.specials?.sp?.to_miss_a_penalty?.name;
  if (!match) {
    return [];
  }

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
          game: "soccer",
          bet_type: "Pregame",
        };
        arr.push(obj);
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const ownGoal = (data: any) => {
  let match = data?.odds?.specials?.sp?.own_goal?.odds;
  let odd_id = data?.odds?.specials?.sp?.own_goal?.id;
  let odd_name = data?.odds?.specials?.sp?.own_goal?.name;
  if (!match) {
    return [];
  }

  let tosend = [] as any;
  if (match && match.length > 0) {
    var arr = [] as any;
    var yes_obj = findObjectByName(match, "Yes");
    var no_obj = findObjectByName(match, "No");

    var _yes = {
      title: yes_obj.name,
      value: yes_obj.odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: yes_obj.id,
      participant_name: yes_obj.name,
      participant_handicap: yes_obj.handicap ?? "",
      participant_header: yes_obj.header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };

    var _no = {
      title: no_obj.name,
      value: no_obj.odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: no_obj.id,
      participant_name: no_obj.name,
      participant_handicap: no_obj.handicap ?? "",
      participant_header: no_obj.header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };
    arr.push(_yes);
    arr.push(_no);
    tosend.push(arr);
  }
  return tosend;
};

export const firstHalfAsianHandicap = (data: any) => {
  const match = data?.odds?.asian_lines?.sp["1st_half_asian_handicap"].odds;
  const odd_id = data?.odds?.asian_lines?.sp["1st_half_asian_handicap"].id;
  const odd_name = data?.odds?.asian_lines?.sp["1st_half_asian_handicap"].name;
  if (!match) {
    return [];
  }

  let tosend = [] as any;

  if (match && match.length > 0) {
    var home_obj = findObjectByHeader(match, "1");
    var away_obj = findObjectByHeader(match, "2");
    var _home = {
      id: home_obj.id,
      title: home_obj.handicap,
      suspend: "0",
      value: home_obj.odds,

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: home_obj.id,
      participant_name: home_obj.name ?? "",
      participant_handicap: home_obj.handicap ?? "",
      participant_header: home_obj.header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };

    var _away = {
      id: away_obj.id,
      title: away_obj.handicap,
      suspend: "0",
      value: away_obj.odds,

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: away_obj.id,
      participant_name: away_obj.name ?? "",
      participant_handicap: away_obj.handicap ?? "",
      participant_header: away_obj.header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };
    tosend.push([_home, _away]);
  }

  // tosend.sort((a: any, b: any) => parseInt(a[0].title) - parseInt(b[0].title));
  return tosend;
};

export const alternativeFirstHalfAsianHandicap = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_1st_half_asian_handicap",
  );
  if (match === undefined) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  if (!match) {
    return [];
  }

  match = match.odds;
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_header = get_objects_grouped_by_header(match);
    var home_array = grouped_by_header["1"];
    var away_array = grouped_by_header["2"];

    for (let i = 0; i < home_array.length; i++) {
      var home_obj = home_array[i];
      var away_obj = away_array[i];
      var _home = {
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
        game: "soccer",
        bet_type: "Pregame",
      };

      var _away = {
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
        game: "soccer",
        bet_type: "Pregame",
      };
      var arr = [_home, _away];
      tosend.push(arr);
    }
  }
  return tosend;
};

export const firstHalfGoalLine = (data: any) => {
  const match = data?.odds?.asian_lines?.sp["1st_half_goal_line"].odds;
  const odd_id = data?.odds?.asian_lines?.sp["1st_half_goal_line"].id;
  const odd_name = data?.odds?.asian_lines?.sp["1st_half_goal_line"].name;
  if (!match) {
    return [];
  }

  const tosend = [] as any;
  if (match && match.length > 0) {
    var grouped_by_name = get_objects_grouped_by_name(match);
    for (var group in grouped_by_name) {
      var group_obj = grouped_by_name[group];
      var over_obj = findObjectByHeader(group_obj, "Over");
      var under_obj = findObjectByHeader(group_obj, "Under");

      var _title = {
        title: group,
        suspend: "1",
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
        participant_name: over_obj.name ?? "",
        participant_handicap: over_obj.handicap ?? "",
        participant_header: over_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
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
        participant_name: under_obj.name ?? "",
        participant_handicap: under_obj.handicap ?? "",
        participant_header: under_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };
      tosend.push([_title, _over, _under]);
    }
  }
  return tosend;
};

export const alternativeFirstHalfGoalLine = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_1st_half_goal_line",
  );
  if (match === undefined) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  if (!match) {
    return [];
  }

  match = match.odds;
  const tosend = [] as any;
  if (match && match.length > 0) {
    var grouped_by_name = get_objects_grouped_by_name(match);
    for (var line in grouped_by_name) {
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
        game: "soccer",
        bet_type: "Pregame",
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
        game: "soccer",
        bet_type: "Pregame",
      };

      tosend.push([_title, _over, _under]);
      // tosend.push([_home, _tie, _away]);
    }
  }
  return tosend;
};

export const betteamSpecials = (data: any) => {
  let match = data?.odds?.specials?.sp?.specials?.odds;
  let odd_id = data?.odds?.specials?.sp?.specials?.id;
  let odd_name = data?.odds?.specials?.sp?.specials?.name;
  if (!match) {
    return [];
  }
  let tosend = [] as any;
  if (match && match.length > 0) {
    var grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      let row = [] as any;
      var obj = grouped_by_name[line];
      row.push({
        id: 0,
        title: line,
        suspend: "0",
        value: "",
      });
      for (let item of obj) {
        row.push({
          id: item.id,
          title: "",
          value: item.odds,
          suspend: "0",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: odd_id,
          odd_name: odd_name,
          participant_id: item.id,
          participant_name: item.name,
          participant_handicap: item.handicap ?? "",
          participant_header: item.header ?? "",
          game: "soccer",
          bet_type: "Pregame",
        });
      }
      tosend.push(row);
    }
  }

  return tosend;
};

export const alternativetotalGoals = (data: any) => {
  const match = data?.odds?.goals?.sp?.alternative_total_goals?.odds;
  const odd_id = data?.odds?.goals?.sp?.alternative_total_goals?.id;
  const odd_name = data?.odds?.goals?.sp?.alternative_total_goals?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    var grouped_by_name = get_objects_grouped_by_name(match);
    for (var line in grouped_by_name) {
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
        game: "soccer",
        bet_type: "Pregame",
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
        game: "soccer",
        bet_type: "Pregame",
      };

      tosend.push([_title, _over, _under]);
    }
  }
  return tosend;
};
export const resultTotalGoals = (data: any) => {
  const match = data?.odds?.goals?.sp?.result_total_goals?.odds;
  const odd_id = data?.odds?.goals?.sp?.result_total_goals?.id;
  const odd_name = data?.odds?.goals?.sp?.result_total_goals?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    var grouped_by_name = get_objects_grouped_by_name(match);
    for (var line in grouped_by_name) {
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
        game: "soccer",
        bet_type: "Pregame",
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
        game: "soccer",
        bet_type: "Pregame",
      };

      tosend.push([_title, _over, _under]);
    }
  }
  return tosend;
};

export const totalGoalsBothTeamsToScore = (data: any) => {
  const match = data?.odds?.goals?.sp?.total_goals_both_teams_to_score?.odds;
  const odd_id = data?.odds?.goals?.sp?.total_goals_both_teams_to_score?.id;
  const odd_name = data?.odds?.goals?.sp?.total_goals_both_teams_to_score?.name;
  if (!match) {
    return [];
  }

  const tosend = [] as any;
  if (match && match.length > 0) {
    var over_yes_obj = findObjectByName(match, "Over 2.5 & Yes");
    var over_no_obj = findObjectByName(match, "Over 2.5 & No");
    var under_yes_obj = findObjectByName(match, "Under 2.5 & Yes");
    var under_no_obj = findObjectByName(match, "Under 2.5 & No");
    var _over_yes = {
      id: over_yes_obj.id,
      title: over_yes_obj.name,
      value: over_yes_obj.odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: over_yes_obj.id,
      participant_name: over_yes_obj.name,
      participant_handicap: over_yes_obj.handicap ?? "",
      participant_header: over_yes_obj.header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };
    var _over_no = {
      id: over_no_obj.id,
      title: over_no_obj.name,
      value: over_no_obj.odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: over_no_obj.id,
      participant_name: over_no_obj.name,
      participant_handicap: over_no_obj.handicap ?? "",
      participant_header: over_no_obj.header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };
    var _under_yes = {
      id: under_yes_obj.id,
      title: under_yes_obj.name,
      value: under_yes_obj.odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: under_yes_obj.id,
      participant_name: under_yes_obj.name,
      participant_handicap: under_yes_obj.handicap ?? "",
      participant_header: under_yes_obj.header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };
    var _under_no = {
      id: under_no_obj.id,
      title: under_no_obj.name,
      value: under_no_obj.odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: under_no_obj.id,
      participant_name: under_no_obj.name,
      participant_handicap: under_no_obj.handicap ?? "",
      participant_header: under_no_obj.header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };

    tosend.push([_over_yes, _over_no], [_under_yes, _under_no]);
  }
  return tosend;
};

export const exactTotalGoals = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "exact_total_goals");
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
        title: mm.name,
        value: "",
        suspend: "1",
      });
      constructed_data.push({
        id: mm.id,
        title: "",
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
        game: "soccer",
        bet_type: "Pregame",
      });
    }
    const splitted_array = splitArrayIntoChunks(constructed_data, 4);
    for (let i = 0; i < splitted_array.length; i++) {
      tosend.push(splitted_array[i]);
    }
  }

  return tosend;
};

export const numberOfGoalsInMatch = (data: any) => {
  const match = data?.odds?.goals?.sp?.number_of_goals_in_match?.odds;
  const odd_id = data?.odds?.goals?.sp?.number_of_goals_in_match?.id;
  const odd_name = data?.odds?.goals?.sp?.number_of_goals_in_match?.name;
  if (!match) {
    return [];
  }

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
          game: "soccer",
          bet_type: "Pregame",
        };
        arr.push(obj);
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const goalOddEven = (data: any) => {
  const match = data?.odds?.goals?.sp?.goals_odd_even?.odds;
  const odd_id = data?.odds?.goals?.sp?.goals_odd_even?.id;
  const odd_name = data?.odds?.goals?.sp?.goals_odd_even?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  const row = [] as any;
  if (match && match.length > 0) {
    for (let mm of match) {
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
        game: "soccer",
        bet_type: "Pregame",
      });
    }
  }
  tosend.push(row);
  return tosend;
};
export const teamOddEvenGoals = (data: any, team_name: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "home_team_odd_even_goals",
  );
  if (!match) {
    return [];
  }
  if (team_name == "2") {
    var match = find_in_array_by_sp_name(
      data?.odds?.others,
      "away_team_odd_even_goals",
    );
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;
  const tosend = [] as any;
  const row = [] as any;
  if (match && match.length > 0) {
    for (let mm of match) {
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
        game: "soccer",
        bet_type: "Pregame",
      });
    }
  }
  tosend.push(row);
  return tosend;
};

export const firsthalfgoalOddEven = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "1st_half_goals_odd_even",
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;
  const tosend = [] as any;
  const row = [] as any;
  if (match && match.length > 0) {
    for (let mm of match) {
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
        game: "soccer",
        bet_type: "Pregame",
      });
    }
  }
  tosend.push(row);
  return tosend;
};
export const secondhalfgoalOddEven = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "1st_half_goals_odd_even",
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;
  const tosend = [] as any;
  const row = [] as any;
  if (match && match.length > 0) {
    for (let mm of match) {
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
        game: "soccer",
        bet_type: "Pregame",
      });
    }
  }
  tosend.push(row);
  return tosend;
};
export const lastTeamToScore = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "last_team_to_score",
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;
  const tosend = [] as any;
  const row = [] as any;
  if (match && match.length > 0) {
    for (let mm of match) {
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
        participant_name: mm.name,
        participant_handicap: mm.handicap ?? "",
        participant_header: mm.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      });
    }
  }
  tosend.push(row);
  return tosend;
};
export const first10Minutes = (data: any) => {
  const match = data?.odds?.goals?.sp["first_10_minutes_(00:00_09:59)"]?.odds;
  const odd_id = data?.odds?.goals?.sp["first_10_minutes_(00:00_09:59)"]?.id;
  const odd_name =
    data?.odds?.goals?.sp["first_10_minutes_(00:00_09:59)"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  const row = [] as any;
  if (match && match.length > 0) {
    var grouped_by_name = get_objects_grouped_by_name(match);
    for (var line in grouped_by_name) {
      let row = [] as any;
      var obj = grouped_by_name[line];
      row.push({
        id: 0,
        title: line,
        suspend: "0",
        value: "",
      });
      for (let item of obj) {
        row.push({
          id: item.id,
          title: item.handicap,
          value: item.odds,
          suspend: "0",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: odd_id,
          odd_name: odd_name,
          participant_id: item.id,
          participant_name: item.name,
          participant_handicap: item.handicap ?? "",
          participant_header: item.header ?? "",
          game: "soccer",
          bet_type: "Pregame",
        });
      }
      tosend.push(row);
    }
  }
  return tosend;
};
export const first10Minutes_minuetes = (data: any) => {
  const match = data?.odds?.minutes?.sp["first_10_minutes_(00:00_09:59)"]?.odds;
  const odd_id = data?.odds?.minutes?.sp["first_10_minutes_(00:00_09:59)"]?.id;
  const odd_name =
    data?.odds?.minutes?.sp["first_10_minutes_(00:00_09:59)"]?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  const row = [] as any;
  if (match && match.length > 0) {
    var grouped_by_name = get_objects_grouped_by_name(match);
    for (var line in grouped_by_name) {
      let row = [] as any;
      var obj = grouped_by_name[line];
      row.push({
        id: 0,
        title: line,
        suspend: "0",
        value: "",
      });
      for (let item of obj) {
        row.push({
          id: item.id,
          title: item.handicap,
          value: item.odds,
          suspend: "0",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: odd_id,
          odd_name: odd_name,
          participant_id: item.id,
          participant_name: item.name,
          participant_handicap: item.handicap ?? "",
          participant_header: item.header ?? "",
          game: "soccer",
          bet_type: "Pregame",
        });
      }
      tosend.push(row);
    }
  }
  return tosend;
};

export const bothTeamsToScoreHalf = (data: any, half: any) => {
  let match = data?.odds?.goals?.sp?.both_teams_to_score_in_1st_half?.odds;
  let odd_id = data?.odds?.goals?.sp?.both_teams_to_score_in_1st_half?.id;
  let odd_name = data?.odds?.goals?.sp?.both_teams_to_score_in_1st_half?.name;
  if (half == "2") {
    match = data?.odds?.goals?.sp?.both_teams_to_score_in_2nd_half?.odds;
    odd_id = data?.odds?.goals?.sp?.both_teams_to_score_in_2nd_half?.id;
    odd_name = data?.odds?.goals?.sp?.both_teams_to_score_in_2nd_half?.name;
  }
  if (!match) {
    return [];
  }

  let tosend = [] as any;
  if (match && match.length > 0) {
    var arr = [] as any;
    var yes_obj = findObjectByName(match, "Yes");
    var no_obj = findObjectByName(match, "No");

    var _yes = {
      title: yes_obj.name,
      value: yes_obj.odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: yes_obj.id,
      participant_name: yes_obj.name,
      participant_handicap: yes_obj.handicap ?? "",
      participant_header: yes_obj.header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };

    var _no = {
      title: no_obj.name,
      value: no_obj.odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: no_obj.id,
      participant_name: no_obj.name,
      participant_handicap: no_obj.handicap ?? "",
      participant_header: no_obj.header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };
    arr.push(_yes);
    arr.push(_no);
    tosend.push(arr);
  }
  return tosend;
};

export const firstHalfGoals = (data: any) => {
  const match = data?.odds?.goals?.sp?.first_half_goals?.odds;
  const odd_id = data?.odds?.goals?.sp?.first_half_goals?.id;
  const odd_name = data?.odds?.goals?.sp?.first_half_goals?.name;
  if (!match) {
    return [];
  }
  const tosend = [] as any;
  if (match && match.length > 0) {
    var grouped_by_name = get_objects_grouped_by_name(match);
    for (var line in grouped_by_name) {
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
        game: "soccer",
        bet_type: "Pregame",
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
        game: "soccer",
        bet_type: "Pregame",
      };

      tosend.push([_title, _over, _under]);
    }
  }
  return tosend;
};

export const exactFirstHalfGoals = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "exact_1st_half_goals",
  );
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
        title: mm.name,
        value: "",
        suspend: "1",
      });
      constructed_data.push({
        id: mm.id,
        title: "",
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
        game: "soccer",
        bet_type: "Pregame",
      });
    }
    const splitted_array = splitArrayIntoChunks(constructed_data, 4);
    for (let i = 0; i < splitted_array.length; i++) {
      tosend.push(splitted_array[i]);
    }
  }

  return tosend;
};

export const firstHalfCorners = (data: any) => {
  const match = data?.odds?.half?.sp?.first_half_corners?.odds;
  const odd_id = data?.odds?.half?.sp?.first_half_corners?.id;
  const odd_name = data?.odds?.half?.sp?.first_half_corners?.name;
  if (!match) {
    return [];
  }

  const tosend = [] as any;
  if (match && match.length > 0) {
    var grouped_by_name = get_objects_grouped_by_name(match);
    for (var group in grouped_by_name) {
      var group_obj = grouped_by_name[group];
      var over_obj = findObjectByHeader(group_obj, "Over");
      var exact_obj = findObjectByHeader(group_obj, "Exactly");
      var under_obj = findObjectByHeader(group_obj, "Under");

      var _title = {
        title: group,
        suspend: "1",
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
        participant_name: over_obj.name ?? "",
        participant_handicap: over_obj.handicap ?? "",
        participant_header: over_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };
      var _exact = {
        id: exact_obj.id,
        title: "",
        value: exact_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: exact_obj.id,
        participant_name: exact_obj.name ?? "",
        participant_handicap: exact_obj.handicap ?? "",
        participant_header: exact_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
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
        participant_name: under_obj.name ?? "",
        participant_handicap: under_obj.handicap ?? "",
        participant_header: under_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };
      tosend.push([_title, _over, _exact, _under]);
    }
  }
  return tosend;
};

export const homeToScoreInHalf = (data: any) => {
  const match = data?.odds?.half?.sp?.to_score_in_half?.odds;
  const odd_id = data?.odds?.half?.sp?.to_score_in_half?.id;
  const odd_name = data?.odds?.half?.sp?.to_score_in_half?.name;
  if (!match) {
    return [];
  }

  let tosend = [] as any;
  if (match && match.length > 0) {
    const groupedByTeam = get_objects_grouped_by_team(match);
    var group_obj = groupedByTeam["1"];
    let row1 = [
      {
        title: "1st Half",
        suspend: "1",
        value: "",
      },
    ] as any;
    let row2 = [
      {
        title: "2st Half",
        suspend: "1",
        value: "",
      },
    ] as any;
    for (let mm of group_obj) {
      if (mm.name == "1st Half") {
        row1.push({
          id: mm.id,
          title: "",
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
          game: "soccer",
          bet_type: "Pregame",
        });
      } else {
        row2.push({
          id: mm.id,
          title: "",
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
          game: "soccer",
          bet_type: "Pregame",
        });
      }
    }
    tosend.push(row1, row2);
  }
  return tosend;
};
export const awayToScoreInHalf = (data: any) => {
  const match = data?.odds?.half?.sp?.to_score_in_half?.odds;
  const odd_id = data?.odds?.half?.sp?.to_score_in_half?.id;
  const odd_name = data?.odds?.half?.sp?.to_score_in_half?.name;
  if (!match) {
    return [];
  }

  let tosend = [] as any;
  if (match && match.length > 0) {
    const groupedByTeam = get_objects_grouped_by_team(match);
    var group_obj = groupedByTeam["2"];
    let row1 = [
      {
        title: "1st Half",
        suspend: "1",
        value: "",
      },
    ] as any;
    let row2 = [
      {
        title: "2st Half",
        suspend: "1",
        value: "",
      },
    ] as any;
    for (let mm of group_obj) {
      if (mm.name == "1st Half") {
        row1.push({
          id: mm.id,
          title: "",
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
          game: "soccer",
          bet_type: "Pregame",
        });
      } else {
        row2.push({
          id: mm.id,
          title: "",
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
          game: "soccer",
          bet_type: "Pregame",
        });
      }
    }
    tosend.push(row1, row2);
  }
  return tosend;
};

export const secondHalfResult = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "2nd_half_result");
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;
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
        participant_name: match[0].name ?? "",
        participant_handicap: match[0].handicap ?? "",
        participant_header: match[0].header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      });
    }

    if (match[1].name === "Draw") {
      let title = "Draw";
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
        participant_id: match[1].id,
        participant_name: match[1].name ?? "",
        participant_handicap: match[1].handicap ?? "",
        participant_header: match[1].header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      });
    }

    if (match[2].name === "2") {
      let title = data?.visitorteam?.name;
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
        participant_id: match[2].id,
        participant_name: match[2].name ?? "",
        participant_handicap: match[2].handicap ?? "",
        participant_header: match[2].header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      });
    }
    tosend.push(arr);
  }
  return tosend;
};

export const totalGoalMinutes = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "total_goal_minutes",
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
          game: "soccer",
          bet_type: "Pregame",
        };
        arr.push(obj);
      });
      tosend.push(arr);
    }
  }
  return tosend;
};
export const firstTeamToScore = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "first_team_to_score",
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
          title:
            title == "1"
              ? data?.localteam.name
              : title == "2"
                ? data?.visitorteam.name
                : title,
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
          game: "soccer",
          bet_type: "Pregame",
        };
        arr.push(obj);
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const firstGoalMethod = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "first_goal_method");
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
        game: "soccer",
        bet_type: "Pregame",
      });
    }
    const splitted_array = splitArrayIntoChunks(constructed_data, 3);

    for (let i = 0; i < splitted_array.length; i++) {
      tosend.push(splitted_array[i]);
    }
  }

  return tosend;
};

export const earlyGoal = (data: any) => {
  const match = data?.odds?.goals?.sp?.early_goal?.odds;
  const odd_id = data?.odds?.goals?.sp?.early_goal?.id;
  const odd_name = data?.odds?.goals?.sp?.early_goal?.name;
  if (!match) {
    return [];
  }

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
          game: "soccer",
          bet_type: "Pregame",
        };
        arr.push(obj);
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const lateGoal = (data: any) => {
  const match = data?.odds?.goals?.sp?.late_goal?.odds;
  const odd_id = data?.odds?.goals?.sp?.late_goal?.id;
  const odd_name = data?.odds?.goals?.sp?.late_goal?.name;
  if (!match) {
    return [];
  }

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
          game: "soccer",
          bet_type: "Pregame",
        };
        arr.push(obj);
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const secondHalfGoals = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "2nd_half_goals");
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;
  const tosend = [] as any;
  if (match && match.length > 0) {
    var grouped_by_name = get_objects_grouped_by_name(match);
    for (var line in grouped_by_name) {
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
        game: "soccer",
        bet_type: "Pregame",
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
        game: "soccer",
        bet_type: "Pregame",
      };

      tosend.push([_title, _over, _under]);
    }
  }
  return tosend;
};

export const halfWithMostGoals = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "half_with_most_goals",
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
          game: "soccer",
          bet_type: "Pregame",
        };
        arr.push(obj);
      });
      tosend.push(arr);
    }
  }
  return tosend;
};
export const teamHighestScoringHalf = (data: any, team: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "home_team_highest_scoring_half",
  );
  if (team == "2") {
    match = find_in_array_by_sp_name(
      data?.odds?.others,
      "away_team_highest_scoring_half",
    );
  }
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
          game: "soccer",
          bet_type: "Pregame",
        };
        arr.push(obj);
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const exactSecondHalfGoals = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "exact_2nd_half_goals",
  );
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
        title: mm.name,
        value: "",
        suspend: "1",
      });
      constructed_data.push({
        id: mm.id,
        title: "",
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
        game: "soccer",
        bet_type: "Pregame",
      });
    }
    const splitted_array = splitArrayIntoChunks(constructed_data, 4);
    for (let i = 0; i < splitted_array.length; i++) {
      tosend.push(splitted_array[i]);
    }
  }

  return tosend;
};

export const timeOfFirstGoalBrackets = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "time_of_first_goal_brackets",
  );
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
        title: mm.name,
        value: "",
        suspend: "1",
      });
      constructed_data.push({
        id: mm.id,
        title: "",
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
        game: "soccer",
        bet_type: "Pregame",
      });
    }
    const splitted_array = splitArrayIntoChunks(constructed_data, 4);
    for (let i = 0; i < splitted_array.length; i++) {
      tosend.push(splitted_array[i]);
    }
  }

  return tosend;
};

export const cleanSheet = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "clean_sheet");
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
        title: mm.handicap,
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
        game: "soccer",
        bet_type: "Pregame",
      });
    }
  }
  tosend.push(constructed_data);
  return tosend;
};

export const teamTotalGoals = (data: any) => {
  let match = data?.odds?.goals?.sp?.team_total_goals?.odds;
  let odd_id = data?.odds?.goals?.sp?.team_total_goals?.id;
  let odd_name = data?.odds?.goals?.sp?.team_total_goals?.name;
  if (!match) {
    return [];
  }

  let tosend = [] as any;
  let home_data = [] as any;
  let away_data = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      if (mm.header == "1") {
        home_data.push({
          id: mm.id,
          title: mm.handicap,
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
          game: "soccer",
          bet_type: "Pregame",
        });
      } else {
        away_data.push({
          id: mm.id,
          title: mm.handicap,
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
          game: "soccer",
          bet_type: "Pregame",
        });
      }
    }
  }
  const splitted_home_array = splitArrayIntoChunks(home_data, 2);
  const splitted_away_array = splitArrayIntoChunks(away_data, 2);
  let maxlength = splitted_home_array.length;
  if (splitted_away_array.length > maxlength) {
    maxlength = splitted_away_array.length;
  }
  for (let i = 0; i < maxlength; i++) {
    let l = splitted_home_array[i] ?? [
      { title: " ", value: " ", suspend: "0" },
      { title: " ", value: " ", suspend: "0" },
    ];
    let r = splitted_away_array[i] ?? [
      { title: " ", value: " ", suspend: "0" },
      { title: " ", value: " ", suspend: "0" },
    ];
    tosend.push([l[0], l[1], r[0], r[1]]);
  }
  return tosend;
};

export const teamExactGoals = (data: any, team_name: any) => {
  let match = find_in_array_by_sp_name(
    data?.odds?.others,
    "home_team_exact_goals",
  );
  if (team_name == "2") {
    match = find_in_array_by_sp_name(
      data?.odds?.others,
      "away_team_exact_goals",
    );
  }
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;

  let tosend = [] as any;
  let constructed_data = [] as any;
  if (match && match.length > 0) {
    for (let mm of match) {
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
        game: "soccer",
        bet_type: "Pregame",
      });
    }
  }
  const splitted_array = splitArrayIntoChunks(constructed_data, 2);
  for (let i = 0; i < splitted_array.length; i++) {
    tosend.push(splitted_array[i]);
  }
  return tosend;
};

export const winningMargin = (data: any) => {
  let match = find_in_array_by_sp_name(data?.odds?.others, "winning_margin");
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;

  let tosend = [] as any;
  if (match && match.length > 0) {
    var grouped_by_name = get_objects_grouped_by_name(match);
    for (let line in grouped_by_name) {
      let row = [] as any;
      var obj = grouped_by_name[line];
      row.push({
        id: 0,
        title: line == "1" ? "Home" : line == "2" ? "Away" : line,
        suspend: "0",
        value: "",
      });
      for (let item of obj) {
        row.push({
          id: item.id,
          title: "",
          value: item.odds,
          suspend: "0",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: odd_id,
          odd_name: odd_name,
          participant_id: item.id,
          participant_name: item.name,
          participant_handicap: item.handicap ?? "",
          participant_header: item.header ?? "",
          game: "soccer",
          bet_type: "Pregame",
        });
      }
      tosend.push(row);
    }
  }

  return tosend;
};
export const timeOfFirstTeamGoal = (data: any) => {
  let match = find_in_array_by_sp_name(
    data?.odds?.others,
    "time_of_1st_team_goal",
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;

  let first = [] as any;
  let second = [] as any;
  let tosend = [] as any;
  if (match && match.length > 0) {
    for (var mm of match) {
      if (mm.header == "1") {
        first.push({
          id: mm.id,
          title: mm.handicap,
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
          game: "soccer",
          bet_type: "Pregame",
        });
      } else {
        second.push({
          id: mm.id,
          title: mm.handicap,
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
          game: "soccer",
          bet_type: "Pregame",
        });
      }
    }
  }
  tosend.push([first[0], second[0]], [first[1], second[1]]);
  return tosend;
};

export const halfTimeResult = (data: any) => {
  const match = data?.odds?.half?.sp?.half_time_result?.odds;
  const odd_id = data?.odds?.half?.sp?.half_time_result?.id;
  const odd_name = data?.odds?.half?.sp?.half_time_result?.name;
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
        participant_name: match[0].name ?? "",
        participant_handicap: match[0].handicap ?? "",
        participant_header: match[0].header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      });
    }

    if (match[1].name === "Draw") {
      let title = "Draw";
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
        participant_id: match[1].id,
        participant_name: match[1].name ?? "",
        participant_handicap: match[1].handicap ?? "",
        participant_header: match[1].header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      });
    }

    if (match[2].name === "2") {
      let title = data?.visitorteam?.name;
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
        participant_id: match[2].id,
        participant_name: match[2].name ?? "",
        participant_handicap: match[2].handicap ?? "",
        participant_header: match[2].header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      });
    }
    tosend.push(arr);
  }
  return tosend;
};

export const halfTimeDoubleChance = (data: any) => {
  const match = data?.odds?.half?.sp?.half_time_double_chance?.odds;
  const odd_id = data?.odds?.half?.sp?.half_time_double_chance?.id;
  const odd_name = data?.odds?.half?.sp?.half_time_double_chance?.name;
  if (!match) {
    return [];
  }

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
          game: "soccer",
          bet_type: "Pregame",
        };
        arr.push(obj);
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const halfTimeResultBothTeamsToScore = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "half_time_result_both_teams_to_score",
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;

  let tosend = [] as any;

  if (match) {
    const grouped = get_objects_grouped_by_name(match);
    var arr_home = [] as any;
    var arr_away = [] as any;
    var arr_draw = [] as any;

    var title_home_obj = {
      title: data?.localteam?.name,
      value: "",
      suspend: "1",
    };
    var home_obj_yes = {
      title: "",
      value: grouped["1"][0].odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: grouped["1"][0].id,
      participant_name: grouped["1"][0].name ?? "",
      participant_handicap: grouped["1"][0].handicap ?? "",
      participant_header: grouped["1"][0].header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };

    var home_obj_no = {
      title: "",
      value: grouped["1"][1].odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: grouped["1"][1].id,
      participant_name: grouped["1"][1].name ?? "",
      participant_handicap: grouped["1"][1].handicap ?? "",
      participant_header: grouped["1"][1].header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };

    var title_away_obj = {
      title: data?.visitorteam?.name,
      value: "",
      suspend: "1",
    };
    var away_obj_yes = {
      title: "",
      value: grouped["2"][0].odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: grouped["2"][0].id,
      participant_name: grouped["2"][0].name ?? "",
      participant_handicap: grouped["2"][0].handicap ?? "",
      participant_header: grouped["2"][0].header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };

    var away_obj_no = {
      title: "",
      value: grouped["2"][1].odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: grouped["2"][1].id,
      participant_name: grouped["2"][1].name ?? "",
      participant_handicap: grouped["2"][1].handicap ?? "",
      participant_header: grouped["2"][1].header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };

    var title_draw_obj = {
      title: "Draw",
      value: "",
      suspend: "1",
    };
    var draw_obj_yes = {
      title: "",
      value: grouped["Draw"][0].odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: grouped["Draw"][0].id,
      participant_name: grouped["Draw"][0].name ?? "",
      participant_handicap: grouped["Draw"][0].handicap ?? "",
      participant_header: grouped["Draw"][0].header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };

    var draw_obj_no = {
      title: "",
      value: grouped["2"][1].odds,
      suspend: "0",

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: grouped["Draw"][1].id,
      participant_name: grouped["Draw"][1].name ?? "",
      participant_handicap: grouped["Draw"][1].handicap ?? "",
      participant_header: grouped["Draw"][1].header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };
    arr_home.push(title_home_obj, home_obj_yes, home_obj_no);
    arr_away.push(title_away_obj, away_obj_yes, away_obj_no);
    arr_draw.push(title_draw_obj, draw_obj_yes, draw_obj_no);
    tosend.push(arr_home, arr_away, arr_draw);
  }

  return tosend;
};

export const halfTimeResultTotalGoals = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "half_time_result_total_goals",
  );
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;
  const tosend = [] as any;
  if (match && match.length > 0) {
    var grouped_by_name = get_objects_grouped_by_team(match);
    for (var line in grouped_by_name) {
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
        game: "soccer",
        bet_type: "Pregame",
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
        game: "soccer",
        bet_type: "Pregame",
      };

      tosend.push([_title, _over, _under]);
    }
  }
  return tosend;
};

export const halfTimeCorrectScore = (data: any) => {
  const match = data?.odds?.half?.sp?.half_time_correct_score?.odds;
  const odd_id = data?.odds?.half?.sp?.half_time_correct_score?.id;
  const odd_name = data?.odds?.half?.sp?.half_time_correct_score?.name;
  if (!match) {
    return [];
  }

  let tosend = [] as any;
  if (match && match.length > 0) {
    const result = [] as any;
    const left = [] as any;
    const middle = [] as any;
    const right = [] as any;
    const groupedByHeader = get_objects_grouped_by_header(match);
    var home_scores = groupedByHeader["1"];
    var draw_scores = groupedByHeader["Draw"];
    var away_scores = groupedByHeader["2"];
    for (var home_score_obj of home_scores) {
      var obj = {
        id: home_score_obj.id,
        title: home_score_obj.name,
        value: home_score_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: home_score_obj.id,
        participant_name: home_score_obj.name,
        participant_handicap: home_score_obj.handicap ?? "",
        participant_header: home_score_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };
      left.push(obj);
    }

    for (var away_score_obj of away_scores) {
      var obj = {
        id: away_score_obj.id,
        title: away_score_obj.name,
        value: away_score_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: away_score_obj.id,
        participant_name: away_score_obj.name,
        participant_handicap: away_score_obj.handicap ?? "",
        participant_header: away_score_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };
      right.push(obj);
    }

    for (var draw_score_obj of draw_scores) {
      var obj = {
        id: draw_score_obj.id,
        title: draw_score_obj.name,
        value: draw_score_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: draw_score_obj.id,
        participant_name: draw_score_obj.name,
        participant_handicap: draw_score_obj.handicap ?? "",
        participant_header: draw_score_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };
      middle.push(obj);
    }
    let maxlength = left.length;
    if (middle.length > maxlength) {
      maxlength = middle.length;
    }
    if (right.length > maxlength) {
      maxlength = right.length;
    }

    for (let i = 0; i < maxlength; i++) {
      let l = left[i] ? left[i] : { title: " ", value: " ", suspend: "0" };
      let m = middle[i] ? middle[i] : { title: " ", value: " ", suspend: "0" };
      let r = right[i] ? right[i] : { title: " ", value: " ", suspend: "0" };
      result.push([l, m, r]);
    }
    tosend = result;
  }
  return tosend;
};

export const bothTeamsToScorein1stHalf2ndHalf = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "both_teams_to_score_1st_half_2nd_half",
  );
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
        game: "soccer",
        bet_type: "Pregame",
      });
    }
    const splitted_array = splitArrayIntoChunks(constructed_data, 2);

    for (let i = 0; i < splitted_array.length; i++) {
      tosend.push(splitted_array[i]);
    }
  }

  return tosend;
};

export const firstHalfAsian3Way = (data: any) => {
  const match = data?.odds?.half?.sp["1st_half_handicap"]?.odds;
  const odd_id = data?.odds?.half?.sp["1st_half_handicap"]?.id;
  const odd_name = data?.odds?.half?.sp["1st_half_handicap"]?.name;
  if (!match) {
    return [];
  }

  let tosend = [] as any;

  if (match && match.length > 0) {
    var home_obj = findObjectByHeader(match, "1");
    var away_obj = findObjectByHeader(match, "2");
    var tie_obj = findObjectByHeader(match, "Tie");
    var _home = {
      id: home_obj.id,
      title: home_obj.handicap,
      suspend: "0",
      value: home_obj.odds,

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: home_obj.id,
      participant_name: home_obj.name ?? "",
      participant_handicap: home_obj.handicap ?? "",
      participant_header: home_obj.header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };
    var _tie = {
      id: tie_obj.id,
      title: tie_obj.handicap,
      suspend: "0",
      value: tie_obj.odds,

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: tie_obj.id,
      participant_name: tie_obj.name ?? "",
      participant_handicap: tie_obj.handicap ?? "",
      participant_header: tie_obj.header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };

    var _away = {
      id: away_obj.id,
      title: away_obj.handicap,
      suspend: "0",
      value: away_obj.odds,

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: away_obj.id,
      participant_name: away_obj.name ?? "",
      participant_handicap: away_obj.handicap ?? "",
      participant_header: away_obj.header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };
    tosend.push([_home, _tie, _away]);
  }

  return tosend;
};

export const alternativeFirstHalfHandicapResult = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_1st_half_handicap_result",
  );
  const odd_id = match?.id;
  const odd_name = match?.name;
  if (!match) {
    return [];
  }

  match = match.odds;
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_header = get_objects_grouped_by_header(match);
    var home_array = grouped_by_header["1"];
    var away_array = grouped_by_header["2"];
    var tie_array = grouped_by_header["Tie"];

    for (let i = 0; i < home_array.length; i++) {
      var home_obj = home_array[i];
      var away_obj = away_array[i];
      var tie_obj = tie_array[i];
      var _home = {
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
        game: "soccer",
        bet_type: "Pregame",
      };
      var _tie = {
        id: tie_obj.id,
        title: tie_obj.handicap,
        value: tie_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: tie_obj.id,
        participant_name: tie_obj.name ?? "",
        participant_handicap: tie_obj.handicap ?? "",
        participant_header: tie_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };

      var _away = {
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
        game: "soccer",
        bet_type: "Pregame",
      };
      var arr = [_home, _tie, _away];
      tosend.push(arr);
    }
  }
  return tosend;
};

export const asianTotalCorners = (data: any) => {
  const match = data?.odds?.corners?.sp?.asian_total_corners?.odds;
  const odd_id = data?.odds?.corners?.sp?.asian_total_corners?.id;
  const odd_name = data?.odds?.corners?.sp?.asian_total_corners?.name;
  if (!match) {
    return [];
  }

  const tosend = [] as any;
  if (match && match.length > 0) {
    var grouped_by_name = get_objects_grouped_by_name(match);
    for (var group in grouped_by_name) {
      var group_obj = grouped_by_name[group];
      var over_obj = findObjectByHeader(group_obj, "Over");
      var under_obj = findObjectByHeader(group_obj, "Under");

      var _title = {
        title: group,
        suspend: "1",
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
        participant_name: over_obj.name ?? "",
        participant_handicap: over_obj.handicap ?? "",
        participant_header: over_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
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
        participant_name: under_obj.name ?? "",
        participant_handicap: under_obj.handicap ?? "",
        participant_header: under_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };
      tosend.push([_title, _over, _under]);
    }
  }
  return tosend;
};

export const asianHandicapCorners = (data: any) => {
  const match = data?.odds?.main?.sp?.asian_handicap?.odds;
  const odd_id = data?.odds?.main?.sp?.asian_handicap?.id;
  const odd_name = data?.odds?.main?.sp?.asian_handicap?.name;
  if (!match) {
    return [];
  }

  let tosend = [] as any;

  if (match && match.length > 0) {
    var home_obj = findObjectByHeader(match, "1");
    var away_obj = findObjectByHeader(match, "2");
    var _home = {
      id: home_obj.id,
      title: home_obj.handicap,
      suspend: "0",
      value: home_obj.odds,

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: home_obj.id,
      participant_name: home_obj.name ?? "",
      participant_handicap: home_obj.handicap ?? "",
      participant_header: home_obj.header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };

    var _away = {
      id: away_obj.id,
      title: away_obj.handicap,
      suspend: "0",
      value: away_obj.odds,

      event_id: data?.id,
      event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
      odd_id: odd_id,
      odd_name: odd_name,
      participant_id: away_obj.id,
      participant_name: away_obj.name ?? "",
      participant_handicap: away_obj.handicap ?? "",
      participant_header: away_obj.header ?? "",
      game: "soccer",
      bet_type: "Pregame",
    };
    tosend.push([_home, _away]);
  }

  // tosend.sort((a: any, b: any) => parseInt(a[0].title) - parseInt(b[0].title));
  return tosend;
};

export const firstHalfAsianCorners = (data: any) => {
  const match = data?.odds?.corners?.sp["1st_half_asian_corners"]?.odds;
  const odd_id = data?.odds?.corners?.sp["1st_half_asian_corners"]?.id;
  const odd_name = data?.odds?.corners?.sp["1st_half_asian_corners"]?.name;
  if (!match) {
    return [];
  }

  const tosend = [] as any;
  if (match && match.length > 0) {
    var grouped_by_name = get_objects_grouped_by_name(match);
    for (var group in grouped_by_name) {
      var group_obj = grouped_by_name[group];
      var over_obj = findObjectByHeader(group_obj, "Over");
      var under_obj = findObjectByHeader(group_obj, "Under");

      var _title = {
        title: group,
        suspend: "1",
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
        participant_name: over_obj.name ?? "",
        participant_handicap: over_obj.handicap ?? "",
        participant_header: over_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
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
        participant_name: under_obj.name ?? "",
        participant_handicap: under_obj.handicap ?? "",
        participant_header: under_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };
      tosend.push([_title, _over, _under]);
    }
  }
  return tosend;
};

export const goalscorers = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "goalscorers");
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;
  const tosend = [] as any;
  if (match && match.length > 0) {
    const grouped_by_name = get_objects_grouped_by_name(match);
    for (let group in grouped_by_name) {
      let group_obj = grouped_by_name[group];
      let first_obj = findObjectByHeader(group_obj, "First");
      let last_obj = findObjectByHeader(group_obj, "Last");
      let anytime_obj = findObjectByHeader(group_obj, "Anytime");
      let team_name =
        first_obj.name2 == "1" ? data?.localteam?.name : data?.visitorteam.name;
      let title = {
        title: `${group} ( ${team_name} )`,
        suspend: "",
        value: "",
      };
      let _first = {
        id: first_obj.id,
        title: "",
        value: first_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: first_obj.id,
        participant_name: first_obj.name ?? "",
        participant_handicap: first_obj.handicap ?? "",
        participant_header: first_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };
      let _last = {
        id: last_obj.id,
        title: "",
        value: last_obj.odds,
        suspend: "0",

        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: odd_id,
        odd_name: odd_name,
        participant_id: last_obj.id,
        participant_name: last_obj.name ?? "",
        participant_handicap: last_obj.handicap ?? "",
        participant_header: last_obj.header ?? "",
        game: "soccer",
        bet_type: "Pregame",
      };
      let _anytime = {};
      if (anytime_obj != undefined) {
        _anytime = {
          id: anytime_obj.id,
          title: "",
          value: anytime_obj.odds,
          suspend: "0",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: odd_id,
          odd_name: odd_name,
          participant_id: anytime_obj.id,
          participant_name: anytime_obj.name ?? "",
          participant_handicap: anytime_obj.handicap ?? "",
          participant_header: anytime_obj.header ?? "",
          game: "soccer",
          bet_type: "Pregame",
        };
      } else {
        _anytime = {
          title: "",
          value: "",
          suspend: "1",
        };
      }
      tosend.push([title, _first, _last, _anytime]);
    }
  }
  return tosend;
};
