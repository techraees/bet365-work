import React from "react";
import Link from "next/link";
import { defaultSubcategories } from "@/lib/sportsMapping";
import { cn } from "@/lib/utils";
import StarOutlineIcon from "@/components/ui/icons/star-outline";
import Chevron from "@/components/ui/icons/chevron";
import BasketballJersey from "./Jersey";
import ValleyballPoints from "./Points";
import VolleyballOdds from "./odds";
import VolleyballPoints from "./Points";
import usePitchIdStore from "@/store/use-pitchid";
import TennisField from "@/components/ui/icons/tennisfield";
import TennisFieldHover from "@/components/ui/icons/tennisfieldHover";
interface VolleyballEventProps {
  data: any;
  sport: string;
  subcategory?: string;
}

const VolleyballEvent: React.FC<VolleyballEventProps> = ({
  data,
  sport,
  subcategory,
}) => {
  const { currentPitchId, setCurrentPitchId } = usePitchIdStore(
    (state) => state
  );
  // console.log({ data, sport })
  if (!data) {
    return null;
  }
  return (
    <div className="flex flex-col border-t-[#ffffff1a] border-t border-solid">
      <div
        className={cn(
          `grid grid-cols-11 w-full px-8  justify-center h-[100px]`
        )}
      >
        <div className=" col-span-5 flex items-center text-xs font-bold text-white gap-4 py-[10px]">
          <StarOutlineIcon className=" hover:fill-[#333] fill-transparent cursor-pointer" />
          <Link
            href={`/in-play/${sport}/${
              subcategory
                ? subcategory
                : defaultSubcategories[
                    sport as keyof typeof defaultSubcategories
                  ]
            }/${data?.info?.id}`}
            className="w-[100%] flex-col"
          >
            <div className="flex items-left text-[11px] font-[400]">
              {/* <div className="flex flex-col text-[13px] font-semibold hover:text-brand-green-light cursor-pointer w-[calc(100%_-_100px)] md:w-[calc(100%_-_180px)]"> */}
              <div className="flex flex-col text-[13px] font-semibold hover:text-brand-green-light cursor-pointer w-[calc(100%_-_100px)] md:w-[calc(100%_-_180px)]">
                <div className="flex h-[25px] items-center">
                  <div className="min-w-[15px] min-h-[15px] h-[15px] w-[15px] mr-[10px]">
                    <BasketballJersey />
                  </div>
                  <div
                    className={cn(
                      "w-[5px] h-[5px] mr-[5px] rounded-[50%]",
                      false ? "bg-[#ffde00]" : "bg-[#ffffff4d]"
                    )}
                  />
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {data?.team_info?.home.name}
                  </div>
                </div>
                <div className="flex h-[25px] items-center">
                  <div className="min-w-[15px] min-h-[15px] h-[15px] w-[15px] mr-[10px]">
                    <BasketballJersey />
                  </div>
                  <div
                    className={cn(
                      "w-[5px] h-[5px] mr-[5px] rounded-[50%]",
                      true ? "bg-[#ffde00]" : "bg-[#ffffff4d]"
                    )}
                  />
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {data?.team_info?.away.name}
                  </div>
                </div>
              </div>
              <div className="flex ml-[auto]">
                <ValleyballPoints data={data} sport={sport} />
              </div>
            </div>
            <div className="flex h-[25px] items-center font-[400]">
              <div className="flex items-center fill-[#fff]  hover:text-brand-green-light hover:fill-brand-green-light">
                {"17"}
                <Chevron className={cn("h-[6px] w-[12px] rotate-[270deg]")} />
              </div>
            </div>
          </Link>
        </div>
        <VolleyballOdds data={data} sport={sport} subcategory={subcategory} />
        <div className="group items-center col-span-1 justify-center cursor-pointer hidden md:flex">
          <div
            className={`${
              currentPitchId == data.info.id ? "hidden" : "flex"
            } group-hover:hidden`}
          >
            <TennisField />
          </div>
          <div
            className={`${
              currentPitchId == data.info.id ? "flex" : "hidden"
            } group-hover:flex`}
            onClick={() => {
              setCurrentPitchId(data.info.id);
            }}
          >
            <TennisFieldHover />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolleyballEvent;
