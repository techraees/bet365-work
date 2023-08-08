import React from "react";
import MatchDetails from "./MatchDetails";
interface BaseballOddsProps {
    data: any;
    sport: string;
    subcategory?: string;
}

const BaseballOdds: React.FC<BaseballOddsProps> = ({ data, sport, subcategory }) => {
    return (
        <MatchDetails data={data} subcategory={subcategory}/>
    );
};

export default BaseballOdds;