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
  let _2pts_regx = /2 Pts=(\d+):(\d+)/;
  let _3pts_regx = /3 Pts=(\d+):(\d+)/;
  let _ft_regx = /Ft=(\d+):(\d+)/;
  let _timeouts_regx = /Time Outs#T.O=(\d+):(\d+)/;
  let _fouls_regx = /Fouls=(\d+):(\d+)/;
  let _4pts_regx = /4 Pts=(\d+):(\d+)/;
  let _free_throws_regx = /Free Throws=(\d+):(\d+)/;

  let _3pts: any = null,
    _ft: any = null,
    _timeouts: any = null,
    _fouls: any = null,
    _4pts: any = null,
    _2pts: any = null,
    _free_throws: any = null;

  status.forEach((state: string) => {
    if (_3pts == null) _3pts = state.match(_3pts_regx);
    if (_ft == null) _ft = state.match(_ft_regx);
    if (_timeouts == null) _timeouts = state.match(_timeouts_regx);
    if (_fouls == null) _fouls = state.match(_fouls_regx);
    if (_4pts == null) _4pts = state.match(_4pts_regx);
    if (_2pts == null) _2pts = state.match(_2pts_regx);
    if (_free_throws == null) _free_throws = state.match(_free_throws_regx);
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
                        className={`relative w-[3px] h-3 shrink-0 top-1.5`}
                        style={{ background: kitColors.home }}
                      ></div>
                      <div className="text-white inline-block align-middle font-bold whitespace-nowrap overflow-hidden text-ellipsis ml-[5px]">
                        <span>{data?.team_info?.home?.name}</span>
                      </div>
                    </div>
                    <div className="leading-6 text-[13px] flex pr-2.5">
                      <div
                        className={`relative w-[3px] h-3 shrink-0 top-1.5`}
                        style={{ background: kitColors.away }}
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
                      {sets_details["1"].home ?? <>&nbsp;</>}
                    </div>
                    <div className="block text-center text-[13px] leading-6 text-[#e4e4e4] px-[5px] py-0">
                      {sets_details["1"].away ?? <>&nbsp;</>}
                    </div>
                  </div>
                  <div className="table-cell align-top">
                    <div className="text-[11px] whitespace-nowrap block text-center text-[#ccc] leading-4 px-[5px] py-0">
                      2
                    </div>
                    <div className="block text-center text-[13px] leading-6 text-[#e4e4e4] px-[5px] py-0">
                      {sets_details["2"].home ?? <>&nbsp;</>}
                    </div>
                    <div className="block text-center text-[13px] leading-6 text-[#e4e4e4] px-[5px] py-0">
                      {sets_details["2"].away ?? <>&nbsp;</>}
                    </div>
                  </div>
                  <div className="table-cell align-top">
                    <div className="text-[11px] whitespace-nowrap block text-center text-[#ccc] leading-4 px-[5px] py-0">
                      Half
                    </div>
                    <div className="block text-center text-[13px] leading-6 text-[#e4e4e4] px-[5px] py-0">
                      {sets_details["Half"].home ?? <>&nbsp;</>}
                    </div>
                    <div className="block text-center text-[13px] leading-6 text-[#e4e4e4] px-[5px] py-0">
                      {sets_details["Half"].away ?? <>&nbsp;</>}
                    </div>
                  </div>
                  <div className="table-cell align-top">
                    <div className="text-[11px] whitespace-nowrap block text-center text-[#ccc] leading-4 px-[5px] py-0">
                      3
                    </div>
                    <div className="block text-center text-[13px] leading-6 text-[#e4e4e4] px-[5px] py-0">
                      {sets_details["3"].home ?? <>&nbsp;</>}
                    </div>
                    <div className="block text-center text-[13px] leading-6 text-[#e4e4e4] px-[5px] py-0">
                      {sets_details["3"].away ?? <>&nbsp;</>}
                    </div>
                  </div>
                  <div className="table-cell align-top">
                    <div className="text-[11px] whitespace-nowrap block text-center text-[#ccc] leading-4 px-[5px] py-0">
                      4
                    </div>
                    <div className="block text-center text-[13px] leading-6 text-[#e4e4e4] px-[5px] py-0">
                      {sets_details["4"].home ?? <>&nbsp;</>}
                    </div>
                    <div className="block text-center text-[13px] leading-6 text-[#e4e4e4] px-[5px] py-0">
                      {sets_details["4"].away ?? <>&nbsp;</>}
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
              <div className="block max-w-[440px] mx-auto my-5 px-5 py-0">
                <div className="items-start flex w-full h-3/6">
                  <div className="w-6/12 flex-[0_0_auto] flex items-start">
                    <div className="max-w-[33.33%] flex-initial min-w-0 px-[7px] py-0">
                      <div
                        className={`text-[15px] leading-[18px] font-bold text-center after:content-[""] after:block after:h-0.5 after:w-9 after:max-w-full after:bg-current after:mt-1 after:mb-[5px] after:mx-auto after:rounded-sm`}
                        style={{
                          color: kitColors.home,
                        }}
                      >
                        <div className="text-[#ddd]">
                          {_fouls ? _fouls[1] : 0}
                        </div>
                      </div>
                      <div className="overflow-hidden max-h-[calc(13px_*_2)] flex items-baseline text-center justify-center text-[11px] leading-[13px] whitespace-normal min-h-[auto] text-[#ddd]">
                        Fouls
                      </div>
                    </div>
                    <div className="max-w-[33.33%] flex-initial min-w-0 px-[7px] py-0">
                      <div
                        className={`text-[15px] leading-[18px] font-bold text-center after:content-[""] after:block after:h-0.5 after:w-9 after:max-w-full after:bg-current after:mt-1 after:mb-[5px] after:mx-auto after:rounded-sm`}
                        style={{
                          color: kitColors.home,
                        }}
                      >
                        <div className="text-[#ddd]">
                          {_2pts ? _2pts[1] : 0}
                        </div>
                      </div>
                      <div className="overflow-hidden max-h-[calc(13px_*_2)] flex items-baseline text-center justify-center text-[11px] leading-[13px] whitespace-normal min-h-[auto] text-[#ddd]">
                        2 Pts
                      </div>
                    </div>
                    <div className="max-w-[33.33%] flex-initial min-w-0 px-[7px] py-0">
                      <div
                        className={`text-[15px] leading-[18px] font-bold text-center after:content-[""] after:block after:h-0.5 after:w-9 after:max-w-full after:bg-current after:mt-1 after:mb-[5px] after:mx-auto after:rounded-sm`}
                        style={{
                          color: kitColors.home,
                        }}
                      >
                        <div className="text-[#ddd]">
                          {_3pts ? _3pts[1] : 0}
                        </div>
                      </div>
                      <div className="overflow-hidden max-h-[calc(13px_*_2)] flex items-baseline text-center justify-center text-[11px] leading-[13px] whitespace-normal min-h-[auto] text-[#ddd]">
                        3 Pts
                      </div>
                    </div>
                  </div>
                  <div className="justify-end w-6/12 flex-[0_0_auto] flex items-start">
                    <div className="max-w-[33.33%] flex-initial min-w-0 px-[7px] py-0">
                      <div
                        className={`text-[15px] leading-[18px] font-bold text-center after:content-[""] after:block after:h-0.5 after:w-9 after:max-w-full after:bg-current after:mt-1 after:mb-[5px] after:mx-auto after:rounded-sm`}
                        style={{
                          color: kitColors.away,
                        }}
                      >
                        <div className="text-[#ddd]">
                          {_3pts ? _3pts[2] : 0}
                        </div>
                      </div>
                      <div className="overflow-hidden max-h-[calc(13px_*_2)] flex items-baseline text-center justify-center text-[11px] leading-[13px] whitespace-normal min-h-[auto] text-[#ddd]">
                        3 Pts
                      </div>
                    </div>
                    <div className="max-w-[33.33%] flex-initial min-w-0 px-[7px] py-0">
                      <div
                        className={`text-[15px] leading-[18px] font-bold text-center after:content-[""] after:block after:h-0.5 after:w-9 after:max-w-full after:bg-current after:mt-1 after:mb-[5px] after:mx-auto after:rounded-sm`}
                        style={{
                          color: kitColors.away,
                        }}
                      >
                        <div className="text-[#ddd]">
                          {_2pts ? _2pts[2] : 0}
                        </div>
                      </div>
                      <div className="overflow-hidden max-h-[calc(13px_*_2)] flex items-baseline text-center justify-center text-[11px] leading-[13px] whitespace-normal min-h-[auto] text-[#ddd]">
                        2 Pts
                      </div>
                    </div>
                    <div className="max-w-[33.33%] flex-initial min-w-0 px-[7px] py-0">
                      <div
                        className={`text-[15px] leading-[18px] font-bold text-center after:content-[""] after:block after:h-0.5 after:w-9 after:max-w-full after:bg-current after:mt-1 after:mb-[5px] after:mx-auto after:rounded-sm`}
                        style={{
                          color: kitColors.away,
                        }}
                      >
                        <div className="text-[#ddd]">
                          {_fouls ? _fouls[2] : 0}
                        </div>
                      </div>
                      <div className="overflow-hidden max-h-[calc(13px_*_2)] flex items-baseline text-center justify-center text-[11px] leading-[13px] whitespace-normal min-h-[auto] text-[#ddd]">
                        Fouls
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-start h-3/6 mt-5">
                  <div className="flex-[0_0_25%] justify-center flex">
                    <div className="pt-[11px]">
                      <div className="min-h-[9px] w-full flex items-center justify-center pb-[5px]">
                        {_timeouts &&
                          Array.from(
                            { length: _timeouts[1] },
                            (value, index) => (
                              <div
                                key={index}
                                className="w-1 h-1 flex mx-0.5 my-0 rounded-[50%]"
                                style={{ background: kitColors.home }}
                              ></div>
                            )
                          )}
                      </div>
                      <div className="flex items-baseline text-center text-[11px] text-[#ddd] leading-[13px] whitespace-normal">
                        Time Outs
                      </div>
                    </div>
                  </div>
                  <div className="flex-[0_0_50%] flex">
                    <div
                      className="items-center w-full flex justify-center pr-[2.5px] px-[15px] py-0"
                      style={{
                        flexFlow: "row wrap",
                      }}
                    >
                      <div
                        className={`text-[15px] leading-4 flex justify-center items-end w-6/12 flex-[0_0_auto] min-h-[21px] font-bold after:content-[""] after:block after:w-full after:flex-[0_0_auto] after:h-[3px] after:bg-current after:mx-0 after:my-1 after:rounded-[2px_0_0_2px] pr-[2.5px]`}
                        style={{
                          flexFlow: "row wrap",
                          color: kitColors.home,
                        }}
                      >
                        <div className="flex-[0_0_auto] text-[#ddd]">
                          {_free_throws ? _free_throws[1] : 0}
                        </div>
                        <div className="text-[13px] leading-[14px] flex-[0_0_auto] text-center font-normal text-[#a7a7a7] pl-[5px]">
                          100%
                        </div>
                      </div>
                      <div
                        className={`text-[15px] leading-4 flex justify-center items-end w-6/12 flex-[0_0_auto] min-h-[21px] font-bold after:content-[""] after:block after:w-full after:flex-[0_0_auto] after:h-[3px] after:bg-current after:mx-0 after:my-1 after:rounded-[2px_0_0_2px] pl-[2.5px]`}
                        style={{
                          flexFlow: "row wrap",
                          color: kitColors.away,
                        }}
                      >
                        <div className="flex-[0_0_auto] text-[#ddd]">
                          {_free_throws ? _free_throws[2] : 0}
                        </div>
                        <div className="text-[13px] leading-[14px] flex-[0_0_auto] text-center font-normal text-[#a7a7a7] pl-[5px]">
                          100%
                        </div>
                      </div>
                      <div className="overflow-hidden leading-[13px] max-h-[calc(13px_*_2)] flex-[0_0_auto] w-full text-center text-[11px] text-[#ddd] mx-auto my-0">
                        Free Throws
                      </div>
                    </div>
                  </div>
                  <div className="flex-[0_0_25%] justify-center flex">
                    <div className="pt-[11px]">
                      <div className="min-h-[9px] w-full flex items-center justify-center pb-[5px]">
                        {_timeouts &&
                          Array.from(
                            { length: _timeouts[2] },
                            (value, index) => (
                              <div
                                key={index}
                                className="w-1 h-1 flex mx-0.5 my-0 rounded-[50%]"
                                style={{ background: kitColors.away }}
                              ></div>
                            )
                          )}
                      </div>
                      <div className="flex items-baseline text-center text-[11px] text-[#ddd] leading-[13px] whitespace-normal">
                        Time Outs
                      </div>
                    </div>
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
