import React from "react";
import GameLines from "./GameLines";
import TiedAtEndOfRegulation from "./TiedAtEndOfRegulation";
interface BasketballOddsProps {
    data: any;
    sport: string;
    subcategory?: string;
}

const BasketballOdds: React.FC<BasketballOddsProps> = ({ data, sport, subcategory }) => {
    if (subcategory === "gameLines" || !subcategory) {
        return <GameLines data={data} />
    } else if (subcategory === "tiedAtEndOfRegulation") {
        return <TiedAtEndOfRegulation data={data} />
    }
    return (
        <GameLines data={data} />
    );
};

export default BasketballOdds;