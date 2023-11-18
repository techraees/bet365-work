import React from "react";
import GameLines from "./GameLines";
import GameLines3Way from "./GameLines3Way";
import PeriodLines from "./PeriodLines";
interface HockeyOddsProps {
    data: any;
    sport: string;
    subcategory?: string;
}

const HockeyOdds: React.FC<HockeyOddsProps> = ({ data, sport, subcategory }) => { 
    if (subcategory === "gamelines" || !subcategory) {
        return <GameLines data={data}/>
    }
    return <GameLines data={data}/>
};

export default HockeyOdds;