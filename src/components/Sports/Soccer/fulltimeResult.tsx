"use client";
import React from "react";
import { categoriesMapping } from "@/lib/sportsMapping";
import { cn } from "@/lib/utils";
interface FulltimeResultProps {
    data: any;
}

const FulltimeResult: React.FC<FulltimeResultProps> = ({ data }) => {
    if (!data) {
        return null
    }
    let objs: any[] = [];
    let suspend: string = "01";
    Object.keys(data?.odds).map(item => {
        if (data.odds[item].name === categoriesMapping["fulltimeResult"]) {
            let participants = data.odds[item]?.participants
            suspend = data.odds[item]?.suspend
            let home = null;
            let away = null;
            let draw = null;
            if (suspend === "0") {
                Object.keys(participants).map(participat => {
                    if (participants[participat]?.name === "Home") {
                        home = participants[participat].value_eu
                    } else if (participants[participat]?.name === "Away") {
                        away = participants[participat].value_eu
                    } else if (participants[participat]?.name === "Draw") {
                        draw = participants[participat].value_eu
                    }
                })
            }
            objs.push({
                home, away, draw
            })
        }
    })
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
export default FulltimeResult;