'use client';
import React, { useEffect, useState } from "react";
import Banner from "../common/Banner";
import FeaturedMatches from "./FeaturedMatches";
import BetBoost from "./BetBoost";
import LeagueWraps from "./Leagues";



const BaseballWrapper = ({ odds, sport, currentdataId , getLeagues}: any) => {
    console.log({ odds })
    let listOfData: any[] = [];
    odds?.map((item: any) => {
        if (item.length > 0 && listOfData.length < 10) {
            listOfData.push(...item)
        }
    })

    console.log({ odds, sport, currentdataId , listOfData, getLeagues})
    return (
        <div className="flex text-base flex-col flex-1 bg-[#282828] overflow-auto h-[100%]">
            <Banner url={'/Baseball-desktop.jpeg'} heading={'Baseball'} tabs={["Coupons", "Futures", "Offers"]} />
            <FeaturedMatches listOfData={listOfData} />
            <BetBoost/>
            <LeagueWraps getLeagues={getLeagues} odds={odds}/>
        </div>
    )

}

export default BaseballWrapper;