import React from "react";
import Link from "next/link";
import { defaultSubcategories } from "@/lib/sportsMapping";
import { cn } from "@/lib/utils";
import StarOutlineIcon from "@/components/ui/icons/star-outline";
import Chevron from "@/components/ui/icons/chevron";
// import VolleyballOdds from "./odds";
import TennisFieldHover from "@/components/ui/icons/tennisfield";
import EsportPoints from "./Points";
import EsportOdds from "./EsportOdds";
import PlayButton, { PlayButtonHover } from "@/components/ui/icons/playButton";
interface EsportEventProps {
    title: string;
    data: any;
    sport: string;
    subcategory?: string;
}

const EsportEvent: React.FC<EsportEventProps> = ({ title, data, sport, subcategory }) => {
    console.log('EsportEvent', { title, data, sport, subcategory })
    if (!data) {
        return null;
    }
    return (
        <div className="flex flex-col border-t-[#ffffff1a] border-t border-solid">
            <div className={cn(`flex w-full px-2 md:px-8  justify-center h-[100px]`)}>
                <div className=" flex-1 flex items-center text-xs font-bold text-white py-[10px] overflow-hidden">
                    <StarOutlineIcon className=" hover:fill-[#333] fill-transparent cursor-pointer md:flex hidden" />
                    <Link
                        href={`/in-play/${sport}/${subcategory ? subcategory : defaultSubcategories[sport as keyof typeof defaultSubcategories]}/${data?.info?.id}`}
                        className="w-[100%] flex-col"
                    >
                        <div className="flex items-left text-[11px] font-[400]">
                            <div className="flex flex-1 flex-col text-[13px] font-semibold hover:text-brand-green-light cursor-pointer overflow-hidden">
                                <div className="flex h-[25px] items-center">
                                <div className="truncate overflow-hidden">
                                        {data?.team_info?.home.name}
                                    </div>
                                </div>
                                <div className="flex h-[25px] items-center">

                                <div className="truncate overflow-hidden">
                                        {data?.team_info?.away.name}
                                    </div>
                                </div>
                            </div>
                            <div className="flex ml-[auto] mr-2">
                                <EsportPoints title={title} data={data} sport={sport} />
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    <EsportOdds title={title} data={data} sport={sport} subcategory={subcategory} />
                </div>
                <div className="group w-[50px] md:flex items-center justify-center cursor-pointer hidden">
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

export default EsportEvent;
