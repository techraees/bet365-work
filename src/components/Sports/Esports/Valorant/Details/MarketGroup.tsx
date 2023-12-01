'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import MarketGroupBody from '../../../../Structure/MarketGroupBody';
import { categoriesMapping } from '@/lib/sportsMapping';
import Chevron from '@/components/ui/icons/chevron';
import StarBorderline, { StarFilled } from '@/components/ui/icons/star-borderline';
import { valorantAll, valorantMatch, valorantMap2 } from './datastructure';
import {
    Map1FirstHalfWinnerIncTie, Map1FirstHalfWinnerMapWinner, map1AltRoundsHandicap, map1MapWinnerTotalRounds, map1ToGoToOverTime, map1TotalRoundsOddEven,
    Map2FirstHalfWinnerIncTie, Map2FirstHalfWinnerMapWinner, map2AltRoundsHandicap, map2MapWinnerTotalRounds, map2ToGoToOverTime, map2TotalRoundsOddEven,
    gameLines, map1Lines, map2Lines, correctMapScore, toWinAtLeastOneMap,
} from '../mappings/mapping';

interface MarketGroupProps {
    data: any;
    active: string;
}


const ValorantMarketGroup: React.FC<MarketGroupProps> = ({ data, active }) => {

    if (!data) {
        return null
    }
    console.log(">>>>>>>>>", data);
    let oddData = {} as any;
    oddData = valorantAll as any;
    if (active === "All") {
        //Map1FirstHalfWinnerIncTie
        valorantAll.Map1FirstHalfWinnerIncTie.rows = Map1FirstHalfWinnerIncTie(data);
        //Map1FirstHalfWinnerMapWinner
        valorantAll.Map1FirstHalfWinnerMapWinner.rows = Map1FirstHalfWinnerMapWinner(data);
        //map1ToGoToOverTime
        valorantAll.map1AltRoundsHandicap.rows = map1AltRoundsHandicap(data);
        //map1MapWinnerTotalRounds
        valorantAll.map1MapWinnerTotalRounds.rows = map1MapWinnerTotalRounds(data);
        //map1ToGoToOverTime
        valorantAll.map1ToGoToOverTime.rows = map1ToGoToOverTime(data);
        //map1TotalRoundsOddEven
        valorantAll.map1TotalRoundsOddEven.rows = map1TotalRoundsOddEven(data);

        //Map2FirstHalfWinnerIncTie
        valorantAll.Map2FirstHalfWinnerIncTie.rows = Map2FirstHalfWinnerIncTie(data);
        //Map2FirstHalfWinnerMapWinner
        valorantAll.Map2FirstHalfWinnerMapWinner.rows = Map2FirstHalfWinnerMapWinner(data);
        //map2ToGoToOverTime
        valorantAll.map2AltRoundsHandicap.rows = map2AltRoundsHandicap(data);
        //map2MapWinnerTotalRounds
        valorantAll.map2MapWinnerTotalRounds.rows = map2MapWinnerTotalRounds(data);
        //map2ToGoToOverTime
        valorantAll.map2ToGoToOverTime.rows = map2ToGoToOverTime(data);
        //map2TotalRoundsOddEven
        valorantAll.map2TotalRoundsOddEven.rows = map2TotalRoundsOddEven(data);

        //game lines
        let gameLinesData: any = gameLines(data);
        valorantAll.gameLines.rows = gameLinesData?.rows;
        valorantAll.gameLines.header = gameLinesData?.header;
        //map1Lines
        let map1LinesData: any = map1Lines(data);
        valorantAll.map1Lines.rows = map1LinesData?.rows;
        valorantAll.map1Lines.header = map1LinesData?.header;
        //map2Lines
        let map2LinesData: any = map2Lines(data);
        valorantAll.map2Lines.rows = map2LinesData?.rows;
        valorantAll.map2Lines.header = map2LinesData?.header;

        //correctMapScore
        let correctMapScoreData: any = correctMapScore(data);
        valorantAll.correctMapScore.rows = correctMapScoreData?.rows;
        valorantAll.correctMapScore.header = correctMapScoreData?.header;
        //toWinAtLeastOneMap
        valorantAll.toWinAtLeastOneMap.rows = toWinAtLeastOneMap(data);


        oddData = valorantAll as any;
        console.log("------", valorantAll);
    } else if (active === "Match") {
        let gameLinesData: any = gameLines(data);
        valorantMatch.gameLines.rows = gameLinesData?.rows;
        valorantMatch.gameLines.header = gameLinesData?.header;
        //correctMapScore
        let correctMapScoreData: any = correctMapScore(data);
        valorantMatch.correctMapScore.rows = correctMapScoreData?.rows;
        valorantMatch.correctMapScore.header = correctMapScoreData?.header;

        oddData = valorantMatch as any;
    } else if (active === "Map2") {
        //map2Lines
        let map2LinesData: any = map2Lines(data);
        valorantMap2.map2Lines.rows = map2LinesData?.rows;
        valorantMap2.map2Lines.header = map2LinesData?.header;
        oddData = valorantMap2 as any;
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

export default ValorantMarketGroup

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
