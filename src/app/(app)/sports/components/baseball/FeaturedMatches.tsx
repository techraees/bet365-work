import React, { FC } from "react";
import Matchcard from "./Matchcard";

interface PostsProps{
    listOfData: any[];
 }
const FeaturedMatches: FC<PostsProps> = ({listOfData}) => {
    return (
        <div className="flex min-h-[232px] flex-col w-full relative overflow-hidden bg-[#383838] border-t-2 border-solid border-t-[#367a65]">
            <div className="flex h-[55px] px-[20px] items-center">
                <div className="flex text-[#00ffb6] text-[15px] font-[700]">MLB</div>
            </div>

            <div className="group h-[165px] items-center px-[20px] pb-[10px] flex w-full relative">
                <Matchcard listOfData={listOfData}/>
            </div>

        </div>

    )
}

export default FeaturedMatches;