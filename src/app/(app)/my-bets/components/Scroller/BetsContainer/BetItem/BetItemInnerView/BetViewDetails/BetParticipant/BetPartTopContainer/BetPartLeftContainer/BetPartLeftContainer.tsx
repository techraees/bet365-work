import React from 'react'
import BetPartHeaderTitle from './BetPartHeaderTitle/BetPartHeaderTitle'
import BetPartMarketDescContainer from './BetPartMarketDescContainer/BetPartMarketDescContainer'
import BetPartFixtureContainer from './BetPartFixtureContainer/BetPartFixtureContainer'

type Props = {
  selection: any,
  event: any
}

export default function BetPartLeftContainer({ selection, event }: Props) {
  console.log('-----top container----', event);
  return (
    <div className='flex-1 pr-[15px]'>
        <BetPartHeaderTitle team={(selection.participant_name == "Home" ? event?.team_info?.home?.name : event?.team_info?.away?.name) ?? selection.participant_name} handicap={selection?.participant_handicap ?? ""}/>
        <BetPartMarketDescContainer marketDesc={selection.odd_name}/>
        <BetPartFixtureContainer matchName={selection.event_name} score={event?.info?.score} playTime={event?.info?.seconds} />
    </div>
  )
}