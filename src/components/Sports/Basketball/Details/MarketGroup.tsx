'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import MarketGroupBody from '../../../Structure/MarketGroupBody';
import { categoriesMapping } from '@/lib/sportsMapping';
import { basketballAll, basketballBetBuilder, basketballHalf, basketballInstant, basketballQuarter, basketballTeam } from './datastructure';
import Chevron from '@/components/ui/icons/chevron';
import StarBorderline, { StarFilled } from '@/components/ui/icons/star-borderline';
import { currentPoints, gameLines, pointBetting, getCurrentPoints, quarterLines2Way, oddEven, half, resultTotalGoals, quarterLines, getQuarterTitle, halfLines, getHalfTitle, currentQuarterRaceTo, currentHalfRaceTo, currentQuarterBothTeamsToScore, currentQuarterHomeTeamToScore, currentQuarterAwayTeamToScore, currentQuarterHomeTeamToScore2, currentQuarterAwayTeamToScore2, currentQuarterMarginOfVictory, currentQuarterTeamTotals, currentHalfRaceTo3Way, alternativePointSpread, gameLinesTotal, homeTeamTotal, awayTeamTotal, currentQuarterTotal, teamTotals, getHomeTeam, getAwayTeam, matchResultAndTotal, pointSpread3Way, highestScoringHalf, halfTimeFullTime, getNextQuarterTitle, nextQuarterRaceTo, nextQuarterLines, nextQuarterBothTeamsToScore, nextQuarterHomeTeamToScore, nextQuarterAwayTeamToScore, nextQuarterHomeTeamToScore2, nextQuarterAwayTeamToScore2, nextQuarterMarginOfVictory, nextQuarterTeamTotals, currentHalfHomeTeamTotal, currentHalfAwayTeamTotal2, currentHalfAwayTeamTotal, currentHalfHomeTeamTotal2, currentHalfTotals, currentQuarterHomeTeamTotal, currentQuarterAwayTeamTotal, winningMargin, currentHalfWinningMargin, currentQuarterWinningMargin, totalBand, currentHalfDoubleChance, doubleResult, totalBand3Way, currentQuarterTotals, nextQuarterTotals } from '../mappings/mapping';
interface MarketGroupProps {
    data: any;
    active: string;
}


const BasketballMarketGroup: React.FC<MarketGroupProps> = ({ data, active }) => {

    if (!data) {
        return null
    }
    ["All", "Bet Builder", "Instant", "Team", "Quarter", "Half"]
    let oddData = {} as any;
    oddData = JSON.parse(JSON.stringify(basketballAll))
    if (active === "All") {
        {
            const obj = gameLines(data)
            var rows = obj.rows;
            oddData.gameLines.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.gameLines;
            }else{
                oddData.gameLines.rows = rows;
            }
        }
        
        {

            const obj = pointBetting(data)
            var rows = obj.rows;
            oddData.pointBetting.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.pointBetting;
            }else{
                oddData.pointBetting.currentPoints = getCurrentPoints(data);
                oddData.pointBetting.rows = rows;
            }
        }

        {
            const obj = quarterLines(data)
            var rows = obj.rows;
            oddData.currentQuarterLines.marketname = getQuarterTitle(data, oddData.currentQuarterLines.marketname)
            oddData.currentQuarterLines.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.currentQuarterLines;
            }else{
                oddData.currentQuarterLines.rows = rows;
            }
        }


        {
            const obj = nextQuarterLines(data)
            var rows = obj.rows;
            oddData.nextQuarterLines.marketname = getNextQuarterTitle(data, oddData.nextQuarterLines.marketname)
            oddData.nextQuarterLines.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.nextQuarterLines;
            }else{
                oddData.nextQuarterLines.rows = rows;
            }
        }

        {
            const obj = currentQuarterRaceTo(data)
            var rows = obj.rows;
            oddData.currentQuarterRaceTo.marketname = getQuarterTitle(data, oddData.currentQuarterRaceTo.marketname)
            oddData.currentQuarterRaceTo.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.currentQuarterRaceTo;
            }else{
                oddData.currentQuarterRaceTo.rows = rows;
            }
        }

        {
            const obj = nextQuarterRaceTo(data)
            var rows = obj.rows;
            oddData.nextQuarterRaceTo.marketname = getNextQuarterTitle(data, oddData.nextQuarterRaceTo.marketname)
            oddData.nextQuarterRaceTo.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.nextQuarterRaceTo;
            }else{
                oddData.nextQuarterRaceTo.rows = rows;
            }
        }

        {
            const obj = halfLines(data)
            var rows = obj.rows;
            oddData.currentHalfLines.marketname = getHalfTitle(data, oddData.currentHalfLines.marketname)
            oddData.currentHalfLines.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.currentHalfLines;
            }else{
                oddData.currentHalfLines.rows = rows;
            }
        }

        {
            const obj = currentHalfDoubleChance(data)
            var rows = obj.rows;
            oddData.currentHalfDoubleChance.marketname = getHalfTitle(data, oddData.currentHalfDoubleChance.marketname)
            oddData.currentHalfDoubleChance.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.currentHalfDoubleChance;
            }else{
                oddData.currentHalfDoubleChance.rows = rows;
            }
        }

        // {
        //     const obj = currentHalfRaceTo(data)
        //     var rows = obj.rows;
        //     oddData.currentHalfRaceTo.marketname = getHalfTitle(data, oddData.currentHalfRaceTo.marketname)
        //     oddData.currentHalfRaceTo.suspend = obj.suspend;
        //     if(rows.length ===0 || rows[0].length === 0){
        //         delete oddData.currentHalfRaceTo;
        //     }else{
        //         oddData.currentHalfRaceTo.rows = rows;
        //     }
        // }

        {
            const obj = currentHalfRaceTo3Way(data)
            var rows = obj.rows;
            oddData.currentHalfRaceTo3Way.marketname = getHalfTitle(data, oddData.currentHalfRaceTo3Way.marketname)
            oddData.currentHalfRaceTo3Way.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.currentHalfRaceTo3Way;
            }else{
                oddData.currentHalfRaceTo3Way.rows = rows;
            }
        }

        {
            const obj = currentHalfWinningMargin(data)
            var rows = obj.rows;
            oddData.currentHalfWinningMargin.marketname = getHalfTitle(data, oddData.currentHalfWinningMargin.marketname)
            oddData.currentHalfWinningMargin.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.currentHalfWinningMargin;
            }else{
                oddData.currentHalfWinningMargin.rows = rows;
            }
        }

        {
            const obj = matchResultAndTotal(data)
            var rows = obj.rows;
            oddData.matchResultAndTotal.marketname = getHalfTitle(data, oddData.matchResultAndTotal.marketname)
            oddData.matchResultAndTotal.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.matchResultAndTotal;
            }else{
                oddData.matchResultAndTotal.rows = rows;
            }
        }

        {
            const obj = currentQuarterBothTeamsToScore(data)
            var rows = obj.rows;
            oddData.currentQuarterBothTeamsToScore.marketname = getQuarterTitle(data, oddData.currentQuarterBothTeamsToScore.marketname)
            oddData.currentQuarterBothTeamsToScore.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.currentQuarterBothTeamsToScore;
            }else{
                oddData.currentQuarterBothTeamsToScore.rows = rows;
            }
        }

        {
            const obj = nextQuarterBothTeamsToScore(data)
            var rows = obj.rows;
            oddData.nextQuarterBothTeamsToScore.marketname = getNextQuarterTitle(data, oddData.nextQuarterBothTeamsToScore.marketname)
            oddData.nextQuarterBothTeamsToScore.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.nextQuarterBothTeamsToScore;
            }else{
                oddData.nextQuarterBothTeamsToScore.rows = rows;
            }
        }


        {
            const obj = currentQuarterHomeTeamToScore(data)
            var rows = obj.rows;
            oddData.currentQuarterHomeTeamToScore.marketname = getQuarterTitle(data, oddData.currentQuarterHomeTeamToScore.marketname)
            oddData.currentQuarterHomeTeamToScore.marketname = getHomeTeam(data, oddData.currentQuarterHomeTeamToScore.marketname)
            oddData.currentQuarterHomeTeamToScore.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.currentQuarterHomeTeamToScore;
            }else{
                oddData.currentQuarterHomeTeamToScore.rows = rows;
            }
        }

        {
            const obj = nextQuarterHomeTeamToScore(data)
            var rows = obj.rows;
            oddData.nextQuarterHomeTeamToScore.marketname = getNextQuarterTitle(data, oddData.nextQuarterHomeTeamToScore.marketname)
            oddData.nextQuarterHomeTeamToScore.marketname = getHomeTeam(data, oddData.nextQuarterHomeTeamToScore.marketname)
            oddData.nextQuarterHomeTeamToScore.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.nextQuarterHomeTeamToScore;
            }else{
                oddData.nextQuarterHomeTeamToScore.rows = rows;
            }
        }

        {
            const obj = currentQuarterAwayTeamToScore(data)
            var rows = obj.rows;
            oddData.currentQuarterAwayTeamToScore.marketname = getQuarterTitle(data, oddData.currentQuarterAwayTeamToScore.marketname)
            oddData.currentQuarterAwayTeamToScore.marketname = getAwayTeam(data, oddData.currentQuarterAwayTeamToScore.marketname)
            oddData.currentQuarterAwayTeamToScore.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.currentQuarterAwayTeamToScore;
            }else{
                oddData.currentQuarterAwayTeamToScore.rows = rows;
            }
        }

        {
            const obj = nextQuarterAwayTeamToScore(data)
            var rows = obj.rows;
            oddData.nextQuarterAwayTeamToScore.marketname = getNextQuarterTitle(data, oddData.nextQuarterAwayTeamToScore.marketname)
            oddData.nextQuarterAwayTeamToScore.marketname = getAwayTeam(data, oddData.nextQuarterAwayTeamToScore.marketname)
            oddData.nextQuarterAwayTeamToScore.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.nextQuarterAwayTeamToScore;
            }else{
                oddData.nextQuarterAwayTeamToScore.rows = rows;
            }
        }

        {
            const obj = currentQuarterWinningMargin(data)
            var rows = obj.rows;
            oddData.currentQuarterWinningMargin.marketname = getQuarterTitle(data, oddData.currentQuarterWinningMargin.marketname)
            oddData.currentQuarterWinningMargin.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.currentQuarterWinningMargin;
            }else{
                oddData.currentQuarterWinningMargin.rows = rows;
            }
        }


        {
            const obj = currentQuarterHomeTeamToScore2(data)
            var rows = obj.rows;
            if(oddData.currentQuarterHomeTeamToScore === undefined){
                oddData.currentQuarterHomeTeamToScore = JSON.parse(JSON.stringify(basketballAll.currentQuarterHomeTeamToScore));
                oddData.currentQuarterHomeTeamToScore.marketname = getQuarterTitle(data, oddData.currentQuarterHomeTeamToScore.marketname)
                oddData.currentQuarterHomeTeamToScore.marketname = getHomeTeam(data, oddData.currentQuarterHomeTeamToScore.marketname)
                oddData.currentQuarterHomeTeamToScore.suspend = obj.suspend;
                if(rows.length ===0 || rows[0].length === 0){
                    delete oddData.currentQuarterHomeTeamToScore;
                }else{
                    oddData.currentQuarterHomeTeamToScore.rows = rows;
                }

            }
        }

        {
            const obj = nextQuarterHomeTeamToScore2(data)
            var rows = obj.rows;
            if(oddData.nextQuarterHomeTeamToScore === undefined){
                oddData.nextQuarterHomeTeamToScore = JSON.parse(JSON.stringify(basketballAll.nextQuarterHomeTeamToScore));
                oddData.nextQuarterHomeTeamToScore.marketname = getNextQuarterTitle(data, oddData.nextQuarterHomeTeamToScore.marketname)
                oddData.nextQuarterHomeTeamToScore.marketname = getHomeTeam(data, oddData.nextQuarterHomeTeamToScore.marketname)
                oddData.nextQuarterHomeTeamToScore.suspend = obj.suspend;
                if(rows.length ===0 || rows[0].length === 0){
                    delete oddData.nextQuarterHomeTeamToScore;
                }else{
                    oddData.nextQuarterHomeTeamToScore.rows = rows;
                }
            }
        }

        {
            const obj = currentQuarterAwayTeamToScore2(data)
            var rows = obj.rows;
            if(oddData.currentQuarterAwayTeamToScore === undefined){
                oddData.currentQuarterAwayTeamToScore = JSON.parse(JSON.stringify(basketballAll.currentQuarterAwayTeamToScore));
                oddData.currentQuarterAwayTeamToScore.marketname = getQuarterTitle(data, oddData.currentQuarterAwayTeamToScore.marketname)
                oddData.currentQuarterAwayTeamToScore.marketname = getAwayTeam(data, oddData.currentQuarterAwayTeamToScore.marketname)
                oddData.currentQuarterAwayTeamToScore.suspend = obj.suspend;
                if(rows.length ===0 || rows[0].length === 0){
                    delete oddData.currentQuarterAwayTeamToScore;
                }else{
                    oddData.currentQuarterAwayTeamToScore.rows = rows;
                }

            }

        }


        {
            const obj = nextQuarterAwayTeamToScore2(data)
            var rows = obj.rows;
            if(oddData.nextQuarterAwayTeamToScore === undefined){
                oddData.nextQuarterAwayTeamToScore = JSON.parse(JSON.stringify(basketballAll.nextQuarterAwayTeamToScore));
                oddData.nextQuarterAwayTeamToScore.marketname = getNextQuarterTitle(data, oddData.nextQuarterAwayTeamToScore.marketname)
                oddData.nextQuarterAwayTeamToScore.marketname = getAwayTeam(data, oddData.nextQuarterAwayTeamToScore.marketname)
                oddData.nextQuarterAwayTeamToScore.suspend = obj.suspend;
                if(rows.length ===0 || rows[0].length === 0){
                    delete oddData.nextQuarterAwayTeamToScore;
                }else{
                    oddData.nextQuarterAwayTeamToScore.rows = rows;
                }
            }
        }

        {
            const obj = currentQuarterMarginOfVictory(data)
            var rows = obj.rows;
            oddData.currentQuarterMarginOfVictory.marketname = getQuarterTitle(data, oddData.currentQuarterMarginOfVictory.marketname)
            oddData.currentQuarterMarginOfVictory.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.currentQuarterMarginOfVictory;
            }else{
                oddData.currentQuarterMarginOfVictory.rows = rows;
            }
        }


        {
            const obj = nextQuarterMarginOfVictory(data)
            var rows = obj.rows;
            oddData.nextQuarterMarginOfVictory.marketname = getNextQuarterTitle(data, oddData.nextQuarterMarginOfVictory.marketname)
            oddData.nextQuarterMarginOfVictory.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.nextQuarterMarginOfVictory;
            }else{
                oddData.nextQuarterMarginOfVictory.rows = rows;
            }
        }


        {
            const obj = currentQuarterTeamTotals(data)
            var rows = obj.rows;
            oddData.currentQuarterTeamTotals.marketname = getQuarterTitle(data, oddData.currentQuarterTeamTotals.marketname)
            oddData.currentQuarterTeamTotals.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.currentQuarterTeamTotals;
            }else{
                oddData.currentQuarterTeamTotals.rows = rows;
            }
        }


        {
            const obj = nextQuarterTeamTotals(data)
            var rows = obj.rows;
            oddData.nextQuarterTeamTotals.marketname = getNextQuarterTitle(data, oddData.nextQuarterTeamTotals.marketname)
            oddData.nextQuarterTeamTotals.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.nextQuarterTeamTotals;
            }else{
                oddData.nextQuarterTeamTotals.rows = rows;
            }
        }

        {
            const obj = alternativePointSpread(data)
            var rows = obj.rows;
            oddData.alternativePointSpread.marketname = getQuarterTitle(data, oddData.alternativePointSpread.marketname)
            oddData.alternativePointSpread.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.alternativePointSpread;
            }else{
                oddData.alternativePointSpread.rows = rows;
            }
        }

        {
            const obj = gameLinesTotal(data)
            var rows = obj.rows;
            oddData.gameLinesTotal.marketname = getQuarterTitle(data, oddData.gameLinesTotal.marketname)
            oddData.gameLinesTotal.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.gameLinesTotal;
            }else{
                oddData.gameLinesTotal.rows = rows;
            }
        }


        {
            const obj = homeTeamTotal(data)
            var rows = obj.rows;
            oddData.homeTeamTotal.marketname = getQuarterTitle(data, oddData.homeTeamTotal.marketname)
            oddData.homeTeamTotal.marketname = getHomeTeam(data, oddData.homeTeamTotal.marketname)
            oddData.homeTeamTotal.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.homeTeamTotal;
            }else{
                oddData.homeTeamTotal.rows = rows;
            }
        }


        {
            const obj = awayTeamTotal(data)
            var rows = obj.rows;
            oddData.awayTeamTotal.marketname = getQuarterTitle(data, oddData.awayTeamTotal.marketname)
            oddData.awayTeamTotal.marketname = getAwayTeam(data, oddData.awayTeamTotal.marketname)
            oddData.awayTeamTotal.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.awayTeamTotal;
            }else{
                oddData.awayTeamTotal.rows = rows;
            }
        }


        {
            const obj = teamTotals(data)
            var rows = obj.rows;
            oddData.teamTotals.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.teamTotals;
            }else{
                oddData.teamTotals.rows = rows;
            }
        }


        {
            const obj = pointSpread3Way(data)
            var rows = obj.rows;
            oddData.pointSpread3Way.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.pointSpread3Way;
            }else{
                oddData.pointSpread3Way.rows = rows;
            }
        }

        {
                oddData.doubleResult = JSON.parse(JSON.stringify(basketballAll.doubleResult));
                const obj = doubleResult(data)
                var rows = obj.rows;
                oddData.doubleResult.suspend = obj.suspend;
                if(rows.length ===0 || rows[0].length === 0){
                    delete oddData.doubleResult;
                }else{
                    oddData.doubleResult.rows = rows;
                }
        }

        {
            const obj = highestScoringHalf(data)
            var rows = obj.rows;
            oddData.highestScoringHalf.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.highestScoringHalf;
            }else{
                oddData.highestScoringHalf.rows = rows;
            }
        }

        {
            const obj = totalBand3Way(data)
            var rows = obj.rows;
            oddData.totalBand3Way.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.totalBand3Way;
            }else{
                oddData.totalBand3Way.rows = rows;
            }
        }

        {
            const obj = totalBand(data)
            var rows = obj.rows;
            oddData.totalBand.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.totalBand;
            }else{
                oddData.totalBand.rows = rows;
            }
        }

        {
            const obj = currentHalfTotals(data)
            var rows = obj.rows;
            oddData.currentHalfTotals.marketname = getHalfTitle(data, oddData.currentHalfTotals.marketname)
            oddData.currentHalfTotals.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.currentHalfTotals;
            }else{
                oddData.currentHalfTotals.rows = rows;
            }
        }

        {
            const obj = currentHalfHomeTeamTotal(data)
            var rows = obj.rows;
            oddData.currentHalfHomeTeamTotals.marketname = getHalfTitle(data, oddData.currentHalfHomeTeamTotals.marketname)
            oddData.currentHalfHomeTeamTotals.marketname = getHomeTeam(data, oddData.currentHalfHomeTeamTotals.marketname)

            oddData.currentHalfHomeTeamTotals.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.currentHalfHomeTeamTotals;
            }else{
                oddData.currentHalfHomeTeamTotals.rows = rows;
            }
        }
        
        {
            if(oddData.currentHalfHomeTeamTotals === undefined){
                oddData.currentHalfHomeTeamTotals = JSON.parse(JSON.stringify(basketballAll.currentHalfHomeTeamTotals))
                const obj = currentHalfHomeTeamTotal2(data)
                var rows = obj.rows;
                oddData.currentHalfHomeTeamTotals.marketname = getHalfTitle(data, oddData.currentHalfHomeTeamTotals.marketname)
                oddData.currentHalfHomeTeamTotals.marketname = getHomeTeam(data, oddData.currentHalfHomeTeamTotals.marketname)
                oddData.currentHalfHomeTeamTotals.suspend = obj.suspend;
                if(rows.length ===0 || rows[0].length === 0){
                    delete oddData.currentHalfHomeTeamTotals;
                }else{
                    oddData.currentHalfHomeTeamTotals.rows = rows;
                }
            }
        }


        {
            const obj = currentHalfAwayTeamTotal(data)
            var rows = obj.rows;
            oddData.currentHalfAwayTeamTotals.marketname = getHalfTitle(data, oddData.currentHalfAwayTeamTotals.marketname)
            oddData.currentHalfAwayTeamTotals.marketname = getAwayTeam(data, oddData.currentHalfAwayTeamTotals.marketname)
            oddData.currentHalfAwayTeamTotals.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.currentHalfAwayTeamTotals;
            }else{
                oddData.currentHalfAwayTeamTotals.rows = rows;
            }
        }
        
        {
            if(oddData.currentHalfAwayTeamTotals === undefined){
                oddData.currentHalfAwayTeamTotals = JSON.parse(JSON.stringify(basketballAll.currentHalfAwayTeamTotals))
                const obj = currentHalfAwayTeamTotal2(data)
                var rows = obj.rows;
                oddData.currentHalfAwayTeamTotals.marketname = getHalfTitle(data, oddData.currentHalfAwayTeamTotals.marketname)
                oddData.currentHalfAwayTeamTotals.marketname = getAwayTeam(data, oddData.currentHalfAwayTeamTotals.marketname)
                oddData.currentHalfAwayTeamTotals.suspend = obj.suspend;
                if(rows.length ===0 || rows[0].length === 0){
                    delete oddData.currentHalfAwayTeamTotals;
                }else{
                    oddData.currentHalfAwayTeamTotals.rows = rows;
                }
            }
        }

        {
            const obj = currentQuarterHomeTeamTotal(data)
            var rows = obj.rows;
            oddData.currentQuarterHomeTeamTotals.marketname = getQuarterTitle(data, oddData.currentQuarterHomeTeamTotals.marketname)
            oddData.currentQuarterHomeTeamTotals.marketname = getHomeTeam(data, oddData.currentQuarterHomeTeamTotals.marketname)

            oddData.currentQuarterHomeTeamTotals.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.currentQuarterHomeTeamTotals;
            }else{
                oddData.currentQuarterHomeTeamTotals.rows = rows;
            }
        }

        {
            const obj = currentQuarterAwayTeamTotal(data)
            var rows = obj.rows;
            oddData.currentQuarterAwayTeamTotals.marketname = getQuarterTitle(data, oddData.currentQuarterAwayTeamTotals.marketname)
            oddData.currentQuarterAwayTeamTotals.marketname = getAwayTeam(data, oddData.currentQuarterAwayTeamTotals.marketname)

            oddData.currentQuarterAwayTeamTotals.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.currentQuarterAwayTeamTotals;
            }else{
                oddData.currentQuarterAwayTeamTotals.rows = rows;
            }
        }


        {
            const obj = currentQuarterTotals(data)
            var rows = obj.rows;
            oddData.currentQuarterTotals.marketname = getQuarterTitle(data, oddData.currentQuarterTotals.marketname)

            oddData.currentQuarterTotals.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.currentQuarterTotals;
            }else{
                oddData.currentQuarterTotals.rows = rows;
            }
        }

        {
            if(oddData.currentQuarterTotals === undefined){
                oddData.currentQuarterTotals = JSON.parse(JSON.stringify(basketballAll.currentQuarterTotals))
                const obj = nextQuarterTotals(data)
                var rows = obj.rows;
                oddData.currentQuarterTotals.marketname = getNextQuarterTitle(data, oddData.currentQuarterTotals.marketname)

                oddData.currentQuarterTotals.suspend = obj.suspend;
                if(rows.length ===0 || rows[0].length === 0){
                    delete oddData.currentQuarterTotals;
                }else{
                    oddData.currentQuarterTotals.rows = rows;
                }

            }
        }


        {
            const obj = oddEven(data)
            var rows = obj.rows;
            oddData.oddEven.marketname = getHalfTitle(data, oddData.oddEven.marketname)
            oddData.oddEven.marketname = getAwayTeam(data, oddData.oddEven.marketname)
            oddData.oddEven.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.oddEven;
            }else{
                oddData.oddEven.rows = rows;
            }
        }

        {
            const obj =  winningMargin(data);
            console.log("Winning Margin", obj)
            var rows = obj.rows;
            oddData.winningMargin.suspend = obj.suspend;
            if(rows.length ===0 || rows[0].length === 0){
                delete oddData.winningMargin;
            }else{
                oddData.winningMargin.rows = rows;
            }
        }
        totalBand(data);
        console.log("oddiz", data?.odds)
        console.log("period", data?.info?.period)
        //sort
        const sortedElements = Object.values(oddData).sort((a:any, b:any) => a.order - b.order);
        oddData = sortedElements;

    } else if (active === "Bet Builder") {
        oddData = basketballBetBuilder as any;
    } else if (active === "Instant") {
        oddData = basketballInstant as any;
    } else if (active === "Team") {
        oddData = basketballTeam as any;
    } else if (active === "Quarter") {
        oddData = basketballQuarter as any;
    } else if (active === "Half") {
        oddData = basketballHalf as any;
    }


    // basketballAll['gameLines'].rows = gameLines(data);
    // basketballAll['pointBetting'].currentPoints = currentPoints(data).toString();
    // basketballAll['pointBetting'].rows = pointBetting(data);
    // basketballInstant['pointBetting'].rows = pointBetting(data);

    // basketballAll['1stQuarterLines2Way'].rows = quarterLines2Way(data)
    // basketballAll['odd/Even'].rows = oddEven(data)
    // basketballBetBuilder['odd/Even'].rows = oddEven(data)
    
    // basketballAll['1stHalf'].rows = half(data);
    // basketballHalf['1stHalf'].rows = half(data)
    // basketballBetBuilder['1stHalf'].rows = half(data)

    // basketballAll['resultTotalGoals'].rows = resultTotalGoals(data)

    // console.log({basketballAll})
    return (
        <div className='w-[100%] bg-[#383838]'>
            {Object.keys(oddData).map((key, index) => {
                if((oddData[key]?.rows?.length>0) || (oddData[key]?.subtabs?.length>0)){
                    return (
                        <GroupwithHead key={index} keytag={key} data={data} active={active} odd={oddData[key]} />
                    )
                }
            })}
        </div>
    )



};

export default BasketballMarketGroup

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
