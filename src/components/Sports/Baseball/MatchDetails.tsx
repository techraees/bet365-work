import React from "react";
import { categoriesMapping } from "@/lib/sportsMapping";
import MarketCell, { MarketCellSplit } from "../../Structure/MarketCell";
import { cn } from "@/lib/utils";
interface TiedAtEndOfRegulationProps {
    data: any;
    subcategory?: string;
}

const MatchDetails: React.FC<TiedAtEndOfRegulationProps> = ({ data, subcategory }) => {
    const moneyLine = [] as any;
    const total = [] as any;
    const runline = [] as any;

    if (data?.odds?.[160030]?.participants) {
        const spread = Object.entries(data?.odds?.[160030]?.participants)
        if (spread.length > 0) {
            spread.map((item: any, index: number) => {

                let title = '';
                let value = '';
                let suspend = '0';

                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                if (moneyLine.length < 2) {
                    moneyLine.push({ title: title, value: value, suspend: suspend })
                }
            })
        }
    }
    if (data?.odds?.[160031]?.participants) {
        const spread = Object.entries(data?.odds?.[160031]?.participants)
        if (spread.length > 0) {
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.handicap
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                if (runline.length < 2) {
                    runline.push({ title: title, value: value, suspend: suspend })
                }
            })
        }
    }
    if (data?.odds?.[160032]?.participants) {
        const spread = Object.entries(data?.odds?.[160032]?.participants)
        if (spread.length > 0) {
            spread.map((item: any, index: number) => {
                let title = '';
                let value = '';
                let suspend = '0';
                title = item[1]?.handicap
                if(item[1]?.name==="Over"){
                    title = "O " + title
                } else if(item[1]?.name==="Under"){
                    title = "U " + title
                } 
                value = item[1]?.value_eu
                suspend = item[1]?.suspend
                if (total.length < 2) {
                    total.push({ title: title, value: value, suspend: suspend })
                }
            })

        }
    }
    console.log({ total, moneyLine, runline })
    return (
        <div className=" flex-1 flex items-center text-xs font-[500]">
            <div className="bg-[#ffffff1a] h-[75px] w-[1px]"></div>

            <div className="flex-1 flex h-full justify-center items-center text-[13px] cursor-pointer">

                <div className="flex flex-col h-full flex-1">
                    {runline && runline.length > 0 && runline?.map((rl: any, index: number) => {
                        return (
                            <div key={index} className="flex-1 grid grid-cols-1 justify-center items-center">
                                <MarketCellSplit name={rl.title} value={rl.value} active={'baseball'} suspend={rl.suspend} />
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-col h-full flex-1">
                    {total && total.length > 0 && total?.map((tt: any, index: number) => {
                        return (
                            <div key={index} className="flex-1 grid grid-cols-1 justify-center items-center">
                                <MarketCellSplit name={tt.title} value={tt.value} active={'baseball'} suspend={tt.suspend} />
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-col h-full flex-1">
                    {moneyLine && moneyLine.length > 0 && moneyLine?.map((ml: any, index: number) => {
                        return (
                            <div key={index} className="flex-1 grid grid-cols-1 justify-center items-center">
                                <MarketCellSplit name={ml.title} value={ml.value} active={'baseball'} suspend={ml.suspend} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="bg-[#ffffff1a] h-[75px] w-[1px]"></div>



        </div>
    );
}


export default MatchDetails;