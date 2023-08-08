'use client';
import React, { useEffect, useState } from "react";
import Banner from "../common/Banner";
import FeaturedMatches from "./FeaturedMatches";
import BetBoost from "./BetBoost";



const BaseballWrapper = ({ odds, sport, currentdataId }: any) => {
    let listOfData = [] as any;
    if (odds && odds.length > 0) {
        listOfData = odds?.slice(0, 10)
    }

    console.log({ odds, sport, currentdataId })
    return (
        <div className="flex text-base flex-col flex-1 bg-[#282828] overflow-auto h-[100%]">
            <Banner url={'/Baseball-desktop.jpeg'} heading={'Baseball'} tabs={["Coupons", "Futures", "Offers"]} />
            <FeaturedMatches listOfData={listOfData} />
            <BetBoost/>
        </div>
    )

}

export default BaseballWrapper;