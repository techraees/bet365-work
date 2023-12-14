import React, { useEffect, useState } from "react";
import animationStyle from "./animation.module.css";
import pitchStyle from "./pitchstyle.module.css";
import BottomBorderComponent from "./components/BottomBorderComponent";

interface VolleyballMobilePitchInterface {
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

//get team from status code
function getTeamFromCode(code: number): number {
  return Math.floor(code / 10000);
}
//get event from code
function getEventFromCode(code: number): number {
  return code % 10000;
}
//get event string from code
function getEventString(status: number): string {
  const statusCodes = [
    {
      status: 1248,
      name: "Single Serve",
    },
    {
      status: 1249,
      name: "Singles Serve (Rally)",
    },
    {
      status: 1250,
      name: "Singles Serve (PointScore)",
    },
    {
      status: 1252,
      name: "Service fault",
    },
    {
      status: 1253,
      name: "Ace",
    },
    {
      status: 1254,
      name: "Single Serve (End Of Set)",
    },
    {
      status: 1255,
      name: "Timeout",
    },
    {
      status: 1256,
      name: "Timeout",
    },
    {
      status: 1257,
      name: "Last Six",
    },
    {
      status: 1258,
      name: "Score Breakdown",
    },
    {
      status: 1259,
      name: "Current Streak",
    },
    {
      status: 1260,
      name: "Single Serve (Point Score)",
    },
    {
      status: 1261,
      name: "Finished",
    },
  ];
  const matchingCode = statusCodes.find((code) => code.status == status);
  return matchingCode?.name ?? "";
}
//get data state to string
function getStateFromCode(code: number): string | undefined {
  const valleyballCodes = [
    {
      code: 11248,
      name: "Home Team Single Serve",
    },
    {
      code: 21248,
      name: "Away Team Single Serve",
    },

    {
      code: 11249,
      name: "Home Team Singles Serve (Rally)",
    },
    {
      code: 21249,
      name: "Away Team Singles Serve (Rally)",
    },
    {
      code: 11250,
      name: "Home Team Singles Serve (PointScore)",
    },
    {
      code: 21250,
      name: "Away Team Singles Serve (PointScore)",
    },
    {
      code: 11252,
      name: "Home Team Service fault",
    },
    {
      code: 21252,
      name: "Away Team Service fault",
    },
    {
      code: 11253,
      name: "Home Team Ace",
    },
    {
      code: 21253,
      name: "Away Team Ace",
    },
    {
      code: 11254,
      name: "Home Team Single Serve (End Of Set)",
    },
    {
      code: 21254,
      name: "Away Team Single Serve (End Of Set)",
    },
    {
      code: 11255,
      name: "Home Team Timeout",
    },
    {
      code: 21255,
      name: "Away Team Timeout",
    },
    {
      code: 11256,
      name: "Home Team Timeout",
    },
    {
      code: 21256,
      name: "Away Team Timeout",
    },
    {
      code: 11257,
      name: "Home Team Last Six",
    },
    {
      code: 21257,
      name: "Home Team Last Six",
    },

    {
      code: 21258,
      name: "Away Team Score Breakdown",
    },
    {
      code: 11258,
      name: "Home Team Score Breakdown",
    },
    {
      code: 11259,
      name: "Home Team Current Streak",
    },
    {
      code: 21259,
      name: "Away Team Current Streak",
    },
    {
      code: 21260,
      name: "Away Team Single Serve (Point Score)",
    },
    {
      code: 11260,
      name: "Home Team Single Serve (Point Score)",
    },
    {
      code: 1261,
      name: "Finished",
    },
  ];

  const matchingCode = valleyballCodes.find(
    (valleyballCode) => valleyballCode.code == code
  );
  return matchingCode?.name;
}

//get team and event from state
function getState(code: number): any {
  const team = getTeamFromCode(code);
  const status = getEventFromCode(code);
  return {
    team: team,
    status: getEventString(status),
  };
}

function getActivePlayer(data: any): number {
  return data?.stats[3]?.home == "1" ? 1 : 0;
}

function getAcitveColor(player: string, data: any) {
  const activePlayer = getActivePlayer(data);
  return player == "home"
    ? activePlayer == 1
      ? "#ffdf1b"
      : "#fff"
    : activePlayer == 0
    ? "#ffdf1b"
    : "#fff";
}

function getHomeDecorationClassName(curCode: number) {
  const curEvent = getEventFromCode(curCode);
  const team = getTeamFromCode(curCode);
  return `${
    curEvent == 1250 || curEvent == 1260 || curEvent == 1258
      ? team == 1
        ? pitchStyle.homeDecorationShowUp
        : pitchStyle.homeDecorationShowDown
      : pitchStyle.homeDecorationShowDown
  } ${pitchStyle.scoredPoints}`;
}

function getAwayDecorationClassName(curCode: number) {
  const curEvent = getEventFromCode(curCode);
  const team = getTeamFromCode(curCode);
  return `${
    curEvent == 1250 || curEvent == 1260 || curEvent == 1258
      ? team == 2
        ? pitchStyle.awayDecorationShowUp
        : pitchStyle.awayDecorationShowDown
      : pitchStyle.awayDecorationShowDown
  } ${pitchStyle.scoredPoints}`;
}

function getRallyHomeDecorationClassName(curCode: number) {
  const curEvent = getEventFromCode(curCode);
  const team = getTeamFromCode(curCode);
  return `${
    curEvent == 1249
      ? team == 1
        ? pitchStyle.homeDecorationShowUp
        : pitchStyle.homeDecorationShowDown
      : pitchStyle.homeDecorationShowDown
  } ${pitchStyle.scoredPoints}`;
}

function getRallyAwayDecorationClassName(curCode: number) {
  const curEvent = getEventFromCode(curCode);
  const team = getTeamFromCode(curCode);
  return `${
    curEvent == 1249
      ? team == 2
        ? pitchStyle.awayDecorationShowUp
        : pitchStyle.awayDecorationShowDown
      : pitchStyle.awayDecorationShowDown
  } ${pitchStyle.scoredPoints}`;
}

function getHomePointsClassName(curEvent: number) {
  return `${
    curEvent == 1250 || curEvent == 1260 || curEvent == 1258
      ? pitchStyle.homePointsShowUp
      : pitchStyle.homePointsShowDown
  } ${pitchStyle.scoredPoints}`;
}

function getAwayPointsClassName(curEvent: number) {
  return `${
    curEvent == 1250 || curEvent == 1260 || curEvent == 1258
      ? pitchStyle.awayPointsShowUp
      : pitchStyle.awayPointsShowDown
  } ${pitchStyle.scoredPoints}`;
}

function getSetNumber(data: any) {
  if (data?.info.period == "Set 1") {
    return 1;
  } else if (data?.info.period == "Set 2") {
    return 2;
  } else if (data?.info.period == "Set 3") {
    return 3;
  } else if (data?.info.period == "Set 4") {
    return 4;
  } else if (data?.info.period == "Set 5") {
    return 5;
  } else {
    return 0;
  }
}

function getScore(data: any) {
  let set = getSetNumber(data);
  switch (set) {
    case 1:
      return data?.stats[2];
    case 2:
      return data?.stats[4];
    case 3:
      return data?.stats[5];
    case 4:
      return data?.stats[6];
    case 5:
      return data?.stats[7];
    default:
      return {};
  }
}

function getLastSixActiveColor(number: number, data: any) {
  const scoreTrack = JSON.parse(localStorage.getItem("score_track") ?? "[]");
  let color = getAcitveColor("home", data);
  if (scoreTrack.length == 7) {
    color =
      scoreTrack[number + 1].home == scoreTrack[number].home
        ? getAcitveColor("away", data)
        : getAcitveColor("home", data);
  }
  return color;
}

const VolleyballMobilePitch: React.FC<VolleyballMobilePitchInterface> = ({
  data,
}) => {
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
  const states = sts?.split("|") ?? [];
  let _longest_streak_regx = /Longest Streak=(\d+):(\d+)/;
  let _points_won_on_serve_regx = /Points Won on Serve=(\d+):(\d+)/;

  let _longest_streak: any = null,
    _points_won_on_serve: any = null;

  states.forEach((state: string) => {
    if (_longest_streak == null)
      _longest_streak = state.match(_longest_streak_regx);
    if (_points_won_on_serve == null)
      _points_won_on_serve = state.match(_points_won_on_serve_regx);
  });

  var sets_details = extractSets(data?.stats);
  // console.log("-----sets_details-----", sets_details);
  let kitColors = getKitColors(data);
  // console.log("------kitColors------", kitColors);

  const prevScore = JSON.parse(localStorage.getItem("score") ?? "{}");
  const scoreTrack = JSON.parse(localStorage.getItem("score_track") ?? "[]");
  const isChanging =
    JSON.stringify(getScore(data)) != JSON.stringify(prevScore);
  if (isChanging) {
    scoreTrack.push(getScore(data));
    if (scoreTrack.length > 7) {
      scoreTrack.shift();
    }
    localStorage.setItem("score", JSON.stringify(getScore(data)));
    localStorage.setItem("score_track", JSON.stringify(scoreTrack));
  }
  if (!data) {
    return null;
  }

  // const curCode = 11257;
  const curCode = data?.info.state as number;
  const curEvent = getEventFromCode(curCode);
  const status = getState(curCode);
  // console.log(data);

  return (
    <>
      <div className="flex flex-col w-full p-0">
        <div className="flex-[0_0_auto] flex w-full justify-center items-stretch h-[50px] border-b-[hsla(0,0%,100%,.1)] border-b border-solid">
          <div className="h-[50px] min-w-[40px] mx-2.5 my-0">
            <div
              className={`text-[13px] leading-[50px] text-[#fff] w-[-webkit-fit-content] w-fit cursor-pointer flex items-center justify-center text-center h-[50px] m-auto border-b-2 border-solid ${
                activeTab === "Live"
                  ? "opacity-100 font-bold border-[#fff]"
                  : "opacity-80 hover:opacity-100 border-b-transparent"
              }`}
              onClick={() => setActiveTab("Live")}
            >
              Live
            </div>
          </div>
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
                            <div>
                              {_longest_streak ? _longest_streak[1] : 0}
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
                            <div>
                              {_longest_streak ? _longest_streak[2] : 0}
                            </div>
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
                              {_points_won_on_serve
                                ? _points_won_on_serve[1]
                                : 0}
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
                              {_points_won_on_serve
                                ? _points_won_on_serve[2]
                                : 0}
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
            {activeTab == "Live" && (
              <>
                <div className="border-b-[hsla(0,0%,100%,.1)] border-b border-solid h-[50px]">
                  <div className="flex h-full">
                    <div className="flex items-center h-full flex-1 justify-end ">
                      <div className="pr-[25px] pl-[10px]">
                        <div className="overflow-hidden leading-[15px] max-h-[calc(15px_*_3)] text-[#fff] font-bold text-[13px]">
                          {data?.team_info?.home?.name}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-[1fr_1fr]">
                      <div className="border-b-2 border-b-[rgb(154,190,255)] border-solid mr-px">
                        <div className="flex items-center justify-center h-[48px] px-[5px] py-0">
                          <div className="font-bold text-[color(display-p3_1_0.875_0.106)] text-[22px] leading-[26px] whitespace-nowrap">
                            {data?.stats[1].home}
                          </div>
                        </div>
                      </div>
                      <div className="border-b-2 border-b-[rgb(255, 255, 255)] border-solid mr-px">
                        <div className="flex items-center justify-center h-[48px] px-[5px] py-0">
                          <div className="font-bold text-[color(display-p3_1_0.875_0.106)] text-[22px] leading-[26px] whitespace-nowrap">
                            {data?.stats[1].away}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center h-full flex-1 justify-start ">
                      <div className="pl-[25px] pr-[10px]">
                        <div className="overflow-hidden leading-[15px] max-h-[calc(15px_*_3)] text-[#fff] font-bold text-[13px]">
                          {data?.team_info?.away?.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative text-center text-[0] h-[50px] flex justify-center items-center bg-transparent border-t-[#474747]"></div>

                <div className="max-w-[440px] mx-auto my-0 px-5 py-2.5">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 400 180"
                  >
                    {/* playground */}
                    <g id="bg" fill="none" fillRule="evenodd">
                      <g>
                        <rect
                          fill="#B36E60"
                          fillRule="evenodd"
                          x="0"
                          y="0"
                          width="400"
                          height="180"
                        ></rect>
                        <rect
                          fill="none"
                          x="0"
                          y="0"
                          width="400"
                          height="180"
                        ></rect>
                        <rect
                          fill="none"
                          x="0"
                          y="0"
                          width="400"
                          height="180"
                        ></rect>
                      </g>
                      <g transform="translate(-22.000000, -770.000000)">
                        <rect x="22" y="770" width="400" height="180"></rect>
                        <path
                          d="M138.57868,787 L140.588832,787 L140.588832,933 L138.57868,933 L138.57868,787 Z M303.411168,787 L305.42132,787 L305.42132,933 L303.411168,933 L303.411168,787 Z M24,785 L420,785 L420,787 L24,787 L24,785 Z M24,933 L420,933 L420,935 L24,935 L24,933 Z"
                          fill="#CC7D6D"
                        ></path>
                        <rect
                          fill="#684100"
                          x="221"
                          y="940"
                          width="3"
                          height="3"
                        ></rect>
                        <rect
                          fill="#684100"
                          x="221"
                          y="777"
                          width="3"
                          height="3"
                        ></rect>
                        <rect
                          fill="#C3C3C3"
                          x="221"
                          y="780"
                          width="2"
                          height="160"
                        ></rect>
                        <rect
                          stroke="#CC7D6D"
                          strokeWidth="2"
                          x="23"
                          y="771"
                          width="398"
                          height="178"
                        ></rect>
                        <path fill="#000" opacity="0" d=""></path>
                        <path fill="#000" opacity="0" d=""></path>
                      </g>
                    </g>

                    {/* last 6 points */}
                    {curEvent == 1257 && (
                      <>
                        <g id="rally">
                          <g transform="translate(158 30)" opacity={1}>
                            <rect fill="#f0aa9c" width="84" height="16"></rect>
                            <text
                              fontSize="13px"
                              fill="#944c44"
                              transform="translate(5 12)"
                            >
                              Last 6 Points
                            </text>
                          </g>
                        </g>
                        <g id="balls" style={{ display: "inline" }}>
                          <g
                            id="ball5"
                            transform="translate(118.000000, 70.000000)"
                            className={animationStyle.lastSixBall5}
                          >
                            <path
                              d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                              fill="#FFFFFF"
                            ></path>
                            <path
                              d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                              fill="#888888"
                            ></path>
                            <text
                              fontSize="10px"
                              fill="#fff"
                              textAnchor="middle"
                              transform="translate(6 -8)"
                            >
                              {getScore(data).home + getScore(data).away - 5}
                            </text>
                            <rect
                              id="home_active"
                              fill={getLastSixActiveColor(0, data)}
                              transform="translate(-3, 20)"
                              width="21"
                              height="3"
                            ></rect>
                          </g>
                          <g
                            id="ball4"
                            transform="translate(148.000000, 70.000000)"
                            className={animationStyle.lastSixBall4}
                          >
                            <path
                              d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                              fill="#FFFFFF"
                            ></path>
                            <path
                              d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                              fill="#888888"
                            ></path>
                            <text
                              fontSize="10px"
                              fill="#fff"
                              textAnchor="middle"
                              transform="translate(6 -8)"
                            >
                              {getScore(data).home + getScore(data).away - 4}
                            </text>
                            <rect
                              id="home_active"
                              fill={getLastSixActiveColor(1, data)}
                              transform="translate(-3, 20)"
                              width="21"
                              height="3"
                            ></rect>
                          </g>
                          <g
                            id="ball3"
                            transform="translate(178.000000, 70.000000)"
                            className={animationStyle.lastSixBall3}
                          >
                            <path
                              d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                              fill="#FFFFFF"
                            ></path>
                            <path
                              d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                              fill="#888888"
                            ></path>
                            <text
                              fontSize="10px"
                              fill="#fff"
                              textAnchor="middle"
                              transform="translate(6 -8)"
                            >
                              {getScore(data).home + getScore(data).away - 3}
                            </text>
                            <rect
                              id="home_active"
                              fill={getLastSixActiveColor(2, data)}
                              transform="translate(-3, 20)"
                              width="21"
                              height="3"
                            ></rect>
                          </g>
                          <g
                            id="ball2"
                            transform="translate(208.000000, 70.000000)"
                            className={animationStyle.lastSixBall2}
                          >
                            <path
                              d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                              fill="#FFFFFF"
                            ></path>
                            <path
                              d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                              fill="#888888"
                            ></path>
                            <text
                              fontSize="10px"
                              fill="#fff"
                              textAnchor="middle"
                              transform="translate(6 -8)"
                            >
                              {getScore(data).home + getScore(data).away - 2}
                            </text>
                            <rect
                              id="home_active"
                              fill={getLastSixActiveColor(3, data)}
                              transform="translate(-3, 20)"
                              width="21"
                              height="3"
                            ></rect>
                          </g>
                          <g
                            id="ball1"
                            transform="translate(238.000000, 70.000000)"
                            className={animationStyle.lastSixBall1}
                          >
                            <path
                              d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                              fill="#FFFFFF"
                            ></path>
                            <path
                              d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                              fill="#888888"
                            ></path>
                            <text
                              fontSize="10px"
                              fill="#fff"
                              textAnchor="middle"
                              transform="translate(6 -8)"
                            >
                              {getScore(data).home + getScore(data).away - 1}
                            </text>
                            <rect
                              id="home_active"
                              fill={getLastSixActiveColor(4, data)}
                              transform="translate(-3, 20)"
                              width="21"
                              height="3"
                            ></rect>
                          </g>
                          <g
                            id="ball0"
                            transform="translate(268.000000, 70.000000)"
                            className={animationStyle.lastSixBall0}
                          >
                            <path
                              d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                              fill="#FFFFFF"
                            ></path>
                            <path
                              d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                              fill="#888888"
                            ></path>
                            <text
                              fontSize="10px"
                              fill="#fff"
                              textAnchor="middle"
                              transform="translate(6 -8)"
                            >
                              {getScore(data).home + getScore(data).away}
                            </text>
                            <rect
                              id="home_active"
                              fill={getLastSixActiveColor(5, data)}
                              transform="translate(-3, 20)"
                              width="21"
                              height="3"
                            ></rect>
                          </g>
                        </g>
                      </>
                    )}
                    {/* ball server animation */}
                    {(curEvent == 1248 || curEvent == 1254) && (
                      <>
                        {status.team == 1 ? (
                          // home ball serve animation
                          <g
                            id="balls"
                            style={{
                              transform: "translate(40px, 60px)",
                              display: "inline",
                            }}
                          >
                            <g
                              id="ball7"
                              transform="translate(114.000000, 1.000000)"
                              className={animationStyle.ball7}
                            >
                              <path
                                d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                                fill="#FFFFFF"
                              ></path>
                              <path
                                d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                                fill="#888888"
                              ></path>
                            </g>
                            <g
                              id="ball6"
                              transform="translate(97.000000, 0.000000)"
                              className={animationStyle.ball6}
                            >
                              <path
                                d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                                fill="#FFFFFF"
                              ></path>
                              <path
                                d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                                fill="#888888"
                              ></path>
                            </g>
                            <g
                              id="ball5"
                              transform="translate(79.000000, 3.000000)"
                              className={animationStyle.ball5}
                            >
                              <path
                                d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                                fill="#FFFFFF"
                              ></path>
                              <path
                                d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                                fill="#888888"
                              ></path>
                            </g>
                            <g
                              id="ball4"
                              transform="translate(62.000000, 7.000000)"
                              className={animationStyle.ball4}
                            >
                              <path
                                d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                                fill="#FFFFFF"
                              ></path>
                              <path
                                d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                                fill="#888888"
                              ></path>
                            </g>
                            <g
                              id="ball3"
                              transform="translate(46.000000, 13.000000)"
                              className={animationStyle.ball3}
                            >
                              <path
                                d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                                fill="#FFFFFF"
                              ></path>
                              <path
                                d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                                fill="#888888"
                              ></path>
                            </g>
                            <g
                              id="ball2"
                              transform="translate(31.000000, 19.000000)"
                              className={animationStyle.ball2}
                            >
                              <path
                                d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                                fill="#FFFFFF"
                              ></path>
                              <path
                                d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                                fill="#888888"
                              ></path>
                            </g>
                            <g
                              id="ball1"
                              transform="translate(15.000000, 26.000000)"
                              className={animationStyle.ball1}
                            >
                              <path
                                d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                                fill="#FFFFFF"
                              ></path>
                              <path
                                d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                                fill="#888888"
                              ></path>
                            </g>
                            <g
                              id="ball0"
                              transform="translate(0.000000, 34.000000)"
                              className={animationStyle.ball0}
                            >
                              <path
                                d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                                fill="#FFFFFF"
                              ></path>
                              <path
                                d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                                fill="#888888"
                              ></path>
                            </g>
                          </g>
                        ) : (
                          // away ball animation
                          <g
                            id="balls"
                            style={{
                              transform: "translate(360px, 60px) scaleX(-1)",
                              display: "inline",
                            }}
                          >
                            <g
                              id="ball7"
                              transform="translate(114.000000, 1.000000)"
                              className={animationStyle.ball7}
                            >
                              <path
                                d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                                fill="#FFFFFF"
                              ></path>
                              <path
                                d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                                fill="#888888"
                              ></path>
                            </g>
                            <g
                              id="ball6"
                              transform="translate(97.000000, 0.000000)"
                              className={animationStyle.ball6}
                            >
                              <path
                                d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                                fill="#FFFFFF"
                              ></path>
                              <path
                                d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                                fill="#888888"
                              ></path>
                            </g>
                            <g
                              id="ball5"
                              transform="translate(79.000000, 3.000000)"
                              className={animationStyle.ball5}
                            >
                              <path
                                d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                                fill="#FFFFFF"
                              ></path>
                              <path
                                d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                                fill="#888888"
                              ></path>
                            </g>
                            <g
                              id="ball4"
                              transform="translate(62.000000, 7.000000)"
                              className={animationStyle.ball4}
                            >
                              <path
                                d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                                fill="#FFFFFF"
                              ></path>
                              <path
                                d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                                fill="#888888"
                              ></path>
                            </g>
                            <g
                              id="ball3"
                              transform="translate(46.000000, 13.000000)"
                              className={animationStyle.ball3}
                            >
                              <path
                                d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                                fill="#FFFFFF"
                              ></path>
                              <path
                                d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                                fill="#888888"
                              ></path>
                            </g>
                            <g
                              id="ball2"
                              transform="translate(31.000000, 19.000000)"
                              className={animationStyle.ball2}
                            >
                              <path
                                d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                                fill="#FFFFFF"
                              ></path>
                              <path
                                d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                                fill="#888888"
                              ></path>
                            </g>
                            <g
                              id="ball1"
                              transform="translate(15.000000, 26.000000)"
                              className={animationStyle.ball1}
                            >
                              <path
                                d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                                fill="#FFFFFF"
                              ></path>
                              <path
                                d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                                fill="#888888"
                              ></path>
                            </g>
                            <g
                              id="ball0"
                              transform="translate(0.000000, 34.000000)"
                              className={animationStyle.ball0}
                            >
                              <path
                                d="M7.01172973,0.22172973 C10.7512432,0.22172973 13.7831892,3.25367568 13.7831892,6.99281081 C13.7831892,10.7330811 10.7512432,13.7642703 7.01172973,13.7642703 C3.27183784,13.7642703 0.24027027,10.7330811 0.24027027,6.99281081 C0.24027027,3.25367568 3.27183784,0.22172973 7.01172973,0.22172973"
                                fill="#FFFFFF"
                              ></path>
                              <path
                                d="M4.82810811,10.2820541 C4.82810811,10.2820541 4.82243243,9.82383784 4.96848649,9.11740541 C5.11643243,8.39621622 5.37108108,8.02767568 5.37108108,8.02767568 C5.37108108,8.02767568 6.53875676,7.98302703 8.99632432,7.01702703 C11.4538919,6.05140541 12.3934054,5.07443243 12.3934054,5.07443243 C12.3934054,5.07443243 12.6817297,5.52318919 12.9636216,5.91897297 C13.2443784,6.31437838 13.5958919,6.76124324 13.5958919,6.76124324 C13.5958919,6.76124324 12.5981081,7.82486486 10.4466486,8.93767568 C7.86497297,10.276 4.82810811,10.2820541 4.82810811,10.2820541 M6.28486486,0.260702703 C6.28486486,0.260702703 6.27918919,0.261081081 6.26821622,0.261837838 C6.16454054,0.273567568 6.06086486,0.287189189 5.9587027,0.303081081 C5.94697297,0.304972973 5.93524324,0.307243243 5.92351351,0.309135135 L5.72221622,0.345459459 C5.72221622,0.345459459 7.03405405,1.0867027 8.60356757,2.91389189 C10.0391351,4.5832973 10.4387027,5.93032432 10.4387027,5.93032432 C10.4387027,5.93032432 9.93432432,6.24362162 9.37281081,6.47518919 C8.67583784,6.762 8.39508108,6.83540541 8.39508108,6.83540541 C8.39508108,6.83540541 7.67654054,5.11832432 6.00448649,3.53443243 C4.34151351,1.95810811 3.19389189,1.40075676 3.19389189,1.40075676 L2.84313514,1.65691892 C2.84313514,1.65691892 4.69945946,2.89989189 5.99881081,4.23708108 C7.45708108,5.73735135 7.90659459,6.97427027 7.90659459,6.97427027 C7.90659459,6.97427027 7.46578378,7.19713514 6.64318919,7.39994595 C6.14297297,7.5232973 5.79713514,7.54940541 5.59356757,7.54940541 C5.44221622,7.54940541 5.36918919,7.53502703 5.36918919,7.53502703 C5.36918919,7.53502703 4.81486486,7.11351351 3.332,5.70783784 C2.0772973,4.51745946 1.29216216,3.40540541 1.2792973,3.38686486 C1.27475676,3.39405405 1.27021622,3.40124324 1.26567568,3.40843243 C1.24486486,3.44324324 1.20248649,3.51248649 1.16843243,3.56962162 C1.15178378,3.59724324 1.13589189,3.62524324 1.11962162,3.65362162 L1.08481081,3.71605405 C1.08102703,3.72248649 1.07762162,3.72891892 1.07421622,3.73535135 L1.43708108,4.16178378 C1.43708108,4.16178378 1.06740541,4.70854054 0.749567568,5.44410811 C0.278486486,6.53308108 0.256162162,7.4147027 0.301945946,7.91113514 C0.322,8.0587027 0.346972973,8.20513514 0.376108108,8.3492973 C0.373837838,8.29064865 0.327297297,7.01248649 0.874810811,5.91783784 C1.43518919,4.79556757 1.71821622,4.51064865 1.71821622,4.51064865 C1.71821622,4.51064865 1.89227027,4.76264865 2.27972973,5.21518919 C2.72772973,5.73621622 3.05767568,5.98897297 3.05767568,5.98897297 C3.05767568,5.98897297 2.35010811,6.88118919 2.07691892,8.46772973 C1.72427027,10.5113514 1.92405405,11.4327027 1.93313514,11.4720541 C1.94675676,11.4871892 1.96,11.5019459 1.97324324,11.5170811 C2.0072973,11.5541622 2.05913514,11.6109189 2.10983784,11.6646486 C2.18816216,11.7467568 2.268,11.8265946 2.35010811,11.9045405 C2.34556757,11.8848649 2.13972973,10.9911351 2.3607027,9.352 C2.68194595,6.95345946 3.40502703,6.27048649 3.40502703,6.27048649 L4.96054054,7.81767568 C4.96054054,7.81767568 4.49437838,8.41437838 4.39297297,10.4178919 C4.30102703,12.1992973 4.73237838,13.3306486 4.75091892,13.3779459 C4.78497297,13.3900541 4.81902703,13.4017838 4.85383784,13.4131351 C4.88410811,13.4233514 4.91816216,13.4343243 4.95108108,13.4449189 C5.06459459,13.4812432 5.17962162,13.5149189 5.29616216,13.5451892 L5.16221622,13.1687027 C5.16221622,13.1687027 5.33210811,13.1823243 5.62875676,13.1823243 C6.41313514,13.1823243 8.08594595,13.086973 9.86356757,12.3911351 C12.2855676,11.4448108 13.0945405,9.98956757 13.3128649,9.47724324 C13.3348108,9.42162162 13.356,9.36562162 13.3768108,9.30924324 C13.3802162,9.29713514 13.3821081,9.29108108 13.3821081,9.29108108 C13.3821081,9.29108108 12.4785405,10.7228649 10.7304324,11.5692973 C8.568,12.614 6.51908108,12.7543784 5.57351351,12.7543784 C5.22578378,12.7543784 5.02751351,12.7354595 5.02751351,12.7354595 C5.02751351,12.7354595 4.90643243,12.2647568 4.87918919,12.0161622 C4.79632432,11.2620541 4.81486486,10.7807568 4.81486486,10.7807568 C4.81486486,10.7807568 7.9887027,10.7637297 10.7118919,9.30508108 C13.4365946,7.84643243 13.7820541,6.97502703 13.7820541,6.97502703 C13.7820541,6.97502703 13.7782703,6.87059459 13.772973,6.68594595 C13.7672973,6.482 13.7517838,6.34918919 13.7517838,6.34918919 C13.7517838,6.34918919 13.5107568,6.1092973 13.1202703,5.57918919 C12.7297838,5.04908108 12.5398378,4.70702703 12.5398378,4.70702703 C12.5398378,4.70702703 12.4425946,4.50762162 12.1894595,3.88140541 C11.9336757,3.25405405 11.8413514,3.10535135 11.8413514,3.10535135 C11.8413514,3.10535135 12.0468108,3.17421622 12.4675676,3.52762162 C12.8913514,3.8832973 13.2432432,4.36686486 13.2432432,4.36686486 C13.2432432,4.36686486 13.034,3.73762162 12.4005946,3.17535135 C11.9166486,2.74475676 11.6241622,2.68610811 11.6241622,2.68610811 C11.6241622,2.68610811 11.5125405,2.52264865 11.4852973,2.47837838 C10.7470811,1.28648649 9.78145946,0.808594595 9.43751351,0.669351351 C9.3992973,0.654594595 9.36032432,0.640216216 9.32210811,0.626216216 C9.31340541,0.623189189 9.30962162,0.622054054 9.30962162,0.622054054 C9.30962162,0.622054054 10.7255135,1.63118919 11.4088649,2.90216216 C11.9779459,3.95632432 12.1966486,4.79708108 12.1966486,4.79708108 C12.1966486,4.79708108 12.1716757,4.8632973 11.553027,5.29578378 C10.9896216,5.68967568 10.8719459,5.70745946 10.8556757,5.70745946 C10.8537838,5.70745946 10.8534054,5.70708108 10.8534054,5.70708108 C10.8534054,5.70708108 10.4629189,4.39940541 8.75378378,2.39551351 C7.54108108,0.975081081 6.28486486,0.260702703 6.28486486,0.260702703"
                                fill="#888888"
                              ></path>
                            </g>
                          </g>
                        )}
                      </>
                    )}

                    {/* player name */}
                    {!(
                      curEvent == 1255 ||
                      curEvent == 1256 ||
                      curEvent == 1253
                    ) && (
                      <>
                        <g id="home" transform="translate(10 145)">
                          <rect
                            id="home_active"
                            fill={getAcitveColor("home", data)}
                            width="3"
                            height="15"
                          ></rect>
                          <text
                            id="home_action"
                            className={getHomeDecorationClassName(curCode)}
                            fill="#ffc0a0"
                            fontSize="12px"
                          >
                            Point
                          </text>
                          <text
                            id="home_action"
                            className={getRallyHomeDecorationClassName(curCode)}
                            fill="#ffc0a0"
                            fontSize="12px"
                          >
                            Served
                          </text>
                          <text
                            id="home_text"
                            transform="translate(10 12)"
                            fill="#FFF"
                            fontSize="13px"
                          >
                            {data?.team_info?.home.name}
                          </text>
                        </g>
                        <g id="away" transform="translate(390 145)">
                          <rect
                            id="away_active"
                            width="3"
                            height="15"
                            fill={getAcitveColor("away", data)}
                          ></rect>
                          <text
                            id="away_action"
                            className={getAwayDecorationClassName(curCode)}
                            fill="#ffc0a0"
                            textAnchor="end"
                            fontSize="12px"
                          >
                            Point
                          </text>
                          <text
                            id="away_action"
                            className={getRallyAwayDecorationClassName(curCode)}
                            fill="#ffc0a0"
                            textAnchor="end"
                            fontSize="12px"
                          >
                            Served
                          </text>
                          <text
                            id="away_text"
                            transform="translate(-10 12)"
                            textAnchor="end"
                            fill="#FFF"
                            fontSize="13px"
                          >
                            {data?.team_info?.away.name}
                          </text>
                        </g>
                      </>
                    )}

                    {/* score */}
                    <g id="score" transform="translate(175, 0)">
                      <rect
                        x="0"
                        y="0"
                        display="inline"
                        fill="#000"
                        fillOpacity="0.3"
                        width="50"
                        height="20"
                      ></rect>
                      <text
                        id="score_home"
                        transform="translate(14 14)"
                        fill="#ffdf1b"
                        textAnchor="middle"
                        fontSize="12px"
                        fontWeight="bold"
                      >
                        {getScore(data).home ?? 0}
                      </text>
                      <text
                        id="score_away"
                        transform="translate(36 14)"
                        fill="#ffdf1b"
                        textAnchor="middle"
                        fontSize="12px"
                        fontWeight="bold"
                      >
                        {getScore(data).away ?? 0}
                      </text>
                    </g>

                    {/* Points */}
                    <g
                      id="point_home"
                      className={getHomePointsClassName(curEvent)}
                    >
                      <text
                        id="point_home_text"
                        textAnchor="middle"
                        fill="#ffdf1b"
                        y="90"
                        fontSize="24px"
                      >
                        {getScore(data).home ?? 0}
                      </text>
                      <rect
                        id="point_home_active"
                        x="-13"
                        y="97"
                        width="28"
                        height="3"
                        fill={getAcitveColor("home", data)}
                      ></rect>
                    </g>
                    <g
                      id="point_away"
                      className={getAwayPointsClassName(curEvent)}
                    >
                      <text
                        id="point_away_text"
                        textAnchor="middle"
                        fill="#ffdf1b"
                        y="90"
                        fontSize="24px"
                      >
                        {getScore(data).away ?? 0}
                      </text>
                      <rect
                        id="point_away_active"
                        x="-13"
                        y="97"
                        width="28"
                        height="3"
                        fill={getAcitveColor("away", data)}
                      ></rect>
                    </g>

                    {/* Timeout */}
                    {(curEvent == 1255 || curEvent == 1256) && (
                      <g id="timeout" transform="translate(220,70)">
                        <text
                          transform="translate(-10 20)"
                          fill="#FFF"
                          textAnchor="end"
                          fontSize="18px"
                          fontWeight="bold"
                        >
                          Timeout
                        </text>
                        <ellipse
                          stroke="#fff"
                          fill="none"
                          strokeWidth="2"
                          cx="15"
                          cy="15"
                          rx="15"
                          ry="15"
                        ></ellipse>
                        <path
                          d="M14,13.8395784 L14,5.87243867 C14,5.31934155 14.4438648,4.87096774 15,4.87096774 C15.5522847,4.87096774 16,5.32837702 16,5.87243867 L16,13.1986897 L16,13.1986897 L19.3256091,9.87308056 C19.7146781,9.48401161 20.3439406,9.48246873 20.7371875,9.87571569 C21.1277118,10.26624 21.134283,10.8928338 20.7398227,11.2872941 L16.9486523,15.0784645 C16.9822454,15.2191034 17,15.3656097 17,15.516129 C17,16.5850673 16.1045695,17.4516129 15,17.4516129 C13.8954305,17.4516129 13,16.5850673 13,15.516129 C13,14.7997268 13.4021986,14.1742327 14,13.8395784 Z"
                          fill="#fff"
                        ></path>
                        <path
                          d="M29.9090909,28.1901969 C29.9090909,28.5626779 29.5419069,28.9442815 29.1298701,28.9442815 L19.7792208,28.9442815 C19.367184,28.9442815 19,28.5629354 19,28.1901969 L19,19.1411814 C19,18.7687004 19.367184,18.3870968 19.7792208,18.3870968 L29.1298701,18.3870968 C29.5419069,18.3870968 29.9090909,18.7684429 29.9090909,19.1411814 L29.9090909,28.1901969 L29.9090909,28.1901969 Z"
                          fill="#A52A2A"
                        ></path>
                        <path
                          d="M21.6363636,20.8504399 L23.6363636,20.8504399 L23.6363636,26.6568915 L21.6363636,26.6568915 L21.6363636,20.8504399 Z M25.6363636,20.8504399 L27.6363636,20.8504399 L27.6363636,26.6568915 L25.6363636,26.6568915 L25.6363636,20.8504399 Z"
                          fill="#fff"
                        ></path>
                      </g>
                    )}
                    {/* ACE */}
                    {curEvent == 1253 && (
                      <g id="ace">
                        <defs>
                          <linearGradient
                            id="linear-gradient"
                            x1="-44.55"
                            y1="-141.12"
                            x2="-45.71"
                            y2="-141.14"
                            gradientTransform="matrix(-255.6, 0, 0, 87.15, -11323.31, 12390.7)"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop
                              offset="0"
                              stopColor="#385e8a"
                              stopOpacity="0.5"
                            ></stop>
                            <stop offset="0.32" stopColor="#fff"></stop>
                            <stop offset="1" stopColor="#fff"></stop>
                          </linearGradient>
                        </defs>
                        <g opacity="0.49">
                          <path
                            d="M123.6,91.44c31,13.89,60.44,32.83,76.5,43.43,1.42.94,2.39-.85,3.6,0,.36.25,3.51-5.72,3.6-5.87,11.18-18,27.38-29.44,40.5-37.56,16.45-10.19,28.8-14.64,28.8-14.64l-1.8-16.2s-30.86,21.45-42.3,30.84A201.26,201.26,0,0,0,210,113.7,86.44,86.44,0,0,0,201.9,125a3.32,3.32,0,0,1-4.5,1.33c-19.65-9.24-94.16-47.68-105.3-52.2C46,55.4,21,48.05,21,48.05,32.69,55.12,79.69,71.79,123.6,91.44Z"
                            fillOpacity="0.39"
                            fillRule="evenodd"
                            fill="url(#linear-gradient)"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="M279.84,56.47a10.73,10.73,0,1,1-10.73,10.72,10.72,10.72,0,0,1,10.73-10.72"
                            fill="#fff"
                          ></path>
                          <path
                            d="M276.38,72.4a9.47,9.47,0,0,1,.22-1.84,4.87,4.87,0,0,1,.64-1.73,20.16,20.16,0,0,0,5.74-1.6,16.06,16.06,0,0,0,5.38-3.08s.46.71.9,1.34,1,1.34,1,1.34a19.77,19.77,0,0,1-5,3.44,22,22,0,0,1-8.9,2.13m2.3-15.87h0l-.49.07h-.06l-.32,0a19.67,19.67,0,0,1,4.57,4.07,14.64,14.64,0,0,1,2.9,4.78,12.67,12.67,0,0,1-1.68.86,13.16,13.16,0,0,1-1.55.57,17.26,17.26,0,0,0-3.79-5.23,20.47,20.47,0,0,0-4.45-3.38l-.56.41a36.59,36.59,0,0,1,5,4.09,13.68,13.68,0,0,1,3,4.33,10,10,0,0,1-2,.68,7.23,7.23,0,0,1-1.66.23,2.45,2.45,0,0,1-.36,0s-.87-.67-3.22-2.89a27.25,27.25,0,0,1-3.25-3.68l0,0-.15.26-.08.13-.05.1,0,0,.58.68a13,13,0,0,0-1.09,2,8,8,0,0,0-.71,3.91q0,.34.12.69a8.68,8.68,0,0,1,.79-3.85,9.75,9.75,0,0,1,1.33-2.23s.28.4.89,1.12a9.53,9.53,0,0,0,1.23,1.22A9.33,9.33,0,0,0,272,69.53a13.73,13.73,0,0,0-.23,4.76l.06.07.22.23.38.38a12.22,12.22,0,0,1,0-4c.51-3.8,1.65-4.88,1.65-4.88l2.47,2.45s-.74.94-.9,4.12a12.43,12.43,0,0,0,.56,4.69l.17,0,.15,0,.55.16-.21-.6s.27,0,.73,0a19,19,0,0,0,6.71-1.26c3.84-1.5,5.12-3.8,5.47-4.61,0-.09.06-.18.1-.27v0a11.15,11.15,0,0,1-4.2,3.61,19.21,19.21,0,0,1-8.17,1.88c-.55,0-.87,0-.87,0a11.14,11.14,0,0,1-.23-1.14,14.75,14.75,0,0,1-.1-2,22.69,22.69,0,0,0,9.34-2.34c4.31-2.31,4.86-3.69,4.86-3.69s0-.16,0-.45a4.22,4.22,0,0,0,0-.54,11.82,11.82,0,0,1-1-1.22,14.3,14.3,0,0,1-.92-1.38s-.15-.31-.55-1.31a13.08,13.08,0,0,0-.55-1.23,3.82,3.82,0,0,1,1,.67A9.09,9.09,0,0,1,289.71,63a5,5,0,0,0-1.34-1.88,3.06,3.06,0,0,0-1.23-.78s-.18-.26-.22-.33a7.08,7.08,0,0,0-3.24-2.86l-.19-.07h0a12.69,12.69,0,0,1,3.32,3.61,15.19,15.19,0,0,1,1.25,3s0,.11-1,.79-1.08.66-1.11.66h0a16.59,16.59,0,0,0-3.33-5.25,16.47,16.47,0,0,0-3.91-3.38"
                            fill="#888"
                          ></path>
                        </g>
                      </g>
                    )}

                    {curCode == 11249 && (
                      <g id="rally">
                        <rect
                          id="rally_a"
                          fill="#690e0e"
                          x="0"
                          y="0"
                          width="200"
                          height="190"
                          className={animationStyle.homeRally1}
                        ></rect>
                        <rect
                          id="rally_b"
                          fill="#690e0e"
                          x="200"
                          y="0"
                          width="200"
                          height="190"
                          className={animationStyle.awayRally1}
                        ></rect>
                        <g transform="translate(180 30)" opacity={1}>
                          <rect fill="#f0aa9c" width="40" height="16"></rect>
                          <text
                            fontSize="13px"
                            fill="#944c44"
                            transform="translate(5 12)"
                          >
                            Rally
                          </text>
                        </g>
                      </g>
                    )}
                    {curCode == 21249 && (
                      <g id="rally">
                        <rect
                          id="rally_a"
                          fill="#690e0e"
                          x="0"
                          y="0"
                          width="200"
                          height="190"
                          className={animationStyle.awayRally1}
                        ></rect>
                        <rect
                          id="rally_b"
                          fill="#690e0e"
                          x="200"
                          y="0"
                          width="200"
                          height="190"
                          className={animationStyle.homeRally1}
                        ></rect>
                        <g transform="translate(180 30)" opacity={1}>
                          <rect fill="#f0aa9c" width="40" height="16"></rect>
                          <text
                            fontSize="13px"
                            fill="#944c44"
                            transform="translate(5 12)"
                          >
                            Rally
                          </text>
                        </g>
                      </g>
                    )}
                  </svg>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

function convertToSeconds(timeString: string) {
  const [minutes, seconds] = timeString.split(":").map(Number);
  return minutes * 60 + seconds;
}

function increaseTimeBySeconds(timeString: any, secondsToAdd: any) {
  const totalSeconds = convertToSeconds(timeString) + secondsToAdd;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function formatTime(totalSeconds: any) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

export default VolleyballMobilePitch;
