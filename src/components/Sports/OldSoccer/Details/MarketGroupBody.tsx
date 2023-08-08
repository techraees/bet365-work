import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { categoriesMapping } from '@/lib/sportsMapping';

interface MarketGroupBodyProps {
    data: any;
    market: any;
    marketData?: any;
}
interface MarketGroupBodyContainerProps {
    name?: any;
    value?: any;
    disablehover?: boolean;
    borderRight?: boolean;
    textLeftAlign?: boolean;
    suspend?: string;
}

const MarketGroupBodyContainer: React.FC<MarketGroupBodyContainerProps> = ({ name, value, disablehover, borderRight, textLeftAlign, suspend }) => {
    return (
        <div className={cn('cols-span-1 flex items-center h-[100%] px-[30px] text-[13px] cursor-pointer relative',
            textLeftAlign ? '' : 'justify-center',
            suspend !== "0" ? 'text-[#a7a7a7]' : '',
            (disablehover || (!value && !name)) ? 'cursor-auto' : 'hover:bg-[hsla(0,0%,100%,.15)] ')}>
            <div className='leading-5 line-clamp-2'>{name}</div>
            <div className={cn("pl-[6px] ", suspend !== "0" ? 'text-[#a7a7a7]' : 'text-brand-yellow',)}>
                {value}
            </div>
            {borderRight && <div className="absolute right-0 bg-[#ffffff1a] flex items-center h-[calc(100%_-_20px)] w-[1px]" />}
        </div>
    )
}

const MarketGroupBody: React.FC<MarketGroupBodyProps> = ({ data, market, marketData }) => {
    if (market === "fulltimeResult" || market === "halfTimeResult") {
        return (
            <>
                <div className={`grid grid-cols-3 overflow-hidden h-[45px] w-[100%]`}>
                    <MarketGroupBodyContainer name={data?.team_info?.home?.name} value={marketData[market]?.home} suspend={marketData[market]?.suspend} textLeftAlign={true} />
                    <MarketGroupBodyContainer name={'Draw'} value={marketData[market]?.draw} textLeftAlign={true} suspend={marketData[market]?.suspend} />
                    <MarketGroupBodyContainer name={data?.team_info?.away?.name} value={marketData[market]?.away} textLeftAlign={true} suspend={marketData[market]?.suspend} />
                </div>
            </>

        )
    } else if (market === "doubleChance") {
        return (
            <>
                <div className={`grid grid-cols-3 overflow-hidden h-[45px] w-[100%]`}>
                    <MarketGroupBodyContainer name={`${data?.team_info?.home?.name} or Draw`} value={marketData["doubleChance"]?.homeOrDraw} textLeftAlign={true} suspend={marketData["fulltimeResult"]?.suspend} />
                    <MarketGroupBodyContainer name={`${data?.team_info?.away?.name} or Draw`} value={marketData["doubleChance"]?.awayOrDraw} textLeftAlign={true} suspend={marketData["fulltimeResult"]?.suspend} />
                    <MarketGroupBodyContainer name={`${data?.team_info?.home?.name} or ${data?.team_info?.away?.name}`} value={marketData["doubleChance"]?.homeOrAway} textLeftAlign={true} suspend={marketData["fulltimeResult"]?.suspend} />
                </div>
            </>

        )
    } else if (market === "nGoal") {
        return (
            <div className={`grid grid-cols-3 overflow-hidden h-[45px] w-[100%]`}>
                <MarketGroupBodyContainer name={data?.team_info?.home?.name} value={marketData["nGoal"]?.home} textLeftAlign={true} suspend={marketData["nGoal"]?.suspend} />
                <MarketGroupBodyContainer name={'No goal'} value={marketData["nGoal"]?.nogoal} textLeftAlign={true} suspend={marketData["nGoal"]?.suspend} />
                <MarketGroupBodyContainer name={data?.team_info?.away?.name} value={marketData["nGoal"]?.away} textLeftAlign={true} suspend={marketData["nGoal"]?.suspend} />
            </div>
        )
    } else if (market === "matchGoals" || market === "alternativeMatchGoals" || market === "firstHalfGoals") {
        return (
            <div className={`overflow-hidden h-[100%] w-[100%]`}>
                <div className={`grid grid-cols-4 overflow-hidden h-[30px] w-[100%] bg-[hsla(0,0%,100%,.07)]`}>
                    <div className='text-xs h-[30px] flex items-center justify-center font-[700]'></div>
                    <div className={`col-span-3 grid grid-cols-2 overflow-hidden h-[100%] w-[100%] `}>
                        <div className='text-xs h-[30px] flex items-center justify-center font-[700]'>Over</div>
                        <div className='text-xs h-[30px] flex items-center justify-center font-[700]'>Under</div>
                    </div>
                </div>
                {(market === "matchGoals" || market === "firstHalfGoals") &&
                    <div className={`grid grid-cols-4 overflow-hidden h-[45px] w-[100%]`}>
                        <MarketGroupBodyContainer disablehover={true} borderRight={true}
                            name={marketData[market]?.overhandicap[marketData[market]?.overhandicap.length - 1]} value={null} suspend={marketData[market]?.suspend} />
                        <div className={cn(`col-span-3 grid grid-cols-2 overflow-hidden h-[100%] w-[100%] `)}>
                            <MarketGroupBodyContainer name={null} value={marketData[market]?.over[marketData[market]?.over.length - 1]} suspend={marketData[market]?.suspend} />
                            <MarketGroupBodyContainer name={null} value={marketData[market]?.under[marketData[market]?.under.length - 1]} suspend={marketData[market]?.suspend} />
                        </div>
                    </div>
                }
                {market === "alternativeMatchGoals" &&
                    <>
                        {
                            marketData["matchGoals"]?.over.map((item: any, index: number) => {
                                if (index === marketData["matchGoals"]?.over.length - 1) {
                                    return null
                                }
                                return (
                                    <div className={'flex flex-col w-[100%] h-[100%]'} key={index}>
                                        {index !== 0 && <div className='border-t border-solid border-t-[#ffffff1a] h-[1px]' />}
                                        <div className={cn(`grid grid-cols-4 overflow-hidden h-[45px] w-[100%] `)}>
                                            <MarketGroupBodyContainer disablehover={true} borderRight={true}
                                                name={marketData["matchGoals"]?.overhandicap[index]} value={null} suspend={marketData["matchGoals"]?.suspend} />
                                            <div className={cn(`col-span-3 grid grid-cols-2 overflow-hidden h-[100%] w-[100%] `)}>
                                                <MarketGroupBodyContainer name={null} value={marketData["matchGoals"]?.over[index]} suspend={marketData["matchGoals"]?.suspend} />
                                                <MarketGroupBodyContainer name={null} value={marketData["matchGoals"]?.under[index]} suspend={marketData["matchGoals"]?.suspend} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>

                }

            </div>
        )
    } else if (market === "matchCorners") {
        return (
            <div className={`overflow-hidden h-[100%] w-[100%]`}>
                <div className={`grid grid-cols-4 overflow-hidden h-[30px] w-[100%] bg-[hsla(0,0%,100%,.07)]`}>
                    <div className='text-xs h-[30px] flex items-center justify-center font-[700]'>
                    </div>
                    <div className={`col-span-3 grid grid-cols-3 overflow-hidden h-[100%] w-[100%] `}>
                        <div className='text-xs h-[30px] flex items-center justify-center font-[700]'>Over</div>
                        <div className='text-xs h-[30px] flex items-center justify-center font-[700]'>Exactly</div>
                        <div className='text-xs h-[30px] flex items-center justify-center font-[700]'>Under</div>
                    </div>
                </div>
                <>
                    {
                        marketData[market]?.handicap.map((item: any, index: number) => {
                            return (
                                <div className={'flex flex-col w-[100%] h-[100%]'} key={index}>
                                    {index !== 0 && <div className='border-t border-solid border-t-[#ffffff1a] h-[1px]' />}
                                    <div className={cn(`grid grid-cols-4 overflow-hidden h-[45px] w-[100%] `)}>
                                        <MarketGroupBodyContainer disablehover={true} borderRight={true}
                                            name={item} value={null} suspend={marketData[market]?.suspend} />
                                        <div className={cn(`col-span-3 grid grid-cols-3 overflow-hidden h-[100%] w-[100%] `)}>
                                            <MarketGroupBodyContainer name={null} value={marketData[market]?.over[index]} suspend={marketData[market]?.suspend} />
                                            <MarketGroupBodyContainer name={null} value={marketData[market]?.exactly[index]} suspend={marketData[market]?.suspend} />
                                            <MarketGroupBodyContainer name={null} value={marketData[market]?.under[index]} suspend={marketData[market]?.suspend} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </>
            </div>
        )
    } else if (market === "twoWayCorner" || market === "goalLine" || market === "asianCorners") {
        return (
            <div className={`overflow-hidden h-[100%] w-[100%]`}>
                <div className={`grid grid-cols-4 overflow-hidden h-[30px] w-[100%] bg-[hsla(0,0%,100%,.07)]`}>
                    <div className='text-xs h-[30px] flex items-center justify-center font-[700]'></div>
                    <div className={`col-span-3 grid grid-cols-2 overflow-hidden h-[100%] w-[100%] `}>
                        <div className='text-xs h-[30px] flex items-center justify-center font-[700]'>Over</div>
                        <div className='text-xs h-[30px] flex items-center justify-center font-[700]'>Under</div>
                    </div>
                </div>
                <div className={`grid grid-cols-4 overflow-hidden h-[45px] w-[100%]`}>
                    <MarketGroupBodyContainer disablehover={true} borderRight={true}
                        name={marketData[market]?.handicap} value={null} suspend={marketData[market]?.suspend} />
                    <div className={cn(`col-span-3 grid grid-cols-2 overflow-hidden h-[100%] w-[100%] `)}>
                        <MarketGroupBodyContainer name={null} value={marketData[market]?.over} suspend={marketData[market]?.suspend} />
                        <MarketGroupBodyContainer name={null} value={marketData[market]?.under} suspend={marketData[market]?.suspend} />
                    </div>
                </div>
            </div>
        )
    } else if (market === "asianHandicap" || market === "1stHalfAsianHandicap") {
        return (
            <div className={`overflow-hidden h-[100%] w-[100%]`}>
                <div className={`grid grid-cols-2 overflow-hidden h-[30px] w-[100%] bg-[hsla(0,0%,100%,.07)]`}>
                    <div className='text-xs h-[30px] flex items-center justify-center font-[700]'>
                        {data?.team_info?.home?.name}
                    </div>
                    <div className='text-xs h-[30px] flex items-center justify-center font-[700]'>
                        {data?.team_info?.away?.name}
                    </div>
                </div>
                <>
                    {
                        marketData[market]?.home.map((item: any, index: number) => {
                            return (
                                <div className={'flex flex-col w-[100%] h-[100%]'} key={index}>
                                    {/* {index !== 0 && <div className='border-t border-solid border-t-[#ffffff1a] h-[1px]' />} */}
                                    <div className={cn(`grid grid-cols-2 overflow-hidden h-[45px] w-[100%] `)}>
                                        <MarketGroupBodyContainer
                                            name={marketData[market]?.homeHandicap[index]} value={marketData[market]?.home[index]} suspend={marketData[market]?.suspend} />
                                        <MarketGroupBodyContainer
                                            name={marketData[market]?.awayHandicap[index]} value={marketData[market]?.away[index]} suspend={marketData[market]?.suspend} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </>
            </div>
        )
    } else if (market === "drawNoBet") {
        return (
            <div className={`overflow-hidden h-[100%] w-[100%]`}>
                <>
                    <div className={'flex flex-col w-[100%] h-[100%]'} >
                        <div className={cn(`grid grid-cols-2 overflow-hidden h-[45px] w-[100%] `)}>
                            <MarketGroupBodyContainer
                                name={data?.team_info?.home?.name} value={marketData[market]?.home} suspend={marketData[market]?.suspend} />
                            <MarketGroupBodyContainer
                                name={data?.team_info?.away?.name} value={marketData[market]?.away} suspend={marketData[market]?.suspend} />
                        </div>
                    </div>
                </>
            </div>
        )
    }  else if (market === "lastTeamToScore") {
        return (
            <div className={`overflow-hidden h-[100%] w-[100%]`}>
                <>
                    <div className={'flex flex-col w-[100%] h-[100%]'} >
                        <div className={cn(`grid grid-cols-3 overflow-hidden h-[45px] w-[100%] `)}>
                            <MarketGroupBodyContainer
                                name={data?.team_info?.home?.name} value={marketData[market]?.['1']} suspend={marketData[market]?.suspend} />
                             <MarketGroupBodyContainer
                                name={'No Goals'} value={marketData[market]?.nogoal} suspend={marketData[market]?.suspend} />
                            <MarketGroupBodyContainer
                                name={data?.team_info?.away?.name} value={marketData[market]?.['2']} suspend={marketData[market]?.suspend} />
                        </div>
                    </div>
                </>
            </div>
        )
    } else if (market === "goalOddEven") {
        return (
            <div className={`overflow-hidden h-[100%] w-[100%]`}>
                <>
                    <div className={'flex flex-col w-[100%] h-[100%]'} >
                        <div className={cn(`grid grid-cols-2 overflow-hidden h-[45px] w-[100%] `)}>
                            <MarketGroupBodyContainer
                                name={'Odd'} value={marketData[market]?.odd} suspend={marketData[market]?.suspend} />
                             <MarketGroupBodyContainer
                                name={'Even'} value={marketData[market]?.even} suspend={marketData[market]?.suspend} />
                        </div>
                    </div>
                </>
            </div>
        )
    } else if (market === "cornersRace") {
        return (
            <div className={`overflow-hidden h-[100%] w-[100%]`}>
                <div className={`grid grid-cols-4 overflow-hidden h-[30px] w-[100%] bg-[hsla(0,0%,100%,.07)]`}>
                    <div className='text-xs h-[30px] flex items-center justify-center font-[700]'>
                    </div>
                    <div className='text-xs h-[30px] flex items-center justify-center font-[700]'>
                        {data?.team_info?.home?.name}
                    </div>
                    <div className='text-xs h-[30px] flex items-center justify-center font-[700]'>
                        {data?.team_info?.away?.name}
                    </div>
                    <div className='text-xs h-[30px] flex items-center justify-center font-[700]'>
                        Neither
                    </div>
                </div>
                {
                        marketData[market]?.corner.map((item: any, index: number) => {
                            return (
                                <div className={'flex flex-col w-[100%] h-[100%]'} key={index}>
                                    {index !== 0 && <div className='border-t border-solid border-t-[#ffffff1a] h-[1px]' />}
                                    <div className={cn(`grid grid-cols-4 overflow-hidden h-[45px] w-[100%] `)}>
                                        <MarketGroupBodyContainer disablehover={true} borderRight={true}
                                            name={item?.corner} value={null} suspend={item?.suspend} />
                                        <div className={cn(`col-span-3 grid grid-cols-3 overflow-hidden h-[100%] w-[100%] `)}>
                                            <MarketGroupBodyContainer name={null} value={item?.['1']} suspend={item?.suspend} />
                                            <MarketGroupBodyContainer name={null} value={item?.['2']} suspend={item?.suspend} />
                                            <MarketGroupBodyContainer name={null} value={item?.neither} suspend={item?.suspend} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>
        )
    }
    else {
        return null;
    }


};

export default MarketGroupBody