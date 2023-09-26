import React from "react";
import { gameLines } from "./mappings/mapping";
import { MarketCellSplit } from "@/components/Structure/MarketCell";
interface CurrentSetProps {
    data: any;
}

const GameLines: React.FC<CurrentSetProps> = ({ data }) => {
    if (!data && !data.odds) {
        return null
    }

    const toshow = gameLines(data)

    let spreadTitle = ['', '']
    let spreadValue = ['', '']
    let totalTitle = ['', '']
    let totalValue = ['', '']
    let mlTitle = ['', '']
    let mlValue = ['', '']
    console.log('toshow', toshow)
    var spread = toshow.rows[0];
    var total = toshow.rows[1];
    var line = toshow.rows[2];
    if(spread)
    {
        spreadTitle[0] = spread[1].title
        spreadValue[0] = spread[1].value 
        spreadTitle[1] = spread[2].title
        spreadValue[1] = spread[2].value
    }
    if(total){
        console.log('tota', total)
        totalTitle[0] = total[1]?.title
        totalValue[0] = total[1]?.value
        totalTitle[1] = total[2]?.title
        totalValue[1] = total[2]?.value
    }

    if(line){
        mlTitle[0] = line[1]?.title
        mlValue[0] = line[1]?.value
        mlTitle[1] = line[2]?.title
        mlValue[1] = line[2]?.value
    }


    // spreadTitle[1] = list[2]?.title
    // spreadValue[1] = list[2]?.value
    
    // toshow.map(list => {
    //     if (list[0].title === 'Spread') {
    //         spreadTitle[0] = list[1]?.title
    //         spreadValue[0] = list[1]?.value
    //         spreadTitle[1] = list[2]?.title
    //         spreadValue[1] = list[2]?.value
    //     }
    //     if (list[0].title === 'Total') {
    //         totalTitle[0] = list[1]?.title
    //         totalValue[0] = list[1]?.value
    //         totalTitle[1] = list[2]?.title
    //         totalValue[1] = list[2]?.value
    //     }
    //     if (list[0].title === 'Money Line') {
    //         mlTitle[0] = list[1]?.title
    //         mlValue[0] = list[1]?.value
    //         mlTitle[1] = list[2]?.title
    //         mlValue[1] = list[2]?.value
    //     }
    // })
    return (
        <div className=" flex-1 flex w-full text-sm font-[500]">
            <div className="flex items-center cursor-pointer w-full">
                <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px]" />
                <div className="flex flex-col w-full h-full">
                    <div className="flex flex-1 items-center h-full w-full hover:bg-[hsla(0,0%,100%,.15)]">
                        <div className="flex-1 h-full justify-center items-center">
                            <MarketCellSplit smallpadding name={spreadTitle[0]} value={spreadValue[0]} suspend={'0'} active={'basketball'} />
                        </div>
                    </div>
                    <div className="flex flex-1 items-center h-full w-full hover:bg-[hsla(0,0%,100%,.15)]">
                        <div className="flex-1 h-full justify-center items-center">
                            <MarketCellSplit smallpadding name={spreadTitle[1]} value={spreadValue[1]} suspend={'0'} active={'basketball'} />
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex items-center cursor-pointer w-full">
                <div className="flex flex-col w-full h-full">
                    <div className="flex flex-1 items-center h-full w-full hover:bg-[hsla(0,0%,100%,.15)]">
                        <div className="flex-1 h-full justify-center items-center">
                            <MarketCellSplit smallpadding name={totalTitle[0]} value={totalValue[0]} suspend={'0'} active={'basketball'} />
                        </div>
                    </div>
                    <div className="flex flex-1 items-center h-full w-full hover:bg-[hsla(0,0%,100%,.15)]">
                        <div className="flex-1 h-full justify-center items-center">
                            <MarketCellSplit smallpadding name={totalTitle[1]} value={totalValue[1]} suspend={'0'} active={'basketball'} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center cursor-pointer flex-row-reverse w-full">
                <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px]" />
                <div className="flex flex-col w-full h-full">
                    <div className="flex flex-1 items-center h-full w-full hover:bg-[hsla(0,0%,100%,.15)]">
                        <div className="flex-1 h-full justify-center items-center">
                            <MarketCellSplit smallpadding name={''} value={mlValue[0]} suspend={'0'} active={'basketball'} />
                        </div>
                    </div>
                    <div className="flex flex-1 items-center h-full w-full hover:bg-[hsla(0,0%,100%,.15)]">

                        <div className="flex-1 h-full justify-center items-center">
                            <MarketCellSplit smallpadding name={''} value={mlValue[1]} suspend={'0'} active={'basketball'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default GameLines;