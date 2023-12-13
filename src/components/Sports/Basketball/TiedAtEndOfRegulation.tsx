import React from "react";
import { categoriesMapping } from "@/lib/sportsMapping";
import { MarketCellSplit } from "@/components/Structure/MarketCell";
interface TiedAtEndOfRegulationProps {
    data: any;
}

const TiedAtEndOfRegulation: React.FC<TiedAtEndOfRegulationProps> = ({ data }) => {
    let objs: any[] = []
    if (!data) {
        return null
    }
    Object.keys(data?.odds).map(item => {
        if (data.odds[item].name === "Game Winner") {
            let participants = data.odds[item]?.participants
            let home = [] as any;
            let away = [] as any;
            Object.keys(participants).map(participat => {
                if (participants[participat]?.name === "Home") {
                    home.push(participants[participat].value_eu)
                } else if (participants[participat]?.name === "Away") {
                    away.push(participants[participat].value_eu)
                }
            })
            objs.push({ home, away })
        }
    })
    return (
        <div className=" flex-1 flex w-full">
            <div className="flex w-full">
                <div className="flex flex-1 items-center hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer">
                    <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px]" />
                    <div className="flex-1 h-full justify-center items-center">
                        <MarketCellSplit smallpadding name={''} value={'1'} suspend={'0'} active={'basketball'} />
                    </div>
                </div>
                <div className="flex flex-1 items-center hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer flex-row-reverse">
                    <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px]" />
                    <div className="flex-1 h-full justify-center items-center">
                        <MarketCellSplit smallpadding name={''} value={'2'} suspend={'0'} active={'basketball'} />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default TiedAtEndOfRegulation;