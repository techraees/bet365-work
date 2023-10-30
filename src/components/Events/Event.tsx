import React from "react";
import Link from "next/link";
import StarOutlineIcon from "../ui/icons/star-outline";
import SoccerJersey from "../Sports/Soccer/Jersey";
// import Stats from "../Sports/Soccer/stats";
import BasketballJersey from "../Sports/Basketball/Jersey";
// import SoccerOdds from "../Sports/Soccer/odds";
import TennisOdds from "../Sports/Tennis/odds";
import { defaultSubcategories } from "@/lib/sportsMapping";
import Points from "./Points";
import { cn } from "@/lib/utils";
import TennisEvent from "../Sports/Tennis/TennisEvent";
import BaskeballEvent from "../Sports/Basketball/BasketballEvent";
import BaseballEvent from "../Sports/Baseball/BaseballEvent";
import SoccerEvent from "../Sports/Soccer/SoccerEvent";
interface EventProps {
  data: any;
  sport: string;
  subcategory?: string;
}

const Event: React.FC<EventProps> = ({ data, sport, subcategory }) => {
  console.log({ data, sport })
  if (!data) {
    return null;
  }
  if (sport === "tennis") {
    return <TennisEvent data={data} sport={sport} subcategory={subcategory} />
  } else if (sport === "basketball") {
    return <BaskeballEvent data={data} sport={sport} subcategory={subcategory} />
  } else if (sport === "baseball") {
    return <BaseballEvent data={data} sport={sport} subcategory={subcategory} />
  } else if (sport === "soccer") {
    return <SoccerEvent data={data} sport={sport} subcategory={subcategory} />
  }
  return (
    <div className="flex flex-col border-t-[#ffffff1a] border-t border-solid">
      <div className={cn(`grid grid-cols-8 w-full px-8  justify-center h-[70px]`,
      )}>
        <div className=" col-span-4 flex items-center text-xs font-bold text-white gap-4 py-[10px]">
          <StarOutlineIcon className=" hover:fill-[#333] fill-transparent cursor-pointer" />
          {/* {name} */}
          <Link
            href={`/in-play/${sport}/${subcategory ? subcategory : defaultSubcategories[sport as keyof typeof defaultSubcategories]}/${data?.info?.id}`}
            className="w-[100%]"
          >
            <div className="flex items-center">

              <div className="flex text-[#ccc] text-[11px] font-[400]">
                <div className="flex w-[50px]">{data?.info?.seconds}</div>
              </div>

              <div className="flex flex-col text-[13px] font-semibold hover:text-brand-green-light cursor-pointer w-[calc(100%_-_180px)]">
                <div className="flex h-[25px] items-center">
                  <div className="min-w-[15px] min-h-[15px] h-[15px] w-[15px] mr-[10px]">
                    {sport === "basketball" &&
                      <BasketballJersey />
                    }
                    {sport === "soccer" &&
                      <SoccerJersey data={data} team={'home'} />
                    }
                  </div>
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {data?.team_info?.home.name}
                  </div>
                </div>
                <div className="flex h-[25px] items-center">
                  <div className="min-w-[15px] min-h-[15px] h-[15px] w-[15px] mr-[10px]">
                    {sport === "basketball" &&
                      <BasketballJersey />
                    }
                    {sport === "soccer" &&
                      <SoccerJersey data={data} team={'away'} />
                    }
                  </div>
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {data?.team_info?.away.name}
                  </div>
                </div>
              </div>
              <div className="flex ml-[auto]">
                <Points data={data} sport={sport} />

                {/* <Stats /> */}

              </div>
            </div>
          </Link>

        </div>
        {/* {sport === "soccer" &&
          <SoccerOdds data={data} sport={sport} subcategory={subcategory} />
        } */}

      </div>
    </div>
  );
};

export default Event;
