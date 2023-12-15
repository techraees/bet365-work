"use client";
import React, { memo, useEffect, useLayoutEffect, useState } from "react";

interface DataInterface {
  data: any;
}

function countSetWins(scoreString: string) {
  if (!scoreString) {
    return;
  }

  let sets = scoreString.split(",");
  let player1Wins = 0;
  let player2Wins = 0;

  // Loop over all sets except the last one
  for (let i = 0; i < sets.length - 1; i++) {
    let [player1Score, player2Score] = sets[i].split(":").map(Number);
    if (player1Score > player2Score) {
      player1Wins++;
    } else if (player2Score > player1Score) {
      player2Wins++;
    } // If scores are equal, it's a draw (which is not a typical scenario in tennis)
  }

  return {
    player1: player1Wins,
    player2: player2Wins,
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

const BottomBorderComponent: React.FC<DataInterface> = ({ data }) => {
  const [activeTab, setActiveTab] = useState("Stats"); // Default to 'Stats'
  var set_scores = [0, 0];
  var _scores = [] as any;
  var score_string = data?.info?.score;
  // console.log("----basketball string----", data);

  var countSets = countSetWins(score_string);
  if (countSets === undefined) {
    return <div></div>;
  }

  set_scores = [countSets.player1, countSets.player2];
  const sts = data?.sts;
  // console.log({ sts: sts });
  const status = sts?.split("|") ?? [];
  let _penalties_regx = /Penalties=(\d+):(\d+)/;
  let _goals_on_power_play_regx = /Goals on Power Play=(\d+):(\d+)/;

  let _goals_on_power_play: any = null,
    _penalties: any = null;

  status.forEach((state: string) => {
    if (_goals_on_power_play == null)
      _goals_on_power_play = state.match(_goals_on_power_play_regx);
    if (_penalties == null) _penalties = state.match(_penalties_regx);
  });

  var sets_details = extractSets(data?.stats);
  // console.log("-----sets_details-----", sets_details);
  let kitColors = getKitColors(data);
  return (
    // <div className="border-b-[hsla(0,0%,100%,.1)] border-b border-solid h-[50px]">
    <div className="flex flex-col w-full p-0">
      <div className="flex-[0_0_auto] flex w-full justify-center items-stretch h-[50px] border-b-[hsla(0,0%,100%,.1)] border-b border-solid">
        <div className="h-[50px] min-w-[40px] mx-2.5 my-0">
          <div
            className={`text-[13px] leading-[50px] text-[#fff] w-[-webkit-fit-content] w-fit cursor-pointer flex items-center justify-center text-center h-[50px] m-auto border-b-2 border-solid ${
              activeTab === "Stats"
                ? "opacity-100 font-bold border-[#fff]"
                : "opacity-80 hover:opacity-100 border-b-transparent"
            }`}
            onClick={() => setActiveTab("Stats")}
          >
            Stats
          </div>
        </div>
        <div className="h-[50px] min-w-[40px] mx-2.5 my-0">
          <div
            className={`text-[13px] leading-[50px] text-[#fff] w-[-webkit-fit-content] w-fit cursor-pointer flex items-center justify-center text-center h-[50px] m-auto border-b-2 border-solid ${
              activeTab === "Summary"
                ? "opacity-100 font-bold border-[#fff]"
                : "opacity-80 hover:opacity-100 border-b-transparent"
            }`}
            onClick={() => setActiveTab("Summary")}
          >
            Summary
          </div>
        </div>
      </div>
      <div className="flex-auto flex items-stretch w-full mx-auto my-0 max-h-[calc(100vh_-_500px)] overflow-y-auto">
        <div className="block max-w-none flex-auto w-full mx-auto my-0">
          {activeTab == "Stats" && (
            <>
              <div className="max-w-[440px] table table-fixed w-full mx-auto my-5 px-5 py-0">
                <div className="table w-full table-fixed">
                  <div className="w-2/5 table-cell align-top">
                    <div className="text-left text-[11px] flex text-[#ccc] leading-4 pl-0 pr-1.5 px-[5px] py-0">
                      <div className="pr-[5px]">
                        {data?.info?.period.split(" ")[0]}
                      </div>
                      {data?.info?.seconds}
                    </div>
                    <div className="leading-6 text-[13px] flex pr-2.5">
                      <div
                        className="relative w-[3px] h-3 shrink-0 top-1.5"
                        style={{
                          background: kitColors.home,
                        }}
                      ></div>
                      <div className="text-white inline-block align-middle font-bold whitespace-nowrap overflow-hidden text-ellipsis ml-[5px]">
                        <span>{data?.team_info?.home?.name}</span>
                      </div>
                    </div>
                    <div className="leading-6 text-[13px] flex pr-2.5">
                      <div
                        className="relative w-[3px] h-3 shrink-0 top-1.5"
                        style={{
                          background: kitColors.away,
                        }}
                      ></div>
                      <div className="text-white inline-block align-middle font-bold whitespace-nowrap overflow-hidden text-ellipsis ml-[5px]">
                        <span>{data?.team_info?.away?.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="table-cell align-top">
                    <div className="text-[11px] whitespace-nowrap block text-center text-[#ccc] leading-4 px-[5px] py-0">
                      1
                    </div>
                    <div className="block text-center text-[13px] leading-6 text-[#e4e4e4] px-[5px] py-0">
                      {sets_details["P1"].home ?? <>&nbsp;</>}
                    </div>
                    <div className="block text-center text-[13px] leading-6 text-[#e4e4e4] px-[5px] py-0">
                      {sets_details["P1"].away ?? <>&nbsp;</>}
                    </div>
                  </div>
                  <div className="table-cell align-top">
                    <div className="text-[11px] whitespace-nowrap block text-center text-[#ccc] leading-4 px-[5px] py-0">
                      2
                    </div>
                    <div className="block text-center text-[13px] leading-6 text-[#e4e4e4] px-[5px] py-0">
                      {sets_details["P2"].home ?? <>&nbsp;</>}
                    </div>
                    <div className="block text-center text-[13px] leading-6 text-[#e4e4e4] px-[5px] py-0">
                      {sets_details["P2"].away ?? <>&nbsp;</>}
                    </div>
                  </div>
                  <div className="table-cell align-top">
                    <div className="text-[11px] whitespace-nowrap block text-center text-[#ccc] leading-4 px-[5px] py-0">
                      3
                    </div>
                    <div className="block text-center text-[13px] leading-6 text-[#e4e4e4] px-[5px] py-0">
                      {sets_details["P3"].home ?? <>&nbsp;</>}
                    </div>
                    <div className="block text-center text-[13px] leading-6 text-[#e4e4e4] px-[5px] py-0">
                      {sets_details["P3"].away ?? <>&nbsp;</>}
                    </div>
                  </div>
                  <div className="table-cell align-top">
                    <div className="text-[11px] whitespace-nowrap block text-center text-[#ccc] leading-4 px-[5px] py-0">
                      T
                    </div>
                    <div className="text-[color(display-p3_1_0.875_0.106)] font-bold block text-center text-[13px] leading-6 px-[5px] py-0">
                      {sets_details["T"].home ?? <>&nbsp;</>}
                    </div>
                    <div className="text-[color(display-p3_1_0.875_0.106)] font-bold block text-center text-[13px] leading-6 px-[5px] py-0">
                      {sets_details["T"].away ?? <>&nbsp;</>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-w-[440px] w-full mx-auto my-0 pt-0 pb-5 px-5">
                <div className="flex w-full mb-5">
                  <div className="w-6/12 flex-[0_0_auto] flex">
                    <div className="flex-[0_0_auto] px-[5px] py-0"></div>
                    <div className="w-auto flex-[0_0_auto] min-w-0 px-[7px] py-0">
                      <div
                        className={`text-center text-[15px] leading-[18px] font-bold after:content-[""] after:block after:h-0.5 after:w-9 after:max-w-full after:bg-current after:mt-1 after:mb-[5px] after:mx-auto after:rounded-sm`}
                        style={{
                          color: kitColors.home,
                        }}
                      >
                        <div className="text-[#ddd]">
                          {_penalties ? _penalties[1] : "0"}
                        </div>
                      </div>
                      <div
                        className="overflow-hidden max-h-[calc(13px_*_2)] flex flex-[1_1_0] items-baseline text-center justify-center text-[11px] leading-[13px] whitespace-normal min-h-[auto] text-[#ddd]"
                        style={
                          {
                            "-webkit-box-orient": "vertical",
                            "-webkit-line-clamp": 2,
                            "word-break": "break-word",
                            "word-wrap": "break-word",
                          } as React.CSSProperties
                        }
                      >
                        Penalties
                      </div>
                    </div>
                  </div>
                  <div className="justify-end w-6/12 flex-[0_0_auto] flex">
                    <div className="w-auto flex-[0_0_auto] min-w-0 px-[7px] py-0">
                      <div
                        className={`text-center text-[15px] leading-[18px] font-bold after:content-[""] after:block after:h-0.5 after:w-9 after:max-w-full after:bg-current after:mt-1 after:mb-[5px] after:mx-auto after:rounded-sm`}
                        style={{
                          color: kitColors.away,
                        }}
                      >
                        <div className="text-[#ddd]">
                          {_penalties ? _penalties[2] : "0"}
                        </div>
                      </div>
                      <div
                        className="overflow-hidden max-h-[calc(13px_*_2)] flex flex-[1_1_0] items-baseline text-center justify-center text-[11px] leading-[13px] whitespace-normal min-h-[auto] text-[#ddd]"
                        style={
                          {
                            "-webkit-box-orient": "vertical",
                            "-webkit-line-clamp": 2,
                            "word-break": "break-word",
                            "word-wrap": "break-word",
                          } as React.CSSProperties
                        }
                      >
                        Penalties
                      </div>
                    </div>
                    <div className="flex-[0_0_auto] px-[5px] py-0"></div>
                  </div>
                </div>
                <div
                  className="flex items-center w-6/12 mx-auto px-2.5 py-0"
                  style={{
                    flexFlow: "row wrap",
                  }}
                >
                  <div className="flex-[0_0_auto] w-6/12 pr-[2.5px]">
                    <div>
                      <div className="">
                        <div className="text-[13px] leading-[15px] text-[#a7a7a7] text-center font-bold">
                          <div className="text-[15px] leading-[18px] font-bold text-[#ddd] inline-block mr-[5px]">
                            {_goals_on_power_play
                              ? _goals_on_power_play[1]
                              : "0"}
                          </div>
                          <span className="font-bold">100%</span>
                        </div>
                        <div className="text-[rgb(102,102,102)] h-[3px] bg-current overflow-hidden mx-0 my-1 rounded-[2px_0_0_2px]">
                          <span
                            className="w-3/12 float-right block h-[3px] bg-current rounded-[2px_0_0_2px]"
                            style={{
                              color: kitColors.home,
                            }}
                          ></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-[0_0_auto] w-6/12 pl-[2.5px]">
                    <div>
                      <div className="">
                        <div className="text-[13px] leading-[15px] text-[#a7a7a7] text-center font-bold">
                          <div className="text-[15px] leading-[18px] font-bold text-[#ddd] inline-block mr-[5px]">
                            {_goals_on_power_play
                              ? _goals_on_power_play[2]
                              : "0"}
                          </div>
                          <span className="font-bold">100%</span>
                        </div>
                        <div className="text-[rgb(102,102,102)] h-[3px] bg-current overflow-hidden mx-0 my-1 rounded-[2px_0_0_2px]">
                          <span
                            className="w-3/12 block h-[3px] bg-current rounded-[0_2px_2px_0]"
                            style={{
                              color: kitColors.away,
                            }}
                          ></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="overflow-hidden leading-[13px] max-h-[calc(13px_*_2)] flex-[0_0_auto] w-full text-center text-[11px] text-[#ddd]"
                    style={
                      {
                        display: "-webkit-box",
                        "-webkit-box-orient": "vertical",
                        "word-break": "break-word",
                        "word-wrap": "break-word",
                      } as React.CSSProperties
                    }
                  >
                    Goals on Power Play
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab == "Summary" && (
            <div
              className={`flex-auto flex items-stretch w-full mx-auto my-0 ${
                activeTab == "Summary" ? "block" : "hidden"
              }`}
            >
              <div className="block max-w-none flex-auto w-full mx-auto my-0">
                {data.extra &&
                  Object.values(data?.extra)
                    .reverse()
                    .map((_extra: any, index) => (
                      <div
                        key={index}
                        className="text-[#ccc] min-h-[45px] text-[13px] leading-[15px] flex items-center mx-[5px] my-0 px-[15px] py-0 hover:bg-[hsla(0,0%,80%,0.15)]"
                      >
                        {_extra.value}
                      </div>
                    ))}

                <div className="flex items-center justify-center cursor-pointer w-full h-[45px] px-2.5 py-0">
                  <div className="leading-[25px] text-[11px] text-[#ccc] relative bg-[#383838] h-[25px] pl-2.5 pr-[13px] py-0 rounded-xl">
                    Show more
                    <div
                      className="inline-block relative w-2 h-[5px] bg-[#ccc] left-[5px] -top-px"
                      style={
                        {
                          "mask-size": "8px 5px",
                          "mask-repeat": "no-repeat",
                          "--mixin-svg-inlined": `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath fill='{0}' fill-rule='evenodd' d='M12 .784L11.243 0 6 5.431.757 0 0 .784l5.243 5.432L6 7l.757-.784z'/%3E%3C/svg%3E")`,
                          "mask-image": "var(--mixin-svg-inlined)",
                        } as React.CSSProperties
                      }
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default BottomBorderComponent;
