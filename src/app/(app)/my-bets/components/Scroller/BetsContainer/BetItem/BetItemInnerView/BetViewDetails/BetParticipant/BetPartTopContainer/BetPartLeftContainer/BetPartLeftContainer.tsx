import React, {useState, useEffect} from "react";
import BetPartHeaderTitle from "./BetPartHeaderTitle/BetPartHeaderTitle";
import BetPartMarketDescContainer from "./BetPartMarketDescContainer/BetPartMarketDescContainer";
import BetPartFixtureContainer from "./BetPartFixtureContainer/BetPartFixtureContainer";

type Props = {
  selection: any;
  event: any;
};

export default function BetPartLeftContainer({ selection, event }: Props) {
  const [isTimerPaused, setTimerPaused] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(
    event?.info?.seconds ? convertToSeconds(event?.info?.seconds) : 0
  );
  const displayTime = event?.info?.seconds ? formatTime(totalSeconds) : "";

  if (event?.core?.stopped === "1" && isTimerPaused == false) {
    setTimerPaused(true);
    setTotalSeconds(convertToSeconds(event?.info?.seconds));
  }
  if (event?.core?.stopped === "0" && isTimerPaused == true) {
    setTotalSeconds(convertToSeconds(event?.info?.seconds));
    setTimerPaused(false);
  }

  useEffect(() => {
    let timerInterval: NodeJS.Timer | undefined;

    if (!isTimerPaused) {
      timerInterval = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => prevTotalSeconds + 1);
      }, 1000); // Increase by 1 second (1000 milliseconds)
    } else {
      clearInterval(timerInterval); // Pause the timer
    }

    return () => {
      clearInterval(timerInterval); // Clean up the interval on component unmount
    };
  }, [isTimerPaused]);

  useEffect(() => {
    if(event?.info?.seconds)
      setTotalSeconds(convertToSeconds(event?.info?.seconds) ?? totalSeconds);
  }, [event?.info?.id, event?.info?.seconds]);

  return (
    <div className="flex-1 pr-[15px]">
      <BetPartHeaderTitle
        team={
          (selection.participant_name == "Home"
            ? event?.team_info?.home?.name
            : event?.team_info?.away?.name) ?? selection.participant_name
        }
        handicap={selection?.participant_handicap ?? ""}
        status={selection?.status}
      />
      <BetPartMarketDescContainer marketDesc={selection.odd_name} />
      <BetPartFixtureContainer
        matchName={selection.event_name}
        score={event?.info?.score}
        playTime={displayTime}
      />
    </div>
  );
}


function convertToSeconds(timeString: string) {
  const [minutes, seconds] = timeString.split(":").map(Number);
  return minutes * 60 + seconds;
}



function formatTime(totalSeconds: any) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}