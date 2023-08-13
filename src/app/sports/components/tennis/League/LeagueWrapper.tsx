import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Chevron from "@/components/ui/icons/chevron";
import { cn } from "@/lib/utils";
import LeagueBody from "./LeagueBody";

const LeagueWrapper = ({ odds, league }: any) => {
    const [active, setActive] = useState('Matches');
    const router = useRouter()
    const tabs = {
        tab: ["Matches", "Bet Boost", "Knockout"],
    }
    const particularOdd = odds.filter((odd: any)=> {
        if(odd.length>0){
           if( odd[0].league === league ){
            return true
           }
        }
        return false;
    })
    return (
        <div className="text-base">
            <div className="min-h-[80px] w-full bg-[linear-gradient(rgba(12,22,20,.1),transparent_20px),radial-gradient(122%_370px_at_center_-220px,#009969_0,transparent_100%),linear-gradient(to_right_bottom,#0c1614,#084436)]">
                <button
                    onClick={() => router.back()}
                    className="w-[100%] text-[hsla(0,0%,100%,.8)] hover:text-[white] fill-[hsla(0,0%,100%,.8)] hover:fill-[white]"
                >
                    <div className="flex items-center min-h-[45px] text-[12px]  px-[30px] py-0 mt-[5px]">
                        <Chevron className="h-[5px] w-[8px] rotate-90" />
                        <div className="pl-[5px]">{`Tennis`}</div>
                    </div>
                </button>
                <div className=" relative flex items-center justify-between text-xl text-[white] font-bold px-[30px] py-0 mx-0 my-[5px] min-h-[55px] cursor-pointer">
                    <div className='flex items-center  hover:underline'
                        onClick={() => {

                        }}
                    >
                        {decodeURIComponent(league).replace(':', "")}
                        <Chevron className="ml-[7px] fill-white h-[6px] w-[12px]" />
                    </div>
                </div>
                <div className="flex items-center min-h-[50px] text-[white] text-[13px]">
                    <div className="flex items-center mx-[20px] relative w-full whitespace-nowrap overflow-scroll hidescroll">
                        {tabs['tab']?.map((tab, index) => {
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
            <LeagueBody leagueSelectedGames={particularOdd[0]} active={active}/>
        </div>
    )
}
export default LeagueWrapper;

