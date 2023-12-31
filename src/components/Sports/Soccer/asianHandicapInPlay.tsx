import React from "react";
import { categoriesMapping } from "@/lib/sportsMapping";
import { cn } from "@/lib/utils";
interface AsianHandicapInPlayProps {
    data: any;
}

const AsianHandicapInPlay: React.FC<AsianHandicapInPlayProps> = ({ data }) => {
    if (!data) {
        return null
    }
    let objs: any[] = []
    let suspend: string = "01";
    Object.keys(data?.odds).map(item => {
        if (data.odds[item].name === categoriesMapping["asianHandicapInPlay"]) {
            let participants = data.odds[item]?.participants
            suspend = data.odds[item]?.suspend
            let home = [] as any;
            let homehandicap = [] as any;
            let away = [] as any;
            let awayhandicap = [] as any;
            if (suspend === "0") {
                Object.keys(participants).map(participat => {
                    if (participants[participat]?.name === "Home") {
                        home.push(participants[participat].value_eu)
                        homehandicap.push(participants[participat].handicap)
                    } else if (participants[participat]?.name === "Away") {
                        away.push(participants[participat].value_eu)
                        awayhandicap.push(participants[participat].handicap)
                    }
                })
            }
            objs.push({ home, away, homehandicap, awayhandicap })
        }
    })
    return (
        <div className=" col-span-5 flex w-full">
            <div className={cn("flex flex-1 items-center", suspend === "0" ? "hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer" : "")}>
                <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px]" />
                <div className="text-[white] w-full text-right text-[13px] font-normal pr-[3px]">
                    {objs[0]?.homehandicap[objs[0].homehandicap.length - 1]}
                </div>
                <div className="text-[#ffdf1b] w-full text-left text-[13px] font-normal pl-[3px]">
                    {objs[0]?.home[objs[0].home.length - 1]}
                </div>
            </div>
            <div className={cn("flex flex-1 items-center flex-row-reverse", suspend === "0" ? "hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer" : "")}>
                <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px]" />
                <div className="text-[#ffdf1b] w-full text-left text-[13px] font-normal pl-[3px]">
                    {objs[0]?.away[objs[0].away.length - 1]}
                </div>
                <div className="text-[white] w-full text-right text-[13px] font-normal pr-[3px]">
                    {objs[0]?.awayhandicap[objs[0].awayhandicap.length - 1]}
                </div>
            </div>
        </div>
    );
}


export default AsianHandicapInPlay;