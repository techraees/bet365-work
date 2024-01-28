import React from 'react'
import BetPartLeftContainer from './BetPartLeftContainer/BetPartLeftContainer'

type Props = {
  selection: any,
  event: any
}

export default function BetPartTopContainer({selection, event}: Props) {
  return (
    <div className='flex pr-5'>
        <BetPartLeftContainer selection={selection} event={event}/>
        <div className='text-sm text-white leading-5 h-full'>{selection.value_eu}</div>
    </div>
  )
}