import React from "react";
import { categoriesMapping } from "@/lib/sportsMapping";
import FulltimeResult from "./fulltimeResult";
import MatchGoals from "./matchGoals";
import AsianHandicapInPlay from "./asianHandicapInPlay";
import GoalLineInPlay from "./goalLineInPlay";
import SoccerField from "./Field";
interface SoccerOddsProps {
    data: any;
    sport: string;
    subcategory?: string;
}

const SoccerOdds: React.FC<SoccerOddsProps> = ({ data, sport, subcategory }) => { 
    if (subcategory === "fulltimeResult" || !subcategory) {
        return <FulltimeResult data={data}/>
    } else if (subcategory === "matchGoals") {
        return <MatchGoals data={data}/>
    } else if (subcategory === "asianHandicapInPlay"){
        return <AsianHandicapInPlay data={data}/>
    } else if (subcategory === "goalLineInPlay"){
        return <GoalLineInPlay data={data}/>
    }
    return <FulltimeResult data={data}/>
};

export default SoccerOdds;