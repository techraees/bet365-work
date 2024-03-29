import React from 'react'
import BetItem from './BetItem/BetItem'

type Props = {
  coupons: any[]
}


export default function BetsContainer({coupons}: Props) {
  return (
    <div className='relative transition-transform duration-[0.5s] ease-[ease] ml-5 mr-[30px] my-0' style={{ backfaceVisibility: "hidden"}}>
      <div>
        {
          coupons.map((coupon, index) => 
            <BetItem coupon={coupon} key={index}/>)
        }
      </div>
    </div>
  )
}