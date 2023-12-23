'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { categoriesMapping } from '@/lib/sportsMapping';
import Chevron from '@/components/ui/icons/chevron';
import StarBorderline, { StarFilled } from '@/components/ui/icons/star-borderline';
import { tennisMain, tennisBetBuilder, tennisGames, tennisPlayer, tennisSet } from './mappings/datastructure';
import {
    toWinMatch, matchHandicapGames, totalGames2Way, setBetting, firstSetWinner, firstSetTotalGames, firstSetScore,
    matchResultAndTotalGames, homeAwayTo, totalGamesInSet, firstHomeAwayServiceGameWinners, firstHomeAwayServiceGameScore, firstHomeAwayServiceGameToWinTo, goTheDistance, firstSethandicap, firstSetCorrectScoreGroup, firstSetScoreAnyPlayer, firstSetPlayerToBreakServe, firstBreakOfServe, firstHomeAwayServiceGameYesNo, firstHomeAwayServiceGameTotalPoints
} from './mappings/pregamemaps';
import MarketGroupBody from '@/components/Structure/MarketGroupBody';

interface MarketGroupProps {
    data: any;
    active: string;
}


const MatchBody: React.FC<MarketGroupProps> = ({ data, active }) => {
    console.log("++++++++", data);
    if (!data) {
        return null
    }
    let oddData = {} as any;
    oddData = tennisMain as any;
    if (active === "Main" || active === "All") {
        tennisMain.toWinMatch.rows = toWinMatch(data);
        tennisMain.matchHandicapGames.rows = matchHandicapGames(data);
        tennisMain['totalGames2-Way'].rows = totalGames2Way(data);
        tennisMain.setBetting.rows = setBetting(data);
        tennisMain.firstSetWinner.rows = firstSetWinner(data);
        tennisMain['1stSetTotalGames'].rows = firstSetTotalGames(data);
        tennisMain.firstSetScore.rows = firstSetScore(data);
        tennisMain.matchResultAndTotalGames.rows = matchResultAndTotalGames(data);
        tennisMain.homeTo = homeAwayTo(data, tennisMain.homeTo, 'home');
        tennisMain.awayTo = homeAwayTo(data, tennisMain.awayTo, 'away');
        tennisMain['firstHomeServiceGame-Winners'] = firstHomeAwayServiceGameWinners(data, tennisMain['firstHomeServiceGame-Winners'], 'home');
        tennisMain['firstAwayServiceGame-Winners'] = firstHomeAwayServiceGameWinners(data, tennisMain['firstAwayServiceGame-Winners'], 'away');
        tennisMain['firstHomeServiceGame-Score'] = firstHomeAwayServiceGameScore(data, tennisMain['firstHomeServiceGame-Score'], 'home');
        tennisMain['firstAwayServiceGame-Score'] = firstHomeAwayServiceGameScore(data, tennisMain['firstAwayServiceGame-Score'], 'away');
        tennisMain['firstHomeServiceGame-ToWinTo'] = firstHomeAwayServiceGameToWinTo(data, tennisMain['firstHomeServiceGame-ToWinTo'], 'home');
        tennisMain['firstAwayServiceGame-ToWinTo'] = firstHomeAwayServiceGameToWinTo(data, tennisMain['firstAwayServiceGame-ToWinTo'], 'away');
        tennisMain.goTheDistance.rows = goTheDistance(data);
        oddData = tennisMain as any;
    } else if (active === "Bet Builder") {
        // tennisBetBuilder.result.rows = betResult(data);
        // tennisBetBuilder.bothTeamsToScore.rows = betBothTeamsToScore(data);
        // tennisBetBuilder.doubleChance.rows = betDoubleChance(data);
        // tennisBetBuilder.halftimeFulltime.rows = bethalftimeFulltime(data);
        // tennisBetBuilder.score = betScore(data, tennisBetBuilder.score);
        // tennisBetBuilder.halfWithMostGoals.rows = bethalfWithMostGoals(data);
        // tennisBetBuilder.teamSpecials.rows = betteamSpecials(data);
        // tennisBetBuilder.goalOddEven.rows = betGoalOddEven(data);
        // tennisBetBuilder.setBetting.rows = setBetting(data);
        // tennisBetBuilder.totalGamesInSet = totalGamesInSet(data, tennisBetBuilder.totalGamesInSet);
        oddData = tennisBetBuilder as any;
    } else if (active === "Set") {
        tennisSet.firstSetWinner.rows = firstSetWinner(data);
        tennisSet.setBetting.rows = setBetting(data);
        tennisSet['1stSetTotalGames'].rows = firstSetTotalGames(data);
        tennisSet.firstSetScore.rows = firstSetScore(data);
        tennisSet.firstSethandicap.rows = firstSethandicap(data);
        tennisSet.firstSetCorrectScoreGroup.rows = firstSetCorrectScoreGroup(data);
        tennisSet.firstSetScoreAnyPlayer.rows = firstSetScoreAnyPlayer(data);
        tennisSet.firstSetPlayerToBreakServe.rows = firstSetPlayerToBreakServe(data);
        oddData = tennisSet as any;
    } else if (active === "Goals") {
        tennisGames.matchHandicapGames.rows = matchHandicapGames(data);
        tennisGames['totalGames2-Way'].rows = totalGames2Way(data);
        tennisGames['1stSetTotalGames'].rows = firstSetTotalGames(data);
        tennisGames.firstBreakOfServe.rows = firstBreakOfServe(data);
        tennisGames.matchResultAndTotalGames.rows = matchResultAndTotalGames(data);
        oddData = tennisGames as any;
    } else if (active === "Player") {
        tennisPlayer.firstSetPlayerToBreakServe.rows = firstSetPlayerToBreakServe(data);
        tennisPlayer.homeTo = homeAwayTo(data, tennisPlayer.homeTo, 'home');
        tennisPlayer.awayTo = homeAwayTo(data, tennisPlayer.awayTo, 'away');
        tennisPlayer['firstHomeServiceGame-Winners'] = firstHomeAwayServiceGameWinners(data, tennisPlayer['firstHomeServiceGame-Winners'], 'home');
        tennisPlayer['firstAwayServiceGame-Winners'] = firstHomeAwayServiceGameWinners(data, tennisPlayer['firstAwayServiceGame-Winners'], 'away');
        tennisPlayer['firstHomeServiceGame-Score'] = firstHomeAwayServiceGameScore(data, tennisPlayer['firstHomeServiceGame-Score'], 'home');
        tennisPlayer['firstAwayServiceGame-Score'] = firstHomeAwayServiceGameScore(data, tennisPlayer['firstAwayServiceGame-Score'], 'away');
        tennisPlayer['firstHomeServiceGame-ToWinTo'] = firstHomeAwayServiceGameToWinTo(data, tennisPlayer['firstHomeServiceGame-ToWinTo'], 'home');
        tennisPlayer['firstAwayServiceGame-ToWinTo'] = firstHomeAwayServiceGameToWinTo(data, tennisPlayer['firstAwayServiceGame-ToWinTo'], 'away');
        tennisPlayer['firstHomeServiceGame-Yes/No'] = firstHomeAwayServiceGameYesNo(data, tennisPlayer['firstHomeServiceGame-Yes/No'], 'home');
        tennisPlayer['firstAwayServiceGame-Yes/No'] = firstHomeAwayServiceGameYesNo(data, tennisPlayer['firstAwayServiceGame-Yes/No'], 'away');
        tennisPlayer['firstHomeServiceGame-TotalPoints'] = firstHomeAwayServiceGameTotalPoints(data, tennisPlayer['firstHomeServiceGame-TotalPoints'], 'home');
        tennisPlayer['firstAwayServiceGame-TotalPoints'] = firstHomeAwayServiceGameTotalPoints(data, tennisPlayer['firstAwayServiceGame-TotalPoints'], 'away');

        oddData = tennisPlayer as any;
    }

    console.log('detail market tennis', oddData)

    return (
        <div className='w-[100%] bg-[#383838]'>
            {Object.keys(oddData).map((key, index) => {
                if ((oddData[key]?.rows?.length > 0) || (oddData[key]?.subtabs?.length > 0)) {
                    if (oddData[key]?.subtabs?.length > 0) {
                        let skip = true
                        oddData[key]?.subtabs.map((subtab: any) => {
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

export default MatchBody

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
