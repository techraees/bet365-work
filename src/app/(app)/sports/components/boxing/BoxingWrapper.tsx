'use client';
import React, { useEffect, useState } from "react";
import Banner from "./Banner";



const BoxingWrapper = ({ odds, sport, currentdataId }: any) => {
    return (
        <div className="flex text-base flex-col flex-1 bg-[#282828] overflow-auto h-[100%]">
            <Banner />  
        </div>
    )

}

export default BoxingWrapper;