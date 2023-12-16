"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import MarketGroupBody from "../../../Structure/MarketGroupBody";
import { categoriesMapping } from "@/lib/sportsMapping";
import Chevron from "@/components/ui/icons/chevron";
import StarBorderline, {
  StarFilled,
} from "@/components/ui/icons/star-borderline";
import {
  hockeyAll,
  hockeyAsianLines,
  hockeyBetBuilder,
  hockeyScore,
} from "./datastructure";
import {
  gameLines,
  doubleChance,
  halfTimeResult,
  nthGoalMarketName,
  lastTeamToScore,
  matchGoals,
  threeWayHandicap,
  goalOddEven,
  toWin2ndHalf,
  drawNoBet,
  goalLine,
  finalScore,
  correctScore,
  halfTimeFullTime,
  resultBothTeamsToScore,
  bothTeamsToScore,
  betResult,
  betBothTeamsToScore,
  betDoubleChance,
  betMatchGoals,
  betNextGoal,
  betTeamGoals,
  betScore,
  betGoalOddEven,
  BetTeamToScoreinBothHalf,
  BetTeamToScorein2ndHalf,
  betMatchCorners,
  whenWillGameEnd,
  willMatchGoOvertime,
  exactGoals,
  homeExactGoals,
  awayExactGoals,
  doubleChance2nd,
  doubleChance3rd,
  period3Lines,
  period2Lines,
  homeTotalGoals,
  awayTotalGoals,
  teamToWinTheMostPeriods,
  winningMargin,
  homeTeamToScoreInBothHalves,
  awayTeamToScoreInBothHalves,
  raceTo,
  highestScoringPeriod,
  asianGoalLine,
  period2AsianGoalLine,
  period2TeamTotals,
  period3TeamTotals,
  period3CorrectScore,
  asianPuckLine,
  period2AsianPuckLine,
  period3AsianPuckLine,
  alternativePuckLines,
  goalScorer,
  toScore2OrMore,
  toScore3OrMore,
  _10MinWinner3Way,
  homeTeamGoalScorer,
  awayTeamGoalScorer,
} from "../mappings/mapping";

interface MarketGroupProps {
  data: any;
  active: string;
}

const HockeyMarketGroup: React.FC<MarketGroupProps> = ({ data, active }) => {
  if (!data) {
    return null;
  }
  ["All", "Same Game Parlay", "Score"];
  let oddData = {} as any;
  oddData = hockeyAll as any;
  console.log("market----", data);
  if (active === "All") {
    let gameLinesData: any = gameLines(data);
    hockeyAll.gameLines.rows = gameLinesData?.rows;
    hockeyAll.gameLines.header = gameLinesData?.header;
    let period3LinesData: any = period3Lines(data);
    hockeyAll.period3Lines.rows = period3LinesData?.rows;
    hockeyAll.period3Lines.header = period3LinesData?.header;
    let period2LinesData: any = period2Lines(data);
    hockeyAll.period2Lines.rows = period2LinesData?.rows;
    hockeyAll.period2Lines.header = period2LinesData?.header;
    let winningMarginData: any = winningMargin(data);
    hockeyAll.winningMargin.rows = winningMarginData?.rows;
    hockeyAll.winningMargin.header = winningMarginData?.header;
    let raceToData: any = raceTo(data);
    hockeyAll.raceTo.rows = raceToData?.rows;
    hockeyAll.raceTo.header = raceToData?.header;
    let asianPuckLineData: any = asianPuckLine(data);
    hockeyAll.asianPuckLine.rows = asianPuckLineData?.rows;
    hockeyAll.asianPuckLine.header = asianPuckLineData?.header;
    hockeyAll.asianPuckLine.marketname = asianPuckLineData?.marketname;
    let period2AsianPuckLineData: any = period2AsianPuckLine(data);
    hockeyAll.period2AsianPuckLine.rows = period2AsianPuckLineData?.rows;
    hockeyAll.period2AsianPuckLine.header = period2AsianPuckLineData?.header;
    hockeyAll.period2AsianPuckLine.marketname =
      period2AsianPuckLineData?.marketname;
    let period3AsianPuckLineData: any = period3AsianPuckLine(data);
    hockeyAll.period3AsianPuckLine.rows = period3AsianPuckLineData?.rows;
    hockeyAll.period3AsianPuckLine.header = period3AsianPuckLineData?.header;
    hockeyAll.period3AsianPuckLine.marketname =
      period3AsianPuckLineData?.marketname;
    let alternativePuckLinesData: any = alternativePuckLines(data);
    hockeyAll.alternativePuckLines.rows = alternativePuckLinesData?.rows;
    hockeyAll.alternativePuckLines.header = alternativePuckLinesData?.header;
    let asianGoalLineData: any = asianGoalLine(data);
    hockeyAll.asianGoalLine.rows = asianGoalLineData?.rows;
    hockeyAll.asianGoalLine.header = asianGoalLineData?.header;
    hockeyAll.asianGoalLine.marketname = asianGoalLineData?.marketname;
    let period2AsianGoalLineData: any = period2AsianGoalLine(data);
    hockeyAll.period2AsianGoalLine.rows = period2AsianGoalLineData?.rows;
    let period3CorrectScoreData: any = period3CorrectScore(data);
    hockeyAll.period3CorrectScore.rows = period3CorrectScoreData?.rows;
    let goalScorerData: any = goalScorer(data);
    hockeyAll.goalScorer.marketname = goalScorerData?.marketname;
    hockeyAll.goalScorer.rows = goalScorerData?.rows;
    let homeTeamGoalScorerData: any = homeTeamGoalScorer(data);
    hockeyAll.homeTeamGoalScorer.marketname =
      homeTeamGoalScorerData?.marketname;
    hockeyAll.homeTeamGoalScorer.rows = homeTeamGoalScorerData?.rows;
    let awayTeamGoalScorerData: any = awayTeamGoalScorer(data);
    hockeyAll.awayTeamGoalScorer.marketname =
      awayTeamGoalScorerData?.marketname;
    hockeyAll.awayTeamGoalScorer.rows = awayTeamGoalScorerData?.rows;
    hockeyAll.toScore2OrMore.rows = toScore2OrMore(data);
    hockeyAll.toScore3OrMore.rows = toScore3OrMore(data);

    // hockeyAll.period2TeamTotals.rows = period2TeamTotals(data);

    let period2TeamTotalsData: any = period2TeamTotals(data);
    hockeyAll.period2TeamTotals.rows = period2TeamTotalsData?.rows;
    hockeyAll.period2TeamTotals.header = period2TeamTotalsData?.header;

    let period3TeamTotalsData: any = period3TeamTotals(data);
    hockeyAll.period3TeamTotals.rows = period3TeamTotalsData?.rows;
    hockeyAll.period3TeamTotals.header = period3TeamTotalsData?.header;

    hockeyAll.doubleChance.rows = doubleChance(data);
    hockeyAll.halfTimeResult.rows = halfTimeResult(data);
    hockeyAll.nthGoal = nthGoalMarketName(data, hockeyAll.nthGoal);
    hockeyAll.matchGoals.rows = matchGoals(data);
    hockeyAll["3-WayHandicap"].rows = threeWayHandicap(data);
    hockeyAll.goalOddEven.rows = goalOddEven(data);
    hockeyAll.toWin2ndHalf.rows = toWin2ndHalf(data);
    hockeyAll.drawNoBet.rows = drawNoBet(data);
    hockeyAll.lastTeamToScore.rows = lastTeamToScore(data);
    hockeyAll.goalLine.rows = goalLine(data);
    hockeyAll.finalScore.rows = finalScore(data);
    hockeyAll.resultBothTeamsToScore.rows = resultBothTeamsToScore(data);
    hockeyAll.bothTeamsToScore.rows = bothTeamsToScore(data);

    hockeyAll.doubleChance2nd.rows = doubleChance2nd(data);
    hockeyAll.doubleChance3rd.rows = doubleChance3rd(data);

    hockeyAll.whenWillGameEnd.rows = whenWillGameEnd(data);
    hockeyAll.willMatchGoOvertime.rows = willMatchGoOvertime(data);
    hockeyAll.homeTeamToScoreInBothHalves.rows =
      homeTeamToScoreInBothHalves(data);
    hockeyAll.awayTeamToScoreInBothHalves.rows =
      awayTeamToScoreInBothHalves(data);
    hockeyAll.teamToWinTheMostPeriods.rows = teamToWinTheMostPeriods(data);
    hockeyAll.exactGoals.rows = exactGoals(data);
    hockeyAll.homeExactGoals = {
      ...hockeyAll.homeExactGoals,
      ...homeExactGoals(data),
    };
    hockeyAll.awayExactGoals = {
      ...hockeyAll.awayExactGoals,
      ...awayExactGoals(data),
    };
    hockeyAll.homeTotalGoals = {
      ...hockeyAll.homeTotalGoals,
      ...homeTotalGoals(data),
    };
    hockeyAll.awayTotalGoals = {
      ...hockeyAll.awayTotalGoals,
      ...awayTotalGoals(data),
    };
    hockeyAll.highestScoringPeriod.rows = highestScoringPeriod(data);
    hockeyAll._10MinWinner3Way.rows = _10MinWinner3Way(data);

    const correctScoreData: any = correctScore(data);
    hockeyAll.correctScore.rows = correctScoreData?.rows;
    hockeyAll.correctScore.header = correctScoreData?.header;

    oddData = hockeyAll as any;
    // console.log('-----hockey all-----', hockeyAll);
  } else if (active === "Bet Builder") {
    hockeyBetBuilder.result.rows = betResult(data);
    hockeyBetBuilder.bothTeamsToScore.rows = betBothTeamsToScore(data);
    hockeyBetBuilder.doubleChance.rows = betDoubleChance(data);
    hockeyBetBuilder.matchGoals = betMatchGoals(
      data,
      hockeyBetBuilder.matchGoals
    );
    hockeyBetBuilder.corners = betMatchCorners(data, hockeyBetBuilder.corners);
    hockeyBetBuilder.nextGoal.rows = betNextGoal(data);
    hockeyBetBuilder.teamGoals = betTeamGoals(data, hockeyBetBuilder.teamGoals);
    hockeyBetBuilder.score = betScore(data, hockeyBetBuilder.score);
    hockeyBetBuilder.goalOddEven.rows = betGoalOddEven(data);
    hockeyBetBuilder.teamToScorein2ndHalf.rows = BetTeamToScorein2ndHalf(data);
    hockeyBetBuilder.teamToScoreinBothHalf.rows =
      BetTeamToScoreinBothHalf(data);
    oddData = hockeyBetBuilder as any;
  } else if (active === "Asian Lines") {
    hockeyAsianLines.goalLine.rows = goalLine(data);
    oddData = hockeyAsianLines as any;
  } else if (active === "Score") {
    hockeyScore.nthGoal = nthGoalMarketName(data, hockeyScore.nthGoal);
    // hockeyScore.matchGoals.rows = matchGoals(data);
    // hockeyScore.lastTeamToScore.rows = lastTeamToScore(data);
    // hockeyScore.goalOddEven.rows = goalOddEven(data);
    oddData = hockeyScore as any;
  }

  // console.log('detail market hockey', data)

  return (
    <div className="w-[100%] bg-[#383838]">
      {Object.keys(oddData).map((key, index) => {
        if (
          oddData[key]?.rows?.length > 0 ||
          oddData[key]?.subtabs?.length > 0
        ) {
          if (oddData[key]?.subtabs?.length > 0) {
            let skip = true;
            oddData[key]?.subtabs.map((subtab: any) => {
              // console.log('subtab',subtab ,oddData[key][subtab])
              if (oddData[key][subtab] && oddData[key][subtab].length > 0) {
                skip = false;
              }
            });
            if (skip === true) {
              return null;
            }
          }
          return (
            <GroupwithHead
              key={index}
              keytag={key}
              data={data}
              active={active}
              odd={oddData[key]}
            />
          );
        }
      })}
    </div>
  );
};

export default HockeyMarketGroup;

interface GroupwithHeadProps {
  keytag: string;
  data: any;
  active: string;
  odd: any;
}

const GroupwithHead: React.FC<GroupwithHeadProps> = ({
  keytag,
  data,
  active,
  odd,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleHeight = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={"group/item fill-[white] hover:fill-brand-green-light"}>
      <div
        className={cn(
          " flex cursor-pointer pl-[30px] pr-[15px] border-t border-solid border-t-[rgba(24,153,112,.75)]",
          odd?.suspend !== "0"
            ? "text-[hsla(0,0%,100%,.3)] hover:text-[hsla(0,0%,100%,.6)] fill-[hsla(0,0%,100%,.3)] hover:fill-[hsla(0,0%,100%,.6)]"
            : "text-[white] hover:text-brand-green-light "
        )}
        onClick={() => {
          toggleHeight();
        }}
      >
        <div className={"text-base h-[50px] flex items-center font-[700]"}>
          {odd.marketname}
        </div>
        {odd?.suspend !== "0" && (
          <div
            className={
              "hidden ml-[10px] text-[12px] h-[50px] items-center font-[400] text-[hsla(0,0%,100%,.6)] group-hover/item:flex"
            }
          >
            Currently Suspended
          </div>
        )}
        <div className="ml-auto flex items-center justify-end w-[100px] h-[50px]">
          <div
            className={cn(
              "group hidden items-center justify-center w-[50px] h-[50px] group-hover/item:flex"
            )}
          >
            <div className="hidden items-center justify-center w-[20px] h-[20px] group-hover:flex">
              <StarFilled className={cn("ml-[7px] h-[13px] w-[13px]")} />
            </div>
            <div className="flex items-center justify-center w-[20px] h-[20px] group-hover:hidden">
              <StarBorderline className={cn("ml-[7px] h-[13px] w-[13px]")} />
            </div>
          </div>

          <div
            className={cn("flex items-center justify-center w-[50px] h-[50px]")}
          >
            <div
              className={cn(
                "items-center justify-center w-[20px] h-[20px]",
                isExpanded ? "hidden group-hover/item:flex" : "flex"
              )}
            >
              <Chevron className={cn("ml-[7px] h-[12px] w-[12px]")} />
            </div>
          </div>
        </div>
      </div>

      {odd?.currentCorners && (
        <div className="flex w-[100%] h-[100%] border-t-[#ffffff1a] border-t border-solid text-[hsla(0,0%,100%,.6)]">
          <div className="h-[25px] flex items-center pl-[30px]">
            Current Corners: {odd?.currentCorners}
          </div>
        </div>
      )}
      <div
        className={cn(
          "h-[100%] overflow-hidden transition-[max-height] duration-300 ease",
          isExpanded ? "max-h-[1500px]" : "max-h-[0px]"
        )}
      >
        <div className={cn("flex w-[100%] h-[100%] text-[white]")}>
          <MarketGroupBody
            data={data}
            keytag={keytag}
            active={active}
            odd={odd}
          />
        </div>
      </div>
    </div>
  );
};
