"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { categoriesMapping } from "@/lib/sportsMapping";
import Chevron from "@/components/ui/icons/chevron";
import StarBorderline, {
  StarFilled,
} from "@/components/ui/icons/star-borderline";
import {
  soccerAll,
  soccerAsianLines,
  soccerBetBuilder,
  soccerCornersCards,
  soccerGoals,
  soccerHalf,
  soccerMinutes,
  soccerSpecials,
} from "./mappings/datastructure";
import {
  fulltimeResult,
  doubleChance,
  goalsOverUnderOV,
  correctScore,
  handicapResult,
  alternativeHandicapResult,
  minuteResult,
  first10Minutes,
  toScoreaPenalty,
  toMissaPenalty,
  bethalftimeFulltime,
  betScore,
  bethalfWithMostGoals,
  betteamSpecials,
  alternativetotalGoals,
  resultTotalGoals,
  totalGoalsBothTeamsToScore,
  exactTotalGoals,
  numberOfGoalsInMatch,
  goalOddEven,
  bothTeamsToScoreHalf,
  cleanSheet,
  teamTotalGoals,
  teamExactGoals,
  winningMargin,
  timeOfFirstTeamGoal,
  teamOddEvenGoals,
  halfTimeResult,
  nthGoalMarketName,
  lastTeamToScore,
  alternativematchGoals,
  matchGoals,
  asianHandicap,
  threeWayHandicap,
  toWin2ndHalf,
  drawNoBet,
  goalLine,
  finalScore,
  halfTimeCorrectScore,
  halfTimeFullTime,
  halftimeFulltimeCorrectScore,
  firstHalfAsianHandicap,
  firstHalfGoalLine,
  exactFirstHalfGoals,
  firstTeamToScore,
  firstGoalMethod,
  earlyGoal,
  lateGoal,
  timeOfFirstGoalBrackets,
  firstHalfHandicap,
  resultBothTeamsToScore,
  bothTeamsToScore,
  teamsToScore,
  firstHalfGoals,
  totalGoalMinutes,
  asianTotalCorners,
  asianHandicapCorners,
  firstHalfAsianCorners,
  secondHalfGoals,
  exactSecondHalfGoals,
  halfWithMostGoals,
  teamHighestScoringHalf,
  cornerRace,
  corners,
  twoWayCorners,
  toQualify,
  twoCellTitleValue,
  betResult,
  betBothTeamsToScore,
  betDoubleChance,
  betMatchGoals,
  betNextGoal,
  betTeamGoals,
  betGoalOddEven,
  BetTeamToScoreinBothHalf,
  BetTeamToScorein2ndHalf,
  betMatchCorners,
  firsthalfgoalOddEven,
  halfTimeDoubleChance,
  halfTimeResultBothTeamsToScore,
  totalCorners3Way,
  goalscorers,
  alternativeAsianHandicap,
  alternativeGoalLine,
  alternativeFirstHalfAsianHandicap,
  alternativeFirstHalfGoalLine,
} from "./mappings/pregamemaps";
import MarketGroupBody from "@/components/Structure/MarketGroupBody";

interface MarketGroupProps {
  data: any;
  active: string;
}

const MatchBody: React.FC<MarketGroupProps> = ({ data, active }) => {
  if (!data) {
    return null;
  }
  console.log("+++++++++++", data);
  let oddData = {} as any;
  oddData = soccerAll as any;
  if (active === "Popular" || active === "All") {
    soccerAll.fulltimeResult.rows = fulltimeResult(data);
    soccerAll.doubleChance.rows = doubleChance(data);
    soccerAll.goalsOverUnder.rows = goalsOverUnderOV(data);
    soccerAll.bothTeamsToScore.rows = bothTeamsToScore(data);
    soccerAll.resultBothTeamsToScore.rows = resultBothTeamsToScore(data);
    soccerAll.correctScore.rows = correctScore(data);
    soccerAll.halfTimeFullTime.rows = halfTimeFullTime(data);
    soccerAll.halfTimeCorrectScore.rows = halftimeFulltimeCorrectScore(data);
    soccerAll.asianHandicap.rows = asianHandicap(data);
    soccerAll.goalLine.rows = goalLine(data);
    soccerAll.drawNoBet.rows = drawNoBet(data);
    soccerAll.handicapResult.rows = handicapResult(data);
    soccerAll.alternativeHandicapResult.rows = alternativeHandicapResult(data);
    soccerAll.totalCorners3way.rows = totalCorners3Way(data);
    soccerAll.goalscorers.rows = goalscorers(data);

    console.log("__________-", soccerAll);
    oddData = soccerAll as any;
  } else if (active === "Bet Builder") {
    // soccerBetBuilder.result.rows = betResult(data);
    // soccerBetBuilder.bothTeamsToScore.rows = betBothTeamsToScore(data);
    // soccerBetBuilder.doubleChance.rows = betDoubleChance(data);
    // soccerBetBuilder.halftimeFulltime.rows = bethalftimeFulltime(data);
    // soccerBetBuilder.score = betScore(data, soccerBetBuilder.score);
    // soccerBetBuilder.halfWithMostGoals.rows = bethalfWithMostGoals(data);
    // soccerBetBuilder.teamSpecials.rows = betteamSpecials(data);
    // soccerBetBuilder.goalOddEven.rows = betGoalOddEven(data);
    oddData = soccerBetBuilder as any;
  } else if (active === "Asian Lines") {
    soccerAsianLines.asianHandicap.rows = asianHandicap(data);
    soccerAsianLines.goalLine.rows = goalLine(data);
    soccerAsianLines.alternativeAsianHandicap.rows = alternativeAsianHandicap(
      data
    );
    soccerAsianLines.alternativeGoalLine.rows = alternativeGoalLine(data);
    soccerAsianLines.firstHalfAsianHandicap.rows = firstHalfAsianHandicap(data);
    soccerAsianLines.firstHalfGoalLine.rows = firstHalfGoalLine(data);
    soccerAsianLines.alternativeFirstHalfAsianHandicap.rows = alternativeFirstHalfAsianHandicap(
      data
    );
    soccerAsianLines.alternativeFirstHalfGoalLine.rows = alternativeFirstHalfGoalLine(
      data
    );
    soccerAsianLines.asianTotalCorners.rows = asianTotalCorners(
      data
    );
    soccerAsianLines.asianHandicapCorners.rows = asianHandicapCorners(
      data
    );
    soccerAsianLines.firstHalfAsianCorners.rows = firstHalfAsianCorners(
      data
    );
    oddData = soccerAsianLines as any;
  } else if (active === "Goals") {
    soccerGoals.goalsOverUnder.rows = goalsOverUnderOV(data);
    soccerGoals.alternativetotalGoals.rows = alternativetotalGoals(data);
    soccerGoals.resultTotalGoals.rows = resultTotalGoals(data);
    soccerGoals.totalGoalsBothTeamsToScore.rows = totalGoalsBothTeamsToScore(data);
    soccerGoals.exactTotalGoals.rows = exactTotalGoals(data);
    soccerGoals.numberOfGoalsInMatch.rows = numberOfGoalsInMatch(data);
    soccerGoals.bothTeamsToScore.rows = bothTeamsToScore(data);
    soccerGoals.teamsToScore.rows = teamsToScore(data);
    soccerGoals.bothTeamsToScoreIn1stHalf.rows = bothTeamsToScoreHalf(
      data,
      "1",
    );
    soccerGoals.bothTeamsToScoreIn2ndHalf.rows = bothTeamsToScoreHalf(
      data,
      "2",
    );
    soccerGoals.firstHalfGoals.rows = firstHalfGoals(data);
    soccerGoals.exactFirstHalfGoals.rows = exactFirstHalfGoals(data);
    soccerGoals.totalGoalMinutes.rows = totalGoalMinutes(data);
    soccerGoals.firstTeamToScore.rows = firstTeamToScore(data);
    soccerGoals.firstGoalMethod.rows = firstGoalMethod(data);
    soccerGoals.earlyGoal.rows = earlyGoal(data);
    soccerGoals.lateGoal.rows = lateGoal(data);
    soccerGoals.timeOfFirstGoalBrackets.rows = timeOfFirstGoalBrackets(data);
    soccerGoals.secondHalfGoals.rows = secondHalfGoals(data);
    soccerGoals.exactSecondHalfGoals.rows = exactSecondHalfGoals(data);
    soccerGoals.halfWithMostGoals.rows = halfWithMostGoals(data);
    soccerGoals.homeTeamHighestScoringHalf.rows = teamHighestScoringHalf(data, "1");
    soccerGoals.awayTeamHighestScoringHalf.rows = teamHighestScoringHalf(data, "2");
    soccerGoals.cleanSheet.rows = cleanSheet(data);
    soccerGoals.teamTotalGoals.rows = teamTotalGoals(data);
    soccerGoals.homeTeamExactGoals.rows = teamExactGoals(data, "1");
    soccerGoals.awayTeamExactGoals.rows = teamExactGoals(data, "2");
    soccerGoals.winningMargin.rows = winningMargin(data);
    soccerGoals.timeOfFirstTeamGoal.rows = timeOfFirstTeamGoal(data);
    soccerGoals.goalOddEven.rows = goalOddEven(data);
    soccerGoals.homeTeamOddEvenGoals.rows = teamOddEvenGoals(data, "1");
    soccerGoals.awayTeamOddEvenGoals.rows = teamOddEvenGoals(data, "2");
    soccerGoals.firstHalfGoalsOddEven.rows = firsthalfgoalOddEven(data);
    soccerGoals.lastTeamtoScore.rows = lastTeamToScore(data);
    soccerGoals.first10Minutes.rows = first10Minutes(data);
    oddData = soccerGoals as any;
  } else if (active === "Half") {
    // soccerHalf.halfTimeResult.rows = halfTimeResult(data);
    // soccerHalf.halfTimeDoubleChance.rows = halfTimeDoubleChance(data);
    // soccerHalf.halfTimeResultBothTeamsToScore.rows =
    //   halfTimeResultBothTeamsToScore(data);
    // soccerHalf.halfTimeCorrectScore.rows = halfTimeCorrectScore(data);
    // soccerHalf.bothTeamsToScorein1stHalf.rows = bothTeamsToScoreHalf(data, "1");
    // soccerHalf.bothTeamsToScorein2ndHalf.rows = bothTeamsToScoreHalf(data, "2");
    // soccerHalf.firstHalfAsianHandicap.rows = firstHalfAsianHandicap(data, true);
    // soccerHalf.firstHalfGoalLine.rows = firstHalfGoalLine(data, true);
    // soccerHalf.alternativeFirstHalfAsianHandicap.rows =
    //   firstHalfAsianHandicap(data);
    // soccerHalf.alternativeFirstHalfGoalLine.rows = firstHalfGoalLine(data);
    // oddData = soccerHalf as any;
  } else if (active === "Specials") {
    // soccerSpecials.specials.rows = betteamSpecials(data);
    // soccerSpecials.toScoreaPenalty.rows = toScoreaPenalty(data);
    // soccerSpecials.toMissaPenalty.rows = toMissaPenalty(data);
    // oddData = soccerSpecials as any;
  } else if (active === "Minutes") {
    // soccerMinutes["10MinuteResult"].rows = minuteResult(data);
    // soccerMinutes.first10Minutes.rows = first10Minutes(data);
    // oddData = soccerMinutes as any;
  }

  // console.log("detail market soccer", data);

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
              // console.log("subtab", subtab, oddData[key][subtab]);
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

export default MatchBody;

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
          isExpanded ? "max-h-[3000px]" : "max-h-[0px]"
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
