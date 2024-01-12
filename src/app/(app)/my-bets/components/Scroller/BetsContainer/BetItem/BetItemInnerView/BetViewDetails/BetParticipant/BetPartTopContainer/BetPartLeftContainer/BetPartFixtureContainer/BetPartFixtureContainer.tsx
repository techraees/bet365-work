import React from 'react'

type Props = {
  matchName: string,
  score: string,
  playTime: string
}

export default function BetPartFixtureContainer({ matchName, score, playTime }: Props) {
  return (
    <div className='flex'>
        <div className='font-normal text-xs leading-[15px] inline-block overflow-hidden leading-[15px] text-[11px] text-[#ddd] self-start cursor-pointer pl-0 pr-[5px] pt-0 pb-2.5 pb-[7px] pb-[3px]' style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            lineClamp: "2",
            WebkitLineClamp: "2",
            wordBreak: "break-word",
            wordWrap: "break-word"
        }}>
            <div className='inline-flex mr-[5px] hover:text-[color(display-p3_0.157_1_0.733)]'>{matchName}</div>
            <div className='inline text-[:#ddd]'>
                <div className='inline-block bg-[hsla(0,0%,100%,0.1)] text-white font-bold mr-[5px] px-[3px] py-0 rounded-[1px]'>{score}</div>
                <div className='inline-block'>{playTime}</div>
            </div>
        </div>
    </div>
  )
}