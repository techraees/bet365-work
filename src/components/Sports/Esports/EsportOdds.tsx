import React from "react";
import { categoriesMapping } from "@/lib/sportsMapping";
import MarketCell from "../../Structure/MarketCell";
import GameLines from "../Basketball/GameLines";
interface EsportOddsProps {
    title: string;
    data: any;
    sport: any;
    subcategory?: string;
}

const EsportOdds: React.FC<EsportOddsProps> = ({ title, data, sport, subcategory }) => {
    console.log('EsportOdds', { title, data, sport, subcategory })
    if (title === "LOL") {
        let home = null;
        let away = null;
        let suspend = "0"
        Object.keys(data?.odds).map(item => {
            if (data.odds[item].name === "Home/Away") {
                let participants = data.odds[item]?.participants
                suspend = data.odds[item]?.suspend
                if (suspend === "0") {
                    Object.keys(participants).map(participat => {
                        if (participants[participat]?.name === "Home") {
                            home = participants[participat].value_eu
                        } else if (participants[participat]?.name === "Away") {
                            away = participants[participat].value_eu
                        }
                    })
                }
            }
        })
        return (
            <div className=" col-span-5 flex w-full">
                <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px] mt-[15px]" />
                <div className="flex w-full">
                    <div className="flex flex-col w-full">
                        <div className="flex w-full justify-center  px-[10px] items-center text-[#ccc] text-[11px] font-[400]">
                            <div className="flex h-[25px] items-center justify-center w-full border-b-[1px] border-solid border-b-[#ffffff1a]">Match Winner</div>
                        </div>
                        <div className="flex h-full">
                            <div className="flex flex-1 items-center hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer">
                                <div className="flex w-full justify-center font-[400]">
                                    <MarketCell name={''}
                                        value={home}
                                        active={''}
                                        suspend={suspend}
                                        disablehover={true} />
                                </div>
                            </div>
                            <div className="flex flex-1 items-center hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer flex-row-reverse">
                                <div className="flex w-full justify-center font-[400]">
                                    <MarketCell name={''}
                                        value={away}
                                        active={''}
                                        suspend={suspend} disablehover={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px] mt-[15px]" />
            </div>
        );
    }
    if (title === "Esoccer") {
        let home = null;
        let away = null;
        let draw = null;
        let suspend: string = "01";
        Object.keys(data?.odds).map(item => {
            if (data.odds[item].name === categoriesMapping["fulltimeResult"]) {
                let participants = data.odds[item]?.participants
                suspend = data.odds[item]?.suspend

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
            }
        })
        return (
            <div className=" col-span-5 flex w-full">
                <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px] mt-[15px]" />
                <div className="flex w-full">
                    <div className="flex flex-col w-full">
                        <div className="flex w-full justify-center  px-[10px] items-center text-[#ccc] text-[11px] font-[400]">
                            <div className="flex h-[25px] items-center justify-center w-full border-b-[1px] border-solid border-b-[#ffffff1a]">Full Time Result</div>
                        </div>
                        <div className="flex h-full">
                            <div className="flex flex-1 items-center hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer">
                                <div className="flex w-full justify-center font-[400]">
                                    <MarketCell name={''}
                                        value={home}
                                        active={''}
                                        suspend={suspend}
                                        disablehover={true} />
                                </div>
                            </div>
                            <div className="flex flex-1 items-center hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer flex-row-reverse">
                                <div className="flex w-full justify-center font-[400]">
                                    <MarketCell name={''}
                                        value={draw}
                                        active={''}
                                        suspend={suspend} disablehover={true} />
                                </div>
                            </div>
                            <div className="flex flex-1 items-center hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer flex-row-reverse">
                                <div className="flex w-full justify-center font-[400]">
                                    <MarketCell name={''}
                                        value={away}
                                        active={''}
                                        suspend={suspend} disablehover={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px] mt-[15px]" />
            </div>
        );
    }
    if (title === "Ebasketball") {
        return <GameLines data={data} />
    }

    return (
        <div className=" col-span-5 flex w-full">
            <div className="flex w-full">
                <div className="flex flex-1 items-center hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer">
                    <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[75px]" />
                    <div className="flex w-full justify-center font-[400]">
                        <MarketCell name={''}
                            value={'1.0'}
                            active={''}
                            suspend={"0"}
                            disablehover={true} />
                    </div>
                </div>
                <div className="flex flex-1 items-center hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer flex-row-reverse">
                    <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[75px]" />
                    <div className="flex w-full justify-center font-[400]">
                        <MarketCell name={''}
                            value={'2.0'}
                            active={''}
                            suspend={"0"} disablehover={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EsportOdds;