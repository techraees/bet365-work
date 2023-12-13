
'use client';
import Chevron from "@/components/ui/icons/chevron";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { americas, categories, europe, normalcountry, restoftheword, uk } from "./countries/data";
import { Correction } from "./League/maps";

const Competitions = ({ leaguebycountry }: any) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleHeight = () => {
        setIsExpanded(!isExpanded);
    };


    let countrygroup: any = {};

    leaguebycountry && categories.map((item) => {
        if (item === "Popular") {
            countrygroup[item] = ["Women's World Cup", "Elite Club Friendlies", "UK Friendles", "Leagues Cup", "China Super League", "Copa Sudamericana"];
        } else if (item === "United Kingdom") {
            let arr = [] as any;
            uk.map((rest, index) => {
                if (leaguebycountry[rest] && leaguebycountry[rest].length > 0) {
                    const toPush = leaguebycountry[rest]?.map((listItem: string) => `${rest}: ${listItem}`) || [];
                    arr.push(...toPush);
                }
            })
            countrygroup[item] = arr
        } else if (item === "UEFA Competitions") {
            countrygroup[item] = ["UEFA Super Cup", "UEFA Conference League Qualifying"]
        } else if (normalcountry.includes(item)) {
            const toPush = leaguebycountry[item]?.map((listItem: string) => `${item}: ${listItem}`) || [];
            countrygroup[item] = [...toPush]
        } else if (item === "Internationals") {
            const toPush = leaguebycountry?.World?.map((listItem: string) => `${listItem}`) || [];
            countrygroup[item] = [...toPush]
        } else if (item === "Europe") {
            let arr = [] as any;
            europe.map((rest, index) => {
                if (leaguebycountry[rest] && leaguebycountry[rest].length > 0) {
                    const toPush = leaguebycountry[rest].map((listItem: string) => `${rest}: ${listItem}`) || [];
                    arr.push(...toPush)
                }
            })
            countrygroup[item] = arr
        } else if (item === "Rep of Ireland") {
            const toPush = leaguebycountry?.Ireland?.map((listItem: string) => `Ireland: ${listItem}`) || [];
            countrygroup[item] = [...toPush]
        } else if (item === "Rest of the World") {
            let arr = [] as any;
            restoftheword.map(rest => {
                const toPush = leaguebycountry[rest]?.map((listItem: string) => `${rest}: ${listItem}`) || [];
                if (leaguebycountry[rest] && leaguebycountry[rest].length > 0) {
                    arr.push(...toPush)
                }
            })
            countrygroup[item] = arr
        } else if (item === "The Americas") {
            let arr = [] as any;
            americas.map((rest, index) => {
                if (index === 0 || index === 1) {
                    const toPush = leaguebycountry[rest]?.map((listItem: string) => `${listItem}`) || [];
                    arr.push(...toPush)
                } else if (leaguebycountry[rest] && leaguebycountry[rest].length > 0) {
                    const toPush = leaguebycountry[rest].map((listItem: string) => `${rest}: ${listItem}`) || [];
                    arr.push(...toPush)
                }
            })
            countrygroup[item] = arr
        }
    })
    console.log({ leaguebycountry })
    return (
        <div className=" group/item fill-[#a7a7a7] hover:fill-[white] flex pb-[20px] flex-col w-full relative bg-[#383838] border-t-[#ffffff1a] border-t border-solid">
            <div className={cn(" flex cursor-pointer pl-[20px] pr-[15px] text-brand-green-light hover:text-[white] ")}
                onClick={() => {
                    toggleHeight()
                }}
            >
                <div className={'text-base h-[50px] flex items-center font-[700]'}>
                    Competitions
                </div>
                <div className='ml-auto flex items-center justify-end w-[100px] h-[50px]'>
                    <div className={cn('flex items-center justify-center w-[50px] h-[50px]')}>
                        <div className={cn("items-center justify-center w-[20px] h-[20px]", isExpanded ? "hidden group-hover/item:flex" : "flex")}>
                            <Chevron className={cn("ml-[7px] h-[12px] w-[12px]")} />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={cn('h-[100%] overflow-hidden transition-[max-height] duration-300 ease', isExpanded ? 'max-h-[5000px]' : 'max-h-[0px]')}>
                <div className={cn("flex w-[100%] h-[100%] text-[white]")}>
                    <div className="group h-[100%] items-center flex w-full flex-col relative text-[#ccc]">
                        {Object.keys(countrygroup).map((item, index) => {
                            return (
                                <SubCompetitions key={index} item={item} data={countrygroup[item as keyof typeof countrygroup]} position={index} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Competitions;


const SubCompetitions = ({ item, data, position }: any) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleHeight = () => {
        setIsExpanded(!isExpanded);
    };
    const router = useRouter();
    return (
        <div className={cn(" group/item fill-[white] hover:fill-brand-green-light flex flex-col w-full relative bg-[#383838]",
            position === 0 ? "" : "border-t border-solid  border-t-[#ffffff1a] ")}>
            <div className={cn(" flex cursor-pointer pl-[20px] pr-[15px] hover:text-brand-green-light text-[white] ")}
                onClick={() => {
                    toggleHeight()
                }}
            >
                <div className={'text-[13px] leading-5  h-[50px] flex items-center font-[700]'}>
                    {item}
                </div>
                <div className='ml-auto flex items-center justify-end w-[100px] h-[50px]'>
                    <div className={cn('flex items-center justify-center w-[50px] h-[50px]')}>
                        <div className={cn("items-center justify-center w-[20px] h-[20px]", isExpanded ? "hidden group-hover/item:flex" : "flex")}>
                            <Chevron className={cn("ml-[7px] h-[12px] w-[12px]")} />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={cn('h-[100%] overflow-hidden transition-[max-height] duration-300 ease', isExpanded ? 'max-h-[5000px]' : 'max-h-[0px]')}>
                <div className={cn("flex w-[100%] h-[100%] text-[white]")}>
                    <div className="group h-[100%] items-center px-[20px] flex w-full relative flex-wrap text-[#ccc]">
                        {data.map((dataitem: any, index: number) => {
                            return (
                                <div key={index} className="flex flex-1 min-w-[285px] w-[285px] max-w-[285px] h-[45px] items-center hover:text-[#00ffb6] cursor-pointer"
                                    onClick={() => {
                                        console.log('clicked', dataitem)
                                        if (Correction[dataitem as keyof typeof Correction]) {
                                            console.log('push', `sports/soccer/leagues/${Correction[dataitem as keyof typeof Correction]}`)
                                            router.push(`sports/soccer/leagues/${Correction[dataitem as keyof typeof Correction]}`)
                                        } else {
                                            console.log('push', `sports/soccer/leagues/${dataitem}`)
                                            router.push(`sports/soccer/leagues/${dataitem}`)
                                        }

                                        // router.push(`sports/soccer/leagues/World: World Cup Women`)
                                    }}
                                >
                                    <div className=" w-[100%] text-[13px] leading-5 font-[400] pr-4 truncate">
                                        {dataitem.replace(":", "")}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}