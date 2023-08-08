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
            <div className={cn(`grid grid-cols-11 w-full px-8  justify-center h-[80px]`)}>
                <div className=" col-span-5 flex items-center text-xs font-bold text-white gap-4 py-[10px]">
                    <StarOutlineIcon className=" hover:fill-[#333] fill-transparent cursor-pointer" />
                    <Link
                        href={`/in-play/${sport}/${subcategory ? subcategory : defaultSubcategories[sport as keyof typeof defaultSubcategories]}/${data?.info?.id}`}
                        className="w-[100%] flex-col"
                    >
                        <div className="flex items-left text-[11px] font-[400]">
                            <div className="flex flex-col items-left mr-2">
                                <div className="flex h-[25px] items-center">
                                    <div className="flex font-[500]">Q1</div>
                                    <div className="flex">10:00</div>
                                </div>
                                <div className="flex h-[25px] items-center">
                                    <div className="flex items-center fill-[#fff]  hover:text-brand-green-light hover:fill-brand-green-light">
                                        {'116'}
                                        <Chevron className={cn("h-[6px] w-[12px] rotate-[270deg]")} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col text-[13px] font-semibold hover:text-brand-green-light cursor-pointer w-[calc(100%_-_180px)]">
                                <div className="flex h-[25px] items-center">

                                    <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                                        {data?.team_info?.home.name}
                                    </div>
                                </div>
                                <div className="flex h-[25px] items-center">

                                    <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                                        {data?.team_info?.away.name}
                                    </div>
                                </div>
                            </div>
                            <div className="flex ml-[auto]">
                                <EsportPoints title={title} data={data} sport={sport} />
                            </div>
                        </div>
                    </Link>
                </div>
                <EsportOdds title={title} data={data} sport={sport} subcategory={subcategory} />
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

export default EsportEvent;
