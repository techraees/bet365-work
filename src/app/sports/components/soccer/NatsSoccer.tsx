

"use client";

import { connect, NatsConnection, JSONCodec, Msg, NatsError } from "nats.ws";

import { useEffect, useState } from "react";

import * as jsonpatch from "fast-json-patch";
import SoccerWrapper from "./Wrapper";
import DetailSoccer from "./Details";
import NavigationPanel from "../Navigation/navigationpanel";
import LeagueWrapper from "./League/LeagueWrapper";
import Match from "./League/Match/Match";

const sc = JSONCodec();

const SERVER_URL = process.env.NEXT_PUBLIC_NATS_URL!;

console.log({ SERVER_URL });

const Odds = ({ odds, sport, leaguesByCountry, getLeagues, leagueSelectedGames }: any) => {
  const [oddsState, setOddsState] = useState<any>(odds);
  // const [nats, setNats] = useState<NatsConnection>();
  // const [natsConnections, setNatsConnections] = useState<NatsConnection[]>([]);
  const leaguebycountry = JSON.parse(leaguesByCountry?.value)
  // console.log({
  //   odds,
  //   sport,
  //   leaguebycountry,
  //   leagueSelectedGames
  // });
  if (sport[2]) {
    console.log(decodeURIComponent(sport[2]))
  }
  // const addMessage = (err: NatsError | null, message: Msg) => {
  //   console.log("PATCH");
  //   const data: any = sc.decode(message.data);
  //   console.log({ subject: message.subject, patch: data });
  //   try {
  //     const document = jsonpatch.applyPatch(oddsState, data).newDocument;
  //     console.log({ document });
  //     setOddsState({ ...document });
  //   } catch (e) {
  //     console.log({ e });
  //   }
  // };


  // useEffect(() => {
  //   const newNatsConnections: NatsConnection[] = [];
  //   let connections = ["soccer"]

  //   console.log({connections})
  //   connections.forEach((blocks) => {
  //     const natsChannel = `client.odds.live.${blocks.toLowerCase()}`;

  //     (async () => {
  //       try {
  //         console.log("Created NATS connection ", natsChannel);
  //         const nc = await connect({
  //           servers: [SERVER_URL],
  //           tls: null,
  //         });

  //         newNatsConnections.push(nc);

  //         nc.subscribe(natsChannel, {
  //           callback: addMessage,
  //         });
  //       } catch (e) {
  //         console.log({ e });
  //       }
  //     })();
  //   });

  //   setNatsConnections(newNatsConnections);

  //   return () => {
  //     console.log({ natsConnections });
  //     natsConnections.forEach((nc) => {
  //       nc.drain();
  //       nc.close();
  //     });
  //     console.log("Closed NATS connections");
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sport]);
  let show = <></>
  if (sport[1] && sport[1] === "leagues" && sport[2] && sport[3]) {
    show = <Match gameid={sport[3]} league={sport[2]} getLeagues={getLeagues} leagueSelectedGames={leagueSelectedGames} />
  } else if (sport[1] && sport[1] === "leagues" && sport[2]) {
    show = <LeagueWrapper league={sport[2]} getLeagues={getLeagues} leagueSelectedGames={leagueSelectedGames} />
  } else if (sport[1]) {
    show = <DetailSoccer odds={odds} sport={sport[0]} currentdataId={sport[1]} />
  } else {
    show = <SoccerWrapper odds={odds} sport={sport[0]} currentdataId={sport[1]} leaguebycountry={leaguebycountry} />

  }


  return (
    <div className="flex h-[calc(100vh_-_105px)] max-w-[1450px] mx-auto">
      <div className="w-[255px] hidden md:flex overflow-auto h-[100%]">
        <NavigationPanel />
      </div>
      <div className="flex flex-col flex-1 bg-[383838] overflow-auto h-[100%]">
        {/* {sport[1] === "leagues" && sport[2] ?
          <LeagueWrapper league={sport[2]} getLeagues={getLeagues} leagueSelectedGames={leagueSelectedGames} />
          :
          sport[1] ?
            <DetailSoccer odds={odds} sport={sport[0]} currentdataId={sport[1]} />
            :
            <SoccerWrapper odds={odds} sport={sport[0]} currentdataId={sport[1]} leaguebycountry={leaguebycountry} />
        } */}
        {show}
      </div>
    </div>)


};

export default Odds;

