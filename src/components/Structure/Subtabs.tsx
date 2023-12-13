
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import MarketCell from './MarketCell';

interface RowDataProps {
    odd: any;
    data: any;
    active: string;
}
const Subtabs: React.FC<RowDataProps> = ({ odd, data, active }) => {
    const [currentTab, setCurrentTab] = useState(odd?.subtabs?.[0])

    let Home = '';
    let Away = '';
    if (data?.team_info?.home?.name) {
        Home = data?.team_info?.home?.name
    } else if (data?.localteam?.name) {
        Home = data?.localteam?.name
    }

    if (data?.team_info?.away?.name) {
        Away = data?.team_info?.away?.name
    } else if (data?.visitorteam?.name) {
        Away = data?.visitorteam?.name
    }

    return (
        <>
            <div className={'flex w-[100%] h-[100%] px-4'}>
                {odd?.subtabs?.map((subtab: string, index: number) => {
                    return (
                        <div key={index} onClick={() => { setCurrentTab(subtab) }}
                            className="flex h-[42px] px-4 justify-center items-center text-[#ddd] hover:text-[white] cursor-pointer">
                            <div className={cn('h-[100%] flex justify-center items-center text-xs', currentTab === subtab ? 'font-bold border-solid border-b-2' : '')}
                            >{subtab}</div>
                        </div>
                    )
                })}
            </div>
            {odd?.[`${currentTab} header`] && odd?.[`${currentTab} header`].length > 0 &&
                <>
                    <div className='border-t border-solid border-t-[#ffffff1a] h-[1px]' />
                    <div className={cn(`grid overflow-hidden h-[30px] w-[100%]`, `grid-cols-${odd?.[`${currentTab} header`]?.length}`)}>
                        {odd?.[`${currentTab} header`].map((item: string, index: number) => {
                            return (
                                <div key={index} className='text-xs h-[30px] flex items-center justify-center font-[700]'>
                                   <div className='truncate px-1'>
                                     {item === "Home" ? Home :
                                        item === "Away" ?Away : item
                                    }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            }

            {odd?.[currentTab]?.map((rowdata: any, index: number) => {
                return (
                    <div key={index} className={'flex flex-col w-[100%] h-[100%]'}>
                        <div className='border-t border-solid border-t-[#ffffff1a] h-[1px]' />

                        <div className={cn(`grid grid-cols-${rowdata.length} overflow-hidden h-[45px] w-[100%] `)}>
                            {rowdata.map((item: any, index: number) => {
                                let textLeftAlign = false
                                let disablehover = false
                                let borderRight = false
                                if (index === 0) {
                                    if (!item.value) {
                                        disablehover = true;
                                        borderRight = true;
                                        textLeftAlign = odd?.header?.length === 0 ? true : false
                                    }
                                }
                                return (
                                    <MarketCell key={index} disablehover={disablehover} borderRight={borderRight}
                                        name={item.title} value={item.value} suspend={odd?.suspend} textLeftAlign={textLeftAlign}
                                        active={active}
                                    />
                                )

                            })}
                        </div>



                    </div>
                )

            })}

        </>
    )
}
export default Subtabs