import React from 'react'
import BetParticipant from './BetParticipant/BetParticipant'

type Props = {
  coupon: any,
  events: any[]
}

export default function BetViewDetails({coupon, events}: Props) {
  return (
    <div >
        <div className='inline-block w-full'>
          {
            coupon.selections.map((selection: any, index: number) => {
              const event = events.find((event) => event.info.id == selection.event_id);
              return <BetParticipant selection={selection} event={event} key={index}/>
            })
          }
        </div>
    </div>
  )
}