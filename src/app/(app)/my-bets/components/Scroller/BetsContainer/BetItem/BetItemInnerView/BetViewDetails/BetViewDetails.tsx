import React from 'react'
import BetParticipant from './BetParticipant/BetParticipant'

type Props = {
  coupon: any
}

export default function BetViewDetails({coupon}: Props) {
  return (
    <div >
        <div className='inline-block w-full'>
          {
            coupon.selections.map((selection: any, index: number) =>
              <BetParticipant selection={selection} key={index}/> )
          }
        </div>
    </div>
  )
}