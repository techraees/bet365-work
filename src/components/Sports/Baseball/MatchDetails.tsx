import React from "react";
import { categoriesMapping } from "@/lib/sportsMapping";
import MarketCell from "../../Structure/MarketCell";
import { cn } from "@/lib/utils";
interface TiedAtEndOfRegulationProps {
    data: any;
    subcategory?: string;
}

const MatchDetails: React.FC<TiedAtEndOfRegulationProps> = ({ data, subcategory }) => {
    
    return (
        <div className=" col-span-5 flex w-full">
            <div className="flex items-center cursor-pointer w-full">
                <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px]" />
                <div className="flex flex-col w-full h-full">
                    <div className="flex flex-1 items-center h-full w-full hover:bg-[hsla(0,0%,100%,.15)]">
                        <div className="text-[#fff] w-full text-[13px] font-normal text-right mr-1">11.0</div>
                        <div className="text-[#ffdf1b] w-full text-[13px] font-normal text-left ml-1">1.4</div>
                    </div>
                    <div className="flex flex-1 items-center h-full w-full hover:bg-[hsla(0,0%,100%,.15)]">
                        <div className="text-[#fff] w-full text-[13px] font-normal text-right mr-1">2</div>
                        <div className="text-[#ffdf1b] w-full text-[13px] font-normal text-left ml-1">5</div>
                    </div>
                </div>

            </div>
            <div className="flex items-center cursor-pointer w-full">
                <div className="flex flex-col w-full h-full">
                    <div className="flex flex-1 items-center h-full w-full hover:bg-[hsla(0,0%,100%,.15)]">
                        <div className="text-[#fff] w-full text-[13px] font-normal text-right mr-1">2.00</div>
                        <div className="text-[#ffdf1b] w-full text-[13px] font-normal text-left ml-1">2.0</div>
                    </div>
                    <div className="flex flex-1 items-center h-full w-full hover:bg-[hsla(0,0%,100%,.15)]">
                        <div className="text-[#fff] w-full text-[13px] font-normal text-right mr-1">2.00</div>
                        <div className="text-[#ffdf1b] w-full text-[13px] font-normal text-left ml-1">2.0</div>
                    </div>
                </div>
            </div>
            <div className="flex items-center cursor-pointer flex-row-reverse w-full">
                <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px]" />
                <div className="flex flex-col w-full h-full">
                    <div className="flex flex-1 items-center h-full w-full hover:bg-[hsla(0,0%,100%,.15)]">
                        <div className="text-[#fff] w-full text-[13px] font-normal text-right mr-1">2.00</div>
                        <div className="text-[#ffdf1b] w-full text-[13px] font-normal text-left ml-1">2.0</div>
                    </div>
                    <div className="flex flex-1 items-center h-full w-full hover:bg-[hsla(0,0%,100%,.15)]">
                        <div className="text-[#fff] w-full text-[13px] font-normal text-right mr-1">2.00</div>
                        <div className="text-[#ffdf1b] w-full text-[13px] font-normal text-left ml-1">2.0</div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default MatchDetails;