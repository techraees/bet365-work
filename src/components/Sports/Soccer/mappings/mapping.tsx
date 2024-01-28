"use client";
import React from "react";

export const fulltimeResult = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  if (data?.odds?.[1777]?.participants) {
    const spread = Object.entries(data?.odds?.[1777]?.participants);
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

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 1777,
          odd_name: data?.odds?.[1777]?.name,
          participant_id: item[1].id,
          participant_name: item[1].name,
          participant_handicap: item[1].handicap ?? "",
          participant_header: item[1].header ?? "",
        });
      });
      tosend.push(arr);
    }
  }
  console.log({ arriba: tosend });
  console.log("Sending New Data", data);
  return tosend;
};
export const doubleChance = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  if (data?.odds?.[10115]?.participants) {
    const spread = Object.entries(data?.odds?.[10115]?.participants);
    if (spread.length > 0) {
      const arr = [] as any;
      spread.map((item: any, index: number) => {
        let title = "";
        let value = "";
        let suspend = "0";
        title = item[1]?.name;
        if (title === "Home or Draw") {
          title = `${data?.team_info?.home?.name} or Draw`;
        }
        if (title === "Away or Draw") {
          title = `${data?.team_info?.away?.name} or Draw`;
        }
        if (title === "Home or Away") {
          title = `${data?.team_info?.home?.name} or ${data?.team_info?.away?.name}`;
        }
        value = item[1]?.value_eu;
        suspend = item[1]?.suspend;
        arr.push({
          title: title,
          value: value,
          suspend: suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 10115,
          odd_name: data?.odds?.[10115]?.name,
          participant_id: item[1].id,
          participant_name: item[1].name,
          participant_handicap: item[1].handicap ?? "",
          participant_header: item[1].header ?? "",
        });
      });
      tosend.push(arr);
    }
  }
  console.log("Sending New Data", data);
  return tosend;
};

export const halfTimeResult = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  if (data?.odds?.[27]?.participants) {
    const spread = Object.entries(data?.odds?.[27]?.participants);
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

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 27,
          odd_name: data?.odds?.[27]?.name,
          participant_id: item[1].id,
          participant_name: item[1].name,
          participant_handicap: item[1].handicap ?? "",
          participant_header: item[1].header ?? "",
        });
      });
      tosend.push(arr);
    }
  }
  console.log("Sending New Data", data);
  return tosend;
};

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
        var odd_id = item;
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

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: item[1].id,
            participant_name: item[1].name,
            participant_handicap: item[1].handicap ?? "",
            participant_header: item[1].header ?? "",
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
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 421,
          odd_name: data?.odds?.[421]?.name,
          participant_id: data?.odds?.[421]?.participants[key].id,
          participant_name: data?.odds?.[421]?.name,
          participant_handicap: data?.odds?.[421]?.handicap ?? "",
          participant_header: data?.odds?.[421]?.header ?? "",
        });
      }
      arr.push({
        title: "",
        value: data?.odds?.[421]?.participants[key].value_eu,
        suspend: data?.odds?.[421]?.participants[key].suspend,

        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: 421,
        odd_name: data?.odds?.[421]?.name,
        participant_id: data?.odds?.[421]?.participants[key].id,
        participant_name: data?.odds?.[421]?.name,
        participant_handicap: data?.odds?.[421]?.handicap ?? "",
        participant_header: data?.odds?.[421]?.header ?? "",
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
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 421,
            odd_name: data?.odds?.[421]?.name,
            participant_id: participant.id,
            participant_name: participant.name,
            participant_handicap: participant.handicap,
            participant_header: participant.header,
          });
        } else {
          acc.push([
            {
              title: participant.handicap,
              value: null,
              suspend: participant.suspend,
              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: 421,
              odd_name: data?.odds?.[421]?.name,
              participant_id: participant.id,
              participant_name: participant.name,
              participant_handicap: participant.handicap,
              participant_header: participant.header,
            },
            {
              title: "",
              value: participant.value_eu,
              suspend: participant.suspend,

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: 421,
              odd_name: data?.odds?.[421]?.name,
              participant_id: participant.id,
              participant_name: participant.name,
              participant_handicap: participant.handicap,
              participant_header: participant.header,
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
  return tosend;
};

export const asianHandicap = (data: any, oddData: any) => {
  if (!data && !data.odds) {
    return [];
  }
  oddData.suspend = data.odds[12]?.suspend;

  let score = `(${data?.team_info?.home?.score} - ${data?.team_info?.away?.score})`;

  const tosend = [] as any;
  if (data?.odds?.[12]?.participants) {
    const spread = Object.entries(data?.odds?.[12]?.participants);
    if (spread.length > 0) {
      let existing = [] as any;
      spread.forEach(([key, value]: [any, any]) => {
        existing.push({
          title: value.handicap,
          value: value.value_eu,
          suspend: value.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 12,
          odd_name: data?.odds?.[12]?.name,
          participant_id: value.id,
          participant_name: value.name,
          participant_handicap: value.handicap,
          participant_header: value.header,
        });
        if (existing.length == 2) {
          tosend.push(existing);
          existing = [];
        }
      });
    }
  }

  oddData.marketname = `Asian Handicap ${score}`;
  oddData.rows = tosend;
  return oddData;
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
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 11,
          odd_name: data?.odds?.[11]?.name,
          participant_id: value.id,
          participant_name: value.name,
          participant_handicap: value.handicap,
          participant_header: value.header,
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
export const goalOddEven = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  if (data?.odds?.[10562]?.participants) {
    const spread = Object.entries(data?.odds?.[10562]?.participants);
    if (spread.length > 0) {
      const arr = [] as any;
      spread.map((item: any, index: number) => {
        let title = "";
        let value = "";
        let suspend = "0";
        title = item[1]?.name;
        value = item[1]?.value_eu;
        suspend = item[1]?.suspend;
        arr.push({
          title: title,
          value: value,
          suspend: suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 10562,
          odd_name: data?.odds?.[10562]?.name,
          participant_id: item[1].id,
          participant_name: item[1].name,
          participant_handicap: item[1].handicap,
          participant_header: item[1].header,
        });
      });
      tosend.push(arr);
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

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 50246,
          odd_name: data?.odds?.[50246]?.name,
          participant_id: item[1].id,
          participant_name: item[1].name,
          participant_handicap: item[1].handicap,
          participant_header: item[1].header,
        });
      });
      tosend.push(arr);
    }
  }
  console.log("Sending New Data", data);
  return tosend;
};

export const drawNoBet = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  if (data?.odds?.[10563]?.participants) {
    const spread = Object.entries(data?.odds?.[10563]?.participants);
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

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 10563,
          odd_name: data?.odds?.[10563]?.name,
          participant_id: item[1].id,
          participant_name: item[1].name,
          participant_handicap: item[1].handicap,
          participant_header: item[1].header,
        });
      });
      tosend.push(arr);
    }
  }
  console.log("Sending New Data", data);
  return tosend;
};

export const lastTeamToScore = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  if (data?.odds?.[44]?.participants) {
    const spread = Object.entries(data?.odds?.[44]?.participants);
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

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 44,
          odd_name: data?.odds?.[44]?.name,
          participant_id: item[1].id,
          participant_name: item[1].name,
          participant_handicap: item[1].handicap,
          participant_header: item[1].header,
        });
      });
      tosend.push(arr);
    }
  }
  console.log("Sending New Data", data);
  return tosend;
};

export const firstHalfGoals = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  if (data?.odds?.[31]?.participants) {
    const participantsObject = data?.odds?.[31]?.participants;
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
              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: 31,
              odd_name: data?.odds?.[31]?.name,
              participant_id: participant.id,
              participant_name: participant.name,
              participant_handicap: participant.handicap,
              participant_header: participant.header,
            });
          } else {
            acc.push([
              {
                title: participant.handicap,
                value: null,
                suspend: participant.suspend,

                event_id: data?.info?.id,
                event_name:
                  data?.team_info?.home?.name +
                  " vs " +
                  data?.team_info?.away?.name,
                odd_id: 31,
                odd_name: data?.odds?.[31]?.name,
                participant_id: participant.id,
                participant_name: participant.name,
                participant_handicap: participant.handicap,
                participant_header: participant.header,
              },
              {
                title: "",
                value: participant.value_eu,
                suspend: participant.suspend,

                event_id: data?.info?.id,
                event_name:
                  data?.team_info?.home?.name +
                  " vs " +
                  data?.team_info?.away?.name,
                odd_id: 31,
                odd_name: data?.odds?.[31]?.name,
                participant_id: participant.id,
                participant_name: participant.name,
                participant_handicap: participant.handicap,
                participant_header: participant.header,
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
  return tosend;
};

export const goalLine = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  if (data?.odds?.[90008]?.participants) {
    const participantsObject = data?.odds?.[90008]?.participants;
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

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: 90008,
              odd_name: data?.odds?.[90008]?.name,
              participant_id: participant.id,
              participant_name: participant.name,
              participant_handicap: participant.handicap,
              participant_header: participant.header,
            });
          } else {
            acc.push([
              {
                title: participant.handicap,
                value: null,
                suspend: participant.suspend,
                event_id: data?.info?.id,
                event_name:
                  data?.team_info?.home?.name +
                  " vs " +
                  data?.team_info?.away?.name,
                odd_id: 90008,
                odd_name: data?.odds?.[90008]?.name,
                participant_id: participant.id,
                participant_name: participant.name,
                participant_handicap: participant.handicap,
                participant_header: participant.header,
              },
              {
                title: "",
                value: participant.value_eu,
                suspend: participant.suspend,
                event_id: data?.info?.id,
                event_name:
                  data?.team_info?.home?.name +
                  " vs " +
                  data?.team_info?.away?.name,
                odd_id: 90008,
                odd_name: data?.odds?.[90008]?.name,
                participant_id: participant.id,
                participant_name: participant.name,
                participant_handicap: participant.handicap,
                participant_header: participant.header,
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
      let checkingData =
        data?.odds?.[10001]?.participants[item]?.name.split("-");
      checkingData[0] = Number(checkingData[0]);
      checkingData[1] = Number(checkingData[1]);
      if (data?.odds?.[10001]?.participants[item]?.suspend === "0") {
        if (checkingData[0] > checkingData[1]) {
          left.push({
            title: data?.odds?.[10001]?.participants[item]?.name,
            value: data?.odds?.[10001]?.participants[item]?.value_eu,
            suspend: data?.odds?.[10001]?.participants[item]?.suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 10001,
            odd_name: data?.odds?.[10001]?.name,
            participant_id: data?.odds?.[10001]?.participants[item].id,
            participant_name: data?.odds?.[10001]?.participants[item].name,
            participant_handicap:
              data?.odds?.[10001]?.participants[item].handicap,
            participant_header: data?.odds?.[10001]?.participants[item].header,
          });
        } else if (checkingData[0] === checkingData[1]) {
          middle.push({
            title: data?.odds?.[10001]?.participants[item]?.name,
            value: data?.odds?.[10001]?.participants[item]?.value_eu,
            suspend: data?.odds?.[10001]?.participants[item]?.suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 10001,
            odd_name: data?.odds?.[10001]?.name,
            participant_id: data?.odds?.[10001]?.participants[item].id,
            participant_name: data?.odds?.[10001]?.participants[item].name,
            participant_handicap:
              data?.odds?.[10001]?.participants[item].handicap,
            participant_header: data?.odds?.[10001]?.participants[item].header,
          });
        } else {
          right.push({
            title: data?.odds?.[10001]?.participants[item]?.name,
            value: data?.odds?.[10001]?.participants[item]?.value_eu,
            suspend: data?.odds?.[10001]?.participants[item]?.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 10001,
            odd_name: data?.odds?.[10001]?.name,
            participant_id: data?.odds?.[10001]?.participants[item].id,
            participant_name: data?.odds?.[10001]?.participants[item].name,
            participant_handicap:
              data?.odds?.[10001]?.participants[item].handicap,
            participant_header: data?.odds?.[10001]?.participants[item].header,
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

export const halfTimeCorrectScore = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let tosend = [] as any;

  if (data?.odds?.[227]?.participants) {
    const result = [] as any;
    const left = [] as any;
    const middle = [] as any;
    const right = [] as any;
    Object.keys(data?.odds?.[227]?.participants).map((item) => {
      let checkingData = data?.odds?.[227]?.participants[item]?.name.split("-");
      checkingData[0] = Number(checkingData[0]);
      checkingData[1] = Number(checkingData[1]);
      if (data?.odds?.[227]?.participants[item]?.suspend === "0") {
        if (checkingData[0] > checkingData[1]) {
          left.push({
            title: data?.odds?.[227]?.participants[item]?.name,
            value: data?.odds?.[227]?.participants[item]?.value_eu,
            suspend: data?.odds?.[227]?.participants[item]?.suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 227,
            odd_name: data?.odds?.[227]?.name,
            participant_id: data?.odds?.[227]?.participants[item].id,
            participant_name: data?.odds?.[227]?.participants[item].name,
            participant_handicap:
              data?.odds?.[227]?.participants[item].handicap,
            participant_header: data?.odds?.[227]?.participants[item].header,
          });
        } else if (checkingData[0] === checkingData[1]) {
          middle.push({
            title: data?.odds?.[227]?.participants[item]?.name,
            value: data?.odds?.[227]?.participants[item]?.value_eu,
            suspend: data?.odds?.[227]?.participants[item]?.suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 227,
            odd_name: data?.odds?.[227]?.name,
            participant_id: data?.odds?.[227]?.participants[item].id,
            participant_name: data?.odds?.[227]?.participants[item].name,
            participant_handicap:
              data?.odds?.[227]?.participants[item].handicap,
            participant_header: data?.odds?.[227]?.participants[item].header,
          });
        } else {
          right.push({
            title: data?.odds?.[227]?.participants[item]?.name,
            value: data?.odds?.[227]?.participants[item]?.value_eu,
            suspend: data?.odds?.[227]?.participants[item]?.suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 227,
            odd_name: data?.odds?.[227]?.name,
            participant_id: data?.odds?.[227]?.participants[item].id,
            participant_name: data?.odds?.[227]?.participants[item].name,
            participant_handicap:
              data?.odds?.[227]?.participants[item].handicap,
            participant_header: data?.odds?.[227]?.participants[item].header,
          });
        }
      }
    });
    // console.log({ left: left, middle: middle, right: right })
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

export const halfTimeFullTime = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }
  let tosend = [] as any;
  if (data?.odds?.[226]?.participants) {
    let result = [] as any;
    Object.keys(data?.odds?.[226]?.participants).map((item) => {
      let title = data?.odds?.[226]?.participants[item]?.name;
      title = title.replace("1", data?.team_info?.home?.name);
      title = title.replace("X", "Draw");
      title = title.replace("2", data?.team_info?.away?.name);
      title = title.replace("/", " - ");
      const value = data?.odds?.[226]?.participants[item]?.value_eu;
      const suspend = data?.odds?.[226]?.participants[item]?.suspend;

      result.push({
        title: title,
        value: value,
        suspend: suspend,
        event_id: data?.info?.id,
        event_name:
          data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
        odd_id: 227,
        odd_name: data?.odds?.[226]?.name,
        participant_id: data?.odds?.[226]?.participants[item].id,
        participant_name: data?.odds?.[226]?.participants[item].name,
        participant_handicap: data?.odds?.[226]?.participants[item].handicap,
        participant_header: data?.odds?.[226]?.participants[item].header,
      });
      if (result.length === 3) {
        tosend.push(result);
        result = [];
      }
    });
  }

  return tosend;
};

export const firstHalfAsianHandicap = (data: any, oddData: any) => {
  if (!data && !data.odds) {
    return [];
  }
  oddData.suspend = data.odds[29]?.suspend;

  let score = `(${data?.team_info?.home?.score} - ${data?.team_info?.away?.score})`;

  const tosend = [] as any;
  if (data?.odds?.[29]?.participants) {
    const spread = Object.entries(data?.odds?.[29]?.participants);
    if (spread.length > 0) {
      let existing = [] as any;
      spread.forEach(([key, value]: [any, any]) => {
        existing.push({
          title: value.handicap,
          value: value.value_eu,
          suspend: value.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 29,
          odd_name: data?.odds?.[29]?.name,
          participant_id: value.id,
          participant_name: value.name,
          participant_handicap: value.handicap,
          participant_header: value.header,
        });
        if (existing.length == 2) {
          tosend.push(existing);
          existing = [];
        }
      });
    }
  }

  oddData.marketname = `1st Half Asian Handicap ${score}`;
  oddData.rows = tosend;
  return oddData;
};

export const firstHalfGoalLine = (data: any, oddData: any) => {
  if (!data && !data.odds) {
    return [];
  }
  oddData.suspend = data.odds[31]?.suspend;

  let score = `(${data?.team_info?.home?.score} - ${data?.team_info?.away?.score})`;

  const tosend = [] as any;
  if (data?.odds?.[31]?.participants) {
    const spread = Object.entries(data?.odds?.[31]?.participants);
    if (spread.length > 0) {
      let existing = [] as any;
      spread.forEach(([key, value]: [any, any]) => {
        if (existing.length == 0) {
          existing.push({
            title: value.handicap,
            value: "",
            suspend: value.suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 31,
            odd_name: data?.odds?.[31]?.name,
            participant_id: value.id,
            participant_name: value.name,
            participant_handicap: value.handicap,
            participant_header: value.header,
          });
        }
        existing.push({
          title: "",
          value: value.value_eu,
          suspend: value.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 31,
          odd_name: data?.odds?.[31]?.name,
          participant_id: value.id,
          participant_name: value.name,
          participant_handicap: value.handicap,
          participant_header: value.header,
        });
        if (existing.length == 3) {
          tosend.push(existing);
          existing = [];
        }
      });
    }
  }

  oddData.marketname = `1st Half Goal Line ${score}`;
  oddData.rows = tosend;
  return oddData;
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
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 2000,
          odd_name: data?.odds?.[2000]?.name,
          participant_id: value.id,
          participant_name: value.name,
          participant_handicap: value.handicap,
          participant_header: value.header,
        });
        if (existing.length == 3) {
          tosend.push(existing);
          existing = [];
        }
      });
    }
  }
  return tosend;
};

export const resultBothTeamsToScore = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let tosend = [] as any;
  if (data?.odds?.[50461]?.participants) {
    const spread = Object.entries(data?.odds?.[50461]?.participants);
    if (spread.length > 0) {
      let home = [
        { title: data?.team_info?.home?.name, value: null, suspend: null },
      ] as any;
      let away = [
        { title: data?.team_info?.away?.name, value: null, suspend: null },
      ] as any;
      let draw = [{ title: "Draw", value: null, suspend: null }] as any;
      spread.forEach(([key, value]: [any, any]) => {
        if (value.name === "Home/Yes") {
          home.push({
            title: "",
            value: value.value_eu,
            suspend: value.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 50461,
            odd_name: data?.odds?.[50461]?.name,
            participant_id: value.id,
            participant_name: value.name,
            participant_handicap: value.handicap,
            participant_header: value.header,
          });
        }
        if (value.name === "Away/Yes") {
          away.push({
            title: "",
            value: value.value_eu,
            suspend: value.suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 50461,
            odd_name: data?.odds?.[50461]?.name,
            participant_id: value.id,
            participant_name: value.name,
            participant_handicap: value.handicap,
            participant_header: value.header,
          });
        }
        if (value.name === "Draw/Yes") {
          draw.push({
            title: "",
            value: value.value_eu,
            suspend: value.suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 50461,
            odd_name: data?.odds?.[50461]?.name,
            participant_id: value.id,
            participant_name: value.name,
            participant_handicap: value.handicap,
            participant_header: value.header,
          });
        }
      });
      spread.forEach(([key, value]: [any, any]) => {
        if (value.name === "Home/No") {
          home.push({
            title: "",
            value: value.value_eu,
            suspend: value.suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 50461,
            odd_name: data?.odds?.[50461]?.name,
            participant_id: value.id,
            participant_name: value.name,
            participant_handicap: value.handicap,
            participant_header: value.header,
          });
        }
        if (value.name === "Away/No") {
          away.push({
            title: "",
            value: value.value_eu,
            suspend: value.suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 50461,
            odd_name: data?.odds?.[50461]?.name,
            participant_id: value.id,
            participant_name: value.name,
            participant_handicap: value.handicap,
            participant_header: value.header,
          });
        }
        if (value.name === "Draw/No") {
          draw.push({
            title: "",
            value: value.value_eu,
            suspend: value.suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 50461,
            odd_name: data?.odds?.[50461]?.name,
            participant_id: value.id,
            participant_name: value.name,
            participant_handicap: value.handicap,
            participant_header: value.header,
          });
        }
      });
      tosend = [home, away, draw];
    }
  }
  return tosend;
};

export const bothTeamsToScore = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  let tosend = [] as any;
  if (data?.odds?.[10565]?.participants) {
    const spread = Object.entries(data?.odds?.[10565]?.participants);

    if (spread.length > 0) {
      const arr = [] as any;
      spread.map((item: any, index: number) => {
        let title = "";
        let value = "";
        let suspend = "0";
        title = item[1]?.name;
        value = item[1]?.value_eu;
        suspend = item[1]?.suspend;
        arr.push({
          title: title,
          value: value,
          suspend: suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 10565,
          odd_name: data?.odds?.[10565]?.name,
          participant_id: item[1]?.id,
          participant_name: item[1]?.name,
          participant_handicap: item[1]?.handicap,
          participant_header: item[1]?.header,
        });
      });
      tosend.push(arr);
    }
  }
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

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: 90006,
              odd_name: data?.odds?.[90006]?.name,
              participant_id: participant?.id,
              participant_name: participant?.name,
              participant_handicap: participant?.handicap,
              participant_header: participant?.header,
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
                event_id: data?.info?.id,
                event_name:
                  data?.team_info?.home?.name +
                  " vs " +
                  data?.team_info?.away?.name,
                odd_id: 90006,
                odd_name: data?.odds?.[90006]?.name,
                participant_id: participant?.id,
                participant_name: participant?.name,
                participant_handicap: participant?.handicap,
                participant_header: participant?.header,
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
              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: 906,
              odd_name: data?.odds?.[906]?.name,
              participant_id: participant?.id,
              participant_name: participant?.name,
              participant_handicap: participant?.handicap,
              participant_header: participant?.header,
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

                event_id: data?.info?.id,
                event_name:
                  data?.team_info?.home?.name +
                  " vs " +
                  data?.team_info?.away?.name,
                odd_id: 906,
                odd_name: data?.odds?.[906]?.name,
                participant_id: participant?.id,
                participant_name: participant?.name,
                participant_handicap: participant?.handicap,
                participant_header: participant?.header,
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
      const odd_id = item;
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

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
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
      const odd_id = item;
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

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[odd_id]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
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

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: odd_id,
            odd_name: data?.odds?.[item]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
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

export const matchCorners = (data: any, oddData: any) => {
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
            title: value.handicap,
            value: "",
            suspend: value.suspend,
          });
        }
        existing.push({
          title: "",
          value: value.value_eu,
          suspend: value.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 16,
          odd_name: data?.odds?.[16]?.name,
          participant_id: value?.id,
          participant_name: value?.name,
          participant_handicap: value?.handicap,
          participant_header: value?.header,
        });
        if (existing.length == 4) {
          tosend.push(existing);
          existing = [];
        }
      });
    }
  }
  tosend.sort((a: any, b: any) => a[0].title - b[0].title);
  oddData.rows = tosend;
  data &&
    Object.keys(data?.stats).map((item) => {
      if (data.stats[item].name === "ICorner") {
        console.log("ICORNER");
        oddData.currentCorners =
          Number(data.stats[item].home) + Number(data.stats[item].away);
      }
    });
  return oddData;
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

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 520,
            odd_name: data?.odds?.[520]?.name,
            participant_id: value?.id,
            participant_name: value?.name,
            participant_handicap: value?.handicap,
            participant_header: value?.header,
          });
        }
        existing.push({
          title: "",
          value: value.value_eu,
          suspend: value.suspend,
          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 520,
          odd_name: data?.odds?.[520]?.name,
          participant_id: value?.id,
          participant_name: value?.name,
          participant_handicap: value?.handicap,
          participant_header: value?.header,
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

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 93005,
          odd_name: data?.odds?.[93005]?.name,
          participant_id: item[1]?.id,
          participant_name: item[1]?.name,
          participant_handicap: item[1]?.handicap,
          participant_header: item[1]?.header,
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

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: id,
          odd_name: data?.odds?.[id]?.name,
          participant_id: item[1]?.id,
          participant_name: item[1]?.name,
          participant_handicap: item[1]?.handicap,
          participant_header: item[1]?.header,
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

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: id,
              odd_name: data?.odds?.[id]?.name,
              participant_id: participant.id,
              participant_name: participant?.name,
              participant_handicap: participant?.handicap,
              participant_header: participant?.header,
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
                event_id: data?.info?.id,
                event_name:
                  data?.team_info?.home?.name +
                  " vs " +
                  data?.team_info?.away?.name,
                odd_id: id,
                odd_name: data?.odds?.[id]?.name,
                participant_id: participant.id,
                participant_name: participant?.name,
                participant_handicap: participant?.handicap,
                participant_header: participant?.header,
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

export const betResult = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  if (data?.odds?.[1777]?.participants) {
    const participantsObject = data?.odds?.[1777]?.participants;
    if (participantsObject) {
      const spread = Object.entries(participantsObject);
      if (spread.length > 0) {
        let existing = [{ title: "Match", value: null, suspend: "0" }] as any;
        spread.forEach(([key, value]: [any, any]) => {
          existing.push({
            title: "",
            value: value.value_eu,
            suspend: value.suspend,
            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 1777,
            odd_name: data?.odds?.[1777]?.name,
            participant_id: value?.id,
            participant_name: value?.name,
            participant_handicap: value?.handicap,
            participant_header: value?.header,
          });
        });
        tosend.push(existing);
      }
    }
  }
  if (data?.odds) {
    let array = [] as any;
    Object.keys(data?.odds).map((item) => {
      if (
        data.odds[item].name.startsWith("1x2 - ") &&
        data.odds[item].name.includes(" minutes")
      ) {
        let minute = data.odds[item].name.replace("1x2 - ", "");
        minute = minute.replace(" minutes", "");
        minute = minute + " Minute";
        const spread = Object.entries(data?.odds?.[item]?.participants);
        const arr = [
          { title: minute, value: null, suspend: data.odds[item].suspend },
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

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: item,
            odd_name: data?.odds?.[item]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
          });
        });
        array.push(arr);
      }
    });
    array.sort(
      (a: any, b: any) =>
        Number(a[0].title.substring(0, 2)) - Number(b[0].title.substring(0, 2))
    );
    tosend.push(...array);
  }

  return tosend;
};

export const betBothTeamsToScore = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  if (data?.odds?.[10565]?.participants) {
    const participantsObject = data?.odds?.[10565]?.participants;
    if (participantsObject) {
      const spread = Object.entries(participantsObject);
      if (spread.length > 0) {
        let existing = [{ title: "Match", value: null, suspend: "0" }] as any;
        spread.forEach(([key, value]: [any, any]) => {
          existing.push({
            title: "",
            value: value.value_eu,
            suspend: value.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 10565,
            odd_name: data?.odds?.[10565]?.name,
            participant_id: value?.id,
            participant_name: value?.name,
            participant_handicap: value?.handicap,
            participant_header: value?.header,
          });
        });
        tosend.push(existing);
      }
    }
  }
  if (data?.odds?.[317]?.participants) {
    const participantsObject = data?.odds?.[317]?.participants;
    if (participantsObject) {
      const spread = Object.entries(participantsObject);
      if (spread.length > 0) {
        let existing = [
          { title: "1st Half", value: null, suspend: "0" },
        ] as any;
        spread.forEach(([key, value]: [any, any]) => {
          existing.push({
            title: "",
            value: value.value_eu,
            suspend: value.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 317,
            odd_name: data?.odds?.[317]?.name,
            participant_id: value?.id,
            participant_name: value?.name,
            participant_handicap: value?.handicap,
            participant_header: value?.header,
          });
        });
        tosend.push(existing);
      }
    }
  }
  if (data?.odds?.[318]?.participants) {
    const participantsObject = data?.odds?.[318]?.participants;
    if (participantsObject) {
      const spread = Object.entries(participantsObject);
      if (spread.length > 0) {
        let existing = [
          { title: "2nd Half", value: null, suspend: "0" },
        ] as any;
        spread.forEach(([key, value]: [any, any]) => {
          existing.push({
            title: "",
            value: value.value_eu,
            suspend: value.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 318,
            odd_name: data?.odds?.[318]?.name,
            participant_id: value?.id,
            participant_name: value?.name,
            participant_handicap: value?.handicap,
            participant_header: value?.header,
          });
        });
        tosend.push(existing);
      }
    }
  }

  return tosend;
};

export const betDoubleChance = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  if (data?.odds?.[10115]?.participants) {
    const spread = Object.entries(data?.odds?.[10115]?.participants);
    if (spread.length > 0) {
      spread.map((item: any, index: number) => {
        const arr = [] as any;
        let title = "";
        let value = "";
        let suspend = "0";
        title = item[1]?.name;
        if (title === "Home or Draw") {
          title = `${data?.team_info?.home?.name} or Draw`;
        }
        if (title === "Away or Draw") {
          title = `${data?.team_info?.away?.name} or Draw`;
        }
        if (title === "Home or Away") {
          title = `${data?.team_info?.home?.name} or ${data?.team_info?.away?.name}`;
        }
        value = item[1]?.value_eu;
        suspend = item[1]?.suspend;
        arr.push({ title: title, value: "", suspend: suspend });
        arr.push({
          title: "",
          value: value,
          suspend: suspend,

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 10115,
          odd_name: data?.odds?.[10115]?.name,
          participant_id: item[1]?.id,
          participant_name: item[1]?.name,
          participant_handicap: item[1]?.handicap,
          participant_header: item[1]?.header,
        });
        tosend.push(arr);
      });
    }
  }
  return tosend;
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

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 421,
            odd_name: data?.odds?.[421]?.name,
            participant_id: participant?.id,
            participant_name: participant?.name,
            participant_handicap: participant?.handicap,
            participant_header: participant?.header,
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

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: 421,
              odd_name: data?.odds?.[421]?.name,
              participant_id: participant?.id,
              participant_name: participant?.name,
              participant_handicap: participant?.handicap,
              participant_header: participant?.header,
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

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 31,
            odd_name: data?.odds?.[41]?.name,
            participant_id: participant?.id,
            participant_name: participant?.name,
            participant_handicap: participant?.handicap,
            participant_header: participant?.header,
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

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: 31,
              odd_name: data?.odds?.[31]?.name,
              participant_id: participant?.id,
              participant_name: participant?.name,
              participant_handicap: participant?.handicap,
              participant_header: participant?.header,
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

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: item,
              odd_name: data?.odds?.[item]?.name,
              participant_id: item[1]?.id,
              participant_name: item[1]?.name,
              participant_handicap: item[1]?.handicap,
              participant_header: item[1]?.header,
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

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 1,
            odd_name: data?.odds?.[1]?.name,
            participant_id: participant?.id,
            participant_name: participant?.name,
            participant_handicap: participant?.handicap,
            participant_header: participant?.header,
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

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: 1,
              odd_name: data?.odds?.[1]?.name,
              participant_id: participant?.id,
              participant_name: participant?.name,
              participant_handicap: participant?.handicap,
              participant_header: participant?.header,
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

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 2,
            odd_name: data?.odds?.[2]?.name,
            participant_id: participant?.id,
            participant_name: participant?.name,
            participant_handicap: participant?.handicap,
            participant_header: participant?.header,
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

              event_id: data?.info?.id,
              event_name:
                data?.team_info?.home?.name +
                " vs " +
                data?.team_info?.away?.name,
              odd_id: 2,
              odd_name: data?.odds?.[2]?.name,
              participant_id: participant?.id,
              participant_name: participant?.name,
              participant_handicap: participant?.handicap,
              participant_header: participant?.header,
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

export const betScore = (data: any, oddData: any) => {
  if (!data && !data.odds) {
    return oddData;
  }
  let tosend = [] as any;

  if (data?.odds?.[10001]?.participants) {
    oddData.subtabs = ["Full Time Score"];
    oddData["Full Time Score header"] = [
      data?.team_info?.home?.name,
      "Draw",
      data?.team_info?.away?.name,
    ];
    const result = [] as any;
    const left = [] as any;
    const middle = [] as any;
    const right = [] as any;
    Object.keys(data?.odds?.[10001]?.participants).map((item) => {
      let checkingData =
        data?.odds?.[10001]?.participants[item]?.name.split("-");
      checkingData[0] = Number(checkingData[0]);
      checkingData[1] = Number(checkingData[1]);
      if (data?.odds?.[10001]?.participants[item]?.suspend === "0") {
        if (checkingData[0] > checkingData[1]) {
          left.push({
            title: data?.odds?.[10001]?.participants[item]?.name,
            value: data?.odds?.[10001]?.participants[item]?.value_eu,
            suspend: data?.odds?.[10001]?.participants[item]?.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 10001,
            odd_name: data?.odds?.[10001]?.name,
            participant_id: data?.odds?.[10001]?.participants[item]?.id,
            participant_name: data?.odds?.[10001].participants[item]?.name,
            participant_handicap:
              data?.odds?.[10001].participants[item]?.handicap,
            participant_header: data?.odds?.[10001].participants[item]?.header,
          });
        } else if (checkingData[0] === checkingData[1]) {
          middle.push({
            title: data?.odds?.[10001]?.participants[item]?.name,
            value: data?.odds?.[10001]?.participants[item]?.value_eu,
            suspend: data?.odds?.[10001]?.participants[item]?.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 10001,
            odd_name: data?.odds?.[10001]?.name,
            participant_id: data?.odds?.[10001]?.participants[item]?.id,
            participant_name: data?.odds?.[10001].participants[item]?.name,
            participant_handicap:
              data?.odds?.[10001].participants[item]?.handicap,
            participant_header: data?.odds?.[10001].participants[item]?.header,
          });
        } else {
          right.push({
            title: data?.odds?.[10001]?.participants[item]?.name,
            value: data?.odds?.[10001]?.participants[item]?.value_eu,
            suspend: data?.odds?.[10001]?.participants[item]?.suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 10001,
            odd_name: data?.odds?.[10001]?.name,
            participant_id: data?.odds?.[10001]?.participants[item]?.id,
            participant_name: data?.odds?.[10001].participants[item]?.name,
            participant_handicap:
              data?.odds?.[10001].participants[item]?.handicap,
            participant_header: data?.odds?.[10001].participants[item]?.header,
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
    oddData["Full Time Score"] = result;
  }
  // console.log({ tosend })
  return oddData;
};

export const betGoalOddEven = (data: any) => {
  if (!data && !data.odds) {
    return [];
  }

  const tosend = [] as any;
  if (data?.odds?.[10562]?.participants) {
    const spread = Object.entries(data?.odds?.[10562]?.participants);
    if (spread.length > 0) {
      spread.map((item: any, index: number) => {
        let title = "";
        let value = "";
        let suspend = "0";
        title = item[1]?.name;
        value = item[1]?.value_eu;
        suspend = item[1]?.suspend;
        tosend.push([
          { title: title, value: "", suspend: suspend },
          {
            title: "",
            value: value,
            suspend: suspend,

            event_id: data?.info?.id,
            event_name:
              data?.team_info?.home?.name +
              " vs " +
              data?.team_info?.away?.name,
            odd_id: 10562,
            odd_name: data?.odds?.[10562]?.name,
            participant_id: item[1]?.id,
            participant_name: item[1]?.name,
            participant_handicap: item[1]?.handicap,
            participant_header: item[1]?.header,
          },
        ]);
      });
    }
  }
  return tosend;
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

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 90307,
          odd_name: data?.odds?.[90307]?.name,
          participant_id: item[1]?.id,
          participant_name: item[1]?.name,
          participant_handicap: item[1]?.handicap,
          participant_header: item[1]?.header,
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

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 90308,
          odd_name: data?.odds?.[90308]?.name,
          participant_id: item[1]?.id,
          participant_name: item[1]?.name,
          participant_handicap: item[1]?.handicap,
          participant_header: item[1]?.header,
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

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 90311,
          odd_name: data?.odds?.[90311]?.name,
          participant_id: item[1]?.id,
          participant_name: item[1]?.name,
          participant_handicap: item[1]?.handicap,
          participant_header: item[1]?.header,
        });
      });
      tosend.push(arr);
    }
  }
  return tosend;
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

          event_id: data?.info?.id,
          event_name:
            data?.team_info?.home?.name + " vs " + data?.team_info?.away?.name,
          odd_id: 16,
          odd_name: data?.odds?.[16]?.name,
          participant_id: value?.id,
          participant_name: value?.name,
          participant_handicap: value?.handicap,
          participant_header: value?.header,
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
