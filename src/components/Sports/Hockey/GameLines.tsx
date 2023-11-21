"use client";
import React from "react";
import { hockeyCategoriesMapping } from "@/lib/sportsMapping";
import { cn } from "@/lib/utils";
interface GameLinesProps {
    data: any;
}

const GameLines: React.FC<GameLinesProps> = ({ data }) => {
    if (!data) {
        return null
    }
    let objs: any[] = [];
    let handicaps: any[] = [];
    let total: any[] = [];
    let suspend: string = "01";
    // 3. Home/Away[value_eu]   1. Asian handicap [handicap, value_eu]
    Object.keys(data?.odds).map(item => {
        if (data.odds[item].name === "Home/Away") {
            let participants = data.odds[item]?.participants
            suspend = data.odds[item]?.suspend
            let home = null;
            let away = null;
            if (suspend === "0") {
                Object.keys(participants).map(participat => {
                    if (participants[participat]?.name === "Home") {
                        home = participants[participat].value_eu
                    } else if (participants[participat]?.name === "Away") {
                        away = participants[participat].value_eu
                    }
                })
            }
            objs.push({
                home, away
            })
        }
        else if(data.odds[item].name == "Asian Handicap") {
            let participants = data.odds[item]?.participants;
            suspend =  data.odds[item]?.suspend;
            let homeValue = null, homeHandicap = null, awayValue = null, awayHandicap = null;
            if (suspend === "0") {
                Object.values(participants).map((participant: any) => {
                    if (participant?.name === "Home") {
                        homeValue = Number(participant?.value_eu);
                        homeHandicap = Number(participant?.handicap);
                    } else if(participant?.name === "Away") {
                        awayValue = Number(participant?.value_eu);
                        awayHandicap = Number(participant?.handicap);
                    }
                });
            }
            handicaps.push({ homeValue, homeHandicap, awayValue, awayHandicap});
        }
        else if(data.odds[item].name == "Over/Under (Including OT)") {
            let participants = data.odds[item]?.participants;
            suspend =  data.odds[item]?.suspend;
            let overValue = null, overHandicap = null, underValue = null, underHandicap = null;
            if (suspend === "0") {
                Object.values(participants).map((participant: any) => {
                    if (participant?.name === "Over") {
                        overValue = Number(participant?.value_eu);
                        overHandicap = Number(participant?.handicap);
                    } else if(participant?.name === "Under") {
                        underValue = Number(participant?.value_eu);
                        underHandicap = Number(participant?.handicap);
                    }
                });
            }
            total.push({ overValue, overHandicap, underValue, underHandicap});
        }
    })
    return (
        <div className=" col-span-5 flex w-full">
            <div className={cn("flex flex-1 items-center")}>
                <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-full my-4" />
                <div className="flex-1 h-full flex flex-col justify-between">
                    <div className={cn("w-full flex items-center justify-center h-1/2", suspend === "0" ? 'hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer' : '')}>
                        <div className="text-center text-[13px] font-normal">
                            <span className="text-white">{handicaps[0]?.homeHandicap > 0 && '+'}{handicaps[0]?.homeHandicap}</span>{' '}
                            <span className="text-[#ffdf1b]">{handicaps[0]?.homeValue}</span>
                        </div>
                    </div>
                    <div className={cn("w-full h-1/2 flex items-center justify-center", suspend === "0" ? 'hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer' : '')}>
                        <div className="text-center text-[13px] font-normal">
                            <span className="text-white">{handicaps[0]?.awayHandicap > 0 && '+'}{handicaps[0]?.awayHandicap}</span>{' '}
                            <span className="text-[#ffdf1b]">{handicaps[0]?.awayValue}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cn("flex flex-1 items-center")}>
                <div className="flex-1 h-full flex flex-col justify-between">
                    <div className={cn("w-full flex items-center justify-center h-1/2", suspend === "0" ? 'hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer' : '')}>
                        <div className="text-center text-[13px] font-normal">
                            <span className="text-white">O {total[0]?.overHandicap}</span>{' '}
                            <span className="text-[#ffdf1b]">{total[0]?.overValue}</span>
                        </div>
                    </div>
                    <div className={cn("w-full flex items-center justify-center h-1/2", suspend === "0" ? 'hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer' : '')}>
                        <div className="text-center text-[13px] font-normal">
                            <span className="text-white">U {total[0]?.underHandicap}</span>{' '}
                            <span className="text-[#ffdf1b]">{total[0]?.underValue}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cn("flex flex-1 items-center flex-row-reverse")}>
                <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-full" />
                <div className="flex-1 h-full flex flex-col justify-between">
                    <div className={cn("h-1/2 w-full flex items-center justify-center", suspend === "0" ? 'hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer' : '')}>
                        <div className="text-center text-[13px] font-normal text-[#ffdf1b]">
                            {objs[0]?.home}
                        </div>
                    </div>
                    <div className={cn("h-1/2 w-full flex items-center justify-center", suspend === "0" ? 'hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer' : '')}>
                        <div className="text-center text-[13px] font-normal text-[#ffdf1b]">
                            {objs[0]?.away}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default GameLines;