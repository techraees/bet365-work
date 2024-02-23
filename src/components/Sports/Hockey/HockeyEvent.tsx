import React, { useEffect, useState } from "react";
import Link from "next/link";
import { defaultSubcategories } from "@/lib/sportsMapping";
import { cn } from "@/lib/utils";
import StarOutlineIcon from "@/components/ui/icons/star-outline";
import Stats from "./stats";
import HockeyOdds from "./odds";
import HockeyJersey from "./Jersey";
import HockeyPoints from "./Points";
import HockeyField from "./Field";
import HockeyFieldHover from "./FieldHover";
import usePitchIdStore from "@/store/use-pitchid";

interface HockeyEventProps {
    data: any;
    sport: string;
    subcategory?: string;
}


const HockeyEvent: React.FC<HockeyEventProps> = ({ data, sport, subcategory }) => {
    // console.log({ data, sport });
    // const initialSecondsIncreased = increaseTimeBySeconds(initialSeconds, 10);

    const [isTimerPaused, setTimerPaused] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(convertToSeconds(data?.info?.seconds || "00:00"));

    const { currentPitchId, setCurrentPitchId } = usePitchIdStore(
        (state) => state
    );

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
                setTotalSeconds(prevTotalSeconds => prevTotalSeconds - 1);
            }, 1000); // Increase by 1 second (1000 milliseconds)
        } else {
            clearInterval(timerInterval); // Pause the timer
        }

        return () => {
            clearInterval(timerInterval); // Clean up the interval on component unmount
        };
    }, [isTimerPaused]);
    
    useEffect(() => {
      setTotalSeconds(convertToSeconds(data?.info?.seconds) ?? totalSeconds);
    }, [data?.info?.id, data?.info?.seconds]);


    if (!data) {
        return null;
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return (
        <div className="flex flex-col border-t-[#ffffff1a] border-t border-solid text-base">
            <div className={cn(`flex w-full px-2 md:px-8  justify-center min-h-[100px]`)}>
                <div className=" flex-1 flex items-center text-xs font-bold text-white gap-4 py-[10px] overflow-hidden">
                    <StarOutlineIcon className=" hover:fill-[#333] fill-transparent cursor-pointer hidden md:flex" />
                    <Link
                        href={`/in-play/${sport}/${subcategory ? subcategory : defaultSubcategories[sport as keyof typeof defaultSubcategories]}/${data?.info?.id}`}
                        className="w-[100%] flex-col"
                    >
                        <div className="flex items-left text-[11px] font-[400] items-center">
                            <div className="hidden flex-col items-left mr-2 md:flex">
                                <div className="flex h-[25px] items-center">
                                    <div className="flex">{displayTime}</div>
                                </div>
                            </div>
                            <div className="flex flex-col text-[13px] font-semibold hover:text-brand-green-light cursor-pointer overflow-hidden">
                                <div className="flex h-[25px] items-center truncate overflow-hidden">
                                    <div className="min-w-[15px] min-h-[15px] h-[15px] w-[15px] mr-[10px]">
                                        <HockeyJersey data={data} team={'home'} />
                                    </div>
                                    <div className="truncate overflow-hidden ">
                                        {data?.team_info?.home.name}
                                    </div>
                                </div>
                                <div className="flex h-[25px] items-center truncate overflow-hidden">
                                    <div className="min-w-[15px] min-h-[15px] h-[15px] w-[15px] mr-[10px]">
                                        <HockeyJersey data={data} team={'away'} />
                                    </div>
                                    <div className="truncate overflow-hidden">
                                        {data?.team_info?.away.name}
                                    </div>
                                </div>
                                <div className="flex flex-col items-left mr-2 md:hidden">
                                    <div className="flex h-[25px] items-center">
                                        {/* <div className="flex text-[11px] leading-3 font-[500]">{minutes < 10 ? '0' : ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds}</div> */}
                                        <div className="flex">{displayTime}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center ml-[auto] mr-2 flex-col md:flex-row">
                                <HockeyPoints data={data} sport={sport} />
                                <Stats />
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex-1 flex">
                    <HockeyOdds data={data} sport={sport} subcategory={subcategory} />
                    <div className="group items-center w-[50px] justify-center cursor-pointer hidden md:flex">
                        <div
                            className={`${currentPitchId == data.info.id ? "hidden" : "flex"
                                } group-hover:hidden`}
                        >
                            <HockeyField />
                        </div>
                        <div
                            className={`${currentPitchId == data.info.id ? "flex" : "hidden"
                                } group-hover:flex`}
                            onClick={() => {
                                setCurrentPitchId(data.info.id);
                            }}
                        >
                            <HockeyFieldHover />
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function formatTime(totalSeconds: any) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}


export default HockeyEvent;