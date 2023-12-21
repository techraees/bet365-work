"use client";
import Chevron from "@/components/ui/icons/chevron";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import MatchBody from "./MatchBody";
import { getPregame } from "@/api";

const Match = ({ sport, league, gameid }: any) => {
  const [active, setActive] = useState("Main Markets");
  // console.log('league clicked', decodeURIComponent(league))

  const [odds, setOdds] = useState<any>(null);
  useEffect(() => {
    const fetchPregames = async () => {
      try {
        const matches = await getPregame(sport, league);
        setOdds(matches); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching featured matches:", error);
      }
    };

    fetchPregames(); // Call the async function
  }, []); // Empty dependency array for running only once on mount

  if (odds === null) {
    return;
  }

  const match = odds?.filter((item: any) => {
    return item.id === gameid;
  })[0];

  const router = useRouter();
  const tabs = {
    basketball: [
      "Main Markets",
      "Bet Builder",
      "Main Props",
      "Team Props",
      "Quarter Props",
      "Half Props",
    ],
  };
  return (
    <div className="text-base">
      <div className="min-h-[80px] w-full bg-[linear-gradient(rgba(12,22,20,.1),transparent_20px),radial-gradient(122%_370px_at_center_-220px,#009969_0,transparent_100%),linear-gradient(to_right_bottom,#0c1614,#084436)]">
        <button
          onClick={() => router.back()}
          className="w-[100%] text-[hsla(0,0%,100%,.8)] hover:text-[white] fill-[hsla(0,0%,100%,.8)] hover:fill-[white]"
        >
          <div className="flex items-center min-h-[45px] text-[12px]  px-[30px] py-0 mt-[5px]">
            <Chevron className="h-[5px] w-[8px] rotate-90" />
            <div className="pl-[5px]">{`Basketball - ${decodeURIComponent(
              league
            ).replace(":", "")}`}</div>
          </div>
        </button>
        <div className=" relative flex items-center justify-between text-xl text-[white] font-bold px-[30px] py-0 mx-0 my-[5px] min-h-[55px] cursor-pointer">
          <div
            className="flex items-center  hover:underline"
            onClick={() => {}}
          >
            {`${match?.localteam?.name} v ${match?.visitorteam?.name}`}
            <Chevron className="ml-[7px] fill-white h-[6px] w-[12px]" />
          </div>
        </div>
        <div className="flex items-center min-h-[50px] text-[white] text-[13px]">
          <div className="flex items-center mx-[20px] relative w-full whitespace-nowrap overflow-scroll hidescroll">
            {tabs["basketball"]?.map((tab, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    "cursor-pointer flex items-center justify-center px-[10px] z-20",
                    active == tab
                      ? "text-[black] font-bold transition duration-300 ease-in-out self-center h-[26px] rounded-[13px] bg-[#00ffb6]"
                      : "h-[50px]"
                  )}
                  onClick={(e) => {
                    setActive(tab);
                  }}
                >
                  {tab}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full">
        <MatchBody data={match} active={active} />
      </div>
    </div>
  );
};

export default Match;
