import React from 'react'

type Props = {
  marketDesc: string
}

export default function BetPartMarketDescContainer({ marketDesc }: Props) {
  return (
    <div className='leading-[15px] flex items-center'>
        <div className='overflow-hidden leading-[15px] text-[11px] text-[#ddd] pb-[3px]' style={{ 
            display: "--webkit-box",
            WebkitBoxOrient: "vertical",
            lineClamp: "2",
            WebkitLineClamp: "2",
            wordBreak: "break-word",
            wordWrap: "break-word"
            }}>
            {marketDesc}
        </div>
    </div>
  )
}