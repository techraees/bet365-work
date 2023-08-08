'use client';
import React, { useEffect, useState } from "react";
import Banner from "../common/Banner";



const EsportWrapper = ({ odds, sport, currentdataId }: any) => {
    return (
        <div className="flex text-base flex-col flex-1 bg-[#282828] overflow-auto h-[100%]">
            <Banner url={'/Esport-desktop.jpeg'} heading={'Esport'} tabs={["Coupons", "Outrights"]}/>  
        </div>
    )

}

export default EsportWrapper;