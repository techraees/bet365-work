'use client'
import MarketCell from "@/components/Structure/MarketCell";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import Groupnats from "./InPlaytable/groupnats";

const Heading = () => {
    return (
        <div className="flex items-center justify-between px-5 h-[55px]">
            <div className="text-[15px] leading-[20px] font-[700] text-[#00ffb6]">
                {'In-Play'}
            </div>
            <div className="text-[#ddd] text-[12px] leading-[20px]">
                {'183 Events >'}
            </div>
        </div>
    )
}

const InPlay = ({
    soccerodds,
    soccerleagues,
    tennisodds,
    tennisleagues,
    basketballodds,
    basketballleagues,
    cricketodds,
    cricketleagues
}: any) => {
    let pass= false;
    if(soccerodds || tennisodds || basketballodds || cricketodds){
        pass= true
    }
    return (
        <div className="flex flex-col text-base text-[white]">
            <Heading />
            {pass && <Groupnats 
             soccerodds={soccerodds}
             soccerleagues={soccerleagues}
             tennisodds={tennisodds}
             tennisleagues={tennisleagues}
             basketballodds={basketballodds}
             basketballleagues={basketballleagues}
             cricketodds={cricketodds}
             cricketleagues={cricketleagues}
            />}

        </div>
    )
}

export default InPlay