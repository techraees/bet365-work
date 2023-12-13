"use client";

function getOddsByName(event:any, name:any) {
  for (var odd_id in event.odds) {
    var odd_obj = event.odds[odd_id];
    if (odd_obj.value === name) {
      return odd_obj;
    }
  }
  return null;
}
export const gameLines = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;

  let match = data?.odds?.filter((item: any) => item.id === "4");

  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      fmatchWrap.map((fmatchItem: any) => {
        let title = fmatchItem.name;
        if (fmatchItem.ismain === "True") {
          arr.push({ title: "Spread", value: "", suspend: "0" });
          fmatchItem?.odds.map((fod: any, index:any) => {
            if (arr.length >= 3) {
              return;
            }
            const modtitle = `${title}`;
            arr.push({
              title: modtitle,
              value: fod.value,
              suspend: fod.stop === "False" ? "0" : "1",


              event_id: data?.id,
              event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
              odd_id: match[0].id,
              odd_name: match[0].value,
              participant_id: index,
              participant_name: fod.name === "Home" ? data?.localteam?.name : data?.awayteam?.name,
              participant_handicap:modtitle
              
            });
          });
        }
      });
      tosend.push(arr);
    }
  }
  match = data?.odds?.filter((item: any) => item.id === "5");

  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      fmatchWrap.map((fmatchItem: any) => {
        let title = fmatchItem.name;
        if (fmatchItem.ismain === "True") {
          arr.push({ title: "Total", value: "", suspend: "0" });
          fmatchItem?.odds.map((fod: any, index:any) => {
            if (arr.length >= 3) {
              return;
            }
            const modtitle = `${fod.name[0]} ${title}`;
            arr.push({
              title: modtitle,
              value: fod.value,
              suspend: fod.stop === "False" ? "0" : "1",

              event_id: data?.id,
              event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
              odd_id: match[0].id,
              odd_name: match[0].value,
              participant_id: index,
              participant_name: index === 0 ? data?.localteam?.name : data?.awayteam?.name,
              participant_handicap:modtitle
            });
          });
        }
      });
      tosend.push(arr);
    }
  }
  match = data?.odds?.filter((item: any) => item.id === "2");

  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      arr.push({ title: "Money Line", value: "", suspend: "0" });
      fmatchWrap.map((fod: any, index:any) => {
        arr.push({
          title: "",
          value: fod.value,
          suspend: fod.stop === "False" ? "0" : "1",


          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
          odd_id: match[0].id,
          odd_name: match[0].value,
          participant_id: index,
          participant_name: index === 0 ? data?.localteam?.name : data?.awayteam?.name,
        });
      });
      tosend.push(arr);
    }
  }
  return tosend;
};
export const firsthalf = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;

  let match = data?.odds?.filter((item: any) => item.id === "22601");

  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      fmatchWrap.map((fmatchItem: any) => {
        let title = fmatchItem.name;
        if (fmatchItem.ismain === "True") {
          arr.push({ title: "Spread", value: "", suspend: "0" });
          fmatchItem?.odds.map((fod: any, index:any) => {
            if (arr.length >= 3) {
              return;
            }
            const modtitle = `${title}`;
            arr.push({
              title: modtitle,
              value: fod.value,
              suspend: fod.stop === "False" ? "0" : "1",

              event_id: data?.id,
              event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
              odd_id: match[0].id,
              odd_name: match[0].value,
              participant_id: index,
              participant_name: index === 0 ? data?.localteam?.name : data?.awayteam?.name,
              participant_handicap:modtitle
            });
          });
        }
      });
      tosend.push(arr);
    }
  }
  match = data?.odds?.filter((item: any) => item.id === "6");

  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      fmatchWrap.map((fmatchItem: any) => {
        let title = fmatchItem.name;
        if (fmatchItem.ismain === "True") {
          arr.push({ title: "Total", value: "", suspend: "0" });
          fmatchItem?.odds.map((fod: any, index:any) => {
            if (arr.length >= 3) {
              return;
            }
            const modtitle = `${fod.name[0]} ${title}`;
            arr.push({
              title: modtitle,
              value: fod.value,
              suspend: fod.stop === "False" ? "0" : "1",


              event_id: data?.id,
              event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
              odd_id: match[0].id,
              odd_name: match[0].value,
              participant_id: index,
              participant_name: index === 0 ? data?.localteam?.name : data?.awayteam?.name,
              participant_handicap:modtitle

            });
          });
        }
      });
      tosend.push(arr);
    }
  }
  match = data?.odds?.filter((item: any) => item.id === "22678");

  if (match && match.length > 0) {
    const fmatchWrap = match[0]?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      arr.push({ title: "Money Line", value: "", suspend: "0" });
      fmatchWrap.map((fod: any, index:any) => {
        arr.push({
          title: "",
          value: fod.value,
          suspend: fod.stop === "False" ? "0" : "1",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
          odd_id: match[0].id,
          odd_name: match[0].value,
          participant_id: index,
          participant_name: index === 0 ? data?.localteam?.name : data?.awayteam?.name,
        });
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const firstQ = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  let match = getOddsByName(data, "Asian Handicap 1st Qtr");
  if (match !== null) {
    const fmatchWrap = match?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      fmatchWrap.map((fmatchItem: any) => {
        let title = fmatchItem.name;
        if (fmatchItem.ismain === "True") {
          arr.push({ title: "Spread", value: "", suspend: "0" });
          fmatchItem?.odds.map((fod: any, index:any) => {
            if (arr.length >= 3) {
              return;
            }
            const modtitle = `${title}`;
            arr.push({
              title: modtitle,
              value: fod.value,
              suspend: fod.stop === "False" ? "0" : "1",

              event_id: data?.id,
              event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
              odd_id: match.id,
              odd_name: match.value,
              participant_id: index,
              participant_name: index === 0 ? data?.localteam?.name : data?.awayteam?.name,
              participant_handicap: modtitle
            });
          });
        }
      });
      tosend.push(arr);
    }
  }
  match = getOddsByName(data, "Over/Under 1st Qtr");
  //match = data?.odds?.filter((item: any) => item.id === "22646");

  if (match) {
    const fmatchWrap = match?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      fmatchWrap.map((fmatchItem: any) => {
        let title = fmatchItem.name;
        if (fmatchItem.ismain === "True") {
          arr.push({ title: "Total", value: "", suspend: "0" });
          fmatchItem?.odds.map((fod: any, index:any) => {
            if (arr.length >= 3) {
              return;
            }
            const modtitle = `${fod.name[0]} ${title}`;
            arr.push({
              title: modtitle,
              value: fod.value,
              suspend: fod.stop === "False" ? "0" : "1",

              event_id: data?.id,
              event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
              odd_id: match.id,
              odd_name: match.value,
              participant_id: index,
              participant_name: index === 0 ? data?.localteam?.name : data?.awayteam?.name,
              participant_handicap: modtitle
            });
          });
        }
      });
      tosend.push(arr);
    }
  }
  match = getOddsByName(data, "Home/Away - 1st Qtr");
  //match = data?.odds?.filter((item: any) => item.id === "22680");

  if (match !== null) {
    const fmatchWrap = match?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      arr.push({ title: "Money Line", value: "", suspend: "0" });
      fmatchWrap.map((fod: any, index:any) => {
        arr.push({
          title: "",
          value: fod.value,
          suspend: fod.stop === "False" ? "0" : "1",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
          odd_id: match.id,
          odd_name: match.value,
          participant_id: index,
          participant_name: fod.name === "Home" ? data?.localteam?.name : data?.awayteam?.name,
        });
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const secondQ = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  let match = getOddsByName(data, "Asian Handicap 2nd Qtr");
  if (match !== null) {
    const fmatchWrap = match?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      fmatchWrap.map((fmatchItem: any) => {
        let title = fmatchItem.name;
        if (fmatchItem.ismain === "True") {
          arr.push({ title: "Spread", value: "", suspend: "0" });
          fmatchItem?.odds.map((fod: any, index:any) => {
            if (arr.length >= 3) {
              return;
            }
            const modtitle = `${title}`;
            arr.push({
              title: modtitle,
              value: fod.value,
              suspend: fod.stop === "False" ? "0" : "1",

              event_id: data?.id,
              event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
              odd_id: match.id,
              odd_name: match.value,
              participant_id: index,
              participant_name: fod.name === "Home" ? data?.localteam?.name : data?.awayteam?.name,
              participant_handicap:modtitle
            });
          });
        }
      });
      tosend.push(arr);
    }
  }
  match = getOddsByName(data, "Over/Under 2nd Qtr");
  //match = data?.odds?.filter((item: any) => item.id === "22646");

  if (match) {
    const fmatchWrap = match?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      fmatchWrap.map((fmatchItem: any) => {
        let title = fmatchItem.name;
        if (fmatchItem.ismain === "True") {
          arr.push({ title: "Total", value: "", suspend: "0" });
          fmatchItem?.odds.map((fod: any, index:any) => {
            if (arr.length >= 3) {
              return;
            }
            const modtitle = `${fod.name[0]} ${title}`;
            arr.push({
              title: modtitle,
              value: fod.value,
              suspend: fod.stop === "False" ? "0" : "1",

              event_id: data?.id,
              event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
              odd_id: match.id,
              odd_name: match.value,
              participant_id: index,
              participant_name: match.value,
              participant_handicap:modtitle
            });
          });
        }
      });
      tosend.push(arr);
    }
  }
  match = getOddsByName(data, "Home/Away - 2nd Qtr");
  //match = data?.odds?.filter((item: any) => item.id === "22680");

  if (match !== null) {
    const fmatchWrap = match?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      arr.push({ title: "Money Line", value: "", suspend: "0" });
      fmatchWrap.map((fod: any, index:any) => {
        arr.push({
          title: "",
          value: fod.value,
          suspend: fod.stop === "False" ? "0" : "1",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
          odd_id: match.id,
          odd_name: match.value,
          participant_id: index,
          participant_name: match.value,
              
        });
      });
      tosend.push(arr);
    }
  }
  return tosend;
};

export const thirdQ = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  const tosend = [] as any;
  let match = getOddsByName(data, "Asian Handicap (3rd Quarter)");
  if (match !== null) {
    const fmatchWrap = match?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      fmatchWrap.map((fmatchItem: any) => {
        let title = fmatchItem.name;
        if (fmatchItem.ismain === "True") {
          arr.push({ title: "Spread", value: "", suspend: "0" });
          fmatchItem?.odds.map((fod: any, index:any) => {
            if (arr.length >= 3) {
              return;
            }
            const modtitle = `${title}`;
            arr.push({
              title: modtitle,
              value: fod.value,
              suspend: fod.stop === "False" ? "0" : "1",

              event_id: data?.id,
              event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
              odd_id: match.id,
              odd_name: match.value,
              participant_id: index,
              participant_name: match.value,
              participant_handicap: modtitle
            });
          });
        }
      });
      tosend.push(arr);
    }
  }
  match = getOddsByName(data, "Over/Under 3rd Qtr");
  //match = data?.odds?.filter((item: any) => item.id === "22646");

  if (match) {
    const fmatchWrap = match?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      fmatchWrap.map((fmatchItem: any) => {
        let title = fmatchItem.name;
        if (fmatchItem.ismain === "True") {
          arr.push({ title: "Total", value: "", suspend: "0" });
          fmatchItem?.odds.map((fod: any, index:any) => {
            if (arr.length >= 3) {
              return;
            }
            const modtitle = `${fod.name[0]} ${title}`;
            arr.push({
              title: modtitle,
              value: fod.value,
              suspend: fod.stop === "False" ? "0" : "1",

              event_id: data?.id,
              event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
              odd_id: match[0].id,
              odd_name: match[0].value,
              participant_id: index,
              participant_name: match[0].value,
              participant_handicap: modtitle

            });
          });
        }
      });
      tosend.push(arr);
    }
  }
  match = getOddsByName(data, "Home/Away - 2nd Qtr");
  //match = data?.odds?.filter((item: any) => item.id === "22680");

  if (match !== null) {
    const fmatchWrap = match?.bookmakers[0].odds;
    if (fmatchWrap && fmatchWrap.length > 0) {
      const arr = [] as any;
      arr.push({ title: "Money Line", value: "", suspend: "0" });
      fmatchWrap.map((fod: any, index:any) => {
        arr.push({
          title: "",
          value: fod.value,
          suspend: fod.stop === "False" ? "0" : "1",

          event_id: data?.id,
          event_name: data?.localteam?.name + " vs " + data?.awayteam?.name,
          odd_id: match[0].id,
          odd_name: match[0].value,
          participant_id: index,
          participant_name: match[0].value,
        });
      });
      tosend.push(arr);
    }
  }
  return tosend;
};
