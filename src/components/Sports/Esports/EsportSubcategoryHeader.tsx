import Event from "@/components/Events/Event";
import StarOutlineIcon from "@/components/ui/icons/star-outline";
import React from "react";
import EsportEvent from "./EsportEvent";
// import VolleyballEvent from "../VolleyballEvent";

interface EsportSubcategoryInterface {
    esportTag: string;
    title: string;
    name: string;
    events: any;
    sport: string;
    subcategory?: string;
}

const EsportSubcategoryHeader: React.FC<EsportSubcategoryInterface> = ({ esportTag, title, name, events, sport, subcategory }) => {
    console.log('EsportSubcategoryHeader', esportTag, name, events, sport, subcategory)


    const content = () => {
        if (esportTag === "Live Map Games") {
            if (subcategory === "totalMaps") {
                return (
                    <div className="col-span-5 flex">
                        <div className="flex flex-1 items-center justify-center">Over</div>
                        <div className="flex flex-1 items-center justify-center">Under</div>
                    </div>
                )
            } else {
                return (
                    <div className="col-span-5 flex">
                        <div className="flex flex-1 items-center justify-center">1</div>
                        <div className="flex flex-1 items-center justify-center">2</div>
                    </div>
                )
            }

        }
        if (esportTag === "Sports Based Games") {
            if (subcategory === undefined || subcategory === "mapWinner" || subcategory === "matchWinner") {
                if (title === "Esoccer") {
                    return (
                        <div className="col-span-5 flex">
                            <div className="flex flex-1 items-center justify-center">1</div>
                            <div className="flex flex-1 items-center justify-center">X</div>
                            <div className="flex flex-1 items-center justify-center">2</div>
                        </div>
                    )
                } else if (title === "Ebasketball") {
                    return (
                        <div className="col-span-5 flex">
                            <div className="flex flex-1 items-center justify-center">Spread</div>
                            <div className="flex flex-1 items-center justify-center">Total</div>
                            <div className="flex flex-1 items-center justify-center">Money Line</div>
                        </div>
                    )
                }
            } else {
                return null
            }
        }
        if (subcategory === "totalMaps") {
            return (
                <div className="col-span-5 flex">
                    <div className="flex flex-1 items-center justify-center">Over</div>
                    <div className="flex flex-1 items-center justify-center">Under</div>
                </div>
            )
        } else {
            return (
                <div className="col-span-5 flex">
                    <div className="flex flex-1 items-center justify-center">1</div>
                    <div className="flex flex-1 items-center justify-center">2</div>
                </div>
            )
        }
    }
    return (
        <div className="flex flex-col text-xs font-bold text-white mb-[5px]">
            <div className={`grid grid-cols-11 h-[35px] w-full px-8 bg-[hsla(0,0%,100%,.1)] justify-center`}>
                <div className="col-span-5 flex items-center  gap-4">
                    <StarOutlineIcon className=" hover:fill-[#333] fill-transparent cursor-pointer" />
                    {name}
                </div>
                {content()}
                <div className="flex items-center justify-center"></div>
            </div>
            {events.map((event: any, index: number) => (
                <EsportEvent key={index} title={title} data={event} sport={sport} subcategory={subcategory} />
            ))}
        </div>
    )
}


export default EsportSubcategoryHeader;


