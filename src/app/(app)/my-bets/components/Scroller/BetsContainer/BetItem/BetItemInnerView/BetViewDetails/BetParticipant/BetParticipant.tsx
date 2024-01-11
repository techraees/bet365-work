import React, { useEffect, useState } from 'react'
import BetPartTopContainer from './BetPartTopContainer/BetPartTopContainer'
import BetPartMatchLive from './BetPartMatchLive/BetPartMatchLive'
import { getSportsOdds } from '@/api'

type Props = {
  selection: any
}

export default function BetParticipant({selection}: Props) {
  const [event, setEvent] = useState<any>(null);
  

  useEffect(() => {
    const fetchOdds = async () => {
      let oddsData = await getSportsOdds(selection.game);

      if (selection.game === "esports") {
        let soccerOdds = await getSportsOdds("esoccer");
        let basketballOdds = await getSportsOdds("basketball");
        oddsData = { ...oddsData, ...soccerOdds, ...basketballOdds };
      }

      // setEvent(oddsData[selection.event_id]?.raw_object ?? null); // Update the state variable
      setEvent(oddsData[Object.keys(oddsData)[0]]?.raw_object ?? null);
    };

    fetchOdds();
  }, [])
  

  return (
    <div className='inline-block w-full align-top pl-9 pl-[30px] pr-0 py-[15px]'>
        <BetPartTopContainer selection={selection} event={event}/>
        <BetPartMatchLive team={"Team"} event={"event"}/>
    </div>
  )
}