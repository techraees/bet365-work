"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import MarketGroupBody from "../../../Structure/MarketGroupBody";
import { categoriesMapping } from "@/lib/sportsMapping";
import {
  tennisAll,
  tennisBetBuilder,
  tennisGames,
  tennisPlayer,
  tennisSet,
} from "./datastructure";
import Chevron from "@/components/ui/icons/chevron";
import StarBorderline, {
  StarFilled,
} from "@/components/ui/icons/star-borderline";
import {
  correctScoreCurrentSet,
  correctScoreCurrentSetAnyPlayer,
  correctScoreCurrentSetAnyPlayerDrawBack,
  currectSetCorrectScoreGroup,
  currentSetScoreAfter4Games,
  currentSetToBreakServe,
  gameScore,
  gameScoreAfter2Points,
  gameScoreAfter3Points,
  gameScoreAfter4Points,
  gameToDeuce,
  gameTotalPoints,
  gameWinner,
  getGameTitle,
  getNextGameTitle,
  getSetTitle,
  goTheDistance,
  leadAfterCurrentSet,
  nextGameScore,
  nextGameScoreAfter2Points,
  nextGameScoreAfter3Points,
  nextGameScoreAfter4Points,
  nextGameToDeuce,
  nextGameToHaveBreakpoint,
  nextGameTotalPoints,
  nextGameWinner,
  nextPointWinner,
  nextToGamesEitherGameToDeuce,
  nextTwoGamesWinner,
  overUnderCurrentSet,
  pointWinner,
  raceToCurrentSet,
  raceToGamesCurrentSet,
  toWin,
  totalGamesInCurrentSet,
  matchOddEven,
  nextSetHandicap,
  currentSetHandicap,
  getNextSetTitle,
  totalSets,
  playersOverUnder,
  setBetting,
  totalGamesInMatch,
  player1To,
  currentSetLeadAfter,
  nextSetLeadAfter,
  nextSetRaceTo,
  currentSetRaceTo,
  currentSetLeadAfter2,
  matchHandicap,
  nextSetWinner,
  currectSetCorrectScoreGroup2,
  doubleResult,
  matchResultAndTotalGames,
  nextSetCorrectScoreGroup,
  correctScoreNextSetAnyPlayer,
  correctScoreNextSetAnyPlayerDrawBack,
  currentSetTieBreakTotalPoints,
  currentSetTieBreakWinner,
  currentSetTieBreakScore,
  correctScoreCurrentSet2,
  nextSetToBreakServe,
  pointBetting,
  currentSetScoreAfter6Games,
  nextSetScoreAfter4Games,
  nextSetScoreAfter6Games,
  setBetting2,
  player2To,
  getPlayer1Name,
  getPlayer2Name,
} from "./mappings/mapping";
// import { matchHandicapGames } from '@/app/sports/components/tennis/League/Match/mappings/pregamemaps';
interface MarketGroupProps {
  data: any;
  active: string;
}

const TennisMarketGroup: React.FC<MarketGroupProps> = ({ data, active }) => {
  if (!data) {
    return null;
  }
  let oddData = [] as any;
  if (active === "All") {
    oddData = JSON.parse(JSON.stringify(tennisAll)) as any;
    {
      const obj = toWin(data);
      var rows = obj.rows;
      console.log("rra", rows);
      oddData.toWin.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.toWin;
      } else {
        oddData.toWin.rows = rows;
      }
    }

    {
      oddData.pointBetting.marketname = getGameTitle(
        data,
        oddData.pointBetting.marketname
      );
      const obj = pointBetting(data);
      var rows = obj.rows;
      oddData.pointBetting.rows = rows;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.pointBetting;
      } else {
        oddData.pointBetting.rows = rows;
      }
    }

    {
      oddData.nthGameWinner.marketname = getGameTitle(
        data,
        oddData.nthGameWinner.marketname
      );
      const obj = gameWinner(data);
      var rows = obj.rows;
      console.log("rra", rows);
      oddData.nthGameWinner.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nthGameWinner;
      } else {
        oddData.nthGameWinner.rows = rows;
      }
    }

    {
      oddData.nthGameToDeuce.marketname = getGameTitle(
        data,
        oddData.nthGameToDeuce.marketname
      );
      const obj = gameToDeuce(data);
      var rows = obj.rows;
      console.log("rra", rows);
      oddData.nthGameToDeuce.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nthGameToDeuce;
      } else {
        oddData.nthGameToDeuce.rows = rows;
      }
    }

    {
      oddData.nthGameScore.marketname = getGameTitle(
        data,
        oddData.nthGameScore.marketname
      );
      const obj = gameScore(data);
      var rows = obj.rows;
      console.log("rra", rows);
      oddData.nthGameScore.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nthGameScore;
      } else {
        oddData.nthGameScore.rows = rows;
      }
    }

    {
      oddData.iPointWinnerNthGame.marketname = getGameTitle(
        data,
        oddData.iPointWinnerNthGame.marketname
      );
      const obj = pointWinner(data);
      var rows = obj.rows;
      oddData.iPointWinnerNthGame.suspend = obj.suspend;
      var rows = obj.rows;
      console.log("rra", rows);
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.iPointWinnerNthGame;
      } else {
        oddData.iPointWinnerNthGame.rows = rows;
      }
    }

    {
      oddData.nextNthGameWinner.marketname = getNextGameTitle(
        data,
        oddData.nextNthGameWinner.marketname
      );
      const obj = nextGameWinner(data);
      var rows = obj.rows;
      console.log("rra", rows);
      oddData.nextNthGameWinner.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nextNthGameWinner;
      } else {
        oddData.nextNthGameWinner.rows = rows;
      }
    }

    {
      oddData.nextNthGameToDeuce.marketname = getNextGameTitle(
        data,
        oddData.nextNthGameToDeuce.marketname
      );
      const obj = nextGameToDeuce(data);
      var rows = obj.rows;
      console.log("rra", rows);
      oddData.nextNthGameToDeuce.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nextNthGameToDeuce;
      } else {
        oddData.nextNthGameToDeuce.rows = rows;
      }
    }
    {
      oddData.nextNthGameScore.marketname = getNextGameTitle(
        data,
        oddData.nextNthGameScore.marketname
      );
      const obj = nextGameScore(data);
      var rows = obj.rows;
      console.log("rra", rows);
      oddData.nextNthGameScore.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nextNthGameScore;
      } else {
        oddData.nextNthGameScore.rows = rows;
      }
    }
    {
      oddData.iPointWinnerNextNthGame.marketname = getNextGameTitle(
        data,
        oddData.iPointWinnerNextNthGame.marketname
      );
      const obj = nextPointWinner(data);
      var rows = obj.rows;
      console.log("rra", rows);
      oddData.iPointWinnerNextNthGame.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.iPointWinnerNextNthGame;
      } else {
        oddData.iPointWinnerNextNthGame.rows = rows;
      }
    }

    {
      oddData.nthGameScoreAfter2Points.marketname = getGameTitle(
        data,
        oddData.nthGameScoreAfter2Points.marketname
      );
      const obj = gameScoreAfter2Points(data);
      var rows = obj.rows;
      console.log("wtf", rows);
      oddData.nthGameScoreAfter2Points.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nthGameScoreAfter2Points;
      } else {
        oddData.nthGameScoreAfter2Points.rows = rows;
      }
    }

    {
      oddData.nthGameScoreAfter3Points.marketname = getGameTitle(
        data,
        oddData.nthGameScoreAfter3Points.marketname
      );
      const obj = gameScoreAfter3Points(data);
      var rows = obj.rows;
      console.log("rra", rows);
      oddData.nthGameScoreAfter3Points.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nthGameScoreAfter3Points;
      } else {
        oddData.nthGameScoreAfter3Points.rows = rows;
      }
    }

    {
      oddData.nthGameScoreAfter4Points.marketname = getGameTitle(
        data,
        oddData.nthGameScoreAfter4Points.marketname
      );
      const obj = gameScoreAfter4Points(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.nthGameScoreAfter4Points.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nthGameScoreAfter4Points;
      } else {
        oddData.nthGameScoreAfter4Points.rows = rows;
      }
    }

    {
      oddData.currentGameTotalPoints.marketname = getGameTitle(
        data,
        oddData.currentGameTotalPoints.marketname
      );
      const obj = gameTotalPoints(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.currentGameTotalPoints.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.currentGameTotalPoints;
      } else {
        oddData.currentGameTotalPoints.rows = rows;
      }
    }

    {
      oddData.nextNthGameScoreAfter2Points.marketname = getNextGameTitle(
        data,
        oddData.nextNthGameScoreAfter2Points.marketname
      );
      const obj = nextGameScoreAfter2Points(data);
      var rows = obj.rows;
      console.log("rra", rows);
      oddData.nextNthGameScoreAfter2Points.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nextNthGameScoreAfter2Points;
      } else {
        oddData.nextNthGameScoreAfter2Points.rows = rows;
      }
    }

    {
      oddData.nextNthGameScoreAfter3Points.marketname = getNextGameTitle(
        data,
        oddData.nextNthGameScoreAfter3Points.marketname
      );
      const obj = nextGameScoreAfter3Points(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.nextNthGameScoreAfter3Points.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nextNthGameScoreAfter3Points;
      } else {
        oddData.nextNthGameScoreAfter3Points.rows = rows;
      }
    }

    {
      oddData.nextNthGameScoreAfter4Points.marketname = getNextGameTitle(
        data,
        oddData.nextNthGameScoreAfter4Points.marketname
      );
      const obj = nextGameScoreAfter4Points(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.nextNthGameScoreAfter4Points.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nextNthGameScoreAfter4Points;
      } else {
        oddData.nextNthGameScoreAfter4Points.rows = rows;
      }
    }

    {
      oddData.nextGameTotalPoints.marketname = getNextGameTitle(
        data,
        oddData.nextGameTotalPoints.marketname
      );
      const obj = nextGameTotalPoints(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.nextGameTotalPoints.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nextGameTotalPoints;
      } else {
        oddData.nextGameTotalPoints.rows = rows;
      }
    }

    {
      oddData.nextGameToHaveBreakpoint.marketname = getNextGameTitle(
        data,
        oddData.nextGameToHaveBreakpoint.marketname
      );
      const obj = nextGameToHaveBreakpoint(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.nextGameToHaveBreakpoint.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nextGameToHaveBreakpoint;
      } else {
        oddData.nextGameToHaveBreakpoint.rows = rows;
      }
    }

    {
      oddData.nextTwoGamesEitherGameToDeuce.marketname = getNextGameTitle(
        data,
        oddData.nextTwoGamesEitherGameToDeuce.marketname
      );
      const obj = nextToGamesEitherGameToDeuce(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.nextTwoGamesEitherGameToDeuce.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nextTwoGamesEitherGameToDeuce;
      } else {
        oddData.nextTwoGamesEitherGameToDeuce.rows = rows;
      }
    }

    {
      oddData.nextTwoGamesWinner.marketname = getNextGameTitle(
        data,
        oddData.nextTwoGamesWinner.marketname
      );
      const obj = nextTwoGamesWinner(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.nextTwoGamesWinner.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nextTwoGamesWinner;
      } else {
        oddData.nextTwoGamesWinner.rows = rows;
      }
    }
    {
      oddData.overUnderByGamesCurrentSet.marketname = getSetTitle(
        data,
        oddData.overUnderByGamesCurrentSet.marketname
      );
      const obj = overUnderCurrentSet(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.overUnderByGamesCurrentSet.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.overUnderByGamesCurrentSet;
      } else {
        oddData.overUnderByGamesCurrentSet.rows = rows;
      }
    }

    {
      oddData.currentSetRaceTo2.marketname = getSetTitle(
        data,
        oddData.currentSetRaceTo2.marketname
      );
      const obj = currentSetRaceTo(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.currentSetRaceTo2.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.currentSetRaceTo2;
      } else {
        oddData.currentSetRaceTo2.rows = rows;
      }
    }

    {
      oddData.currentSetLeadAfter.marketname = getSetTitle(
        data,
        oddData.currentSetLeadAfter.marketname
      );
      const obj = currentSetLeadAfter(data);
      const rows = obj.rows;
      oddData.currentSetLeadAfter.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.currentSetLeadAfter;
      } else {
        oddData.currentSetLeadAfter.rows = rows;
      }
    }

    {
      if (oddData.currentSetLeadAfter === undefined) {
        oddData.currentSetLeadAfter = JSON.parse(
          JSON.stringify(tennisAll.currentSetLeadAfter)
        );
        oddData.currentSetLeadAfter.marketname = getSetTitle(
          data,
          oddData.currentSetLeadAfter.marketname
        );
        const obj = currentSetLeadAfter2(data);
        const rows = obj.rows;
        console.log("Lead After ", rows);
        oddData.currentSetLeadAfter.suspend = obj.suspend;
        if (rows.length === 0 || rows[0].length === 0) {
          delete oddData.currentSetLeadAfter;
        } else {
          oddData.currentSetLeadAfter.rows = rows;
        }
      }
    }

    {
      oddData.totalGamesInCurrentSet.marketname = getSetTitle(
        data,
        oddData.totalGamesInCurrentSet.marketname
      );
      const obj = totalGamesInCurrentSet(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.totalGamesInCurrentSet.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.totalGamesInCurrentSet;
      } else {
        oddData.totalGamesInCurrentSet.rows = rows;
      }
    }

    {
      oddData.nextSetRaceTo.marketname = getNextSetTitle(
        data,
        oddData.nextSetRaceTo.marketname
      );
      const obj = nextSetRaceTo(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.nextSetRaceTo.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nextSetRaceTo;
      } else {
        oddData.nextSetRaceTo.rows = rows;
      }
    }

    {
      oddData.nextSetLeadAfter.marketname = getNextSetTitle(
        data,
        oddData.nextSetLeadAfter.marketname
      );
      const obj = nextSetLeadAfter(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.nextSetLeadAfter.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nextSetLeadAfter;
      } else {
        oddData.nextSetLeadAfter.rows = rows;
      }
    }

    {
      oddData.nextSetScoreAfter4Games.marketname = getNextSetTitle(
        data,
        oddData.nextSetScoreAfter4Games.marketname
      );
      const obj = nextSetScoreAfter4Games(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.nextSetScoreAfter4Games.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nextSetScoreAfter4Games;
      } else {
        oddData.nextSetScoreAfter4Games.rows = rows;
      }
    }

    {
      oddData.nextSetScoreAfter6Games.marketname = getNextSetTitle(
        data,
        oddData.nextSetScoreAfter6Games.marketname
      );
      const obj = nextSetScoreAfter6Games(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.nextSetScoreAfter6Games.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nextSetScoreAfter6Games;
      } else {
        oddData.nextSetScoreAfter6Games.rows = rows;
      }
    }

    {
      oddData.currentSetRaceToGames.marketname = getSetTitle(
        data,
        oddData.currentSetRaceToGames.marketname
      );
      const obj = raceToGamesCurrentSet(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.currentSetRaceToGames.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.currentSetRaceToGames;
      } else {
        oddData.currentSetRaceToGames.rows = rows;
      }
    }

    {
      oddData.currentSetRaceTo.marketname = getSetTitle(
        data,
        oddData.currentSetRaceTo.marketname
      );
      const obj = raceToCurrentSet(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.currentSetRaceTo.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.currentSetRaceTo;
      } else {
        oddData.currentSetRaceTo.rows = rows;
      }
    }
    {
      oddData.currentSetScore2.marketname = getSetTitle(
        data,
        oddData.currentSetScore2.marketname
      );
      const obj = correctScoreCurrentSetAnyPlayer(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.currentSetScore2.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.currentSetScore2;
      } else {
        oddData.currentSetScore2.rows = rows;
      }
    }
    {
      oddData.currentSetScoreAnyPlayer.marketname = getSetTitle(
        data,
        oddData.currentSetScoreAnyPlayer.marketname
      );
      const obj = correctScoreCurrentSetAnyPlayerDrawBack(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.currentSetScoreAnyPlayer.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.currentSetScoreAnyPlayer;
      } else {
        oddData.currentSetScoreAnyPlayer.rows = rows;
      }
    }
    {
      oddData.currentSetScore.marketname = getSetTitle(
        data,
        oddData.currentSetScore.marketname
      );
      const obj = correctScoreCurrentSet(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.currentSetScore.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.currentSetScore;
      } else {
        oddData.currentSetScore.rows = rows;
      }
    }
    {
      if (oddData.currentSetScore === undefined) {
        oddData.currentSetScore = JSON.parse(
          JSON.stringify(tennisAll.currentSetScore)
        );
        oddData.currentSetScore.marketname = getSetTitle(
          data,
          oddData.currentSetScore.marketname
        );
        const obj = correctScoreCurrentSet2(data);
        const rows = obj.rows;
        console.log("rra", rows);
        oddData.currentSetScore.suspend = obj.suspend;
        if (rows.length === 0 || rows[0].length === 0) {
          delete oddData.currentSetScore;
        } else {
          oddData.currentSetScore.rows = rows;
        }
      }
    }

    {
      oddData.currentSetScoreAfter4Games.marketname = getSetTitle(
        data,
        oddData.currentSetScoreAfter4Games.marketname
      );
      const obj = currentSetScoreAfter4Games(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.currentSetScoreAfter4Games.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.currentSetScoreAfter4Games;
      } else {
        oddData.currentSetScoreAfter4Games.rows = rows;
      }
    }

    {
      oddData.currentSetScoreAfter6Games.marketname = getSetTitle(
        data,
        oddData.currentSetScoreAfter6Games.marketname
      );
      const obj = currentSetScoreAfter6Games(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.currentSetScoreAfter6Games.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.currentSetScoreAfter6Games;
      } else {
        oddData.currentSetScoreAfter6Games.rows = rows;
      }
    }

    {
      oddData.currentSetCorrectScoreGroup.marketname = getSetTitle(
        data,
        oddData.currentSetCorrectScoreGroup.marketname
      );
      const obj = currectSetCorrectScoreGroup(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.currentSetCorrectScoreGroup.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.currentSetCorrectScoreGroup;
      } else {
        oddData.currentSetCorrectScoreGroup.rows = rows;
      }
    }

    {
      if (!oddData.currentSetCorrectScoreGroup) {
        oddData.currentSetCorrectScoreGroup = JSON.parse(
          JSON.stringify(tennisAll.currentSetCorrectScoreGroup)
        );
        oddData.currentSetCorrectScoreGroup.marketname = getSetTitle(
          data,
          oddData.currentSetCorrectScoreGroup.marketname
        );
        const obj = currectSetCorrectScoreGroup2(data);
        const rows = obj.rows;
        console.log("rra", rows);
        oddData.currentSetCorrectScoreGroup.suspend = obj.suspend;
        if (rows.length === 0 || rows[0].length === 0) {
          delete oddData.currentSetCorrectScoreGroup;
        } else {
          oddData.currentSetCorrectScoreGroup.rows = rows;
        }
      }
    }

    {
      oddData.currentSetHandicap.marketname = getSetTitle(
        data,
        oddData.currentSetHandicap.marketname
      );
      const obj = currentSetHandicap(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.currentSetHandicap.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.currentSetHandicap;
      } else {
        oddData.currentSetHandicap.rows = rows;
      }
    }

    {
      const obj = setBetting2(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.setBetting2.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.setBetting2;
      } else {
        oddData.setBetting2.rows = rows;
      }
    }

    {
      oddData.currentSetTieBreakWinner.marketname = getSetTitle(
        data,
        oddData.currentSetTieBreakTotalPoints.marketname
      );
      const obj = currentSetTieBreakWinner(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.currentSetTieBreakWinner.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.currentSetTieBreakWinner;
      } else {
        oddData.currentSetTieBreakWinner.rows = rows;
      }
    }

    {
      oddData.currentSetTieBreakTotalPoints.marketname = getSetTitle(
        data,
        oddData.currentSetTieBreakTotalPoints.marketname
      );
      const obj = currentSetTieBreakTotalPoints(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.currentSetTieBreakTotalPoints.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.currentSetTieBreakTotalPoints;
      } else {
        oddData.currentSetTieBreakTotalPoints.rows = rows;
      }
    }

    {
      oddData.currentSetTieBreakScore.marketname = getSetTitle(
        data,
        oddData.currentSetTieBreakScore.marketname
      );
      const obj = currentSetTieBreakScore(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.currentSetTieBreakScore.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.currentSetTieBreakScore;
      } else {
        oddData.currentSetTieBreakScore.rows = rows;
      }
    }

    {
      oddData.matchResultAndTotalGames.marketname = getSetTitle(
        data,
        oddData.matchResultAndTotalGames.marketname
      );
      const obj = matchResultAndTotalGames(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.matchResultAndTotalGames.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.matchResultAndTotalGames;
      } else {
        oddData.matchResultAndTotalGames.rows = rows;
      }
    }

    {
      oddData.currentSetToBreakServe.marketname = getSetTitle(
        data,
        oddData.currentSetToBreakServe.marketname
      );
      const obj = currentSetToBreakServe(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.currentSetToBreakServe.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.currentSetToBreakServe;
      } else {
        oddData.currentSetToBreakServe.rows = rows;
      }
    }

    {
      oddData.nextSetHandicap.marketname = getNextSetTitle(
        data,
        oddData.nextSetHandicap.marketname
      );
      const obj = nextSetHandicap(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.nextSetHandicap.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nextSetHandicap;
      } else {
        oddData.nextSetHandicap.rows = rows;
      }
    }

    {
      oddData.nextSetToBreakServe.marketname = getNextSetTitle(
        data,
        oddData.nextSetToBreakServe.marketname
      );
      const obj = nextSetToBreakServe(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.nextSetToBreakServe.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nextSetToBreakServe;
      } else {
        oddData.nextSetToBreakServe.rows = rows;
      }
    }

    {
      oddData.totalGamesInMatch.marketname = getSetTitle(
        data,
        oddData.totalGamesInMatch.marketname
      );
      const obj = totalGamesInMatch(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.totalGamesInMatch.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.totalGamesInMatch;
      } else {
        oddData.totalGamesInMatch.rows = rows;
      }
    }

    {
      oddData.player1To.marketname = getSetTitle(
        data,
        oddData.player1To.marketname
      );
      oddData.player1To.marketname = getPlayer1Name(
        data,
        oddData.player1To.marketname
      );
      const obj = player1To(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.player1To.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.player1To;
      } else {
        oddData.player1To.rows = rows;
      }
    }

    {
      oddData.player2To.marketname = getSetTitle(
        data,
        oddData.player2To.marketname
      );
      oddData.player2To.marketname = getPlayer2Name(
        data,
        oddData.player2To.marketname
      );
      const obj = player2To(data);
      console.log("p2", obj);
      const rows = obj.rows;
      oddData.player2To.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.player2To;
      } else {
        oddData.player2To.rows = rows;
      }
    }

    {
      const obj = matchHandicap(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.matchHandicap.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.matchHandicap;
      } else {
        oddData.matchHandicap.rows = rows;
      }
    }

    {
      const obj = doubleResult(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.doubleResult.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.doubleResult;
      } else {
        oddData.doubleResult.rows = rows;
      }
    }

    {
      oddData.setBetting.marketname = getSetTitle(
        data,
        oddData.goTheDistance.marketname
      );
      const obj = setBetting(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.setBetting.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.setBetting;
      } else {
        oddData.setBetting.rows = rows;
      }
    }

    {
      oddData.goTheDistance.marketname = getSetTitle(
        data,
        oddData.goTheDistance.marketname
      );
      const obj = goTheDistance(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.goTheDistance.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.goTheDistance;
      } else {
        oddData.goTheDistance.rows = rows;
      }
    }

    {
      oddData.playerGamesWon.marketname = getSetTitle(
        data,
        oddData.playerGamesWon.marketname
      );
      const obj = playersOverUnder(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.playerGamesWon.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.playerGamesWon;
      } else {
        oddData.playerGamesWon.rows = rows;
      }
    }

    {
      const obj = totalSets(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.totalSets.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.totalSets;
      } else {
        oddData.totalSets.rows = rows;
      }
    }

    {
      oddData.matchTotalOddEven.marketname = getSetTitle(
        data,
        oddData.matchTotalOddEven.marketname
      );
      const obj = matchOddEven(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.matchTotalOddEven.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.matchTotalOddEven;
      } else {
        oddData.matchTotalOddEven.rows = rows;
      }
    }

    {
      oddData.nextSetWinner.marketname = getNextSetTitle(
        data,
        oddData.nextSetWinner.marketname
      );
      const obj = nextSetWinner(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.nextSetWinner.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nextSetWinner;
      } else {
        oddData.nextSetWinner.rows = rows;
      }
    }

    {
      oddData.nextSetCorrectScoreGroup.marketname = getNextSetTitle(
        data,
        oddData.nextSetCorrectScoreGroup.marketname
      );
      const obj = nextSetCorrectScoreGroup(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.nextSetCorrectScoreGroup.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nextSetCorrectScoreGroup;
      } else {
        oddData.nextSetCorrectScoreGroup.rows = rows;
      }
    }

    // {
    //     oddData.nextSetScoreAnyPlayer.marketname = getNextSetTitle(data, oddData.nextSetScoreAnyPlayer.marketname);
    //     const obj = correctScoreNextSetAnyPlayer(data);
    //     const rows = obj.rows;
    //     console.log('rra', rows);
    //     oddData.nextSetScoreAnyPlayer.suspend = obj.suspend;
    //     if(rows.length === 0 || rows[0].length === 0){
    //         delete oddData.nextSetScoreAnyPlayer;
    //     }else{
    //         oddData.nextSetScoreAnyPlayer.rows = rows;
    //     }
    // }
    {
      oddData.nextSetScoreAnyPlayer = JSON.parse(
        JSON.stringify(tennisAll.nextSetScoreAnyPlayer)
      );
      oddData.nextSetScoreAnyPlayer.marketname = getNextSetTitle(
        data,
        oddData.nextSetScoreAnyPlayer.marketname
      );
      const obj = correctScoreNextSetAnyPlayerDrawBack(data);
      const rows = obj.rows;
      console.log("rra", rows);
      oddData.nextSetScoreAnyPlayer.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.nextSetScoreAnyPlayer;
      } else {
        oddData.nextSetScoreAnyPlayer.rows = rows;
      }
    }
    const sortedElements = Object.values(oddData).sort(
      (a: any, b: any) => a.order - b.order
    );
    oddData = sortedElements;
  } else if (active === "Bet Builder") {
    oddData = tennisBetBuilder as any;
  } else if (active === "Set") {
    oddData = tennisSet as any;
  } else if (active === "Games") {
    oddData = tennisGames as any;
  } else if (active === "Player") {
    oddData = tennisPlayer as any;
  }
  console.log("detail market tennis", data);

  return (
    <div className="w-[100%] bg-[#383838]">
      {Object.keys(oddData).map((key, index) => {
        return (
          <GroupwithHead
            key={index}
            keytag={key}
            data={data}
            active={active}
            odd={oddData[key]}
          />
        );
      })}
    </div>
  );
};

export default TennisMarketGroup;

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

      <div
        className={cn(
          "h-[100%] overflow-hidden transition-[max-height] duration-300 ease",
          isExpanded ? "max-h-[500px]" : "max-h-[0px]"
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
