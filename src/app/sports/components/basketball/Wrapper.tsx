'use client';
import React, { useEffect, useState } from "react";
import Banner from "../common/Banner";
import BetBoost from "../soccer/BetBoost";
import BannerSlider from "../banner-slider";
import LeagueWraps from "./Leagues";



const Wrapper = ({ odds, sport, currentdataId, getLeagues }: any) => {
    console.log({ odds })
    let listOfData: any[] = [];
    odds?.map((item: any) => {
        if (item.length > 0 && listOfData.length < 10) {
            listOfData.push(...item)
        }
    })

    const banners = [
        {
            image: '/BetBuilder_Basketball.jpeg',
            title: 'Multi-Sport Acca Boost',
            subtitle: 'Get up to 70% more on your winnings',
            button: 'More Details',
            description: `Applies to pre-game accumulators of 2+ selections on selected markets for selected competitions. Boost percentage is dependent on number of selections. Bet restrictions and T&Cs apply. New & eligible customers only.`
        },
        {
            image: '/BetBuilder_Basketball1.jpeg',
            title: 'Basketball Bet Builder',
            subtitle: 'Create your own bet on any Basketball match',
            button: 'More Details',
            description: `Available on up to 12 selections. Bet restrictions and T&Cs apply.`
        },
    ]
    return (
        <div className="flex text-base flex-col flex-1 bg-[#282828] overflow-auto h-[100%]">
            <Banner url={'/Basketball-desktop.jpeg'} heading={'Basketball'} tabs={["Coupons", "Futures", "Offers"]}/>  
            <BetBoost />
            <BannerSlider banners={banners} />
            <LeagueWraps getLeagues={getLeagues} odds={odds}/>
        </div>
    )

}

export default Wrapper;