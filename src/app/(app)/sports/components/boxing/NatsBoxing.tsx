

"use client";

import { connect, NatsConnection, JSONCodec, Msg, NatsError } from "nats.ws";

import { useEffect, useState } from "react";

import * as jsonpatch from "fast-json-patch";
import NavigationPanel from "../Navigation/navigationpanel";
import BoxingWrapper from "./BoxingWrapper";
const sc = JSONCodec();

const SERVER_URL = process.env.NEXT_PUBLIC_NATS_URL!;

console.log({ SERVER_URL });

const Odds = ({ odds, sport, getLeagues }: any) => {
  const [oddsState, setOddsState] = useState<any>(odds);
  
  if (sport[2]) {
    console.log(decodeURIComponent(sport[2]))
  }
  console.log({odds, sport, getLeagues})

  return (
    <div className="flex h-[calc(100vh_-_105px)] max-w-[1450px] mx-auto">
      <div className="w-[255px] hidden md:flex overflow-auto h-[100%]">
        <NavigationPanel />
      </div>
      <div className="flex flex-col flex-1 bg-[383838] overflow-auto h-[100%]">
        <BoxingWrapper odds={odds} sport={sport[0]} currentdataId={sport[1]}  />
      </div>
    </div>)


};

export default Odds;

