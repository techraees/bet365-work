'use client';
import Chevron from "@/components/ui/icons/chevron";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MatchBody from "./MatchBody";



const Match = ({ gameid, league, getLeagues, leagueSelectedGames }: any) => {
    const [active, setActive] = useState('Popular');
    console.log('league clicked', decodeURIComponent(league), getLeagues, leagueSelectedGames)
    console.log('find', leagueSelectedGames.filter((item: any) => { return item.id === gameid }))

    const match = leagueSelectedGames.filter((item: any) => { return item.id === gameid })[0];

    const router = useRouter()
    const tabs = {
        soccer: ["Popular", "Bet Builder", "Asian Lines", "Goals", "Half", "Specials", "Minutes"],
    }
    return (
        <div className="text-base">
            <div className="min-h-[80px] w-full bg-[linear-gradient(rgba(12,22,20,.1),transparent_20px),radial-gradient(122%_370px_at_center_-220px,#009969_0,transparent_100%),linear-gradient(to_right_bottom,#0c1614,#084436)]">
                <button
                    onClick={() => router.back()}
                    className="w-[100%] text-[hsla(0,0%,100%,.8)] hover:text-[white] fill-[hsla(0,0%,100%,.8)] hover:fill-[white]"
                >
                    <div className="flex items-center min-h-[45px] text-[12px]  px-[30px] py-0 mt-[5px]">
                        <Chevron className="h-[5px] w-[8px] rotate-90" />
                        <div className="pl-[5px]">{`Soccer ${decodeURIComponent(league).replace(':', "")}`}</div>
                    </div>
                </button>
                <div className=" relative flex items-center justify-between text-xl text-[white] font-bold px-[30px] py-0 mx-0 my-[5px] min-h-[55px] cursor-pointer">
                    <div className='flex items-center  hover:underline'
                        onClick={() => {

                        }}
                    >
                        {`${match.localteam.name} v ${match.visitorteam.name}`}
                        <Chevron className="ml-[7px] fill-white h-[6px] w-[12px]" />
                    </div>
                </div>
                <div className="flex items-center min-h-[50px] text-[white] text-[13px]">
                    <div className="flex items-center mx-[20px] relative w-full whitespace-nowrap overflow-scroll hidescroll">
                        {tabs['soccer']?.map((tab, index) => {
                            return (
                                <div key={index}
                                    className={cn("cursor-pointer flex items-center justify-center px-[10px] z-20",
                                        active == tab ? 'text-[black] font-bold transition duration-300 ease-in-out self-center h-[26px] rounded-[13px] bg-[#00ffb6]' : 'h-[50px]')}
                                    onClick={(e) => {
                                        setActive(tab)
                                    }}
                                >{tab}</div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="w-full">
                <MatchBody data={match} active={active} />
            </div>
        </div>
    )
}

export default Match