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
                    <div className="flex-1 flex">
                        <div className="flex flex-1 items-center justify-center">Over</div>
                        <div className="flex flex-1 items-center justify-center">Under</div>
                    </div>
                )
            } else {
                return (
                    <div className="flex-1 flex">
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
                        <div className="flex-1 flex">
                            <div className="flex flex-1 items-center justify-center">1</div>
                            <div className="flex flex-1 items-center justify-center">X</div>
                            <div className="flex flex-1 items-center justify-center">2</div>
                        </div>
                    )
                } else if (title === "Ebasketball") {
                    return (
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
                    )
                }
            } else {
                return null
            }
        }
        if (subcategory === "totalMaps") {
            return (
                <div className="flex-1 flex">
                    <div className="flex flex-1 items-center justify-center">Over</div>
                    <div className="flex flex-1 items-center justify-center">Under</div>
                </div>
            )
        } else {
            return (
                <div className="flex-1 flex">
                    <div className="flex flex-1 items-center justify-center">1</div>
                    <div className="flex flex-1 items-center justify-center">2</div>
                </div>
            )
        }
    }
    return (
        <div className="flex flex-col text-xs font-bold text-white mb-[5px]">
            <div className={`flex h-[35px] w-full px-2 md:px-8 bg-[hsla(0,0%,100%,.1)] justify-center`}>
                <div className="flex-1 flex items-center  gap-4 overflow-hidden">
                    <StarOutlineIcon className=" hover:fill-[#333] fill-transparent cursor-pointer md:flex hidden" />
                    <div className="truncate">{name}</div>
                </div>
                {content()}
                <div className=" items-center justify-center w-[50px] md:flex hidden"></div>
            </div>
            {events.map((event: any, index: number) => (
                <EsportEvent key={index} title={title} data={event} sport={sport} subcategory={subcategory} />
            ))}
        </div>
    )
}


export default EsportSubcategoryHeader;


