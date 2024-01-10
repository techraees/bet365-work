'use client'
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import BetContent from "./BetContent";
import { useSession } from "next-auth/react";
import { getCoupons } from "@/api";

const Bets = () => {
    const [active, setActive] = useState('Cash Out');
    const tabs = ["Cash Out", "Live Now", "Unsettled", "Settled", "All"]
    const { data: session } = useSession();
    const userdata = session as any;
    
    useEffect(() => {
        const fetchCoupons = async () => {
            const token = userdata?.user?.token || "";
            console.log('---------session------', userdata);
            console.log('---------token------', token);
            const response = await getCoupons(token);
            console.log(await response.json());
        }
        fetchCoupons();
    }, [])

    return (
        <div>
            <div className="flex items-center min-h-[50px] text-[white] text-[13px]">
                <div className="flex items-center mx-[20px] relative w-full whitespace-nowrap overflow-scroll hidescroll">
                    {tabs?.map((tab, index) => {
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
            <BetContent active={active}/>
        </div>
    )
}


export default Bets