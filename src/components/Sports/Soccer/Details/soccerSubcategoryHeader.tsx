import React from "react";
import Event from "@/components/Events/Event";
import StarOutlineIcon from "@/components/ui/icons/star-outline";

interface GropedEventsInterface {
    name: string;
    events: any;
    sport: string;
    subcategory?: string;
}

const SoccerSubcategoryHeader: React.FC<GropedEventsInterface> = ({ name, events, sport, subcategory }) => {
    let show = (
        <div className="flex-1 flex">
            <div className="flex flex-1 items-center justify-center">1</div>
            <div className="flex flex-1 items-center justify-center">X</div>
            <div className="flex flex-1 items-center justify-center">2</div>
            <div className="hidden md:flex md:w-[50px] items-center justify-center"></div>
        </div>)


    if (subcategory === "fulltimeResult") {
        show = (
            <div className="flex-1 flex">
                <div className="flex flex-1 items-center justify-center">1</div>
                <div className="flex flex-1 items-center justify-center">X</div>
                <div className="flex flex-1 items-center justify-center">2</div>
                <div className="hidden md:flex md:w-[50px] items-center justify-center"></div>
            </div>
        )
    } else if (subcategory === "matchGoals" || subcategory === "goalLineInPlay") {
        show = (<>
            <div className="flex-1 flex">
                <div className="flex flex-1 items-center justify-center">Over</div>
                <div className="flex flex-1 items-center justify-center">Under</div>
                <div className="hidden md:flex md:w-[50px] items-center justify-center"></div>
            </div>
        </>
        )
    } else if (subcategory === "asianHandicapInPlay") {
        show = (
            <div className="flex-1 flex">
                <div className="flex flex-1 items-center justify-center">1</div>
                <div className="flex flex-1 items-center justify-center">2</div>
                <div className="hidden md:flex md:w-[50px] items-center justify-center"></div>
            </div>

        )
    }

    return (
        <div className="flex flex-col text-xs font-bold text-white mb-[5px] ">
            <div className={`flex h-[35px] w-full px-2 md:px-8 bg-[hsla(0,0%,100%,.1)] justify-center overflow-hidden`}>
                <div className="flex-1 flex items-center  gap-4 truncate overflow-hidden">
                    <StarOutlineIcon className=" hover:fill-[#333] fill-transparent cursor-pointer hidden md:flex" />
                    <div className="truncate">
                        {name}
                    </div>
                </div>
                {show}
            </div>
            {events.map((event: any, index: number) => (
                <Event key={index} data={event} sport={sport} subcategory={subcategory} />
            ))}
        </div>
    )

}


export default SoccerSubcategoryHeader;

