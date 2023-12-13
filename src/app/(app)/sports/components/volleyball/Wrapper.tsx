'use client';
import React, { useEffect, useState } from "react";
import Banner from "../common/Banner";
import LeagueWraps from "./Leagues";



const Wrapper = ({ odds, sport, currentdataId, getLeagues }: any) => {
    return (
        <div className="flex text-base flex-col flex-1 bg-[#282828] overflow-auto h-[100%]">
            <Banner url={'/Volleyball-desktop.jpeg'} heading={'Volleyball'} tabs={["Coupons", "Outrights"]}/>
            <LeagueWraps getLeagues={getLeagues} odds={odds}/>

        </div>
    )

}

export default Wrapper;