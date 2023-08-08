import React from "react";
import Winner from "./Winner";
import NextGame from "./NextGame";
import CurrentSet from "./CurrentSet";
interface TennisOddsProps {
    data: any;
    sport: string;
    subcategory?: string;
}

const TennisOdds: React.FC<TennisOddsProps> = ({ data, sport, subcategory }) => {
    if (subcategory === "winner" || !subcategory) {
        return <Winner data={data} />
    } else if (subcategory === "nextGame") {
        return <NextGame data={data} />
    } else if (subcategory === "currentSet") {
        return <CurrentSet data={data} />
    }
    return (
        <Winner data={data} />
    );
};

export default TennisOdds;