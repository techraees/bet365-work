import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Dialog from "../Events/Dialog";

type BreadCrumbProps = {
  grouped: any;
  currentdataId: string;
  currentPitchId: any;
};

//get kit colors of two teams
function getKitColors(data: any): { home: string; away: string } {
  let homeColors = data?.team_info?.home.kit_color?.split(",") ?? ["#ff0000"];
  let awayColors = data?.team_info?.away.kit_color?.split(",") ?? ["#ffffff"];
  for (let i = 0; i < homeColors.length; ++i)
    if (homeColors[i] != awayColors[i])
      return {
        home: homeColors[i].toLowerCase(),
        away: awayColors[i].toLowerCase(),
      };
  return {
    home: "#ff0000",
    away: "#ffffff",
  };
}

function extractSets(data: any) {
  let result = {} as any;
  for (let key in data) {
    const setNumber = data[key].name; // Extracting the number after "S"
    result[setNumber] = {
      home: data[key].home,
      away: data[key].away,
    };
  }
  return result;
}

export default function BreadCrumb({
  grouped,
  currentPitchId,
  currentdataId,
}: BreadCrumbProps) {
  const router = useRouter();
  let filterID = currentdataId ?? currentPitchId;
  const currentdata = [] as any;
  let currentGroupName = "";
  const findData = () => {
    grouped.forEach((group: any) => {
      group.events.forEach((ev: any) => {
        if (ev?.info?.id === filterID) {
          currentdata.push(ev);
          currentGroupName = group.name;
        }
      });
    });
  };
  findData();
  let data = currentdata?.[0];
  const kitColor = getKitColors(data);
  console.log("----breadcrumb----", data);
  const [dialog, setDialog] = useState(false);

  const renderHomeMark = () => {
    if (data?.info?.sport == "Tennis") {
      for (let key in data?.stats) {
        const name = data?.stats[key].name; // Extracting the number after "S"
        if (name == "POINTS") return <>{data?.stats[key].home}</>;
      }
    }
    if (data?.info?.sport == "Volleyball") {
      let score = 0;
      for (let key in data?.stats) {
        const name = data?.stats[key].name; // Extracting the number after "S"
        if (name[0] == "S") score = data?.stats[key].home;
      }
      return score;
    }
    return <>{data?.team_info?.home?.score}</>;
  };

  const renderAwayMark = () => {
    if (data?.info?.sport == "Tennis") {
      for (let key in data?.stats) {
        const name = data?.stats[key].name; // Extracting the number after "S"
        if (name == "POINTS") return data?.stats[key].away;
      }
    }
    if (data?.info?.sport == "Volleyball") {
      let score = 0;
      for (let key in data?.stats) {
        const name = data?.stats[key].name; // Extracting the number after "S"
        if (name[0] == "S") score = data?.stats[key].away;
      }
      return score;
    }
    return data?.team_info?.away?.score;
  };

  var sets_details = extractSets(data?.stats);

  const set_regx: RegExp = /Set (\d+)/;
  const match = data?.info.period.match(set_regx);
  const currentSet = match ? match[1] : 0;

  const renderPrevScores = (set_details: any, current_set: number) => {
    console.log("------set_details-----");
    let set_string = "S" + current_set;
    let prevRender = [];
    for (let key in set_details) {
      if (key[0] == "S" && key != set_string)
        prevRender.push(
          <div className="min-w-[22px] leading-[18px] flex-col flex mr-2.5">
            <div className="min-w-[22px] text-center text-[#e4e4e4] mr-2.5">
              {set_details[key].home}
            </div>
            <div className="min-w-[22px] text-center text-[#e4e4e4] mr-2.5">
              {set_details[key].away}
            </div>
          </div>
        );
    }
    return prevRender;
  };

  return (
    <>
      <div className="relative flex bg-[#282828] cursor-pointer border-b-[hsla(0,0%,100%,0.1)]">
        <div
          className="h-[50px] w-[45px] bg-[#282828] cursor-pointer relative"
          role="link"
          aria-label="Back Button"
          onClick={() => router.back()}
        >
          <div
            className="block w-[7px] h-3"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 7 12'%3E%3Cpath fill='%23a7a7a7' fill-rule='evenodd' d='M6.216 12L7 11.243 1.569 6 7 .757 6.216 0 .784 5.243 0 6l.784.757z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
        <div className="flex-1 min-w-0" role="button">
          {data?.info?.sport != "Volleyball" && (
            <div className="bg-[#282828] h-[50px]">
              <div className="flex h-full">
                <div className="justify-end flex items-center h-full flex-1 pr-1.5">
                  <div
                    className="text-right overflow-hidden leading-[15px] max-h-[calc(15px_*_3)] text-[#fff] font-bold text-[13px]"
                    style={
                      {
                        display: "-webkit-box",
                        "-webkit-box-orient": "vertical",
                        "-webkit-line-clamp": "3",
                        "word-break": "break-word",
                        "word-wrap": "break-word",
                      } as React.CSSProperties
                    }
                  >
                    {data?.team_info?.home?.name}
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_1fr]">
                  <div
                    className="flex items-center justify-center h-[50px] mr-px px-[5px] py-0 border-b-2 border-b-[rgb(240,240,240)] border-solid"
                    style={{ borderBottom: `2px solid ${kitColor.home}` }}
                  >
                    <span className="text-[color(display-p3_1_0.875_0.106)] font-bold text-[22px] leading-[26px] whitespace-nowrap">
                      {renderHomeMark()}
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-center h-[50px] px-[5px] py-0 border-b-2 border-b-[rgb(66,104,151)] border-solid"
                    style={{ borderBottom: `2px solid ${kitColor.away}` }}
                  >
                    <span className="text-[color(display-p3_1_0.875_0.106)] font-bold text-[22px] leading-[26px] whitespace-nowrap">
                      {renderAwayMark()}
                    </span>
                  </div>
                </div>
                <div className="justify-start flex items-center h-full flex-1 pl-1.5">
                  <div
                    className="text-left overflow-hidden leading-[15px] max-h-[calc(15px_*_3)] text-[#fff] font-bold text-[13px]"
                    style={
                      {
                        display: "-webkit-box",
                        "-webkit-box-orient": "vertical",
                        "-webkit-line-clamp": "3",
                        "word-break": "break-word",
                        "word-wrap": "break-word",
                      } as React.CSSProperties
                    }
                  >
                    {data?.team_info?.away?.name}
                  </div>
                </div>
              </div>
            </div>
          )}
          {data?.info?.sport == "Volleyball" && (
            <div className="bg-[#282828] h-[50px] border-b-[hsla(0,0%,100%,0.1)] border-b border-solid">
              <div className="flex leading-[18px] h-[50px] items-center px-2.5 py-0">
                <div className="flex flex-1 overflow-hidden">
                  <div className="inline-flex flex-1 flex-col overflow-hidden whitespace-nowrap text-[13px] text-white font-bold pr-2.5">
                    <div className="flex">
                      <div
                        className="h-[5px] w-[5px] inline-flex relative self-center flex-[0_0_5px] mr-1.5 rounded-[50%] -top-px"
                        style={{
                          backgroundColor:
                            sets_details["TURN"].home == 1
                              ? "color(display-p3 1 0.875 0.106)"
                              : "#4f4f4f",
                        }}
                      ></div>
                      <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                        {data?.team_info?.home?.name}
                      </div>
                    </div>
                    <div className="flex">
                      <div
                        className="h-[5px] w-[5px] inline-flex relative self-center flex-[0_0_5px] mr-1.5 rounded-[50%] -top-px"
                        style={{
                          backgroundColor:
                            sets_details["TURN"].away == 1
                              ? "color(display-p3 1 0.875 0.106)"
                              : "#4f4f4f",
                        }}
                      ></div>
                      <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                        {data?.team_info?.away?.name}
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex text-[13px] leading-[18px]">
                    <div className="min-w-[22px] text-[color(display-p3_1_0.875_0.106)] font-bold text-center mr-2.5">
                      <div className="lsb-StandardSetScoreType_TotalsPoint">
                        <div>{sets_details["T"]?.home}</div>
                      </div>
                      <div className="lsb-StandardSetScoreType_TotalsPoint">
                        <div>{sets_details["T"]?.away}</div>
                      </div>
                    </div>
                    <div className="flex">
                      {renderPrevScores(sets_details, currentSet)}
                    </div>
                    <div className="min-w-[22px] text-[#e4e4e4] font-normal">
                      <div className="min-w-[22px] text-center text-[#e4e4e4] mr-2.5">
                        {sets_details["S" + currentSet]?.home}
                      </div>
                      <div className="min-w-[22px] text-center text-[#e4e4e4] mr-2.5">
                        {sets_details["S" + currentSet]?.away}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className="relative h-[50px] w-[45px] bg-[#282828] cursor-pointer"
          role="button"
          aria-haspopup="true"
          aria-label="Change Live In Game Fixture Selection"
          onClick={() => setDialog(true)}
        >
          <div
            className="block h-[7px] w-3"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath fill='%23a7a7a7' fill-rule='evenodd' d='M12 .784L11.243 0 6 5.431.757 0 0 .784l5.243 5.432L6 7l.757-.784z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
      </div>
      <div className="w-full text-white">
        <Dialog
          grouped={grouped}
          currentdataId={currentdataId}
          isOpen={dialog}
          currentGroupName={currentGroupName}
          onClose={() => {
            setDialog(false);
          }}
        />
      </div>
    </>
  );
}
