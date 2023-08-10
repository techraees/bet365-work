
import React, { useState } from "react";
import Stats from "@/components/Sports/Soccer/stats";
import Chevron from "@/components/ui/icons/chevron";
import { cn } from "@/lib/utils";
import { Categoryoptions } from "./maps";
import DialogForCategory from "./DialogForCategory";
import OutsideClickHandler from "react-outside-click-handler";
import { useRouter, usePathname } from "next/navigation";
import MarketCell from "@/components/Structure/MarketCell";
import formatDateToCustomString from "@/components/Structure/FormatDateToCustomString";


const LeagueBody = ({ leagueSelectedGames, active }: any) => {
    const [category, setCategory] = useState({
        isOpen: false,
        outer: 'Main Markets',
        inner: 'Game Lines',
        list: Categoryoptions
    });


    const dates = {} as any;
    if (leagueSelectedGames && leagueSelectedGames.length > 0) {
        leagueSelectedGames?.map((data: any) => {
            if (dates && dates[data?.date] && dates[data?.date].length > 0) {
                dates[data?.date].push(data)
            } else {
                dates[data?.date] = [data]
            }
        })
    } else {
        return null
    }

    // console.log({ dates, category, leagueSelectedGames })
    return (
        <div className="bg-[#383838]">
            <div className=" relative flex items-center justify-between text-xl text-brand-green-light hover:text-white font-bold px-[30px] py-0 min-h-[55px] cursor-pointer">

                <OutsideClickHandler
                    onOutsideClick={() => {
                        setCategory({
                            ...category,
                            isOpen: false,
                        })
                    }}>
                    <div className='flex items-center  hover:underline'
                        onClick={() => {
                            setCategory({
                                ...category,
                                isOpen: true
                            })
                        }}
                    >
                        {category?.inner}
                        <Chevron className="ml-[7px] fill-white h-[6px] w-[12px]" />
                    </div>
                    {category.isOpen &&
                        <DialogForCategory category={category} setCategory={setCategory} />
                    }
                </OutsideClickHandler>
            </div>
            <div>
                <CategoryBased dates={dates} active={category.inner} />
            </div>
        </div >)
}

export default LeagueBody



const CategoryBased = ({ dates, active }: any) => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <>
            {dates && Object.keys(dates).map((date: any) => {
                const formattedDate = formatDateToCustomString(date.replaceAll('.', '-'));
                return (
                    <div key={date}>
                        <div className="h-[30px] bg-[#ffffff12] text-[white] text-[12px] font-[700] pl-[30px] flex items-center">
                            <div className="flex flex-1 items-center">{formattedDate}</div>
                            <div className="flex flex-1 items-center">
                                <div className="flex flex-1 items-center justify-center">Money Line</div>
                                <div className="flex flex-1 items-center justify-center">Total</div>
                                <div className="flex flex-1 items-center justify-center">Run Line</div>
                            </div>
                            <div className="w-[65px] h-full"></div>
                        </div>
                        {
                            dates[date].map((data: any, index: number) => {
                                const moneyLine = [] as any;
                                const total = [] as any;
                                const runline = [] as any;
                                let match = data?.odds?.filter((item: any) => item.id === '2');
                                if (match && match.length > 0) {
                                    match[0]?.bookmakers[0].odds.map((odd: any) => {
                                        moneyLine.push({ title: '', value: odd.value, suspend: odd.stop === 'False' ? '0' : '1' })
                                    })
                                }
                                match = data?.odds?.filter((item: any) => item.id === '5');
                                if (match && match.length > 0) {
                                    match[0]?.bookmakers[0].odds.map((odd: any) => {
                                        if (total.length == 2) {
                                            return
                                        }
                                        odd.odds.map((nd: any) => {
                                            total.push({ title: `${nd.name[0]} ${odd.name}`, value: nd.value, suspend: nd.stop === 'False' ? '0' : '1' })
                                        })
                                    })
                                }
                                match = data?.odds?.filter((item: any) => item.id === '4');
                                if (match && match.length > 0) {
                                    match[0]?.bookmakers[0].odds.map((odd: any) => {
                                        if (runline.length == 2) {
                                            return
                                        }
                                        odd.odds.map((nd: any) => {
                                            runline.push({ title: `${odd.name}`, value: nd.value, suspend: nd.stop === 'False' ? '0' : '1' })
                                        })
                                    })
                                }
                                // console.log({ moneyLine, total, runline })
                                return (
                                    <div key={index} className={cn("text-xs  h-[100px] flex text-[white] items-center min-h-[70px] pl-[30px]",
                                        index == 0 ? "" : "border-t border-solid border-t-[#ffffff1a]"
                                    )}>
                                        <div
                                            onClick={() => {
                                                // console.log({data})
                                                router.push(`${pathname}/${data.id}`)
                                            }}
                                            className="flex flex-1 items-center justify-between cursor-pointer">
                                            <div className="flex-1 flex items-center">
                                                <div>
                                                    {data?.time}
                                                </div>
                                                <div className="flex flex-col ml-5 font-[700] leading-[25px] hover:text-brand-green-light">
                                                    <div>{data?.localteam?.name}</div>
                                                    <div>{data?.awayteam?.name}</div>
                                                </div>
                                            </div>
                                            <div className="flex ml-[auto]">
                                                <Stats />
                                            </div>
                                        </div>
                                        <div className="bg-[#ffffff1a] h-[75px] w-[1px]"></div>

                                        <div className="flex-1 flex h-full justify-center items-center text-[13px] cursor-pointer">
                                            <div className="flex flex-col h-full flex-1">
                                                {moneyLine && moneyLine.length > 0 && moneyLine?.map((ml: any, index: number) => {
                                                    return (
                                                        <div key={index} className="flex-1 grid grid-cols-1 justify-center items-center">
                                                            <MarketCell name={ml.title} value={ml.value} active={'baseball'} suspend={ml.suspend} />
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            <div className="flex flex-col h-full flex-1">
                                                {total && total.length > 0 && total?.map((tt: any, index: number) => {
                                                    return (
                                                        <div key={index} className="flex-1 grid grid-cols-1 justify-center items-center">
                                                            <MarketCell name={tt.title} value={tt.value} active={'baseball'} suspend={tt.suspend} />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className="flex flex-col h-full flex-1">
                                                {runline && runline.length > 0 && runline?.map((rl: any, index: number) => {
                                                    return (
                                                        <div key={index} className="flex-1 grid grid-cols-1 justify-center items-center">
                                                            <MarketCell name={rl.title} value={rl.value} active={'baseball'} suspend={rl.suspend} />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className="bg-[#ffffff1a] h-[75px] w-[1px]"></div>

                                        <div className="w-[65px] h-full"></div>
                                    </div>)
                            })
                        }
                    </div>
                )
            })}
        </>
    )
}