import React from 'react'

type Props = {
  participant: string
}

export default function BetPartHeaderTitle({participant}: Props) {
  return (
    <div className='relative flex justify-start'>
      <div className='w-[13px] h-[13px] absolute bg-no-repeat bg-[50%] left-[-18px] top-1 after:content-[""] after:absolute after:w-[7px] after:h-[7px] after:bg-[#ddd] after:rounded-[50%] after:border-[none] after:right-[3px] after:top-[3px]'></div>
      <div className='inline-flex items-center min-h-[20px] mb-[3px];'>
        <span className='text-sm text-white font-bold leading-5'>
          {participant}
          <div></div>
        </span>
      </div>
    </div>
  )
}