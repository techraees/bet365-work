"use client"
import { getSlots } from '@/api';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


export const dynamic = "force-dynamic";

const CasinoProvider = ({ options, onClick  }: any) => {
  const [swiperRef, setSwiperRef] = useState<any>(null);
  console.log('options', options)
  if(!options.includes("All")){
    options.unshift("All")
  }
  return (
    <div className='grow overflow-hidden min-w-0 shadow-[1px_1px_11px_1px_black] m-0 px-0 py-0.5 rounded-[10px] flex flex-row'>
      <div className='flex justify-center items-center' onClick={() => swiperRef.slidePrev()}><img src="/chevron_left.png"></img></div>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={10}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        width={60 * options.length}
        className="h-full"
      >
        {
          options.map((option: string, index: number) => (
            <SwiperSlide key={index} onClick={() => onClick(option)}><div className="flex justify-center items-center h-full cursor-pointer overflow-hidden bg-contain bg-no-repeat bg-center border box-border bg-origin-content bg-[#00000012] block p-[5px] rounded-[5px] border-solid border-[#ffffff33]">{option}</div></SwiperSlide>
          ))
        }
      </Swiper>
      <div className='flex justify-center items-center' onClick={() => swiperRef.slideNext()}><img src="/chevron_right.png"></img></div>
    </div>
  );
};

export default CasinoProvider;
