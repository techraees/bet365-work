import React from "react";

interface PointsEventsInterface {
    data: any;
    sport: string;
    subcategory?: string;
}
const Points: React.FC<PointsEventsInterface> = ({ data, sport, subcategory }) => {
    // console.log('Tennis', { data, sport })
    if(data.info.name === "Luka Pavlovic vs Bogdan Pavel"){
        console.log("LUKA",data)
    }
    if (sport === "soccer") {
        return (
            <div className="flex ml-[auto]">
                <div className="flex flex-col">
                    <div className="flex h-[25px] items-center justify-center">
                        <div className="h-[19px] bg-[hsla(0,0%,100%,.1)] px-[4px] py-[2px] text-white text-[13px] rounded-[1px] leading-[15px]">{
                            data?.team_info?.home.score}
                        </div>
                    </div>
                    <div className="flex h-[25px] items-center justify-center">
                        <div className="h-[19px] bg-[hsla(0,0%,100%,.1)] px-[4px] py-[2px] text-white text-[13px] rounded-[1px] leading-[15px]">{
                            data?.team_info?.away.score}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (sport === "tennis") {
        return (
            <div className="flex ml-[auto]">
                <div className="flex flex-col ml-[9px] w-[17px]">
                    <div className="flex h-[25px] items-center justify-center">
                        <div className="h-[19px] bg-[hsla(0,0%,100%,.1)] px-[4px] py-[2px] text-white text-[13px] rounded-[1px] leading-[15px]">{
                            0}
                        </div>
                    </div>
                    <div className="flex h-[25px] items-center justify-center">
                        <div className="h-[19px] bg-[hsla(0,0%,100%,.1)] px-[4px] py-[2px] text-white text-[13px] rounded-[1px] leading-[15px]">{
                            0}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col ml-[9px] w-[17px] font-[400]">
                    <div className="flex h-[25px] items-center justify-center">
                        <div className="h-[19px] px-[4px] py-[2px] text-white text-[12px] rounded-[1px] leading-[15px]">{
                            0}
                        </div>
                    </div>
                    <div className="flex h-[25px] items-center justify-center">
                        <div className="h-[19px] px-[4px] py-[2px] text-white text-[12px] rounded-[1px] leading-[15px]">{
                            0}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col ml-[9px] w-[17px] font-[400]">
                    <div className="flex h-[25px] items-center justify-center">
                        <div className="h-[19px] px-[4px] py-[2px] text-white text-[12px] rounded-[1px] leading-[15px]">{
                            data?.stats?.['1'].home}
                        </div>
                    </div>
                    <div className="flex h-[25px] items-center justify-center">
                        <div className="h-[19px] px-[4px] py-[2px] text-white text-[12px] rounded-[1px] leading-[15px]">{
                            data?.stats?.['1'].away}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;

};

export default Points;
