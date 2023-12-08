import React from 'react'
import BetPartHeaderTitle from './BetPartHeaderTitle/BetPartHeaderTitle'
import BetPartMarketDescContainer from './BetPartMarketDescContainer/BetPartMarketDescContainer'
import BetPartFixtureContainer from './BetPartFixtureContainer/BetPartFixtureContainer'

type Props = {
  participant: string,
  marketDesc: string,
  matchName: string,
  score: string,
  playTime: string
}

export default function BetPartLeftContainer({participant, marketDesc, matchName, score, playTime}: Props) {
  return (
    <div className='flex-1 pr-[15px]'>
        <BetPartHeaderTitle participant={participant}/>
        <BetPartMarketDescContainer marketDesc={marketDesc}/>
        <BetPartFixtureContainer matchName={matchName} score={score} playTime={playTime} />
    </div>
  )
}