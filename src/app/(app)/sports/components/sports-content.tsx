"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import BetBoost from "./soccer/BetBoost";
import FeaturedMatches from "./soccer/FeaturedMatches";
import InPlay from "./InPlay";

const SportsContent = ({ odds }: any) => {
  const [active, setActive] = useState("Featured");
  const tabs = ["Featured", "Top Events"];

  let listOfData: any[] = [];
  listOfData = odds;
  // odds?.map((item: any) => {
  //   if (item.length > 0) {
  //     listOfData.push(item[0]);
  //   }
  // });

  return (
    <div className="flex flex-col text-base text-[white] border-t border-solid border-t-[#ffffff12] bg-[#383838]">
      <div className="flex justify-center items-center h-[45px] text-[#ccc]">
        {tabs?.map((tab, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setActive(tab);
              }}
              className={cn(
                "h-[29px] flex items-center justify-center text-[12px] px-3 font-[700] cursor-pointer",
                active == tab ? "bg-[#ffffff12] text-[white] rounded-[5px]" : ""
              )}
            >
              {tab}
            </div>
          );
        })}
      </div>
      <BetBoost />
      <FeaturedMatches listOfData={listOfData} />
      {/* <InPlay
        soccerodds={soccerodds}
        soccerleagues={soccerleagues}
        tennisodds={tennisodds}
        tennisleagues={tennisleagues}
        basketballodds={basketballodds}
        basketballleagues={basketballleagues}
        cricketodds={cricketodds}
        cricketleagues={cricketleagues}
      /> */}
    </div>
  );
};

export default SportsContent;
