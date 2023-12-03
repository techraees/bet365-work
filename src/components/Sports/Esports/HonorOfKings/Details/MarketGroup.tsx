'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import MarketGroupBody from '../../../../Structure/MarketGroupBody';
import { categoriesMapping } from '@/lib/sportsMapping';
import Chevron from '@/components/ui/icons/chevron';
import StarBorderline, { StarFilled } from '@/components/ui/icons/star-borderline';
import { HonorOfKingsAll } from './datastructure';
import {
    gameLines, matchWinner3Ways,
    map1Winner, map1Kills,
    map2Winner, map2Kills,
    map3Winner, map3Kills,
    map4Winner, map4Kills,
    map5Winner, map5Kills,
    map6Winner, map6Kills, map6Towers, map6FirstTyrant,
    map7Winner, map7Kills, map7RaceToKills, map7Towers, map7FirstTyrant,
    correctMapScore, matchEitherTeamsToScore,
} from '../mappings/mapping';

interface MarketGroupProps {
    data: any;
    active: string;
}


const HonorOfKingsMarketGroup: React.FC<MarketGroupProps> = ({ data, active }) => {

    if (!data) {
        return null
    }
    console.log(">>>>>>>>>", data);
    ["All", "Same Game Parlay", "Score"]
    let oddData = {} as any;
    oddData = HonorOfKingsAll as any;
    if (active === "All") {
        //game lines
        let gameLinesData: any = gameLines(data);
        HonorOfKingsAll.gameLines.rows = gameLinesData?.rows;
        HonorOfKingsAll.gameLines.header = gameLinesData?.header;
        //matchWinner3Ways
        HonorOfKingsAll.matchWinner3Ways.rows = matchWinner3Ways(data);

        //map 1 winner
        HonorOfKingsAll.map1Winner.rows = map1Winner(data);
        //map 1 kills
        let map1KillsData: any = map1Kills(data);
        HonorOfKingsAll.map1Kills.rows = map1KillsData?.rows;
        HonorOfKingsAll.map1Kills.header = map1KillsData?.header;

        //map 2 winner
        HonorOfKingsAll.map2Winner.rows = map2Winner(data);
        //map 2 kills
        let map2KillsData: any = map2Kills(data);
        HonorOfKingsAll.map2Kills.rows = map2KillsData?.rows;
        HonorOfKingsAll.map2Kills.header = map2KillsData?.header;

        //map 3 winner
        HonorOfKingsAll.map3Winner.rows = map3Winner(data);
        //map 3 kills
        let map3KillsData: any = map3Kills(data);
        HonorOfKingsAll.map3Kills.rows = map3KillsData?.rows;
        HonorOfKingsAll.map3Kills.header = map3KillsData?.header;

        //map 4 winner
        HonorOfKingsAll.map4Winner.rows = map4Winner(data);
        //map 4 kills
        let map4KillsData: any = map4Kills(data);
        HonorOfKingsAll.map4Kills.rows = map4KillsData?.rows;
        HonorOfKingsAll.map4Kills.header = map4KillsData?.header;

        //map 5 winner
        HonorOfKingsAll.map5Winner.rows = map5Winner(data);
        //map 5 kills
        let map5KillsData: any = map5Kills(data);
        HonorOfKingsAll.map5Kills.rows = map5KillsData?.rows;
        HonorOfKingsAll.map5Kills.header = map5KillsData?.header;

        //map 6 winner
        HonorOfKingsAll.map6Winner.rows = map6Winner(data);
        //map 6 kills
        let map6KillsData: any = map6Kills(data);
        HonorOfKingsAll.map6Kills.rows = map6KillsData?.rows;
        HonorOfKingsAll.map6Kills.header = map6KillsData?.header;
        //map6Towers
        let map6TowersData: any = map6Towers(data);
        HonorOfKingsAll.map6Towers.rows = map6TowersData?.rows;
        HonorOfKingsAll.map6Towers.header = map6TowersData?.header;
        //map6FirstTyrant
        HonorOfKingsAll.map6FirstTyrant.rows = map6FirstTyrant(data);

        //map 7 winner
        HonorOfKingsAll.map7Winner.rows = map7Winner(data);
        //map 7 kills
        let map7KillsData: any = map7Kills(data);
        HonorOfKingsAll.map7Kills.rows = map7KillsData?.rows;
        HonorOfKingsAll.map7Kills.header = map7KillsData?.header;
        //map7RaceToKills
        HonorOfKingsAll.map7RaceToKills.rows = map7RaceToKills(data);
        //map7Towers
        let map7TowersData: any = map7Towers(data);
        HonorOfKingsAll.map7Towers.rows = map7TowersData?.rows;
        HonorOfKingsAll.map7Towers.header = map7TowersData?.header;
        //map7FirstTyrant
        HonorOfKingsAll.map7FirstTyrant.rows = map7FirstTyrant(data);

        //correctMapScore
        HonorOfKingsAll.correctMapScore.rows = correctMapScore(data);;
        //matchEitherTeamsToScore
        let matchEitherTeamsToScoreData: any = matchEitherTeamsToScore(data);
        HonorOfKingsAll.matchEitherTeamsToScore.rows = matchEitherTeamsToScoreData?.rows;
        HonorOfKingsAll.matchEitherTeamsToScore.header = matchEitherTeamsToScoreData?.header;

        console.log(HonorOfKingsAll);
        oddData = HonorOfKingsAll as any;

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

export default HonorOfKingsMarketGroup

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
