'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import MarketGroupBody from '../../../Structure/MarketGroupBody';
import { categoriesMapping } from '@/lib/sportsMapping';
import { BaseballAll, BaseballBetBuilder, BaseballMains, BaseballInnings, BaseballTeam } from './datastructure';
import {
    gameLines, alternativeRunLine, alternativeGameTotal, teamTotals, teamAlternativeTotals,
    aRunScoredAwayInning1, aRunScoredHomeInning1, runsInThe1thInning, _1thInningRuns, _1thInningLines,
    aRunScoredHomeInning2, aRunScoredAwayInning2, runsInThe2thInning, _2thInningRuns, _2thInningLines,
    aRunScoredHomeInning3, aRunScoredAwayInning3, runsInThe3thInning, _3thInningRuns, _3thInningLines,
    aRunScoredHomeInning4, aRunScoredAwayInning4, runsInThe4thInning, _4thInningRuns, _4thInningLines,
    aRunScoredHomeInning5, aRunScoredAwayInning5, runsInThe5thInning, _5thInningRuns, _5thInningLines,
    aRunScoredHomeInning6, aRunScoredAwayInning6, runsInThe6thInning, _6thInningRuns, _6thInningLines,
    aRunScoredHomeInning7, aRunScoredAwayInning7, runsInThe7thInning, _7thInningRuns, _7thInningLines,
    aRunScoredHomeInning8, aRunScoredAwayInning8, runsInThe8thInning, _8thInningRuns, _8thInningLines,
    winningMargin, runLineIncl, matchCorrectScore, totalRuns3Way,
    _3innings, alternative3InningsTotals, alternative3InningsRunLines,
    _5innings, alternative5InningsTotals, alternative5InningsRunLines,
    _7innings, alternative7InningsTotals, alternative7InningsRunLines,
    bothTeamsToScore, raceToRuns, leadAfter, extraInnings,
    monyLinesAndTotal, alternativeMonyLinesAndTotal, runLineAndTotal
} from '../mappings/mapping';
import Chevron from '@/components/ui/icons/chevron';
import StarBorderline, { StarFilled } from '@/components/ui/icons/star-borderline';
interface MarketGroupProps {
    data: any;
    active: string;
}


const BaseballMarketGroup: React.FC<MarketGroupProps> = ({ data, active }) => {

    if (!data) {
        return null
    }
    console.log("+++++", data);
    let oddData = BaseballAll as any;
    if (active === "All") {
        //game lines
        let gameLinesData: any = gameLines(data);
        BaseballAll.gameLines.rows = gameLinesData?.rows;
        BaseballAll.gameLines.header = gameLinesData?.header;
        // alternativeRunLine
        BaseballAll.alternativeRunLine.rows = alternativeRunLine(data);
        // laternative game total
        BaseballAll.alternativeGameTotal.rows = alternativeGameTotal(data);
        // teamTotals
        BaseballAll.teamTotals.rows = teamTotals(data);
        // teamAlternativeTotals
        BaseballAll.teamAlternativeTotals.rows = teamAlternativeTotals(data);

        // aRunScoredHomeInning1
        let aRunScoredHomeInning1Data: any = aRunScoredHomeInning1(data);
        BaseballAll.aRunScoredHomeInning1.rows = aRunScoredHomeInning1Data?.rows;
        BaseballAll.aRunScoredHomeInning1.marketname = aRunScoredHomeInning1Data?.marketname;
        // aRunScoredAwayInning1
        let aRunScoredAwayInning1Data: any = aRunScoredAwayInning1(data);
        BaseballAll.aRunScoredAwayInning1.rows = aRunScoredAwayInning1Data?.rows;
        BaseballAll.aRunScoredAwayInning1.marketname = aRunScoredAwayInning1Data?.marketname;
        // // runsInThe1thInning
        BaseballAll.runsInThe1thInning.rows = runsInThe1thInning(data);
        // runsInThe1thInning
        BaseballAll._1thInningRuns.rows = _1thInningRuns(data);
        _1thInningLines
        BaseballAll._1thInningLines.rows = _1thInningLines(data);

        // aRunScoredHomeInning2
        let aRunScoredHomeInning2Data: any = aRunScoredHomeInning2(data);
        BaseballAll.aRunScoredHomeInning2.rows = aRunScoredHomeInning2Data?.rows;
        BaseballAll.aRunScoredHomeInning2.marketname = aRunScoredHomeInning2Data?.marketname;
        // aRunScoredAwayInning2
        let aRunScoredAwayInning2Data: any = aRunScoredAwayInning2(data);
        BaseballAll.aRunScoredAwayInning2.rows = aRunScoredAwayInning2Data?.rows;
        BaseballAll.aRunScoredAwayInning2.marketname = aRunScoredAwayInning2Data?.marketname;
        // runsInThe2thInning
        BaseballAll.runsInThe2thInning.rows = runsInThe2thInning(data);
        // runsInThe2thInning
        BaseballAll._2thInningRuns.rows = _2thInningRuns(data);
        // _2thInningLines
        BaseballAll._2thInningLines.rows = _2thInningLines(data);

        // aRunScoredHomeInning3
        let aRunScoredHomeInning3Data: any = aRunScoredHomeInning3(data);
        BaseballAll.aRunScoredHomeInning3.rows = aRunScoredHomeInning3Data?.rows;
        BaseballAll.aRunScoredHomeInning3.marketname = aRunScoredHomeInning3Data?.marketname;
        // aRunScoredAwayInning3
        let aRunScoredAwayInning3Data: any = aRunScoredAwayInning3(data);
        BaseballAll.aRunScoredAwayInning3.rows = aRunScoredAwayInning3Data?.rows;
        BaseballAll.aRunScoredAwayInning3.marketname = aRunScoredAwayInning3Data?.marketname;
        // runsInThe3thInning
        BaseballAll.runsInThe3thInning.rows = runsInThe3thInning(data);
        // runsInThe3thInning
        BaseballAll._3thInningRuns.rows = _3thInningRuns(data);
        // _3thInningLines
        BaseballAll._3thInningLines.rows = _3thInningLines(data);

        // aRunScoredHomeInning4
        let aRunScoredHomeInning4Data: any = aRunScoredHomeInning4(data);
        BaseballAll.aRunScoredHomeInning4.rows = aRunScoredHomeInning4Data?.rows;
        BaseballAll.aRunScoredHomeInning4.marketname = aRunScoredHomeInning4Data?.marketname;
        // aRunScoredAwayInning4
        let aRunScoredAwayInning4Data: any = aRunScoredAwayInning4(data);
        BaseballAll.aRunScoredAwayInning4.rows = aRunScoredAwayInning4Data?.rows;
        BaseballAll.aRunScoredAwayInning4.marketname = aRunScoredAwayInning4Data?.marketname;
        // runsInThe4thInning
        BaseballAll.runsInThe4thInning.rows = runsInThe4thInning(data);
        // runsInThe4thInning
        BaseballAll._4thInningRuns.rows = _4thInningRuns(data);
        // _4thInningLines
        BaseballAll._4thInningLines.rows = _4thInningLines(data);

        // aRunScoredHomeInning5
        let aRunScoredHomeInning5Data: any = aRunScoredHomeInning5(data);
        BaseballAll.aRunScoredHomeInning5.rows = aRunScoredHomeInning5Data?.rows;
        BaseballAll.aRunScoredHomeInning5.marketname = aRunScoredHomeInning5Data?.marketname;
        // aRunScoredAwayInning5
        let aRunScoredAwayInning5Data: any = aRunScoredAwayInning5(data);
        BaseballAll.aRunScoredAwayInning5.rows = aRunScoredAwayInning5Data?.rows;
        BaseballAll.aRunScoredAwayInning5.marketname = aRunScoredAwayInning5Data?.marketname;
        // runsInThe5thInning
        BaseballAll.runsInThe5thInning.rows = runsInThe5thInning(data);
        // runsInThe5thInning
        BaseballAll._5thInningRuns.rows = _5thInningRuns(data);
        // _5thInningLines
        BaseballAll._5thInningLines.rows = _5thInningLines(data);

        // aRunScoredHomeInning6
        let aRunScoredHomeInning6Data: any = aRunScoredHomeInning6(data);
        BaseballAll.aRunScoredHomeInning6.rows = aRunScoredHomeInning6Data?.rows;
        BaseballAll.aRunScoredHomeInning6.marketname = aRunScoredHomeInning6Data?.marketname;
        // aRunScoredAwayInning6
        let aRunScoredAwayInning6Data: any = aRunScoredAwayInning6(data);
        BaseballAll.aRunScoredAwayInning6.rows = aRunScoredAwayInning6Data?.rows;
        BaseballAll.aRunScoredAwayInning6.marketname = aRunScoredAwayInning6Data?.marketname;
        // runsInThe6thInning
        BaseballAll.runsInThe6thInning.rows = runsInThe6thInning(data);
        // runsInThe6thInning
        BaseballAll._6thInningRuns.rows = _6thInningRuns(data);
        // _6thInningLines
        BaseballAll._6thInningLines.rows = _6thInningLines(data);

        // aRunScoredHomeInning7
        let aRunScoredHomeInning7Data: any = aRunScoredHomeInning7(data);
        BaseballAll.aRunScoredHomeInning7.rows = aRunScoredHomeInning7Data?.rows;
        BaseballAll.aRunScoredHomeInning7.marketname = aRunScoredHomeInning7Data?.marketname;
        // aRunScoredAwayInning7
        let aRunScoredAwayInning7Data: any = aRunScoredAwayInning7(data);
        BaseballAll.aRunScoredAwayInning7.rows = aRunScoredAwayInning7Data?.rows;
        BaseballAll.aRunScoredAwayInning7.marketname = aRunScoredAwayInning7Data?.marketname;
        // runsInThe7thInning
        BaseballAll.runsInThe7thInning.rows = runsInThe7thInning(data);
        // runsInThe7thInning
        BaseballAll._7thInningRuns.rows = _7thInningRuns(data);
        // _7thInningLines
        BaseballAll._7thInningLines.rows = _7thInningLines(data);

        // aRunScoredHomeInning8
        let aRunScoredHomeInning8Data: any = aRunScoredHomeInning8(data);
        BaseballAll.aRunScoredHomeInning8.rows = aRunScoredHomeInning8Data?.rows;
        BaseballAll.aRunScoredHomeInning8.marketname = aRunScoredHomeInning8Data?.marketname;
        // aRunScoredAwayInning8
        let aRunScoredAwayInning8Data: any = aRunScoredAwayInning8(data);
        BaseballAll.aRunScoredAwayInning8.rows = aRunScoredAwayInning8Data?.rows;
        BaseballAll.aRunScoredAwayInning8.marketname = aRunScoredAwayInning8Data?.marketname;
        // runsInThe8thInning
        BaseballAll.runsInThe8thInning.rows = runsInThe8thInning(data);
        // runsInThe8thInning
        BaseballAll._8thInningRuns.rows = _8thInningRuns(data);
        // _8thInningLines
        BaseballAll._8thInningLines.rows = _8thInningLines(data);
        // winningMargin
        BaseballAll.winningMargin.rows = winningMargin(data);
        // runLineIncl
        let runLineInclData: any = runLineIncl(data);
        BaseballAll.runLineIncl.rows = runLineInclData?.rows;
        BaseballAll.runLineIncl.header = runLineInclData?.header;
        // matchCorrectScore
        BaseballAll.matchCorrectScore.rows = matchCorrectScore(data);
        // totalRuns3Way
        BaseballAll.totalRuns3Way.rows = totalRuns3Way(data);


        //_3innings
        let _3inningsData: any = _3innings(data);
        BaseballAll._3innings.rows = _3inningsData?.rows;
        BaseballAll._3innings.header = _3inningsData?.header;
        //game alternative3InningsTotals
        BaseballAll.alternative3InningsTotals.rows = alternative3InningsTotals(data);

        //alternative3InningsRunLines
        BaseballAll.alternative3InningsRunLines.rows = alternative3InningsRunLines(data);


        //_5innings
        let _5inningsData: any = _5innings(data);
        BaseballAll._5innings.rows = _5inningsData?.rows;
        BaseballAll._5innings.header = _5inningsData?.header;
        //game alternative5InningsTotals
        BaseballAll.alternative5InningsTotals.rows = alternative5InningsTotals(data);
        //alternative5InningsRunLines
        BaseballAll.alternative5InningsRunLines.rows = alternative5InningsRunLines(data);


        //_7innings
        let _7inningsData: any = _7innings(data);
        BaseballAll._7innings.rows = _7inningsData?.rows;
        BaseballAll._7innings.header = _7inningsData?.header;
        //game alternative7InningsTotals
        BaseballAll.alternative7InningsTotals.rows = alternative7InningsTotals(data);
        //alternative7InningsRunLines
        BaseballAll.alternative7InningsRunLines.rows = alternative7InningsRunLines(data);

        // bothTeamsToScore
        BaseballAll.bothTeamsToScore.rows = bothTeamsToScore(data);
        // raceToRuns
        BaseballAll.raceToRuns.rows = raceToRuns(data);
        // leadAfter
        BaseballAll.leadAfter.rows = leadAfter(data);
        // extraInnings
        BaseballAll.extraInnings.rows = extraInnings(data);
        // monyLinesAndTotal
        BaseballAll.monyLinesAndTotal.rows = monyLinesAndTotal(data);
        // alternativeMonyLinesAndTotal
        BaseballAll.alternativeMonyLinesAndTotal.rows = alternativeMonyLinesAndTotal(data);
        // runLineAndTotal
        BaseballAll.runLineAndTotal.rows = runLineAndTotal(data);

        oddData = BaseballAll as any;
    } else if (active === "Bet Builder") {
        oddData = BaseballBetBuilder as any;
    } else if (active === "Main") {
        oddData = BaseballMains as any;
    } else if (active === "Innings") {
        oddData = BaseballInnings as any;
    } else if (active === "Team") {
        oddData = BaseballTeam as any;
    }
    console.log(oddData);
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

export default BaseballMarketGroup

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

            {odd?.currentPoints &&
                <div className="flex w-[100%] h-[100%] border-t-[#ffffff1a] border-t border-solid text-[hsla(0,0%,100%,.6)]">
                    <div className='h-[25px] flex items-center pl-[30px]'>Current Score: {odd?.currentPoints}</div>
                </div>}
            <div
                className={cn('h-[100%] overflow-hidden transition-[max-height] duration-300 ease', isExpanded ? 'max-h-[500px]' : 'max-h-[0px]')}>
                <div className={cn("flex w-[100%] h-[100%] text-[white]")}>
                    <MarketGroupBody data={data} keytag={keytag} active={active} odd={odd} />
                </div>
            </div>
        </div>

    )
};

