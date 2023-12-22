"use client";
import {
  getPregameLeagues,
  getPregameNames,
  getPregame,
  getPregameSoccer,
  getPregamesLeaguesGroupedByCountry,
  getSoccerFeaturedMatches,
  getPregamesSoccerLeaguesGroupedByCountry,
} from "@/api";
import NatsSoccer from "../components/soccer/NatsSoccer";
import NavigationPanel from "../components/Navigation/navigationpanel";

import NatsBoxing from "../components/boxing/NatsBoxing";
import NatsBasketball from "../components/basketball/Nats";
import NatsEsport from "../components/esports/Nats";
import NatsTableTennis from "../components/tableTennis/NatsTableTennis";
import NatsBaseball from "../components/baseball/Nats";
import NatsCricket from "../components/cricket/Nats";
import NatsDarts from "../components/darts/Nats";
import NatsHockey from "../components/hockey/Nats";
import NatsHandball from "../components/handball/Nats";
import NatsVolleyball from "../components/volleyball/Nats";
import NatsTennis from "../components/tennis/Nats";

import requireSession from "@/lib/request-session";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PopupShowing from "@/components/CollectingPopup/ConditionalPopup/PopupShowing";
import PopUps from "@/components/CollectingPopup/CollectingPopup";

export const dynamic = "force-dynamic";

const Home = ({ params }: any) => {
  //   const session = await requireSession();
  const { data: session } = useSession();
  //   let { sport } = params;

  const [sport, setSport] = useState([]);
  const [leagueSelectedGamesState, setLeagueSelectedGamesState] = useState({});
  const [leaguesGroupedByCountry, setLeaguesGroupedByCountry] = useState({});
  const [pregameLeagues, setPregameLeagues] = useState({});
  const [pregameSoccer, setPregameSoccer] = useState([]);
  const [featuredMatches, setFeaturedMatches] = useState([]);
  const [odds, setOdds] = useState([]);

  useEffect(() => {
    const _getPregamesGroupedByCountrySoccer = async () => {
      try {
        const leagues = await getPregamesSoccerLeaguesGroupedByCountry();
        // console.log({ leagues: leagues });
        setLeaguesGroupedByCountry(leagues); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching featured matches:", error);
      }
    };

    const _getPregamesGroupedByCountry = async () => {
      try {
        const leagues = await getPregameLeagues(sport[0]);
        // console.log({ leaguesAHAHAH: leagues });
        setLeaguesGroupedByCountry(leagues); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching featured matches:", error);
      }
    };
    if (sport[0] === "soccer") {
      _getPregamesGroupedByCountrySoccer();
    }
    if (sport.length > 0 && sport[0] !== "soccer") {
      _getPregamesGroupedByCountry();
    }
  }, [sport]);

  useEffect(() => {
    // console.log({ SP: sport });
    if (sport.length > 0) {
      const _getPregameSoccer = async () => {
        try {
          // console.log({ sport: sport[2] });
          const games = await getPregameSoccer(decodeURIComponent(sport[2]));
          setLeagueSelectedGamesState(games); // Update the state with fetched data
          setOdds(games);
        } catch (error) {
          console.error("Error fetching featured matches:", error);
        }
      };

      const _getPregame = async () => {
        try {
          // console.log({ sport: sport[2] });
          const games = await getPregame(sport[0], sport[2]);
          setLeagueSelectedGamesState(games); // Update the state with fetched data
          setOdds(games);
        } catch (error) {
          console.error("Error fetching featured matches:", error);
        }
      };

      if (sport[0] === "soccer") {
        _getPregameSoccer();
      }
      if (sport.length > 0 && sport[0] !== "soccer") {
        _getPregame();
      }
    }
  }, [sport]);

  useEffect(() => {
    const _getPregameLeagues = async () => {
      try {
        const leagues = await getPregameLeagues(sport[0]);

        setPregameLeagues(leagues); // Update the state with fetched data
        // console.log({ llleagues: leagues });
      } catch (error) {
        console.error("Error fetching featured matches:", error);
      }
    };
    if (sport.length > 0) {
      _getPregameLeagues();
    }
  }, [sport]);

  useEffect(() => {
    setSport(params.sport);
  }, [params]);

  useEffect(() => {
    const fetchFeaturedMatches = async () => {
      try {
        const matches = await getSoccerFeaturedMatches();
        setFeaturedMatches(matches); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching featured matches:", error);
      }
    };

    fetchFeaturedMatches(); // Call the async function
  }, []); // Empty dependency array for running only once on mount

  if (sport[0] === "soccer") {
    if (sport[1] && sport[1] == "leagues") {
      let leaguesByCountry = leaguesGroupedByCountry;

      //   leagueSelectedGames = await getPregameSoccer(
      //     decodeURIComponent(sport[2])
      //   );
      return (
        <div>
          <NatsSoccer
            sport={sport}
            leaguesByCountry={leaguesByCountry}
            leagueSelectedGames={leagueSelectedGamesState}
          />
          <PopupShowing />
        </div>
      );
    } else {
      let leaguesByCountry = leaguesGroupedByCountry;
      let getLeagues = pregameLeagues as any;
      // console.log({ leagues: getLeagues });

      if (Object.keys(leaguesByCountry).length > 0) {
        return (
          <div>
            <NatsSoccer
              sport={sport}
              leaguesByCountry={leaguesByCountry}
              getLeagues={getLeagues}
              leagueSelectedGames={leagueSelectedGamesState}
            />
            <PopupShowing />
          </div>
        );
      }
    }
  }

  if (sport[0] === "baseball") {
    let getLeagues = pregameLeagues as any;

    if (getLeagues.length > 0) {
      console.log("leagues is");
      console.log(getLeagues);
      return (
        <div>
          <NatsBaseball sport={sport[0]} getLeagues={getLeagues} />;
          <PopupShowing />
        </div>
      );
    }
  }
  if (sport[0] === "basketball") {
    let getLeagues = pregameLeagues as any;

    if (getLeagues?.length > 0) {
      return (
        <div>
          <NatsBasketball sport={sport} getLeagues={getLeagues} />;
          <PopupShowing />
        </div>
      );
    }
  }
  if (sport[0] === "esports") {
    let getLeagues = pregameLeagues as any;
    if (getLeagues.length > 0) {
      return (
        <div>
          <NatsEsport sport={sport} getLeagues={getLeagues} />;
          <PopupShowing />
        </div>
      );
    }
  }
  if (sport[0] === "hockey") {
    let getLeagues = pregameLeagues as any;
    if (getLeagues.length > 0) {
      return (
        <div>
          <NatsHockey sport={sport} getLeagues={getLeagues} />;
          <PopupShowing />
        </div>
      );
    }
  }
  if (sport[0] === "tennis") {
    let getLeagues = pregameLeagues as any;
    if (getLeagues.length > 0) {
      return (
        <div>
          <NatsTennis sport={sport} getLeagues={getLeagues} />;
          <PopupShowing />
        </div>
      );
    }
  }
  if (sport[0] === "volleyball") {
    let getLeagues = pregameLeagues as any;
    if (getLeagues.length > 0) {
      return (
        <div>
          <NatsVolleyball sport={sport} getLeagues={getLeagues} />;
          <PopupShowing />
        </div>
      );
    }
  }
  return (
    <div className="flex h-[calc(100vh_-_105px)] max-w-[1450px] mx-auto">
      <div className="w-[255px] hidden md:flex overflow-auto h-[100%]">
        <NavigationPanel />
      </div>
      <div className="flex flex-col flex-1 bg-[#282828] overflow-auto h-[100%]"></div>
    </div>
  );
};

export default Home;
