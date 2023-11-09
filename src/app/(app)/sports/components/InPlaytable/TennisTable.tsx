import Chevron from "@/components/ui/icons/chevron";
import { cn } from "@/lib/utils";
import React from "react";
import SportHeading from "./TableHeading";
import { toWin } from "@/components/Sports/Tennis/Details/mappings/mapping";

const TennisTable = ({
  tennisgrouped,
  selectedArray,
  setSelectedArray,
}: any) => {
  let tennis = {
    title: "Tennis",
    events: ["1", "2"],
  };

  // console.log({ tennisgrouped })
  // const filteredData = soccergrouped?.slice(0, 5);
  let oddData = [] as any;
  tennisgrouped.map((item: any) => {
    if (oddData.length == 5 || oddData.length > 5) {
      return;
    }
    if (item?.events && item?.events.length > 0) {
      item.events.map((dataOfEvent: any, index: number) => {
        if (oddData.length == 5 || oddData.length > 5) {
          return;
        }
        if (dataOfEvent?.odds && dataOfEvent?.odds?.[80856]?.participants) {
          let participants = dataOfEvent?.odds[80856]?.participants;
          const suspend = dataOfEvent?.odds[80856]?.suspend;
          let home = null;
          let away = null;
          let game = null;
          Object.keys(dataOfEvent?.extra).map((item) => {
            if (dataOfEvent?.extra[item].value.startsWith("Game ")) {
              game = dataOfEvent?.extra[item].value.substring(
                0,
                dataOfEvent?.extra[item].value.indexOf(" - ")
              );
            }
          });
          let homegame1 = "0";
          let awaygame1 = "0";
          let homegame2 = "0";
          let awaygame2 = "0";

          let setTotals = getAllSetScores(dataOfEvent?.stats);
          Object.keys(dataOfEvent?.stats).map((item) => {
            if (dataOfEvent?.stats[item].name === "S1") {
              homegame2 = dataOfEvent?.stats[item].home;
              awaygame2 = dataOfEvent?.stats[item].away;
            }
            if (dataOfEvent?.stats[item].name === "S2") {
              homegame2 = dataOfEvent?.stats[item].home;
              awaygame2 = dataOfEvent?.stats[item].away;
            }
            if (dataOfEvent?.stats[item].name === "T") {
              homegame1 = dataOfEvent?.stats[item].home;
              awaygame1 = dataOfEvent?.stats[item].away;
            }
          });

          let odd_rows = toWin(dataOfEvent);
          if (suspend === "0") {
            Object.keys(participants).map((participat) => {
              if (participants[participat]?.name === "Home") {
                home = participants[participat].value_eu;
              } else if (participants[participat]?.name === "Away") {
                away = participants[participat].value_eu;
              }
            });
          }
          var rows = [odd_rows.rows[0][1], odd_rows.rows[0][2]];
          oddData.push({
            home: dataOfEvent?.team_info?.home?.name,
            away: dataOfEvent?.team_info?.away?.name,
            period: dataOfEvent?.info?.period,
            game: game ? game : "",
            minute: dataOfEvent?.info?.minute,
            homescore1: homegame1,
            homescore2: homegame2,
            homescore3: dataOfEvent?.stats?.["1"].home,
            awayscore1: awaygame1,
            awayscore2: awaygame2,
            awayscore3: dataOfEvent?.stats?.["1"].away,
            rows: rows,
            // rows: [
            //   { title: "", value: home, suspend: suspend },
            //   { title: "", value: away, suspend: suspend },
            // ],
          });
        }
      });
    }
  });

  // Selected Columns
  const handleSelectedColors = (
    selectedArray: any,
    column: any,
    item: any
  ): string => {
    const foundedData = selectedArray.find((obj: any) => {
      return (
        obj.home == item.home &&
        JSON.stringify({ ...obj.rows }) === JSON.stringify({ ...column })
      );
    });
    if (foundedData !== undefined) {
      return "bg-[#ffffff26]";
    } else {
      return "";
    }
  };

  function calculateSetTotals(stats: any) {
    let homeTotal = 0;
    let awayTotal = 0;

    // Loop through each property in the stats object
    for (let key in stats) {
      if (stats.hasOwnProperty(key)) {
        // Check if the property name starts with 'S' and is followed by a number
        if (
          stats[key].name.startsWith("S") &&
          !isNaN(stats[key].name.substring(1))
        ) {
          // Add the home and away values to their respective totals
          homeTotal += stats[key].home;
          awayTotal += stats[key].away;
        }
      }
    }

    // Return an object with the total for home and away
    return {
      homeTotal: homeTotal,
      awayTotal: awayTotal,
    };
  }

  function getAllSetScores(stats: any) {
    const setScores = {} as any;

    // Loop through each property in the stats object
    for (let key in stats) {
      if (stats.hasOwnProperty(key)) {
        // Check if the property name starts with 'S' and is followed by a number
        const setName = stats[key].name;
        if (setName.startsWith("S") && !isNaN(setName.substring(1))) {
          // Remove the 'S' and add the formatted score string to the array
          const setNumber = setName.substring(1); // Remove the 'S'
          setScores[setNumber] = {
            Home: stats[key].home,
            Away: stats[key].away,
          };
        }
      }
    }

    // Return the array of formatted set score strings
    return setScores;
  }

  const handleSelectingItems = (item: any, column: any) => {
    console.log("item", item);
    const alreadyPresent = selectedArray.find(
      (obj: any) =>
        obj.home == item.home &&
        JSON.stringify({ ...obj.rows }) == JSON.stringify({ ...column })
    );
    if (alreadyPresent) {
      const filteredArr = selectedArray.filter((filterObj: any) => {
        // Check if `home` property is different
        if (filterObj.home !== alreadyPresent.home) {
          return true;
        }

        // Check if `rows` properties are different
        for (const key in filterObj.rows) {
          if (filterObj.rows[key] !== alreadyPresent.rows[key]) {
            return true;
          }
        }

        return false;
      });
      console.log(filteredArr, selectedArray, "I am present 7");

      setSelectedArray(filteredArr);
    } else {
      const dataObj = { ...item };
      dataObj.rows = column;
      const newArr = [...selectedArray, dataObj];
      setSelectedArray(newArr);
    }
  };

  return (
    <div className="flex flex-col pb-3 h-full bg-[linear-gradient(135deg,#3F4D32_0%,_#383838_400px)]">
      <SportHeading data={tennis} />
      {oddData?.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className={cn(
              "h-[83px] flex items-center px-5",
              index == 0 ? "" : "border-t border-solid border-t-[#ffffff1a]"
            )}
          >
            <div className="flex-1 justify-center items-center text-[13px] overflow-hidden">
              <div className="flex flex-col pr-5 py-3">
                <div className="flex justify-between items-center text-[#e4e4e4]">
                  <div className="truncate">{item.home}</div>
                  <div className="flex items-center justify-center">
                    <div className="font-[700] mr-1 w-[12px] flex items-center justify-center">
                      {item.homescore1}
                    </div>
                    <div className="mr-1  w-[12px] flex items-center justify-center">
                      {item.homescore2}
                    </div>
                    <div className="w-[12px] flex items-center justify-center">
                      {item.homescore3}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[#e4e4e4]">
                  <div className="truncate">{item.away}</div>
                  <div className="flex items-center justify-center">
                    <div className="font-[700] mr-1 w-[12px] flex items-center justify-center">
                      {item.awayscore1}
                    </div>
                    <div className="mr-1  w-[12px] flex items-center justify-center">
                      {item.awayscore2}
                    </div>
                    <div className="w-[12px] flex items-center justify-center">
                      {item.awayscore3}
                    </div>
                  </div>
                </div>
                <div className="flex text-[11px] leading-[20px] text-[#ddd] items-center">
                  <div className="mr-1">{item.period}</div>
                  <div className="mr-2">{item.game}</div>
                  <div className="mr-1">{item.minute}</div>
                  <Chevron
                    className={cn(
                      "h-[4px] w-[8px] rotate-[270deg] fill-[#ccc]"
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="bg-[#ffffff1a] h-[63px] w-[1px]" />
            <div className="flex-1 flex h-full justify-center items-center text-[13px] cursor-pointer">
              {item?.rows.map((column: any, index: number) => {
                return (
                  <div
                    onClick={() => handleSelectingItems(item, column)}
                    key={index}
                    className={`flex flex-1 h-full justify-center items-center text-[#ffde00] hover:bg-[#ffffff26] ${handleSelectedColors(
                      selectedArray,
                      column,
                      item
                    )}`}
                  >
                    {column.value}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TennisTable;
