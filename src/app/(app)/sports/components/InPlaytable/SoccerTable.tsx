import Chevron from "@/components/ui/icons/chevron";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import SportHeading from "./TableHeading";

const SoccerTable = ({
  soccergrouped,
  selectedArray,
  setSelectedArray,
}: any) => {
  let soccer = {
    title: "Soccer",
    events: ["1", "X", "2"],
  };

  // console.log({ soccergrouped }, "HELLO WORLD");
  // const filteredData = soccergrouped?.slice(0, 5);
  let oddData = [] as any;
  soccergrouped.map((item: any) => {
    if (oddData.length > 5) {
      return;
    }
    if (item?.events && item?.events.length > 0) {
      let dataOfFirstEvent = item?.events[0];
      if (
        dataOfFirstEvent?.odds &&
        dataOfFirstEvent?.odds?.[1777]?.participants
      ) {
        let participants = dataOfFirstEvent?.odds[1777]?.participants;
        const suspend = dataOfFirstEvent?.odds[1777]?.suspend;
        let home = null;
        let away = null;
        let draw = null;
        if (suspend === "0") {
          Object.keys(participants).map((participat) => {
            if (participants[participat]?.name === "Home") {
              home = participants[participat].value_eu;
            } else if (participants[participat]?.name === "Away") {
              away = participants[participat].value_eu;
            } else if (participants[participat]?.name === "Draw") {
              draw = participants[participat].value_eu;
            }
          });
        }
        oddData.push({
          home: dataOfFirstEvent?.team_info?.home?.name,
          away: dataOfFirstEvent?.team_info?.away?.name,
          time: dataOfFirstEvent?.info?.seconds,
          minute: dataOfFirstEvent?.info?.minute,
          homescore: dataOfFirstEvent?.team_info?.home?.score,
          awayscore: dataOfFirstEvent?.team_info?.away?.score,
          rows: [
            { title: "", value: home, suspend: suspend },
            { title: "", value: draw, suspend: suspend },
            { title: "", value: away, suspend: suspend },
          ],
        });
      }
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
      return "bg-white hover:bg-white";
    } else {
      return "";
    }
  };

  const handleSelectingItems = (item: any, column: any) => {
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
    <div className="flex flex-col pb-3 h-full bg-[linear-gradient(135deg,#364D3C_0%,_#383838_400px)]">
      <SportHeading data={soccer} />
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
                  <div className="font-[700]">{item.homescore}</div>
                </div>
                <div className="flex justify-between items-center text-[#e4e4e4]">
                  <div className="truncate">{item.away}</div>
                  <div className="font-[700]">{item.awayscore}</div>
                </div>
                <div className="flex text-[11px] leading-[20px] text-[#ddd] items-center">
                  <div className="mr-2">{item.time}</div>
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

export default SoccerTable;
