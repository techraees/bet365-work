import React from 'react'

type Props = {
  message: string
}

export default function TaxMessage({message}: Props) {
  return (
    <div className='flex justify-center ml-5 mr-[45px] mt-0 mb-2.5'>
      <div className='w-full max-w-[1240px] text-center text-[#ddd] leading-[18px] text-[11px] border border-[color(display-p3_0.157_1_0.733/0.3)] px-[15px] py-[17px] rounded-[5px] border-solid'>
        <div>{message}</div>
      </div>
    </div>
  )
}