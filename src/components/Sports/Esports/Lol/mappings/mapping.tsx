"use client";
import React from "react";

//game lines
export const gameLines = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  // title = data?.team_info?.home?.name
  const header = ["", data?.team_info?.home?.name, data?.team_info?.away?.name];
  const total = [{ title: "Total Maps", value: null, suspend: 0 }] as any;
  const toWin = [{ title: "To Win", value: null, suspend: 0 }] as any;
  const line = [{ title: "Line", value: null, suspend: 0 }] as any;
  if (data?.odds?.[410]?.participants) {
    const towins = Object.entries(data?.odds?.[410]?.participants);
    if (towins.length > 0) {
      towins.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (toWin.length < 3 && (title === "Home" || title == "Away")) {
          toWin.push({
            title: ``,
            value: item[1].value_eu,
            suspend: item[1]?.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 410,
            odd_name: data?.odds?.[410]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
          });
        }
      });
    }
  }

  if (data?.odds?.[444]?.participants) {
    const ou = Object.entries(data?.odds?.[444]?.participants);
    if (ou.length > 0) {
      ou.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (total.length < 3 && title === "Over") {
          total.push({
            title: `O ${item[1].handicap}`,
            value: ` ${Number(item[1].value_eu) > 0 ? "+" : ""}${
              item[1].value_eu
            }`,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 444,
            odd_name: data?.odds?.[444]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
          });
        }
        if (total.length < 3 && title === "Under") {
          total.push({
            title: `U ${item[1].handicap}`,
            value: ` ${Number(item[1].value_eu) > 0 ? "+" : ""}${
              item[1].value_eu
            }`,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 444,
            odd_name: data?.odds?.[444]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
          });
        }
      });
    }
  }

  if (data?.odds?.[443]?.participants) {
    const lines = Object.entries(data?.odds?.[443]?.participants);
    if (lines.length > 0) {
      lines.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (line.length < 3 && title === "Home") {
          line.push({
            title: item[1].handicap,
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 443,
            odd_name: data?.odds?.[443]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
          });
        }
        if (line.length < 3 && title === "Away") {
          line.push({
            title: item[1].handicap,
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 443,
            odd_name: data?.odds?.[443]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
          });
        }
      });
    }
  }

  // console.log('Sending New Data', data)
  let rows = [] as any;
  if (toWin.length > 1) rows.push(toWin);
  if (line.length > 1) rows.push(line);
  if (total.length > 1) rows.push(total);

  return { header, rows: rows };
};
//map 1 winner
export const map1Winner = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[1179]?.participants) {
    const items: any = Object.entries(data?.odds?.[1179]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 3 && title === "Home") {
        row.push({
          title: data?.team_info?.home?.name,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 1179,
          odd_name: data?.odds?.[1179]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
      if (row.length < 3 && title === "Away") {
        row.push({
          title: data?.team_info?.away?.name,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 1179,
          odd_name: data?.odds?.[1179]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
    });
    rows.push(row);
  }
  return rows;
};

//map 1 Kill Handicap
export const map1KillHandicap = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const header = [data?.team_info?.home?.name, data?.team_info?.away?.name];
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[9510035]?.participants) {
    const items: any = Object.entries(data?.odds?.[9510035]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Home") {
        row.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9510035,
          odd_name: data?.odds?.[9510035]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
      if (row.length < 2 && title === "Away") {
        row.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9510035,
          odd_name: data?.odds?.[9510035]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
    });
    rows.push(row);
  }
  return { header, rows: rows };
};
//map 1 Totals
export const map1Totals = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const header = ["", "Over", "Under"];
  let rows = [] as any;
  let kills = [{ title: "Kills", value: null, suspend: 0 }] as any;
  if (data?.odds?.[9510015]?.participants) {
    const items: any = Object.entries(data?.odds?.[9510015]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (kills.length < 3 && title === "Over") {
        kills.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9510015,
          odd_name: data?.odds?.[9510015]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
      if (kills.length < 3 && title === "Under") {
        kills.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9510015,
          odd_name: data?.odds?.[9510015]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
    });
    rows.push(kills);
  }
  return { header, rows: rows };
};
//map1GodLike
export const map1GodLike = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[959149000]?.participants) {
    const items: any = Object.entries(data?.odds?.[959149000]?.participants);
    items.map((itm: any) => {
      const item = itm[1];
      if (row.length < 2) {
        row.push({ title: item.name, value: null, suspend: "0" });
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 959149000,
          odd_name: data?.odds?.[959149000]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
      if (row.length == 2) {
        rows.push(row);
        row = [];
      }
    });
  }
  return rows;
};
//map1EitherTeamToScore
export const map1EitherTeamToScore = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let quadraKill = [{ title: "Quadra Kill", value: null, suspend: 0 }] as any;
  if (data?.odds?.[100000000]?.participants) {
    const items: any = Object.entries(data?.odds?.[100000000]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (quadraKill.length < 3) {
        quadraKill.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 100000000,
          odd_name: data?.odds?.[100000000]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
    });
    rows.push(quadraKill);
  }
  let pentalKill = [{ title: "Penta Kill", value: null, suspend: 0 }] as any;
  if (data?.odds?.[100000000]?.participants) {
    const items: any = Object.entries(data?.odds?.[100000000]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (pentalKill.length < 3) {
        pentalKill.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 100000000,
          odd_name: data?.odds?.[100000000]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
    });
    rows.push(pentalKill);
  }
  return rows;
};
//map 1 TotalKills odd/even
export const map1TotalKills = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[9291513]?.participants) {
    const items: any = Object.entries(data?.odds?.[9291513]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 3 && title === "Odd") {
        row.push({
          title: "Odd",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9291513,
          odd_name: data?.odds?.[9291513]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
      if (row.length < 3 && title === "Even") {
        row.push({
          title: "Even",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9291513,
          odd_name: data?.odds?.[9291513]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
    });
    rows.push(row);
  }
  return rows;
};

// map 2 winner
export const map2Winner = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[1180]?.participants) {
    const items: any = Object.entries(data?.odds?.[1180]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 3 && title === "Home") {
        row.push({
          title: data?.team_info?.home?.name,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 1180,
          odd_name: data?.odds?.[1180]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
      if (row.length < 3 && title === "Away") {
        row.push({
          title: data?.team_info?.away?.name,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 1180,
          odd_name: data?.odds?.[1180]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
    });
    rows.push(row);
  }
  return rows;
};
//map 2 Kill Handicap
export const map2KillHandicap = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const header = [data?.team_info?.home?.name, data?.team_info?.away?.name];
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[9510036]?.participants) {
    const items: any = Object.entries(data?.odds?.[9510036]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Home") {
        row.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9510036,
          odd_name: data?.odds?.[9510036]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
      if (row.length < 2 && title === "Away") {
        row.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9510036,
          odd_name: data?.odds?.[9510036]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
    });
    rows.push(row);
  }
  return { header, rows: rows };
};
//map 2 Totals
export const map2Totals = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const header = ["", "Over", "Under"];
  let rows = [] as any;
  let kills = [{ title: "Kills", value: null, suspend: 0 }] as any;
  if (data?.odds?.[9510016]?.participants) {
    const items: any = Object.entries(data?.odds?.[9510016]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (kills.length < 3 && title === "Over") {
        kills.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9510016,
          odd_name: data?.odds?.[9510016]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
      if (kills.length < 3 && title === "Under") {
        kills.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9510016,
          odd_name: data?.odds?.[9510016]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
    });
    rows.push(kills);
  }
  return { header, rows: rows };
};
//map2GodLike
export const map2GodLike = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[9591490]?.participants) {
    const items: any = Object.entries(data?.odds?.[9591490]?.participants);
    items.map((itm: any) => {
      const item = itm[1];
      if (row.length < 2) {
        row.push({ title: item.name, value: null, suspend: "0" });
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9591490,
          odd_name: data?.odds?.[9591490]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
      if (row.length == 2) {
        rows.push(row);
        row = [];
      }
    });
  }
  return rows;
};
//map2EitherTeamToScore
export const map2EitherTeamToScore = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let quadraKill = [{ title: "Quadra Kill", value: null, suspend: 0 }] as any;
  if (data?.odds?.[100000000]?.participants) {
    const items: any = Object.entries(data?.odds?.[100000000]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (quadraKill.length < 3) {
        quadraKill.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 100000000,
          odd_name: data?.odds?.[100000000]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
    });
    rows.push(quadraKill);
  }
  let pentalKill = [{ title: "Penta Kill", value: null, suspend: 0 }] as any;
  if (data?.odds?.[100000000]?.participants) {
    const items: any = Object.entries(data?.odds?.[100000000]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (pentalKill.length < 3) {
        pentalKill.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 100000000,
          odd_name: data?.odds?.[100000000]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
    });
    rows.push(pentalKill);
  }
  return rows;
};
//map 2 TotalKills odd/even
export const map2TotalKills = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[9291514]?.participants) {
    const items: any = Object.entries(data?.odds?.[9291514]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 3 && title === "Odd") {
        row.push({
          title: "Odd",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9291514,
          odd_name: data?.odds?.[9291514]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
      if (row.length < 3 && title === "Even") {
        row.push({
          title: "Even",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9291514,
          odd_name: data?.odds?.[9291514]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
    });
    rows.push(row);
  }
  return rows;
};

// map 3 winner
export const map3Winner = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[1181]?.participants) {
    const items: any = Object.entries(data?.odds?.[1181]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 3 && title === "Home") {
        row.push({
          title: data?.team_info?.home?.name,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 1181,
          odd_name: data?.odds?.[1181]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
      if (row.length < 3 && title === "Away") {
        row.push({
          title: data?.team_info?.away?.name,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 1181,
          odd_name: data?.odds?.[1181]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
    });
    rows.push(row);
  }
  return rows;
};
//map 3 Kill Handicap
export const map3KillHandicap = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[9510037]?.participants) {
    const items: any = Object.entries(data?.odds?.[9510037]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Home") {
        row.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9510037,
          odd_name: data?.odds?.[9510037]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
      if (row.length < 2 && title === "Away") {
        row.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9510037,
          odd_name: data?.odds?.[9510037]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
    });
    rows.push(row);
  }
  return rows;
};
//map 3 Totals
export const map3Totals = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const header = ["", "Over", "Under"];
  let rows = [] as any;
  let kills = [{ title: "Kills", value: null, suspend: 0 }] as any;
  if (data?.odds?.[9510030]?.participants) {
    const items: any = Object.entries(data?.odds?.[9510030]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (kills.length < 3 && title === "Over") {
        kills.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9510030,
          odd_name: data?.odds?.[9510030]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
      if (kills.length < 3 && title === "Under") {
        kills.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9510030,
          odd_name: data?.odds?.[9510030]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
    });
    rows.push(kills);
  }
  return { header, rows: rows };
};
//map3GodLike
export const map3GodLike = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[9591492]?.participants) {
    const items: any = Object.entries(data?.odds?.[9591492]?.participants);
    items.map((itm: any) => {
      const item = itm[1];
      if (row.length < 2) {
        row.push({ title: item.name, value: null, suspend: "0" });
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9591492,
          odd_name: data?.odds?.[9591492]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
      if (row.length == 2) {
        rows.push(row);
        row = [];
      }
    });
  }
  return rows;
};
//map3EitherTeamToScore
export const map3EitherTeamToScore = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let quadraKill = [{ title: "Quadra Kill", value: null, suspend: 0 }] as any;
  if (data?.odds?.[100000000]?.participants) {
    const items: any = Object.entries(data?.odds?.[100000000]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (quadraKill.length < 3) {
        quadraKill.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 100000000,
          odd_name: data?.odds?.[100000000]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
    });
    rows.push(quadraKill);
  }
  let pentalKill = [{ title: "Penta Kill", value: null, suspend: 0 }] as any;
  if (data?.odds?.[100000000]?.participants) {
    const items: any = Object.entries(data?.odds?.[100000000]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (pentalKill.length < 3) {
        pentalKill.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 100000000,
          odd_name: data?.odds?.[100000000]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
    });
    rows.push(pentalKill);
  }
  return rows;
};
//map 3 TotalKills odd/even
export const map3TotalKills = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[9291515]?.participants) {
    const items: any = Object.entries(data?.odds?.[9291515]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 3 && title === "Odd") {
        row.push({
          title: "Odd",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9291515,
          odd_name: data?.odds?.[9291515]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
      if (row.length < 3 && title === "Even") {
        row.push({
          title: "Even",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 9291515,
          odd_name: data?.odds?.[9291515]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
        });
      }
    });
    rows.push(row);
  }
  return rows;
};

//correctMapScore
export const correctMapScore = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const header = ["", data?.team_info?.home?.name, data?.team_info?.away?.name];
  const twoZero = [{ title: "2-0", value: null, suspend: 0 }] as any;
  const twoOne = [{ title: "2-1", value: null, suspend: 0 }] as any;
  if (data?.odds?.[11810]?.participants) {
    const twoZeros = Object.entries(data?.odds?.[11810]?.participants);
    if (twoZeros.length > 0) {
      twoZeros.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (twoZero.length < 3 && title === "2-0") {
          twoZero.push({
            title: "",
            value: item[1].value_eu,
            suspend: item[1]?.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 11810,
            odd_name: data?.odds?.[11810]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
          });
        }
        if (twoZero.length < 3 && title === "0-2") {
          twoZero.push({
            title: "",
            value: item[1].value_eu,
            suspend: item[1]?.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 11810,
            odd_name: data?.odds?.[11810]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
          });
        }
      });
    }
  }

  if (data?.odds?.[11810]?.participants) {
    const ou = Object.entries(data?.odds?.[11810]?.participants);
    if (ou.length > 0) {
      ou.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (twoOne.length < 3 && title === "2-1") {
          twoOne.push({
            title: "",
            value: item[1].value_eu,
            suspend: item[1]?.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 11810,
            odd_name: data?.odds?.[11810]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
          });
        }
        if (twoOne.length < 3 && title === "1-2") {
          twoOne.push({
            title: "",
            value: item[1].value_eu,
            suspend: item[1]?.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 11810,
            odd_name: data?.odds?.[11810]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
          });
        }
      });
    }
  }

  let rows = [] as any;
  if (twoZero.length > 1) rows.push(twoZero);
  if (twoOne.length > 1) rows.push(twoOne);

  return { header, rows: rows };
};
//toWinAtLeastOneMap
export const toWinAtLeastOneMap = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const header = ["", "Yes", "No"];
  const home = [
    { title: data?.team_info?.home?.name, value: null, suspend: 0 },
  ] as any;
  const away = [
    { title: data?.team_info?.away?.name, value: null, suspend: 0 },
  ] as any;
  if (data?.odds?.[100101001]?.participants) {
    const items = Object.entries(data?.odds?.[100101001]?.participants);
    if (items.length > 0) {
      items.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (home.length < 3 && (title === "Home" || title == "Away")) {
          home.push({
            title: item[1].handicap,
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 100101001,
            odd_name: data?.odds?.[100101001]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
          });
        }
      });
    }
  }
  if (data?.odds?.[100101001]?.participants) {
    const items = Object.entries(data?.odds?.[100101001]?.participants);
    if (items.length > 0) {
      items.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (away.length < 3 && (title === "Home" || title == "Away")) {
          away.push({
            title: item[1].handicap,
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 100101001,
            odd_name: data?.odds?.[100101001]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
          });
        }
      });
    }
  }

  let rows = [] as any;
  if (home.length > 1) rows.push(home);
  if (away.length > 1) rows.push(away);

  return { header, rows: rows };
};
