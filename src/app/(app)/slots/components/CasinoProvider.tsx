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
import { url } from 'inspector';

const providerImages: any = {
  "egt" : 'https://cdn-eu.livecas888.com/media/img/amusnet_provider.png',
  "amatic": 'https://cdn-eu.livecas888.com/media/img/amaticV1 (1).png',
  "novomatic" : 'https://cdn-eu.livecas888.com/media/img/novomaticv1.webp',
  "pragmatic" : 'https://cdn-eu.livecas888.com/media/img/pragmatic_GGA.webp',
  "playson" : 'https://cdn-eu.livecas888.com/media/img/playson_2_redf.png',
  "NetEnt" : 'https://cdn-eu.livecas888.com/media/img/netent_groupga.webp',
  "yggdrasil" : 'https://cdn-eu.livecas888.com/media/img/yggdrasil_groupga.webp',
  "quickspin" : 'https://cdn-eu.livecas888.com/media/img/quickspin.png',
  "kajot" : 'https://cdn-eu.livecas888.com/media/img/kajot_logo.png',
  "apollo" : 'https://cdn-eu.livecas888.com/media/img/apollo_color.png',
  "wazdan" : 'https://cdn-eu.livecas888.com/media/img/wazdanV1.png',
  "scientific_games" : 'https://cdn-eu.livecas888.com/media/img/SG-Logo11.png',
  "microgaming" : 'https://cdn-eu.livecas888.com/media/img/microgamingv2.png',
  "aristocrat" : 'https://cdn-eu.livecas888.com/media/img/aristocrat_dark1.png',
  "igt" : 'https://cdn-eu.livecas888.com/media/img/logo_igt.png',
  "igrosoft" : 'https://cdn-eu.livecas888.com/media/img/igrosoft_tbs1.png',
  "merkur" : 'https://cdn-eu.livecas888.com/media/img/merkur_tbs.png',
  "habanero" : 'https://cdn-eu.livecas888.com/media/img/habanero1.png',
  "playngo" : 'https://cdn-eu.livecas888.com/media/img/playngo.png',
  "apex" : 'https://cdn-eu.livecas888.com/media/img/logo-apex-new1.png',
  "ainsworth" : 'https://cdn-eu.livecas888.com/media/img/ainsworthv1.png'
};


export const dynamic = "force-dynamic";

const CasinoProvider = ({ options, onClick  }: any) => {
  const [swiperRef, setSwiperRef] = useState<any>(null);
  console.log('options', options)
  if(!options.includes("All")){
    options.unshift("All")
  }
  return (
    <div className='grow overflow-hidden mb-2 min-w-0 shadow-[1px_1px_11px_1px_black] m-0 px-0 py-0.5 rounded-[10px] flex flex-row'>
      <div className='flex justify-center items-center min-w-[20px]' onClick={() => swiperRef.slidePrev()}><img src="/chevron_left.png"></img></div>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={2}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        
        breakpoints={{
          450 : {
            slidesPerView: 3,
          },
          600: {
            slidesPerView: 4,
          },
          900: {
            slidesPerView: 6,
          },
          1080: {
            slidesPerView: 8,
          },
          1200: {
            slidesPerView: 10,
          },
        }}

        // width={60 * options.length}
        className="h-full"
      >
        {
          options.map((option: string, index: number) => (
            <SwiperSlide key={index} onClick={() => onClick(option)}>
              <div className={`min-h-[60px]  flex justify-center items-center h-full cursor-pointer overflow-hidden bg-contain bg-no-repeat bg-center border box-border bg-origin-content bg-[#00000012] block p-[5px] rounded-[5px] border-solid border-[#ffffff33] text-white font-bold text-sm`}
                style={{
                  background: (providerImages[option] ? `url('${providerImages[option]}')` : ""),
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}>
                {providerImages[option] ? "" : option}
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <div className='flex justify-center items-center min-w-[20px]' onClick={() => swiperRef.slideNext()}><img src="/chevron_right.png"></img></div>
    </div>
  );
};

export default CasinoProvider;
