'use client';
import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import FeaturedMatches from "./FeaturedMatches";
import BetBoost from "./BetBoost";
import UpcomingMatches from "./UpcomingMatches";
import MainLists from "./MainLists";
import Competitions from "./Competitions";
import Markets from "./Markets";
import BannerSlider from "../banner-slider";


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
    const banners = [
        {
            image: '/BetBuilder_Soccer1.jpeg',
            title: 'Soccer Early Payout Offer',
            subtitle: `You're a winner if your team goes 2 goals ahead`,
            button: 'More Details',
            description: `Applies to pre-match singles and multiples on the Full Time Result market for selected competitions. Selections in multiples will be marked as won. Bet restrictions and T&Cs apply. New & eligible customers only.`
        },
        {
            image: '/BetBuilder_Soccer2.jpeg',
            title: 'Soccer Acca Boost',
            subtitle: 'Get up to 70% more on your winnings',
            button: 'More Details',
            description: `Applies to pre-match accumulators of 2+ selections on selected markets. Boost percentage is dependent on number of selections. Bet restrictions and T&Cs apply. New and eligible customers only.`
        },
        {
            image: '/BetBuilder_Soccer3.jpeg',
            title: 'Bore Draw Money Back',
            subtitle: 'Get a refund for any Soccer match that finishes 0-0',
            button: 'More Details',
            description: `Applies to pre-match bets on every Soccer match for Half Time/Full Time, all Correct Score and all Scorecast markets. Bet restrictions and T&Cs apply. New and eligible customers only.`
        },
        {
            image: '/BetBuilder_Soccer4.jpeg',
            title: 'Soccer Bet Builder',
            subtitle: 'Create your own personalised bet pre-match or In-Play',
            button: 'More Details',
            description: `Available on up to 12 selections. Bet restrictions and T&Cs apply.`
        },
    ]
    return (
        <div className="flex flex-col flex-1 bg-[white] overflow-auto h-[100%]">
            <Banner />
            <FeaturedMatches listOfData={listOfData}/>
            <BetBoost />
            <BannerSlider banners={banners} />
            <UpcomingMatches odds={odds}/>
            <MainLists leaguebycountry={leaguebycountry}/>
            <Competitions leaguebycountry={leaguebycountry} />
            <Markets />
        </div>
    )

}

export default SoccerWrapper;