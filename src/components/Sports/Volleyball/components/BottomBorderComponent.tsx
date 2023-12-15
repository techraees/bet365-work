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

const BottomBorderComponent: React.FC<DataInterface> = ({ data }) => {
  const [activeTab, setActiveTab] = useState("Stats"); // Default to 'Stats'
  var set_scores = [0, 0];
  var _scores = [] as any;
  var score_string = data?.info?.score;

  var countSets = countSetWins(score_string);
  if (countSets === undefined) {
    return <div></div>;
  }

  set_scores = [countSets.player1, countSets.player2];
  const sts = data?.sts;
  const status = sts?.split("|") ?? [];
  let _longest_streak_regx = /Longest Streak=(\d+):(\d+)/;
  let _points_won_on_serve_regx = /Points Won on Serve=(\d+):(\d+)/;

  let _longest_streak: any = null,
    _points_won_on_serve: any = null;

  status.forEach((state: string) => {
    if (_longest_streak == null)
      _longest_streak = state.match(_longest_streak_regx);
    if (_points_won_on_serve == null)
      _points_won_on_serve = state.match(_points_won_on_serve_regx);
  });

  var sets_details = extractSets(data?.stats);
  // console.log("-----sets_details-----", sets_details);
  let kitColors = getKitColors(data);
  // console.log("------kitColors------", kitColors);

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
            onClick={() => {
              // console.log(">>>>>>>");
              setActiveTab("Summary");
            }}
          >
            Summary
          </div>
        </div>
      </div>
      <div className="flex-auto flex items-stretch w-full mx-auto my-0 max-h-[calc(100vh_-_500px)] overflow-y-auto">
        <div className="block max-w-none flex-auto w-full mx-auto my-0">
          {activeTab == "Stats" && (
            <div className="flex items-center justify-center w-full pt-0">
              <div className="w-full max-w-[440px] flex items-end mx-auto my-0 p-5">
                <div className="flex-[0_0_auto] w-6/12">
                  <div className="flex flex-col">
                    <div className="overflow-hidden leading-[13px] max-h-[calc(13px_*_2)] text-center text-[11px] text-[#ddd]">
                      <div>
                        <div>Longest Streak</div>
                      </div>
                    </div>
                    <div className="w-full flex justify-center mt-[5px]">
                      <div className="justify-end text-ellipsis overflow-hidden whitespace-nowrap text-[15px] font-bold leading-8 text-[#ddd] flex items-center flex-[1_1_50%] pr-[5px]">
                        <div className="text-white">
                          <div>{_longest_streak ? _longest_streak[1] : 0}</div>
                        </div>
                      </div>
                      <div className="flex-[0_0_auto]">
                        <svg
                          className="ml-WheelChart_Svg"
                          width="34"
                          height="34"
                          viewBox="1 0 29 32"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <path
                              id="wheelPathTeam1"
                              className="ml-WheelChart_TeamOnePath"
                              stroke-width="5"
                              d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z"
                              stroke={kitColors.home}
                              style={{ stroke: kitColors.home }}
                            ></path>
                            <path
                              id="wheelShadow"
                              className="ml-WheelChart_WheelShadow"
                              stroke-width="5"
                              d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z"
                              stroke="#404040"
                              transform="rotate(2.3884948721126023 16 16)"
                              style={{
                                strokeDasharray: "75.3613px, 75.3613px",
                                strokeDashoffset: "36.6806px",
                              }}
                            ></path>
                            <path
                              id="wheelPathTeam2"
                              className="ml-WheelChart_TeamTwoPath"
                              stroke-width="5"
                              d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z"
                              stroke={kitColors.away}
                              transform="rotate(-2.3884948721126023 16 16)"
                              style={{
                                stroke: kitColors.away,
                                strokeDasharray: "75.3613px, 75.3613px",
                                strokeDashoffset: "38.6806px",
                              }}
                            ></path>
                          </g>
                        </svg>
                      </div>
                      <div className="text-ellipsis overflow-hidden whitespace-nowrap text-[15px] font-bold leading-8 text-[#ddd] flex items-center flex-[1_1_50%] pl-[5px]">
                        <div className="text-white">
                          <div>{_longest_streak ? _longest_streak[2] : 0}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-[0_0_auto] w-6/12">
                  <div className="flex flex-col">
                    <div className="overflow-hidden leading-[13px] max-h-[calc(13px_*_2)] text-center text-[11px] text-[#ddd]">
                      <div>
                        <div>Points Won on serve</div>
                      </div>
                    </div>
                    <div className="w-full flex justify-center mt-[5px]">
                      <div className="justify-end text-ellipsis overflow-hidden whitespace-nowrap text-[15px] font-bold leading-8 text-[#ddd] flex items-center flex-[1_1_50%] pr-[5px]">
                        <div className="text-white">
                          <div>
                            {_points_won_on_serve ? _points_won_on_serve[1] : 0}
                          </div>
                        </div>
                      </div>
                      <div className="flex-[0_0_auto]">
                        <svg
                          className="ml-WheelChart_Svg"
                          width="34"
                          height="34"
                          viewBox="1 0 29 32"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <path
                              id="wheelPathTeam1"
                              className="ml-WheelChart_TeamOnePath"
                              stroke-width="5"
                              d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z"
                              stroke={kitColors.home}
                              style={{ stroke: kitColors.home }}
                            ></path>
                            <path
                              id="wheelShadow"
                              className="ml-WheelChart_WheelShadow"
                              stroke-width="5"
                              d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z"
                              stroke="#404040"
                              transform="rotate(12.716363724571593 16 16)"
                              style={{
                                strokeDasharray: "75.3613px, 75.3613px",
                                strokeDashoffset: "32.3566px",
                              }}
                            ></path>
                            <path
                              id="wheelPathTeam2"
                              className="ml-WheelChart_TeamTwoPath"
                              stroke-width="5"
                              d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z"
                              stroke={kitColors.away}
                              transform="rotate(7.939373980346403 16 16)"
                              style={{
                                stroke: kitColors.away,
                                strokeDasharray: "75.3613px, 75.3613px",
                                strokeDashoffset: "34.3566px",
                              }}
                            ></path>
                          </g>
                        </svg>
                      </div>
                      <div className="text-ellipsis overflow-hidden whitespace-nowrap text-[15px] font-bold leading-8 text-[#ddd] flex items-center flex-[1_1_50%] pl-[5px]">
                        <div className="text-white">
                          <div>
                            {_points_won_on_serve ? _points_won_on_serve[2] : 0}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab == "Summary" && (
            <div
              className={`flex-auto flex items-stretch w-full mx-auto my-0 ${
                activeTab == "Summary" ? "block" : "hidden"
              }`}
            >
              <div className="block max-w-none flex-auto w-full mx-auto my-0">
                {data.extra &&
                  Object.values(data?.extra).map((_extra: any, index) => (
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
      {/* </div> */}
    </div>
  );
};

export default BottomBorderComponent;
