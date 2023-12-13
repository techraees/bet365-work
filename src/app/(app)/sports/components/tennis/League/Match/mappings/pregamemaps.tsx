"use client";
import React from "react";

export const toWinMatch = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  const match = data?.odds?.filter((item: any) => item.id === "2");
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    console.log({ haha: match[0] });
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      fmatchWrap.map((fmatchItem: any, index: any) => {
        let title = fmatchItem.name;
        if (title === "Home") {
          title = data?.player_1?.name;
        } else if (title === "Away") {
          title = data?.player_2?.name;
        }
        arr.push({
          title: title,
          value: fmatchItem.value,
          suspend: fmatchItem.stop === "False" ? "0" : "1",

          event_id: data?.id,
          event_name: data?.player_1?.name + " vs " + data?.player_2?.name,
          odd_id: match[0].id,
          odd_name: match[0].value,
          participant_id: index,
          participant_name: title,
        });
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const matchHandicapGames = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  const match = data?.odds?.filter((item: any) => item.id === "22631");
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      fmatchWrap.map((fmatchItem: any) => {
        let title = fmatchItem.name;
        if (fmatchItem.ismain === "True") {
          fmatchItem?.odds.map((fod: any, index: any) => {
            if (arr.length >= 2) {
              return;
            }
            arr.push({
              title: title,
              value: fod.value,
              suspend: fod.stop === "False" ? "0" : "1",

              event_id: data?.id,
              event_name: data?.player_1?.name + " vs " + data?.player_2?.name,
              odd_id: match[0].id,
              odd_name: match[0].value,
              participant_id: index,
              participant_name:
                index === 0 ? data?.player_1?.name : data?.player_2?.name,
              participant_handicap: fmatchItem.name,
            });
          });
        }
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const totalGames2Way = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  const match = data?.odds?.filter((item: any) => item.id === "22624");
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      fmatchWrap.map((fmatchItem: any) => {
        let title = fmatchItem.name;
        if (fmatchItem.ismain === "True") {
          arr.push({ title: title, value: "", suspend: "0" });
          fmatchItem?.odds.map((fod: any, index: any) => {
            if (arr.length >= 3) {
              return;
            }
            arr.push({
              title: "",
              value: fod.value,
              suspend: fod.stop === "False" ? "0" : "1",

              event_id: data?.id,
              event_name: data?.player_1?.name + " vs " + data?.player_2?.name,
              odd_id: match[0].id,
              odd_name: match[0].value,
              participant_id: index,
              participant_name: fmatchItem.value,
              participant_handicap: fod.name + " " + fmatchItem.name,
            });
          });
        }
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const setBetting = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  const match = data?.odds?.filter((item: any) => item.id === "22632");
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      fmatchWrap.map((fod: any, index: number) => {
        if (index >= fmatchWrap.length / 2) {
          return;
        }
        const arr = [] as any;
        arr.push({
          title: fod.name.replace(":", "-"),
          value: "",
          suspend: fod.stop === "False" ? "0" : "1",
        });
        arr.push({
          title: "",
          value: fod.value,
          suspend: fod.stop === "False" ? "0" : "1",

          event_id: data?.id,
          event_name: data?.player_1?.name + " vs " + data?.player_2?.name,
          odd_id: match[0].id,
          odd_name: match[0].value,
          participant_id: index,
          participant_name:
            index === 0 ? data?.player_1?.name : data?.player_2?.name,
          participant_handicap: fod.name,
        });
        const arw = fod.name.split(":");
        const tofind = arw[1] + ":" + arw[0];
        const nextItem = fmatchWrap.find((fi: any) => fi.name === tofind);
        arr.push({
          title: "",
          value: nextItem?.value,
          suspend: nextItem?.stop === "False" ? "0" : "1",

          event_id: data?.id,
          event_name: data?.player_1?.name + " vs " + data?.player_2?.name,
          odd_id: match[0].id,
          odd_name: match[0].value,
          participant_id: index,
          participant_name:
            index === 0 ? data?.player_1?.name : data?.player_2?.name,
          participant_handicap: fod.name,
        });
        tosend.push(arr);
      });
    }
  }

  return tosend;
};

export const firstSetWinner = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  const match = data?.odds?.filter((item: any) => item.id === "22628");
  console.log({ match });
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      fmatchWrap.map((fmatchItem: any, index: any) => {
        let title = fmatchItem.name;
        if (title === "Home") {
          title = data?.player_1?.name;
        } else if (title === "Away") {
          title = data?.player_2?.name;
        }
        arr.push({
          title: title,
          value: fmatchItem.value,
          suspend: fmatchItem.stop === "False" ? "0" : "1",

          event_id: data?.id,
          event_name: data?.player_1?.name + " vs " + data?.player_2?.name,
          odd_id: match[0].id,
          odd_name: match[0].value,
          participant_id: index,
          participant_name: title,
        });
      });
      tosend.push(arr);
    }
  }
  return tosend;
};
export const firstSetTotalGames = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  const match = data?.odds?.filter((item: any) => item.id === "22627");
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      fmatchWrap.map((fmatchItem: any) => {
        const arr = [] as any;
        let title = fmatchItem.name;

        arr.push({ title: title, value: "", suspend: "0" });
        fmatchItem?.odds.map((fod: any, index: any) => {
          if (arr.length >= 3) {
            return;
          }
          arr.push({
            title: "",
            value: fod.value,
            suspend: fod.stop === "False" ? "0" : "1",

            event_id: data?.id,
            event_name: data?.player_1?.name + " vs " + data?.player_2?.name,
            odd_id: match[0].id,
            odd_name: match[0].value,
            participant_id: index,
            participant_name:
              index === 0 ? data?.player_1?.name : data?.player_2?.name,
            participant_handicap: fod.name + " " + fmatchItem.name,
          });
        });

        tosend.push(arr);
      });
      tosend.sort((a: any, b: any) => a[0].title - b[0].title);
    }
  }

  return tosend;
};

export const firstSetScore = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  const match = data?.odds?.filter((item: any) => item.id === "181");
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      fmatchWrap.map((fod: any, index: number) => {
        let flag = false;
        tosend?.map((item: any) => {
          const wer = fod.name.split(":");
          const already = wer[1] + "-" + wer[0];
          if (item[0].title === already) {
            flag = true;
          }
        });
        if (flag) {
          return;
        }
        const arr = [] as any;
        arr.push({
          title: fod.name.replace(":", "-"),
          value: "",
          suspend: fod.stop === "False" ? "0" : "1",
        });

        arr.push({
          title: "",
          value: fod.value,
          suspend: fod.stop === "False" ? "0" : "1",

          event_id: data?.id,
          event_name: data?.player_1?.name + " vs " + data?.player_2?.name,
          odd_id: match[0].id,
          odd_name: match[0].value,
          participant_id: index,
          participant_name: data?.player_1?.name,
          participant_handicap: fod.name.replace(":", "-"),
        });
        const arw = fod.name.split(":");
        const tofind = arw[1] + ":" + arw[0];
        const nextItem = fmatchWrap.find((fi: any) => fi.name === tofind);
        arr.push({
          title: "",
          value: nextItem?.value,
          suspend: nextItem?.stop === "False" ? "0" : "1",

          event_id: data?.id,
          event_name: data?.player_1?.name + " vs " + data?.player_2?.name,
          odd_id: match[0].id,
          odd_name: match[0].value,
          participant_id: index,
          participant_name: data?.player_2?.name,
          participant_handicap: fod.name.replace(":", "-"),
        });
        tosend.push(arr);
      });
    }
  }

  return tosend;
};
export const matchResultAndTotalGames = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  const match = data?.odds?.filter((item: any) => item.id === "22621");
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      fmatchWrap.map((fmatchItem: any) => {
        const arr = [] as any;
        let title = fmatchItem.name;

        fmatchItem?.odds.map((fod: any, index: any) => {
          if (arr.length == 0) {
            if (fod.name.startsWith("Home")) {
              arr.push({
                title: data?.player_1?.name,
                value: "",
                suspend: "0",
              });
            } else if (fod.name.startsWith("Away")) {
              arr.push({
                title: data?.player_2?.name,
                value: "",
                suspend: "0",
              });
            }
          }
          if (arr.length >= 3) {
            return;
          }
          var participant_name_to_show = fod.name.startsWith("Home")
            ? fod.name.replace("Home", data?.player_1?.name)
            : fod.name;
          participant_name_to_show = participant_name_to_show.startsWith("Away")
            ? fod.name.replace("Away", data?.player_2?.name)
            : participant_name_to_show;
          // participant_name_to_show = participant_name_to_show.name.contains("Away") ? fod.name.replace("Away", data?.player_1?.name) : fod.name;
          participant_name_to_show = participant_name_to_show.replace(
            "/",
            " and "
          );
          arr.push({
            title: title,
            value: fod.value,
            suspend: fod.stop === "False" ? "0" : "1",

            event_id: data?.id,
            event_name: data?.player_1?.name + " vs " + data?.player_2?.name,
            odd_id: match[0].id,
            odd_name: match[0].value,
            participant_id: index,
            participant_name: participant_name_to_show,
            participant_handicap: fod.value,
          });
        });

        tosend.push(arr);
      });
      tosend.sort((a: any, b: any) => a[0].title - b[0].title);
    }
  }

  return tosend;
};

export const homeAwayTo = (data: any, main: any, team: any) => {
  if (!data && !data.odds) {
    return [];
  }
  console.log({ dddd: data });
  const tosend = [] as any;
  let winaset = null as any;
  let winfrombehind = null as any;
  let winfromstraight = null as any;
  if (team === "home") {
    winaset = "22853";
    winfrombehind = "23260";
    winfromstraight = "23258";
    main.marketname = main.marketname.replace(
      "undefined",
      data?.player_1?.name
    );
    main.marketname = main.marketname.replace("Home", data?.player_1?.name);
  } else if (team === "away") {
    winaset = "22854";
    winfrombehind = "23261";
    winfromstraight = "23259";
    main.marketname = main.marketname.replace(
      "undefined",
      data?.player_2?.name
    );
    main.marketname = main.marketname.replace("Away", data?.player_1?.name);
  }
  let match = data?.odds?.filter((item: any) => item.id === winaset);
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      arr.push({ title: "Win a Set", value: "", suspend: "0" });
      fmatchWrap.map((fmatchItem: any, index: any) => {
        arr.push({
          title: "",
          value: fmatchItem.value,
          suspend: fmatchItem.stop === "False" ? "0" : "1",

          event_id: data?.id,
          event_name: data?.player_1?.name + " vs " + data?.player_2?.name,
          odd_id: match[0].id,
          odd_name: match[0].value,
          participant_id: index,
          participant_name: data?.player_1?.name,
          participant_handicap: fmatchItem.value,
        });
      });
      tosend.push(arr);
    }
  }
  match = data?.odds?.filter((item: any) => item.id === winfrombehind);
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      arr.push({ title: "Win From Behind", value: "", suspend: "0" });
      fmatchWrap.map((fmatchItem: any, index: any) => {
        arr.push({
          title: "",
          value: fmatchItem.value,
          suspend: fmatchItem.stop === "False" ? "0" : "1",

          event_id: data?.id,
          event_name: data?.player_1?.name + " vs " + data?.player_2?.name,
          odd_id: match[0].id,
          odd_name: match[0].value,
          participant_id: index,
          participant_name: data?.player_2?.name,
          participant_handicap: fmatchItem.name,
        });
      });
      tosend.push(arr);
    }
  }
  match = data?.odds?.filter((item: any) => item.id === winfromstraight);
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      arr.push({ title: "Win in Straight Sets", value: "", suspend: "0" });
      fmatchWrap.map((fmatchItem: any, index: any) => {
        arr.push({
          title: "",
          value: fmatchItem.value,
          suspend: fmatchItem.stop === "False" ? "0" : "1",

          event_id: data?.id,
          event_name: data?.player_1?.name + " vs " + data?.player_2?.name,
          odd_id: match[0].id,
          odd_name: match[0].value,
          participant_id: index,
          participant_name: data?.player_1?.name,
          participant_handicap: fmatchItem.name,
        });
      });
      tosend.push(arr);
    }
  }
  main.rows = tosend;
  return main;
};
export const totalBreaksOfServe = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;

  let match = data?.odds?.filter((item: any) => item.id === "23263");
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      arr.push({ title: "Match", value: "", suspend: "0" });
      fmatchWrap.map((fmatchItem: any) => {
        arr.push({
          title: "",
          value: fmatchItem.value,
          suspend: fmatchItem.stop === "False" ? "0" : "1",
        });
      });
      tosend.push(arr);
    }
  }
  return tosend;
};
export const doubleResult = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let tosend = [] as any;

  let match = data?.odds?.filter((item: any) => item.id === "22647");
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      fmatchWrap.map((fmatchItem: any) => {
        let title = "";
        if (fmatchItem.name === "1/1") {
          title = `${data?.player_1?.name} to win 1st set and WIN match`;
        } else if (fmatchItem.name === "1/2") {
          title = `${data?.player_1?.name} to win 1st set and LOSE match`;
        } else if (fmatchItem.name === "2/1") {
          title = `${data?.player_2?.name} to win 1st set and LOSE match`;
        } else if (fmatchItem.name === "2/2") {
          title = `${data?.player_2?.name} to win 1st set and WIN match`;
        }
        arr.push({
          title: title,
          value: fmatchItem.value,
          suspend: fmatchItem.stop === "False" ? "0" : "1",
        });
      });

      tosend = [[...arr.slice(0, 2)], [...arr.slice(2, 4)]];
    }
  }
  return tosend;
};

export const totalGamesInSet = (data: any, oddData: any) => {
  if (!data && !data.odds) {
    return oddData;
  }
  let tosend = [] as any;
  const match = data?.odds?.filter((item: any) => item.id === "22627");
  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      fmatchWrap.map((fmatchItem: any) => {
        const arr = [] as any;
        let title = fmatchItem.name;

        arr.push({ title: title + " Games", value: "", suspend: "0" });
        fmatchItem?.odds.map((fod: any) => {
          if (arr.length >= 3) {
            return;
          }
          arr.push({
            title: "",
            value: fod.value,
            suspend: fod.stop === "False" ? "0" : "1",
          });
        });

        tosend.push(arr);
      });
      tosend.sort((a: any, b: any) => a[0].title - b[0].title);
    }
  }
  oddData["Set 1"] = tosend;
  return oddData;
};
