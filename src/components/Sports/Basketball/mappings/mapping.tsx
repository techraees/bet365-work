"use client";
import { apiBaseUrl } from "next-auth/client/_utils";
import React from "react";
import { _groupSetBetting } from "../../Tennis/Details/mappings/mapping";

export const nextQuarter = {
  "1st Quarter": "2nd Quarter",
  "2nd Quarter": "3rd Quarter",
  "3rd Quarter": "4th Quarter",
};

function getNextQuarter(current: string): string {
  return nextQuarter[current as keyof typeof nextQuarter];
}

export const getHalfTitle = (data: any, prev_title: string) => {
  var current_period = data?.info?.period;
  var current_period_int = parseInt(current_period.charAt(0));
  var half_int = 0;
  var half_string = "";
  if (current_period_int <= 2) {
    half_int = 1;
  } else {
    half_int = 2;
  }

  if (half_int == 1) {
    half_string = "1st Half";
  }
  if (half_int == 2) {
    half_string = "2nd Half";
  }
  var new_string = prev_title.replace("X Half", half_string);
  return new_string;
};

export const getHomeTeam = (data: any, prev_title: string) => {
  var home_team = data?.team_info?.home?.name;
  var new_title = prev_title.replace("Home Team", home_team);
  return new_title;
};

export const getAwayTeam = (data: any, prev_title: string) => {
  var home_team = data?.team_info?.away?.name;
  var new_title = prev_title.replace("Away Team", home_team);
  return new_title;
};

export const getQuarterTitle = (data: any, prev_title: string) => {
  var current_quarter = data?.info?.period;
  var new_title = prev_title.replace("X Quarter", current_quarter);
  return new_title;
};

export const getNextQuarterTitle = (data: any, prev_title: string) => {
  var current_quarter = data?.info?.period as string;
  var next_quarter = getNextQuarter(current_quarter);
  var new_title = prev_title.replace("X Quarter", next_quarter);
  return new_title;
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
  // not found
  return -1;
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

export const gameLines = (data: any) => {
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var odd_id = findIdByName(data, "Game Lines Spread");
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var home = _getParticipantsFieldRaw(participants, "Home");
      var away = _getParticipantsFieldRaw(participants, "Away");

      const title_obj = { title: "Spread", value: "", suspend: odds.suspend };
      const home_obj = {
        title: home.handicap,
        value: home.value_eu,
        suspend: home.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: home?.id,
        participant_name: home?.name,
        participant_handicap: home?.handicap,
        participant_header: home?.header,
        game: "basketball",
        bet_type: "Live",
      };
      const away_obj = {
        title: away.handicap,
        value: away.value_eu,
        suspend: away.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: away?.id,
        participant_name: away?.name,
        participant_handicap: away?.handicap,
        participant_header: away?.header,
        game: "basketball",
        bet_type: "Live",
      };

      const line_spread_arr = [title_obj, home_obj, away_obj];
      base_arr.push(line_spread_arr);
    }
  }

  {
    var odd_id = findIdByName(data, "Game Lines Total");
    var odds = data?.odds?.[odd_id];

    if (odds) {
      participants = odds.participants;
      var group_with_smallest_deviation =
        groupWithSmallestDeviation(participants);
      var over = _getParticipantsFieldRaw(
        group_with_smallest_deviation,
        "Over",
      );
      var under = _getParticipantsFieldRaw(
        group_with_smallest_deviation,
        "Under",
      );

      if (over && under) {
        const title_obj = { title: "Total", value: "", suspend: odds.suspend };
        const over_obj = {
          title: "O " + over.handicap,
          value: over.value_eu,
          suspend: over.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: over?.id,
          participant_name: over?.name,
          participant_handicap: over?.handicap,
          participant_header: over?.header,
          game: "basketball",
          bet_type: "Live",
        };
        const under_obj = {
          title: "U " + under.handicap,
          value: under.value_eu,
          suspend: under.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: under?.id,
          participant_name: under?.name,
          participant_handicap: under?.handicap,
          participant_header: under?.header,
          game: "basketball",
          bet_type: "Live",
        };

        const total_spread_arr = [title_obj, over_obj, under_obj];
        base_arr.push(total_spread_arr);
      }
    }
  }

  {
    var odd_id = findIdByName(data, "Game Lines Money Line");
    var odds = data?.odds?.[odd_id];

    if (odds) {
      participants = odds.participants;
      var home = _getParticipantsFieldRaw(participants, "Home");
      var away = _getParticipantsFieldRaw(participants, "Away");
      if (home && away) {
        const title_obj = {
          title: "Money Line",
          value: "",
          suspend: odds.suspend,
        };
        const home_obj = {
          title: home.handicap,
          value: home.value_eu,
          suspend: home.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: home?.id,
          participant_name: home?.name,
          participant_handicap: home?.handicap,
          participant_header: home?.header,
          game: "basketball",
          bet_type: "Live",
        };
        const away_obj = {
          title: away.handicap,
          value: away.value_eu,
          suspend: away.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: away?.id,
          participant_name: away?.name,
          participant_handicap: away?.handicap,
          participant_header: away?.header,
          game: "basketball",
          bet_type: "Live",
        };

        const money_line_arr = [title_obj, home_obj, away_obj];
        base_arr.push(money_line_arr);
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const pointBetting = (data: any) => {
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }
  // [{handicap, home, away}]
  const total_score =
    parseInt(data?.team_info?.home?.score) +
    parseInt(data?.team_info?.away?.score);

  const base_arr = [] as any;
  const odd_id = findIdByName(data, "Point Betting");
  const odds = data?.odds?.[odd_id];
  if (odds === undefined) {
    return { rows: [], suspend: "0" };
  }
  const participants = odds.participants;
  var group = groupParticipantsByHandicapAndName(participants);
  for (var group_handicap in group) {
    var arr = [] as any;
    const group_obj = group[group_handicap];
    if (parseInt(group_handicap) <= total_score) {
      continue;
    }
    if (group_obj["Home"] === undefined || group_obj["Away"] === undefined) {
      continue;
    }
    var _home = group_obj["Home"][0];
    var _away = group_obj["Away"][0];
    var title_obj = {
      title: group_handicap,
      value: null,
      suspend: odds.suspend,
    };
    var home_obj = {
      title: "",
      value: _home.value_eu,
      suspend: _home.suspend,

      event_id: data?.info?.id,
      event_name:
        data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
      odd_id: odd_id,
      odd_name: data?.odds?.[odd_id]?.name,
      participant_id: _home?.id,
      participant_name: _home?.name,
      participant_handicap: _home?.handicap,
      participant_header: _home?.header,
      game: "basketball",
      bet_type: "Live",
    };
    var away_obj = {
      title: "",
      value: _away.value_eu,
      suspend: _away.suspend,

      event_id: data?.info?.id,
      event_name:
        data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
      odd_id: odd_id,
      odd_name: data?.odds?.[odd_id]?.name,
      participant_id: _away?.id,
      participant_name: _away?.name,
      participant_handicap: _away?.handicap,
      participant_header: _away?.header,
      game: "basketball",
      bet_type: "Live",
    };
    arr = [title_obj, home_obj, away_obj];
    base_arr.push(arr);
  }
  return { rows: base_arr, suspend: odds.suspend };
};

export const currentPoints = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let total = "";
  if (data?.team_info?.home?.score && data?.team_info?.away?.score) {
    const homepoint = data?.team_info?.home?.score;
    const awaypoint = data?.team_info?.away?.score;
    total = (Number(homepoint) + Number(awaypoint)).toString();
  }
  return total;
};

export const quarterLines2Way = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [];
  if (data?.odds?.[180079]?.participants) {
    const spread = Object.entries(data?.odds?.[180079]?.participants);
    if (spread.length > 0) {
      const arr = [
        { title: "Spread", value: "", suspend: data.odds?.[180079]?.suspend },
      ];
      spread.map((item: any, index: number) => {
        let title = "";
        let value = "";
        let suspend = "0";
        title = item[1]?.handicap;
        value = item[1]?.value_eu;
        suspend = item[1]?.suspend;
        arr.push({
          title: title,
          value: value,
          suspend: suspend,
          // @ts-ignore
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 180079,
          odd_name: data?.odds?.[180079]?.name,
          participant_id: item[1]?.id,
          participant_name: item[1]?.name,
          participant_handicap: item[1]?.handicap,
          participant_header: item[1]?.header,
          game: "basketball",
          bet_type: "Live",
        });
      });
      tosend.push(arr);
    }
  }
  if (data?.odds?.[180080]?.participants) {
    const gltotal = Object.entries(data?.odds?.[180080]?.participants);
    if (gltotal.length > 0) {
      const arr = [
        { title: "Total", value: "", suspend: data.odds?.[180080]?.suspend },
      ];

      gltotal.map((item: any, index: number) => {
        let title = "";
        let value = "";
        let suspend = "0";
        title = item[1]?.handicap;
        value = item[1]?.value_eu;
        suspend = item[1]?.suspend;
        if (item[1]?.name === "Over") {
          arr.push({
            title: `O ${title}`,
            value: value,
            suspend: suspend,

            // @ts-ignore
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 180080,
            odd_name: data?.odds?.[180080]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            game: "basketball",
            bet_type: "Live",
          });
        } else {
          arr.push({ title: `U ${title}`, value: value, suspend: suspend });
        }
      });
      tosend.push(arr);
    }
  }
  if (data?.odds?.[180077]?.participants) {
    const mltotal = Object.entries(data?.odds?.[180077]?.participants);
    if (mltotal.length > 0) {
      const arr = [
        {
          title: "Money Line",
          value: "",
          suspend: data.odds?.[180077]?.suspend,
        },
      ];
      mltotal.map((item: any, index: number) => {
        let title = "";
        let value = "";
        let suspend = "0";
        value = item[1]?.value_eu;
        suspend = item[1]?.suspend;
        arr.push({
          title: title,
          value: value,
          suspend: suspend,

          // @ts-ignore
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 180077,
          odd_name: data?.odds?.[180077]?.name,
          participant_id: item[1]?.id,
          participant_name: item[1]?.name,
          participant_handicap: item[1]?.handicap,
          participant_header: item[1]?.header,
          game: "basketball",
          bet_type: "Live",
        });
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

// export const oddEven =(data: any)=>{
//     if (!data && !data.odds) {
//         return [];
//     }
//     const tosend = [];
//     if (data?.odds?.[113]?.participants) {
//         const oddeven1 = Object.entries(data?.odds?.[113]?.participants)
//         if (oddeven1.length > 0) {
//             const arr = [{ title: "Match", value: '', suspend: data.odds?.[113]?.suspend }]
//             oddeven1.map((item: any, index: number) => {
//                 let title = '';
//                 let value = '';
//                 let suspend = '0';
//                 value = item[1]?.value_eu
//                 suspend = item[1]?.suspend
//                 arr.push({ title: title, value: value, suspend: suspend })
//             })
//             tosend.push(arr)
//         }
//     }
//     if (data?.odds?.[449]?.participants) {
//         const oddeven2 = Object.entries(data?.odds?.[449]?.participants)
//         if (oddeven2.length > 0) {
//             const arr = [{ title: "1st Half", value: '', suspend: data.odds?.[449]?.suspend }]
//             oddeven2.map((item: any, index: number) => {
//                 let title = '';
//                 let value = '';
//                 let suspend = '0';
//                 value = item[1]?.value_eu
//                 suspend = item[1]?.suspend
//                 arr.push({ title: title, value: value, suspend: suspend })
//             })
//             tosend.push(arr)
//         }
//     }
//     return tosend;
// }

export const half = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [];
  if (data?.odds?.[180061]?.participants) {
    const spread = Object.entries(data?.odds?.[180061]?.participants);
    if (spread.length > 0) {
      const arr = [
        { title: "Spread", value: "", suspend: data.odds?.[180061]?.suspend },
      ];
      spread.map((item: any, index: number) => {
        let title = "";
        let value = "";
        let suspend = "0";
        title = item[1]?.handicap;
        value = item[1]?.value_eu;
        suspend = item[1]?.suspend;
        arr.push({
          title: title,
          value: value,
          suspend: suspend,

          // @ts-ignore
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 180061,
          odd_name: data?.odds?.[180061]?.name,
          participant_id: item[1]?.id,
          participant_name: item[1]?.name,
          participant_handicap: item[1]?.handicap,
          participant_header: item[1]?.header,
          game: "basketball",
          bet_type: "Live",
        });
      });
      tosend.push(arr);
    }
  }
  if (data?.odds?.[180062]?.participants) {
    const gltotal = Object.entries(data?.odds?.[180062]?.participants);
    if (gltotal.length > 0) {
      const arr = [
        { title: "Total", value: "", suspend: data.odds?.[180062]?.suspend },
      ];

      gltotal.map((item: any, index: number) => {
        let title = "";
        let value = "";
        let suspend = "0";
        title = item[1]?.handicap;
        value = item[1]?.value_eu;
        suspend = item[1]?.suspend;
        if (item[1]?.name === "Over") {
          arr.push({
            title: `O ${title}`,
            value: value,
            suspend: suspend,

            // @ts-ignore
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 180062,
            odd_name: data?.odds?.[180062]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            game: "basketball",
            bet_type: "Live",
          });
        } else {
          arr.push({
            title: `U ${title}`,
            value: value,
            suspend: suspend,

            // @ts-ignore
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 180062,
            odd_name: data?.odds?.[180062]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            game: "basketball",
            bet_type: "Live",
          });
        }
      });
      tosend.push(arr);
    }
  }
  if (data?.odds?.[180060]?.participants) {
    const mltotal = Object.entries(data?.odds?.[180060]?.participants);
    if (mltotal.length > 0) {
      const arr = [
        {
          title: "Money Line",
          value: "",
          suspend: data.odds?.[180060]?.suspend,
        },
      ];
      mltotal.map((item: any, index: number) => {
        let title = "";
        let value = "";
        let suspend = "0";
        value = item[1]?.value_eu;
        suspend = item[1]?.suspend;
        arr.push({
          title: title,
          value: value,
          suspend: suspend,

          // @ts-ignore
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 180060,
          odd_name: data?.odds?.[180060]?.name,
          participant_id: item[1]?.id,
          participant_name: item[1]?.name,
          participant_handicap: item[1]?.handicap,
          participant_header: item[1]?.header,
          game: "basketball",
          bet_type: "Live",
        });
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const resultTotalGoals = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  if (data?.odds?.[5300563]?.participants) {
    const spread = Object.entries(data?.odds?.[5300563]?.participants);
    if (spread.length > 0) {
      const arr1 = [
        { title: "Home", value: "", suspend: data.odds?.[5300563]?.suspend },
      ];
      const arr2 = [
        { title: "Away", value: "", suspend: data.odds?.[5300563]?.suspend },
      ];
      spread.map((item: any, index: number) => {
        let title = "";
        let value = "";
        let suspend = "0";
        title = item[1]?.handicap;
        value = item[1]?.value_eu;
        suspend = item[1]?.suspend;
        if (item[1]?.name === "Home/o" || item[1]?.name === "Home/u") {
          arr1.push({
            title: title,
            value: value,
            suspend: suspend,
            // @ts-ignore
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 5300563,
            odd_name: data?.odds?.[5300563]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            game: "basketball",
            bet_type: "Live",
          });
        }
        if (item[1]?.name === "Away/o" || item[1]?.name === "Away/u") {
          arr2.push({
            title: title,
            value: value,
            suspend: suspend,

            // @ts-ignore
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 5300563,
            odd_name: data?.odds?.[5300563]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            game: "basketball",
            bet_type: "Live",
          });
        }
      });
      tosend.push(arr1);
      tosend.push(arr2);
    }
  }

  return tosend;
};

export const getCurrentPoints = (data: any) => {
  var home_score = parseInt(data?.team_info?.home?.score);
  var away_score = parseInt(data?.team_info?.away?.score);
  return (home_score + away_score).toString();
};

export const quarterLines = (data: any) => {
  var current_quarter = data?.info?.period;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = current_quarter + " Lines Spread (AH)";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var home = _getParticipantsFieldRaw(participants, "Home");
      var away = _getParticipantsFieldRaw(participants, "Away");

      if (home && away) {
        const title_obj = { title: "Spread", value: "", suspend: home.suspend };
        const home_obj = {
          title: home.handicap,
          value: home.value_eu,
          suspend: home.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: home?.id,
          participant_name: home?.name,
          participant_handicap: home?.handicap,
          participant_header: home?.header,
          game: "basketball",
          bet_type: "Live",
        };
        const away_obj = {
          title: away.handicap,
          value: away.value_eu,
          suspend: away.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: away?.id,
          participant_name: away?.name,
          participant_handicap: away?.handicap,
          participant_header: away?.header,
          game: "basketball",
          bet_type: "Live",
        };

        const line_spread_arr = [title_obj, home_obj, away_obj];
        base_arr.push(line_spread_arr);
      }
    }
  }

  {
    var search_string = current_quarter + " Lines Total";
    odd_id = findIdByName(data, search_string);
    odds = data?.odds?.[odd_id];

    if (odds) {
      participants = odds.participants;
      var group_with_smallest_deviation =
        groupWithSmallestDeviation(participants);
      var over = _getParticipantsFieldRaw(
        group_with_smallest_deviation,
        "Over",
      );
      var under = _getParticipantsFieldRaw(
        group_with_smallest_deviation,
        "Under",
      );
      if (over && under) {
        const title_obj = { title: "Total", value: "", suspend: over.suspend };
        const over_obj = {
          title: "O " + over.handicap,
          value: over.value_eu,
          suspend: over.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: over?.id,
          participant_name: over?.name,
          participant_handicap: over?.handicap,
          participant_header: over?.header,
          game: "basketball",
          bet_type: "Live",
        };
        const under_obj = {
          title: "U " + under.handicap,
          value: under.value_eu,
          suspend: under.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: under?.id,
          participant_name: under?.name,
          participant_handicap: under?.handicap,
          participant_header: under?.header,
          game: "basketball",
          bet_type: "Live",
        };

        const total_spread_arr = [title_obj, over_obj, under_obj];
        base_arr.push(total_spread_arr);
      }
    }
  }

  {
    var search_string = current_quarter + " Lines Money Line";
    odd_id = findIdByName(data, search_string);
    odds = data?.odds?.[odd_id];
    if (odds) {
      participants = odds.participants;
      var home = _getParticipantsFieldRaw(participants, "Home");
      var away = _getParticipantsFieldRaw(participants, "Away");
      if (home && away) {
        const title_obj = {
          title: "Money Line",
          value: "",
          suspend: home.suspend,
        };
        const home_obj = {
          title: home.handicap,
          value: home.value_eu,
          suspend: home.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: home?.id,
          participant_name: home?.name,
          participant_handicap: home?.handicap,
          participant_header: home?.header,
          game: "basketball",
          bet_type: "Live",
        };
        const away_obj = {
          title: away.handicap,
          value: away.value_eu,
          suspend: away.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: away?.id,
          participant_name: away?.name,
          participant_handicap: away?.handicap,
          participant_header: away?.header,
          game: "basketball",
          bet_type: "Live",
        };

        const money_line_arr = [title_obj, home_obj, away_obj];
        base_arr.push(money_line_arr);
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  console.log("current quarter base arr", base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const nextQuarterLines = (data: any) => {
  var current_quarter = data?.info?.period;
  var next_quarter = getNextQuarter(current_quarter);
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = next_quarter + " Lines Spread (AH)";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var home = _getParticipantsFieldRaw(participants, "Home");
      var away = _getParticipantsFieldRaw(participants, "Away");

      if (home && away) {
        const title_obj = { title: "Spread", value: "", suspend: home.suspend };
        const home_obj = {
          title: home.handicap,
          value: home.value_eu,
          suspend: home.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: home?.id,
          participant_name: home?.name,
          participant_handicap: home?.handicap,
          participant_header: home?.header,
          game: "basketball",
          bet_type: "Live",
        };
        const away_obj = {
          title: away.handicap,
          value: away.value_eu,
          suspend: away.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: away?.id,
          participant_name: away?.name,
          participant_handicap: away?.handicap,
          participant_header: away?.header,
          game: "basketball",
          bet_type: "Live",
        };

        const line_spread_arr = [title_obj, home_obj, away_obj];
        base_arr.push(line_spread_arr);
      }
    }
  }

  {
    var search_string = next_quarter + " Lines Total";
    odd_id = findIdByName(data, search_string);
    odds = data?.odds?.[odd_id];

    if (odds) {
      participants = odds.participants;
      var group_with_smallest_deviation =
        groupWithSmallestDeviation(participants);
      var over = _getParticipantsFieldRaw(
        group_with_smallest_deviation,
        "Over",
      );
      var under = _getParticipantsFieldRaw(
        group_with_smallest_deviation,
        "Under",
      );
      if (over && under) {
        const title_obj = { title: "Total", value: "", suspend: over.suspend };
        const over_obj = {
          title: "O " + over.handicap,
          value: over.value_eu,
          suspend: over.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: over?.id,
          participant_name: over?.name,
          participant_handicap: over?.handicap,
          participant_header: over?.header,
          game: "basketball",
          bet_type: "Live",
        };
        const under_obj = {
          title: "U " + under.handicap,
          value: under.value_eu,
          suspend: under.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: under?.id,
          participant_name: under?.name,
          participant_handicap: under?.handicap,
          participant_header: under?.header,
          game: "basketball",
          bet_type: "Live",
        };

        const total_spread_arr = [title_obj, over_obj, under_obj];
        base_arr.push(total_spread_arr);
      }
    }
  }

  {
    var search_string = next_quarter + " Lines Money Line";
    odd_id = findIdByName(data, search_string);
    odds = data?.odds?.[odd_id];
    if (odds) {
      participants = odds.participants;
      var home = _getParticipantsFieldRaw(participants, "Home");
      var away = _getParticipantsFieldRaw(participants, "Away");
      if (home && away) {
        const title_obj = {
          title: "Money Line",
          value: "",
          suspend: home.suspend,
        };
        const home_obj = {
          title: home.handicap,
          value: home.value_eu,
          suspend: home.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: home?.id,
          participant_name: home?.name,
          participant_handicap: home?.handicap,
          participant_header: home?.header,
          game: "basketball",
          bet_type: "Live",
        };
        const away_obj = {
          title: away.handicap,
          value: away.value_eu,
          suspend: away.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: away?.id,
          participant_name: away?.name,
          participant_handicap: away?.handicap,
          participant_header: away?.header,
          game: "basketball",
          bet_type: "Live",
        };

        const money_line_arr = [title_obj, home_obj, away_obj];
        base_arr.push(money_line_arr);
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentQuarterRaceTo = (data: any) => {
  var current_quarter = data?.info?.period;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = current_quarter + " Race to";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);

      for (var handicap in group) {
        var arr = [] as any;
        var group_obj = group[handicap];
        if (group_obj["Home"] && group_obj["Away"] && group_obj["Neither"]) {
          var home_obj = group_obj["Home"][0];
          var away_obj = group_obj["Away"][0];

          var neither_obj = group_obj["Neither"][0];

          var _title = { title: handicap, value: null, suspend: odds.suspend };
          var _home = {
            title: "",
            value: home_obj.value_eu,
            suspend: home_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: home_obj?.id,
            participant_name: home_obj?.name,
            participant_handicap: home_obj?.handicap,
            participant_header: home_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var _away = {
            title: "",
            value: away_obj.value_eu,
            suspend: away_obj.suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: away_obj?.id,
            participant_name: away_obj?.name,
            participant_handicap: away_obj?.handicap,
            participant_header: away_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var _neither = {
            title: "",
            value: neither_obj.value_eu,
            suspend: neither_obj.suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: neither_obj?.id,
            participant_name: neither_obj?.name,
            participant_handicap: neither_obj?.handicap,
            participant_header: neither_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr = [_title, _home, _away, _neither];
          base_arr.push(arr);
        }
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const nextQuarterRaceTo = (data: any) => {
  var current_quarter = data?.info?.period;
  var next_quarter = getNextQuarter(current_quarter);
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = next_quarter + " Race to";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);

      for (var handicap in group) {
        var arr = [] as any;
        var group_obj = group[handicap];
        if (group_obj["Home"] && group_obj["Away"]) {
          var home_obj = group_obj["Home"][0];
          var away_obj = group_obj["Away"][0];

          var neither_obj = group_obj["Neither"][0];

          var _title = { title: handicap, value: null, suspend: odds.suspend };
          var _home = {
            title: "",
            value: home_obj.value_eu,
            suspend: home_obj.suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: home_obj?.id,
            participant_name: home_obj?.name,
            participant_handicap: home_obj?.handicap,
            participant_header: home_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var _away = {
            title: "",
            value: away_obj.value_eu,
            suspend: away_obj.suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: away_obj?.id,
            participant_name: away_obj?.name,
            participant_handicap: away_obj?.handicap,
            participant_header: away_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var _neither = {
            title: "",
            value: neither_obj.value_eu,
            suspend: neither_obj.suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: neither_obj?.id,
            participant_name: neither_obj?.name,
            participant_handicap: neither_obj?.handicap,
            participant_header: neither_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr = [_title, _home, _away, _neither];
          base_arr.push(arr);
        }
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentHalfRaceTo = (data: any) => {
  var current_quarter = data?.info?.period;
  var current_period_int = parseInt(current_quarter);
  var half_int = 0;
  var half_string = "";
  var suspend_value = "0";
  if (current_period_int <= 2) {
    half_int = 1;
  } else {
    half_int = 2;
  }

  if (half_int == 1) {
    half_string = "1st Half";
  }
  if (half_int == 2) {
    half_string = "2nd Half";
  }

  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = half_string + " Race to";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);

      for (var handicap in group) {
        var arr = [] as any;
        var group_obj = group[handicap];
        var home_obj = group_obj["Home"][0];
        var away_obj = group_obj["Away"][0];

        var _title = { title: handicap, value: null, suspend: odds.suspend };
        var _home = {
          title: "",
          value: home_obj.value_eu,
          suspend: home_obj.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: home_obj?.id,
          participant_name: home_obj?.name,
          participant_handicap: home_obj?.handicap,
          participant_header: home_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var _away = {
          title: "",
          value: away_obj.value_eu,
          suspend: away_obj.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: away_obj?.id,
          participant_name: away_obj?.name,
          participant_handicap: away_obj?.handicap,
          participant_header: away_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        arr = [_title, _home, _away];
        base_arr.push(arr);
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentHalfRaceTo3Way = (data: any) => {
  var current_quarter = data?.info?.period;
  var current_period_int = parseInt(current_quarter);
  var half_int = 0;
  var half_string = "";
  if (current_period_int <= 2) {
    half_int = 1;
  } else {
    half_int = 2;
  }

  if (half_int == 1) {
    half_string = "1st Half";
  }
  if (half_int == 2) {
    half_string = "2nd Half";
  }

  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = half_string + " Race to";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);

      for (var handicap in group) {
        var arr = [] as any;
        var group_obj = group[handicap];
        if (group_obj["Home"] && group_obj["Away"] && group_obj["Neither"]) {
          var home_obj = group_obj["Home"][0];
          var away_obj = group_obj["Away"][0];
          var neither_obj = group_obj["Neither"][0];

          if (home_obj && away_obj && neither_obj) {
            var _title = {
              title: handicap,
              value: null,
              suspend: odds.suspend,
            };
            var _home = {
              title: "",
              value: home_obj.value_eu,
              suspend: home_obj.suspend,
              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: odd_id,
              odd_name: data?.odds?.[odd_id]?.name,
              participant_id: home_obj?.id,
              participant_name: home_obj?.name,
              participant_handicap: home_obj?.handicap,
              participant_header: home_obj?.header,
              game: "basketball",
              bet_type: "Live",
            };
            var _away = {
              title: "",
              value: away_obj.value_eu,
              suspend: away_obj.suspend,
              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: odd_id,
              odd_name: data?.odds?.[odd_id]?.name,
              participant_id: away_obj?.id,
              participant_name: away_obj?.name,
              participant_handicap: away_obj?.handicap,
              participant_header: away_obj?.header,
              game: "basketball",
              bet_type: "Live",
            };
            var _neither = {
              title: "",
              value: neither_obj.value_eu,
              suspend: neither_obj.suspend,
              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: odd_id,
              odd_name: data?.odds?.[odd_id]?.name,
              participant_id: neither_obj?.id,
              participant_name: neither_obj?.name,
              participant_handicap: neither_obj?.handicap,
              participant_header: neither_obj?.header,
              game: "basketball",
              bet_type: "Live",
            };
            arr = [_title, _home, _away, _neither];
            base_arr.push(arr);
          }
        }
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentQuarterBothTeamsToScore = (data: any) => {
  var current_quarter = data?.info?.period;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = current_quarter + " Both Teams To Score";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);

      for (var handicap in group) {
        var arr = [] as any;
        var group_obj = group[handicap];
        var yes_obj = group_obj["Yes"][0];
        var no_obj = group_obj["No"][0];

        var _title = { title: handicap, value: null, suspend: odds.suspend };
        var _yes = {
          title: "",
          value: yes_obj.value_eu,
          suspend: yes_obj.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: yes_obj?.id,
          participant_name: yes_obj?.name,
          participant_handicap: yes_obj?.handicap,
          participant_header: yes_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var _no = {
          title: "",
          value: no_obj.value_eu,
          suspend: no_obj.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: no_obj?.id,
          participant_name: no_obj?.name,
          participant_handicap: no_obj?.handicap,
          participant_header: no_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        arr = [_title, _yes, _no];
        base_arr.push(arr);
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const nextQuarterBothTeamsToScore = (data: any) => {
  var current_quarter = data?.info?.period;
  var next_quarter = getNextQuarter(current_quarter);
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = next_quarter + " Both Teams To Score";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);

      for (var handicap in group) {
        var arr = [] as any;
        var group_obj = group[handicap];
        if (group_obj["Yes"] !== undefined && group_obj["No"] !== undefined) {
          var yes_obj = group_obj["Yes"][0];
          var no_obj = group_obj["No"][0];

          var _title = { title: handicap, value: null, suspend: odds.suspend };
          var _yes = {
            title: "",
            value: yes_obj.value_eu,
            suspend: yes_obj.suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: yes_obj?.id,
            participant_name: yes_obj?.name,
            participant_handicap: yes_obj?.handicap,
            participant_header: yes_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var _no = {
            title: "",
            value: no_obj.value_eu,
            suspend: no_obj.suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: no_obj?.id,
            participant_name: no_obj?.name,
            participant_handicap: no_obj?.handicap,
            participant_header: no_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr = [_title, _yes, _no];
          base_arr.push(arr);
        }
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const halfLines = (data: any) => {
  var current_period = data?.info?.period;
  var current_period_int = parseInt(current_period.charAt(0));
  var half_int = 0;
  var half_string = "";
  if (current_period_int <= 2) {
    half_int = 1;
  } else {
    half_int = 2;
  }

  if (half_int == 1) {
    half_string = "1st Half";
  }
  if (half_int == 2) {
    half_string = "2nd Half";
  }
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = half_string + " Spread";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var home = _getParticipantsFieldRaw(participants, "Home");
      var away = _getParticipantsFieldRaw(participants, "Away");

      const title_obj = { title: "Spread", value: "", suspend: home.suspend };
      const home_obj = {
        title: home.handicap,
        value: home.value_eu,
        suspend: home.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: home?.id,
        participant_name: home?.name,
        participant_handicap: home?.handicap,
        participant_header: home?.header,
        game: "basketball",
        bet_type: "Live",
      };
      const away_obj = {
        title: away.handicap,
        value: away.value_eu,
        suspend: away.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: away?.id,
        participant_name: away?.name,
        participant_handicap: away?.handicap,
        participant_header: away?.header,
        game: "basketball",
        bet_type: "Live",
      };

      const line_spread_arr = [title_obj, home_obj, away_obj];
      base_arr.push(line_spread_arr);
    }
  }

  {
    var search_string = half_string + " Total";
    odd_id = findIdByName(data, search_string);
    odds = data?.odds?.[odd_id];

    if (odds) {
      participants = odds.participants;
      var over = _getParticipantsFieldRaw(participants, "Over");
      var under = _getParticipantsFieldRaw(participants, "Under");

      if (over !== null || under !== null) {
        const title_obj = { title: "Total", value: "", suspend: over.suspend };
        var _participants = Object.values(participants) as any;
        console.log("_participanto", _participants);
        const over_obj = {
          title: "O " + _participants[0].handicap,
          value: _participants[0].value_eu,
          suspend: _participants[0].suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: _participants[0]?.id,
          participant_name: _participants[0]?.name,
          participant_handicap: _participants[0]?.handicap,
          participant_header: _participants[0]?.header,
          game: "basketball",
          bet_type: "Live",
        };
        const under_obj = {
          title: "U " + _participants[1].handicap,
          value: _participants[1].value_eu,
          suspend: _participants[1].suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: _participants[1]?.id,
          participant_name: _participants[1]?.name,
          participant_handicap: _participants[1]?.handicap,
          participant_header: _participants[1]?.header,
          game: "basketball",
          bet_type: "Live",
        };

        const total_spread_arr = [title_obj, over_obj, under_obj];
        base_arr.push(total_spread_arr);
      } else {
        if (over && under) {
          const title_obj = {
            title: "Total",
            value: "",
            suspend: over.suspend,
          };
          const over_obj = {
            title: "O " + over.handicap,
            value: over.value_eu,
            suspend: over.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: over?.id,
            participant_name: over?.name,
            participant_handicap: over?.handicap,
            participant_header: over?.header,
            game: "basketball",
            bet_type: "Live",
          };
          const under_obj = {
            title: "U " + under.handicap,
            value: under.value_eu,
            suspend: under.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: under?.id,
            participant_name: under?.name,
            participant_handicap: under?.handicap,
            participant_header: under?.header,
            game: "basketball",
            bet_type: "Live",
          };

          const total_spread_arr = [title_obj, over_obj, under_obj];
          base_arr.push(total_spread_arr);
        }
      }
    }
  }

  {
    var search_string = half_string + " Money Line";
    odd_id = findIdByName(data, search_string);
    odds = data?.odds?.[odd_id];
    if (odds) {
      participants = odds.participants;
      var home = _getParticipantsFieldRaw(participants, "Home");
      var away = _getParticipantsFieldRaw(participants, "Away");

      const title_obj = {
        title: "Money Line",
        value: "",
        suspend: home.suspend,
      };
      const home_obj = {
        title: home.handicap,
        value: home.value_eu,
        suspend: home.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: home?.id,
        participant_name: home?.name,
        participant_handicap: home?.handicap,
        participant_header: home?.header,
        game: "basketball",
        bet_type: "Live",
      };
      const away_obj = {
        title: away.handicap,
        value: away.value_eu,
        suspend: away.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: away?.id,
        participant_name: away?.name,
        participant_handicap: away?.handicap,
        participant_header: away?.header,
        game: "basketball",
        bet_type: "Live",
      };

      const money_line_arr = [title_obj, home_obj, away_obj];
      base_arr.push(money_line_arr);
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentQuarterHomeTeamToScore = (data: any) => {
  var current_quarter = data?.info?.period;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Home Team Score (" + current_quarter + ")";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        if (group_obj["Yes"] && group_obj["No"]) {
          var _yes_obj = group_obj["Yes"][0];
          var _no_obj = group_obj["No"][0];
          var title_obj = { title: handicap, value: "", suspend: odds.suspend };
          var yes_obj = {
            title: "",
            value: _yes_obj.value_eu,
            suspend: _yes_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _yes_obj?.id,
            participant_name: _yes_obj?.name,
            participant_handicap: _yes_obj?.handicap,
            participant_header: _yes_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var no_obj = {
            title: "",
            value: _no_obj.value_eu,
            suspend: _no_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _no_obj?.id,
            participant_name: _no_obj?.name,
            participant_handicap: _no_obj?.handicap,
            participant_header: _no_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr = [title_obj, yes_obj, no_obj];
          base_arr.push(arr);
        }
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const nextQuarterHomeTeamToScore = (data: any) => {
  var current_quarter = data?.info?.period;
  var suspend_value = "0";
  var next_quarter = getNextQuarter(current_quarter);
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Home Team Score (" + next_quarter + ")";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        var _yes_obj = group_obj["Yes"][0];
        var _no_obj = group_obj["No"][0];
        var title_obj = { title: handicap, value: "", suspend: odds.suspend };
        var yes_obj = {
          title: "",
          value: _yes_obj.value_eu,
          suspend: _yes_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: _yes_obj?.id,
          participant_name: _yes_obj?.name,
          participant_handicap: _yes_obj?.handicap,
          participant_header: _yes_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var no_obj = {
          title: "",
          value: _no_obj.value_eu,
          suspend: _no_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: _no_obj?.id,
          participant_name: _no_obj?.name,
          participant_handicap: _no_obj?.handicap,
          participant_header: _no_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        arr = [title_obj, yes_obj, no_obj];
        base_arr.push(arr);
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentQuarterAwayTeamToScore = (data: any) => {
  var current_quarter = data?.info?.period;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Away Team Score (" + current_quarter + ")";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        var _yes_obj = group_obj["Yes"][0];
        var _no_obj = group_obj["No"][0];
        var title_obj = { title: handicap, value: "", suspend: odds.suspend };
        var yes_obj = {
          title: "",
          value: _yes_obj.value_eu,
          suspend: _yes_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: _yes_obj?.id,
          participant_name: _yes_obj?.name,
          participant_handicap: _yes_obj?.handicap,
          participant_header: _yes_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var no_obj = {
          title: "",
          value: _no_obj.value_eu,
          suspend: _no_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: _no_obj?.id,
          participant_name: _no_obj?.name,
          participant_handicap: _no_obj?.handicap,
          participant_header: _no_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        arr = [title_obj, yes_obj, no_obj];
        base_arr.push(arr);
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const nextQuarterAwayTeamToScore = (data: any) => {
  var current_quarter = data?.info?.period;
  var next_quarter = getNextQuarter(current_quarter);
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Away Team Score (" + next_quarter + ")";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        var _yes_obj = group_obj["Yes"][0];
        var _no_obj = group_obj["No"][0];
        var title_obj = { title: handicap, value: "", suspend: odds.suspend };
        var yes_obj = {
          title: "",
          value: _yes_obj.value_eu,
          suspend: _yes_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: _yes_obj?.id,
          participant_name: _yes_obj?.name,
          participant_handicap: _yes_obj?.handicap,
          participant_header: _yes_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var no_obj = {
          title: "",
          value: _no_obj.value_eu,
          suspend: _no_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: _no_obj?.id,
          participant_name: _no_obj?.name,
          participant_handicap: _no_obj?.handicap,
          participant_header: _no_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        arr = [title_obj, yes_obj, no_obj];
        base_arr.push(arr);
      }
    }
  }
  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentQuarterHomeTeamToScore2 = (data: any) => {
  var current_quarter = data?.info?.period;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = current_quarter + " Home To Score";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        var _yes_obj = group_obj["Yes"][0];
        var _no_obj = group_obj["No"][0];
        var title_obj = { title: handicap, value: "", suspend: odds.suspend };
        var yes_obj = {
          title: "",
          value: _yes_obj.value_eu,
          suspend: _yes_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: _yes_obj?.id,
          participant_name: _yes_obj?.name,
          participant_handicap: _yes_obj?.handicap,
          participant_header: _yes_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var no_obj = {
          title: "",
          value: _no_obj.value_eu,
          suspend: _no_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: _no_obj?.id,
          participant_name: _no_obj?.name,
          participant_handicap: _no_obj?.handicap,
          participant_header: _no_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        arr = [title_obj, yes_obj, no_obj];
        base_arr.push(arr);
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const nextQuarterHomeTeamToScore2 = (data: any) => {
  var current_quarter = data?.info?.period;
  var next_quarter = getNextQuarter(current_quarter);
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = next_quarter + " Home To Score";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        var _yes_obj = group_obj["Yes"][0];
        var _no_obj = group_obj["No"][0];
        var title_obj = { title: handicap, value: "", suspend: odds.suspend };
        var yes_obj = {
          title: "",
          value: _yes_obj.value_eu,
          suspend: _yes_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: _yes_obj?.id,
          participant_name: _yes_obj?.name,
          participant_handicap: _yes_obj?.handicap,
          participant_header: _yes_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var no_obj = {
          title: "",
          value: _no_obj.value_eu,
          suspend: _no_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: _no_obj?.id,
          participant_name: _no_obj?.name,
          participant_handicap: _no_obj?.handicap,
          participant_header: _no_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        arr = [title_obj, yes_obj, no_obj];
        base_arr.push(arr);
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentQuarterAwayTeamToScore2 = (data: any) => {
  var current_quarter = data?.info?.period;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = current_quarter + " Away To Score";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        if (group_obj["Yes"] === undefined || group_obj["No"] === undefined) {
          console.log("UNDEFINED currentQuarterAwayTeamToScore2", group_obj);
          continue;
        }
        var _yes_obj = group_obj["Yes"][0];
        var _no_obj = group_obj["No"][0];
        var title_obj = { title: handicap, value: "", suspend: odds.suspend };
        var yes_obj = {
          title: "",
          value: _yes_obj.value_eu,
          suspend: _yes_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: _yes_obj?.id,
          participant_name: _yes_obj?.name,
          participant_handicap: _yes_obj?.handicap,
          participant_header: _yes_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var no_obj = {
          title: "",
          value: _no_obj.value_eu,
          suspend: _no_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: _no_obj?.id,
          participant_name: _no_obj?.name,
          participant_handicap: _no_obj?.handicap,
          participant_header: _no_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        arr = [title_obj, yes_obj, no_obj];
        base_arr.push(arr);
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const nextQuarterAwayTeamToScore2 = (data: any) => {
  var current_quarter = data?.info?.period;
  var next_quarter = getNextQuarter(current_quarter);
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = next_quarter + " Away To Score";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        if (group_obj["Yes"] === undefined || group_obj["No"] === undefined) {
          console.log("UNDEFINED currentQuarterAwayTeamToScore2", group_obj);
          continue;
        }
        var _yes_obj = group_obj["Yes"][0];
        var _no_obj = group_obj["No"][0];
        var title_obj = { title: handicap, value: "", suspend: odds.suspend };
        var yes_obj = {
          title: "",
          value: _yes_obj.value_eu,
          suspend: _yes_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: _yes_obj?.id,
          participant_name: _yes_obj?.name,
          participant_handicap: _yes_obj?.handicap,
          participant_header: _yes_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var no_obj = {
          title: "",
          value: _no_obj.value_eu,
          suspend: _no_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: _no_obj?.id,
          participant_name: _no_obj?.name,
          participant_handicap: _no_obj?.handicap,
          participant_header: _no_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        arr = [title_obj, yes_obj, no_obj];
        base_arr.push(arr);
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentQuarterMarginOfVictory = (data: any) => {
  var current_quarter = data?.info?.period;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = current_quarter + " Margin of Victory";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var arr = [] as any;
      var participants = odds.participants;
      for (var participant_id in participants) {
        var participant_obj = participants[participant_id];
        var obj = {
          title: participant_obj.name,
          value: participant_obj.value_eu,
          suspend: participant_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: participant_obj?.id,
          participant_name: participant_obj?.name,
          participant_handicap: participant_obj?.handicap,
          participant_header: participant_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        arr.push(obj);
      }
      base_arr.push(arr);
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const nextQuarterMarginOfVictory = (data: any) => {
  var current_quarter = data?.info?.period;
  var next_quarter = getNextQuarter(current_quarter);
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = next_quarter + " Margin of Victory";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var arr = [] as any;
      var participants = odds.participants;
      for (var participant_id in participants) {
        var participant_obj = participants[participant_id];
        var obj = {
          title: participant_obj.name,
          value: participant_obj.value_eu,
          suspend: participant_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: participant_obj?.id,
          participant_name: participant_obj?.name,
          participant_handicap: participant_obj?.handicap,
          participant_header: participant_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        arr.push(obj);
      }
      base_arr.push(arr);
    }
  }

  console.log("Current Quarter Margin of Victory", base_arr);
  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentQuarterTeamTotals = (data: any) => {
  var current_quarter = data?.info?.period;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;
  var arr = [] as any;

  {
    var search_string = "Home Team Total (" + current_quarter + ")";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      var length = Object.keys(group).length;
      if (length > 1) {
        for (var handicap in group) {
          var group_obj = group[handicap];
          if (
            group_obj["Over"] === undefined ||
            group_obj["Under"] === undefined
          ) {
            return { rows: [], suspend: "0" };
          }

          if (
            group_obj["Over"][0].is_main === "1" ||
            group_obj["Under"][0].is_main === "1"
          ) {
            var over_obj = group_obj["Over"][0];
            var under_obj = group_obj["Under"][0];
            var _over = {
              title: "Over " + handicap,
              value: over_obj.value_eu,
              suspend: over_obj.suspend,

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: odd_id,
              odd_name: data?.odds?.[odd_id]?.name,
              participant_id: over_obj?.id,
              participant_name: over_obj?.name,
              participant_handicap: over_obj?.handicap,
              participant_header: over_obj?.header,
              game: "basketball",
              bet_type: "Live",
            };
            var _under = {
              title: "Under " + handicap,
              value: under_obj.value_eu,
              suspend: under_obj.suspend,

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: odd_id,
              odd_name: data?.odds?.[odd_id]?.name,
              participant_id: under_obj?.id,
              participant_name: under_obj?.name,
              participant_handicap: under_obj?.handicap,
              participant_header: under_obj?.header,
              game: "basketball",
              bet_type: "Live",
            };
            arr.push(_over, _under);
          }
        }
      }
      if (length === 1) {
        for (var handicap in group) {
          var group_obj = group[handicap];
          if (
            group_obj["Over"] === undefined ||
            group_obj["Under"] === undefined
          ) {
            return { rows: [], suspend: "0" };
          }
          var over_obj = group_obj["Over"][0];
          var under_obj = group_obj["Under"][0];
          var _over = {
            title: "Over " + handicap,
            value: over_obj.value_eu,
            suspend: over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: over_obj?.id,
            participant_name: over_obj?.name,
            participant_handicap: over_obj?.handicap,
            participant_header: over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var _under = {
            title: "Under " + handicap,
            value: under_obj.value_eu,
            suspend: under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: under_obj?.id,
            participant_name: under_obj?.name,
            participant_handicap: under_obj?.handicap,
            participant_header: under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr.push(_over, _under);
        }
      }
    }
  }

  {
    var search_string = "Away Team Total (" + current_quarter + ")";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      var length = Object.keys(group).length;
      if (length > 1) {
        for (var handicap in group) {
          var group_obj = group[handicap];
          if (
            group_obj["Over"] === undefined ||
            group_obj["Under"] === undefined
          ) {
            return { rows: [], suspend: "0" };
          }

          if (
            group_obj["Over"][0].is_main === "1" ||
            group_obj["Under"][0].is_main === "1"
          ) {
            var over_obj = group_obj["Over"][0];
            var under_obj = group_obj["Under"][0];
            var _over = {
              title: "Over " + handicap,
              value: over_obj.value_eu,
              suspend: over_obj.suspend,

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: odd_id,
              odd_name: data?.odds?.[odd_id]?.name,
              participant_id: over_obj?.id,
              participant_name: over_obj?.name,
              participant_handicap: over_obj?.handicap,
              participant_header: over_obj?.header,
              game: "basketball",
              bet_type: "Live",
            };
            var _under = {
              title: "Under " + handicap,
              value: under_obj.value_eu,
              suspend: under_obj.suspend,

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: odd_id,
              odd_name: data?.odds?.[odd_id]?.name,
              participant_id: under_obj?.id,
              participant_name: under_obj?.name,
              participant_handicap: under_obj?.handicap,
              participant_header: under_obj?.header,
              game: "basketball",
              bet_type: "Live",
            };
            arr.push(_over, _under);
          }
        }
      }

      if (length === 1) {
        for (var handicap in group) {
          var group_obj = group[handicap];
          if (
            group_obj["Over"] === undefined ||
            group_obj["Under"] === undefined
          ) {
            return { rows: [], suspend: "0" };
          }

          var over_obj = group_obj["Over"][0];
          var under_obj = group_obj["Under"][0];
          var _over = {
            title: "Over " + handicap,
            value: over_obj.value_eu,
            suspend: over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: over_obj?.id,
            participant_name: over_obj?.name,
            participant_handicap: over_obj?.handicap,
            participant_header: over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var _under = {
            title: "Under " + handicap,
            value: under_obj.value_eu,
            suspend: under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: under_obj?.id,
            participant_name: under_obj?.name,
            participant_handicap: under_obj?.handicap,
            participant_header: under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr.push(_over, _under);
        }
      }
    }
  }
  if (arr.length == 4) {
    base_arr.push(arr);
  }

  // TODO Suspend value
  console.log("Current Quarter Team Totals", base_arr);
  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const nextQuarterTeamTotals = (data: any) => {
  var current_quarter = data?.info?.period;
  var next_quarter = getNextQuarter(current_quarter);
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;
  var arr = [] as any;

  {
    var search_string = "Home Team Total (" + next_quarter + ")";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      var length = Object.keys(group).length;
      if (length > 1) {
        for (var handicap in group) {
          var group_obj = group[handicap];
          if (
            group_obj["Over"] === undefined ||
            group_obj["Under"] === undefined
          ) {
            return { rows: [], suspend: "0" };
          }

          if (
            group_obj["Over"][0].is_main === "1" ||
            group_obj["Under"][0].is_main === "1"
          ) {
            var over_obj = group_obj["Over"][0];
            var under_obj = group_obj["Under"][0];
            var _over = {
              title: "Over " + handicap,
              value: over_obj.value_eu,
              suspend: over_obj.suspend,

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: odd_id,
              odd_name: data?.odds?.[odd_id]?.name,
              participant_id: over_obj?.id,
              participant_name: over_obj?.name,
              participant_handicap: over_obj?.handicap,
              participant_header: over_obj?.header,
              game: "basketball",
              bet_type: "Live",
            };
            var _under = {
              title: "Under " + handicap,
              value: under_obj.value_eu,
              suspend: under_obj.suspend,

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: odd_id,
              odd_name: data?.odds?.[odd_id]?.name,
              participant_id: under_obj?.id,
              participant_name: under_obj?.name,
              participant_handicap: under_obj?.handicap,
              participant_header: under_obj?.header,
              game: "basketball",
              bet_type: "Live",
            };
            arr.push(_over, _under);
          }
        }
      }
      if (length === 1) {
        for (var handicap in group) {
          var group_obj = group[handicap];
          if (
            group_obj["Over"] === undefined ||
            group_obj["Under"] === undefined
          ) {
            return { rows: [], suspend: "0" };
          }
          var over_obj = group_obj["Over"][0];
          var under_obj = group_obj["Under"][0];
          var _over = {
            title: "Over " + handicap,
            value: over_obj.value_eu,
            suspend: over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: over_obj?.id,
            participant_name: over_obj?.name,
            participant_handicap: over_obj?.handicap,
            participant_header: over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var _under = {
            title: "Under " + handicap,
            value: under_obj.value_eu,
            suspend: under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: under_obj?.id,
            participant_name: under_obj?.name,
            participant_handicap: under_obj?.handicap,
            participant_header: under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr.push(_over, _under);
        }
      }
    }
  }

  {
    var search_string = "Away Team Total (" + next_quarter + ")";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      var length = Object.keys(group).length;
      if (length > 1) {
        for (var handicap in group) {
          var group_obj = group[handicap];
          if (
            group_obj["Over"] === undefined ||
            group_obj["Under"] === undefined
          ) {
            return { rows: [], suspend: "0" };
          }

          if (
            group_obj["Over"][0].is_main === "1" ||
            group_obj["Under"][0].is_main === "1"
          ) {
            var over_obj = group_obj["Over"][0];
            var under_obj = group_obj["Under"][0];
            var _over = {
              title: "Over " + handicap,
              value: over_obj.value_eu,
              suspend: over_obj.suspend,

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: odd_id,
              odd_name: data?.odds?.[odd_id]?.name,
              participant_id: over_obj?.id,
              participant_name: over_obj?.name,
              participant_handicap: over_obj?.handicap,
              participant_header: over_obj?.header,
              game: "basketball",
              bet_type: "Live",
            };
            var _under = {
              title: "Under " + handicap,
              value: under_obj.value_eu,
              suspend: under_obj.suspend,

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: odd_id,
              odd_name: data?.odds?.[odd_id]?.name,
              participant_id: under_obj?.id,
              participant_name: under_obj?.name,
              participant_handicap: under_obj?.handicap,
              participant_header: under_obj?.header,
              game: "basketball",
              bet_type: "Live",
            };
            arr.push(_over, _under);
          }
        }
      }

      if (length === 1) {
        for (var handicap in group) {
          var group_obj = group[handicap];
          if (
            group_obj["Over"] === undefined ||
            group_obj["Under"] === undefined
          ) {
            return { rows: [], suspend: "0" };
          }

          var over_obj = group_obj["Over"][0];
          var under_obj = group_obj["Under"][0];
          var _over = {
            title: "Over " + handicap,
            value: over_obj.value_eu,
            suspend: over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: over_obj?.id,
            participant_name: over_obj?.name,
            participant_handicap: over_obj?.handicap,
            participant_header: over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var _under = {
            title: "Under " + handicap,
            value: under_obj.value_eu,
            suspend: under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: under_obj?.id,
            participant_name: under_obj?.name,
            participant_handicap: under_obj?.handicap,
            participant_header: under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr.push(_over, _under);
        }
      }
    }
  }
  if (arr.length == 4) {
    base_arr.push(arr);
  }

  // TODO Suspend value
  console.log("Current Quarter Team Totals", base_arr);
  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const teamTotals = (data: any) => {
  var current_quarter = data?.info?.period;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;
  var arr = [] as any;

  {
    var search_string = "Home Team Total (Including OT)";
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
          if (
            group_obj["Over"] === undefined ||
            group_obj["Under"] === undefined
          ) {
            return { rows: [], suspend: "0" };
          }

          if (
            group_obj["Over"][0].is_main === "1" ||
            group_obj["Under"][0].is_main === "1"
          ) {
            var over_obj = group_obj["Over"][0];
            var under_obj = group_obj["Under"][0];
            var _over = {
              title: "Over " + handicap,
              value: over_obj.value_eu,
              suspend: over_obj.suspend,

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: odd_id,
              odd_name: data?.odds?.[odd_id]?.name,
              participant_id: over_obj?.id,
              participant_name: over_obj?.name,
              participant_handicap: over_obj?.handicap,
              participant_header: over_obj?.header,
              game: "basketball",
              bet_type: "Live",
            };
            var _under = {
              title: "Under " + handicap,
              value: under_obj.value_eu,
              suspend: under_obj.suspend,

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: odd_id,
              odd_name: data?.odds?.[odd_id]?.name,
              participant_id: under_obj?.id,
              participant_name: under_obj?.name,
              participant_handicap: under_obj?.handicap,
              participant_header: under_obj?.header,
              game: "basketball",
              bet_type: "Live",
            };
            arr.push(_over, _under);
          }
        }
      }
      if (length === 1) {
        for (var handicap in group) {
          var group_obj = group[handicap];
          if (
            group_obj["Over"] === undefined ||
            group_obj["Under"] === undefined
          ) {
            return { rows: [], suspend: "0" };
          }

          var over_obj = group_obj["Over"][0];
          var under_obj = group_obj["Under"][0];
          var _over = {
            title: "Over " + handicap,
            value: over_obj.value_eu,
            suspend: over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: over_obj?.id,
            participant_name: over_obj?.name,
            participant_handicap: over_obj?.handicap,
            participant_header: over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var _under = {
            title: "Under " + handicap,
            value: under_obj.value_eu,
            suspend: under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: under_obj?.id,
            participant_name: under_obj?.name,
            participant_handicap: under_obj?.handicap,
            participant_header: under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr.push(_over, _under);
        }
      }
    }
  }

  {
    // var search_string = "Away Team Total ("+ current_quarter + ")"
    var search_string = "Away Team Total (Including OT)";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      var length = Object.keys(group).length;
      if (length > 1) {
        for (var handicap in group) {
          var group_obj = group[handicap];
          if (
            group_obj["Over"] === undefined ||
            group_obj["Under"] === undefined
          ) {
            return { rows: [], suspend: "0" };
          }

          if (
            group_obj["Over"][0].is_main === "1" ||
            group_obj["Under"][0].is_main === "1"
          ) {
            var over_obj = group_obj["Over"][0];
            var under_obj = group_obj["Under"][0];
            var _over = {
              title: "Over " + handicap,
              value: over_obj.value_eu,
              suspend: over_obj.suspend,

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: odd_id,
              odd_name: data?.odds?.[odd_id]?.name,
              participant_id: over_obj?.id,
              participant_name: over_obj?.name,
              participant_handicap: over_obj?.handicap,
              participant_header: over_obj?.header,
              game: "basketball",
              bet_type: "Live",
            };
            var _under = {
              title: "Under " + handicap,
              value: under_obj.value_eu,
              suspend: under_obj.suspend,

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: odd_id,
              odd_name: data?.odds?.[odd_id]?.name,
              participant_id: under_obj?.id,
              participant_name: under_obj?.name,
              participant_handicap: under_obj?.handicap,
              participant_header: under_obj?.header,
              game: "basketball",
              bet_type: "Live",
            };
            arr.push(_over, _under);
          }
        }
      }
      if (length === 1) {
        for (var handicap in group) {
          var group_obj = group[handicap];
          if (
            group_obj["Over"] === undefined ||
            group_obj["Under"] === undefined
          ) {
            return { rows: [], suspend: "0" };
          }

          var over_obj = group_obj["Over"][0];
          var under_obj = group_obj["Under"][0];
          var _over = {
            title: "Over " + handicap,
            value: over_obj.value_eu,
            suspend: over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: over_obj?.id,
            participant_name: over_obj?.name,
            participant_handicap: over_obj?.handicap,
            participant_header: over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var _under = {
            title: "Under " + handicap,
            value: under_obj.value_eu,
            suspend: under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: under_obj?.id,
            participant_name: under_obj?.name,
            participant_handicap: under_obj?.handicap,
            participant_header: under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr.push(_over, _under);
        }
      }
    }
  }
  if (arr.length == 4) {
    base_arr.push(arr);
  }

  // TODO Suspend value
  console.log("Current Quarter Team Totals", base_arr);
  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const alternativePointSpread = (data: any) => {
  var current_quarter = data?.info?.period;
  var suspend_value = "0";
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Asian Handicap";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAbsAndName(participants);
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        if (group_obj["Home"] && group_obj["Away"]) {
          var _home_obj = group_obj["Home"][0];
          var _away_obj = group_obj["Away"][0];
          var home_obj = {
            title: _home_obj.handicap,
            value: _home_obj.value_eu,
            suspend: _home_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _home_obj?.id,
            participant_name: _home_obj?.name,
            participant_handicap: _home_obj?.handicap,
            participant_header: _home_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var away_obj = {
            title: _away_obj.handicap,
            value: _away_obj.value_eu,
            suspend: _away_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _away_obj?.id,
            participant_name: _away_obj?.name,
            participant_handicap: _away_obj?.handicap,
            participant_header: _away_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr = [home_obj, away_obj];
          base_arr.push(arr);
        }
      }
    }
  }

  base_arr.sort((a: any, b: any) => {
    // Convert the title (handicap) of the first object of each inner array to a number
    let handicapA = parseFloat(a[0].title);
    let handicapB = parseFloat(b[0].title);

    // Perform the comparison to determine the order
    return handicapA - handicapB;
  });
  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const gameLinesTotal = (data: any) => {
  var current_quarter = data?.info?.period;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Game Lines Total";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      var length = Object.keys(group).length;
      if (length <= 1) {
        return { rows: [], suspend: "0" };
      }
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        if (group_obj["Over"] && group_obj["Under"]) {
          var _over_obj = group_obj["Over"][0];
          var _under_obj = group_obj["Under"][0];
          var title_obj = {
            title: handicap,
            value: null,
            suspend: odds.suspend,
          };
          var over_obj = {
            title: "",
            value: _over_obj.value_eu,
            suspend: _over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _over_obj?.id,
            participant_name: _over_obj?.name,
            participant_handicap: _over_obj?.handicap,
            participant_header: _over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var under_obj = {
            title: "",
            value: _under_obj.value_eu,
            suspend: _under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _under_obj?.id,
            participant_name: _under_obj?.name,
            participant_handicap: _under_obj?.handicap,
            participant_header: _under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr = [title_obj, over_obj, under_obj];
          base_arr.push(arr);
        }
      }
    }
  }

  base_arr.sort((a: any, b: any) => {
    // Convert the title (handicap) of the first object of each inner array to a number
    let handicapA = parseFloat(a[0].title);
    let handicapB = parseFloat(b[0].title);

    // Perform the comparison to determine the order
    return handicapA - handicapB;
  });
  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const homeTeamTotal = (data: any) => {
  var current_quarter = data?.info?.period;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Home Team Total (Including OT)";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      var length = Object.keys(group).length;
      if (length <= 1) {
        return { rows: [], suspend: "0" };
      }
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        if (group_obj["Over"] && group_obj["Under"]) {
          var _over_obj = group_obj["Over"][0];
          var _under_obj = group_obj["Under"][0];
          var title_obj = {
            title: handicap,
            value: null,
            suspend: odds.suspend,
          };
          var over_obj = {
            title: "",
            value: _over_obj.value_eu,
            suspend: _over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _over_obj?.id,
            participant_name: _over_obj?.name,
            participant_handicap: _over_obj?.handicap,
            participant_header: _over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var under_obj = {
            title: "",
            value: _under_obj.value_eu,
            suspend: _under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _under_obj?.id,
            participant_name: _under_obj?.name,
            participant_handicap: _under_obj?.handicap,
            participant_header: _under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr = [title_obj, over_obj, under_obj];
          base_arr.push(arr);
        }
      }
    }
  }

  base_arr.sort((a: any, b: any) => {
    // Convert the title (handicap) of the first object of each inner array to a number
    let handicapA = parseFloat(a[0].title);
    let handicapB = parseFloat(b[0].title);

    // Perform the comparison to determine the order
    return handicapA - handicapB;
  });

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const awayTeamTotal = (data: any) => {
  var current_quarter = data?.info?.period;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Away Team Total (Including OT)";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      var length = Object.keys(group).length;
      if (length <= 1) {
        return { rows: [], suspend: "0" };
      }
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        if (group_obj["Over"] && group_obj["Under"]) {
          var _over_obj = group_obj["Over"][0];
          var _under_obj = group_obj["Under"][0];
          var title_obj = {
            title: handicap,
            value: null,
            suspend: odds.suspend,
          };
          var over_obj = {
            title: "",
            value: _over_obj.value_eu,
            suspend: _over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _over_obj?.id,
            participant_name: _over_obj?.name,
            participant_handicap: _over_obj?.handicap,
            participant_header: _over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var under_obj = {
            title: "",
            value: _under_obj.value_eu,
            suspend: _under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _under_obj?.id,
            participant_name: _under_obj?.name,
            participant_handicap: _under_obj?.handicap,
            participant_header: _under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr = [title_obj, over_obj, under_obj];
          base_arr.push(arr);
        }
      }
    }
  }

  base_arr.sort((a: any, b: any) => {
    // Convert the title (handicap) of the first object of each inner array to a number
    let handicapA = parseFloat(a[0].title);
    let handicapB = parseFloat(b[0].title);

    // Perform the comparison to determine the order
    return handicapA - handicapB;
  });

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentQuarterTotal = (data: any) => {
  var current_quarter = data?.info?.period;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = current_quarter + " Lines Total";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        var _over_obj = group_obj["Over"][0];
        var _under_obj = group_obj["Under"][0];
        var title_obj = { title: handicap, value: null, suspend: odds.suspend };
        var over_obj = {
          title: "",
          value: _over_obj.value_eu,
          suspend: _over_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: _over_obj?.id,
          participant_name: _over_obj?.name,
          participant_handicap: _over_obj?.handicap,
          participant_header: _over_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var under_obj = {
          title: "",
          value: _under_obj.value_eu,
          suspend: _under_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: _under_obj?.id,
          participant_name: _under_obj?.name,
          participant_handicap: _under_obj?.handicap,
          participant_header: _under_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        arr = [title_obj, over_obj, under_obj];
        base_arr.push(arr);
      }
    }
  }

  base_arr.sort((a: any, b: any) => {
    // Convert the title (handicap) of the first object of each inner array to a number
    let handicapA = parseFloat(a[0].title);
    let handicapB = parseFloat(b[0].title);

    // Perform the comparison to determine the order
    return handicapA - handicapB;
  });
  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const matchResultAndTotal = (data: any) => {
  var current_quarter = data?.info?.period;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Result/Total Goals";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr_home = [] as any;
        var arr_away = [] as any;

        if (
          group_obj["Home/o"] &&
          group_obj["Home/u"] &&
          group_obj["Away/o"] &&
          group_obj["Away/u"]
        ) {
          var _home_over_obj = group_obj["Home/o"][0];
          var _home_under_obj = group_obj["Home/u"][0];
          var _away_over_obj = group_obj["Away/o"][0];
          var _away_under_obj = group_obj["Away/u"][0];

          var home_title = {
            title: data?.team_info?.home?.name,
            value: null,
            suspend: odds.suspend,
          };
          var home_over = {
            title: handicap,
            value: _home_over_obj.value_eu,
            suspend: _home_over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _home_over_obj?.id,
            participant_name: _home_over_obj?.name,
            participant_handicap: _home_over_obj?.handicap,
            participant_header: _home_over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var home_under = {
            title: handicap,
            value: _home_under_obj.value_eu,
            suspend: _home_under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _home_under_obj?.id,
            participant_name: _home_under_obj?.name,
            participant_handicap: _home_under_obj?.handicap,
            participant_header: _home_under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };

          arr_home = [home_title, home_over, home_under];

          var away_title = {
            title: data?.team_info?.away?.name,
            value: null,
            suspend: "0",
          };
          var away_over = {
            title: handicap,
            value: _away_over_obj.value_eu,
            suspend: _away_over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _away_over_obj?.id,
            participant_name: _away_over_obj?.name,
            participant_handicap: _away_over_obj?.handicap,
            participant_header: _away_over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var away_under = {
            title: handicap,
            value: _away_under_obj.value_eu,
            suspend: _away_under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _away_under_obj?.id,
            participant_name: _away_under_obj?.name,
            participant_handicap: _away_under_obj?.handicap,
            participant_header: _away_under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };

          arr_away = [away_title, away_over, away_under];
          // arr = [title_obj, over_obj, under_obj]
          base_arr.push(arr_home);
          base_arr.push(arr_away);
        }
      }
    }
  }

  base_arr.sort((a: any, b: any) => {
    // Convert the title (handicap) of the first object of each inner array to a number
    let handicapA = parseFloat(a[0].title);
    let handicapB = parseFloat(b[0].title);

    // Perform the comparison to determine the order
    return handicapA - handicapB;
  });
  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const pointSpread3Way = (data: any) => {
  var current_quarter = data?.info?.period;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "European Handicap";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var arr = [] as any;
      var participants = odds.participants;
      var home = _getParticipantsFieldRaw(participants, "Home");
      var draw = _getParticipantsFieldRaw(participants, "Draw");
      var away = _getParticipantsFieldRaw(participants, "Away");
      if (home && draw && away) {
        var home_obj = {
          title: home.handicap,
          value: home.value_eu,
          suspend: home.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: home?.id,
          participant_name: home?.name,
          participant_handicap: home?.handicap,
          participant_header: home?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var draw_obj = {
          title: draw.handicap,
          value: draw.value_eu,
          suspend: draw.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: draw?.id,
          participant_name: draw?.name,
          participant_handicap: draw?.handicap,
          participant_header: draw?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var away_obj = {
          title: away.handicap,
          value: away.value_eu,
          suspend: away.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: away?.id,
          participant_name: away?.name,
          participant_handicap: away?.handicap,
          participant_header: away?.header,
          game: "basketball",
          bet_type: "Live",
        };
        arr = [home_obj, draw_obj, away_obj];
        base_arr.push(arr);
      }
    }
  }
  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const highestScoringHalf = (data: any) => {
  var current_quarter = data?.info?.period;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Highest Scoring Half";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var arr = [] as any;
      var participants = odds.participants;
      var first_half_obj = _getParticipantsFieldRaw(participants, "1st Half");
      var second_half_obj = _getParticipantsFieldRaw(participants, "2nd Half");
      var draw_obj = _getParticipantsFieldRaw(participants, "Draw");
      var _first_half_obj = {
        title: first_half_obj.name,
        value: first_half_obj.value_eu,
        suspend: first_half_obj.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: first_half_obj?.id,
        participant_name: first_half_obj?.name,
        participant_handicap: first_half_obj?.handicap,
        participant_header: first_half_obj?.header,
        game: "basketball",
        bet_type: "Live",
      };
      var _second_half_obj = {
        title: second_half_obj.name,
        value: second_half_obj.value_eu,
        suspend: second_half_obj.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: second_half_obj?.id,
        participant_name: second_half_obj?.name,
        participant_handicap: second_half_obj?.handicap,
        participant_header: second_half_obj?.header,
        game: "basketball",
        bet_type: "Live",
      };
      var _draw_obj = {
        title: draw_obj.name,
        value: draw_obj.value_eu,
        suspend: draw_obj.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: draw_obj?.id,
        participant_name: draw_obj?.name,
        participant_handicap: draw_obj?.handicap,
        participant_header: draw_obj?.header,
        game: "basketball",
        bet_type: "Live",
      };
      arr = [_first_half_obj, _second_half_obj, _draw_obj];
      base_arr.push(arr);
    }
  }
  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const halfTimeFullTime = (data: any) => {
  var current_quarter = data?.info?.period;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Half Time/Full Time (Including OT)";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var home_name = data?.team_info?.home?.name;
      var away_name = data?.team_info?.away?.name;

      var first_row_arr = [] as any;
      var second_row_arr = [] as any;
      var participants = odds.participants;
      var one_one_participant = _getParticipantsFieldRaw(participants, "1/1");
      var x_one_participant = _getParticipantsFieldRaw(participants, "X/1");
      var two_one_participant = _getParticipantsFieldRaw(participants, "2/1");

      var one_two_participant = _getParticipantsFieldRaw(participants, "1/2");
      var x_two_participant = _getParticipantsFieldRaw(participants, "X/2");
      var two_two_participant = _getParticipantsFieldRaw(participants, "2/2");

      var _one_one_obj = {
        title: home_name + "-" + home_name,
        value: one_one_participant.value_eu,
        suspend: one_one_participant.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: one_one_participant?.id,
        participant_name: one_one_participant?.name,
        participant_handicap: one_one_participant?.handicap,
        participant_header: one_one_participant?.header,
        game: "basketball",
        bet_type: "Live",
      };
      var _x_one_obj = {
        title: "Tie -" + home_name,
        value: x_one_participant.value_eu,
        suspend: x_one_participant.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: x_one_participant?.id,
        participant_name: x_one_participant?.name,
        participant_handicap: x_one_participant?.handicap,
        participant_header: x_one_participant?.header,
        game: "basketball",
        bet_type: "Live",
      };
      var _two_one_obj = {
        title: away_name + "-" + home_name,
        value: two_one_participant.value_eu,
        suspend: two_one_participant.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: two_one_participant?.id,
        participant_name: two_one_participant?.name,
        participant_handicap: two_one_participant?.handicap,
        participant_header: two_one_participant?.header,
        game: "basketball",
        bet_type: "Live",
      };

      first_row_arr = [_one_one_obj, _x_one_obj, _two_one_obj];

      var _one_two_obj = {
        title: home_name + "-" + away_name,
        value: one_two_participant.value_eu,
        suspend: one_two_participant.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: one_two_participant?.id,
        participant_name: one_two_participant?.name,
        participant_handicap: one_one_participant?.handicap,
        participant_header: one_one_participant?.header,
        game: "basketball",
        bet_type: "Live",
      };
      var _x_two_obj = {
        title: "Tie -" + away_name,
        value: x_two_participant.value_eu,
        suspend: x_two_participant.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: x_two_participant?.id,
        participant_name: x_two_participant?.name,
        participant_handicap: x_two_participant?.handicap,
        participant_header: x_two_participant?.header,
        game: "basketball",
        bet_type: "Live",
      };
      var _two_two_obj = {
        title: away_name + "-" + away_name,
        value: two_two_participant.value_eu,
        suspend: two_two_participant.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: two_two_participant?.id,
        participant_name: two_two_participant?.name,
        participant_handicap: two_two_participant?.handicap,
        participant_header: two_two_participant?.header,
        game: "basketball",
        bet_type: "Live",
      };

      second_row_arr = [_one_two_obj, _x_two_obj, _two_two_obj];

      base_arr.push(first_row_arr);
      base_arr.push(second_row_arr);
    }
  }
  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const oddEven = (data: any) => {
  var current_period = data?.info?.period;
  var current_period_int = parseInt(current_period.charAt(0));
  var half_int = 0;
  var half_string = "";
  if (current_period_int <= 2) {
    half_int = 1;
  } else {
    half_int = 2;
  }

  if (half_int == 1) {
    half_string = "1st Half";
  }
  if (half_int == 2) {
    half_string = "2nd Half";
  }
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;
  {
    var search_string = "Odd/Even";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var odd = _getParticipantsFieldRaw(participants, "Odd");
      var even = _getParticipantsFieldRaw(participants, "Even");

      const title_obj = { title: "Match", value: "", suspend: odds.suspend };
      const home_obj = {
        title: "",
        value: odd.value_eu,
        suspend: odd.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: odd?.id,
        participant_name: odd?.name,
        participant_handicap: odd?.handicap,
        participant_header: odd?.header,
        game: "basketball",
        bet_type: "Live",
      };
      const away_obj = {
        title: "",
        value: even.value_eu,
        suspend: even.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: even?.id,
        participant_name: even?.name,
        participant_handicap: even?.handicap,
        participant_header: even?.header,
        game: "basketball",
        bet_type: "Live",
      };

      const arr = [title_obj, home_obj, away_obj];
      base_arr.push(arr);
    }
  }

  {
    var search_string = "Odd/Even (" + current_period.toLowerCase() + ")";
    var odd_id = findIdByName(data, search_string);
    var current_period_odds = data?.odds?.[odd_id];

    if (current_period_odds) {
      var participants = current_period_odds.participants;
      var odd = _getParticipantsFieldRaw(participants, "Odd");
      var even = _getParticipantsFieldRaw(participants, "Even");

      const title_obj = {
        title: current_period,
        value: "",
        suspend: odds.suspend,
      };
      const home_obj = {
        title: "",
        value: odd.value_eu,
        suspend: odd.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: odd?.id,
        participant_name: odd?.name,
        participant_handicap: odd?.handicap,
        participant_header: odd?.header,
        game: "basketball",
        bet_type: "Live",
      };
      const away_obj = {
        title: "",
        value: even.value_eu,
        suspend: even.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: even?.id,
        participant_name: even?.name,
        participant_handicap: even?.handicap,
        participant_header: even?.header,
        game: "basketball",
        bet_type: "Live",
      };

      const arr = [title_obj, home_obj, away_obj];
      base_arr.push(arr);
    }
  }

  {
    var next_period = getNextQuarter(current_period);
    if (next_period != undefined) {
      var search_string = "Odd/Even (" + next_period.toLowerCase() + ")";
      var odd_id = findIdByName(data, search_string);
      var current_period_odds = data?.odds?.[odd_id];

      if (current_period_odds) {
        var participants = current_period_odds.participants;
        var odd = _getParticipantsFieldRaw(participants, "Odd");
        var even = _getParticipantsFieldRaw(participants, "Even");

        const title_obj = {
          title: current_period,
          value: "",
          suspend: odds.suspend,
        };
        const home_obj = {
          title: "",
          value: odd.value_eu,
          suspend: odd.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: odd?.id,
          participant_name: odd?.name,
          participant_handicap: odd?.handicap,
          participant_header: odd?.header,
          game: "basketball",
          bet_type: "Live",
        };
        const away_obj = {
          title: "",
          value: even.value_eu,
          suspend: even.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: even?.id,
          participant_name: even?.name,
          participant_handicap: even?.handicap,
          participant_header: even?.header,
          game: "basketball",
          bet_type: "Live",
        };

        const arr = [title_obj, home_obj, away_obj];
        base_arr.push(arr);
      }
    }
  }

  {
    var search_string = "Odd/Even (" + half_string + ")";
    var odd_id = findIdByName(data, search_string);
    var current_half_odds = data?.odds?.[odd_id];

    if (current_half_odds) {
      console.log("Here i am2 ");
      var participants = odds.participants;
      var odd = _getParticipantsFieldRaw(participants, "Odd");
      var even = _getParticipantsFieldRaw(participants, "Even");

      const title_obj = {
        title: half_string,
        value: "",
        suspend: odds.suspend,
      };
      const home_obj = {
        title: "",
        value: odd.value_eu,
        suspend: odd.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: odd?.id,
        participant_name: odd?.name,
        participant_handicap: odd?.handicap,
        participant_header: odd?.header,
        game: "basketball",
        bet_type: "Live",
      };
      const away_obj = {
        title: "",
        value: even.value_eu,
        suspend: even.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: even?.id,
        participant_name: even?.name,
        participant_handicap: even?.handicap,
        participant_header: even?.header,
        game: "basketball",
        bet_type: "Live",
      };

      const arr = [title_obj, home_obj, away_obj];
      base_arr.push(arr);
    }
  }
  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentHalfAwayTeamTotal = (data: any) => {
  var current_quarter = data?.info?.period;
  var current_period_int = parseInt(current_quarter);
  var half_int = 0;
  var half_string = "";
  if (current_period_int <= 2) {
    half_int = 1;
  } else {
    half_int = 2;
  }

  if (half_int == 1) {
    half_string = "1st Half";
  }
  if (half_int == 2) {
    half_string = "2nd Half";
  }

  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Away Team Total (" + half_string + ")";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      var length = Object.keys(group).length;
      if (length <= 1) {
        return { rows: [], suspend: "0" };
      }
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        if (group_obj["Over"] && group_obj["Under"]) {
          var _over_obj = group_obj["Over"][0];
          var _under_obj = group_obj["Under"][0];
          var title_obj = {
            title: handicap,
            value: null,
            suspend: odds.suspend,
          };
          var over_obj = {
            title: "",
            value: _over_obj.value_eu,
            suspend: _over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _over_obj?.id,
            participant_name: _over_obj?.name,
            participant_handicap: _over_obj?.handicap,
            participant_header: _over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var under_obj = {
            title: "",
            value: _under_obj.value_eu,
            suspend: _under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _under_obj?.id,
            participant_name: _under_obj?.name,
            participant_handicap: _under_obj?.handicap,
            participant_header: _under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr = [title_obj, over_obj, under_obj];
          base_arr.push(arr);
        }
      }
    }
  }

  base_arr.sort((a: any, b: any) => {
    // Convert the title (handicap) of the first object of each inner array to a number
    let handicapA = parseFloat(a[0].title);
    let handicapB = parseFloat(b[0].title);

    // Perform the comparison to determine the order
    return handicapA - handicapB;
  });

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentHalfHomeTeamTotal = (data: any) => {
  var current_quarter = data?.info?.period;
  var current_period_int = parseInt(current_quarter);

  var half_int = 0;
  var half_string = "";
  if (current_period_int <= 2) {
    half_int = 1;
  } else {
    half_int = 2;
  }

  if (half_int == 1) {
    half_string = "1st Half";
  }
  if (half_int == 2) {
    half_string = "2nd Half";
  }

  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Home Team Total (" + half_string + ")";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      console.log("odds found");
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      var length = Object.keys(group).length;
      if (length <= 1) {
        return { rows: [], suspend: "0" };
      }
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        if (group_obj["Over"] && group_obj["Under"]) {
          var _over_obj = group_obj["Over"][0];
          var _under_obj = group_obj["Under"][0];
          var title_obj = {
            title: handicap,
            value: null,
            suspend: odds.suspend,
          };
          var over_obj = {
            title: "",
            value: _over_obj.value_eu,
            suspend: _over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _over_obj?.id,
            participant_name: _over_obj?.name,
            participant_handicap: _over_obj?.handicap,
            participant_header: _over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var under_obj = {
            title: "",
            value: _under_obj.value_eu,
            suspend: _under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _under_obj?.id,
            participant_name: _under_obj?.name,
            participant_handicap: _under_obj?.handicap,
            participant_header: _under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr = [title_obj, over_obj, under_obj];
          base_arr.push(arr);
        }
      }
    }
  }

  base_arr.sort((a: any, b: any) => {
    // Convert the title (handicap) of the first object of each inner array to a number
    let handicapA = parseFloat(a[0].title);
    let handicapB = parseFloat(b[0].title);

    // Perform the comparison to determine the order
    return handicapA - handicapB;
  });

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentHalfAwayTeamTotal2 = (data: any) => {
  var current_quarter = data?.info?.period;
  var current_period_int = parseInt(current_quarter);
  var half_int = 0;
  var half_string = "";
  if (current_period_int <= 2) {
    half_int = 1;
  } else {
    half_int = 2;
  }

  if (half_int == 1) {
    half_string = "1st Half";
  }
  if (half_int == 2) {
    half_string = "2nd Half";
  }

  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = half_string + "Away Totals";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      var length = Object.keys(group).length;
      if (length <= 1) {
        return { rows: [], suspend: "0" };
      }
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        if (group_obj["Over"] && group_obj["Under"]) {
          var _over_obj = group_obj["Over"][0];
          var _under_obj = group_obj["Under"][0];
          var title_obj = {
            title: handicap,
            value: null,
            suspend: odds.suspend,
          };
          var over_obj = {
            title: "",
            value: _over_obj.value_eu,
            suspend: _over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _over_obj?.id,
            participant_name: _over_obj?.name,
            participant_handicap: _over_obj?.handicap,
            participant_header: _over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var under_obj = {
            title: "",
            value: _under_obj.value_eu,
            suspend: _under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _under_obj?.id,
            participant_name: _under_obj?.name,
            participant_handicap: _under_obj?.handicap,
            participant_header: _under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr = [title_obj, over_obj, under_obj];
          base_arr.push(arr);
        }
      }
    }
  }

  base_arr.sort((a: any, b: any) => {
    // Convert the title (handicap) of the first object of each inner array to a number
    let handicapA = parseFloat(a[0].title);
    let handicapB = parseFloat(b[0].title);

    // Perform the comparison to determine the order
    return handicapA - handicapB;
  });

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentHalfHomeTeamTotal2 = (data: any) => {
  var current_quarter = data?.info?.period;
  var current_period_int = parseInt(current_quarter);
  var half_int = 0;
  var half_string = "";
  if (current_period_int <= 2) {
    half_int = 1;
  } else {
    half_int = 2;
  }

  if (half_int == 1) {
    half_string = "1st Half";
  }
  if (half_int == 2) {
    half_string = "2nd Half";
  }

  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = half_string + "Home Totals";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      var length = Object.keys(group).length;
      if (length <= 1) {
        return { rows: [], suspend: "0" };
      }
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        if (group_obj["Over"] && group_obj["Under"]) {
          var _over_obj = group_obj["Over"][0];
          var _under_obj = group_obj["Under"][0];
          var title_obj = {
            title: handicap,
            value: null,
            suspend: odds.suspend,
          };
          var over_obj = {
            title: "",
            value: _over_obj.value_eu,
            suspend: _over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _over_obj?.id,
            participant_name: _over_obj?.name,
            participant_handicap: _over_obj?.handicap,
            participant_header: _over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var under_obj = {
            title: "",
            value: _under_obj.value_eu,
            suspend: _under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _under_obj?.id,
            participant_name: _under_obj?.name,
            participant_handicap: _under_obj?.handicap,
            participant_header: _under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr = [title_obj, over_obj, under_obj];
          base_arr.push(arr);
        }
      }
    }
  }

  base_arr.sort((a: any, b: any) => {
    // Convert the title (handicap) of the first object of each inner array to a number
    let handicapA = parseFloat(a[0].title);
    let handicapB = parseFloat(b[0].title);

    // Perform the comparison to determine the order
    return handicapA - handicapB;
  });

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentHalfTotals = (data: any) => {
  var current_quarter = data?.info?.period;
  var current_period_int = parseInt(current_quarter);
  var half_int = 0;
  var half_string = "";
  if (current_period_int <= 2) {
    half_int = 1;
  } else {
    half_int = 2;
  }

  if (half_int == 1) {
    half_string = "1st Half";
  }
  if (half_int == 2) {
    half_string = "2nd Half";
  }

  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = half_string + " Total";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      var length = Object.keys(group).length;
      if (length <= 1) {
        return { rows: [], suspend: "0" };
      }
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        if (group_obj["Over"] && group_obj["Under"]) {
          var _over_obj = group_obj["Over"][0];
          var _under_obj = group_obj["Under"][0];
          var title_obj = {
            title: handicap,
            value: null,
            suspend: odds.suspend,
          };
          var over_obj = {
            title: "",
            value: _over_obj.value_eu,
            suspend: _over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _over_obj?.id,
            participant_name: _over_obj?.name,
            participant_handicap: _over_obj?.handicap,
            participant_header: _over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var under_obj = {
            title: "",
            value: _under_obj.value_eu,
            suspend: _under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _under_obj?.id,
            participant_name: _under_obj?.name,
            participant_handicap: _under_obj?.handicap,
            participant_header: _under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr = [title_obj, over_obj, under_obj];
          base_arr.push(arr);
        }
      }
    }
  }

  base_arr.sort((a: any, b: any) => {
    // Convert the title (handicap) of the first object of each inner array to a number
    let handicapA = parseFloat(a[0].title);
    let handicapB = parseFloat(b[0].title);

    // Perform the comparison to determine the order
    return handicapA - handicapB;
  });
  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentQuarterAwayTeamTotal = (data: any) => {
  var current_quarter = data?.info?.period;
  var current_period_int = parseInt(current_quarter);
  var half_int = 0;
  var half_string = "";
  if (current_period_int <= 2) {
    half_int = 1;
  } else {
    half_int = 2;
  }

  if (half_int == 1) {
    half_string = "1st Half";
  }
  if (half_int == 2) {
    half_string = "2nd Half";
  }

  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Away Team Total (" + current_quarter + ")";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      var length = Object.keys(group).length;
      if (length <= 1) {
        return { rows: [], suspend: "0" };
      }
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        if (group_obj["Over"] && group_obj["Under"]) {
          var _over_obj = group_obj["Over"][0];
          var _under_obj = group_obj["Under"][0];
          var title_obj = {
            title: handicap,
            value: null,
            suspend: odds.suspend,
          };
          var over_obj = {
            title: "",
            value: _over_obj.value_eu,
            suspend: _over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _over_obj?.id,
            participant_name: _over_obj?.name,
            participant_handicap: _over_obj?.handicap,
            participant_header: _over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var under_obj = {
            title: "",
            value: _under_obj.value_eu,
            suspend: _under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _under_obj?.id,
            participant_name: _under_obj?.name,
            participant_handicap: _under_obj?.handicap,
            participant_header: _under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr = [title_obj, over_obj, under_obj];
          base_arr.push(arr);
        }
      }
    }
  }

  base_arr.sort((a: any, b: any) => {
    // Convert the title (handicap) of the first object of each inner array to a number
    let handicapA = parseFloat(a[0].title);
    let handicapB = parseFloat(b[0].title);

    // Perform the comparison to determine the order
    return handicapA - handicapB;
  });

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentQuarterHomeTeamTotal = (data: any) => {
  var current_quarter = data?.info?.period;
  var current_period_int = parseInt(current_quarter);

  var half_int = 0;
  var half_string = "";
  if (current_period_int <= 2) {
    half_int = 1;
  } else {
    half_int = 2;
  }

  if (half_int == 1) {
    half_string = "1st Half";
  }
  if (half_int == 2) {
    half_string = "2nd Half";
  }

  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Home Team Total (" + current_quarter + ")";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      console.log("odds found");
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      var length = Object.keys(group).length;
      if (length <= 1) {
        return { rows: [], suspend: "0" };
      }
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        if (group_obj["Over"] && group_obj["Under"]) {
          var _over_obj = group_obj["Over"][0];
          var _under_obj = group_obj["Under"][0];
          var title_obj = {
            title: handicap,
            value: null,
            suspend: odds.suspend,
          };
          var over_obj = {
            title: "",
            value: _over_obj.value_eu,
            suspend: _over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _over_obj?.id,
            participant_name: _over_obj?.name,
            participant_handicap: _over_obj?.handicap,
            participant_header: _over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var under_obj = {
            title: "",
            value: _under_obj.value_eu,
            suspend: _under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _under_obj?.id,
            participant_name: _under_obj?.name,
            participant_handicap: _under_obj?.handicap,
            participant_header: _under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr = [title_obj, over_obj, under_obj];
          base_arr.push(arr);
        }
      }
    }
  }

  base_arr.sort((a: any, b: any) => {
    // Convert the title (handicap) of the first object of each inner array to a number
    let handicapA = parseFloat(a[0].title);
    let handicapB = parseFloat(b[0].title);

    // Perform the comparison to determine the order
    return handicapA - handicapB;
  });

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

// Function to group participants by name
function groupParticipantsByPropertyName(
  home_participants: any,
  away_participants: any,
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

export const winningMargin = (data: any) => {
  var current_quarter = data?.info?.period;
  var home_participants = null;
  var away_participants = null;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Home Winning Margin (14-Way)";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      home_participants = participants;
    }
  }

  {
    var search_string = "Away Winning Margin (14-Way)";
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
      away_participants,
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

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: home_participant?.id,
        participant_name: home_participant?.name,
        participant_handicap: home_participant?.handicap,
        participant_header: home_participant?.header,
        game: "basketball",
        bet_type: "Live",
      };
      var away_obj = {
        title: "",
        value: away_participant.value_eu,
        suspend: away_participant.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: away_participant?.id,
        participant_name: away_participant?.name,
        participant_handicap: away_participant?.handicap,
        participant_header: away_participant?.header,
        game: "basketball",
        bet_type: "Live",
      };
      var arr = [title_obj, home_obj, away_obj];
      base_arr.push(arr);
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };

  // var suspend_value = areAllSuspended(base_arr);
  // return {rows:base_arr, suspend:suspend_value}
};

export const currentHalfWinningMargin = (data: any) => {
  var current_period = data?.info?.period;
  var current_period_int = parseInt(current_period.charAt(0));
  var half_int = 0;
  var half_string = "";
  if (current_period_int <= 2) {
    half_int = 1;
  } else {
    half_int = 2;
  }

  if (half_int == 1) {
    half_string = "1st Half";
  }
  if (half_int == 2) {
    half_string = "2nd Half";
  }
  var home_participants = null;
  var away_participants = null;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Home Winning Margin (" + half_string + ")";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      home_participants = participants;
    }
  }

  {
    var search_string = "Away Winning Margin (" + half_string + ")";
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
      away_participants,
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

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: home_participant?.id,
        participant_name: home_participant?.name,
        participant_handicap: home_participant?.handicap,
        participant_header: home_participant?.header,
        game: "basketball",
        bet_type: "Live",
      };
      var away_obj = {
        title: "",
        value: away_participant.value_eu,
        suspend: away_participant.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: away_participant?.id,
        participant_name: away_participant?.name,
        participant_handicap: away_participant?.handicap,
        participant_header: away_participant?.header,
        game: "basketball",
        bet_type: "Live",
      };
      var arr = [title_obj, home_obj, away_obj];
      base_arr.push(arr);
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentQuarterWinningMargin = (data: any) => {
  var current_period = data?.info?.period;
  var current_period_int = parseInt(current_period.charAt(0));
  var half_int = 0;
  var half_string = "";
  if (current_period_int <= 2) {
    half_int = 1;
  } else {
    half_int = 2;
  }

  if (half_int == 1) {
    half_string = "1st Half";
  }
  if (half_int == 2) {
    half_string = "2nd Half";
  }
  var home_participants = null;
  var away_participants = null;
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Home Winning Margin (" + current_period + ")";
    var odd_id = findIdByName(data, search_string);
    console.log("hln", search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      home_participants = participants;
    }
  }

  {
    var search_string = "Away Winning Margin (" + current_period + ")";
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
      away_participants,
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

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: home_participant?.id,
        participant_name: home_participant?.name,
        participant_handicap: home_participant?.handicap,
        participant_header: home_participant?.header,
        game: "basketball",
        bet_type: "Live",
      };
      var away_obj = {
        title: "",
        value: away_participant.value_eu,
        suspend: away_participant.suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: odd_id,
        odd_name: data?.odds?.[odd_id]?.name,
        participant_id: away_participant?.id,
        participant_name: away_participant?.name,
        participant_handicap: away_participant?.handicap,
        participant_header: away_participant?.header,
        game: "basketball",
        bet_type: "Live",
      };
      var arr = [title_obj, home_obj, away_obj];
      base_arr.push(arr);
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const totalBand = (data: any) => {
  var current_quarter = data?.info?.period;
  var next_quarter = getNextQuarter(current_quarter);
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Total Band";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;

      var arr = [];
      for (var participant_id in participants) {
        var participant_obj = participants[participant_id];

        var _title_participant_obj = {
          title: participant_obj.name,
          value: "",
          suspend: participant_obj.suspend,
        };
        var _participant_obj = {
          title: "",
          value: participant_obj.value_eu,
          suspend: participant_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: participant_obj?.id,
          participant_name: participant_obj?.name,
          participant_handicap: participant_obj?.handicap,
          participant_header: participant_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        arr.push(_title_participant_obj, _participant_obj);
        if (arr.length == 4) {
          base_arr.push(arr);
          arr = [];
        }
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentHalfDoubleChance = (data: any) => {
  var current_period = data?.info?.period;
  var current_period_int = parseInt(current_period.charAt(0));
  var half_int = 0;
  var half_string = "";
  if (current_period_int <= 2) {
    half_int = 1;
  } else {
    half_int = 2;
  }

  if (half_int == 1) {
    half_string = "1st Half";
  }
  if (half_int == 2) {
    half_string = "2nd Half";
  }
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = half_string + " Double Chance";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;

      var home_name = data?.team_info?.home?.name;
      var away_name = data?.team_info?.away?.name;

      var home_or_draw = _getParticipantsFieldRaw(participants, "1X");
      var draw_or_away = _getParticipantsFieldRaw(participants, "X2");
      var home_or_away = _getParticipantsFieldRaw(participants, "12");

      if (home_or_draw && draw_or_away && home_or_away) {
        var _home_or_draw_participant_obj = {
          title: home_name + " or Draw",
          value: home_or_draw.value_eu,
          suspend: home_or_draw.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: home_or_draw?.id,
          participant_name: home_or_draw?.name,
          participant_handicap: home_or_draw?.handicap,
          participant_header: home_or_draw?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var _draw_or_away_participant_obj = {
          title: "Draw or " + away_name,
          value: draw_or_away.value_eu,
          suspend: draw_or_away.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: draw_or_away?.id,
          participant_name: draw_or_away?.name,
          participant_handicap: draw_or_away?.handicap,
          participant_header: draw_or_away?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var _home_or_away_participant_obj = {
          title: home_name + " or " + away_name,
          value: home_or_away.value_eu,
          suspend: home_or_away.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: home_or_away?.id,
          participant_name: home_or_away?.name,
          participant_handicap: home_or_away?.handicap,
          participant_header: home_or_away?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var arr1 = [_home_or_draw_participant_obj];
        var arr2 = [_draw_or_away_participant_obj];
        var arr3 = [_home_or_away_participant_obj];
        base_arr.push(arr1);
        base_arr.push(arr2);
        base_arr.push(arr3);
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const doubleResult = (data: any) => {
  var current_period = data?.info?.period;
  var current_period_int = parseInt(current_period.charAt(0));
  var half_int = 0;
  var half_string = "";
  if (current_period_int <= 2) {
    half_int = 1;
  } else {
    half_int = 2;
  }

  if (half_int == 1) {
    half_string = "1st Half";
  }
  if (half_int == 2) {
    half_string = "2nd Half";
  }
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Half Time/Full Time (Including OT)";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;

      var home_name = data?.team_info?.home?.name;
      var away_name = data?.team_info?.away?.name;

      var one_and_one = _getParticipantsFieldRaw(participants, "1/1");
      var x_and_one = _getParticipantsFieldRaw(participants, "X/1");
      var two_and_one = _getParticipantsFieldRaw(participants, "2/1");
      var one_and_two = _getParticipantsFieldRaw(participants, "1/2");
      var x_and_two = _getParticipantsFieldRaw(participants, "X/2");
      var two_and_two = _getParticipantsFieldRaw(participants, "2/2");

      if (
        one_and_one &&
        x_and_one &&
        two_and_one &&
        one_and_two &&
        x_and_two &&
        two_and_two
      ) {
        var _one_and_one_participant_obj = {
          title: home_name + " - " + home_name,
          value: one_and_one.value_eu,
          suspend: one_and_one.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: one_and_one?.id,
          participant_name: one_and_one?.name,
          participant_handicap: one_and_one?.handicap,
          participant_header: one_and_one?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var _x_and_one_participant_obj = {
          title: "Tie - " + home_name,
          value: x_and_one.value_eu,
          suspend: x_and_one.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: x_and_one?.id,
          participant_name: x_and_one?.name,
          participant_handicap: x_and_one?.handicap,
          participant_header: x_and_one?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var _two_and_one_participant_obj = {
          title: away_name + " - " + home_name,
          value: two_and_one.value_eu,
          suspend: two_and_one.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: two_and_one?.id,
          participant_name: two_and_one?.name,
          participant_handicap: two_and_one?.handicap,
          participant_header: two_and_one?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var _one_and_two_participant_obj = {
          title: home_name + " - " + away_name,
          value: one_and_two.value_eu,
          suspend: one_and_two.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: one_and_two?.id,
          participant_name: one_and_two?.name,
          participant_handicap: one_and_two?.handicap,
          participant_header: one_and_two?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var _x_and_two_participant_obj = {
          title: "Tie - " + away_name,
          value: x_and_two.value_eu,
          suspend: x_and_two.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: x_and_two?.id,
          participant_name: x_and_two?.name,
          participant_handicap: x_and_two?.handicap,
          participant_header: x_and_two?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var _two_and_two_participant_obj = {
          title: away_name + " - " + away_name,
          value: two_and_two.value_eu,
          suspend: two_and_two.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: two_and_two?.id,
          participant_name: two_and_two?.name,
          participant_handicap: two_and_two?.handicap,
          participant_header: two_and_two?.header,
          game: "basketball",
          bet_type: "Live",
        };
        var arr1 = [_one_and_one_participant_obj];
        var arr2 = [_x_and_one_participant_obj];
        var arr3 = [_two_and_one_participant_obj];
        var arr4 = [_one_and_two_participant_obj];
        var arr5 = [_x_and_two_participant_obj];
        var arr6 = [_two_and_two_participant_obj];
        base_arr.push(arr1);
        base_arr.push(arr2);
        base_arr.push(arr3);
        base_arr.push(arr4);
        base_arr.push(arr5);
        base_arr.push(arr6);
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const totalBand3Way = (data: any) => {
  var current_period = data?.info?.period;
  var current_period_int = parseInt(current_period.charAt(0));
  var half_int = 0;
  var half_string = "";
  if (current_period_int <= 2) {
    half_int = 1;
  } else {
    half_int = 2;
  }

  if (half_int == 1) {
    half_string = "1st Half";
  }
  if (half_int == 2) {
    half_string = "2nd Half";
  }
  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = "Total Band 3-Way";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      for (var participant_id in participants) {
        var arr = [] as any;
        var participant_obj = participants[participant_id];
        var _obj = {
          title: participant_obj.name,
          value: participant_obj.value_eu,
          suspend: participant_obj.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: odd_id,
          odd_name: data?.odds?.[odd_id]?.name,
          participant_id: participant_obj?.id,
          participant_name: participant_obj?.name,
          participant_handicap: participant_obj?.handicap,
          participant_header: participant_obj?.header,
          game: "basketball",
          bet_type: "Live",
        };
        arr = [_obj];
        base_arr.push(arr);
      }
    }
  }

  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const currentQuarterTotals = (data: any) => {
  var current_quarter = data?.info?.period;
  var current_period_int = parseInt(current_quarter);
  var half_int = 0;
  var half_string = "";
  if (current_period_int <= 2) {
    half_int = 1;
  } else {
    half_int = 2;
  }

  if (half_int == 1) {
    half_string = "1st Half";
  }
  if (half_int == 2) {
    half_string = "2nd Half";
  }

  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = current_quarter + " Lines Total";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      var length = Object.keys(group).length;
      if (length <= 1) {
        return { rows: [], suspend: "0" };
      }
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        if (group_obj["Over"] && group_obj["Under"]) {
          var _over_obj = group_obj["Over"][0];
          var _under_obj = group_obj["Under"][0];
          var title_obj = {
            title: handicap,
            value: null,
            suspend: odds.suspend,
          };
          var over_obj = {
            title: "",
            value: _over_obj.value_eu,
            suspend: _over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _over_obj?.id,
            participant_name: _over_obj?.name,
            participant_handicap: _over_obj?.handicap,
            participant_header: _over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var under_obj = {
            title: "",
            value: _under_obj.value_eu,
            suspend: _under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _under_obj?.id,
            participant_name: _under_obj?.name,
            participant_handicap: _under_obj?.handicap,
            participant_header: _under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr = [title_obj, over_obj, under_obj];
          base_arr.push(arr);
        }
      }
    }
  }

  base_arr.sort((a: any, b: any) => {
    // Convert the title (handicap) of the first object of each inner array to a number
    let handicapA = parseFloat(a[0].title);
    let handicapB = parseFloat(b[0].title);

    // Perform the comparison to determine the order
    return handicapA - handicapB;
  });
  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};

export const nextQuarterTotals = (data: any) => {
  var current_quarter = data?.info?.period;
  var next_quarter = getNextQuarter(current_quarter);
  var current_period_int = parseInt(current_quarter);
  var half_int = 0;
  var half_string = "";
  if (current_period_int <= 2) {
    half_int = 1;
  } else {
    half_int = 2;
  }

  if (half_int == 1) {
    half_string = "1st Half";
  }
  if (half_int == 2) {
    half_string = "2nd Half";
  }

  if (next_quarter === undefined) {
    return { rows: [], suspend: "0" };
  }

  if (!data && !data.odds) {
    return { rows: [], suspend: "0" };
  }

  const base_arr = [] as any;

  {
    var search_string = next_quarter + " Lines Total";
    var odd_id = findIdByName(data, search_string);
    var odds = data?.odds?.[odd_id];

    if (odds) {
      var participants = odds.participants;
      var group = groupParticipantsByHandicapAndName(participants);
      var length = Object.keys(group).length;
      if (length <= 1) {
        return { rows: [], suspend: "0" };
      }
      for (var handicap in group) {
        var group_obj = group[handicap];
        var arr = [] as any;

        if (group_obj["Over"] && group_obj["Under"]) {
          var _over_obj = group_obj["Over"][0];
          var _under_obj = group_obj["Under"][0];
          var title_obj = {
            title: handicap,
            value: null,
            suspend: odds.suspend,
          };
          var over_obj = {
            title: "",
            value: _over_obj.value_eu,
            suspend: _over_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _over_obj?.id,
            participant_name: _over_obj?.name,
            participant_handicap: _over_obj?.handicap,
            participant_header: _over_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          var under_obj = {
            title: "",
            value: _under_obj.value_eu,
            suspend: _under_obj.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: _under_obj?.id,
            participant_name: _under_obj?.name,
            participant_handicap: _under_obj?.handicap,
            participant_header: _under_obj?.header,
            game: "basketball",
            bet_type: "Live",
          };
          arr = [title_obj, over_obj, under_obj];
          base_arr.push(arr);
        }
      }
    }
  }

  base_arr.sort((a: any, b: any) => {
    // Convert the title (handicap) of the first object of each inner array to a number
    let handicapA = parseFloat(a[0].title);
    let handicapB = parseFloat(b[0].title);

    // Perform the comparison to determine the order
    return handicapA - handicapB;
  });
  var suspend_value = areAllSuspended(base_arr);
  return { rows: base_arr, suspend: suspend_value };
};
