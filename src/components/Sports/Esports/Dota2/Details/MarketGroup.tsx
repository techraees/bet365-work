'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import MarketGroupBody from '../../../../Structure/MarketGroupBody';
import { categoriesMapping } from '@/lib/sportsMapping';
import Chevron from '@/components/ui/icons/chevron';
import StarBorderline, { StarFilled } from '@/components/ui/icons/star-borderline';
import { dota2All, dota2Match, Dota2Map2 } from './datastructure';
import {
    gameLines, map1Winner, map1KillHandicap, map1Totals, map1TotalKills,
    map2Winner, map2KillHandicap, map2Totals, map2TotalKills,
    map3Winner, map3KillHandicap, map3Totals, map3TotalKills,
    correctMapScore, matchEitherTeamsToScore,
} from '../mappings/mapping';

interface MarketGroupProps {
    data: any;
    active: string;
}


const Dota2MarketGroup: React.FC<MarketGroupProps> = ({ data, active }) => {

    if (!data) {
        return null
    }
    console.log(">>>>>>>>>", data);
    ["All", "Same Game Parlay", "Score"]
    let oddData = {} as any;
    oddData = dota2All as any;
    if (active === "All") {
        //game lines
        let gameLinesData: any = gameLines(data);
        dota2All.gameLines.rows = gameLinesData?.rows;
        dota2All.gameLines.header = gameLinesData?.header;
        //map 1 winner
        dota2All.map1Winner.rows = map1Winner(data);
        //map 1 kill handicap
        let map1KillHandicapData: any = map1KillHandicap(data);
        dota2All.map1KillHandicap.rows = map1KillHandicapData?.rows;
        dota2All.map1KillHandicap.header = map1KillHandicapData?.header;
        //map 1 totals
        let map1TotalsData: any = map1Totals(data);
        dota2All.map1Totals.rows = map1TotalsData?.rows;
        dota2All.map1Totals.header = map1TotalsData?.header;
        //map1 Total Kills
        dota2All.map1TotalKills.rows = map1TotalKills(data);
 
        //map 2 winner
        dota2All.map2Winner.rows = map2Winner(data);
        //map 2 kill handicap
        let map2KillHandicapData: any = map2KillHandicap(data);
        dota2All.map2KillHandicap.rows = map2KillHandicapData?.rows;
        dota2All.map2KillHandicap.header = map2KillHandicapData?.header;
        //map 2 totals
        let map2TotalsData: any = map2Totals(data);
        dota2All.map2Totals.rows = map2TotalsData?.rows;
        dota2All.map2Totals.header = map2TotalsData?.header;
        //map2 Total Kills
        dota2All.map2TotalKills.rows = map2TotalKills(data);

        //map 3 winner
        dota2All.map3Winner.rows = map3Winner(data);
        //map 3 kill handicap
        let map3KillHandicapData: any = map3KillHandicap(data);
        dota2All.map3KillHandicap.rows = map3KillHandicapData?.rows;
        dota2All.map3KillHandicap.header = map3KillHandicapData?.header;
        //map 3 totals
        let map3TotalsData: any = map3Totals(data);
        dota2All.map3Totals.rows = map3TotalsData?.rows;
        dota2All.map3Totals.header = map3TotalsData?.header;
        //map3 Total Kills
        dota2All.map3TotalKills.rows = map3TotalKills(data);
        
        //correctMapScore
        let correctMapScoreData: any = correctMapScore(data);
        dota2All.correctMapScore.rows = correctMapScoreData?.rows;
        dota2All.correctMapScore.header = correctMapScoreData?.header;
        //matchEitherTeamsToScore
        let matchEitherTeamsToScoreData: any = matchEitherTeamsToScore(data);
        dota2All.matchEitherTeamsToScore.rows = matchEitherTeamsToScoreData?.rows;
        dota2All.matchEitherTeamsToScore.header = matchEitherTeamsToScoreData?.header;


        oddData = dota2All as any;

    } else if (active === "Match") {
        let gameLinesData: any = gameLines(data);
        dota2Match.gameLines.rows = gameLinesData?.rows;
        dota2Match.gameLines.header = gameLinesData?.header;
        //correctMapScore
        let correctMapScoreData: any = correctMapScore(data);
        dota2Match.correctMapScore.rows = correctMapScoreData?.rows;
        dota2Match.correctMapScore.header = correctMapScoreData?.header;
        //matchEitherTeamsToScore
        let matchEitherTeamsToScoreData: any = matchEitherTeamsToScore(data);
        dota2Match.matchEitherTeamsToScore.rows = matchEitherTeamsToScoreData?.rows;
        dota2Match.matchEitherTeamsToScore.header = matchEitherTeamsToScoreData?.header;
        oddData = dota2Match as any;
    } else if (active === "Map2") {
        //map 2 winner
        Dota2Map2.map2Winner.rows = map2Winner(data);
        //map 2 kill handicap
        let map2KillHandicapData: any = map2KillHandicap(data);
        Dota2Map2.map2KillHandicap.rows = map2KillHandicapData?.rows;
        Dota2Map2.map2KillHandicap.header = map2KillHandicapData?.header;
        //map 2 totals
        let map2TotalsData: any = map2Totals(data);
        Dota2Map2.map2Totals.rows = map2TotalsData?.rows;
        Dota2Map2.map2Totals.header = map2TotalsData?.header;
        //map2 Total Kills
        Dota2Map2.map2TotalKills.rows = map2TotalKills(data);
        oddData = Dota2Map2 as any;
    }


    console.log('detail market dota2', data)

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

export default Dota2MarketGroup

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
