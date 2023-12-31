import React from "react";

interface BasketballPointsEventsInterface {
    data: any;
    sport: string;
    subcategory?: string;
}
const BasketballPoints: React.FC<BasketballPointsEventsInterface> = ({ data, sport, subcategory }) => {
    console.log('Baseball', { data, sport })
    return (
        <div className="flex ml-[auto]">
            <div className="flex flex-col">
                <div className="flex h-[25px] items-center justify-center mr-4">
                    <div className="h-[19px] bg-[hsla(0,0%,100%,.1)] px-[4px] py-[2px] text-white text-[13px] rounded-[1px] leading-[15px]">
                        {/* {data?.team_info?.home.score} */}
                        {'3'}
                    </div>
                </div>
                <div className="flex h-[25px] items-center justify-center mr-4">
                    <div className="h-[19px] bg-[hsla(0,0%,100%,.1)] px-[4px] py-[2px] text-white text-[13px] rounded-[1px] leading-[15px]">
                        {/* {data?.team_info?.away.score} */}
                        {'4'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasketballPoints;
