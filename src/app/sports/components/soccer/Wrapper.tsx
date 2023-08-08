'use client';
import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import FeaturedMatches from "./FeaturedMatches";
import BetBoost from "./BetBoost";
import UpcomingMatches from "./UpcomingMatches";
import MainLists from "./MainLists";
import Competitions from "./Competitions";
import Markets from "./Markets";


const SoccerWrapper = ({ odds, sport, currentdataId, leaguebycountry }: any) => {

    const [soccerData, setSoccerData] = useState([]);
    // console.log({ data })
    let listOfData: any[] = [];
    odds?.map((item: any) => {
        if (item.length > 0) {
            listOfData.push(item[0])
        }
    })
    console.log({ odds, sport, currentdataId, leaguebycountry })

    return (
        <div className="flex flex-col flex-1 bg-[white] overflow-auto h-[100%]">
            <Banner />
            <FeaturedMatches listOfData={listOfData}/>
            <BetBoost />
            <UpcomingMatches odds={odds}/>
            <MainLists leaguebycountry={leaguebycountry}/>
            <Competitions leaguebycountry={leaguebycountry} />
            <Markets />
        </div>
    )

}

export default SoccerWrapper;