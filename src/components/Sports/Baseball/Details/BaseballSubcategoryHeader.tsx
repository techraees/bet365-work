import Event from "@/components/Events/Event";
import StarOutlineIcon from "@/components/ui/icons/star-outline";
import React from "react";
import BaseballEvent from "../BaseballEvent";

interface GropedEventsInterface {
    name: string;
    events: any;
    sport: string;
    subcategory?: string;
}

const BaseballSubcategoryHeader: React.FC<GropedEventsInterface> = ({ name, events, sport, subcategory }) => {
    return (
        <div className="flex flex-col text-xs font-bold text-white mb-[5px]">
            <div className={`grid grid-cols-11 h-[35px] w-full px-8 bg-[hsla(0,0%,100%,.1)] justify-center`}>
                <div className="col-span-5 flex items-center  gap-4">
                    <StarOutlineIcon className=" hover:fill-[#333] fill-transparent cursor-pointer" />
                    {name}
                </div>
                <div className="col-span-5 flex">
                    <div className="flex flex-1 items-center justify-center">Run Line</div>
                    <div className="flex flex-1 items-center justify-center">Total</div>
                    <div className="flex flex-1 items-center justify-center">Money Line</div>
                </div>
                <div className="flex items-center justify-center"></div>
            </div>
            {events.map((event: any, index: number) => (
                <BaseballEvent key={index} data={event} sport={sport} subcategory={subcategory} />
            ))}
        </div>
    )
}


export default BaseballSubcategoryHeader;


