'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import MarketGroupBody from '../../../Structure/MarketGroupBody';
import { categoriesMapping } from '@/lib/sportsMapping';
import { volleyballAll } from './datastructure';
import Chevron from '@/components/ui/icons/chevron';
import StarBorderline, { StarFilled } from '@/components/ui/icons/star-borderline';
interface MarketGroupProps {
    data: any;
    active: string;
}


const VolleyballMarketGroup: React.FC<MarketGroupProps> = ({ data, active }) => {

    if (!data) {
        return null
    }
    let oddData = volleyballAll as any;
    // if (active === "All") {
    //     oddData = volleyAll as any;
    // }
    return (
        <div className='w-[100%] bg-[#383838]'>
            {Object.keys(oddData).map((key, index) => {
                return (
                    <GroupwithHead key={index} keytag={key} data={data} active={active} odd={oddData[key]} />
                )
            })}
        </div>
    )
};

export default VolleyballMarketGroup

interface GroupwithHeadProps {
    keytag: string;
    data: any;
    active: string;
    odd: any;
}

const GroupwithHead: React.FC<GroupwithHeadProps> = ({ keytag, data, active, odd }) => {

    const [isExpanded, setIsExpanded] = useState(true);

    const toggleHeight = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className={'group/item fill-[white] hover:fill-brand-green-light'}>
            <div className={cn(" flex cursor-pointer pl-[30px] pr-[15px] border-t border-solid border-t-[rgba(24,153,112,.75)]",
                odd?.suspend !== "0" ? "text-[hsla(0,0%,100%,.3)] hover:text-[hsla(0,0%,100%,.6)] fill-[hsla(0,0%,100%,.3)] hover:fill-[hsla(0,0%,100%,.6)]" : "text-[white] hover:text-brand-green-light ")}
                onClick={() => {
                    toggleHeight()
                }}
            >
                <div className={'text-base h-[50px] flex items-center font-[700]'}>
                    {odd.marketname}
                </div>
                {odd?.suspend !== "0" &&
                    <div className={'hidden ml-[10px] text-[12px] h-[50px] items-center font-[400] text-[hsla(0,0%,100%,.6)] group-hover/item:flex'}>
                        Currently Suspended
                    </div>
                }
                <div className='ml-auto flex items-center justify-end w-[100px] h-[50px]'>
                    <div className={cn('group hidden items-center justify-center w-[50px] h-[50px] group-hover/item:flex')}>
                        <div className='hidden items-center justify-center w-[20px] h-[20px] group-hover:flex'>
                            <StarFilled className={cn("ml-[7px] h-[13px] w-[13px]")} />
                        </div>
                        <div className='flex items-center justify-center w-[20px] h-[20px] group-hover:hidden'>
                            <StarBorderline className={cn("ml-[7px] h-[13px] w-[13px]")} />
                        </div>
                    </div>

                    <div className={cn('flex items-center justify-center w-[50px] h-[50px]')}>
                        <div className={cn("items-center justify-center w-[20px] h-[20px]", isExpanded ? "hidden group-hover/item:flex" : "flex")}>
                            <Chevron className={cn("ml-[7px] h-[12px] w-[12px]")} />
                        </div>
                    </div>
                </div>
            </div>

            {odd?.currentPoints &&
                <div className="flex w-[100%] h-[100%] border-t-[#ffffff1a] border-t border-solid text-[hsla(0,0%,100%,.6)]">
                    <div className='h-[25px] flex items-center pl-[30px]'>Current Score: {odd?.currentPoints}</div>
                </div>}
            <div
                className={cn('h-[100%] overflow-hidden transition-[max-height] duration-300 ease', isExpanded ? 'max-h-[500px]' : 'max-h-[0px]')}>
                <div className={cn("flex w-[100%] h-[100%] text-[white]")}>
                    <MarketGroupBody data={data} keytag={keytag} active={active} odd={odd} />
                </div>
            </div>
        </div>

    )
};

