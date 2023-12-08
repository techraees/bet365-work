import React from 'react'
import BetPartMiniMatchWrapper from './BetPartMiniMatchWrapper/BetPartMiniMatchWrapper'
import MediaButtonsContainer from './MediaButtonsContainer/MediaButtonsContainer'

type Props = {
  team: string,
  event: string
}

export default function BetPartMatchLive({team, event}: Props) {
  return (
    <div className='justify-between leading-5 h-5 flex pr-[9px]'>
      <BetPartMiniMatchWrapper team={team} event={event}/>
      <MediaButtonsContainer />
    </div>
  )
}