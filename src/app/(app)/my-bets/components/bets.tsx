'use client'
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import BetContent from "./BetContent";
import { useSession } from "next-auth/react";
import { getCoupons } from "@/api";

function compareTimestamps(a: any, b: any) {
    const dateA: any = new Date(a.timestamp);
    const dateB: any = new Date(b.timestamp);

    // return a negative value if dateB is earlier (for descending order)
    return dateB - dateA;
}

const Bets = () => {
    const [active, setActive] = useState('Cash Out');
    const [coupons, setCoupons] = useState<any[]>([]);
    const tabs = ["Cash Out", "Live Now", "Unsettled", "Settled", "All"]
    const { data: session } = useSession();
    const userdata = session as any;
    
    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const token = userdata?.user?.token || "";
                const response = await getCoupons(token);
                const _coupons = await response.json();
                console.log('------response------', _coupons);
                if(_coupons.message) {
                    console.log(_coupons.message);
                } else {
                    _coupons.sort(compareTimestamps);
                    console.log('-----------coupons@', _coupons);
                    setCoupons(_coupons);
                }
            } catch(e) {
                console.log('---exception while fetching coupons---', e);
            }
        }
        const interval: any = setInterval(async () => {
            await fetchCoupons()
        }, 2000);
        return () => clearInterval(interval);
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
            <BetContent active={active} coupons={coupons}/>
        </div>
    )
}


export default Bets