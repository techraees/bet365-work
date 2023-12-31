"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { categoriesMapping } from "@/lib/sportsMapping";
import Chevron from "@/components/ui/icons/chevron";
import StarBorderline, {
  StarFilled,
} from "@/components/ui/icons/star-borderline";
import {
  basketballMainMarkets,
  basketballBetBuilder,
  basketballMainProps,
  basketballTeamProps,
  basketballQuarterProps,
  basketballHalfProps,
} from "./mappings/datastructure";
import {
  gameLines,
  firsthalf,
  firstQ,
  secondQ,
  thirdQ,
  fourthQ,
  gameLines3Way,
  teamWithHighestScoringQuarter,
  teamTotals,
  firstQuarterTeamTotals,
  alternativeTeamTotals,
  alternativeTeamTotals2,
  alternativeFirstQuarterTeamTotals,
  firstHalfTeamTotals,
  alternativeFirstHalfTeamTotals,
  firstQuarterTeamToScoreXPoint,
  teamTotalOddEven,
  firstHalfTeamToScoreXPoint,
  alternativeFirstQuarterTotals,
  firstQuarterBothTeamsToScoreXPoints,
  firstQuarterDoubleChance,
  firstQuarterHandicapAndTotal,
  firstQuarterMarginofVictory,
  firstQuarter3WayLines,
  firstQuarterRaceToPoints,
  firstQuarterResultAndTotal,
  firstQuarterTotalOddEven,
  firstQuarterWinningMargin,
  alternativeFirstQuarterPointSpread,
  alternativeFirstHalfPointSpread,
  alternativeFirstHalfTotals,
  firstHalfWinningMargin,
  firstHalfResultAndTotal,
  firstHalfHandicapAndTotal,
  firstHalfRaceToPoints,
  firstHalfBothTeamsToScoreXPoints,
  firstHalfSpread3Way,
  firstHalfTotals3Way,
  firstHalfMoneyLine3Way,
  firstHalfDoubleChance,
  firstHalfTotalOddEven,
  alternativePointSpread,
  alternativeGameTotal,
  alternativePointSpread2,
  alternativeGameTotal2,
  resultAndBothTeamsToScoreXPoints,
  doubleResult,
  matchResultAndTotal,
  matchHandicapAndTotal,
  winningMargin,
  winningMargin3Way,
  winningMargin7Way,
  winningMargin12Way,
  raceTo20Points,
  tiedAtEndOfRegulations,
  quarterCorrectScore,
  highestScoringHalf,
  highestScoringQuarter,
  gameTotalBands8Way,
  gameTotalBands3Way,
  gameTotalOddEven,
} from "./mappings/pregamemaps";
import MarketGroupBody from "@/components/Structure/MarketGroupBody";

interface MarketGroupProps {
  data: any;
  active: string;
}

const MatchBody: React.FC<MarketGroupProps> = ({ data, active }) => {
  console.log("++++++++=", data);
  if (!data) {
    return null;
  }
  let oddData = {} as any;
  oddData = basketballMainMarkets as any;
  if (active === "Main Markets" || active === "All") {
    // console.log({ oddiez: data });
    basketballMainMarkets.gameLines.rows = gameLines(data);
    basketballMainMarkets["1stHalf"].rows = firsthalf(data);
    basketballMainMarkets["1stQuarter"].rows = firstQ(data);
    basketballMainMarkets["2ndQuarter"].rows = secondQ(data);
    basketballMainMarkets["3rdQuarter"].rows = thirdQ(data);
    basketballMainMarkets["4thQuarter"].rows = fourthQ(data);
    basketballMainMarkets["gameLines3-Way"].rows = gameLines3Way(data);
    oddData = basketballMainMarkets as any;
  } else if (active === "Bet Builder") {
    oddData = basketballBetBuilder as any;
  } else if (active === "Main Props") {
    basketballMainProps.alternativePointSpread.rows = alternativePointSpread(data);
    basketballMainProps.alternativeGameTotal.rows = alternativeGameTotal(data);
    basketballMainProps.alternativePointSpread2.rows = alternativePointSpread2(data);
    basketballMainProps.alternativeGameTotal2.rows = alternativeGameTotal2(data);
    basketballMainProps.resultAndBothTeamsToScoreXPoints.rows = resultAndBothTeamsToScoreXPoints(data);
    basketballMainProps.doubleResult.rows = doubleResult(data);
    basketballMainProps.matchResultAndTotal.rows = matchResultAndTotal(data);
    basketballMainProps.matchHandicapAndTotal.rows = matchHandicapAndTotal(data);
    basketballMainProps.winningMargin.rows = winningMargin(data);
    basketballMainProps.winningMargin3Way.rows = winningMargin3Way(data);
    basketballMainProps.winningMargin7Way.rows = winningMargin7Way(data);
    basketballMainProps.winningMargin12Way.rows = winningMargin12Way(data);
    basketballMainProps.raceTo20Points.rows = raceTo20Points(data);
    basketballMainProps.tiedAtEndOfRegulations.rows = tiedAtEndOfRegulations(data);
    basketballMainProps.quarterCorrectScore.rows = quarterCorrectScore(data);
    basketballMainProps.highestScoringHalf.rows = highestScoringHalf(data);
    basketballMainProps.highestScoringQuarter.rows = highestScoringQuarter(data);
    basketballMainProps.gameTotalBands8Way.rows = gameTotalBands8Way(data);
    basketballMainProps.gameTotalBands3Way.rows = gameTotalBands3Way(data);
    basketballMainProps.gameTotalOddEven.rows = gameTotalOddEven(data);
    oddData = basketballMainProps as any;
  } else if (active === "Team Props") {
    basketballTeamProps.teamWithHighestScoringQuarter.rows = teamWithHighestScoringQuarter(data);
    basketballTeamProps.teamTotals.rows = teamTotals(data);
    basketballTeamProps.homeAlternativeTeamTotals.rows = alternativeTeamTotals(data, "1");
    basketballTeamProps.awayAlternativeTeamTotals.rows = alternativeTeamTotals(data, "2");
    basketballTeamProps.homeAlternativeTeamTotals2.rows = alternativeTeamTotals2(data, "1");
    basketballTeamProps.awayAlternativeTeamTotals2.rows = alternativeTeamTotals2(data, "2");
    basketballTeamProps["1stQuarterTeamTotals"].rows = firstQuarterTeamTotals(data);
    basketballTeamProps.homeAlternativeFirstQuarterTeamTotals.rows = alternativeFirstQuarterTeamTotals(data, "1");
    basketballTeamProps.awayAlternativeFirstQuarterTeamTotals.rows = alternativeFirstQuarterTeamTotals(data, "2");
    basketballTeamProps["1stHalfTeamTotals"].rows = firstHalfTeamTotals(data);
    basketballTeamProps.homeAlternativeFirstHalfTeamTotals.rows = alternativeFirstHalfTeamTotals(data, "1");
    basketballTeamProps.awayAlternativeFirstHalfTeamTotals.rows = alternativeFirstHalfTeamTotals(data, "2");
    basketballTeamProps.homeFirstQuarterTeamToScoreXPoint.rows = firstQuarterTeamToScoreXPoint(data, "1");
    basketballTeamProps.awayFirstQuarterTeamToScoreXPoint.rows = firstQuarterTeamToScoreXPoint(data, "2");
    basketballTeamProps["teamTotal-Odd/Even"].rows = teamTotalOddEven(data);
    basketballTeamProps.homeFirstHalfTeamToScoreXPoint.rows = firstHalfTeamToScoreXPoint(data, "1");
    basketballTeamProps.awayFirstHalfTeamToScoreXPoint.rows = firstHalfTeamToScoreXPoint(data, "2");
    oddData = basketballTeamProps as any;
  } else if (active === "Quarter Props") {
    basketballQuarterProps.alternativeFirstQuarterPointSpread.rows = alternativeFirstQuarterPointSpread(data);
    basketballQuarterProps.homeAlternativeFirstQuarterTeamTotals.rows = alternativeFirstQuarterTeamTotals(data, "1");
    basketballQuarterProps.awayAlternativeFirstQuarterTeamTotals.rows = alternativeFirstQuarterTeamTotals(data, "2");
    basketballQuarterProps.alternativeFirstQuarterTotals.rows = alternativeFirstQuarterTotals(data);
    basketballQuarterProps["1stQuarterBothTeamsToScoreXPoints"].rows = firstQuarterBothTeamsToScoreXPoints(data);
    basketballQuarterProps["1stQuarterDoubleChance"].rows = firstQuarterDoubleChance(data);
    basketballQuarterProps["1stQuarterHandicapAndTotal"].rows = firstQuarterHandicapAndTotal(data);
    basketballQuarterProps["1stQuarterMarginofVictory"].rows = firstQuarterMarginofVictory(data);
    basketballQuarterProps["1stQuarter3WayLines"].rows = firstQuarter3WayLines(data);
    basketballQuarterProps["1stQuarterRaceToPoints"].rows = firstQuarterRaceToPoints(data);
    basketballQuarterProps["1stQuarterResultAndTotal"].rows = firstQuarterResultAndTotal(data);
    basketballQuarterProps["1stQuarterTeamTotals"].rows = firstQuarterTeamTotals(data);
    basketballQuarterProps.homeFirstQuarterTeamToScoreXPoint.rows = firstQuarterTeamToScoreXPoint(data, "1");
    basketballQuarterProps.awayFirstQuarterTeamToScoreXPoint.rows = firstQuarterTeamToScoreXPoint(data, "2");
    basketballQuarterProps["1stQuarterTotal-Odd/Even"].rows = firstQuarterTotalOddEven(data);
    basketballQuarterProps["1stQuarterWinningMargin"].rows = firstQuarterWinningMargin(data);
    oddData = basketballQuarterProps as any;
  } else if (active === "Half Props") {
    basketballHalfProps["1stHalfTeamTotals"].rows = firstHalfTeamTotals(data);
    basketballHalfProps.homeAlternativeFirstHalfTeamTotals.rows = alternativeFirstHalfTeamTotals(data, "1");
    basketballHalfProps.awayAlternativeFirstHalfTeamTotals.rows = alternativeFirstHalfTeamTotals(data, "2");
    basketballHalfProps.alternativeFirstHalfPointSpread.rows = alternativeFirstHalfPointSpread(data);
    basketballHalfProps.alternativeFirstHalfTotals.rows = alternativeFirstHalfTotals(data);
    basketballHalfProps["1stHalfWinningMargin"].rows = firstHalfWinningMargin(data);
    basketballHalfProps["1stHalfResultAndTotal"].rows = firstHalfResultAndTotal(data);
    basketballHalfProps["1stHalfHandicapAndTotal"].rows = firstHalfHandicapAndTotal(data);
    basketballHalfProps["1stHalfRaceToPoints"].rows = firstHalfRaceToPoints(data);
    basketballHalfProps["1stHalfBothTeamsToScoreXPoints"].rows = firstHalfBothTeamsToScoreXPoints(data);
    basketballHalfProps.homeFirstHalfTeamToScoreXPoint.rows = firstHalfTeamToScoreXPoint(data, "1");
    basketballHalfProps.awayFirstHalfTeamToScoreXPoint.rows = firstHalfTeamToScoreXPoint(data, "2");
    basketballHalfProps["1stHalfSpread3-Way"].rows = firstHalfSpread3Way(data);
    basketballHalfProps["1stHalfTotals3-Way"].rows = firstHalfTotals3Way(data);
    basketballHalfProps["1stHalfMoneyLine3-Way"].rows = firstHalfMoneyLine3Way(data);
    basketballHalfProps["1stHalfDoubleChance"].rows = firstHalfDoubleChance(data);
    basketballHalfProps["1stHalfTotalOdd/Even"].rows = firstHalfTotalOddEven(data);
    oddData = basketballHalfProps as any;
  }

  console.log("detail market basketball", oddData);

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
