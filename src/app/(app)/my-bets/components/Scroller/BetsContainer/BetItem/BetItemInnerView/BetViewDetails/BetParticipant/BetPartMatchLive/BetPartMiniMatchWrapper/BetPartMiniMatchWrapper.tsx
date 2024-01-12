import React from 'react'

type Props = {
    team: string,
    event: string
}

export default function BetPartMiniMatchWrapper({team, event}: Props) {
  return (
    <>
        <div className='opacity-100 inline-block overflow-hidden text-[11px] leading-[15px] mt-[5px] pl-0'>
            <div>
                <div className='whitespace-nowrap'>
                    <div className='flex justify-start'>
                        {
                            event && 
                            <>
                                { team != "Global" && 
                                    <div className='font-bold text-ellipsis overflow-hidden whitespace-nowrap text-white pr-[5px] border-r-2 border-r-[#F0F0F0] border-solid'>{team}</div> 
                                }
                                <div className='text-[#ddd] pl-[5px]'>{event}</div>
                            </>

                        }
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}