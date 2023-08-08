import React from "react";
import { categoriesMapping } from "@/lib/sportsMapping";
import MarketCell from "../../Structure/MarketCell";
interface TiedAtEndOfRegulationProps {
    data: any;
    subcategory?: string;
}

const MatchDetails: React.FC<TiedAtEndOfRegulationProps> = ({ data, subcategory }) => {
    let objs = {
        homename: "",
        homevalue: "",
        awayname: "",
        awayvalue: ""
    }
    if (!data) {
        return null
    }

    if (subcategory === "matchWinner" || !subcategory) {
        objs = {
            homename: "",
            homevalue: "1.2",
            awayname: "",
            awayvalue: "1.5"
        }
    } else if (subcategory === "matchHandicapSets") {
        objs = {
            homename: "4.5",
            homevalue: "1.9",
            awayname: "-4.5",
            awayvalue: "2.1"
        }
    } else if (subcategory === "matchTotal") {
        objs = {
            homename: "",
            homevalue: "3.0",
            awayname: "",
            awayvalue: "4.0"
        }
    } else if (subcategory === "currentSet") {
        objs = {
            homename: "2.5",
            homevalue: "4.0",
            awayname: "2.5",
            awayvalue: "5.0"
        }
    } else if (subcategory === "currentSetHandicap") {
        objs = {
            homename: "",
            homevalue: "2.3",
            awayname: "",
            awayvalue: "4.5"
        }
    }
    return (
        <div className=" col-span-5 flex w-full">
            <div className="flex w-full">
                <div className="flex flex-1 items-center hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer">
                    <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[75px]" />
                    <div className="flex w-full justify-center font-[400]">
                        <MarketCell name={objs.homename} value={objs.homevalue} active={objs.homevalue} suspend={"0"} disablehover={true} />
                    </div>
                </div>
                <div className="flex flex-1 items-center hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer flex-row-reverse">
                    <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[75px]" />
                    <div className="flex w-full justify-center font-[400]">
                        <MarketCell name={objs.awayname} value={objs.awayvalue} active={objs.awayvalue} suspend={"0"} disablehover={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default MatchDetails;