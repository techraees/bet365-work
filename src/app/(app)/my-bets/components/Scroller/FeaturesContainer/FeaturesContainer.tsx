import React from 'react'
import PodLoaderModule from './PodLoaderModule/PodLoaderModule'

type Props = {}

export default function FeaturesContainer({}: Props) {
  return (
    <div>
      <div className='bg-[#444]'>
        <div>
          <PodLoaderModule />
        </div>
      </div>
    </div>
  )
}