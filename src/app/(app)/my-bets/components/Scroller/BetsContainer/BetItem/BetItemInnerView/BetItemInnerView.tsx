import React from 'react'
import BetViewDetails from './BetViewDetails/BetViewDetails'
import BetViewInformation from './BetViewInformation/BetViewInformation'


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

type Props = {
  stake: string,
  betInfoText: string,
  betInfoLabel: string,
  participants: Participant[]
}


export default function BetItemInnerView({stake, betInfoText, betInfoLabel, ...other}: Props) {
  return (
    <div>
        <BetViewDetails {...other}/>
        <BetViewInformation stake={stake} betInfoText={betInfoText} betInfoLabel={betInfoLabel} />
    </div>
  )
}