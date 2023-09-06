import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import MarketHeader from './MarketHeader';
import Subtabs from './Subtabs';
import MarketCell from './MarketCell';

interface MarketGroupBodyProps {
    data: any;
    keytag: any;
    active?: any;
    odd: any;
}

interface RowDataProps {
    odd: any;
    data: any;
    active: string;
}


const RowData: React.FC<RowDataProps> = ({ odd, data, active }) => {

    if (odd?.subtabs) {
        return <Subtabs odd={odd} data={data} active={active} />
    }

    if (active === "Bet Builder") {
        return (
            <>
                {odd?.rows?.map((rowdata: any, index: number) => {
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

    // total band
    // if no header and row is one the align left

    return (
        <>
            {odd?.rows?.map((rowdata: any, index: number) => {
                return (
                    <div key={index} className={'flex flex-col w-[100%] h-[100%]'}>
                        <div className='border-t border-solid border-t-[#ffffff1a] h-[1px]' />
                        {((rowdata[0]?.value) || (rowdata.length > 3)) ?
                            <div className={cn(`grid grid-cols-${rowdata.length} overflow-hidden h-[45px] w-[100%] `)}>
                                {rowdata?.map((item: any, index: number) => {
                                    let textLeftAlign = odd?.header?.length === 0 ? true : false
                                    let separation = odd?.header?.length === 2 ? rowdata?.length === 4 ? true : false : false;
                                    let borderRight = false;
                                    let disablehover = false;
                                    if (rowdata.length > 3) {
                                        if (!rowdata[0]?.value && !rowdata[2].value) {
                                            textLeftAlign = false
                                            separation = true;
                                            if (index % 2 === 0) {
                                                console.log('FIND')
                                                borderRight = true;
                                            }
                                        }
                                        if (odd?.firstCellBorderRight) {
                                            if (index === 0) {
                                                borderRight = true;
                                                disablehover = true;
                                            }
                                        }
                                    }

                                    return (
                                        <MarketCell key={index} name={item.title} value={item.value} suspend={odd?.suspend} textLeftAlign={textLeftAlign}
                                            separation={separation ? index === 1 ? true : false : false}
                                            active={active} borderRight={borderRight} disablehover={disablehover}
                                        />
                                    )
                                })}
                            </div>
                            : (rowdata.length ===2 && !rowdata[0]?.value)? 
                            <div className={cn(`grid grid-cols-${rowdata.length + 2} overflow-hidden h-[45px] w-[100%] `)}>
                                <MarketCell disablehover={true} borderRight={true}
                                    name={rowdata[0]?.title} value={rowdata[0]?.value} suspend={odd?.suspend} active={active} />
                                <div className={cn(`col-span-${rowdata.length+1} grid grid-cols-${rowdata.length - 1} overflow-hidden h-[100%] w-[100%] `)}>
                                    {rowdata.map((item: any, index: number) => {
                                        if (index === 0) return null
                                        return (
                                            <MarketCell key={index} name={item.title} value={item.value} suspend={odd?.suspend} active={active} />
                                        )
                                    })}
                                </div>
                            </div>
                            :
                            <div className={cn(`grid grid-cols-${rowdata.length + 1} overflow-hidden h-[45px] w-[100%] `)}>
                                <MarketCell disablehover={true} borderRight={true}
                                    name={rowdata[0]?.title} value={rowdata[0]?.value} suspend={odd?.suspend} active={active} />
                                <div className={cn(`col-span-${rowdata.length} grid grid-cols-${rowdata.length - 1} overflow-hidden h-[100%] w-[100%] `)}>
                                    {rowdata.map((item: any, index: number) => {
                                        if (index === 0) return null
                                        return (
                                            <MarketCell key={index} name={item.title} value={item.value} suspend={odd?.suspend} active={active} />
                                        )
                                    })}
                                </div>
                            </div>

                        }

                    </div>
                )

            })}
        </>
    )
}

const MarketGroupBody: React.FC<MarketGroupBodyProps> = ({ data, keytag, active, odd }) => {

    return (
        <div className={`overflow-hidden h-[100%] w-[100%]`}>
            {odd?.header?.length > 0 &&
                <MarketHeader odd={odd} data={data} active={active} />
            }
            <RowData odd={odd} data={data} active={active} />
        </div>
    )

};

export default MarketGroupBody