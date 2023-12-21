"use client";
import React from "react";

const find_match_by_string = (data: any, name: string) => {
  const odds = data?.odds;
  var match = odds?.filter((odd: any) => odd.value === name);
  return match;
};

const find_in_array_by_sp_name = (arr: any, target_string: any) => {
  for (var obj of arr) {
    if (obj.sp[target_string] !== undefined) {
      return obj.sp[target_string];
    }
  }
};

const find_participant_by_name = (
  data: any,
  odd_name: string,
  participant_name: string
) => {
  const odds = data?.odds;
  var odds_match = odds?.filter((odd: any) => odd.value === odd_name);
  if (odds_match && odds_match.length > 0) {
    odds_match = odds_match[0].bookmakers[0].odds;
    var participant_match = odds_match?.filter(
      (participant: any) => participant.name === participant_name
    );
    if (participant_match && participant_match.length > 0) {
      return participant_match[0];
    } else {
      return null;
    }
  }
};

const find_participant_by_name_in_odds = (
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
    console.log({ ss: match });

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
        participant_id: match[0].id,
        participant_name: title,
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
        participant_id: match[0].id,
        participant_name: title,
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
          participant_handicap: odd.participant,
          participant_header: odd.header,
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
    console.log({ h2: match });
    var groupedData = get_objects_grouped_by_name(match);
    console.log({ ss2: groupedData });
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
        participant_name: over_obj.header,
        participant_handicap: handicap,
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
        participant_name: over_obj.header,
        participant_handicap: handicap,
      };
      arr.push(_title, _over, _under);
      tosend.push(arr);
    }
  }
  console.log("Sending New Data", data);
  return tosend;
};
export const resultBothTeamsToScore = (data: any) => {
  console.log({ esp32: data?.odds?.main?.sp });
  const match = data?.odds?.main?.sp?.result_both_teams_to_score?.odds;
  const odd_id = data?.odds?.main?.sp?.result_both_teams_to_score?.id;
  const odd_name = data?.odds?.main?.sp?.result_both_teams_to_score?.name;
  if (!match) {
    return [];
  }

  let tosend = [] as any;

  if (match) {
    console.log({ mnm: match });
    const grouped = get_objects_grouped_by_name(match);
    console.log({ group: grouped });
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
      participant_name: grouped["1"][0].header,
      participant_handicap: grouped["1"][0].name,
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
      participant_name: grouped["1"][1].header,
      participant_handicap: grouped["1"][1].name,
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
      participant_name: grouped["2"][0].header,
      participant_handicap: grouped["2"][0].name,
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
      participant_name: grouped["2"][1].header,
      participant_handicap: grouped["2"][1].name,
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
      participant_name: grouped["Draw"][0].header,
      participant_handicap: grouped["Draw"][0].name,
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
      participant_name: grouped["Draw"][1].header,
      participant_handicap: grouped["Draw"][1].name,
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
    };
    arr.push(_yes);
    arr.push(_no);
    tosend.push(arr);
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
    console.log({ tt: tosend });
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
      });
    }
    let result = [] as any;
    const newformat = [] as any;
    const splitted_array = splitArrayIntoChunks(constructed_data, 3);

    for (let i = 0; i < splitted_array.length; i++) {
      tosend.push(splitted_array[i]);
    }
  }

  return tosend;
};

export const asianHandicap = (data: any) => {
  const match = data?.odds?.main?.sp?.asian_handicap?.odds;
  const odd_id = data?.odds?.main?.sp?.asian_handicap?.id;
  const odd_name = data?.odds?.main?.sp?.asian_handicap?.name;
  console.log({ asian_handicap: match });
  if (!match) {
    return [];
  }

  let tosend = [] as any;

  if (match && match.length > 0) {
    var home_obj = findObjectByHeader(match, "1");
    var away_obj = findObjectByHeader(match, "2");
    console.log({ hom: home_obj, aw: away_obj });
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
    console.log({ mml: match });
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
        participant_name: over_obj.group,
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
    };

    tosend.push([_home, _away]);
  }
  return tosend;
};

export const handicapResult = (data: any) => {
  var match = find_in_array_by_sp_name(data?.odds?.others, "handicap_result");
  console.log({ mmhaha: match });
  if (!match) {
    return [];
  }
  const odd_id = match.id;
  const odd_name = match.name;
  match = match?.odds;

  const tosend = [] as any;
  if (match && match.length > 0) {
    console.log({ mml: match });
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
    console.log({ gto: grouped_by_name });
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
        participant_name: "Over " + over.name,
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
        participant_name: "Under " + under.name,
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
        participant_name: "Exactly " + exactly.name,
      };
      tosend.push([title_obj, over_obj, exactly_obj, under_obj]);
    }
  }
  return tosend;
};

export const alternativeAsianHandicap = (data: any) => {
  console.log({ ddo: data });
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_asian_handicap"
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
    console.log({ ggt: grouped_by_header });
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
        participant_name: home_obj.handicap,
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
        participant_name: away_obj.handicap,
      };
      var arr = [_home, _away];
      tosend.push(arr);
    }
  }
  return tosend;
};

export const alternativeHandicapResult = (data: any) => {
  console.log({ dd: data });
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_handicap_result"
  );
  const odd_id = match?.id;
  const odd_name = match?.name;
  if (!match) {
    return [];
  }

  match = match.odds;
  const tosend = [] as any;
  if (match && match.length > 0) {
    console.log({ ggo: match });
    var grouped_by_handicap = get_objects_grouped_by_header(match);
    console.log({ gh: grouped_by_handicap });
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
        participant_name: home_obj.name,
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
      };

      tosend.push([_home, _tie, _away]);
    }
  }
  return tosend;
};

export const alternativeGoalLine = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_goal_line"
  );
  const odd_id = match?.id;
  const odd_name = match?.name;
  if (!match) {
    return [];
  }

  match = match.odds;
  const tosend = [] as any;
  if (match && match.length > 0) {
    console.log({ ggo: match });
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
      };

      tosend.push([_title, _over, _under]);
      // tosend.push([_home, _tie, _away]);
    }
  }
  return tosend;
};

export const minuteResult = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let tosend = [] as any;
  const match = data?.odds?.filter((item: any) => item.id === "22626");
  if (match && match.length > 0) {
    const fmatchwrap = match[0]?.bookmakers[0].odds;
    const arr = [] as any;
    fmatchwrap.map((fmatchItem: any, index: number) => {
      let title = fmatchItem.name;
      if (fmatchItem.name === "Home") {
        title = data?.localteam?.name;
      } else if (fmatchItem.name === "Away") {
        title = data?.visitorteam?.name;
      }

      arr.push({
        title: title,
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
    });
    tosend.push(arr);
  }
  return tosend;
};

export const first10Minutes = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let tosend = [] as any;
  const match = data?.odds?.filter((item: any) => item.id === "22907");
  if (match && match.length > 0) {
    const fmatchwrap = match[0]?.bookmakers[0].odds;
    fmatchwrap.map((fmatch: any) => {
      if (fmatch) {
        const arr = [{ title: "Goals", value: "", suspend: "0" }] as any;
        fmatch.odds.map((fmatchItem: any, index: number) => {
          let title = fmatch.name;
          arr.push({
            title: title,
            value: fmatchItem.value,
            suspend: fmatchItem.stop === "False" ? "0" : "1",
            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: match[0].id,
            odd_name: fmatchItem.value,
            participant_id: index,
            participant_name: fmatchItem.name,
          });
        });
        tosend.push(arr);
      }
    });
  }
  return tosend;
};

export const toScoreaPenalty = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let tosend = [] as any;
  const match = data?.odds?.filter((item: any) => item.id === "23266");
  if (match && match.length > 0) {
    const fmatchwrap = match[0]?.bookmakers[0].odds;
    const arr = [] as any;
    fmatchwrap.map((fmatchItem: any, index: number) => {
      let title = fmatchItem.name;
      if (fmatchItem.name === "Home") {
        title = `${data?.localteam?.name} to score a penalty`;
      } else if (fmatchItem.name === "Away") {
        title = `${data?.visitorteam?.name} to score a penalty`;
      }

      arr.push({
        title: title,
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
    });
    tosend.push(arr);
  }
  return tosend;
};
export const toMissaPenalty = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let tosend = [] as any;
  const match = data?.odds?.filter((item: any) => item.id === "23267");
  if (match && match.length > 0) {
    const fmatchwrap = match[0]?.bookmakers[0].odds;
    const arr = [] as any;
    fmatchwrap.map((fmatchItem: any, index: number) => {
      let title = fmatchItem.name;
      if (fmatchItem.name === "Home") {
        title = `${data?.localteam?.name} to miss a penalty`;
      } else if (fmatchItem.name === "Away") {
        title = `${data?.visitorteam?.name} to miss a penalty`;
      }

      arr.push({
        title: title,
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
    });
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
    console.log({ hom: home_obj, aw: away_obj });
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
    };
    tosend.push([_home, _away]);
  }

  // tosend.sort((a: any, b: any) => parseInt(a[0].title) - parseInt(b[0].title));
  return tosend;
};

export const alternativeFirstHalfAsianHandicap = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_1st_half_asian_handicap"
  );
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
        participant_name: home_obj.handicap,
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
        participant_name: away_obj.handicap,
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
    console.log({ mml: match });
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
        participant_name: over_obj.group,
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
      };
      tosend.push([_title, _over, _under]);
    }
  }
  return tosend;
};

export const alternativeFirstHalfGoalLine = (data: any) => {
  var match = find_in_array_by_sp_name(
    data?.odds?.others,
    "alternative_1st_half_goal_line"
  );
  const odd_id = match.id;
  const odd_name = match.name;
  if (!match) {
    return [];
  }

  match = match.odds;
  const tosend = [] as any;
  if (match && match.length > 0) {
    console.log({ gtto: match });
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
      };

      tosend.push([_title, _over, _under]);
      // tosend.push([_home, _tie, _away]);
    }
  }
  return tosend;
};

export const betResult = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  let match = data?.odds?.filter((item: any) => item.id === "1");

  if (match && match.length > 0) {
    const arr = [{ title: "Match", value: "", suspend: "0" }] as any;
    match[0]?.bookmakers[0].odds?.map((fmatchItem: any, index: any) => {
      let title = fmatchItem?.name;
      title = title.replaceAll("Home", data?.localteam?.name);
      title = title.replaceAll("Away", data?.visitorteam?.name);
      arr.push({
        title: "",
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
    });
    tosend.push(arr);
  }
  match = data?.odds?.filter((item: any) => item.id === "2102");
  if (match && match.length > 0) {
    const arr = [{ title: "1st Half", value: "", suspend: "0" }] as any;
    match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
      let title = fmatchItem?.name;
      title = title.replaceAll("Home", data?.localteam?.name);
      title = title.replaceAll("Away", data?.visitorteam?.name);
      arr.push({
        title: "",
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
      });
    });
    tosend.push(arr);
  }
  match = data?.odds?.filter((item: any) => item.id === "3");
  if (match && match.length > 0) {
    const arr = [{ title: "2nd Half", value: "", suspend: "0" }] as any;
    match[0]?.bookmakers[0].odds?.map((fmatchItem: any, index: any) => {
      let title = fmatchItem?.name;
      title = title.replaceAll("Home", data?.localteam?.name);
      title = title.replaceAll("Away", data?.visitorteam?.name);
      arr.push({
        title: "",
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
    });
    tosend.push(arr);
  }
  match = data?.odds?.filter((item: any) => item.id === "22626");
  if (match && match.length > 0) {
    const arr = [{ title: "10 Minute", value: "", suspend: "0" }] as any;
    match[0]?.bookmakers[0].odds?.map((fmatchItem: any, index: any) => {
      let title = fmatchItem?.name;
      title = title.replaceAll("Home", data?.localteam?.name);
      title = title.replaceAll("Away", data?.visitorteam?.name);
      arr.push({
        title: "",
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
    });
    tosend.push(arr);
  }
  return tosend;
};
export const betBothTeamsToScore = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  let match = data?.odds?.filter((item: any) => item.id === "15");

  if (match && match.length > 0) {
    const arr = [{ title: "Match", value: "", suspend: "0" }] as any;
    match[0]?.bookmakers[0].odds?.map((fmatchItem: any, index: any) => {
      let title = fmatchItem?.name;
      title = title.replaceAll("Home", data?.localteam?.name);
      title = title.replaceAll("Away", data?.visitorteam?.name);
      arr.push({
        title: "",
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
    });
    tosend.push(arr);
  }
  match = data?.odds?.filter((item: any) => item.id === "22604");
  if (match && match.length > 0) {
    const arr = [{ title: "1st Half", value: "", suspend: "0" }] as any;
    match[0]?.bookmakers[0].odds?.map((fmatchItem: any, index: any) => {
      let title = fmatchItem?.name;
      title = title.replaceAll("Home", data?.localteam?.name);
      title = title.replaceAll("Away", data?.visitorteam?.name);
      arr.push({
        title: "",
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
    });
    tosend.push(arr);
  }
  match = data?.odds?.filter((item: any) => item.id === "22605");
  if (match && match.length > 0) {
    const arr = [{ title: "2nd Half", value: "", suspend: "0" }] as any;
    match[0]?.bookmakers[0].odds?.map((fmatchItem: any, index: any) => {
      let title = fmatchItem?.name;
      title = title.replaceAll("Home", data?.localteam?.name);
      title = title.replaceAll("Away", data?.visitorteam?.name);
      arr.push({
        title: "",
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
    });
    tosend.push(arr);
  }
  return tosend;
};
export const betGoalOddEven = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  let match = data?.odds?.filter((item: any) => item.id === "22608");

  if (match && match.length > 0) {
    const arr = [{ title: "Match", value: "", suspend: "0" }] as any;
    match[0]?.bookmakers[0].odds?.map((fmatchItem: any, index: any) => {
      let title = fmatchItem?.name;
      title = title.replaceAll("Home", data?.localteam?.name);
      title = title.replaceAll("Away", data?.visitorteam?.name);
      arr.push({
        title: "",
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
    });
    tosend.push(arr);
  }
  match = data?.odds?.filter((item: any) => item.id === "22609");
  if (match && match.length > 0) {
    const arr = [{ title: "1st Half", value: "", suspend: "0" }] as any;
    match[0]?.bookmakers[0].odds?.map((fmatchItem: any, index: any) => {
      let title = fmatchItem?.name;
      title = title.replaceAll("Home", data?.localteam?.name);
      title = title.replaceAll("Away", data?.visitorteam?.name);
      arr.push({
        title: "",
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
    });
    tosend.push(arr);
  }
  return tosend;
};
export const betDoubleChance = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  let match = data?.odds?.filter((item: any) => item.id === "222");

  if (match && match.length > 0) {
    match[0]?.bookmakers[0].odds?.map((fmatchItem: any, index: any) => {
      let title = fmatchItem?.name;
      title = title.replaceAll("Home", data?.localteam?.name);
      title = title.replaceAll("Away", data?.visitorteam?.name);
      title = title.replace("/", " or ");
      const arr = [
        {
          title: title,
          value: "",
          suspend: fmatchItem.stop === "False" ? "0" : "1",
          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: match[0].id,
          odd_name: fmatchItem.value,
          participant_id: index,
          participant_name: fmatchItem.name,
        },
      ] as any;

      arr.push({
        title: "",
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
      tosend.push(arr);
    });
  }
  return tosend;
};
export const bethalftimeFulltime = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  let match = data?.odds?.filter((item: any) => item.id === "12");

  if (match && match.length > 0) {
    match[0]?.bookmakers[0].odds?.map((fmatchItem: any, index: any) => {
      let title = fmatchItem?.name;
      title = title.replaceAll("Home", data?.localteam?.name);
      title = title.replaceAll("Away", data?.visitorteam?.name);
      title = title.replace("/", " - ");
      const arr = [
        {
          title: title,
          value: "",
          suspend: fmatchItem.stop === "False" ? "0" : "1",
        },
      ] as any;

      arr.push({
        title: "",
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
      tosend.push(arr);
    });
  }
  return tosend;
};

export const betScore = (data: any, oddData: any) => {
  if (!data && !data.odds) {
    return oddData;
  }
  let result = [] as any;
  let left = [] as any;
  let middle = [] as any;
  let right = [] as any;
  let match = data?.odds?.filter((item: any) => item.id === "81");

  if (match && match.length > 0) {
    match[0]?.bookmakers[0].odds?.map((fmatchItem: any, index: any) => {
      let checkingData = fmatchItem?.name.split(":");
      checkingData[0] = Number(checkingData[0]);
      checkingData[1] = Number(checkingData[1]);
      if (checkingData[0] > checkingData[1]) {
        left.push({
          title: fmatchItem?.name.replace(":", "-"),
          value: fmatchItem.value,
          suspend: fmatchItem.stop === "False" ? "0" : "1",
          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: match[0].id,
          odd_name: fmatchItem.value,
          participant_id: index,
          participant_name: fmatchItem.name,
        });
      } else if (checkingData[0] === checkingData[1]) {
        middle.push({
          title: fmatchItem?.name.replace(":", "-"),
          value: fmatchItem.value,
          suspend: fmatchItem.stop === "False" ? "0" : "1",
          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: match[0].id,
          odd_name: fmatchItem.value,
          participant_id: index,
          participant_name: fmatchItem.name,
        });
      } else {
        right.push({
          title: fmatchItem?.name.replace(":", "-"),
          value: fmatchItem.value,
          suspend: fmatchItem.stop === "False" ? "0" : "1",
          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: match[0].id,
          odd_name: fmatchItem.value,
          participant_id: index,
          participant_name: fmatchItem.name,
        });
      }
    });
    console.log({ left: left, middle: middle, right: right });
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
    oddData["Full Time Score"] = result;
  }
  match = data?.odds?.filter((item: any) => item.id === "181");
  result = [] as any;
  left = [] as any;
  middle = [] as any;
  right = [] as any;
  if (match && match.length > 0) {
    match[0]?.bookmakers[0].odds?.map((fmatchItem: any) => {
      let checkingData = fmatchItem?.name.split(":");
      checkingData[0] = Number(checkingData[0]);
      checkingData[1] = Number(checkingData[1]);
      if (checkingData[0] > checkingData[1]) {
        left.push({
          title: fmatchItem?.name.replace(":", "-"),
          value: fmatchItem.value,
          suspend: fmatchItem.stop === "False" ? "0" : "1",
        });
      } else if (checkingData[0] === checkingData[1]) {
        middle.push({
          title: fmatchItem?.name.replace(":", "-"),
          value: fmatchItem.value,
          suspend: fmatchItem.stop === "False" ? "0" : "1",
        });
      } else {
        right.push({
          title: fmatchItem?.name.replace(":", "-"),
          value: fmatchItem.value,
          suspend: fmatchItem.stop === "False" ? "0" : "1",
        });
      }
    });
    console.log({ left: left, middle: middle, right: right });
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
    oddData["Half Time Score"] = result;
  }
  return oddData;
};
export const bethalfWithMostGoals = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  let match = data?.odds?.filter((item: any) => item.id === "91");

  if (match && match.length > 0) {
    const rearrange = [] as any;
    match[0]?.bookmakers[0].odds.map((item: any) => {
      if (item.name === "1st Half") {
        rearrange[0] = item;
      } else if (item.name === "2nd Half") {
        rearrange[1] = item;
      } else if (item.name === "Draw") {
        rearrange[2] = item;
      }
    });
    rearrange?.map((fmatchItem: any, index: any) => {
      let title = fmatchItem?.name;
      if (title === "Draw") {
        title = "Neither Half (Tie)";
      }
      const arr = [
        {
          title: title,
          value: "",
          suspend: fmatchItem.stop === "False" ? "0" : "1",
        },
      ] as any;

      arr.push({
        title: "",
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
      tosend.push(arr);
    });
  }
  return tosend;
};
export const betteamSpecials = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  let match = data?.odds?.filter((item: any) => item.id === "22607");

  if (match && match.length > 0) {
    const arr = [
      {
        title: "to Win to Nil",
        value: "",
        suspend: match[0]?.bookmakers[0].stop === "False" ? "0" : "1",
      },
    ] as any;
    match[0]?.bookmakers[0].odds?.map((fmatchItem: any, index: any) => {
      let title = fmatchItem?.name;
      title = title.replaceAll("Home", data?.localteam?.name);
      title = title.replaceAll("Away", data?.visitorteam?.name);
      title = title.replace("/", " - ");

      arr.push({
        title: "",
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
    });
    tosend.push(arr);
  }
  match = data?.odds?.filter((item: any) => item.id === "22615");

  if (match && match.length > 0) {
    const arr = [
      {
        title: "to Win Either Half",
        value: "",
        suspend: match[0]?.bookmakers[0].stop === "False" ? "0" : "1",
      },
    ] as any;
    match[0]?.bookmakers[0].odds?.map((fmatchItem: any, index: any) => {
      let title = fmatchItem?.name;
      title = title.replaceAll("Home", data?.localteam?.name);
      title = title.replaceAll("Away", data?.visitorteam?.name);
      title = title.replace("/", " - ");

      arr.push({
        title: "",
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
    });
    tosend.push(arr);
  }
  match = data?.odds?.filter((item: any) => item.id === "2293");

  if (match && match.length > 0) {
    const arr = [
      {
        title: "to Win Both Halves",
        value: "",
        suspend: match[0]?.bookmakers[0].stop === "False" ? "0" : "1",
      },
    ] as any;
    match[0]?.bookmakers[0].odds?.map((fmatchItem: any, index: any) => {
      let title = fmatchItem?.name;
      title = title.replaceAll("Home", data?.localteam?.name);
      title = title.replaceAll("Away", data?.visitorteam?.name);
      title = title.replace("/", " - ");

      arr.push({
        title: "",
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
    });
    tosend.push(arr);
  }
  match = data?.odds?.filter((item: any) => item.id === "22833");

  if (match && match.length > 0) {
    const arr = [
      {
        title: "to Score in Both Halves",
        value: "",
        suspend: match[0]?.bookmakers[0].stop === "False" ? "0" : "1",
      },
    ] as any;
    match[0]?.bookmakers[0].odds?.map((fmatchItem: any, index: any) => {
      let title = fmatchItem?.name;
      title = title.replaceAll("Home", data?.localteam?.name);
      title = title.replaceAll("Away", data?.visitorteam?.name);
      title = title.replace("/", " - ");

      arr.push({
        title: "",
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
    });
    tosend.push(arr);
  }

  return tosend;
};

export const alternativetotalGoals = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  const match = data?.odds?.filter((item: any) => item.id === "5");
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      fmatchWrap.map((fmatch: any) => {
        const arr = [{ title: fmatch.name, value: "", suspend: "0" }] as any;
        fmatch.odds.map((fmatchItem: any, index: any) => {
          arr.push({
            title: "",
            value: fmatchItem.value,
            suspend: fmatchItem.stop === "False" ? "0" : "1",
            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: match[0].id,
            odd_name: fmatchItem.value,
            participant_id: index,
            participant_name: fmatchItem.name,
          });
        });
        tosend.push(arr);
      });
    }
  }
  tosend.sort((a: any, b: any) => parseInt(a[0].title) - parseInt(b[0].title));
  return tosend;
};
export const resultTotalGoals = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  const match = data?.odds?.filter((item: any) => item.id === "22621");
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;

    if (fmatchWrap && fmatchWrap.length > 0) {
      fmatchWrap.map((fmatch: any, index: any) => {
        let arr1 = [
          {
            title: data?.localteam?.name,
            value: "",
            suspend: fmatchWrap?.stop === "False" ? "0" : "1",
          },
        ] as any;
        let arr2 = [
          {
            title: data?.visitorteam?.name,
            value: "",
            suspend: fmatchWrap?.stop === "False" ? "0" : "1",
            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: match[0].id,
            odd_name: fmatch.value,
            participant_id: index,
            participant_name: fmatch.name,
          },
        ] as any;
        let arr3 = [
          {
            title: "Draw",
            value: "",
            suspend: fmatchWrap?.stop === "False" ? "0" : "1",
          },
        ] as any;

        fmatch.odds.map((fmatchItem: any, index: any) => {
          if (fmatchItem.name === "Home/Over") {
            arr1[1] = {
              title: fmatch?.name,
              value: fmatchItem.value,
              suspend: fmatchItem.stop === "False" ? "0" : "1",
              event_id: data?.id,
              event_name:
                data?.localteam?.name + " vs " + data?.visitorteam.name,
              odd_id: match[0].id,
              odd_name: fmatchItem.value,
              participant_id: index,
              participant_name: fmatchItem.name,
            };
          } else if (fmatchItem.name === "Home/Under") {
            arr1[2] = {
              title: fmatch?.name,
              value: fmatchItem.value,
              suspend: fmatchItem.stop === "False" ? "0" : "1",
              event_id: data?.id,
              event_name:
                data?.localteam?.name + " vs " + data?.visitorteam.name,
              odd_id: match[0].id,
              odd_name: fmatchItem.value,
              participant_id: index,
              participant_name: fmatchItem.name,
            };
          } else if (fmatchItem.name === "Away/Over") {
            arr2[1] = {
              title: fmatch?.name,
              value: fmatchItem.value,
              suspend: fmatchItem.stop === "False" ? "0" : "1",
              event_id: data?.id,
              event_name:
                data?.localteam?.name + " vs " + data?.visitorteam.name,
              odd_id: match[0].id,
              odd_name: fmatchItem.value,
              participant_id: index,
              participant_name: fmatchItem.name,
            };
          } else if (fmatchItem.name === "Away/Under") {
            arr2[2] = {
              title: fmatch?.name,
              value: fmatchItem.value,
              suspend: fmatchItem.stop === "False" ? "0" : "1",
              event_id: data?.id,
              event_name:
                data?.localteam?.name + " vs " + data?.visitorteam.name,
              odd_id: match[0].id,
              odd_name: fmatchItem.value,
              participant_id: index,
              participant_name: fmatchItem.name,
            };
          } else if (fmatchItem.name === "Draw/Over") {
            arr3[1] = {
              title: fmatch?.name,
              value: fmatchItem.value,
              suspend: fmatchItem.stop === "False" ? "0" : "1",
              event_id: data?.id,
              event_name:
                data?.localteam?.name + " vs " + data?.visitorteam.name,
              odd_id: match[0].id,
              odd_name: fmatchItem.value,
              participant_id: index,
              participant_name: fmatchItem.name,
            };
          } else if (fmatchItem.name === "Draw/Under") {
            arr3[2] = {
              title: fmatch?.name,
              value: fmatchItem.value,
              suspend: fmatchItem.stop === "False" ? "0" : "1",
              event_id: data?.id,
              event_name:
                data?.localteam?.name + " vs " + data?.visitorteam.name,
              odd_id: match[0].id,
              odd_name: fmatchItem.value,
              participant_id: index,
              participant_name: fmatchItem.name,
            };
          }
        });
        tosend.push(arr1);
        tosend.push(arr2);
        tosend.push(arr3);
      });
    }
  }
  return tosend;
};

export const lastTeamToScore = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  const match = data?.odds?.filter((item: any) => item.id === "2225");
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      fmatchWrap.map((fmatchItem: any, index: any) => {
        let title = fmatchItem.name;
        if (title === "Home") {
          title = data?.localteam?.name;
        } else if (title === "Away") {
          title = data?.visitorteam?.name;
        } else if (title === "Draw") {
          title = "No Goal";
        }
        arr.push({
          title: title,
          value: fmatchItem.value,
          suspend: fmatchItem.stop === "False" ? "0" : "1",
          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: match[0].id,
          odd_name: fmatchItem.value,
          participant_id: index,
          participant_name: fmatchItem.name,
        });
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const goalOddEven = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  let match = data?.odds?.filter((item: any) => item.id === "22608");
  if (match && match.length > 0) {
    const arr = [] as any;
    match[0]?.bookmakers[0].odds?.map((fmatchItem: any, index: any) => {
      let title = fmatchItem?.name;
      title = title.replaceAll("Home", data?.localteam?.name);
      title = title.replaceAll("Away", data?.visitorteam?.name);
      arr.push({
        title: title,
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
    });
    tosend.push(arr);
  }
  return tosend;
};
export const firsthalfgoalOddEven = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  let match = data?.odds?.filter((item: any) => item.id === "22609");
  if (match && match.length > 0) {
    const arr = [] as any;
    match[0]?.bookmakers[0].odds?.map((fmatchItem: any, index: any) => {
      let title = fmatchItem?.name;
      title = title.replaceAll("Home", data?.localteam?.name);
      title = title.replaceAll("Away", data?.visitorteam?.name);
      arr.push({
        title: title,
        value: fmatchItem.value,
        suspend: fmatchItem.stop === "False" ? "0" : "1",
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: match[0].id,
        odd_name: fmatchItem.value,
        participant_id: index,
        participant_name: fmatchItem.name,
      });
    });
    tosend.push(arr);
  }
  return tosend;
};

export const bothTeamsToScoreHalf = (data: any, half: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let tosend = [] as any;
  let match = data?.odds?.filter((item: any) => item.id === "22604");
  if (half === "2") {
    match = data?.odds?.filter((item: any) => item.id === "22605");
  }
  if (match && match.length > 0) {
    const fmatch = match[0]?.bookmakers[0].odds.map(
      (fmatchItem: any, index: any) => {
        return {
          title: fmatchItem.name,
          value: fmatchItem.value,
          suspend: fmatchItem.stop === "False" ? "0" : "1",
          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: match[0].id,
          odd_name: fmatchItem.value,
          participant_id: index,
          participant_name: fmatchItem.name,
        };
      }
    );
    tosend.push(fmatch);
  }
  return tosend;
};

export const HalfGoals = (data: any, half: any = "1") => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  let match = data?.odds?.filter((item: any) => item.id === "6");
  if (half === "2") {
    match = data?.odds?.filter((item: any) => item.id === "7");
  }
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      fmatchWrap.map((fmatch: any, index: any) => {
        const arr = [{ title: fmatch.name, value: "", suspend: "0" }] as any;
        fmatch.odds.map((fmatchItem: any) => {
          arr.push({
            title: "",
            value: fmatchItem.value,
            suspend: fmatchItem.stop === "False" ? "0" : "1",
            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: match[0].id,
            odd_name: fmatchItem.value,
            participant_id: index,
            participant_name: fmatchItem.name,
          });
        });
        tosend.push(arr);
      });
    }
  }
  return tosend;
};
export const cleanSheet = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  const arr = [] as any;
  let match = data?.odds?.filter((item: any) => item.id === "13");
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      fmatchWrap.map((fmatchItem: any, index: any) => {
        arr.push({
          title: fmatchItem.name,
          value: fmatchItem.value,
          suspend: fmatchItem.stop === "False" ? "0" : "1",
          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: match[0].id,
          odd_name: fmatchItem.value,
          participant_id: index,
          participant_name: fmatchItem.name,
        });
      });
    }
  }
  match = data?.odds?.filter((item: any) => item.id === "14");
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      fmatchWrap.map((fmatchItem: any, index: any) => {
        arr.push({
          title: fmatchItem.name,
          value: fmatchItem.value,
          suspend: fmatchItem.stop === "False" ? "0" : "1",
          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: match[0].id,
          odd_name: fmatchItem.value,
          participant_id: index,
          participant_name: fmatchItem.name,
        });
      });
    }
  }
  tosend.push(arr);
  return tosend;
};

export const halfTimeResult = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  const match = data?.odds?.filter((item: any) => item.id === "2102");
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      fmatchWrap.map((fmatchItem: any, index: any) => {
        let title = fmatchItem.name;
        if (title === "Home") {
          title = data?.localteam?.name;
        } else if (title === "Away") {
          title = data?.visitorteam?.name;
        } else if (title === "Draw") {
          title = "Draw";
        }
        arr.push({
          title: title,
          value: fmatchItem.value,
          suspend: fmatchItem.stop === "False" ? "0" : "1",
          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: match[0].id,
          odd_name: fmatchItem.value,
          participant_id: index,
          participant_name: fmatchItem.name,
        });
      });
      tosend.push(arr);
    }
  }
  return tosend;
};
export const halfTimeDoubleChance = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  const match = data?.odds?.filter((item: any) => item.id === "22602");
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      fmatchWrap.map((fmatchItem: any, index: any) => {
        let title = fmatchItem.name;
        title = title.replaceAll("Home", data?.localteam?.name);
        title = title.replace("/", " or ");
        title = title.replaceAll("Away", data?.visitorteam?.name);
        arr.push({
          title: title,
          value: fmatchItem.value,
          suspend: fmatchItem.stop === "False" ? "0" : "1",
          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: match[0].id,
          odd_name: fmatchItem.value,
          participant_id: index,
          participant_name: fmatchItem.name,
        });
      });
      tosend.push(arr);
    }
  }
  return tosend;
};
export const halfTimeResultBothTeamsToScore = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let tosend = [] as any;

  const match = data?.odds?.filter((item: any) => item.id === "22840");
  if (match && match.length > 0) {
    const spread = Object.entries(match[0]?.bookmakers[0].odds);
    if (spread.length > 0) {
      let home = [
        { title: data?.localteam?.name, value: null, suspend: null },
      ] as any;
      let away = [
        { title: data?.visitorteam?.name, value: null, suspend: null },
      ] as any;
      let draw = [{ title: "Draw", value: null, suspend: null }] as any;
      spread.forEach(([key, value]: [any, any]) => {
        if (value.name === "Home/Yes") {
          home.push({
            title: "",
            value: value.value,
            suspend: value.stop === "False" ? "0" : "1",
            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: match[0].id,
            odd_name: value.name,
            participant_id: 0,
            participant_name: value.name,
          });
        }
        if (value.name === "Away/Yes") {
          away.push({
            title: "",
            value: value.value,
            suspend: value.stop === "False" ? "0" : "1",
            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: match[0].id,
            odd_name: value.name,
            participant_id: 0,
            participant_name: value.name,
          });
        }
        if (value.name === "Draw/Yes") {
          draw.push({
            title: "",
            value: value.value,
            suspend: value.stop === "False" ? "0" : "1",
            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: match[0].id,
            odd_name: value.name,
            participant_id: 0,
            participant_name: value.name,
          });
        }
      });
      spread.forEach(([key, value]: [any, any]) => {
        if (value.name === "Home/No") {
          home.push({
            title: "",
            value: value.value,
            suspend: value.stop === "False" ? "0" : "1",
            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: match[0].id,
            odd_name: value.name,
            participant_id: 0,
            participant_name: value.name,
          });
        }
        if (value.name === "Away/No") {
          away.push({
            title: "",
            value: value.value,
            suspend: value.stop === "False" ? "0" : "1",
            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: match[0].id,
            odd_name: value.name,
            participant_id: 0,
            participant_name: value.name,
          });
        }
        if (value.name === "Draw/No") {
          draw.push({
            title: "",
            value: value.value,
            suspend: value.stop === "False" ? "0" : "1",
            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: match[0].id,
            odd_name: value.name,
            participant_id: 0,
            participant_name: value.name,
          });
        }
      });
      tosend = [home, away, draw];
    }
  }
  return tosend;
};

export const halfTimeCorrectScore = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let tosend = [] as any;
  const match = data?.odds?.filter((item: any) => item.id === "181");
  if (match && match.length > 0) {
    const result = [] as any;
    const left = [] as any;
    const middle = [] as any;
    const right = [] as any;
    match[0]?.bookmakers[0].odds.map((item: any, index: any) => {
      let checkingData = item?.name.split(":");
      checkingData[0] = Number(checkingData[0]);
      checkingData[1] = Number(checkingData[1]);
      if (item?.stop === "False") {
        if (checkingData[0] > checkingData[1]) {
          left.push({
            title: item?.name.replace(":", "-"),
            value: item?.value,
            suspend: item?.stop === "False" ? "0" : "1",
            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: match[0].id,
            odd_name: item?.name,
            participant_id: 0,
            participant_name: item?.name,
          });
        } else if (checkingData[0] === checkingData[1]) {
          middle.push({
            title: item?.name.replace(":", "-"),
            value: item?.value,
            suspend: item?.stop === "False" ? "0" : "1",
            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: match[0].id,
            odd_name: item?.name,
            participant_id: 0,
            participant_name: item?.name,
          });
        } else {
          right.push({
            title: item?.name.replace(":", "-"),
            value: item?.value,
            suspend: item?.stop === "False" ? "0" : "1",
            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: match[0].id,
            odd_name: item?.name,
            participant_id: 0,
            participant_name: item?.name,
          });
        }
      }
    });
    console.log({ left: left, middle: middle, right: right });
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
  return tosend;
};
// upto

export const nthGoalMarketName = (data: any, oddData: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let goal = "";
  let home = "";
  let nogoal = "";
  let away = "";
  let suspend = "0";
  let tosend = [] as any;
  if (data) {
    Object.keys(data?.odds).map((item) => {
      if (
        data.odds[item].name.startsWith("Which team will score the ") &&
        data.odds[item].name.includes("goal?")
      ) {
        let ngoal = data.odds[item].name.replace(
          "Which team will score the ",
          ""
        );
        goal = ngoal.replace(" goal?", "");
        console.log(data.odds[item]);
        const spread = Object.entries(data?.odds?.[item]?.participants);
        const arr = [] as any;
        spread.map((item: any, index: number) => {
          let title = "";
          let value = "";
          let suspend = "0";
          title = item[1]?.name;
          if (title === "1") {
            title = data?.team_info?.home?.name;
          }
          if (title === "2") {
            title = data?.team_info?.away?.name;
          }
          if (title === "No goal") {
            title = `No ${goal} Goal`;
          }
          value = item[1]?.value_eu;
          suspend = item[1]?.suspend;
          arr.push({
            title: title,
            value: value,
            suspend: suspend,

            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: item,
            odd_name: item?.name,
            participant_id: 0,
            participant_name: item?.name,
          });
        });
        suspend = data.odds[item].suspend;
        tosend.push(arr);
      }
    });
  }
  oddData.suspend = suspend;
  oddData.marketname = goal + " Goal";
  oddData.rows = tosend;
  return oddData;
};

export const matchGoals = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  if (data?.odds?.[421]?.participants) {
    const participantsObject = { ...data?.odds?.[421]?.participants };
    const keys = Object.keys(participantsObject).slice(-2);

    console.log(keys);
    let arr = [] as any;
    keys.map((key: any, index: number) => {
      if (index === 0) {
        arr.push({
          title: data?.odds?.[421]?.participants[key].handicap,
          value: null,
          suspend: data?.odds?.[421]?.participants[key].suspend,
          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: 421,
          odd_name: data?.odds?.[421]?.name,
          participant_id: 0,
          participant_name: data?.odds?.[421]?.participants[key].name,
        });
      }
      arr.push({
        title: "",
        value: data?.odds?.[421]?.participants[key].value_eu,
        suspend: data?.odds?.[421]?.participants[key].suspend,
        event_id: data?.id,
        event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
        odd_id: 421,
        odd_name: data?.odds?.[421]?.name,
        participant_id: 0,
        participant_name: data?.odds?.[421]?.participants[key].name,
      });
    });
    tosend.push(arr);
  }
  return tosend;
};
export const alternativematchGoals = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  const participantsObject = { ...data?.odds?.[421]?.participants };
  const keysToRemove = Object.keys(participantsObject).slice(-2);

  keysToRemove.forEach((key) => {
    delete participantsObject[key];
  });
  if (participantsObject) {
    let array = [] as any;
    array = Object.values(participantsObject).reduce(
      (acc: any, participant: any) => {
        const existingIndex = acc.findIndex(
          (arr: any) => arr[0].title === participant.handicap
        );

        if (existingIndex !== -1) {
          acc[existingIndex].push({
            title: "",
            value: participant.value_eu,
            suspend: participant.suspend,
          });
        } else {
          acc.push([
            {
              title: participant.handicap,
              value: null,
              suspend: participant.suspend,
            },
            {
              title: "",
              value: participant.value_eu,
              suspend: participant.suspend,
            },
          ]);
        }
        return acc;
      },
      []
    );
    array.sort((a: any, b: any) => parseInt(a[0].title) - parseInt(b[0].title));
    return array;
  }
  return tosend;
};

export const threeWayHandicap = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  if (data?.odds?.[11]?.participants) {
    const spread = Object.entries(data?.odds?.[11]?.participants);
    if (spread.length > 0) {
      let existing = [] as any;
      spread.forEach(([key, value]: [any, any]) => {
        existing.push({
          title: value.handicap,
          value: value.value_eu,
          suspend: value.suspend,
          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: 11,
          odd_name: data?.odds?.[11]?.name,
          participant_id: 0,
          participant_name: value.name,
        });
        if (existing.length == 3) {
          tosend.push(existing);
          existing = [];
        }
      });
    }
  }
  console.log("Sending New Data", data);
  return tosend;
};

export const toWin2ndHalf = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  if (data?.odds?.[50246]?.participants) {
    const spread = Object.entries(data?.odds?.[50246]?.participants);
    if (spread.length > 0) {
      const arr = [] as any;
      spread.map((item: any, index: number) => {
        let title = "";
        let value = "";
        let suspend = "0";
        title = item[1]?.name;
        if (title === "Home") {
          title = data?.team_info?.home?.name;
        }
        if (title === "Away") {
          title = data?.team_info?.away?.name;
        }
        value = item[1]?.value_eu;
        suspend = item[1]?.suspend;
        arr.push({
          title: title,
          value: value,
          suspend: suspend,

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: 11,
          odd_name: data?.odds?.[50246]?.name,
          participant_id: 0,
          participant_name: item[1]?.name,
        });
      });
      tosend.push(arr);
    }
  }
  console.log("Sending New Data", data);
  return tosend;
};

interface FormattedData {
  title: string;
  value: string;
  suspend: string;
}
export const finalScore = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let tosend = [] as any;

  if (data?.odds?.[10001]?.participants) {
    const result = [] as any;
    const left = [] as any;
    const middle = [] as any;
    const right = [] as any;
    Object.keys(data?.odds?.[10001]?.participants).map((item) => {
      let checkingData = data?.odds?.[10001]?.participants[item]?.name.split(
        "-"
      );
      checkingData[0] = Number(checkingData[0]);
      checkingData[1] = Number(checkingData[1]);
      if (data?.odds?.[10001]?.participants[item]?.suspend === "0") {
        if (checkingData[0] > checkingData[1]) {
          left.push({
            title: data?.odds?.[10001]?.participants[item]?.name,
            value: data?.odds?.[10001]?.participants[item]?.value_eu,
            suspend: data?.odds?.[10001]?.participants[item]?.suspend,
            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: 11,
            odd_name: data?.odds?.[10001]?.name,
            participant_id: 0,
            participant_name: data?.odds?.[10001]?.participants[item]?.name,
          });
        } else if (checkingData[0] === checkingData[1]) {
          middle.push({
            title: data?.odds?.[10001]?.participants[item]?.name,
            value: data?.odds?.[10001]?.participants[item]?.value_eu,
            suspend: data?.odds?.[10001]?.participants[item]?.suspend,
            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: 11,
            odd_name: data?.odds?.[10001]?.name,
            participant_id: 0,
            participant_name: data?.odds?.[10001]?.participants[item]?.name,
          });
        } else {
          right.push({
            title: data?.odds?.[10001]?.participants[item]?.name,
            value: data?.odds?.[10001]?.participants[item]?.value_eu,
            suspend: data?.odds?.[10001]?.participants[item]?.suspend,
            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: 11,
            odd_name: data?.odds?.[10001]?.name,
            participant_id: 0,
            participant_name: data?.odds?.[10001]?.participants[item]?.name,
          });
        }
      }
    });
    console.log({ left: left, middle: middle, right: right });
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
  // console.log({ tosend })
  return tosend;
};

export const firstHalfHandicap = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  if (data?.odds?.[2000]?.participants) {
    console.log(
      "data?.odds?.[2000]?.participants",
      data?.odds?.[2000]?.participants
    );
    const spread = Object.entries(data?.odds?.[2000]?.participants);
    if (spread.length > 0) {
      let existing = [] as any;
      spread.forEach(([key, value]: [any, any]) => {
        existing.push({
          title: value.handicap,
          value: value.value_eu,
          suspend: value.suspend,
          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: 2000,
          odd_name: data?.odds?.[2000]?.name,
          participant_id: 0,
          participant_name: value.name,
        });
        if (existing.length == 3) {
          tosend.push(existing);
          existing = [];
        }
      });
    }
  }
  tosend.sort((a: any, b: any) => parseInt(a[0].title) - parseInt(b[0].title));
  return tosend;
};

export const asianCorners = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let tosend = [] as any;
  if (data?.odds?.[90006]?.participants) {
    const participantsObject = data?.odds?.[90006]?.participants;
    if (participantsObject) {
      let array = [] as any;
      array = Object.values(participantsObject).reduce(
        (acc: any, participant: any) => {
          const existingIndex = acc.findIndex(
            (arr: any) => arr[0].title === participant.handicap
          );

          if (existingIndex !== -1) {
            acc[existingIndex].push({
              title: "",
              value: participant.value_eu,
              suspend: participant.suspend,
              event_id: data?.id,
              event_name:
                data?.localteam?.name + " vs " + data?.visitorteam.name,
              odd_id: 90006,
              odd_name: data?.odds?.[90006]?.name,
              participant_id: 0,
              participant_name: participant.name,
            });
          } else {
            acc.push([
              {
                title: participant.handicap,
                value: null,
                suspend: participant.suspend,
              },
              {
                title: "",
                value: participant.value_eu,
                suspend: participant.suspend,
                event_id: data?.id,
                event_name:
                  data?.localteam?.name + " vs " + data?.visitorteam.name,
                odd_id: 90006,
                odd_name: data?.odds?.[90006]?.name,
                participant_id: 0,
                participant_name: participant.name,
              },
            ]);
          }
          return acc;
        },
        []
      );
      array.sort((a: any, b: any) => a[0].title - b[0].title);
      return array;
    }
  }
  return tosend;
};
export const firstHalfAsianCorners = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let tosend = [] as any;
  if (data?.odds?.[906]?.participants) {
    const participantsObject = data?.odds?.[906]?.participants;
    if (participantsObject) {
      let array = [] as any;
      array = Object.values(participantsObject).reduce(
        (acc: any, participant: any) => {
          const existingIndex = acc.findIndex(
            (arr: any) => arr[0].title === participant.handicap
          );

          if (existingIndex !== -1) {
            acc[existingIndex].push({
              title: "",
              value: participant.value_eu,
              suspend: participant.suspend,

              event_id: data?.id,
              event_name:
                data?.localteam?.name + " vs " + data?.visitorteam.name,
              odd_id: 906,
              odd_name: data?.odds?.[906]?.name,
              participant_id: 0,
              participant_name: participant.name,
            });
          } else {
            acc.push([
              {
                title: participant.handicap,
                value: null,
                suspend: participant.suspend,
              },
              {
                title: "",
                value: participant.value_eu,
                suspend: participant.suspend,
                event_id: data?.id,
                event_name:
                  data?.localteam?.name + " vs " + data?.visitorteam.name,
                odd_id: 906,
                odd_name: data?.odds?.[906]?.name,
                participant_id: 0,
                participant_name: participant.name,
              },
            ]);
          }
          return acc;
        },
        []
      );
      array.sort((a: any, b: any) => a[0].title - b[0].title);
      return array;
    }
  }
  return tosend;
};

export const cornerRace = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let tosend = [] as any;
  if (data) {
    Object.keys(data?.odds).map((item) => {
      if (
        data.odds[item].name.startsWith("Race to the ") &&
        data.odds[item].name.includes("corner?")
      ) {
        let corner = data.odds[item].name.replace("Race to the ", "");
        corner = corner.replace(" corner?", "");
        corner = corner.slice(0, -2);
        const spread = Object.entries(data?.odds?.[item]?.participants);
        const arr = [
          { title: corner, value: null, suspend: data.odds[item].suspend },
        ] as any;
        spread.map((item: any, index: number) => {
          let title = "";
          let value = "";
          let suspend = "0";
          value = item[1]?.value_eu;
          suspend = item[1]?.suspend;
          arr.push({
            title: title,
            value: value,
            suspend: suspend,

            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: 906,
            odd_name: data?.odds?.[item]?.name,
            participant_id: index,
            participant_name: item[1]?.name,
          });
        });
        tosend.push(arr);
      }
    });
  }
  return tosend;
};

export const corners = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let tosend = [] as any;
  if (data) {
    Object.keys(data?.odds).map((item) => {
      if (
        data.odds[item].name.startsWith("Which team will score the ") &&
        data.odds[item].name.includes(" corner? (2 Way)")
      ) {
        let corner = data.odds[item].name.replace(
          "Which team will score the ",
          ""
        );
        corner = corner.replace(" corner? (2 Way)", "");
        corner = corner + " Corner";
        const spread = Object.entries(data?.odds?.[item]?.participants);
        const arr = [
          { title: corner, value: null, suspend: data.odds[item].suspend },
        ] as any;
        spread.map((item: any, index: number) => {
          let title = "";
          let value = "";
          let suspend = "0";
          value = item[1]?.value_eu;
          suspend = item[1]?.suspend;
          arr.push({
            title: title,
            value: value,
            suspend: suspend,

            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: 906,
            odd_name: data?.odds?.[item]?.name,
            participant_id: index,
            participant_name: item[1]?.name,
          });
        });
        tosend.push(arr);
      }
      if (data.odds[item].name === "Last Corner") {
        const spread = Object.entries(data?.odds?.[item]?.participants);
        const arr = [
          { title: "Last", value: null, suspend: data.odds[item].suspend },
        ] as any;
        spread.map((item: any, index: number) => {
          let title = "";
          let value = "";
          let suspend = "0";
          value = item[1]?.value_eu;
          suspend = item[1]?.suspend;
          arr.push({
            title: title,
            value: value,
            suspend: suspend,

            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: 906,
            odd_name: data?.odds?.[item]?.name,
            participant_id: index,
            participant_name: item[1]?.name,
          });
        });
        tosend.push(arr);
      }
    });
    // formatting making Last to alway appear at last
    if (tosend.length > 1) {
      const newData = [...tosend];
      let lastArray = null;

      for (const array of newData) {
        if (array[0].title === "Last") {
          lastArray = array;
          newData.splice(newData.indexOf(array), 1);
          break;
        }
      }
      if (lastArray) {
        newData.push(lastArray);
      }
      tosend = newData;
    }
  }
  return tosend;
};

export const twoWayCorners = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  if (data?.odds?.[520]?.participants) {
    const spread = Object.entries(data?.odds?.[520]?.participants);
    if (spread.length > 0) {
      let existing = [] as any;
      spread.forEach(([key, value]: [any, any]) => {
        if (existing.length == 0) {
          existing.push({
            title: value.handicap,
            value: "",
            suspend: value.suspend,
          });
        }
        existing.push({
          title: "",
          value: value.value_eu,
          suspend: value.suspend,
          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: 520,
          odd_name: data?.odds?.[520]?.name,
          participant_id: 0,
          participant_name: value?.name,
        });
        if (existing.length == 3) {
          existing;
          tosend.push(existing);
          existing = [];
        }
      });
    }
  }
  return tosend;
};

export const toQualify = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  if (data?.odds?.[93005]?.participants) {
    const spread = Object.entries(data?.odds?.[93005]?.participants);
    if (spread.length > 0) {
      const arr = [] as any;
      spread.map((item: any, index: number) => {
        let title = "";
        let value = "";
        let suspend = "0";
        title = item[1]?.name;
        if (title === "1") {
          title = data?.team_info?.home?.name;
        }
        if (title === "2") {
          title = data?.team_info?.away?.name;
        }
        value = item[1]?.value_eu;
        suspend = item[1]?.suspend;
        arr.push({
          title: title,
          value: value,
          suspend: suspend,

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: 93005,
          odd_name: data?.odds?.[93005]?.name,
          participant_id: 0,
          participant_name: item[1]?.name,
        });
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const twoCellTitleValue = (data: any, fn: string) => {
  if (!data && !data.odds) {
    return [];
  }
  if (!fn) {
    return [];
  }
  let id = 1111111110 as number;
  if (fn === "toWintheTrophy") {
    id = 9200415;
  } else if (fn === "gameWonInExtraTime") {
    id = 93009;
  } else if (fn === "gameWonAfterPenaltiesShootout") {
    id = 50009;
  } else if (fn === "bothTeamsToScoreFirstHalf") {
    id = 317;
  } else if (fn === "bothTeamsToScoreSecondHalf") {
    id = 318;
  } else if (fn === "teamCleanSheet") {
    id = 307;
  } else {
    return [];
  }
  const tosend = [] as any;
  if (data?.odds?.[id]?.participants) {
    const spread = Object.entries(data?.odds?.[id]?.participants);
    if (spread.length > 0) {
      const arr = [] as any;
      spread.map((item: any, index: number) => {
        let title = "";
        let value = "";
        let suspend = "0";
        title = item[1]?.name;
        if (title === "1") {
          title = data?.team_info?.home?.name;
        }
        if (title === "2") {
          title = data?.team_info?.away?.name;
        }
        value = item[1]?.value_eu;
        suspend = item[1]?.suspend;
        arr.push({
          title: title,
          value: value,
          suspend: suspend,

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: id,
          odd_name: data?.odds?.[id]?.name,
          participant_id: 0,
          participant_name: item[1]?.name,
        });
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const goalsOverUnder = (data: any, oddData: any, fn: string) => {
  if (!data && !data.odds) {
    return [];
  }

  let id = 10101010010100;
  if (fn === "homeGoals") {
    id = 1;
    oddData.marketname = oddData?.marketname?.replace(
      "Home",
      data?.team_info?.home?.name
    );
  } else if (fn === "awayGoals") {
    id = 2;
    oddData.marketname = oddData?.marketname?.replace(
      "Away",
      data?.team_info?.home?.name
    );
  } else {
    return oddData;
  }

  const tosend = [] as any;
  if (data?.odds?.[id]?.participants) {
    const participantsObject = data?.odds?.[id]?.participants;
    if (participantsObject) {
      let array = [] as any;
      array = Object.values(participantsObject).reduce(
        (acc: any, participant: any) => {
          const existingIndex = acc.findIndex(
            (arr: any) => arr[0].title === participant.handicap
          );

          if (existingIndex !== -1) {
            acc[existingIndex].push({
              title: "",
              value: participant.value_eu,
              suspend: participant.suspend,

              event_id: data?.id,
              event_name:
                data?.localteam?.name + " vs " + data?.visitorteam.name,
              odd_id: id,
              odd_name: data?.odds?.[id]?.name,
              participant_id: 0,
              participant_name: participant?.name,
            });
          } else {
            acc.push([
              {
                title: participant.handicap,
                value: null,
                suspend: participant.suspend,
              },
              {
                title: "",
                value: participant.value_eu,
                suspend: participant.suspend,

                event_id: data?.id,
                event_name:
                  data?.localteam?.name + " vs " + data?.visitorteam.name,
                odd_id: id,
                odd_name: data?.odds?.[id]?.name,
                participant_id: 0,
                participant_name: participant?.name,
              },
            ]);
          }

          return acc;
        },
        []
      );
      array.sort((a: any, b: any) => a[0].title - b[0].title);
      return array;
    }
  }
  console.log("Sending New Data", data);

  oddData.rows = tosend;
  return oddData;
};

export const betMatchGoals = (data: any, oddData: any) => {
  if (!data && !data.odds) {
    return oddData;
  }

  const participantsObject = { ...data?.odds?.[421]?.participants };

  if (participantsObject) {
    let array = [] as any;
    array = Object.values(participantsObject).reduce(
      (acc: any, participant: any) => {
        const existingIndex = acc.findIndex(
          (arr: any) => arr[0].title === participant.handicap
        );

        if (existingIndex !== -1) {
          acc[existingIndex].push({
            title: "",
            value: participant.value_eu,
            suspend: participant.suspend,

            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: 421,
            odd_name: data?.odds?.[421]?.name,
            participant_id: 0,
            participant_name: participant?.name,
          });
        } else {
          acc.push([
            {
              title: participant.handicap,
              value: null,
              suspend: participant.suspend,
            },
            {
              title: "",
              value: participant.value_eu,
              suspend: participant.suspend,

              event_id: data?.id,
              event_name:
                data?.localteam?.name + " vs " + data?.visitorteam.name,
              odd_id: 421,
              odd_name: data?.odds?.[421]?.name,
              participant_id: 0,
              participant_name: participant?.name,
            },
          ]);
        }
        return acc;
      },
      []
    );
    array.sort((a: any, b: any) => a[0].title - b[0].title);

    oddData["Match"] = array;
  }
  const participantsObject1sthalf = { ...data?.odds?.[31]?.participants };

  if (participantsObject1sthalf) {
    let array = [] as any;
    array = Object.values(participantsObject1sthalf).reduce(
      (acc: any, participant: any) => {
        const existingIndex = acc.findIndex(
          (arr: any) => arr[0].title === participant.handicap
        );

        if (existingIndex !== -1) {
          acc[existingIndex].push({
            title: "",
            value: participant.value_eu,
            suspend: participant.suspend,

            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: 31,
            odd_name: data?.odds?.[31]?.name,
            participant_id: 0,
            participant_name: participant?.name,
          });
        } else {
          acc.push([
            {
              title: participant.handicap,
              value: null,
              suspend: participant.suspend,
            },
            {
              title: "",
              value: participant.value_eu,
              suspend: participant.suspend,

              event_id: data?.id,
              event_name:
                data?.localteam?.name + " vs " + data?.visitorteam.name,
              odd_id: 31,
              odd_name: data?.odds?.[31]?.name,
              participant_id: 0,
              participant_name: participant?.name,
            },
          ]);
        }
        return acc;
      },
      []
    );
    array.sort((a: any, b: any) => a[0].title - b[0].title);

    oddData["1st Half"] = array;
  }

  if (oddData && oddData.subtabs) {
    oddData.subtabs = oddData.subtabs.filter((item: string) => {
      if (oddData[item]?.length > 0) {
        return true;
      } else {
        return false;
      }
    });
  }

  return oddData;
};

export const betNextGoal = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let tosend = [] as any;
  if (data) {
    Object.keys(data?.odds).map((item) => {
      if (
        data.odds[item].name.startsWith("Which team will score the ") &&
        data.odds[item].name.includes("goal?")
      ) {
        const spread = Object.entries(data?.odds?.[item]?.participants);
        spread.map((item: any, index: number) => {
          let title = "";
          let value = "";
          let suspend = "0";
          title = item[1]?.name;
          if (title === "1") {
            title = data?.team_info?.home?.name;
          }
          if (title === "2") {
            title = data?.team_info?.away?.name;
          }
          if (title === "No goal") {
            title = `Neither Team`;
          }
          value = item[1]?.value_eu;
          suspend = item[1]?.suspend;
          tosend.push([
            { title: title, value: "", suspend: suspend },
            {
              title: "",
              value: value,
              suspend: suspend,

              event_id: data?.id,
              event_name:
                data?.localteam?.name + " vs " + data?.visitorteam.name,
              odd_id: item,
              odd_name: data?.odds?.[item]?.name,
              participant_id: 0,
              participant_name: item[1]?.name,
            },
          ]);
        });
      }
    });
  }

  return tosend;
};

export const betTeamGoals = (data: any, oddData: any) => {
  if (!data && !data.odds) {
    return oddData;
  }

  const participantsObject = { ...data?.odds?.[1]?.participants };
  oddData.subtabs = [];
  if (participantsObject) {
    oddData.subtabs.push(data?.team_info?.home?.name);
    let array = [] as any;
    array = Object.values(participantsObject).reduce(
      (acc: any, participant: any) => {
        const existingIndex = acc.findIndex(
          (arr: any) => arr[0].title === participant.handicap
        );

        if (existingIndex !== -1) {
          acc[existingIndex].push({
            title: "",
            value: participant.value_eu,
            suspend: participant.suspend,
            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: 1,
            odd_name: data?.odds?.[1]?.name,
            participant_id: 0,
            participant_name: participant?.name,
          });
        } else {
          acc.push([
            {
              title: participant.handicap,
              value: null,
              suspend: participant.suspend,
            },
            {
              title: "",
              value: participant.value_eu,
              suspend: participant.suspend,
              event_id: data?.id,
              event_name:
                data?.localteam?.name + " vs " + data?.visitorteam.name,
              odd_id: 1,
              odd_name: data?.odds?.[1]?.name,
              participant_id: 0,
              participant_name: participant?.name,
            },
          ]);
        }
        return acc;
      },
      []
    );
    array.sort((a: any, b: any) => a[0].title - b[0].title);

    oddData[data?.team_info?.home?.name] = array;
  }
  const participantsObject1sthalf = { ...data?.odds?.[2]?.participants };

  if (participantsObject1sthalf) {
    oddData.subtabs.push(data?.team_info?.away?.name);
    let array = [] as any;
    array = Object.values(participantsObject1sthalf).reduce(
      (acc: any, participant: any) => {
        const existingIndex = acc.findIndex(
          (arr: any) => arr[0].title === participant.handicap
        );

        if (existingIndex !== -1) {
          acc[existingIndex].push({
            title: "",
            value: participant.value_eu,
            suspend: participant.suspend,

            event_id: data?.id,
            event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
            odd_id: 2,
            odd_name: data?.odds?.[2]?.name,
            participant_id: 0,
            participant_name: participant?.name,
          });
        } else {
          acc.push([
            {
              title: participant.handicap,
              value: null,
              suspend: participant.suspend,
            },
            {
              title: "",
              value: participant.value_eu,
              suspend: participant.suspend,

              event_id: data?.id,
              event_name:
                data?.localteam?.name + " vs " + data?.visitorteam.name,
              odd_id: 2,
              odd_name: data?.odds?.[2]?.name,
              participant_id: 0,
              participant_name: participant?.name,
            },
          ]);
        }
        return acc;
      },
      []
    );
    array.sort((a: any, b: any) => a[0].title - b[0].title);

    oddData[data?.team_info?.away?.name] = array;
  }

  if (oddData && oddData.subtabs) {
    oddData.subtabs = oddData.subtabs.filter((item: string) => {
      if (oddData[item]?.length > 0) {
        return true;
      } else {
        return false;
      }
    });
  }

  return oddData;
};

export const BetTeamToScorein2ndHalf = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  if (data?.odds?.[90307]?.participants) {
    const spread = Object.entries(data?.odds?.[90307]?.participants);
    if (spread.length > 0) {
      let arr = [
        {
          title: data?.team_info?.home?.name,
          value: "",
          suspend: data?.odds?.[90307]?.suspend,
        },
      ] as any;
      spread.map((item: any, index: number) => {
        let title = "";
        let value = "";
        let suspend = "0";
        title = item[1]?.name;
        value = item[1]?.value_eu;
        suspend = item[1]?.suspend;
        arr.push({
          title: "",
          value: value,
          suspend: suspend,

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: 90307,
          odd_name: data?.odds?.[90307]?.name,
          participant_id: 0,
          participant_name: item[1]?.name,
        });
      });
      tosend.push(arr);
    }
  }
  if (data?.odds?.[90308]?.participants) {
    const spread = Object.entries(data?.odds?.[90308]?.participants);
    if (spread.length > 0) {
      let arr = [
        {
          title: data?.team_info?.away?.name,
          value: "",
          suspend: data?.odds?.[90308]?.suspend,
        },
      ] as any;
      spread.map((item: any, index: number) => {
        let title = "";
        let value = "";
        let suspend = "0";
        title = item[1]?.name;
        value = item[1]?.value_eu;
        suspend = item[1]?.suspend;
        arr.push({
          title: "",
          value: value,
          suspend: suspend,

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: 90308,
          odd_name: data?.odds?.[90308]?.name,
          participant_id: 0,
          participant_name: item[1]?.name,
        });
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const BetTeamToScoreinBothHalf = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  // if (data?.odds?.[90307]?.participants) {
  //     const spread = Object.entries(data?.odds?.[90307]?.participants)
  //     if (spread.length > 0) {
  //         let arr=[{ title: data?.team_info?.home?.name, value: '', suspend: data?.odds?.[90307]?.suspend }]as any;
  //         spread.map((item: any, index: number) => {
  //             let title = '';
  //             let value = '';
  //             let suspend = '0';
  //             title = item[1]?.name
  //             value = item[1]?.value_eu
  //             suspend = item[1]?.suspend
  //             arr.push({ title: '', value: value, suspend: suspend })
  //         })
  //         tosend.push(arr)
  //     }
  // }
  if (data?.odds?.[90311]?.participants) {
    const spread = Object.entries(data?.odds?.[90311]?.participants);
    if (spread.length > 0) {
      let arr = [
        {
          title: data?.team_info?.away?.name,
          value: "",
          suspend: data?.odds?.[90311]?.suspend,
        },
      ] as any;
      spread.map((item: any, index: number) => {
        let title = "";
        let value = "";
        let suspend = "0";
        title = item[1]?.name;
        value = item[1]?.value_eu;
        suspend = item[1]?.suspend;
        arr.push({
          title: "",
          value: value,
          suspend: suspend,

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: 90311,
          odd_name: data?.odds?.[90311]?.name,
          participant_id: 0,
          participant_name: item[1]?.name,
        });
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const goalscorers = (data: any) => {
  const match = data?.odds?.main?.sp?.goalscorers?.odds;
  const odd_id = data?.odds?.main?.sp?.goalscorers?.id;
  const odd_name = data?.odds?.main?.sp?.goalscorers?.name;

  const grouped_by_name = get_objects_grouped_by_name(match);
  console.log({ ggo: data });
  const base_arr = [] as any;

  return base_arr;
};

export const betMatchCorners = (data: any, oddData: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let tosend = [] as any;
  if (data?.odds?.[16]?.participants) {
    const spread = Object.entries(data?.odds?.[16]?.participants);
    if (spread.length > 0) {
      let existing = [] as any;
      spread.forEach(([key, value]: [any, any]) => {
        if (existing.length == 0) {
          existing.push({
            title: `${value.handicap} Corners`,
            value: "",
            suspend: value.suspend,
          });
        }
        existing.push({
          title: "",
          value: value.value_eu,
          suspend: value.suspend,
          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.visitorteam.name,
          odd_id: 16,
          odd_name: data?.odds?.[16]?.name,
          participant_id: 0,
          participant_name: value.name,
        });
        if (existing.length == 4) {
          tosend.push(existing);
          existing = [];
        }
      });
    }
  }
  tosend.sort((a: any, b: any) => a[0].title - b[0].title);
  oddData["Match"] = tosend;
  if (oddData && oddData.subtabs) {
    oddData.subtabs = oddData.subtabs.filter((item: string) => {
      if (oddData[item]?.length > 0) {
        return true;
      } else {
        return false;
      }
    });
  }
  return oddData;
};
