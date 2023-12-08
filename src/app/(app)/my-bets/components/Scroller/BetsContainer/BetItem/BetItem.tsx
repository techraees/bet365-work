import React from 'react'
import BetItemHeader from './BetItemHeader/BetItemHeader'
import BetItemInnerView from './BetItemInnerView/BetItemInnerView'


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
  multi: string,
  participants: Participant[]
}

export default function BetItem({...props}: Props) {
  const {stake, multi} = props;
  return (
    <div className='mb-2.5 pb-[15px] rounded-[5px]' style={{ background: 'linear-gradient(to bottom right, #303d39, #353535)' }}>
      <BetItemHeader stake={stake} headerText={multi}/>
      <BetItemInnerView {...props} />
    </div>
  )
}