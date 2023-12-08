import React from 'react'
import BetPartLeftContainer from './BetPartLeftContainer/BetPartLeftContainer'

type Props = {
  odds: string,
  participant: string,
  marketDesc: string,
  matchName: string,
  score: string,
  playTime: string
}

export default function BetPartTopContainer({odds, ...other}: Props) {
  return (
    <div className='flex pr-5'>
        <BetPartLeftContainer {...other}/>
        <div className='text-sm text-white leading-5 h-full'>{odds}</div>
    </div>
  )
}