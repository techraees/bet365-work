import React, { useEffect, useRef, useState } from "react"
import { FIELD_HEIGHT, FIELD_WIDTH } from "./constants";
import BallTrack from './PitchComponents/BallTrack';
import AnimateLine from "./PitchComponents/AnimateLine";

interface SoccerPitchInterface {
  data: any
}


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
      "name": "Home Throw"
    },
    {
      "code": 21024,
      "name": "Away Throw"
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
      "code": 11301, "name": "Home TakeOnAttack"
    }, {
      "code": 21300, "name": "Away TakeOnDangerousAttack"
    }, {
      "code": 11302, "name": "Home TakeOnSafePossession"
    }, {
      "code": 1026, "name": "InjuryTime"
    }, {
      "code": 1004, "name": "Corner"
    }, {
      "code": 21301, "name": "Away TakeOnAttack"
    }, {
      "code": 21016, "name": "Away Secondhalf"
    }, {
      "code": 11300, "name": "Home TakeOnDangerousAttack"
    }, {
      "code": 1000, "name": "Danger"
    }, {
      "code": 21026, "name": "Away InjuryTime"
    }, {
      "code": 11016, "name": "Home Secondhalf"
    }, {
      "code": 21302, "name": "Away TakeOnSafePossession"
    },
    {
      "code": 21014,
      "name": "Away Kickoff"
    },
    {
      "code": 11014,
      "name": "Home Kickoff"
    },
    {
      "code": 1005,
      "name": "YellowCard"
    },
    {
      "code": 21022, "name": "Away Penaltyshootout"
    }, {
      "code": 11022, "name": "Home Penaltyshootout"
    }, {
      "code": 1009, "name": "Dfreekick"
    }, {
      "code": 1003, "name": "Goal"
    }, {
      "code": 11026, "name": "Home InjuryTime"
    }
  ];

  const matchingCode = soccerCodes.find(
    (soccerCode) => soccerCode.code == code
  );
  return matchingCode?.name;
}

function getBallPosition(data: any): any {
  let ballPos = data?.info?.ball_pos?.split(",");
  return ballPos ? { x: Number(ballPos[0]) * FIELD_WIDTH, y: Number(ballPos[1]) * FIELD_HEIGHT } : null;
}

const SoccerPitch: React.FC<SoccerPitchInterface> = ({ data }) => {
  console.log(">>>>soccer>>>", data);
  const prevBallPos = localStorage.getItem("ball_pos");
  const prevCode = localStorage.getItem("code");
  const ballTrack = JSON.parse(localStorage.getItem("ball_track") ?? "[]");
  if (data?.info.ball_pos && data?.info.ball_pos != prevBallPos) {
    ballTrack.push(data.info.ball_pos);
    if (ballTrack.length > 6) {
      ballTrack.shift();
    }
    localStorage.setItem("ball_pos", data?.info.ball_pos);
    localStorage.setItem("code", data?.info.state);
    localStorage.setItem("ball_track", JSON.stringify(ballTrack));
  }
  let ballPos = getBallPosition(data);

  useEffect(() => {
    localStorage.removeItem("ball_pos");
    localStorage.removeItem("code");
    localStorage.removeItem("ball_track");
  }, []);

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="SVGIRIS_TEAMS"
          y="0"
          width="400"
          height="37"
          version="1.1"
          viewBox="0 0 400 37"
        >
          <g>
            <g>
              <rect
                id="SVGIRIS_TEAMS_1_COL"
                x="1"
                y="11"
                width="3"
                height="15"
                fillRule="evenodd"
                opacity=""
                fill="#c40010"
              />
              <text
                id="SVGIRIS_TEAMS_1_NAME"
                x="9"
                y="24"
                fill="#e4e4e4"
                fontFamily="Roboto"
                fontSize="14px"
                fontWeight="300"
                letterSpacing="0.0px"
                textAnchor="start"
                wordSpacing="0px"
                xmlSpace="preserve"
                style={{ userSelect: "none", cursor: "default" }}
                textRendering="optimizeLegibility"
              >
                {data?.team_info?.home.name}
              </text>
              <rect
                x="172"
                y="6.5"
                width="25"
                height="24"
                fillRule="evenodd"
                opacity=""
                fill="#4d4d4d"
              />
              <text
                id="SVGIRIS_TEAMS_1_SCORE"
                x="184"
                y="25"
                fill="#ffdf1b"
                fontFamily="Roboto"
                fontSize="18"
                fontWeight="300"
                letterSpacing="0px"
                text-align="center"
                textAnchor="middle"
                wordSpacing="0px"
                style={{ userSelect: "none", cursor: "default" }}
                xmlSpace="preserve"
              >
                {data?.team_info?.home.score}
              </text>
            </g>
            <g>
              <rect
                id="SVGIRIS_TEAMS_2_COL"
                x="396"
                y="11"
                width="3"
                height="15"
                fillRule="evenodd"
                opacity=""
                fill="#f0f0f0"
              />
              <text
                id="SVGIRIS_TEAMS_2_NAME"
                x="391"
                y="24"
                fill="#e4e4e4"
                fontFamily="Roboto"
                fontSize="14px"
                fontWeight="300"
                letterSpacing="0.0px"
                textAnchor="end"
                wordSpacing="0px"
                xmlSpace="preserve"
                style={{ userSelect: "none", cursor: "default" }}
                textRendering="optimizeLegibility"
              >
                {data?.team_info?.away.name}
              </text>
              <rect
                x="202"
                y="6.5"
                width="25"
                height="24"
                fillRule="evenodd"
                opacity=""
                fill="#4d4d4d"
              />
              <text
                id="SVGIRIS_TEAMS_2_SCORE"
                x="214"
                y="25"
                fill="#ffdf1b"
                fontFamily="Roboto"
                fontSize="18"
                fontWeight="300"
                letterSpacing="0px"
                text-align="center"
                textAnchor="middle"
                wordSpacing="0px"
                style={{ userSelect: "none", cursor: "default" }}
                xmlSpace="preserve"
              >
                {data?.team_info?.away.score}
              </text>
            </g>
          </g>
        </svg>
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
          <g id="home_danger_attack" opacity="0">
            <linearGradient id="home_danger_attack_bg" gradientUnits="userSpaceOnUse" x1="-37.2401" y1="-203.0031" x2="-36.2403" y2="-203.0031" gradientTransform="matrix(-327.2727 0 0 -147.2727 -11919.416 -29781.8125)">
              <stop offset="0" style={{ stopColor: "#4F291A", stopOpacity: 0.4 }}></stop>
              <stop offset="0.424" style={{ stopColor: "#185435", stopOpacity: 0.4 }}></stop>
            </linearGradient>
            <path d="M2,2 321.04462809917356,2 321.91239669421486,2 C321.91239669421486,1.4 338.40000000000003,28 338.40000000000003,28 C339.26776859504133,29 339.26776859504133,30 338.40000000000003,31 L321.91239669421486,61 L338.40000000000003,88 C339.26776859504133,89 339.26776859504133,90 338.40000000000003,91 L321.91239669421486,121 L338.40000000000003,146 C339.26776859504133,147 339.26776859504133,150 338.40000000000003,151 L321.91239669421486,178 C321.91239669421486,178 2.0,178 2.0,178 L2,2 Z" fill="url(#home_danger_attack_bg)"></path>
          </g>
          <g id="away_danger_attack" opacity="0">
            <linearGradient id="away_danger_attack_bg" gradientUnits="userSpaceOnUse" x1="-37.7076" y1="-203.0031" x2="-36.7078" y2="-203.0031" gradientTransform="matrix(327.2727 0 0 -147.2727 12434.7266 -29781.8125)">
              <stop offset="0" style={{ stopColor: "#4F291A", stopOpacity: 0.4 }}></stop>
              <stop offset="0.424" style={{ stopColor: "#185435", stopOpacity: 0.4 }}></stop>
            </linearGradient>
            <path d="M398,2 77.9602479338843,2 77.08595041322315,2 C77.08595041322315,1 60.47429752066117,28 60.47429752066117,28 C59.60000000000001,29 59.60000000000001,30 60.47429752066117,31 L77.08595041322315,61 L60.47429752066117,88 C59.60000000000001,89 59.60000000000001,90 60.47429752066117,91 L77.08595041322315,121 L60.47429752066117,146 C59.60000000000001,147 59.60000000000001,150 59.60000000000001,151 L77.08595041322315,178 C77.08595041322315,178 398.0,178 398.0,178 L398,2 Z" fill="url(#away_danger_attack_bg)"></path>
          </g>
          <g id="away_attack" opacity="0">
            <linearGradient id="away_attack_bg" gradientUnits="userSpaceOnUse" x1="-37.394" y1="-203.0043" x2="-36.3943" y2="-203.0043" gradientTransform="matrix(327.2727 0 0 -147.2727 12434.7266 -29781.8125)">
              <stop offset="0.177" style={{ stopColor: "#185435", stopOpacity: 0.4 }}></stop>
              <stop offset="1" style={{ stopColor: "#183924", stopOpacity: 0.4 }}></stop>
            </linearGradient>
            <path d="M398,2 132.03710743801653,2 131.4305785123967,2 C131.4305785123967,1 119.90652892561985,28 119.90652892561985,28 C119.30000000000001,29 119.30000000000001,30 119.90652892561985,31 L131.4305785123967,61 L119.90652892561985,88 C119.30000000000001,89 119.30000000000001,90 119.90652892561985,91 L131.4305785123967,121 L119.90652892561985,146 C119.30000000000001,147 119.30000000000001,150 119.30000000000001,151 L131.4305785123967,178 C131.4305785123967,178 398.0,178 398.0,178 L398,2 Z" fill="url(#away_attack_bg)"></path>
          </g>
          <g id="home_attack" opacity="0">
            <linearGradient id="home_attack_bg" gradientUnits="userSpaceOnUse" x1="-36.3827" y1="-203.0043" x2="-35.3829" y2="-203.0043" gradientTransform="matrix(-327.2727 0 0 -147.2727 -11714.1748 -29781.8125)">
              <stop offset="0.177" style={{ stopColor: "#185435", stopOpacity: 0.4 }}></stop>
              <stop offset="1" style={{ stopColor: "#183924", stopOpacity: 0.4 }}></stop>
            </linearGradient>
            <path d="M2,2 280.9737190082645,2 281.65603305785123,2 C281.65603305785123,1.4 294.62,28 294.62,28 C295.30231404958676,29 295.30231404958676,30 294.62,31 L281.65603305785123,61 L294.62,88 C295.30231404958676,89 295.30231404958676,90 294.62,91 L281.65603305785123,121 L294.62,146 C295.30231404958676,147 295.30231404958676,150 294.62,151 L281.65603305785123,178 C281.65603305785123,178 2.0,178 2.0,178 L2,2 Z" fill="url(#home_attack_bg)"></path>
          </g>
          <g id="goal_kick" opacity="0">
            <path id="goal_kick_3" fill="#165031" fillOpacity="0.3" d="M94.703,73.698C110.554,53.359,120,27.784,120,0c0-27.764-9.433-53.321-25.262-73.653L0,0.036L94.703,73.698z"></path>
            <path id="goal_kick_2" fill="#165031" fillOpacity="0.5" d="M62.325,48.514C72.765,35.123,79,18.294,79,0c0-18.274-6.222-35.085-16.639-48.469L0,0.036L62.325,48.514z"></path>
            <path id="goal_kick_1" fill="#165031" fillOpacity="0.7" d="M30.759,23.961C35.918,17.349,39,9.037,39,0c0-9.017-3.068-17.311-8.205-23.917L0,0.036L30.759,23.961z"></path>
            <circle fill="#FFFFFF" r="4" cx="0" cy="0"></circle>
          </g>
          <g id="kick" opacity="0">
            <path id="kick_3" fill="#165031" fillOpacity="0.3" d="M0.031,0.013l117.647,45.045C123.041,31.064,126,15.881,126,0s-2.959-31.065-8.322-45.059L0.093-0.036L0.031,0.013z"></path>
            <path id="kick_2" fill="#165031" fillOpacity="0.5" d="M0.031,0.013l77.43,29.647c3.536-9.21,5.488-19.204,5.488-29.66s-1.952-20.45-5.487-29.66L0.093-0.036L0.031,0.013z"></path>
            <path id="kick_1" fill="#165031" fillOpacity="0.7" d="M0.031,0.013l38.208,14.629c1.746-4.546,2.71-9.48,2.71-14.642s-0.964-10.096-2.709-14.642L0.093-0.036L0.031,0.013z"></path>
            <circle fill="#FFFFFF" r="4" cx="0" cy="0"></circle>
          </g>
          <g id="throw" opacity="0">
            <path id="throw_2" fillOpacity="0.3" fill="#165031" d="M53.033,53.068c29.289-29.289,29.289-76.777,0-106.066L0,0.035L53.033,53.068z"></path>
            <path id="throw_1" fillOpacity="0.7" fill="#165031" d="M26.517,26.552c14.646-14.645,14.644-38.39,0-53.033L0,0.035L26.517,26.552z"></path>
            <circle fill="#FFFFFF" r="4" cx="0" cy="0"></circle>
          </g>
          <g id="away_safe" opacity="0">
            <rect x="200" y="0" fill="#183924" fillOpacity="0.4" width="200" height="180"></rect>
          </g>
          <g id="home_safe" opacity="0" className="" style={{ "opacity": 1 }}>
            <rect x="0" y="0" fill="#183924" fillOpacity="0.4" width="200" height="180"></rect>
          </g>
          <g id="goal" opacity="0">
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
          <g id="offside" opacity="0">
            <path d="M0,0H2.7V32.7H0Z" fill="#e3e3e3"></path>
            <path d="M2.7.1H19.1V16.5H2.7Z" fill="#d4ec3d"></path>
            <path d="M10.9,8.1h8.2v8.2H10.9Z" fill="#a10808"></path>
            <path d="M2.7,0h8.2V8.2H2.7Z" fill="#a10808"></path>
          </g>
          <g id="home" transform="translate(200,75)" opacity="0" className="" style={{ "transform": "translateX(180px) translateY(75px)", "opacity": 1 }}>
            <rect id="home_bg" x="-2.5" y="0" fill="#fff" width="2.5" height="30"></rect>
            <text id="home_team" transform="translate(-10 10)" textAnchor="end" fill="#12e096" fontSize="13px">Home Team</text>
            <text id="home_action" transform="translate(-10 28)" textAnchor="end" fill="#f0f0f0" fontWeight="bold" fontSize="15px">Ball Safe</text>
          </g>
          <g id="away" transform="translate(200,75)" opacity="0" className="" style={{ "transform": "translateX(200px) translateY(90px)" }}>
            <rect id="away_bg" x="0" y="0" fill="#fff" width="2.5" height="30"></rect>
            <text id="away_team" transform="translate(10 10)" fill="#12e096" fontSize="13px">Cavalier SC</text>
            <text id="away_action" transform="translate(10 28)" fill="#f0f0f0" fontWeight="bold" fontSize="15px">Action</text>
          </g>
          <g id="red_card" opacity="0">
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
          <g id="yellow_card" opacity="0">
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
          <g id="sub" opacity="0">
            <path id="sub_down" d="M205.05,105.43a1,1,0,0,0,1.34.47,1,1,0,0,0,.46-.47l5.1-7.2c.5-.7.2-1.3-.7-1.3h-10.8c-.9,0-1.2.6-.7,1.3C200,98.23,205.05,105.43,205.05,105.43Zm-2.6-8.5h7v-8.1a1.58,1.58,0,0,0-1.56-1.6h-3.84a1.58,1.58,0,0,0-1.6,1.56v8.14Z" fill="#6f4e39"></path>
            <path id="sub_up" d="M193.35,74.53a.88.88,0,0,1,1.14-.46.9.9,0,0,1,.46.46l5.2,8.8c.4.7.1,1.3-.8,1.3H188.78c-.9,0-1.2-.6-.8-1.3Zm-2.3,10.1h6.1v9.6a1.55,1.55,0,0,1-1.5,1.6h-3a1.5,1.5,0,0,1-1.5-1.49v-.11C191.05,94.23,191.05,84.63,191.05,84.63Z" fill="#51cc66"></path>
          </g>
          <g id="shot" opacity="0">
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
          {<BallTrack track={ballTrack} />}
          {ballPos &&
            <g xmlns="http://www.w3.org/2000/svg" id="SVGIRIS_PITCH_XY" className="transition-transform duration-500" transform={`matrix(1,0,0,1, ${ballPos.x}, ${ballPos.y})`}>
              <circle id="SVGIRIS_PITCH_XY_FX" r="2" cx="0" cy="0" stroke="#f0f0f0" strokeWidth="1.5" fill="none" />
              <circle id="SVGIRIS_PITCH_XY_COL" r="6" cx="0" cy="0" fill="#f0f0f0" /><circle r="3" cx="0" cy="0" fill="#FFFFFF" />
            </g>
          }
        </svg>

      </div >
    </>
  )
}



export default SoccerPitch