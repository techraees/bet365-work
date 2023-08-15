import Event from "@/components/Events/Event";
import StarOutlineIcon from "@/components/ui/icons/star-outline";
import React from "react";

interface GropedEventsInterface {
    name: string;
    events: any;
    sport: string;
    subcategory?: string;
}

const BasketballSubcategoryHeader: React.FC<GropedEventsInterface> = ({ name, events, sport, subcategory }) => {


    return (
        <div className="flex flex-col text-xs font-bold text-white mb-[5px]">
            <div className={`flex h-[35px] w-full px-2 md:px-8 bg-[hsla(0,0%,100%,.1)] justify-center`}>
                <div className="flex-1 flex items-center  gap-4 overflow-hidden">
                    <StarOutlineIcon className=" hover:fill-[#333] fill-transparent cursor-pointer hidden md:flex" />
                    <div className="truncate">{name}</div>
                </div>
                <div className="flex-1 flex">
                    {subcategory === "tiedAtEndOfRegulation" ?
                        <div className="flex-1 flex">
                            <div className="flex flex-1 items-center justify-center">
                                <div className="truncate">Yes</div>
                            </div>
                            <div className="flex flex-1 items-center justify-center">
                                <div className="truncate">No</div>
                            </div>
                        </div> :
                        <div className="flex-1 flex">
                            <div className="flex flex-1 items-center justify-center overflow-hidden">
                                <div className="truncate">Spread</div>
                            </div>
                            <div className="flex flex-1 items-center justify-center overflow-hidden">
                                <div className="truncate">Total</div>
                            </div>
                            <div className="flex flex-1 items-center justify-center overflow-hidden">
                                <div className="truncate">Money Line</div>
                            </div>
                        </div>
                    }
                    <div className=" items-center justify-center hidden md:flex w-[50px]"></div>
                </div>

            </div>
            {events.map((event: any, index: number) => (
                <Event key={index} data={event} sport={sport} subcategory={subcategory} />
            ))}
        </div>
    )
}


export default BasketballSubcategoryHeader;


