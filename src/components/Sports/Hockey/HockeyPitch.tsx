import React, { useEffect, useRef, useState } from "react";
import { FIELD_HEIGHT, FIELD_WIDTH } from "./constants";
import BallTrack from "./PitchComponents/BallTrack";
import hockeyAnimation from "./hockeyAnimation.module.css";
import BottomBorderComponent from "./components/BottomBorderComponent";
import HockeyMobilePitch from "./HockeyMobilePitch";
import { withScroll } from "@/components/HOCS/ScrollWrapper";

const ScrollMobilePitch = withScroll(HockeyMobilePitch);

interface HockeyPitchInterface {
  data: any;
}

//get event string from code
function getEventString(status: number): string {
  const statusCodes = [
    {
      code: 1270,
      name: "On Possession",
    },
    {
      code: 1295,
      name: "On Possession",
    },
    {
      code: 1271,
      name: "Penalty",
    },
    {
      code: 1272,
      name: "Power Play Over",
    },
    {
      code: 1273,
      name: "Shot",
    },
    {
      code: 1274,
      name: "Goal",
    },
    {
      code: 1275,
      name: "Penalty Shot",
    },
    {
      code: 1276,
      name: "Penalty Shot Missed",
    },
    {
      code: 1277,
      name: "Pulled Keeper",
    },
    {
      code: 1278,
      name: "Keeper Back In Goal",
    },
    {
      code: 1280,
      name: "End of Period",
    },
    {
      code: 1281,
      name: "Overtime Start",
    },
    {
      code: 1282,
      name: "Overtime End",
    },
    {
      code: 1283,
      name: "Penalty Shootout",
    },
    {
      code: 1284,
      name: "Face Off",
    },
    {
      code: 1285,
      name: "Puck Dropped",
    },
    {
      code: 1286,
      name: "Face Off Winner",
    },
    {
      code: 1287,
      name: "Timeout",
    },
    {
      code: 1288,
      name: "Icing",
    },
    {
      code: 1289,
      name: "Power Play",
    },
  ];
  const matchingCode = statusCodes.find((code) => code.code == status);
  return matchingCode?.name ?? "";
}

//get data state to string
function getStatusFromCode(code: number): string | undefined {
  const hockeyCodes = [
    {
      code: 11272,
      name: "Home Team Power Play Over",
    },
    {
      code: 21273,
      name: "Away Team Shot",
    },
    {
      code: 11274,
      name: "Home Team Goal",
    },
    {
      code: 11277,
      name: "Home Team Pulled Keeper",
    },
    {
      code: 21277,
      name: "Away Team Pulled Keeper",
    },
    {
      code: 21286,
      name: "Away Team Face Off Winner",
    },
    {
      code: 21288,
      name: "Away Team Icing",
    },
    {
      code: 11289,
      name: "Home Team Power Play",
    },
    {
      code: 21289,
      name: "Away Team Power Play",
    },
    {
      code: 11271,
      name: "Home Team Penalty",
    },
    {
      code: 21271,
      name: "Away Team Penalty",
    },
    {
      code: 21272,
      name: "Away Team Power Play Over",
    },
    {
      code: 21275,
      name: "Away Team Penalty Shot",
    },
    {
      code: 11276,
      name: "Home Team Penalty Shot Missed",
    },
    {
      code: 21276,
      name: "Away Team Penalty Shot Missed",
    },
    {
      code: 11278,
      name: "Home Team Keeper Back In Goal",
    },
    {
      code: 21284,
      name: "Away Team Face Off",
    },
    {
      code: 11285,
      name: "Home Team Puck Dropped",
    },
    {
      code: 11286,
      name: "Home Team Face Off Winner",
    },
    {
      code: 11270,
      name: "Home Team On Possession",
    },
    {
      code: 21270,
      name: "Away Team On Possession",
    },
    {
      code: 11273,
      name: "Home Team Shot",
    },
    {
      code: 21274,
      name: "Away Team Goal",
    },
    {
      code: 1281,
      name: "Overtime Start",
    },
    {
      code: 1282,
      name: "Overtime End",
    },
    {
      code: 1283,
      name: "Penalty Shootout",
    },
    {
      code: 21287,
      name: "Away Team Timeout",
    },
    {
      code: 11288,
      name: "Home Team Icing",
    },
    {
      code: 11275,
      name: "Home Team Penalty Shot",
    },
    {
      code: 21278,
      name: "Away Team Keeper Back In Goal",
    },
    {
      code: 11284,
      name: "Home Team Face Off",
    },
    {
      code: 21285,
      name: "Away Team Puck Dropped",
    },
    {
      code: 11287,
      name: "Home Team Timeout",
    },
    {
      code: 11295,
      name: "Home Team On Posession",
    },
    {
      code: 21295,
      name: "Away Team On Possession",
    },
  ];

  const matchingCode = hockeyCodes.find(
    (soccerCode) => soccerCode.code == code
  );
  return matchingCode?.name;
}

export function getTeamMessage(code: number): { team: string; message: string } {
  let status = getStatusFromCode(code) ?? "";
  let message, team;
  if(status.startsWith("Home Team ")) {
    team = "Home Team"
    message = status.replace(/^Home Team/, '');
  } else if(status.startsWith("Away Team")) {
    team = "Away Team"
    message = status.replace(/^Away Team/, '');
  } else {
    team = "Global"
    message = status;
  }
  return {
    team: team,
    message: message
  }
}

//get ball position
function getBallPosition(data: any): any {
  let ballPos = data?.info?.ball_pos?.split(",");
  return ballPos && ballPos.length == 2
    ? {
        x: Number(ballPos[0]) * FIELD_WIDTH,
        y: Number(ballPos[1]) * FIELD_HEIGHT,
      }
    : null;
}

//get team from status code
function getTeamFromCode(code: number): number {
  return Math.floor(code / 10000);
}

//get event from code
function getEventFromCode(code: number): number {
  return code % 10000;
}

//whether show ball trail
function isShowTrailFromCode(code: number): boolean {
  const team = getTeamFromCode(code);
  const status = getEventFromCode(code);
  return team > 0 && (status == 1270 || status == 1295);
}

//whether clear trail
function isClearTrail(prevCode: number, curCode: number): boolean {
  return (
    isShowTrailFromCode(curCode) == false ||
    getTeamFromCode(prevCode) != getTeamFromCode(curCode)
  );
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

//get kit colors of two teams
function getKitColors(data: any): { home: string; away: string } {
  let homeColors = data?.team_info?.home.kit_color.split(",") ?? ["#ff0000"];
  let awayColors = data?.team_info?.away.kit_color.split(",") ?? ["#ffffff"];
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

//position match message on attack
function getMessagePositionOnAttack(
  ballPos: { x: number; y: number },
  team: number,
  status: string
): { x: number; y: number } {
  let x, y;
  if (!ballPos && status == "Dangerous Attack") {
    return {
      x: team == 1 ? 320 : 80,
      y: 75,
    };
  }
  if (!ballPos || team == 0)
    return {
      x: 200,
      y: 75,
    };
  y = ballPos.y < 75 ? ballPos.y + 20 : ballPos.y - 40;
  x = team == 1 ? ballPos.x - 20 : ballPos.x + 20;
  return {
    x: x,
    y: y,
  };
}
//position match message on possession
function getMessagePositionOnPossession(
  ballPos: { x: number; y: number },
  team: number
): { x: number; y: number } {
  let y;
  if (!ballPos || team == 0)
    return {
      x: 200,
      y: 75,
    };
  y = ballPos.y < 75 ? ballPos.y + 20 : ballPos.y - 40;
  return {
    x: 200,
    y: y,
  };
}
//position match message
function getMessagePosition(
  ballPos: { x: number; y: number },
  team: number,
  status: string
) {
  if (
    isAttack(ballPos, team, status) ||
    isDangerousAttack(ballPos, team, status)
  ) {
    let msgAttackPos = getMessagePositionOnAttack(ballPos, team, status);
    return {
      x: msgAttackPos.x ?? 200,
      y: msgAttackPos.y ?? 75,
    };
  }
  if (isPossession(ballPos, team, status)) {
    let msgPossessionPos = getMessagePositionOnPossession(ballPos, team);
    return {
      x: msgPossessionPos.x ?? 200,
      y: msgPossessionPos.y ?? 75,
    };
  }
  return {
    x: 200,
    y: 75,
  };
}

//fix ball pos

function getFixedBallPos(
  ballPos: { x: number; y: number },
  team: number,
  status: string
): { x: number; y: number } | null {
  return ballPos;
}

function isPossession(
  ballPos: { x: number; y: number },
  team: number,
  status: string
): boolean {
  return (
    status == "On Possession" &&
    team > 0 &&
    ((team == 1 && (!ballPos || ballPos.x <= FIELD_WIDTH / 2)) ||
      (team == 2 && (!ballPos || ballPos.x >= FIELD_WIDTH / 2)))
  );
}

function isDangerousAttack(
  ballPos: { x: number; y: number },
  team: number,
  status: string
): boolean {
  return (
    status == "On Possession" &&
    team > 0 &&
    ((team == 1 && ballPos && ballPos.x >= (FIELD_WIDTH * 3) / 4) ||
      (team == 2 && ballPos && ballPos.x <= FIELD_WIDTH / 4))
  );
}

function isAttack(
  ballPos: { x: number; y: number },
  team: number,
  status: string
): boolean {
  return (
    status == "On Possession" &&
    team > 0 &&
    !isPossession(ballPos, team, status) &&
    !isDangerousAttack(ballPos, team, status)
  );
}

const HockeyPitch: React.FC<HockeyPitchInterface> = ({ data }) => {
  // console.log(">>>>hockey>>>", data);
  //Match Time
  const initialSeconds = data?.info?.seconds || "00:00";

  const [isTimerPaused, setTimerPaused] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(
    convertToSeconds(initialSeconds)
  );

  const kitColors = getKitColors(data);

  const displayTime = isNaN(totalSeconds) ? "00:00" : formatTime(totalSeconds);

  if (data?.core?.stopped === "1" && isTimerPaused == false) {
    setTimerPaused(true);
    setTotalSeconds(convertToSeconds(data?.info?.seconds));
  }
  if (data?.core?.stopped === "0" && isTimerPaused == true) {
    setTotalSeconds(convertToSeconds(data?.info?.seconds));
    setTimerPaused(false);
  }

  useEffect(() => {
    let timerInterval: NodeJS.Timer | undefined;

    if (!isTimerPaused) {
      timerInterval = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => prevTotalSeconds - 1);
      }, 1000); // Increase by 1 second (1000 milliseconds)
    } else {
      clearInterval(timerInterval); // Pause the timer
    }

    return () => {
      clearInterval(timerInterval); // Clean up the interval on component unmount
    };
  }, [isTimerPaused]);

  if (!data) {
    return null;
  }

  const prevBallPos = localStorage.getItem("ball_pos");
  const prevCode = Number(localStorage.getItem("code")) ?? 0;
  const curCode = data?.info.state;
  const ballTrack = JSON.parse(localStorage.getItem("ball_track") ?? "[]");
  const isAnimating = data?.info.ball_pos && data?.info.ball_pos != prevBallPos;
  const teamMessage = getTeamMessage(curCode);

  const status = getState(curCode);

  if (
    isShowTrailFromCode(curCode) &&
    data?.info?.ball_pos &&
    data?.info?.ball_pos != prevBallPos
  ) {
    ballTrack.push(data.info.ball_pos);
    if (ballTrack.length > 2) {
      ballTrack.shift();
    }
    localStorage.setItem("ball_pos", data?.info.ball_pos);
    localStorage.setItem("ball_track", JSON.stringify(ballTrack));
  }
  if (isClearTrail(prevCode, curCode)) {
    localStorage.removeItem("ball_track");
  }
  localStorage.setItem("code", data?.info.state);
  let ballPos = getBallPosition(data);
  let lastBallPos = getBallPosition(prevBallPos);
  if (!ballPos && lastBallPos) ballPos = lastBallPos;
  // ballPos = getFixedBallPos(ballPos, status.team, status.status);
  const msgPos = getMessagePosition(ballPos, status.team, status.status);

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
        {/* Live-Pitch */}
        <div className="max-w-[440px] mx-auto my-0 px-5 py-2.5">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 400 180"
          >
            <defs>
              <linearGradient id="ml1-Gradient1">
                <stop
                  className="gradStart"
                  offset="17.7%"
                  style={{ stopOpacity: 0.4, stopColor: "rgb(99, 130, 187)" }}
                ></stop>
                <stop
                  className="gradEnd"
                  offset="100%"
                  style={{ stopOpacity: 0.4, stopColor: "rgb(99, 130, 187)" }}
                ></stop>
              </linearGradient>
              <linearGradient id="ml1-Gradient11">
                <stop
                  className="gradStart"
                  offset="0%"
                  style={{ stopOpacity: 0.4, stopColor: "rgb(99, 130, 187)" }}
                ></stop>
                <stop
                  className="gradEnd"
                  offset="82.3%"
                  style={{ stopOpacity: 0.4, stopColor: "rgb(99, 130, 187)" }}
                ></stop>
              </linearGradient>
              <linearGradient id="ml1-Gradient2">
                <stop
                  className="gradStart"
                  offset="0%"
                  style={{ stopOpacity: 0.4, stopColor: "rgb(79, 41, 26)" }}
                ></stop>
                <stop
                  className="gradEnd"
                  offset="42.4%"
                  style={{ stopOpacity: 0.4, stopColor: "rgb(99, 130, 187)" }}
                ></stop>
              </linearGradient>
              <linearGradient id="ml1-Gradient21">
                <stop
                  className="gradStart"
                  offset="57.6%"
                  style={{ stopOpacity: 0.4, stopColor: "rgb(99, 130, 187)" }}
                ></stop>
                <stop
                  className="gradEnd"
                  offset="100%"
                  style={{ stopOpacity: 0.4, stopColor: "rgb(79, 41, 26)" }}
                ></stop>
              </linearGradient>
              <linearGradient id="ml1-SolidTeamColour">
                <stop
                  id="ml1-SolidTeam1"
                  offset="0%"
                  stopColor="#FFDF1B"
                ></stop>
                <stop
                  id="ml1-SolidTeam2"
                  offset="100%"
                  stopColor="#FFDF1B"
                ></stop>
              </linearGradient>
              <animate
                id="SVGIRIS_PITCH_XY_COL_ANIM1"
                xlinkHref="#SVGIRIS_PITCH_XY_COL"
                attributeName="r"
                from="6"
                to="4"
                dur="4s"
                values="6;6;4;6;6"
                keyTimes="0;0.4;0.5;0.6;1"
                repeatCount="indefinite"
              ></animate>
              <animate
                id="SVGIRIS_PITCH_XY_FX_ANIM1"
                xlinkHref="#SVGIRIS_PITCH_XY_FX"
                attributeName="r"
                from="2"
                to="16"
                dur="1s"
                values="2;16;16"
                keyTimes="0;0.3;1"
                repeatCount="indefinite"
              ></animate>
              <animate
                id="SVGIRIS_PITCH_XY_FX_ANIM2"
                xlinkHref="#SVGIRIS_PITCH_XY_FX"
                attributeName="opacity"
                from="1"
                to="0"
                dur="2s"
                values="1;0;0"
                keyTimes="0;0.2;1"
                repeatCount="indefinite"
              ></animate>
            </defs>
            <g id="bg" fill="none" fillRule="evenodd">
              <rect
                stroke="#COD2FF"
                fill="#F3FBFF"
                x="0.5"
                y="0.5"
                width="399"
                height="179"
                rx="30"
              ></rect>
              <circle
                fill="#F7ABAB"
                opacity="0"
                cx="74"
                cy="45"
                r="31"
              ></circle>
              <circle
                fill="#F7ABAB"
                opacity="0"
                cx="74"
                cy="135"
                r="31"
              ></circle>
              <circle
                fill="#F7ABAB"
                opacity="0"
                cx="166.5"
                cy="44.5"
                r="6.5"
              ></circle>
              <circle
                fill="#F7ABAB"
                opacity="0"
                cx="166.5"
                cy="134.5"
                r="6.5"
              ></circle>
              <circle
                fill="#F7ABAB"
                opacity="0"
                cx="200"
                cy="90"
                r="31"
              ></circle>
              <circle
                fill="#F7ABAB"
                opacity="0"
                cx="232.5"
                cy="44.5"
                r="6.5"
              ></circle>
              <circle
                fill="#F7ABAB"
                opacity="0"
                cx="232.5"
                cy="134.5"
                r="6.5"
              ></circle>
              <circle
                fill="#F7ABAB"
                opacity="0"
                cx="328"
                cy="45"
                r="31"
              ></circle>
              <circle
                fill="#F7ABAB"
                opacity="0"
                cx="328"
                cy="135"
                r="31"
              ></circle>
              <g transform="translate(153, 1)" fill="#7494FF" opacity="0.4">
                <rect x="0" y="0" width="2" height="178"></rect>
                <rect x="92" y="0" width="2" height="178"></rect>
              </g>
              <g opacity="1" transform="translate(199, 1)">
                <rect fill="#F1D5D5" y="151" width="2" height="7"></rect>
                <rect fill="#F1D5D5" y="166" width="2" height="7"></rect>
                <rect fill="#F1D5D5" y="136" width="2" height="7"></rect>
                <rect fill="#F1D5D5" y="121" width="2" height="7"></rect>
                <rect fill="#F1D5D5" y="106" width="2" height="7"></rect>
                <rect fill="#F1D5D5" y="91" width="2" height="7"></rect>
                <rect fill="#F1D5D5" y="64" width="2" height="7"></rect>
                <rect fill="#F1D5D5" y="49" width="2" height="7"></rect>
                <rect fill="#F1D5D5" y="34" width="2" height="7"></rect>
                <rect fill="#F1D5D5" y="19" width="2" height="7"></rect>
                <rect fill="#F1D5D5" y="4" width="2" height="7"></rect>
                <rect
                  opacity="0.75"
                  fill="#DC94A3"
                  x="0"
                  y="0"
                  width="2"
                  height="178"
                ></rect>
              </g>
              <g transform="translate(169, 59)">
                <g opacity="0.4">
                  <circle stroke="#1C40FE" cx="31" cy="31" r="31"></circle>
                  <circle fill="#D55468" cx="31" cy="31" r="2.5"></circle>
                </g>
              </g>
              <path
                d="M24,2 L26,1.4 L26,178.6 L24,178 L24,2 Z"
                fill="#F1D5D5"
              ></path>
              <g transform="translate(16, 1)">
                <path
                  id="ml17-Penalty_Team2Goal"
                  d="M9,83 L9,81 L3,81 C1.3,81 0,82 0,84 L0,94 C0,95.7 1,97 3,97 L9,97 L9,95 L3,95 C2.5,95 2,95 2,94 L2,84 C2,83.4 2.5,83 3,83 L9,83 Z"
                  fill="#F0D4D4"
                ></path>
                <path
                  id="ml17-Penalty_Team2Area"
                  d="M10,102 C16.6,102 22,96 22,89 C22,81.8 16.6,76 10,76 C10,76 10,102 10,102 L10,102 Z"
                  fill="#CDDCFE"
                ></path>
                <path
                  id="ml17-Penalty_Team2AreaBorder"
                  d="M23.6,89 C23.6,80.7 17,74 9,74 C9,74 9,104 9,104 C17,104 23.6,97.3 23.6,89 Z M11,101 C15,101 21,95.6 21,89 C21,82.4 15,77 11,77 L11,101 Z"
                  fill="#F0D4D4"
                ></path>
              </g>
              <path
                d="M374,1 L376,2 L376,178 L374,179 L374,1 Z"
                fill="#F0D4D4"
              ></path>
              <g transform="translate(385, 1) scale(-1,1)">
                <path
                  id="ml17-Penalty_Team1Goal"
                  d="M9,83 L9,81 L3,81 C1.3,81 0,82 0,84 L0,94 C0,95.7 1,97 3,97 L9,97 L9,95 L3,95 C2.5,95 2,95 2,94 L2,84 C2,83.4 2.5,83 3,83 L9,83 Z"
                  fill="#F0D4D4"
                ></path>
                <path
                  id="ml17-Penalty_Team1Area"
                  d="M10,102 C16.6,102 22,96 22,89 C22,81.8 16.6,76 10,76 C10,76 10,102 10,102 L10,102 Z"
                  fill="#CDDCFE"
                ></path>
                <path
                  id="ml17-Penalty_Team1AreaBorder"
                  d="M23.6,89 C23.6,80.7 17,74 9,74 C9,74 9,104 9,104 C17,104 23.6,97.3 23.6,89 Z M11,101 C15,101 21,95.6 21,89 C21,82.4 15,77 11,77 L11,101 Z"
                  fill="#F0D4D4"
                ></path>
              </g>
              <g transform="translate(43, 9)">
                <g opacity="0.4">
                  <rect
                    fill="#D55468"
                    x="27"
                    y="24"
                    width="1"
                    height="7"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="27"
                    y="40"
                    width="1"
                    height="7"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="24"
                    width="1"
                    height="7"
                  ></rect>
                  <rect fill="#D55468" x="27" y="0" width="1" height="5"></rect>
                  <rect fill="#D55468" x="35" y="0" width="1" height="5"></rect>
                  <rect
                    fill="#D55468"
                    x="27"
                    y="67"
                    width="1"
                    height="5"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="67"
                    width="1"
                    height="5"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="31"
                    width="7"
                    height="1"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="21"
                    y="31"
                    width="7"
                    height="1"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="39"
                    width="7"
                    height="1"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="21"
                    y="39"
                    width="7"
                    height="1"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="40"
                    width="1"
                    height="7"
                  ></rect>
                  <circle fill="#D55468" cx="31.5" cy="36" r="2.5"></circle>
                  <circle stroke="#D55468" cx="31.5" cy="36" r="31"></circle>
                </g>
              </g>
              <g transform="translate(43, 99)">
                <g opacity="0.4">
                  <rect
                    fill="#D55468"
                    x="27"
                    y="24"
                    width="1"
                    height="7"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="27"
                    y="40"
                    width="1"
                    height="7"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="24"
                    width="1"
                    height="7"
                  ></rect>
                  <rect fill="#D55468" x="27" y="0" width="1" height="5"></rect>
                  <rect fill="#D55468" x="35" y="0" width="1" height="5"></rect>
                  <rect
                    fill="#D55468"
                    x="27"
                    y="67"
                    width="1"
                    height="5"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="67"
                    width="1"
                    height="5"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="31"
                    width="7"
                    height="1"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="21"
                    y="31"
                    width="7"
                    height="1"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="39"
                    width="7"
                    height="1"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="21"
                    y="39"
                    width="7"
                    height="1"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="40"
                    width="1"
                    height="7"
                  ></rect>
                  <circle fill="#D55468" cx="31.5" cy="36" r="2.5"></circle>
                  <circle stroke="#D55468" cx="31.5" cy="36" r="31"></circle>
                </g>
              </g>
              <g transform="translate(297, 9)">
                <g opacity="0.4">
                  <rect
                    fill="#D55468"
                    x="27"
                    y="24"
                    width="1"
                    height="7"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="27"
                    y="40"
                    width="1"
                    height="7"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="24"
                    width="1"
                    height="7"
                  ></rect>
                  <rect fill="#D55468" x="27" y="0" width="1" height="5"></rect>
                  <rect fill="#D55468" x="35" y="0" width="1" height="5"></rect>
                  <rect
                    fill="#D55468"
                    x="27"
                    y="67"
                    width="1"
                    height="5"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="67"
                    width="1"
                    height="5"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="31"
                    width="7"
                    height="1"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="21"
                    y="31"
                    width="7"
                    height="1"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="39"
                    width="7"
                    height="1"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="21"
                    y="39"
                    width="7"
                    height="1"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="40"
                    width="1"
                    height="7"
                  ></rect>
                  <circle fill="#D55468" cx="31.5" cy="36" r="2.5"></circle>
                  <circle stroke="#D55468" cx="31.5" cy="36" r="31"></circle>
                </g>
              </g>
              <g transform="translate(297, 99)">
                <g opacity="0.4">
                  <rect
                    fill="#D55468"
                    x="27"
                    y="24"
                    width="1"
                    height="7"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="27"
                    y="40"
                    width="1"
                    height="7"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="24"
                    width="1"
                    height="7"
                  ></rect>
                  <rect fill="#D55468" x="27" y="0" width="1" height="5"></rect>
                  <rect fill="#D55468" x="35" y="0" width="1" height="5"></rect>
                  <rect
                    fill="#D55468"
                    x="27"
                    y="67"
                    width="1"
                    height="5"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="67"
                    width="1"
                    height="5"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="31"
                    width="7"
                    height="1"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="21"
                    y="31"
                    width="7"
                    height="1"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="39"
                    width="7"
                    height="1"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="21"
                    y="39"
                    width="7"
                    height="1"
                  ></rect>
                  <rect
                    fill="#D55468"
                    x="35"
                    y="40"
                    width="1"
                    height="7"
                  ></rect>
                  <circle fill="#D55468" cx="31.5" cy="36" r="2.5"></circle>
                  <circle stroke="#D55468" cx="31.5" cy="36" r="31"></circle>
                </g>
              </g>
              <g transform="translate(3.997767, 71.000000)">
                <g stroke="#D55468" strokeWidth="2" opacity="0">
                  <ellipse
                    cx="18.9893914"
                    cy="19"
                    rx="14.9916248"
                    ry="15"
                  ></ellipse>
                  <path
                    d="M18.9893914,38 C29.4769427,38 37.9787828,29.4934102 37.9787828,19 C37.9787828,8.50658975 29.4769427,0 18.9893914,0 C8.50184012,0 0,8.50658975 0,19 C0,29.4934102 8.50184012,38 18.9893914,38 Z"
                    opacity="0.400000006"
                  ></path>
                </g>
              </g>
              <g transform="translate(3.997767, 71.000000)">
                <g stroke="#8F99CC" strokeWidth="2" opacity="0">
                  <ellipse
                    cx="18.9893914"
                    cy="19"
                    rx="14.9916248"
                    ry="15"
                  ></ellipse>
                  <path
                    d="M18.9893914,38 C29.4769427,38 37.9787828,29.4934102 37.9787828,19 C37.9787828,8.50658975 29.4769427,0 18.9893914,0 C8.50184012,0 0,8.50658975 0,19 C0,29.4934102 8.50184012,38 18.9893914,38 Z"
                    opacity="0.400000006"
                  ></path>
                </g>
              </g>
              <g transform="translate(357.800112, 71.000000)">
                <g stroke="#D55468" strokeWidth="2" opacity="0">
                  <ellipse
                    cx="18.9893914"
                    cy="19"
                    rx="14.9916248"
                    ry="15"
                  ></ellipse>
                  <path
                    d="M18.9893914,38 C29.4769427,38 37.9787828,29.4934102 37.9787828,19 C37.9787828,8.50658975 29.4769427,0 18.9893914,0 C8.50184012,0 0,8.50658975 0,19 C0,29.4934102 8.50184012,38 18.9893914,38 Z"
                    opacity="0.400000006"
                  ></path>
                </g>
              </g>
              <g transform="translate(357.800112, 71.000000)">
                <g stroke="#8F99CC" strokeWidth="2" opacity="0">
                  <ellipse
                    cx="18.9893914"
                    cy="19"
                    rx="14.9916248"
                    ry="15"
                  ></ellipse>
                  <path
                    d="M18.9893914,38 C29.4769427,38 37.9787828,29.4934102 37.9787828,19 C37.9787828,8.50658975 29.4769427,0 18.9893914,0 C8.50184012,0 0,8.50658975 0,19 C0,29.4934102 8.50184012,38 18.9893914,38 Z"
                    opacity="0.400000006"
                  ></path>
                </g>
              </g>
              <circle
                fill="#D55468"
                opacity="0.4"
                cx="166.5"
                cy="44.5"
                r="2.5"
              ></circle>
              <circle
                fill="#D55468"
                opacity="0.4"
                cx="166.5"
                cy="134.5"
                r="2.5"
              ></circle>
              <circle
                fill="#D55468"
                opacity="0.4"
                cx="232.5"
                cy="44.5"
                r="2.5"
              ></circle>
              <circle
                fill="#D55468"
                opacity="0.4"
                cx="232.5"
                cy="134.5"
                r="2.5"
              ></circle>
            </g>
            {status?.team == 1 &&
              isDangerousAttack(ballPos, status.team, status.status) && (
                <g
                  id="SVGIRIS_PITCH_FX_DNGR_0"
                  className="transition-transform duration-500"
                  transform={`matrix(1,0,0,1,${
                    (Math.min((ballPos?.x ?? 320) - 380), -5)
                  },0)`}
                >
                  <polygon
                    id="SvgjsPolygon3649"
                    points="388,0 400,30 388,60 400,90 388,120 400,150 388,180 0,180 0,0"
                    fill="url(#ml1-Gradient21)"
                  ></polygon>
                </g>
              )}
            {status?.team == 2 &&
              isDangerousAttack(ballPos, status.team, status.status) && (
                <g
                  id="SVGIRIS_PITCH_FX_DNGR_1"
                  transform={`matrix(1,0,0,1,${Math.max(
                    (ballPos?.x ?? 80) - 10,
                    5
                  )},0)`}
                >
                  <polygon
                    id="SvgjsPolygon2003"
                    points="12,0 0,30 12,60 0,90 12,120 0,150 12,180 400,180 400,0"
                    fill="url(#ml1-Gradient2)"
                  ></polygon>
                </g>
              )}

            {status?.team == 1 &&
              isAttack(ballPos, status.team, status.status) && (
                <g
                  id="SVGIRIS_PITCH_FX_ATTK_0"
                  className="transition-transform duration-500"
                  transform={`matrix(1,0,0,1,${(ballPos?.x ?? 190) - 380},0)`}
                >
                  <polygon
                    id="SvgjsPolygon2060"
                    points="388,0 400,30 388,60 400,90 388,120 400,150 388,180 0,180 0,0"
                    fill="url(#ml1-Gradient11)"
                  ></polygon>
                </g>
              )}
            {status?.team == 2 &&
              isDangerousAttack(ballPos, status.team, status.status) && (
                <g
                  id="SVGIRIS_PITCH_FX_ATTK_1"
                  className={
                    "transition-transform duration-500" + status?.status ==
                    "Goal "
                      ? " goal"
                      : ""
                  }
                  transform={`matrix(1,0,0,1,${(ballPos?.x ?? 190) - 10},0)`}
                >
                  <polygon
                    id="SvgjsPolygon1224"
                    points="12,0 0,30 12,60 0,90 12,120 0,150 12,180 400,180 400,0"
                    fill="url(#ml1-Gradient1)"
                  ></polygon>
                </g>
              )}
            {status?.team == 2 &&
              isPossession(ballPos, status.team, status.status) && (
                <g id="away_safe">
                  <rect
                    x="200"
                    y="0"
                    fill="rgb(99, 130, 187)"
                    fillOpacity="0.4"
                    width="200"
                    height="180"
                  ></rect>
                </g>
              )}
            {status?.team == 1 &&
              isPossession(ballPos, status.team, status.status) && (
                <g id="home_safe">
                  <rect
                    x="0"
                    y="0"
                    fill="rgb(99, 130, 187)"
                    fillOpacity="0.4"
                    width="200"
                    height="180"
                  ></rect>
                </g>
              )}
            {teamMessage && teamMessage.team == "Global" && (
              <g
                className="transition-transform duration-500"
                transform={`translate(${msgPos?.x},${msgPos?.y})`}
              >
                {/* <rect id="home_bg" x="-2.5" y="0" fill="#f0f0f0" width="2.5" height="30"></rect> */}
                {/* <text id="home_team" transform="translate(-10 10)" textAnchor="end" fill="#12e096" fontSize="13px">{data?.team_info?.home.name}</text> */}
                <text
                  y="0"
                  textAnchor="middle"
                  fill="rgb(83, 123, 163)"
                  fontWeight="bold"
                  fontSize="15px"
                >
                  {data?.info?.state_info ?? teamMessage.message}
                </text>
              </g>
            )}
            {teamMessage && teamMessage.team == "Home Team" && (
              <g
                id="home"
                opacity={status?.status == "Goal" ? 0 : 1}
                className={
                  status?.status == "Goal"
                    ? hockeyAnimation.goal
                    : "transition-transform duration-500"
                }
                transform={`translate(${msgPos?.x},${msgPos?.y})`}
              >
                <rect
                  id="home_bg"
                  x="-2.5"
                  y="0"
                  fill={kitColors.home}
                  width="2.5"
                  height="30"
                ></rect>
                <text
                  id="home_team"
                  transform="translate(-10 10)"
                  textAnchor="end"
                  fill="#000000"
                  fontSize="15px"
                >
                  {data?.team_info?.home.name}
                </text>
                <text
                  id="home_action"
                  transform="translate(-10 28)"
                  textAnchor="end"
                  fill="rgb(83, 123, 163)"
                  fontWeight="bold"
                  fontSize="15px"
                >
                  {teamMessage?.message}
                </text>
              </g>
            )}
            {teamMessage && teamMessage.team == "Away Team" && (
              <g
                id="away"
                opacity={status?.status == "Goal" ? 0 : 1}
                className={
                  status?.status == "Goal"
                    ? hockeyAnimation.goal
                    : "transition-transform duration-500"
                }
                transform={`translate(${msgPos?.x},${msgPos?.y})`}
              >
                <rect
                  id="away_bg"
                  x="0"
                  y="0"
                  fill={kitColors.away}
                  width="2.5"
                  height="30"
                ></rect>
                <text
                  id="away_team"
                  transform="translate(10 10)"
                  fill="#000000"
                  fontSize="15px"
                >
                  {data?.team_info?.away.name}
                </text>
                <text
                  id="away_action"
                  transform="translate(10 28)"
                  fill="rgb(83, 123, 163)"
                  fontWeight="bold"
                  fontSize="15px"
                >
                  {teamMessage?.message}
                </text>
              </g>
            )}
            {status?.team == 1 && status?.status == "Goal Kick" && (
              <g
                id="goal_kick"
                transform={`matrix(1,0,0,1,${ballPos?.x ?? 20}, ${
                  ballPos?.y ?? 100
                })`}
              >
                <path
                  id="goal_kick_3"
                  className={hockeyAnimation.kick2}
                  fill="#165031"
                  fillOpacity="0.3"
                  d="M94.703,73.698C110.554,53.359,120,27.784,120,0c0-27.764-9.433-53.321-25.262-73.653L0,0.036L94.703,73.698z"
                ></path>
                <path
                  id="goal_kick_2"
                  className={hockeyAnimation.kick1}
                  fill="#165031"
                  fillOpacity="0.5"
                  d="M62.325,48.514C72.765,35.123,79,18.294,79,0c0-18.274-6.222-35.085-16.639-48.469L0,0.036L62.325,48.514z"
                ></path>
                <path
                  id="goal_kick_1"
                  className={hockeyAnimation.kick0}
                  fill="#165031"
                  fillOpacity="0.7"
                  d="M30.759,23.961C35.918,17.349,39,9.037,39,0c0-9.017-3.068-17.311-8.205-23.917L0,0.036L30.759,23.961z"
                ></path>
                <circle fill="#000000" r="4" cx="0" cy="0"></circle>
              </g>
            )}
            {status?.team == 2 && status?.status == "Goal Kick" && (
              <g
                id="SVGIRIS_PITCH_FX_GKIK"
                transform={`matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,${
                  ballPos?.x ?? 382
                },${ballPos?.y ?? 68})`}
                opacity="1"
              >
                <path
                  id="SvgjsPath1067"
                  fillOpacity="0.3"
                  className={hockeyAnimation.kick2}
                  fill="#165031"
                  d="M94.703,73.698C110.554,53.359,120,27.784,120,0c0-27.764-9.433-53.321-25.262-73.653L0,0.036L94.703,73.698z"
                  style={{ opacity: 0.3 }}
                  transform="matrix(1.0000000000000004,0,0,1.0000000000000004,0,1.0408340855860843e-17)"
                  opacity="0.3"
                ></path>
                <path
                  id="SvgjsPath1065"
                  fillOpacity="0.5"
                  className={hockeyAnimation.kick1}
                  fill="#165031"
                  d="M62.325,48.514C72.765,35.123,79,18.294,79,0c0-18.274-6.222-35.085-16.639-48.469L0,0.036L62.325,48.514z"
                  transform="matrix(1.0000000000000004,0,0,1.0000000000000004,0,1.0408340855860843e-17)"
                  opacity="0.3"
                ></path>
                <path
                  id="SvgjsPath1063"
                  fillOpacity="0.7"
                  className={hockeyAnimation.kick0}
                  fill="#165031"
                  d="M30.759,23.961C35.918,17.349,39,9.037,39,0c0-9.017-3.068-17.311-8.205-23.917L0,0.036L30.759,23.961z"
                  transform="matrix(1.0000000000000004,0,0,1.0000000000000004,0,0)"
                  opacity="0.8"
                ></path>
                <circle fill="#FFFFFF" r="4" cx="0" cy="0"></circle>
              </g>
            )}
            {status?.team == 1 && status?.status == "Goal" && (
              <g
                id="goal"
                opacity="0"
                className={hockeyAnimation.goal}
                transform={`matrix(1,0,0,1,210,65)`}
              >
                <g id="goal_boll">
                  <path
                    d="M13.47,34.77a11.39,11.39,0,0,0,11-11.62,11.39,11.39,0,0,0-11-11.62A11.7,11.7,0,0,0,1.39,22.86a2.81,2.81,0,0,0,0,.29,11.72,11.72,0,0,0,11.8,11.63Z"
                    fill="#f8f8f8"
                    stroke="#525252"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.32"
                  ></path>
                  <path
                    d="M16.57,12.61l-2,2-.93.93M22,21.76a16.61,16.61,0,0,0-3.1-2.17A14.87,14.87,0,0,0,15,18.5m-3.88,2.33a11.4,11.4,0,0,0,0,3.4l1.09,3.41m3.87,2.17A6.51,6.51,0,0,0,20,28.73a8.43,8.43,0,0,0,2.48-2.95M2.62,22.22a5.67,5.67,0,0,1,2.17-2.48A9.85,9.85,0,0,1,8.28,18.5m-2-4.8c1.71-.47,3.26,2.17,3.26,2.17m-6,10.53A6.64,6.64,0,0,0,6,29,10.94,10.94,0,0,0,9.36,30m5.12,2.94.77,1.86m-4.18-2-.78,2"
                    fill="none"
                    stroke="gray"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.42"
                  ></path>
                  <path
                    d="M15.48,18.66l-4,2.94-4-2.94,1.71-4h5Zm-.31,15,1.4-4-4-2.95-4,2.95,1.7,4ZM1.54,21.45H3.4l.92,5.88L2.78,28.88a6,6,0,0,1-1.24-3.41A15,15,0,0,1,1.54,21.45Zm22-2.48-3.1,2.48.93,5.26,2.79-.77a10.72,10.72,0,0,0,.16-3.87A13.55,13.55,0,0,0,23.54,19ZM15.48,13.7l4-.62a7.71,7.71,0,0,0-1.94-.93,7.27,7.27,0,0,0-2-.47Z"
                    fill="#1a1a1a"
                  ></path>
                </g>
                <g id="goal_gate">
                  <path
                    d="M1.79.3s11,5,17.36,7.9,9.76,5,13.64,7c3.41,1.7,7,2.32,6.82,7S38.52,27.42,36,29.74A47.88,47.88,0,0,1,25.5,37c-3.41,1.86-7,7-7,7"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M21.79,9.75a95.28,95.28,0,0,0-9-3.25,71.08,71.08,0,0,1-11-4.19"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M8,3.24s1.09,2.17.62,2.33S6,4.17,5.36,3.24a1.76,1.76,0,0,1-.47-1.7"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M3.65,3.4l.93,3.1"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M1.64,5.41,11.56,9.6"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M8.77,5.57c0-.47,1.55,3.25,3.72,4.8s6.66,4.19,6.66,4.19l3.25,4.8,6.36,1.55,4.49-2.79s6.82-.15,6.51,2.95S34,27.26,32.32,28.35a19.7,19.7,0,0,0-6.82,8.52"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M33.41,32.38l-.31-4L27.83,27l-6.51,2.79-3.25,5.43a17.7,17.7,0,0,0-5.74,3.41c-2.79,2.48-5.42,5-5.42,5"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M33.72,18.12a69.43,69.43,0,0,1-6.67-2.63l-3.41-1.55a14.87,14.87,0,0,1-4.33-2.33c-1.24-1.24-3.57-3.87-3.57-3.87"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M16.67,8.67l4.19,9.14,3.4-3.87S20.08,9.29,21,9.29s12.55,8.83,12.55,8.83"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M11.71,6.65l2.95,5"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M28.45,20.91a14.47,14.47,0,0,1,.15,2.79A17.58,17.58,0,0,1,27.52,28"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M26.9,33.46l-5.27,2.79s-.15,1.4-2.48,2.64l-4.8,3.87H13.11l3.1-4.18a37,37,0,0,1,3.72-2.48l3.25-4.81,6.2-1.08A30.36,30.36,0,0,1,27.83,27"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M20.24,38h-2"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M27.36,33l-5-.16"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M28.45,24s-1.86.31-5,.77a20.08,20.08,0,0,1-5.42-.15l-3.41-5.11L12.8,18.43c-.16,0-2.17-.31-2.17-.31L5.82,12.7,1.64,8.05l.62-.78,7.9,4.81a15.3,15.3,0,0,1,3.1,2.32A11.6,11.6,0,0,1,15,16.57l4.49.78,3.41,2.17-4.49,2.32-3.26-.77-5.27,2L8.77,20.76H5.67l-4.19-5L5.2,11.92"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M10.47,17.66l-2,2.94"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M1.48,15.49l2.33,7.28,2.94,5.89H10l1.86-2.33,3.25.47,3-2.64.31-2.63"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M7.22,29.59l1.86-6.05,2.17,3.57"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M5.36,20.6,3.65,22.92l-2.32.62"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M.24,33l2.48-.31,1.71,5.89h2l4-3.26s3.41-.62,4.65-2.17l5.43-2.79.15-4.65-9,5.89L4.43,38.27,7.68,29"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M7.37,28.66l-5.11,5"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M1,41.68l4-4"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M.09,40.59l4,1.09"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M2,43.69,7.37,37.8l5.74.31"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M12.18,38.73l3.1-6.2,1.08-4.18-1.7-1.71"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M10,42.76l3.87-4,1.24-2"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M14.19,38.89l3,.15"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M17.29,35.94l4,1.09"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M20.39,29.9l2.94,2"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M12.33,26.8l.93,7.13"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M11.4,26.64,7.22,32.53l2.94,3.1"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M17.45,24.78v2.95"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M14.5,19.67l.62-2.94"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M12.49,18.74l-1.86-6L4.89,11.61l-4.34.31"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M4.58,11.46l1.09-2,4-.77"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M22.25,35.94l-1.86,5-4.34-.15,5.12-3.88"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M35.58,26.18c1.7.46.62,2,.62,3.1"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M14.19,38.89l4,1.08"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                </g>
              </g>
            )}
            {status?.team == 2 && status?.status == "Goal" && (
              <g
                id="goal"
                opacity="0"
                className={hockeyAnimation.goal}
                transform={`matrix(-1,0,0,-1,190,110)`}
              >
                <g id="goal_boll">
                  <path
                    d="M13.47,34.77a11.39,11.39,0,0,0,11-11.62,11.39,11.39,0,0,0-11-11.62A11.7,11.7,0,0,0,1.39,22.86a2.81,2.81,0,0,0,0,.29,11.72,11.72,0,0,0,11.8,11.63Z"
                    fill="#f8f8f8"
                    stroke="#525252"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.32"
                  ></path>
                  <path
                    d="M16.57,12.61l-2,2-.93.93M22,21.76a16.61,16.61,0,0,0-3.1-2.17A14.87,14.87,0,0,0,15,18.5m-3.88,2.33a11.4,11.4,0,0,0,0,3.4l1.09,3.41m3.87,2.17A6.51,6.51,0,0,0,20,28.73a8.43,8.43,0,0,0,2.48-2.95M2.62,22.22a5.67,5.67,0,0,1,2.17-2.48A9.85,9.85,0,0,1,8.28,18.5m-2-4.8c1.71-.47,3.26,2.17,3.26,2.17m-6,10.53A6.64,6.64,0,0,0,6,29,10.94,10.94,0,0,0,9.36,30m5.12,2.94.77,1.86m-4.18-2-.78,2"
                    fill="none"
                    stroke="gray"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.42"
                  ></path>
                  <path
                    d="M15.48,18.66l-4,2.94-4-2.94,1.71-4h5Zm-.31,15,1.4-4-4-2.95-4,2.95,1.7,4ZM1.54,21.45H3.4l.92,5.88L2.78,28.88a6,6,0,0,1-1.24-3.41A15,15,0,0,1,1.54,21.45Zm22-2.48-3.1,2.48.93,5.26,2.79-.77a10.72,10.72,0,0,0,.16-3.87A13.55,13.55,0,0,0,23.54,19ZM15.48,13.7l4-.62a7.71,7.71,0,0,0-1.94-.93,7.27,7.27,0,0,0-2-.47Z"
                    fill="#1a1a1a"
                  ></path>
                </g>
                <g id="goal_gate">
                  <path
                    d="M1.79.3s11,5,17.36,7.9,9.76,5,13.64,7c3.41,1.7,7,2.32,6.82,7S38.52,27.42,36,29.74A47.88,47.88,0,0,1,25.5,37c-3.41,1.86-7,7-7,7"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M21.79,9.75a95.28,95.28,0,0,0-9-3.25,71.08,71.08,0,0,1-11-4.19"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M8,3.24s1.09,2.17.62,2.33S6,4.17,5.36,3.24a1.76,1.76,0,0,1-.47-1.7"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M3.65,3.4l.93,3.1"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M1.64,5.41,11.56,9.6"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M8.77,5.57c0-.47,1.55,3.25,3.72,4.8s6.66,4.19,6.66,4.19l3.25,4.8,6.36,1.55,4.49-2.79s6.82-.15,6.51,2.95S34,27.26,32.32,28.35a19.7,19.7,0,0,0-6.82,8.52"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M33.41,32.38l-.31-4L27.83,27l-6.51,2.79-3.25,5.43a17.7,17.7,0,0,0-5.74,3.41c-2.79,2.48-5.42,5-5.42,5"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M33.72,18.12a69.43,69.43,0,0,1-6.67-2.63l-3.41-1.55a14.87,14.87,0,0,1-4.33-2.33c-1.24-1.24-3.57-3.87-3.57-3.87"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M16.67,8.67l4.19,9.14,3.4-3.87S20.08,9.29,21,9.29s12.55,8.83,12.55,8.83"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M11.71,6.65l2.95,5"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M28.45,20.91a14.47,14.47,0,0,1,.15,2.79A17.58,17.58,0,0,1,27.52,28"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M26.9,33.46l-5.27,2.79s-.15,1.4-2.48,2.64l-4.8,3.87H13.11l3.1-4.18a37,37,0,0,1,3.72-2.48l3.25-4.81,6.2-1.08A30.36,30.36,0,0,1,27.83,27"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M20.24,38h-2"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M27.36,33l-5-.16"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M28.45,24s-1.86.31-5,.77a20.08,20.08,0,0,1-5.42-.15l-3.41-5.11L12.8,18.43c-.16,0-2.17-.31-2.17-.31L5.82,12.7,1.64,8.05l.62-.78,7.9,4.81a15.3,15.3,0,0,1,3.1,2.32A11.6,11.6,0,0,1,15,16.57l4.49.78,3.41,2.17-4.49,2.32-3.26-.77-5.27,2L8.77,20.76H5.67l-4.19-5L5.2,11.92"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M10.47,17.66l-2,2.94"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M1.48,15.49l2.33,7.28,2.94,5.89H10l1.86-2.33,3.25.47,3-2.64.31-2.63"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M7.22,29.59l1.86-6.05,2.17,3.57"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M5.36,20.6,3.65,22.92l-2.32.62"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M.24,33l2.48-.31,1.71,5.89h2l4-3.26s3.41-.62,4.65-2.17l5.43-2.79.15-4.65-9,5.89L4.43,38.27,7.68,29"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M7.37,28.66l-5.11,5"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M1,41.68l4-4"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M.09,40.59l4,1.09"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M2,43.69,7.37,37.8l5.74.31"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M12.18,38.73l3.1-6.2,1.08-4.18-1.7-1.71"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M10,42.76l3.87-4,1.24-2"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M14.19,38.89l3,.15"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M17.29,35.94l4,1.09"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M20.39,29.9l2.94,2"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M12.33,26.8l.93,7.13"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M11.4,26.64,7.22,32.53l2.94,3.1"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M17.45,24.78v2.95"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M14.5,19.67l.62-2.94"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M12.49,18.74l-1.86-6L4.89,11.61l-4.34.31"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M4.58,11.46l1.09-2,4-.77"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M22.25,35.94l-1.86,5-4.34-.15,5.12-3.88"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M35.58,26.18c1.7.46.62,2,.62,3.1"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                  <path
                    d="M14.19,38.89l4,1.08"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="2.6"
                    strokeWidth="0.65"
                  ></path>
                </g>
              </g>
            )}
            {status?.team == 1 && status?.status == "Shot" && (
              <g id="shot" transform="matrix(1.5,0,0,1.5,70,-50)">
                <g id="shot_gate">
                  <path
                    d="M216.75,93.49l-8.84,9-24.29-9.59L192.71,89Z"
                    fill="#222"
                    fillOpacity="0.08"
                  ></path>
                  <path
                    d="M183.87,91l.25.27,1,1.1m-1.24-11.46.17-.18.33-.32m-.5,2.86.26-.26,1.36-1.36m-1.62,4,.26-.27,2.48-2.59m-3.24,5.6.26-.27,4.1-4.34m-4.47,7,5.59-5.59m-5,7,.27-.26,6-5.85m-5,6.23.29-.23,5.82-4.75m-1.62,3,.28-.25,2-1.74m-8,4.48.34-.15,5.64-2.47,3-1.12m-9.1-.12.27.26,2.47,2.48m-3-5.36.27.27L188.1,91m-4.61-6.94,5.86,6.31M183.74,82l.27.26,7.46,7.21m-8-10,9.22,9.5"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="10"
                    strokeWidth="0.25"
                  ></path>
                  <path
                    d="M211.15,81.4l-2.62,2.5m-1.12,11.21,4,4.11M207.54,93l5,5m-5-7.22,6.1,6.1m-6.1-8.47,7.1,7.23M207.91,86l8,8.1m-8.22-10.84,8,8.1M208,81.78l5.49,5.6m-5.11-7,1.08,1.11c1.3,1.33,2.9,3.25,2.9,3.25m-1.61-4.49s1.61,4.57,2.74,7c1,2.11,3.36,6.48,3.36,6.48M211.77,82.9l-3.24,3.24m3.74-1.5-3.74,3.74m4.36-2.24-4.36,4.48m4.86-2.86-5,5.23m6-3.86-6,6.1M208,97.72l7.1-7m-7,9.34,7.85-8m-7.85,10.34,8.72-9m-8.85,6.6,1.13,1.37m-1.37-3.86,2.49,2.74"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="10"
                    strokeWidth="0.25"
                  ></path>
                  <path
                    d="M192.71,89l15.08,3M192.46,79.16l-4.73,4.61m6.85-4.36L189,85m7.72-5.48L190,86.14m8.72-6.23-7.47,7.35M200.69,80,192,88.26m10.58-7.85-8.84,8.84m11-8.72-9.09,9M207,80.41l-9.47,9.47m11.34-9.1-9.6,9.47M208.16,84l-7.23,6.73m7.6-4.86s-3.77,3.56-5.35,5.11m5.1-2.37L205,91.49m3.24-1-1.37,1.24M196.57,79l.27.26L208.41,91m-9.47-11.84.26.28L208,89m-5.85-8.84.26.27,5.66,6m-3.8-6.11.27.26,3.59,3.36m-23.79-3.49,2.11-1.87m-1,3.11,3-2.86m2.24,0-4.11,4m-2.49-4.86.26.26L195.7,89.5M187,78.17l.26.27,10.58,11.44M189.6,78.79l.26.26,11.57,11.7m-9.59-12,.27.26,12.19,12.2M194.21,79l.26.26,12.44,12.57"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="10"
                    strokeWidth="0.25"
                  ></path>
                  <path
                    d="M183.12,77.42H184V92.87h-.87Zm24.54,3.24h1.12l-.62,21.92-1-.37Zm-24-3.24L208.54,80a.28.28,0,0,1,.24.27v.88l-25.16-2.87ZM208.53,80h1.93a.6.6,0,0,1,.55.43v.07l-2.86.38Z"
                    fill="#fff"
                  ></path>
                </g>
                <g id="shot_target">
                  <g>
                    <path
                      d="M191.51,87.3l-.63-.17a9,9,0,0,0,.46,2.3,9.88,9.88,0,0,0,1,2.1,8.76,8.76,0,0,0,1.45,1.73,6.55,6.55,0,0,0,1.8,1.19v-.86a5.55,5.55,0,0,1-1.55-1,7.27,7.27,0,0,1-1.25-1.49,7.68,7.68,0,0,1-.87-1.8A7.84,7.84,0,0,1,191.51,87.3Z"
                      fill="#b80000"
                    ></path>
                    <path
                      d="M191.51,87.3a7.84,7.84,0,0,0,.41,2,7.68,7.68,0,0,0,.87,1.8A7.27,7.27,0,0,0,194,92.57a5.55,5.55,0,0,0,1.55,1,5.55,5.55,0,0,1-1.55-1,7.27,7.27,0,0,1-1.25-1.49,7.68,7.68,0,0,1-.87-1.8A7.84,7.84,0,0,1,191.51,87.3Z"
                      fill="#fff"
                      opacity="0.51"
                    ></path>
                    <path
                      d="M195.59,94.45v1.93l.69.27v-8l-.71-.2v6Zm0-12.9a4,4,0,0,0-1.87.15,3.7,3.7,0,0,0-1.46,1,4.8,4.8,0,0,0-1,1.56,6.36,6.36,0,0,0-.4,2,6.36,6.36,0,0,1,.4-2,4.8,4.8,0,0,1,1-1.56,3.7,3.7,0,0,1,1.46-1A4,4,0,0,1,195.57,81.55Zm-4.06,4.85a5.23,5.23,0,0,1,.38-1.69,4,4,0,0,1,.85-1.3,3.06,3.06,0,0,1,1.25-.77,3.31,3.31,0,0,1,1.58-.11v-1a4,4,0,0,0-1.87.15,3.7,3.7,0,0,0-1.46,1,4.8,4.8,0,0,0-1,1.56,6.36,6.36,0,0,0-.4,2Zm4.06-3.87v4.94l.71.19V79.49l-.75-.14v3.18Z"
                      fill="#b80000"
                    ></path>
                    <path
                      d="M196.28,93.83a3.57,3.57,0,0,0,1.62,0,3.16,3.16,0,0,0,1.38-.69,3.85,3.85,0,0,0,1-1.38,5.6,5.6,0,0,0,.42-2,5.6,5.6,0,0,1-.42,2,3.85,3.85,0,0,1-1,1.38,3.16,3.16,0,0,1-1.38.69A3.57,3.57,0,0,1,196.28,93.83Z"
                      fill="#fff"
                      opacity="0.51"
                    ></path>
                    <path
                      d="M200.69,89.83a5.6,5.6,0,0,1-.42,2,3.85,3.85,0,0,1-1,1.38,3.16,3.16,0,0,1-1.38.69,3.57,3.57,0,0,1-1.62,0v.87a4.13,4.13,0,0,0,1.9.1,3.64,3.64,0,0,0,1.64-.79A4.35,4.35,0,0,0,201,92.4a6.24,6.24,0,0,0,.51-2.34Zm.79-.8a9.25,9.25,0,0,0-.57-2.43,9.34,9.34,0,0,0-1.16-2.16,7.79,7.79,0,0,0-1.59-1.69,6,6,0,0,0-1.85-1,6,6,0,0,1,1.85,1,7.79,7.79,0,0,1,1.59,1.69,9.34,9.34,0,0,1,1.16,2.16A9.25,9.25,0,0,1,201.48,89Zm-5.18-6.31a5.12,5.12,0,0,1,1.55.88A7.16,7.16,0,0,1,199.18,85a8.12,8.12,0,0,1,1,1.79,8.34,8.34,0,0,1,.5,2l.83.22a9.25,9.25,0,0,0-.57-2.43,9.34,9.34,0,0,0-1.16-2.16,7.79,7.79,0,0,0-1.59-1.69,6,6,0,0,0-1.85-1Zm11.89,8.08L201.48,89l-.83-.22-4.36-1.15-.71-.19-4.07-1.07-.64-.17-5.06-1.33.05.84,5,1.39.63.17,4.07,1.12.71.2,4.4,1.21.82.23,6.64,1.83Z"
                      fill="#b80000"
                    ></path>
                  </g>
                  <path
                    d="M195.58,88.42l-4.07-1.12a7.84,7.84,0,0,0,.41,2,7.68,7.68,0,0,0,.87,1.8A7.27,7.27,0,0,0,194,92.57a5.55,5.55,0,0,0,1.55,1Zm0-5.89a3.31,3.31,0,0,0-1.58.11,3.06,3.06,0,0,0-1.25.77,4,4,0,0,0-.85,1.3,5.23,5.23,0,0,0-.38,1.69l4.07,1.07Zm5.12,7.3-4.4-1.21v5.21a3.57,3.57,0,0,0,1.62,0,3.16,3.16,0,0,0,1.38-.69,3.85,3.85,0,0,0,1-1.38A5.6,5.6,0,0,0,200.69,89.83Zm-4.39-7.11v4.94l4.36,1.15a8.34,8.34,0,0,0-.5-2,8.12,8.12,0,0,0-1-1.79,7.16,7.16,0,0,0-1.33-1.41A5.12,5.12,0,0,0,196.3,82.72Z"
                    fill="#fff"
                    opacity="0.3"
                  ></path>
                </g>
              </g>
            )}
            {status?.team == 2 && status?.status == "Shot" && (
              <g id="shot" transform="matrix(-1.5,0,0,1.5,330,-40)">
                <g id="shot_gate">
                  <path
                    d="M216.75,93.49l-8.84,9-24.29-9.59L192.71,89Z"
                    fill="#222"
                    fillOpacity="0.08"
                  ></path>
                  <path
                    d="M183.87,91l.25.27,1,1.1m-1.24-11.46.17-.18.33-.32m-.5,2.86.26-.26,1.36-1.36m-1.62,4,.26-.27,2.48-2.59m-3.24,5.6.26-.27,4.1-4.34m-4.47,7,5.59-5.59m-5,7,.27-.26,6-5.85m-5,6.23.29-.23,5.82-4.75m-1.62,3,.28-.25,2-1.74m-8,4.48.34-.15,5.64-2.47,3-1.12m-9.1-.12.27.26,2.47,2.48m-3-5.36.27.27L188.1,91m-4.61-6.94,5.86,6.31M183.74,82l.27.26,7.46,7.21m-8-10,9.22,9.5"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="10"
                    strokeWidth="0.25"
                  ></path>
                  <path
                    d="M211.15,81.4l-2.62,2.5m-1.12,11.21,4,4.11M207.54,93l5,5m-5-7.22,6.1,6.1m-6.1-8.47,7.1,7.23M207.91,86l8,8.1m-8.22-10.84,8,8.1M208,81.78l5.49,5.6m-5.11-7,1.08,1.11c1.3,1.33,2.9,3.25,2.9,3.25m-1.61-4.49s1.61,4.57,2.74,7c1,2.11,3.36,6.48,3.36,6.48M211.77,82.9l-3.24,3.24m3.74-1.5-3.74,3.74m4.36-2.24-4.36,4.48m4.86-2.86-5,5.23m6-3.86-6,6.1M208,97.72l7.1-7m-7,9.34,7.85-8m-7.85,10.34,8.72-9m-8.85,6.6,1.13,1.37m-1.37-3.86,2.49,2.74"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="10"
                    strokeWidth="0.25"
                  ></path>
                  <path
                    d="M192.71,89l15.08,3M192.46,79.16l-4.73,4.61m6.85-4.36L189,85m7.72-5.48L190,86.14m8.72-6.23-7.47,7.35M200.69,80,192,88.26m10.58-7.85-8.84,8.84m11-8.72-9.09,9M207,80.41l-9.47,9.47m11.34-9.1-9.6,9.47M208.16,84l-7.23,6.73m7.6-4.86s-3.77,3.56-5.35,5.11m5.1-2.37L205,91.49m3.24-1-1.37,1.24M196.57,79l.27.26L208.41,91m-9.47-11.84.26.28L208,89m-5.85-8.84.26.27,5.66,6m-3.8-6.11.27.26,3.59,3.36m-23.79-3.49,2.11-1.87m-1,3.11,3-2.86m2.24,0-4.11,4m-2.49-4.86.26.26L195.7,89.5M187,78.17l.26.27,10.58,11.44M189.6,78.79l.26.26,11.57,11.7m-9.59-12,.27.26,12.19,12.2M194.21,79l.26.26,12.44,12.57"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="10"
                    strokeWidth="0.25"
                  ></path>
                  <path
                    d="M183.12,77.42H184V92.87h-.87Zm24.54,3.24h1.12l-.62,21.92-1-.37Zm-24-3.24L208.54,80a.28.28,0,0,1,.24.27v.88l-25.16-2.87ZM208.53,80h1.93a.6.6,0,0,1,.55.43v.07l-2.86.38Z"
                    fill="#fff"
                  ></path>
                </g>
                <g id="shot_target">
                  <g>
                    <path
                      d="M191.51,87.3l-.63-.17a9,9,0,0,0,.46,2.3,9.88,9.88,0,0,0,1,2.1,8.76,8.76,0,0,0,1.45,1.73,6.55,6.55,0,0,0,1.8,1.19v-.86a5.55,5.55,0,0,1-1.55-1,7.27,7.27,0,0,1-1.25-1.49,7.68,7.68,0,0,1-.87-1.8A7.84,7.84,0,0,1,191.51,87.3Z"
                      fill="#b80000"
                    ></path>
                    <path
                      d="M191.51,87.3a7.84,7.84,0,0,0,.41,2,7.68,7.68,0,0,0,.87,1.8A7.27,7.27,0,0,0,194,92.57a5.55,5.55,0,0,0,1.55,1,5.55,5.55,0,0,1-1.55-1,7.27,7.27,0,0,1-1.25-1.49,7.68,7.68,0,0,1-.87-1.8A7.84,7.84,0,0,1,191.51,87.3Z"
                      fill="#fff"
                      opacity="0.51"
                    ></path>
                    <path
                      d="M195.59,94.45v1.93l.69.27v-8l-.71-.2v6Zm0-12.9a4,4,0,0,0-1.87.15,3.7,3.7,0,0,0-1.46,1,4.8,4.8,0,0,0-1,1.56,6.36,6.36,0,0,0-.4,2,6.36,6.36,0,0,1,.4-2,4.8,4.8,0,0,1,1-1.56,3.7,3.7,0,0,1,1.46-1A4,4,0,0,1,195.57,81.55Zm-4.06,4.85a5.23,5.23,0,0,1,.38-1.69,4,4,0,0,1,.85-1.3,3.06,3.06,0,0,1,1.25-.77,3.31,3.31,0,0,1,1.58-.11v-1a4,4,0,0,0-1.87.15,3.7,3.7,0,0,0-1.46,1,4.8,4.8,0,0,0-1,1.56,6.36,6.36,0,0,0-.4,2Zm4.06-3.87v4.94l.71.19V79.49l-.75-.14v3.18Z"
                      fill="#b80000"
                    ></path>
                    <path
                      d="M196.28,93.83a3.57,3.57,0,0,0,1.62,0,3.16,3.16,0,0,0,1.38-.69,3.85,3.85,0,0,0,1-1.38,5.6,5.6,0,0,0,.42-2,5.6,5.6,0,0,1-.42,2,3.85,3.85,0,0,1-1,1.38,3.16,3.16,0,0,1-1.38.69A3.57,3.57,0,0,1,196.28,93.83Z"
                      fill="#fff"
                      opacity="0.51"
                    ></path>
                    <path
                      d="M200.69,89.83a5.6,5.6,0,0,1-.42,2,3.85,3.85,0,0,1-1,1.38,3.16,3.16,0,0,1-1.38.69,3.57,3.57,0,0,1-1.62,0v.87a4.13,4.13,0,0,0,1.9.1,3.64,3.64,0,0,0,1.64-.79A4.35,4.35,0,0,0,201,92.4a6.24,6.24,0,0,0,.51-2.34Zm.79-.8a9.25,9.25,0,0,0-.57-2.43,9.34,9.34,0,0,0-1.16-2.16,7.79,7.79,0,0,0-1.59-1.69,6,6,0,0,0-1.85-1,6,6,0,0,1,1.85,1,7.79,7.79,0,0,1,1.59,1.69,9.34,9.34,0,0,1,1.16,2.16A9.25,9.25,0,0,1,201.48,89Zm-5.18-6.31a5.12,5.12,0,0,1,1.55.88A7.16,7.16,0,0,1,199.18,85a8.12,8.12,0,0,1,1,1.79,8.34,8.34,0,0,1,.5,2l.83.22a9.25,9.25,0,0,0-.57-2.43,9.34,9.34,0,0,0-1.16-2.16,7.79,7.79,0,0,0-1.59-1.69,6,6,0,0,0-1.85-1Zm11.89,8.08L201.48,89l-.83-.22-4.36-1.15-.71-.19-4.07-1.07-.64-.17-5.06-1.33.05.84,5,1.39.63.17,4.07,1.12.71.2,4.4,1.21.82.23,6.64,1.83Z"
                      fill="#b80000"
                    ></path>
                  </g>
                  <path
                    d="M195.58,88.42l-4.07-1.12a7.84,7.84,0,0,0,.41,2,7.68,7.68,0,0,0,.87,1.8A7.27,7.27,0,0,0,194,92.57a5.55,5.55,0,0,0,1.55,1Zm0-5.89a3.31,3.31,0,0,0-1.58.11,3.06,3.06,0,0,0-1.25.77,4,4,0,0,0-.85,1.3,5.23,5.23,0,0,0-.38,1.69l4.07,1.07Zm5.12,7.3-4.4-1.21v5.21a3.57,3.57,0,0,0,1.62,0,3.16,3.16,0,0,0,1.38-.69,3.85,3.85,0,0,0,1-1.38A5.6,5.6,0,0,0,200.69,89.83Zm-4.39-7.11v4.94l4.36,1.15a8.34,8.34,0,0,0-.5-2,8.12,8.12,0,0,0-1-1.79,7.16,7.16,0,0,0-1.33-1.41A5.12,5.12,0,0,0,196.3,82.72Z"
                    fill="#fff"
                    opacity="0.3"
                  ></path>
                </g>
              </g>
            )}
            {status?.team == 1 && status?.status == "Penalty Shot Missed" && (
              <svg
                id="SvgjsSvg1489"
                width="60"
                height="60"
                viewBox="0 0 40 40"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="338"
                y="60"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect
                  width="40"
                  height="40"
                  opacity="0"
                  id="SvgjsRect1488"
                ></rect>
                <svg
                  id="SvgjsSvg1280"
                  width="40"
                  height="40"
                  viewBox="0 0 289 205"
                  xmlns="http://www.w3.org/2000/svg"
                  y="0"
                >
                  <g id="SvgjsG1278">
                    <path
                      fill="#222"
                      fillOpacity=".08"
                      d="M287 132l-71 72-195-77 73-31 193 36z"
                      id="SvgjsPath1276"
                    ></path>
                    <g
                      stroke="#fff"
                      strokeWidth="2"
                      fill="none"
                      id="SvgjsG1274"
                    >
                      <path
                        d="M23 112l2.024 2.227 7.976 8.773M23 31l1.41-1.41 2.59-2.59M23 50l2.118-2.118 10.882-10.882M23 69l2.07-2.164 19.93-20.836M19 91l2.059-2.176 32.941-34.824M18.126 109.874l44.874-44.874M23 121l2.148-2.105 47.852-46.895M33 122l2.33-1.902 46.67-38.098M69 106l2.243-1.994 15.757-14.006M23 126l2.749-1.207s38.251-16.793 45.251-19.793l24-9M22 95l2.119 2.119 19.881 19.881M20 74l2.095 2.152 34.905 35.848M19.972 56.351l47.028 50.649M22 40l2.152 2.083 59.848 57.917M19.972 19.71l74.028 76.29"
                        id="SvgjsPath1272"
                      ></path>
                    </g>
                    <g
                      stroke="#fff"
                      strokeWidth="2"
                      fill="none"
                      id="SvgjsG1270"
                    >
                      <path
                        d="M242 35l-21 20M212 145l32 33M213 128l40 40M213 110l49 49M213 91l57 58M216 72l64 65M214 50l64 65M217 38l44 45M220 27l8.669 8.886c10.444 10.705 23.331 26.114 23.331 26.114M239 26s12.945 36.647 22 56c7.945 16.981 27 52 27 52M247 47l-26 26M251 61l-30 30M256 73l-35 36M260 86l-40 42M268 97l-48 49M217 166l57-56M218 185l63-64M218 204l70-72M217 185l9 11M215 165l20 22"
                        id="SvgjsPath1268"
                      ></path>
                    </g>
                    <g
                      stroke="#fff"
                      strokeWidth="2"
                      fill="none"
                      id="SvgjsG1266"
                    >
                      <path
                        d="M94 96l121 24M92 17l-38 37M109 19l-45 45M126 20l-54 53M142 23l-60 59M158 24l-70 66M173 27l-71 71M190 28l-73 72M209 27l-76 76M224 30l-77 76M218 56l-58 54M221 71s-30.279 28.598-43 41M219 93l-26 23M219 108l-11 10M125 16l2.106 2.128 92.894 93.872M144 17l2.038 2.206 70.962 76.794M170 25l2.072 2.181 45.428 47.819M187 26l2.191 2.051 28.809 26.949M27 27l17-15M36 37l24-23M78 14l-33 32M25 7l2.117 2.117 90.883 90.883M48 9l2.044 2.208 84.956 91.792M69 14l2.106 2.128 92.894 93.872M87 14l2.123 2.123 97.877 97.877M106 16l2.107 2.128 99.893 100.872"
                        id="SvgjsPath1264"
                      ></path>
                    </g>
                    <path
                      fill="#fff"
                      d="M17 3h7v124h-7v-124zM214 29h9l-5 176-8-3 4-173zM21 3l200.018 20.794c1.094.114 1.982 1.102 1.982 2.204v7.003l-202-23v-7.001zM221 24h15.493c1.937 0 3.885 1.512 4.354 3.392l.153.608-23 3 3-7z"
                      id="SvgjsPath1262"
                    ></path>
                  </g>
                </svg>
                <svg
                  id="SvgjsSvg1260"
                  width="25"
                  height="25"
                  viewBox="0 0 178 138"
                  xmlns="http://www.w3.org/2000/svg"
                  y="5"
                  x="22"
                >
                  <g fill="none" id="SvgjsG1258">
                    <g id="SvgjsG1256">
                      <path
                        d="M45.563 63.8l-5.037-1.39c.406 6.223 1.686 12.384 3.67 18.251 1.983 5.864 4.683 11.472 7.94 16.579 3.274 5.135 7.133 9.793 11.421 13.717 4.334 3.967 9.131 7.203 14.236 9.428l-.011-6.807c-4.394-1.904-8.527-4.675-12.269-8.073-3.706-3.367-7.044-7.366-9.881-11.777-2.822-4.391-5.162-9.21-6.883-14.252-1.721-5.044-2.831-10.336-3.186-15.676z"
                        id="SvgjsPath1254"
                        fill="#B80000"
                      ></path>
                      <path
                        d="M45.563 63.8c.354 5.34 1.465 10.632 3.187 15.676 1.721 5.042 4.061 9.861 6.883 14.252 2.837 4.411 6.175 8.41 9.881 11.777 3.741 3.398 7.875 6.169 12.269 8.073-4.394-1.904-8.527-4.675-12.269-8.073-3.706-3.367-7.044-7.366-9.881-11.777-2.822-4.391-5.162-9.21-6.883-14.252-1.722-5.044-2.832-10.336-3.187-15.676z"
                        id="SvgjsPath1252"
                        opacity=".51"
                        fill="#fff"
                      ></path>
                      <path
                        d="M77.793 120.385l.026 15.203 5.414 2.197.031-15.449.014-6.877.082-41.231-5.646-1.558.068 40.908.011 6.807zM77.624 18.333c-5.329-.835-10.305-.371-14.768 1.175-4.385 1.519-8.276 4.082-11.533 7.486-3.204 3.35-5.8 7.521-7.654 12.334-1.83 4.749-2.946 10.139-3.217 16.014.271-5.875 1.387-11.265 3.217-16.014 1.854-4.813 4.45-8.984 7.654-12.334 3.257-3.404 7.148-5.967 11.533-7.486 4.462-1.546 9.439-2.01 14.768-1.175zM45.551 56.687c.327-4.937 1.363-9.452 2.996-13.417 1.653-4.012 3.922-7.473 6.695-10.24 2.812-2.805 6.147-4.899 9.887-6.124 3.796-1.243 8.009-1.589 12.507-.869l-.013-7.704c-5.329-.835-10.305-.371-14.768 1.175-4.385 1.519-8.276 4.082-11.533 7.486-3.204 3.35-5.8 7.521-7.654 12.334-1.83 4.749-2.946 10.139-3.217 16.014l5.1 1.345zM77.636 26.037l.066 39.13 5.673 1.496.078-39.133.015-7.787.035-17.738-5.909-1.131.03 17.459.012 7.704z"
                        id="SvgjsPath1250"
                        fill="#B80000"
                      ></path>
                      <path
                        d="M83.278 115.459c4.502 1.132 8.828 1.205 12.815.328 4.049-.892 7.749-2.764 10.917-5.504 3.216-2.781 5.88-6.45 7.801-10.879 1.944-4.482 3.12-9.727 3.332-15.58-.212 5.854-1.388 11.098-3.332 15.58-1.921 4.429-4.585 8.098-7.801 10.879-3.169 2.74-6.868 4.612-10.917 5.504-3.987.877-8.313.804-12.815-.328z"
                        id="SvgjsPath1248"
                        opacity=".51"
                        fill="#fff"
                      ></path>
                      <path
                        d="M118.144 83.824c-.211 5.854-1.387 11.098-3.332 15.58-1.921 4.429-4.585 8.098-7.801 10.879-3.169 2.74-6.868 4.612-10.917 5.504-3.987.877-8.313.804-12.815-.328l-.014 6.877c5.275 1.468 10.362 1.68 15.065.755 4.789-.94 9.179-3.06 12.951-6.227 3.838-3.222 7.028-7.521 9.332-12.746 2.337-5.301 3.753-11.532 4.004-18.509l-6.473-1.785zM124.388 77.48c-.591-6.538-2.142-13.023-4.482-19.188-2.34-6.163-5.456-11.969-9.168-17.162-3.69-5.162-7.949-9.691-12.595-13.35-4.594-3.619-9.545-6.369-14.674-8.037 5.129 1.668 10.08 4.418 14.674 8.037 4.646 3.659 8.905 8.188 12.595 13.35 3.712 5.193 6.829 11 9.168 17.162 2.34 6.165 3.89 12.65 4.482 19.188zM83.453 27.53c4.286 1.513 8.412 3.89 12.238 6.958 3.862 3.096 7.405 6.884 10.485 11.175 3.096 4.313 5.711 9.118 7.705 14.211 1.994 5.096 3.357 10.457 3.956 15.877l6.552 1.729c-.591-6.538-2.142-13.023-4.482-19.188-2.34-6.163-5.456-11.969-9.168-17.162-3.69-5.162-7.949-9.691-12.595-13.35-4.594-3.619-9.545-6.369-14.674-8.037l-.017 7.787zM177.526 91.496l-53.138-14.016-6.552-1.728-34.461-9.089-5.673-1.496-32.151-8.48-5.1-1.345-40.05-10.564.445 6.684 39.68 10.948 5.037 1.39 32.151 8.87 5.646 1.558 34.784 9.596 6.472 1.785 52.542 14.496.368-8.609z"
                        id="SvgjsPath1246"
                        fill="#B80000"
                      ></path>
                    </g>
                    <g fill="#fff" opacity=".3" id="SvgjsG1244">
                      <path
                        d="M77.714 72.67l-32.15-8.87c.354 5.34 1.465 10.632 3.187 15.676 1.721 5.042 4.061 9.861 6.883 14.252 2.837 4.411 6.175 8.41 9.881 11.777 3.741 3.398 7.875 6.169 12.269 8.073l-.07-40.908zM77.636 26.037c-4.499-.721-8.711-.374-12.507.869-3.739 1.225-7.074 3.319-9.887 6.124-2.773 2.767-5.042 6.228-6.695 10.24-1.633 3.966-2.669 8.481-2.996 13.417l32.151 8.48-.066-39.13zM118.144 83.824l-34.784-9.597-.082 41.231c4.502 1.132 8.828 1.205 12.815.328 4.049-.892 7.749-2.764 10.917-5.504 3.216-2.781 5.88-6.45 7.801-10.879 1.945-4.481 3.121-9.725 3.333-15.579zM83.453 27.53l-.078 39.133 34.461 9.089c-.599-5.42-1.961-10.781-3.956-15.877-1.994-5.094-4.609-9.898-7.705-14.211-3.08-4.292-6.623-8.079-10.485-11.175-3.826-3.069-7.952-5.446-12.237-6.959z"
                        id="SvgjsPath1242"
                      ></path>
                    </g>
                  </g>
                </svg>
                <defs id="SvgjsDefs1470">
                  <linearGradient
                    x1="83.084%"
                    y1="25.765%"
                    x2="113.188%"
                    y2="38.749%"
                    id="SvgjsLinearGradient1468"
                  >
                    <stop
                      stopColor="#DAA58F"
                      offset="0%"
                      id="SvgjsStop1466"
                    ></stop>
                    <stop
                      stopColor="#87594C"
                      offset="100%"
                      id="SvgjsStop1464"
                    ></stop>
                  </linearGradient>
                  <linearGradient
                    x1="83.084%"
                    y1="26.144%"
                    x2="113.188%"
                    y2="38.925%"
                    id="SvgjsLinearGradient1462"
                  >
                    <stop
                      stopColor="#DAA58F"
                      offset="0%"
                      id="SvgjsStop1460"
                    ></stop>
                    <stop
                      stopColor="#87594C"
                      offset="100%"
                      id="SvgjsStop1458"
                    ></stop>
                  </linearGradient>
                </defs>
              </svg>
            )}
            {status?.team == 2 && status?.status == "Penalty Shot Missed" && (
              <svg
                id="SvgjsSvg2472"
                width="60"
                height="60"
                viewBox="0 0 40 40"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="2"
                y="60"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect
                  width="40"
                  height="40"
                  opacity="0"
                  id="SvgjsRect2471"
                ></rect>
                <svg
                  id="SvgjsSvg2469"
                  width="40"
                  height="40"
                  viewBox="0 0 7 12"
                  xmlns="http://www.w3.org/2000/svg"
                  y="60"
                >
                  <g fill="none" id="SvgjsG2467">
                    <path
                      fill="#E3E3E3"
                      d="M0 0h1v12h-1z"
                      id="SvgjsPath2465"
                    ></path>
                    <g id="SvgjsG2463">
                      <path
                        fill="#D4EC3D"
                        d="M1 .05h6v6h-6z"
                        id="SvgjsPath2461"
                      ></path>
                      <path
                        fill="#A10808"
                        d="M4 3h3v3h-3z"
                        id="SvgjsPath2459"
                      ></path>
                      <path
                        fill="#A10808"
                        d="M1 0h3v3h-3z"
                        id="SvgjsPath2457"
                      ></path>
                    </g>
                  </g>
                </svg>
                <svg
                  id="SvgjsSvg2455"
                  width="40"
                  height="40"
                  viewBox="0 0 106 249"
                  xmlns="http://www.w3.org/2000/svg"
                  y="60"
                >
                  <g fill="none" fillRule="evenodd" id="SvgjsG2439">
                    <path
                      d="M57.24 102.543s-.54 19.035 0 20.962c.447 1.607.984 5.302.984 5.302s-.965 6.216 2.842 6.608c1.848.19 9.075 1.215 10.955 0 2.26-1.46 4.98-5.41 4.98-5.708 0-1.06-2.137-15.207-2.137-15.207C76.555 114.5 62.05 93 62.05 93l-4.81 9.543z"
                      fill="#CC947B"
                      id="SvgjsPath2437"
                    ></path>
                    <path
                      d="M5.826 11.243s-2.718 4.183-3.3 5.1c-.85 1.344-1.313 6.068-1.313 6.068l1.313 4.423 2.148 3.39 2.148 1.13h3.222c1.074 0 4.297-2.26 4.297-2.26l3.223-3.39s6.605-12.67 6.963-17.19L16.47.864 5.826 11.243z"
                      fill="url(#a)"
                      transform="translate(13 107) rotate(2 12.869 16.11)"
                      id="SvgjsPath2435"
                    ></path>
                    <path
                      d="M24.908 135.345s.97-2.512 1.205-3.874c.256-1.49.266-4.69.266-4.69l-1.993-2.55-1.767-.716-2.483.304c-.827.1-3.085 2.24-3.085 2.24l.072 7.445 7.784 1.842z"
                      fill="#F3D5C9"
                      id="SvgjsPath2433"
                    ></path>
                    <path
                      d="M26.288 102.946c-.23.186-2.148 5.705-2.148 5.705s-.492 2.4-1.074 3.29c-.85 1.302-1.074 4.386-1.074 4.386v6.58l2.148 3.288 2.148 1.096h3.222c1.074 0 4.297-2.193 4.297-2.193l3.222-3.29s6.604-12.286 6.962-16.672L37.03 98.29s-6.676 1.388-10.742 4.656z"
                      id="SvgjsPath2431"
                      fill="url(#b)"
                      transform="rotate(25 32.992 112.79)"
                    ></path>
                    <g fill="#DAA58F" id="SvgjsG2429">
                      <path
                        d="M8 105v-1.076s.145-2.07 1-2.924l3-3.058s3.722-1.843 4-1.982c1.055-.526 5-3.003 5-3.003l13-4.984s6.898 5.222 9 4c1.898-1.104 7-1.994 7-1.994l9 .996L64 83l11 14.954L88 115.9s1.786 3.752 2 6.1c.12 1.308 0 5.863 0 5.863s-.82 5.9-1 6.978c-.153.918-5 17.946-5 17.946L79 168l-6 16-1 6.67-7 3.988-17 5.98s-9 .998-14 4.986c-2.406 1.92.61-1.536-1-6.624-.702-2.22 1 3.658 0-11-.22-3.212-.783-5.7-2-13s-3-12.015-3-17c0-.73-1-11.018 1-17 2-5.982 4-13.137 4-13.137l5-6.98s17.254 7.37 20 10.117c2 2 8 3 8 3l7-1s2.845-5.613 3-7c.18-1.604-1-10.1-1-10.1L62 95.96l-6 7.976s-2.87 2.902-6 3.988C45.464 109.497 34 102 34 102l-11 5.91s-4 1.995-5 1.995h-4l-3-.997-2-.997-1-.996V105z"
                        id="SvgjsPath2427"
                      ></path>
                    </g>
                    <path
                      d="M8 105v-1.076s.145-2.07 1-2.924l3-3.058s3.722-1.843 4-1.982c1.055-.526 5-3.003 5-3.003l13-4.984s6.898 5.222 9 4c1.898-1.104 7-1.994 7-1.994l9 .996L64 83l11 14.954L88 115.9s1.786 3.752 2 6.1c.12 1.308 0 5.863 0 5.863s-.82 5.9-1 6.978c-.153.918-5 17.946-5 17.946L79 168l-6 16-1 6.67-7 3.988-17 5.98s-9 .998-14 4.986c-2.406 1.92.61-1.536-1-6.624-.702-2.22 1 3.658 0-11-.22-3.212-.783-5.7-2-13s-3-12.015-3-17c0-.73-1-11.018 1-17 2-5.982 4-13.137 4-13.137l5-6.98s17.254 7.37 20 10.117c2 2 8 3 8 3l7-1s2.845-5.613 3-7c.18-1.604-1-10.1-1-10.1L62 95.96l-6 7.976s-2.87 2.902-6 3.988C45.464 109.497 34 102 34 102l-11 5.91s-4 1.995-5 1.995h-4l-3-.997-2-.997-1-.996V105z"
                      id="SvgjsPath2425"
                    ></path>
                    <path
                      d="M30.636 120.878c4.727-1.268 0 0 0 0s.663-2.43.733-3.705c.076-1.396-.293-4.307-.293-4.307s-5.817-1.072-6.623-.856c-.805.216-1.685 2.326-1.685 2.326s-.663 2.086-.844 3.028c-.175.908.805 3.002.805 3.002s3.18 1.78 7.906.512z"
                      fill="#EFCDBE"
                      id="SvgjsPath2423"
                    ></path>
                    <rect
                      fill="#F4E845"
                      transform="rotate(19 45 52.184)"
                      x="13.5"
                      y="8.184"
                      width="63"
                      height="88"
                      rx="8"
                      id="SvgjsRect2421"
                    ></rect>
                    <path
                      d="M59 102.815l3 10.592-3.555 5.135-.445.643V124l6-.963-4-.963v-2.89c0-.642 4-4.814 4-4.814h4c2.152 0 8 .963 8 .963s-12-2.89-12-3.852c0-.96-3-7.702-3-7.702L69 98l-10 4.815z"
                      fillOpacity=".53"
                      fill="#3F140F"
                      id="SvgjsPath2419"
                    ></path>
                    <path
                      d="M57 196c-8.31 3.672-24 8-24 8l14 45h59s-31-61-32-61-10.976 5.338-17 8z"
                      fill="#222"
                      id="SvgjsPath2417"
                    ></path>
                    <path
                      d="M34 208s-5-20-8-29c-5.518-16.553 1.096-38.205 2-42 .763-3.205 4-9 4-9s8.88-15.577 9-17.344c.214-3.184 0-10.892 0-10.892s-.01-9.82 0-9.902c.28-2.073 1-5.94 1-5.94s.448-2.504 1-3.96c.448-1.185 3-2.972 3-2.972s2-.99 4-.99h4l2 .99c2 .99 2 1.98 2 1.98l1 3.96V92.833l-1 8.912-1 8.912v3.96L74 186l-40 22z"
                      fill="#DAA58F"
                      id="SvgjsPath2415"
                    ></path>
                    <path
                      d="M43 103.407l5 .797 7-.797H43zM43 101.407l5 .797 7-.797H43z"
                      fillOpacity=".53"
                      fill="#3F140F"
                      id="SvgjsPath2413"
                    ></path>
                    <path
                      d="M46.906 89.46c.99.586 3.838.96 3.838.96s3.176.394 3.838 0c.94-.558.972-2.855.972-2.855s.38-3.47 0-5.75c-.188-1.114-1.116-1.85-1.28-1.933H51.08s-1.76-.055-1.915 0c-.234.082-1.357.045-1.915.64-.605.644-.638 1.92-.638 1.92l-.635 5.154s.33 1.508.93 1.863z"
                      fill="#F3D5C9"
                      id="SvgjsPath2411"
                    ></path>
                    <path
                      d="M68 187c-6.68 3.05-23.736 9.4-25 10-2.535 1.204-11 5-11 5s.48 4.44 1 6c.48 1.44 2 5 2 5l43-18s-1.022-2.97-2-5c-.948-1.97-.85-7-1-7-.095 0-3.968 2.615-7 4z"
                      fill="#E5E5E5"
                      id="SvgjsPath2409"
                    ></path>
                  </g>
                </svg>
                <svg
                  id="SvgjsSvg2407"
                  width="40"
                  height="40"
                  viewBox="0 0 105 250"
                  xmlns="http://www.w3.org/2000/svg"
                  y="60"
                >
                  <defs id="SvgjsDefs2405">
                    <linearGradient
                      x1="83.084%"
                      y1="25.765%"
                      x2="113.188%"
                      y2="38.749%"
                      id="SvgjsLinearGradient2403"
                    >
                      <stop
                        stopColor="#DAA58F"
                        offset="0%"
                        id="SvgjsStop2401"
                      ></stop>
                      <stop
                        stopColor="#87594C"
                        offset="100%"
                        id="SvgjsStop2399"
                      ></stop>
                    </linearGradient>
                    <linearGradient
                      x1="83.084%"
                      y1="26.144%"
                      x2="113.188%"
                      y2="38.925%"
                      id="SvgjsLinearGradient2397"
                    >
                      <stop
                        stopColor="#DAA58F"
                        offset="0%"
                        id="SvgjsStop2395"
                      ></stop>
                      <stop
                        stopColor="#87594C"
                        offset="100%"
                        id="SvgjsStop2393"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <g fill="none" fillRule="evenodd" id="SvgjsG2391">
                    <path
                      d="M56.24 103.543s-.54 19.035 0 20.962c.447 1.607.984 5.302.984 5.302s-.965 6.216 2.842 6.608c1.848.19 9.075 1.215 10.955 0 2.26-1.46 4.98-5.41 4.98-5.708 0-1.06-2.137-15.207-2.137-15.207C75.555 115.5 61.05 94 61.05 94l-4.81 9.543z"
                      fill="#CC947B"
                      id="SvgjsPath2389"
                    ></path>
                    <path
                      d="M5.826 11.243s-2.718 4.183-3.3 5.1c-.85 1.344-1.313 6.068-1.313 6.068l1.313 4.423 2.148 3.39 2.148 1.13h3.222c1.074 0 4.297-2.26 4.297-2.26l3.223-3.39s6.605-12.67 6.963-17.19L16.47.864 5.826 11.243z"
                      fill="url(#a)"
                      transform="translate(12 108) rotate(2 12.869 16.11)"
                      id="SvgjsPath2387"
                    ></path>
                    <path
                      d="M23.802 134.387s1.013-2.493 1.27-3.85c.282-1.487.345-4.682.345-4.682l-1.947-2.582-1.753-.745-2.486.26c-.827.09-3.12 2.188-3.12 2.188l-.054 7.44 7.746 1.97z"
                      fill="#F9DFD5"
                      id="SvgjsPath2385"
                    ></path>
                    <path
                      d="M25.288 103.946c-.23.186-2.148 5.705-2.148 5.705s-.492 2.4-1.074 3.29c-.85 1.302-1.074 4.386-1.074 4.386v6.58l2.148 3.288 2.148 1.096h3.222c1.074 0 4.297-2.193 4.297-2.193l3.222-3.29s6.604-12.286 6.962-16.672L36.03 99.29s-6.676 1.388-10.742 4.656z"
                      id="SvgjsPath2383"
                      fill="url(#b)"
                      transform="rotate(25 31.992 113.79)"
                    ></path>
                    <g fill="#DAA58F" id="SvgjsG2381">
                      <path
                        d="M6 101v-1.076s.145-2.07 1-2.924l3-3.058s3.722-1.843 4-1.982c.814-.406 6.916-2.54 9.665-3.497L25 88l11-2s3.898 8.195 6 6.973c1.898-1.104 7-1.994 7-1.994l9 .996L63 84l11 14.954L87 116.9s1.786 3.752 2 6.1c.12 1.308 0 5.863 0 5.863s-.82 5.9-1 6.978c-.153.918-5 17.946-5 17.946L78 169l-6 16-1 6.67-7 3.988-17 5.98s-9 .998-14 4.986c-2.406 1.92.61-1.536-1-6.624-.702-2.22 1 3.658 0-11-.22-3.212-.783-5.7-2-13s-3-12.015-3-17c0-.73-1-11.018 1-17 2-5.982 4-13.137 4-13.137l5-6.98s17.254 7.37 20 10.117c2 2 8 3 8 3l7-1s2.845-5.613 3-7c.18-1.604-1-10.1-1-10.1L61 96.96l-6 7.976s-2.87 2.902-6 3.988C44.464 110.497 30 101 30 101l-9 4.91s-4 1.995-5 1.995h-4l-3-.997-2-.997-1-2.996V101z"
                        id="SvgjsPath2379"
                      ></path>
                    </g>
                    <path
                      d="M6 101v-1.076s.145-2.07 1-2.924l3-3.058s3.722-1.843 4-1.982c.814-.406 6.916-2.54 9.665-3.497L25 88l11-2s3.898 8.195 6 6.973c1.898-1.104 7-1.994 7-1.994l9 .996L63 84l11 14.954L87 116.9s1.786 3.752 2 6.1c.12 1.308 0 5.863 0 5.863s-.82 5.9-1 6.978c-.153.918-5 17.946-5 17.946L78 169l-6 16-1 6.67-7 3.988-17 5.98s-9 .998-14 4.986c-2.406 1.92.61-1.536-1-6.624-.702-2.22 1 3.658 0-11-.22-3.212-.783-5.7-2-13s-3-12.015-3-17c0-.73-1-11.018 1-17 2-5.982 4-13.137 4-13.137l5-6.98s17.254 7.37 20 10.117c2 2 8 3 8 3l7-1s2.845-5.613 3-7c.18-1.604-1-10.1-1-10.1L61 96.96l-6 7.976s-2.87 2.902-6 3.988C44.464 110.497 30 101 30 101l-9 4.91s-4 1.995-5 1.995h-4l-3-.997-2-.997-1-2.996V101z"
                      id="SvgjsPath2377"
                    ></path>
                    <path
                      d="M29.636 121.878c4.727-1.268 0 0 0 0s.663-2.43.733-3.705c.076-1.396-.293-4.307-.293-4.307s-5.817-1.072-6.623-.856c-.805.216-1.685 2.326-1.685 2.326s-.663 2.086-.844 3.028c-.175.908.805 3.002.805 3.002s3.18 1.78 7.906.512z"
                      fill="#EFCDBE"
                      id="SvgjsPath2375"
                    ></path>
                    <rect
                      fill="#F00"
                      transform="rotate(19 45 52.184)"
                      x="13.5"
                      y="8.184"
                      width="63"
                      height="88"
                      rx="8"
                      id="SvgjsRect2373"
                    ></rect>
                    <path
                      d="M58 103.815l3 10.592-3.555 5.135-.445.643V125l6-.963-4-.963v-2.89c0-.642 4-4.814 4-4.814h4c2.152 0 8 .963 8 .963s-12-2.89-12-3.852c0-.96-3-7.702-3-7.702L68 99l-10 4.815z"
                      fillOpacity=".53"
                      fill="#3F140F"
                      id="SvgjsPath2371"
                    ></path>
                    <path
                      d="M56 197c-8.31 3.672-24 8-24 8l14 45h59s-31-61-32-61-10.976 5.338-17 8z"
                      fill="#222"
                      id="SvgjsPath2369"
                    ></path>
                    <path
                      d="M33 209s-5-20-8-29c-5.518-16.553 1.096-38.205 2-42 .763-3.205 4-9 4-9s8.88-15.577 9-17.344c.214-3.184 0-10.892 0-10.892s-.01-9.82 0-9.902c.28-2.073 1-5.94 1-5.94s.448-2.504 1-3.96c.448-1.185 3-2.972 3-2.972s2-.99 4-.99h4l2 .99c2 .99 2 1.98 2 1.98l1 3.96V93.833l-1 8.912-1 8.912v3.96L73 187l-40 22z"
                      fill="#DAA58F"
                      id="SvgjsPath2367"
                    ></path>
                    <path
                      d="M42 104.407l5 .797 7-.797H42zM42 102.407l5 .797 7-.797H42z"
                      fillOpacity=".53"
                      fill="#3F140F"
                      id="SvgjsPath2365"
                    ></path>
                    <path
                      d="M45.906 90.46c.99.586 3.838.96 3.838.96s3.176.394 3.838 0c.94-.558.972-2.855.972-2.855s.38-3.47 0-5.75c-.188-1.114-1.116-1.85-1.28-1.933H50.08s-1.76-.055-1.915 0c-.234.082-1.357.045-1.915.64-.605.644-.638 1.92-.638 1.92l-.635 5.154s.33 1.508.93 1.863z"
                      fill="#F3D5C9"
                      id="SvgjsPath2363"
                    ></path>
                    <path
                      d="M67 188c-6.68 3.05-23.736 9.4-25 10-2.535 1.204-11 5-11 5s.48 4.44 1 6c.48 1.44 2 5 2 5l43-18s-1.022-2.97-2-5c-.948-1.97-.85-7-1-7-.095 0-3.968 2.615-7 4z"
                      fill="#E5E5E5"
                      id="SvgjsPath2361"
                    ></path>
                  </g>
                </svg>
                <svg
                  id="SvgjsSvg2359"
                  width="40"
                  height="40"
                  viewBox="0 0 17 21"
                  xmlns="http://www.w3.org/2000/svg"
                  y="60"
                >
                  <g fill="none" id="SvgjsG2357">
                    <path
                      d="M11.449 20.692c.322.452.849.445 1.166 0l3.294-4.62c.322-.452.128-.818-.423-.818h-6.908c-.556 0-.74.373-.423.818l3.294 4.62zm-1.647-5.437h4.46v-5.25c0-.555-.444-1.005-1.001-1.005h-2.458c-.553 0-1.001.45-1.001 1.005v5.25z"
                      id="SvgjsPath2355"
                      fill="#6F4E39"
                    ></path>
                    <path
                      d="M3.927.855c.283-.473.743-.472 1.025 0l3.368 5.63c.283.473.065.857-.495.857h-6.771c-.557 0-.778-.384-.495-.857l3.368-5.63zm-1.458 6.486h3.94v6.172c0 .551-.452.997-.994.997h-1.952c-.549 0-.994-.448-.994-.997v-6.172z"
                      fill="#51CC66"
                      id="SvgjsPath2353"
                    ></path>
                  </g>
                </svg>
                <svg
                  id="SvgjsSvg2351"
                  width="50"
                  height="50"
                  viewBox="15 5 63 43"
                  xmlns="http://www.w3.org/2000/svg"
                  y="60"
                >
                  <g fill="none" transform="translate(35 11)" id="SvgjsG2349">
                    <path
                      d="M12 23c5.851 0 11-5.149 11-11.5s-5.149-11.5-11-11.5c-6.851 0-12 5.149-12 11.5s5.149 11.5 12 11.5z"
                      stroke="#525252"
                      strokeWidth=".5"
                      fill="#F8F8F8"
                      id="SvgjsPath2347"
                    ></path>
                    <path
                      d="M15 1l-2 2-1 1m8.45 6.095s-1.522-1.341-3.087-2.142c-1.564-.801-3.821-1.022-3.821-1.022m-3.947 2.179s-.236 1.846 0 3.361l1.045 3.359m3.98 2.314s2.221.134 3.916-1.092c1.698-1.222 2.524-2.914 2.524-2.914m-19.796-3.604s.658-1.558 2.093-2.537c1.436-.978 3.464-1.296 3.464-1.296m-2.034-4.634c1.659-.436 3.224 2.103 3.224 2.103m-6.003 10.461s1 1.861 2.492 2.641c1.491.778 3.336.879 3.336.879m5.046 3.022l.738 1.78m-4.099-1.951l-.783 2"
                      id="SvgjsPath2345"
                      strokeWidth=".652"
                      stroke="#808080"
                    ></path>
                    <path
                      d="M14 7.075l-4.008 2.925-3.992-2.989 1.669-3.982 4.97-.028 1.362 4.075zm-.364 14.925l1.364-4.075-4.008-2.925-3.992 2.989 1.669 3.981 4.967.03zm-13.46-12.271h1.904l.848 5.809-1.468 1.603s-.861-.913-1.305-3.342c-.36-1.966.021-4.07.021-4.07zm21.815-2.466l-3.106 2.528.957 5.278 2.805-.813s.424-1.758.192-3.828c-.178-1.539-.849-3.164-.849-3.164zm-7.991-5.263l4-.578s-.618-.401-2.001-.896c-1.379-.496-1.999-.526-1.999-.526v2z"
                      fill="#1A1A1A"
                      id="SvgjsPath2343"
                    ></path>
                  </g>
                  <g
                    stroke="#fff"
                    fill="none"
                    transform="translate(23,0)"
                    id="SvgjsG2341"
                  >
                    <path
                      d="M1.306-1.331s10.859 4.893 17.233 7.871c6.372 2.979 9.675 4.948 13.594 6.928 3.32 1.677 6.878 2.359 6.798 6.865-.078 4.41-1.08 5.173-3.594 7.515-4.038 3.764-7.341 5.492-10.449 7.258-3.363 1.909-6.982 6.872-6.982 6.872"
                      id="SvgjsPath2339"
                    ></path>
                    <path
                      d="M21.145 8.028s-4.272-1.886-8.946-3.161c-5.2-1.419-10.927-4.196-10.927-4.196"
                      id="SvgjsPath2337"
                    ></path>
                    <path
                      d="M7.516 1.485s1.089 2.117.563 2.292c-.526.176-2.605-1.416-3.305-2.342-.701-.925-.447-1.712-.447-1.712"
                      id="SvgjsPath2335"
                    ></path>
                    <path d="M3.252 1.705l.948 3.018" id="SvgjsPath2333"></path>
                    <path
                      d="M1.217 3.669l9.928 4.179"
                      id="SvgjsPath2331"
                    ></path>
                    <path
                      d="M8.216 3.836c.008-.468 1.469 3.169 3.703 4.731 2.234 1.563 6.562 4.182 6.562 4.182l3.289 4.737 6.283 1.594 4.423-2.704s6.748-.186 6.466 2.899c-.283 3.085-5.66 6.092-7.399 7.297-4.936 3.419-6.799 8.529-6.799 8.529"
                      id="SvgjsPath2329"
                    ></path>
                    <path
                      d="M32.748 30.418l-.312-3.93-5.203-1.347-6.424 2.801-3.157 5.442s-2.91.948-5.746 3.428c-2.838 2.48-5.368 4.964-5.368 4.964"
                      id="SvgjsPath2327"
                    ></path>
                    <path
                      d="M33.001 16.243s-5-1.766-6.632-2.603c-1.635-.837-3.42-1.474-3.42-1.474s-3.068-1.143-4.269-2.374c-1.2-1.231-3.5-3.871-3.5-3.871"
                      id="SvgjsPath2325"
                    ></path>
                    <path
                      d="M16.163 6.938l4.223 9.079 3.423-3.834s-4.088-4.684-3.27-4.67c.816.015 12.463 8.73 12.463 8.73"
                      id="SvgjsPath2323"
                    ></path>
                    <path
                      d="M11.199 4.848l2.91 5.054"
                      id="SvgjsPath2321"
                    ></path>
                    <path
                      d="M27.8 19.15s.202.625.079 2.702c-.122 2.078-1.057 4.282-1.057 4.282"
                      id="SvgjsPath2319"
                    ></path>
                    <path
                      d="M26.239 31.585l-5.177 2.733s-.154 1.383-2.436 2.673l-4.845 3.914-1.227-.022 3.107-4.143c.656-.567 3.74-2.525 3.74-2.525l3.166-4.735 6.215-1.067s-1.687-3.303-1.49-3.27"
                      id="SvgjsPath2317"
                    ></path>
                    <path d="M19.643 36.062l-2 .012" id="SvgjsPath2315"></path>
                    <path d="M26.733 31.135l-5-.089" id="SvgjsPath2313"></path>
                    <path
                      d="M27.895 22.153s-1.874.331-4.985.715c-3.112.384-5.401-.096-5.401-.096l-3.379-5.096s-1.781-1.003-1.918-1.065c-.139-.061-2.205-.274-2.205-.274l-4.737-5.329-4.101-4.617.648-.711 7.825 4.774s2.08 1.165 3.117 2.297c1.037 1.132 1.718 2.14 1.718 2.14l4.493.842 3.39 2.125-4.484 2.368-3.227-.721-5.202 1.977-1.126-2.379-3.123-.07-4.166-4.866 3.672-3.803"
                      id="SvgjsPath2311"
                    ></path>
                    <path
                      d="M10.002 15.831l-2.054 2.965"
                      id="SvgjsPath2309"
                    ></path>
                    <path
                      d="M1.038 13.669l2.334 7.19 2.922 5.907 3.296.06 1.825-2.367 3.176.408 2.976-2.579.367-2.554"
                      id="SvgjsPath2307"
                    ></path>
                    <path
                      d="M6.787 27.777l1.905-5.968 2.139 3.603"
                      id="SvgjsPath2305"
                    ></path>
                    <path
                      d="M4.948 18.74l-1.732 2.299-2.321.629"
                      id="SvgjsPath2303"
                    ></path>
                    <path
                      d="M-.275 31.129l2.411-.262 1.638 5.858 1.981.035 3.93-3.245s3.412-.682 4.639-2.125l5.451-2.703.084-4.677-8.961 5.777-7.195 6.695 3.171-9.181"
                      id="SvgjsPath2301"
                    ></path>
                    <path
                      d="M6.806 26.777l-5.09 4.911"
                      id="SvgjsPath2299"
                    ></path>
                    <path
                      d="M.572 39.669l4.072-3.928"
                      id="SvgjsPath2297"
                    ></path>
                    <path d="M-.41 38.65l3.982 1.073" id="SvgjsPath2295"></path>
                    <path
                      d="M1.536 41.687l5.43-5.905 5.674.366"
                      id="SvgjsPath2293"
                    ></path>
                    <path
                      d="M11.625 36.866l3.111-6.159 1.073-4.123-1.669-1.678"
                      id="SvgjsPath2291"
                    ></path>
                    <path
                      d="M9.554 40.83l3.913-3.938 1.195-1.973"
                      id="SvgjsPath2289"
                    ></path>
                    <path d="M13.624 36.957l3 .098" id="SvgjsPath2287"></path>
                    <path
                      d="M16.679 33.989l3.984 1.003"
                      id="SvgjsPath2285"
                    ></path>
                    <path
                      d="M19.787 28.01l2.965 2.053"
                      id="SvgjsPath2283"
                    ></path>
                    <path
                      d="M11.84 24.866l.876 7.018"
                      id="SvgjsPath2281"
                    ></path>
                    <path
                      d="M10.841 24.849l-4.107 5.928 2.947 3.054"
                      id="SvgjsPath2279"
                    ></path>
                    <path d="M16.876 22.956l-.054 3" id="SvgjsPath2277"></path>
                    <path
                      d="M13.967 17.902l.637-2.99"
                      id="SvgjsPath2275"
                    ></path>
                    <path
                      d="M11.985 16.866l-1.892-6.036-5.736-1.103-4.253.26"
                      id="SvgjsPath2273"
                    ></path>
                    <path
                      d="M4.11 9.723l1.038-2.073 4.016-.837"
                      id="SvgjsPath2271"
                    ></path>
                    <path
                      d="M21.679 34.044l-1.784 4.971-4.306-.078 5.071-3.902"
                      id="SvgjsPath2269"
                    ></path>
                    <path
                      d="M34.858 24.278c1.711.484.666 2.012.648 3.013"
                      id="SvgjsPath2267"
                    ></path>
                    <path
                      d="M13.626 36.902l3.982 1.072"
                      id="SvgjsPath2265"
                    ></path>
                  </g>
                </svg>
                <svg
                  id="SvgjsSvg2263"
                  width="40"
                  height="40"
                  viewBox="0 0 289 205"
                  xmlns="http://www.w3.org/2000/svg"
                  y="0"
                >
                  <g id="SvgjsG2261" transform="matrix(-1,0,0,1,305,0)">
                    <path
                      fill="#222"
                      fillOpacity=".08"
                      d="M287 132l-71 72-195-77 73-31 193 36z"
                      id="SvgjsPath2259"
                    ></path>
                    <g
                      stroke="#fff"
                      strokeWidth="2"
                      fill="none"
                      id="SvgjsG2257"
                    >
                      <path
                        d="M23 112l2.024 2.227 7.976 8.773M23 31l1.41-1.41 2.59-2.59M23 50l2.118-2.118 10.882-10.882M23 69l2.07-2.164 19.93-20.836M19 91l2.059-2.176 32.941-34.824M18.126 109.874l44.874-44.874M23 121l2.148-2.105 47.852-46.895M33 122l2.33-1.902 46.67-38.098M69 106l2.243-1.994 15.757-14.006M23 126l2.749-1.207s38.251-16.793 45.251-19.793l24-9M22 95l2.119 2.119 19.881 19.881M20 74l2.095 2.152 34.905 35.848M19.972 56.351l47.028 50.649M22 40l2.152 2.083 59.848 57.917M19.972 19.71l74.028 76.29"
                        id="SvgjsPath2255"
                      ></path>
                    </g>
                    <g
                      stroke="#fff"
                      strokeWidth="2"
                      fill="none"
                      id="SvgjsG2253"
                    >
                      <path
                        d="M242 35l-21 20M212 145l32 33M213 128l40 40M213 110l49 49M213 91l57 58M216 72l64 65M214 50l64 65M217 38l44 45M220 27l8.669 8.886c10.444 10.705 23.331 26.114 23.331 26.114M239 26s12.945 36.647 22 56c7.945 16.981 27 52 27 52M247 47l-26 26M251 61l-30 30M256 73l-35 36M260 86l-40 42M268 97l-48 49M217 166l57-56M218 185l63-64M218 204l70-72M217 185l9 11M215 165l20 22"
                        id="SvgjsPath2251"
                      ></path>
                    </g>
                    <g
                      stroke="#fff"
                      strokeWidth="2"
                      fill="none"
                      id="SvgjsG2249"
                    >
                      <path
                        d="M94 96l121 24M92 17l-38 37M109 19l-45 45M126 20l-54 53M142 23l-60 59M158 24l-70 66M173 27l-71 71M190 28l-73 72M209 27l-76 76M224 30l-77 76M218 56l-58 54M221 71s-30.279 28.598-43 41M219 93l-26 23M219 108l-11 10M125 16l2.106 2.128 92.894 93.872M144 17l2.038 2.206 70.962 76.794M170 25l2.072 2.181 45.428 47.819M187 26l2.191 2.051 28.809 26.949M27 27l17-15M36 37l24-23M78 14l-33 32M25 7l2.117 2.117 90.883 90.883M48 9l2.044 2.208 84.956 91.792M69 14l2.106 2.128 92.894 93.872M87 14l2.123 2.123 97.877 97.877M106 16l2.107 2.128 99.893 100.872"
                        id="SvgjsPath2247"
                      ></path>
                    </g>
                    <path
                      fill="#fff"
                      d="M17 3h7v124h-7v-124zM214 29h9l-5 176-8-3 4-173zM21 3l200.018 20.794c1.094.114 1.982 1.102 1.982 2.204v7.003l-202-23v-7.001zM221 24h15.493c1.937 0 3.885 1.512 4.354 3.392l.153.608-23 3 3-7z"
                      id="SvgjsPath2245"
                    ></path>
                  </g>
                </svg>
                <svg
                  id="SvgjsSvg2243"
                  width="25"
                  height="25"
                  viewBox="0 0 178 138"
                  xmlns="http://www.w3.org/2000/svg"
                  y="5"
                  x="-6"
                >
                  <g
                    fill="none"
                    id="SvgjsG2241"
                    transform="matrix(-1,0,0,1,177.92700958251953,0)"
                  >
                    <g id="SvgjsG2239">
                      <path
                        d="M45.563 63.8l-5.037-1.39c.406 6.223 1.686 12.384 3.67 18.251 1.983 5.864 4.683 11.472 7.94 16.579 3.274 5.135 7.133 9.793 11.421 13.717 4.334 3.967 9.131 7.203 14.236 9.428l-.011-6.807c-4.394-1.904-8.527-4.675-12.269-8.073-3.706-3.367-7.044-7.366-9.881-11.777-2.822-4.391-5.162-9.21-6.883-14.252-1.721-5.044-2.831-10.336-3.186-15.676z"
                        id="SvgjsPath2237"
                        fill="#B80000"
                      ></path>
                      <path
                        d="M45.563 63.8c.354 5.34 1.465 10.632 3.187 15.676 1.721 5.042 4.061 9.861 6.883 14.252 2.837 4.411 6.175 8.41 9.881 11.777 3.741 3.398 7.875 6.169 12.269 8.073-4.394-1.904-8.527-4.675-12.269-8.073-3.706-3.367-7.044-7.366-9.881-11.777-2.822-4.391-5.162-9.21-6.883-14.252-1.722-5.044-2.832-10.336-3.187-15.676z"
                        id="SvgjsPath2235"
                        opacity=".51"
                        fill="#fff"
                      ></path>
                      <path
                        d="M77.793 120.385l.026 15.203 5.414 2.197.031-15.449.014-6.877.082-41.231-5.646-1.558.068 40.908.011 6.807zM77.624 18.333c-5.329-.835-10.305-.371-14.768 1.175-4.385 1.519-8.276 4.082-11.533 7.486-3.204 3.35-5.8 7.521-7.654 12.334-1.83 4.749-2.946 10.139-3.217 16.014.271-5.875 1.387-11.265 3.217-16.014 1.854-4.813 4.45-8.984 7.654-12.334 3.257-3.404 7.148-5.967 11.533-7.486 4.462-1.546 9.439-2.01 14.768-1.175zM45.551 56.687c.327-4.937 1.363-9.452 2.996-13.417 1.653-4.012 3.922-7.473 6.695-10.24 2.812-2.805 6.147-4.899 9.887-6.124 3.796-1.243 8.009-1.589 12.507-.869l-.013-7.704c-5.329-.835-10.305-.371-14.768 1.175-4.385 1.519-8.276 4.082-11.533 7.486-3.204 3.35-5.8 7.521-7.654 12.334-1.83 4.749-2.946 10.139-3.217 16.014l5.1 1.345zM77.636 26.037l.066 39.13 5.673 1.496.078-39.133.015-7.787.035-17.738-5.909-1.131.03 17.459.012 7.704z"
                        id="SvgjsPath2233"
                        fill="#B80000"
                      ></path>
                      <path
                        d="M83.278 115.459c4.502 1.132 8.828 1.205 12.815.328 4.049-.892 7.749-2.764 10.917-5.504 3.216-2.781 5.88-6.45 7.801-10.879 1.944-4.482 3.12-9.727 3.332-15.58-.212 5.854-1.388 11.098-3.332 15.58-1.921 4.429-4.585 8.098-7.801 10.879-3.169 2.74-6.868 4.612-10.917 5.504-3.987.877-8.313.804-12.815-.328z"
                        id="SvgjsPath2231"
                        opacity=".51"
                        fill="#fff"
                      ></path>
                      <path
                        d="M118.144 83.824c-.211 5.854-1.387 11.098-3.332 15.58-1.921 4.429-4.585 8.098-7.801 10.879-3.169 2.74-6.868 4.612-10.917 5.504-3.987.877-8.313.804-12.815-.328l-.014 6.877c5.275 1.468 10.362 1.68 15.065.755 4.789-.94 9.179-3.06 12.951-6.227 3.838-3.222 7.028-7.521 9.332-12.746 2.337-5.301 3.753-11.532 4.004-18.509l-6.473-1.785zM124.388 77.48c-.591-6.538-2.142-13.023-4.482-19.188-2.34-6.163-5.456-11.969-9.168-17.162-3.69-5.162-7.949-9.691-12.595-13.35-4.594-3.619-9.545-6.369-14.674-8.037 5.129 1.668 10.08 4.418 14.674 8.037 4.646 3.659 8.905 8.188 12.595 13.35 3.712 5.193 6.829 11 9.168 17.162 2.34 6.165 3.89 12.65 4.482 19.188zM83.453 27.53c4.286 1.513 8.412 3.89 12.238 6.958 3.862 3.096 7.405 6.884 10.485 11.175 3.096 4.313 5.711 9.118 7.705 14.211 1.994 5.096 3.357 10.457 3.956 15.877l6.552 1.729c-.591-6.538-2.142-13.023-4.482-19.188-2.34-6.163-5.456-11.969-9.168-17.162-3.69-5.162-7.949-9.691-12.595-13.35-4.594-3.619-9.545-6.369-14.674-8.037l-.017 7.787zM177.526 91.496l-53.138-14.016-6.552-1.728-34.461-9.089-5.673-1.496-32.151-8.48-5.1-1.345-40.05-10.564.445 6.684 39.68 10.948 5.037 1.39 32.151 8.87 5.646 1.558 34.784 9.596 6.472 1.785 52.542 14.496.368-8.609z"
                        id="SvgjsPath2229"
                        fill="#B80000"
                      ></path>
                    </g>
                    <g fill="#fff" opacity=".3" id="SvgjsG2227">
                      <path
                        d="M77.714 72.67l-32.15-8.87c.354 5.34 1.465 10.632 3.187 15.676 1.721 5.042 4.061 9.861 6.883 14.252 2.837 4.411 6.175 8.41 9.881 11.777 3.741 3.398 7.875 6.169 12.269 8.073l-.07-40.908zM77.636 26.037c-4.499-.721-8.711-.374-12.507.869-3.739 1.225-7.074 3.319-9.887 6.124-2.773 2.767-5.042 6.228-6.695 10.24-1.633 3.966-2.669 8.481-2.996 13.417l32.151 8.48-.066-39.13zM118.144 83.824l-34.784-9.597-.082 41.231c4.502 1.132 8.828 1.205 12.815.328 4.049-.892 7.749-2.764 10.917-5.504 3.216-2.781 5.88-6.45 7.801-10.879 1.945-4.481 3.121-9.725 3.333-15.579zM83.453 27.53l-.078 39.133 34.461 9.089c-.599-5.42-1.961-10.781-3.956-15.877-1.994-5.094-4.609-9.898-7.705-14.211-3.08-4.292-6.623-8.079-10.485-11.175-3.826-3.069-7.952-5.446-12.237-6.959z"
                        id="SvgjsPath2225"
                      ></path>
                    </g>
                  </g>
                </svg>
                <defs id="SvgjsDefs2453">
                  <linearGradient
                    x1="83.084%"
                    y1="25.765%"
                    x2="113.188%"
                    y2="38.749%"
                    id="SvgjsLinearGradient2451"
                  >
                    <stop
                      stopColor="#DAA58F"
                      offset="0%"
                      id="SvgjsStop2449"
                    ></stop>
                    <stop
                      stopColor="#87594C"
                      offset="100%"
                      id="SvgjsStop2447"
                    ></stop>
                  </linearGradient>
                  <linearGradient
                    x1="83.084%"
                    y1="26.144%"
                    x2="113.188%"
                    y2="38.925%"
                    id="SvgjsLinearGradient2445"
                  >
                    <stop
                      stopColor="#DAA58F"
                      offset="0%"
                      id="SvgjsStop2443"
                    ></stop>
                    <stop
                      stopColor="#87594C"
                      offset="100%"
                      id="SvgjsStop2441"
                    ></stop>
                  </linearGradient>
                </defs>
              </svg>
            )}
            {<BallTrack track={ballTrack} animate={isAnimating} />}
            {ballPos && (
              <g
                xmlns="http://www.w3.org/2000/svg"
                id="SVGIRIS_PITCH_XY"
                className="transition-transform duration-500"
                transform={`matrix(1,0,0,1, ${ballPos.x ?? lastBallPos.x}, ${
                  ballPos.y ?? lastBallPos.x
                })`}
              >
                <circle
                  id="SVGIRIS_PITCH_XY_FX"
                  r="2"
                  cx="0"
                  cy="0"
                  stroke={status?.team == 1 ? kitColors.home : kitColors.away}
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle
                  id="SVGIRIS_PITCH_XY_COL"
                  r="6"
                  cx="0"
                  cy="0"
                  fill={status?.team == 1 ? kitColors.home : kitColors.away}
                />
                <circle r="3" cx="0" cy="0" fill="#000000" />
              </g>
            )}
            {status?.status == "Goal" && (
              <g id="SVGIRIS_PITCH_FX">
                <g
                  id="SVGIRIS_PITCH_FX_H_GROUP"
                  opacity="1"
                  className={hockeyAnimation.leftScore}
                  transform="matrix(1,0,0,1,170,75)"
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
                      {data?.team_info?.home.score}
                    </tspan>
                  </text>
                  <rect
                    id="SVGIRIS_PITCH_FX_H_GROUP_RECT"
                    width="31.852153778076172"
                    height="3"
                    fill={kitColors.home}
                    x="-7.5"
                    y="29.110437393188477"
                  ></rect>
                </g>
                <g
                  id="SVGIRIS_PITCH_FX_A_GROUP"
                  opacity="1"
                  transform="matrix(1,0,0,1,218,75)"
                  className={hockeyAnimation.rightScore}
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
                      {data?.team_info?.away.score}
                    </tspan>
                  </text>
                  <rect
                    id="SVGIRIS_PITCH_FX_A_GROUP_RECT"
                    width="31.852153778076172"
                    height="3"
                    fill={kitColors.away}
                    x="-7.5"
                    y="29.110437393188477"
                  ></rect>
                </g>
              </g>
            )}
            <g
              xmlns="http://www.w3.org/2000/svg"
              id="SVGIRIS_PITCH_MATCHTIME"
              transform="translate(175, 0)"
            >
              <rect width="50" height="17" fill="#537ba3" />
              <text
                id="SVGIRIS_PITCH_MATCHTIME_TXT"
                x="25"
                y="13"
                fill="#ffffff"
                fontFamily="Roboto"
                fontSize="11px"
                fontWeight="300"
                letterSpacing="0px"
                textAnchor="middle"
                wordSpacing="0px"
                xmlSpace="preserve"
                style={{ userSelect: "none", cursor: "default" }}
                textRendering="optimizeLegibility"
              >
                {displayTime}
              </text>
            </g>
          </svg>
        </div>
        <div>
          <BottomBorderComponent data={data}></BottomBorderComponent>
        </div>
      </div>
      <div className="md:hidden">
        <ScrollMobilePitch data={data} />
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

export default HockeyPitch;
