
'use client';
import Chevron from "@/components/ui/icons/chevron";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Popular, AsianLines, Cards, Corners, Goals, Half, Player, Specials, Minutes } from "./markets/data";

const Markets = () => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleHeight = () => {
        setIsExpanded(!isExpanded);
    };

    const array = ['Popular', 'AsianLines', 'Cards', 'Corners', 'Goals', 'Half', 'Player', 'Specials', 'Minutes']
    return (
        <div className=" group/item fill-[#a7a7a7] hover:fill-[white] flex pb-[20px] flex-col w-full relative bg-[#383838] border-t-[#ffffff1a] border-t border-solid">
            <div className={cn(" flex cursor-pointer pl-[20px] pr-[15px] text-brand-green-light hover:text-[white] ")}
                onClick={() => {
                    toggleHeight()
                }}
            >
                <div className={'text-base h-[50px] flex items-center font-[700]'}>
                    Markets
                </div>
                <div className='ml-auto flex items-center justify-end w-[100px] h-[50px]'>
                    <div className={cn('flex items-center justify-center w-[50px] h-[50px]')}>
                        <div className={cn("items-center justify-center w-[20px] h-[20px]", isExpanded ? "hidden group-hover/item:flex" : "flex")}>
                            <Chevron className={cn("ml-[7px] h-[12px] w-[12px]")} />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={cn('h-[100%] overflow-hidden transition-[max-height] duration-300 ease', isExpanded ? 'max-h-[5000px]' : 'max-h-[0px]')}>
                <div className={cn("flex w-[100%] h-[100%] text-[white]")}>
                    <div className="group h-[100%] items-center flex w-full flex-col relative text-[#ccc]">
                        {array.map((item, index) => {
                            let data = [] as any
                            if (item === "Popular") {
                                console.log({Popular})
                                data = Popular
                            } else if (item === "AsianLines") {
                                data = AsianLines
                            } else if (item === "Cards") {
                                data = Cards
                            } else if (item === "Corners") {
                                data = Corners
                            } else if (item === "Goals") {
                                data = Goals
                            } else if (item === "Half") {
                                data = Half
                            } else if (item === "Player") {
                                data = Player
                            } else if (item === "Specials") {
                                data = Specials
                            } else if (item === "Minutes") {
                                data = Minutes
                            }

                            return (
                                <SubMarkets key={index} item={item} data={data} position={index} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Markets;


const SubMarkets = ({ item, data, position }: any) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleHeight = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className={cn(" group/item fill-[white] hover:fill-brand-green-light flex flex-col w-full relative bg-[#383838]",
            position === 0 ? "" : "border-t border-solid  border-t-[#ffffff1a] ")}>
            <div className={cn(" flex cursor-pointer pl-[20px] pr-[15px] hover:text-brand-green-light text-[white] ")}
                onClick={() => {
                    toggleHeight()
                }}
            >
                <div className={'text-sm h-[50px] flex items-center font-[700]'}>
                    {item}
                </div>
                <div className='ml-auto flex items-center justify-end w-[100px] h-[50px]'>
                    <div className={cn('flex items-center justify-center w-[50px] h-[50px]')}>
                        <div className={cn("items-center justify-center w-[20px] h-[20px]", isExpanded ? "hidden group-hover/item:flex" : "flex")}>
                            <Chevron className={cn("ml-[7px] h-[12px] w-[12px]")} />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={cn('h-[100%] overflow-hidden transition-[max-height] duration-300 ease', isExpanded ? 'max-h-[5000px]' : 'max-h-[0px]')}>
                <div className={cn("flex w-[100%] h-[100%] text-[white]")}>
                    <div className="group h-[100%] items-center px-[20px] flex w-full relative flex-wrap text-[#ccc]">
                        {data?.map((item: any, index: number) => {
                            return (
                                <div key={index} className="flex flex-1 min-w-[285px] w-[285px] max-w-[285px] h-[45px] items-center hover:text-[#00ffb6] cursor-pointer">
                                    <div className=" w-[100%] text-[13px] leading-5 font-[400] pr-4 truncate">
                                        {item}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}