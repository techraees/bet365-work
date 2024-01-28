"use client";
import React, { useEffect, useRef } from "react";
import animationStyles from "./animation.module.css";
import pitchStyle from "./pitchstyle.module.css";
import BottomBorderComponent from "./components/BottomBorderComponent";
import TennisMobilePitch from "./TennisMobilePitch";
import { withScroll } from "@/components/HOCS/ScrollWrapper";

const ScrollMobilePitch = withScroll(TennisMobilePitch);

interface TennisPitchInterface {
  data: any;
}

function getStatusFromCode(code: number): string | undefined {
  const tennisCodes = [
    {
      code: 11113,
      name: "Player 1 Serve",
    },
    {
      code: 21113,
      name: "Player 2 Serve",
    },
    {
      code: 11114,
      name: "Player 1 Score Point",
    },
    {
      code: 21114,
      name: "Player 2 Score Point",
    },
    {
      code: 11115,
      name: "Player 1 Score Point",
    },
    {
      code: 21115,
      name: "Player 2 Score Point",
    },
    {
      code: 11116,
      name: "Player 1 Double Fault",
    },
    {
      code: 21116,
      name: "Player 2 Double Fault",
    },
    {
      code: 11117,
      name: "Player 1 Ace",
    },
    {
      code: 21117,
      name: "Player 2 Ace",
    },
    {
      code: 11118,
      name: "Player 1 Break point",
    },
    {
      code: 21118,
      name: "Player 2 Break point",
    },
    {
      code: 11119,
      name: "Player 1 Win a Game",
    },
    {
      code: 21119,
      name: "Player 2 Win a Game",
    },
    {
      code: 11120,
      name: "Player 1 Statistic",
    },
    {
      code: 21120,
      name: "Player 2 Statistic",
    },
    {
      code: 11121,
      name: "Player 1 let 1st Serve",
    },
    {
      code: 21121,
      name: "Player 2 let 1st Serve",
    },
    {
      code: 11122,
      name: "Player 1 let 2nd Serve",
    },
    {
      code: 21122,
      name: "Player 2 let 2nd Serve",
    },
    {
      code: 1123,
      name: "Game Set Match",
    },
    {
      code: 11123,
      name: "Player 1 Game Set Match",
    },
    {
      code: 21123,
      name: "Player 2 Game Set Match",
    },
    {
      code: 1124,
      name: "End of Set",
    },
    {
      code: 11124,
      name: "Player 1 End of Set",
    },
    {
      code: 21124,
      name: "Player 2 End of Set",
    },
    {
      code: 11125,
      name: "Player 1 Score a Point in Tie Break",
    },
    {
      code: 21125,
      name: "Player 2 Score a Point in Tie Break",
    },
    {
      code: 11126,
      name: "Player 1 Injury Break",
    },
    {
      code: 21126,
      name: "Player 2 Injury Break",
    },
    {
      code: 11128,
      name: "Player 1 Point Score",
    },
    {
      code: 21128,
      name: "Player 2 Point Score",
    },
    {
      code: 11129,
      name: "Player 1 Challenge Success",
    },
    {
      code: 21129,
      name: "Player 2 Challenge Success",
    },
    {
      code: 11130,
      name: "Player 1 Challenge Failed",
    },
    {
      code: 21130,
      name: "Player 2 Challenge Failed",
    },
    {
      code: 1127,
      name: "Rain Delay",
    },
    {
      code: 1134,
      name: "1st Set",
    },
    {
      code: 1135,
      name: "2nd Set",
    },
    {
      code: 1136,
      name: "3rd Set",
    },
    {
      code: 1137,
      name: "4th Set",
    },
    {
      code: 1138,
      name: "Final Set",
    },
  ];

  const matchingCode = tennisCodes.find(
    (tennisCode) => tennisCode.code == code
  );
  return matchingCode?.name;
}

export function getTeamMessage(code: number): { team: string; message: string } {
  let status = getStatusFromCode(code) ?? "";
  let message, team;
  if(status.startsWith("Player 1 ")) {
    team = "Player 1"
    message = status.replace(/^Player 1/, '');
  } else if(status.startsWith("Player 2")) {
    team = "Player 2"
    message = status.replace(/^Player 2/, '');
  } else {
    team = "Global"
    message = status;
  }
  return {
    team: team,
    message: message
  }
}

function getServePlayer(data: any): number {
  return data?.stats[3]?.home == "1" ? 1 : 0;
}

function getSetNumber(data: any) {
  if (data?.info.period == "Set 1") {
    return "1";
  } else if (data?.info.period == "Set 2") {
    return "2";
  } else if (data?.info.period == "Set 3") {
    return "3";
  } else {
    return "0";
  }
}

function getHomeScore(data: any) {
  let score = "0";
  let scoreString = data?.info.score.split(",").slice(-1)[0] as string;
  if (scoreString) {
    score = scoreString[0];
  }
  return score;
}

function getAwayScore(data: any) {
  let score = "0";
  let scoreString = data?.info.score.split(",").slice(-1)[0] as string;
  if (scoreString) {
    score = scoreString[2];
  }
  return score;
}

function getAcitveColor(player: string, data: any) {
  const serverPlayer = getServePlayer(data);
  return player == "home"
    ? serverPlayer == 1
      ? "#9abeff"
      : "#fff"
    : serverPlayer == 0
    ? "#9abeff"
    : "#fff";
}

function getScoreCount(score: number) {
  return Math.ceil(score / 15);
}

function getServerPosition(data: any) {
  return (getScoreCount(data?.stats[1].home) +
    getScoreCount(data?.stats[1].away)) %
    2 ==
    0
    ? "right"
    : "left";
}
// show under text
function getUnderTextClassName(data: any) {
  const state_number = data?.info.state as number;
  if (state_number != 11115 && state_number != 21115) {
    return `${pitchStyle.underText} ${pitchStyle.noUnderText}`;
  }
  if (state_number == 11115) {
    return `${
      (getScoreCount(data?.stats[1].home) +
        getScoreCount(data?.stats[1].away)) %
        2 ==
      0
        ? pitchStyle.homeUnderTextDown
        : pitchStyle.homeUnderTextUp
    } ${pitchStyle.underText}`;
  } else {
    return `${
      (getScoreCount(data?.stats[1].home) +
        getScoreCount(data?.stats[1].away)) %
        2 ==
      0
        ? pitchStyle.awayUnderTextUp
        : pitchStyle.awayUnderTextDown
    } ${pitchStyle.underText}`;
  }
}

function getUnderText(data: any) {
  const state_number = data?.info.state as number;
  if (state_number == 11115 || state_number == 21115) {
    return "Point";
  } else {
    return "";
  }
}

// show player name
function getHomeClassName(data: any) {
  if (
    (data?.info.state as number) == 11119 ||
    (data?.info.state as number) == 21119 ||
    (data?.info.state as number) == 11126 ||
    (data?.info.state as number) == 21126 ||
    (data?.info.state as number) == 11120 ||
    (data?.info.state as number) == 21120
  ) {
    return `${pitchStyle.playerName} ${pitchStyle.noName}`;
  }
  return `${
    (getScoreCount(data?.stats[1].home) + getScoreCount(data?.stats[1].away)) %
      2 ==
    0
      ? pitchStyle.homeDown
      : pitchStyle.homeUp
  } ${pitchStyle.playerName}`;
}

function getAwayClassName(data: any) {
  if (
    (data?.info.state as number) == 11119 ||
    (data?.info.state as number) == 21119 ||
    (data?.info.state as number) == 11126 ||
    (data?.info.state as number) == 21126 ||
    (data?.info.state as number) == 11120 ||
    (data?.info.state as number) == 21120
  ) {
    return `${pitchStyle.playerName} ${pitchStyle.noName}`;
  }
  return `${
    (getScoreCount(data?.stats[1].home) + getScoreCount(data?.stats[1].away)) %
      2 ==
    0
      ? pitchStyle.awayUp
      : pitchStyle.awayDown
  } ${pitchStyle.playerName}`;
}

// show points
function getHomePointsClassName(data: any) {
  return `${
    !(
      (data?.info.state as number) == 11119 ||
      (data?.info.state as number) == 21119 ||
      (data?.info.state as number) == 11113 ||
      (data?.info.state as number) == 21113 ||
      (data?.info.state as number) == 11126 ||
      (data?.info.state as number) == 21126 ||
      (data?.info.state as number) == 11120 ||
      (data?.info.state as number) == 21120
    )
      ? pitchStyle.homePointsShowUp
      : pitchStyle.homePointsShowDown
  } ${pitchStyle.scoredPoints}`;
}

function getAwayPointsClassName(data: any) {
  return `${
    !(
      (data?.info.state as number) == 11119 ||
      (data?.info.state as number) == 21119 ||
      (data?.info.state as number) == 11113 ||
      (data?.info.state as number) == 21113 ||
      (data?.info.state as number) == 11126 ||
      (data?.info.state as number) == 21126 ||
      (data?.info.state as number) == 11120 ||
      (data?.info.state as number) == 21120
    )
      ? pitchStyle.awayPointsShowUp
      : pitchStyle.awayPointsShowDown
  } ${pitchStyle.scoredPoints}`;
}

// Injury Status
function getInjuryClassName(data: any) {
  const state_number = data?.info.state as number;
  return `${
    state_number == 11126 || state_number == 21126
      ? pitchStyle.injuryShowUp
      : pitchStyle.injuryShowDown
  } ${pitchStyle.injuryState}`;
}

// Win Status
function winHomeClassName(data: any) {
  return `${
    (data?.info.state as number) == 11119
      ? pitchStyle.winHomeShowUp
      : pitchStyle.winHomeShowDwon
  } ${pitchStyle.winState}`;
}

function winAwayClassName(data: any) {
  return `${
    (data?.info.state as number) == 21119
      ? pitchStyle.winAwayShowUp
      : pitchStyle.winAwayShowDwon
  } ${pitchStyle.winState}`;
}

//get kit colors of two teams
function getKitColors(data: any): { home: string; away: string } {
  let homeColors = data?.team_info?.home.kit_color?.split(",") ?? ["#ff0000"];
  let awayColors = data?.team_info?.away.kit_color?.split(",") ?? ["#ffffff"];
  for (let i = 0; i < homeColors.length; ++i)
    if (homeColors[i] != awayColors[i])
      return {
        home: homeColors[i],
        away: awayColors[i],
      };
  return {
    home: "#ff0000",
    away: "#ffffff",
  };
}

const TennisPitch: React.FC<TennisPitchInterface> = ({ data }) => {
  const prevPropsRef = useRef();

  // console.log(data);

  useEffect(() => {
    prevPropsRef.current = data;
  });

  const prevData = prevPropsRef.current;
  // const keys = Object.keys(data.stats);
  const firstPlayerFullName =
    data?.stats[0]?.home.split("/").slice(-1)[0] ?? "";
  // console.log("---first---", data?.stats[0].home.split("/").slice(-1));
  const firstPlayerName = firstPlayerFullName.split(" ");
  const secondPlayerFullName =
    data?.stats[0]?.away.split("/").slice(-1)[0] ?? "";
  const secondPlayerName = secondPlayerFullName.split(" ");

  var set_scores = [0, 0];
  var _scores = [] as any;
  var score_string = data?.info?.score;
  const sts = data?.sts;
  // console.log({ sts: sts });
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

  const kitColors = getKitColors(data);

  return (
    <>
      <div className="hidden md:block">
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
              <div
                className="border-b-2 border-solid mr-px"
                style={{
                  borderBottomColor: kitColors.home,
                }}
              >
                <div className="flex items-center justify-center h-[48px] px-[5px] py-0">
                  <div className="font-bold text-[color(display-p3_1_0.875_0.106)] text-[22px] leading-[26px] whitespace-nowrap">
                    {data?.stats[1].home}
                  </div>
                </div>
              </div>
              <div
                className="border-b-2 border-solid mr-px"
                style={{
                  borderBottomColor: kitColors.away,
                }}
              >
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
        {/* <div className="flex w-full flex-col"> */}
        <div className="max-w-[440px] mx-auto my-0 px-5 py-2.5">
          {/* <div className="flex justify-around p-2 text-base text-white">
          <span>{data?.stats[0].home}</span>
          <span>{data?.stats[0].away}</span>
        </div>
        <div className="flex justify-around p-2 text-base text-white">
          <span>{data?.info.period}</span>
        </div>
        <div className="flex justify-center p-2 text-base text-white">
          <span>Turn</span>
          <span className="px-4"> : </span>
          <span>{data?.stats[3]?.home == "1" ? "Player1" : "Player2"}</span>
        </div>
        <div className="flex justify-around p-2 text-base text-white">
          <span>{data?.info.score.split(",").slice(-1)}</span>
        </div>
        <div className="flex justify-around p-2 text-base text-white">
          <span>{data?.stats[1].home}</span>
          <span>{data?.stats[1].away}</span>
        </div>
        <div className="flex justify-around p-2 text-base text-white">
          <span>{data?.info.state}</span>
        </div>
        <div className="flex justify-around p-2 text-base text-white">
          <span>{data?.info.state_info}</span>
        </div>
        <div className="flex justify-around p-2 text-base text-white">
          <span>{getStatusFromCode(data?.info.state as number)}</span>
        </div> */}
          <svg
            id="SVGIRIS_PITCH"
            viewBox="0 0 400 180"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="40"
          >
            <defs>
              <filter
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
                filterUnits="objectBoundingBox"
                id="SVGIRIS_PITCH_DEF_1"
              >
                <feOffset
                  dx="2"
                  in="SourceAlpha"
                  result="shadowOffsetOuter1"
                ></feOffset>
                <feGaussianBlur
                  stdDeviation="1"
                  in="shadowOffsetOuter1"
                  result="shadowBlurOuter1"
                ></feGaussianBlur>
                <feColorMatrix
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
                  in="shadowBlurOuter1"
                  result="shadowMatrixOuter1"
                ></feColorMatrix>
                <feMerge>
                  <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                  <feMergeNode in="SourceGraphic"></feMergeNode>
                </feMerge>
              </filter>
              <linearGradient
                x1="83.8431154%"
                y1="18.0054762%"
                x2="-32.208252%"
                y2="15.1612088%"
                id="SVGIRIS_PITCH_DEF_2"
              >
                <stop stopColor="#385E8A" stopOpacity="0.5" offset="0%"></stop>
                <stop stopColor="#FFDF1B" offset="32.1348852%"></stop>
                <stop stopColor="#FFDF1B" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g id="SVGIRIS_PITCH_BG" fill="none">
              <path d="M0 0v180h400v-180h-400z" fill="#294575"></path>
              <path
                d="M98 17h2v146h-2v-146zm202 0h2v146h-2v-146zm-298-2h396v2h-396v-2zm0 148h396v2h-396v-2zm98-74h200v2h-200v-2z"
                fill="#5779A1"
              ></path>
              <path
                d="M198 9h3v162h-3v-162z"
                fill="#B2B9C8"
                filter="url(#SVGIRIS_PITCH_DEF_1)"
              ></path>
              <path d="M198 171v3h3v-3h-3z" fill="#4a3432"></path>
              <path d="M198 6v3h3v-3h-3z" fill="#4a3432"></path>
              <path
                stroke="#5779A1"
                strokeWidth="2"
                d="M1 1h398v178h-398z"
              ></path>
              <g id="img_back">
                <image id="SvgjsImage1122" width="400" height="180"></image>
              </g>
            </g>
            <svg
              id="SVGIRIS_PITCH_DEF_SERVE_BALLS"
              width="90"
              height="58"
              viewBox="0 0 90 58"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient
                  cx="51.6688311%"
                  cy="32.5203781%"
                  fx="51.6688311%"
                  fy="32.5203781%"
                  r="0.108057773%"
                  id="def_radialGradient"
                >
                  <stop stopColor="#ECEE44" offset="6.17426658%"></stop>
                  <stop stopColor="#ECEE44" offset="13.7655453%"></stop>
                  <stop stopColor="#ECEE44" offset="100%"></stop>
                </radialGradient>
              </defs>
              <g
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
                opacity="0"
              >
                <g transform="translate(68, 29)">
                  <path
                    d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                    id="Ellipse_1_"
                    fill="url(#def_radialGradient)"
                    opacity="0.9"
                  ></path>
                  <path
                    d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                    fill="#FFFFFF"
                  ></path>
                </g>
                <g transform="translate(50, 24)">
                  <path
                    d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                    id="Ellipse_1_"
                    fill="url(#def_radialGradient)"
                    opacity="0.8"
                  ></path>
                  <path
                    d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                    fill="#FFFFFF"
                  ></path>
                </g>
                <g transform="translate(33, 17)">
                  <path
                    d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                    id="Ellipse_1_"
                    fill="url(#def_radialGradient)"
                    opacity="0.7"
                  ></path>
                  <path
                    d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                    fill="#FFFFFF"
                  ></path>
                </g>
                <g transform="translate(16, 9)">
                  <path
                    d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                    id="Ellipse_1_"
                    fill="url(#def_radialGradient)"
                    opacity="0.6"
                  ></path>
                  <path
                    d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                    fill="#FFFFFF"
                  ></path>
                </g>
                <g>
                  <path
                    d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                    id="Ellipse_1_"
                    fill="url(#def_radialGradient)"
                    opacity="0.5"
                  ></path>
                  <path
                    d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                    fill="#FFFFFF"
                  ></path>
                </g>
              </g>
            </svg>

            {/* Win Status */}

            {
              /* player 1 win */
              (data?.info.state as number) == 11119 && (
                <g
                  id="SVGIRIS_PITCH_EVENTTEAM_1"
                  className={winHomeClassName(data)}
                >
                  <rect
                    id="SVGIRIS_PITCH_EVENTTEAM_1_COL"
                    width="3"
                    height="57"
                    fill={kitColors.home}
                  ></rect>
                  <text
                    id="SVGIRIS_PITCH_EVENTTEAM_1_TXT_TEAM"
                    x="-5"
                    y="15"
                    fill="#FFFFFF"
                    fontFamily="Roboto"
                    fontSize="14"
                    fontWeight="300"
                    letterSpacing="0px"
                    wordSpacing="0px"
                    textAnchor="end"
                    xmlSpace="preserve"
                  >
                    {data?.stats[0]?.home}
                  </text>
                  <text
                    id="SVGIRIS_PITCH_EVENTTEAM_1_TXT_EVENT"
                    x="-5"
                    y="35"
                    fill="#ffdf1b"
                    fontFamily="Roboto"
                    fontSize="16"
                    fontWeight="400"
                    letterSpacing="0px"
                    wordSpacing="0px"
                    textAnchor="end"
                    xmlSpace="preserve"
                  >
                    Game
                  </text>
                  <text
                    id="SVGIRIS_PITCH_EVENTTEAM_1_TXT_INFO"
                    x="-5"
                    y="53"
                    fill="#9abeff"
                    fontFamily="Roboto"
                    fontSize="13"
                    fontWeight="400"
                    letterSpacing="0.2px"
                    wordSpacing="0px"
                    textAnchor="end"
                    xmlSpace="preserve"
                  >
                    Holds to {data?.stats[1]?.away}
                  </text>
                </g>
              )
            }
            {
              /* player 2 win */
              (data?.info.state as number) == 21119 && (
                <g
                  id="SVGIRIS_PITCH_EVENTTEAM_1"
                  className={winAwayClassName(data)}
                  transform="matrix(1,0,0,1,204,61.5)"
                >
                  <rect
                    id="SVGIRIS_PITCH_EVENTTEAM_1_COL"
                    width="3"
                    height="57"
                    fill={kitColors.away}
                  ></rect>
                  <text
                    id="SVGIRIS_PITCH_EVENTTEAM_1_TXT_TEAM"
                    x="5"
                    y="15"
                    fill="#FFFFFF"
                    fontFamily="Roboto"
                    fontSize="14"
                    fontWeight="300"
                    letterSpacing="0px"
                    wordSpacing="0px"
                    textAnchor="start"
                    xmlSpace="preserve"
                  >
                    {data?.stats[0].away}
                  </text>
                  <text
                    id="SVGIRIS_PITCH_EVENTTEAM_1_TXT_EVENT"
                    x="5"
                    y="35"
                    fill="#ffdf1b"
                    fontFamily="Roboto"
                    fontSize="16"
                    fontWeight="400"
                    letterSpacing="0px"
                    wordSpacing="0px"
                    textAnchor="start"
                    xmlSpace="preserve"
                  >
                    Game
                  </text>
                  <text
                    id="SVGIRIS_PITCH_EVENTTEAM_1_TXT_INFO"
                    x="5"
                    y="53"
                    fill="#9abeff"
                    fontFamily="Roboto"
                    fontSize="13"
                    fontWeight="400"
                    letterSpacing="0.2px"
                    wordSpacing="0px"
                    textAnchor="start"
                    xmlSpace="preserve"
                  >
                    Holds to {data?.stats[1]?.home}
                  </text>
                </g>
              )
            }

            {/* Injuriy Break */}

            <g
              id="score"
              transform="translate(175, 80)"
              className={getInjuryClassName(data)}
            >
              <text
                id="score_home"
                transform="translate(23 15)"
                fill="#fff"
                textAnchor="middle"
                fontFamily="Roboto"
                fontSize="18"
                fontWeight="600"
              >
                Injury Break
              </text>
            </g>

            {/* Ball Serve */}
            {
              // Player 1 Serve
              (data?.info.state as number) == 11113 &&
                (getServerPosition(data) == "left" ? (
                  <g id="SVGIRIS_PITCH_FX">
                    <svg
                      id="SVGIRIS_PITCH_FX_SISV"
                      width="90"
                      height="58"
                      viewBox="0 0 90 58"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="10"
                      y="70"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                        opacity="1"
                        id="SvgjsG4132"
                        transform="matrix(1,0,0,1,0,0)"
                      >
                        <g
                          transform="translate(68, 29)"
                          id="SvgjsG4130"
                          className={animationStyles.ball4}
                        >
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath4128"
                            fill="url(#def_radialGradient)"
                            opacity="0.9"
                          ></path>
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath4126"
                          ></path>
                        </g>
                        <g
                          transform="translate(50, 24)"
                          id="SvgjsG4124"
                          className={animationStyles.ball3}
                        >
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath4122"
                            fill="url(#def_radialGradient)"
                            opacity="0.8"
                          ></path>
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath4120"
                          ></path>
                        </g>
                        <g
                          transform="translate(33, 17)"
                          id="SvgjsG4118"
                          className={animationStyles.ball2}
                        >
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath4116"
                            fill="url(#def_radialGradient)"
                            opacity="0.7"
                          ></path>
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath4114"
                          ></path>
                        </g>
                        <g
                          transform="translate(16, 9)"
                          id="SvgjsG4112"
                          className={animationStyles.ball1}
                        >
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath4110"
                            fill="url(#def_radialGradient)"
                            opacity="0.6"
                          ></path>
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath4108"
                          ></path>
                        </g>
                        <g id="SvgjsG4106" className={animationStyles.ball0}>
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath4104"
                            fill="url(#def_radialGradient)"
                            opacity="0.5"
                          ></path>
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath4102"
                          ></path>
                        </g>
                      </g>
                      <defs id="SvgjsDefs4142">
                        <radialGradient
                          cx="51.6688311%"
                          cy="32.5203781%"
                          fx="51.6688311%"
                          fy="32.5203781%"
                          r="0.108057773%"
                          id="SvgjsRadialGradient4140"
                        >
                          <stop
                            stopColor="#ECEE44"
                            offset="6.17426658%"
                            id="SvgjsStop4138"
                          ></stop>
                          <stop
                            stopColor="#ECEE44"
                            offset="13.7655453%"
                            id="SvgjsStop4136"
                          ></stop>
                          <stop
                            stopColor="#ECEE44"
                            offset="100%"
                            id="SvgjsStop4134"
                          ></stop>
                        </radialGradient>
                      </defs>
                    </svg>
                  </g>
                ) : (
                  <g id="SVGIRIS_PITCH_FX">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      id="SVGIRIS_PITCH_FX_SISV"
                      width="90"
                      height="58"
                      viewBox="0 0 90 58"
                      version="1.1"
                      x="10"
                      y="65"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                        opacity="1"
                        id="SvgjsG3629"
                        transform="matrix(1,0,0,-1,0,43)"
                      >
                        <g
                          transform="translate(68, 29)"
                          id="SvgjsG3627"
                          className={animationStyles.ball4}
                        >
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath3625"
                            fill="url(#def_radialGradient)"
                            opacity="0.9"
                          />
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath3623"
                          />
                        </g>
                        <g
                          transform="translate(50, 24)"
                          id="SvgjsG3621"
                          className={animationStyles.ball3}
                        >
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath3619"
                            fill="url(#def_radialGradient)"
                            opacity="0.8"
                          />
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath3617"
                          />
                        </g>
                        <g
                          transform="translate(33, 17)"
                          id="SvgjsG3615"
                          className={animationStyles.ball2}
                        >
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath3613"
                            fill="url(#def_radialGradient)"
                            opacity="0.7"
                          />
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath3611"
                          />
                        </g>
                        <g
                          transform="translate(16, 9)"
                          id="SvgjsG3609"
                          className={animationStyles.ball1}
                        >
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath3607"
                            fill="url(#def_radialGradient)"
                            opacity="0.6"
                          />
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath3605"
                          />
                        </g>
                        <g id="SvgjsG3603" className={animationStyles.ball0}>
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath3601"
                            fill="url(#def_radialGradient)"
                            opacity="0.5"
                          />
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath3599"
                          />
                        </g>
                      </g>
                      <defs id="SvgjsDefs3639">
                        <radialGradient
                          cx="51.6688311%"
                          cy="32.5203781%"
                          fx="51.6688311%"
                          fy="32.5203781%"
                          r="0.108057773%"
                          id="SvgjsRadialGradient3637"
                        >
                          <stop
                            stopColor="#ECEE44"
                            offset="6.17426658%"
                            id="SvgjsStop3635"
                          />
                          <stop
                            stopColor="#ECEE44"
                            offset="13.7655453%"
                            id="SvgjsStop3633"
                          />
                          <stop
                            stopColor="#ECEE44"
                            offset="100%"
                            id="SvgjsStop3631"
                          />
                        </radialGradient>
                      </defs>
                    </svg>
                  </g>
                ))
            }
            {
              // Player 2 Serve
              (data?.info.state as number) == 21113 &&
                (getServerPosition(data) == "right" ? (
                  <g id="SVGIRIS_PITCH_FX">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="SVGIRIS_PITCH_FX_SISV"
                      width="90"
                      height="58"
                      viewBox="0 0 90 58"
                      version="1.1"
                      x="310"
                      y="65"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                        opacity="1"
                        id="SvgjsG2908"
                        transform="matrix(-1,0,0,1,82,0)"
                      >
                        <g
                          transform="translate(68, 29)"
                          id="SvgjsG2906"
                          className={animationStyles.ball4}
                        >
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath2904"
                            fill="url(#def_radialGradient)"
                            opacity="0.9"
                          />
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath2902"
                          />
                        </g>
                        <g
                          transform="translate(50, 24)"
                          id="SvgjsG2900"
                          className={animationStyles.ball3}
                        >
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath2898"
                            fill="url(#def_radialGradient)"
                            opacity="0.8"
                          />
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath2896"
                          />
                        </g>
                        <g
                          transform="translate(33, 17)"
                          id="SvgjsG2894"
                          className={animationStyles.ball2}
                        >
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath2892"
                            fill="url(#def_radialGradient)"
                            opacity="0.7"
                          />
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath2890"
                          />
                        </g>
                        <g
                          transform="translate(16, 9)"
                          id="SvgjsG2888"
                          className={animationStyles.ball1}
                        >
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath2886"
                            fill="url(#def_radialGradient)"
                            opacity="0.6"
                          />
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath2884"
                          />
                        </g>
                        <g id="SvgjsG2882" className={animationStyles.ball0}>
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath2880"
                            fill="url(#def_radialGradient)"
                            opacity="0.5"
                          />
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath2878"
                          />
                        </g>
                      </g>
                      <defs id="SvgjsDefs2918">
                        <radialGradient
                          cx="51.6688311%"
                          cy="32.5203781%"
                          fx="51.6688311%"
                          fy="32.5203781%"
                          r="0.108057773%"
                          id="SvgjsRadialGradient2916"
                        >
                          <stop
                            stopColor="#ECEE44"
                            offset="6.17426658%"
                            id="SvgjsStop2914"
                          />
                          <stop
                            stopColor="#ECEE44"
                            offset="13.7655453%"
                            id="SvgjsStop2912"
                          />
                          <stop
                            stopColor="#ECEE44"
                            offset="100%"
                            id="SvgjsStop2910"
                          />
                        </radialGradient>
                      </defs>
                    </svg>
                  </g>
                ) : (
                  <g id="SVGIRIS_PITCH_FX">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      id="SVGIRIS_PITCH_FX_SISV"
                      width="90"
                      height="58"
                      viewBox="0 0 90 58"
                      version="1.1"
                      x="310"
                      y="70"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                        opacity="1"
                        id="SvgjsG2761"
                        transform="matrix(-1,0,0,-1,82,43)"
                      >
                        <g
                          transform="translate(68, 29)"
                          id="SvgjsG2759"
                          className={animationStyles.ball4}
                        >
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath2757"
                            fill="url(#def_radialGradient)"
                            opacity="0.9"
                          />
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath2755"
                          />
                        </g>
                        <g
                          transform="translate(50, 24)"
                          id="SvgjsG2753"
                          className={animationStyles.ball3}
                        >
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath2751"
                            fill="url(#def_radialGradient)"
                            opacity="0.8"
                          />
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath2749"
                          />
                        </g>
                        <g
                          transform="translate(33, 17)"
                          id="SvgjsG2747"
                          className={animationStyles.ball2}
                        >
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath2745"
                            fill="url(#def_radialGradient)"
                            opacity="0.7"
                          />
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath2743"
                          />
                        </g>
                        <g
                          transform="translate(16, 9)"
                          id="SvgjsG2741"
                          className={animationStyles.ball1}
                        >
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath2739"
                            fill="url(#def_radialGradient)"
                            opacity="0.6"
                          />
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath2737"
                          />
                        </g>
                        <g id="SvgjsG2735" className={animationStyles.ball0}>
                          <path
                            d="M0,7 C0,3.13394439 3.13395015,0 6.99998714,0 C10.8660241,0 14,3.13394439 14,7 C14,10.8660299 10.8660756,14 6.99998714,14 C3.13395015,14 0,10.8660299 0,7 L0,7 Z"
                            id="SvgjsPath2733"
                            fill="url(#def_radialGradient)"
                            opacity="0.5"
                          />
                          <path
                            d="M13.9285968,5.98472458 C13.9285968,5.98472458 13.7723984,5.99949777 13.4700573,6.05482082 C11.071312,6.4937374 8.47445205,11.2002721 5.54446791,11.2002721 C2.71009086,11.1409756 1.56557622,8.14352071 1.61554741,6.54241252 C1.63689034,5.85871945 1.52558388,4.39754904 3.46145435,2.47313721 C5.06443154,0.879772213 7.96168302,0.551297965 9.24366972,0.392053161 C9.08223816,0.276796804 8.30042508,0.240602488 7.6043685,0.278758073 C3.14605612,0.682295411 1.05660377,4.05891185 1.05660377,6.59289608 C1.05660377,9.09975367 2.67587034,11.8867925 5.61634638,11.8867925 C8.62541736,11.8867925 11.9724608,6.46951446 13.9977305,6.57865778 C14.0149433,6.57962568 13.9285968,5.98472458 13.9285968,5.98472458 L13.9285968,5.98472458 Z"
                            fill="#FFFFFF"
                            id="SvgjsPath2731"
                          />
                        </g>
                      </g>
                      <defs id="SvgjsDefs2771">
                        <radialGradient
                          cx="51.6688311%"
                          cy="32.5203781%"
                          fx="51.6688311%"
                          fy="32.5203781%"
                          r="0.108057773%"
                          id="SvgjsRadialGradient2769"
                        >
                          <stop
                            stopColor="#ECEE44"
                            offset="6.17426658%"
                            id="SvgjsStop2767"
                          />
                          <stop
                            stopColor="#ECEE44"
                            offset="13.7655453%"
                            id="SvgjsStop2765"
                          />
                          <stop
                            stopColor="#ECEE44"
                            offset="100%"
                            id="SvgjsStop2763"
                          />
                        </radialGradient>
                      </defs>
                    </svg>
                  </g>
                ))
            }
            {/* undertext */}
            <g
              id="SVGIRIS_PITCH_TEAM_1"
              className={getUnderTextClassName(data)}
              opacity="1"
            >
              <text
                id="SVGIRIS_PITCH_TEAM_1_TXT_NAME1"
                fill="#9abeff"
                fontFamily="Roboto"
                fontSize="16px"
                fontWeight="400"
                letterSpacing="0px"
                wordSpacing="0px"
                textAnchor="start"
                xmlSpace="preserve"
              >
                {getUnderText(data)}
              </text>
            </g>

            {/* plyer name */}
            <g
              id="SVGIRIS_PITCH_TEAM_1"
              className={getHomeClassName(data)}
              opacity="1"
            >
              <rect
                id="SVGIRIS_PITCH_TEAM_1_COL"
                width="3"
                height="35"
                fill={kitColors.home}
              ></rect>
              <text
                id="SVGIRIS_PITCH_TEAM_1_TXT_NAME1"
                x="7"
                y="14"
                fill="#ffffff"
                fontFamily="Roboto"
                fontSize="15.5"
                fontWeight="400"
                letterSpacing="0px"
                wordSpacing="0px"
                textAnchor="start"
                xmlSpace="preserve"
              >
                {firstPlayerName[0]}
              </text>
              <text
                id="SVGIRIS_PITCH_TEAM_1_TXT_NAME2"
                x="7"
                y="32"
                fill="#ffffff"
                fontFamily="Roboto"
                fontSize="15.5"
                fontWeight="400"
                letterSpacing="0px"
                wordSpacing="0px"
                textAnchor="start"
                xmlSpace="preserve"
              >
                {firstPlayerName.length > 1 && firstPlayerName.slice(-1)[0]}
              </text>
            </g>
            <g
              id="SVGIRIS_PITCH_TEAM_2"
              className={getAwayClassName(data)}
              opacity="1"
            >
              <rect
                id="SVGIRIS_PITCH_TEAM_2_COL"
                width="3"
                height="35"
                x="-3"
                fill={kitColors.away}
              ></rect>
              <text
                id="SVGIRIS_PITCH_TEAM_2_TXT_NAME1"
                x="-7"
                y="14"
                fill="#ffffff"
                fontFamily="Roboto"
                fontSize="15.5"
                fontWeight="400"
                letterSpacing="0px"
                wordSpacing="0px"
                textAnchor="end"
                style={{ userSelect: "none" }}
                xmlSpace="preserve"
              >
                {secondPlayerName[0]}
              </text>
              <text
                id="SVGIRIS_PITCH_TEAM_2_TXT_NAME2"
                x="-7"
                y="32"
                fill="#ffffff"
                fontFamily="Roboto"
                fontSize="15.5"
                fontWeight="400"
                letterSpacing="0px"
                wordSpacing="0px"
                textAnchor="end"
                style={{ userSelect: "none" }}
                xmlSpace="preserve"
              >
                {secondPlayerName.length > 1 && secondPlayerName.slice(-1)[0]}
              </text>
            </g>

            {/* Statistics */}
            {((data?.info.state as number) == 11120 ||
              (data?.info.state as number) == 21120) && (
              <>
                {/* player name */}
                <g
                  id="SVGIRIS_PITCH_TEAM_1"
                  transform="matrix(1,0,0,1,5,125)"
                  opacity="1"
                >
                  <text
                    id="SVGIRIS_PITCH_TEAM_1_TXT_NAME1"
                    x="7"
                    y="14"
                    fill="#ffffff"
                    fontFamily="Roboto"
                    fontSize="15.5"
                    fontWeight="400"
                    letterSpacing="0px"
                    wordSpacing="0px"
                    textAnchor="start"
                    xmlSpace="preserve"
                  >
                    {firstPlayerName[0]}
                  </text>
                  <text
                    id="SVGIRIS_PITCH_TEAM_1_TXT_NAME2"
                    x="7"
                    y="32"
                    fill="#ffffff"
                    fontFamily="Roboto"
                    fontSize="15.5"
                    fontWeight="400"
                    letterSpacing="0px"
                    wordSpacing="0px"
                    textAnchor="start"
                    xmlSpace="preserve"
                  >
                    {firstPlayerName.length > 1 && firstPlayerName.slice(-1)[0]}
                  </text>
                </g>
                <g
                  id="SVGIRIS_PITCH_TEAM_2"
                  transform="matrix(1,0,0,1,395,125)"
                  opacity="1"
                >
                  <text
                    id="SVGIRIS_PITCH_TEAM_2_TXT_NAME1"
                    x="-7"
                    y="14"
                    fill="#ffffff"
                    fontFamily="Roboto"
                    fontSize="15.5"
                    fontWeight="400"
                    letterSpacing="0px"
                    wordSpacing="0px"
                    textAnchor="end"
                    style={{ userSelect: "none" }}
                    xmlSpace="preserve"
                  >
                    {secondPlayerName[0]}
                  </text>
                  <text
                    id="SVGIRIS_PITCH_TEAM_2_TXT_NAME2"
                    x="-7"
                    y="32"
                    fill="#ffffff"
                    fontFamily="Roboto"
                    fontSize="15.5"
                    fontWeight="400"
                    letterSpacing="0px"
                    wordSpacing="0px"
                    textAnchor="end"
                    style={{ userSelect: "none" }}
                    xmlSpace="preserve"
                  >
                    {secondPlayerName.length > 1 &&
                      secondPlayerName.slice(-1)[0]}
                  </text>
                </g>
                {/* set score status */}
                <g id="SVGIRIS_PITCH_FX">
                  <g
                    id="SVGIRIS_PITCH_FX_TYPE_GROUP"
                    opacity="1"
                    className={animationStyles.scoreTitle}
                  >
                    <rect
                      id="SVGIRIS_PITCH_FX_TYPE_GROUP_RECT"
                      width="68.25688934326172"
                      height="22"
                      fill="#99bcff"
                      rx="3"
                      ry="3"
                      x="-5"
                      y="13.501590251922607"
                    ></rect>
                    <text
                      id="SVGIRIS_PITCH_FX_TYPE_GROUP_TXT"
                      fontFamily="Roboto"
                      fontWeight="700"
                    >
                      <tspan
                        id="SVGIRIS_PITCH_FX_TYPE_GROUP_TXT_SPAN"
                        fontSize="16"
                        fontFamily="Roboto"
                        fontWeight="400"
                        letterSpacing="0px"
                        wordSpacing="0px"
                        dy="28.8"
                        x="10"
                      >
                        Set
                      </tspan>
                    </text>
                    <text
                      id="SVGIRIS_PITCH_FX_TYPE_GROUP_TXT"
                      fontFamily="Roboto"
                      fontWeight="700"
                    >
                      <tspan
                        id="SVGIRIS_PITCH_FX_TYPE_GROUP_TXT_SPAN"
                        fontSize="16"
                        fontFamily="Roboto"
                        fontWeight="400"
                        letterSpacing="0px"
                        wordSpacing="0px"
                        dy="28.8"
                        x="40"
                      >
                        {getSetNumber(data)}
                      </tspan>
                    </text>
                  </g>
                  <g
                    id="SVGIRIS_PITCH_FX_H_GROUP"
                    opacity="1"
                    className={animationStyles.leftScore}
                  >
                    <text
                      id="SVGIRIS_PITCH_FX_H_GROUP_TXT"
                      fontFamily="Roboto"
                      fontWeight="400"
                    >
                      <tspan
                        id="SVGIRIS_PITCH_FX_H_GROUP_TXT_SPAN"
                        fontSize="30"
                        fontFamily="Roboto"
                        fontWeight="400"
                        fill="#ffdf1b"
                        dy="20.8"
                        x="0"
                      >
                        {getHomeScore(data)}
                      </tspan>
                    </text>
                    <rect
                      id="SVGIRIS_PITCH_FX_H_GROUP_RECT"
                      width="31.852153778076172"
                      height="3"
                      fill={getAcitveColor("home", data) as string}
                      x="-7.5"
                      y="29.110437393188477"
                    ></rect>
                  </g>
                  <g
                    id="SVGIRIS_PITCH_FX_A_GROUP"
                    opacity="1"
                    className={animationStyles.rightScore}
                  >
                    <text
                      id="SVGIRIS_PITCH_FX_A_GROUP_TXT"
                      fontFamily="Roboto"
                      fontWeight="400"
                    >
                      <tspan
                        id="SVGIRIS_PITCH_FX_A_GROUP_TXT_SPAN"
                        fontSize="30"
                        fontFamily="Roboto"
                        fontWeight="400"
                        fill="#ffdf1b"
                        dy="20.8"
                        x="0"
                      >
                        {getAwayScore(data)}
                      </tspan>
                    </text>
                    <rect
                      id="SVGIRIS_PITCH_FX_A_GROUP_RECT"
                      width="31.852153778076172"
                      height="3"
                      fill={getAcitveColor("away", data) as string}
                      x="-7.5"
                      y="29.110437393188477"
                    ></rect>
                  </g>
                </g>
                {/* set ace status */}
                <g id="SVGIRIS_PITCH_FX">
                  <g
                    id="SVGIRIS_PITCH_FX_TYPE_GROUP"
                    opacity="1"
                    transform="matrix(1,0,0,1,170,-150)"
                    className={animationStyles.aceTitle}
                  >
                    <rect
                      id="SVGIRIS_PITCH_FX_TYPE_GROUP_RECT"
                      width="68.25688934326172"
                      height="22"
                      fill="#99bcff"
                      rx="3"
                      ry="3"
                      x="-5"
                      y="13.501590251922607"
                    ></rect>
                    <text
                      id="SVGIRIS_PITCH_FX_TYPE_GROUP_TXT"
                      fontFamily="Roboto"
                      fontWeight="700"
                    >
                      <tspan
                        id="SVGIRIS_PITCH_FX_TYPE_GROUP_TXT_SPAN"
                        fontSize="16"
                        fontFamily="Roboto"
                        fontWeight="400"
                        letterSpacing="0px"
                        wordSpacing="0px"
                        dy="28.8"
                        x="10"
                      >
                        Aces
                      </tspan>
                    </text>
                  </g>
                  <g
                    id="SVGIRIS_PITCH_FX_H_GROUP"
                    opacity="1"
                    transform="matrix(1,0,0,1,-50,75)"
                    className={animationStyles.leftAceScore}
                  >
                    <text
                      id="SVGIRIS_PITCH_FX_H_GROUP_TXT"
                      fontFamily="Roboto"
                      fontWeight="400"
                    >
                      <tspan
                        id="SVGIRIS_PITCH_FX_H_GROUP_TXT_SPAN"
                        fontSize="30"
                        fontFamily="Roboto"
                        fontWeight="400"
                        fill="#ffdf1b"
                        dy="20.8"
                        x="0"
                      >
                        {/* {getHomeScore(data)} */}
                        {_aces ? _aces[1] : "0"}
                      </tspan>
                    </text>
                    <rect
                      id="SVGIRIS_PITCH_FX_H_GROUP_RECT"
                      width="31.852153778076172"
                      height="3"
                      fill={getAcitveColor("home", data) as string}
                      x="-7.5"
                      y="29.110437393188477"
                    ></rect>
                  </g>
                  <g
                    id="SVGIRIS_PITCH_FX_A_GROUP"
                    opacity="1"
                    transform="matrix(1,0,0,1,500,75)"
                    className={animationStyles.rightAceScore}
                  >
                    <text
                      id="SVGIRIS_PITCH_FX_A_GROUP_TXT"
                      fontFamily="Roboto"
                      fontWeight="400"
                    >
                      <tspan
                        id="SVGIRIS_PITCH_FX_A_GROUP_TXT_SPAN"
                        fontSize="30"
                        fontFamily="Roboto"
                        fontWeight="400"
                        fill="#ffdf1b"
                        dy="20.8"
                        x="0"
                      >
                        {_aces ? _aces[2] : "0"}
                      </tspan>
                    </text>
                    <rect
                      id="SVGIRIS_PITCH_FX_A_GROUP_RECT"
                      width="31.852153778076172"
                      height="3"
                      fill={getAcitveColor("away", data) as string}
                      x="-7.5"
                      y="29.110437393188477"
                    ></rect>
                  </g>
                </g>
              </>
            )}
            {/* score presentation */}
            <g id="score" transform="translate(175, 0)">
              <rect
                x="5"
                y="0"
                display="inline"
                fill="#52564a"
                fillOpacity="1"
                width="40"
                height="20"
              ></rect>
              <text
                id="score_home"
                transform="translate(15 15)"
                fill="#ffdf1b"
                textAnchor="middle"
                fontSize="13px"
                fontWeight="bold"
              >
                {data?.stats[1].home}
              </text>
              <text
                id="score_away"
                transform="translate(35 15)"
                fill="#ffdf1b"
                textAnchor="middle"
                fontSize="13px"
                fontWeight="bold"
              >
                {data?.stats[1].away}
              </text>
            </g>
            {/* scored presentation */}
            <g id="point" transform="translate(200 90)">
              <g id="point_home" className={getHomePointsClassName(data)}>
                <text
                  id="point_home_text"
                  textAnchor="middle"
                  fill="#ffdf1b"
                  fontSize="28px"
                >
                  {data?.stats[1].home}
                </text>
                <rect
                  id="point_home_active"
                  x="-17"
                  y="10"
                  width="35"
                  height="3"
                  fill="#FFF"
                  className=""
                  style={{ fill: getAcitveColor("home", data) as string }}
                ></rect>
              </g>
              <g id="point_away" className={getAwayPointsClassName(data)}>
                <text
                  id="point_away_text"
                  textAnchor="middle"
                  fill="#ffdf1b"
                  fontSize="28px"
                >
                  {data?.stats[1].away}
                </text>
                <rect
                  id="point_away_active"
                  x="-17"
                  y="10"
                  width="35"
                  height="3"
                  fill="#FFF"
                  className=""
                  style={{ fill: getAcitveColor("away", data) as string }}
                ></rect>
              </g>
            </g>
          </svg>
          {/* {keys.map((key: any, index:React.Key) =>
				<div key={index} className="flex justify-around p-2 text-base text-black">
					<span>{data.stats[key].home}</span>
					<span>{data.stats[key].away}</span>
				</div>
			)} */}
        </div>

        <div>
          <BottomBorderComponent data={data}></BottomBorderComponent>
        </div>
        {/* bottom border end */}
      </div>

      <div className="md:hidden">
        <ScrollMobilePitch data={data} />
      </div>
    </>
  );
};

export default TennisPitch;
