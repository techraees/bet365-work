
import React from 'react';
import { cn } from '@/lib/utils';

interface MarketCellProps {
    name?: any;
    value?: any;
    disablehover?: boolean;
    borderRight?: boolean;
    textLeftAlign?: boolean;
    suspend?: string;
    separation?: boolean;
    active: string;
    smallpadding?: boolean;
}

const MarketCell: React.FC<MarketCellProps> = ({ name, value, disablehover, borderRight, textLeftAlign, suspend, separation, active, smallpadding }) => {
    return (
        <div className={cn('cols-span-1 flex items-center h-[100%] text-[13px] cursor-pointer relative',
            textLeftAlign ? '' : 'justify-center',
            suspend !== "0" ? 'text-[#a7a7a7]' : '',
            (disablehover || (!value && !name)) ? 'cursor-auto' : 'hover:bg-[hsla(0,0%,100%,.15)] ',
            smallpadding ? 'px-[10px] md:px-[20px]' : 'px-[10px] md:px-[30px]'
        )}>
            <div className='leading-5 line-clamp-2'>{name}</div>
            <div className={cn("pl-[6px] ", suspend !== "0" ? 'text-[#a7a7a7]' : active === "Bet Builder" ? 'text-brand-green-light' : 'text-brand-yellow',)}>
                {value}
            </div>
            {borderRight && <div className="absolute right-0 bg-[#ffffff1a] flex items-center h-[calc(100%_-_20px)] w-[1px]" />}
            {separation && <div className="absolute right-0 bg-[#ffffff1a] flex items-center h-[100%] w-[1px]" />}
        </div>
    )
}

export default MarketCell

export const MarketCellSplit: React.FC<MarketCellProps> = ({ name, value, disablehover, borderRight, textLeftAlign, suspend, separation, active, smallpadding }) => {
    return (
        <div className={cn('cols-span-1 flex items-center h-[100%] text-[13px] cursor-pointer relative',
            textLeftAlign ? '' : 'justify-center',
            suspend !== "0" ? 'text-[#a7a7a7]' : '',
            (disablehover || (!value && !name)) ? 'cursor-auto' : 'hover:bg-[hsla(0,0%,100%,.15)] ',
            smallpadding ? 'px-[10px]' : 'px-[0px] md:px-[30px]'
        )}>
            <div className='flex items-center flex-col md:flex-row'>
                <div className='leading-5 line-clamp-2'>{name}</div>
                <div className={cn("pl-[6px] ", suspend !== "0" ? 'text-[#a7a7a7]' : active === "Bet Builder" ? 'text-brand-green-light' : 'text-brand-yellow',)}>
                    {value}
                </div>
            </div>

            {borderRight && <div className="absolute right-0 bg-[#ffffff1a] flex items-center h-[calc(100%_-_20px)] w-[1px]" />}
            {separation && <div className="absolute right-0 bg-[#ffffff1a] flex items-center h-[100%] w-[1px]" />}
        </div>
    )
}