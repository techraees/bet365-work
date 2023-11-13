'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link, { LinkProps } from "next/link";
import { defaultSubcategories, sportsDetailsMapping } from "@/lib/sportsMapping";
import Chevron from "../ui/icons/chevron";
import { cn } from '@/lib/utils';
import TennisMarketGroup from '../Sports/Tennis/Details/MarketGroup';
import Dialog from './Dialog';
import BasketballMarketGroup from '../Sports/Basketball/Details/MarketGroup';
import VolleyballMarketGroup from '../Sports/Volleyball/Details/MarketGroup';
import BaseballMarketGroup from '../Sports/Baseball/Details/MarketGroup';


import { useRouter } from 'next/navigation';
import { CheckQuarter } from '../Structure/CheckQuarter';
import SoccerMarketGroup from '../Sports/Soccer/Details/MarketGroup';

interface DetailViewProps {
    grouped: any;
    sport: string;
    subcategory?: string;
    currentdataId?: string;
}

const DetailView: React.FC<DetailViewProps> = ({ grouped, sport, subcategory, currentdataId }) => {
    const router = useRouter();
    const [active, setActive] = useState('All');
    const [dialog, setDialog] = useState(false);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const inplayName = sportsDetailsMapping[sport as keyof typeof sportsDetailsMapping]?.name
    // useEffect(() => {
    //     const background = backgroundRef.current;
    //     let newPosition = 1;
    //     let width = 35;
    //     if (active === 'All') {
    //         newPosition = 1;
    //         width = 35;
    //     }
    //     if (active === 'Bet Builder') {
    //         newPosition = 38;
    //         width = 90;
    //     }
    //     if (active === 'Asian Lines') {
    //         newPosition = 128;
    //         width = 92;
    //     }
    //     if (active === 'Corners/Cards') {
    //         newPosition = 225;
    //         width = 110;
    //     }
    //     if (active === 'Goals') {
    //         newPosition = 338;
    //         width = 50;
    //     }
    //     if (active === 'Half') {
    //         newPosition = 395;
    //         width = 42;
    //     }

    //     if (background) {
    //         background.style.transform = `translateX(${newPosition}px)`;
    //         background.style.width = `${width}px`;
    //     }
    // }, [active])

    // console.log({ grouped, sport, subcategory, currentdataId })
    const currentdata = [] as any;
    let currentGroupName = '';
    const findData = () => {
        grouped.forEach((group: any) => {
            // console.log({ group })
            group.events.forEach((ev: any) => {
                if (ev?.info?.id === currentdataId) {
                    currentdata.push(ev)
                    currentGroupName = group.name
                }
            })
            // group?.forEach((item: any) => {
            //     item.events.forEach((ev: any) => {
            //         if (ev.info.id === currentdataId) {
            //             currentdata.push(ev)
            //         }
            //     })
            // })
        })
    }
    findData();
    let data = currentdata?.[0];
    // console.log('Current', data)
    // console.log('1Esport current sport', data?.info?.sport)
    const tabs = {
        soccer: ["All", "Bet Builder", "Asian Lines", "Corners/Cards", "Goals", "Half"],
        tennis: ["All", "Bet Builder", "Set", "Games", "Player"],
        basketball: ["All", "Bet Builder", "Instant", "Team", "Quarter", "Half"],
        volleyball: [],
        baseball: ["All", "Bet Builder", "Main", "Innings", "Team"],
        lol: ["All", "Match", "Map1"],
        dota2: ["All", "Match", "Map3"]
    }
    if (data?.info?.sport === "esoccer") {
        sport = "soccer"
    } else if (data?.info?.sport === "Basketball") {
        sport = "basketball"
    } else if (data?.info?.sport === "Esports") {
        if (data?.info?.league.startsWith("LOL")) {
            sport = "lol"
        } else if (data?.info?.league.startsWith("DOTA2")) {
            sport = "dota2"
        }
    }
    return (
        <div className="flex w-full flex-col">
            <div className="w-full bg-[linear-gradient(rgba(12,22,20,0.1),transparent_20px),radial-gradient(122%_370px_at_center_-220px,#009969_0,transparent_100%),linear-gradient(to_right_bottom,#0c1614,#084436)]">
                <button
                    // href={`/in-play/${sport}/${subcategory ? subcategory : defaultSubcategories[sport as keyof typeof defaultSubcategories]}`}
                    onClick={() => router.back()}
                    className="w-[100%] text-[hsla(0,0%,100%,.8)] hover:text-[white] fill-[hsla(0,0%,100%,.8)] hover:fill-[white]"
                >
                    <div className="flex items-center min-h-[45px] text-[12px]  px-[30px] py-0 mt-[5px]">
                        <Chevron className="h-[5px] w-[8px] rotate-90" />
                        <div className="pl-[5px]">{`In-Play ${inplayName} - ${data?.info?.league}`}</div>

                    </div>
                </button>
                <div className=" relative flex items-center justify-between text-xl text-[white] font-bold px-[30px] py-0 mx-0 my-[5px] min-h-[55px] cursor-pointer">
                    <div className='flex items-center  hover:underline'
                        onClick={() => {
                            setDialog(true);
                        }}
                    >
                        {`${data?.team_info?.home?.name} v ${data?.team_info?.away?.name}`}
                        <Chevron className="ml-[7px] fill-white h-[6px] w-[12px]" />
                    </div>
                    {(sport !== "volleyball" && sport !== "baseball") &&
                        <div className="flex items-center">
                            <div className="flex items-center text-[#282828] bg-[#ddd] text-xs px-1 rounded-[1px]">
                                {sport === 'basketball' && <div className='flex items-center mr-1'>{CheckQuarter(data)}</div>}
                                {data?.info?.seconds}
                            </div>
                        </div>
                    }
                    <Dialog grouped={grouped} currentdataId={currentdataId} isOpen={dialog} currentGroupName={currentGroupName}
                        onClose={() => {
                            console.log('close')
                            setDialog(false)
                        }} />
                </div>
                <div className="flex items-center min-h-[50px] text-[white]">
                    <div className="flex items-center mx-[20px] relative w-full whitespace-nowrap overflow-scroll hidescroll">
                        {tabs[sport as keyof typeof tabs]?.map((tab, index) => {
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
                {sport === 'soccer' &&
                    <SoccerMarketGroup data={data} active={active} />
                }
                {sport === 'tennis' &&
                    <TennisMarketGroup data={data} active={active} />
                }
                {sport === 'basketball' &&
                    <BasketballMarketGroup data={data} active={active} />
                }
                {sport === 'volleyball' &&
                    <VolleyballMarketGroup data={data} active={active} />
                }
                {sport === 'baseball' &&
                    <BaseballMarketGroup data={data} active={active} />
                }
            </div>
        </div>
    );
};

export default DetailView;
