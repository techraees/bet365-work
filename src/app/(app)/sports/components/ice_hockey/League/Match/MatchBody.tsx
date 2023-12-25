"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { categoriesMapping } from "@/lib/sportsMapping";
import Chevron from "@/components/ui/icons/chevron";
import StarBorderline, {
  StarFilled,
} from "@/components/ui/icons/star-borderline";
import {
  hockeyMain,
  hockeyBetBuilder,
  hockeyGames,
  hockeyPlayer,
  hockeySet,
} from "./mappings/datastructure";
import {
  toWinMatch,
  matchHandicapGames,
  totalGames2Way,
  setBetting,
  firstSetWinner,
  firstSetTotalGames,
  firstSetScore,
  matchResultAndTotalGames,
  homeAwayTo,
  totalGamesInSet,
  firstHomeAwayServiceGameWinners,
  firstHomeAwayServiceGameScore,
  firstHomeAwayServiceGameToWinTo,
  goTheDistance,
  firstSethandicap,
  firstSetCorrectScoreGroup,
  firstSetScoreAnyPlayer,
  firstSetPlayerToBreakServe,
  firstBreakOfServe,
  firstHomeAwayServiceGameYesNo,
  firstHomeAwayServiceGameTotalPoints,
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
  let oddData = {} as any;
  oddData = hockeyMain as any;
  if (active === "Main" || active === "All") {
    hockeyMain.toWinMatch.rows = toWinMatch(data);
    hockeyMain.matchHandicapGames.rows = matchHandicapGames(data);
    hockeyMain["totalGames2-Way"].rows = totalGames2Way(data);
    hockeyMain.setBetting.rows = setBetting(data);
    hockeyMain.firstSetWinner.rows = firstSetWinner(data);
    hockeyMain["1stSetTotalGames"].rows = firstSetTotalGames(data);
    hockeyMain.firstSetScore.rows = firstSetScore(data);
    hockeyMain.matchResultAndTotalGames.rows = matchResultAndTotalGames(data);
    hockeyMain.homeTo = homeAwayTo(data, hockeyMain.homeTo, "home");
    hockeyMain.awayTo = homeAwayTo(data, hockeyMain.awayTo, "away");
    hockeyMain[
      "firstHomeServiceGame-Winners"
    ] = firstHomeAwayServiceGameWinners(
      data,
      hockeyMain["firstHomeServiceGame-Winners"],
      "home"
    );
    hockeyMain[
      "firstAwayServiceGame-Winners"
    ] = firstHomeAwayServiceGameWinners(
      data,
      hockeyMain["firstAwayServiceGame-Winners"],
      "away"
    );
    hockeyMain["firstHomeServiceGame-Score"] = firstHomeAwayServiceGameScore(
      data,
      hockeyMain["firstHomeServiceGame-Score"],
      "home"
    );
    hockeyMain["firstAwayServiceGame-Score"] = firstHomeAwayServiceGameScore(
      data,
      hockeyMain["firstAwayServiceGame-Score"],
      "away"
    );
    hockeyMain[
      "firstHomeServiceGame-ToWinTo"
    ] = firstHomeAwayServiceGameToWinTo(
      data,
      hockeyMain["firstHomeServiceGame-ToWinTo"],
      "home"
    );
    hockeyMain[
      "firstAwayServiceGame-ToWinTo"
    ] = firstHomeAwayServiceGameToWinTo(
      data,
      hockeyMain["firstAwayServiceGame-ToWinTo"],
      "away"
    );
    hockeyMain.goTheDistance.rows = goTheDistance(data);
    oddData = hockeyMain as any;
  } else if (active === "Bet Builder") {
    // hockeyBetBuilder.result.rows = betResult(data);
    // hockeyBetBuilder.bothTeamsToScore.rows = betBothTeamsToScore(data);
    // hockeyBetBuilder.doubleChance.rows = betDoubleChance(data);
    // hockeyBetBuilder.halftimeFulltime.rows = bethalftimeFulltime(data);
    // hockeyBetBuilder.score = betScore(data, hockeyBetBuilder.score);
    // hockeyBetBuilder.halfWithMostGoals.rows = bethalfWithMostGoals(data);
    // hockeyBetBuilder.teamSpecials.rows = betteamSpecials(data);
    // hockeyBetBuilder.goalOddEven.rows = betGoalOddEven(data);
    // hockeyBetBuilder.setBetting.rows = setBetting(data);
    // hockeyBetBuilder.totalGamesInSet = totalGamesInSet(data, hockeyBetBuilder.totalGamesInSet);
    oddData = hockeyBetBuilder as any;
  } else if (active === "Set") {
    hockeySet.firstSetWinner.rows = firstSetWinner(data);
    hockeySet.setBetting.rows = setBetting(data);
    hockeySet["1stSetTotalGames"].rows = firstSetTotalGames(data);
    hockeySet.firstSetScore.rows = firstSetScore(data);
    hockeySet.firstSethandicap.rows = firstSethandicap(data);
    hockeySet.firstSetCorrectScoreGroup.rows = firstSetCorrectScoreGroup(data);
    hockeySet.firstSetScoreAnyPlayer.rows = firstSetScoreAnyPlayer(data);
    hockeySet.firstSetPlayerToBreakServe.rows = firstSetPlayerToBreakServe(
      data
    );
    oddData = hockeySet as any;
  } else if (active === "Goals") {
    hockeyGames.matchHandicapGames.rows = matchHandicapGames(data);
    hockeyGames["totalGames2-Way"].rows = totalGames2Way(data);
    hockeyGames["1stSetTotalGames"].rows = firstSetTotalGames(data);
    hockeyGames.firstBreakOfServe.rows = firstBreakOfServe(data);
    hockeyGames.matchResultAndTotalGames.rows = matchResultAndTotalGames(data);
    oddData = hockeyGames as any;
  } else if (active === "Player") {
    hockeyPlayer.firstSetPlayerToBreakServe.rows = firstSetPlayerToBreakServe(
      data
    );
    hockeyPlayer.homeTo = homeAwayTo(data, hockeyPlayer.homeTo, "home");
    hockeyPlayer.awayTo = homeAwayTo(data, hockeyPlayer.awayTo, "away");
    hockeyPlayer[
      "firstHomeServiceGame-Winners"
    ] = firstHomeAwayServiceGameWinners(
      data,
      hockeyPlayer["firstHomeServiceGame-Winners"],
      "home"
    );
    hockeyPlayer[
      "firstAwayServiceGame-Winners"
    ] = firstHomeAwayServiceGameWinners(
      data,
      hockeyPlayer["firstAwayServiceGame-Winners"],
      "away"
    );
    hockeyPlayer["firstHomeServiceGame-Score"] = firstHomeAwayServiceGameScore(
      data,
      hockeyPlayer["firstHomeServiceGame-Score"],
      "home"
    );
    hockeyPlayer["firstAwayServiceGame-Score"] = firstHomeAwayServiceGameScore(
      data,
      hockeyPlayer["firstAwayServiceGame-Score"],
      "away"
    );
    hockeyPlayer[
      "firstHomeServiceGame-ToWinTo"
    ] = firstHomeAwayServiceGameToWinTo(
      data,
      hockeyPlayer["firstHomeServiceGame-ToWinTo"],
      "home"
    );
    hockeyPlayer[
      "firstAwayServiceGame-ToWinTo"
    ] = firstHomeAwayServiceGameToWinTo(
      data,
      hockeyPlayer["firstAwayServiceGame-ToWinTo"],
      "away"
    );
    hockeyPlayer["firstHomeServiceGame-Yes/No"] = firstHomeAwayServiceGameYesNo(
      data,
      hockeyPlayer["firstHomeServiceGame-Yes/No"],
      "home"
    );
    hockeyPlayer["firstAwayServiceGame-Yes/No"] = firstHomeAwayServiceGameYesNo(
      data,
      hockeyPlayer["firstAwayServiceGame-Yes/No"],
      "away"
    );
    hockeyPlayer[
      "firstHomeServiceGame-TotalPoints"
    ] = firstHomeAwayServiceGameTotalPoints(
      data,
      hockeyPlayer["firstHomeServiceGame-TotalPoints"],
      "home"
    );
    hockeyPlayer[
      "firstAwayServiceGame-TotalPoints"
    ] = firstHomeAwayServiceGameTotalPoints(
      data,
      hockeyPlayer["firstAwayServiceGame-TotalPoints"],
      "away"
    );

    oddData = hockeyPlayer as any;
  }

  console.log("detail market hockey", oddData);

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
