import React from 'react'
import BetViewDetails from './BetViewDetails/BetViewDetails'
import BetViewInformation from './BetViewInformation/BetViewInformation'

type Props = {
  coupon: any,
  events: any[]
}

export default function BetItemInnerView({coupon, events}: Props) {
  return (
    <div className='border-t-[hsla(0,0%,100%,0.1)] border-t border-solid'>
        <BetViewDetails coupon={coupon} events={events}/>
        <BetViewInformation stake={coupon.stake} possibleWinnings={coupon.possible_winnings} />
    </div>
  )
}