import React from "react";
import { categoriesMapping } from "@/lib/sportsMapping";
import MatchWinner from "./MatchWinner";
import MatchHandicapSets from "./MatchHandicapSets"
import MatchTotal from "./MatchTotal"
import CurrentSet from './CurrentSet'
import CurrentSetHandicap from './CurrentSetHandicap'
import MarketCell from "../../Structure/MarketCell";
interface TiedAtEndOfRegulationProps {
  data: any;
  subcategory?: string;
}

const MatchDetails: React.FC<TiedAtEndOfRegulationProps> = ({
  data,
  subcategory,
}) => {
  if (!data) {
    return null;
  }

  if (subcategory === "matchWinner" || !subcategory) {
  } else if (subcategory === "matchHandicapSets") {
    return <MatchHandicapSets data={data} />
  } else if (subcategory === "matchTotal") {
    return <MatchTotal data={data} />
  } else if (subcategory === "currentSet") {
    return <CurrentSet data={data} />
  } else if (subcategory === "currentSetHandicap") {
    return <CurrentSetHandicap data={data} />
  }
  return (
    <MatchWinner data={data} />
  );
};

export default MatchDetails;
