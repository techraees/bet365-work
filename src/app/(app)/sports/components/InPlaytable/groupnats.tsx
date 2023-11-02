"use client";

import { connect, NatsConnection, JSONCodec, Msg, NatsError } from "nats.ws";

import { useEffect, useRef, useState } from "react";
import * as jsonpatch from "fast-json-patch";
import { cn } from "@/lib/utils";
import Chevron from "@/components/ui/icons/chevron";
import SoccerTable from "./SoccerTable";
import TennisTable from "./TennisTable";
import { useRouter } from "next/navigation";
import CollectingPopup from "../CollectingPopup/CollectingPopup";

const sc = JSONCodec();

const SERVER_URL = process.env.NEXT_PUBLIC_NATS_URL!;

// console.log({ SERVER_URL });

const Groupnats = ({
  soccerodds,
  soccerleagues,
  tennisodds,
  tennisleagues,
  basketballodds,
  basketballleagues,
  cricketodds,
  cricketleagues,
}: any) => {
  const [oddsState, setOddsState] = useState<any>({
    ...soccerodds,
    ...tennisodds,
    ...basketballodds,
    ...cricketodds,
  });

  const [natsConnections, setNatsConnections] = useState<NatsConnection[]>([]);

  const natsConnectionsRef = useRef(natsConnections); // Create a mutable ref

  const router = useRouter();

  const addMessage = (err: NatsError | null, message: Msg) => {
    // console.log("PATCH");
    const data: any = sc.decode(message.data);
    // console.log({ subject: message.subject, patch: data });
    try {
      const start = performance.now();

      const document = jsonpatch.applyPatch(oddsState, data).newDocument;
      const end = performance.now();
      const loadTime = end - start;
      // console.log(`Page load time: ${loadTime}ms`);

      // console.log({ document });
      setOddsState({ ...document });
    } catch (e) {
      // console.log({ e });
      router.refresh();
    }
  };

  useEffect(() => {
    const newNatsConnections: NatsConnection[] = [];

    let connections = ["soccer", "tennis", "basketball", "cricket"];

    // console.log({ connections });
    connections.forEach((blocks) => {
      const natsChannel = `client.odds.live.${blocks.toLowerCase()}`;

      (async () => {
        try {
          // console.log("Created NATS connection ", natsChannel);
          const nc = await connect({
            servers: [SERVER_URL],
            tls: null,
          });

          newNatsConnections.push(nc);

          nc.subscribe(natsChannel, {
            callback: addMessage,
          });
        } catch (e) {
          // console.log({ e });
        }
      })();
    });

    setNatsConnections(newNatsConnections);
    natsConnectionsRef.current = newNatsConnections;
    return () => {
      // console.log({ nats: natsConnectionsRef.current });
      natsConnectionsRef.current.forEach((nc: any) => {
        nc.drain();
        nc.close();
      });
      // console.log("Closed NATS connections");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const soccergrouped = Object.entries(soccerleagues).map(
    ([leagueName, eventIds]: any) => {
      const eventsArray = eventIds.map(
        (eventId: any) => soccerodds[eventId]?.raw_object
      );
      return {
        name: leagueName,
        events: eventsArray,
      };
    }
  );
  const tennisgrouped = Object.entries(tennisleagues).map(
    ([leagueName, eventIds]: any) => {
      const eventsArray = eventIds.map(
        (eventId: any) => tennisodds[eventId]?.raw_object
      );
      return {
        name: leagueName,
        events: eventsArray,
      };
    }
  );
  const basketballgrouped = Object.entries(basketballleagues).map(
    ([leagueName, eventIds]: any) => {
      const eventsArray = eventIds.map(
        (eventId: any) => basketballodds[eventId]?.raw_object
      );
      return {
        name: leagueName,
        events: eventsArray,
      };
    }
  );
  const cricketgrouped = Object.entries(cricketleagues).map(
    ([leagueName, eventIds]: any) => {
      const eventsArray = eventIds.map(
        (eventId: any) => cricketodds[eventId]?.raw_object
      );
      return {
        name: leagueName,
        events: eventsArray,
      };
    }
  );

  // Array Showing Logic
  const [selectedBidsArr, setSelectedBidsArr] = useState<any>([]);

  return (
    <div className="flex flex-col">
      <SoccerTable
        soccergrouped={soccergrouped}
        selectedArray={selectedBidsArr}
        setSelectedArray={setSelectedBidsArr}
      />
      <TennisTable
        tennisgrouped={tennisgrouped}
        selectedArray={selectedBidsArr}
        setSelectedArray={setSelectedBidsArr}
      />

      <CollectingPopup
        selectedArray={selectedBidsArr}
        setSelectedArray={setSelectedBidsArr}
      />
    </div>
  );
};

export default Groupnats;
