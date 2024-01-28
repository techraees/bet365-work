import React from 'react'
import BetsContainer from './BetsContainer/BetsContainer'
import FeaturesContainer from './FeaturesContainer/FeaturesContainer'
import GamesPodContainer from './GamesPodContainer/GamesPodContainer'

type Props = {
  coupons: any[]
}

export default function Scroller({coupons}: Props) {
  return (
    <div className='overflow-y-auto overflow-x-hidden overscroll-none md:h-[calc(645px_-_50px)]'>
      <div>
        <BetsContainer coupons={coupons} />
      </div>
    </div>
  )
}