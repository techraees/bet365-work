import React from "react";
import { categoriesMapping } from "@/lib/sportsMapping";
import SoccerField from "./Field";
import { cn } from "@/lib/utils";
interface MatchGoalsProps {
    data: any;
}

const MatchGoals: React.FC<MatchGoalsProps> = ({ data }) => {
    if(!data){
        return null
    }
    let objs: any[] = []
    let suspend: string = "01";
    Object.keys(data?.odds).map(item => {
        if (data.odds[item].name === categoriesMapping["matchGoals"]) {
            let participants = data.odds[item]?.participants
            suspend = data.odds[item]?.suspend
            let over = [] as any;
            let overhandicap = [] as any;
            let under = [] as any;
            let underhandicap = [] as any;
            if(suspend === "0"){
                Object.keys(participants).map(participat => {
                    if (participants[participat]?.name === "Over") {
                        over.push(participants[participat].value_eu)
                        overhandicap.push(participants[participat].handicap)
                    } else if (participants[participat]?.name === "Under") {
                        under.push(participants[participat].value_eu)
                        underhandicap.push(participants[participat].handicap)
                    }
                })
            }
            
            objs.push({ over, under, overhandicap, underhandicap })
        }
    })
    return (
        <>
            <div className="col-span-3 flex">
                <div className={cn("flex flex-1 items-center", suspend === "0" ? "hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer" : "")}>
                    <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px]" />
                    <div className="text-[white] w-full text-right text-[13px] font-normal pr-[3px]">
                        {objs[0]?.overhandicap[objs[0].overhandicap.length - 1]}
                    </div>
                    <div className="text-[#ffdf1b] w-full text-left text-[13px] font-normal pl-[3px]">
                        {objs[0]?.over[objs[0].over.length - 1]}
                    </div>
                </div>
                <div className={cn("flex flex-1 items-center flex-row-reverse", suspend === "0" ? "hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer" : "")}>
                    <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px]" />
                    <div className="text-[#ffdf1b] w-full text-left text-[13px] font-normal pl-[3px]">
                        {objs[0]?.under[objs[0].under.length - 1]}
                    </div>
                    <div className="text-[white] w-full text-right text-[13px] font-normal pr-[3px]">
                        {objs[0]?.underhandicap[objs[0].underhandicap.length - 1]}
                    </div>
                </div>
            </div>
            <SoccerField />
        </>

    );
}


export default MatchGoals;