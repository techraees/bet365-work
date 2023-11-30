import { cn } from "@/lib/utils";
import React from "react";
import EsportSubcategoryHeader from "./EsportSubcategoryHeader";

interface EsportTagInterface {
    data: string;
}


const EsportTag: React.FC<EsportTagInterface> = ({ data }) => {
    return (
        <div className={cn(`grid overflow-hidden h-[30px] w-[100%] bg-[hsla(0,0%,100%,.07)] text-[white] px-8`)}>
            <div className='text-xs h-[30px] flex items-center font-[700]'>
                {data}
            </div>
        </div>
    )
}
const EsportBody = ({ header, sport, subcategory, grouped }: any) => {
    let bodyparts: Record<string, string[]> = {
        "Live Map Games": ["CS2", "LOL", "DOTA2", "Starcraft"],
        "Next Map Games": ["VALORANT", "Crossfire", "Honor of Kings"],
        "Sports Based Games": ["Esoccer", "Ebasketball"],
    };

    if (header !== "All Esports") {
        if (bodyparts["Live Map Games"].includes(header)) {
            bodyparts = {
                "Live Map Games": [header],
            };
        } else if (bodyparts["Next Map Games"].includes(header)) {
            bodyparts = {
                "Next Map Games": [header],
            };
        } else if (bodyparts["Sports Based Games"].includes(header)) {
            bodyparts = {
                "Sports Based Games": [header],
            };
        }
    }


    return (
        <div className="bg-[hsla(0,0%,100%,.07)]">
            {Object.keys(bodyparts).map((k, index) => {
                return (
                    <div key={index} className="flex flex-col">
                        <EsportTag data={k} />
                        {bodyparts[k as keyof typeof bodyparts].map((item, index) => {
                            const name = grouped?.filter((group: any) => group.name.startsWith(item))

                            return (
                                <div key={index} className={cn("h-full",
                                    item === "CS:GO" ? 'bg-[linear-gradient(135deg,#15204D_0%,_#383838_400px)] border-t-[2px] border-solid border-t-[#3049AF]' : '',
                                    item === "LOL" ? 'bg-[linear-gradient(135deg,#4D4322_0%,_#383838_400px)] border-t-[2px] border-solid border-t-[#8A783D]' : '',
                                    item === "DOTA2" ? 'bg-[linear-gradient(135deg,#4D1313_0%,_#383838_400px)] border-t-[2px] border-solid border-t-[#8C2222]' : '',
                                    item === "VALORANT" ? 'bg-[linear-gradient(135deg,#4D2628_0%,_#383838_400px)] border-t-[2px] border-solid border-t-[#944A4C]' : '',
                                    item === "Honor of Kings" ? 'bg-[linear-gradient(135deg,#4D4430_0%,_#383838_400px)] border-t-[2px] border-solid border-t-[#96865E]' : '',
                                    item === "Esoccer" ? 'bg-[linear-gradient(135deg,#364D3C_0%,_#383838_400px)] border-t-[2px] border-solid border-t-[#408058]' : '',
                                    item === "Ebasketball" ? 'bg-[linear-gradient(135deg,#4D4432_0%,_#383838_400px)] border-t-[2px] border-solid border-t-[#855800]' : '',

                                )}>
                                    <div className="px-8 flex items-center h-[50px] w-full text-[white] text-[17px] font-[700]">
                                        {item}
                                    </div>
                                    {name?.map((filteredGroup: any, index: number) => {
                                        return (
                                            <div key={index}>
                                                <EsportSubcategoryHeader esportTag={k} title = {item}
                                                name={filteredGroup.name} sport={sport} subcategory={subcategory} events={filteredGroup.events} />
                                            </div>
                                        )
                                    })
                                    }
                                </div>

                            )


                        })}
                    </div>
                )
            })}

        </div>
    )
}

export default EsportBody;