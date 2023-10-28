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

import usePitchIdStore from "@/store/use-pitchid";
interface TennisEventProps {
    data: any;
    sport: string;
    subcategory?: string;
}

const TennisEvent: React.FC<TennisEventProps> = ({ data, sport, subcategory }) => {
    // console.log({ data, sport })
    if (!data) {
        return null;
    }


    const { currentPitchId, setCurrentPitchId } = usePitchIdStore((state) => state);


    //count in which game we are
    const current_period = data?.info?.period;
    var current_game = 0
    const stats = data?.stats;
    const set_regex = new RegExp('S(\\d+)', 'gm')
    var current_game = 0;
    for(var stat_id in stats){
        var stats_obj = stats[stat_id];
        if(stats_obj.name.match(set_regex)){
            var s = stats_obj;
            current_game += parseInt(s.home) + parseInt(s.away);
        }
    }
    current_game+=1;


    return (
        <div className="flex flex-col border-t-[#ffffff1a] border-t border-solid">
            <div className={cn(`flex w-full px-2 md:px-8  justify-center h-[95px]`)}>
                <div className=" flex-1 flex items-center text-xs font-bold text-white gap-4 py-[10px] overflow-hidden">
                    <StarOutlineIcon className=" hover:fill-[#333] fill-transparent cursor-pointer hidden md:flex" />
                    <Link
                        href={`/in-play/${sport}/${subcategory ? subcategory : defaultSubcategories[sport as keyof typeof defaultSubcategories]}/${data?.info?.id}`}
                        className="w-[100%] flex-col"
                    >
                        <div className="flex items-left text-[11px] font-[400] items-center">

                            <div className="flex flex-col text-[13px] font-semibold hover:text-brand-green-light cursor-pointer overflow-hidden">
                                <div className="flex h-[25px] items-center truncate overflow-hidden">
                                    
                                    {(data && data.stats && data.stats[3] && data.stats[3].home === 1) ? (

                                            <div className={cn("w-[5px] h-[5px] mr-[5px] rounded-[50%]",
                                                true ? 'bg-[#ffde00]' : 'bg-[#ffffff4d]'
                                            )} />
                                        ):(

                                            <div className={cn("w-[5px] h-[5px] mr-[5px] rounded-[50%]",
                                                false ? 'bg-[#ffde00]' : 'bg-[#ffffff4d]'
                                            )} />
                                        )
                                    }
                                    <div className="truncate overflow-hidden">
                                        {data?.team_info?.home.name}
                                    </div>
                                </div>
                                <div className="flex h-[25px] items-center truncate overflow-hidden">
                                    {(data && data.stats && data.stats[3] && data.stats[3].away === 1) ?(

                                            <div className={cn("w-[5px] h-[5px] mr-[5px] rounded-[50%]",
                                                true ? 'bg-[#ffde00]' : 'bg-[#ffffff4d]'
                                            )} />
                                        ):(

                                            <div className={cn("w-[5px] h-[5px] mr-[5px] rounded-[50%]",
                                                false ? 'bg-[#ffde00]' : 'bg-[#ffffff4d]'
                                            )} />
                                        )
                                    }
                                    <div className="truncate overflow-hidden">
                                        {data?.team_info?.away.name}
                                    </div>
                                </div>
                            </div>
                            <div className="flex ml-[auto] mr-2 items-center">
                                <Points data={data} sport={sport} />
                                <div className="hidden md:flex">
                                    <Stats />
                                </div>

                            </div>
                        </div>
                        <div className="flex h-[18px] leading-[18px] mt-[6px] items-center text-[11px] text-[#ccc] fill-[#ccc] font-[400]">
                            {current_period} Game {current_game}
                            <div className="ml-[2px] flex items-center  hover:text-brand-green-light hover:fill-brand-green-light">
                                {/* {'56'} */}
                                <Chevron className={cn("h-[6px] w-[12px] rotate-[270deg]")} />
                            </div>
                            <div className="flex ml-auto mr-2 md:hidden">
                                <Stats />
                            </div>

                        </div>
                    </Link>

                </div>
                <div className="flex-1 flex">
                    <TennisOdds data={data} sport={sport} subcategory={subcategory} />
                    <div className="group items-center w-[50px] justify-center cursor-pointer hidden md:flex">
                        <div className={`${currentPitchId == data.info.id ? "hidden" : "flex"} group-hover:hidden`}>
                            <PlayButton />
                        </div>
                        <div className={`${currentPitchId == data.info.id ? "flex" : "hidden"} group-hover:flex`} onClick={()=>{setCurrentPitchId(data.info.id)}}>
                            <PlayButtonHover />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TennisEvent;
