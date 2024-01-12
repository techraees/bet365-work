import React from 'react'
import BetViewDetails from './BetViewDetails/BetViewDetails'
import BetViewInformation from './BetViewInformation/BetViewInformation'

type Props = {
  coupon: any,
  events: any[]
}

export default function BetItemInnerView({coupon, events}: Props) {
  return (
    <div>
        <BetViewDetails coupon={coupon} events={events}/>
        <BetViewInformation stake={coupon.stake} possibleWinnings={coupon.possible_winnings} />
    </div>
  )
}