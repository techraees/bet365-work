"use client";
import React from "react";
import { hockeyCategoriesMapping } from "@/lib/sportsMapping";
import { cn } from "@/lib/utils";
interface GameLines3WayProps {
    data: any;
}

const GameLines3Way: React.FC<GameLines3WayProps> = ({ data }) => {
    if (!data) {
        return null
    }
    let objs: any[] = [];
    let suspend: string = "01";
    
    Object.keys(data?.odds).map(item => {
        if (data.odds[item].name === hockeyCategoriesMapping["gamelines3way"]) {
            let participants = data.odds[item]?.participants
            suspend = data.odds[item]?.suspend
            let over = null;
            let exactly = null;
            let under = null;
            if (suspend === "0") {
                Object.keys(participants).map(participat => {
                    if (participants[participat]?.name === "Over") {
                        over = participants[participat].value_eu
                    } else if (participants[participat]?.name === "Exactly") {
                        exactly = participants[participat].value_eu
                    } else if (participants[participat]?.name === "Under") {
                        under = participants[participat].value_eu
                    }
                })
            }
            objs.push({
                over, exactly, under
            })
        }
    })

    console.log("------hockey-data----------", data);
    return (
        <div className=" col-span-5 flex w-full">
            <div className={cn("flex flex-1 items-center", suspend === "0" ? 'hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer' : '')}>
                <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px]" />
                <div className="text-[#ffdf1b] w-full text-center text-[13px] font-normal">
                    {objs[0]?.home}
                </div>
            </div>
            <div className={cn("flex flex-1 items-center", suspend === "0" ? 'hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer' : '')}>
                <div className="text-[#ffdf1b] w-full text-center text-[13px] font-normal">{objs[0]?.draw}</div>
            </div>
            <div className={cn("flex flex-1 items-center flex-row-reverse", suspend === "0" ? 'hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer' : '')}>
                <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px]" />
                <div className="text-[#ffdf1b] w-full text-center text-[13px] font-normal">{objs[0]?.away}</div>
            </div>
        </div>
    );
}
export default GameLines3Way;