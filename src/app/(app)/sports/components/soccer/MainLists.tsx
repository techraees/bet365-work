
'use client';
import Chevron from "@/components/ui/icons/chevron";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const MainLists = ({ leaguebycountry }: any) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleHeight = () => {
        setIsExpanded(!isExpanded);
    };


    const lists = ["Elite Euro List", "UK List", "International List", "Club Friendly List"]
    return (
        <div className=" group/item fill-[#a7a7a7] hover:fill-[white] flex pb-[20px] flex-col w-full relative bg-[#383838]">
            <div className={cn(" flex cursor-pointer pl-[20px] pr-[15px] text-brand-green-light hover:text-[white] ")}
                onClick={() => {
                    toggleHeight()
                }}
            >
                 <div className={'text-base h-[50px] flex items-center font-[700]'}>
                    Main Lists
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
                className={cn('h-[100%] overflow-hidden transition-[max-height] duration-300 ease', isExpanded ? 'max-h-[1500px]' : 'max-h-[0px]')}>
                <div className={cn("flex w-[100%] h-[100%] text-[white]")}>
                    <div className="group h-[100%] items-center px-[20px] flex w-full relative flex-wrap text-[#ccc]">
                        {lists.map((item, index) => {
                            return (
                                <div key={index} className="flex flex-1 min-w-[250px] h-[45px] items-center hover:text-[#00ffb6] cursor-pointer text-[13px]">
                                    {item}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MainLists;