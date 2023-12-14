"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import MarketGroupBody from "../../../Structure/MarketGroupBody";
import { categoriesMapping } from "@/lib/sportsMapping";
import { volleyballAll } from "./datastructure";
import Chevron from "@/components/ui/icons/chevron";
import StarBorderline, {
  StarFilled,
} from "@/components/ui/icons/star-borderline";
import {
  gameLines,
  linesToCurrentSet,
  currentSetPointBetting,
  currentSetRaceTo,
  currentSetLeadAfter,
  currentSetExtraPoints,
  oddEven,
  currentSetWinningMargin,
  currentSetCorrectScore,
  scoreAfter3rdSet,
  scoreAfter2ndSet,
  correctSetScore,
  teamTotals,
  getSetTitle,
  getSetTitleAfter,
  getNextSetTitle,
} from "../mappings/mapping";
interface MarketGroupProps {
  data: any;
  active: string;
}

const VolleyballMarketGroup: React.FC<MarketGroupProps> = ({
  data,
  active,
}) => {
  if (!data) {
    return null;
  }
  let oddData = [] as any;

  if (active === "All") {
    oddData = JSON.parse(JSON.stringify(volleyballAll));
    {
      const obj = gameLines(data);
      var rows = obj.rows;
      oddData.gameLines.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.gameLines;
      } else {
        oddData.gameLines.rows = rows;
      }
    }

    {
      oddData.setXLines.marketname = getSetTitle(
        data,
        oddData.setXLines.marketname
      );
      const obj = linesToCurrentSet(data);
      const rows = obj.rows;
      oddData.setXLines.suspend = obj!.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.setXLines;
      } else {
        oddData.setXLines.rows = rows;
      }
    }

    {
      const obj = currentSetPointBetting(data);
      var rows = obj.rows;
      oddData.setXPointBetting.marketname = getSetTitle(
        data,
        oddData.setXPointBetting.marketname
      );

      oddData.setXPointBetting.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.setXPointBetting;
      } else {
        oddData.setXPointBetting.rows = rows;
      }
    }

    {
      const obj = currentSetRaceTo(data);
      var rows = obj.rows;
      oddData.setXRaceTo.marketname = getSetTitle(
        data,
        oddData.setXRaceTo.marketname
      );

      oddData.setXRaceTo.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.setXRaceTo;
      } else {
        oddData.setXRaceTo.rows = rows;
      }
    }

    {
      const obj = currentSetLeadAfter(data);
      var rows = obj.rows;
      oddData.setXleadAfter.marketname = getSetTitle(
        data,
        oddData.setXleadAfter.marketname
      );
      oddData.setXleadAfter.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.setXleadAfter;
      } else {
        oddData.setXleadAfter.rows = rows;
      }
    }

    {
      const obj = currentSetExtraPoints(data);
      var rows = obj.rows;

      oddData.setXExtraPoints.marketname = getSetTitle(
        data,
        oddData.setXExtraPoints.marketname
      );

      oddData.setXExtraPoints.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.setXExtraPoints;
      } else {
        oddData.setXExtraPoints.rows = rows;
      }
    }

    {
      const obj = oddEven(data);
      var rows = obj.rows;

      oddData["odd/Even"].suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData["odd/Even"];
      } else {
        oddData["odd/Even"].rows = rows;
      }
    }

    {
      const obj = currentSetWinningMargin(data);
      oddData.setXWinningMargin.marketname = getSetTitle(
        data,
        oddData.setXWinningMargin.marketname
      );
      var rows = obj.rows;
      oddData.setXWinningMargin.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.setXWinningMargin;
      } else {
        oddData.setXWinningMargin.rows = rows;
      }
    }

    // PENDING
    {
      const obj = currentSetCorrectScore(data);
      oddData.setXCorrectScore.marketname = getSetTitle(
        data,
        oddData.setXCorrectScore.marketname
      );
      var rows = obj.rows;
      oddData.setXCorrectScore.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.setXCorrectScore;
      } else {
        oddData.setXCorrectScore.rows = rows;
      }
    }

    {
      const obj = scoreAfter2ndSet(data);

      var rows = obj.rows;
      oddData.scoreAfterSet2nd.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.scoreAfterSet2nd;
      } else {
        oddData.scoreAfterSet2nd.rows = rows;
      }
    }

    {
      const obj = scoreAfter3rdSet(data);

      var rows = obj.rows;
      oddData.scoreAfterSet3rd.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.scoreAfterSet3rd;
      } else {
        oddData.scoreAfterSet3rd.rows = rows;
      }
    }

    // PENDING
    {
      const obj = correctSetScore(data);
      var rows = obj.rows;
      oddData.correctSetScore.suspend = obj.suspend;

      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.correctSetScore;
      } else {
        oddData.correctSetScore.rows = rows;
      }
    }

    {
      const obj = teamTotals(data);
      var rows = obj.rows;
      oddData.teamTotals.suspend = obj.suspend;
      if (rows.length === 0 || rows[0].length === 0) {
        delete oddData.teamTotals;
      } else {
        oddData.teamTotals.rows = rows;
      }
    }
  }
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

export default VolleyballMarketGroup;

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

      {odd?.currentPoints && (
        <div className="flex w-[100%] h-[100%] border-t-[#ffffff1a] border-t border-solid text-[hsla(0,0%,100%,.6)]">
          <div className="h-[25px] flex items-center pl-[30px]">
            Current Score: {odd?.currentPoints}
          </div>
        </div>
      )}
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
