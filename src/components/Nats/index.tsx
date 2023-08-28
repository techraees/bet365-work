"use client";

import { connect, NatsConnection, JSONCodec, Msg, NatsError } from "nats.ws";

import { useEffect, useRef, useState } from "react";
import OddsTable from "../OddsTable";
import * as jsonpatch from "fast-json-patch";
import SportDetailHeader from "@/app/in-play/components/SportDetailHeader";
import GroupedEvents from "../Events/Grouped";
import SportsHeader from "@/app/in-play/components/SportsHeader";
import DetailView from "../Events/DetailView";
import Esports from "../Sports/Esports/EsportsWrapper";
import { useRouter } from "next/navigation";


const sc = JSONCodec();

const SERVER_URL = process.env.NEXT_PUBLIC_NATS_URL!;


const Odds = ({ odds, sport, subcategory, currentdataId }: any) => {
  const [oddsState, setOddsState] = useState<any>(odds);
  const [natsConnections, setNatsConnections] = useState<NatsConnection[]>([]);

  const natsConnectionsRef = useRef(natsConnections); // Create a mutable ref

  const route = useRouter()


  const addMessage = (err: NatsError | null, message: Msg) => {
    console.log("PATCH");
    const data: any = sc.decode(message.data);
    console.log({ subject: message.subject, patch: data });
    try {
      const document = jsonpatch.applyPatch(oddsState, data).newDocument;


      console.log({ document });
      setOddsState({ ...document });
    } catch (e) {
      console.log({ e });
      route.refresh()
    }
  };

  useEffect(() => {
    const newNatsConnections: NatsConnection[] = [];
    let connections = [sport]
    if (sport === "esports") {
      connections = ['esport', 'esoccer', 'basketball']
    }
    console.log({connections})
    connections.forEach((blocks) => {
      const natsChannel = `client.odds.live.${blocks.toLowerCase()}`;

      (async () => {
        try {
          console.log("Created NATS connection ", natsChannel);
          const nc = await connect({
            servers: [SERVER_URL],
            tls: null,
          });

          newNatsConnections.push(nc);

          nc.subscribe(natsChannel, {
            callback: addMessage,
          });
        } catch (e) {
          console.log({ e });
        }
      })();
    });

    setNatsConnections(newNatsConnections);

    natsConnectionsRef.current = newNatsConnections;
    return () => {
      console.log({ nats: natsConnectionsRef.current });
      natsConnectionsRef.current.forEach((nc: any) => {
        nc.drain();
        nc.close();
      });
      console.log("Closed NATS connections");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sport]);
  // useEffect(() => {
  //   let nc: NatsConnection | null = null;
  //   const natsChannel = `client.odds.live.${sport.toLowerCase()}`;
  //   (async () => {
  //     try {
  //       console.log("Created NATS connection ", natsChannel);
  //       nc = await connect({
  //         servers: [SERVER_URL],
  //         tls: null,
  //       });
  //       setNats(nc);

  //       nc.subscribe(natsChannel, {
  //         callback: addMessage,
  //       });
  //     } catch (e) {
  //       console.log({ e });
  //     }
  //   })();

  //   return () => {
  //     console.log({ nc });
  //     nc?.drain();
  //     nc?.close();
  //     console.log("Closed NATS connection ", natsChannel);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sport]);

  var grouped_leagues = {} as any;
  for(var event_id in oddsState){
    var event_obj = oddsState[event_id];
    var league_name= event_obj.raw_object.info.league;
    if(grouped_leagues[league_name] === undefined){
      grouped_leagues[league_name] = [event_obj.raw_object]
    }else{
      grouped_leagues[league_name].push(event_obj.raw_object);
    }
  }

  const grouped = Object.entries(grouped_leagues).map(([leagueName, eventIds]: any) => {
    const eventsArray = eventIds;
    return {
      name: leagueName,
      events: eventsArray,
    };
  });

  console.log({ grouped })
  console.log({ currentdataId })
  if (sport === "esports") {
    if (sport && currentdataId) {
      return (
        <div>
          <DetailView grouped={grouped} sport={sport} subcategory={subcategory} currentdataId={currentdataId} />
        </div>
      )
    }
    return <Esports sport={sport} subcategory={subcategory} currentdataId={currentdataId} grouped={grouped} />
  }

  return (
    <div className=" bg-topGradient">
      {sport && currentdataId ?
        <div>
          <DetailView grouped={grouped} sport={sport} subcategory={subcategory} currentdataId={currentdataId} />
        </div> :
        <>
          <SportsHeader />
          <div>
            <SportDetailHeader sport={sport} subcategory={subcategory} />
            <div className="flex flex-col w-full">
              {grouped.map((group, index): any => {
                return (
                  <GroupedEvents key={index} name={group.name} events={group.events} sport={sport} subcategory={subcategory} />
                );
              })}
            </div>
          </div>
        </>

      }
    </div>
  );
};

export default Odds;

