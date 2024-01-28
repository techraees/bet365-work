"use client";
import React from "react";

//game lines
export const gameLines = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  // title = data?.team_info?.home?.name
  const header = ["", data?.team_info?.home?.name, data?.team_info?.away?.name];
  const line = [{ title: "Run Line", value: null, suspend: 0 }] as any;
  const total = [{ title: "Total", value: null, suspend: 0 }] as any;
  const toWin = [{ title: "To Win", value: null, suspend: 0 }] as any;
  if (data?.odds?.[160031]?.participants) {
    const lines = Object.entries(data?.odds?.[160031]?.participants);
    if (lines.length > 2) {
      lines.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (line.length < 3 && title === "Home" && item[1].is_main == "1") {
          line.push({
            title: item[1].handicap,
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 160031,
            odd_name: data?.odds?.[160031]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
        if (line.length < 3 && title === "Away" && item[1].is_main == "1") {
          line.push({
            title: item[1].handicap,
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 160031,
            odd_name: data?.odds?.[160031]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
      });
    } else if (lines.length > 0) {
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
            odd_id: 160031,
            odd_name: data?.odds?.[160031]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            bet_type: "Live",
            game: "baseball",
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
            odd_id: 160031,
            odd_name: data?.odds?.[160031]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
      });
    }
  }
  if (data?.odds?.[160030]?.participants) {
    const towins = Object.entries(data?.odds?.[160030]?.participants);
    if (towins.length > 0) {
      towins.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (toWin.length < 3 && (title === "Home" || title == "Away")) {
          toWin.push({
            title: ``,
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 160031,
            odd_name: data?.odds?.[160031]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
      });
    }
  }

  if (data?.odds?.[160032]?.participants) {
    const ou = Object.entries(data?.odds?.[160032]?.participants);
    if (ou.length > 2) {
      ou.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (total.length < 3 && title === "Over" && item[1].is_main == "1") {
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
            odd_id: 160032,
            odd_name: data?.odds?.[160032]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
        if (total.length < 3 && title === "Under" && item[1].is_main == "1") {
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
            odd_id: 160032,
            odd_name: data?.odds?.[160032]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
      });
    } else if (ou.length > 0) {
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
            odd_id: 160032,
            odd_name: data?.odds?.[160032]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            bet_type: "Live",
            game: "baseball",
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
            odd_id: 160032,
            odd_name: data?.odds?.[160032]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
      });
    }
  }

  // console.log('Sending New Data', data)
  let rows = [] as any;
  if (line.length > 1) rows.push(line);
  if (total.length > 1) rows.push(total);
  if (toWin.length > 1) rows.push(toWin);

  return { header, rows: rows };
};
//alternativeRunLine
export const alternativeRunLine = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[160031]?.participants) {
    const items: any = Object.entries(data?.odds?.[160031]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Home" && item.is_main == "0") {
        row.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 160031,
          odd_name: data?.odds?.[160031]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "Away" && item.is_main == "0") {
        row.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 160031,
          odd_name: data?.odds?.[160031]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length == 2) {
        rows.push(row);
        row = [] as any;
      }
    });
  }
  return rows;
};
//alternativeGameTotal
export const alternativeGameTotal = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[160032]?.participants) {
    const items: any = Object.entries(data?.odds?.[160032]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 3 && title === "Over" && item.is_main == "0") {
        row.push({ title: item.handicap, value: "", suspend: item.suspend });
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 160032,
          odd_name: data?.odds?.[160032]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 3 && title === "Under" && item.is_main == "0") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 160032,
          odd_name: data?.odds?.[160032]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length == 3) {
        rows.push(row);
        row = [] as any;
      }
    });
  }
  return rows;
};

//Team Totals
export const teamTotals = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (
    data?.odds?.[160034]?.participants &&
    data?.odds?.[160035]?.participants
  ) {
    const items: any = Object.entries(data?.odds?.[160034]?.participants);
    const items2: any = Object.entries(data?.odds?.[160035]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Over" && item.is_main == "1") {
        row.push({
          title: `Over ${item.handicap}`,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 160034,
          odd_name: data?.odds?.[160034]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "Under" && item.is_main == "1") {
        row.push({
          title: `Under ${item.handicap}`,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 160034,
          odd_name: data?.odds?.[160034]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    items2.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 4 && title === "Over" && item.is_main == "1") {
        row.push({
          title: `Over ${item.handicap}`,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 160035,
          odd_name: data?.odds?.[160035]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Under" && item.is_main == "1") {
        row.push({
          title: `Under ${item.handicap}`,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 160035,
          odd_name: data?.odds?.[160035]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return rows;
};
//Team Alternative Totals
export const teamAlternativeTotals = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let rows1 = [] as any;
  let rows2 = [] as any;
  let row1 = [] as any;
  let row2 = [] as any;
  if (
    data?.odds?.[160034]?.participants &&
    data?.odds?.[160035]?.participants
  ) {
    const items: any = Object.entries(data?.odds?.[160034]?.participants);
    const items2: any = Object.entries(data?.odds?.[160035]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row1.length < 2 && title === "Over" && item.is_main == "0") {
        row1.push({
          title: `Over ${item.handicap}`,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 160034,
          odd_name: data?.odds?.[160034]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row1.length < 2 && title === "Under" && item.is_main == "0") {
        row1.push({
          title: `Under ${item.handicap}`,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 160034,
          odd_name: data?.odds?.[160034]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row1.length == 2) {
        rows1.push(row1);
        row1 = [];
      }
    });
    items2.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row2.length < 4 && title === "Over" && item.is_main == "0") {
        row2.push({
          title: `Over ${item.handicap}`,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 160035,
          odd_name: data?.odds?.[160035]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row2.length < 4 && title === "Under" && item.is_main == "0") {
        row2.push({
          title: `Under ${item.handicap}`,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 160035,
          odd_name: data?.odds?.[160035]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row2.length == 2) {
        rows2.push(row2);
        row2 = [];
      }
    });
  }

  for (let i = 0; i < Math.max(rows1.length, rows2.length); i++) {
    let row1 =
      rows1[i] || Array(2).fill({ title: "", value: "", suspend: "0" });
    let row2 =
      rows2[i] || Array(2).fill({ title: "", value: "", suspend: "0" });

    let newRow = [];
    for (let j = 0; j < 2; j++) {
      newRow.push(row1[j]);
    }
    for (let j = 0; j < 2; j++) {
      newRow.push(row2[j]);
    }

    rows.push(newRow);
  }
  return rows;
};

// //aRunScoredHomeInning1
export const aRunScoredHomeInning1 = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let marketname = `A Run Scored - ${data?.team_info?.home?.name} Inning 1`;
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900956]?.participants) {
    const items: any = Object.entries(data?.odds?.[900956]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900956,
          odd_name: data?.odds?.[900956]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900956,
          odd_name: data?.odds?.[900956]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return { marketname, rows };
};
//aRunScoredAwayInning1
export const aRunScoredAwayInning1 = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let marketname = `A Run Scored - ${data?.team_info?.away?.name} Inning 1`;
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900966]?.participants) {
    const items: any = Object.entries(data?.odds?.[900966]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900966,
          odd_name: data?.odds?.[900966]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900966,
          odd_name: data?.odds?.[900966]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return { marketname, rows };
};
//runsInThe1thInning
export const runsInThe1thInning = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900939]?.participants) {
    const items: any = Object.entries(data?.odds?.[900939]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 3 && title === "Over") {
        row.push({ title: item.handicap, value: "", suspend: item.suspend });
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900939,
          odd_name: data?.odds?.[900939]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 3 && title === "Under") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900939,
          odd_name: data?.odds?.[900939]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length == 3) {
        rows.push(row);
        row = [] as any;
      }
    });
  }
  return rows;
};
//_1thInningRuns
export const _1thInningRuns = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[919]?.participants) {
    const items: any = Object.entries(data?.odds?.[919]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 919,
          odd_name: data?.odds?.[919]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 919,
          odd_name: data?.odds?.[919]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return rows;
};
//_1thInningRuns
export const _1thInningLines = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [{ title: "Winner", value: null, suspend: 0 }] as any;
  if (data?.odds?.[209]?.participants) {
    const items: any = Object.entries(data?.odds?.[209]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 4 && title === "Home") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 209,
          odd_name: data?.odds?.[209]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Away") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 209,
          odd_name: data?.odds?.[209]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Draw") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 209,
          odd_name: data?.odds?.[209]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return rows;
};

//aRunScoredHomeInning2
export const aRunScoredHomeInning2 = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let marketname = `A Run Scored - ${data?.team_info?.home?.name} Inning 2`;
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900957]?.participants) {
    const items: any = Object.entries(data?.odds?.[900957]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900957,
          odd_name: data?.odds?.[900957]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900957,
          odd_name: data?.odds?.[900957]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return { marketname, rows };
};
//aRunScoredAwayInning2
export const aRunScoredAwayInning2 = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let marketname = `A Run Scored - ${data?.team_info?.away?.name} Inning 2`;
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900967]?.participants) {
    const items: any = Object.entries(data?.odds?.[900967]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900967,
          odd_name: data?.odds?.[900967]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900967,
          odd_name: data?.odds?.[900967]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return { marketname, rows };
};
//runsInThe2thInning
export const runsInThe2thInning = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900940]?.participants) {
    const items: any = Object.entries(data?.odds?.[900940]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 3 && title === "Over") {
        row.push({ title: item.handicap, value: "", suspend: item.suspend });
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900940,
          odd_name: data?.odds?.[900940]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 3 && title === "Under") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900940,
          odd_name: data?.odds?.[900940]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length == 3) {
        rows.push(row);
        row = [] as any;
      }
    });
  }
  return rows;
};
//_2thInningRuns
export const _2thInningRuns = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900945]?.participants) {
    const items: any = Object.entries(data?.odds?.[900945]?.participants);
    if (items.length > 0) {
      items.map((itm: any) => {
        let title = "";
        const item = itm[1];
        title = item?.name;
        if (row.length < 2 && title === "Yes") {
          row.push({
            title: "Yes",
            value: item.value_eu,
            suspend: item.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 900945,
            odd_name: data?.odds?.[900945]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
        if (row.length < 2 && title === "No") {
          row.push({
            title: "No",
            value: item.value_eu,
            suspend: item.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 900945,
            odd_name: data?.odds?.[900945]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
      });
      rows.push(row);
    }
  }
  return rows;
};
//_2thInningRunsLine
export const _2thInningLines = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [{ title: "Winner", value: null, suspend: 0 }] as any;
  if (data?.odds?.[210]?.participants) {
    const items: any = Object.entries(data?.odds?.[210]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 4 && title === "Home") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 210,
          odd_name: data?.odds?.[210]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Away") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 210,
          odd_name: data?.odds?.[210]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Draw") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 210,
          odd_name: data?.odds?.[210]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return rows;
};

//aRunScoredHomeInning3
export const aRunScoredHomeInning3 = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let marketname = `A Run Scored - ${data?.team_info?.home?.name} Inning 3`;
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900958]?.participants) {
    const items: any = Object.entries(data?.odds?.[900958]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900958,
          odd_name: data?.odds?.[900958]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900958,
          odd_name: data?.odds?.[900958]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return { marketname, rows };
};
//aRunScoredAwayInning3
export const aRunScoredAwayInning3 = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let marketname = `A Run Scored - ${data?.team_info?.away?.name} Inning 3`;
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900968]?.participants) {
    const items: any = Object.entries(data?.odds?.[900968]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900968,
          odd_name: data?.odds?.[900968]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900968,
          odd_name: data?.odds?.[900968]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return { marketname, rows };
};
//runsInThe3thInning
export const runsInThe3thInning = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900941]?.participants) {
    const items: any = Object.entries(data?.odds?.[900941]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 3 && title === "Over") {
        row.push({ title: item.handicap, value: "", suspend: item.suspend });
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900941,
          odd_name: data?.odds?.[900941]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 3 && title === "Under") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900941,
          odd_name: data?.odds?.[900941]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length == 3) {
        rows.push(row);
        row = [] as any;
      }
    });
  }
  return rows;
};
//_3thInningRuns
export const _3thInningRuns = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900946]?.participants) {
    const items: any = Object.entries(data?.odds?.[900946]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900946,
          odd_name: data?.odds?.[900946]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900946,
          odd_name: data?.odds?.[900946]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return rows;
};
//_3thInningRuns
export const _3thInningLines = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [{ title: "Winner", value: null, suspend: 0 }] as any;
  if (data?.odds?.[211]?.participants) {
    const items: any = Object.entries(data?.odds?.[211]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 4 && title === "Home") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 211,
          odd_name: data?.odds?.[211]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Away") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 211,
          odd_name: data?.odds?.[211]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Draw") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 211,
          odd_name: data?.odds?.[211]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return rows;
};

//aRunScoredHomeInning4
export const aRunScoredHomeInning4 = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let marketname = `A Run Scored - ${data?.team_info?.home?.name} Inning 4`;
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900959]?.participants) {
    const items: any = Object.entries(data?.odds?.[900959]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900959,
          odd_name: data?.odds?.[900959]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900959,
          odd_name: data?.odds?.[900959]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return { marketname, rows };
};
//aRunScoredAwayInning4
export const aRunScoredAwayInning4 = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let marketname = `A Run Scored - ${data?.team_info?.away?.name} Inning 4`;
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900969]?.participants) {
    const items: any = Object.entries(data?.odds?.[900969]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900969,
          odd_name: data?.odds?.[900969]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900969,
          odd_name: data?.odds?.[900969]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return { marketname, rows };
};
//runsInThe4thInning
export const runsInThe4thInning = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900926]?.participants) {
    const items: any = Object.entries(data?.odds?.[900926]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 3 && title === "Over") {
        row.push({ title: item.handicap, value: "", suspend: item.suspend });
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900926,
          odd_name: data?.odds?.[900926]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 3 && title === "Under") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900926,
          odd_name: data?.odds?.[900926]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length == 3) {
        rows.push(row);
        row = [] as any;
      }
    });
  }
  return rows;
};
//_4thInningRuns
export const _4thInningRuns = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900947]?.participants) {
    const items: any = Object.entries(data?.odds?.[900947]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900947,
          odd_name: data?.odds?.[900947]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900947,
          odd_name: data?.odds?.[900947]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return rows;
};
//_4thInningRuns
export const _4thInningLines = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [{ title: "Winner", value: null, suspend: 0 }] as any;
  if (data?.odds?.[900928]?.participants) {
    const items: any = Object.entries(data?.odds?.[900928]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 4 && title === "Home") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900928,
          odd_name: data?.odds?.[900928]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Away") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900928,
          odd_name: data?.odds?.[900928]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Draw") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900928,
          odd_name: data?.odds?.[900928]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return rows;
};

//aRunScoredHomeInning5
export const aRunScoredHomeInning5 = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let marketname = `A Run Scored - ${data?.team_info?.home?.name} Inning 5`;
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900960]?.participants) {
    const items: any = Object.entries(data?.odds?.[900960]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900960,
          odd_name: data?.odds?.[900960]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900960,
          odd_name: data?.odds?.[900960]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return { marketname, rows };
};
//aRunScoredAwayInning5
export const aRunScoredAwayInning5 = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let marketname = `A Run Scored - ${data?.team_info?.away?.name} Inning 5`;
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900970]?.participants) {
    const items: any = Object.entries(data?.odds?.[900970]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900970,
          odd_name: data?.odds?.[900970]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900970,
          odd_name: data?.odds?.[900970]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return { marketname, rows };
};
//runsInThe5thInning
export const runsInThe5thInning = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900927]?.participants) {
    const items: any = Object.entries(data?.odds?.[900927]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 3 && title === "Over") {
        row.push({ title: item.handicap, value: "", suspend: item.suspend });
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900927,
          odd_name: data?.odds?.[900927]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 3 && title === "Under") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900927,
          odd_name: data?.odds?.[900927]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length == 3) {
        rows.push(row);
        row = [] as any;
      }
    });
  }
  return rows;
};
//_5thInningRuns
export const _5thInningRuns = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900948]?.participants) {
    const items: any = Object.entries(data?.odds?.[900948]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900948,
          odd_name: data?.odds?.[900948]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900948,
          odd_name: data?.odds?.[900948]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return rows;
};
//_5thInningRuns
export const _5thInningLines = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [{ title: "Winner", value: null, suspend: 0 }] as any;
  if (data?.odds?.[900929]?.participants) {
    const items: any = Object.entries(data?.odds?.[900929]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 4 && title === "Home") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900929,
          odd_name: data?.odds?.[900929]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Away") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900929,
          odd_name: data?.odds?.[900929]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Draw") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900929,
          odd_name: data?.odds?.[900929]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return rows;
};

//aRunScoredHomeInning6
export const aRunScoredHomeInning6 = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let marketname = `A Run Scored - ${data?.team_info?.home?.name} Inning 6`;
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900961]?.participants) {
    const items: any = Object.entries(data?.odds?.[900961]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900961,
          odd_name: data?.odds?.[900961]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900961,
          odd_name: data?.odds?.[900961]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return { marketname, rows };
};
//aRunScoredAwayInning6
export const aRunScoredAwayInning6 = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let marketname = `A Run Scored - ${data?.team_info?.away?.name} Inning 6`;
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900971]?.participants) {
    const items: any = Object.entries(data?.odds?.[900971]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900971,
          odd_name: data?.odds?.[900971]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900971,
          odd_name: data?.odds?.[900971]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return { marketname, rows };
};

//runsInThe6thInning
export const runsInThe6thInning = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900942]?.participants) {
    const items: any = Object.entries(data?.odds?.[900942]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 3 && title === "Over") {
        row.push({ title: item.handicap, value: "", suspend: item.suspend });
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900942,
          odd_name: data?.odds?.[900942]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 3 && title === "Under") {
        row.push({ title: "", value: item.value_eu, suspend: item.suspend });
      }
      if (row.length == 3) {
        rows.push(row);
        row = [] as any;
      }
    });
  }
  return rows;
};

//_6thInningRuns
export const _6thInningRuns = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900949]?.participants) {
    const items: any = Object.entries(data?.odds?.[900949]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900949,
          odd_name: data?.odds?.[900949]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900949,
          odd_name: data?.odds?.[900949]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return rows;
};
//_6thInningRuns
export const _6thInningLines = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [{ title: "Winner", value: null, suspend: 0 }] as any;
  if (data?.odds?.[900930]?.participants) {
    const items: any = Object.entries(data?.odds?.[900930]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 4 && title === "Home") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900930,
          odd_name: data?.odds?.[900930]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Away") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900930,
          odd_name: data?.odds?.[900930]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Draw") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900930,
          odd_name: data?.odds?.[900930]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return rows;
};
//aRunScoredHomeInning7
export const aRunScoredHomeInning7 = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let marketname = `A Run Scored - ${data?.team_info?.home?.name} Inning 7`;
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900963]?.participants) {
    const items: any = Object.entries(data?.odds?.[900963]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900963,
          odd_name: data?.odds?.[900963]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900963,
          odd_name: data?.odds?.[900963]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return { marketname, rows };
};
//aRunScoredAwayInning7
export const aRunScoredAwayInning7 = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let marketname = `A Run Scored - ${data?.team_info?.away?.name} Inning 7`;
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900972]?.participants) {
    const items: any = Object.entries(data?.odds?.[900972]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900972,
          odd_name: data?.odds?.[900972]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900972,
          odd_name: data?.odds?.[900972]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return { marketname, rows };
};

//runsInThe7thInning
export const runsInThe7thInning = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900943]?.participants) {
    const items: any = Object.entries(data?.odds?.[900943]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 3 && title === "Over") {
        row.push({ title: item.handicap, value: "", suspend: item.suspend });
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900943,
          odd_name: data?.odds?.[900943]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 3 && title === "Under") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900943,
          odd_name: data?.odds?.[900943]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length == 3) {
        rows.push(row);
        row = [] as any;
      }
    });
  }
  return rows;
};

//_7thInningRuns
export const _7thInningRuns = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900950]?.participants) {
    const items: any = Object.entries(data?.odds?.[900950]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900950,
          odd_name: data?.odds?.[900950]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900950,
          odd_name: data?.odds?.[900950]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return rows;
};
//_7thInningRuns
export const _7thInningLines = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [{ title: "Winner", value: null, suspend: 0 }] as any;
  if (data?.odds?.[900931]?.participants) {
    const items: any = Object.entries(data?.odds?.[900931]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 4 && title === "Home") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900931,
          odd_name: data?.odds?.[900931]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Away") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900931,
          odd_name: data?.odds?.[900931]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Draw") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900931,
          odd_name: data?.odds?.[900931]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return rows;
};
//aRunScoredHomeInning8
export const aRunScoredHomeInning8 = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let marketname = `A Run Scored - ${data?.team_info?.home?.name} Inning 8`;
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900964]?.participants) {
    const items: any = Object.entries(data?.odds?.[900964]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900964,
          odd_name: data?.odds?.[900964]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900964,
          odd_name: data?.odds?.[900964]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return { marketname, rows };
};
//aRunScoredAwayInning8
export const aRunScoredAwayInning8 = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let marketname = `A Run Scored - ${data?.team_info?.away?.name} Inning 8`;
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900973]?.participants) {
    const items: any = Object.entries(data?.odds?.[900973]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900973,
          odd_name: data?.odds?.[900973]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900973,
          odd_name: data?.odds?.[900973]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return { marketname, rows };
};

//runsInThe8thInning
export const runsInThe8thInning = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900944]?.participants) {
    const items: any = Object.entries(data?.odds?.[900944]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 3 && title === "Over") {
        row.push({
          title: item.handicap,
          value: "",
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900944,
          odd_name: data?.odds?.[900944]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900944,
          odd_name: data?.odds?.[900944]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 3 && title === "Under") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900944,
          odd_name: data?.odds?.[900944]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length == 3) {
        rows.push(row);
        row = [] as any;
      }
    });
  }
  return rows;
};

//_8thInningRuns
export const _8thInningRuns = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900951]?.participants) {
    const items: any = Object.entries(data?.odds?.[900951]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Yes") {
        row.push({
          title: "Yes",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900951,
          odd_name: data?.odds?.[900951]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "No") {
        row.push({
          title: "No",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900951,
          odd_name: data?.odds?.[900951]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return rows;
};
//_8th Inning
export const _8thInningLines = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [{ title: "Winner", value: null, suspend: 0 }] as any;
  if (data?.odds?.[900932]?.participants) {
    const items: any = Object.entries(data?.odds?.[900932]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 4 && title === "Home") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900932,
          odd_name: data?.odds?.[900932]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Away") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900932,
          odd_name: data?.odds?.[900932]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Draw") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900932,
          odd_name: data?.odds?.[900932]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return rows;
};

//winningMargin
export const winningMargin = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const run1 = [{ title: "1 run", value: null, suspend: 0 }] as any;
  const run2 = [{ title: "2 run", value: null, suspend: 0 }] as any;
  const run3 = [{ title: "3 run", value: null, suspend: 0 }] as any;
  const run4 = [{ title: "4 run", value: null, suspend: 0 }] as any;
  if (data?.odds?.[900954]?.participants) {
    const homes: any = Object.entries(data?.odds?.[900954]?.participants);
    if (homes.length > 0) {
      homes.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (run1.length < 3 && title === "1 run") {
          run1.push({
            title: "",
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 900954,
            odd_name: data?.odds?.[900954]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
        if (run2.length < 3 && title === "2 runs") {
          run2.push({
            title: "",
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 900954,
            odd_name: data?.odds?.[900954]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
        if (run3.length < 3 && title === "3 runs") {
          run3.push({
            title: "",
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 900954,
            odd_name: data?.odds?.[900954]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
        if (run4.length < 3 && title === "4 or more runs") {
          run4.push({
            title: "",
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 900954,
            odd_name: data?.odds?.[900954]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
      });
    }
  }

  if (data?.odds?.[900955]?.participants) {
    const aways: any = Object.entries(data?.odds?.[900955]?.participants);
    if (aways.length > 0) {
      aways.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (run1.length < 3 && title === "1 run") {
          run1.push({
            title: "",
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 900955,
            odd_name: data?.odds?.[900955]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
        if (run2.length < 3 && title === "2 runs") {
          run2.push({
            title: "",
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 900955,
            odd_name: data?.odds?.[900955]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
        if (run3.length < 3 && title === "3 runs") {
          run3.push({
            title: "",
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 900955,
            odd_name: data?.odds?.[900955]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
        if (run4.length < 3 && title === "4 or more runs") {
          run4.push({
            title: "",
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 900955,
            odd_name: data?.odds?.[900955]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
      });
    }
  }

  let rows = [] as any;
  if (run1.length > 1) rows.push(run1);
  if (run2.length > 1) rows.push(run2);
  if (run3.length > 1) rows.push(run3);
  if (run4.length > 1) rows.push(run4);

  return rows;
};

//runLineIncl
export const runLineIncl = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const header = [
    data?.team_info?.home?.name,
    `Tie - ${data?.team_info?.home?.name}`,
    data?.team_info?.away?.name,
  ];
  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[900953]?.participants) {
    const items: any = Object.entries(data?.odds?.[900953]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 4 && title === "Home") {
        row.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900953,
          odd_name: data?.odds?.[900953]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Draw") {
        row.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900953,
          odd_name: data?.odds?.[900953]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Away") {
        row.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 900953,
          odd_name: data?.odds?.[900953]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
    });
    rows.push(row);
  }
  return { header, rows: rows };
};

//matchCorrectScore
export const matchCorrectScore = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let rows = [] as any;
  let row = [] as any;

  if (data?.odds?.[561127114]?.participants) {
    const items = Object.entries(data?.odds?.[561127114]?.participants);
    if (items.length > 0) {
      items.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (row.length == 0) {
          row.push({ title: title, value: null, suspend: "0" });
        }
        if (row.length < 3 && items.length > 0) {
          row.push({
            title: "",
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 561127114,
            odd_name: data?.odds?.[561127114]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
        if (row.length == 3) {
          rows.push(row);
          row = [];
        }
      });
    }
  }
  return rows;
};

//totalRuns3Way
export const totalRuns3Way = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  if (data?.odds?.[561127116]?.participants) {
    let row = [] as any;
    const items: any = Object.entries(data?.odds?.[561127116]?.participants);
    if (items.length > 0) {
      items.map((itm: any) => {
        let title = "";
        const item = itm[1];
        title = item?.name;
        if (row.length == 0) {
          row.push({ title: item.handicap, value: null, suspend: "0" });
        }
        if (row.length < 4) {
          row.push({
            title: "",
            value: item.value_eu,
            suspend: item.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 561127116,
            odd_name: data?.odds?.[561127116]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
      });
      rows.push(row);
    }
  }
  return rows;
};

//3innings
export const _3innings = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  // title = data?.team_info?.home?.name
  const header = ["", data?.team_info?.home?.name, data?.team_info?.away?.name];
  const line = [{ title: "Run Line", value: null, suspend: 0 }] as any;
  const total = [{ title: "Total", value: null, suspend: 0 }] as any;
  const toWin = [{ title: "To Win", value: null, suspend: 0 }] as any;
  if (data?.odds?.[933]?.participants) {
    const lines = Object.entries(data?.odds?.[933]?.participants);
    if (lines.length > 0) {
      lines.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (line.length < 3 && title === "Home" && item[1].is_main == "1") {
          line.push({
            title: item[1].handicap,
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 933,
            odd_name: data?.odds?.[933]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
        if (line.length < 3 && title === "Away" && item[1].is_main == "1") {
          line.push({
            title: item[1].handicap,
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 933,
            odd_name: data?.odds?.[933]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
      });
    }
  }
  if (data?.odds?.[932]?.participants) {
    const ou = Object.entries(data?.odds?.[932]?.participants);
    if (ou.length > 0) {
      ou.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (total.length < 3 && title === "Over" && item[1].is_main == "1") {
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
            odd_id: 932,
            odd_name: data?.odds?.[932]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
        if (total.length < 3 && title === "Under" && item[1].is_main == "1") {
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
            odd_id: 932,
            odd_name: data?.odds?.[932]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
      });
    }
  }

  // console.log('Sending New Data', data)
  let rows = [] as any;
  if (line.length > 2) rows.push(line);
  if (total.length > 2) rows.push(total);

  return { header, rows: rows };
};

// alternative3InningsTotals
export const alternative3InningsTotals = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[932]?.participants) {
    const items: any = Object.entries(data?.odds?.[932]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 3 && title === "Over" && item.is_main == "0") {
        row.push({ title: item.handicap, value: "", suspend: item.suspend });
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 932,
          odd_name: data?.odds?.[932]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 3 && title === "Under" && item.is_main == "0") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 932,
          odd_name: data?.odds?.[932]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length == 3) {
        rows.push(row);
        row = [] as any;
      }
    });
  }
  return rows;
};
// alternative3InningsRunLines
export const alternative3InningsRunLines = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[933]?.participants) {
    const items: any = Object.entries(data?.odds?.[933]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Home" && item.is_main == "0") {
        row.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 933,
          odd_name: data?.odds?.[933]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "Away" && item.is_main == "0") {
        row.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 933,
          odd_name: data?.odds?.[933]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length == 2) {
        rows.push(row);
        row = [] as any;
      }
    });
  }
  return rows;
};
//5innings
export const _5innings = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  // title = data?.team_info?.home?.name
  const header = ["", data?.team_info?.home?.name, data?.team_info?.away?.name];
  const line = [{ title: "Run Line", value: null, suspend: 0 }] as any;
  const total = [{ title: "Total", value: null, suspend: 0 }] as any;
  const toWin = [{ title: "To Win", value: null, suspend: 0 }] as any;
  if (data?.odds?.[160037]?.participants) {
    const lines = Object.entries(data?.odds?.[160037]?.participants);
    if (lines.length > 0) {
      lines.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (line.length < 3 && title === "Home" && item[1].is_main == "1") {
          line.push({
            title: item[1].handicap,
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 160037,
            odd_name: data?.odds?.[160037]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
        if (line.length < 3 && title === "Away" && item[1].is_main == "1") {
          line.push({
            title: item[1].handicap,
            value: item[1].value_eu,
            suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 160037,
            odd_name: data?.odds?.[160037]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
      });
    }
  }
  if (data?.odds?.[160038]?.participants) {
    const towins = Object.entries(data?.odds?.[160038]?.participants);
    if (towins.length > 0) {
      towins.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (toWin.length < 3 && (title === "Home" || title == "Away")) {
          toWin.push({
            title: ``,
            value: item[1].value_eu,
            suspend: item[1].suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 160038,
            odd_name: data?.odds?.[160038]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
      });
    }
  }

  if (data?.odds?.[160036]?.participants) {
    const ou = Object.entries(data?.odds?.[160036]?.participants);
    if (ou.length > 0) {
      ou.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (total.length < 3 && title === "Over" && item[1].is_main == "1") {
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
            odd_id: 160036,
            odd_name: data?.odds?.[160036]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
        if (total.length < 3 && title === "Under" && item[1].is_main == "1") {
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
            odd_id: 160036,
            odd_name: data?.odds?.[160036]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
      });
    }
  }

  // console.log('Sending New Data', data)
  let rows = [] as any;
  if (line.length > 2) rows.push(line);
  if (total.length > 2) rows.push(total);
  if (toWin.length > 2) rows.push(toWin);

  return { header, rows: rows };
};

// alternative5InningsTotals
export const alternative5InningsTotals = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[160036]?.participants) {
    const items: any = Object.entries(data?.odds?.[160036]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 3 && title === "Over" && item.is_main == "0") {
        row.push({ title: item.handicap, value: "", suspend: item.suspend });
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 160036,
          odd_name: data?.odds?.[160036]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 3 && title === "Under" && item.is_main == "0") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 160036,
          odd_name: data?.odds?.[160036]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length == 3) {
        rows.push(row);
        row = [] as any;
      }
    });
  }
  return rows;
};
// alternative5InningsRunLines
export const alternative5InningsRunLines = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[160037]?.participants) {
    const items: any = Object.entries(data?.odds?.[160037]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Home" && item.is_main == "0") {
        row.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 160037,
          odd_name: data?.odds?.[160037]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "Away" && item.is_main == "0") {
        row.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,
        });
      }
      if (row.length == 2) {
        rows.push(row);
        row = [] as any;
      }
    });
  }
  return rows;
};
//7innings
export const _7innings = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  // title = data?.team_info?.home?.name
  const header = ["", data?.team_info?.home?.name, data?.team_info?.away?.name];
  const line = [{ title: "Run Line", value: null, suspend: 0 }] as any;
  const total = [{ title: "Total", value: null, suspend: 0 }] as any;
  const toWin = [{ title: "To Win", value: null, suspend: 0 }] as any;
  if (data?.odds?.[937]?.participants) {
    const lines = Object.entries(data?.odds?.[937]?.participants);
    if (lines.length > 0) {
      lines.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (line.length < 3 && title === "Home" && item[1].is_main == "1") {
          line.push({
            title: item[1].handicap,
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 937,
            odd_name: data?.odds?.[937]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
        if (line.length < 3 && title === "Away" && item[1].is_main == "1") {
          line.push({
            title: item[1].handicap,
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 937,
            odd_name: data?.odds?.[937]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
      });
    }
  }
  if (data?.odds?.[292992299]?.participants) {
    const towins = Object.entries(data?.odds?.[292992299]?.participants);
    if (towins.length > 0) {
      towins.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (toWin.length < 3 && (title === "Home" || title == "Away")) {
          toWin.push({
            title: ``,
            value: item[1].value_eu,
            suspend: item[1].suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 292992299,
            odd_name: data?.odds?.[292992299]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
      });
    }
  }

  if (data?.odds?.[936]?.participants) {
    const ou = Object.entries(data?.odds?.[936]?.participants);
    if (ou.length > 0) {
      ou.map((item: any, index: number) => {
        let title = "";
        let suspend = "0";
        title = item[1]?.name;
        if (total.length < 3 && title === "Over" && item[1].is_main == "1") {
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
            odd_id: 936,
            odd_name: data?.odds?.[936]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
        if (total.length < 3 && title === "Under" && item[1].is_main == "1") {
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
            odd_id: 936,
            odd_name: data?.odds?.[936]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
      });
    }
  }

  // console.log('Sending New Data', data)
  let rows = [] as any;
  if (line.length > 2) rows.push(line);
  if (total.length > 2) rows.push(total);
  if (toWin.length > 2) rows.push(toWin);

  return { header, rows: rows };
};

// alternative7InningsTotals
export const alternative7InningsTotals = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[936]?.participants) {
    const items: any = Object.entries(data?.odds?.[936]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 3 && title === "Over" && item.is_main == "0") {
        row.push({ title: item.handicap, value: "", suspend: item.suspend });
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 936,
          odd_name: data?.odds?.[936]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 3 && title === "Under" && item.is_main == "0") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 936,
          odd_name: data?.odds?.[936]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length == 3) {
        rows.push(row);
        row = [] as any;
      }
    });
  }
  return rows;
};
// alternative7InningsRunLines
export const alternative7InningsRunLines = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[937]?.participants) {
    const items: any = Object.entries(data?.odds?.[937]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && title === "Home" && item.is_main == "0") {
        row.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 937,
          odd_name: data?.odds?.[937]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 2 && title === "Away" && item.is_main == "0") {
        row.push({
          title: item.handicap,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 937,
          odd_name: data?.odds?.[937]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length == 2) {
        rows.push(row);
        row = [] as any;
      }
    });
  }
  return rows;
};

//bothTeamsToScore
export const bothTeamsToScore = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[561127113]?.participants) {
    const items: any = Object.entries(data?.odds?.[561127113]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 3 && title === "Yes") {
        row.push({ title: item.handicap, value: "", suspend: item.suspend });
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 561127113,
          odd_name: data?.odds?.[561127113]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 3 && title === "No") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 561127113,
          odd_name: data?.odds?.[561127113]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length == 3) {
        rows.push(row);
        row = [] as any;
      }
    });
  }
  return rows;
};
//raceToRuns
export const raceToRuns = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[56112661]?.participants) {
    const items: any = Object.entries(data?.odds?.[56112661]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 4 && title === "Home") {
        row.push({ title: item.handicap, value: "", suspend: item.suspend });
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 56112661,
          odd_name: data?.odds?.[56112661]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Away") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 56112661,
          odd_name: data?.odds?.[56112661]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Neither") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 56112661,
          odd_name: data?.odds?.[56112661]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length == 4) {
        rows.push(row);
        row = [] as any;
      }
    });
  }
  return rows;
};
//leadAfter
export const leadAfter = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[11406301]?.participants) {
    const items: any = Object.entries(data?.odds?.[11406301]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 4 && title === "Home") {
        row.push({ title: item.handicap, value: "", suspend: item.suspend });
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 11406301,
          odd_name: data?.odds?.[11406301]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Away") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 11406301,
          odd_name: data?.odds?.[11406301]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length < 4 && title === "Draw") {
        row.push({
          title: "",
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 11406301,
          odd_name: data?.odds?.[11406301]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row.length == 4) {
        rows.push(row);
        row = [] as any;
      }
    });
  }
  return rows;
};

//extraInnings
export const extraInnings = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[924]?.participants) {
    const items: any = Object.entries(data?.odds?.[924]?.participants);
    if (items.length > 0) {
      items.map((itm: any) => {
        let title = "";
        const item = itm[1];
        title = item?.name;
        if (row.length < 2 && title === "Yes") {
          row.push({
            title: "Yes",
            value: item.value_eu,
            suspend: item.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 924,
            odd_name: data?.odds?.[924]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
        if (row.length < 2 && title === "No") {
          row.push({
            title: "No",
            value: item.value_eu,
            suspend: item.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 924,
            odd_name: data?.odds?.[924]?.name,
            participant_id: item?.id,
            participant_name: item?.name,
            participant_handicap: item?.handicap,
            participant_header: item?.header,
            bet_type: "Live",
            game: "baseball",
          });
        }
      });
      rows.push(row);
    }
  }
  return rows;
};
//monyLinesAndTotal
export const monyLinesAndTotal = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let rows1 = [] as any;
  let rows2 = [] as any;
  let row1 = [] as any;
  let row2 = [] as any;
  if (data?.odds?.[561127115]?.participants) {
    const items: any = Object.entries(data?.odds?.[561127115]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row1.length < 2 && title === "1/o" && item.suspend == "0") {
        row1.push({
          title: `Over ${item.handicap}`,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 561127115,
          odd_name: data?.odds?.[561127115]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row1.length < 2 && title === "1/u" && item.suspend == "0") {
        row1.push({
          title: `Under ${item.handicap}`,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 561127115,
          odd_name: data?.odds?.[561127115]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row1.length == 2) {
        rows1.push(row1);
        row1 = [];
      }
      if (row1.length < 2 && title === "2/o" && item.suspend == "0") {
        row2.push({
          title: `Over ${item.handicap}`,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 561127115,
          odd_name: data?.odds?.[561127115]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row1.length < 2 && title === "2/u" && item.suspend == "0") {
        row2.push({
          title: `Under ${item.handicap}`,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 561127115,
          odd_name: data?.odds?.[561127115]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row2.length == 2) {
        rows2.push(row2);
        row2 = [];
      }
    });
  }
  rows1.sort((a: any, b: any) => {
    if (parseFloat(a[0].value) > parseFloat(b[0].value)) {
      return 1;
    } else {
      return -1;
    }
  });
  rows1.splice(0, Math.floor(rows1.length / 2));
  rows1.splice(1);
  rows2.sort((a: any, b: any) => {
    if (parseFloat(a[0].value) > parseFloat(b[0].value)) {
      return 1;
    } else {
      return -1;
    }
  });
  rows2.splice(0, Math.floor(rows2.length / 2));
  rows2.splice(1);

  for (let i = 0; i < Math.max(rows1.length, rows2.length); i++) {
    let row1 =
      rows1[i] || Array(2).fill({ title: "", value: "", suspend: "0" });
    let row2 =
      rows2[i] || Array(2).fill({ title: "", value: "", suspend: "0" });

    let newRow = [];
    for (let j = 0; j < 2; j++) {
      newRow.push(row1[j]);
    }
    for (let j = 0; j < 2; j++) {
      newRow.push(row2[j]);
    }

    rows.push(newRow);
  }
  return rows;
};
//alternativeMonyLinesAndTotal
export const alternativeMonyLinesAndTotal = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let rows1 = [] as any;
  let rows2 = [] as any;
  let row1 = [] as any;
  let row2 = [] as any;
  if (data?.odds?.[561127115]?.participants) {
    const items: any = Object.entries(data?.odds?.[561127115]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row1.length < 2 && title === "1/o" && item.suspend == "0") {
        row1.push({
          title: `Over ${item.handicap}`,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 561127115,
          odd_name: data?.odds?.[561127115]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row1.length < 2 && title === "1/u" && item.suspend == "0") {
        row1.push({
          title: `Under ${item.handicap}`,
          value: item.value_eu,
          suspend: item.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 561127115,
          odd_name: data?.odds?.[561127115]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row1.length == 2) {
        rows1.push(row1);
        row1 = [];
      }
      if (row1.length < 2 && title === "2/o" && item.suspend == "0") {
        row2.push({
          title: `Over ${item.handicap}`,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 561127115,
          odd_name: data?.odds?.[561127115]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row1.length < 2 && title === "2/u" && item.suspend == "0") {
        row2.push({
          title: `Under ${item.handicap}`,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 561127115,
          odd_name: data?.odds?.[561127115]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
        });
      }
      if (row2.length == 2) {
        rows2.push(row2);
        row2 = [];
      }
    });
  }
  rows1.sort((a: any, b: any) => {
    if (parseFloat(a[0].value) > parseFloat(b[0].value)) {
      return 1;
    } else {
      return -1;
    }
  });
  rows1.splice(Math.floor(rows1.length / 2), 1);
  rows2.sort((a: any, b: any) => {
    if (parseFloat(a[0].value) > parseFloat(b[0].value)) {
      return 1;
    } else {
      return -1;
    }
  });
  rows2.splice(Math.floor(rows2.length / 2), 1);

  for (let i = 0; i < Math.max(rows1.length, rows2.length); i++) {
    let row1 =
      rows1[i] || Array(2).fill({ title: "", value: "", suspend: "0" });
    let row2 =
      rows2[i] || Array(2).fill({ title: "", value: "", suspend: "0" });

    let newRow = [];
    for (let j = 0; j < 2; j++) {
      newRow.push(row1[j]);
    }
    for (let j = 0; j < 2; j++) {
      newRow.push(row2[j]);
    }

    rows.push(newRow);
  }
  return rows;
};
//runLineAndTotal
export const runLineAndTotal = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let rows = [] as any;
  let row = [] as any;
  if (data?.odds?.[562127122]?.participants) {
    const items: any = Object.entries(data?.odds?.[562127122]?.participants);
    items.map((itm: any) => {
      let title = "";
      const item = itm[1];
      title = item?.name;
      if (row.length < 2 && item.suspend == "0") {
        row.push({
          title: title,
          value: item.value_eu,
          suspend: item.suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 562127122,
          odd_name: data?.odds?.[562127122]?.name,
          participant_id: item?.id,
          participant_name: item?.name,
          participant_handicap: item?.handicap,
          participant_header: item?.header,
          bet_type: "Live",
          game: "baseball",
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
