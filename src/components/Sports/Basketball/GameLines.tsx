import React from "react";
import { gameLines } from "./mappings/mapping";
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
    toshow.map(list => {
        if (list[0].title === 'Spread') {
            spreadTitle[0] = list[1]?.title
            spreadValue[0] = list[1]?.value
            spreadTitle[1] = list[2]?.title
            spreadValue[1] = list[2]?.value
        }
        if (list[0].title === 'Total') {
            totalTitle[0] = list[1]?.title
            totalValue[0] = list[1]?.value
            totalTitle[1] = list[2]?.title
            totalValue[1] = list[2]?.value
        }
        if (list[0].title === 'Money Line') {
            mlTitle[0] = list[1]?.title
            mlValue[0] = list[1]?.value
            mlTitle[1] = list[2]?.title
            mlValue[1] = list[2]?.value
        }
    })
    return (
        <div className=" col-span-5 flex w-full">
            <div className="flex items-center cursor-pointer w-full">
                <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px]" />
                <div className="flex flex-col w-full h-full">
                    <div className="flex flex-1 items-center h-full w-full hover:bg-[hsla(0,0%,100%,.15)]">
                        <div className="text-[#fff] w-full text-[13px] font-normal text-right mr-1">{spreadTitle[0]}</div>
                        <div className="text-[#ffdf1b] w-full text-[13px] font-normal text-left ml-1">{spreadValue[0]}</div>
                    </div>
                    <div className="flex flex-1 items-center h-full w-full hover:bg-[hsla(0,0%,100%,.15)]">
                        <div className="text-[#fff] w-full text-[13px] font-normal text-right mr-1">{spreadTitle[1]}</div>
                        <div className="text-[#ffdf1b] w-full text-[13px] font-normal text-left ml-1">{spreadValue[1]}</div>
                    </div>
                </div>

            </div>
            <div className="flex items-center cursor-pointer w-full">
                <div className="flex flex-col w-full h-full">
                    <div className="flex flex-1 items-center h-full w-full hover:bg-[hsla(0,0%,100%,.15)]">
                        <div className="text-[#fff] w-full text-[13px] font-normal text-right mr-1">{totalTitle[0]}</div>
                        <div className="text-[#ffdf1b] w-full text-[13px] font-normal text-left ml-1">{totalValue[0]}</div>
                    </div>
                    <div className="flex flex-1 items-center h-full w-full hover:bg-[hsla(0,0%,100%,.15)]">
                        <div className="text-[#fff] w-full text-[13px] font-normal text-right mr-1">{totalTitle[1]}</div>
                        <div className="text-[#ffdf1b] w-full text-[13px] font-normal text-left ml-1">{totalValue[1]}</div>
                    </div>
                </div>
            </div>
            <div className="flex items-center cursor-pointer flex-row-reverse w-full">
                <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px]" />
                <div className="flex flex-col w-full h-full">
                    <div className="flex flex-1 items-center h-full w-full hover:bg-[hsla(0,0%,100%,.15)]">
                        <div className="text-[#ffdf1b] flex items-center justify-center w-full text-[13px] font-normal text-left ml-1">{mlValue[0]}</div>
                    </div>
                    <div className="flex flex-1 items-center h-full w-full hover:bg-[hsla(0,0%,100%,.15)]">
                        <div className="text-[#ffdf1b] flex items-center justify-center w-full text-[13px] font-normal text-left ml-1">{mlValue[1]}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default GameLines;