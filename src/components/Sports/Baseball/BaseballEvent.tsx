import React from "react";
import Link from "next/link";
import { defaultSubcategories } from "@/lib/sportsMapping";
import { cn } from "@/lib/utils";
import StarOutlineIcon from "@/components/ui/icons/star-outline";
import Chevron from "@/components/ui/icons/chevron";
import BasketballJersey from "./Jersey";
import BaseballPoints from "./Points";
import BaseballOdds from "./odds";
import TennisFieldHover from "@/components/ui/icons/tennisfield";
import BaseballFieldHover from "@/components/ui/icons/baseballfield";
interface BaseballEventProps {
    data: any;
    sport: string;
    subcategory?: string;
}

const BaseballEvent: React.FC<BaseballEventProps> = ({ data, sport, subcategory }) => {
    console.log({ data, sport })
    if (!data) {
        return null;
    }
    return (
        <div className="flex flex-col border-t-[#ffffff1a] border-t border-solid">
            <div className={cn(`flex w-full px-2 md:px-8  justify-center h-[123px] md:h-[100px]`)}>
                <div className=" flex-1 flex items-center text-xs font-bold text-white gap-4 py-[10px] overflow-hidden">
                    <StarOutlineIcon className=" hover:fill-[#333] fill-transparent cursor-pointer md:flex hidden" />
                    <Link
                        href={`/in-play/${sport}/${subcategory ? subcategory : defaultSubcategories[sport as keyof typeof defaultSubcategories]}/${data?.info?.id}`}
                        className="w-[100%] h-full flex-col"
                    >
                        <div className="flex items-left text-[11px] font-[400]">
                            <div className="flex flex-col text-[13px] font-semibold hover:text-brand-green-light cursor-pointer overflow-hidden">
                                <div className="flex h-[25px] items-center overflow-hidden">
                                    <div className="min-w-[15px] min-h-[15px] h-[15px] w-[15px] mr-[10px]">
                                        <BasketballJersey />
                                    </div>

                                    <div className="truncate overflow-hidden">
                                        {data?.team_info?.home.name}
                                    </div>
                                </div>
                                <div className="flex h-[25px] items-center overflow-hidden">
                                    <div className="min-w-[15px] min-h-[15px] h-[15px] w-[15px] mr-[10px] ">
                                        <BasketballJersey />
                                    </div>

                                    <div className="truncate overflow-hidden">
                                        {data?.team_info?.away.name}
                                    </div>
                                </div>
                            </div>
                            <div className="flex ml-[auto]">
                                <BaseballPoints data={data} sport={sport} />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row h-[30px] md:h-[18px] md:leading-[18px] mt-[6px] items-center justify-between text-[11px] text-[#ccc] fill-[#ccc] font-[600] overflow-hidden">
                            <div className="flex">
                                {'Bottom of 1st'}
                                <div className="ml-[2px] flex items-center  hover:text-brand-green-light hover:fill-brand-green-light font-[400]">
                                    {'56'}
                                    <Chevron className={cn("h-[6px] w-[12px] rotate-[270deg]")} />
                                </div>
                            </div>
                            <div className="flex mr-[8px]  ">
                                <div className="flex items-center font-[400]">
                                    <div className="flex mx-[5px]">
                                        <div className="flex h-[5px] w-[5px]  bg-[#189970]  transform rotate-45" />
                                        <div className="flex h-[5px] w-[5px] mt-[-4px] bg-[#189970]  transform rotate-45" />
                                        <div className="flex h-[5px] w-[5px]  bg-[#6b6b6b] transform rotate-45" />
                                    </div>
                                </div>
                                <div className="ml-[2px] flex items-center font-[400]">
                                    <div className="flex">{'B'}</div>
                                    <div className="flex mx-[5px]">
                                        <div className="flex h-[7px] w-[7px] rounded-[50%] bg-[#189970] mx-[1px]" />
                                        <div className="flex h-[7px] w-[7px] rounded-[50%] bg-[#189970] mx-[1px]" />
                                        <div className="flex h-[7px] w-[7px] rounded-[50%] bg-[#6b6b6b] mx-[1px]" />
                                    </div>
                                </div>
                                <div className=" flex items-center font-[400]">
                                    <div className="flex">{'S'}</div>
                                    <div className="flex mx-[5px]">
                                        <div className="flex h-[7px] w-[7px] rounded-[50%] bg-[#189970] mx-[1px]" />
                                        <div className="flex h-[7px] w-[7px] rounded-[50%] bg-[#189970] mx-[1px]" />
                                        <div className="flex h-[7px] w-[7px] rounded-[50%] bg-[#6b6b6b] mx-[1px]" />
                                    </div>
                                </div>
                                <div className=" flex items-center font-[400]">
                                    <div className="flex">{'O'}</div>
                                    <div className="flex mx-[5px]">
                                        <div className="flex h-[7px] w-[7px] rounded-[50%] bg-[#189970] mx-[1px]" />
                                        <div className="flex h-[7px] w-[7px] rounded-[50%] bg-[#189970] mx-[1px]" />
                                        <div className="flex h-[7px] w-[7px] rounded-[50%] bg-[#6b6b6b] mx-[1px]" />
                                    </div></div>
                            </div>


                        </div>
                    </Link>
                </div>
                <div className="flex-1 flex">
                    <BaseballOdds data={data} sport={sport} subcategory={subcategory} />
                </div>
                <div className="group w-[50px] md:flex col-span-1 items-center justify-center cursor-pointer hidden">
                    <div className="flex">
                        <BaseballFieldHover />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaseballEvent;

