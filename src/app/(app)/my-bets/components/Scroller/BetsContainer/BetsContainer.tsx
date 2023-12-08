import React from 'react'
import BetItem from './BetItem/BetItem'


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
  betInfoLabel: string,
  multi: string,
  participants: Participant[]
}

type Props = {
  betData: BetItemData[]
}

export default function BetsContainer({betData}: Props) {
  return (
    <div className='min-h-[calc(100vh_-_150px)] relative transition-transform duration-[0.5s] ease-[ease] ml-5 mr-[30px] my-0' style={{ backfaceVisibility: "hidden"}}>
      <div>
        {
          betData.map(betItemData => 
            <BetItem {...betItemData}/>)
        }
      </div>
    </div>
  )
}