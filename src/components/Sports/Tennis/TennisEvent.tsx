import React from "react";
import Link from "next/link";
import TennisOdds from "./odds";
import { defaultSubcategories } from "@/lib/sportsMapping";

import { cn } from "@/lib/utils";
import StarOutlineIcon from "@/components/ui/icons/star-outline";
import Points from "@/components/Events/Points";
import Stats from "../Soccer/stats";
import Chevron from "@/components/ui/icons/chevron";
import PlayButton, { PlayButtonHover } from "@/components/ui/icons/playButton";
interface TennisEventProps {
    data: any;
    sport: string;
    subcategory?: string;
}

const TennisEvent: React.FC<TennisEventProps> = ({ data, sport, subcategory }) => {
    console.log({ data, sport })
    if (!data) {
        return null;
    }
    return (
        <div className="flex flex-col border-t-[#ffffff1a] border-t border-solid">
            <div className={cn(`grid grid-cols-8 w-full px-8  justify-center h-[95px]`)}>
                <div className=" col-span-4 flex items-center text-xs font-bold text-white gap-4 py-[10px]">
                    <StarOutlineIcon className=" hover:fill-[#333] fill-transparent cursor-pointer" />
                    <Link
                        href={`/in-play/${sport}/${subcategory ? subcategory : defaultSubcategories[sport as keyof typeof defaultSubcategories]}/${data?.info?.id}`}
                        className="w-[100%] flex-col"
                    >
                        <div className="flex items-center">

                            <div className="flex flex-col text-[13px] font-semibold hover:text-brand-green-light cursor-pointer w-[calc(100%_-_180px)]">
                                <div className="flex h-[25px] items-center">
                                    <div className={cn("w-[5px] h-[5px] mr-[5px] rounded-[50%]",
                                        true ? 'bg-[#ffde00]' : 'bg-[#ffffff4d]'
                                    )} />
                                    <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                                        {data?.team_info?.home.name}
                                    </div>
                                </div>
                                <div className="flex h-[25px] items-center">
                                    <div className={cn("w-[5px] h-[5px] mr-[5px] rounded-[50%]",
                                        false ? 'bg-[#ffde00]' : 'bg-[#ffffff4d]'
                                    )} />
                                    <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                                        {data?.team_info?.away.name}
                                    </div>
                                </div>
                            </div>
                            <div className="flex ml-[auto]">
                                <Points data={data} sport={sport} />
                                <Stats />
                            </div>
                        </div>
                        <div className="flex h-[18px] leading-[18px] mt-[6px] items-center text-[11px] text-[#ccc] fill-[#ccc] font-[400]">
                            {'Set 1 Game 8'}
                            <div className="ml-[2px] flex items-center  hover:text-brand-green-light hover:fill-brand-green-light">
                                {'56'}
                                <Chevron className={cn("h-[6px] w-[12px] rotate-[270deg]")} />
                            </div>
                        </div>
                    </Link>

                </div>
                <TennisOdds data={data} sport={sport} subcategory={subcategory} />
                <div className="group flex col-span-1 items-center justify-center cursor-pointer">
                    <div className="flex group-hover:hidden">
                        <PlayButton />
                    </div>
                    <div className="hidden group-hover:flex">
                        <PlayButtonHover />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TennisEvent;
