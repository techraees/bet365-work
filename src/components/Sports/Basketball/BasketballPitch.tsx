import React, { useEffect, useState } from "react"

import basketballAnimation from './animation.module.css';
import { CheckQuarter } from "@/components/Structure/CheckQuarter";

interface BasketballPitchInterface {
  data: any;
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
      status: 1074,
      name: "Score 2 points"
    },
    {
      status: 1075,
      name: "Score 3 points"
    },
    {
      status: 1077,
      name: "In Possession"
    },
    {
      status: 1078,
      name: "Free Throw"
    },
    {
      status: 1079,
      name: "Free Throw Scored"
    },
    {
      status: 1080,
      name: "Free Throw Missed"
    },
    {
      status: 1081,
      name: "Timeout"
    },
    {
      status: 1086,
      name: "Foul"
    },
    {
      status: 1082,
      name: "End Of Quarter"
    },
    {
      status: 1083,
      name: "End Of Half"
    },
    {
      status: 1084,
      name: "End Of Match"
    },
    {
      status: 1085,
      name: "Over Time"
    },
    {
      status: 1087,
      name: "Quarter 1"
    },
    {
      status: 1088,
      name: "Quarter 2"
    },
    {
      status: 1089,
      name: "Quarter 3"
    },
    {
      status: 1090,
      name: "Quarter 4"
    },
    {
      status: 1091,
      name: "1st Half"
    },
    {
      status: 1092,
      name: "2nd Half"
    }
  ];
  const matchingCode = statusCodes.find(
    (code) => code.status == status
  );
  return matchingCode?.name ?? "";
}
//get data state to string
function getStateFromCode(code: number): string | undefined {
  const soccerCodes = [
    {
      code: 11074,
      name: "Home Team Score 2 points"
    },
    {
      code: 21074,
      name: "Away Team Score 2 points"
    },
    {
      code: 11075,
      name: "Home Team Score 3 points"
    },
    {
      code: 21075,
      name: "Away Team Score 3 points"
    },
    {
      code: 11077,
      name: "Home Team in Possession"
    },
    {
      code: 21077,
      name: "Away Team in Possession"
    },
    {
      code: 11078,
      name: "Home Team Free Throw"
    },
    {
      code: 21078,
      name: "Away Team Free Throw"
    },
    {
      code: 11079,
      name: "Home Team Free Throw Scored"
    },
    {
      code: 21079,
      name: "Away Team Free Throw Scored"
    },
    {
      code: 11080,
      name: "Home Team Free Throw Missed"
    },
    {
      code: 21080,
      name: "Away Team Free Throw Missed"
    },
    {
      code: 11081,
      name: "Home Team Timeout"
    },
    {
      code: 21081,
      name: "Away Team Timeout"
    },
    {
      code: 11086,
      name: "Home Team Foul"
    },
    {
      code: 21086,
      name: "Away Team Foul"
    },
    {
      code: 1082,
      name: "End Of Quarter"
    },
    {
      code: 1083,
      name: "End Of Half"
    },
    {
      code: 1084,
      name: "End Of Match"
    },
    {
      code: 1085,
      name: "Over Time"
    },
    {
      code: 1087,
      name: "Quarter 1"
    },
    {
      code: 1088,
      name: "Quarter 2"
    },
    {
      code: 1089,
      name: "Quarter 3"
    },
    {
      code: 1090,
      name: "Quarter 4"
    },
    {
      code: 1091,
      name: "1st Half"
    },
    {
      code: 1092,
      name: "2nd Half"
    }
  ];

  const matchingCode = soccerCodes.find(
    (soccerCode) => soccerCode.code == code
  );
  return matchingCode?.name;
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
//get team and event from state
function getState(code: number): any {
  const team = getTeamFromCode(code);
  const status = getEventFromCode(code);
  return {
    team: team,
    status: getEventString(status)
  };
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

const BasketballPitch: React.FC<BasketballPitchInterface> = ({ data }) => {

  const initialSeconds = data?.info?.seconds || "00:00";

  const [isTimerPaused, setTimerPaused] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(convertToSeconds(initialSeconds));

  const displayTime = isNaN(totalSeconds) ? "10:00" : formatTime(totalSeconds);

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

  const curCode = data?.info.state;
  const status = getState(curCode);
  const kitColors = getKitColors(data);

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
          <p>State: {getStateFromCode(data?.info?.state)}</p>
        </div>
      </div>



      <svg id="SVGIRIS" width="100%" version="1.1" viewBox="0 0 400 220">



        {/* Team name and score */}
        <svg id="SVGIRIS_TEAMS" y="0" width="400" height="37" version="1.1" viewBox="0 0 400 37">
          <g>
            <g>
              <rect id="SVGIRIS_TEAMS_1_COL" x="1" y="11" width="3" height="15"
                fillRule="evenodd" opacity="" fill={kitColors.home}></rect>
              <text id="SVGIRIS_TEAMS_1_NAME" x="9" y="24" fill="#e4e4e4" fontFamily="Roboto"
                fontSize="14px" fontWeight="300" letterSpacing="0.0px" textAnchor="start"
                wordSpacing="0px" xmlSpace="preserve"
                style={{ userSelect: "none", cursor: "default" }} textRendering="optimizeLegibility">{data?.team_info?.home.name}</text>
              <rect x="162" y="6.5" width="35" height="24" fillRule="evenodd" opacity=""
                fill="#4d4d4d"></rect>
              <text id="SVGIRIS_TEAMS_1_SCORE" x="179" y="25" fill="#ffdf1b" fontFamily="Roboto"
                fontSize="18" fontWeight="300" letterSpacing="0px" text-align="center"
                textAnchor="middle" wordSpacing="0px"
                style={{ userSelect: "none", cursor: "default" }} xmlSpace="preserve">{data?.team_info?.home.score}</text>
            </g>
            <g>
              <rect id="SVGIRIS_TEAMS_2_COL" x="396" y="11" width="3" height="15"
                fillRule="evenodd" opacity="" fill={kitColors.away}></rect>
              <text id="SVGIRIS_TEAMS_2_NAME" x="391" y="24" fill="#e4e4e4" fontFamily="Roboto"
                fontSize="14px" fontWeight="300" letterSpacing="0.0px" textAnchor="end"
                wordSpacing="0px" xmlSpace="preserve"
                style={{ userSelect: "none", cursor: "default" }} textRendering="optimizeLegibility">{data?.team_info?.away.name}</text>
              <rect x="202" y="6.5" width="35" height="24" fillRule="evenodd" opacity=""
                fill="#4d4d4d"></rect>
              <text id="SVGIRIS_TEAMS_2_SCORE" x="219" y="25" fill="#ffdf1b" fontFamily="Roboto"
                fontSize="18" fontWeight="300" letterSpacing="0px" text-align="center"
                textAnchor="middle" wordSpacing="0px"
                style={{ userSelect: "none", cursor: "default" }} xmlSpace="preserve">{data?.team_info?.away.score}</text>
            </g>
          </g>
        </svg>

        <svg id="SVGIRIS_PITCH" width="400" height="180" y="40" version="1.1" viewBox="0 0 400 180"
          xmlns="http://www.w3.org/2000/svg" x="0">

          {/* pitch */}
          <g id="SVGIRIS_PITCH_BG" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-20.000000, -19.000000)">
              <path
                d="M30.5,116 L30.5,116 C33.5375661,116 36,113.537566 36,110.5 C36,107.462434 33.5375661,105 30.5,105 C27.4624339,105 25,107.462434 25,110.5 C25,113.537566 27.4624339,116 30.5,116 L30.5,116 Z M25,115.599068 C26.369745,117.075822 28.3269458,118 30.5,118 C34.6421356,118 38,114.642136 38,110.5 C38,106.357864 34.6421356,103 30.5,103 C28.3269458,103 26.369745,103.924178 25,105.400932 L25,99 L23,99 L23,122 L25,122 L25,115.599068 Z"
                id="Shape" fill="#DDB996"></path>
              <circle fill="#CC7652" cx="30.5" cy="110.5" r="5.5"></circle>
              <g transform="translate(20.000000, 19.000000)">
                <rect fill="#CC9F51" x="0" y="0" width="400" height="180"></rect>
                <path
                  d="M200.510638,113 L200.510638,113 C212.150264,113 222,103.150264 222,91.5106383 C222,78.9970664 212.292525,69 200.510638,69 C187.849736,69 178,78.8497355 178,91.5106383 C178,103.292525 187.997066,113 200.510638,113 L200.510638,113 Z M200.510638,115 L200.510638,115 C186.745166,115 176,104.254834 176,91.5106383 C176,77.745166 186.745166,67 200.510638,67 C213.254834,67 224,77.745166 224,91.5106383 C224,104.254834 213.254834,115 200.510638,115 L200.510638,115 Z"
                  fill="#D9B470"></path>
                <circle fill="#D9B470" cx="200" cy="91" r="8"></circle>
                <rect stroke="#D9B470" strokeWidth="2" fill="#CC7651" x="1" y="57" width="78"
                  height="70"></rect>
                <path
                  d="M1,23 L61,23 C61,23 114,30.8576241 114,92 C114,152.142373 61,160 61,160 L1,160"
                  stroke="#D9B470" strokeWidth="2"></path>
                <path
                  d="M79.5106383,113 L79.5106383,113 C91.1502645,113 101,103.150264 101,91.5106383 C101,78.9970664 91.2925248,69 79.5106383,69 C66.8497355,69 57,78.8497355 57,91.5106383 C57,103.292525 66.9970664,113 79.5106383,113 L79.5106383,113 Z M79.5106383,115 L79.5106383,115 C65.745166,115 55,104.254834 55,91.5106383 C55,77.745166 65.745166,67 79.5106383,67 C92.254834,67 103,77.745166 103,91.5106383 C103,104.254834 92.254834,115 79.5106383,115 L79.5106383,115 Z"
                  fill="#D9B470"></path>
                <path
                  d="M2,65 C2,64.2209473 2,67 2,67 L78,67 L78,65 L2,65 Z M34.8378378,62 L32.7837838,62 L32.7837838,65 L34.8378378,65 L34.8378378,62 Z M49.2162162,62 L47.1621622,62 L47.1621622,65 L49.2162162,65 L49.2162162,62 Z M63.5945946,62 L61.5405405,62 L61.5405405,65 L63.5945946,65 L63.5945946,62 Z"
                  fill="#D09F64"></path>
                <path
                  d="M2,118 L2,120 L78,120 L78,118 L2,118 Z M34,115 L32,115 L32,118 L34,118 L34,115 Z M48,115 L46,115 L46,118 L48,118 L48,115 Z M62,115 L60,115 L60,118 L62,118 L62,115 Z"
                  fill="#D09F64"
                  transform="translate(40.000000, 117.500000) scale(1, -1) translate(-40.000000, -117.500000) "></path>
                <rect stroke="#D9B470" strokeWidth="2" fill="#CC7652"
                  transform="translate(360.000000, 92.000000) scale(-1, 1) translate(-361.000000, -92.000000) "
                  x="322" y="57" width="78" height="70"></rect>
                <path
                  d="M286,23 L346,23 C346,23 399,30.8576241 399,92 C399,152.142373 346,160 346,160 L286,160"
                  stroke="#D9B470" strokeWidth="2"
                  transform="translate(342.500000, 91.500000) scale(-1, 1) translate(-342.500000, -91.500000) "></path>
                <path
                  d="M322.510638,113 L322.510638,113 C334.150264,113 344,103.150264 344,91.5106383 C344,78.9970664 334.292525,69 322.510638,69 C309.849736,69 300,78.8497355 300,91.5106383 C300,103.292525 309.997066,113 322.510638,113 L322.510638,113 Z M322.510638,115 L322.510638,115 C308.745166,115 298,104.254834 298,91.5106383 C298,77.745166 308.745166,67 322.510638,67 C335.254834,67 346,77.745166 346,91.5106383 C346,104.254834 335.254834,115 322.510638,115 L322.510638,115 Z"
                  fill="#D9B470"
                  transform="translate(322.000000, 91.000000) scale(-1, 1) translate(-322.000000, -91.000000)"></path>
                <path
                  d="M323,65 L323,67 L399,67 L399,65 L323,65 Z M354,62 L352,62 L352,65 L354,65 L354,62 Z M368,62 L366,62 L366,65 L368,65 L368,62 Z M382,62 L380,62 L380,65 L382,65 L382,62 Z"
                  fill="#D09F64"
                  transform="translate(361.000000, 64.500000) scale(-1, 1) translate(-361.000000, -64.500000) "></path>
                <path
                  d="M323,118 L323,120 L399,120 L399,118 L323,118 Z M354,115 L352,115 L352,118 L354,118 L354,115 Z M368,115 L366,115 L366,118 L368,118 L368,115 Z M382,115 L380,115 L380,118 L382,118 L382,115 Z"
                  fill="#D09F64"
                  transform="translate(361.000000, 117.500000) scale(-1, -1) translate(-361.000000, -117.500000) "></path>
                <circle fill="#CC7652" cx="390.5" cy="91.5" r="5.5"></circle>
                <circle fill="#CC7652"
                  transform="translate(9.500000, 91.500000) scale(-1, 1) translate(-9.500000, -91.500000) "
                  cx="9.5" cy="91.5" r="5.5"></circle>
                <rect stroke="#D9B470" strokeWidth="2" x="1" y="1" width="398" height="178"></rect>
                <rect fill="#D9B470" x="199" y="2" width="2" height="176"></rect>
                <path fill="#CC6029" opacity="0" d=""></path>
                <path fill="#CC6029" opacity="0" d=""></path>
              </g>
            </g>
            <path transform="translate(685.500000) scale(-1, 1)"
              d="M286,23 L346,23 C346,23 399,30.8576241 399,92 C399,152.142373 346,160 346,160 L286,160"
              stroke="#D9B470" opacity="0" strokeWidth="2"></path>
            <path d="M1,23 L61,23 C61,23 114,30.8576241 114,92 C114,152.142373 61,160 61,160 L1,160"
              stroke="#D9B470" opacity="0" strokeWidth="2"></path>
            <path transform="translate(685.500000) scale(-1, 1)"
              d="M286,23 L346,23 C346,23 399,30.8576241 399,92 C399,152.142373 346,160 346,160 L286,160"
              stroke="#E8DBB9" opacity="0" strokeWidth="2"></path>
            <path d="M1,23 L61,23 C61,23 114,30.8576241 114,92 C114,152.142373 61,160 61,160 L1,160"
              stroke="#E8DBB9" opacity="0" strokeWidth="2"></path>
            <g fill="none" fillRule="evenodd">
              <g fill="#DB9F86" transform="translate(2.000000, 80.000000)">
                <path
                  d="M11.696 4.562l-.09.207c-.076.173-.156.365-.238.57-.257.636-.5 1.298-.72 1.966-.384 1.166-.67 2.265-.846 3.275-.136.78-.205 1.492-.205 2.137 0 3.115.422 4.724 2.098 8.152l.133.045.29-.142.045-.134c-1.64-3.36-2.043-4.893-2.044-7.923 0-.613.065-1.297.196-2.046.172-.983.452-2.058.828-3.2.216-.658.455-1.31.708-1.935.08-.2.16-.39.232-.56l.087-.197-.048-.133-.293-.133-.134.05z"></path>
                <path
                  d="M12.165 4.975c.074.167.153.352.235.55.256.617.498 1.26.717 1.91.408 1.215.704 2.357.874 3.4.112.68.167 1.31.165 1.882-.008 3.004-.376 4.355-2.12 7.924l.046.135.29.14.134-.045c1.778-3.638 2.165-5.06 2.173-8.152.002-.602-.056-1.258-.17-1.966-.176-1.074-.478-2.242-.895-3.482-.223-.663-.47-1.317-.73-1.945-.083-.202-.164-.39-.24-.562l-.093-.204-.134-.05-.292.138-.048.133c.02.04.05.11.09.195z"></path>
                <path
                  d="M15.83 5.447l-.077.056-.212.157c-.237.18-.49.377-.752.59-.815.656-1.586 1.34-2.285 2.033-1.13 1.12-1.996 2.183-2.57 3.177-1.556 2.698-1.996 4.302-2.258 8.108l.093.107.32.022.107-.093c.258-3.73.677-5.26 2.19-7.883.55-.95 1.387-1.98 2.485-3.066.686-.68 1.444-1.353 2.246-2 .257-.207.506-.4.74-.577l.206-.153.07-.052.024-.14-.187-.262-.14-.023z"></path>
                <path
                  d="M16.05 5.827l-.01.112c-.01.097-.023.207-.037.325-.043.368-.097.76-.16 1.166-.202 1.262-.47 2.456-.8 3.535-.335 1.09-.723 2.02-1.16 2.774-1.51 2.597-2.505 3.583-5.8 5.8l-.027.14.18.267.14.027c3.358-2.26 4.404-3.3 5.957-5.973.46-.79.862-1.755 1.208-2.88.34-1.105.613-2.322.817-3.607.066-.413.12-.813.165-1.188.014-.12.026-.233.036-.334l.012-.12-.092-.107-.32-.028-.11.092z"></path>
                <path
                  d="M18.967 8.28l-.12.013c-.098.01-.21.024-.328.04-.37.046-.764.104-1.17.17-1.267.212-2.466.485-3.553.816-1.16.352-2.145.76-2.943 1.22-2.697 1.558-3.88 2.727-6.01 5.892l.027.14.268.18.14-.028c2.086-3.1 3.214-4.216 5.837-5.732.76-.44 1.71-.832 2.834-1.174 1.064-.324 2.24-.592 3.485-.8.4-.065.787-.122 1.15-.168.116-.015.224-.028.32-.038l.112-.012.09-.11-.03-.32-.11-.09z"></path>
                <path
                  d="M18.967 8.72l-.05.07-.152.21c-.173.234-.365.484-.57.744-.64.807-1.31 1.57-1.992 2.262-1.075 1.092-2.105 1.928-3.07 2.48-2.605 1.496-3.96 1.854-7.922 2.127l-.092.107.023.32.107.094c4.04-.28 5.465-.656 8.147-2.194 1.008-.58 2.073-1.443 3.18-2.568.696-.705 1.378-1.483 2.03-2.304.21-.264.404-.52.58-.76.058-.077.11-.15.157-.214l.056-.077-.025-.14-.264-.183-.14.025z"></path>
                <path
                  d="M20.267 12.303l-.208-.092c-.175-.074-.367-.154-.57-.236-.637-.257-1.3-.5-1.967-.72-1.166-.384-2.265-.67-3.276-.846-.778-.136-1.49-.205-2.136-.205-3.113 0-4.722.422-8.15 2.098l-.046.135.14.29.135.045c3.358-1.642 4.892-2.044 7.92-2.045.615 0 1.3.066 2.047.197.985.172 2.06.452 3.202.828.657.216 1.308.455 1.933.708.2.08.39.16.56.233l.198.088.133-.05.134-.293-.05-.132z"></path>
                <path
                  d="M20.048 12.683c-.04.02-.11.05-.195.088-.167.075-.352.154-.55.236-.616.256-1.26.498-1.91.717-1.214.41-2.356.704-3.4.874-.68.11-1.308.166-1.88.164-3.006-.007-4.357-.374-7.925-2.12l-.134.047-.14.29.045.133c3.636 1.778 5.06 2.165 8.15 2.173.603.002 1.26-.056 1.967-.17 1.073-.176 2.242-.478 3.482-.895.662-.223 1.316-.47 1.943-.73.202-.083.39-.164.562-.24l.205-.093.048-.133-.137-.29-.132-.05z"></path>
                <path
                  d="M19.382 16.436l-.056-.077-.158-.213c-.18-.238-.377-.49-.588-.753-.657-.815-1.342-1.586-2.034-2.285-1.12-1.132-2.183-1.996-3.178-2.57-2.697-1.556-4.3-1.996-8.108-2.26l-.106.094-.022.32.092.108c3.73.257 5.26.676 7.883 2.19.95.548 1.98 1.386 3.068 2.484.68.686 1.352 1.445 2 2.246.206.257.4.506.577.74l.153.206.052.07.14.025.26-.188.025-.14z"></path>
                <path
                  d="M19.002 16.656l-.113-.01c-.1-.01-.208-.023-.326-.036-.368-.043-.76-.097-1.166-.162-1.262-.2-2.455-.468-3.535-.8-1.09-.334-2.02-.722-2.773-1.16-2.598-1.51-3.585-2.503-5.803-5.798l-.138-.027-.268.18-.028.138c2.262 3.36 3.3 4.406 5.974 5.96.79.46 1.755.86 2.882 1.207 1.104.34 2.32.612 3.606.816.413.066.812.12 1.187.165.12.014.233.026.334.036l.12.012.11-.09.026-.322-.09-.108z"></path>
                <path
                  d="M16.548 19.573l-.012-.12c-.01-.098-.024-.208-.04-.328-.046-.37-.104-.762-.172-1.17-.21-1.266-.483-2.464-.814-3.552-.354-1.16-.76-2.145-1.22-2.943-1.56-2.696-2.728-3.88-5.894-6.01l-.138.027-.18.267.027.14c3.1 2.086 4.216 3.214 5.732 5.837.44.762.83 1.713 1.173 2.835.325 1.065.592 2.242.8 3.486.066.402.123.788.17 1.15l.037.322.012.11.108.09.32-.03.09-.11z"></path>
                <path
                  d="M16.11 19.573l-.072-.05-.208-.152c-.235-.172-.486-.364-.745-.57-.807-.64-1.57-1.31-2.262-1.99-1.092-1.076-1.93-2.106-2.482-3.07-1.494-2.606-1.85-3.96-2.125-7.923l-.106-.092-.322.022-.093.106c.28 4.04.655 5.465 2.194 8.147.577 1.008 1.44 2.073 2.566 3.18.705.696 1.483 1.378 2.305 2.03.265.21.52.404.76.58l.214.157.077.055.14-.025.185-.264-.025-.14z"></path>
              </g>
              <g transform="translate(2.000000, 80.000000)">
                <path
                  d="M12.11 20.343c-4.21 0-7.625-3.414-7.625-7.626 0-4.21 3.415-7.625 7.626-7.625 4.213 0 7.627 3.414 7.627 7.625 0 4.212-3.414 7.626-7.626 7.626zm0 .844c4.68 0 8.47-3.792 8.47-8.47 0-4.677-3.79-8.47-8.47-8.47-4.676 0-8.468 3.793-8.468 8.47 0 4.678 3.792 8.47 8.47 8.47z"
                  fill="#CE4628"></path>
                <path
                  d="M2.3 15.07h2.355l.1-.1v-4.506l-.1-.1H2.343l5.09-3.845-.015-.17-.51-.258-.105.01-5.618 4.178-.08.084h-.018l-.1.1v.085l-.006.034.007.014v4.373l.1.1h.007l.002.013.173.183 5.697 4.17.15-.04.238-.53-.032-.122L2.3 15.07z"
                  fill="#CE4628"></path>
                <path fill="#DDB996" d="M0 0h1v25H0z"></path>
              </g>
            </g>
            <g fill="none" fillRule="evenodd">
              <g fill="#DB9F86" transform="translate(398.000000, 80.000000) scale(-1, 1)">
                <path
                  d=" M11.696 4.562l-.09.207c-.076.173-.156.365-.238.57-.257.636-.5 1.298-.72 1.966-.384 1.166-.67 2.265-.846 3.275-.136.78-.205 1.492-.205 2.137 0 3.115.422 4.724 2.098 8.152l.133.045.29-.142.045-.134c-1.64-3.36-2.043-4.893-2.044-7.923 0-.613.065-1.297.196-2.046.172-.983.452-2.058.828-3.2.216-.658.455-1.31.708-1.935.08-.2.16-.39.232-.56l.087-.197-.048-.133-.293-.133-.134.05z"></path>
                <path
                  d="M12.165 4.975c.074.167.153.352.235.55.256.617.498 1.26.717 1.91.408 1.215.704 2.357.874 3.4.112.68.167 1.31.165 1.882-.008 3.004-.376 4.355-2.12 7.924l.046.135.29.14.134-.045c1.778-3.638 2.165-5.06 2.173-8.152.002-.602-.056-1.258-.17-1.966-.176-1.074-.478-2.242-.895-3.482-.223-.663-.47-1.317-.73-1.945-.083-.202-.164-.39-.24-.562l-.093-.204-.134-.05-.292.138-.048.133c.02.04.05.11.09.195z"></path>
                <path
                  d="M15.83 5.447l-.077.056-.212.157c-.237.18-.49.377-.752.59-.815.656-1.586 1.34-2.285 2.033-1.13 1.12-1.996 2.183-2.57 3.177-1.556 2.698-1.996 4.302-2.258 8.108l.093.107.32.022.107-.093c.258-3.73.677-5.26 2.19-7.883.55-.95 1.387-1.98 2.485-3.066.686-.68 1.444-1.353 2.246-2 .257-.207.506-.4.74-.577l.206-.153.07-.052.024-.14-.187-.262-.14-.023z"></path>
                <path
                  d="M16.05 5.827l-.01.112c-.01.097-.023.207-.037.325-.043.368-.097.76-.16 1.166-.202 1.262-.47 2.456-.8 3.535-.335 1.09-.723 2.02-1.16 2.774-1.51 2.597-2.505 3.583-5.8 5.8l-.027.14.18.267.14.027c3.358-2.26 4.404-3.3 5.957-5.973.46-.79.862-1.755 1.208-2.88.34-1.105.613-2.322.817-3.607.066-.413.12-.813.165-1.188.014-.12.026-.233.036-.334l.012-.12-.092-.107-.32-.028-.11.092z"></path>
                <path
                  d="M18.967 8.28l-.12.013c-.098.01-.21.024-.328.04-.37.046-.764.104-1.17.17-1.267.212-2.466.485-3.553.816-1.16.352-2.145.76-2.943 1.22-2.697 1.558-3.88 2.727-6.01 5.892l.027.14.268.18.14-.028c2.086-3.1 3.214-4.216 5.837-5.732.76-.44 1.71-.832 2.834-1.174 1.064-.324 2.24-.592 3.485-.8.4-.065.787-.122 1.15-.168.116-.015.224-.028.32-.038l.112-.012.09-.11-.03-.32-.11-.09z"></path>
                <path
                  d="M18.967 8.72l-.05.07-.152.21c-.173.234-.365.484-.57.744-.64.807-1.31 1.57-1.992 2.262-1.075 1.092-2.105 1.928-3.07 2.48-2.605 1.496-3.96 1.854-7.922 2.127l-.092.107.023.32.107.094c4.04-.28 5.465-.656 8.147-2.194 1.008-.58 2.073-1.443 3.18-2.568.696-.705 1.378-1.483 2.03-2.304.21-.264.404-.52.58-.76.058-.077.11-.15.157-.214l.056-.077-.025-.14-.264-.183-.14.025z"></path>
                <path
                  d="M20.267 12.303l-.208-.092c-.175-.074-.367-.154-.57-.236-.637-.257-1.3-.5-1.967-.72-1.166-.384-2.265-.67-3.276-.846-.778-.136-1.49-.205-2.136-.205-3.113 0-4.722.422-8.15 2.098l-.046.135.14.29.135.045c3.358-1.642 4.892-2.044 7.92-2.045.615 0 1.3.066 2.047.197.985.172 2.06.452 3.202.828.657.216 1.308.455 1.933.708.2.08.39.16.56.233l.198.088.133-.05.134-.293-.05-.132z"></path>
                <path
                  d="M20.048 12.683c-.04.02-.11.05-.195.088-.167.075-.352.154-.55.236-.616.256-1.26.498-1.91.717-1.214.41-2.356.704-3.4.874-.68.11-1.308.166-1.88.164-3.006-.007-4.357-.374-7.925-2.12l-.134.047-.14.29.045.133c3.636 1.778 5.06 2.165 8.15 2.173.603.002 1.26-.056 1.967-.17 1.073-.176 2.242-.478 3.482-.895.662-.223 1.316-.47 1.943-.73.202-.083.39-.164.562-.24l.205-.093.048-.133-.137-.29-.132-.05z"></path>
                <path
                  d="M19.382 16.436l-.056-.077-.158-.213c-.18-.238-.377-.49-.588-.753-.657-.815-1.342-1.586-2.034-2.285-1.12-1.132-2.183-1.996-3.178-2.57-2.697-1.556-4.3-1.996-8.108-2.26l-.106.094-.022.32.092.108c3.73.257 5.26.676 7.883 2.19.95.548 1.98 1.386 3.068 2.484.68.686 1.352 1.445 2 2.246.206.257.4.506.577.74l.153.206.052.07.14.025.26-.188.025-.14z"></path>
                <path
                  d="M19.002 16.656l-.113-.01c-.1-.01-.208-.023-.326-.036-.368-.043-.76-.097-1.166-.162-1.262-.2-2.455-.468-3.535-.8-1.09-.334-2.02-.722-2.773-1.16-2.598-1.51-3.585-2.503-5.803-5.798l-.138-.027-.268.18-.028.138c2.262 3.36 3.3 4.406 5.974 5.96.79.46 1.755.86 2.882 1.207 1.104.34 2.32.612 3.606.816.413.066.812.12 1.187.165.12.014.233.026.334.036l.12.012.11-.09.026-.322-.09-.108z"></path>
                <path
                  d="M16.548 19.573l-.012-.12c-.01-.098-.024-.208-.04-.328-.046-.37-.104-.762-.172-1.17-.21-1.266-.483-2.464-.814-3.552-.354-1.16-.76-2.145-1.22-2.943-1.56-2.696-2.728-3.88-5.894-6.01l-.138.027-.18.267.027.14c3.1 2.086 4.216 3.214 5.732 5.837.44.762.83 1.713 1.173 2.835.325 1.065.592 2.242.8 3.486.066.402.123.788.17 1.15l.037.322.012.11.108.09.32-.03.09-.11z"></path>
                <path
                  d="M16.11 19.573l-.072-.05-.208-.152c-.235-.172-.486-.364-.745-.57-.807-.64-1.57-1.31-2.262-1.99-1.092-1.076-1.93-2.106-2.482-3.07-1.494-2.606-1.85-3.96-2.125-7.923l-.106-.092-.322.022-.093.106c.28 4.04.655 5.465 2.194 8.147.577 1.008 1.44 2.073 2.566 3.18.705.696 1.483 1.378 2.305 2.03.265.21.52.404.76.58l.214.157.077.055.14-.025.185-.264-.025-.14z"></path>
              </g>
              <g transform="translate(398.000000, 80.000000) scale(-1, 1)">
                <path
                  d="M12.11 20.343c-4.21 0-7.625-3.414-7.625-7.626 0-4.21 3.415-7.625 7.626-7.625 4.213 0 7.627 3.414 7.627 7.625 0 4.212-3.414 7.626-7.626 7.626zm0 .844c4.68 0 8.47-3.792 8.47-8.47 0-4.677-3.79-8.47-8.47-8.47-4.676 0-8.468 3.793-8.468 8.47 0 4.678 3.792 8.47 8.47 8.47z"
                  fill="#CE4628"></path>
                <path
                  d="M2.3 15.07h2.355l.1-.1v-4.506l-.1-.1H2.343l5.09-3.845-.015-.17-.51-.258-.105.01-5.618 4.178-.08.084h-.018l-.1.1v.085l-.006.034.007.014v4.373l.1.1h.007l.002.013.173.183 5.697 4.17.15-.04.238-.53-.032-.122L2.3 15.07z"
                  fill="#CE4628"></path>
                <path fill="#DDB996" d="M0 0h1v25H0z"></path>
              </g>
            </g>
            <g id="img_back">
              <image id="SvgjsImage1078" width="400" height="180"></image>
            </g>
          </g>

          {/* Messages */}
          {
            (curCode && curCode < 10000 && curCode > 0) && (
              <g id="SVGIRIS_PITCH_MATCHTIME" className={basketballAnimation.message}>
                <text id="SVGIRIS_PITCH_MATCHTIME_TXT" fill="#fff" fontFamily="Roboto"
                  fontSize="16px" fontWeight="600" textAnchor="middle" xmlSpace="preserve"
                  textRendering="optimizeLegibility">{status?.status}</text>
              </g>
            )
          }

          {/* Home team Free Throw Scored/Missed*/}
          {(status?.team == 1 && (status?.status == "Free Throw Scored" || status?.status == "Free Throw Missed")) && (
            <>
              <g id="SVGIRIS_PITCH_TEAM_1" transform="matrix(1,0,0,1,305,66)" opacity="1">
                <rect id="SVGIRIS_PITCH_TEAM_1_COL" width="3" height="50" fill={kitColors.home}></rect>
                <text id="SVGIRIS_PITCH_TEAM_1_TXT_TEAM" x="-5" y="14" fill="#663b29"
                  font-family="Roboto" fontSize="14" fontWeight="400" textAnchor="end"
                  xmlSpace="preserve">{data?.team_info?.home.name}</text>
                <text id="SVGIRIS_PITCH_TEAM_1_TXT_ACTION" x="-5" y="32" fill="#ffffff"
                  font-family="Roboto" fontSize="16" fontWeight="400" textAnchor="end"
                  xmlSpace="preserve">{status?.status}</text>
                <text id="SVGIRIS_PITCH_TEAM_1_TXT_INFO" x="-5" y="47" fill="#663b29"
                  font-family="Roboto" fontSize="12" fontWeight="400" textAnchor="end"
                  xmlSpace="preserve">1 of 2</text>
              </g>
            </>
          )}

          {/* Away team Free Throw Scored/Missed*/}
          {(status?.team == 2 && (status?.status == "Free Throw Scored" || status?.status == "Free Throw Missed")) && (
            <>
              <g id="SVGIRIS_PITCH_TEAM_1" transform="matrix(1,0,0,1,95,66)" opacity="1">
                <rect id="SVGIRIS_PITCH_TEAM_1_COL" width="3" height="50" fill={kitColors.away}></rect>
                <text id="SVGIRIS_PITCH_TEAM_1_TXT_TEAM" x="5" y="14" fill="#663b29"
                  font-family="Roboto" fontSize="14" fontWeight="400" textAnchor="start"
                  xmlSpace="preserve">{data?.team_info?.away.name}</text>
                <text id="SVGIRIS_PITCH_TEAM_1_TXT_ACTION" x="5" y="32" fill="#ffffff"
                  font-family="Roboto" fontSize="16" fontWeight="400" textAnchor="start"
                  xmlSpace="preserve">{status?.status}</text>
                <text id="SVGIRIS_PITCH_TEAM_1_TXT_INFO" x="5" y="47" fill="#663b29"
                  font-family="Roboto" fontSize="12" fontWeight="400" textAnchor="start"
                  xmlSpace="preserve">1 of 2</text>
              </g>
            </>
          )}

          {/* Free throw missed ball animation */}
          {(status?.status == "Free Throw Missed") && (
            <>
              {/* ball point */}
              <g id="SVGIRIS_PITCH_DEF_POINT" opacity={1} transform={status?.team == 1 ? "matrix(1,0,0,1,321,91)" : "matrix(1,0,0,1,79,91)"}>
                <g id="SVGIRIS_PITCH_DEF_POINT_G" transform="translate(-60,-60)" fill="#ffffff">
                  <circle cx="60" cy="60" r="10" opacity=".3">
                    <animate attributeName="r" attributeType="XML" dur="1.5s"
                      keyTimes="0; 0.15; 0.3; 0.5; 0.7; 0.85; 1" repeatCount="indefinite"
                      values="3; 14; 18; 20; 18; 14; 3"></animate>
                  </circle>
                  <circle cx="60" cy="60" r="10" opacity=".3">
                    <animate attributeName="r" attributeType="XML" dur="1.5s"
                      keyTimes="0; 0.15; 0.3; 0.5; 0.7; 0.85; 1" repeatCount="indefinite"
                      values="3; 10; 12; 15; 12; 10; 3"></animate>
                  </circle>
                  <circle cx="60" cy="60" r="3"></circle>
                </g>
              </g>
              {/* ball */}
              <g id="SvgjsG1237" opacity="1" className={status?.team == 1 ? basketballAnimation.ballHomeFreeThrowMissed : basketballAnimation.ballAwayFreeThrowMissed}>
                <g id="SVGIRIS_PITCH_FX_BALL" >
                  <g id="SvgjsG1271">
                    <g id="SvgjsG1269">
                      <radialGradient id="SvgjsRadialGradient1267" cx="37.25" cy="31.531"
                        r="60.208" gradientUnits="userSpaceOnUse">
                        <stop id="SvgjsStop1265" stopColor="#FF7500" offset=".1218"></stop>
                        <stop id="SvgjsStop1263" stopColor="#FC7301" offset=".3444"></stop>
                        <stop id="SvgjsStop1261" stopColor="#F16E02" offset=".533"></stop>
                        <stop id="SvgjsStop1259" stopColor="#E06605" offset=".7093"></stop>
                        <stop id="SvgjsStop1257" stopColor="#C75A09" offset=".877"></stop>
                        <stop id="SvgjsStop1255" stopColor="#B04F0D" offset="1"></stop>
                      </radialGradient>
                      <circle id="SvgjsCircle1253" cx="48.125" cy="48.156" r="48.125"
                        fill="url(#SVGIRIS_PITCH_DEF_BALL_GRAD)"></circle>
                    </g>
                    <g id="SvgjsG1251">
                      <path
                        d="m13.938 56.344c0-48.751 27.359-56 27.938-55.987v2e-3l3.39-0.359c0 0.011-4.737 1.499-7.228 2.998-2.489 1.499-5.819 3.996-9.155 7.979-6.668 7.968-13.253 21.856-13.258 45.764 0 17.632 8.923 29.037 13.442 33.615 1.505 1.523 5.57 3.968 5.574 3.973l-5.047-1.781c-0.05-0.042-15.656-10.455-15.656-36.204z"
                        id="SvgjsPath1249"></path>
                    </g>
                    <g id="SvgjsG1247">
                      <path
                        d="m14.757 45.695c-9-1.02-10.313-7.956-10.289-13.195l0.042-2.397c0.021-2.181 0.099-2.509 0.099-2.509l1.329-2.594s-0.428 2.642-0.428 5.103c0.027 5.181 1.197 12.238 9.388 13.132 0.927 0.101 1.813 0.15 2.665 0.15 6.021-0.521 13.952-4.812 23.771-12.354 9.735-7.441 25.958-17.083 38.208-17.208 1.063 0 2.118 0.259 2.911 0.583l1.359 1.469c-0.621-0.256-2.626-0.385-3.604-0.385-8.49-0.037-27.853 10.287-37.375 17.625-9.749 7.473-16.225 12.729-25.302 12.739-0.891 0-1.814-0.054-2.774-0.159z"
                        id="SvgjsPath1245"></path>
                      <path
                        d="m53.375 87.031c-5.658-1.547-12.604-5.717-19.406-8.984-6.576-3.163-13.266-5.547-18.594-6.328-0.746-0.091-1.415-0.128-2.019-0.128-3.712 0.017-5.156 1.55-5.507 2.157-0.114 0.208-0.24 0.361-0.24 0.361l-0.641-0.969c0.118-0.211 1.048-3.719 6.362-3.682 0.645 0 1.355 0.041 2.138 0.135 6.431 0.764 12.721 3.534 19.313 6.703 6.84 3.294 13.508 7.41 18.953 8.891 5.518 1.502 6.957 2.277 11 2.281 7.688 0.016 13.333-1.619 13.344-1.625l-0.922 0.672c-0.022 2e-3 -6.453 2.375-12.484 2.25-4.124 3e-3 -5.814-0.236-11.297-1.734z"
                        id="SvgjsPath1243"></path>
                    </g>
                    <g id="SvgjsG1241">
                      <path
                        d="m14.784 59.765c-2.852-0.418-7.341-1.532-10.897-2.874-3.569-1.338-3.418-2.031-3.418-2.031s-0.281-1.25-0.375-3.625c0 0 1.094 1.016 1.828 1.438 0.484 0.399 1.663 0.943 3.172 1.516l-0.146-0.102c3.275 1.243 7.717 2.345 10.267 2.709 4.551 0.662 12.027 1.169 21.671 1.169 1.034 0 2.095-7e-3 3.181-0.017 11.139-0.118 28.42-1.545 39.081-4.126 9.351-2.256 14.547-5.279 15.563-5.873 0.132-0.085 1.542-0.771 1.542-0.771 0.5-0.219 0.38 2.88-0.104 3.208-0.145 0.103-5.232 3.684-16.295 6.354-11.09 2.67-28.392 4.076-39.755 4.208-1.096 9e-3 -2.165 0.015-3.211 0.017-9.759-3e-3 -17.323-0.508-22.104-1.2z"
                        id="SvgjsPath1239"></path>
                    </g>
                  </g>
                </g>
              </g>
            </>
          )}

          {/* Home team Free Throw */}
          {(status?.team == 1 && status?.status == "Free Throw") && (
            <>
              <g id="SVGIRIS_PITCH_TEAM_2" transform="matrix(1,0,0,1,306,74)" opacity="1">
                <rect id="SVGIRIS_PITCH_TEAM_2_COL" width="3" height="35" fill={kitColors.home}></rect>
                <text id="SVGIRIS_PITCH_TEAM_2_TXT_TEAM" x="-8" y="14" fill="#663b29"
                  fontFamily="Roboto" fontSize="14" fontWeight="400" textAnchor="end"
                  xmlSpace="preserve">{data?.team_info?.home.name}</text>
                <text id="SVGIRIS_PITCH_TEAM_2_TXT_ACTION" x="-8" y="32" fill="#ffffff"
                  fontFamily="Roboto" fontSize="16" fontWeight="400" textAnchor="end"
                  xmlSpace="preserve">Free Throw</text>
              </g>
              {/* ball point free throw */}
              <g id="SVGIRIS_PITCH_DEF_POINT" opacity={1} transform="matrix(1,0,0,1,321,91)">
                <g id="SVGIRIS_PITCH_DEF_POINT_G" transform="translate(-60,-60)" fill="#ffffff">
                  <circle cx="60" cy="60" r="10" opacity=".3">
                    <animate attributeName="r" attributeType="XML" dur="1.5s"
                      keyTimes="0; 0.15; 0.3; 0.5; 0.7; 0.85; 1" repeatCount="indefinite"
                      values="3; 14; 18; 20; 18; 14; 3"></animate>
                  </circle>
                  <circle cx="60" cy="60" r="10" opacity=".3">
                    <animate attributeName="r" attributeType="XML" dur="1.5s"
                      keyTimes="0; 0.15; 0.3; 0.5; 0.7; 0.85; 1" repeatCount="indefinite"
                      values="3; 10; 12; 15; 12; 10; 3"></animate>
                  </circle>
                  <circle cx="60" cy="60" r="3"></circle>
                </g>
              </g>
            </>
          )}

          {/* Away team Free Throw */}
          {(status?.team == 2 && status?.status == "Free Throw") && (
            <>
              <g id="SVGIRIS_PITCH_TEAM_2" transform="matrix(1,0,0,1,94,74)" opacity="1">
                <rect id="SVGIRIS_PITCH_TEAM_2_COL" width="3" height="35" fill={kitColors.away}></rect>
                <text id="SVGIRIS_PITCH_TEAM_2_TXT_TEAM" x="8" y="14" fill="#663b29"
                  fontFamily="Roboto" fontSize="14" fontWeight="400" textAnchor="start"
                  xmlSpace="preserve">{data?.team_info?.away.name}</text>
                <text id="SVGIRIS_PITCH_TEAM_2_TXT_ACTION" x="8" y="32" fill="#ffffff"
                  fontFamily="Roboto" fontSize="16" fontWeight="400" textAnchor="start"
                  xmlSpace="preserve">Free Throw</text>
              </g>
              {/* ball point free throw */}
              <g id="SVGIRIS_PITCH_DEF_POINT" opacity={1} transform="matrix(1,0,0,1,79,91)">
                <g id="SVGIRIS_PITCH_DEF_POINT_G" transform="translate(-60,-60)" fill="#ffffff">
                  <circle cx="60" cy="60" r="10" opacity=".3">
                    <animate attributeName="r" attributeType="XML" dur="1.5s"
                      keyTimes="0; 0.15; 0.3; 0.5; 0.7; 0.85; 1" repeatCount="indefinite"
                      values="3; 14; 18; 20; 18; 14; 3"></animate>
                  </circle>
                  <circle cx="60" cy="60" r="10" opacity=".3">
                    <animate attributeName="r" attributeType="XML" dur="1.5s"
                      keyTimes="0; 0.15; 0.3; 0.5; 0.7; 0.85; 1" repeatCount="indefinite"
                      values="3; 10; 12; 15; 12; 10; 3"></animate>
                  </circle>
                  <circle cx="60" cy="60" r="3"></circle>
                </g>
              </g>
            </>
          )}

          {/* home time in possession */}
          {(status?.team == 1 && status?.status == "In Possession") && (
            <>
              <g id="SVGIRIS_PITCH_DEF_H_CATK">
                <path fill="#cc6029" opacity="0"
                  d="M1.7,2.0 L218.7,2.0 L228.7,2.0 L231.7,7.0 C231.7,7.0 275.0,83.0 274.7,89.0 C274.4,95.0 233.0,173.0 231.7,175.0 L229.7,178.0 L218.7,178.0 L1.7,178.0 1.7,2.0 Z"
                  style={{ opacity: 0.4 }}></path>
              </g>
              <g id="SVGIRIS_PITCH_TEAM_1" transform="matrix(1,0,0,1,250,74)" opacity="1">
                <rect id="SVGIRIS_PITCH_TEAM_1_COL" width="3" height="35" fill={kitColors.home}></rect>
                <text id="SVGIRIS_PITCH_TEAM_1_TXT_TEAM" x="-5" y="14" fill="#663b29"
                  fontFamily="Roboto" fontSize="14" fontWeight="400" textAnchor="end"
                  xmlSpace="preserve">{data?.team_info?.home.name}</text>
                <text id="SVGIRIS_PITCH_TEAM_1_TXT_ACTION" x="-5" y="32" fill="#ffffff"
                  fontFamily="Roboto" fontSize="16" fontWeight="400" textAnchor="end"
                  xmlSpace="preserve">In Possession</text>
              </g>
            </>
          )}

          {/* away team in possession */}
          {(status?.team == 2 && status?.status == "In Possession") && (
            <>
              <g id="SVGIRIS_PITCH_DEF_A_CATK">
                <path fill="#cc6029" opacity="0"
                  d="M398.3,2 L181.3,2 L171.3,2 L168.3,7 C168.3,7 125,83 125.3,89 C125.6,95 167,173 168.3,175 L170.3,178 L181.3,178 L398.3,178 398.3,2 Z"
                  style={{ opacity: 0.4 }}></path>
              </g>
              {/* away team in possession text */}
              <g id="SVGIRIS_PITCH_TEAM_1" transform="matrix(1,0,0,1,150,74)" opacity="1">
                <rect id="SVGIRIS_PITCH_TEAM_1_COL" width="3" height="35" fill={kitColors.away}></rect>
                <text id="SVGIRIS_PITCH_TEAM_1_TXT_TEAM" x="5" y="14" fill="#663b29"
                  fontFamily="Roboto" fontSize="14" fontWeight="400" textAnchor="start"
                  xmlSpace="preserve">{data?.team_info?.away.name}</text>
                <text id="SVGIRIS_PITCH_TEAM_1_TXT_ACTION" x="5" y="32" fill="#ffffff"
                  fontFamily="Roboto" fontSize="16" fontWeight="400" textAnchor="start"
                  xmlSpace="preserve">In Possession</text>
              </g>
            </>
          )}

          {/*Foul*/}
          {
            status?.status == "Foul" && (
              <>
                <g id="SVGIRIS_PITCH_FX">
                  <g id="SvgjsG1534" transform="matrix(-1,0,0,1,300,0)">
                    <svg id="SvgjsSvg1566" width="40" height="40" viewBox="0 0 40 40" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" x={status?.team == 1 ? 30 : 130} y="72">
                      <rect width="40" height="40" opacity="0" id="SvgjsRect1564"></rect>
                      <svg id="SvgjsSvg1562" width="40" height="40" viewBox="0 0 36 36"
                        version="1.1" xmlns="http://www.w3.org/2000/svg" y="60">
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"
                          id="SvgjsG1560">
                          <g transform="translate(-589.000000, -112.000000)" id="SvgjsG1558">
                            <g transform="translate(592.000000, 115.000000)" id="SvgjsG1556">
                              <ellipse stroke="#FFFFFF" strokeWidth="2" cx="15" cy="15" rx="15"
                                ry="15" id="SvgjsEllipse1554"></ellipse>
                              <path
                                d="M14,13.8395784 L14,5.87243867 C14,5.31934155 14.4438648,4.87096774 15,4.87096774 C15.5522847,4.87096774 16,5.32837702 16,5.87243867 L16,13.1986897 L16,13.1986897 L19.3256091,9.87308056 C19.7146781,9.48401161 20.3439406,9.48246873 20.7371875,9.87571569 C21.1277118,10.26624 21.134283,10.8928338 20.7398227,11.2872941 L16.9486523,15.0784645 C16.9822454,15.2191034 17,15.3656097 17,15.516129 C17,16.5850673 16.1045695,17.4516129 15,17.4516129 C13.8954305,17.4516129 13,16.5850673 13,15.516129 C13,14.7997268 13.4021986,14.1742327 14,13.8395784 Z"
                                fill="#FFFFFF" id="SvgjsPath1552"></path>
                              <path
                                d="M29.9090909,28.1901969 C29.9090909,28.5626779 29.5419069,28.9442815 29.1298701,28.9442815 L19.7792208,28.9442815 C19.367184,28.9442815 19,28.5629354 19,28.1901969 L19,19.1411814 C19,18.7687004 19.367184,18.3870968 19.7792208,18.3870968 L29.1298701,18.3870968 C29.5419069,18.3870968 29.9090909,18.7684429 29.9090909,19.1411814 L29.9090909,28.1901969 L29.9090909,28.1901969 Z"
                                fill="#A52A2A" id="SvgjsPath1550"></path>
                              <path
                                d="M21.6363636,20.8504399 L23.6363636,20.8504399 L23.6363636,26.6568915 L21.6363636,26.6568915 L21.6363636,20.8504399 Z M25.6363636,20.8504399 L27.6363636,20.8504399 L27.6363636,26.6568915 L25.6363636,26.6568915 L25.6363636,20.8504399 Z"
                                fill="#FFFFFF" id="SvgjsPath1548"></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <svg id="SvgjsSvg1546" width="40" height="40" viewBox="0 0 36 36"
                        version="1.1" xmlns="http://www.w3.org/2000/svg" y="0">
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"
                          id="SvgjsG1544">
                          <g transform="translate(-69.000000, -112.000000)" id="SvgjsG1542">
                            <g transform="translate(72.000000, 115.000000)" id="SvgjsG1540">
                              <circle stroke="#FFFFFF" strokeWidth="2" cx="15" cy="15" r="15"
                                id="SvgjsCircle1538"></circle>
                              <path
                                d="M19.2960877,10.6979686 L19.2960877,13.8304443 C19.2960877,14.0027948 19.1340174,14.14261 18.9340218,14.14261 C18.7339849,14.14261 18.5719145,14.0027948 18.5719145,13.8304443 L18.5719145,9.38822311 C18.5712948,8.91160383 18.1669658,8.52544389 17.6684021,8.52544389 C17.1692187,8.52544389 16.7646832,8.91211713 16.7646832,9.38909177 C16.7646832,9.38909177 16.7671619,13.8277988 16.7646832,13.8288649 C16.7646832,14.0027553 16.6119082,14.1425705 16.4232323,14.1425705 C16.2347217,14.1425705 16.0817815,14.0027553 16.0817815,13.8304048 L16.0817815,8.16111898 C16.081327,7.64450174 15.6430388,7.22580645 15.10246,7.22580645 C14.5613854,7.22580645 14.1228906,7.64489659 14.1228906,8.16202712 C14.1228906,8.16202712 14.1218991,13.7838524 14.1218991,13.8490416 C14.1117361,14.012745 13.970033,14.1426495 13.7961885,14.1426495 C13.6157752,14.1426495 13.4695276,14.0028343 13.4695276,13.8304838 L13.4695276,8.97951744 C13.4695276,8.46242638 13.0310329,8.04333625 12.4900822,8.04333625 C11.9490489,8.04333625 11.5105128,8.46242638 11.5105128,8.97951744 C11.5014653,15.7627444 11.5015066,15.7627444 11.5008456,16.3244136 C11.5008456,16.5364067 11.5051421,16.9919017 11.3982244,17.0681466 C11.3094431,17.13148 11.1911643,17.0527871 11.0480153,16.8681173 C10.7231722,16.4489087 10.2541472,15.7830395 9.91257245,15.3380079 C9.5887622,14.9160749 9.07730891,14.4579739 8.4967392,14.761453 C7.94463406,15.0501253 7.85110173,15.7897519 8.2244461,16.2742286 C8.2244461,16.2742286 10.6432318,19.6666318 11.4698196,20.8460779 C11.9536759,21.5364671 12.0834809,21.7552516 12.2503023,21.982091 C12.8860247,22.8462521 13.5255294,23.7459416 16.2943775,23.7419221 C20.5909155,23.7356848 20.8,20.2804208 20.8,19.1738238 L20.8,11.0930521 C20.8,10.3010294 20.4633828,9.97926892 20.0480645,9.97926892 C19.6327876,9.97926892 19.2960877,10.3010294 19.2960877,10.6979686 Z"
                                fill="#FFFFFF" id="SvgjsPath1536"></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <defs id="SvgjsDefs1565"></defs>
                    </svg>
                  </g>
                </g>
                {status?.team == 1 ? (
                  <g id="SVGIRIS_PITCH_TEAM_2" transform="matrix(1,0,0,1,223,74)" opacity="1">
                    <rect id="SVGIRIS_PITCH_TEAM_2_COL" width="3" height="35" fill={kitColors.home}></rect>
                    <text id="SVGIRIS_PITCH_TEAM_2_TXT_TEAM" x="-8" y="14" fill="#663b29" fontFamily="Roboto"
                      fontSize="14" fontWeight="400" textAnchor="end" xmlSpace="preserve">{data?.team_info?.home.name}</text>
                    <text id="SVGIRIS_PITCH_TEAM_2_TXT_ACTION" x="-8" y="32" fill="#ffffff" fontFamily="Roboto"
                      fontSize="16" fontWeight="400" textAnchor="end" xmlSpace="preserve">Foul</text>
                  </g>
                ) : (
                  <g id="SVGIRIS_PITCH_TEAM_2" transform="matrix(1,0,0,1,177,74)" opacity="1">
                    <rect id="SVGIRIS_PITCH_TEAM_2_COL" width="3" height="35" fill={kitColors.away}></rect>
                    <text id="SVGIRIS_PITCH_TEAM_2_TXT_TEAM" x="8" y="14" fill="#663b29" fontFamily="Roboto"
                      fontSize="14" fontWeight="400" textAnchor="start" xmlSpace="preserve">{data?.team_info?.away.name}</text>
                    <text id="SVGIRIS_PITCH_TEAM_2_TXT_ACTION" x="8" y="32" fill="#ffffff" fontFamily="Roboto"
                      fontSize="16" fontWeight="400" textAnchor="start" xmlSpace="preserve">Foul</text>
                  </g>
                )}
              </>
            )
          }

          {/* Timeout */}
          {
            status?.status == "Timeout" && (
              <>
                <g id="timeout" opacity="1" transform={status?.team == 1 ? "translate(235, 76)" : "translate(135, 76)"}>
                  <ellipse stroke="#fff" fill="none" strokeWidth="2" cx="15" cy="15" rx="15" ry="15"></ellipse>
                  <path
                    d="M14,13.8395784 L14,5.87243867 C14,5.31934155 14.4438648,4.87096774 15,4.87096774 C15.5522847,4.87096774 16,5.32837702 16,5.87243867 L16,13.1986897 L16,13.1986897 L19.3256091,9.87308056 C19.7146781,9.48401161 20.3439406,9.48246873 20.7371875,9.87571569 C21.1277118,10.26624 21.134283,10.8928338 20.7398227,11.2872941 L16.9486523,15.0784645 C16.9822454,15.2191034 17,15.3656097 17,15.516129 C17,16.5850673 16.1045695,17.4516129 15,17.4516129 C13.8954305,17.4516129 13,16.5850673 13,15.516129 C13,14.7997268 13.4021986,14.1742327 14,13.8395784 Z"
                    fill="#fff"></path>
                  <path
                    d="M29.9090909,28.1901969 C29.9090909,28.5626779 29.5419069,28.9442815 29.1298701,28.9442815 L19.7792208,28.9442815 C19.367184,28.9442815 19,28.5629354 19,28.1901969 L19,19.1411814 C19,18.7687004 19.367184,18.3870968 19.7792208,18.3870968 L29.1298701,18.3870968 C29.5419069,18.3870968 29.9090909,18.7684429 29.9090909,19.1411814 L29.9090909,28.1901969 L29.9090909,28.1901969 Z"
                    fill="#A52A2A"></path>
                  <path
                    d="M21.6363636,20.8504399 L23.6363636,20.8504399 L23.6363636,26.6568915 L21.6363636,26.6568915 L21.6363636,20.8504399 Z M25.6363636,20.8504399 L27.6363636,20.8504399 L27.6363636,26.6568915 L25.6363636,26.6568915 L25.6363636,20.8504399 Z"
                    fill="#fff"></path>
                </g>
                {status?.team == 1 ? (
                  <g id="SVGIRIS_PITCH_TEAM_2" transform="matrix(1,0,0,1,223,74)" opacity="1">
                    <rect id="SVGIRIS_PITCH_TEAM_2_COL" width="3" height="35" fill={kitColors.home}></rect>
                    <text id="SVGIRIS_PITCH_TEAM_2_TXT_TEAM" x="-8" y="14" fill="#663b29" fontFamily="Roboto"
                      fontSize="14" fontWeight="400" textAnchor="end" xmlSpace="preserve">{data?.team_info?.home.name}</text>
                    <text id="SVGIRIS_PITCH_TEAM_2_TXT_ACTION" x="-8" y="32" fill="#ffffff" fontFamily="Roboto"
                      fontSize="16" fontWeight="400" textAnchor="end" xmlSpace="preserve">Timeout</text>
                  </g>
                ) : (
                  <g id="SVGIRIS_PITCH_TEAM_2" transform="matrix(1,0,0,1,177,74)" opacity="1">
                    <rect id="SVGIRIS_PITCH_TEAM_2_COL" width="3" height="35" fill={kitColors.away}></rect>
                    <text id="SVGIRIS_PITCH_TEAM_2_TXT_TEAM" x="8" y="14" fill="#663b29" fontFamily="Roboto"
                      fontSize="14" fontWeight="400" textAnchor="start" xmlSpace="preserve">{data?.team_info?.away.name}</text>
                    <text id="SVGIRIS_PITCH_TEAM_2_TXT_ACTION" x="8" y="32" fill="#ffffff" fontFamily="Roboto"
                      fontSize="16" fontWeight="400" textAnchor="start" xmlSpace="preserve">Timeout</text>
                  </g>
                )}
              </>
            )
          }

          {/* Home team 3 points */}
          {(status?.team == 1 && status?.status == "Score 3 points") && (
            <>
              <g id="home-three" opacity="0.4">
                <path
                  d="M286,23 L346,23 C346,23 399,30.8576241 399,92 C399,152.142373 346,160 346,160 L286,160"
                  fill="none" stroke="#fff" strokeWidth="2"
                  transform="translate(685.500000) scale(-1, 1)"></path>
                <path
                  d="M398,2 L2,2 L2,22 L61,22 C61,22 115,31 115,90 C115,149 65,161 61,161 L2,161 L2,178 L398,178 L398,2 Z"
                  transform="translate(400 0) scale(-1 1)" fill="#CC6029"></path>
              </g>
              <g id="SVGIRIS_PITCH_TEAM_2" transform="matrix(1,0,0,1,270,74)" opacity="1">
                <rect id="SVGIRIS_PITCH_TEAM_2_COL" width="3" height="35" fill={kitColors.home}></rect>
                <text id="SVGIRIS_PITCH_TEAM_2_TXT_TEAM" x="-8" y="14" fill="#663b29"
                  fontFamily="Roboto" fontSize="14" fontWeight="400" textAnchor="end"
                  xmlSpace="preserve">{data?.team_info?.home.name}</text>
                <text id="SVGIRIS_PITCH_TEAM_2_TXT_ACTION" x="-8" y="32" fill="#ffffff"
                  fontFamily="Roboto" fontSize="16" fontWeight="400" textAnchor="end"
                  xmlSpace="preserve">3 Points</text>
              </g>
            </>
          )}

          {/* Away team 3 points */}
          {(status?.team == 2 && status?.status == "Score 3 points") && (
            <>
              <g id="away-three" opacity="0.4">
                <path d="M1,23 L61,23 C61,23 114,30.8576241 114,92 C114,152.142373 61,160 61,160 L1,160"
                  stroke="#fff" strokeWidth="2" fill="none"></path>
                <path
                  d="M398,2 L2,2 L2,22 L61,22 C61,22 115,31 115,90 C115,149 65,161 61,161 L2,161 L2,178 L398,178 L398,2 Z"
                  fill="#CC6029"></path>
              </g>
              <g id="SVGIRIS_PITCH_TEAM_2" transform="matrix(1,0,0,1,130,74)" opacity="1">
                <rect id="SVGIRIS_PITCH_TEAM_2_COL" width="3" height="35" fill={kitColors.away}></rect>
                <text id="SVGIRIS_PITCH_TEAM_2_TXT_TEAM" x="8" y="14" fill="#663b29"
                  fontFamily="Roboto" fontSize="14" fontWeight="400" textAnchor="start"
                  xmlSpace="preserve">{data?.team_info?.away.name}</text>
                <text id="SVGIRIS_PITCH_TEAM_2_TXT_ACTION" x="8" y="32" fill="#ffffff"
                  fontFamily="Roboto" fontSize="16" fontWeight="400" textAnchor="start"
                  xmlSpace="preserve">3 Points</text>
              </g>
            </>
          )}

          {/* 3 points ball animation */}
          {status?.status == "Score 3 points" && (
            <>
              {/* ball point */}
              <g id="SVGIRIS_PITCH_DEF_POINT" opacity={1} transform={status?.team == 1 ? "matrix(1,0,0,1,287,91)" : "matrix(1,0,0,1,113,91)"}>
                <g id="SVGIRIS_PITCH_DEF_POINT_G" transform="translate(-60,-60)" fill="#ffffff">
                  <circle cx="60" cy="60" r="10" opacity=".3">
                    <animate attributeName="r" attributeType="XML" dur="1.5s"
                      keyTimes="0; 0.15; 0.3; 0.5; 0.7; 0.85; 1" repeatCount="indefinite"
                      values="3; 14; 18; 20; 18; 14; 3"></animate>
                  </circle>
                  <circle cx="60" cy="60" r="10" opacity=".3">
                    <animate attributeName="r" attributeType="XML" dur="1.5s"
                      keyTimes="0; 0.15; 0.3; 0.5; 0.7; 0.85; 1" repeatCount="indefinite"
                      values="3; 10; 12; 15; 12; 10; 3"></animate>
                  </circle>
                  <circle cx="60" cy="60" r="3"></circle>
                </g>
              </g>
              {/* ball */}
              <g id="SvgjsG1237" opacity="1" className={status?.team == 1 ? basketballAnimation.ballHomePoint3 : basketballAnimation.ballAwayPoint3}>
                <g id="SVGIRIS_PITCH_FX_BALL" >
                  <g id="SvgjsG1271">
                    <g id="SvgjsG1269">
                      <radialGradient id="SvgjsRadialGradient1267" cx="37.25" cy="31.531"
                        r="60.208" gradientUnits="userSpaceOnUse">
                        <stop id="SvgjsStop1265" stopColor="#FF7500" offset=".1218"></stop>
                        <stop id="SvgjsStop1263" stopColor="#FC7301" offset=".3444"></stop>
                        <stop id="SvgjsStop1261" stopColor="#F16E02" offset=".533"></stop>
                        <stop id="SvgjsStop1259" stopColor="#E06605" offset=".7093"></stop>
                        <stop id="SvgjsStop1257" stopColor="#C75A09" offset=".877"></stop>
                        <stop id="SvgjsStop1255" stopColor="#B04F0D" offset="1"></stop>
                      </radialGradient>
                      <circle id="SvgjsCircle1253" cx="48.125" cy="48.156" r="48.125"
                        fill="url(#SVGIRIS_PITCH_DEF_BALL_GRAD)"></circle>
                    </g>
                    <g id="SvgjsG1251">
                      <path
                        d="m13.938 56.344c0-48.751 27.359-56 27.938-55.987v2e-3l3.39-0.359c0 0.011-4.737 1.499-7.228 2.998-2.489 1.499-5.819 3.996-9.155 7.979-6.668 7.968-13.253 21.856-13.258 45.764 0 17.632 8.923 29.037 13.442 33.615 1.505 1.523 5.57 3.968 5.574 3.973l-5.047-1.781c-0.05-0.042-15.656-10.455-15.656-36.204z"
                        id="SvgjsPath1249"></path>
                    </g>
                    <g id="SvgjsG1247">
                      <path
                        d="m14.757 45.695c-9-1.02-10.313-7.956-10.289-13.195l0.042-2.397c0.021-2.181 0.099-2.509 0.099-2.509l1.329-2.594s-0.428 2.642-0.428 5.103c0.027 5.181 1.197 12.238 9.388 13.132 0.927 0.101 1.813 0.15 2.665 0.15 6.021-0.521 13.952-4.812 23.771-12.354 9.735-7.441 25.958-17.083 38.208-17.208 1.063 0 2.118 0.259 2.911 0.583l1.359 1.469c-0.621-0.256-2.626-0.385-3.604-0.385-8.49-0.037-27.853 10.287-37.375 17.625-9.749 7.473-16.225 12.729-25.302 12.739-0.891 0-1.814-0.054-2.774-0.159z"
                        id="SvgjsPath1245"></path>
                      <path
                        d="m53.375 87.031c-5.658-1.547-12.604-5.717-19.406-8.984-6.576-3.163-13.266-5.547-18.594-6.328-0.746-0.091-1.415-0.128-2.019-0.128-3.712 0.017-5.156 1.55-5.507 2.157-0.114 0.208-0.24 0.361-0.24 0.361l-0.641-0.969c0.118-0.211 1.048-3.719 6.362-3.682 0.645 0 1.355 0.041 2.138 0.135 6.431 0.764 12.721 3.534 19.313 6.703 6.84 3.294 13.508 7.41 18.953 8.891 5.518 1.502 6.957 2.277 11 2.281 7.688 0.016 13.333-1.619 13.344-1.625l-0.922 0.672c-0.022 2e-3 -6.453 2.375-12.484 2.25-4.124 3e-3 -5.814-0.236-11.297-1.734z"
                        id="SvgjsPath1243"></path>
                    </g>
                    <g id="SvgjsG1241">
                      <path
                        d="m14.784 59.765c-2.852-0.418-7.341-1.532-10.897-2.874-3.569-1.338-3.418-2.031-3.418-2.031s-0.281-1.25-0.375-3.625c0 0 1.094 1.016 1.828 1.438 0.484 0.399 1.663 0.943 3.172 1.516l-0.146-0.102c3.275 1.243 7.717 2.345 10.267 2.709 4.551 0.662 12.027 1.169 21.671 1.169 1.034 0 2.095-7e-3 3.181-0.017 11.139-0.118 28.42-1.545 39.081-4.126 9.351-2.256 14.547-5.279 15.563-5.873 0.132-0.085 1.542-0.771 1.542-0.771 0.5-0.219 0.38 2.88-0.104 3.208-0.145 0.103-5.232 3.684-16.295 6.354-11.09 2.67-28.392 4.076-39.755 4.208-1.096 9e-3 -2.165 0.015-3.211 0.017-9.759-3e-3 -17.323-0.508-22.104-1.2z"
                        id="SvgjsPath1239"></path>
                    </g>
                  </g>
                </g>
              </g>
            </>
          )}

          {/* Home team 2 points */}
          {(status?.team == 1 && status?.status == "Score 2 points") && (
            <>
              <g id="SVGIRIS_PITCH_DEF_H_CS2P" >
                <path fill="#cc6029" opacity="0"
                  d="M398,68 L398,39 L398,22 L339,22 C339,22 285,30 285,92 C285,150 335,161 339,161 L398,161 L398,144 L398,86 L398,68 Z"
                  style={{ opacity: 0.4 }}></path>
              </g>
              <g id="SVGIRIS_PITCH_TEAM_2" transform="matrix(1,0,0,1,306,74)" opacity="1">
                <rect id="SVGIRIS_PITCH_TEAM_2_COL" width="3" height="35" fill={kitColors.home}></rect>
                <text id="SVGIRIS_PITCH_TEAM_2_TXT_TEAM" x="-8" y="14" fill="#663b29"
                  fontFamily="Roboto" fontSize="14" fontWeight="400" textAnchor="end"
                  xmlSpace="preserve">{data?.team_info?.home.name}</text>
                <text id="SVGIRIS_PITCH_TEAM_2_TXT_ACTION" x="-8" y="32" fill="#ffffff"
                  fontFamily="Roboto" fontSize="16" fontWeight="400" textAnchor="end"
                  xmlSpace="preserve">2 Points</text>
              </g>
            </>
          )}

          {/* Away team 2 points */}
          {(status?.team == 2 && status?.status == "Score 2 points") && (
            <>
              <g id="SVGIRIS_PITCH_DEF_A_CS2P">
                <path fill="#cc6029" opacity="0"
                  d="M2,68 L2,39 L2,22 L61,22 C61,22 115,30 115,92 C115,150 65,161 61,161 L2,161 L2,144 L2,86 L2,68 Z"
                  style={{ opacity: 0.4 }}></path>
              </g>
              <g id="SVGIRIS_PITCH_TEAM_2" transform="matrix(1,0,0,1,94,74)" opacity="1">
                <rect id="SVGIRIS_PITCH_TEAM_2_COL" width="3" height="35" fill={kitColors.away}></rect>
                <text id="SVGIRIS_PITCH_TEAM_2_TXT_TEAM" x="8" y="14" fill="#663b29"
                  fontFamily="Roboto" fontSize="14" fontWeight="400" textAnchor="start"
                  xmlSpace="preserve">{data?.team_info?.away.name}</text>
                <text id="SVGIRIS_PITCH_TEAM_2_TXT_ACTION" x="8" y="32" fill="#ffffff"
                  fontFamily="Roboto" fontSize="16" fontWeight="400" textAnchor="start"
                  xmlSpace="preserve">2 Points</text>
              </g>
            </>
          )}

          {/* 2 points and Free throw scored ball animation */}
          {(status?.status == "Score 2 points" || status?.status == "Free Throw Scored") && (
            <>
              {/* ball point */}
              <g id="SVGIRIS_PITCH_DEF_POINT" opacity={1} transform={status?.team == 1 ? "matrix(1,0,0,1,321,91)" : "matrix(1,0,0,1,79,91)"}>
                <g id="SVGIRIS_PITCH_DEF_POINT_G" transform="translate(-60,-60)" fill="#ffffff">
                  <circle cx="60" cy="60" r="10" opacity=".3">
                    <animate attributeName="r" attributeType="XML" dur="1.5s"
                      keyTimes="0; 0.15; 0.3; 0.5; 0.7; 0.85; 1" repeatCount="indefinite"
                      values="3; 14; 18; 20; 18; 14; 3"></animate>
                  </circle>
                  <circle cx="60" cy="60" r="10" opacity=".3">
                    <animate attributeName="r" attributeType="XML" dur="1.5s"
                      keyTimes="0; 0.15; 0.3; 0.5; 0.7; 0.85; 1" repeatCount="indefinite"
                      values="3; 10; 12; 15; 12; 10; 3"></animate>
                  </circle>
                  <circle cx="60" cy="60" r="3"></circle>
                </g>
              </g>
              {/* ball */}
              <g id="SvgjsG1237" opacity="1" className={status?.team == 1 ? basketballAnimation.ballHomePoint2 : basketballAnimation.ballAwayPoint2}>
                <g id="SVGIRIS_PITCH_FX_BALL" >
                  <g id="SvgjsG1271">
                    <g id="SvgjsG1269">
                      <radialGradient id="SvgjsRadialGradient1267" cx="37.25" cy="31.531"
                        r="60.208" gradientUnits="userSpaceOnUse">
                        <stop id="SvgjsStop1265" stopColor="#FF7500" offset=".1218"></stop>
                        <stop id="SvgjsStop1263" stopColor="#FC7301" offset=".3444"></stop>
                        <stop id="SvgjsStop1261" stopColor="#F16E02" offset=".533"></stop>
                        <stop id="SvgjsStop1259" stopColor="#E06605" offset=".7093"></stop>
                        <stop id="SvgjsStop1257" stopColor="#C75A09" offset=".877"></stop>
                        <stop id="SvgjsStop1255" stopColor="#B04F0D" offset="1"></stop>
                      </radialGradient>
                      <circle id="SvgjsCircle1253" cx="48.125" cy="48.156" r="48.125"
                        fill="url(#SVGIRIS_PITCH_DEF_BALL_GRAD)"></circle>
                    </g>
                    <g id="SvgjsG1251">
                      <path
                        d="m13.938 56.344c0-48.751 27.359-56 27.938-55.987v2e-3l3.39-0.359c0 0.011-4.737 1.499-7.228 2.998-2.489 1.499-5.819 3.996-9.155 7.979-6.668 7.968-13.253 21.856-13.258 45.764 0 17.632 8.923 29.037 13.442 33.615 1.505 1.523 5.57 3.968 5.574 3.973l-5.047-1.781c-0.05-0.042-15.656-10.455-15.656-36.204z"
                        id="SvgjsPath1249"></path>
                    </g>
                    <g id="SvgjsG1247">
                      <path
                        d="m14.757 45.695c-9-1.02-10.313-7.956-10.289-13.195l0.042-2.397c0.021-2.181 0.099-2.509 0.099-2.509l1.329-2.594s-0.428 2.642-0.428 5.103c0.027 5.181 1.197 12.238 9.388 13.132 0.927 0.101 1.813 0.15 2.665 0.15 6.021-0.521 13.952-4.812 23.771-12.354 9.735-7.441 25.958-17.083 38.208-17.208 1.063 0 2.118 0.259 2.911 0.583l1.359 1.469c-0.621-0.256-2.626-0.385-3.604-0.385-8.49-0.037-27.853 10.287-37.375 17.625-9.749 7.473-16.225 12.729-25.302 12.739-0.891 0-1.814-0.054-2.774-0.159z"
                        id="SvgjsPath1245"></path>
                      <path
                        d="m53.375 87.031c-5.658-1.547-12.604-5.717-19.406-8.984-6.576-3.163-13.266-5.547-18.594-6.328-0.746-0.091-1.415-0.128-2.019-0.128-3.712 0.017-5.156 1.55-5.507 2.157-0.114 0.208-0.24 0.361-0.24 0.361l-0.641-0.969c0.118-0.211 1.048-3.719 6.362-3.682 0.645 0 1.355 0.041 2.138 0.135 6.431 0.764 12.721 3.534 19.313 6.703 6.84 3.294 13.508 7.41 18.953 8.891 5.518 1.502 6.957 2.277 11 2.281 7.688 0.016 13.333-1.619 13.344-1.625l-0.922 0.672c-0.022 2e-3 -6.453 2.375-12.484 2.25-4.124 3e-3 -5.814-0.236-11.297-1.734z"
                        id="SvgjsPath1243"></path>
                    </g>
                    <g id="SvgjsG1241">
                      <path
                        d="m14.784 59.765c-2.852-0.418-7.341-1.532-10.897-2.874-3.569-1.338-3.418-2.031-3.418-2.031s-0.281-1.25-0.375-3.625c0 0 1.094 1.016 1.828 1.438 0.484 0.399 1.663 0.943 3.172 1.516l-0.146-0.102c3.275 1.243 7.717 2.345 10.267 2.709 4.551 0.662 12.027 1.169 21.671 1.169 1.034 0 2.095-7e-3 3.181-0.017 11.139-0.118 28.42-1.545 39.081-4.126 9.351-2.256 14.547-5.279 15.563-5.873 0.132-0.085 1.542-0.771 1.542-0.771 0.5-0.219 0.38 2.88-0.104 3.208-0.145 0.103-5.232 3.684-16.295 6.354-11.09 2.67-28.392 4.076-39.755 4.208-1.096 9e-3 -2.165 0.015-3.211 0.017-9.759-3e-3 -17.323-0.508-22.104-1.2z"
                        id="SvgjsPath1239"></path>
                    </g>
                  </g>
                </g>
              </g>
            </>
          )}





          {/* away team range hightlith */}
          <g id="SVGIRIS_PITCH_DEF_H_CS2P" style={{ display: "none" }}>
            <path fill="#cc6029" opacity="0"
              d="M398,68 L398,39 L398,22 L339,22 C339,22 285,30 285,92 C285,150 335,161 339,161 L398,161 L398,144 L398,86 L398,68 Z"
              style={{ opacity: 0.4 }}></path>
          </g>
          {/* home team range highlight */}
          <g id="SVGIRIS_PITCH_DEF_A_CS2P" style={{ display: "none" }}>
            <path fill="#cc6029" opacity="0"
              d="M2,68 L2,39 L2,22 L61,22 C61,22 115,30 115,92 C115,150 65,161 61,161 L2,161 L2,144 L2,86 L2,68 Z"
              style={{ opacity: 0.4 }}></path>
          </g>
          {/* home team almost highlight */}
          <g id="SVGIRIS_PITCH_DEF_H_CS3P" style={{ display: "none" }}>
            <path fill="#cc6029" opacity="0"
              d="M2,2 L398,2 L398,22 L339,22 C339,22 285,31 285,90 C285,149 335,161 339,161 L398,161 L398,178 L2,178 L2,2 Z"
              style={{ opacity: 0.4 }}></path>
          </g>
          {/* away team almost highlight */}
          <g id="SVGIRIS_PITCH_DEF_A_CS3P" style={{ display: "none" }}>
            <path fill="#cc6029" opacity="0"
              d="M398,2 L2,2 L2,22 L61,22 C61,22 115,31 115,90 C115,149 65,161 61,161 L2,161 L2,178 L398,178 L398,2 Z"
              style={{ opacity: 0.4 }}></path>
          </g>
          {/* ball point */}
          <g id="SVGIRIS_PITCH_DEF_POINT" style={{ display: "none" }}>
            <g id="SVGIRIS_PITCH_DEF_POINT_G" transform="translate(-60,-60)" fill="#ffffff">
              <circle cx="60" cy="60" r="10" opacity=".3">
                <animate attributeName="r" attributeType="XML" dur="1.5s"
                  keyTimes="0; 0.15; 0.3; 0.5; 0.7; 0.85; 1" repeatCount="indefinite"
                  values="3; 14; 18; 20; 18; 14; 3"></animate>
              </circle>
              <circle cx="60" cy="60" r="10" opacity=".3">
                <animate attributeName="r" attributeType="XML" dur="1.5s"
                  keyTimes="0; 0.15; 0.3; 0.5; 0.7; 0.85; 1" repeatCount="indefinite"
                  values="3; 10; 12; 15; 12; 10; 3"></animate>
              </circle>
              <circle cx="60" cy="60" r="3"></circle>
            </g>
          </g>
          {/* ball */}
          <g id="SVGIRIS_PITCH_DEF_BALL" style={{ display: "none" }}>
            <g transform="matrix(.1 0 0 .1 -4.8 -4.8)">
              <g id="Layer_2">
                <radialGradient id="SVGIRIS_PITCH_DEF_BALL_GRAD" cx="37.25" cy="31.531"
                  r="60.208" gradientUnits="userSpaceOnUse">
                  <stop id="stop35" stopColor="#FF7500" offset=".1218"></stop>
                  <stop id="stop37" stopColor="#FC7301" offset=".3444"></stop>
                  <stop id="stop39" stopColor="#F16E02" offset=".533"></stop>
                  <stop id="stop41" stopColor="#E06605" offset=".7093"></stop>
                  <stop id="stop43" stopColor="#C75A09" offset=".877"></stop>
                  <stop id="stop45" stopColor="#B04F0D" offset="1"></stop>
                </radialGradient>
                <circle id="circle48" cx="48.125" cy="48.156" r="48.125"
                  fill="url(#SVGIRIS_PITCH_DEF_BALL_GRAD)"></circle>
              </g>
              <g>
                <path
                  d="m13.938 56.344c0-48.751 27.359-56 27.938-55.987v2e-3l3.39-0.359c0 0.011-4.737 1.499-7.228 2.998-2.489 1.499-5.819 3.996-9.155 7.979-6.668 7.968-13.253 21.856-13.258 45.764 0 17.632 8.923 29.037 13.442 33.615 1.505 1.523 5.57 3.968 5.574 3.973l-5.047-1.781c-0.05-0.042-15.656-10.455-15.656-36.204z"></path>
              </g>
              <g>
                <path
                  d="m14.757 45.695c-9-1.02-10.313-7.956-10.289-13.195l0.042-2.397c0.021-2.181 0.099-2.509 0.099-2.509l1.329-2.594s-0.428 2.642-0.428 5.103c0.027 5.181 1.197 12.238 9.388 13.132 0.927 0.101 1.813 0.15 2.665 0.15 6.021-0.521 13.952-4.812 23.771-12.354 9.735-7.441 25.958-17.083 38.208-17.208 1.063 0 2.118 0.259 2.911 0.583l1.359 1.469c-0.621-0.256-2.626-0.385-3.604-0.385-8.49-0.037-27.853 10.287-37.375 17.625-9.749 7.473-16.225 12.729-25.302 12.739-0.891 0-1.814-0.054-2.774-0.159z"></path>
                <path
                  d="m53.375 87.031c-5.658-1.547-12.604-5.717-19.406-8.984-6.576-3.163-13.266-5.547-18.594-6.328-0.746-0.091-1.415-0.128-2.019-0.128-3.712 0.017-5.156 1.55-5.507 2.157-0.114 0.208-0.24 0.361-0.24 0.361l-0.641-0.969c0.118-0.211 1.048-3.719 6.362-3.682 0.645 0 1.355 0.041 2.138 0.135 6.431 0.764 12.721 3.534 19.313 6.703 6.84 3.294 13.508 7.41 18.953 8.891 5.518 1.502 6.957 2.277 11 2.281 7.688 0.016 13.333-1.619 13.344-1.625l-0.922 0.672c-0.022 2e-3 -6.453 2.375-12.484 2.25-4.124 3e-3 -5.814-0.236-11.297-1.734z"></path>
              </g>
              <g>
                <path
                  d="m14.784 59.765c-2.852-0.418-7.341-1.532-10.897-2.874-3.569-1.338-3.418-2.031-3.418-2.031s-0.281-1.25-0.375-3.625c0 0 1.094 1.016 1.828 1.438 0.484 0.399 1.663 0.943 3.172 1.516l-0.146-0.102c3.275 1.243 7.717 2.345 10.267 2.709 4.551 0.662 12.027 1.169 21.671 1.169 1.034 0 2.095-7e-3 3.181-0.017 11.139-0.118 28.42-1.545 39.081-4.126 9.351-2.256 14.547-5.279 15.563-5.873 0.132-0.085 1.542-0.771 1.542-0.771 0.5-0.219 0.38 2.88-0.104 3.208-0.145 0.103-5.232 3.684-16.295 6.354-11.09 2.67-28.392 4.076-39.755 4.208-1.096 9e-3 -2.165 0.015-3.211 0.017-9.759-3e-3 -17.323-0.508-22.104-1.2z"></path>
              </g>
            </g>
          </g>
          <svg id="SVGIRIS_PITCH_DEF_COLLECTION" width="40" height="40" viewBox="0 0 40 40" x="180" y="30">
            <rect width="40" height="40" opacity="0"></rect>
            <svg id="SVGIRIS_PITCH_DEF_COLLECTION_TTOU" width="40" height="40"
              viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" y="60">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-589.000000, -112.000000)">
                  <g transform="translate(592.000000, 115.000000)">
                    <ellipse stroke="#FFFFFF" strokeWidth="2" cx="15" cy="15" rx="15"
                      ry="15"></ellipse>
                    <path
                      d="M14,13.8395784 L14,5.87243867 C14,5.31934155 14.4438648,4.87096774 15,4.87096774 C15.5522847,4.87096774 16,5.32837702 16,5.87243867 L16,13.1986897 L16,13.1986897 L19.3256091,9.87308056 C19.7146781,9.48401161 20.3439406,9.48246873 20.7371875,9.87571569 C21.1277118,10.26624 21.134283,10.8928338 20.7398227,11.2872941 L16.9486523,15.0784645 C16.9822454,15.2191034 17,15.3656097 17,15.516129 C17,16.5850673 16.1045695,17.4516129 15,17.4516129 C13.8954305,17.4516129 13,16.5850673 13,15.516129 C13,14.7997268 13.4021986,14.1742327 14,13.8395784 Z"
                      fill="#FFFFFF"></path>
                    <path
                      d="M29.9090909,28.1901969 C29.9090909,28.5626779 29.5419069,28.9442815 29.1298701,28.9442815 L19.7792208,28.9442815 C19.367184,28.9442815 19,28.5629354 19,28.1901969 L19,19.1411814 C19,18.7687004 19.367184,18.3870968 19.7792208,18.3870968 L29.1298701,18.3870968 C29.5419069,18.3870968 29.9090909,18.7684429 29.9090909,19.1411814 L29.9090909,28.1901969 L29.9090909,28.1901969 Z"
                      fill="#A52A2A"></path>
                    <path
                      d="M21.6363636,20.8504399 L23.6363636,20.8504399 L23.6363636,26.6568915 L21.6363636,26.6568915 L21.6363636,20.8504399 Z M25.6363636,20.8504399 L27.6363636,20.8504399 L27.6363636,26.6568915 L25.6363636,26.6568915 L25.6363636,20.8504399 Z"
                      fill="#FFFFFF"></path>
                  </g>
                </g>
              </g>
            </svg>
            <svg id="SVGIRIS_PITCH_DEF_COLLECTION_TFOU" width="40" height="40"
              viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" y="60">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-69.000000, -112.000000)">
                  <g transform="translate(72.000000, 115.000000)">
                    <circle stroke="#FFFFFF" strokeWidth="2" cx="15" cy="15" r="15"></circle>
                    <path
                      d="M19.2960877,10.6979686 L19.2960877,13.8304443 C19.2960877,14.0027948 19.1340174,14.14261 18.9340218,14.14261 C18.7339849,14.14261 18.5719145,14.0027948 18.5719145,13.8304443 L18.5719145,9.38822311 C18.5712948,8.91160383 18.1669658,8.52544389 17.6684021,8.52544389 C17.1692187,8.52544389 16.7646832,8.91211713 16.7646832,9.38909177 C16.7646832,9.38909177 16.7671619,13.8277988 16.7646832,13.8288649 C16.7646832,14.0027553 16.6119082,14.1425705 16.4232323,14.1425705 C16.2347217,14.1425705 16.0817815,14.0027553 16.0817815,13.8304048 L16.0817815,8.16111898 C16.081327,7.64450174 15.6430388,7.22580645 15.10246,7.22580645 C14.5613854,7.22580645 14.1228906,7.64489659 14.1228906,8.16202712 C14.1228906,8.16202712 14.1218991,13.7838524 14.1218991,13.8490416 C14.1117361,14.012745 13.970033,14.1426495 13.7961885,14.1426495 C13.6157752,14.1426495 13.4695276,14.0028343 13.4695276,13.8304838 L13.4695276,8.97951744 C13.4695276,8.46242638 13.0310329,8.04333625 12.4900822,8.04333625 C11.9490489,8.04333625 11.5105128,8.46242638 11.5105128,8.97951744 C11.5014653,15.7627444 11.5015066,15.7627444 11.5008456,16.3244136 C11.5008456,16.5364067 11.5051421,16.9919017 11.3982244,17.0681466 C11.3094431,17.13148 11.1911643,17.0527871 11.0480153,16.8681173 C10.7231722,16.4489087 10.2541472,15.7830395 9.91257245,15.3380079 C9.5887622,14.9160749 9.07730891,14.4579739 8.4967392,14.761453 C7.94463406,15.0501253 7.85110173,15.7897519 8.2244461,16.2742286 C8.2244461,16.2742286 10.6432318,19.6666318 11.4698196,20.8460779 C11.9536759,21.5364671 12.0834809,21.7552516 12.2503023,21.982091 C12.8860247,22.8462521 13.5255294,23.7459416 16.2943775,23.7419221 C20.5909155,23.7356848 20.8,20.2804208 20.8,19.1738238 L20.8,11.0930521 C20.8,10.3010294 20.4633828,9.97926892 20.0480645,9.97926892 C19.6327876,9.97926892 19.2960877,10.3010294 19.2960877,10.6979686 Z"
                      fill="#FFFFFF"></path>
                  </g>
                </g>
              </g>
            </svg>
          </svg>
          <g id="SVGIRIS_PITCH_FX">
            {/* away team almost highlight */}
            <g id="SvgjsG2269" opacity="0">
              <path fill="#cc6029" opacity="0"
                d="M398,2 L2,2 L2,22 L61,22 C61,22 115,31 115,90 C115,149 65,161 61,161 L2,161 L2,178 L398,178 L398,2 Z"
                style={{ opacity: 0.4 }} id="SvgjsPath2267"></path>
            </g>

            {/* away team almost whitelight */}
            <g id="SvgjsG2273" opacity="0">
              <path fill="#ffffff" opacity="0"
                d="M398,2 L2,2 L2,22 L61,22 C61,22 115,31 115,90 C115,149 65,161 61,161 L2,161 L2,178 L398,178 L398,2 Z"
                style={{ opacity: 0.4 }} id="SvgjsPath2271"></path>
            </g>
            {/* ball point animation */}
            <g id="SvgjsG2274" transform="matrix(1,0,0,1,114,91)" opacity="0">
              <g id="SvgjsG2284" transform="translate(-60,-60)" fill="#ffffff">
                <circle cx="60" cy="60" r="10" opacity=".3" id="SvgjsCircle2282">
                  <animate attributeName="r" attributeType="XML" dur="1.5s"
                    keyTimes="0; 0.15; 0.3; 0.5; 0.7; 0.85; 1" repeatCount="indefinite"
                    values="3; 14; 18; 20; 18; 14; 3" id="SvgjsAnimate2280"></animate>
                </circle>
                <circle cx="60" cy="60" r="10" opacity=".3" id="SvgjsCircle2279">
                  <animate attributeName="r" attributeType="XML" dur="1.5s"
                    keyTimes="0; 0.15; 0.3; 0.5; 0.7; 0.85; 1" repeatCount="indefinite"
                    values="3; 10; 12; 15; 12; 10; 3" id="SvgjsAnimate2277"></animate>
                </circle>
                <circle cx="60" cy="60" r="3" id="SvgjsCircle2276"></circle>
              </g>
            </g>
            {/* ball */}
            <g id="SvgjsG2285" opacity="0" transform="matrix(1,0,0,1,14,92)">
              <g id="SVGIRIS_PITCH_FX_BALL"
                transform="matrix(-0.5000000000000002,-0.8660254037844387,0.8660254037844387,-0.5000000000000002,0.03093692183632625,0.04596050020869512)">
                <g transform="matrix(.1 0 0 .1 -4.8 -4.8)" id="SvgjsG2319">
                  <g id="SvgjsG2317">
                    <radialGradient id="SvgjsRadialGradient2315" cx="37.25" cy="31.531"
                      r="60.208" gradientUnits="userSpaceOnUse">
                      <stop id="SvgjsStop2313" stopColor="#FF7500" offset=".1218"></stop>
                      <stop id="SvgjsStop2311" stopColor="#FC7301" offset=".3444"></stop>
                      <stop id="SvgjsStop2309" stopColor="#F16E02" offset=".533"></stop>
                      <stop id="SvgjsStop2307" stopColor="#E06605" offset=".7093"></stop>
                      <stop id="SvgjsStop2305" stopColor="#C75A09" offset=".877"></stop>
                      <stop id="SvgjsStop2303" stopColor="#B04F0D" offset="1"></stop>
                    </radialGradient>
                    <circle id="SvgjsCircle2301" cx="48.125" cy="48.156" r="48.125"
                      fill="url(#SVGIRIS_PITCH_DEF_BALL_GRAD)"></circle>
                  </g>
                  <g id="SvgjsG2299">
                    <path
                      d="m13.938 56.344c0-48.751 27.359-56 27.938-55.987v2e-3l3.39-0.359c0 0.011-4.737 1.499-7.228 2.998-2.489 1.499-5.819 3.996-9.155 7.979-6.668 7.968-13.253 21.856-13.258 45.764 0 17.632 8.923 29.037 13.442 33.615 1.505 1.523 5.57 3.968 5.574 3.973l-5.047-1.781c-0.05-0.042-15.656-10.455-15.656-36.204z"
                      id="SvgjsPath2297"></path>
                  </g>
                  <g id="SvgjsG2295">
                    <path
                      d="m14.757 45.695c-9-1.02-10.313-7.956-10.289-13.195l0.042-2.397c0.021-2.181 0.099-2.509 0.099-2.509l1.329-2.594s-0.428 2.642-0.428 5.103c0.027 5.181 1.197 12.238 9.388 13.132 0.927 0.101 1.813 0.15 2.665 0.15 6.021-0.521 13.952-4.812 23.771-12.354 9.735-7.441 25.958-17.083 38.208-17.208 1.063 0 2.118 0.259 2.911 0.583l1.359 1.469c-0.621-0.256-2.626-0.385-3.604-0.385-8.49-0.037-27.853 10.287-37.375 17.625-9.749 7.473-16.225 12.729-25.302 12.739-0.891 0-1.814-0.054-2.774-0.159z"
                      id="SvgjsPath2293"></path>
                    <path
                      d="m53.375 87.031c-5.658-1.547-12.604-5.717-19.406-8.984-6.576-3.163-13.266-5.547-18.594-6.328-0.746-0.091-1.415-0.128-2.019-0.128-3.712 0.017-5.156 1.55-5.507 2.157-0.114 0.208-0.24 0.361-0.24 0.361l-0.641-0.969c0.118-0.211 1.048-3.719 6.362-3.682 0.645 0 1.355 0.041 2.138 0.135 6.431 0.764 12.721 3.534 19.313 6.703 6.84 3.294 13.508 7.41 18.953 8.891 5.518 1.502 6.957 2.277 11 2.281 7.688 0.016 13.333-1.619 13.344-1.625l-0.922 0.672c-0.022 2e-3 -6.453 2.375-12.484 2.25-4.124 3e-3 -5.814-0.236-11.297-1.734z"
                      id="SvgjsPath2291"></path>
                  </g>
                  <g id="SvgjsG2289">
                    <path
                      d="m14.784 59.765c-2.852-0.418-7.341-1.532-10.897-2.874-3.569-1.338-3.418-2.031-3.418-2.031s-0.281-1.25-0.375-3.625c0 0 1.094 1.016 1.828 1.438 0.484 0.399 1.663 0.943 3.172 1.516l-0.146-0.102c3.275 1.243 7.717 2.345 10.267 2.709 4.551 0.662 12.027 1.169 21.671 1.169 1.034 0 2.095-7e-3 3.181-0.017 11.139-0.118 28.42-1.545 39.081-4.126 9.351-2.256 14.547-5.279 15.563-5.873 0.132-0.085 1.542-0.771 1.542-0.771 0.5-0.219 0.38 2.88-0.104 3.208-0.145 0.103-5.232 3.684-16.295 6.354-11.09 2.67-28.392 4.076-39.755 4.208-1.096 9e-3 -2.165 0.015-3.211 0.017-9.759-3e-3 -17.323-0.508-22.104-1.2z"
                      id="SvgjsPath2287"></path>
                  </g>
                </g>
              </g>
            </g>
          </g>

          {/* time */}
          <g id="SVGIRIS_PITCH_MATCHTIME" transform="translate(175, 0)">
            <rect width="50" height="17" fill="#94713E"></rect>
            <text id="SVGIRIS_PITCH_MATCHTIME_TXT" x="25" y="13" fill="#ffdb99" fontFamily="Roboto"
              fontSize="12px" fontWeight="300" textAnchor="middle" xmlSpace="preserve"
              textRendering="optimizeLegibility">{CheckQuarter(data)} {displayTime}</text>
          </g>
        </svg>
        {/* <svg id="SVGIRIS_STATS" y="120" width="400" height="110" style={{height:"100%", width:"100%"}}
          version="1.1" viewBox="0 0 400 110" x="400">
          <g>     
            <g transform="translate(27, 5)">
              <text id="SVGIRIS_STATS_FOULS_H_TXT_SC" x="15" y="12" fill="#ddd"
                fontFamily="Roboto" fontSize="14px" fontWeight="400" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility">1</text>
              <rect id="SVGIRIS_STATS_FOULS_H_COL" x="3" y="19" width="24" height="2"
                fill="#f0f0f0"></rect>
              <text id="SVGIRIS_STATS_FOULS_H_TXT_DESC1" x="15" y="35" fill="#999"
                fontFamily="Roboto" fontSize="11px" fontWeight="300" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility">Fouls</text>
              <text id="SVGIRIS_STATS_FOULS_H_TXT_DESC2" x="15" y="48" fill="#999"
                fontFamily="Roboto" fontSize="11px" fontWeight="300" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility"></text>
            </g>
            <g transform="translate(96, 5)">
              <text id="SVGIRIS_STATS_2PTS_H_TXT_SC" x="15" y="12" fill="#ddd"
                fontFamily="Roboto" fontSize="14px" fontWeight="400" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility">5</text>
              <rect id="SVGIRIS_STATS_2PTS_H_COL" x="3" y="19" width="24" height="2"
                fill="#f0f0f0"></rect>
              <text id="SVGIRIS_STATS_2PTS_H_TXT_DESC1" x="15" y="35" fill="#999"
                fontFamily="Roboto" fontSize="11px" fontWeight="300" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility">2 Points</text>
              <text id="SVGIRIS_STATS_2PTS_H_TXT_DESC2" x="15" y="48" fill="#999"
                fontFamily="Roboto" fontSize="11px" fontWeight="300" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility"></text>
            </g>
            <g transform="translate(171, 5)">
              <text id="SVGIRIS_STATS_3PTS_H_TXT_SC" x="15" y="12" fill="#ddd"
                fontFamily="Roboto" fontSize="14px" fontWeight="400" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility">5</text>
              <rect id="SVGIRIS_STATS_3PTS_H_COL" x="3" y="19" width="24" height="2"
                fill="#f0f0f0"></rect>
              <text id="SVGIRIS_STATS_3PTS_H_TXT_DESC2" x="15" y="48" fill="#999"
                fontFamily="Roboto" fontSize="11px" fontWeight="300" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility"></text>
            </g>
            <text id="SVGIRIS_STATS_3PTS_TXT_DESC1" x="200" y="40" fill="#999" fontFamily="Roboto"
              fontSize="11px" fontWeight="300" letterSpacing="0px" textAnchor="middle"
              word-spacing="0px" xmlSpace="preserve" textRendering="optimizeLegibility">3 Points</text>
            <g transform="translate(205, 5)">
              <text id="SVGIRIS_STATS_3PTS_A_TXT_SC" x="15" y="12" fill="#ddd"
                fontFamily="Roboto" fontSize="14px" fontWeight="400" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility">3</text>
              <rect id="SVGIRIS_STATS_3PTS_A_COL" x="3" y="19" width="24" height="2"
                fill="#0a0a0a"></rect>
              <text id="SVGIRIS_STATS_3PTS_A_TXT_DESC2" x="15" y="48" fill="#999"
                fontFamily="Roboto" fontSize="11px" fontWeight="300" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility"></text>
            </g>
            <g transform="translate(271, 5)">
              <text id="SVGIRIS_STATS_2PTS_A_TXT_SC" x="15" y="12" fill="#ddd"
                fontFamily="Roboto" fontSize="14px" fontWeight="400" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility">4</text>
              <rect id="SVGIRIS_STATS_2PTS_A_COL" x="3" y="19" width="24" height="2"
                fill="#0a0a0a"></rect>
              <text id="SVGIRIS_STATS_2PTS_A_TXT_DESC1" x="15" y="35" fill="#999"
                fontFamily="Roboto" fontSize="11px" fontWeight="300" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility">2 Points</text>
              <text id="SVGIRIS_STATS_2PTS_A_TXT_DESC2" x="15" y="48" fill="#999"
                fontFamily="Roboto" fontSize="11px" fontWeight="300" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility"></text>
            </g>
            <g transform="translate(343, 5)">
              <text id="SVGIRIS_STATS_FOULS_A_TXT_SC" x="15" y="12" fill="#ddd"
                fontFamily="Roboto" fontSize="14px" fontWeight="400" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility">0</text>
              <rect id="SVGIRIS_STATS_FOULS_A_COL" x="3" y="19" width="24" height="2"
                fill="#0a0a0a"></rect>
              <text id="SVGIRIS_STATS_FOULS_A_TXT_DESC1" x="15" y="35" fill="#999"
                fontFamily="Roboto" fontSize="11px" fontWeight="300" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility">Fouls</text>
              <text id="SVGIRIS_STATS_FOULS_A_TXT_DESC2" x="15" y="48" fill="#999"
                fontFamily="Roboto" fontSize="11px" fontWeight="300" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility"></text>
            </g>
          </g>
          <g transform="translate(0 50)">
            <g transform="translate(35, 5)">
              <rect id="SVGIRIS_STATS_TO_H_COL_4" x="3" y="15" width="5" height="5" fill="#f0f0f0"></rect>
              <rect id="SVGIRIS_STATS_TO_H_COL_2" x="10" y="15" width="5" height="5"
                fill="#f0f0f0"></rect>
              <rect id="SVGIRIS_STATS_TO_H_COL_1" x="17" y="15" width="5" height="5"
                fill="#f0f0f0"></rect>
              <rect id="SVGIRIS_STATS_TO_H_COL_3" x="24" y="15" width="5" height="5"
                fill="#f0f0f0"></rect>
              <rect id="SVGIRIS_STATS_TO_H_COL_5" x="31" y="15" width="5" height="5"
                fill="#f0f0f0"></rect>
              <text id="SVGIRIS_STATS_TO_H_TXT_DESC1" x="20" y="35" fill="#999"
                fontFamily="Roboto" fontSize="11px" fontWeight="300" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility">Time Outs</text>
            </g>
            <g transform="translate(123, 5)">
              <text id="SVGIRIS_STATS_FTS_H_TXT_SC" x="15" y="12" fill="#ddd" fontFamily="Roboto"
                fontSize="14px" fontWeight="400" letterSpacing="0px" textAnchor="middle"
                word-spacing="0px" xmlSpace="preserve" textRendering="optimizeLegibility">3</text>
              <text id="SVGIRIS_STATS_FTS_H_TXT_PRC" x="45" y="12" fill="#999"
                fontFamily="Roboto" fontSize="11px" fontWeight="400" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility">0%</text>
              <rect id="SVGIRIS_STATS_FTS_H_COL" x="3" y="19" width="72" height="2" fill="#f0f0f0"></rect>
              <text id="SVGIRIS_STATS_FTS_H_TXT_DESC2" x="15" y="48" fill="#999"
                fontFamily="Roboto" fontSize="11px" fontWeight="300" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility"></text>
            </g>
            <text id="SVGIRIS_STATS_FTS_TXT_DESC1" x="200" y="40" fill="#999" fontFamily="Roboto"
              fontSize="11px" fontWeight="300" letterSpacing="0px" textAnchor="middle"
              word-spacing="0px" xmlSpace="preserve" textRendering="optimizeLegibility">Free Throws</text>
            <g transform="translate(205, 5)">
              <text id="SVGIRIS_STATS_FTS_A_TXT_SC" x="15" y="12" fill="#ddd" fontFamily="Roboto"
                fontSize="14px" fontWeight="400" letterSpacing="0px" textAnchor="middle"
                word-spacing="0px" xmlSpace="preserve" textRendering="optimizeLegibility">5</text>
              <text id="SVGIRIS_STATS_FTS_A_TXT_PRC" x="45" y="12" fill="#999"
                fontFamily="Roboto" fontSize="11px" fontWeight="400" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility">0%</text>
              <rect id="SVGIRIS_STATS_FTS_A_COL" x="3" y="19" width="72" height="2" fill="#0a0a0a"></rect>
              <text id="SVGIRIS_STATS_FTS_A_TXT_DESC2" x="15" y="48" fill="#999"
                fontFamily="Roboto" fontSize="11px" fontWeight="300" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility"></text>
            </g>
            <g transform="translate(329, 5)">
              <rect id="SVGIRIS_STATS_TO_A_COL_4" x="3" y="15" width="5" height="5" fill="#0a0a0a"></rect>
              <rect id="SVGIRIS_STATS_TO_A_COL_2" x="10" y="15" width="5" height="5"
                fill="#0a0a0a"></rect>
              <rect id="SVGIRIS_STATS_TO_A_COL_1" x="17" y="15" width="5" height="5"
                fill="#0a0a0a"></rect>
              <rect id="SVGIRIS_STATS_TO_A_COL_3" x="24" y="15" width="5" height="5"
                fill="#0a0a0a"></rect>
              <rect id="SVGIRIS_STATS_TO_A_COL_5" x="31" y="15" width="5" height="5"
                fill="#0a0a0a" style={{display: "none"}}></rect>
              <text id="SVGIRIS_STATS_TO_A_TXT_DESC1" x="20" y="35" fill="#999"
                fontFamily="Roboto" fontSize="11px" fontWeight="300" letterSpacing="0px"
                textAnchor="middle" word-spacing="0px" xmlSpace="preserve"
                textRendering="optimizeLegibility">Time Outs</text>
            </g>
          </g>
        </svg> */}
        {/* <svg id="SVGIRIS_SCORES" y="40" width="400" height="60" style={{height:'100%', width:'100%'}}
          version="1.1" viewBox="0 0 400 60" xmlns="http://www.w3.org/2000/svg" x="400">
          <g id="SVGIRIS_SCORES_MOVE_G">
            <g id="SVGIRIS_SCORES_Q1" transform="translate(80, 19)">
              <text x="22" y="-5" fill="#999" fontFamily="Roboto" fontSize="13px"
                fontWeight="400" textAnchor="middle" xmlSpace="preserve"
                textRendering="optimizeLegibility">1</text>
              <text id="SVGIRIS_SCORES_TXT_Q1_0" x="22" y="15" fill="#ddd" fontFamily="Roboto"
                fontSize="15px" fontWeight="400" textAnchor="middle" xmlSpace="preserve"
                textRendering="optimizeLegibility">24</text>
              <text id="SVGIRIS_SCORES_TXT_Q1_1" x="22" y="35" fill="#ddd" fontFamily="Roboto"
                fontSize="15px" fontWeight="400" textAnchor="middle" xmlSpace="preserve"
                textRendering="optimizeLegibility">18</text>
            </g>
            <g id="SVGIRIS_SCORES_Q2" transform="translate(130, 19)">
              <text x="22" y="-5" fill="#999" fontFamily="Roboto" fontSize="13px"
                fontWeight="400" textAnchor="middle" xmlSpace="preserve"
                textRendering="optimizeLegibility">2</text>
              <text id="SVGIRIS_SCORES_TXT_Q2_0" x="22" y="15" fill="#ddd" fontFamily="Roboto"
                fontSize="15px" fontWeight="400" textAnchor="middle" xmlSpace="preserve"
                textRendering="optimizeLegibility">4</text>
              <text id="SVGIRIS_SCORES_TXT_Q2_1" x="22" y="35" fill="#ddd" fontFamily="Roboto"
                fontSize="15px" fontWeight="400" textAnchor="middle" xmlSpace="preserve"
                textRendering="optimizeLegibility">4</text>
            </g>
            <g id="SVGIRIS_SCORES_QHT" transform="translate(180, 19)">
              <text x="22" y="-5" fill="#999" fontFamily="Roboto" fontSize="13px"
                fontWeight="400" textAnchor="middle" xmlSpace="preserve"
                textRendering="optimizeLegibility">HT</text>
              <text id="SVGIRIS_SCORES_TXT_QHT_0" x="22" y="15" fill="#ddd" fontFamily="Roboto"
                fontSize="15px" fontWeight="400" textAnchor="middle" xmlSpace="preserve"
                textRendering="optimizeLegibility">28</text>
              <text id="SVGIRIS_SCORES_TXT_QHT_1" x="22" y="35" fill="#ddd" fontFamily="Roboto"
                fontSize="15px" fontWeight="400" textAnchor="middle" xmlSpace="preserve"
                textRendering="optimizeLegibility">22</text>
            </g>
            <g id="SVGIRIS_SCORES_Q3" transform="translate(230, 19)">
              <text x="22" y="-5" fill="#999" fontFamily="Roboto" fontSize="13px"
                fontWeight="400" textAnchor="middle" xmlSpace="preserve"
                textRendering="optimizeLegibility">3</text>
              <text id="SVGIRIS_SCORES_TXT_Q3_0" x="22" y="15" fill="#ddd" fontFamily="Roboto"
                fontSize="15px" fontWeight="400" textAnchor="middle" xmlSpace="preserve"
                textRendering="optimizeLegibility">-</text>
              <text id="SVGIRIS_SCORES_TXT_Q3_1" x="22" y="35" fill="#ddd" fontFamily="Roboto"
                fontSize="15px" fontWeight="400" textAnchor="middle" xmlSpace="preserve"
                textRendering="optimizeLegibility">-</text>
            </g>
            <g id="SVGIRIS_SCORES_Q4" transform="translate(280, 19)">
              <text x="22" y="-5" fill="#999" fontFamily="Roboto" fontSize="13px"
                fontWeight="400" textAnchor="middle" xmlSpace="preserve"
                textRendering="optimizeLegibility">4</text>
              <text id="SVGIRIS_SCORES_TXT_Q4_0" x="22" y="15" fill="#ddd" fontFamily="Roboto"
                fontSize="15px" fontWeight="400" textAnchor="middle" xmlSpace="preserve"
                textRendering="optimizeLegibility">-</text>
              <text id="SVGIRIS_SCORES_TXT_Q4_1" x="22" y="35" fill="#ddd" fontFamily="Roboto"
                fontSize="15px" fontWeight="400" textAnchor="middle" xmlSpace="preserve"
                textRendering="optimizeLegibility">-</text>
            </g>
          </g>
        </svg> */}
      </svg>
    </>
  );
}

export default BasketballPitch;