import React from 'react'
import BetViewDetails from './BetViewDetails/BetViewDetails'
import BetViewInformation from './BetViewInformation/BetViewInformation'

type Props = {
  coupon: any
}

export default function BetItemInnerView({coupon}: Props) {
  return (
    <div>
        <BetViewDetails coupon={coupon}/>
        <BetViewInformation stake={coupon.stake} possibleWinnings={coupon.possible_winnings} />
    </div>
  )
}