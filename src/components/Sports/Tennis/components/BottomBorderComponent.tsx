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
    if (
      data[key].name.startsWith("S") &&
      !isNaN(parseInt(data[key].name.slice(1)))
    ) {
      const setNumber = data[key].name.slice(1); // Extracting the number after "S"
      result[setNumber] = {
        home: data[key].home,
        away: data[key].away,
      };
    }
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
  //   const [stats, setStats] = useState(data?.stats);
  //   const [extra, setExtra] = useState(data?.extra);

  //   useLayoutEffect(() => {
  //     setExtra(data.extra);
  //   }, [data.extra]);

  //   useLayoutEffect(() => {
  //     setStats(data.stats);
  //   }, [data.stats]);

  console.log("rendering");
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
  let _aces_regx = /Aces=(\d+):(\d+)/;
  let _double_faults_regx = /Double Faults=(\d+):(\d+)/;
  let _win_percent_1st_regx = /Win % 1st Serve=(\d+):(\d+)/;
  let _break_point_conversions_regx = /Break Point Conversions=(\d+):(\d+)/;

  let _aces: any = null,
    _double_faults: any = null,
    _win_percent_1st: any = null,
    _break_point_conversions: any = null;

  status.forEach((state: string) => {
    if (_aces == null) _aces = state.match(_aces_regx);
    if (_double_faults == null)
      _double_faults = state.match(_double_faults_regx);
    if (_win_percent_1st == null)
      _win_percent_1st = state.match(_win_percent_1st_regx);
    if (_break_point_conversions == null)
      _break_point_conversions = state.match(_break_point_conversions_regx);
  });

  var sets_details = extractSets(data?.stats);
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
      {/* Conditionally Render Content */}
      <div className={activeTab == "Stats" ? "block" : "hidden"}>
        {/* Content for Stats */}
        <div className="block max-w-none">
          <div className="flex items-center w-full leading-6 max-w-[440px] mx-auto my-5 px-2.5 px-5 py-0">
            <div className="leading-6 flex-1">
              <div className="inline-flex flex-col overflow-hidden whitespace-nowrap text-[13px] text-[#e4e4e4] font-bold">
                <div className="text-[11px]"></div>
                <div className="flex">
                  <div className="h-[5px] w-[5px] bg-[#4f4f4f] inline-flex relative self-center flex-[0_0_5px] mr-1.5 rounded-[50%] -top-px"></div>
                  <div className="text-ellipsis overflow-hidden whitespace-nowrap text-[color:var(--color-grey8)]">
                    {data?.team_info?.home?.name}
                  </div>
                </div>
                <div className="inline-flex flex-1 flex-col overflow-hidden whitespace-nowrap text-[13px] text-[#e4e4e4] font-bold">
                  <div className="text-[11px]"></div>
                  <div className="flex">
                    <div className="h-[5px] w-[5px] bg-[#4f4f4f] inline-flex relative self-center flex-[0_0_5px] mr-1.5 rounded-[50%] -top-px"></div>
                    <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                      {data?.team_info?.away?.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="leading-6">
              <div className="flex text-[13px]">
                <div className="min-w-[30px] text-center leading-6 flex-col font-bold text-[color(display-p3_1_0.875_0.106)] ml-[5px]">
                  <div className="font-normal text-[11px] text-[#ccc] leading-4 pb-0.5">
                    Sets
                  </div>
                  <div>{set_scores[0]}</div>
                  <div>{set_scores[1]}</div>
                </div>
              </div>
            </div>
            {Object.keys(sets_details).map((key) => (
              <div key={key} className="leading-6">
                <div className="flex text-[13px]">
                  <div className="min-w-[30px] text-center leading-6 flex-col font-bold text-[#ccc] ml-[5px]">
                    <div className="font-normal text-[11px] text-[#ccc] leading-4 pb-0.5">
                      {key}
                    </div>
                    <div>{sets_details[key].home}</div>
                    <div>{sets_details[key].away}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* statistics start */}

        <div className="max-w-[440px] mx-auto my-5 px-5 py-0">
          <div className="flex w-full items-start">
            <div className="px-[7px] w-3/12 text-center flex-[0_0_auto] flex-col px-[5px] py-0">
              <div className="text-[15px] leading-[18px] text-[#ddd] font-bold">
                {_aces ? _aces[1] : "0"}
              </div>
              <div className="text-[rgb(154,190,255)]">
                <div className="block w-9 h-0.5 bg-current mt-1 mb-[5px] mx-auto rounded-sm"></div>
              </div>
              <div className="overflow-hidden leading-[13px] max-h-[calc(13px_*_2)] text-[11px] text-[#ddd]">
                Aces
              </div>
            </div>
            <div className="flex flex-col items-center mx-auto px-[15px] py-0 w-full">
              <div className="flex w-full">
                <div className="pr-[2.5px] flex-[0_0_auto] w-6/12">
                  <div className="text-center font-bold text-[13px] leading-[15px] text-[#ddd] text-[15px] leading-[18px]">
                    {_win_percent_1st ? _win_percent_1st[1] : "0"}%
                  </div>
                  <div className="text-[rgb(102,102,102)] block w-full h-0.5 bg-current mt-1 mb-[5px] mx-auto rounded-sm mx-0 my-1 rounded-[2px_0_0_2px]">
                    <div className="text-[rgb(154,190,255)]">
                      <div
                        className="block h-0.5 bg-current mt-1 mb-[5px] rounded-sm ml-auto"
                        style={{
                          width: `${
                            _win_percent_1st ? _win_percent_1st[1] : "0"
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="pl-[2.5px] flex-[0_0_auto] w-6/12">
                  <div className="text-center font-bold text-[13px] leading-[15px] text-[#ddd] text-[15px] leading-[18px]">
                    {_win_percent_1st ? _win_percent_1st[2] : "0"}%
                  </div>
                  <div className="text-[rgb(102,102,102)] block w-full h-0.5 bg-current mt-1 mb-[5px] mx-auto rounded-sm mx-0 my-1 rounded-[2px_0_0_2px]">
                    <div className="text-[#fff]">
                      <div
                        className="block h-0.5 bg-current mt-1 mb-[5px] rounded-sm "
                        style={{
                          width: `${
                            _win_percent_1st ? _win_percent_1st[2] : "0"
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden leading-[13px] max-h-[calc(13px_*_2)] flex-[0_0_auto] text-center text-[11px] text-[#ddd]">
                Win % 1st serve
              </div>
            </div>
            <div className="px-[7px] w-3/12 text-center flex-[0_0_auto] flex-col px-[5px] py-0">
              <div className="text-[15px] leading-[18px] text-[#ddd] font-bold">
                {_aces ? _aces[2] ?? 0 : "0"}
              </div>
              <div className="text-[#fff]">
                <div className="block w-9 h-0.5 bg-current mt-1 mb-[5px] mx-auto rounded-sm"></div>
              </div>
              <div className="overflow-hidden leading-[13px] max-h-[calc(13px_*_2)] text-[11px] text-[#ddd]">
                Aces
              </div>
            </div>
          </div>
          <div className="flex w-full items-start pt-5"></div>
        </div>
        <div className="max-w-[440px] mx-auto my-5 px-5 py-0">
          <div className="flex w-full items-start">
            <div className="px-[7px] w-3/12 text-center flex-[0_0_auto] flex-col px-[5px] py-0">
              <div className="text-[15px] leading-[18px] text-[#ddd] font-bold">
                {_double_faults ? _double_faults[1] : "0"}
              </div>
              <div className="text-[rgb(154,190,255)]">
                <div className="block w-9 h-0.5 bg-current mt-1 mb-[5px] mx-auto rounded-sm"></div>
              </div>
              <div className="overflow-hidden leading-[13px] max-h-[calc(13px_*_2)] text-[11px] text-[#ddd]">
                Double Faults
              </div>
            </div>

            <div className="flex flex-col items-center mx-auto px-[15px] py-0 w-full">
              <div className="flex w-full">
                <div className="pr-[2.5px] flex-[0_0_auto] w-6/12">
                  <div className="text-center font-bold text-[13px] leading-[15px] text-[#ddd] text-[15px] leading-[18px]">
                    {_break_point_conversions
                      ? _break_point_conversions[1]
                      : "0"}
                    %
                  </div>
                  <div className="text-[rgb(102,102,102)] block w-full h-0.5 bg-current mt-1 mb-[5px] mx-auto rounded-sm mx-0 my-1 rounded-[2px_0_0_2px]">
                    <div className="text-[rgb(154,190,255)]">
                      <div
                        className="block h-0.5 bg-current mt-1 mb-[5px] rounded-sm ml-auto"
                        style={{
                          width: `${
                            _break_point_conversions
                              ? _break_point_conversions[1]
                              : "0"
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="pl-[2.5px] flex-[0_0_auto] w-6/12">
                  <div className="text-center font-bold text-[13px] leading-[15px] text-[#ddd] text-[15px] leading-[18px]">
                    {_break_point_conversions
                      ? _break_point_conversions[2]
                      : "0"}
                    %
                  </div>
                  <div className="text-[rgb(102,102,102)] block w-full h-0.5 bg-current mt-1 mb-[5px] mx-auto rounded-sm mx-0 my-1 rounded-[2px_0_0_2px]">
                    <div className="text-[#fff]">
                      <div
                        className="block h-0.5 bg-current mt-1 mb-[5px] rounded-sm "
                        style={{
                          width: `${
                            _break_point_conversions
                              ? _break_point_conversions[2]
                              : "0"
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden leading-[13px] max-h-[calc(13px_*_2)] flex-[0_0_auto] text-center text-[11px] text-[#ddd]">
                Win % 1st serve
              </div>
            </div>
            <div className="px-[7px] w-3/12 text-center flex-[0_0_auto] flex-col px-[5px] py-0">
              <div className="text-[15px] leading-[18px] text-[#ddd] font-bold">
                {_double_faults ? _double_faults[2] ?? 0 : "0"}
              </div>
              <div className="text-[#fff]">
                <div className="block w-9 h-0.5 bg-current mt-1 mb-[5px] mx-auto rounded-sm"></div>
              </div>
              <div className="overflow-hidden leading-[13px] max-h-[calc(13px_*_2)] text-[11px] text-[#ddd]">
                Double Faults
              </div>
            </div>
          </div>
          <div className="flex w-full items-start pt-5"></div>
        </div>
        {/* statistics end */}
      </div>
      <div
        className={`flex-auto flex items-stretch w-full mx-auto my-0 max-h-[calc(100vh_-_500px)] overflow-y-scroll ${
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
    </div>
  );
};

export default BottomBorderComponent;
