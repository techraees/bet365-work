import React from "react";
import Matchcard from "./Matchcard";
import BetBoostIcon from "@/components/ui/icons/betboost";
const BetBoost = () => {

    return (
        <div className="flex min-h-[271px] flex-col w-full relative pt-[9px] pb-[15px] overflow-hidden bg-[linear-gradient(to_bottom_right,#1b4d42,#383838)] border-t-2 border-solid border-t-[#00ffb633]">
            <div className="flex h-[47px] w-[168px] px-[20px] items-center mb-[8px]">
                <BetBoostIcon className="h-[100%] w-[100%]" />
            </div>

            <div className="group flex-1 items-center px-[20px] pb-[10px] flex w-full relative">
                {/* <Matchcard /> */}
            </div>

        </div>

    )
}

export default BetBoost;