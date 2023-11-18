'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import MarketGroupBody from '../../../Structure/MarketGroupBody';
import { categoriesMapping } from '@/lib/sportsMapping';
import Chevron from '@/components/ui/icons/chevron';
import StarBorderline, { StarFilled } from '@/components/ui/icons/star-borderline';
import { hockeyAll, soccerAsianLines, soccerBetBuilder, soccerCornersCards, soccerGoals, soccerHalf } from './datastructure';
import { gameLines, doubleChance, halfTimeResult, nthGoalMarketName, lastTeamToScore, firstHalfGoals, alternativematchGoals,
    matchGoals, asianHandicap, threeWayHandicap, goalOddEven, toWin2ndHalf, drawNoBet, goalLine, finalScore, 
    halfTimeCorrectScore, halfTimeFullTime, firstHalfAsianHandicap, firstHalfGoalLine, firstHalfHandicap,
     resultBothTeamsToScore, bothTeamsToScore, asianCorners, firstHalfAsianCorners, cornerRace, corners, matchCorners,
     twoWayCorners, 
     toQualify, goalsOverUnder,
     twoCellTitleValue,
     betResult, betBothTeamsToScore, betDoubleChance, betMatchGoals, betNextGoal, betTeamGoals, betScore, betGoalOddEven,
     BetTeamToScoreinBothHalf, BetTeamToScorein2ndHalf, betMatchCorners, whenWillGameEnd, willMatchGoOvertime, exactGoals, 
     homeExactGoals, awayExactGoals, doubleChance2nd, doubleChance3rd, period3Lines,
     homeTotalGoals, awayTotalGoals
    } from '../mappings/mapping';

interface MarketGroupProps {
    data: any;
    active: string;
}


const HockeyMarketGroup: React.FC<MarketGroupProps> = ({ data, active }) => {

    if (!data) {
        return null
    }
    console.log('---->>hockeydata<<----', data);
    ["All", "Same Game Parlay", "Period", "Score"]
    let oddData = {} as any;
    oddData = hockeyAll as any;
    if (active === "All") {
        let gameLinesData: any = gameLines(data);
        hockeyAll.gameLines.rows = gameLinesData?.rows;
        hockeyAll.gameLines.header = gameLinesData?.header;
        let period3LinesData: any = period3Lines(data);
        hockeyAll.period3Lines.rows = period3LinesData?.rows;
        hockeyAll.period3Lines.header = period3LinesData?.header;

        hockeyAll.toQualify.rows = toQualify(data);
        hockeyAll.doubleChance.rows = doubleChance(data);
        hockeyAll.toWintheTrophy.rows = twoCellTitleValue(data, 'toWintheTrophy');
        hockeyAll.gameWonInExtraTime.rows = twoCellTitleValue(data, 'gameWonInExtraTime');
        hockeyAll.gameWonAfterPenaltiesShootout.rows = twoCellTitleValue(data, 'gameWonAfterPenaltiesShootout');
        hockeyAll.halfTimeResult.rows = halfTimeResult(data);
        hockeyAll.nthGoal = nthGoalMarketName(data, hockeyAll.nthGoal);
        hockeyAll.matchGoals.rows = matchGoals(data);
        hockeyAll.alternativematchGoals.rows = alternativematchGoals(data);
        hockeyAll.asianHandicap = asianHandicap(data, hockeyAll.asianHandicap);
        hockeyAll.firstHalfGoals.rows = firstHalfGoals(data);
        hockeyAll["3-WayHandicap"].rows = threeWayHandicap(data);
        hockeyAll.goalOddEven.rows = goalOddEven(data);
        hockeyAll.toWin2ndHalf.rows = toWin2ndHalf(data);
        hockeyAll.drawNoBet.rows = drawNoBet(data);
        hockeyAll.lastTeamToScore.rows = lastTeamToScore(data);
        hockeyAll.goalLine.rows = goalLine(data);
        hockeyAll.finalScore.rows = finalScore(data);
        hockeyAll.halfTimeCorrectScore.rows = halfTimeCorrectScore(data);
        hockeyAll.halfTimeFullTime.rows = halfTimeFullTime(data)
        hockeyAll.firstHalfAsianHandicap = firstHalfAsianHandicap(data, hockeyAll.firstHalfAsianHandicap);
        hockeyAll.firstHalfGoalLine = firstHalfGoalLine(data, hockeyAll.firstHalfGoalLine);
        hockeyAll.firstHalfHandicap.rows = firstHalfHandicap(data);
        hockeyAll.resultBothTeamsToScore.rows = resultBothTeamsToScore(data);
        hockeyAll.bothTeamsToScore.rows = bothTeamsToScore(data);
        hockeyAll.asianCorners.rows = asianCorners(data);
        hockeyAll.firstHalfAsianCorners.rows = firstHalfAsianCorners(data);
        hockeyAll.cornerRace.rows = cornerRace(data);
        hockeyAll.corners.rows = corners(data);
        hockeyAll.matchCorners = matchCorners(data, hockeyAll.matchCorners);
        hockeyAll.twoWayCorners.rows = twoWayCorners(data);
        hockeyAll.bothTeamsToScoreFirstHalf.rows = twoCellTitleValue(data, 'bothTeamsToScoreFirstHalf');
        hockeyAll.bothTeamsToScoreSecondHalf.rows = twoCellTitleValue(data, 'bothTeamsToScoreSecondHalf');
        hockeyAll.teamCleanSheet.rows =  twoCellTitleValue(data, 'teamCleanSheet');
        hockeyAll.homeGoals = goalsOverUnder(data, hockeyAll.homeGoals, 'homeGoals');
        hockeyAll.awayGoals = goalsOverUnder(data, hockeyAll.awayGoals, 'awayGoals');

        hockeyAll.doubleChance2nd.rows = doubleChance2nd(data);
        hockeyAll.doubleChance3rd.rows = doubleChance3rd(data);

        hockeyAll.whenWillGameEnd.rows = whenWillGameEnd(data);
        hockeyAll.willMatchGoOvertime.rows = willMatchGoOvertime(data);
        hockeyAll.exactGoals.rows = exactGoals(data);
        hockeyAll.homeExactGoals = { ...hockeyAll.homeExactGoals, ...homeExactGoals(data)}
        hockeyAll.awayExactGoals = { ...hockeyAll.awayExactGoals, ...awayExactGoals(data)}
        hockeyAll.homeTotalGoals = { ...hockeyAll.homeTotalGoals, ...homeTotalGoals(data)}
        hockeyAll.awayTotalGoals = { ...hockeyAll.awayTotalGoals, ...awayTotalGoals(data)}
                
        oddData = hockeyAll as any;
        console.log('-----hockey all-----', hockeyAll);
    } else if (active === "Bet Builder") {
        soccerBetBuilder.result.rows = betResult(data);
        soccerBetBuilder.bothTeamsToScore.rows = betBothTeamsToScore(data);
        soccerBetBuilder.doubleChance.rows = betDoubleChance(data);
        soccerBetBuilder.matchGoals = betMatchGoals(data, soccerBetBuilder.matchGoals);
        soccerBetBuilder.corners = betMatchCorners(data, soccerBetBuilder.corners);
        soccerBetBuilder.nextGoal.rows = betNextGoal(data);
        soccerBetBuilder.teamGoals = betTeamGoals(data, soccerBetBuilder.teamGoals);
        soccerBetBuilder.score = betScore(data, soccerBetBuilder.score);
        soccerBetBuilder.goalOddEven.rows = betGoalOddEven(data);
        soccerBetBuilder.teamToScorein2ndHalf.rows = BetTeamToScorein2ndHalf(data);
        soccerBetBuilder.teamToScoreinBothHalf.rows = BetTeamToScoreinBothHalf(data);
        oddData = soccerBetBuilder as any;
    } else if (active === "Asian Lines") {
        soccerAsianLines.asianHandicap = asianHandicap(data, soccerAsianLines.asianHandicap);
        soccerAsianLines.goalLine.rows = goalLine(data);
        soccerAsianLines.firstHalfAsianHandicap = firstHalfAsianHandicap(data, soccerAsianLines.firstHalfAsianHandicap);
        soccerAsianLines.firstHalfGoalLine = firstHalfGoalLine(data, soccerAsianLines.firstHalfGoalLine);
        oddData = soccerAsianLines as any;
    } else if (active === "Corners/Cards") {
        soccerCornersCards.asianCorners.rows = asianCorners(data);
        soccerCornersCards.firstHalfAsianCorners.rows = firstHalfAsianCorners(data);
        soccerCornersCards.cornerRace.rows = cornerRace(data);
        soccerCornersCards.corners.rows = corners(data);
        soccerCornersCards.matchCorners = matchCorners(data, soccerCornersCards.matchCorners);
        soccerCornersCards.twoWayCorners.rows = twoWayCorners(data);
        oddData = soccerCornersCards as any;
    } else if (active === "Goals") {
        soccerGoals.nthGoal = nthGoalMarketName(data, soccerGoals.nthGoal);
        soccerGoals.matchGoals.rows = matchGoals(data);
        soccerGoals.alternativematchGoals.rows = alternativematchGoals(data);
        soccerGoals.lastTeamToScore.rows = lastTeamToScore(data);
        soccerGoals.goalOddEven.rows = goalOddEven(data);
        oddData =soccerGoals as any;
    } else if (active === "Half") {
        soccerHalf.halfTimeResult.rows = halfTimeResult(data);
        soccerHalf.firstHalfGoals.rows = firstHalfGoals(data);
        soccerHalf.toWin2ndHalf.rows = toWin2ndHalf(data);
        soccerHalf.halfTimeCorrectScore.rows = halfTimeCorrectScore(data);
        soccerHalf.halfTimeFullTime.rows = halfTimeFullTime(data)
        soccerHalf.firstHalfAsianHandicap = firstHalfAsianHandicap(data, soccerHalf.firstHalfAsianHandicap);
        soccerHalf.firstHalfGoalLine = firstHalfGoalLine(data, soccerHalf.firstHalfGoalLine);
        soccerHalf.firstHalfHandicap.rows = firstHalfHandicap(data);
        soccerHalf.firstHalfAsianCorners.rows = firstHalfAsianCorners(data);
        soccerHalf.bothTeamsToScoreSecondHalf.rows = twoCellTitleValue(data, 'bothTeamsToScoreSecondHalf');
        oddData =soccerHalf as any;
    }


    // console.log('detail market soccer', data)

    return (
        <div className='w-[100%] bg-[#383838]'>
            {Object.keys(oddData).map((key, index) => {
                if((oddData[key]?.rows?.length>0) || (oddData[key]?.subtabs?.length>0)){
                    if(oddData[key]?.subtabs?.length>0){
                        let skip = true
                        oddData[key]?.subtabs.map((subtab:any)=>{
                            // console.log('subtab',subtab ,oddData[key][subtab])
                            if(oddData[key][subtab] && oddData[key][subtab].length > 0){
                                skip = false
                            }
                        })
                        if(skip === true){
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

export default HockeyMarketGroup

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
