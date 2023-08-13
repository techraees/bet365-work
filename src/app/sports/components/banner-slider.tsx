'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import BoostChevronIcon from '@/components/ui/icons/boostchevron';


const BannerSlider = ({banners}: any) => {
    const [reverse, setReverse] = useState(false);
    return (
        <div className='group flex h-[200px] bg-[#282828] w-full relative cursor-pointer'>
            <Swiper
                slidesPerView={1}
                centeredSlides={false}
                spaceBetween={10}
                pagination={true}
                modules={[Autoplay, Navigation, Pagination]}
                className="h-full w-full !static"
                navigation={{
                    enabled: true,
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    reverseDirection: reverse? true: false
                }}
                onActiveIndexChange={(swiper) => {
                    if(swiper.activeIndex===0){
                        setReverse(false);
                    }
                    if(swiper.activeIndex===(banners.length-1)){
                        setReverse(true);
                    }
                }}
            >
                <div className="swiper-button-next invisible group-hover:visible bg-[#1f1f1f] !w-[20px] !h-[45px] !right-0 after:!text-[10px] after:text-[#ffffffbf] hover:after:text-[#00ffb6] hover:after:content-['next']" />
                <div className="swiper-button-prev invisible group-hover:visible  bg-[#1f1f1f] !w-[20px] !h-[45px] !left-0 after:!text-[10px] after:text-[#ffffffbf] hover:after:text-[#00ffb6] hover:after:content-['prev']" />
                {banners && banners.length > 0  && banners?.map((item: any, index: number) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className='relative h-full w-full px-[20px] pt-[15px] pb-[10px]'>
                                <div className=' absolute z-10 top-[0] h-[70%] md:h-full right-[0]'>
                                    <img src={item.image} className=" sportbanner z-10 h-full object-cover object-right " alt="" loading="lazy" />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <div className='flex z-50'>
                                        {item.title === "Bet Boost" ?
                                            <div className='px-1 flex items-center text-[13px] font-[700] leading-[17px] text-[#fff]'>
                                                <div>Bet</div>
                                                <div className='text-[#58d7af] ml-1'>Boost</div>
                                                <BoostChevronIcon className='ml-[3px]' />
                                            </div> :
                                            <div className='bg-[#2ec193] px-1 text-xs font-[700] leading-[17px] text-[#111]'>
                                                {item.title}
                                            </div>
                                        }

                                    </div>
                                    <div className='flex z-50'>
                                        <div className='max-w-[62%] w-[255px] px-1 text-lg font-[700] leading-[22px] text-[white] mt-[7px] mb-[10px]'>
                                            {item.subtitle}
                                        </div>
                                    </div>
                                    <div className='flex z-50'>
                                        <div className=' min-w-[100px] h-[25px] flex justify-center items-center text-[13px] font-[700] leading-[17px] text-[#26ffbe] px-[10px] rounded-[2px] border border-[#26ffbe80]'>
                                            {item.button}
                                        </div>
                                    </div>
                                    <div className='flex z-50'>
                                        <div className='max-w-[544px] min-h-[27px] max-h-[42px] text-[10px] leading-[14px] my-[7px] break-word overflow-hidden text-[#9c9c9c]'>
                                            {item.description}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default BannerSlider