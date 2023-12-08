import React from 'react'

type Props = {}

export default function MediaButtonsContainer({}: Props) {
  return (
    <div className='h-10 max-h-10 shrink-0 mr-0'>
        <div className='relative h-10 w-[45px] inline-flex items-center justify-center cursor-pointer'>
            <div style={{ backgroundPositionY: "50%", backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='25' height='15' viewBox='0 0 25 15' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23CCC' fill-rule='nonzero'%3E%3Cpath d='M23.295 0H1.705C.763 0 0 .775 0 1.73v11.54C0 14.224.763 15 1.705 15h21.59c.942 0 1.705-.775 1.705-1.73V1.73C25 .776 24.237 0 23.295 0zm0 1.154c.314 0 .569.258.569.577v11.538a.573.573 0 0 1-.569.577H1.705a.573.573 0 0 1-.569-.577V1.731c0-.319.255-.577.569-.577h21.59z'/%3E%3Cpath d='M10 3.75v7.527l5.953-3.763z'/%3E%3C/g%3E%3C/svg%3E")` }} className="opacity-100 max-h-[13px] h-[13px] w-[22px] bg-contain bg-no-repeat inline-block"></div>
        </div>
        <div className='relative h-10 w-[45px] inline-flex items-center justify-center cursor-pointer'>
            <div style={{ backgroundPositionY: "50%", backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='13' viewBox='0 0 22 13'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Crect width='21' height='12' x='.5' y='.5' stroke='%23CCC' rx='1'/%3E%3Cpath fill='%23CCC' fill-rule='nonzero' d='M10.45.542h1.101v3.792H10.45zM10.45 8.667h1.101v3.792H10.45z'/%3E%3Cpath stroke='%23CCC' d='M1.1 3.25h3.3v6.5H1.1M20.9 9.75h-3.3v-6.5h3.3M8.8 6.5c0-1.264.973-2.167 2.2-2.167 1.262 0 2.2.903 2.2 2.167 0 1.129-.973 2.167-2.2 2.167A2.197 2.197 0 0 1 8.8 6.5z'/%3E%3C/g%3E%3C/svg%3E")` }} className="opacity-100 max-h-[13px] w-[23px] h-[13px] bg-contain bg-no-repeat inline-block"></div>
        </div>
    </div>
  )
}