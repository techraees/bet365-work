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
            <div className={`flex h-[35px] w-full px-2 md:px-8 bg-[hsla(0,0%,100%,.1)] justify-center`}>
                <div className="flex-1 flex items-center  gap-4 overflow-hidden">
                    <StarOutlineIcon className=" hover:fill-[#333] fill-transparent cursor-pointer hidden md:flex" />
                    <div className="truncate">
                        {name}
                    </div>
                </div>
                <div className="flex-1 flex items-center ">
                    <div className="flex flex-1 items-center justify-center overflow-hidden">
                        <div className="truncate">
                            Run Line
                        </div>
                    </div>
                    <div className="flex flex-1 items-center justify-center overflow-hidden">
                        <div className="truncate">
                            Total
                        </div>
                    </div>
                    <div className="flex flex-1 items-center justify-center overflow-hidden">
                        <div className="truncate">Money Line</div>
                    </div>
                </div>
                <div className="hidden md:flex md:w-[50px] items-center justify-center"></div>
            </div>
            {events.map((event: any, index: number) => (
                <BaseballEvent key={index} data={event} sport={sport} subcategory={subcategory} />
            ))}
        </div>
    )
}


export default BaseballSubcategoryHeader;


