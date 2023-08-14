import React from "react";
import Link from "next/link";
import { defaultSubcategories } from "@/lib/sportsMapping";
import { cn } from "@/lib/utils";
import StarOutlineIcon from "@/components/ui/icons/star-outline";
import Stats from "../Soccer/stats";
import SoccerOdds from "./odds";
import SoccerJersey from "./Jersey";
import SoccerPoints from "./Points";
import SoccerField from "./Field";
interface SoccerEventProps {
    data: any;
    sport: string;
    subcategory?: string;
}

const SoccerEvent: React.FC<SoccerEventProps> = ({ data, sport, subcategory }) => {
    console.log({ data, sport })
    if (!data) {
        return null;
    }
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
                                    <div className="flex">{data?.info?.seconds}</div>
                                </div>
                            </div>
                            <div className="flex flex-col text-[13px] font-semibold hover:text-brand-green-light cursor-pointer overflow-hidden">
                                <div className="flex h-[25px] items-center truncate overflow-hidden">
                                    <div className="min-w-[15px] min-h-[15px] h-[15px] w-[15px] mr-[10px]">
                                        <SoccerJersey data={data} team={'home'} />
                                    </div>
                                    <div className="truncate overflow-hidden ">
                                        {data?.team_info?.home.name}
                                    </div>
                                </div>
                                <div className="flex h-[25px] items-center truncate overflow-hidden">
                                    <div className="min-w-[15px] min-h-[15px] h-[15px] w-[15px] mr-[10px]">
                                        <SoccerJersey data={data} team={'away'} />
                                    </div>
                                    <div className="truncate overflow-hidden">
                                        {data?.team_info?.away.name}
                                    </div>
                                </div>
                                <div className="flex flex-col items-left mr-2 md:hidden">
                                    <div className="flex h-[25px] items-center">
                                        <div className="flex text-[11px] leading-3 font-[500]">{data?.info?.seconds}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center ml-[auto] mr-2 flex-col md:flex-row">
                                <SoccerPoints data={data} sport={sport} />
                                <Stats />
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex-1 flex">
                    <SoccerOdds data={data} sport={sport} subcategory={subcategory} />
                    <div className=" items-center hidden md:flex">
                        <SoccerField />
                    </div>
                </div>



            </div>
        </div>
    );
};

export default SoccerEvent;
