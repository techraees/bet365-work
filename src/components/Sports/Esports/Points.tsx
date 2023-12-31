import React from "react";

interface BasketballPointsEventsInterface {
    title: string;
    data: any;
    sport: string;
    subcategory?: string;
}
const EsportPoints: React.FC<BasketballPointsEventsInterface> = ({ title, data, sport, subcategory }) => {
    console.log('EsportPoints', { title, data, sport })
    return (
        <div className="flex ml-[auto]">
            <div className="flex flex-col">
                <div className="flex h-[25px] items-center justify-center">
                    <div className="h-[19px] bg-[hsla(0,0%,100%,.1)] px-[4px] py-[2px] text-white text-[13px] rounded-[1px] leading-[15px]">{
                        data?.team_info?.home.score ?  data?.team_info?.home.score : 0}
                    </div>
                </div>
                <div className="flex h-[25px] items-center justify-center">
                    <div className="h-[19px] bg-[hsla(0,0%,100%,.1)] px-[4px] py-[2px] text-white text-[13px] rounded-[1px] leading-[15px]">{
                        data?.team_info?.away.score ? data?.team_info?.away.score : 0}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EsportPoints;
