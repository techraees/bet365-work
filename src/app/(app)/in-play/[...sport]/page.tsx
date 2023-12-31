"use client";
import Nats from "@/components/Nats";
import { getSportsOdds } from "@/api";
import SportDetailHeader from "../components/SportDetailHeader";
import Esports from "@/components/Sports/Esports/EsportsWrapper";
import requireSession from "@/lib/request-session";
import SportsHeader from "../components/SportsHeader";
import PopupShowing from "@/components/CollectingPopup/ConditionalPopup/PopupShowing";
import { useEffect, useState } from "react";

const Home = ({ params }: any) => {
  // const session = await requireSession();
  // let { sport } = params;
  console.log({ params: params });

  const [odds, setOdds] = useState<any>({});
  //TODO MAKE THIS PAYLOAD SMALLER
  let sport = params.sport;
  // let odds = await getSportsOdds(sport[0]);
  // console.log("in-play", sport[0], { odds });
  // if (sport[0] === "esports") {
  //   let soccerodds = await getSportsOdds("esoccer");
  //   let basketballodds = await getSportsOdds("basketball");
  //   odds = { ...odds, ...soccerodds, ...basketballodds };
  // }

  useEffect(() => {
    const fetchOdds = async () => {
      let oddsData = await getSportsOdds(sport[0]);
      console.log("in-play", sport[0], { oddsData });

      if (sport[0] === "esports") {
        let soccerOdds = await getSportsOdds("esoccer");
        let basketballOdds = await getSportsOdds("basketball");
        oddsData = { ...oddsData, ...soccerOdds, ...basketballOdds };
      }

      setOdds(oddsData); // Update the state variable
    };

    fetchOdds();
  }, []); // Add dependencies in the array if needed

  // console.log({ odds, leagues });

  const NoOddsFound = () => {
    return (
      <>
        <SportsHeader />
        <div className="pt-5 text-white flex items-center">No odds found</div>
        <PopupShowing />
      </>
    );
  };

  if (odds === undefined || Object.keys(odds).length === 0) {
    return <NoOddsFound />;
  }

  if (odds?.message) {
    return (
      <div>
        {" "}
        <SportsHeader />
        <div className="pt-5 text-white flex items-center">No odds found</div>
      </div>
    );
  }
  return (
    <>
      <Nats
        odds={odds}
        sport={sport[0]}
        subcategory={sport[1]}
        currentdataId={sport[2]}
      />
      <PopupShowing />
    </>
  );
};

export default Home;
