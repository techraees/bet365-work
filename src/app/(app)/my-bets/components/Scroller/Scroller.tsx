import React from 'react'
import BetsContainer from './BetsContainer/BetsContainer'
import FeaturesContainer from './FeaturesContainer/FeaturesContainer'
import GamesPodContainer from './GamesPodContainer/GamesPodContainer'

type Participant = {
  team: string,
  event: string,
  odds: string,
  participant: string,
  marketDesc: string,
  matchName: string,
  score: string,
  playTime: string
}

type BetItemData = {
  stake: string,
  betInfoText: string,
  betInfoLabel: string
  multi: string,
  participants: Participant[]
}

type Props = {
  betData: BetItemData[]
}

export default function Scroller({betData}: Props) {
  return (
    <div className='overflow-y-auto overflow-x-hidden overscroll-none h-[calc(645px_-_50px)]'>
      <div>
        <BetsContainer betData={betData} />
        <FeaturesContainer />
        <GamesPodContainer />
      </div>
    </div>
  )
}