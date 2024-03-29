"use client";
import React, { useEffect, useState } from "react";
import Banner from "../common/Banner";
import FeaturedMatches from "./FeaturedMatches";
import BetBoost from "./BetBoost";
import LeagueWraps from "./Leagues";

const BaseballWrapper = ({ sport, currentdataId, getLeagues }: any) => {
  let listOfData: any[] = [];

  console.log({ sport, currentdataId, listOfData, getLeagues });
  return (
    <div className="flex text-base flex-col flex-1 bg-[#282828] overflow-auto h-[100%]">
      <Banner
        url={"/Baseball-desktop.jpeg"}
        heading={"Baseball"}
        tabs={["Coupons", "Futures", "Offers"]}
      />
      <FeaturedMatches listOfData={listOfData} />
      <BetBoost />
      <LeagueWraps getLeagues={getLeagues} />
    </div>
  );
};

export default BaseballWrapper;

