import React from 'react'

type Props = {
  stake: string,
  betInfoText: string,
  betInfoLabel: string
}

export default function BetViewInformation({stake, betInfoText, betInfoLabel}: Props) {
  return (
    <div className='min-h-0 flex flex-wrap pt-[15px] border-t-[hsla(0,0%,100%,0.1)] border-t border-solid'>
      <div className='flex-[1_0_66.666%] inline-flex justify-center pb-0'>
        <div className='flex-[1_0_50%] pl-5'>
          <div className='text-[#ddd] text-[11px] leading-[13px] pb-0.5'>{'Stake'}</div>
          <div className='text-white flex font-bold text-base leading-[22px] pb-[5px]'>{stake}</div>
        </div>
        <div className='w-full px-5 py-0'>
          <div className='text-[#ddd] text-[11px] leading-[13px] pb-0.5'>
            {betInfoLabel}
          </div>
          <div className='text-base inline-flex leading-5'>
            <div className='text-white flex font-bold text-base leading-[22px] pb-[5px]'>
              {betInfoText}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}