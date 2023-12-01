'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import MarketGroupBody from '../../../../Structure/MarketGroupBody';
import { categoriesMapping } from '@/lib/sportsMapping';
import Chevron from '@/components/ui/icons/chevron';
import StarBorderline, { StarFilled } from '@/components/ui/icons/star-borderline';
import { lolAll } from './datastructure';
import {
    gameLines,
    map1Winner, map1KillHandicap, map1Totals, map1TotalKills, 
    map2Winner, map2KillHandicap, map2Totals, map2TotalKills,
    map3KillHandicap, map3Totals, map3TotalKills,
    correctMapScore, toWinAtLeastOneMap,
} from '../mappings/mapping';

interface MarketGroupProps {
    data: any;
    active: string;
}


const LolMarketGroup: React.FC<MarketGroupProps> = ({ data, active }) => {

    if (!data) {
        return null
    }
    console.log(">>>>>>>>>", data);
    let oddData = {} as any;
    oddData = lolAll as any;
    if (active === "All") {
        //game lines
        let gameLinesData: any = gameLines(data);
        lolAll.gameLines.rows = gameLinesData?.rows;
        lolAll.gameLines.header = gameLinesData?.header;
        //map 1 winner
        lolAll.map1Winner.rows = map1Winner(data);
        //map 1 kill handicap
        let map1KillHandicapData: any = map1KillHandicap(data);
        lolAll.map1KillHandicap.rows = map1KillHandicapData?.rows;
        lolAll.map1KillHandicap.header = map1KillHandicapData?.header;
        //map 1 totals
        let map1TotalsData: any = map1Totals(data);
        lolAll.map1Totals.rows = map1TotalsData?.rows;
        lolAll.map1Totals.header = map1TotalsData?.header;
        //map1 Total Kills
        lolAll.map1TotalKills.rows = map1TotalKills(data);
        //map 2 winner
        lolAll.map2Winner.rows = map2Winner(data);
        //map 2 kill handicap
        let map2KillHandicapData: any = map2KillHandicap(data);
        lolAll.map2KillHandicap.rows = map2KillHandicapData?.rows;
        lolAll.map2KillHandicap.header = map2KillHandicapData?.header;
        //map 2 totals
        let map2TotalsData: any = map2Totals(data);
        lolAll.map2Totals.rows = map2TotalsData?.rows;
        lolAll.map2Totals.header = map2TotalsData?.header;
        //map2 Total Kills
        lolAll.map2TotalKills.rows = map2TotalKills(data);

        //map3KillHandicap
        lolAll.map3KillHandicap.rows = map3KillHandicap(data);
        //map 3 totals
        let map3TotalsData: any = map3Totals(data);
        lolAll.map3Totals.rows = map3TotalsData?.rows;
        lolAll.map3Totals.header = map3TotalsData?.header;
                //map3 Total Kills
                lolAll.map3TotalKills.rows = map3TotalKills(data);

        //correctMapScore
        let correctMapScoreData: any = correctMapScore(data);
        lolAll.correctMapScore.rows = correctMapScoreData?.rows;
        lolAll.correctMapScore.header = correctMapScoreData?.header;
        //matchEitherTeamsToScore
        let toWinAtLeastOneMapData: any = toWinAtLeastOneMap(data);
        lolAll.toWinAtLeastOneMap.rows = toWinAtLeastOneMapData?.rows;
        lolAll.toWinAtLeastOneMap.header = toWinAtLeastOneMapData?.header;


        oddData = lolAll as any;

    }


    return (
        <div className='w-[100%] bg-[#383838]'>
            {Object.keys(oddData).map((key, index) => {
                if ((oddData[key]?.rows?.length > 0) || (oddData[key]?.subtabs?.length > 0)) {
                    if (oddData[key]?.subtabs?.length > 0) {
                        let skip = true
                        oddData[key]?.subtabs.map((subtab: any) => {
                            // console.log('subtab',subtab ,oddData[key][subtab])
                            if (oddData[key][subtab] && oddData[key][subtab].length > 0) {
                                skip = false
                            }
                        })
                        if (skip === true) {
                            return null
                        }
                    }
                    return (
                        <GroupwithHead key={index} keytag={key} data={data} active={active} odd={oddData[key]} />
                    )
                }
            })}
        </div>
    )



};

export default LolMarketGroup

interface GroupwithHeadProps {
    keytag: string;
    data: any;
    active: string;
    odd: any;
}

const GroupwithHead: React.FC<GroupwithHeadProps> = ({ keytag, data, active, odd }) => {

    const [isExpanded, setIsExpanded] = useState(true);

    const toggleHeight = () => {
        setIsExpanded(!isExpanded);
    };


    return (
        <div className={'group/item fill-[white] hover:fill-brand-green-light'}>
            <div className={cn(" flex cursor-pointer pl-[30px] pr-[15px] border-t border-solid border-t-[rgba(24,153,112,.75)]",
                odd?.suspend !== "0" ? "text-[hsla(0,0%,100%,.3)] hover:text-[hsla(0,0%,100%,.6)] fill-[hsla(0,0%,100%,.3)] hover:fill-[hsla(0,0%,100%,.6)]" : "text-[white] hover:text-brand-green-light ")}
                onClick={() => {
                    toggleHeight()
                }}
            >
                <div className={'text-base h-[50px] flex items-center font-[700]'}>
                    {odd.marketname}
                </div>
                {odd?.suspend !== "0" &&
                    <div className={'hidden ml-[10px] text-[12px] h-[50px] items-center font-[400] text-[hsla(0,0%,100%,.6)] group-hover/item:flex'}>
                        Currently Suspended
                    </div>
                }
                <div className='ml-auto flex items-center justify-end w-[100px] h-[50px]'>
                    <div className={cn('group hidden items-center justify-center w-[50px] h-[50px] group-hover/item:flex')}>
                        <div className='hidden items-center justify-center w-[20px] h-[20px] group-hover:flex'>
                            <StarFilled className={cn("ml-[7px] h-[13px] w-[13px]")} />
                        </div>
                        <div className='flex items-center justify-center w-[20px] h-[20px] group-hover:hidden'>
                            <StarBorderline className={cn("ml-[7px] h-[13px] w-[13px]")} />
                        </div>
                    </div>

                    <div className={cn('flex items-center justify-center w-[50px] h-[50px]')}>
                        <div className={cn("items-center justify-center w-[20px] h-[20px]", isExpanded ? "hidden group-hover/item:flex" : "flex")}>
                            <Chevron className={cn("ml-[7px] h-[12px] w-[12px]")} />
                        </div>
                    </div>
                </div>
            </div>

            {odd?.currentCorners &&
                <div className="flex w-[100%] h-[100%] border-t-[#ffffff1a] border-t border-solid text-[hsla(0,0%,100%,.6)]">
                    <div className='h-[25px] flex items-center pl-[30px]'>Current Corners: {odd?.currentCorners}</div>
                </div>}
            <div
                className={cn('h-[100%] overflow-hidden transition-[max-height] duration-300 ease', isExpanded ? 'max-h-[1500px]' : 'max-h-[0px]')}>
                <div className={cn("flex w-[100%] h-[100%] text-[white]")}>
                    <MarketGroupBody data={data} keytag={keytag} active={active} odd={odd} />
                </div>
            </div>
        </div>

    )
};
