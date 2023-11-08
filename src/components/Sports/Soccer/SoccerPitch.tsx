import React, { useEffect, useRef, useState } from "react"
import { FIELD_HEIGHT, FIELD_WIDTH } from "./constants";
import BallTrack from './PitchComponents/BallTrack';
import soccerAnimation from './soccerAnimation.module.css';

interface SoccerPitchInterface {
  data: any
}

//get event string from code
function getEventString(status: number): string {
  const statusCodes = [
    {
      status: 1000,
      name: "Dangerous Attack"
    },
    {
      status: 1001,
      name: "Attack"
    },
    {
      status: 1003,
      name: "Goal"
    },
    {
      status: 1005,
      name: "Yellow Card"
    },
    {
      status: 1006,
      name: "Red Card"
    },
    {
      status: 1012,
      name: "Shot Off Goal"
    },
    {
      status: 1011,
      name: "Shot On Goal"
    },
    {
      status: 1007,
      name: "Goal Kick"
    },
    {
      status: 1302,
      name: "Safe"
    },
    {
      status: 1002,
      name: "In possession"
    },
    {
      status: 1013,
      name: "Substitution"
    },
    {
      status: 1025,
      name: "Injury"
    },
    {
      status: 1234,
      name: "Offside"
    },
    {
      status: 1009,
      name: "Free Kick"
    },
    {
      status: 1010,
      name: "Free Kick"
    },
    {
      status: 11931,
      name: "Free Kick"
    },
    {
      status: 1933,
      name: "Free Kick"
    },
    {
      status: 1935,
      name: "Free Kick"
    },
    {
      status: 1932,
      name: "Free Kick"
    },
    {
      status: 1934,
      name: "Free Kick"
    },
    {
      status: 1936,
      name: "Free Kick"
    },
    {
      status: 1024,
      name: "Throw"
    },
    {
      status: 1004,
      name: "Corner"
    },
    {
      status: 1901,
      name: "Corner Top"
    },
    {
      status: 1902,
      name: "Corner Bottom"
    }
  ];
  const matchingCode = statusCodes.find(
    (code) => code.status == status
  );
  return matchingCode?.name ?? "";
}

//get data state to string
function getStatusFromCode(code: number): string | undefined {
  const soccerCodes = [
    {
      "code": 11000, "name": "Home Team Dangerous Attack"
    }, {
      "code": 21000, "name": "Away Team Dangerous Attack"
    }, {
      "code": 11001, "name": "Home Team Attack"
    }, {
      "code": 21001, "name": "Away Team Attack"
    }, {
      "code": 11002, "name": "Home Team In possession"
    }, {
      "code": 21002, "name": "Away Team In possession"
    }, {
      "code": 11004, "name": "Home Team Corner"
    }, {
      "code": 21004, "name": "Away Team Corner"
    }, {
      "code": 11007, "name": "Home Team Goal kick"
    }, {
      "code": 21007, "name": "Away Team Goal kick"
    },
    {
      "code": 11008,
      "name": "Home Team Penalty"
    },
    {
      "code": 21008,
      "name": "Away Team Penalty"
    },
    {
      "code": 11009,
      "name": "Home Team Direct free kick"
    },
    {
      "code": 21009,
      "name": "Away Team Direct free kick"
    },
    {
      "code": 11010,
      "name": "Home Team Simple free kick"
    },
    {
      "code": 21010,
      "name": "Away Team Simple free kick"
    },
    {
      "code": 11024,
      "name": "Home Team Throw"
    },
    {
      "code": 21024,
      "name": "Away Team Throw"
    },
    {
      "code": 10008,
      "name": "Home Team Penalty Score"
    },
    {
      "code": 20008,
      "name": "Away Team Penalty Score"
    },
    {
      "code": 10009,
      "name": "Home Team Penalty Miss"
    },
    {
      "code": 20009,
      "name": "Away Team Penalty Miss"
    },
    {
      "code": 10021,
      "name": "Home Team Penalty To Take"
    },
    {
      "code": 20021,
      "name": "Away Team Penalty To Take"
    },
    {
      "code": 11003,
      "name": "Home Team Goal"
    },
    {
      "code": 21003,
      "name": "Away Team Goal"
    },
    {
      "code": 11005,
      "name": "Home Team Yellow Card"
    },
    {
      "code": 21005,
      "name": "Away Team Yellow Card"
    },
    {
      "code": 11006,
      "name": "Home Team Red Card"
    },
    {
      "code": 21006,
      "name": "Away Team Red Card"
    },
    {
      "code": 11011,
      "name": "Home Team Shot on goal"
    },
    {
      "code": 21011,
      "name": "Away Team Shot on goal"
    },
    {
      "code": 11012,
      "name": "Home Team Shot off goal"
    }, {
      "code": 21012, "name": "Away Team Shot off goal"
    },
    {
      "code": 11013,
      "name": "Home Team Substitution"
    },
    {
      "code": 21013,
      "name": "Away Team Substitution"
    },
    {
      "code": 1014,
      "name": "Event Kick Off"
    },
    {
      "code": 1015,
      "name": "Half Time"
    },
    {
      "code": 1016,
      "name": "2nd Half"
    },
    {
      "code": 1017,
      "name": "Full Time"
    },
    {
      "code": 1018,
      "name": "Over Time - Kick Off"
    },
    {
      "code": 1019,
      "name": "Over Time - Half Time"
    },
    {
      "code": 1020,
      "name": "Over Time - 2nd Half"
    },
    {
      "code": 1021,
      "name": "Over Time - Full Time"
    },
    {
      "code": 1022,
      "name": "Penalty Shoot Out"
    },
    {
      "code": 1233,
      "name": "Match Info"
    },
    {
      "code": 1023,
      "name": "Penalty missed"
    },
    {
      "code": 11023,
      "name": "Home Team Penalty missed"
    },
    {
      "code": 21023,
      "name": "Away Team Penalty missed"
    }, {
      "code": 1025, "name": "Injury"
    }, {
      "code": 11025, "name": "Home Team Injury"
    }, {
      "code": 21025, "name": "Away Team Injury"
    }, {
      "code": 1237, "name": "Zoned Throw"
    }, {
      "code": 11237, "name": "Home Team Zoned Throw"
    }, {
      "code": 21237, "name": "Away Team Zoned Throw"
    }, {
      "code": 1234, "name": "Offside"
    }, {
      "code": 11234, "name": "Home Team Offside"
    }, {
      "code": 21234, "name": "Away Team Offside"
    }, {
      "code": 1238, "name": "Substitution"
    }, {
      "code": 11238, "name": "Home Team Substitution"
    }, {
      "code": 21238, "name": "Away Team Substitution"
    }, {
      "code": 1332, "name": "VAR - Reviewing Goal"
    }, {
      "code": 11332, "name": "Home Team VAR - Reviewing Goal"
    }, {
      "code": 21332, "name": "Away Team VAR - Reviewing Goal"
    }, {
      "code": 1331, "name": "VAR - Reviewing Red Card"
    }, {
      "code": 11331, "name": "Home Team VAR - Reviewing Red Card"
    }, {
      "code": 21331, "name": "Away Team VAR - Reviewing Red Card"
    }, {
      "code": 1333,
      "name": "VAR - Reviewing Penalty"
    },
    {
      "code": 11333,
      "name": "Home Team VAR - Reviewing Penalty"
    },
    {
      "code": 21333,
      "name": "Away Team VAR - Reviewing Penalty"
    },
    {
      "code": 1330,
      "name": "VAR - In Progress"
    },
    {
      "code": 11330,
      "name": "Home Team VAR - In Progress"
    },
    {
      "code": 21330,
      "name": "Away Team VAR - In Progress"
    },
    {
      "code": 11901,
      "name": "Home Team Corner - Top"
    },
    {
      "code": 11902,
      "name": "Home Team Corner - Bottom"
    },
    {
      "code": 21901,
      "name": "Away Team Corner - Top"
    },
    {
      "code": 21902,
      "name": "Away Team Corner - Bottom"
    },
    {
      "code": 11931,
      "name": "Home Team Freekick - Pos. 1"
    },
    {
      "code": 11933,
      "name": "Home Team Freekick - Pos. 2"
    },
    {
      "code": 11935,
      "name": "Home Team Freekick - Pos. 3"
    },
    {
      "code": 11932,
      "name": "Home Team Freekick - Pos. 4"
    },
    {
      "code": 11934,
      "name": "Home Team Freekick - Pos. 5"
    },
    {
      "code": 11936,
      "name": "Home Team Freekick - Pos. 6"
    },
    {
      "code": 21931, "name": "Away Team Freekick - Pos. 7"
    }, {
      "code": 21933, "name": "Away Team Freekick - Pos. 8"
    }, {
      "code": 21935, "name": "Away Team Freekick - Pos. 9"
    }, {
      "code": 21932, "name": "Away Team Freekick - Pos. 10"
    }, {
      "code": 21934, "name": "Away Team Freekick - Pos. 11"
    }, {
      "code": 21936, "name": "Away Team Freekick - Pos. 12"
    }, {
      "code": 11301, "name": "Home Team TakeOnAttack"
    }, {
      "code": 21300, "name": "Away Team TakeOnDangerousAttack"
    }, {
      "code": 11302, "name": "Home Team TakeOnSafePossession"
    }, {
      "code": 1026, "name": "InjuryTime"
    }, {
      "code": 1004, "name": "Corner"
    }, {
      "code": 21301, "name": "Away Team TakeOnAttack"
    }, {
      "code": 21016, "name": "Away Team Secondhalf"
    }, {
      "code": 11300, "name": "Home Team TakeOnDangerousAttack"
    }, {
      "code": 1000, "name": "Danger"
    }, {
      "code": 21026, "name": "Away Team InjuryTime"
    }, {
      "code": 11016, "name": "Home Team Secondhalf"
    }, {
      "code": 21302, "name": "Away Team TakeOnSafePossession"
    },
    {
      "code": 21014,
      "name": "Away Team Kickoff"
    },
    {
      "code": 11014,
      "name": "Home Team Kickoff"
    },
    {
      "code": 1005,
      "name": "YellowCard"
    },
    {
      "code": 21022, "name": "Away Team Penaltyshootout"
    }, {
      "code": 11022, "name": "Home Team Penaltyshootout"
    }, {
      "code": 1009, "name": "Dfreekick"
    }, {
      "code": 1003, "name": "Goal"
    }, {
      "code": 11026, "name": "Home Team InjuryTime"
    }
  ];

  const matchingCode = soccerCodes.find(
    (soccerCode) => soccerCode.code == code
  );
  return matchingCode?.name;
}

//get angle from ball to gate
function getAngleFromPos(ballPos: { x: number, y: number }, goalPos: { x: number, y: number }): number {
  const deltaX = goalPos.x - (ballPos?.x ?? 0);
  const deltaY = (ballPos?.y ?? 0) - goalPos.y;
  const angleRadians = Math.atan2(deltaY, deltaX);

  return angleRadians ?? 0;
}

//get ball position
function getBallPosition(data: any): any {
  let ballPos = data?.info?.ball_pos?.split(",");
  return ballPos ? { x: Number(ballPos[0]) * FIELD_WIDTH, y: Number(ballPos[1]) * FIELD_HEIGHT } : null;
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
  return team > 0
    && (status == 1000 || status == 1001 || status == 1002);
}

//whether clear trail
function isClearTrail(prevCode: number, curCode: number): boolean {
  return isShowTrailFromCode(curCode) == false || (getTeamFromCode(prevCode) != getTeamFromCode(curCode));
}

//match message
function getTeamMessage(code: number): { team: string, message: string } {
  let status = getStatusFromCode(code) ?? "";
  let left = status?.substring(0, 9);
  let right = status?.substring(9);
  if (left == "Home Team" || left == "Away Team") {
    return {
      team: left,
      message: right
    }
  }
  return {
    team: "Global",
    message: status
  }
}

//get team and event from state
function getState(code: number): any {
  const team = getTeamFromCode(code);
  const status = getEventFromCode(code);
  return {
    team: team,
    status: getEventString(status)
  };
}

//get kit colors of two teams
function getKitColors(data: any): { home: string, away: string } {
  let homeColors = data?.team_info?.home.kit_color.split(",") ?? ["#ff0000"];
  let awayColors = data?.team_info?.away.kit_color.split(",") ?? ["#ffffff"];
  for (let i = 0; i < homeColors.length; ++i)
    if (homeColors[i] != awayColors[i])
      return {
        home: homeColors[i],
        away: awayColors[i]
      }
  return {
    home: "#ff0000",
    away: "#ffffff"
  }
}

//position match message on attack
function getMessagePositionOnAttack(ballPos: { x: number, y: number }, team: number, status: string): { x: number, y: number } {
  let x, y;
  if (!ballPos && status == "Dangerous Attack") {
    return {
      x: team == 1 ? 320 : 80,
      y: 75
    }
  }
  if (!ballPos || team == 0)
    return {
      x: 200,
      y: 75
    }
  y = ballPos.y < 75 ? (ballPos.y + 20) : ballPos.y - 40;
  x = team == 1 ? ballPos.x - 10 : ballPos.x + 10;
  return {
    x: x,
    y: y
  }
}
//position match message on corner
function getMessagePositionOnCorner(ballPos: { x: number, y: number }, team: number): { x: number, y: number } {
  let x, y;
  if (!ballPos || team == 0)
    return {
      x: 200,
      y: 75
    }
  y = ballPos.y < 75 ? (ballPos.y + 20) : ballPos.y - 40;
  x = team == 1 ? ballPos.x - 40 : ballPos.x + 40;
  return {
    x: x,
    y: y
  }
}
//position match message on possession
function getMessagePositionOnPossession(ballPos: { x: number, y: number }, team: number): { x: number, y: number } {
  let y;
  if (!ballPos || team == 0)
    return {
      x: 200,
      y: 75
    }
  y = ballPos.y < 75 ? (ballPos.y + 20) : ballPos.y - 40;
  return {
    x: 200,
    y: y
  }
}
//position match message
function getMessagePosition(ballPos: { x: number, y: number }, team: number, status: string) {
  if (status == "Attack" || status == "Dangerous Attack" || status == "Free Kick") {
    let msgAttackPos = getMessagePositionOnAttack(ballPos, team, status);
    return {
      x: msgAttackPos.x ?? 200,
      y: msgAttackPos.y ?? 75
    }
  }
  if (isCorner(status)) {
    let msgAttackPos = getMessagePositionOnCorner(ballPos, team);
    return {
      x: msgAttackPos.x ?? 200,
      y: msgAttackPos.y ?? 75
    }
  }
  if (status == "In possession") {
    let msgPossessionPos = getMessagePositionOnPossession(ballPos, team);
    return {
      x: msgPossessionPos.x ?? 200,
      y: msgPossessionPos.y ?? 75
    }
  }
  return {
    x: 200,
    y: 75
  }
}
//is Corner
function isCorner(status: string): boolean {
  return status == "Corner" || status == "Corner Top" || status == "Corner Bottom";
}

//fix ball pos

function getFixedBallPos(ballPos: { x: number, y: number }, team: number, status: string): { x: number, y: number } | null {
  if (ballPos)
    return ballPos;
  if (status == "Corner") {
    return {
      x: team == 2 ? 0 : 400,
      y: team == 2 ? 0 : 175
    }
  }
  if (status == "Corner Top") {
    return {
      x: team == 2 ? 0 : 400,
      y: 0
    }
  }
  if (status == "Corner Bottom") {
    return {
      x: team == 2 ? 0 : 400,
      y: 175
    }
  }
  if (status == "Free Kick") {
    return {
      x: team == 1 ? 100 : 300,
      y: 75
    }
  }
  if (status == "Throw") {
    return {
      x: team == 1 ? 100 : 300,
      y: team == 1 ? 0 : 175
    }
  }
  return null;
}

const SoccerPitch: React.FC<SoccerPitchInterface> = ({ data }) => {
  if (Number(data.info.state) < 10000)
    console.log(">>>>soccer>>>", data);
  //Match Time
  const initialSeconds = data?.info?.seconds || "00:00";

  const [isTimerPaused, setTimerPaused] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(convertToSeconds(initialSeconds));

  const kitColors = getKitColors(data);


  const displayTime = isNaN(totalSeconds) ? "00:00" : formatTime(totalSeconds);

  if ((data?.core?.stopped === "1") && isTimerPaused == false) {
    setTimerPaused(true);
    setTotalSeconds(convertToSeconds(data?.info?.seconds));
  }
  if ((data?.core?.stopped === "0") && isTimerPaused == true) {
    setTotalSeconds(convertToSeconds(data?.info?.seconds));
    setTimerPaused(false);
  }

  useEffect(() => {
    let timerInterval: NodeJS.Timer | undefined;

    if (!isTimerPaused) {
      timerInterval = setInterval(() => {
        setTotalSeconds(prevTotalSeconds => prevTotalSeconds + 1);
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

  const homeGoalPos = { x: 0, y: 75 };
  const awayGoalPos = { x: 400, y: 75 };
  const homeCornerTarget = { x: 30, y: 75 };
  const awayCornerTarget = { x: 370, y: 75 };

  const status = getState(curCode);

  if (isShowTrailFromCode(curCode) && data?.info?.ball_pos && data?.info?.ball_pos != prevBallPos) {
    ballTrack.push(data.info.ball_pos);
    if (ballTrack.length > 6) {
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
  ballPos = getFixedBallPos(ballPos, status.team, status.status);
  const msgPos = getMessagePosition(ballPos, status.team, status.status);

  return (
    <>
      {/* Test board */}
      <div className="border-white border-2 p-2">
        <div className="columns-2 text-base">
          <div className="flex justify-between">
            <div className="text-white">{data?.team_info?.home.name}</div>
            <div className="text-yellow-300">{data?.team_info?.home.score}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-yellow-300">{data?.team_info?.away.score}</div>
            <div className="text-white">{data?.team_info?.away.name}</div>
          </div>
        </div>
        <div className="text-center text-base text-white">
          <p>Code: {data?.info?.state}</p>
          <p>State: {getStatusFromCode(data?.info?.state)}</p>
        </div>
      </div>
      {/* Live-Pitch */}
      <div id="pitch">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 400 180">
          <defs>
            <linearGradient id="ml1-Gradient1">
              <stop className="gradStart" offset="17.7%" style={{ stopOpacity: 0.4, stopColor: "rgb(24, 84, 53)" }}></stop>
              <stop className="gradEnd" offset="100%" style={{ stopOpacity: 0.4, stopColor: "rgb(24, 57, 36)" }}></stop>
            </linearGradient>
            <linearGradient id="ml1-Gradient11">
              <stop className="gradStart" offset="0%" style={{ stopOpacity: 0.4, stopColor: "rgb(24, 57, 36)" }}></stop>
              <stop className="gradEnd" offset="82.3%" style={{ stopOpacity: 0.4, stopColor: "rgb(24, 84, 53)" }}></stop>
            </linearGradient>
            <linearGradient id="ml1-Gradient2">
              <stop className="gradStart" offset="0%" style={{ stopOpacity: 0.4, stopColor: "rgb(79, 41, 26)" }}></stop>
              <stop className="gradEnd" offset="42.4%" style={{ stopOpacity: 0.4, stopColor: "rgb(24, 84, 53)" }}></stop>
            </linearGradient>
            <linearGradient id="ml1-Gradient21">
              <stop className="gradStart" offset="57.6%" style={{ stopOpacity: 0.4, stopColor: "rgb(24, 84, 53)" }}></stop>
              <stop className="gradEnd" offset="100%" style={{ stopOpacity: 0.4, stopColor: "rgb(79, 41, 26)" }}></stop>
            </linearGradient>
            <linearGradient id="ml1-SolidTeamColour">
              <stop id="ml1-SolidTeam1" offset="0%" stopColor="#FFDF1B"></stop>
              <stop id="ml1-SolidTeam2" offset="100%" stopColor="#FFDF1B"></stop>
            </linearGradient>
            <animate id="SVGIRIS_PITCH_XY_COL_ANIM1" xlinkHref="#SVGIRIS_PITCH_XY_COL" attributeName="r" from="6" to="4"
              dur="4s" values="6;6;4;6;6" keyTimes="0;0.4;0.5;0.6;1" repeatCount="indefinite"></animate>
            <animate id="SVGIRIS_PITCH_XY_FX_ANIM1" xlinkHref="#SVGIRIS_PITCH_XY_FX" attributeName="r" from="2" to="16"
              dur="1s" values="2;16;16" keyTimes="0;0.3;1" repeatCount="indefinite"></animate>
            <animate id="SVGIRIS_PITCH_XY_FX_ANIM2" xlinkHref="#SVGIRIS_PITCH_XY_FX" attributeName="opacity" from="1" to="0"
              dur="2s" values="1;0;0" keyTimes="0;0.2;1" repeatCount="indefinite"></animate>
          </defs>
          <g id="bg" fill="none" fillRule="evenodd">
            <rect id="bg-color" fill="#35713D" x="0" y="0" width="400" height="180"></rect>
            <rect stroke="#3D8246" strokeWidth="2" x="348" y="44" width="51" height="93"></rect>
            <rect stroke="#3D8246" strokeWidth="2" x="1" y="44" width="51" height="93"></rect>
            <path d="M199,3 L199,178 L199,179 L201,179 L201,178 L201,3 L201,2 L199,2 L199,3 L199,3 Z" fill="#3D8246"></path>
            <path d="M200,118 L200,118 C215.463973,118 228,105.463973 228,90 C228,74.536027 215.463973,62 200,62 C184.536027,62 172,74.536027 172,90 C172,105.463973 184.536027,118 200,118 L200,118 Z M200,120 L200,120 C183.431458,120 170,106.568542 170,90 C170,73.4314575 183.431458,60 200,60 C216.568542,60 230,73.4314575 230,90 C230,106.568542 216.568542,120 200,120 L200,120 Z" fill="#3D8246"></path>
            <circle fill="#3D8246" cx="200" cy="90" r="6"></circle>
            <path d="M74,63 C65.5522257,68.9666814 60,79.0570309 60,90.5 C60,101.942969 65.5522257,112.033319 74,118" stroke="#3D8246" strokeWidth="2" transform="translate(67.000000, 90.500000) scale(-1, 1) translate(-59.000000, -90.500000) "></path>
            <circle fill="#3D8246" cx="34" cy="90" r="3"></circle>
            <path d="M1,11 C6.5228475,11 11,6.5228475 11,1 L9.046875,1 C9.046875,5.44416635 5.44416635,9.046875 1,9.046875 L1,11 L1,11 Z" fill="#3D8246"></path>
            <path d="M1,171 C5.418278,171 9,174.581722 9,179 L11,179 C11,173.477153 6.5228475,169 1,169 L1,171 L1,171 Z" fill="#3D8246"></path>
            <path d="M337.884236,62 C328.64831,68.2472191 323,78.6467666 323,90 C323,101.353233 328.64831,111.752781 337.884236,118 L339,116.354082 C330.305144,110.472845 324.989964,100.686649 324.989964,90 C324.989964,79.3133507 330.305144,69.5271551 339,63.645918 L337.884236,62 L337.884236,62 Z" transform="translate(9,0)" fill="#3D8246"></path>
            <rect stroke="#3D8246" strokeWidth="2" x="1" y="69" width="16" height="41"></rect>
            <path d="M399,69 L383,69 L383,110 L399,110 L399,69 L399,69 Z" stroke="#3D8246" strokeWidth="2"></path>
            <circle fill="#3D8246" cx="365" cy="90" r="3"></circle>
            <path d="M399,9.046875 C394.555834,9.046875 390.953125,5.44416635 390.953125,1 L389,1 C389,6.5228475 393.477153,11 399,11 L399,9.046875 L399,9.046875 Z" fill="#3D8246"></path>
            <path d="M399,169 C393.477153,169 389,173.477153 389,179 L391,179 C391,174.581722 394.581722,171 399,171 L399,169 L399,169 Z" fill="#3D8246"></path><rect stroke="#3D8246" strokeWidth="2" x="1" y="1" width="398" height="178"></rect>
          </g>

          {
            (status?.team == 2 && (status?.status == "Safe" || status?.status == "In possession")) &&
            <g id="away_safe">
              <rect x="200" y="0" fill="#183924" fillOpacity="0.4" width="200" height="180"></rect>
            </g>
          }
          {
            (status?.team == 1 && (status?.status == "Safe" || status?.status == "In possession")) &&
            <g id="home_safe">
              <rect x="0" y="0" fill="#183924" fillOpacity="0.4" width="200" height="180"></rect>
            </g>
          }
          {
            (status?.team == 1 && status?.status == "Dangerous Attack") &&
            <g id="SVGIRIS_PITCH_FX_DNGR_0" className="transition-transform duration-500" transform={`matrix(1,0,0,1,${Math.min((ballPos?.x ?? 320) - 370), -5},0)`}>
              <polygon id="SvgjsPolygon3649" points="388,0 400,30 388,60 400,90 388,120 400,150 388,180 0,180 0,0"
                fill="url(#ml1-Gradient21)"></polygon>
            </g>
          }
          {
            (status?.team == 2 && status?.status == "Dangerous Attack") &&
            <g id="SVGIRIS_PITCH_FX_DNGR_1" transform={`matrix(1,0,0,1,${Math.max((ballPos?.x ?? 80) - 20, 5)},0)`}>
              <polygon id="SvgjsPolygon2003" points="12,0 0,30 12,60 0,90 12,120 0,150 12,180 400,180 400,0"
                fill="url(#ml1-Gradient2)"></polygon>
            </g>
          }

          {
            (status?.team == 1 && status?.status == "Attack") &&
            < g id="SVGIRIS_PITCH_FX_ATTK_0" className="transition-transform duration-500" transform={`matrix(1,0,0,1,${(ballPos?.x ?? 190) - 350},0)`}>
              <polygon id="SvgjsPolygon2060" points="388,0 400,30 388,60 400,90 388,120 400,150 388,180 0,180 0,0"
                fill="url(#ml1-Gradient11)"></polygon>
            </g>
          }
          {
            (status?.team == 2 && status?.status == "Attack") &&
            <g id="SVGIRIS_PITCH_FX_ATTK_1" className={"transition-transform duration-500" + status?.status == "Goal " ? " goal" : ""} transform={`matrix(1,0,0,1,${(ballPos?.x ?? 190) - 20},0)`}>
              <polygon id="SvgjsPolygon1224" points="12,0 0,30 12,60 0,90 12,120 0,150 12,180 400,180 400,0"
                fill="url(#ml1-Gradient1)"></polygon>
            </g>
          }

          {
            (teamMessage && teamMessage.team == "Global") &&
            <g className="transition-transform duration-500" transform={`translate(${msgPos?.x},${msgPos?.y})`}>
              {/* <rect id="home_bg" x="-2.5" y="0" fill="#f0f0f0" width="2.5" height="30"></rect> */}
              {/* <text id="home_team" transform="translate(-10 10)" textAnchor="end" fill="#12e096" fontSize="13px">{data?.team_info?.home.name}</text> */}
              <text y="0" textAnchor="middle" fill="#f0f0f0" fontWeight="bold" fontSize="15px">{teamMessage?.message}</text>
            </g>
          }
          {
            (teamMessage && teamMessage.team == "Home Team") &&
            <g id="home" opacity={status?.status == "Goal" ? 0 : 1} className={status?.status == "Goal" ? soccerAnimation.goal : "transition-transform duration-500"} transform={`translate(${msgPos?.x},${msgPos?.y})`}>
              <rect id="home_bg" x="-2.5" y="0" fill={kitColors.home} width="2.5" height="30"></rect>
              <text id="home_team" transform="translate(-10 10)" textAnchor="end" fill="#12e096" fontSize="13px">{data?.team_info?.home.name}</text>
              <text id="home_action" transform="translate(-10 28)" textAnchor="end" fill="#f0f0f0" fontWeight="bold" fontSize="15px">{teamMessage?.message}</text>
            </g>
          }
          {
            (teamMessage && teamMessage.team == "Away Team") &&
            <g id="away" opacity={status?.status == "Goal" ? 0 : 1} className={status?.status == "Goal" ? soccerAnimation.goal : "transition-transform duration-500"} transform={`translate(${msgPos?.x},${msgPos?.y})`}>
              <rect id="away_bg" x="0" y="0" fill={kitColors.away} width="2.5" height="30"></rect>
              <text id="away_team" transform="translate(10 10)" fill="#12e096" fontSize="13px">{data?.team_info?.away.name}</text>
              <text id="away_action" transform="translate(10 28)" fill="#f0f0f0" fontWeight="bold" fontSize="15px">{teamMessage?.message}</text>
            </g>
          }
          {
            (status?.team == 1 && status?.status == "Goal Kick") &&
            <g id="goal_kick" transform={`matrix(1,0,0,1,${ballPos?.x ?? 20}, ${ballPos?.y ?? 100})`}>
              <path id="goal_kick_3" className={soccerAnimation.kick2} fill="#165031" fillOpacity="0.3" d="M94.703,73.698C110.554,53.359,120,27.784,120,0c0-27.764-9.433-53.321-25.262-73.653L0,0.036L94.703,73.698z"></path>
              <path id="goal_kick_2" className={soccerAnimation.kick1} fill="#165031" fillOpacity="0.5" d="M62.325,48.514C72.765,35.123,79,18.294,79,0c0-18.274-6.222-35.085-16.639-48.469L0,0.036L62.325,48.514z"></path>
              <path id="goal_kick_1" className={soccerAnimation.kick0} fill="#165031" fillOpacity="0.7" d="M30.759,23.961C35.918,17.349,39,9.037,39,0c0-9.017-3.068-17.311-8.205-23.917L0,0.036L30.759,23.961z"></path>
              <circle fill="#FFFFFF" r="4" cx="0" cy="0"></circle>
            </g>
          }
          {
            (status?.team == 2 && status?.status == "Goal Kick") &&
            <g id="SVGIRIS_PITCH_FX_GKIK" transform={`matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,${ballPos?.x ?? 382},${ballPos?.y ?? 68})`}
              opacity="1">
              <path id="SvgjsPath1067" fillOpacity="0.3" className={soccerAnimation.kick2} fill="#165031"
                d="M94.703,73.698C110.554,53.359,120,27.784,120,0c0-27.764-9.433-53.321-25.262-73.653L0,0.036L94.703,73.698z"
                style={{ opacity: 0.3 }} transform="matrix(1.0000000000000004,0,0,1.0000000000000004,0,1.0408340855860843e-17)"
                opacity="0.3"></path>
              <path id="SvgjsPath1065" fillOpacity="0.5" className={soccerAnimation.kick1} fill="#165031"
                d="M62.325,48.514C72.765,35.123,79,18.294,79,0c0-18.274-6.222-35.085-16.639-48.469L0,0.036L62.325,48.514z"
                transform="matrix(1.0000000000000004,0,0,1.0000000000000004,0,1.0408340855860843e-17)"
                opacity="0.3"></path>
              <path id="SvgjsPath1063" fillOpacity="0.7" className={soccerAnimation.kick0} fill="#165031"
                d="M30.759,23.961C35.918,17.349,39,9.037,39,0c0-9.017-3.068-17.311-8.205-23.917L0,0.036L30.759,23.961z"
                transform="matrix(1.0000000000000004,0,0,1.0000000000000004,0,0)" opacity="0.8"></path>
              <circle fill="#FFFFFF" r="4" cx="0" cy="0"></circle>
            </g>
          }
          {
            (status?.team == 1 && status?.status == "Free Kick") &&
            <g id="kick" transform={`matrix(${Math.cos(getAngleFromPos(ballPos, awayGoalPos))},
                                    ${-Math.sin(getAngleFromPos(ballPos, awayGoalPos))},
                                    ${Math.sin(getAngleFromPos(ballPos, awayGoalPos))},
                                    ${Math.cos(getAngleFromPos(ballPos, awayGoalPos))},${ballPos?.x ?? lastBallPos?.x}, 
                                    ${ballPos?.y ?? lastBallPos?.y})`}>
              <path id="kick_3" className={soccerAnimation.kick2} fill="#165031" fillOpacity="0.3" d="M0.031,0.013l117.647,45.045C123.041,31.064,126,15.881,126,0s-2.959-31.065-8.322-45.059L0.093-0.036L0.031,0.013z"></path>
              <path id="kick_2" className={soccerAnimation.kick1} fill="#165031" fillOpacity="0.5" d="M0.031,0.013l77.43,29.647c3.536-9.21,5.488-19.204,5.488-29.66s-1.952-20.45-5.487-29.66L0.093-0.036L0.031,0.013z"></path>
              <path id="kick_1" className={soccerAnimation.kick0} fill="#165031" fillOpacity="0.7" d="M0.031,0.013l38.208,14.629c1.746-4.546,2.71-9.48,2.71-14.642s-0.964-10.096-2.709-14.642L0.093-0.036L0.031,0.013z"></path>
              <circle fill="#FFFFFF" r="4" cx="0" cy="0"></circle>
            </g>
          }
          {
            (status?.team == 2 && status?.status == "Free Kick") &&
            <g id="kick" transform={`matrix(${Math.cos(getAngleFromPos(ballPos, homeGoalPos))},
                                    ${-Math.sin(getAngleFromPos(ballPos, homeGoalPos))},
                                    ${Math.sin(getAngleFromPos(ballPos, homeGoalPos))},
                                    ${Math.cos(getAngleFromPos(ballPos, homeGoalPos))},${ballPos?.x ?? lastBallPos?.x}, 
                                    ${ballPos?.y ?? lastBallPos?.x})`}>
              <path id="kick_3" className={soccerAnimation.kick2} fill="#165031" fillOpacity="0.3" d="M0.031,0.013l117.647,45.045C123.041,31.064,126,15.881,126,0s-2.959-31.065-8.322-45.059L0.093-0.036L0.031,0.013z"></path>
              <path id="kick_2" className={soccerAnimation.kick1} fill="#165031" fillOpacity="0.5" d="M0.031,0.013l77.43,29.647c3.536-9.21,5.488-19.204,5.488-29.66s-1.952-20.45-5.487-29.66L0.093-0.036L0.031,0.013z"></path>
              <path id="kick_1" className={soccerAnimation.kick0} fill="#165031" fillOpacity="0.7" d="M0.031,0.013l38.208,14.629c1.746-4.546,2.71-9.48,2.71-14.642s-0.964-10.096-2.709-14.642L0.093-0.036L0.031,0.013z"></path>
              <circle fill="#FFFFFF" r="4" cx="0" cy="0"></circle>
            </g>
          }
          {
            (status?.team == 1 && isCorner(status?.status)) &&
            <g id="kick" transform={`matrix(${Math.cos(getAngleFromPos(ballPos, awayCornerTarget))},
                                    ${-Math.sin(getAngleFromPos(ballPos, awayCornerTarget))},
                                    ${Math.sin(getAngleFromPos(ballPos, awayCornerTarget))},
                                    ${Math.cos(getAngleFromPos(ballPos, awayCornerTarget))},${ballPos?.x ?? lastBallPos?.x}, 
                                    ${ballPos?.y ?? lastBallPos?.y})`}>
              <path id="kick_3" className={soccerAnimation.kick2} fill="#165031" fillOpacity="0.3" d="M0.031,0.013l117.647,45.045C123.041,31.064,126,15.881,126,0s-2.959-31.065-8.322-45.059L0.093-0.036L0.031,0.013z"></path>
              <path id="kick_2" className={soccerAnimation.kick1} fill="#165031" fillOpacity="0.5" d="M0.031,0.013l77.43,29.647c3.536-9.21,5.488-19.204,5.488-29.66s-1.952-20.45-5.487-29.66L0.093-0.036L0.031,0.013z"></path>
              <path id="kick_1" className={soccerAnimation.kick0} fill="#165031" fillOpacity="0.7" d="M0.031,0.013l38.208,14.629c1.746-4.546,2.71-9.48,2.71-14.642s-0.964-10.096-2.709-14.642L0.093-0.036L0.031,0.013z"></path>
              <circle fill="#FFFFFF" r="4" cx="0" cy="0"></circle>
            </g>
          }
          {
            (status?.team == 2 && isCorner(status?.status)) &&
            <g id="kick" transform={`matrix(${Math.cos(getAngleFromPos(ballPos, homeCornerTarget))},
                                    ${-Math.sin(getAngleFromPos(ballPos, homeCornerTarget))},
                                    ${Math.sin(getAngleFromPos(ballPos, homeCornerTarget))},
                                    ${Math.cos(getAngleFromPos(ballPos, homeCornerTarget))},${ballPos?.x ?? lastBallPos?.x}, 
                                    ${ballPos?.y ?? lastBallPos?.y})`}>
              <path id="kick_3" className={soccerAnimation.kick2} fill="#165031" fillOpacity="0.3" d="M0.031,0.013l117.647,45.045C123.041,31.064,126,15.881,126,0s-2.959-31.065-8.322-45.059L0.093-0.036L0.031,0.013z"></path>
              <path id="kick_2" className={soccerAnimation.kick1} fill="#165031" fillOpacity="0.5" d="M0.031,0.013l77.43,29.647c3.536-9.21,5.488-19.204,5.488-29.66s-1.952-20.45-5.487-29.66L0.093-0.036L0.031,0.013z"></path>
              <path id="kick_1" className={soccerAnimation.kick0} fill="#165031" fillOpacity="0.7" d="M0.031,0.013l38.208,14.629c1.746-4.546,2.71-9.48,2.71-14.642s-0.964-10.096-2.709-14.642L0.093-0.036L0.031,0.013z"></path>
              <circle fill="#FFFFFF" r="4" cx="0" cy="0"></circle>
            </g>
          }
          {
            (status?.team == 1 && status?.status == "Throw") &&
            <g id="throw" transform={`matrix(${Math.cos(getAngleFromPos(ballPos, awayGoalPos))},
              ${-Math.sin(getAngleFromPos(ballPos, awayGoalPos))},
              ${Math.sin(getAngleFromPos(ballPos, awayGoalPos))},
              ${Math.cos(getAngleFromPos(ballPos, awayGoalPos))},${ballPos?.x ?? lastBallPos?.x}, 
              ${ballPos?.y ?? lastBallPos?.x})`}>
              <path id="throw_2" fillOpacity="0.3" className={soccerAnimation.kick0} fill="#165031" d="M53.033,53.068c29.289-29.289,29.289-76.777,0-106.066L0,0.035L53.033,53.068z"></path>
              <path id="throw_1" fillOpacity="0.7" className={soccerAnimation.kick1} fill="#165031" d="M26.517,26.552c14.646-14.645,14.644-38.39,0-53.033L0,0.035L26.517,26.552z"></path>
              <circle fill="#FFFFFF" r="4" cx="0" cy="0"></circle>
            </g>
          }
          {
            (status?.team == 2 && status?.status == "Throw") &&
            <g id="throw" transform={`matrix(${Math.cos(getAngleFromPos(ballPos, homeGoalPos))},
              ${-Math.sin(getAngleFromPos(ballPos, homeGoalPos))},
              ${Math.sin(getAngleFromPos(ballPos, homeGoalPos))},
              ${Math.cos(getAngleFromPos(ballPos, homeGoalPos))},${ballPos?.x}, 
              ${ballPos?.y})`}>
              <path id="throw_2" fillOpacity="0.3" className={soccerAnimation.kick0} fill="#165031" d="M53.033,53.068c29.289-29.289,29.289-76.777,0-106.066L0,0.035L53.033,53.068z"></path>
              <path id="throw_1" fillOpacity="0.7" className={soccerAnimation.kick1} fill="#165031" d="M26.517,26.552c14.646-14.645,14.644-38.39,0-53.033L0,0.035L26.517,26.552z"></path>
              <circle fill="#FFFFFF" r="4" cx="0" cy="0"></circle>
            </g>
          }
          {
            (status?.team == 1 && status?.status == "Goal") &&
            <g id="goal" opacity="0" className={soccerAnimation.goal} transform={`matrix(1,0,0,1,210,65)`}>
              <g id="goal_boll">
                <path d="M13.47,34.77a11.39,11.39,0,0,0,11-11.62,11.39,11.39,0,0,0-11-11.62A11.7,11.7,0,0,0,1.39,22.86a2.81,2.81,0,0,0,0,.29,11.72,11.72,0,0,0,11.8,11.63Z" fill="#f8f8f8" stroke="#525252" strokeMiterlimit="2.6" strokeWidth="0.32"></path>
                <path d="M16.57,12.61l-2,2-.93.93M22,21.76a16.61,16.61,0,0,0-3.1-2.17A14.87,14.87,0,0,0,15,18.5m-3.88,2.33a11.4,11.4,0,0,0,0,3.4l1.09,3.41m3.87,2.17A6.51,6.51,0,0,0,20,28.73a8.43,8.43,0,0,0,2.48-2.95M2.62,22.22a5.67,5.67,0,0,1,2.17-2.48A9.85,9.85,0,0,1,8.28,18.5m-2-4.8c1.71-.47,3.26,2.17,3.26,2.17m-6,10.53A6.64,6.64,0,0,0,6,29,10.94,10.94,0,0,0,9.36,30m5.12,2.94.77,1.86m-4.18-2-.78,2" fill="none" stroke="gray" strokeMiterlimit="2.6" strokeWidth="0.42"></path>
                <path d="M15.48,18.66l-4,2.94-4-2.94,1.71-4h5Zm-.31,15,1.4-4-4-2.95-4,2.95,1.7,4ZM1.54,21.45H3.4l.92,5.88L2.78,28.88a6,6,0,0,1-1.24-3.41A15,15,0,0,1,1.54,21.45Zm22-2.48-3.1,2.48.93,5.26,2.79-.77a10.72,10.72,0,0,0,.16-3.87A13.55,13.55,0,0,0,23.54,19ZM15.48,13.7l4-.62a7.71,7.71,0,0,0-1.94-.93,7.27,7.27,0,0,0-2-.47Z" fill="#1a1a1a"></path>
              </g>
              <g id="goal_gate">
                <path d="M1.79.3s11,5,17.36,7.9,9.76,5,13.64,7c3.41,1.7,7,2.32,6.82,7S38.52,27.42,36,29.74A47.88,47.88,0,0,1,25.5,37c-3.41,1.86-7,7-7,7" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M21.79,9.75a95.28,95.28,0,0,0-9-3.25,71.08,71.08,0,0,1-11-4.19" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M8,3.24s1.09,2.17.62,2.33S6,4.17,5.36,3.24a1.76,1.76,0,0,1-.47-1.7" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M3.65,3.4l.93,3.1" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M1.64,5.41,11.56,9.6" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M8.77,5.57c0-.47,1.55,3.25,3.72,4.8s6.66,4.19,6.66,4.19l3.25,4.8,6.36,1.55,4.49-2.79s6.82-.15,6.51,2.95S34,27.26,32.32,28.35a19.7,19.7,0,0,0-6.82,8.52" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M33.41,32.38l-.31-4L27.83,27l-6.51,2.79-3.25,5.43a17.7,17.7,0,0,0-5.74,3.41c-2.79,2.48-5.42,5-5.42,5" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M33.72,18.12a69.43,69.43,0,0,1-6.67-2.63l-3.41-1.55a14.87,14.87,0,0,1-4.33-2.33c-1.24-1.24-3.57-3.87-3.57-3.87" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M16.67,8.67l4.19,9.14,3.4-3.87S20.08,9.29,21,9.29s12.55,8.83,12.55,8.83" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M11.71,6.65l2.95,5" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M28.45,20.91a14.47,14.47,0,0,1,.15,2.79A17.58,17.58,0,0,1,27.52,28" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M26.9,33.46l-5.27,2.79s-.15,1.4-2.48,2.64l-4.8,3.87H13.11l3.1-4.18a37,37,0,0,1,3.72-2.48l3.25-4.81,6.2-1.08A30.36,30.36,0,0,1,27.83,27" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M20.24,38h-2" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M27.36,33l-5-.16" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M28.45,24s-1.86.31-5,.77a20.08,20.08,0,0,1-5.42-.15l-3.41-5.11L12.8,18.43c-.16,0-2.17-.31-2.17-.31L5.82,12.7,1.64,8.05l.62-.78,7.9,4.81a15.3,15.3,0,0,1,3.1,2.32A11.6,11.6,0,0,1,15,16.57l4.49.78,3.41,2.17-4.49,2.32-3.26-.77-5.27,2L8.77,20.76H5.67l-4.19-5L5.2,11.92" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M10.47,17.66l-2,2.94" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M1.48,15.49l2.33,7.28,2.94,5.89H10l1.86-2.33,3.25.47,3-2.64.31-2.63" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M7.22,29.59l1.86-6.05,2.17,3.57" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M5.36,20.6,3.65,22.92l-2.32.62" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M.24,33l2.48-.31,1.71,5.89h2l4-3.26s3.41-.62,4.65-2.17l5.43-2.79.15-4.65-9,5.89L4.43,38.27,7.68,29" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M7.37,28.66l-5.11,5" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M1,41.68l4-4" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M.09,40.59l4,1.09" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M2,43.69,7.37,37.8l5.74.31" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M12.18,38.73l3.1-6.2,1.08-4.18-1.7-1.71" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M10,42.76l3.87-4,1.24-2" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M14.19,38.89l3,.15" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M17.29,35.94l4,1.09" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M20.39,29.9l2.94,2" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M12.33,26.8l.93,7.13" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M11.4,26.64,7.22,32.53l2.94,3.1" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M17.45,24.78v2.95" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M14.5,19.67l.62-2.94" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M12.49,18.74l-1.86-6L4.89,11.61l-4.34.31" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M4.58,11.46l1.09-2,4-.77" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M22.25,35.94l-1.86,5-4.34-.15,5.12-3.88" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M35.58,26.18c1.7.46.62,2,.62,3.1" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M14.19,38.89l4,1.08" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
              </g>
            </g>
          }
          {
            (status?.team == 2 && status?.status == "Goal") &&
            <g id="goal" opacity="0" className={soccerAnimation.goal} transform={`matrix(-1,0,0,-1,190,110)`}>
              <g id="goal_boll">
                <path d="M13.47,34.77a11.39,11.39,0,0,0,11-11.62,11.39,11.39,0,0,0-11-11.62A11.7,11.7,0,0,0,1.39,22.86a2.81,2.81,0,0,0,0,.29,11.72,11.72,0,0,0,11.8,11.63Z" fill="#f8f8f8" stroke="#525252" strokeMiterlimit="2.6" strokeWidth="0.32"></path>
                <path d="M16.57,12.61l-2,2-.93.93M22,21.76a16.61,16.61,0,0,0-3.1-2.17A14.87,14.87,0,0,0,15,18.5m-3.88,2.33a11.4,11.4,0,0,0,0,3.4l1.09,3.41m3.87,2.17A6.51,6.51,0,0,0,20,28.73a8.43,8.43,0,0,0,2.48-2.95M2.62,22.22a5.67,5.67,0,0,1,2.17-2.48A9.85,9.85,0,0,1,8.28,18.5m-2-4.8c1.71-.47,3.26,2.17,3.26,2.17m-6,10.53A6.64,6.64,0,0,0,6,29,10.94,10.94,0,0,0,9.36,30m5.12,2.94.77,1.86m-4.18-2-.78,2" fill="none" stroke="gray" strokeMiterlimit="2.6" strokeWidth="0.42"></path>
                <path d="M15.48,18.66l-4,2.94-4-2.94,1.71-4h5Zm-.31,15,1.4-4-4-2.95-4,2.95,1.7,4ZM1.54,21.45H3.4l.92,5.88L2.78,28.88a6,6,0,0,1-1.24-3.41A15,15,0,0,1,1.54,21.45Zm22-2.48-3.1,2.48.93,5.26,2.79-.77a10.72,10.72,0,0,0,.16-3.87A13.55,13.55,0,0,0,23.54,19ZM15.48,13.7l4-.62a7.71,7.71,0,0,0-1.94-.93,7.27,7.27,0,0,0-2-.47Z" fill="#1a1a1a"></path>
              </g>
              <g id="goal_gate">
                <path d="M1.79.3s11,5,17.36,7.9,9.76,5,13.64,7c3.41,1.7,7,2.32,6.82,7S38.52,27.42,36,29.74A47.88,47.88,0,0,1,25.5,37c-3.41,1.86-7,7-7,7" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M21.79,9.75a95.28,95.28,0,0,0-9-3.25,71.08,71.08,0,0,1-11-4.19" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M8,3.24s1.09,2.17.62,2.33S6,4.17,5.36,3.24a1.76,1.76,0,0,1-.47-1.7" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M3.65,3.4l.93,3.1" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M1.64,5.41,11.56,9.6" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M8.77,5.57c0-.47,1.55,3.25,3.72,4.8s6.66,4.19,6.66,4.19l3.25,4.8,6.36,1.55,4.49-2.79s6.82-.15,6.51,2.95S34,27.26,32.32,28.35a19.7,19.7,0,0,0-6.82,8.52" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M33.41,32.38l-.31-4L27.83,27l-6.51,2.79-3.25,5.43a17.7,17.7,0,0,0-5.74,3.41c-2.79,2.48-5.42,5-5.42,5" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M33.72,18.12a69.43,69.43,0,0,1-6.67-2.63l-3.41-1.55a14.87,14.87,0,0,1-4.33-2.33c-1.24-1.24-3.57-3.87-3.57-3.87" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M16.67,8.67l4.19,9.14,3.4-3.87S20.08,9.29,21,9.29s12.55,8.83,12.55,8.83" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M11.71,6.65l2.95,5" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M28.45,20.91a14.47,14.47,0,0,1,.15,2.79A17.58,17.58,0,0,1,27.52,28" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M26.9,33.46l-5.27,2.79s-.15,1.4-2.48,2.64l-4.8,3.87H13.11l3.1-4.18a37,37,0,0,1,3.72-2.48l3.25-4.81,6.2-1.08A30.36,30.36,0,0,1,27.83,27" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M20.24,38h-2" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M27.36,33l-5-.16" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M28.45,24s-1.86.31-5,.77a20.08,20.08,0,0,1-5.42-.15l-3.41-5.11L12.8,18.43c-.16,0-2.17-.31-2.17-.31L5.82,12.7,1.64,8.05l.62-.78,7.9,4.81a15.3,15.3,0,0,1,3.1,2.32A11.6,11.6,0,0,1,15,16.57l4.49.78,3.41,2.17-4.49,2.32-3.26-.77-5.27,2L8.77,20.76H5.67l-4.19-5L5.2,11.92" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M10.47,17.66l-2,2.94" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M1.48,15.49l2.33,7.28,2.94,5.89H10l1.86-2.33,3.25.47,3-2.64.31-2.63" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M7.22,29.59l1.86-6.05,2.17,3.57" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M5.36,20.6,3.65,22.92l-2.32.62" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M.24,33l2.48-.31,1.71,5.89h2l4-3.26s3.41-.62,4.65-2.17l5.43-2.79.15-4.65-9,5.89L4.43,38.27,7.68,29" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M7.37,28.66l-5.11,5" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M1,41.68l4-4" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M.09,40.59l4,1.09" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M2,43.69,7.37,37.8l5.74.31" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M12.18,38.73l3.1-6.2,1.08-4.18-1.7-1.71" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M10,42.76l3.87-4,1.24-2" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M14.19,38.89l3,.15" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M17.29,35.94l4,1.09" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M20.39,29.9l2.94,2" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M12.33,26.8l.93,7.13" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M11.4,26.64,7.22,32.53l2.94,3.1" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M17.45,24.78v2.95" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M14.5,19.67l.62-2.94" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M12.49,18.74l-1.86-6L4.89,11.61l-4.34.31" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M4.58,11.46l1.09-2,4-.77" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M22.25,35.94l-1.86,5-4.34-.15,5.12-3.88" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M35.58,26.18c1.7.46.62,2,.62,3.1" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
                <path d="M14.19,38.89l4,1.08" fill="none" stroke="#fff" strokeMiterlimit="2.6" strokeWidth="0.65"></path>
              </g>
            </g>
          }
          {
            (status?.team == 1 && status?.status == "Offside") &&
            <g id="offside" transform={`matrix(1, 0, 0, 1, 210, 75)`}>
              <path d="M0,0H2.7V32.7H0Z" fill="#e3e3e3"></path>
              <path d="M2.7.1H19.1V16.5H2.7Z" fill="#d4ec3d"></path>
              <path d="M10.9,8.1h8.2v8.2H10.9Z" fill="#a10808"></path>
              <path d="M2.7,0h8.2V8.2H2.7Z" fill="#a10808"></path>
            </g>
          }
          {
            (status?.team == 2 && status?.status == "Offside") &&
            <g id="offside" transform={`matrix(-1, 0, 0, 1,190, 75)`}>
              <path d="M0,0H2.7V32.7H0Z" fill="#e3e3e3"></path>
              <path d="M2.7.1H19.1V16.5H2.7Z" fill="#d4ec3d"></path>
              <path d="M10.9,8.1h8.2v8.2H10.9Z" fill="#a10808"></path>
              <path d="M2.7,0h8.2V8.2H2.7Z" fill="#a10808"></path>
            </g>
          }
          {
            (status?.team == 1 && status?.status == "Red Card") &&
            <g id="red_card" transform={`matrix(1,0,0,1,10,0)`}>
              <path d="M200.78,85.6a24.32,24.32,0,0,0,0,2.7,2.37,2.37,0,0,1,.1.7s-.1.8.4.9c.2,0,1.2.2,1.4,0a4.63,4.63,0,0,0,.7-.7c0-.1-.3-2-.3-2a20.48,20.48,0,0,0-1.7-2.8Z" fill="#cc947b" fillRule="evenodd"></path>
              <path d="M195.78,87.6a6.85,6.85,0,0,0-.5.7,4.46,4.46,0,0,0-.2.8l.2.6.3.5.3.2h.4a3.36,3.36,0,0,0,.6-.3l.4-.4a11.79,11.79,0,0,0,1-2.2l-1-1Z" fill="none"></path>
              <path d="M196.5,89.7a4.34,4.34,0,0,1,.2-.5v-.6l-.3-.3-.2-.1h-.3c-.1,0-.4.3-.4.3v1Z" fill="#f9dfd5" fillRule="evenodd"></path>
              <path d="M197.38,85.4l-.6.6s-.2.3-.3.3a1.31,1.31,0,0,0-.4.5l-.4.8.1.5.2.2.4.2c.1.1.6,0,.6,0l.6-.2s1.5-1.1,1.7-1.6l-.4-1.2A5,5,0,0,0,197.38,85.4Z" fill="none"></path>
              <path d="M194.18,85.3h0c0-.1,0-.4.1-.5l.4-.4s.5-.2.5-.3a12.25,12.25,0,0,1,1.3-.5l.2-.1,1.4-.3s.5,1.1.8.9a7.31,7.31,0,0,1,.9-.3l1.2.1.7-1,1.4,2,1.7,2.3s.2.5.3.8v.8s-.1.8-.1.9-.7,2.3-.7,2.3l-.7,2-.8,2.1-.1.9-.9.5-2.2.8a3.37,3.37,0,0,0-1.8.7c-.3.3.1-.2-.1-.9-.1-.3.1.5,0-1.4a9.93,9.93,0,0,0-.3-1.7,12.7,12.7,0,0,1-.4-2.2,9,9,0,0,1,.1-2.2,14.39,14.39,0,0,0,.5-1.7l.7-.9a21,21,0,0,1,2.6,1.3,2.25,2.25,0,0,0,1,.4l.9-.1a3.64,3.64,0,0,0,.4-.9c0-.2-.1-1.3-.1-1.3l-1.7-2.6-.8,1a2.16,2.16,0,0,1-.8.5c-.6.2-2.5-1-2.5-1l-1.2.6a2.28,2.28,0,0,1-.7.3h-.5l-.4-.1-.3-.1-.1-.4v-.3Z" fill="#daa58f" fillRule="evenodd"></path>
              <path d="M194.18,85.3h0c0-.1,0-.4.1-.5l.4-.4s.5-.2.5-.3a12.25,12.25,0,0,1,1.3-.5l.2-.1,1.4-.3s.5,1.1.8.9a7.31,7.31,0,0,1,.9-.3l1.2.1.7-1,1.4,2,1.7,2.3s.2.5.3.8v.8s-.1.8-.1.9-.7,2.3-.7,2.3l-.7,2-.8,2.1-.1.9-.9.5-2.2.8a3.37,3.37,0,0,0-1.8.7c-.3.3.1-.2-.1-.9-.1-.3.1.5,0-1.4a9.93,9.93,0,0,0-.3-1.7,12.7,12.7,0,0,1-.4-2.2,9,9,0,0,1,.1-2.2,14.39,14.39,0,0,0,.5-1.7l.7-.9a21,21,0,0,1,2.6,1.3,2.25,2.25,0,0,0,1,.4l.9-.1a3.64,3.64,0,0,0,.4-.9c0-.2-.1-1.3-.1-1.3l-1.7-2.6-.8,1a2.16,2.16,0,0,1-.8.5c-.6.2-2.5-1-2.5-1l-1.2.6a2.28,2.28,0,0,1-.7.3h-.5l-.4-.1-.3-.1-.1-.4v-.3Z" fill="none"></path>
              <path d="M197.28,88h0a2.11,2.11,0,0,0,.1-.5v-.6s-.8-.1-.9-.1-.2.3-.2.3a.85.85,0,0,0,0,.8A1.14,1.14,0,0,0,197.28,88Z" fill="#efcdbe" fillRule="evenodd"></path>
              <path d="M198.28,72.4l5.8,2a1,1,0,0,1,.61,1.28v0l-3.1,8.9a1,1,0,0,1-1.28.61h0l-5.8-2a1,1,0,0,1-.61-1.28v0L197,73C197.08,72.5,197.68,72.3,198.28,72.4Z" fill="red" fillRule="evenodd"></path>
              <path d="M201,85.7l.4,1.4-.5.7-.1.1v.6l.8-.1-.5-.1v-.4c0-.1.5-.6.5-.6h.5c.3,0,1,.1,1,.1a9.67,9.67,0,0,1-1.58-.5c-.12-.34-.25-.67-.4-1l1-.8Z" fill="#3f140f" fillOpacity="0.53" fillRule="evenodd"></path>
              <path d="M200.78,97.9a23.83,23.83,0,0,1-3.1,1l1.82,5.9h7.7s-4.1-8-4.2-8A20.81,20.81,0,0,0,200.78,97.9Z" fill="#222" fillRule="evenodd"></path>
              <path d="M197.68,99.4s-.7-2.6-1-3.8a9.91,9.91,0,0,1,.3-5.5,9.06,9.06,0,0,1,.52-1.2,16.19,16.19,0,0,0,1.2-2.3V83.9a5.3,5.3,0,0,1,.1-.8,2.11,2.11,0,0,0,.1-.5,1.27,1.27,0,0,1,.4-.4,2.11,2.11,0,0,1,.5-.1h.5l.3.1c.3.1.3.3.3.3l.1.5v1.3l-.1,1.2-.1,1.2v.5l2.2,9.3Z" fill="#daa58f" fillRule="evenodd"></path>
              <path d="M198.88,85.7l.7.1.9-.1Zm0-.2.7.1.9-.1Z" fill="#3f140f" fillOpacity="0.53" fillRule="evenodd"></path>
              <path d="M199.38,83.9c.1.1.5.1.5.1s.4.1.5,0,.1-.4.1-.4v-.8c0-.1-.1-.2-.2-.3h-.7a.35.35,0,0,0-.4.4l.1.8Z" fill="#f3d5c9" fillRule="evenodd"></path>
              <path d="M202.18,96.7c-.9.4-3.1,1.2-3.3,1.3l-1.38.7s.1.6.1.8a2.39,2.39,0,0,0,.3.7l5.6-2.4a2.9,2.9,0,0,0-.3-.7,3.94,3.94,0,0,1-.1-.9S202.58,96.5,202.18,96.7Z" fill="#e5e5e5" fillRule="evenodd"></path>
            </g>
          }
          {
            (status?.team == 2 && status?.status == "Red Card") &&
            <g id="red_card" transform={`matrix(1,0,0,1,-10,0)`}>
              <path d="M200.78,85.6a24.32,24.32,0,0,0,0,2.7,2.37,2.37,0,0,1,.1.7s-.1.8.4.9c.2,0,1.2.2,1.4,0a4.63,4.63,0,0,0,.7-.7c0-.1-.3-2-.3-2a20.48,20.48,0,0,0-1.7-2.8Z" fill="#cc947b" fillRule="evenodd"></path>
              <path d="M195.78,87.6a6.85,6.85,0,0,0-.5.7,4.46,4.46,0,0,0-.2.8l.2.6.3.5.3.2h.4a3.36,3.36,0,0,0,.6-.3l.4-.4a11.79,11.79,0,0,0,1-2.2l-1-1Z" fill="none"></path>
              <path d="M196.5,89.7a4.34,4.34,0,0,1,.2-.5v-.6l-.3-.3-.2-.1h-.3c-.1,0-.4.3-.4.3v1Z" fill="#f9dfd5" fillRule="evenodd"></path>
              <path d="M197.38,85.4l-.6.6s-.2.3-.3.3a1.31,1.31,0,0,0-.4.5l-.4.8.1.5.2.2.4.2c.1.1.6,0,.6,0l.6-.2s1.5-1.1,1.7-1.6l-.4-1.2A5,5,0,0,0,197.38,85.4Z" fill="none"></path>
              <path d="M194.18,85.3h0c0-.1,0-.4.1-.5l.4-.4s.5-.2.5-.3a12.25,12.25,0,0,1,1.3-.5l.2-.1,1.4-.3s.5,1.1.8.9a7.31,7.31,0,0,1,.9-.3l1.2.1.7-1,1.4,2,1.7,2.3s.2.5.3.8v.8s-.1.8-.1.9-.7,2.3-.7,2.3l-.7,2-.8,2.1-.1.9-.9.5-2.2.8a3.37,3.37,0,0,0-1.8.7c-.3.3.1-.2-.1-.9-.1-.3.1.5,0-1.4a9.93,9.93,0,0,0-.3-1.7,12.7,12.7,0,0,1-.4-2.2,9,9,0,0,1,.1-2.2,14.39,14.39,0,0,0,.5-1.7l.7-.9a21,21,0,0,1,2.6,1.3,2.25,2.25,0,0,0,1,.4l.9-.1a3.64,3.64,0,0,0,.4-.9c0-.2-.1-1.3-.1-1.3l-1.7-2.6-.8,1a2.16,2.16,0,0,1-.8.5c-.6.2-2.5-1-2.5-1l-1.2.6a2.28,2.28,0,0,1-.7.3h-.5l-.4-.1-.3-.1-.1-.4v-.3Z" fill="#daa58f" fillRule="evenodd"></path>
              <path d="M194.18,85.3h0c0-.1,0-.4.1-.5l.4-.4s.5-.2.5-.3a12.25,12.25,0,0,1,1.3-.5l.2-.1,1.4-.3s.5,1.1.8.9a7.31,7.31,0,0,1,.9-.3l1.2.1.7-1,1.4,2,1.7,2.3s.2.5.3.8v.8s-.1.8-.1.9-.7,2.3-.7,2.3l-.7,2-.8,2.1-.1.9-.9.5-2.2.8a3.37,3.37,0,0,0-1.8.7c-.3.3.1-.2-.1-.9-.1-.3.1.5,0-1.4a9.93,9.93,0,0,0-.3-1.7,12.7,12.7,0,0,1-.4-2.2,9,9,0,0,1,.1-2.2,14.39,14.39,0,0,0,.5-1.7l.7-.9a21,21,0,0,1,2.6,1.3,2.25,2.25,0,0,0,1,.4l.9-.1a3.64,3.64,0,0,0,.4-.9c0-.2-.1-1.3-.1-1.3l-1.7-2.6-.8,1a2.16,2.16,0,0,1-.8.5c-.6.2-2.5-1-2.5-1l-1.2.6a2.28,2.28,0,0,1-.7.3h-.5l-.4-.1-.3-.1-.1-.4v-.3Z" fill="none"></path>
              <path d="M197.28,88h0a2.11,2.11,0,0,0,.1-.5v-.6s-.8-.1-.9-.1-.2.3-.2.3a.85.85,0,0,0,0,.8A1.14,1.14,0,0,0,197.28,88Z" fill="#efcdbe" fillRule="evenodd"></path>
              <path d="M198.28,72.4l5.8,2a1,1,0,0,1,.61,1.28v0l-3.1,8.9a1,1,0,0,1-1.28.61h0l-5.8-2a1,1,0,0,1-.61-1.28v0L197,73C197.08,72.5,197.68,72.3,198.28,72.4Z" fill="red" fillRule="evenodd"></path>
              <path d="M201,85.7l.4,1.4-.5.7-.1.1v.6l.8-.1-.5-.1v-.4c0-.1.5-.6.5-.6h.5c.3,0,1,.1,1,.1a9.67,9.67,0,0,1-1.58-.5c-.12-.34-.25-.67-.4-1l1-.8Z" fill="#3f140f" fillOpacity="0.53" fillRule="evenodd"></path>
              <path d="M200.78,97.9a23.83,23.83,0,0,1-3.1,1l1.82,5.9h7.7s-4.1-8-4.2-8A20.81,20.81,0,0,0,200.78,97.9Z" fill="#222" fillRule="evenodd"></path>
              <path d="M197.68,99.4s-.7-2.6-1-3.8a9.91,9.91,0,0,1,.3-5.5,9.06,9.06,0,0,1,.52-1.2,16.19,16.19,0,0,0,1.2-2.3V83.9a5.3,5.3,0,0,1,.1-.8,2.11,2.11,0,0,0,.1-.5,1.27,1.27,0,0,1,.4-.4,2.11,2.11,0,0,1,.5-.1h.5l.3.1c.3.1.3.3.3.3l.1.5v1.3l-.1,1.2-.1,1.2v.5l2.2,9.3Z" fill="#daa58f" fillRule="evenodd"></path>
              <path d="M198.88,85.7l.7.1.9-.1Zm0-.2.7.1.9-.1Z" fill="#3f140f" fillOpacity="0.53" fillRule="evenodd"></path>
              <path d="M199.38,83.9c.1.1.5.1.5.1s.4.1.5,0,.1-.4.1-.4v-.8c0-.1-.1-.2-.2-.3h-.7a.35.35,0,0,0-.4.4l.1.8Z" fill="#f3d5c9" fillRule="evenodd"></path>
              <path d="M202.18,96.7c-.9.4-3.1,1.2-3.3,1.3l-1.38.7s.1.6.1.8a2.39,2.39,0,0,0,.3.7l5.6-2.4a2.9,2.9,0,0,0-.3-.7,3.94,3.94,0,0,1-.1-.9S202.58,96.5,202.18,96.7Z" fill="#e5e5e5" fillRule="evenodd"></path>
            </g>
          }
          {
            (status?.team == 1 && status?.status == "Yellow Card") &&
            <g id="yellow_card" transform={`matrix(1,0,0,1,10,0)`}>
              <path d="M200.9,87.5a26.15,26.15,0,0,0,0,2.8,2.37,2.37,0,0,1,.1.7s-.1.8.4.9c.2,0,1.2.2,1.4,0a2.22,2.22,0,0,0,.69-.8c0-.1-.3-2-.3-2a20.48,20.48,0,0,0-1.7-2.8Z" fill="#cc947b" fillRule="evenodd"></path>
              <path d="M195.8,89.59a6.85,6.85,0,0,0-.5.7,4.46,4.46,0,0,0-.2.8l.2.6.3.5.3.2h.4a3.36,3.36,0,0,0,.6-.3l.4-.4a11.79,11.79,0,0,0,1-2.2l-1-1Z" fill="none"></path>
              <path d="M196.6,91.9a4.34,4.34,0,0,1,.2-.5v-.6l-.31-.3-.2-.1H196c-.1,0-.4.3-.4.3v1l1,.2Z" fill="#f3d5c9" fillRule="evenodd"></path>
              <path d="M197.4,87.3l-.6.6s-.2.3-.3.3a1.31,1.31,0,0,0-.4.5l-.4.8.1.5.2.2.4.2c.1.1.6,0,.6,0l.6-.2a11,11,0,0,0,1.8-1.61l-.4-1.2A5.39,5.39,0,0,0,197.4,87.3Z" fill="none"></path>
              <path d="M194.4,87.9v-.2s0-.3.1-.4l.4-.4s.5-.2.5-.3a6,6,0,0,1,.7-.4l1.7-.7s.9.7,1.2.5a7.31,7.31,0,0,1,.9-.3l1.2.1.7-1,1.4,2,1.7,2.4s.2.5.3.8v.8s-.1.8-.1.9-.7,2.4-.7,2.4l-.7,2-.8,2.1-.1.9-.9.5-2.2.8a3.37,3.37,0,0,0-1.8.7c-.3.3.1-.2-.1-.9-.1-.3.1.5,0-1.4a10,10,0,0,0-.31-1.7,12.7,12.7,0,0,1-.4-2.2,9,9,0,0,1,.1-2.2,14.39,14.39,0,0,0,.5-1.7l.7-.9A21.15,21.15,0,0,1,201,91.4a2.44,2.44,0,0,0,1.1.4l.9-.1a3.64,3.64,0,0,0,.4-.9c0-.2-.1-1.3-.1-1.3l-1.7-2.6-.8,1a2.16,2.16,0,0,1-.8.5c-.6.2-2.1-.8-2.1-.8l-1.4.8a2.28,2.28,0,0,1-.7.3h-.5l-.4-.1-.3-.1-.1-.1Z" fill="#daa58f" fillRule="evenodd"></path>
              <path d="M194.4,87.9v-.2s0-.3.1-.4l.4-.4s.5-.2.5-.3a6,6,0,0,1,.7-.4l1.7-.7s.9.7,1.2.5a7.31,7.31,0,0,1,.9-.3l1.2.1.7-1,1.4,2,1.7,2.4s.2.5.3.8v.8s-.1.8-.1.9-.7,2.4-.7,2.4l-.7,2-.8,2.1-.1.9-.9.5-2.2.8a3.37,3.37,0,0,0-1.8.7c-.3.3.1-.2-.1-.9-.1-.3.1.5,0-1.4a10,10,0,0,0-.31-1.7,12.7,12.7,0,0,1-.4-2.2,9,9,0,0,1,.1-2.2,14.39,14.39,0,0,0,.5-1.7l.7-.9A21.15,21.15,0,0,1,201,91.4a2.44,2.44,0,0,0,1.1.4l.9-.1a3.64,3.64,0,0,0,.4-.9c0-.2-.1-1.3-.1-1.3l-1.7-2.6-.8,1a2.16,2.16,0,0,1-.8.5c-.6.2-2.1-.8-2.1-.8l-1.4.8a2.28,2.28,0,0,1-.7.3h-.5l-.4-.1-.3-.1-.1-.1Z" fill="none"></path>
              <path d="M197.4,90h0a2.11,2.11,0,0,0,.1-.5v-.6s-.8-.1-.9-.1-.2.3-.2.3a.85.85,0,0,0,0,.8A1.5,1.5,0,0,0,197.4,90Z" fill="#efcdbe" fillRule="evenodd"></path>
              <path d="M198.2,74.4l5.8,2a1.21,1.21,0,0,1,.7,1.3l-3.1,8.89a1.21,1.21,0,0,1-1.3.7l-5.8-2a1.21,1.21,0,0,1-.7-1.3l3.1-8.9A1.21,1.21,0,0,1,198.2,74.4Z" fill="#f4e845" fillRule="evenodd"></path>
              <path d="M201.1,87.59l.39,1.41-.5.7-.1.1v.6l.8-.1-.5-.1v-.5c0-.1.5-.6.5-.6h.5c.3,0,1.1.1,1.1.1a9.89,9.89,0,0,1-1.6-.5c-.12-.34-.25-.67-.4-1l1.1-.8Z" fill="#3f140f" fillOpacity="0.53" fillRule="evenodd"></path>
              <path d="M200.8,99.8a30.2,30.2,0,0,1-3.2,1.1l1.8,5.9h7.8s-4.1-8-4.2-8S201.6,99.5,200.8,99.8Z" fill="#222" fillRule="evenodd"></path>
              <path d="M197.8,101.4s-.7-2.6-1.1-3.8a9.91,9.91,0,0,1,.3-5.5,8.89,8.89,0,0,1,.49-1.2,15.88,15.88,0,0,0,1.21-2.31v-2.7a5.3,5.3,0,0,1,.1-.8,2.11,2.11,0,0,0,.1-.5,1.27,1.27,0,0,1,.4-.4,2.11,2.11,0,0,1,.5-.1h.5l.3.1c.3.1.3.3.3.3l.1.5v1.3l-.1,1.2-.1,1.2v.5l2.2,9.4Z" fill="#daa58f" fillRule="evenodd"></path>
              <path d="M199,87.7l.7.1.9-.1Zm0-.3.7.1.9-.1Z" fill="#3f140f" fillOpacity="0.53" fillRule="evenodd"></path>
              <path d="M199.49,85.8c.1.1.5.1.5.1s.4.1.5,0,.1-.4.1-.4v-.8c0-.1-.1-.2-.2-.3h-.7a.35.35,0,0,0-.4.4l-.1.7C199.39,85.6,199.39,85.8,199.49,85.8Z" fill="#f3d5c9" fillRule="evenodd"></path>
              <path d="M202.3,98.59c-.9.4-3.1,1.2-3.3,1.3l-1.4.7s.1.6.1.8a2.39,2.39,0,0,0,.3.7l5.7-2.4a2.9,2.9,0,0,0-.3-.7,3.94,3.94,0,0,1-.1-.9A9.33,9.33,0,0,1,202.3,98.59Z" fill="#e5e5e5" fillRule="evenodd"></path>
            </g>
          }
          {
            (status?.team == 2 && status?.status == "Yellow Card") &&
            <g id="yellow_card" transform={`matrix(1,0,0,1,-10,0)`}>
              <path d="M200.9,87.5a26.15,26.15,0,0,0,0,2.8,2.37,2.37,0,0,1,.1.7s-.1.8.4.9c.2,0,1.2.2,1.4,0a2.22,2.22,0,0,0,.69-.8c0-.1-.3-2-.3-2a20.48,20.48,0,0,0-1.7-2.8Z" fill="#cc947b" fillRule="evenodd"></path>
              <path d="M195.8,89.59a6.85,6.85,0,0,0-.5.7,4.46,4.46,0,0,0-.2.8l.2.6.3.5.3.2h.4a3.36,3.36,0,0,0,.6-.3l.4-.4a11.79,11.79,0,0,0,1-2.2l-1-1Z" fill="none"></path>
              <path d="M196.6,91.9a4.34,4.34,0,0,1,.2-.5v-.6l-.31-.3-.2-.1H196c-.1,0-.4.3-.4.3v1l1,.2Z" fill="#f3d5c9" fillRule="evenodd"></path>
              <path d="M197.4,87.3l-.6.6s-.2.3-.3.3a1.31,1.31,0,0,0-.4.5l-.4.8.1.5.2.2.4.2c.1.1.6,0,.6,0l.6-.2a11,11,0,0,0,1.8-1.61l-.4-1.2A5.39,5.39,0,0,0,197.4,87.3Z" fill="none"></path>
              <path d="M194.4,87.9v-.2s0-.3.1-.4l.4-.4s.5-.2.5-.3a6,6,0,0,1,.7-.4l1.7-.7s.9.7,1.2.5a7.31,7.31,0,0,1,.9-.3l1.2.1.7-1,1.4,2,1.7,2.4s.2.5.3.8v.8s-.1.8-.1.9-.7,2.4-.7,2.4l-.7,2-.8,2.1-.1.9-.9.5-2.2.8a3.37,3.37,0,0,0-1.8.7c-.3.3.1-.2-.1-.9-.1-.3.1.5,0-1.4a10,10,0,0,0-.31-1.7,12.7,12.7,0,0,1-.4-2.2,9,9,0,0,1,.1-2.2,14.39,14.39,0,0,0,.5-1.7l.7-.9A21.15,21.15,0,0,1,201,91.4a2.44,2.44,0,0,0,1.1.4l.9-.1a3.64,3.64,0,0,0,.4-.9c0-.2-.1-1.3-.1-1.3l-1.7-2.6-.8,1a2.16,2.16,0,0,1-.8.5c-.6.2-2.1-.8-2.1-.8l-1.4.8a2.28,2.28,0,0,1-.7.3h-.5l-.4-.1-.3-.1-.1-.1Z" fill="#daa58f" fillRule="evenodd"></path>
              <path d="M194.4,87.9v-.2s0-.3.1-.4l.4-.4s.5-.2.5-.3a6,6,0,0,1,.7-.4l1.7-.7s.9.7,1.2.5a7.31,7.31,0,0,1,.9-.3l1.2.1.7-1,1.4,2,1.7,2.4s.2.5.3.8v.8s-.1.8-.1.9-.7,2.4-.7,2.4l-.7,2-.8,2.1-.1.9-.9.5-2.2.8a3.37,3.37,0,0,0-1.8.7c-.3.3.1-.2-.1-.9-.1-.3.1.5,0-1.4a10,10,0,0,0-.31-1.7,12.7,12.7,0,0,1-.4-2.2,9,9,0,0,1,.1-2.2,14.39,14.39,0,0,0,.5-1.7l.7-.9A21.15,21.15,0,0,1,201,91.4a2.44,2.44,0,0,0,1.1.4l.9-.1a3.64,3.64,0,0,0,.4-.9c0-.2-.1-1.3-.1-1.3l-1.7-2.6-.8,1a2.16,2.16,0,0,1-.8.5c-.6.2-2.1-.8-2.1-.8l-1.4.8a2.28,2.28,0,0,1-.7.3h-.5l-.4-.1-.3-.1-.1-.1Z" fill="none"></path>
              <path d="M197.4,90h0a2.11,2.11,0,0,0,.1-.5v-.6s-.8-.1-.9-.1-.2.3-.2.3a.85.85,0,0,0,0,.8A1.5,1.5,0,0,0,197.4,90Z" fill="#efcdbe" fillRule="evenodd"></path>
              <path d="M198.2,74.4l5.8,2a1.21,1.21,0,0,1,.7,1.3l-3.1,8.89a1.21,1.21,0,0,1-1.3.7l-5.8-2a1.21,1.21,0,0,1-.7-1.3l3.1-8.9A1.21,1.21,0,0,1,198.2,74.4Z" fill="#f4e845" fillRule="evenodd"></path>
              <path d="M201.1,87.59l.39,1.41-.5.7-.1.1v.6l.8-.1-.5-.1v-.5c0-.1.5-.6.5-.6h.5c.3,0,1.1.1,1.1.1a9.89,9.89,0,0,1-1.6-.5c-.12-.34-.25-.67-.4-1l1.1-.8Z" fill="#3f140f" fillOpacity="0.53" fillRule="evenodd"></path>
              <path d="M200.8,99.8a30.2,30.2,0,0,1-3.2,1.1l1.8,5.9h7.8s-4.1-8-4.2-8S201.6,99.5,200.8,99.8Z" fill="#222" fillRule="evenodd"></path>
              <path d="M197.8,101.4s-.7-2.6-1.1-3.8a9.91,9.91,0,0,1,.3-5.5,8.89,8.89,0,0,1,.49-1.2,15.88,15.88,0,0,0,1.21-2.31v-2.7a5.3,5.3,0,0,1,.1-.8,2.11,2.11,0,0,0,.1-.5,1.27,1.27,0,0,1,.4-.4,2.11,2.11,0,0,1,.5-.1h.5l.3.1c.3.1.3.3.3.3l.1.5v1.3l-.1,1.2-.1,1.2v.5l2.2,9.4Z" fill="#daa58f" fillRule="evenodd"></path>
              <path d="M199,87.7l.7.1.9-.1Zm0-.3.7.1.9-.1Z" fill="#3f140f" fillOpacity="0.53" fillRule="evenodd"></path>
              <path d="M199.49,85.8c.1.1.5.1.5.1s.4.1.5,0,.1-.4.1-.4v-.8c0-.1-.1-.2-.2-.3h-.7a.35.35,0,0,0-.4.4l-.1.7C199.39,85.6,199.39,85.8,199.49,85.8Z" fill="#f3d5c9" fillRule="evenodd"></path>
              <path d="M202.3,98.59c-.9.4-3.1,1.2-3.3,1.3l-1.4.7s.1.6.1.8a2.39,2.39,0,0,0,.3.7l5.7-2.4a2.9,2.9,0,0,0-.3-.7,3.94,3.94,0,0,1-.1-.9A9.33,9.33,0,0,1,202.3,98.59Z" fill="#e5e5e5" fillRule="evenodd"></path>
            </g>
          }
          {
            (status?.team == 1 && status?.status == "Substitution") &&
            <g id="sub" transform={`matrix(1 0 0 1 20 0)`}>
              <path id="sub_down" d="M205.05,105.43a1,1,0,0,0,1.34.47,1,1,0,0,0,.46-.47l5.1-7.2c.5-.7.2-1.3-.7-1.3h-10.8c-.9,0-1.2.6-.7,1.3C200,98.23,205.05,105.43,205.05,105.43Zm-2.6-8.5h7v-8.1a1.58,1.58,0,0,0-1.56-1.6h-3.84a1.58,1.58,0,0,0-1.6,1.56v8.14Z" fill="#6f4e39"></path>
              <path id="sub_up" d="M193.35,74.53a.88.88,0,0,1,1.14-.46.9.9,0,0,1,.46.46l5.2,8.8c.4.7.1,1.3-.8,1.3H188.78c-.9,0-1.2-.6-.8-1.3Zm-2.3,10.1h6.1v9.6a1.55,1.55,0,0,1-1.5,1.6h-3a1.5,1.5,0,0,1-1.5-1.49v-.11C191.05,94.23,191.05,84.63,191.05,84.63Z" fill="#51cc66"></path>
            </g>
          }
          {
            (status?.team == 2 && status?.status == "Substitution") &&
            <g id="sub" transform={`matrix(1 0 0 1 -20 0)`}>
              <path id="sub_down" d="M205.05,105.43a1,1,0,0,0,1.34.47,1,1,0,0,0,.46-.47l5.1-7.2c.5-.7.2-1.3-.7-1.3h-10.8c-.9,0-1.2.6-.7,1.3C200,98.23,205.05,105.43,205.05,105.43Zm-2.6-8.5h7v-8.1a1.58,1.58,0,0,0-1.56-1.6h-3.84a1.58,1.58,0,0,0-1.6,1.56v8.14Z" fill="#6f4e39"></path>
              <path id="sub_up" d="M193.35,74.53a.88.88,0,0,1,1.14-.46.9.9,0,0,1,.46.46l5.2,8.8c.4.7.1,1.3-.8,1.3H188.78c-.9,0-1.2-.6-.8-1.3Zm-2.3,10.1h6.1v9.6a1.55,1.55,0,0,1-1.5,1.6h-3a1.5,1.5,0,0,1-1.5-1.49v-.11C191.05,94.23,191.05,84.63,191.05,84.63Z" fill="#51cc66"></path>
            </g>
          }
          {
            (status?.team == 1 && status?.status == "Shot On Goal") &&
            <g id="shot" transform="matrix(1.5,0,0,1.5,70,-50)">
              <g id="shot_gate">
                <path d="M216.75,93.49l-8.84,9-24.29-9.59L192.71,89Z" fill="#222" fillOpacity="0.08"></path>
                <path d="M183.87,91l.25.27,1,1.1m-1.24-11.46.17-.18.33-.32m-.5,2.86.26-.26,1.36-1.36m-1.62,4,.26-.27,2.48-2.59m-3.24,5.6.26-.27,4.1-4.34m-4.47,7,5.59-5.59m-5,7,.27-.26,6-5.85m-5,6.23.29-.23,5.82-4.75m-1.62,3,.28-.25,2-1.74m-8,4.48.34-.15,5.64-2.47,3-1.12m-9.1-.12.27.26,2.47,2.48m-3-5.36.27.27L188.1,91m-4.61-6.94,5.86,6.31M183.74,82l.27.26,7.46,7.21m-8-10,9.22,9.5" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="0.25"></path>
                <path d="M211.15,81.4l-2.62,2.5m-1.12,11.21,4,4.11M207.54,93l5,5m-5-7.22,6.1,6.1m-6.1-8.47,7.1,7.23M207.91,86l8,8.1m-8.22-10.84,8,8.1M208,81.78l5.49,5.6m-5.11-7,1.08,1.11c1.3,1.33,2.9,3.25,2.9,3.25m-1.61-4.49s1.61,4.57,2.74,7c1,2.11,3.36,6.48,3.36,6.48M211.77,82.9l-3.24,3.24m3.74-1.5-3.74,3.74m4.36-2.24-4.36,4.48m4.86-2.86-5,5.23m6-3.86-6,6.1M208,97.72l7.1-7m-7,9.34,7.85-8m-7.85,10.34,8.72-9m-8.85,6.6,1.13,1.37m-1.37-3.86,2.49,2.74" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="0.25"></path>
                <path d="M192.71,89l15.08,3M192.46,79.16l-4.73,4.61m6.85-4.36L189,85m7.72-5.48L190,86.14m8.72-6.23-7.47,7.35M200.69,80,192,88.26m10.58-7.85-8.84,8.84m11-8.72-9.09,9M207,80.41l-9.47,9.47m11.34-9.1-9.6,9.47M208.16,84l-7.23,6.73m7.6-4.86s-3.77,3.56-5.35,5.11m5.1-2.37L205,91.49m3.24-1-1.37,1.24M196.57,79l.27.26L208.41,91m-9.47-11.84.26.28L208,89m-5.85-8.84.26.27,5.66,6m-3.8-6.11.27.26,3.59,3.36m-23.79-3.49,2.11-1.87m-1,3.11,3-2.86m2.24,0-4.11,4m-2.49-4.86.26.26L195.7,89.5M187,78.17l.26.27,10.58,11.44M189.6,78.79l.26.26,11.57,11.7m-9.59-12,.27.26,12.19,12.2M194.21,79l.26.26,12.44,12.57" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="0.25"></path>
                <path d="M183.12,77.42H184V92.87h-.87Zm24.54,3.24h1.12l-.62,21.92-1-.37Zm-24-3.24L208.54,80a.28.28,0,0,1,.24.27v.88l-25.16-2.87ZM208.53,80h1.93a.6.6,0,0,1,.55.43v.07l-2.86.38Z" fill="#fff"></path>
              </g>
              <g id="shot_target">
                <g>
                  <path d="M191.51,87.3l-.63-.17a9,9,0,0,0,.46,2.3,9.88,9.88,0,0,0,1,2.1,8.76,8.76,0,0,0,1.45,1.73,6.55,6.55,0,0,0,1.8,1.19v-.86a5.55,5.55,0,0,1-1.55-1,7.27,7.27,0,0,1-1.25-1.49,7.68,7.68,0,0,1-.87-1.8A7.84,7.84,0,0,1,191.51,87.3Z" fill="#b80000"></path>
                  <path d="M191.51,87.3a7.84,7.84,0,0,0,.41,2,7.68,7.68,0,0,0,.87,1.8A7.27,7.27,0,0,0,194,92.57a5.55,5.55,0,0,0,1.55,1,5.55,5.55,0,0,1-1.55-1,7.27,7.27,0,0,1-1.25-1.49,7.68,7.68,0,0,1-.87-1.8A7.84,7.84,0,0,1,191.51,87.3Z" fill="#fff" opacity="0.51"></path>
                  <path d="M195.59,94.45v1.93l.69.27v-8l-.71-.2v6Zm0-12.9a4,4,0,0,0-1.87.15,3.7,3.7,0,0,0-1.46,1,4.8,4.8,0,0,0-1,1.56,6.36,6.36,0,0,0-.4,2,6.36,6.36,0,0,1,.4-2,4.8,4.8,0,0,1,1-1.56,3.7,3.7,0,0,1,1.46-1A4,4,0,0,1,195.57,81.55Zm-4.06,4.85a5.23,5.23,0,0,1,.38-1.69,4,4,0,0,1,.85-1.3,3.06,3.06,0,0,1,1.25-.77,3.31,3.31,0,0,1,1.58-.11v-1a4,4,0,0,0-1.87.15,3.7,3.7,0,0,0-1.46,1,4.8,4.8,0,0,0-1,1.56,6.36,6.36,0,0,0-.4,2Zm4.06-3.87v4.94l.71.19V79.49l-.75-.14v3.18Z" fill="#b80000"></path>
                  <path d="M196.28,93.83a3.57,3.57,0,0,0,1.62,0,3.16,3.16,0,0,0,1.38-.69,3.85,3.85,0,0,0,1-1.38,5.6,5.6,0,0,0,.42-2,5.6,5.6,0,0,1-.42,2,3.85,3.85,0,0,1-1,1.38,3.16,3.16,0,0,1-1.38.69A3.57,3.57,0,0,1,196.28,93.83Z" fill="#fff" opacity="0.51"></path>
                  <path d="M200.69,89.83a5.6,5.6,0,0,1-.42,2,3.85,3.85,0,0,1-1,1.38,3.16,3.16,0,0,1-1.38.69,3.57,3.57,0,0,1-1.62,0v.87a4.13,4.13,0,0,0,1.9.1,3.64,3.64,0,0,0,1.64-.79A4.35,4.35,0,0,0,201,92.4a6.24,6.24,0,0,0,.51-2.34Zm.79-.8a9.25,9.25,0,0,0-.57-2.43,9.34,9.34,0,0,0-1.16-2.16,7.79,7.79,0,0,0-1.59-1.69,6,6,0,0,0-1.85-1,6,6,0,0,1,1.85,1,7.79,7.79,0,0,1,1.59,1.69,9.34,9.34,0,0,1,1.16,2.16A9.25,9.25,0,0,1,201.48,89Zm-5.18-6.31a5.12,5.12,0,0,1,1.55.88A7.16,7.16,0,0,1,199.18,85a8.12,8.12,0,0,1,1,1.79,8.34,8.34,0,0,1,.5,2l.83.22a9.25,9.25,0,0,0-.57-2.43,9.34,9.34,0,0,0-1.16-2.16,7.79,7.79,0,0,0-1.59-1.69,6,6,0,0,0-1.85-1Zm11.89,8.08L201.48,89l-.83-.22-4.36-1.15-.71-.19-4.07-1.07-.64-.17-5.06-1.33.05.84,5,1.39.63.17,4.07,1.12.71.2,4.4,1.21.82.23,6.64,1.83Z" fill="#b80000"></path>
                </g>
                <path d="M195.58,88.42l-4.07-1.12a7.84,7.84,0,0,0,.41,2,7.68,7.68,0,0,0,.87,1.8A7.27,7.27,0,0,0,194,92.57a5.55,5.55,0,0,0,1.55,1Zm0-5.89a3.31,3.31,0,0,0-1.58.11,3.06,3.06,0,0,0-1.25.77,4,4,0,0,0-.85,1.3,5.23,5.23,0,0,0-.38,1.69l4.07,1.07Zm5.12,7.3-4.4-1.21v5.21a3.57,3.57,0,0,0,1.62,0,3.16,3.16,0,0,0,1.38-.69,3.85,3.85,0,0,0,1-1.38A5.6,5.6,0,0,0,200.69,89.83Zm-4.39-7.11v4.94l4.36,1.15a8.34,8.34,0,0,0-.5-2,8.12,8.12,0,0,0-1-1.79,7.16,7.16,0,0,0-1.33-1.41A5.12,5.12,0,0,0,196.3,82.72Z" fill="#fff" opacity="0.3"></path>
              </g>
            </g>
          }
          {
            (status?.team == 2 && status?.status == "Shot On Goal") &&
            <g id="shot" transform="matrix(-1.5,0,0,1.5,330,-40)">
              <g id="shot_gate">
                <path d="M216.75,93.49l-8.84,9-24.29-9.59L192.71,89Z" fill="#222" fillOpacity="0.08"></path>
                <path d="M183.87,91l.25.27,1,1.1m-1.24-11.46.17-.18.33-.32m-.5,2.86.26-.26,1.36-1.36m-1.62,4,.26-.27,2.48-2.59m-3.24,5.6.26-.27,4.1-4.34m-4.47,7,5.59-5.59m-5,7,.27-.26,6-5.85m-5,6.23.29-.23,5.82-4.75m-1.62,3,.28-.25,2-1.74m-8,4.48.34-.15,5.64-2.47,3-1.12m-9.1-.12.27.26,2.47,2.48m-3-5.36.27.27L188.1,91m-4.61-6.94,5.86,6.31M183.74,82l.27.26,7.46,7.21m-8-10,9.22,9.5" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="0.25"></path>
                <path d="M211.15,81.4l-2.62,2.5m-1.12,11.21,4,4.11M207.54,93l5,5m-5-7.22,6.1,6.1m-6.1-8.47,7.1,7.23M207.91,86l8,8.1m-8.22-10.84,8,8.1M208,81.78l5.49,5.6m-5.11-7,1.08,1.11c1.3,1.33,2.9,3.25,2.9,3.25m-1.61-4.49s1.61,4.57,2.74,7c1,2.11,3.36,6.48,3.36,6.48M211.77,82.9l-3.24,3.24m3.74-1.5-3.74,3.74m4.36-2.24-4.36,4.48m4.86-2.86-5,5.23m6-3.86-6,6.1M208,97.72l7.1-7m-7,9.34,7.85-8m-7.85,10.34,8.72-9m-8.85,6.6,1.13,1.37m-1.37-3.86,2.49,2.74" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="0.25"></path>
                <path d="M192.71,89l15.08,3M192.46,79.16l-4.73,4.61m6.85-4.36L189,85m7.72-5.48L190,86.14m8.72-6.23-7.47,7.35M200.69,80,192,88.26m10.58-7.85-8.84,8.84m11-8.72-9.09,9M207,80.41l-9.47,9.47m11.34-9.1-9.6,9.47M208.16,84l-7.23,6.73m7.6-4.86s-3.77,3.56-5.35,5.11m5.1-2.37L205,91.49m3.24-1-1.37,1.24M196.57,79l.27.26L208.41,91m-9.47-11.84.26.28L208,89m-5.85-8.84.26.27,5.66,6m-3.8-6.11.27.26,3.59,3.36m-23.79-3.49,2.11-1.87m-1,3.11,3-2.86m2.24,0-4.11,4m-2.49-4.86.26.26L195.7,89.5M187,78.17l.26.27,10.58,11.44M189.6,78.79l.26.26,11.57,11.7m-9.59-12,.27.26,12.19,12.2M194.21,79l.26.26,12.44,12.57" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="0.25"></path>
                <path d="M183.12,77.42H184V92.87h-.87Zm24.54,3.24h1.12l-.62,21.92-1-.37Zm-24-3.24L208.54,80a.28.28,0,0,1,.24.27v.88l-25.16-2.87ZM208.53,80h1.93a.6.6,0,0,1,.55.43v.07l-2.86.38Z" fill="#fff"></path>
              </g>
              <g id="shot_target">
                <g>
                  <path d="M191.51,87.3l-.63-.17a9,9,0,0,0,.46,2.3,9.88,9.88,0,0,0,1,2.1,8.76,8.76,0,0,0,1.45,1.73,6.55,6.55,0,0,0,1.8,1.19v-.86a5.55,5.55,0,0,1-1.55-1,7.27,7.27,0,0,1-1.25-1.49,7.68,7.68,0,0,1-.87-1.8A7.84,7.84,0,0,1,191.51,87.3Z" fill="#b80000"></path>
                  <path d="M191.51,87.3a7.84,7.84,0,0,0,.41,2,7.68,7.68,0,0,0,.87,1.8A7.27,7.27,0,0,0,194,92.57a5.55,5.55,0,0,0,1.55,1,5.55,5.55,0,0,1-1.55-1,7.27,7.27,0,0,1-1.25-1.49,7.68,7.68,0,0,1-.87-1.8A7.84,7.84,0,0,1,191.51,87.3Z" fill="#fff" opacity="0.51"></path>
                  <path d="M195.59,94.45v1.93l.69.27v-8l-.71-.2v6Zm0-12.9a4,4,0,0,0-1.87.15,3.7,3.7,0,0,0-1.46,1,4.8,4.8,0,0,0-1,1.56,6.36,6.36,0,0,0-.4,2,6.36,6.36,0,0,1,.4-2,4.8,4.8,0,0,1,1-1.56,3.7,3.7,0,0,1,1.46-1A4,4,0,0,1,195.57,81.55Zm-4.06,4.85a5.23,5.23,0,0,1,.38-1.69,4,4,0,0,1,.85-1.3,3.06,3.06,0,0,1,1.25-.77,3.31,3.31,0,0,1,1.58-.11v-1a4,4,0,0,0-1.87.15,3.7,3.7,0,0,0-1.46,1,4.8,4.8,0,0,0-1,1.56,6.36,6.36,0,0,0-.4,2Zm4.06-3.87v4.94l.71.19V79.49l-.75-.14v3.18Z" fill="#b80000"></path>
                  <path d="M196.28,93.83a3.57,3.57,0,0,0,1.62,0,3.16,3.16,0,0,0,1.38-.69,3.85,3.85,0,0,0,1-1.38,5.6,5.6,0,0,0,.42-2,5.6,5.6,0,0,1-.42,2,3.85,3.85,0,0,1-1,1.38,3.16,3.16,0,0,1-1.38.69A3.57,3.57,0,0,1,196.28,93.83Z" fill="#fff" opacity="0.51"></path>
                  <path d="M200.69,89.83a5.6,5.6,0,0,1-.42,2,3.85,3.85,0,0,1-1,1.38,3.16,3.16,0,0,1-1.38.69,3.57,3.57,0,0,1-1.62,0v.87a4.13,4.13,0,0,0,1.9.1,3.64,3.64,0,0,0,1.64-.79A4.35,4.35,0,0,0,201,92.4a6.24,6.24,0,0,0,.51-2.34Zm.79-.8a9.25,9.25,0,0,0-.57-2.43,9.34,9.34,0,0,0-1.16-2.16,7.79,7.79,0,0,0-1.59-1.69,6,6,0,0,0-1.85-1,6,6,0,0,1,1.85,1,7.79,7.79,0,0,1,1.59,1.69,9.34,9.34,0,0,1,1.16,2.16A9.25,9.25,0,0,1,201.48,89Zm-5.18-6.31a5.12,5.12,0,0,1,1.55.88A7.16,7.16,0,0,1,199.18,85a8.12,8.12,0,0,1,1,1.79,8.34,8.34,0,0,1,.5,2l.83.22a9.25,9.25,0,0,0-.57-2.43,9.34,9.34,0,0,0-1.16-2.16,7.79,7.79,0,0,0-1.59-1.69,6,6,0,0,0-1.85-1Zm11.89,8.08L201.48,89l-.83-.22-4.36-1.15-.71-.19-4.07-1.07-.64-.17-5.06-1.33.05.84,5,1.39.63.17,4.07,1.12.71.2,4.4,1.21.82.23,6.64,1.83Z" fill="#b80000"></path>
                </g>
                <path d="M195.58,88.42l-4.07-1.12a7.84,7.84,0,0,0,.41,2,7.68,7.68,0,0,0,.87,1.8A7.27,7.27,0,0,0,194,92.57a5.55,5.55,0,0,0,1.55,1Zm0-5.89a3.31,3.31,0,0,0-1.58.11,3.06,3.06,0,0,0-1.25.77,4,4,0,0,0-.85,1.3,5.23,5.23,0,0,0-.38,1.69l4.07,1.07Zm5.12,7.3-4.4-1.21v5.21a3.57,3.57,0,0,0,1.62,0,3.16,3.16,0,0,0,1.38-.69,3.85,3.85,0,0,0,1-1.38A5.6,5.6,0,0,0,200.69,89.83Zm-4.39-7.11v4.94l4.36,1.15a8.34,8.34,0,0,0-.5-2,8.12,8.12,0,0,0-1-1.79,7.16,7.16,0,0,0-1.33-1.41A5.12,5.12,0,0,0,196.3,82.72Z" fill="#fff" opacity="0.3"></path>
              </g>
            </g>
          }
          {
            (status?.team == 1 && status?.status == "Shot Off Goal") &&
            < svg id="SvgjsSvg1489" width="60" height="60" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg"
              x="338" y="60" xmlnsXlink="http://www.w3.org/1999/xlink" >
              <rect width="40" height="40" opacity="0" id="SvgjsRect1488"></rect>
              <svg id="SvgjsSvg1280" width="40" height="40" viewBox="0 0 289 205"
                xmlns="http://www.w3.org/2000/svg" y="0">
                <g id="SvgjsG1278">
                  <path fill="#222" fillOpacity=".08" d="M287 132l-71 72-195-77 73-31 193 36z" id="SvgjsPath1276"></path>
                  <g stroke="#fff" strokeWidth="2" fill="none" id="SvgjsG1274">
                    <path
                      d="M23 112l2.024 2.227 7.976 8.773M23 31l1.41-1.41 2.59-2.59M23 50l2.118-2.118 10.882-10.882M23 69l2.07-2.164 19.93-20.836M19 91l2.059-2.176 32.941-34.824M18.126 109.874l44.874-44.874M23 121l2.148-2.105 47.852-46.895M33 122l2.33-1.902 46.67-38.098M69 106l2.243-1.994 15.757-14.006M23 126l2.749-1.207s38.251-16.793 45.251-19.793l24-9M22 95l2.119 2.119 19.881 19.881M20 74l2.095 2.152 34.905 35.848M19.972 56.351l47.028 50.649M22 40l2.152 2.083 59.848 57.917M19.972 19.71l74.028 76.29"
                      id="SvgjsPath1272"></path>
                  </g>
                  <g stroke="#fff" strokeWidth="2" fill="none" id="SvgjsG1270">
                    <path
                      d="M242 35l-21 20M212 145l32 33M213 128l40 40M213 110l49 49M213 91l57 58M216 72l64 65M214 50l64 65M217 38l44 45M220 27l8.669 8.886c10.444 10.705 23.331 26.114 23.331 26.114M239 26s12.945 36.647 22 56c7.945 16.981 27 52 27 52M247 47l-26 26M251 61l-30 30M256 73l-35 36M260 86l-40 42M268 97l-48 49M217 166l57-56M218 185l63-64M218 204l70-72M217 185l9 11M215 165l20 22"
                      id="SvgjsPath1268"></path>
                  </g>
                  <g stroke="#fff" strokeWidth="2" fill="none" id="SvgjsG1266">
                    <path
                      d="M94 96l121 24M92 17l-38 37M109 19l-45 45M126 20l-54 53M142 23l-60 59M158 24l-70 66M173 27l-71 71M190 28l-73 72M209 27l-76 76M224 30l-77 76M218 56l-58 54M221 71s-30.279 28.598-43 41M219 93l-26 23M219 108l-11 10M125 16l2.106 2.128 92.894 93.872M144 17l2.038 2.206 70.962 76.794M170 25l2.072 2.181 45.428 47.819M187 26l2.191 2.051 28.809 26.949M27 27l17-15M36 37l24-23M78 14l-33 32M25 7l2.117 2.117 90.883 90.883M48 9l2.044 2.208 84.956 91.792M69 14l2.106 2.128 92.894 93.872M87 14l2.123 2.123 97.877 97.877M106 16l2.107 2.128 99.893 100.872"
                      id="SvgjsPath1264"></path>
                  </g>
                  <path fill="#fff"
                    d="M17 3h7v124h-7v-124zM214 29h9l-5 176-8-3 4-173zM21 3l200.018 20.794c1.094.114 1.982 1.102 1.982 2.204v7.003l-202-23v-7.001zM221 24h15.493c1.937 0 3.885 1.512 4.354 3.392l.153.608-23 3 3-7z"
                    id="SvgjsPath1262"></path>
                </g>
              </svg>
              <svg id="SvgjsSvg1260" width="25" height="25" viewBox="0 0 178 138"
                xmlns="http://www.w3.org/2000/svg" y="5" x="22">
                <g fill="none" id="SvgjsG1258">
                  <g id="SvgjsG1256">
                    <path
                      d="M45.563 63.8l-5.037-1.39c.406 6.223 1.686 12.384 3.67 18.251 1.983 5.864 4.683 11.472 7.94 16.579 3.274 5.135 7.133 9.793 11.421 13.717 4.334 3.967 9.131 7.203 14.236 9.428l-.011-6.807c-4.394-1.904-8.527-4.675-12.269-8.073-3.706-3.367-7.044-7.366-9.881-11.777-2.822-4.391-5.162-9.21-6.883-14.252-1.721-5.044-2.831-10.336-3.186-15.676z"
                      id="SvgjsPath1254" fill="#B80000"></path>
                    <path
                      d="M45.563 63.8c.354 5.34 1.465 10.632 3.187 15.676 1.721 5.042 4.061 9.861 6.883 14.252 2.837 4.411 6.175 8.41 9.881 11.777 3.741 3.398 7.875 6.169 12.269 8.073-4.394-1.904-8.527-4.675-12.269-8.073-3.706-3.367-7.044-7.366-9.881-11.777-2.822-4.391-5.162-9.21-6.883-14.252-1.722-5.044-2.832-10.336-3.187-15.676z"
                      id="SvgjsPath1252" opacity=".51" fill="#fff"></path>
                    <path
                      d="M77.793 120.385l.026 15.203 5.414 2.197.031-15.449.014-6.877.082-41.231-5.646-1.558.068 40.908.011 6.807zM77.624 18.333c-5.329-.835-10.305-.371-14.768 1.175-4.385 1.519-8.276 4.082-11.533 7.486-3.204 3.35-5.8 7.521-7.654 12.334-1.83 4.749-2.946 10.139-3.217 16.014.271-5.875 1.387-11.265 3.217-16.014 1.854-4.813 4.45-8.984 7.654-12.334 3.257-3.404 7.148-5.967 11.533-7.486 4.462-1.546 9.439-2.01 14.768-1.175zM45.551 56.687c.327-4.937 1.363-9.452 2.996-13.417 1.653-4.012 3.922-7.473 6.695-10.24 2.812-2.805 6.147-4.899 9.887-6.124 3.796-1.243 8.009-1.589 12.507-.869l-.013-7.704c-5.329-.835-10.305-.371-14.768 1.175-4.385 1.519-8.276 4.082-11.533 7.486-3.204 3.35-5.8 7.521-7.654 12.334-1.83 4.749-2.946 10.139-3.217 16.014l5.1 1.345zM77.636 26.037l.066 39.13 5.673 1.496.078-39.133.015-7.787.035-17.738-5.909-1.131.03 17.459.012 7.704z"
                      id="SvgjsPath1250" fill="#B80000"></path>
                    <path
                      d="M83.278 115.459c4.502 1.132 8.828 1.205 12.815.328 4.049-.892 7.749-2.764 10.917-5.504 3.216-2.781 5.88-6.45 7.801-10.879 1.944-4.482 3.12-9.727 3.332-15.58-.212 5.854-1.388 11.098-3.332 15.58-1.921 4.429-4.585 8.098-7.801 10.879-3.169 2.74-6.868 4.612-10.917 5.504-3.987.877-8.313.804-12.815-.328z"
                      id="SvgjsPath1248" opacity=".51" fill="#fff"></path>
                    <path
                      d="M118.144 83.824c-.211 5.854-1.387 11.098-3.332 15.58-1.921 4.429-4.585 8.098-7.801 10.879-3.169 2.74-6.868 4.612-10.917 5.504-3.987.877-8.313.804-12.815-.328l-.014 6.877c5.275 1.468 10.362 1.68 15.065.755 4.789-.94 9.179-3.06 12.951-6.227 3.838-3.222 7.028-7.521 9.332-12.746 2.337-5.301 3.753-11.532 4.004-18.509l-6.473-1.785zM124.388 77.48c-.591-6.538-2.142-13.023-4.482-19.188-2.34-6.163-5.456-11.969-9.168-17.162-3.69-5.162-7.949-9.691-12.595-13.35-4.594-3.619-9.545-6.369-14.674-8.037 5.129 1.668 10.08 4.418 14.674 8.037 4.646 3.659 8.905 8.188 12.595 13.35 3.712 5.193 6.829 11 9.168 17.162 2.34 6.165 3.89 12.65 4.482 19.188zM83.453 27.53c4.286 1.513 8.412 3.89 12.238 6.958 3.862 3.096 7.405 6.884 10.485 11.175 3.096 4.313 5.711 9.118 7.705 14.211 1.994 5.096 3.357 10.457 3.956 15.877l6.552 1.729c-.591-6.538-2.142-13.023-4.482-19.188-2.34-6.163-5.456-11.969-9.168-17.162-3.69-5.162-7.949-9.691-12.595-13.35-4.594-3.619-9.545-6.369-14.674-8.037l-.017 7.787zM177.526 91.496l-53.138-14.016-6.552-1.728-34.461-9.089-5.673-1.496-32.151-8.48-5.1-1.345-40.05-10.564.445 6.684 39.68 10.948 5.037 1.39 32.151 8.87 5.646 1.558 34.784 9.596 6.472 1.785 52.542 14.496.368-8.609z"
                      id="SvgjsPath1246" fill="#B80000"></path>
                  </g>
                  <g fill="#fff" opacity=".3" id="SvgjsG1244">
                    <path
                      d="M77.714 72.67l-32.15-8.87c.354 5.34 1.465 10.632 3.187 15.676 1.721 5.042 4.061 9.861 6.883 14.252 2.837 4.411 6.175 8.41 9.881 11.777 3.741 3.398 7.875 6.169 12.269 8.073l-.07-40.908zM77.636 26.037c-4.499-.721-8.711-.374-12.507.869-3.739 1.225-7.074 3.319-9.887 6.124-2.773 2.767-5.042 6.228-6.695 10.24-1.633 3.966-2.669 8.481-2.996 13.417l32.151 8.48-.066-39.13zM118.144 83.824l-34.784-9.597-.082 41.231c4.502 1.132 8.828 1.205 12.815.328 4.049-.892 7.749-2.764 10.917-5.504 3.216-2.781 5.88-6.45 7.801-10.879 1.945-4.481 3.121-9.725 3.333-15.579zM83.453 27.53l-.078 39.133 34.461 9.089c-.599-5.42-1.961-10.781-3.956-15.877-1.994-5.094-4.609-9.898-7.705-14.211-3.08-4.292-6.623-8.079-10.485-11.175-3.826-3.069-7.952-5.446-12.237-6.959z"
                      id="SvgjsPath1242"></path>
                  </g>
                </g>
              </svg>
              <defs id="SvgjsDefs1470">
                <linearGradient x1="83.084%" y1="25.765%" x2="113.188%" y2="38.749%" id="SvgjsLinearGradient1468">
                  <stop stopColor="#DAA58F" offset="0%" id="SvgjsStop1466"></stop>
                  <stop stopColor="#87594C" offset="100%" id="SvgjsStop1464"></stop>
                </linearGradient>
                <linearGradient x1="83.084%" y1="26.144%" x2="113.188%" y2="38.925%" id="SvgjsLinearGradient1462">
                  <stop stopColor="#DAA58F" offset="0%" id="SvgjsStop1460"></stop>
                  <stop stopColor="#87594C" offset="100%" id="SvgjsStop1458"></stop>
                </linearGradient>
              </defs>
            </svg>
          }

          {
            (status?.team == 2 && status?.status == "Shot Off Goal") &&
            <svg id="SvgjsSvg2472" width="60" height="60" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" x="2"
              y="60" xmlnsXlink="http://www.w3.org/1999/xlink">
              <rect width="40" height="40" opacity="0" id="SvgjsRect2471"></rect>
              <svg id="SvgjsSvg2469" width="40" height="40" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"
                y="60">
                <g fill="none" id="SvgjsG2467">
                  <path fill="#E3E3E3" d="M0 0h1v12h-1z" id="SvgjsPath2465"></path>
                  <g id="SvgjsG2463">
                    <path fill="#D4EC3D" d="M1 .05h6v6h-6z" id="SvgjsPath2461"></path>
                    <path fill="#A10808" d="M4 3h3v3h-3z" id="SvgjsPath2459"></path>
                    <path fill="#A10808" d="M1 0h3v3h-3z" id="SvgjsPath2457"></path>
                  </g>
                </g>
              </svg>
              <svg id="SvgjsSvg2455" width="40" height="40" viewBox="0 0 106 249" xmlns="http://www.w3.org/2000/svg"
                y="60">
                <g fill="none" fillRule="evenodd" id="SvgjsG2439">
                  <path
                    d="M57.24 102.543s-.54 19.035 0 20.962c.447 1.607.984 5.302.984 5.302s-.965 6.216 2.842 6.608c1.848.19 9.075 1.215 10.955 0 2.26-1.46 4.98-5.41 4.98-5.708 0-1.06-2.137-15.207-2.137-15.207C76.555 114.5 62.05 93 62.05 93l-4.81 9.543z"
                    fill="#CC947B" id="SvgjsPath2437"></path>
                  <path
                    d="M5.826 11.243s-2.718 4.183-3.3 5.1c-.85 1.344-1.313 6.068-1.313 6.068l1.313 4.423 2.148 3.39 2.148 1.13h3.222c1.074 0 4.297-2.26 4.297-2.26l3.223-3.39s6.605-12.67 6.963-17.19L16.47.864 5.826 11.243z"
                    fill="url(#a)" transform="translate(13 107) rotate(2 12.869 16.11)" id="SvgjsPath2435"></path>
                  <path
                    d="M24.908 135.345s.97-2.512 1.205-3.874c.256-1.49.266-4.69.266-4.69l-1.993-2.55-1.767-.716-2.483.304c-.827.1-3.085 2.24-3.085 2.24l.072 7.445 7.784 1.842z"
                    fill="#F3D5C9" id="SvgjsPath2433"></path>
                  <path
                    d="M26.288 102.946c-.23.186-2.148 5.705-2.148 5.705s-.492 2.4-1.074 3.29c-.85 1.302-1.074 4.386-1.074 4.386v6.58l2.148 3.288 2.148 1.096h3.222c1.074 0 4.297-2.193 4.297-2.193l3.222-3.29s6.604-12.286 6.962-16.672L37.03 98.29s-6.676 1.388-10.742 4.656z"
                    id="SvgjsPath2431" fill="url(#b)" transform="rotate(25 32.992 112.79)"></path>
                  <g fill="#DAA58F" id="SvgjsG2429">
                    <path
                      d="M8 105v-1.076s.145-2.07 1-2.924l3-3.058s3.722-1.843 4-1.982c1.055-.526 5-3.003 5-3.003l13-4.984s6.898 5.222 9 4c1.898-1.104 7-1.994 7-1.994l9 .996L64 83l11 14.954L88 115.9s1.786 3.752 2 6.1c.12 1.308 0 5.863 0 5.863s-.82 5.9-1 6.978c-.153.918-5 17.946-5 17.946L79 168l-6 16-1 6.67-7 3.988-17 5.98s-9 .998-14 4.986c-2.406 1.92.61-1.536-1-6.624-.702-2.22 1 3.658 0-11-.22-3.212-.783-5.7-2-13s-3-12.015-3-17c0-.73-1-11.018 1-17 2-5.982 4-13.137 4-13.137l5-6.98s17.254 7.37 20 10.117c2 2 8 3 8 3l7-1s2.845-5.613 3-7c.18-1.604-1-10.1-1-10.1L62 95.96l-6 7.976s-2.87 2.902-6 3.988C45.464 109.497 34 102 34 102l-11 5.91s-4 1.995-5 1.995h-4l-3-.997-2-.997-1-.996V105z"
                      id="SvgjsPath2427"></path>
                  </g>
                  <path
                    d="M8 105v-1.076s.145-2.07 1-2.924l3-3.058s3.722-1.843 4-1.982c1.055-.526 5-3.003 5-3.003l13-4.984s6.898 5.222 9 4c1.898-1.104 7-1.994 7-1.994l9 .996L64 83l11 14.954L88 115.9s1.786 3.752 2 6.1c.12 1.308 0 5.863 0 5.863s-.82 5.9-1 6.978c-.153.918-5 17.946-5 17.946L79 168l-6 16-1 6.67-7 3.988-17 5.98s-9 .998-14 4.986c-2.406 1.92.61-1.536-1-6.624-.702-2.22 1 3.658 0-11-.22-3.212-.783-5.7-2-13s-3-12.015-3-17c0-.73-1-11.018 1-17 2-5.982 4-13.137 4-13.137l5-6.98s17.254 7.37 20 10.117c2 2 8 3 8 3l7-1s2.845-5.613 3-7c.18-1.604-1-10.1-1-10.1L62 95.96l-6 7.976s-2.87 2.902-6 3.988C45.464 109.497 34 102 34 102l-11 5.91s-4 1.995-5 1.995h-4l-3-.997-2-.997-1-.996V105z"
                    id="SvgjsPath2425"></path>
                  <path
                    d="M30.636 120.878c4.727-1.268 0 0 0 0s.663-2.43.733-3.705c.076-1.396-.293-4.307-.293-4.307s-5.817-1.072-6.623-.856c-.805.216-1.685 2.326-1.685 2.326s-.663 2.086-.844 3.028c-.175.908.805 3.002.805 3.002s3.18 1.78 7.906.512z"
                    fill="#EFCDBE" id="SvgjsPath2423"></path>
                  <rect fill="#F4E845" transform="rotate(19 45 52.184)" x="13.5" y="8.184" width="63" height="88" rx="8"
                    id="SvgjsRect2421"></rect>
                  <path
                    d="M59 102.815l3 10.592-3.555 5.135-.445.643V124l6-.963-4-.963v-2.89c0-.642 4-4.814 4-4.814h4c2.152 0 8 .963 8 .963s-12-2.89-12-3.852c0-.96-3-7.702-3-7.702L69 98l-10 4.815z"
                    fillOpacity=".53" fill="#3F140F" id="SvgjsPath2419"></path>
                  <path d="M57 196c-8.31 3.672-24 8-24 8l14 45h59s-31-61-32-61-10.976 5.338-17 8z" fill="#222"
                    id="SvgjsPath2417"></path>
                  <path
                    d="M34 208s-5-20-8-29c-5.518-16.553 1.096-38.205 2-42 .763-3.205 4-9 4-9s8.88-15.577 9-17.344c.214-3.184 0-10.892 0-10.892s-.01-9.82 0-9.902c.28-2.073 1-5.94 1-5.94s.448-2.504 1-3.96c.448-1.185 3-2.972 3-2.972s2-.99 4-.99h4l2 .99c2 .99 2 1.98 2 1.98l1 3.96V92.833l-1 8.912-1 8.912v3.96L74 186l-40 22z"
                    fill="#DAA58F" id="SvgjsPath2415"></path>
                  <path d="M43 103.407l5 .797 7-.797H43zM43 101.407l5 .797 7-.797H43z" fillOpacity=".53" fill="#3F140F"
                    id="SvgjsPath2413"></path>
                  <path
                    d="M46.906 89.46c.99.586 3.838.96 3.838.96s3.176.394 3.838 0c.94-.558.972-2.855.972-2.855s.38-3.47 0-5.75c-.188-1.114-1.116-1.85-1.28-1.933H51.08s-1.76-.055-1.915 0c-.234.082-1.357.045-1.915.64-.605.644-.638 1.92-.638 1.92l-.635 5.154s.33 1.508.93 1.863z"
                    fill="#F3D5C9" id="SvgjsPath2411"></path>
                  <path
                    d="M68 187c-6.68 3.05-23.736 9.4-25 10-2.535 1.204-11 5-11 5s.48 4.44 1 6c.48 1.44 2 5 2 5l43-18s-1.022-2.97-2-5c-.948-1.97-.85-7-1-7-.095 0-3.968 2.615-7 4z"
                    fill="#E5E5E5" id="SvgjsPath2409"></path>
                </g>
              </svg>
              <svg id="SvgjsSvg2407" width="40" height="40" viewBox="0 0 105 250" xmlns="http://www.w3.org/2000/svg"
                y="60">
                <defs id="SvgjsDefs2405">
                  <linearGradient x1="83.084%" y1="25.765%" x2="113.188%" y2="38.749%" id="SvgjsLinearGradient2403">
                    <stop stopColor="#DAA58F" offset="0%" id="SvgjsStop2401"></stop>
                    <stop stopColor="#87594C" offset="100%" id="SvgjsStop2399"></stop>
                  </linearGradient>
                  <linearGradient x1="83.084%" y1="26.144%" x2="113.188%" y2="38.925%" id="SvgjsLinearGradient2397">
                    <stop stopColor="#DAA58F" offset="0%" id="SvgjsStop2395"></stop>
                    <stop stopColor="#87594C" offset="100%" id="SvgjsStop2393"></stop>
                  </linearGradient>
                </defs>
                <g fill="none" fillRule="evenodd" id="SvgjsG2391">
                  <path
                    d="M56.24 103.543s-.54 19.035 0 20.962c.447 1.607.984 5.302.984 5.302s-.965 6.216 2.842 6.608c1.848.19 9.075 1.215 10.955 0 2.26-1.46 4.98-5.41 4.98-5.708 0-1.06-2.137-15.207-2.137-15.207C75.555 115.5 61.05 94 61.05 94l-4.81 9.543z"
                    fill="#CC947B" id="SvgjsPath2389"></path>
                  <path
                    d="M5.826 11.243s-2.718 4.183-3.3 5.1c-.85 1.344-1.313 6.068-1.313 6.068l1.313 4.423 2.148 3.39 2.148 1.13h3.222c1.074 0 4.297-2.26 4.297-2.26l3.223-3.39s6.605-12.67 6.963-17.19L16.47.864 5.826 11.243z"
                    fill="url(#a)" transform="translate(12 108) rotate(2 12.869 16.11)" id="SvgjsPath2387"></path>
                  <path
                    d="M23.802 134.387s1.013-2.493 1.27-3.85c.282-1.487.345-4.682.345-4.682l-1.947-2.582-1.753-.745-2.486.26c-.827.09-3.12 2.188-3.12 2.188l-.054 7.44 7.746 1.97z"
                    fill="#F9DFD5" id="SvgjsPath2385"></path>
                  <path
                    d="M25.288 103.946c-.23.186-2.148 5.705-2.148 5.705s-.492 2.4-1.074 3.29c-.85 1.302-1.074 4.386-1.074 4.386v6.58l2.148 3.288 2.148 1.096h3.222c1.074 0 4.297-2.193 4.297-2.193l3.222-3.29s6.604-12.286 6.962-16.672L36.03 99.29s-6.676 1.388-10.742 4.656z"
                    id="SvgjsPath2383" fill="url(#b)" transform="rotate(25 31.992 113.79)"></path>
                  <g fill="#DAA58F" id="SvgjsG2381">
                    <path
                      d="M6 101v-1.076s.145-2.07 1-2.924l3-3.058s3.722-1.843 4-1.982c.814-.406 6.916-2.54 9.665-3.497L25 88l11-2s3.898 8.195 6 6.973c1.898-1.104 7-1.994 7-1.994l9 .996L63 84l11 14.954L87 116.9s1.786 3.752 2 6.1c.12 1.308 0 5.863 0 5.863s-.82 5.9-1 6.978c-.153.918-5 17.946-5 17.946L78 169l-6 16-1 6.67-7 3.988-17 5.98s-9 .998-14 4.986c-2.406 1.92.61-1.536-1-6.624-.702-2.22 1 3.658 0-11-.22-3.212-.783-5.7-2-13s-3-12.015-3-17c0-.73-1-11.018 1-17 2-5.982 4-13.137 4-13.137l5-6.98s17.254 7.37 20 10.117c2 2 8 3 8 3l7-1s2.845-5.613 3-7c.18-1.604-1-10.1-1-10.1L61 96.96l-6 7.976s-2.87 2.902-6 3.988C44.464 110.497 30 101 30 101l-9 4.91s-4 1.995-5 1.995h-4l-3-.997-2-.997-1-2.996V101z"
                      id="SvgjsPath2379"></path>
                  </g>
                  <path
                    d="M6 101v-1.076s.145-2.07 1-2.924l3-3.058s3.722-1.843 4-1.982c.814-.406 6.916-2.54 9.665-3.497L25 88l11-2s3.898 8.195 6 6.973c1.898-1.104 7-1.994 7-1.994l9 .996L63 84l11 14.954L87 116.9s1.786 3.752 2 6.1c.12 1.308 0 5.863 0 5.863s-.82 5.9-1 6.978c-.153.918-5 17.946-5 17.946L78 169l-6 16-1 6.67-7 3.988-17 5.98s-9 .998-14 4.986c-2.406 1.92.61-1.536-1-6.624-.702-2.22 1 3.658 0-11-.22-3.212-.783-5.7-2-13s-3-12.015-3-17c0-.73-1-11.018 1-17 2-5.982 4-13.137 4-13.137l5-6.98s17.254 7.37 20 10.117c2 2 8 3 8 3l7-1s2.845-5.613 3-7c.18-1.604-1-10.1-1-10.1L61 96.96l-6 7.976s-2.87 2.902-6 3.988C44.464 110.497 30 101 30 101l-9 4.91s-4 1.995-5 1.995h-4l-3-.997-2-.997-1-2.996V101z"
                    id="SvgjsPath2377"></path>
                  <path
                    d="M29.636 121.878c4.727-1.268 0 0 0 0s.663-2.43.733-3.705c.076-1.396-.293-4.307-.293-4.307s-5.817-1.072-6.623-.856c-.805.216-1.685 2.326-1.685 2.326s-.663 2.086-.844 3.028c-.175.908.805 3.002.805 3.002s3.18 1.78 7.906.512z"
                    fill="#EFCDBE" id="SvgjsPath2375"></path>
                  <rect fill="#F00" transform="rotate(19 45 52.184)" x="13.5" y="8.184" width="63" height="88" rx="8"
                    id="SvgjsRect2373"></rect>
                  <path
                    d="M58 103.815l3 10.592-3.555 5.135-.445.643V125l6-.963-4-.963v-2.89c0-.642 4-4.814 4-4.814h4c2.152 0 8 .963 8 .963s-12-2.89-12-3.852c0-.96-3-7.702-3-7.702L68 99l-10 4.815z"
                    fillOpacity=".53" fill="#3F140F" id="SvgjsPath2371"></path>
                  <path d="M56 197c-8.31 3.672-24 8-24 8l14 45h59s-31-61-32-61-10.976 5.338-17 8z" fill="#222"
                    id="SvgjsPath2369"></path>
                  <path
                    d="M33 209s-5-20-8-29c-5.518-16.553 1.096-38.205 2-42 .763-3.205 4-9 4-9s8.88-15.577 9-17.344c.214-3.184 0-10.892 0-10.892s-.01-9.82 0-9.902c.28-2.073 1-5.94 1-5.94s.448-2.504 1-3.96c.448-1.185 3-2.972 3-2.972s2-.99 4-.99h4l2 .99c2 .99 2 1.98 2 1.98l1 3.96V93.833l-1 8.912-1 8.912v3.96L73 187l-40 22z"
                    fill="#DAA58F" id="SvgjsPath2367"></path>
                  <path d="M42 104.407l5 .797 7-.797H42zM42 102.407l5 .797 7-.797H42z" fillOpacity=".53" fill="#3F140F"
                    id="SvgjsPath2365"></path>
                  <path
                    d="M45.906 90.46c.99.586 3.838.96 3.838.96s3.176.394 3.838 0c.94-.558.972-2.855.972-2.855s.38-3.47 0-5.75c-.188-1.114-1.116-1.85-1.28-1.933H50.08s-1.76-.055-1.915 0c-.234.082-1.357.045-1.915.64-.605.644-.638 1.92-.638 1.92l-.635 5.154s.33 1.508.93 1.863z"
                    fill="#F3D5C9" id="SvgjsPath2363"></path>
                  <path
                    d="M67 188c-6.68 3.05-23.736 9.4-25 10-2.535 1.204-11 5-11 5s.48 4.44 1 6c.48 1.44 2 5 2 5l43-18s-1.022-2.97-2-5c-.948-1.97-.85-7-1-7-.095 0-3.968 2.615-7 4z"
                    fill="#E5E5E5" id="SvgjsPath2361"></path>
                </g>
              </svg>
              <svg id="SvgjsSvg2359" width="40" height="40" viewBox="0 0 17 21" xmlns="http://www.w3.org/2000/svg"
                y="60">
                <g fill="none" id="SvgjsG2357">
                  <path
                    d="M11.449 20.692c.322.452.849.445 1.166 0l3.294-4.62c.322-.452.128-.818-.423-.818h-6.908c-.556 0-.74.373-.423.818l3.294 4.62zm-1.647-5.437h4.46v-5.25c0-.555-.444-1.005-1.001-1.005h-2.458c-.553 0-1.001.45-1.001 1.005v5.25z"
                    id="SvgjsPath2355" fill="#6F4E39"></path>
                  <path
                    d="M3.927.855c.283-.473.743-.472 1.025 0l3.368 5.63c.283.473.065.857-.495.857h-6.771c-.557 0-.778-.384-.495-.857l3.368-5.63zm-1.458 6.486h3.94v6.172c0 .551-.452.997-.994.997h-1.952c-.549 0-.994-.448-.994-.997v-6.172z"
                    fill="#51CC66" id="SvgjsPath2353"></path>
                </g>
              </svg>
              <svg id="SvgjsSvg2351" width="50" height="50" viewBox="15 5 63 43" xmlns="http://www.w3.org/2000/svg"
                y="60">
                <g fill="none" transform="translate(35 11)" id="SvgjsG2349">
                  <path d="M12 23c5.851 0 11-5.149 11-11.5s-5.149-11.5-11-11.5c-6.851 0-12 5.149-12 11.5s5.149 11.5 12 11.5z"
                    stroke="#525252" strokeWidth=".5" fill="#F8F8F8" id="SvgjsPath2347"></path>
                  <path
                    d="M15 1l-2 2-1 1m8.45 6.095s-1.522-1.341-3.087-2.142c-1.564-.801-3.821-1.022-3.821-1.022m-3.947 2.179s-.236 1.846 0 3.361l1.045 3.359m3.98 2.314s2.221.134 3.916-1.092c1.698-1.222 2.524-2.914 2.524-2.914m-19.796-3.604s.658-1.558 2.093-2.537c1.436-.978 3.464-1.296 3.464-1.296m-2.034-4.634c1.659-.436 3.224 2.103 3.224 2.103m-6.003 10.461s1 1.861 2.492 2.641c1.491.778 3.336.879 3.336.879m5.046 3.022l.738 1.78m-4.099-1.951l-.783 2"
                    id="SvgjsPath2345" strokeWidth=".652" stroke="#808080"></path>
                  <path
                    d="M14 7.075l-4.008 2.925-3.992-2.989 1.669-3.982 4.97-.028 1.362 4.075zm-.364 14.925l1.364-4.075-4.008-2.925-3.992 2.989 1.669 3.981 4.967.03zm-13.46-12.271h1.904l.848 5.809-1.468 1.603s-.861-.913-1.305-3.342c-.36-1.966.021-4.07.021-4.07zm21.815-2.466l-3.106 2.528.957 5.278 2.805-.813s.424-1.758.192-3.828c-.178-1.539-.849-3.164-.849-3.164zm-7.991-5.263l4-.578s-.618-.401-2.001-.896c-1.379-.496-1.999-.526-1.999-.526v2z"
                    fill="#1A1A1A" id="SvgjsPath2343"></path>
                </g>
                <g stroke="#fff" fill="none" transform="translate(23,0)" id="SvgjsG2341">
                  <path
                    d="M1.306-1.331s10.859 4.893 17.233 7.871c6.372 2.979 9.675 4.948 13.594 6.928 3.32 1.677 6.878 2.359 6.798 6.865-.078 4.41-1.08 5.173-3.594 7.515-4.038 3.764-7.341 5.492-10.449 7.258-3.363 1.909-6.982 6.872-6.982 6.872"
                    id="SvgjsPath2339"></path>
                  <path d="M21.145 8.028s-4.272-1.886-8.946-3.161c-5.2-1.419-10.927-4.196-10.927-4.196" id="SvgjsPath2337">
                  </path>
                  <path
                    d="M7.516 1.485s1.089 2.117.563 2.292c-.526.176-2.605-1.416-3.305-2.342-.701-.925-.447-1.712-.447-1.712"
                    id="SvgjsPath2335"></path>
                  <path d="M3.252 1.705l.948 3.018" id="SvgjsPath2333"></path>
                  <path d="M1.217 3.669l9.928 4.179" id="SvgjsPath2331"></path>
                  <path
                    d="M8.216 3.836c.008-.468 1.469 3.169 3.703 4.731 2.234 1.563 6.562 4.182 6.562 4.182l3.289 4.737 6.283 1.594 4.423-2.704s6.748-.186 6.466 2.899c-.283 3.085-5.66 6.092-7.399 7.297-4.936 3.419-6.799 8.529-6.799 8.529"
                    id="SvgjsPath2329"></path>
                  <path
                    d="M32.748 30.418l-.312-3.93-5.203-1.347-6.424 2.801-3.157 5.442s-2.91.948-5.746 3.428c-2.838 2.48-5.368 4.964-5.368 4.964"
                    id="SvgjsPath2327"></path>
                  <path
                    d="M33.001 16.243s-5-1.766-6.632-2.603c-1.635-.837-3.42-1.474-3.42-1.474s-3.068-1.143-4.269-2.374c-1.2-1.231-3.5-3.871-3.5-3.871"
                    id="SvgjsPath2325"></path>
                  <path d="M16.163 6.938l4.223 9.079 3.423-3.834s-4.088-4.684-3.27-4.67c.816.015 12.463 8.73 12.463 8.73"
                    id="SvgjsPath2323"></path>
                  <path d="M11.199 4.848l2.91 5.054" id="SvgjsPath2321"></path>
                  <path d="M27.8 19.15s.202.625.079 2.702c-.122 2.078-1.057 4.282-1.057 4.282" id="SvgjsPath2319"></path>
                  <path
                    d="M26.239 31.585l-5.177 2.733s-.154 1.383-2.436 2.673l-4.845 3.914-1.227-.022 3.107-4.143c.656-.567 3.74-2.525 3.74-2.525l3.166-4.735 6.215-1.067s-1.687-3.303-1.49-3.27"
                    id="SvgjsPath2317"></path>
                  <path d="M19.643 36.062l-2 .012" id="SvgjsPath2315"></path>
                  <path d="M26.733 31.135l-5-.089" id="SvgjsPath2313"></path>
                  <path
                    d="M27.895 22.153s-1.874.331-4.985.715c-3.112.384-5.401-.096-5.401-.096l-3.379-5.096s-1.781-1.003-1.918-1.065c-.139-.061-2.205-.274-2.205-.274l-4.737-5.329-4.101-4.617.648-.711 7.825 4.774s2.08 1.165 3.117 2.297c1.037 1.132 1.718 2.14 1.718 2.14l4.493.842 3.39 2.125-4.484 2.368-3.227-.721-5.202 1.977-1.126-2.379-3.123-.07-4.166-4.866 3.672-3.803"
                    id="SvgjsPath2311"></path>
                  <path d="M10.002 15.831l-2.054 2.965" id="SvgjsPath2309"></path>
                  <path d="M1.038 13.669l2.334 7.19 2.922 5.907 3.296.06 1.825-2.367 3.176.408 2.976-2.579.367-2.554"
                    id="SvgjsPath2307"></path>
                  <path d="M6.787 27.777l1.905-5.968 2.139 3.603" id="SvgjsPath2305"></path>
                  <path d="M4.948 18.74l-1.732 2.299-2.321.629" id="SvgjsPath2303"></path>
                  <path
                    d="M-.275 31.129l2.411-.262 1.638 5.858 1.981.035 3.93-3.245s3.412-.682 4.639-2.125l5.451-2.703.084-4.677-8.961 5.777-7.195 6.695 3.171-9.181"
                    id="SvgjsPath2301"></path>
                  <path d="M6.806 26.777l-5.09 4.911" id="SvgjsPath2299"></path>
                  <path d="M.572 39.669l4.072-3.928" id="SvgjsPath2297"></path>
                  <path d="M-.41 38.65l3.982 1.073" id="SvgjsPath2295"></path>
                  <path d="M1.536 41.687l5.43-5.905 5.674.366" id="SvgjsPath2293"></path>
                  <path d="M11.625 36.866l3.111-6.159 1.073-4.123-1.669-1.678" id="SvgjsPath2291"></path>
                  <path d="M9.554 40.83l3.913-3.938 1.195-1.973" id="SvgjsPath2289"></path>
                  <path d="M13.624 36.957l3 .098" id="SvgjsPath2287"></path>
                  <path d="M16.679 33.989l3.984 1.003" id="SvgjsPath2285"></path>
                  <path d="M19.787 28.01l2.965 2.053" id="SvgjsPath2283"></path>
                  <path d="M11.84 24.866l.876 7.018" id="SvgjsPath2281"></path>
                  <path d="M10.841 24.849l-4.107 5.928 2.947 3.054" id="SvgjsPath2279"></path>
                  <path d="M16.876 22.956l-.054 3" id="SvgjsPath2277"></path>
                  <path d="M13.967 17.902l.637-2.99" id="SvgjsPath2275"></path>
                  <path d="M11.985 16.866l-1.892-6.036-5.736-1.103-4.253.26" id="SvgjsPath2273"></path>
                  <path d="M4.11 9.723l1.038-2.073 4.016-.837" id="SvgjsPath2271"></path>
                  <path d="M21.679 34.044l-1.784 4.971-4.306-.078 5.071-3.902" id="SvgjsPath2269"></path>
                  <path d="M34.858 24.278c1.711.484.666 2.012.648 3.013" id="SvgjsPath2267"></path>
                  <path d="M13.626 36.902l3.982 1.072" id="SvgjsPath2265"></path>
                </g>
              </svg>
              <svg id="SvgjsSvg2263" width="40" height="40" viewBox="0 0 289 205" xmlns="http://www.w3.org/2000/svg"
                y="0">
                <g id="SvgjsG2261" transform="matrix(-1,0,0,1,305,0)">
                  <path fill="#222" fillOpacity=".08" d="M287 132l-71 72-195-77 73-31 193 36z" id="SvgjsPath2259"></path>
                  <g stroke="#fff" strokeWidth="2" fill="none" id="SvgjsG2257">
                    <path
                      d="M23 112l2.024 2.227 7.976 8.773M23 31l1.41-1.41 2.59-2.59M23 50l2.118-2.118 10.882-10.882M23 69l2.07-2.164 19.93-20.836M19 91l2.059-2.176 32.941-34.824M18.126 109.874l44.874-44.874M23 121l2.148-2.105 47.852-46.895M33 122l2.33-1.902 46.67-38.098M69 106l2.243-1.994 15.757-14.006M23 126l2.749-1.207s38.251-16.793 45.251-19.793l24-9M22 95l2.119 2.119 19.881 19.881M20 74l2.095 2.152 34.905 35.848M19.972 56.351l47.028 50.649M22 40l2.152 2.083 59.848 57.917M19.972 19.71l74.028 76.29"
                      id="SvgjsPath2255"></path>
                  </g>
                  <g stroke="#fff" strokeWidth="2" fill="none" id="SvgjsG2253">
                    <path
                      d="M242 35l-21 20M212 145l32 33M213 128l40 40M213 110l49 49M213 91l57 58M216 72l64 65M214 50l64 65M217 38l44 45M220 27l8.669 8.886c10.444 10.705 23.331 26.114 23.331 26.114M239 26s12.945 36.647 22 56c7.945 16.981 27 52 27 52M247 47l-26 26M251 61l-30 30M256 73l-35 36M260 86l-40 42M268 97l-48 49M217 166l57-56M218 185l63-64M218 204l70-72M217 185l9 11M215 165l20 22"
                      id="SvgjsPath2251"></path>
                  </g>
                  <g stroke="#fff" strokeWidth="2" fill="none" id="SvgjsG2249">
                    <path
                      d="M94 96l121 24M92 17l-38 37M109 19l-45 45M126 20l-54 53M142 23l-60 59M158 24l-70 66M173 27l-71 71M190 28l-73 72M209 27l-76 76M224 30l-77 76M218 56l-58 54M221 71s-30.279 28.598-43 41M219 93l-26 23M219 108l-11 10M125 16l2.106 2.128 92.894 93.872M144 17l2.038 2.206 70.962 76.794M170 25l2.072 2.181 45.428 47.819M187 26l2.191 2.051 28.809 26.949M27 27l17-15M36 37l24-23M78 14l-33 32M25 7l2.117 2.117 90.883 90.883M48 9l2.044 2.208 84.956 91.792M69 14l2.106 2.128 92.894 93.872M87 14l2.123 2.123 97.877 97.877M106 16l2.107 2.128 99.893 100.872"
                      id="SvgjsPath2247"></path>
                  </g>
                  <path fill="#fff"
                    d="M17 3h7v124h-7v-124zM214 29h9l-5 176-8-3 4-173zM21 3l200.018 20.794c1.094.114 1.982 1.102 1.982 2.204v7.003l-202-23v-7.001zM221 24h15.493c1.937 0 3.885 1.512 4.354 3.392l.153.608-23 3 3-7z"
                    id="SvgjsPath2245"></path>
                </g>
              </svg>
              <svg id="SvgjsSvg2243" width="25" height="25" viewBox="0 0 178 138" xmlns="http://www.w3.org/2000/svg"
                y="5" x="-6">
                <g fill="none" id="SvgjsG2241" transform="matrix(-1,0,0,1,177.92700958251953,0)">
                  <g id="SvgjsG2239">
                    <path
                      d="M45.563 63.8l-5.037-1.39c.406 6.223 1.686 12.384 3.67 18.251 1.983 5.864 4.683 11.472 7.94 16.579 3.274 5.135 7.133 9.793 11.421 13.717 4.334 3.967 9.131 7.203 14.236 9.428l-.011-6.807c-4.394-1.904-8.527-4.675-12.269-8.073-3.706-3.367-7.044-7.366-9.881-11.777-2.822-4.391-5.162-9.21-6.883-14.252-1.721-5.044-2.831-10.336-3.186-15.676z"
                      id="SvgjsPath2237" fill="#B80000"></path>
                    <path
                      d="M45.563 63.8c.354 5.34 1.465 10.632 3.187 15.676 1.721 5.042 4.061 9.861 6.883 14.252 2.837 4.411 6.175 8.41 9.881 11.777 3.741 3.398 7.875 6.169 12.269 8.073-4.394-1.904-8.527-4.675-12.269-8.073-3.706-3.367-7.044-7.366-9.881-11.777-2.822-4.391-5.162-9.21-6.883-14.252-1.722-5.044-2.832-10.336-3.187-15.676z"
                      id="SvgjsPath2235" opacity=".51" fill="#fff"></path>
                    <path
                      d="M77.793 120.385l.026 15.203 5.414 2.197.031-15.449.014-6.877.082-41.231-5.646-1.558.068 40.908.011 6.807zM77.624 18.333c-5.329-.835-10.305-.371-14.768 1.175-4.385 1.519-8.276 4.082-11.533 7.486-3.204 3.35-5.8 7.521-7.654 12.334-1.83 4.749-2.946 10.139-3.217 16.014.271-5.875 1.387-11.265 3.217-16.014 1.854-4.813 4.45-8.984 7.654-12.334 3.257-3.404 7.148-5.967 11.533-7.486 4.462-1.546 9.439-2.01 14.768-1.175zM45.551 56.687c.327-4.937 1.363-9.452 2.996-13.417 1.653-4.012 3.922-7.473 6.695-10.24 2.812-2.805 6.147-4.899 9.887-6.124 3.796-1.243 8.009-1.589 12.507-.869l-.013-7.704c-5.329-.835-10.305-.371-14.768 1.175-4.385 1.519-8.276 4.082-11.533 7.486-3.204 3.35-5.8 7.521-7.654 12.334-1.83 4.749-2.946 10.139-3.217 16.014l5.1 1.345zM77.636 26.037l.066 39.13 5.673 1.496.078-39.133.015-7.787.035-17.738-5.909-1.131.03 17.459.012 7.704z"
                      id="SvgjsPath2233" fill="#B80000"></path>
                    <path
                      d="M83.278 115.459c4.502 1.132 8.828 1.205 12.815.328 4.049-.892 7.749-2.764 10.917-5.504 3.216-2.781 5.88-6.45 7.801-10.879 1.944-4.482 3.12-9.727 3.332-15.58-.212 5.854-1.388 11.098-3.332 15.58-1.921 4.429-4.585 8.098-7.801 10.879-3.169 2.74-6.868 4.612-10.917 5.504-3.987.877-8.313.804-12.815-.328z"
                      id="SvgjsPath2231" opacity=".51" fill="#fff"></path>
                    <path
                      d="M118.144 83.824c-.211 5.854-1.387 11.098-3.332 15.58-1.921 4.429-4.585 8.098-7.801 10.879-3.169 2.74-6.868 4.612-10.917 5.504-3.987.877-8.313.804-12.815-.328l-.014 6.877c5.275 1.468 10.362 1.68 15.065.755 4.789-.94 9.179-3.06 12.951-6.227 3.838-3.222 7.028-7.521 9.332-12.746 2.337-5.301 3.753-11.532 4.004-18.509l-6.473-1.785zM124.388 77.48c-.591-6.538-2.142-13.023-4.482-19.188-2.34-6.163-5.456-11.969-9.168-17.162-3.69-5.162-7.949-9.691-12.595-13.35-4.594-3.619-9.545-6.369-14.674-8.037 5.129 1.668 10.08 4.418 14.674 8.037 4.646 3.659 8.905 8.188 12.595 13.35 3.712 5.193 6.829 11 9.168 17.162 2.34 6.165 3.89 12.65 4.482 19.188zM83.453 27.53c4.286 1.513 8.412 3.89 12.238 6.958 3.862 3.096 7.405 6.884 10.485 11.175 3.096 4.313 5.711 9.118 7.705 14.211 1.994 5.096 3.357 10.457 3.956 15.877l6.552 1.729c-.591-6.538-2.142-13.023-4.482-19.188-2.34-6.163-5.456-11.969-9.168-17.162-3.69-5.162-7.949-9.691-12.595-13.35-4.594-3.619-9.545-6.369-14.674-8.037l-.017 7.787zM177.526 91.496l-53.138-14.016-6.552-1.728-34.461-9.089-5.673-1.496-32.151-8.48-5.1-1.345-40.05-10.564.445 6.684 39.68 10.948 5.037 1.39 32.151 8.87 5.646 1.558 34.784 9.596 6.472 1.785 52.542 14.496.368-8.609z"
                      id="SvgjsPath2229" fill="#B80000"></path>
                  </g>
                  <g fill="#fff" opacity=".3" id="SvgjsG2227">
                    <path
                      d="M77.714 72.67l-32.15-8.87c.354 5.34 1.465 10.632 3.187 15.676 1.721 5.042 4.061 9.861 6.883 14.252 2.837 4.411 6.175 8.41 9.881 11.777 3.741 3.398 7.875 6.169 12.269 8.073l-.07-40.908zM77.636 26.037c-4.499-.721-8.711-.374-12.507.869-3.739 1.225-7.074 3.319-9.887 6.124-2.773 2.767-5.042 6.228-6.695 10.24-1.633 3.966-2.669 8.481-2.996 13.417l32.151 8.48-.066-39.13zM118.144 83.824l-34.784-9.597-.082 41.231c4.502 1.132 8.828 1.205 12.815.328 4.049-.892 7.749-2.764 10.917-5.504 3.216-2.781 5.88-6.45 7.801-10.879 1.945-4.481 3.121-9.725 3.333-15.579zM83.453 27.53l-.078 39.133 34.461 9.089c-.599-5.42-1.961-10.781-3.956-15.877-1.994-5.094-4.609-9.898-7.705-14.211-3.08-4.292-6.623-8.079-10.485-11.175-3.826-3.069-7.952-5.446-12.237-6.959z"
                      id="SvgjsPath2225"></path>
                  </g>
                </g>
              </svg>
              <defs id="SvgjsDefs2453">
                <linearGradient x1="83.084%" y1="25.765%" x2="113.188%" y2="38.749%" id="SvgjsLinearGradient2451">
                  <stop stopColor="#DAA58F" offset="0%" id="SvgjsStop2449"></stop>
                  <stop stopColor="#87594C" offset="100%" id="SvgjsStop2447"></stop>
                </linearGradient>
                <linearGradient x1="83.084%" y1="26.144%" x2="113.188%" y2="38.925%" id="SvgjsLinearGradient2445">
                  <stop stopColor="#DAA58F" offset="0%" id="SvgjsStop2443"></stop>
                  <stop stopColor="#87594C" offset="100%" id="SvgjsStop2441"></stop>
                </linearGradient>
              </defs>
            </svg>
          }
          {<BallTrack track={ballTrack} animate={isAnimating} />}
          {ballPos &&
            <g xmlns="http://www.w3.org/2000/svg" id="SVGIRIS_PITCH_XY" className="transition-transform duration-500" transform={`matrix(1,0,0,1, ${ballPos.x ?? lastBallPos.x}, ${ballPos.y ?? lastBallPos.x})`}>
              <circle id="SVGIRIS_PITCH_XY_FX" r="2" cx="0" cy="0" stroke={status?.team == 1 ? kitColors.home : kitColors.away} strokeWidth="1.5" fill="none" />
              <circle id="SVGIRIS_PITCH_XY_COL" r="6" cx="0" cy="0" fill={status?.team == 1 ? kitColors.home : kitColors.away} /><circle r="3" cx="0" cy="0" fill="#FFFFFF" />
            </g>
          }
          {
            status?.status == "Goal" &&
            <g id="SVGIRIS_PITCH_FX">
              <g
                id="SVGIRIS_PITCH_FX_H_GROUP"
                opacity="1"
                className={soccerAnimation.leftScore}
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
                className={soccerAnimation.rightScore}
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
          }
          <g xmlns="http://www.w3.org/2000/svg" id="SVGIRIS_PITCH_MATCHTIME" transform="translate(175, 0)">
            <rect width="50" height="17" fill="#0b452a" />
            <text id="SVGIRIS_PITCH_MATCHTIME_TXT" x="25" y="13" fill="#59d496"
              fontFamily="Roboto" fontSize="11px" fontWeight="300" letterSpacing="0px" textAnchor="middle"
              wordSpacing="0px" xmlSpace="preserve" style={{ userSelect: "none", cursor: "default" }}
              textRendering="optimizeLegibility">
              {displayTime}
            </text>
          </g>
        </svg>

      </div >
    </>
  )
}


function convertToSeconds(timeString: string) {
  const [minutes, seconds] = timeString.split(":").map(Number);
  return minutes * 60 + seconds;
}

function increaseTimeBySeconds(timeString: any, secondsToAdd: any) {
  const totalSeconds = convertToSeconds(timeString) + secondsToAdd;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function formatTime(totalSeconds: any) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}


export default SoccerPitch