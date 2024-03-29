import React, { useEffect, useState } from "react";
import Link from "next/link";
import { defaultSubcategories } from "@/lib/sportsMapping";

import { cn } from "@/lib/utils";
import StarOutlineIcon from "@/components/ui/icons/star-outline";
import Points from "@/components/Events/Points";
import Stats from "../Soccer/stats";
import Chevron from "@/components/ui/icons/chevron";
import PlayButton, { PlayButtonHover } from "@/components/ui/icons/playButton";
import BasketballOdds from "./odds";
import BasketballJersey from "./Jersey";
import BasketballPoints from "./Points";
import { CheckQuarter } from "@/components/Structure/CheckQuarter";
import usePitchIdStore from "@/store/use-pitchid";
interface BaskeballEventProps {
    data: any;
    sport: string;
    subcategory?: string;
}

const BaskeballEvent: React.FC<BaskeballEventProps> = ({ data, sport, subcategory }) => {
    //Match Time

    const [isTimerPaused, setTimerPaused] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(convertToSeconds(data?.info?.seconds || "00:00"));

    useEffect(() => {
        let timerInterval: NodeJS.Timer | undefined;

        if (!isTimerPaused) {
            timerInterval = setInterval(() => {
            setTotalSeconds((prevTotalSeconds) => Math.max(prevTotalSeconds - 1, 0));
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
    

    const { currentPitchId, setCurrentPitchId } = usePitchIdStore(
        (state) => state
    );
    if (!data) {
        return null;
    }

    const displayTime = isNaN(totalSeconds) ? "00:00" : formatTime(totalSeconds);

    if (data?.core?.stopped === "1" && isTimerPaused == false) {
        setTimerPaused(true);
        setTotalSeconds(convertToSeconds(data?.info?.seconds));
    }
    if (data?.core?.stopped === "0" && isTimerPaused == true) {
        setTotalSeconds(convertToSeconds(data?.info?.seconds));
        setTimerPaused(false);
    }

    return (
        <div className="flex flex-col border-t-[#ffffff1a] border-t border-solid">
            <div className={cn(`flex w-full px-2 md:px-8  justify-center h-[100px]`)}>
                <div className=" flex-1 flex items-center text-xs font-bold text-white gap-4 py-[10px] overflow-hidden">
                    <StarOutlineIcon className=" hover:fill-[#333] fill-transparent cursor-pointer hidden md:flex" />
                    <Link
                        href={`/in-play/${sport}/${subcategory ? subcategory : defaultSubcategories[sport as keyof typeof defaultSubcategories]}/${data?.info?.id}`}
                        className="w-[100%] flex-col"
                    >
                        <div className="flex items-left text-[11px] font-[400]">
                            <div className="hidden flex-col items-left mr-2 md:flex">
                                <div className="flex h-[25px] items-center">
                                    <div className="flex font-[700] mr-[5px]">{CheckQuarter(data)}</div>
                                    <div className="flex">{displayTime}</div>
                                </div>
                                <div className="flex h-[25px] items-center">
                                    <div className="flex items-center fill-[#fff]  hover:text-brand-green-light hover:fill-brand-green-light">
                                        {'116'}
                                        <Chevron className={cn("h-[6px] w-[12px] rotate-[270deg]")} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col text-[13px] font-semibold hover:text-brand-green-light cursor-pointer overflow-hidden">
                                <div className="flex h-[25px] items-center overflow-hidden">
                                    <div className="min-w-[15px] min-h-[15px] h-[15px] w-[15px] mr-[10px]">
                                        <BasketballJersey />
                                    </div>
                                    <div className="truncate overflow-hidden ">
                                        {data?.team_info?.home.name}
                                    </div>
                                </div>
                                <div className="flex h-[25px] items-center overflow-hidden">
                                    <div className="min-w-[15px] min-h-[15px] h-[15px] w-[15px] mr-[10px]">
                                        <BasketballJersey />
                                    </div>
                                    <div className="truncate overflow-hidden">
                                        {data?.team_info?.away.name}
                                    </div>
                                </div>
                            </div>
                            <div className="flex ml-[auto] mr-2">
                                <BasketballPoints data={data} sport={sport} />
                                <div className="hidden md:flex">
                                    <Stats />
                                </div>
                            </div>
                        </div>
                        <div className="flex h-[18px] leading-[18px] mt-[6px] items-center text-[11px] text-[#ccc] fill-[#ccc] font-[400]">
                            {CheckQuarter(data)}
                            <div className="ml-[2px] flex items-center  hover:text-brand-green-light hover:fill-brand-green-light">
                                {displayTime}
                                <Chevron className={cn("h-[6px] w-[12px] rotate-[270deg]")} />
                            </div>
                            <div className="flex ml-auto mr-2 md:hidden">
                                <Stats />
                            </div>

                        </div>
                    </Link>
                </div>
                <div className="flex-1 flex overflow-hidden">
                    <BasketballOdds data={data} sport={sport} subcategory={subcategory} />
                </div>
                <div className="group w-[50px] md:flex items-center justify-center cursor-pointer hidden">
                    <div className={`${currentPitchId == data.info.id ? "hidden" : "flex"
                        } group-hover:hidden`}>
                        <PlayButton />
                    </div>
                    <div
                        className={`${currentPitchId == data.info.id ? "flex" : "hidden"
                            } group-hover:flex`}
                        onClick={() => {
                            setCurrentPitchId(data.info.id);
                        }}
                    >
                        <PlayButtonHover />
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

function formatTime(totalSeconds: any) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default BaskeballEvent;
