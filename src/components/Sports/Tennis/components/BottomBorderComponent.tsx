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
  set_scores = [countSets.player1, countSets.player2];
  const sts = data?.sts;
  console.log({ sts: sts });
  const [
    Aces_String,
    Double_Faults_String,
    Win_1st_Serve_String,
    Break_Point_Conversion_String,
  ] = sts.split("|");
  var [aces_home, aces_away] = Aces_String.split(":");
  var [double_faults_home, double_faults_away] = Double_Faults_String.split(
    ":"
  );
  let aces_regex = /Aces=(\d+)/;
  let double_faults_regex = /Double Faults=(\d+)/;
  let win_percent_1st_regex = /Win % 1st Serve=(\d+):(\d+)/;
  let break_point_conversions_regex = /Break Point Conversions=(\d+):(\d+)/;

  aces_home = aces_home.match(aces_regex)[1];
  double_faults_home = double_faults_home.match(double_faults_regex)[1];

  var sets_details = extractSets(data?.stats);
  console.log({ set_scores: set_scores });
  console.log("rendering");

  var win_first_serve_percentage_home = Win_1st_Serve_String.match(
    win_percent_1st_regex
  )[1];
  var win_first_serve_percentage_away = Win_1st_Serve_String.match(
    win_percent_1st_regex
  )[2];
  var break_point_conversion_percentage_home = Break_Point_Conversion_String.match(
    break_point_conversions_regex
  )[1];
  var break_point_conversion_percentage_away = Break_Point_Conversion_String.match(
    break_point_conversions_regex
  )[2];

  return (
    <div className="border-b-[hsla(0,0%,100%,.1)] border-b border-solid h-[50px]">
      <div className="flex flex-col w-full p-0">
        <div className="flex-[0_0_auto] flex w-full justify-center items-stretch h-[50px]">
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
      </div>
      {/* Conditionally Render Content */}
      {activeTab === "Stats" && (
        <div>
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
                <div className="leading-6">
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
                  {aces_home}
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
                      {win_first_serve_percentage_home}%
                    </div>
                    <div className="text-[rgb(102,102,102)] block w-full h-0.5 bg-current mt-1 mb-[5px] mx-auto rounded-sm mx-0 my-1 rounded-[2px_0_0_2px]">
                      <div className="text-[rgb(154,190,255)]">
                        <div
                          className="block h-0.5 bg-current mt-1 mb-[5px] rounded-sm ml-auto"
                          style={{
                            width: `${win_first_serve_percentage_home}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="pl-[2.5px] flex-[0_0_auto] w-6/12">
                    <div className="text-center font-bold text-[13px] leading-[15px] text-[#ddd] text-[15px] leading-[18px]">
                      {win_first_serve_percentage_away}%
                    </div>
                    <div className="text-[rgb(102,102,102)] block w-full h-0.5 bg-current mt-1 mb-[5px] mx-auto rounded-sm mx-0 my-1 rounded-[2px_0_0_2px]">
                      <div className="text-[#fff]">
                        <div
                          className="block h-0.5 bg-current mt-1 mb-[5px] rounded-sm "
                          style={{
                            width: `${win_first_serve_percentage_away}%`,
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
                  {aces_away}
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
                  {double_faults_home}
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
                      {break_point_conversion_percentage_home}%
                    </div>
                    <div className="text-[rgb(102,102,102)] block w-full h-0.5 bg-current mt-1 mb-[5px] mx-auto rounded-sm mx-0 my-1 rounded-[2px_0_0_2px]">
                      <div className="text-[rgb(154,190,255)]">
                        <div
                          className="block h-0.5 bg-current mt-1 mb-[5px] rounded-sm ml-auto"
                          style={{
                            width: `${break_point_conversion_percentage_home}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="pl-[2.5px] flex-[0_0_auto] w-6/12">
                    <div className="text-center font-bold text-[13px] leading-[15px] text-[#ddd] text-[15px] leading-[18px]">
                      {break_point_conversion_percentage_away}%
                    </div>
                    <div className="text-[rgb(102,102,102)] block w-full h-0.5 bg-current mt-1 mb-[5px] mx-auto rounded-sm mx-0 my-1 rounded-[2px_0_0_2px]">
                      <div className="text-[#fff]">
                        <div
                          className="block h-0.5 bg-current mt-1 mb-[5px] rounded-sm "
                          style={{
                            width: `${break_point_conversion_percentage_away}%`,
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
                  {double_faults_away}
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
      )}
      {activeTab === "Summary" && <div>Summary</div>}
    </div>
  );
};

export default BottomBorderComponent;
