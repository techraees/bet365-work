import React from 'react'
import BetPartTopContainer from './BetPartTopContainer/BetPartTopContainer'
import BetPartMatchLive from './BetPartMatchLive/BetPartMatchLive'

type Props = {
  team: string,
  event: string,
  odds: string,
  participant: string,
  marketDesc: string,
  matchName: string,
  score: string,
  playTime: string
}

export default function BetParticipant({team, event, ...other}: Props) {
  return (
    <div className='inline-block w-full align-top pl-9 pl-[30px] pr-0 py-[15px]'>
        <BetPartTopContainer {...other} />
        <BetPartMatchLive team={team} event={event}/>
    </div>
  )
}