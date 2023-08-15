import React from "react";
import { categoriesMapping } from "@/lib/sportsMapping";
interface WinnerProps {
    data: any;
}

const Winner: React.FC<WinnerProps> = ({ data }) => {
    let objs: any[] = []
    if(!data){
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
            objs.push({ home, away})
        }
    })
    return (
        <>
            <div className="flex-1 flex">
                <div className="flex flex-1 items-center hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer">
                    <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px]" />
                    
                    <div className="text-[#ffdf1b] w-full text-center text-[13px] font-normal pl-[3px]">
                        {objs[0]?.home[objs[0].home.length - 1]}
                    </div>
                </div>
                <div className="flex flex-1 items-center hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer flex-row-reverse">
                    <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px]" />
                    <div className="text-[#ffdf1b] w-full text-center text-[13px] font-normal pr-[3px]">
                        {objs[0]?.away[objs[0].away.length - 1]}
                    </div>
                </div>
            </div>
        </>
    );
}


export default Winner;