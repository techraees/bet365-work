"use client";

import NavigationPanel from "../Navigation/navigationpanel";
import Wrapper from "./Wrapper";
import LeagueWrapper from "./League/LeagueWrapper";
import Match from "./League/Match/Match";

const Odds = ({ sport, getLeagues }: any) => {
  if (sport[2]) {
    console.log(decodeURIComponent(sport[2]));
  }
  console.log({ sport: sport, hi: getLeagues });
  let show = <></>;
  if (sport[1] && sport[1] === "leagues" && sport[2] && sport[3]) {
    show = (
      <Match
        sport={sport[0]}
        gameid={sport[3]}
        league={decodeURIComponent(sport[2])}
        getLeagues={getLeagues}
      />
    );
  } else if (sport[1] && sport[1] === "leagues" && sport[2]) {
    show = (
      <LeagueWrapper
        sport={sport[0]}
        league={decodeURIComponent(sport[2])}
        getLeagues={getLeagues}
      />
    );
  } else {
    show = (
      <Wrapper
        sport={sport[0]}
        currentdataId={sport[1]}
        getLeagues={getLeagues}
      />
    );
  }
  return (
    <div className="flex h-[calc(100vh_-_105px)] max-w-[1450px] mx-auto">
      <div className="w-[255px] hidden md:flex overflow-auto h-[100%]">
        <NavigationPanel />
      </div>
      <div className="flex flex-col flex-1 bg-[383838] overflow-auto h-[100%]">
        {show}
      </div>
    </div>
  );
};

export default Odds;
