import React from 'react';
import { cn } from '@/lib/utils';

interface MarketHeaderProps {
    data: any;
    odd: any;
    active: any;
}

const MarketHeader: React.FC<MarketHeaderProps> = ({ data, odd, active }) => {
    const totalcolumns = odd?.header?.length;
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


    if (odd?.header[0] === "" && totalcolumns < 4 && active !== "Bet Builder") {
        return (
            <div className={cn(`grid overflow-hidden h-[30px] w-[100%] bg-[hsla(0,0%,100%,.07)]`, `grid-cols-${totalcolumns + 1}`)}>
                <div className='text-xs h-[30px] flex items-center justify-center font-[700]'></div>
                <div className={cn(`grid overflow-hidden h-[100%] w-[100%] `, `col-span-${totalcolumns} grid-cols-${totalcolumns - 1}`)}>
                    {odd?.header.map((item: string, index: number) => {
                        if (index === 0) return;
                        return (
                            <div key={index} className='text-xs h-[30px] flex items-center justify-center font-[700]'>
                                <div className='truncate px-1'>
                                    {item === "Home" ? Home :
                                        item === "Away" ? Away : item
                                    }
                                </div>

                            </div>
                        )
                    })
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div className={cn(`grid overflow-hidden h-[30px] w-[100%] bg-[hsla(0,0%,100%,.07)]`, `grid-cols-${totalcolumns}`)}>
                {odd?.header.map((item: string, index: number) => {
                    return (
                        <div key={index} className='text-xs h-[30px] flex items-center justify-center font-[700]'>
                            <div className='truncate px-1'>
                                {item === "Home" ? Home :
                                    item === "Away" ? Away : item
                                }
                            </div>
                        </div>
                    )
                })}

            </div>
        )
    }

}
export default MarketHeader;