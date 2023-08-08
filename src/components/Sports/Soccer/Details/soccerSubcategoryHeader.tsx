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
    <div className="col-span-5 flex">
        <div className="flex flex-1 items-center justify-center">1</div>
        <div className="flex flex-1 items-center justify-center">X</div>
        <div className="flex flex-1 items-center justify-center">2</div>
    </div>)


    if (subcategory === "fulltimeResult") {
        show = (
        <div className="col-span-5 flex">
            <div className="flex flex-1 items-center justify-center">1</div>
            <div className="flex flex-1 items-center justify-center">X</div>
            <div className="flex flex-1 items-center justify-center">2</div>
        </div>
        )
    } else if (subcategory === "matchGoals" || subcategory === "goalLineInPlay") {
        show = (<>
            <div className="col-span-5 flex">
                <div className="flex flex-1 items-center justify-center">Over</div>
                <div className="flex flex-1 items-center justify-center">Under</div>
            </div>
        </>
        )
    } else if (subcategory === "asianHandicapInPlay") {
        show = (
            <div className="col-span-5 flex">
                <div className="flex flex-1 items-center justify-center">1</div>
                <div className="flex flex-1 items-center justify-center">2</div>
            </div>

        )
    }

    return (
        <div className="flex flex-col text-xs font-bold text-white mb-[5px]">
            <div className={`grid grid-cols-11 h-[35px] w-full px-8 bg-[hsla(0,0%,100%,.1)] justify-center`}>
                <div className="col-span-5 flex items-center  gap-4">
                    <StarOutlineIcon className=" hover:fill-[#333] fill-transparent cursor-pointer" />
                    {name}
                </div>
                {show}
                <div className="flex items-center justify-center"></div>
            </div>
            {events.map((event: any, index: number) => (
                <Event key={index} data={event} sport={sport} subcategory={subcategory} />
            ))}
        </div>
    )

}


export default SoccerSubcategoryHeader;

