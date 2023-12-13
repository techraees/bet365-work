import React from "react";

interface BasketballPointsEventsInterface {
    data: any;
    sport: string;
    subcategory?: string;
}
const BasketballPoints: React.FC<BasketballPointsEventsInterface> = ({ data, sport, subcategory }) => {
    // console.log('Volleyball', { data:data.stats[0]},"Showing the support")
    if(sport ==="volleyball") {
        if(data?.info?.score === null) {
            return null
        }
        var t_obj = undefined;
        var l_obj = undefined;
        const stats = data?.stats;
        for(var stat_id in stats){
            var stat_obj = stats[stat_id];
            if(stat_obj.name === "T"){
                t_obj = stat_obj;
            } else if (
                stat_obj.name.startsWith("S") &&
                (!l_obj || parseInt(stat_obj.name.slice(1)) > parseInt(l_obj.name.slice(1)))
              ) {
                console.log(parseInt(stat_obj.name.slice(1)),"HELLO WORLD")
                l_obj = stat_obj;
              }

        }
        

        return (
            <div className="flex ml-[auto]">
                <div className="flex flex-col">
                    <div className="flex h-[25px] items-center justify-center mr-[8px]">
                        <div className="h-[19px] bg-[hsla(0,0%,100%,.1)] px-[4px] py-[2px] text-white text-[13px] rounded-[1px] leading-[15px]">
                        {t_obj !== undefined ? (t_obj.home) : ("0") }
                        </div>
                        <div className="h-[19px] mx-[8px] px-[4px] py-[2px] text-white text-[13px] rounded-[1px] leading-[15px]">
                    {/* {data?.team_info?.home.score} */}
                    {l_obj !== undefined ? (l_obj.home) : ("0") }
                        </div>
                    </div>
                    <div className="flex h-[25px] items-center justify-center mr-[8px]">
                        <div className="h-[19px] bg-[hsla(0,0%,100%,.1)] px-[4px] py-[2px] text-white text-[13px] rounded-[1px] leading-[15px]">
                            {/* {data?.team_info?.away.score} */}
                            {t_obj !== undefined ? (t_obj.away) : ("0") }
                            
                        </div>
                        <div className="h-[19px] mx-[8px] px-[4px] py-[2px] text-white text-[13px] rounded-[1px] leading-[15px]">
                        {l_obj !== undefined ? (l_obj.away) : ("0") }
                        </div>
                    </div>
                </div>
            </div>
        )


    }
    return null
   
};

export default BasketballPoints;
