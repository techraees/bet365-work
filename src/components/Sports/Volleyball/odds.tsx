import React from "react";
import MatchDetails from "./MatchDetails";
interface VolleyballOddsProps {
    data: any;
    sport: string;
    subcategory?: string;
}

const VolleyballOdds: React.FC<VolleyballOddsProps> = ({ data, sport, subcategory }) => {
    return (
        <MatchDetails data={data} subcategory={subcategory}/>
    );
};

export default VolleyballOdds;