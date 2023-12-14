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
  console.log("----basketball string----", data);

  var countSets = countSetWins(score_string);
  if (countSets === undefined) {
    return <div></div>;
  }

  set_scores = [countSets.player1, countSets.player2];
  const sts = data?.sts;
  console.log({ sts: sts });
  const status = sts?.split("|") ?? [];
  let _on_target_regx = /On Target=(\d+):(\d+)/;
  let _off_target_regx = /Off Target=(\d+):(\d+)/;
  let _attacks_regx = /Attacks=(\d+):(\d+)/;
  let _dangerous_attacks_regx = /Dangerous Attacks=(\d+):(\d+)/;
  let _possession_regx = /Possession %=(\d+):(\d+)/;

  let _off_target: any = null,
    _attacks: any = null,
    _dangerous_attacks: any = null,
    _possession: any = null,
    _on_target: any = null;

  status.forEach((state: string) => {
    if (_off_target == null) _off_target = state.match(_off_target_regx);
    if (_attacks == null) _attacks = state.match(_attacks_regx);
    if (_dangerous_attacks == null)
      _dangerous_attacks = state.match(_dangerous_attacks_regx);
    if (_possession == null) _possession = state.match(_possession_regx);
    if (_on_target == null) _on_target = state.match(_on_target_regx);
  });

  var sets_details = extractSets(data?.stats);
  console.log("-----sets_details-----", sets_details);
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

      <div className="flex-auto flex items-stretch w-full mx-auto my-0 max-h-[calc(100vh_-_500px)] overflow-y-scroll">
        <div className="block max-w-none flex-auto w-full mx-auto my-0">
          {activeTab == "Stats" && (
            <div className="w-full overflow-hidden">
              <div
                className="flex overflow-x-auto overflow-y-hidden snap-start justify-start"
                style={{
                  scrollSnapType: "x mandatory",
                }}
              >
                <div className="snap-start relative flex-[1_0_100%] snap-always">
                  <div className="overflow-y-auto overflow-x-hidden overscroll-auto max-w-[400px] w-full transition-[height] duration-[0.35s] ease-[ease]">
                    <div className="flex w-full justify-center">
                      <div className="max-w-[440px] h-full flex items-start justify-center text-center w-full pt-0 pb-[50px] px-0">
                        <div className="gap-[15px] flex flex-col w-full h-full">
                          <div className="flex-nowrap flex justify-center items-center pt-2.5 pb-0 px-0">
                            <div className="justify-end flex-[1_1_50%] flex items-center">
                              <div className="justify-end flex gap-1 relative mt-0.5">
                                <div
                                  className="h-[9px] w-[9px] shrink-0 rounded-[9px]"
                                  style={{
                                    background: kitColors.home,
                                  }}
                                ></div>
                              </div>
                              <div className="text-base leading-[19px] text-[#ccc] font-bold w-[45px] text-center">
                                0.97
                              </div>
                            </div>
                            <div className="text-[11px] leading-[13px] text-[#a7a7a7] w-10 text-center">
                              xG
                            </div>
                            <div className="justify-start flex-[1_1_50%] flex items-center">
                              <div className="text-base leading-[19px] text-[#ccc] font-bold w-[45px] text-center">
                                0.52
                              </div>
                              <div className="flex justify-start gap-1 relative mt-0.5">
                                <div
                                  className="h-[9px] w-[9px] shrink-0 rounded-[9px]"
                                  style={{
                                    background: kitColors.away,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="inline-flex w-full justify-center items-end pt-[9px]">
                            <div className="flex flex-col flex-[1_1_0px]">
                              <div
                                className="overflow-hidden leading-[13px] max-h-[calc(13px_*_2)] text-center text-[11px] text-[#ccc]"
                                style={
                                  {
                                    display: "-webkit-box",
                                    "-webkit-box-orient": "vertical",
                                    "-webkit-line-clamp": 2,
                                    "word-break": "break-word",
                                    "word-wrap": "break-word",
                                  } as React.CSSProperties
                                }
                              >
                                Attacks
                              </div>
                              <div className="w-full flex justify-center gap-1 mt-[7px]">
                                <div className="justify-end text-ellipsis overflow-hidden whitespace-nowrap text-sm font-bold leading-4 text-[#ccc] flex items-center flex-[1_1_50%]">
                                  {_attacks ? _attacks[1] : 0}
                                </div>
                                <div className="flex-[0_0_auto] relative">
                                  <div
                                    className="bg-[#ccc] block w-[34px] h-[34px] absolute"
                                    style={
                                      {
                                        "--mixin-svg-inlined": `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23545454' fill-rule='nonzero'%3E%3Cpath d='M9.142 6.064a.5.5 0 0 1 .64.013l.063.065 3.636 4.546a.5.5 0 0 1-.718.69l-.063-.066-3.636-4.545a.5.5 0 0 1 .078-.703z'/%3E%3Cpath d='M12.7 10.688a.5.5 0 0 1 .831.55l-.05.074-3.636 4.546a.5.5 0 0 1-.83-.55l.05-.075 3.635-4.545z'/%3E%3C/g%3E%3Cpath d='M0 0h22v22H0z'/%3E%3C/g%3E%3C/svg%3E")`,
                                        "mask-image":
                                          "var(--mixin-svg-inlined)",
                                        "mask-position": "center",
                                        "mask-repeat": "no-repeat",
                                      } as React.CSSProperties
                                    }
                                  ></div>
                                  <svg
                                    className="ml-WheelChartAdvanced_Svg"
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
                                        className="ml1-WheelChartAdvanced_TeamOnePath"
                                        stroke-width="3.9"
                                        d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z"
                                        stroke={kitColors.home}
                                      ></path>
                                      <path
                                        id="wheelShadow"
                                        className="ml1-WheelChartAdvanced_WheelShadow"
                                        stroke-width="4"
                                        d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z"
                                        stroke="#404040"
                                        transform="rotate(-6.611505127887398 16 16)"
                                        style={{
                                          strokeDasharray:
                                            "75.3613px, 75.3613px",
                                          strokeDashoffset: "40.4487px",
                                        }}
                                      ></path>
                                      <path
                                        id="wheelPathTeam2"
                                        className="ml1-WheelChartAdvanced_TeamTwoPath"
                                        stroke-width="4"
                                        d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z"
                                        stroke={kitColors.away}
                                        transform="rotate(-11.388494872112616 16 16)"
                                        style={{
                                          stroke: kitColors.away,
                                          strokeDasharray:
                                            "75.3613px, 75.3613px",
                                          strokeDashoffset: "42.4487px",
                                        }}
                                      ></path>
                                    </g>
                                  </svg>
                                </div>
                                <div className="text-ellipsis overflow-hidden whitespace-nowrap text-sm font-bold leading-4 text-[#ccc] flex items-center flex-[1_1_50%]">
                                  {_attacks ? _attacks[2] : 0}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col flex-[1_1_0px]">
                              <div
                                className="overflow-hidden leading-[13px] max-h-[calc(13px_*_2)] text-center text-[11px] text-[#ccc]"
                                style={
                                  {
                                    display: "-webkit-box",
                                    "-webkit-box-orient": "vertical",
                                    "-webkit-line-clamp": 2,
                                    "word-break": "break-word",
                                    "word-wrap": "break-word",
                                  } as React.CSSProperties
                                }
                              >
                                Dangerous Attacks
                              </div>
                              <div className="w-full flex justify-center gap-1 mt-[7px]">
                                <div className="justify-end text-ellipsis overflow-hidden whitespace-nowrap text-sm font-bold leading-4 text-[#ccc] flex items-center flex-[1_1_50%]">
                                  {_dangerous_attacks
                                    ? _dangerous_attacks[1]
                                    : 0}
                                </div>
                                <div className="flex-[0_0_auto] relative">
                                  <div
                                    className="bg-[#ccc] block w-[34px] h-[34px] absolute"
                                    style={
                                      {
                                        "--mixin-svg-inlined": `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill-rule='nonzero'%3E%3Cg fill='%23838383'%3E%3Cpath d='M8.87 6.064a.5.5 0 0 1 .64.013l.062.065 3.636 4.546a.5.5 0 0 1-.718.69l-.063-.066-3.636-4.545a.5.5 0 0 1 .078-.703z'/%3E%3Cpath d='M12.427 10.688a.5.5 0 0 1 .831.55l-.05.074-3.636 4.546a.5.5 0 0 1-.83-.55l.05-.075 3.635-4.545z'/%3E%3C/g%3E%3Cg fill='%23545454'%3E%3Cpath d='M11.602 6.064a.5.5 0 0 1 .64.013l.063.065 3.636 4.546a.5.5 0 0 1-.718.69l-.063-.066-3.636-4.545a.5.5 0 0 1 .078-.703z'/%3E%3Cpath d='M15.16 10.688a.5.5 0 0 1 .831.55l-.05.074-3.636 4.546a.5.5 0 0 1-.83-.55l.05-.075 3.635-4.545z'/%3E%3C/g%3E%3Cg fill='%23B2B2B2'%3E%3Cpath d='M6.142 6.064a.5.5 0 0 1 .64.013l.063.065 3.636 4.546a.5.5 0 0 1-.718.69l-.063-.066-3.636-4.545a.5.5 0 0 1 .078-.703z'/%3E%3Cpath d='M9.7 10.688a.5.5 0 0 1 .831.55l-.05.074-3.636 4.546a.5.5 0 0 1-.83-.55l.05-.075L9.7 10.688z'/%3E%3C/g%3E%3C/g%3E%3Cpath d='M0 0h22v22H0z'/%3E%3C/g%3E%3C/svg%3E")`,
                                        "mask-image": `var(--mixin-svg-inlined)`,
                                        "mask-position": `center`,
                                        "mask-repeat": `no-repeat`,
                                      } as React.CSSProperties
                                    }
                                  ></div>
                                  <svg
                                    className="ml-WheelChartAdvanced_Svg"
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
                                        className="ml1-WheelChartAdvanced_TeamOnePath"
                                        stroke-width="3.9"
                                        d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z"
                                        stroke={kitColors.home}
                                        style={{
                                          stroke: kitColors.home,
                                        }}
                                      ></path>
                                      <path
                                        id="wheelShadow"
                                        className="ml1-WheelChartAdvanced_WheelShadow"
                                        stroke-width="4"
                                        d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z"
                                        stroke="#404040"
                                        transform="rotate(-1.7653512817335297 16 16)"
                                        style={{
                                          strokeDasharray:
                                            "75.3613px, 75.3613px",
                                          strokeDashoffset: "38.4197px",
                                        }}
                                      ></path>
                                      <path
                                        id="wheelPathTeam2"
                                        className="ml1-WheelChartAdvanced_TeamTwoPath"
                                        stroke-width="4"
                                        d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z"
                                        stroke={kitColors.away}
                                        transform="rotate(-6.5423410259587484 16 16)"
                                        style={{
                                          stroke: kitColors.away,
                                          strokeDasharray:
                                            "75.3613px, 75.3613px",
                                          strokeDashoffset: "40.4197px",
                                        }}
                                      ></path>
                                    </g>
                                  </svg>
                                </div>
                                <div className="text-ellipsis overflow-hidden whitespace-nowrap text-sm font-bold leading-4 text-[#ccc] flex items-center flex-[1_1_50%]">
                                  {_dangerous_attacks
                                    ? _dangerous_attacks[2]
                                    : 0}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col flex-[1_1_0px]">
                              <div
                                className="overflow-hidden leading-[13px] max-h-[calc(13px_*_2)] text-center text-[11px] text-[#ccc]"
                                style={
                                  {
                                    display: "-webkit-box",
                                    "-webkit-box-orient": "vertical",
                                    "-webkit-line-clamp": 2,
                                    "word-break": "break-word",
                                    "word-wrap": "break-word",
                                  } as React.CSSProperties
                                }
                              >
                                Possession %
                              </div>
                              <div className="w-full flex justify-center gap-1 mt-[7px]">
                                <div className="justify-end text-ellipsis overflow-hidden whitespace-nowrap text-sm font-bold leading-4 text-[#ccc] flex items-center flex-[1_1_50%]">
                                  {_possession ? _possession[1] : 0}
                                </div>
                                <div className="flex-[0_0_auto] relative">
                                  <div
                                    className="bg-[#ccc] block w-[34px] h-[34px] absolute"
                                    style={
                                      {
                                        "--mixin-svg-inlined": `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23666' fill-rule='nonzero' d='M14.5 13a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm0 1a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zm-7-8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm0 1a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z'/%3E%3Cpath fill='%23666' d='M14.5 6H16L7.5 16H6z'/%3E%3Cpath d='M0 0h22v22H0z'/%3E%3C/g%3E%3C/svg%3E")`,
                                        "mask-position": `center`,
                                        "mask-image": `var(--mixin-svg-inlined)`,
                                        "mask-repeat": `no-repeat`,
                                      } as React.CSSProperties
                                    }
                                  ></div>
                                  <svg
                                    className="ml-WheelChartAdvanced_Svg"
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
                                        className="ml1-WheelChartAdvanced_TeamOnePath"
                                        stroke-width="3.9"
                                        d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z"
                                        stroke={kitColors.home}
                                        style={{ stroke: kitColors.home }}
                                      ></path>
                                      <path
                                        id="wheelShadow"
                                        className="ml1-WheelChartAdvanced_WheelShadow"
                                        stroke-width="4"
                                        d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z"
                                        stroke="#404040"
                                        transform="rotate(2.3884948721126023 16 16)"
                                        style={{
                                          strokeDasharray:
                                            "75.3613px, 75.3613px",
                                          strokeDashoffset: "36.6806px",
                                        }}
                                      ></path>
                                      <path
                                        id="wheelPathTeam2"
                                        className="ml1-WheelChartAdvanced_TeamTwoPath"
                                        stroke-width="4"
                                        d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z"
                                        stroke={kitColors.away}
                                        transform="rotate(-2.3884948721126023 16 16)"
                                        style={{
                                          stroke: kitColors.away,
                                          strokeDasharray:
                                            "75.3613px, 75.3613px",
                                          strokeDashoffset: "38.6806px",
                                        }}
                                      ></path>
                                    </g>
                                  </svg>
                                </div>
                                <div className="text-ellipsis overflow-hidden whitespace-nowrap text-sm font-bold leading-4 text-[#ccc] flex items-center flex-[1_1_50%]">
                                  {_possession ? _possession[2] : 0}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center items-center pt-1">
                            <div className="gap-[5px] flex flex-[1_1_25%] items-center justify-center">
                              <div className="flex flex-col items-center w-5 flex-[0_0_auto]">
                                <div
                                  className={`w-5 h-5 flex items-center justify-center`}
                                >
                                  <div
                                    className="block w-5 h-[13px]"
                                    style={{
                                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='10' height='13' viewBox='0 0 10 13'%3E%3Cdefs%3E%3Cpath id='a' d='M0 .1c2.2 1.298 5.2 2.3 9 3.006-3.884 2.37-6.884 3.372-9 3.007V.1z'/%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg transform='translate(1 .5)'%3E%3Cpath fill='%23E83838' fill-rule='nonzero' d='M0 .1c2.2 1.298 5.2 2.3 9 3.006-3.884 2.37-6.884 3.372-9 3.007V.1z'/%3E%3Cmask id='b' fill='%23fff'%3E%3Cuse xlink:href='%23a'/%3E%3C/mask%3E%3Cpath fill='%23000' fill-rule='nonzero' d='M0 .1C.464.02 2.21.093 2.671.1c1.825 2.112-2.504 1.552-1.4 6.006-.337.95-.813.362-1.271.007V.1z' mask='url(%23b)' opacity='.2'/%3E%3C/g%3E%3Cpath fill='%23A7A7A7' fill-rule='nonzero' d='M0 .142a.953.953 0 0 1 1 0v12.734c-.267.152-.747.178-1 0V.142z'/%3E%3C/g%3E%3C/svg%3E")`,
                                      backgroundRepeat: "no-repeat",
                                      backgroundPosition: "8px",
                                      backgroundSize: "10px 13px",
                                    }}
                                  ></div>
                                </div>
                                <div className="text-[13px] font-bold leading-[15px] text-[#ccc] text-center w-5">
                                  {sets_details?.ICorner?.home ?? 0}
                                </div>
                              </div>
                              <div className="w-5 flex-[0_0_auto]">
                                <div
                                  className={`w-5 h-5 flex items-center justify-center`}
                                >
                                  <div
                                    style={{
                                      display: "block",
                                      width: "7px",
                                      height: "10px",
                                      background: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='9' height='13' viewBox='0 0 9 13' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3ERectangle 112%3C/title%3E%3Crect x='143' y='565' width='9' height='13' rx='1' transform='translate(-143 -565)' fill='%23E83838' fill-rule='evenodd'/%3E%3C/svg%3E") 50% no-repeat`,
                                      backgroundSize: "contain",
                                    }}
                                  ></div>
                                </div>
                                <div className="text-[13px] font-bold leading-[15px] text-[#ccc] text-center w-5">
                                  {sets_details?.IRedCard?.home ?? 0}
                                </div>
                              </div>
                              <div className="w-5 flex-[0_0_auto]">
                                <div
                                  className={`w-5 h-5 flex items-center justify-center`}
                                >
                                  <div
                                    style={{
                                      display: "block",
                                      width: "7px",
                                      height: "10px",
                                      background: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='9' height='13' viewBox='0 0 9 13' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3ERectangle 112%3C/title%3E%3Crect x='143' y='565' width='9' height='13' rx='1' transform='translate(-143 -565)' fill='%23E4D539' fill-rule='evenodd'/%3E%3C/svg%3E") 50% no-repeat`,
                                      backgroundSize: "contain",
                                    }}
                                  ></div>
                                </div>
                                <div className="text-[13px] font-bold leading-[15px] text-[#ccc] text-center w-5">
                                  {sets_details?.IYellowCard?.home ?? 0}
                                </div>
                              </div>
                            </div>
                            <div className="flex-[1_1_50%]">
                              <div className="text-[#ccc] text-[11px] leading-[13px] font-normal text-center mb-px">
                                Shots / On Target
                              </div>
                              <div className="flex justify-center items-center gap-[3px]">
                                <div className="justify-end flex flex-nowrap shrink-0 w-[30px] ml-0 mr-[5px] my-0">
                                  <div className="text-[13px] font-bold leading-[15px] text-[#ccc] flex-[0_0_auto]">
                                    {_on_target && _off_target
                                      ? Number(_on_target[1]) +
                                        Number(_off_target[1])
                                      : 0}
                                  </div>
                                  <div className="text-[#a7a7a7] font-normal text-[13px] leading-[15px] mx-[0.6px] my-0">
                                    /
                                  </div>
                                  <div className="text-[13px] font-bold leading-[15px] text-[#ccc] flex-[0_0_auto]">
                                    {_on_target ? _on_target[1] : 0}
                                  </div>
                                </div>
                                <div className="w-full flex flex-col gap-[5px] pt-1.5">
                                  <div className="bg-transparent flex-[1_1_100%] flex gap-px rounded-sm">
                                    <div
                                      className={`basis-[35.7143%] bg-current h-[3px] block w-6/12 rounded-[3px_0_0_3px]`}
                                      style={{
                                        color: kitColors.home,
                                      }}
                                    ></div>
                                    <div
                                      className="basis-[64.2857%] bg-current h-[3px] block w-6/12 rounded-[0_3px_3px_0]"
                                      style={{
                                        color: kitColors.away,
                                      }}
                                    ></div>
                                  </div>
                                  <div className="w-[57.1429%] h-[3px] bg-transparent flex-[1_1_100%] flex gap-px ml-[21.4286%] rounded-sm">
                                    <div
                                      className="basis-[25%] bg-current h-[3px] block w-6/12 rounded-[3px_0_0_3px]"
                                      style={{
                                        color: kitColors.home,
                                      }}
                                    ></div>
                                    <div
                                      className="basis-[75%] bg-current h-[3px] block w-6/12 rounded-[0_3px_3px_0]"
                                      style={{
                                        color: kitColors.away,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="justify-start flex flex-nowrap shrink-0 w-[30px] ml-[5px] mr-0 my-0">
                                  <div className="text-[13px] font-bold leading-[15px] text-[#ccc] flex-[0_0_auto]">
                                    {_on_target && _off_target
                                      ? Number(_on_target[2]) +
                                        Number(_off_target[2])
                                      : 0}
                                  </div>
                                  <div className="text-[#a7a7a7] font-normal text-[13px] leading-[15px] mx-[0.6px] my-0">
                                    /
                                  </div>
                                  <div className="text-[13px] font-bold leading-[15px] text-[#ccc] flex-[0_0_auto]">
                                    {_on_target ? _on_target[2] : 0}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex-row-reverse gap-[5px] flex flex-[1_1_25%] items-center justify-center">
                              <div className="flex flex-col items-center w-5 flex-[0_0_auto]">
                                <div
                                  className={`w-5 h-5 flex items-center justify-center`}
                                >
                                  <div
                                    className="block w-5 h-[13px]"
                                    style={{
                                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='10' height='13' viewBox='0 0 10 13'%3E%3Cdefs%3E%3Cpath id='a' d='M0 .1c2.2 1.298 5.2 2.3 9 3.006-3.884 2.37-6.884 3.372-9 3.007V.1z'/%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg transform='translate(1 .5)'%3E%3Cpath fill='%23E83838' fill-rule='nonzero' d='M0 .1c2.2 1.298 5.2 2.3 9 3.006-3.884 2.37-6.884 3.372-9 3.007V.1z'/%3E%3Cmask id='b' fill='%23fff'%3E%3Cuse xlink:href='%23a'/%3E%3C/mask%3E%3Cpath fill='%23000' fill-rule='nonzero' d='M0 .1C.464.02 2.21.093 2.671.1c1.825 2.112-2.504 1.552-1.4 6.006-.337.95-.813.362-1.271.007V.1z' mask='url(%23b)' opacity='.2'/%3E%3C/g%3E%3Cpath fill='%23A7A7A7' fill-rule='nonzero' d='M0 .142a.953.953 0 0 1 1 0v12.734c-.267.152-.747.178-1 0V.142z'/%3E%3C/g%3E%3C/svg%3E")`,
                                      backgroundRepeat: "no-repeat",
                                      backgroundPosition: "8px",
                                      backgroundSize: "10px 13px",
                                    }}
                                  ></div>
                                </div>
                                <div className="text-[13px] font-bold leading-[15px] text-[#ccc] text-center w-5">
                                  {sets_details?.ICorner?.away ?? 0}
                                </div>
                              </div>
                              <div className="w-5 flex-[0_0_auto]">
                                <div
                                  className={`w-5 h-5 flex items-center justify-center`}
                                >
                                  <div
                                    style={{
                                      display: "block",
                                      width: "7px",
                                      height: "10px",
                                      background: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='9' height='13' viewBox='0 0 9 13' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3ERectangle 112%3C/title%3E%3Crect x='143' y='565' width='9' height='13' rx='1' transform='translate(-143 -565)' fill='%23E83838' fill-rule='evenodd'/%3E%3C/svg%3E") 50% no-repeat`,
                                      backgroundSize: "contain",
                                    }}
                                  ></div>
                                </div>
                                <div className="text-[13px] font-bold leading-[15px] text-[#ccc] text-center w-5">
                                  {sets_details?.IRedCard?.away ?? 0}
                                </div>
                              </div>
                              <div className="w-5 flex-[0_0_auto]">
                                <div
                                  className={`w-5 h-5 flex items-center justify-center`}
                                >
                                  <div
                                    style={{
                                      display: "block",
                                      width: "7px",
                                      height: "10px",
                                      background: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='9' height='13' viewBox='0 0 9 13' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3ERectangle 112%3C/title%3E%3Crect x='143' y='565' width='9' height='13' rx='1' transform='translate(-143 -565)' fill='%23E4D539' fill-rule='evenodd'/%3E%3C/svg%3E") 50% no-repeat`,
                                      backgroundSize: "contain",
                                    }}
                                  ></div>
                                </div>
                                <div className="text-[13px] font-bold leading-[15px] text-[#ccc] text-center w-5">
                                  {sets_details?.IYellowCard?.away ?? 0}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-full pt-0 pb-[5px] px-2.5">
                            <div className="flex flex-col mb-2.5">
                              <div className="w-full text-[11px] leading-[13px] text-[#ccc] text-center mb-px">
                                Key Passes
                              </div>
                              <div className="flex gap-px">
                                <div className="justify-end flex flex-[0_1_50%]">
                                  <div className="text-right text-[13px] leading-[15px] text-[#ccc] font-bold w-[50px] mr-2.5">
                                    5
                                  </div>
                                  <div
                                    className="basis-[62.5%] flex-[0_1_100%] h-[3px] mt-[5px] rounded-[3px_0_0_3px]"
                                    style={{
                                      background: kitColors.home,
                                    }}
                                  ></div>
                                </div>
                                <div className="flex flex-[0_1_50%] justify-end">
                                  <div
                                    className="basis-full flex-[0_1_100%] h-[3px] mt-[5px] rounded-[0_3px_3px_0]"
                                    style={{
                                      background: kitColors.away,
                                    }}
                                  ></div>
                                  <div className="text-left text-[13px] leading-[15px] text-[#ccc] font-bold w-[50px] ml-2.5">
                                    8
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col mb-2.5">
                              <div className="w-full text-[11px] leading-[13px] text-[#ccc] text-center mb-px">
                                Goalkeeper Saves
                              </div>
                              <div className="flex gap-px">
                                <div className="flex flex-[0_1_50%] justify-end">
                                  <div className="text-right text-[13px] leading-[15px] text-[#ccc] font-bold w-[50px] mr-2.5">
                                    5
                                  </div>
                                  <div
                                    className="basis-[62.5%] flex-[0_1_100%] h-[3px] mt-[5px] rounded-[3px_0_0_3px]"
                                    style={{
                                      background: kitColors.home,
                                    }}
                                  ></div>
                                </div>
                                <div className="justify-start flex flex-[0_1_50%]">
                                  <div
                                    className="basis-full flex-[0_1_100%] h-[3px] mt-[5px] rounded-[0_3px_3px_0]"
                                    style={{
                                      background: kitColors.away,
                                    }}
                                  ></div>
                                  <div className="text-left text-[13px] leading-[15px] text-[#ccc] font-bold w-[50px] ml-2.5">
                                    2
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col mb-2.5">
                              <div className="w-full text-[11px] leading-[13px] text-[#ccc] text-center mb-px">
                                Passing Accuracy
                              </div>
                              <div className="flex gap-px">
                                <div className="justify-end flex flex-[0_1_50%]">
                                  <div className="text-right text-[13px] leading-[15px] text-[#ccc] font-bold w-[50px] mr-2.5">
                                    77%
                                  </div>
                                  <div
                                    className="basis-[62.5%] flex-[0_1_100%] h-[3px] mt-[5px] rounded-[3px_0_0_3px]"
                                    style={{
                                      background: kitColors.home,
                                    }}
                                  ></div>
                                </div>
                                <div className="flex flex-[0_1_50%] justify-end">
                                  <div
                                    className="basis-full flex-[0_1_100%] h-[3px] mt-[5px] rounded-[0_3px_3px_0]"
                                    style={{
                                      background: kitColors.away,
                                    }}
                                  ></div>
                                  <div className="text-left text-[13px] leading-[15px] text-[#ccc] font-bold w-[50px] ml-2.5">
                                    79%
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col mb-2.5">
                              <div className="w-full text-[11px] leading-[13px] text-[#ccc] text-center mb-px">
                                Crosses
                              </div>
                              <div className="flex gap-px">
                                <div className="flex flex-[0_1_50%] justify-end">
                                  <div className="text-right text-[13px] leading-[15px] text-[#ccc] font-bold w-[50px] mr-2.5">
                                    9
                                  </div>
                                  <div
                                    className="basis-[62.5%] flex-[0_1_100%] h-[3px] mt-[5px] rounded-[3px_0_0_3px]"
                                    style={{
                                      background: kitColors.home,
                                    }}
                                  ></div>
                                </div>
                                <div className="justify-start flex flex-[0_1_50%]">
                                  <div
                                    className="basis-full flex-[0_1_100%] h-[3px] mt-[5px] rounded-[0_3px_3px_0]"
                                    style={{
                                      background: kitColors.away,
                                    }}
                                  ></div>
                                  <div className="text-left text-[13px] leading-[15px] text-[#ccc] font-bold w-[50px] ml-2.5">
                                    5
                                  </div>
                                </div>
                              </div>
                            </div>
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
