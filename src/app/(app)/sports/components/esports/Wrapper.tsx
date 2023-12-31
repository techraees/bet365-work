'use client';
import React, { useEffect, useState } from "react";
import Banner from "../common/Banner";
import LeagueWraps from "./Leagues";



const Wrapper = ({odds, sport, currentdataId, getLeagues }: any) => {
    console.log({ odds, getLeagues })
    let listOfData: any[] = [];
    odds?.map((item: any) => {
        if (item.length > 0 && listOfData.length < 10) {
            listOfData.push(...item)
        }
    })
    console.log({listOfData})
    return (
        <div className="flex text-base flex-col flex-1 bg-[#282828] overflow-auto h-[100%]">
            <Banner url={'/ESport-desktop.jpeg'} heading={'Esport'} tabs={["Coupons", "Outrights"]}/>  
            <LeagueWraps getLeagues={getLeagues} odds={odds}/>
        </div>
    )

}

export default Wrapper;