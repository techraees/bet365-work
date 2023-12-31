'use client';
import React, { useEffect, useState } from "react";
import Banner from "../common/Banner";



const Wrapper = ({ odds, sport, currentdataId }: any) => {
    return (
        <div className="flex text-base flex-col flex-1 bg-[#282828] overflow-auto h-[100%]">
            <Banner url={'/Darts-desktop.jpeg'} heading={'Darts'} tabs={["Matches", "Outrights"]}/>  
        </div>
    )

}

export default Wrapper;