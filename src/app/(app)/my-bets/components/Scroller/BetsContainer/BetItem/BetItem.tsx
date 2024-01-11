import React from 'react'
import BetItemHeader from './BetItemHeader/BetItemHeader'
import BetItemInnerView from './BetItemInnerView/BetItemInnerView'

type Props = {
  coupon: any
}

export default function BetItem({coupon}: Props) {
  return (
    <div className='mb-2.5 pb-[15px] rounded-[5px]' style={{ background: 'linear-gradient(to bottom right, #303d39, #353535)' }}>
      <BetItemHeader stake={coupon.stake} headerText={coupon.type}/>
      <BetItemInnerView coupon={coupon} /> 
    </div>
  )
}