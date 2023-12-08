import React from 'react'
import BetParticipant from './BetParticipant/BetParticipant'

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
  participants: Participant[]
}

export default function BetViewDetails({participants}: Props) {
  return (
    <div >
        <div className='inline-block w-full'>
          {
            participants.map((participant, index) =>
              <BetParticipant {...participant} key={index}/> )
          }
        </div>
    </div>
  )
}