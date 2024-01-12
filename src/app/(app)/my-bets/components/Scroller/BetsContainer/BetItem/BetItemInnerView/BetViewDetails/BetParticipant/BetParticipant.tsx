import React, { useEffect, useState, useRef } from 'react'
import BetPartTopContainer from './BetPartTopContainer/BetPartTopContainer'
import BetPartMatchLive from './BetPartMatchLive/BetPartMatchLive'

type Props = {
  selection: any,
  event: any
}

export default function BetParticipant({selection, event}: Props) {

  return (
    <div className='inline-block w-full align-top pl-9 pl-[30px] pr-0 py-[15px]'>
        <BetPartTopContainer selection={selection} event={event}/>
        { event && <BetPartMatchLive event={event}/>}
    </div>
  )
}