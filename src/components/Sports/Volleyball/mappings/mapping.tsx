"use client";
import { apiBaseUrl } from "next-auth/client/_utils";
import React from "react";
import { _groupSetBetting } from "../../Tennis/Details/mappings/mapping";

export const nextQuarter = {
  "1st Quarter": "2nd Quarter",
  "2nd Quarter": "3rd Quarter",
  "3rd Quarter": "4th Quarter",
};


const base_arr_is_suspended = (base_arr: any) => {
  var total_suspended_values = 0;
  var total_values = 0;
  for (var sub_array of base_arr) {
    for (var item of sub_array) {
      if (item.suspend_value === "1") {
        total_suspended_values++;
      }
      total_values++;
    }
  }

  if (total_suspended_values === total_values) {
    return "1";
  }
  return "0";
};

function areAllSuspended(data: any) {
  const base_arr_is_suspended = data
    .flat()
    .every((item: any) => item.suspend === "1");
  if (base_arr_is_suspended) {
    return "1";
  } else {
    return "0";
  }
}

const findIdByName = (data: any, name: string) => {
  const odds = data?.odds;

  for (var odd_id in odds) {
    var odd_obj = odds[odd_id];
    if (odd_obj.name == name) {


      return odd_obj.id;
    }
  }

  return -1;
};

export const getSetTitle = (data: any, prevString: string) => {
  var current_set = data?.info?.period;

  var new_string = prevString.replace("Set X", current_set);

  return new_string;
};


export const getSetTitleAfter = (data: any, prevString: string) => {
  var current_set = data?.info?.period;

  var new_string = prevString.replace("Set After X", current_set);
  return new_string;
};

const _getParticipantsFieldRaw = (participants: any, line: string) => {
  for (var participant_id in participants) {
    const participant_obj = participants[participant_id];
    if (participant_obj.name === line) {
      return participant_obj;
    }
  }
  return null;
};

function groupParticipantsByHandicapAndName(participants: any) {
  const groupedParticipants = {} as any;

  for (const id in participants) {
    const participant = participants[id];
    const { handicap, name } = participant;

    if (!groupedParticipants[handicap]) {
      groupedParticipants[handicap] = {};
    }

    if (!groupedParticipants[handicap][name]) {
      groupedParticipants[handicap][name] = [];
    }

    groupedParticipants[handicap][name].push(participant);
  }

  // Convert handicap keys to an array of floats and sort them
  const sortedHandicaps = Object.keys(groupedParticipants)
    .map(parseFloat)
    .sort((a, b) => a - b);

  // Create a new object with sorted groups
  const sortedGroups = {} as any;
  for (const handicap of sortedHandicaps) {
    sortedGroups[handicap] = groupedParticipants[handicap];
  }

  return sortedGroups;
}

function groupParticipantsByHandicapAbsAndName(participants: any) {
  const groupedParticipants = {} as any;

  for (const id in participants) {
    const participant = participants[id];
    var { handicap, name } = participant;
    handicap = Math.abs(parseFloat(handicap));

    if (!groupedParticipants[handicap]) {
      groupedParticipants[handicap] = {};
    }

    if (!groupedParticipants[handicap][name]) {
      groupedParticipants[handicap][name] = [];
    }

    groupedParticipants[handicap][name].push(participant);
  }

  // Convert handicap keys to an array of floats and sort them
  const sortedHandicaps = Object.keys(groupedParticipants)
    .map(parseFloat)
    .sort((a, b) => a - b);

  // Create a new object with sorted groups
  const sortedGroups = {} as any;
  for (const handicap of sortedHandicaps) {
    sortedGroups[handicap] = groupedParticipants[handicap];
  }

  return sortedGroups;
}

function groupWithSmallestDeviation(participants: any) {
  // 1. Group by handicap
  const groupedByHandicap = {} as any;
  for (const key in participants) {
    const participant = participants[key];
    const handicap = parseFloat(participant.handicap);
    if (!groupedByHandicap[handicap]) {
      groupedByHandicap[handicap] = [];
    }
    groupedByHandicap[handicap].push(participant);
  }

  let minDeviation = 1000000000;
  let groupWithMinDeviation = null;

  for (const handicap in groupedByHandicap) {
    var group = groupedByHandicap[handicap];
    var diff = 0;
    group.forEach((element: any) => {
      diff = diff - parseFloat(element.value_eu);
    });
    diff = Math.abs(diff);

    if (diff < minDeviation) {
      minDeviation = diff;
      groupWithMinDeviation = group;
    }
  }

  // 4. Return the group with the smallest deviation

  return groupWithMinDeviation;
}

const _groupParticipantsByHandicapAndName = (participants: any) => {
  // Convert the data object to an array of values
  const dataArray = Object.values(participants);

  // Sort the array by handicap and then by name
  dataArray.sort((a: any, b: any) => {
    if (a.handicap === b.handicap) {
      return a.name.localeCompare(b.name);
    }
    return a.handicap.localeCompare(b.handicap);
  });

  // Group the sorted array by handicap
  const groupedData = dataArray.reduce((acc: any, item: any) => {
    if (!acc[item.handicap]) {
      acc[item.handicap] = [];
    }
    acc[item.handicap].push(item);
    return acc;
  }, {});

  return groupedData;
};

// Completed GameLines
export const gameLines = (data: any) => {
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var odd_id = findIdByName(data, "Home/Away");
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var home = _getParticipantsFieldRaw(participants, "Home");
      var away = _getParticipantsFieldRaw(participants, "Away");

      const title_obj = { title: "Winner", value: "", suspend: odds.suspend };
      const home_obj = {
        title: home.handicap,
        value: home.value_eu,
        suspend: home.suspend,
      };
      const away_obj = {
        title: away.handicap,
        value: away.value_eu,
        suspend: away.suspend,
      };

      const line_spread_arr = [title_obj, home_obj, away_obj];
      base_arr.push(line_spread_arr);
    }
  }

  {
    var odd_id = findIdByName(data, "Asian Handicap (Sets)");
    var odds = data?.odds?.[odd_id];
    if (odds) {
      participants = odds.participants;

      var home = _getParticipantsFieldRaw(participants, "Away");
      var away = _getParticipantsFieldRaw(participants, "Home");

      if (home && away) {
        const title_obj = {
          title: "Handicap",
          value: "",
          suspend: odds.suspend,
        };
        const home_obj = {
          title: "+" + home.handicap,
          value: home.value_eu,
          suspend: home.suspend,
        };
        const away_obj = {
          title: away.handicap,
          value: away.value_eu,
          suspend: away.suspend,
        };

        const total_spread_arr = [title_obj, away_obj, home_obj];
        base_arr.push(total_spread_arr);
      }
    }
  }
  {
    var odd_id = findIdByName(data, "Total By Points");
    var odds = data?.odds?.[odd_id];
    if (odds) {
      participants = odds.participants;
      var group_with_smallest_deviation =
        groupWithSmallestDeviation(participants);
      // console.log(group_with_smallest_deviation,participants,"New Group here")

      var over = _getParticipantsFieldRaw(
        group_with_smallest_deviation,
        "Over"
      );
      var under = _getParticipantsFieldRaw(
        group_with_smallest_deviation,
        "Under"
      );

      if (over && under) {
        const title_obj = { title: "Total", value: "", suspend: odds.suspend };
        const over_obj = {
          title: "O " + over.handicap,
          value: over.value_eu,
          suspend: over.suspend,
        };
        const under_obj = {
          title: "U " + under.handicap,
          value: under.value_eu,
          suspend: under.suspend,
        };

        const total_spread_arr = [title_obj, over_obj, under_obj];
        base_arr.push(total_spread_arr);
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

// Completed Set X Lines
export const linesToCurrentSet = (data: any) => {
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  var current_period = data?.info?.period;
  var current_period_str = "";
  const period_regex = new RegExp("Set (\\d+)");
  var _matching = current_period.match(period_regex);

  if (_matching) {
    var set_number = parseInt(_matching[1]);

    if (set_number == 1) {
      current_period_str = set_number.toString() + "st";
    }
    if (set_number == 2) {
      current_period_str = set_number.toString() + "nd";
    }
    if (set_number == 3) {
      current_period_str = set_number.toString() + "rd";
    }
    if (set_number > 3) {
      current_period_str = set_number.toString() + "th";
    }
  }
  {
    var search_line = "Home/Away (" + current_period_str + " Set)";
    var _odd_id_current_set_winner = findIdByName(data, search_line);

    var odds = data?.odds[_odd_id_current_set_winner];

    if (odds) {
      var participants = odds.participants;
      var home = _getParticipantsFieldRaw(participants, "Home");
      var away = _getParticipantsFieldRaw(participants, "Away");

      const title_obj = { title: "Winner", value: "", suspend: odds.suspend };
      const home_obj = {
        title: home.handicap,
        value: home.value_eu,
        suspend: home.suspend,
      };
      const away_obj = {
        title: away.handicap,
        value: away.value_eu,
        suspend: away.suspend,
      };

      const line_spread_arr = [title_obj, home_obj, away_obj];
      base_arr.push(line_spread_arr);
    }
  }

  {
    var search_line = "Asian Handicap (" + current_period_str + " Set)";
    var _odd_id_current_set_winner = findIdByName(data, search_line);

    var odds = data?.odds[_odd_id_current_set_winner];

    if (odds) {
      var participants = odds.participants;
      var home = _getParticipantsFieldRaw(participants, "Home");
      var away = _getParticipantsFieldRaw(participants, "Away");

      const title_obj = { title: "Handicap", value: "", suspend: odds.suspend };
      const home_obj = {
        title: home.handicap,
        value: home.value_eu,
        suspend: home.suspend,
      };
      const away_obj = {
        title: "+" + Math.abs(away.handicap),
        value: away.value_eu,
        suspend: away.suspend,
      };

      const line_spread_arr = [title_obj, home_obj, away_obj];
      base_arr.push(line_spread_arr);
    }
  }

  {
    var search_line = "Over/Under (" + current_period_str + " Set)";
    var _odd_id_current_set_winner = findIdByName(data, search_line);

    var odds = data?.odds[_odd_id_current_set_winner];

    if (odds) {
      var participants = odds.participants;
      var over = _getParticipantsFieldRaw(participants, "Over");
      var under = _getParticipantsFieldRaw(participants, "Under");

      const title_obj = { title: "Total", value: "", suspend: odds.suspend };
      const over_obj = {
        title: "O " + over.handicap,
        value: over.value_eu,
        suspend: over.suspend,
      };
      const under_obj = {
        title: "U " + "+" + Math.abs(under.handicap),
        value: under.value_eu,
        suspend: under.suspend,
      };

      const line_spread_arr = [title_obj, over_obj, under_obj];
      base_arr.push(line_spread_arr);
    }
  }
  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

// Completed Set n Point Betting
export const currentSetPointBetting = (data: any) => {
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  var current_period = data?.info?.period;
  var current_period_str = "";
  const period_regex = new RegExp("Set (\\d+)");
  var _matching = current_period.match(period_regex);

  if (_matching) {
    var set_number = parseInt(_matching[1]);

    if (set_number == 1) {
      current_period_str = set_number.toString() + "st";
    }
    if (set_number == 2) {
      current_period_str = set_number.toString() + "nd";
    }
    if (set_number == 3) {
      current_period_str = set_number.toString() + "rd";
    }
    if (set_number > 3) {
      current_period_str = set_number.toString() + "th";
    }
  }
  {
    var search_line = "Point Winner (" + current_period_str + " Set)";
    var odd_id = findIdByName(data, search_line);
    var odds = data?.odds?.[odd_id];
    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        if (group_obj["Home"] && group_obj["Away"]) {
          var _home_obj = group_obj["Home"][0];
          var _away_obj = group_obj["Away"][0];
          var title_obj = { title: handicap, value: "", suspend: odds.suspend };
          var home_obj = {
            title: "",
            value: _home_obj.value_eu,
            suspend: _home_obj.suspend,
          };
          var away_obj = {
            title: "",
            value: _away_obj.value_eu,
            suspend: _away_obj.suspend,
          };
          arr = [title_obj, home_obj, away_obj];
          base_arr.push(arr);
        }
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

// Completed Set n Race To
export const currentSetRaceTo = (data: any) => {
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  var current_period = data?.info?.period;
  var current_period_str = "";
  const period_regex = new RegExp("Set (\\d+)");
  var _matching = current_period.match(period_regex);

  if (_matching) {
    var set_number = parseInt(_matching[1]);

    if (set_number == 1) {
      current_period_str = set_number.toString() + "st";
    }
    if (set_number == 2) {
      current_period_str = set_number.toString() + "nd";
    }
    if (set_number == 3) {
      current_period_str = set_number.toString() + "th";
    }
    if (set_number > 3) {
      current_period_str = set_number.toString() + "th";
    }
  }

  {
    var search_line = "Race to Points (" + current_period_str + " Set)";
    var odd_id = findIdByName(data, search_line);
    // console.log(odd_id, search_line, "Checking String");
    var odds = data?.odds?.[odd_id];
    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        if (group_obj["1"] && group_obj["2"]) {
          var _one_obj = group_obj["1"][0];
          var _two_obj = group_obj["2"][0];
          var title_obj = { title: handicap, value: "", suspend: odds.suspend };
          var one_obj = {
            title: "",
            value: _one_obj.value_eu,
            suspend: _one_obj.suspend,
          };
          var two_obj = {
            title: "",
            value: _two_obj.value_eu,
            suspend: _two_obj.suspend,
          };
          arr = [title_obj, one_obj, two_obj];
          base_arr.push(arr);
        }
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};
// Completed Set n Race To
export const currentSetLeadAfter = (data: any) => {
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  var current_period = data?.info?.period;
  var current_period_str = "";
  const period_regex = new RegExp("Set (\\d+)");
  var _matching = current_period.match(period_regex);

  if (_matching) {
    var set_number = parseInt(_matching[1]);

    if (set_number == 1) {
      current_period_str = set_number.toString() + "st";
    }
    if (set_number == 2) {
      current_period_str = set_number.toString() + "nd";
    }
    if (set_number == 3) {
      current_period_str = set_number.toString() + "rd";
    }
    if (set_number > 3) {
      current_period_str = set_number.toString() + "th";
    }
  }

  {
    var search_line = "Lead After (" + current_period_str + " Set)";
    var odd_id = findIdByName(data, search_line);
    var odds = data?.odds?.[odd_id];
    if (odds) {
      var participants = odds.participants;
      var group =
        groupParticipantsByHandicapAndName(participants);
      for (var handicap in group) {
        var arr = [] as any;
        var group_obj = group[handicap]
        if (group_obj["Home"] && group_obj["Away"] && group_obj["Tie"]) {
          var home_obj = group_obj["Home"][0]
          var away_obj = group_obj["Away"][0]

          var tie_obj = group_obj["Tie"][0]

          var _title = { title: handicap, value: null, suspend: odds.suspend };
          var _home = { title: "", value: home_obj.value_eu, suspend: home_obj.suspend }
          var _away = { title: "", value: away_obj.value_eu, suspend: away_obj.suspend }
          var _tie = { title: "", value: tie_obj.value_eu, suspend: tie_obj.suspend }
          arr = [_title, _home, _away, _tie]
          base_arr.push(arr)

        }
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

// Completed Set n Extra Points
export const currentSetExtraPoints = (data: any) => {
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  var current_period = data?.info?.period;
  var current_period_str = "";
  const period_regex = new RegExp("Set (\\d+)");
  var _matching = current_period.match(period_regex);

  if (_matching) {
    var set_number = parseInt(_matching[1]);

    if (set_number == 1) {
      current_period_str = set_number.toString() + "st";
    }
    if (set_number == 2) {
      current_period_str = set_number.toString() + "nd";
    }
    if (set_number == 3) {
      current_period_str = set_number.toString() + "th";
    }
    if (set_number > 3) {
      current_period_str = set_number.toString() + "th";
    }
  }

  {
    var search_line = "Extra Points (" + current_period_str + " Set)";
    var odd_id = findIdByName(data, search_line);
    // console.log(odd_id, search_line, "Checking String");
    var odds = data?.odds?.[odd_id];
    if (odds) {
      var participants = odds.participants;
      var yes = _getParticipantsFieldRaw(participants, "Yes");
      var no = _getParticipantsFieldRaw(participants, "No");

      const yes_obj = {
        title: yes.name,
        value: yes.value_eu,
        suspend: yes.suspend,
      };
      const no_obj = {
        title: no.name,
        value: no.value_eu,
        suspend: no.suspend,
      };

      const line_spread_arr = [yes_obj, no_obj];
      base_arr.push(line_spread_arr);
    }
  }

  var suspend_value = areAllSuspended(base_arr);

  return { rows: base_arr, suspend: suspend_value };
};

export const getNextSetTitle = (data: any, prevString: string) => {
  var current_set = data?.info?.period;
  const period_regex = new RegExp("Set (\\d+)");
  var _matching = current_set.match(period_regex);
  var next_set_number = parseInt(_matching[1]) + 1;
  var new_string = "Set " + next_set_number.toString();

  var new_string = prevString.replace("Set X", new_string);
  return new_string;
};

const _getParticipantsFieldWithoutHandicap = (
  participants: any,
  line: string
) => {
  for (var participant_id in participants) {
    var title = "";
    var suspend = "0";
    var value = "";
    const participant_obj = participants[participant_id];
    if (participant_obj.name === line) {
      title = participant_obj.name;
      suspend = participant_obj?.suspend;
      value = participant_obj.value_eu;
      var obj = { title: title, value: value, suspend: suspend };
      return obj;
    }
  }
  return null;
};

// Completed Odd/Even
export const oddEven = (data: any) => {
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  var current_period = data?.info?.period;
  var current_period_str = "";
  const period_regex = new RegExp("Set (\\d+)");
  var _matching = current_period.match(period_regex);
  if (_matching) {
    var set_number = parseInt(_matching[1]);

    if (set_number == 1) {
      current_period_str = set_number.toString() + "st";
    }
    if (set_number == 2) {
      current_period_str = set_number.toString() + "nd";
    }
    if (set_number == 3) {
      current_period_str = set_number.toString() + "rd";
    }
    if (set_number > 3) {
      current_period_str = set_number.toString() + "th";
    }
  }

  {
    var odd_id = findIdByName(data, "Total Points Odd/Even");
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var odd = _getParticipantsFieldRaw(participants, "Odd");
      var even = _getParticipantsFieldRaw(participants, "Even");

      const title_obj = { title: "Match", value: "", suspend: odds.suspend };
      const odd_obj = {
        title: odd.handicap,
        value: odd.value_eu,
        suspend: odd.suspend,
      };
      const even_obj = {
        title: even.handicap,
        value: even.value_eu,
        suspend: even.suspend,
      };

      const line_spread_arr = [title_obj, odd_obj, even_obj];
      base_arr.push(line_spread_arr);
    }
  }

  {
    var arr = [] as any;
    var search_line = "Total Points Odd/Even (" + current_period_str + " Set)";
    var odd_id = findIdByName(data, search_line);
    var odds = data?.odds?.[odd_id];
    if (odds) {
      var participants = odds.participants;
      var title_row_obj: { title: string; value: null; suspend: string | any } =
      {
        title: current_period,
        value: null,
        suspend: "1",
      };

      arr.push(title_row_obj);
      var odd_1 = _getParticipantsFieldWithoutHandicap(participants, "Odd");
      var even_1 = _getParticipantsFieldWithoutHandicap(participants, "Even");

      if (odd_1 !== null) {
        odd_1.title = "";
        arr.push(odd_1);
      }
      if (even_1 !== null) {
        even_1.title = "";
        arr.push(even_1);
      }
      base_arr.push(arr);
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

// Function to group participants by name
function groupParticipantsByPropertyName(
  home_participants: any,
  away_participants: any
) {
  const groupedParticipants = {} as any;

  function groupParticipants(participants: any) {
    for (const id in participants) {
      const participant = participants[id];
      const name = participant.name;

      if (!groupedParticipants[name]) {
        groupedParticipants[name] = [];
      }

      groupedParticipants[name].push(participant);
    }
  }

  groupParticipants(home_participants);
  groupParticipants(away_participants);

  return groupedParticipants;
}

// Completed the Set n Winning Margin
export const currentSetWinningMargin = (data: any) => {
  var home_participants = null;
  var away_participants = null;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  var current_period = data?.info?.period;
  var current_period_str = "";
  const period_regex = new RegExp("Set (\\d+)");
  var _matching = current_period.match(period_regex);
  if (_matching) {
    var set_number = parseInt(_matching[1]);

    if (set_number == 1) {
      current_period_str = set_number.toString() + "st";
    }
    if (set_number == 2) {
      current_period_str = set_number.toString() + "nd";
    }
    if (set_number == 3) {
      current_period_str = set_number.toString() + "rd";
    }
    if (set_number > 3) {
      current_period_str = set_number.toString() + "th";
    }
  }

  {
    var search_string = "Home Winning Margin (" + current_period_str + " Set)";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      home_participants = participants;
    }
  }

  {
    var search_string = "Away Winning Margin (" + current_period_str + " Set)";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      away_participants = participants;
    }
  }
  if (home_participants != null && away_participants != null) {
    var group = groupParticipantsByPropertyName(
      home_participants,
      away_participants
    );
    for (var row_name in group) {
      var group_obj = group[row_name];
      var home_participant = group_obj[0];
      var away_participant = group_obj[1];
      var title_obj = {
        title: row_name,
        value: "",
        suspend: group_obj[0].suspend,
      };
      var home_obj = {
        title: "",
        value: home_participant.value_eu,
        suspend: home_participant.suspend,
      };
      var away_obj = {
        title: "",
        value: away_participant.value_eu,
        suspend: away_participant.suspend,
      };
      var arr = [title_obj, home_obj, away_obj];
      base_arr.push(arr);
    }
  }
  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};



function groupAndFilterParticipants(participants: any, threshold: number) {
  const groupedAndFilteredParticipants = {} as any;


  for (const participantId in participants) {
    const participant = participants[participantId];

    var [homeScore, awayScore] = participant.name.split("-");

    homeScore = parseInt(homeScore);
    awayScore = parseInt(awayScore);

    if (participant.name === 'T1 After extra points' || participant.name === 'T2 After extra points' || participant.name === 'T1 25-15 or better' || participant.name === 'T2 25-15 or better') {
      const afterPoints_str = participant.name.split(" ")

      const scoreKey = afterPoints_str.slice(1).join(" ")

      if (!groupedAndFilteredParticipants[scoreKey]) {
        groupedAndFilteredParticipants[scoreKey] = [];
      }

      groupedAndFilteredParticipants[scoreKey].push(participant);
    }



    if (homeScore >= threshold && awayScore >= threshold) {
      const scoreKey = [homeScore, awayScore].sort().reverse().join("-");

      if (!groupedAndFilteredParticipants[scoreKey]) {
        groupedAndFilteredParticipants[scoreKey] = [];
      }

      groupedAndFilteredParticipants[scoreKey].push(participant);
    }
  }


  return groupedAndFilteredParticipants;
}


// Completed Set Correct Score
export const currentSetCorrectScore = (data: any) => {
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  var current_period = data?.info?.period;
  var current_period_str = "";
  const period_regex = new RegExp("Set (\\d+)");
  var _matching = current_period.match(period_regex);
  if (_matching) {
    var set_number = parseInt(_matching[1]);
    if (set_number == 1) {
      current_period_str = set_number.toString() + "st";
    }
    if (set_number == 2) {
      current_period_str = set_number.toString() + "nd";
    }
    if (set_number == 3) {
      current_period_str = set_number.toString() + "rd";
    }
    if (set_number > 3) {
      current_period_str = set_number.toString() + "th";
    }
  }

  var search_line = "Correct Score (" + current_period_str + " Set)";
  const _odd_id_current_set_winner = findIdByName(data, search_line);
  var odds = data?.odds[_odd_id_current_set_winner];
  if (odds === undefined) {
    return { rows: [], suspend: "0" };
  }
  var participants = odds.participants;

  var current_set_stats = data?.stats[Object.keys(data?.stats).length - 1];
  var least_game =
    current_set_stats.home > current_set_stats.away
      ? current_set_stats.away
      : current_set_stats.home;
  // console.log("stats", data?.stats);
  // console.log("lenght", Object.keys(data?.stats).length - 1);
  // console.log("ll least gamell least game", least_game);
  const grouped_participants = groupAndFilterParticipants(
    participants,
    least_game
  );



  for (var group in grouped_participants) {
    var arr = [] as any;
    var group_obj = grouped_participants[group];
    var title_obj = { title: group, value: "", suspend: group_obj[0].suspend };
    var home_obj = {
      title: "",
      value: group_obj[0].value_eu,
      suspend: group_obj[0].suspend,
    };
    var away_obj = {
      title: "",
      value: group_obj[1].value_eu,
      suspend: group_obj[1].suspend,
    };
    arr.push(title_obj, home_obj, away_obj);
    base_arr.push(arr);
  }
  var suspend_value = areAllSuspended(base_arr);

  return { rows: base_arr, suspend: suspend_value };
};

// Completed Set Correct Score
export const scoreAfter3rdSet = (data: any) => {
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  const _odd_id_current_set_winner = findIdByName(data, 'Score After 3rd Set');
  var odds = data?.odds[_odd_id_current_set_winner];
  if (odds === undefined) {
    return { rows: [], suspend: "0" };
  }
  var participants = odds.participants;

  var current_set_stats = data?.stats[Object.keys(data?.stats).length - 1];
  var least_game =
    current_set_stats.home > current_set_stats.away
      ? current_set_stats.away
      : current_set_stats.home;
  // console.log("stats", data?.stats);
  // console.log("lenght", Object.keys(data?.stats).length - 1);
  // console.log("ll least game", least_game);
  const grouped_participants = groupAndFilterParticipants(
    participants,
    least_game
  );

  // console.log(
  //   "This is the group participants",
  //   grouped_participants,
  //   participants,
  //   least_game
  // );
  for (var group in grouped_participants) {
    var arr = [] as any;
    var group_obj = grouped_participants[group];
    var title_obj = { title: group, value: "", suspend: group_obj[0].suspend };
    var home_obj = {
      title: "",
      value: group_obj[0].value_eu,
      suspend: group_obj[0].suspend,
    };
    var away_obj = {
      title: "",
      value: group_obj[1].value_eu,
      suspend: group_obj[1].suspend,
    };
    arr.push(title_obj, home_obj, away_obj);
    base_arr.push(arr);
  }
  var suspend_value = areAllSuspended(base_arr);

  return { rows: base_arr, suspend: suspend_value };
};
// Completed Set Correct Score
export const scoreAfter2ndSet = (data: any) => {
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  const _odd_id_current_set_winner = findIdByName(data, 'Score After 2nd Set');
  var odds = data?.odds[_odd_id_current_set_winner];
  if (odds === undefined) {
    return { rows: [], suspend: "0" };
  }
  var participants = odds.participants;

  var current_set_stats = data?.stats[Object.keys(data?.stats).length - 1];
  var least_game =
    current_set_stats.home > current_set_stats.away
      ? current_set_stats.away
      : current_set_stats.home;
  // console.log("stats", data?.stats);
  // console.log("lenght", Object.keys(data?.stats).length - 1);
  // console.log("ll least game", least_game);
  const grouped_participants = groupAndFilterParticipants(
    participants,
    least_game
  );

  // console.log(
  //   "This is the group participants",
  //   grouped_participants,
  //   participants,
  //   least_game
  // );
  for (var group in grouped_participants) {
    var arr = [] as any;
    var group_obj = grouped_participants[group];
    var title_obj = { title: group, value: "", suspend: group_obj[0].suspend };
    var home_obj = {
      title: "",
      value: group_obj[0].value_eu,
      suspend: group_obj[0].suspend,
    };
    var away_obj = {
      title: "",
      value: group_obj[1].value_eu,
      suspend: group_obj[1].suspend,
    };
    arr.push(title_obj, home_obj, away_obj);
    base_arr.push(arr);
  }
  var suspend_value = areAllSuspended(base_arr);

  return { rows: base_arr, suspend: suspend_value };
};


export const setAfterNSets = (data: any) => {
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }
};



// PENDING Set Correct Score
export const correctSetScore = (data: any) => {
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;


  var search_line = "Set Betting";
  const _odd_id_current_set_winner = findIdByName(data, search_line);
  var odds = data?.odds[_odd_id_current_set_winner];

  if (odds === undefined) {
    return { rows: [], suspend: "0" };
  }
  var participants = odds.participants;

  var current_set_stats = data?.stats[Object.keys(data?.stats).length - 1];
  var least_game =
    current_set_stats.home > current_set_stats.away
      ? current_set_stats.away
      : current_set_stats.home;

 

  const grouped_participants = groupAndFilterParticipants(
    participants,
    least_game
  );


  for (var group in grouped_participants) {
    var arr = [] as any;
    var group_obj = grouped_participants[group];
 
    var title_obj = { title: group, value: "", suspend: group_obj[0].suspend };
    var home_obj = {
      title: "",
      value: group_obj[0].value_eu,
      suspend: group_obj[0].suspend,
    };
    var away_obj = {
      title: "",
      value: group_obj[1].value_eu,
      suspend: group_obj[1].suspend,
    };
    arr.push(title_obj, home_obj, away_obj);
    base_arr.push(arr);
  }
  var suspend_value = areAllSuspended(base_arr);

  return { rows: base_arr, suspend: suspend_value };

};


// Completed Team Totals
export const teamTotals = (data: any) => {
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;
  var arr = [] as any;

  {
    var search_string = "Home Team Total Points"
    // var search_string = "Home Team Total ("+ current_quarter + ")"
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];
    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      var length = Object.keys(group).length;
      if (length > 1) {

        for (var handicap in group) {
          var group_obj = group[handicap];
          if (group_obj["Over"] === undefined || group_obj["Under"] === undefined) {
            return { rows: [], suspend: "0" };
          }


          if (group_obj["Over"][0].is_main === "1" || group_obj["Under"][0].is_main === "1") {
            var over_obj = group_obj["Over"][0]
            var under_obj = group_obj["Under"][0]
            var _over = { title: "Over " + handicap, value: over_obj.value_eu, suspend: over_obj.suspend }
            var _under = { title: "Under " + handicap, value: under_obj.value_eu, suspend: under_obj.suspend }
            arr.push(_over, _under)
          }
        }
      }
      if (length === 1) {
        for (var handicap in group) {
          var group_obj = group[handicap];
          if (group_obj["Over"] === undefined || group_obj["Under"] === undefined) {
            return { rows: [], suspend: "0" };
          }


          var over_obj = group_obj["Over"][0]
          var under_obj = group_obj["Under"][0]
          var _over = { title: "Over " + handicap, value: over_obj.value_eu, suspend: over_obj.suspend }
          var _under = { title: "Under " + handicap, value: under_obj.value_eu, suspend: under_obj.suspend }
          arr.push(_over, _under)
        }

      }
    }
  }

  {
    // var search_string = "Away Team Total ("+ current_quarter + ")"
    var search_string = "Away Team Total Points"
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {

      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      var length = Object.keys(group).length;
      if (length > 1) {
        for (var handicap in group) {
          var group_obj = group[handicap];
          if (group_obj["Over"] === undefined || group_obj["Under"] === undefined) {
            return { rows: [], suspend: "0" };
          }


          if (group_obj["Over"][0].is_main === "1" || group_obj["Under"][0].is_main === "1") {
            var over_obj = group_obj["Over"][0]
            var under_obj = group_obj["Under"][0]
            var _over = { title: "Over " + handicap, value: over_obj.value_eu, suspend: over_obj.suspend }
            var _under = { title: "Under " + handicap, value: under_obj.value_eu, suspend: under_obj.suspend }
            arr.push(_over, _under)
          }
        }
      }
      if (length === 1) {
        for (var handicap in group) {
          var group_obj = group[handicap];
          if (group_obj["Over"] === undefined || group_obj["Under"] === undefined) {
            return { rows: [], suspend: "0" };
          }


          var over_obj = group_obj["Over"][0]
          var under_obj = group_obj["Under"][0]
          var _over = { title: "Over " + handicap, value: over_obj.value_eu, suspend: over_obj.suspend }
          var _under = { title: "Under " + handicap, value: under_obj.value_eu, suspend: under_obj.suspend }
          arr.push(_over, _under)
        }

      }

    }
  }
  if (arr.length == 4) {
    base_arr.push(arr);
  }

  // TODO Suspend value

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value }
}